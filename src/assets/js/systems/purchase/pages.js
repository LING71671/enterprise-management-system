'use strict';

window.purchaseSystem = window.purchaseSystem || {};

// 采购管理页面控制器：负责采购总览、供应商、流程、跟踪和分析页。
purchaseSystem.pages = (function(store, actions, renderers, view) {
  function renderPurchaseIndexRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td>${item.supplierName}</td>
        <td><strong>${item.item}</strong></td>
        <td><strong>${formatMoney(item.amount)}</strong></td>
        <td>${item.deliveryDate}</td>
        <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `;
  }

  function renderSupplierRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.contact}</td>
        <td>${item.phone}</td>
        <td>${item.category}</td>
        <td>${renderers.stars(item.rating)}</td>
        <td><span class="badge ${renderers.supplierStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
        <td><div class="table-actions"><button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button></div></td>
      </tr>
    `;
  }

  function renderProcessRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td>${item.supplierName}</td>
        <td><strong>${item.item}</strong></td>
        <td>${item.quantity} ${item.unit}</td>
        <td>${formatMoney(item.unitPrice)}</td>
        <td><strong>${formatMoney(item.amount)}</strong></td>
        <td>${item.createDate}</td>
        <td>${item.deliveryDate}</td>
        <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `;
  }

  function renderTrackingRow(item) {
    const today = new Date();
    const deliveryDate = new Date(item.deliveryDate);
    const daysLeft = Math.ceil((deliveryDate - today) / (1000 * 60 * 60 * 24));
    const daysDisplay = item.status === '已到货'
      ? '—'
      : daysLeft < 0
        ? `<span style="color:var(--color-danger);font-weight:600">已逾期 ${Math.abs(daysLeft)} 天</span>`
        : daysLeft <= 3
          ? `<span style="color:var(--color-warning);font-weight:600">${daysLeft} 天</span>`
          : `${daysLeft} 天`;

    return `
      <tr>
        <td>${item.id}</td>
        <td>${item.supplierName}</td>
        <td><strong>${item.item}</strong></td>
        <td>${item.quantity} ${item.unit}</td>
        <td>${item.deliveryDate}</td>
        <td>${daysDisplay}</td>
        <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `;
  }

  function renderMonthlyAnalysisRow(maxAmount) {
    return (item) => {
      const barWidth = maxAmount ? Math.round((item.amount / maxAmount) * 100) : 0;
      return `
        <tr>
          <td>${item.month}</td>
          <td><strong>${formatMoney(item.amount)}</strong></td>
          <td>${item.orders}</td>
          <td>${barWidth}%</td>
        </tr>
      `;
    };
  }

  function renderSupplierAmountRow(total) {
    return ([name, amount]) => {
      const percent = total ? ((amount / total) * 100).toFixed(1) : '0.0';
      return `
        <tr>
          <td><strong>${name}</strong></td>
          <td>${formatMoney(amount)}</td>
          <td>${percent}%</td>
        </tr>
      `;
    };
  }

  function collectSupplierAmounts(orders) {
    return orders.reduce((result, item) => {
      result[item.supplierName] = (result[item.supplierName] || 0) + item.amount;
      return result;
    }, {});
  }


  // 初始化采购管理首页。
  function initIndexPage() {
    const tbody = document.getElementById('order-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const data = store.sync();
    renderers.stats([
      { icon: '🤝', value: data.suppliers.filter((item) => item.status === '合作中').length, label: '合作供应商' },
      { icon: '📋', value: data.orders.length, label: '采购订单' },
      { icon: '💰', value: formatMoney(data.orders.reduce((sum, item) => sum + item.amount, 0)), label: '采购总额' },
      { icon: '✅', value: data.orders.filter((item) => item.status === '已到货').length, label: '已到货' }
    ]);

    view.renderRows(tbody, data.orders, renderPurchaseIndexRow, { colspan: 6, text: '暂无采购订单' });

    tbody.dataset.bound = '1';
  }

  // 初始化供应商管理页。
  function initSupplierPage() {
    const tbody = document.getElementById('supplier-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render(list) {
      const suppliers = store.sync().suppliers;
      const active = suppliers.filter((item) => item.status === '合作中').length;
      renderers.stats([
        { icon: '🤝', value: suppliers.length, label: '供应商总数' },
        { icon: '✅', value: active, label: '合作中' },
        { icon: '⏸️', value: suppliers.length - active, label: '已暂停' }
      ]);

      view.renderRows(tbody, list, renderSupplierRow, { colspan: 8, text: '暂无供应商' });
    }

    function refresh() {
      const keyword = view.getTrimmedValue('search-input');
      const list = view.filterByKeyword(store.sync().suppliers, keyword, ['name', 'contact']);
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'name', label: '供应商名称', required: true },
        { name: 'contact', label: '联系人', defaultValue: '采购经理' },
        { name: 'phone', label: '联系电话', defaultValue: '13700009999' },
        { name: 'category', label: '品类', defaultValue: '原材料' },
        { name: 'rating', label: '评级（1-5）', defaultValue: '4' },
        { name: 'status', label: '状态（合作中/暂停）', defaultValue: '合作中' }
      ]);
      if (!payload) return;

      actions.createSupplier(payload);
      refresh();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      view.confirmDelete('确认删除该供应商？', () => actions.deleteSupplier(this.dataset.id), refresh);
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  // 初始化采购流程页。
  function initProcessPage() {
    const tbody = document.getElementById('order-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render(list) {
      const orders = store.sync().orders;
      renderers.stats([
        { icon: '📋', value: orders.length, label: '订单总数' },
        { icon: '💰', value: formatMoney(orders.reduce((sum, item) => sum + item.amount, 0)), label: '采购总额' },
        { icon: '✅', value: orders.filter((item) => item.status === '已到货').length, label: '已到货' }
      ]);

      view.renderRows(tbody, list, renderProcessRow, { colspan: 9, text: '暂无采购流程记录' });
    }

    function refresh() {
      const keyword = view.getTrimmedValue('search-input');
      const status = view.getValue('status-filter');
      const list = view.filterByKeyword(store.sync().orders, keyword, ['supplierName', 'item'])
        .filter((item) => !status || item.status === status);
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('status-filter'), 'change', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'supplierName', label: '供应商名称', required: true },
        { name: 'item', label: '采购物料', required: true },
        { name: 'quantity', label: '数量', defaultValue: '10' },
        { name: 'unit', label: '单位', defaultValue: '吨' },
        { name: 'unitPrice', label: '单价', defaultValue: '1000' },
        { name: 'status', label: '状态（待审核/待发货/运输中/已到货）', defaultValue: '待审核' }
      ]);
      if (!payload) return;

      actions.createOrder(payload);
      refresh();
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  // 初始化到货跟踪页。
  function initTrackingPage() {
    const tbody = document.getElementById('tracking-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const orders = store.sync().orders;
    renderers.stats([
      { icon: '🚚', value: orders.filter((item) => item.status === '运输中').length, label: '运输中' },
      { icon: '⏳', value: orders.filter((item) => item.status === '待发货' || item.status === '待审核').length, label: '待发货/待审核' },
      { icon: '✅', value: orders.filter((item) => item.status === '已到货').length, label: '已到货' }
    ]);

    view.renderRows(tbody, orders, renderTrackingRow, { colspan: 7, text: '暂无到货跟踪' });

    tbody.dataset.bound = '1';
  }

  // 初始化采购分析页。
  function initAnalysisPage() {
    const analysisBody = document.getElementById('analysis-tbody');
    const supplierBody = document.getElementById('supplier-tbody');
    if (!analysisBody || !supplierBody || analysisBody.dataset.bound === '1') return;

    const state = store.sync();
    const monthly = state.analysis.monthly || [];
    const totalAmount = monthly.reduce((sum, item) => sum + item.amount, 0);
    const totalOrders = monthly.reduce((sum, item) => sum + item.orders, 0);
    const maxAmount = Math.max.apply(null, monthly.map((item) => item.amount).concat([0]));
    const avgAmount = monthly.length ? Math.round(totalAmount / monthly.length) : 0;

    renderers.stats([
      { icon: '💰', value: formatMoney(totalAmount), label: '6个月采购总额' },
      { icon: '📋', value: totalOrders, label: '6个月总订单数' },
      { icon: '📈', value: formatMoney(maxAmount), label: '单月最高采购额' },
      { icon: '📊', value: formatMoney(avgAmount), label: '月均采购额' }
    ]);

    view.renderRows(analysisBody, monthly, renderMonthlyAnalysisRow(maxAmount), { colspan: 4, text: '暂无采购分析数据' });

    const supplierMap = collectSupplierAmounts(state.orders);
    const supplierTotal = Object.values(supplierMap).reduce((sum, value) => sum + value, 0);
    const supplierRows = Object.entries(supplierMap).sort((a, b) => b[1] - a[1]);
    view.renderRows(supplierBody, supplierRows, renderSupplierAmountRow(supplierTotal), { colspan: 3, text: '暂无供应商占比' });

    analysisBody.dataset.bound = '1';
  }

  // 按当前采购管理子页面分发初始化逻辑。
  function init() {
    switch (view.pageName()) {
      case 'index.html':
        if (document.getElementById('order-tbody')) initIndexPage();
        break;
      case 'supplier.html':
        initSupplierPage();
        break;
      case 'process.html':
        initProcessPage();
        break;
      case 'tracking.html':
        initTrackingPage();
        break;
      case 'analysis.html':
        initAnalysisPage();
        break;
      default:
        break;
    }
  }

  return {
    init
  };
})(purchaseSystem.store, purchaseSystem.actions, purchaseSystem.renderers, EnterpriseView);

// 对外暴露采购管理初始化入口，供 modules/purchase.js 调用。
purchaseSystem.init = function() {
  try {
    purchaseSystem.pages.init();
  } catch (error) {
    console.error('purchaseSystem.init failed:', error);
  }
};

// 对外暴露采购管理状态快照，供调试和兼容 API 使用。
purchaseSystem.getState = function() {
  return purchaseSystem.store.snapshot();
};

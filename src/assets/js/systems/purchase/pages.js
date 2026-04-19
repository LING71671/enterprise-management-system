'use strict';

window.purchaseSystem = window.purchaseSystem || {};

purchaseSystem.pages = (function(store, actions, renderers, view) {
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

    tbody.innerHTML = data.orders.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.supplierName}</td>
        <td><strong>${item.item}</strong></td>
        <td><strong>${formatMoney(item.amount)}</strong></td>
        <td>${item.deliveryDate}</td>
        <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

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

      tbody.innerHTML = list.map((item) => `
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
      `).join('');
    }

    function refresh() {
      const keyword = ((document.getElementById('search-input') || {}).value || '').trim().toLowerCase();
      const list = store.sync().suppliers.filter((item) => {
        const text = `${item.name} ${item.contact}`.toLowerCase();
        return !keyword || text.includes(keyword);
      });
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const name = window.prompt('供应商名称');
      if (!name) return;

      actions.createSupplier({
        name,
        contact: window.prompt('联系人', '采购经理') || '采购经理',
        phone: window.prompt('联系电话', '13700009999') || '13700009999',
        category: window.prompt('品类', '原材料') || '原材料',
        rating: window.prompt('评级（1-5）', '4') || '4',
        status: window.prompt('状态（合作中/暂停）', '合作中') || '合作中'
      });
      refresh();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      if (window.confirm('确认删除该供应商？')) {
        actions.deleteSupplier(this.dataset.id);
        refresh();
      }
    });

    tbody.dataset.bound = '1';
    refresh();
  }

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

      tbody.innerHTML = list.map((item) => `
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
      `).join('');
    }

    function refresh() {
      const keyword = ((document.getElementById('search-input') || {}).value || '').trim().toLowerCase();
      const status = (document.getElementById('status-filter') || {}).value || '';
      const list = store.sync().orders.filter((item) => {
        const text = `${item.supplierName} ${item.item}`.toLowerCase();
        return (!keyword || text.includes(keyword)) && (!status || item.status === status);
      });
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('status-filter'), 'change', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const supplierName = window.prompt('供应商名称');
      const item = window.prompt('采购物料');
      if (!supplierName || !item) return;

      actions.createOrder({
        supplierName,
        item,
        quantity: window.prompt('数量', '10') || '10',
        unit: window.prompt('单位', '吨') || '吨',
        unitPrice: window.prompt('单价', '1000') || '1000',
        status: window.prompt('状态（待审核/待发货/运输中/已到货）', '待审核') || '待审核'
      });
      refresh();
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  function initTrackingPage() {
    const tbody = document.getElementById('tracking-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const orders = store.sync().orders;
    const today = new Date();
    renderers.stats([
      { icon: '🚚', value: orders.filter((item) => item.status === '运输中').length, label: '运输中' },
      { icon: '⏳', value: orders.filter((item) => item.status === '待发货' || item.status === '待审核').length, label: '待发货/待审核' },
      { icon: '✅', value: orders.filter((item) => item.status === '已到货').length, label: '已到货' }
    ]);

    tbody.innerHTML = orders.map((item) => {
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
    }).join('');

    tbody.dataset.bound = '1';
  }

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

    analysisBody.innerHTML = monthly.map((item) => {
      const barWidth = maxAmount ? Math.round((item.amount / maxAmount) * 100) : 0;
      return `
        <tr>
          <td>${item.month}</td>
          <td><strong>${formatMoney(item.amount)}</strong></td>
          <td>${item.orders}</td>
          <td>${barWidth}%</td>
        </tr>
      `;
    }).join('');

    const supplierMap = {};
    state.orders.forEach((item) => {
      supplierMap[item.supplierName] = (supplierMap[item.supplierName] || 0) + item.amount;
    });
    const supplierTotal = Object.values(supplierMap).reduce((sum, value) => sum + value, 0);
    supplierBody.innerHTML = Object.entries(supplierMap).sort((a, b) => b[1] - a[1]).map(([name, amount]) => {
      const percent = supplierTotal ? ((amount / supplierTotal) * 100).toFixed(1) : '0.0';
      return `
        <tr>
          <td><strong>${name}</strong></td>
          <td>${formatMoney(amount)}</td>
          <td>${percent}%</td>
        </tr>
      `;
    }).join('');

    analysisBody.dataset.bound = '1';
  }

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

purchaseSystem.init = function() {
  try {
    purchaseSystem.pages.init();
  } catch (error) {
    console.error('purchaseSystem.init failed:', error);
  }
};

purchaseSystem.getState = function() {
  return purchaseSystem.store.snapshot();
};

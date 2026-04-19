'use strict';

window.salesSystem = window.salesSystem || {};

// 销售管理页面控制器：负责销售总览、客户、订单、定价、报表和团队页。
salesSystem.pages = (function(store, actions, renderers, view) {
  function renderSalesIndexRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td>${item.customerName}</td>
        <td>${item.product}</td>
        <td><strong>${formatMoney(item.amount)}</strong></td>
        <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `;
  }

  function renderCustomerRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.contact}</td>
        <td>${item.phone}</td>
        <td>${item.city}</td>
        <td><span class="badge ${renderers.levelMap[item.level] || 'badge-default'}">${item.level}</span></td>
        <td>${formatMoney(item.totalAmount)}</td>
        <td><div class="table-actions"><button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button></div></td>
      </tr>
    `;
  }

  function renderOrderRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td>${item.customerName}</td>
        <td><strong>${item.product}</strong></td>
        <td>${item.quantity}</td>
        <td>${formatMoney(item.unitPrice)}</td>
        <td><strong>${formatMoney(item.amount)}</strong></td>
        <td>${item.createDate}</td>
        <td>${item.deliveryDate}</td>
        <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `;
  }

  function renderPricingRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.product}</strong></td>
        <td>${formatMoney(item.standardPrice)}</td>
        <td><strong style="color:var(--color-primary)">${formatMoney(item.currentPrice)}</strong></td>
        <td>${item.discount < 1 ? `<span class="badge badge-warning">${(item.discount * 10).toFixed(1)}折</span>` : '—'}</td>
        <td>${item.validFrom} ~ ${item.validTo}</td>
        <td><span class="badge badge-success">${item.status}</span></td>
      </tr>
    `;
  }

  function renderMonthlyReportRow(maxRevenue) {
    return (item) => {
      const barWidth = maxRevenue ? Math.round((item.revenue / maxRevenue) * 100) : 0;
      return `
        <tr>
          <td>${item.month}</td>
          <td><strong>${formatMoney(item.revenue)}</strong></td>
          <td>${item.orders}</td>
          <td>${item.newCustomers}</td>
          <td>${barWidth}%</td>
        </tr>
      `;
    };
  }

  function renderTeamRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.role}</td>
        <td>${item.region}</td>
        <td>${formatMoney(item.target)}</td>
        <td>${formatMoney(item.achieved)}</td>
        <td>${(item.rate * 100).toFixed(1)}%</td>
      </tr>
    `;
  }


  // 初始化销售管理首页。
  function initIndexPage() {
    const tbody = document.getElementById('order-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const data = store.sync();
    renderers.stats([
      { icon: '💰', value: formatMoney(data.orders.reduce((sum, item) => sum + item.amount, 0)), label: '本月销售额' },
      { icon: '📋', value: data.orders.length, label: '订单总数' },
      { icon: '✅', value: data.orders.filter((item) => item.status === '已完成').length, label: '已完成订单' },
      { icon: '⭐', value: data.customers.filter((item) => item.level === 'VIP').length, label: 'VIP客户' }
    ]);

    view.renderRows(tbody, data.orders.slice(0, 5), renderSalesIndexRow, { colspan: 5, text: '暂无销售订单' });

    tbody.dataset.bound = '1';
  }

  // 初始化客户管理页。
  function initCustomerPage() {
    const tbody = document.getElementById('customer-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render(list) {
      const customers = store.sync().customers;
      renderers.stats([
        { icon: '🤝', value: customers.length, label: '客户总数' },
        { icon: '⭐', value: customers.filter((item) => item.level === 'VIP').length, label: 'VIP客户' },
        { icon: '💰', value: formatMoney(customers.reduce((sum, item) => sum + item.totalAmount, 0)), label: '累计销售额' }
      ]);

      view.renderRows(tbody, list, renderCustomerRow, { colspan: 8, text: '暂无客户' });
    }

    function refresh() {
      const keyword = view.getTrimmedValue('search-input');
      const list = view.filterByKeyword(store.sync().customers, keyword, ['name', 'contact']);
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'name', label: '客户名称', required: true },
        { name: 'contact', label: '联系人', defaultValue: '销售负责人' },
        { name: 'phone', label: '联系电话', defaultValue: '13900009999' },
        { name: 'city', label: '所在城市', defaultValue: '北京' },
        { name: 'level', label: '客户等级（VIP/重要/普通）', defaultValue: '普通' }
      ]);
      if (!payload) return;

      actions.createCustomer(payload);
      refresh();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      view.confirmDelete('确认删除该客户？', () => actions.deleteCustomer(this.dataset.id), refresh);
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  // 初始化销售订单页。
  function initOrderPage() {
    const tbody = document.getElementById('order-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render(list) {
      const orders = store.sync().orders;
      renderers.stats([
        { icon: '📋', value: orders.length, label: '订单总数' },
        { icon: '💰', value: formatMoney(orders.reduce((sum, item) => sum + item.amount, 0)), label: '订单总额' },
        { icon: '✅', value: orders.filter((item) => item.status === '已完成').length, label: '已完成' }
      ]);

      view.renderRows(tbody, list, renderOrderRow, { colspan: 9, text: '暂无销售订单' });
    }

    function refresh() {
      const keyword = view.getTrimmedValue('search-input');
      const status = view.getValue('status-filter');
      const list = view.filterByKeyword(store.sync().orders, keyword, ['customerName', 'product'])
        .filter((item) => !status || item.status === status);
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('status-filter'), 'change', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'customerName', label: '客户名称', required: true },
        { name: 'product', label: '产品名称', required: true },
        { name: 'quantity', label: '数量', defaultValue: '10' },
        { name: 'unitPrice', label: '单价', defaultValue: '1000' },
        { name: 'status', label: '状态（待审核/待发货/配送中/已完成）', defaultValue: '待审核' }
      ]);
      if (!payload) return;

      actions.createOrder(payload);
      refresh();
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  // 初始化价格策略页。
  function initPricingPage() {
    const tbody = document.getElementById('pricing-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render() {
      view.renderRows(tbody, store.sync().pricing, renderPricingRow, { colspan: 7, text: '暂无价格策略' });
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'product', label: '产品名称', required: true },
        { name: 'standardPrice', label: '标准价', defaultValue: '1000' },
        { name: 'currentPrice', label: '执行价', defaultValue: '900' }
      ]);
      if (!payload) return;

      actions.createPricing(payload);
      render();
    });

    tbody.dataset.bound = '1';
    render();
  }

  // 初始化销售报表页。
  function initReportPage() {
    const tbody = document.getElementById('report-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const monthly = store.sync().report.monthly || [];
    const totalRevenue = monthly.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = monthly.reduce((sum, item) => sum + item.orders, 0);
    const maxRevenue = Math.max.apply(null, monthly.map((item) => item.revenue).concat([0]));

    renderers.stats([
      { icon: '💰', value: formatMoney(totalRevenue), label: '6个月总销售额' },
      { icon: '📋', value: totalOrders, label: '6个月总订单数' },
      { icon: '📈', value: formatMoney(maxRevenue), label: '单月最高销售额' }
    ]);

    view.renderRows(tbody, monthly, renderMonthlyReportRow(maxRevenue), { colspan: 5, text: '暂无销售报表' });

    tbody.dataset.bound = '1';
  }

  // 初始化销售团队页。
  function initTeamPage() {
    const tbody = document.getElementById('team-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const team = store.sync().team;
    const totalTarget = team.reduce((sum, item) => sum + item.target, 0);
    const totalAchieved = team.reduce((sum, item) => sum + item.achieved, 0);
    const avgRate = totalTarget ? ((totalAchieved / totalTarget) * 100).toFixed(1) : '0.0';

    renderers.stats([
      { icon: '👥', value: team.length, label: '团队人数' },
      { icon: '🎯', value: formatMoney(totalTarget), label: '团队目标' },
      { icon: '💰', value: formatMoney(totalAchieved), label: '已完成' },
      { icon: '📊', value: avgRate + '%', label: '平均完成率' }
    ]);

    view.renderRows(tbody, team, renderTeamRow, { colspan: 7, text: '暂无销售团队数据' });

    tbody.dataset.bound = '1';
  }

  // 按当前销售管理子页面分发初始化逻辑。
  function init() {
    switch (view.pageName()) {
      case 'index.html':
        if (document.getElementById('order-tbody')) initIndexPage();
        break;
      case 'customer.html':
        initCustomerPage();
        break;
      case 'order.html':
        initOrderPage();
        break;
      case 'pricing.html':
        initPricingPage();
        break;
      case 'report.html':
        initReportPage();
        break;
      case 'team.html':
        initTeamPage();
        break;
      default:
        break;
    }
  }

  return {
    init
  };
})(salesSystem.store, salesSystem.actions, salesSystem.renderers, EnterpriseView);

// 对外暴露销售管理初始化入口，供 modules/sales.js 调用。
salesSystem.init = function() {
  try {
    salesSystem.pages.init();
  } catch (error) {
    console.error('salesSystem.init failed:', error);
  }
};

// 对外暴露销售管理状态快照，供调试和兼容 API 使用。
salesSystem.getState = function() {
  return salesSystem.store.snapshot();
};

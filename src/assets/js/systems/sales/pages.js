'use strict';

window.salesSystem = window.salesSystem || {};

salesSystem.pages = (function(store, actions, renderers, view) {
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

    tbody.innerHTML = data.orders.slice(0, 5).map((item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.customerName}</td>
        <td>${item.product}</td>
        <td><strong>${formatMoney(item.amount)}</strong></td>
        <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

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

      tbody.innerHTML = list.map((item) => `
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
      `).join('');
    }

    function refresh() {
      const keyword = ((document.getElementById('search-input') || {}).value || '').trim().toLowerCase();
      const list = store.sync().customers.filter((item) => {
        const text = `${item.name} ${item.contact}`.toLowerCase();
        return !keyword || text.includes(keyword);
      });
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const name = window.prompt('客户名称');
      if (!name) return;

      actions.createCustomer({
        name,
        contact: window.prompt('联系人', '销售负责人') || '销售负责人',
        phone: window.prompt('联系电话', '13900009999') || '13900009999',
        city: window.prompt('所在城市', '北京') || '北京',
        level: window.prompt('客户等级（VIP/重要/普通）', '普通') || '普通'
      });
      refresh();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      if (window.confirm('确认删除该客户？')) {
        actions.deleteCustomer(this.dataset.id);
        refresh();
      }
    });

    tbody.dataset.bound = '1';
    refresh();
  }

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

      tbody.innerHTML = list.map((item) => `
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
      `).join('');
    }

    function refresh() {
      const keyword = ((document.getElementById('search-input') || {}).value || '').trim().toLowerCase();
      const status = (document.getElementById('status-filter') || {}).value || '';
      const list = store.sync().orders.filter((item) => {
        const text = `${item.customerName} ${item.product}`.toLowerCase();
        return (!keyword || text.includes(keyword)) && (!status || item.status === status);
      });
      render(list);
    }

    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('status-filter'), 'change', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const customerName = window.prompt('客户名称');
      const product = window.prompt('产品名称');
      if (!customerName || !product) return;

      actions.createOrder({
        customerName,
        product,
        quantity: window.prompt('数量', '10') || '10',
        unitPrice: window.prompt('单价', '1000') || '1000',
        status: window.prompt('状态（待审核/待发货/配送中/已完成）', '待审核') || '待审核'
      });
      refresh();
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  function initPricingPage() {
    const tbody = document.getElementById('pricing-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render() {
      tbody.innerHTML = store.sync().pricing.map((item) => `
        <tr>
          <td>${item.id}</td>
          <td><strong>${item.product}</strong></td>
          <td>${formatMoney(item.standardPrice)}</td>
          <td><strong style="color:var(--color-primary)">${formatMoney(item.currentPrice)}</strong></td>
          <td>${item.discount < 1 ? `<span class="badge badge-warning">${(item.discount * 10).toFixed(1)}折</span>` : '—'}</td>
          <td>${item.validFrom} ~ ${item.validTo}</td>
          <td><span class="badge badge-success">${item.status}</span></td>
        </tr>
      `).join('');
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const product = window.prompt('产品名称');
      if (!product) return;

      actions.createPricing({
        product,
        standardPrice: window.prompt('标准价', '1000') || '1000',
        currentPrice: window.prompt('执行价', '900') || '900'
      });
      render();
    });

    tbody.dataset.bound = '1';
    render();
  }

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

    tbody.innerHTML = monthly.map((item) => {
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
    }).join('');

    tbody.dataset.bound = '1';
  }

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

    tbody.innerHTML = team.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.role}</td>
        <td>${item.region}</td>
        <td>${formatMoney(item.target)}</td>
        <td>${formatMoney(item.achieved)}</td>
        <td>${(item.rate * 100).toFixed(1)}%</td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

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

salesSystem.init = function() {
  try {
    salesSystem.pages.init();
  } catch (error) {
    console.error('salesSystem.init failed:', error);
  }
};

salesSystem.getState = function() {
  return salesSystem.store.snapshot();
};

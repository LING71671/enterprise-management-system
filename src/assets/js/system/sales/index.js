'use strict';

// 销售管理主页逻辑
let headerLoaded = false;
let sidebarLoaded = false;

function tryInitMobileNav() {
  if (headerLoaded && sidebarLoaded) {
    if (typeof MobileNav !== 'undefined') MobileNav.init();
  }
}

fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
  headerLoaded = true;
  tryInitMobileNav();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
  sidebarLoaded = true;
  tryInitMobileNav();
});

const { customers, orders, report } = salesData;
const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
const done = orders.filter(o => o.status === '已完成').length;
const vip = customers.filter(c => c.level === 'VIP').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalRevenue)}</div><div class="stat-label">本月销售额</div></div></div>
  <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${orders.length}</div><div class="stat-label">订单总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${done}</div><div class="stat-label">已完成订单</div></div></div>
  <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-info"><div class="stat-value">${vip}</div><div class="stat-label">VIP客户</div></div></div>
`;

const statusMap = { '已完成': 'badge-success', '配送中': 'badge-info', '待发货': 'badge-warning', '待审核': 'badge-default' };
document.getElementById('order-tbody').innerHTML = orders.slice(0, 5).map(o => `
  <tr>
    <td>${o.id}</td>
    <td>${o.customerName}</td>
    <td>${o.product}</td>
    <td><strong>${formatMoney(o.amount)}</strong></td>
    <td><span class="badge ${statusMap[o.status] || 'badge-default'}">${o.status}</span></td>
  </tr>
`).join('');

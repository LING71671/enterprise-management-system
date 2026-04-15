'use strict';

// 采购管理主页逻辑
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

const { suppliers, orders, analysis } = purchaseData;
const totalAmount = orders.reduce((s, o) => s + o.amount, 0);
const delivered = orders.filter(o => o.status === '已到货').length;
const activeSuppliers = suppliers.filter(s => s.status === '合作中').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🤝</div><div class="stat-info"><div class="stat-value">${activeSuppliers}</div><div class="stat-label">合作供应商</div></div></div>
  <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${orders.length}</div><div class="stat-label">采购订单</div></div></div>
  <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalAmount)}</div><div class="stat-label">采购总额</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${delivered}</div><div class="stat-label">已到货</div></div></div>
`;

const statusMap = { '已到货': 'badge-success', '运输中': 'badge-info', '待发货': 'badge-warning', '待审核': 'badge-default' };
document.getElementById('order-tbody').innerHTML = orders.map(o => `
  <tr>
    <td>${o.id}</td>
    <td>${o.supplierName}</td>
    <td><strong>${o.item}</strong></td>
    <td><strong>${formatMoney(o.amount)}</strong></td>
    <td>${o.deliveryDate}</td>
    <td><span class="badge ${statusMap[o.status] || 'badge-default'}">${o.status}</span></td>
  </tr>
`).join('');

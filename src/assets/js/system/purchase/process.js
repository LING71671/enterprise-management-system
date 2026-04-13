'use strict';

// 采购流程页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const orders = purchaseData.orders;
const statusMap = { '已到货': 'badge-success', '运输中': 'badge-info', '待发货': 'badge-warning', '待审核': 'badge-default' };
const totalAmount = orders.reduce((s, o) => s + o.amount, 0);
const delivered = orders.filter(o => o.status === '已到货').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${orders.length}</div><div class="stat-label">订单总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalAmount)}</div><div class="stat-label">采购总额</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${delivered}</div><div class="stat-label">已到货</div></div></div>
`;

function renderTable(list) {
  document.getElementById('order-tbody').innerHTML = list.map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${o.supplierName}</td>
      <td><strong>${o.item}</strong></td>
      <td>${o.quantity} ${o.unit}</td>
      <td>${formatMoney(o.unitPrice)}</td>
      <td><strong>${formatMoney(o.amount)}</strong></td>
      <td>${o.createDate}</td>
      <td>${o.deliveryDate}</td>
      <td><span class="badge ${statusMap[o.status] || 'badge-default'}">${o.status}</span></td>
    </tr>
  `).join('');
}

function filterAndRender() {
  const kw = document.getElementById('search-input').value.trim().toLowerCase();
  const status = document.getElementById('status-filter').value;
  renderTable(orders.filter(o =>
    (!kw || o.supplierName.includes(kw) || o.item.includes(kw)) &&
    (!status || o.status === status)
  ));
}

document.getElementById('search-input').addEventListener('input', filterAndRender);
document.getElementById('status-filter').addEventListener('change', filterAndRender);
document.getElementById('add-btn').onclick = () => alert('新建采购单功能待实现');
renderTable(orders);

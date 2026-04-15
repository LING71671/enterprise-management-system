'use strict';

// 生产订单页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const orders = productionData.orders;
const statusMap = { '已完成': 'badge-success', '生产中': 'badge-info', '待生产': 'badge-warning', '待审核': 'badge-default' };

const done = orders.filter(o => o.status === '已完成').length;
const inProd = orders.filter(o => o.status === '生产中').length;
document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${orders.length}</div><div class="stat-label">订单总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚡</div><div class="stat-info"><div class="stat-value">${inProd}</div><div class="stat-label">生产中</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${done}</div><div class="stat-label">已完成</div></div></div>
`;

function renderTable(list) {
  document.getElementById('order-tbody').innerHTML = list.map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${o.customer}</td>
      <td><strong>${o.product}</strong></td>
      <td>${o.quantity}</td>
      <td>${o.createDate}</td>
      <td>${o.deliveryDate}</td>
      <td><span class="badge ${statusMap[o.status] || 'badge-default'}">${o.status}</span></td>
    </tr>
  `).join('');
}

document.getElementById('search-input').addEventListener('input', function () {
  const kw = this.value.trim().toLowerCase();
  renderTable(orders.filter(o => !kw || o.customer.includes(kw) || o.product.includes(kw)));
});

renderTable(orders);

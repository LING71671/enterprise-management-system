'use strict';

// 订单跟踪页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const orders = purchaseData.orders;
const today = new Date();
const statusMap = { '已到货': 'badge-success', '运输中': 'badge-info', '待发货': 'badge-warning', '待审核': 'badge-default' };

const inTransit = orders.filter(o => o.status === '运输中').length;
const pending = orders.filter(o => o.status === '待发货' || o.status === '待审核').length;
const delivered = orders.filter(o => o.status === '已到货').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🚚</div><div class="stat-info"><div class="stat-value">${inTransit}</div><div class="stat-label">运输中</div></div></div>
  <div class="stat-card"><div class="stat-icon">⏳</div><div class="stat-info"><div class="stat-value">${pending}</div><div class="stat-label">待发货/待审核</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${delivered}</div><div class="stat-label">已到货</div></div></div>
`;

document.getElementById('tracking-tbody').innerHTML = orders.map(o => {
  const deliveryDate = new Date(o.deliveryDate);
  const daysLeft = Math.ceil((deliveryDate - today) / (1000 * 60 * 60 * 24));
  const daysDisplay = o.status === '已到货' ? '—' :
    daysLeft < 0 ? `<span style="color:var(--color-danger);font-weight:600">已逾期 ${Math.abs(daysLeft)} 天</span>` :
    daysLeft <= 3 ? `<span style="color:var(--color-warning);font-weight:600">${daysLeft} 天</span>` :
    `${daysLeft} 天`;
  return `
    <tr>
      <td>${o.id}</td>
      <td>${o.supplierName}</td>
      <td><strong>${o.item}</strong></td>
      <td>${o.quantity} ${o.unit}</td>
      <td>${o.deliveryDate}</td>
      <td>${daysDisplay}</td>
      <td><span class="badge ${statusMap[o.status] || 'badge-default'}">${o.status}</span></td>
    </tr>
  `;
}).join('');

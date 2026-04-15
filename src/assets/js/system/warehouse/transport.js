'use strict';

// 运输跟踪页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const { inbound, outbound } = warehouseData;
const today = new Date();
const totalOutQty = outbound.reduce((s, o) => s + o.quantity, 0);
const totalInQty = inbound.reduce((s, i) => s + i.quantity, 0);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📤</div><div class="stat-info"><div class="stat-value">${outbound.length}</div><div class="stat-label">出库单数</div></div></div>
  <div class="stat-card"><div class="stat-icon">🚚</div><div class="stat-info"><div class="stat-value">${totalOutQty}</div><div class="stat-label">出库总量</div></div></div>
  <div class="stat-card"><div class="stat-icon">📥</div><div class="stat-info"><div class="stat-value">${inbound.length}</div><div class="stat-label">入库单数</div></div></div>
  <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value">${totalInQty}</div><div class="stat-label">入库总量</div></div></div>
`;

document.getElementById('transport-tbody').innerHTML = outbound.map(o => {
  const outDate = new Date(o.date);
  const daysSince = Math.ceil((today - outDate) / (1000 * 60 * 60 * 24));
  const daysIcon = daysSince < 0 ? `<span class="badge badge-info">计划中 (${Math.abs(daysSince)}天后)</span>` :
    daysSince === 0 ? '<span class="badge badge-warning">今日</span>' :
    `<span class="badge badge-default">${daysSince} 天前</span>`;
  return `
    <tr>
      <td>${o.id}</td>
      <td><strong>${o.item}</strong></td>
      <td>${o.quantity} ${o.unit}</td>
      <td>${o.customer}</td>
      <td>${o.date}</td>
      <td>${o.operator}</td>
      <td>${daysIcon}</td>
    </tr>
  `;
}).join('');

document.getElementById('source-tbody').innerHTML = inbound.map(i => `
  <tr>
    <td>${i.id}</td>
    <td><strong>${i.item}</strong></td>
    <td>${i.quantity} ${i.unit}</td>
    <td>${i.supplier}</td>
    <td>${i.date}</td>
    <td>${i.operator}</td>
  </tr>
`).join('');

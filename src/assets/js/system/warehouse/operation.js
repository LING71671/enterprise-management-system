'use strict';

// 基本操作页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const { inbound, outbound } = warehouseData;
const inTotal = inbound.reduce((s, i) => s + i.quantity, 0);
const outTotal = outbound.reduce((s, o) => s + o.quantity, 0);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📥</div><div class="stat-info"><div class="stat-value">${inbound.length}</div><div class="stat-label">入库单数</div></div></div>
  <div class="stat-card"><div class="stat-icon">📤</div><div class="stat-info"><div class="stat-value">${outbound.length}</div><div class="stat-label">出库单数</div></div></div>
  <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value">${inTotal}</div><div class="stat-label">入库总量</div></div></div>
  <div class="stat-card"><div class="stat-icon">🚚</div><div class="stat-info"><div class="stat-value">${outTotal}</div><div class="stat-label">出库总量</div></div></div>
`;

document.getElementById('inbound-tbody').innerHTML = inbound.map(i => `
  <tr>
    <td>${i.id}</td>
    <td><strong>${i.item}</strong></td>
    <td>${i.quantity} ${i.unit}</td>
    <td>${i.supplier}</td>
    <td>${i.date}</td>
    <td>${i.operator}</td>
  </tr>
`).join('');

document.getElementById('outbound-tbody').innerHTML = outbound.map(o => `
  <tr>
    <td>${o.id}</td>
    <td><strong>${o.item}</strong></td>
    <td>${o.quantity} ${o.unit}</td>
    <td>${o.customer}</td>
    <td>${o.date}</td>
    <td>${o.operator}</td>
  </tr>
`).join('');

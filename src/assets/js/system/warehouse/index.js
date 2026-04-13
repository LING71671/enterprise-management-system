'use strict';

// 仓储管理主页逻辑
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

const { inventory, inbound, outbound, locations } = warehouseData;
const totalItems = inventory.length;
const lowStock = inventory.filter(i => i.stock < i.minStock).length;
const totalInbound = inbound.length;
const totalOutbound = outbound.length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value">${totalItems}</div><div class="stat-label">库存品类</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-info"><div class="stat-value">${lowStock}</div><div class="stat-label">库存预警</div></div></div>
  <div class="stat-card"><div class="stat-icon">📥</div><div class="stat-info"><div class="stat-value">${totalInbound}</div><div class="stat-label">近期入库</div></div></div>
  <div class="stat-card"><div class="stat-icon">📤</div><div class="stat-info"><div class="stat-value">${totalOutbound}</div><div class="stat-label">近期出库</div></div></div>
`;

document.getElementById('inventory-tbody').innerHTML = inventory.map(i => {
  const isLow = i.stock < i.minStock;
  const statusClass = isLow ? 'badge-danger' : 'badge-success';
  const statusText = isLow ? '库存不足' : '正常';
  return `
    <tr>
      <td>${i.id}</td>
      <td><strong>${i.name}</strong></td>
      <td>${i.category}</td>
      <td>${i.location}</td>
      <td>${isLow ? `<span style="color:var(--color-danger);font-weight:600">${i.stock}</span>` : i.stock} ${i.unit}</td>
      <td>${i.minStock} ${i.unit}</td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
    </tr>
  `;
}).join('');

'use strict';

// 货位管理页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const { locations, inventory } = warehouseData;
const totalCap = locations.reduce((s, l) => s + l.capacity, 0);
const totalUsed = locations.reduce((s, l) => s + l.used, 0);
const avgUsage = ((totalUsed / totalCap) * 100).toFixed(1);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🗺️</div><div class="stat-info"><div class="stat-value">${locations.length}</div><div class="stat-label">货位数量</div></div></div>
  <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value">${totalCap}</div><div class="stat-label">总容量</div></div></div>
  <div class="stat-card"><div class="stat-icon">📊</div><div class="stat-info"><div class="stat-value">${avgUsage}%</div><div class="stat-label">平均使用率</div></div></div>
`;

document.getElementById('layout-tbody').innerHTML = locations.map(l => {
  const usage = ((l.used / l.capacity) * 100).toFixed(1);
  const color = usage >= 90 ? 'var(--color-danger)' : usage >= 60 ? 'var(--color-warning)' : 'var(--color-success)';
  return `
    <tr>
      <td>${l.id}</td>
      <td><strong>${l.code}</strong></td>
      <td>${l.zone}</td>
      <td>${l.type}</td>
      <td>${l.capacity}</td>
      <td>${l.used}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
            <div style="width:${usage}%;height:100%;background:${color};border-radius:4px"></div>
          </div>
          <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:40px">${usage}%</span>
        </div>
      </td>
      <td><span class="badge badge-success">${l.status}</span></td>
    </tr>
  `;
}).join('');

document.getElementById('detail-tbody').innerHTML = inventory.map(i => `
  <tr>
    <td>${i.id}</td>
    <td><strong>${i.name}</strong></td>
    <td>${i.category}</td>
    <td>${i.spec}</td>
    <td>${i.location}</td>
    <td>${i.stock} ${i.unit}</td>
    <td>${i.lastUpdate}</td>
  </tr>
`).join('');

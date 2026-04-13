'use strict';

// 库存预警页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const inventory = warehouseData.inventory;
const lowItems = inventory.filter(i => i.stock < i.minStock);
const normalItems = inventory.filter(i => i.stock >= i.minStock);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value">${inventory.length}</div><div class="stat-label">库存品类</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-info"><div class="stat-value" style="color:var(--color-danger)">${lowItems.length}</div><div class="stat-label">预警品类</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${normalItems.length}</div><div class="stat-label">库存正常</div></div></div>
`;

// 预警列表
document.getElementById('warning-tbody').innerHTML = lowItems.length === 0
  ? '<tr><td colspan="8" style="text-align:center;color:var(--color-text-secondary);padding:var(--spacing-xl)">🎉 暂无库存预警</td></tr>'
  : lowItems.map(i => {
    const gap = i.minStock - i.stock;
    const ratio = i.stock / i.minStock;
    const urgency = ratio < 0.5 ? '紧急' : '一般';
    const urgencyClass = ratio < 0.5 ? 'badge-danger' : 'badge-warning';
    return `
      <tr>
        <td>${i.id}</td>
        <td><strong>${i.name}</strong></td>
        <td>${i.category}</td>
        <td>${i.spec}</td>
        <td><span style="color:var(--color-danger);font-weight:600">${i.stock} ${i.unit}</span></td>
        <td>${i.minStock} ${i.unit}</td>
        <td><span style="color:var(--color-danger);font-weight:600">${gap} ${i.unit}</span></td>
        <td><span class="badge ${urgencyClass}">${urgency}</span></td>
      </tr>
    `;
  }).join('');

// 正常列表
document.getElementById('normal-tbody').innerHTML = normalItems.map(i => {
  const ratio = ((i.stock / i.minStock) * 100).toFixed(0);
  return `
    <tr>
      <td>${i.id}</td>
      <td><strong>${i.name}</strong></td>
      <td>${i.category}</td>
      <td>${i.stock} ${i.unit}</td>
      <td>${i.minStock} ${i.unit}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
            <div style="width:${Math.min(ratio, 100)}%;height:100%;background:var(--color-success);border-radius:4px"></div>
          </div>
          <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:40px">${ratio}%</span>
        </div>
      </td>
    </tr>
  `;
}).join('');

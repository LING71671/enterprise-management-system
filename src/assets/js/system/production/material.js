'use strict';

// 物料需求页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const materials = productionData.materials;
const shortage = materials.filter(m => m.shortage > 0).length;
const sufficient = materials.filter(m => m.shortage === 0).length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value">${materials.length}</div><div class="stat-label">物料种类</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${sufficient}</div><div class="stat-label">库存充足</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-info"><div class="stat-value">${shortage}</div><div class="stat-label">库存短缺</div></div></div>
`;

document.getElementById('material-tbody').innerHTML = materials.map(m => `
  <tr>
    <td>${m.id}</td>
    <td><strong>${m.name}</strong></td>
    <td>${m.spec}</td>
    <td>${m.unit}</td>
    <td>${m.required}</td>
    <td>${m.stock}</td>
    <td>${m.shortage > 0 ? `<span style="color:var(--color-danger);font-weight:600">${m.shortage}</span>` : '—'}</td>
    <td><span class="badge ${m.shortage > 0 ? 'badge-danger' : 'badge-success'}">${m.shortage > 0 ? '短缺' : '充足'}</span></td>
  </tr>
`).join('');

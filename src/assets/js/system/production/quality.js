'use strict';

// 质量管理页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const records = productionData.qualityRecords;
const passed = records.filter(r => r.result === '合格').length;
const failed = records.filter(r => r.result === '不合格').length;
const passRate = ((passed / records.length) * 100).toFixed(1);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🔍</div><div class="stat-info"><div class="stat-value">${records.length}</div><div class="stat-label">质检总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${passed}</div><div class="stat-label">合格</div></div></div>
  <div class="stat-card"><div class="stat-icon">❌</div><div class="stat-info"><div class="stat-value">${failed}</div><div class="stat-label">不合格</div></div></div>
  <div class="stat-card"><div class="stat-icon">📊</div><div class="stat-info"><div class="stat-value">${passRate}%</div><div class="stat-label">合格率</div></div></div>
`;

document.getElementById('quality-tbody').innerHTML = records.map(r => `
  <tr>
    <td>${r.id}</td>
    <td>${r.orderId}</td>
    <td>${r.inspector}</td>
    <td>${r.date}</td>
    <td>${r.defects > 0 ? `<span style="color:var(--color-danger)">${r.defects}</span>` : '0'}</td>
    <td><span class="badge ${r.result === '合格' ? 'badge-success' : 'badge-danger'}">${r.result}</span></td>
  </tr>
`).join('');

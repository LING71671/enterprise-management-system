'use strict';

// 故障记录页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

let list = [...equipmentData.faults];
const severityMap = { '严重': 'badge-danger', '一般': 'badge-warning', '轻微': 'badge-info' };
const statusMap = { '维修中': 'badge-warning', '待处理': 'badge-danger', '已解决': 'badge-success' };

function renderStats() {
  const unresolved = list.filter(f => f.status !== '已解决').length;
  const severe = list.filter(f => f.severity === '严重').length;
  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">故障总数</div></div></div>
    <div class="stat-card"><div class="stat-icon">🔴</div><div class="stat-info"><div class="stat-value">${unresolved}</div><div class="stat-label">未解决</div></div></div>
    <div class="stat-card"><div class="stat-icon">🚨</div><div class="stat-info"><div class="stat-value">${severe}</div><div class="stat-label">严重故障</div></div></div>
  `;
}

function renderTable() {
  document.getElementById('fault-tbody').innerHTML = list.map(f => `
    <tr>
      <td>${f.id}</td>
      <td><strong>${f.equipName}</strong></td>
      <td>${f.faultDate}</td>
      <td style="max-width:260px;color:var(--color-text-secondary)">${f.description}</td>
      <td><span class="badge ${severityMap[f.severity] || 'badge-default'}">${f.severity}</span></td>
      <td>${f.handler}</td>
      <td><span class="badge ${statusMap[f.status] || 'badge-default'}">${f.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${f.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteItem(id) {
  if (!confirm('确认删除该故障记录？')) return;
  list = list.filter(f => f.id !== id);
  renderStats();
  renderTable();
}

document.getElementById('add-btn').onclick = () => alert('报告故障功能待实现');
renderStats();
renderTable();

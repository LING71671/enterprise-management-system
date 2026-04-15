'use strict';

// 维护计划页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

let list = [...equipmentData.maintenance];
const statusMap = { '待执行': 'badge-warning', '进行中': 'badge-info', '已完成': 'badge-success' };

function renderStats() {
  const pending = list.filter(m => m.status === '待执行').length;
  const inProgress = list.filter(m => m.status === '进行中').length;
  const totalCost = list.reduce((s, m) => s + m.cost, 0);
  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">维护计划总数</div></div></div>
    <div class="stat-card"><div class="stat-icon">⏳</div><div class="stat-info"><div class="stat-value">${pending}</div><div class="stat-label">待执行</div></div></div>
    <div class="stat-card"><div class="stat-icon">🔧</div><div class="stat-info"><div class="stat-value">${inProgress}</div><div class="stat-label">进行中</div></div></div>
    <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalCost)}</div><div class="stat-label">预估总费用</div></div></div>
  `;
}

function renderTable() {
  document.getElementById('maintenance-tbody').innerHTML = list.map(m => `
    <tr>
      <td>${m.id}</td>
      <td><strong>${m.equipName}</strong></td>
      <td>${m.type}</td>
      <td>${m.planDate}</td>
      <td>${m.technician}</td>
      <td>${formatMoney(m.cost)}</td>
      <td><span class="badge ${statusMap[m.status] || 'badge-default'}">${m.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${m.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteItem(id) {
  if (!confirm('确认删除该维护计划？')) return;
  list = list.filter(m => m.id !== id);
  renderStats();
  renderTable();
}

document.getElementById('add-btn').onclick = () => alert('新建维护计划功能待实现');
renderStats();
renderTable();

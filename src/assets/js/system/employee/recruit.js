'use strict';

// 招聘培训页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

let list = [...employeeData.recruitment];

const statusMap = { '招聘中': 'badge-success', '已完成': 'badge-info', '待发布': 'badge-default' };

function renderStats() {
  const active = list.filter(r => r.status === '招聘中').length;
  const total = list.reduce((s, r) => s + r.headcount, 0);
  const applicants = list.reduce((s, r) => s + r.applicants, 0);
  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">招聘计划</div></div></div>
    <div class="stat-card"><div class="stat-icon">🟢</div><div class="stat-info"><div class="stat-value">${active}</div><div class="stat-label">招聘中</div></div></div>
    <div class="stat-card"><div class="stat-icon">👤</div><div class="stat-info"><div class="stat-value">${total}</div><div class="stat-label">招聘总人数</div></div></div>
    <div class="stat-card"><div class="stat-icon">📨</div><div class="stat-info"><div class="stat-value">${applicants}</div><div class="stat-label">总投递数</div></div></div>
  `;
}

function renderTable() {
  document.getElementById('recruit-tbody').innerHTML = list.map(r => `
    <tr>
      <td>${r.id}</td>
      <td><strong>${r.position}</strong></td>
      <td>${r.dept}</td>
      <td>${r.headcount} 人</td>
      <td>${r.publishDate}</td>
      <td>${r.deadline}</td>
      <td>${r.applicants}</td>
      <td><span class="badge ${statusMap[r.status] || 'badge-default'}">${r.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${r.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteItem(id) {
  if (!confirm('确认删除该招聘计划？')) return;
  list = list.filter(r => r.id !== id);
  renderStats();
  renderTable();
}

document.getElementById('add-btn').onclick = () => alert('发布职位功能待实现');

renderStats();
renderTable();

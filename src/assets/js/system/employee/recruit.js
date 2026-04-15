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

// 渲染表格 - 使用 DOM API 避免 XSS
function renderTable() {
  const tbody = document.getElementById('recruit-tbody');
  tbody.innerHTML = '';

  list.forEach(r => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = r.id;
    tr.appendChild(tdId);

    const tdPosition = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = r.position;
    tdPosition.appendChild(strong);
    tr.appendChild(tdPosition);

    const tdDept = document.createElement('td');
    tdDept.textContent = r.dept;
    tr.appendChild(tdDept);

    const tdHeadcount = document.createElement('td');
    tdHeadcount.textContent = r.headcount + ' 人';
    tr.appendChild(tdHeadcount);

    const tdPublishDate = document.createElement('td');
    tdPublishDate.textContent = r.publishDate;
    tr.appendChild(tdPublishDate);

    const tdDeadline = document.createElement('td');
    tdDeadline.textContent = r.deadline;
    tr.appendChild(tdDeadline);

    const tdApplicants = document.createElement('td');
    tdApplicants.textContent = r.applicants;
    tr.appendChild(tdApplicants);

    const tdStatus = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge ${statusMap[r.status] || 'badge-default'}`;
    badge.textContent = r.status;
    tdStatus.appendChild(badge);
    tr.appendChild(tdStatus);

    const tdAction = document.createElement('td');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'table-actions';
    const btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.textContent = '删除';
    btn.setAttribute('data-id', r.id);
    actionsDiv.appendChild(btn);
    tdAction.appendChild(actionsDiv);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
}

// 事件委托监听表格点击
document.getElementById('recruit-tbody').addEventListener('click', function(e) {
  const btn = e.target.closest('[data-id]');
  if (btn) {
    const id = btn.getAttribute('data-id');
    deleteItem(id);
  }
});

function deleteItem(id) {
  if (!confirm('确认删除该招聘计划？')) return;
  list = list.filter(r => r.id !== id);
  renderStats();
  renderTable();
}

document.getElementById('add-btn').onclick = () => alert('发布职位功能待实现');

renderStats();
renderTable();

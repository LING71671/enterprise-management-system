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

// 渲染表格 - 使用 DOM API 避免 XSS
function renderTable() {
  const tbody = document.getElementById('fault-tbody');
  tbody.innerHTML = '';

  list.forEach(f => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = f.id;
    tr.appendChild(tdId);

    const tdEquipName = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = f.equipName;
    tdEquipName.appendChild(strong);
    tr.appendChild(tdEquipName);

    const tdFaultDate = document.createElement('td');
    tdFaultDate.textContent = f.faultDate;
    tr.appendChild(tdFaultDate);

    const tdDescription = document.createElement('td');
    tdDescription.style.maxWidth = '260px';
    tdDescription.style.color = 'var(--color-text-secondary)';
    tdDescription.textContent = f.description;
    tr.appendChild(tdDescription);

    const tdSeverity = document.createElement('td');
    const severityBadge = document.createElement('span');
    severityBadge.className = `badge ${severityMap[f.severity] || 'badge-default'}`;
    severityBadge.textContent = f.severity;
    tdSeverity.appendChild(severityBadge);
    tr.appendChild(tdSeverity);

    const tdHandler = document.createElement('td');
    tdHandler.textContent = f.handler;
    tr.appendChild(tdHandler);

    const tdStatus = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = `badge ${statusMap[f.status] || 'badge-default'}`;
    statusBadge.textContent = f.status;
    tdStatus.appendChild(statusBadge);
    tr.appendChild(tdStatus);

    const tdAction = document.createElement('td');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'table-actions';
    const btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm btn-delete';
    btn.textContent = '删除';
    btn.setAttribute('data-id', f.id);
    actionsDiv.appendChild(btn);
    tdAction.appendChild(actionsDiv);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
}

// 事件委托监听表格点击
document.getElementById('fault-tbody').addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-delete');
  if (btn) {
    const id = btn.getAttribute('data-id');
    deleteItem(id);
  }
});

function deleteItem(id) {
  if (!confirm('确认删除该故障记录？')) return;
  list = list.filter(f => f.id !== id);
  renderStats();
  renderTable();
}

document.getElementById('add-btn').onclick = () => alert('报告故障功能待实现');
renderStats();
renderTable();

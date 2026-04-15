'use strict';

// 供应商信息页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

let list = [...purchaseData.suppliers];
const active = list.filter(s => s.status === '合作中').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🤝</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">供应商总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${active}</div><div class="stat-label">合作中</div></div></div>
  <div class="stat-card"><div class="stat-icon">⏸️</div><div class="stat-info"><div class="stat-value">${list.length - active}</div><div class="stat-label">已暂停</div></div></div>
`;

function renderStars(rating) {
  return '⭐'.repeat(rating) + '<span style="color:var(--color-text-secondary)">' + '☆'.repeat(5 - rating) + '</span>';
}

function renderTable(data) {
  const statusMap = { '合作中': 'badge-success', '暂停': 'badge-warning' };
  document.getElementById('supplier-tbody').innerHTML = data.map(s => `
    <tr>
      <td>${s.id}</td>
      <td><strong>${s.name}</strong></td>
      <td>${s.contact}</td>
      <td>${s.phone}</td>
      <td>${s.category}</td>
      <td>${renderStars(s.rating)}</td>
      <td><span class="badge ${statusMap[s.status] || 'badge-default'}">${s.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${s.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteItem(id) {
  if (!confirm('确认删除该供应商？')) return;
  list = list.filter(s => s.id !== id);
  renderTable(list);
}

document.getElementById('search-input').addEventListener('input', function () {
  const kw = this.value.trim().toLowerCase();
  renderTable(list.filter(s => !kw || s.name.includes(kw) || s.contact.includes(kw)));
});

document.getElementById('add-btn').onclick = () => alert('新增供应商功能待实现');
renderTable(list);

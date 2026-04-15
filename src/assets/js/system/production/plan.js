'use strict';

// 生产计划页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const statusMap = { '进行中': 'badge-success', '待启动': 'badge-warning', '已完成': 'badge-info' };
const list = [...productionData.plans];

function renderTable() {
  document.getElementById('plan-tbody').innerHTML = list.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.startDate}</td>
      <td>${p.endDate}</td>
      <td>${p.products.join('、')}</td>
      <td><span class="badge ${statusMap[p.status] || 'badge-default'}">${p.status}</span></td>
      <td><button class="btn btn-danger btn-sm" onclick="deletePlan('${p.id}')">删除</button></td>
    </tr>
  `).join('');
}

function deletePlan(id) {
  if (!confirm('确认删除该计划？')) return;
  const idx = list.findIndex(p => p.id === id);
  if (idx > -1) { list.splice(idx, 1); renderTable(); }
}

document.getElementById('add-btn').onclick = () => alert('新建计划功能待实现');
renderTable();

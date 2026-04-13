'use strict';

// 设备信息页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

let list = [...equipmentData.equipment];
const statusMap = { '运行中': 'badge-success', '维修中': 'badge-warning', '停机': 'badge-danger' };

function renderTable(data) {
  document.getElementById('info-tbody').innerHTML = data.map(e => `
    <tr>
      <td>${e.id}</td>
      <td><strong>${e.name}</strong></td>
      <td>${e.model}</td>
      <td>${e.location}</td>
      <td>${e.purchaseDate}</td>
      <td>${e.lastMaintain}</td>
      <td>${e.nextMaintain}</td>
      <td><span class="badge ${statusMap[e.status] || 'badge-default'}">${e.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-outline btn-sm" onclick="showDetail('${e.id}')">详情</button>
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${e.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function showDetail(id) {
  const e = list.find(eq => eq.id === id);
  if (!e) return;
  document.getElementById('modal-title').textContent = e.name + ' 设备档案';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row">
      <div class="form-group"><div class="form-label">设备编号</div><div>${e.id}</div></div>
      <div class="form-group"><div class="form-label">设备名称</div><div>${e.name}</div></div>
      <div class="form-group"><div class="form-label">型号</div><div>${e.model}</div></div>
      <div class="form-group"><div class="form-label">位置</div><div>${e.location}</div></div>
      <div class="form-group"><div class="form-label">购入日期</div><div>${e.purchaseDate}</div></div>
      <div class="form-group"><div class="form-label">上次维护</div><div>${e.lastMaintain}</div></div>
      <div class="form-group"><div class="form-label">下次维护</div><div>${e.nextMaintain}</div></div>
      <div class="form-group"><div class="form-label">状态</div><div><span class="badge ${statusMap[e.status] || 'badge-default'}">${e.status}</span></div></div>
    </div>
  `;
  addClass(document.getElementById('modal-overlay'), 'active');
}

function closeModal() {
  removeClass(document.getElementById('modal-overlay'), 'active');
}

function deleteItem(id) {
  if (!confirm('确认删除该设备？')) return;
  list = list.filter(e => e.id !== id);
  renderTable(list);
}

document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-cancel').onclick = closeModal;
document.getElementById('modal-overlay').onclick = e => { if (e.target === e.currentTarget) closeModal(); };

document.getElementById('search-input').addEventListener('input', function () {
  const kw = this.value.trim().toLowerCase();
  renderTable(list.filter(e => !kw || e.name.includes(kw) || e.model.toLowerCase().includes(kw)));
});

document.getElementById('add-btn').onclick = () => alert('新增设备功能待实现');
renderTable(list);

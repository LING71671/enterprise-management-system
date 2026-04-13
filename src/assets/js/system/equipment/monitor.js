'use strict';

// 状态监控页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const list = equipmentData.equipment;
const running = list.filter(e => e.status === '运行中').length;
const repairing = list.filter(e => e.status === '维修中').length;
const stopped = list.filter(e => e.status === '停机').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🏭</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">设备总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${running}</div><div class="stat-label">运行中</div></div></div>
  <div class="stat-card"><div class="stat-icon">🔧</div><div class="stat-info"><div class="stat-value">${repairing}</div><div class="stat-label">维修中</div></div></div>
  <div class="stat-card"><div class="stat-icon">🛑</div><div class="stat-info"><div class="stat-value">${stopped}</div><div class="stat-label">停机</div></div></div>
`;

const statusMap = { '运行中': 'badge-success', '维修中': 'badge-warning', '停机': 'badge-danger' };
document.getElementById('monitor-tbody').innerHTML = list.map(e => `
  <tr>
    <td>${e.id}</td>
    <td><strong>${e.name}</strong></td>
    <td>${e.model}</td>
    <td>${e.location}</td>
    <td>${e.purchaseDate}</td>
    <td>${e.lastMaintain}</td>
    <td>${e.nextMaintain}</td>
    <td><span class="badge ${statusMap[e.status] || 'badge-default'}">${e.status}</span></td>
  </tr>
`).join('');

'use strict';

// 设备管理主页逻辑
let headerLoaded = false;
let sidebarLoaded = false;

function tryInitMobileNav() {
  if (headerLoaded && sidebarLoaded) {
    if (typeof MobileNav !== 'undefined') MobileNav.init();
  }
}

fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
  headerLoaded = true;
  tryInitMobileNav();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
  sidebarLoaded = true;
  tryInitMobileNav();
});

const { equipment, faults, maintenance } = equipmentData;
const running = equipment.filter(e => e.status === '运行中').length;
const repairing = equipment.filter(e => e.status === '维修中').length;
const stopped = equipment.filter(e => e.status === '停机').length;
const pendingFaults = faults.filter(f => f.status !== '已解决').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🏭</div><div class="stat-info"><div class="stat-value">${equipment.length}</div><div class="stat-label">设备总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${running}</div><div class="stat-label">运行中</div></div></div>
  <div class="stat-card"><div class="stat-icon">🔧</div><div class="stat-info"><div class="stat-value">${repairing}</div><div class="stat-label">维修中</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-info"><div class="stat-value">${pendingFaults}</div><div class="stat-label">待处理故障</div></div></div>
`;

const statusMap = { '运行中': 'badge-success', '维修中': 'badge-warning', '停机': 'badge-danger' };
document.getElementById('equip-tbody').innerHTML = equipment.map(e => `
  <tr>
    <td>${e.id}</td>
    <td><strong>${e.name}</strong></td>
    <td>${e.model}</td>
    <td>${e.location}</td>
    <td>${e.nextMaintain}</td>
    <td><span class="badge ${statusMap[e.status] || 'badge-default'}">${e.status}</span></td>
  </tr>
`).join('');

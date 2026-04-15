'use strict';

// 生产管理主页逻辑
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

const { plans, tasks, orders, materials } = productionData;
const activePlans = plans.filter(p => p.status === '进行中').length;
const shortage = materials.filter(m => m.shortage > 0).length;
const pendingOrders = orders.filter(o => o.status !== '已完成').length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📅</div><div class="stat-info"><div class="stat-value">${plans.length}</div><div class="stat-label">生产计划</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚡</div><div class="stat-info"><div class="stat-value">${activePlans}</div><div class="stat-label">进行中计划</div></div></div>
  <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${pendingOrders}</div><div class="stat-label">待完成订单</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-info"><div class="stat-value">${shortage}</div><div class="stat-label">物料短缺项</div></div></div>
`;

document.getElementById('task-tbody').innerHTML = tasks.map(t => {
  const color = t.progress === 100 ? 'var(--color-success)' : t.progress >= 60 ? 'var(--color-primary)' : 'var(--color-warning)';
  return `
    <tr>
      <td>${t.id}</td>
      <td><strong>${t.productName}</strong></td>
      <td>${t.quantity}</td>
      <td>${t.assignee}</td>
      <td>${t.deadline}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
            <div style="width:${t.progress}%;height:100%;background:${color};border-radius:4px"></div>
          </div>
          <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:36px">${t.progress}%</span>
        </div>
      </td>
    </tr>
  `;
}).join('');

'use strict';

// 销售团队页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const team = salesData.team;
const totalTarget = team.reduce((s, t) => s + t.target, 0);
const totalAchieved = team.reduce((s, t) => s + t.achieved, 0);
const avgRate = (totalAchieved / totalTarget * 100).toFixed(1);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-info"><div class="stat-value">${team.length}</div><div class="stat-label">团队人数</div></div></div>
  <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-info"><div class="stat-value">${formatMoney(totalTarget)}</div><div class="stat-label">团队目标</div></div></div>
  <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalAchieved)}</div><div class="stat-label">已完成</div></div></div>
  <div class="stat-card"><div class="stat-icon">📊</div><div class="stat-info"><div class="stat-value">${avgRate}%</div><div class="stat-label">平均完成率</div></div></div>
`;

document.getElementById('team-tbody').innerHTML = team.map(t => {
  const rate = (t.rate * 100).toFixed(1);
  const color = t.rate >= 0.9 ? 'var(--color-success)' : t.rate >= 0.6 ? 'var(--color-primary)' : 'var(--color-warning)';
  return `
    <tr>
      <td>${t.id}</td>
      <td><strong>${t.name}</strong></td>
      <td>${t.role}</td>
      <td>${t.region}</td>
      <td>${formatMoney(t.target)}</td>
      <td>${formatMoney(t.achieved)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
            <div style="width:${rate}%;height:100%;background:${color};border-radius:4px"></div>
          </div>
          <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:40px">${rate}%</span>
        </div>
      </td>
    </tr>
  `;
}).join('');

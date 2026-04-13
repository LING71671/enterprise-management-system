'use strict';

// 绩效评估页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const list = employeeData.performance;
const avg = (list.reduce((s, p) => s + p.score, 0) / list.length).toFixed(1);
const aCount = list.filter(p => p.grade.startsWith('A')).length;

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">📊</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">参评人数</div></div></div>
  <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-info"><div class="stat-value">${avg}</div><div class="stat-label">平均分</div></div></div>
  <div class="stat-card"><div class="stat-icon">🏆</div><div class="stat-info"><div class="stat-value">${aCount}</div><div class="stat-label">A级人数</div></div></div>
`;

const gradeMap = { 'A+': 'badge-success', 'A': 'badge-success', 'B+': 'badge-info', 'B': 'badge-info', 'C': 'badge-warning' };
document.getElementById('perf-tbody').innerHTML = list.map(p => `
  <tr>
    <td>${p.empId}</td>
    <td><strong>${p.empName}</strong></td>
    <td>${p.dept}</td>
    <td>${p.period}</td>
    <td><strong>${p.score}</strong></td>
    <td><span class="badge ${gradeMap[p.grade] || 'badge-default'}">${p.grade}</span></td>
    <td style="color:var(--color-text-secondary)">${p.comment}</td>
  </tr>
`).join('');

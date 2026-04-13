'use strict';

// 考勤薪资页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const list = employeeData.attendance;

// 统计
const totalWork = list.reduce((s, a) => s + a.actualDays, 0);
const totalOvertime = list.reduce((s, a) => s + a.overtimeHours, 0);
const totalLate = list.reduce((s, a) => s + a.lateTimes, 0);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">统计人数</div></div></div>
  <div class="stat-card"><div class="stat-icon">📅</div><div class="stat-info"><div class="stat-value">${totalWork}</div><div class="stat-label">总出勤天数</div></div></div>
  <div class="stat-card"><div class="stat-icon">⏰</div><div class="stat-info"><div class="stat-value">${totalOvertime}h</div><div class="stat-label">总加班时长</div></div></div>
  <div class="stat-card"><div class="stat-icon">⚠️</div><div class="stat-info"><div class="stat-value">${totalLate}</div><div class="stat-label">迟到次数</div></div></div>
`;

document.getElementById('attendance-tbody').innerHTML = list.map(a => {
  const rate = ((a.actualDays / a.workDays) * 100).toFixed(1);
  const rateClass = rate >= 95 ? 'badge-success' : rate >= 85 ? 'badge-warning' : 'badge-danger';
  return `
    <tr>
      <td>${a.empId}</td>
      <td><strong>${a.empName}</strong></td>
      <td>${a.workDays} 天</td>
      <td>${a.actualDays} 天</td>
      <td>${a.lateTimes > 0 ? `<span class="badge badge-warning">${a.lateTimes} 次</span>` : '—'}</td>
      <td>${a.leaveDays > 0 ? a.leaveDays + ' 天' : '—'}</td>
      <td>${a.overtimeHours} h</td>
      <td><span class="badge ${rateClass}">${rate}%</span></td>
    </tr>
  `;
}).join('');

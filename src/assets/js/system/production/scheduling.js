'use strict';

// 任务排产页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

document.getElementById('task-tbody').innerHTML = productionData.tasks.map(t => {
  const color = t.progress === 100 ? 'var(--color-success)' : t.progress >= 60 ? 'var(--color-primary)' : 'var(--color-warning)';
  return `
    <tr>
      <td>${t.id}</td>
      <td>${t.planId}</td>
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

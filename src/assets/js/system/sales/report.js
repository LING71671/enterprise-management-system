'use strict';

// 销售报表页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const monthly = salesData.report.monthly;
const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
const totalOrders = monthly.reduce((s, m) => s + m.orders, 0);
const maxRevenue = Math.max(...monthly.map(m => m.revenue));

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalRevenue)}</div><div class="stat-label">6个月总销售额</div></div></div>
  <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${totalOrders}</div><div class="stat-label">6个月总订单数</div></div></div>
  <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-info"><div class="stat-value">${formatMoney(maxRevenue)}</div><div class="stat-label">单月最高销售额</div></div></div>
`;

document.getElementById('report-tbody').innerHTML = monthly.map(m => {
  const barWidth = Math.round((m.revenue / maxRevenue) * 100);
  return `
    <tr>
      <td>${m.month}</td>
      <td><strong>${formatMoney(m.revenue)}</strong></td>
      <td>${m.orders}</td>
      <td>${m.newCustomers}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
            <div style="width:${barWidth}%;height:100%;background:var(--color-primary);border-radius:4px"></div>
          </div>
          <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:36px">${barWidth}%</span>
        </div>
      </td>
    </tr>
  `;
}).join('');

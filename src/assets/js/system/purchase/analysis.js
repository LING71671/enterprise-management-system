'use strict';

// 数据分析页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const monthly = purchaseData.analysis.monthly;
const totalAmount = monthly.reduce((s, m) => s + m.amount, 0);
const totalOrders = monthly.reduce((s, m) => s + m.orders, 0);
const maxAmount = Math.max(...monthly.map(m => m.amount));
const avgAmount = Math.round(totalAmount / monthly.length);

document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalAmount)}</div><div class="stat-label">6个月采购总额</div></div></div>
  <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-info"><div class="stat-value">${totalOrders}</div><div class="stat-label">6个月总订单数</div></div></div>
  <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-info"><div class="stat-value">${formatMoney(maxAmount)}</div><div class="stat-label">单月最高采购额</div></div></div>
  <div class="stat-card"><div class="stat-icon">📊</div><div class="stat-info"><div class="stat-value">${formatMoney(avgAmount)}</div><div class="stat-label">月均采购额</div></div></div>
`;

document.getElementById('analysis-tbody').innerHTML = monthly.map(m => {
  const barWidth = Math.round((m.amount / maxAmount) * 100);
  return `
    <tr>
      <td>${m.month}</td>
      <td><strong>${formatMoney(m.amount)}</strong></td>
      <td>${m.orders}</td>
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

// 供应商采购占比
const supplierMap = {};
purchaseData.orders.forEach(o => {
  supplierMap[o.supplierName] = (supplierMap[o.supplierName] || 0) + o.amount;
});
const supplierTotal = Object.values(supplierMap).reduce((s, v) => s + v, 0);
const supplierList = Object.entries(supplierMap).sort((a, b) => b[1] - a[1]);

document.getElementById('supplier-tbody').innerHTML = supplierList.map(([name, amount]) => {
  const pct = ((amount / supplierTotal) * 100).toFixed(1);
  return `
    <tr>
      <td><strong>${name}</strong></td>
      <td>${formatMoney(amount)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:var(--color-success);border-radius:4px"></div>
          </div>
          <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:40px">${pct}%</span>
        </div>
      </td>
    </tr>
  `;
}).join('');

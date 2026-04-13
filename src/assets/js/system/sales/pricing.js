'use strict';

// 定价促销页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

document.getElementById('pricing-tbody').innerHTML = salesData.pricing.map(p => `
  <tr>
    <td>${p.id}</td>
    <td><strong>${p.product}</strong></td>
    <td>${formatMoney(p.standardPrice)}</td>
    <td><strong style="color:var(--color-primary)">${formatMoney(p.currentPrice)}</strong></td>
    <td>${p.discount < 1 ? `<span class="badge badge-warning">${(p.discount * 10).toFixed(1)}折</span>` : '—'}</td>
    <td>${p.validFrom} ~ ${p.validTo}</td>
    <td><span class="badge badge-success">${p.status}</span></td>
  </tr>
`).join('');

document.getElementById('add-btn').onclick = () => alert('新增定价功能待实现');

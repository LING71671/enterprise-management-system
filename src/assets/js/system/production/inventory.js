'use strict';

// 库存管理页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

document.getElementById('inventory-tbody').innerHTML = productionData.materials.map(m => {
  const ratio = m.stock / m.required;
  const statusClass = ratio >= 1 ? 'badge-success' : ratio >= 0.5 ? 'badge-warning' : 'badge-danger';
  const statusText = ratio >= 1 ? '充足' : ratio >= 0.5 ? '偏低' : '严重不足';
  return `
    <tr>
      <td>${m.id}</td>
      <td><strong>${m.name}</strong></td>
      <td>${m.spec}</td>
      <td>${m.unit}</td>
      <td>${m.stock}</td>
      <td>${m.required}</td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
    </tr>
  `;
}).join('');

'use strict';

// 客户信息页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

const customers = [...salesData.customers];
const levelMap = { 'VIP': 'badge-danger', '重要': 'badge-warning', '普通': 'badge-default' };

const vip = customers.filter(c => c.level === 'VIP').length;
const totalAmount = customers.reduce((s, c) => s + c.totalAmount, 0);
document.getElementById('stats-grid').innerHTML = `
  <div class="stat-card"><div class="stat-icon">🤝</div><div class="stat-info"><div class="stat-value">${customers.length}</div><div class="stat-label">客户总数</div></div></div>
  <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-info"><div class="stat-value">${vip}</div><div class="stat-label">VIP客户</div></div></div>
  <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalAmount)}</div><div class="stat-label">累计销售额</div></div></div>
`;

function renderTable(list) {
  document.getElementById('customer-tbody').innerHTML = list.map(c => `
    <tr>
      <td>${c.id}</td>
      <td><strong>${c.name}</strong></td>
      <td>${c.contact}</td>
      <td>${c.phone}</td>
      <td>${c.city}</td>
      <td><span class="badge ${levelMap[c.level] || 'badge-default'}">${c.level}</span></td>
      <td>${formatMoney(c.totalAmount)}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${c.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteCustomer(id) {
  if (!confirm('确认删除该客户？')) return;
  const idx = customers.findIndex(c => c.id === id);
  if (idx > -1) { customers.splice(idx, 1); renderTable(customers); }
}

document.getElementById('search-input').addEventListener('input', function () {
  const kw = this.value.trim().toLowerCase();
  renderTable(customers.filter(c => !kw || c.name.includes(kw) || c.contact.includes(kw)));
});

document.getElementById('add-btn').onclick = () => alert('新增客户功能待实现');
renderTable(customers);

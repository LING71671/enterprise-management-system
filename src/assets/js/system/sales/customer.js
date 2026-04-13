'use strict';

// 客户信息页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

let customers = [...salesData.customers];
const levelMap = { 'VIP': 'badge-danger', '重要': 'badge-warning', '普通': 'badge-default' };

// 渲染统计卡片
function renderStats(list) {
  const vip = list.filter(c => c.level === 'VIP').length;
  const totalAmount = list.reduce((s, c) => s + c.totalAmount, 0);
  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card"><div class="stat-icon">🤝</div><div class="stat-info"><div class="stat-value">${list.length}</div><div class="stat-label">客户总数</div></div></div>
    <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-info"><div class="stat-value">${vip}</div><div class="stat-label">VIP客户</div></div></div>
    <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${formatMoney(totalAmount)}</div><div class="stat-label">累计销售额</div></div></div>
  `;
}

// 渲染星级评分
function renderStars(rating) {
  const filled = '⭐'.repeat(rating);
  const empty = '<span style="color:var(--color-text-secondary)">' + '☆'.repeat(5 - rating) + '</span>';
  return filled + empty;
}

// 渲染表格 - 使用 DOM API 避免 XSS
function renderTable(data) {
  const tbody = document.getElementById('customer-tbody');
  tbody.innerHTML = '';

  data.forEach(c => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = c.id;
    tr.appendChild(tdId);

    const tdName = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = c.name;
    tdName.appendChild(strong);
    tr.appendChild(tdName);

    const tdContact = document.createElement('td');
    tdContact.textContent = c.contact;
    tr.appendChild(tdContact);

    const tdPhone = document.createElement('td');
    tdPhone.textContent = c.phone;
    tr.appendChild(tdPhone);

    const tdCity = document.createElement('td');
    tdCity.textContent = c.city;
    tr.appendChild(tdCity);

    const tdLevel = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge ${levelMap[c.level] || 'badge-default'}`;
    badge.textContent = c.level;
    tdLevel.appendChild(badge);
    tr.appendChild(tdLevel);

    const tdTotalAmount = document.createElement('td');
    tdTotalAmount.textContent = formatMoney(c.totalAmount);
    tr.appendChild(tdTotalAmount);

    const tdAction = document.createElement('td');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'table-actions';
    const btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm btn-delete';
    btn.textContent = '删除';
    btn.setAttribute('data-customer-id', c.id);
    actionsDiv.appendChild(btn);
    tdAction.appendChild(actionsDiv);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
}

// 事件委托监听表格点击
document.getElementById('customer-tbody').addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-delete');
  if (btn) {
    const id = btn.getAttribute('data-customer-id');
    deleteCustomer(id);
  }
});

function deleteCustomer(id) {
  if (!confirm('确认删除该客户？')) return;
  const idx = customers.findIndex(c => c.id === id);
  if (idx > -1) {
    customers.splice(idx, 1);
    renderStats(customers);
    renderTable(customers);
  }
}

document.getElementById('search-input').addEventListener('input', function () {
  const kw = this.value.trim().toLowerCase();
  renderTable(customers.filter(c => !kw || c.name.includes(kw) || c.contact.includes(kw)));
});

document.getElementById('add-btn').onclick = () => alert('新增客户功能待实现');

renderStats(customers);
renderTable(customers);

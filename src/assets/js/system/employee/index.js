'use strict';

// 员工管理主页逻辑
let headerLoaded = false;
let sidebarLoaded = false;

function tryInitMobileNav() {
  if (headerLoaded && sidebarLoaded) {
    if (typeof MobileNav !== 'undefined') MobileNav.init();
  }
}

fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
  headerLoaded = true;
  tryInitMobileNav();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
  sidebarLoaded = true;
  tryInitMobileNav();
});

const employees = employeeData.employees;

// 统计卡片
function renderStats() {
  const total = employees.length;
  const active = employees.filter(e => e.status === '在职').length;
  const trial = employees.filter(e => e.status === '试用期').length;
  const depts = new Set(employees.map(e => e.dept)).size;
  const grid = document.getElementById('stats-grid');
  grid.innerHTML = `
    <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-info"><div class="stat-value">${total}</div><div class="stat-label">员工总数</div></div></div>
    <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value">${active}</div><div class="stat-label">在职员工</div></div></div>
    <div class="stat-card"><div class="stat-icon">🕐</div><div class="stat-info"><div class="stat-value">${trial}</div><div class="stat-label">试用期员工</div></div></div>
    <div class="stat-card"><div class="stat-icon">🏢</div><div class="stat-info"><div class="stat-value">${depts}</div><div class="stat-label">部门数量</div></div></div>
  `;
}

// 部门筛选
function renderDeptFilter() {
  const depts = [...new Set(employees.map(e => e.dept))];
  const sel = document.getElementById('dept-filter');
  depts.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    sel.appendChild(opt);
  });
}

// 转义 HTML 特殊字符
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 渲染表格 - 使用 DOM API 避免 XSS
function renderTable(list) {
  const statusMap = { '在职': 'badge-success', '试用期': 'badge-warning', '离职': 'badge-danger' };
  const tbody = document.getElementById('employee-tbody');
  tbody.innerHTML = '';

  list.forEach(e => {
    const tr = document.createElement('tr');

    // 创建单元格
    const tdId = document.createElement('td');
    tdId.textContent = e.id;
    tr.appendChild(tdId);

    const tdName = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = e.name;
    tdName.appendChild(strong);
    tr.appendChild(tdName);

    const tdGender = document.createElement('td');
    tdGender.textContent = e.gender;
    tr.appendChild(tdGender);

    const tdDept = document.createElement('td');
    tdDept.textContent = e.dept;
    tr.appendChild(tdDept);

    const tdPosition = document.createElement('td');
    tdPosition.textContent = e.position;
    tr.appendChild(tdPosition);

    const tdEntryDate = document.createElement('td');
    tdEntryDate.textContent = e.entryDate;
    tr.appendChild(tdEntryDate);

    const tdStatus = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge ${statusMap[e.status] || 'badge-default'}`;
    badge.textContent = e.status;
    tdStatus.appendChild(badge);
    tr.appendChild(tdStatus);

    const tdAction = document.createElement('td');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'table-actions';
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline btn-sm';
    btn.textContent = '详情';
    btn.setAttribute('data-employee-id', e.id);
    actionsDiv.appendChild(btn);
    tdAction.appendChild(actionsDiv);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
}

// 事件委托监听表格点击
document.getElementById('employee-tbody').addEventListener('click', function(e) {
  const btn = e.target.closest('[data-employee-id]');
  if (btn) {
    const id = btn.getAttribute('data-employee-id');
    showDetail(id);
  }
});

// 详情弹窗 - 使用 DOM API 避免 XSS
function showDetail(id) {
  const e = employees.find(emp => emp.id === id);
  if (!e) return;

  document.getElementById('modal-title').textContent = e.name + ' 的员工档案';

  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = '';

  const formRow = document.createElement('div');
  formRow.className = 'form-row';

  const fields = [
    { label: '工号', value: e.id },
    { label: '姓名', value: e.name },
    { label: '性别', value: e.gender },
    { label: '部门', value: e.dept },
    { label: '职位', value: e.position },
    { label: '手机', value: e.phone },
    { label: '邮箱', value: e.email },
    { label: '入职日期', value: e.entryDate },
    { label: '薪资', value: formatMoney(e.salary) },
    { label: '状态', value: e.status }
  ];

  fields.forEach(field => {
    const group = document.createElement('div');
    group.className = 'form-group';

    const labelDiv = document.createElement('div');
    labelDiv.className = 'form-label';
    labelDiv.textContent = field.label;

    const valueDiv = document.createElement('div');
    valueDiv.textContent = field.value;

    group.appendChild(labelDiv);
    group.appendChild(valueDiv);
    formRow.appendChild(group);
  });

  modalBody.appendChild(formRow);
  addClass(document.getElementById('modal-overlay'), 'active');
}

// 关闭弹窗
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-cancel').onclick = closeModal;
document.getElementById('modal-overlay').onclick = function(e) {
  if (e.target === this) closeModal();
};

function closeModal() {
  removeClass(document.getElementById('modal-overlay'), 'active');
}

// 搜索 + 筛选
function filterAndRender() {
  const keyword = document.getElementById('search-input').value.trim().toLowerCase();
  const dept = document.getElementById('dept-filter').value;
  const list = employees.filter(e => {
    const matchKeyword = !keyword || e.name.includes(keyword) || e.dept.includes(keyword) || e.position.includes(keyword);
    const matchDept = !dept || e.dept === dept;
    return matchKeyword && matchDept;
  });
  renderTable(list);
}

document.getElementById('search-input').addEventListener('input', filterAndRender);
document.getElementById('dept-filter').addEventListener('change', filterAndRender);

renderStats();
renderDeptFilter();
renderTable(employees);

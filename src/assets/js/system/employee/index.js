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

// 渲染表格
function renderTable(list) {
  const statusMap = { '在职': 'badge-success', '试用期': 'badge-warning', '离职': 'badge-danger' };
  document.getElementById('employee-tbody').innerHTML = list.map(e => `
    <tr>
      <td>${e.id}</td>
      <td><strong>${e.name}</strong></td>
      <td>${e.gender}</td>
      <td>${e.dept}</td>
      <td>${e.position}</td>
      <td>${e.entryDate}</td>
      <td><span class="badge ${statusMap[e.status] || 'badge-default'}">${e.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-outline btn-sm" onclick="showDetail('${e.id}')">详情</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// 详情弹窗
function showDetail(id) {
  const e = employees.find(emp => emp.id === id);
  if (!e) return;
  document.getElementById('modal-title').textContent = e.name + ' 的员工档案';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row">
      <div class="form-group"><div class="form-label">工号</div><div>${e.id}</div></div>
      <div class="form-group"><div class="form-label">姓名</div><div>${e.name}</div></div>
      <div class="form-group"><div class="form-label">性别</div><div>${e.gender}</div></div>
      <div class="form-group"><div class="form-label">部门</div><div>${e.dept}</div></div>
      <div class="form-group"><div class="form-label">职位</div><div>${e.position}</div></div>
      <div class="form-group"><div class="form-label">手机</div><div>${e.phone}</div></div>
      <div class="form-group"><div class="form-label">邮箱</div><div>${e.email}</div></div>
      <div class="form-group"><div class="form-label">入职日期</div><div>${e.entryDate}</div></div>
      <div class="form-group"><div class="form-label">薪资</div><div>${formatMoney(e.salary)}</div></div>
      <div class="form-group"><div class="form-label">状态</div><div>${e.status}</div></div>
    </div>
  `;
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

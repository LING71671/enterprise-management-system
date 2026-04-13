'use strict';

// 员工信息页逻辑
// 使用 Promise.all 等待 header 和 sidebar 都加载完成后再初始化导航
Promise.all([
  fetch('../../components/header.html').then(r => r.text()),
  fetch('../../components/sidebar.html').then(r => r.text())
]).then(([headerHtml, sidebarHtml]) => {
  document.getElementById('header-placeholder').innerHTML = headerHtml;
  document.getElementById('sidebar-placeholder').innerHTML = sidebarHtml;
  // 确保 DOM 都插入后再初始化导航
  appNav.init();
});

// 使用本地副本支持增删改
// 使用 map 创建浅拷贝的对象，避免修改原始数据中的对象引用
let employees = employeeData.employees.map(emp => ({ ...emp }));
let editId = null;

const statusMap = { '在职': 'badge-success', '试用期': 'badge-warning', '离职': 'badge-danger' };

// 渲染表格 - 使用 DOM API 避免 XSS
function renderTable(list) {
  const tbody = document.getElementById('info-tbody');
  tbody.innerHTML = '';

  list.forEach(e => {
    const tr = document.createElement('tr');

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

    const tdPhone = document.createElement('td');
    tdPhone.textContent = e.phone;
    tr.appendChild(tdPhone);

    const tdEntryDate = document.createElement('td');
    tdEntryDate.textContent = e.entryDate;
    tr.appendChild(tdEntryDate);

    const tdSalary = document.createElement('td');
    tdSalary.textContent = formatMoney(e.salary);
    tr.appendChild(tdSalary);

    const tdStatus = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge ${statusMap[e.status] || 'badge-default'}`;
    badge.textContent = e.status;
    tdStatus.appendChild(badge);
    tr.appendChild(tdStatus);

    const tdAction = document.createElement('td');
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'table-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-outline btn-sm';
    editBtn.textContent = '编辑';
    editBtn.setAttribute('data-action', 'edit');
    editBtn.setAttribute('data-employee-id', e.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = '删除';
    deleteBtn.setAttribute('data-action', 'delete');
    deleteBtn.setAttribute('data-employee-id', e.id);

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    tdAction.appendChild(actionsDiv);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
} 

// 事件委托监听表格点击
document.getElementById('info-tbody').addEventListener('click', function(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action = btn.getAttribute('data-action');
  const id = btn.getAttribute('data-employee-id');

  if (action === 'edit') {
    openEdit(id);
  } else if (action === 'delete') {
    deleteEmp(id);
  }
});

function openModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('form-error').textContent = '';
  addClass(document.getElementById('modal-overlay'), 'active');
}

function closeModal() {
  removeClass(document.getElementById('modal-overlay'), 'active');
  editId = null;
}
       
function openAdd() {
  editId = null;
  ['name','gender','dept','position','phone','email','entryDate','salary'].forEach(f => {
    const el = document.getElementById('f-' + f);
    if (el) el.value = f === 'gender' ? '男' : '';
  });
  openModal('新增员工');
}

function openEdit(id) {
  const e = employees.find(emp => emp.id === id);
  if (!e) return;
  editId = id;
  document.getElementById('f-name').value = e.name;
  document.getElementById('f-gender').value = e.gender;
  document.getElementById('f-dept').value = e.dept;
  document.getElementById('f-position').value = e.position;
  document.getElementById('f-phone').value = e.phone;
  document.getElementById('f-email').value = e.email;
  document.getElementById('f-entryDate').value = e.entryDate;
  document.getElementById('f-salary').value = e.salary;
  openModal('编辑员工');
}

function deleteEmp(id) {
  if (!confirm('确认删除该员工？')) return;
  employees = employees.filter(e => e.id !== id);
  renderTable(employees);
}

document.getElementById('add-btn').onclick = openAdd;
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-cancel').onclick = closeModal;
document.getElementById('modal-overlay').onclick = e => { if (e.target === e.currentTarget) closeModal(); };

document.getElementById('modal-save').onclick = function () {
  const name = document.getElementById('f-name').value.trim();
  const dept = document.getElementById('f-dept').value.trim();
  const position = document.getElementById('f-position').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const entryDate = document.getElementById('f-entryDate').value;
  const salaryStr = document.getElementById('f-salary').value.trim();

  if (!name) {
    document.getElementById('form-error').textContent = '姓名为必填项';
    return;
  }
  if (!dept) {
    document.getElementById('form-error').textContent = '部门为必填项';
    return;
  }
  if (!position) {
    document.getElementById('form-error').textContent = '职位为必填项';
    return;
  }
  if (!phone) {
    document.getElementById('form-error').textContent = '手机号为必填项';
    return;
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    document.getElementById('form-error').textContent = '手机号格式不正确';
    return;
  }
  if (!email) {
    document.getElementById('form-error').textContent = '邮箱为必填项';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('form-error').textContent = '邮箱格式不正确';
    return;
  }
  if (!entryDate) {
    document.getElementById('form-error').textContent = '入职日期为必填项';
    return;
  }

  // 薪资验证
  let salary = null;
  if (salaryStr) {
    const parsedSalary = parseFloat(salaryStr);
    if (!isFinite(parsedSalary) || parsedSalary < 0) {
      document.getElementById('form-error').textContent = '薪资必须是有效的非负数';
      return;
    }
    salary = parsedSalary;
  }

  if (editId) {
    const emp = employees.find(e => e.id === editId);
    emp.name = name;
    emp.gender = document.getElementById('f-gender').value;
    emp.dept = dept;
    emp.position = position;
    emp.phone = phone;
    emp.email = email;
    emp.entryDate = entryDate;
    // 如果薪资输入为空，保留原值；否则使用新值
    emp.salary = salary !== null ? salary : emp.salary;
  } else {
    // 新增员工时，薪资为必填项
    if (salary === null) {
      document.getElementById('form-error').textContent = '薪资为必填项';
      return;
    }
    // 生成新的ID：找到最大数字后缀并加1
    let maxNum = 0;
    employees.forEach(emp => {
      const match = emp.id.match(/^E(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });
    const newId = 'E' + String(maxNum + 1).padStart(3, '0');
    employees.push({
      id: newId,
      name,
      gender: document.getElementById('f-gender').value,
      dept,
      position,
      phone,
      email,
      entryDate,
      salary,
      status: '试用期'
    });
  }
  closeModal();
  renderTable(employees);
};

document.getElementById('search-input').addEventListener('input', function () {
  const kw = this.value.trim().toLowerCase();
  renderTable(employees.filter(e => !kw || e.name.includes(kw) || e.id.toLowerCase().includes(kw)));
});

renderTable(employees);

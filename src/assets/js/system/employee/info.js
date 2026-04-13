'use strict';

// 员工信息页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

// 使用本地副本支持增删改
let employees = [...employeeData.employees];
let editId = null;

const statusMap = { '在职': 'badge-success', '试用期': 'badge-warning', '离职': 'badge-danger' };

function renderTable(list) {
  document.getElementById('info-tbody').innerHTML = list.map(e => `
    <tr>
      <td>${e.id}</td>
      <td><strong>${e.name}</strong></td>
      <td>${e.gender}</td>
      <td>${e.dept}</td>
      <td>${e.position}</td>
      <td>${e.phone}</td>
      <td>${e.entryDate}</td>
      <td>${formatMoney(e.salary)}</td>
      <td><span class="badge ${statusMap[e.status] || 'badge-default'}">${e.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-outline btn-sm" onclick="openEdit('${e.id}')">编辑</button>
          <button class="btn btn-danger btn-sm" onclick="deleteEmp('${e.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');
}

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
  if (!name) {
    document.getElementById('form-error').textContent = '姓名为必填项';
    return;
  }
  if (editId) {
    const emp = employees.find(e => e.id === editId);
    emp.name = name;
    emp.gender = document.getElementById('f-gender').value;
    emp.dept = document.getElementById('f-dept').value.trim();
    emp.position = document.getElementById('f-position').value.trim();
    emp.phone = document.getElementById('f-phone').value.trim();
    emp.email = document.getElementById('f-email').value.trim();
    emp.entryDate = document.getElementById('f-entryDate').value;
    emp.salary = Number(document.getElementById('f-salary').value) || 0;
  } else {
    const newId = 'E' + String(employees.length + 1).padStart(3, '0');
    employees.push({
      id: newId,
      name,
      gender: document.getElementById('f-gender').value,
      dept: document.getElementById('f-dept').value.trim(),
      position: document.getElementById('f-position').value.trim(),
      phone: document.getElementById('f-phone').value.trim(),
      email: document.getElementById('f-email').value.trim(),
      entryDate: document.getElementById('f-entryDate').value,
      salary: Number(document.getElementById('f-salary').value) || 0,
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

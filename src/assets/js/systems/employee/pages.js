'use strict';

window.employeeSystem = window.employeeSystem || {};

// 员工管理页面控制器：负责员工首页、考勤、绩效、招聘和档案页。
employeeSystem.pages = (function(store, actions, renderers, view) {
  // 打开员工首页的档案详情弹窗。
  function showEmployeeDetail(id) {
    const employee = store.sync().employees.find((item) => item.id === id);
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (!employee || !title || !body) return;

    title.textContent = employee.name + ' 的员工档案';
    body.innerHTML = `
      <div class="form-row">
        <div class="form-group"><div class="form-label">工号</div><div>${employee.id}</div></div>
        <div class="form-group"><div class="form-label">姓名</div><div>${employee.name}</div></div>
        <div class="form-group"><div class="form-label">性别</div><div>${employee.gender}</div></div>
        <div class="form-group"><div class="form-label">部门</div><div>${employee.dept}</div></div>
        <div class="form-group"><div class="form-label">职位</div><div>${employee.position}</div></div>
        <div class="form-group"><div class="form-label">手机</div><div>${employee.phone}</div></div>
        <div class="form-group"><div class="form-label">邮箱</div><div>${employee.email}</div></div>
        <div class="form-group"><div class="form-label">入职日期</div><div>${employee.entryDate}</div></div>
        <div class="form-group"><div class="form-label">薪资</div><div>${formatMoney(employee.salary)}</div></div>
        <div class="form-group"><div class="form-label">状态</div><div>${employee.status}</div></div>
      </div>
    `;

    addClass(document.getElementById('modal-overlay'), 'active');
  }

  // 统计员工总数、在职人数、试用期人数和部门数。
  function renderEmployeeStats(list) {
    renderers.stats([
      { icon: '👥', value: list.length, label: '员工总数' },
      { icon: '✅', value: list.filter((item) => item.status === '在职').length, label: '在职员工' },
      { icon: '🕐', value: list.filter((item) => item.status === '试用期').length, label: '试用期员工' },
      { icon: '🏢', value: new Set(list.map((item) => item.dept)).size, label: '部门数量' }
    ]);
  }

  // 根据员工数据刷新部门筛选下拉框。
  function renderDeptFilter(list) {
    const select = document.getElementById('dept-filter');
    if (!select) return;

    const currentValue = select.value;
    const defaultOption = select.options[0]
      ? `<option value="${select.options[0].value}">${select.options[0].textContent}</option>`
      : '<option value="">全部部门</option>';
    const options = Array.from(new Set(list.map((item) => item.dept))).map((dept) => `
      <option value="${dept}">${dept}</option>
    `);

    select.innerHTML = defaultOption + options.join('');
    select.value = currentValue;
  }

  function renderEmployeeIndexRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.gender}</td>
        <td>${item.dept}</td>
        <td>${item.position}</td>
        <td>${item.entryDate}</td>
        <td>${renderers.employeeStatus(item.status)}</td>
        <td><div class="table-actions"><button class="btn btn-outline btn-sm" data-action="detail" data-id="${item.id}">详情</button></div></td>
      </tr>
    `;
  }

  function renderAttendanceRow(item) {
    const rate = ((item.actualDays / item.workDays) * 100).toFixed(1);
    const rateClass = rate >= 95 ? 'badge-success' : rate >= 85 ? 'badge-warning' : 'badge-danger';

    return `
      <tr>
        <td>${item.empId}</td>
        <td><strong>${item.empName}</strong></td>
        <td>${item.workDays} 天</td>
        <td>${item.actualDays} 天</td>
        <td>${item.lateTimes > 0 ? `<span class="badge badge-warning">${item.lateTimes} 次</span>` : '—'}</td>
        <td>${item.leaveDays > 0 ? item.leaveDays + ' 天' : '—'}</td>
        <td>${item.overtimeHours} h</td>
        <td><span class="badge ${rateClass}">${rate}%</span></td>
      </tr>
    `;
  }

  function renderPerformanceRow(item) {
    return `
      <tr>
        <td>${item.empId}</td>
        <td><strong>${item.empName}</strong></td>
        <td>${item.dept}</td>
        <td>${item.period}</td>
        <td><strong>${item.score}</strong></td>
        <td><span class="badge ${renderers.gradeMap[item.grade] || 'badge-default'}">${item.grade}</span></td>
        <td style="color:var(--color-text-secondary)">${item.comment}</td>
      </tr>
    `;
  }

  function renderRecruitmentRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.position}</strong></td>
        <td>${item.dept}</td>
        <td>${item.headcount} 人</td>
        <td>${item.publishDate}</td>
        <td>${item.deadline}</td>
        <td>${item.applicants}</td>
        <td><span class="badge ${renderers.recruitmentStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
        <td><div class="table-actions"><button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button></div></td>
      </tr>
    `;
  }

  function renderEmployeeInfoRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.gender}</td>
        <td>${item.dept}</td>
        <td>${item.position}</td>
        <td>${item.phone}</td>
        <td>${item.entryDate}</td>
        <td>${formatMoney(item.salary)}</td>
        <td>${renderers.employeeStatus(item.status)}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-outline btn-sm" data-action="edit" data-id="${item.id}">编辑</button>
            <button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button>
          </div>
        </td>
      </tr>
    `;
  }

  // 初始化员工管理首页。
  function initIndexPage() {
    const tbody = document.getElementById('employee-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const searchInput = document.getElementById('search-input');
    const deptFilter = document.getElementById('dept-filter');
    const closeModal = () => removeClass(document.getElementById('modal-overlay'), 'active');

    function refresh() {
      const employees = store.sync().employees;
      const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const dept = deptFilter ? deptFilter.value : '';
      const filtered = view.filterByKeyword(employees, keyword, ['name', 'dept', 'position'])
        .filter((item) => !dept || item.dept === dept);

      renderEmployeeStats(employees);
      renderDeptFilter(employees);
      view.renderRows(tbody, filtered, renderEmployeeIndexRow, { colspan: 8, text: '暂无匹配员工' });
    }

    view.bindModalClose(closeModal);
    on(searchInput, 'input', refresh);
    on(deptFilter, 'change', refresh);
    delegate(tbody, '[data-action="detail"]', 'click', function() {
      showEmployeeDetail(this.dataset.id);
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  // 初始化考勤统计页。
  function initAttendancePage() {
    const tbody = document.getElementById('attendance-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const list = store.sync().attendance;
    renderers.stats([
      { icon: '👥', value: list.length, label: '统计人数' },
      { icon: '📅', value: list.reduce((sum, item) => sum + item.actualDays, 0), label: '总出勤天数' },
      { icon: '⏰', value: list.reduce((sum, item) => sum + item.overtimeHours, 0) + 'h', label: '总加班时长' },
      { icon: '⚠️', value: list.reduce((sum, item) => sum + item.lateTimes, 0), label: '迟到次数' }
    ]);

    view.renderRows(tbody, list, renderAttendanceRow, { colspan: 8, text: '暂无考勤记录' });

    tbody.dataset.bound = '1';
  }

  // 初始化绩效管理页。
  function initPerformancePage() {
    const tbody = document.getElementById('perf-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const list = store.sync().performance;
    const average = list.length ? (list.reduce((sum, item) => sum + item.score, 0) / list.length).toFixed(1) : '0.0';
    const aCount = list.filter((item) => String(item.grade).startsWith('A')).length;

    renderers.stats([
      { icon: '📊', value: list.length, label: '参评人数' },
      { icon: '⭐', value: average, label: '平均分' },
      { icon: '🏆', value: aCount, label: 'A级人数' }
    ]);

    view.renderRows(tbody, list, renderPerformanceRow, { colspan: 7, text: '暂无绩效记录' });

    tbody.dataset.bound = '1';
  }

  // 初始化招聘管理页。
  function initRecruitmentPage() {
    const tbody = document.getElementById('recruit-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render() {
      const list = store.sync().recruitment;
      renderers.stats([
        { icon: '📋', value: list.length, label: '招聘计划' },
        { icon: '🟢', value: list.filter((item) => item.status === '招聘中').length, label: '招聘中' },
        { icon: '👤', value: list.reduce((sum, item) => sum + item.headcount, 0), label: '招聘总人数' },
        { icon: '📨', value: list.reduce((sum, item) => sum + item.applicants, 0), label: '总投递数' }
      ]);

      view.renderRows(tbody, list, renderRecruitmentRow, { colspan: 9, text: '暂无招聘计划' });
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'position', label: '职位名称', required: true },
        { name: 'dept', label: '所属部门', defaultValue: '人事部' },
        { name: 'headcount', label: '招聘人数', defaultValue: '1' },
        { name: 'status', label: '状态（招聘中/待发布/已完成）', defaultValue: '招聘中' }
      ]);
      if (!payload) return;

      actions.createRecruitment(payload);
      render();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      view.confirmDelete('确认删除该招聘计划？', () => actions.deleteRecruitment(this.dataset.id), render);
    });

    tbody.dataset.bound = '1';
    render();
  }

  // 初始化员工档案维护页。
  function initInfoPage() {
    const tbody = document.getElementById('info-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    let editingId = null;

    function closeModal() {
      removeClass(document.getElementById('modal-overlay'), 'active');
      editingId = null;
    }

    function openModal(title) {
      const titleElement = document.getElementById('modal-title');
      const errorElement = document.getElementById('form-error');
      if (titleElement) titleElement.textContent = title;
      if (errorElement) errorElement.textContent = '';
      addClass(document.getElementById('modal-overlay'), 'active');
    }

    function fillForm(employee) {
      const fields = {
        name: employee.name || '',
        gender: employee.gender || '男',
        dept: employee.dept || '',
        position: employee.position || '',
        phone: employee.phone || '',
        email: employee.email || '',
        entryDate: employee.entryDate || '',
        salary: employee.salary || ''
      };

      Object.keys(fields).forEach((key) => {
        const element = document.getElementById('f-' + key);
        if (element) element.value = fields[key];
      });
    }

    function readForm() {
      return {
        name: view.getTrimmedValue('f-name'),
        gender: view.getValue('f-gender', '男') || '男',
        dept: view.getTrimmedValue('f-dept'),
        position: view.getTrimmedValue('f-position'),
        phone: view.getTrimmedValue('f-phone'),
        email: view.getTrimmedValue('f-email'),
        entryDate: view.getValue('f-entryDate'),
        salary: view.getValue('f-salary', 0)
      };
    }

    function render(list) {
      view.renderRows(tbody, list, renderEmployeeInfoRow, { colspan: 10, text: '暂无员工档案' });
    }

    function refresh() {
      const keyword = view.getTrimmedValue('search-input');
      const list = view.filterByKeyword(store.sync().employees, keyword, ['id', 'name']);
      render(list);
    }

    view.bindModalClose(closeModal);
    on(document.getElementById('add-btn'), 'click', () => {
      editingId = null;
      fillForm({ gender: '男' });
      openModal('新增员工');
    });
    on(document.getElementById('modal-save'), 'click', () => {
      const form = readForm();
      const errorElement = document.getElementById('form-error');
      if (!form.name) {
        if (errorElement) errorElement.textContent = '姓名为必填项';
        return;
      }

      if (editingId) {
        actions.updateEmployee(editingId, form);
      } else {
        actions.createEmployee(form);
      }

      closeModal();
      refresh();
    });
    on(document.getElementById('search-input'), 'input', refresh);
    delegate(tbody, '[data-action="edit"]', 'click', function() {
      const employee = store.sync().employees.find((item) => item.id === this.dataset.id);
      if (!employee) return;
      editingId = employee.id;
      fillForm(employee);
      openModal('编辑员工');
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      view.confirmDelete('确认删除该员工？', () => actions.deleteEmployee(this.dataset.id), refresh);
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  // 按当前员工管理子页面分发初始化逻辑。
  function init() {
    switch (view.pageName()) {
      case 'index.html':
        if (document.getElementById('employee-tbody')) initIndexPage();
        break;
      case 'attendance.html':
        initAttendancePage();
        break;
      case 'performance.html':
        initPerformancePage();
        break;
      case 'recruitment.html':
        initRecruitmentPage();
        break;
      case 'info.html':
        initInfoPage();
        break;
      default:
        break;
    }
  }

  return {
    init
  };
})(employeeSystem.store, employeeSystem.actions, employeeSystem.renderers, EnterpriseView);

// 对外暴露员工管理初始化入口，供 modules/employee.js 调用。
employeeSystem.init = function() {
  try {
    employeeSystem.pages.init();
  } catch (error) {
    console.error('employeeSystem.init failed:', error);
  }
};

// 对外暴露员工管理状态快照，供调试和兼容 API 使用。
employeeSystem.getState = function() {
  return employeeSystem.store.snapshot();
};

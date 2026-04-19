'use strict';

window.equipmentSystem = window.equipmentSystem || {};

// 设备管理页面控制器：负责设备总览、监控、档案、维护和故障页。
equipmentSystem.pages = (function(store, actions, renderers, view) {
  function renderEquipmentSummaryRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.model}</td>
        <td>${item.location}</td>
        <td>${item.nextMaintain}</td>
        <td><span class="badge ${renderers.equipmentStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `;
  }

  function renderEquipmentMonitorRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.model}</td>
        <td>${item.location}</td>
        <td>${item.purchaseDate}</td>
        <td>${item.lastMaintain}</td>
        <td>${item.nextMaintain}</td>
        <td><span class="badge ${renderers.equipmentStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `;
  }

  function renderEquipmentInfoRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.model}</td>
        <td>${item.location}</td>
        <td>${item.purchaseDate}</td>
        <td>${item.lastMaintain}</td>
        <td>${item.nextMaintain}</td>
        <td><span class="badge ${renderers.equipmentStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn btn-outline btn-sm" data-action="detail" data-id="${item.id}">详情</button>
            <button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button>
          </div>
        </td>
      </tr>
    `;
  }

  function renderMaintenanceRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.equipName}</strong></td>
        <td>${item.type}</td>
        <td>${item.planDate}</td>
        <td>${item.technician}</td>
        <td>${formatMoney(item.cost)}</td>
        <td><span class="badge ${renderers.maintenanceStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
        <td><button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button></td>
      </tr>
    `;
  }

  function renderFaultRow(item) {
    return `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.equipName}</strong></td>
        <td>${item.faultDate}</td>
        <td style="max-width:260px;color:var(--color-text-secondary)">${item.description}</td>
        <td><span class="badge ${renderers.severityMap[item.severity] || 'badge-default'}">${item.severity}</span></td>
        <td>${item.handler}</td>
        <td><span class="badge ${renderers.faultStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
        <td><button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button></td>
      </tr>
    `;
  }

  // 初始化设备管理首页。
  function initIndexPage() {
    const tbody = document.getElementById('equip-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const data = store.sync();
    renderers.stats([
      { icon: '🏭', value: data.equipment.length, label: '设备总数' },
      { icon: '✅', value: data.equipment.filter((item) => item.status === '运行中').length, label: '运行中' },
      { icon: '🔧', value: data.equipment.filter((item) => item.status === '维修中').length, label: '维修中' },
      { icon: '⚠️', value: data.faults.filter((item) => item.status !== '已解决').length, label: '待处理故障' }
    ]);

    view.renderRows(tbody, data.equipment, renderEquipmentSummaryRow, { colspan: 6, text: '暂无设备' });

    tbody.dataset.bound = '1';
  }

  // 初始化设备状态监控页。
  function initMonitorPage() {
    const tbody = document.getElementById('monitor-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const list = store.sync().equipment;
    renderers.stats([
      { icon: '🏭', value: list.length, label: '设备总数' },
      { icon: '✅', value: list.filter((item) => item.status === '运行中').length, label: '运行中' },
      { icon: '🔧', value: list.filter((item) => item.status === '维修中').length, label: '维修中' },
      { icon: '🛑', value: list.filter((item) => item.status === '停机').length, label: '停机' }
    ]);

    view.renderRows(tbody, list, renderEquipmentMonitorRow, { colspan: 8, text: '暂无设备监控数据' });

    tbody.dataset.bound = '1';
  }

  // 初始化设备档案页。
  function initInfoPage() {
    const tbody = document.getElementById('info-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function closeModal() {
      removeClass(document.getElementById('modal-overlay'), 'active');
    }

    function showDetail(id) {
      const item = store.sync().equipment.find((equipment) => equipment.id === id);
      const title = document.getElementById('modal-title');
      const body = document.getElementById('modal-body');
      if (!item || !title || !body) return;

      title.textContent = item.name + ' 设备档案';
      body.innerHTML = `
        <div class="form-row">
          <div class="form-group"><div class="form-label">设备编号</div><div>${item.id}</div></div>
          <div class="form-group"><div class="form-label">设备名称</div><div>${item.name}</div></div>
          <div class="form-group"><div class="form-label">型号</div><div>${item.model}</div></div>
          <div class="form-group"><div class="form-label">位置</div><div>${item.location}</div></div>
          <div class="form-group"><div class="form-label">购入日期</div><div>${item.purchaseDate}</div></div>
          <div class="form-group"><div class="form-label">上次维护</div><div>${item.lastMaintain}</div></div>
          <div class="form-group"><div class="form-label">下次维护</div><div>${item.nextMaintain}</div></div>
          <div class="form-group"><div class="form-label">状态</div><div><span class="badge ${renderers.equipmentStatusMap[item.status] || 'badge-default'}">${item.status}</span></div></div>
        </div>
      `;
      addClass(document.getElementById('modal-overlay'), 'active');
    }

    function refresh() {
      const keyword = view.getTrimmedValue('search-input');
      const list = view.filterByKeyword(store.sync().equipment, keyword, ['name', 'model']);
      view.renderRows(tbody, list, renderEquipmentInfoRow, { colspan: 9, text: '暂无设备档案' });
    }

    view.bindModalClose(closeModal);
    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'name', label: '设备名称', required: true },
        { name: 'model', label: '设备型号', defaultValue: 'NEW-100' },
        { name: 'location', label: '设备位置', defaultValue: '新车间' },
        { name: 'status', label: '设备状态（运行中/维修中/停机）', defaultValue: '运行中' }
      ]);
      if (!payload) return;

      actions.createEquipment(payload);
      refresh();
    });
    delegate(tbody, '[data-action="detail"]', 'click', function() {
      showDetail(this.dataset.id);
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      view.confirmDelete('确认删除该设备？', () => actions.deleteEquipment(this.dataset.id), refresh);
    });

    tbody.dataset.bound = '1';
    refresh();
  }

  // 初始化设备维护计划页。
  function initMaintenancePage() {
    const tbody = document.getElementById('maintenance-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render() {
      const list = store.sync().maintenance;
      renderers.stats([
        { icon: '📋', value: list.length, label: '维护计划总数' },
        { icon: '⏳', value: list.filter((item) => item.status === '待执行').length, label: '待执行' },
        { icon: '🔧', value: list.filter((item) => item.status === '进行中').length, label: '进行中' },
        { icon: '💰', value: formatMoney(list.reduce((sum, item) => sum + item.cost, 0)), label: '预估总费用' }
      ]);

      view.renderRows(tbody, list, renderMaintenanceRow, { colspan: 8, text: '暂无维护计划' });
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'equipName', label: '设备名称', required: true },
        { name: 'type', label: '维护类型', defaultValue: '定期保养' },
        { name: 'technician', label: '责任人', defaultValue: '张工' },
        { name: 'cost', label: '预计费用', defaultValue: '3000' }
      ]);
      if (!payload) return;

      actions.createMaintenance(payload);
      render();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      view.confirmDelete('确认删除该维护计划？', () => actions.deleteMaintenance(this.dataset.id), render);
    });

    tbody.dataset.bound = '1';
    render();
  }

  // 初始化设备故障记录页。
  function initFaultPage() {
    const tbody = document.getElementById('fault-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render() {
      const list = store.sync().faults;
      renderers.stats([
        { icon: '⚠️', value: list.length, label: '故障总数' },
        { icon: '🔴', value: list.filter((item) => item.status !== '已解决').length, label: '未解决' },
        { icon: '🚨', value: list.filter((item) => item.severity === '严重').length, label: '严重故障' }
      ]);

      view.renderRows(tbody, list, renderFaultRow, { colspan: 8, text: '暂无故障记录' });
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const payload = view.promptFields([
        { name: 'equipName', label: '故障设备名称', required: true },
        { name: 'description', label: '故障描述', defaultValue: '设备异常' },
        { name: 'severity', label: '故障等级（严重/一般/轻微）', defaultValue: '一般' },
        { name: 'handler', label: '处理人', defaultValue: '张工' },
        { name: 'status', label: '处理状态（待处理/维修中/已解决）', defaultValue: '待处理' }
      ]);
      if (!payload) return;

      actions.createFault(payload);
      render();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      view.confirmDelete('确认删除该故障记录？', () => actions.deleteFault(this.dataset.id), render);
    });

    tbody.dataset.bound = '1';
    render();
  }

  // 按当前设备管理子页面分发初始化逻辑。
  function init() {
    switch (view.pageName()) {
      case 'index.html':
        if (document.getElementById('equip-tbody')) initIndexPage();
        break;
      case 'monitor.html':
        initMonitorPage();
        break;
      case 'info.html':
        initInfoPage();
        break;
      case 'maintenance.html':
        initMaintenancePage();
        break;
      case 'fault.html':
        initFaultPage();
        break;
      default:
        break;
    }
  }

  return {
    init
  };
})(equipmentSystem.store, equipmentSystem.actions, equipmentSystem.renderers, EnterpriseView);

// 对外暴露设备管理初始化入口，供 modules/equipment.js 调用。
equipmentSystem.init = function() {
  try {
    equipmentSystem.pages.init();
  } catch (error) {
    console.error('equipmentSystem.init failed:', error);
  }
};

// 对外暴露设备管理状态快照，供调试和兼容 API 使用。
equipmentSystem.getState = function() {
  return equipmentSystem.store.snapshot();
};

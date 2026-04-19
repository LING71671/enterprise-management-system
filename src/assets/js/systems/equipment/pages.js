'use strict';

window.equipmentSystem = window.equipmentSystem || {};

equipmentSystem.pages = (function(store, actions, renderers, view) {
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

    tbody.innerHTML = data.equipment.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.model}</td>
        <td>${item.location}</td>
        <td>${item.nextMaintain}</td>
        <td><span class="badge ${renderers.equipmentStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

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

    tbody.innerHTML = list.map((item) => `
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
    `).join('');

    tbody.dataset.bound = '1';
  }

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
      const keyword = ((document.getElementById('search-input') || {}).value || '').trim().toLowerCase();
      const list = store.sync().equipment.filter((item) => {
        const text = `${item.name} ${item.model}`.toLowerCase();
        return !keyword || text.includes(keyword);
      });

      tbody.innerHTML = list.map((item) => `
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
      `).join('');
    }

    view.bindModalClose(closeModal);
    on(document.getElementById('search-input'), 'input', refresh);
    on(document.getElementById('add-btn'), 'click', () => {
      const name = window.prompt('设备名称');
      if (!name) return;

      actions.createEquipment({
        name,
        model: window.prompt('设备型号', 'NEW-100') || 'NEW-100',
        location: window.prompt('设备位置', '新车间') || '新车间',
        status: window.prompt('设备状态（运行中/维修中/停机）', '运行中') || '运行中'
      });
      refresh();
    });
    delegate(tbody, '[data-action="detail"]', 'click', function() {
      showDetail(this.dataset.id);
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      if (window.confirm('确认删除该设备？')) {
        actions.deleteEquipment(this.dataset.id);
        refresh();
      }
    });

    tbody.dataset.bound = '1';
    refresh();
  }

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

      tbody.innerHTML = list.map((item) => `
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
      `).join('');
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const equipName = window.prompt('设备名称');
      if (!equipName) return;

      actions.createMaintenance({
        equipName,
        type: window.prompt('维护类型', '定期保养') || '定期保养',
        technician: window.prompt('责任人', '张工') || '张工',
        cost: window.prompt('预计费用', '3000') || '3000'
      });
      render();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      if (window.confirm('确认删除该维护计划？')) {
        actions.deleteMaintenance(this.dataset.id);
        render();
      }
    });

    tbody.dataset.bound = '1';
    render();
  }

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

      tbody.innerHTML = list.map((item) => `
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
      `).join('');
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const equipName = window.prompt('故障设备名称');
      if (!equipName) return;

      actions.createFault({
        equipName,
        description: window.prompt('故障描述', '设备异常') || '设备异常',
        severity: window.prompt('故障等级（严重/一般/轻微）', '一般') || '一般',
        handler: window.prompt('处理人', '张工') || '张工',
        status: window.prompt('处理状态（待处理/维修中/已解决）', '待处理') || '待处理'
      });
      render();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      if (window.confirm('确认删除该故障记录？')) {
        actions.deleteFault(this.dataset.id);
        render();
      }
    });

    tbody.dataset.bound = '1';
    render();
  }

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

equipmentSystem.init = function() {
  try {
    equipmentSystem.pages.init();
  } catch (error) {
    console.error('equipmentSystem.init failed:', error);
  }
};

equipmentSystem.getState = function() {
  return equipmentSystem.store.snapshot();
};

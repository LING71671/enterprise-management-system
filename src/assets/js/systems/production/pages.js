'use strict';

window.productionSystem = window.productionSystem || {};

productionSystem.pages = (function(store, actions, renderers, view) {
  function initIndexPage() {
    const tbody = document.getElementById('task-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const data = store.sync();
    renderers.stats([
      { icon: '📅', value: data.plans.length, label: '生产计划' },
      { icon: '⚡', value: data.plans.filter((item) => item.status === '进行中').length, label: '进行中计划' },
      { icon: '📋', value: data.orders.filter((item) => item.status !== '已完成').length, label: '待完成订单' },
      { icon: '⚠️', value: data.materials.filter((item) => item.shortage > 0).length, label: '物料短缺项' }
    ]);

    tbody.innerHTML = data.tasks.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.productName}</strong></td>
        <td>${item.quantity}</td>
        <td>${item.assignee}</td>
        <td>${item.deadline}</td>
        <td>${renderers.renderProgress(item.progress)}</td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

  function initInventoryPage() {
    const tbody = document.getElementById('inventory-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    tbody.innerHTML = store.sync().materials.map((item) => {
      const ratio = item.required ? item.stock / item.required : 0;
      const statusClass = ratio >= 1 ? 'badge-success' : ratio >= 0.5 ? 'badge-warning' : 'badge-danger';
      const statusText = ratio >= 1 ? '充足' : ratio >= 0.5 ? '偏低' : '严重不足';
      return `
        <tr>
          <td>${item.id}</td>
          <td><strong>${item.name}</strong></td>
          <td>${item.spec}</td>
          <td>${item.unit}</td>
          <td>${item.stock}</td>
          <td>${item.required}</td>
          <td><span class="badge ${statusClass}">${statusText}</span></td>
        </tr>
      `;
    }).join('');

    tbody.dataset.bound = '1';
  }

  function initMaterialPage() {
    const tbody = document.getElementById('material-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const materials = store.sync().materials;
    renderers.stats([
      { icon: '📦', value: materials.length, label: '物料种类' },
      { icon: '✅', value: materials.filter((item) => item.shortage === 0).length, label: '库存充足' },
      { icon: '⚠️', value: materials.filter((item) => item.shortage > 0).length, label: '库存短缺' }
    ]);

    tbody.innerHTML = materials.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.spec}</td>
        <td>${item.unit}</td>
        <td>${item.required}</td>
        <td>${item.stock}</td>
        <td>${item.shortage > 0 ? `<span style="color:var(--color-danger);font-weight:600">${item.shortage}</span>` : '—'}</td>
        <td><span class="badge ${item.shortage > 0 ? 'badge-danger' : 'badge-success'}">${item.shortage > 0 ? '短缺' : '充足'}</span></td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

  function initOrderPage() {
    const tbody = document.getElementById('order-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const orders = store.sync().orders;
    renderers.stats([
      { icon: '📋', value: orders.length, label: '订单总数' },
      { icon: '⚡', value: orders.filter((item) => item.status === '生产中').length, label: '生产中' },
      { icon: '✅', value: orders.filter((item) => item.status === '已完成').length, label: '已完成' }
    ]);

    function render(list) {
      tbody.innerHTML = list.map((item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.customer}</td>
          <td><strong>${item.product}</strong></td>
          <td>${item.quantity}</td>
          <td>${item.createDate}</td>
          <td>${item.deliveryDate}</td>
          <td><span class="badge ${renderers.orderStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
        </tr>
      `).join('');
    }

    on(document.getElementById('search-input'), 'input', function() {
      const keyword = this.value.trim().toLowerCase();
      render(orders.filter((item) => {
        const text = `${item.customer} ${item.product}`.toLowerCase();
        return !keyword || text.includes(keyword);
      }));
    });

    tbody.dataset.bound = '1';
    render(orders);
  }

  function initPlanPage() {
    const tbody = document.getElementById('plan-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    function render() {
      tbody.innerHTML = store.sync().plans.map((item) => `
        <tr>
          <td>${item.id}</td>
          <td><strong>${item.name}</strong></td>
          <td>${item.startDate}</td>
          <td>${item.endDate}</td>
          <td>${item.products.join('、')}</td>
          <td><span class="badge ${renderers.planStatusMap[item.status] || 'badge-default'}">${item.status}</span></td>
          <td><button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">删除</button></td>
        </tr>
      `).join('');
    }

    on(document.getElementById('add-btn'), 'click', () => {
      const name = window.prompt('计划名称');
      if (!name) return;

      const productText = window.prompt('产品列表，使用中文逗号分隔', '产品A，产品B') || '新品';
      actions.createPlan({
        name,
        status: window.prompt('计划状态（待启动/进行中/已完成）', '待启动') || '待启动',
        products: productText.split(/[，,]/).map((item) => item.trim()).filter(Boolean)
      });
      render();
    });
    delegate(tbody, '[data-action="delete"]', 'click', function() {
      if (window.confirm('确认删除该计划？')) {
        actions.deletePlan(this.dataset.id);
        render();
      }
    });

    tbody.dataset.bound = '1';
    render();
  }

  function initQualityPage() {
    const tbody = document.getElementById('quality-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const records = store.sync().qualityRecords;
    const passed = records.filter((item) => item.result === '合格').length;
    const failed = records.filter((item) => item.result === '不合格').length;
    const passRate = records.length ? ((passed / records.length) * 100).toFixed(1) : '0.0';

    renderers.stats([
      { icon: '🔍', value: records.length, label: '质检总数' },
      { icon: '✅', value: passed, label: '合格' },
      { icon: '❌', value: failed, label: '不合格' },
      { icon: '📊', value: passRate + '%', label: '合格率' }
    ]);

    tbody.innerHTML = records.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.orderId}</td>
        <td>${item.inspector}</td>
        <td>${item.date}</td>
        <td>${item.defects > 0 ? `<span style="color:var(--color-danger)">${item.defects}</span>` : '0'}</td>
        <td><span class="badge ${item.result === '合格' ? 'badge-success' : 'badge-danger'}">${item.result}</span></td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

  function initSchedulingPage() {
    const tbody = document.getElementById('task-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    tbody.innerHTML = store.sync().tasks.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.planId}</td>
        <td><strong>${item.productName}</strong></td>
        <td>${item.quantity}</td>
        <td>${item.assignee}</td>
        <td>${item.deadline}</td>
        <td>${renderers.renderProgress(item.progress)}</td>
      </tr>
    `).join('');

    tbody.dataset.bound = '1';
  }

  function init() {
    switch (view.pageName()) {
      case 'index.html':
        if (document.getElementById('task-tbody')) initIndexPage();
        break;
      case 'inventory.html':
        initInventoryPage();
        break;
      case 'material.html':
        initMaterialPage();
        break;
      case 'order.html':
        initOrderPage();
        break;
      case 'plan.html':
        initPlanPage();
        break;
      case 'quality.html':
        initQualityPage();
        break;
      case 'scheduling.html':
        initSchedulingPage();
        break;
      default:
        break;
    }
  }

  return {
    init
  };
})(productionSystem.store, productionSystem.actions, productionSystem.renderers, EnterpriseView);

productionSystem.init = function() {
  try {
    productionSystem.pages.init();
  } catch (error) {
    console.error('productionSystem.init failed:', error);
  }
};

productionSystem.getState = function() {
  return productionSystem.store.snapshot();
};

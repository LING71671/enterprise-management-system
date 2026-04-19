'use strict';

window.warehouseSystem = window.warehouseSystem || {};

warehouseSystem.pages = (function(store, renderers, view) {
  function initIndexPage() {
    const tbody = document.getElementById('inventory-tbody');
    if (!tbody || tbody.dataset.bound === '1') return;

    const data = store.sync();
    renderers.stats([
      { icon: '📦', value: data.inventory.length, label: '库存品类' },
      { icon: '⚠️', value: data.inventory.filter((item) => item.stock < item.minStock).length, label: '库存预警' },
      { icon: '📥', value: data.inbound.length, label: '近期入库' },
      { icon: '📤', value: data.outbound.length, label: '近期出库' }
    ]);

    tbody.innerHTML = data.inventory.map((item) => {
      const low = item.stock < item.minStock;
      return `
        <tr>
          <td>${item.id}</td>
          <td><strong>${item.name}</strong></td>
          <td>${item.category}</td>
          <td>${item.location}</td>
          <td>${low ? `<span style="color:var(--color-danger);font-weight:600">${item.stock}</span>` : item.stock} ${item.unit}</td>
          <td>${item.minStock} ${item.unit}</td>
          <td><span class="badge ${low ? 'badge-danger' : 'badge-success'}">${low ? '库存不足' : '正常'}</span></td>
        </tr>
      `;
    }).join('');

    tbody.dataset.bound = '1';
  }

  function initLayoutPage() {
    const layoutBody = document.getElementById('layout-tbody');
    const detailBody = document.getElementById('detail-tbody');
    if (!layoutBody || !detailBody || layoutBody.dataset.bound === '1') return;

    const data = store.sync();
    const totalCap = data.locations.reduce((sum, item) => sum + item.capacity, 0);
    const totalUsed = data.locations.reduce((sum, item) => sum + item.used, 0);
    const avgUsage = totalCap ? ((totalUsed / totalCap) * 100).toFixed(1) : '0.0';

    renderers.stats([
      { icon: '🗺️', value: data.locations.length, label: '货位数量' },
      { icon: '📦', value: totalCap, label: '总容量' },
      { icon: '📊', value: avgUsage + '%', label: '平均使用率' }
    ]);

    layoutBody.innerHTML = data.locations.map((item) => {
      const usage = item.capacity ? ((item.used / item.capacity) * 100).toFixed(1) : '0.0';
      return `
        <tr>
          <td>${item.id}</td>
          <td><strong>${item.code}</strong></td>
          <td>${item.zone}</td>
          <td>${item.type}</td>
          <td>${item.capacity}</td>
          <td>${item.used}</td>
          <td>${usage}%</td>
          <td><span class="badge badge-success">${item.status}</span></td>
        </tr>
      `;
    }).join('');

    detailBody.innerHTML = data.inventory.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td>${item.category}</td>
        <td>${item.spec}</td>
        <td>${item.location}</td>
        <td>${item.stock} ${item.unit}</td>
        <td>${item.lastUpdate}</td>
      </tr>
    `).join('');

    layoutBody.dataset.bound = '1';
  }

  function initOperationPage() {
    const inboundBody = document.getElementById('inbound-tbody');
    const outboundBody = document.getElementById('outbound-tbody');
    if (!inboundBody || !outboundBody || inboundBody.dataset.bound === '1') return;

    const data = store.sync();
    renderers.stats([
      { icon: '📥', value: data.inbound.length, label: '入库单数' },
      { icon: '📤', value: data.outbound.length, label: '出库单数' },
      { icon: '📦', value: data.inbound.reduce((sum, item) => sum + item.quantity, 0), label: '入库总量' },
      { icon: '🚚', value: data.outbound.reduce((sum, item) => sum + item.quantity, 0), label: '出库总量' }
    ]);

    inboundBody.innerHTML = data.inbound.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.item}</strong></td>
        <td>${item.quantity} ${item.unit}</td>
        <td>${item.supplier}</td>
        <td>${item.date}</td>
        <td>${item.operator}</td>
      </tr>
    `).join('');

    outboundBody.innerHTML = data.outbound.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.item}</strong></td>
        <td>${item.quantity} ${item.unit}</td>
        <td>${item.customer}</td>
        <td>${item.date}</td>
        <td>${item.operator}</td>
      </tr>
    `).join('');

    inboundBody.dataset.bound = '1';
  }

  function initTransportPage() {
    const transportBody = document.getElementById('transport-tbody');
    const sourceBody = document.getElementById('source-tbody');
    if (!transportBody || !sourceBody || transportBody.dataset.bound === '1') return;

    const data = store.sync();
    const today = new Date();
    renderers.stats([
      { icon: '📤', value: data.outbound.length, label: '出库单数' },
      { icon: '🚚', value: data.outbound.reduce((sum, item) => sum + item.quantity, 0), label: '出库总量' },
      { icon: '📥', value: data.inbound.length, label: '入库单数' },
      { icon: '📦', value: data.inbound.reduce((sum, item) => sum + item.quantity, 0), label: '入库总量' }
    ]);

    transportBody.innerHTML = data.outbound.map((item) => {
      const outDate = new Date(item.date);
      const daysSince = Math.ceil((today - outDate) / (1000 * 60 * 60 * 24));
      const statusText = daysSince < 0 ? `计划中 (${Math.abs(daysSince)}天后)` : daysSince === 0 ? '今日' : `${daysSince} 天前`;
      return `
        <tr>
          <td>${item.id}</td>
          <td><strong>${item.item}</strong></td>
          <td>${item.quantity} ${item.unit}</td>
          <td>${item.customer}</td>
          <td>${item.date}</td>
          <td>${item.operator}</td>
          <td>${statusText}</td>
        </tr>
      `;
    }).join('');

    sourceBody.innerHTML = data.inbound.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.item}</strong></td>
        <td>${item.quantity} ${item.unit}</td>
        <td>${item.supplier}</td>
        <td>${item.date}</td>
        <td>${item.operator}</td>
      </tr>
    `).join('');

    transportBody.dataset.bound = '1';
  }

  function initWarningPage() {
    const warningBody = document.getElementById('warning-tbody');
    const normalBody = document.getElementById('normal-tbody');
    if (!warningBody || !normalBody || warningBody.dataset.bound === '1') return;

    const inventory = store.sync().inventory;
    const lowItems = inventory.filter((item) => item.stock < item.minStock);
    const normalItems = inventory.filter((item) => item.stock >= item.minStock);

    renderers.stats([
      { icon: '📦', value: inventory.length, label: '库存品类' },
      { icon: '⚠️', value: lowItems.length, label: '预警品类' },
      { icon: '✅', value: normalItems.length, label: '库存正常' }
    ]);

    warningBody.innerHTML = lowItems.length === 0
      ? '<tr><td colspan="8" style="text-align:center;color:var(--color-text-secondary);padding:var(--spacing-xl)">🎉 暂无库存预警</td></tr>'
      : lowItems.map((item) => {
        const gap = item.minStock - item.stock;
        const urgency = item.stock / item.minStock < 0.5 ? '紧急' : '一般';
        return `
          <tr>
            <td>${item.id}</td>
            <td><strong>${item.name}</strong></td>
            <td>${item.category}</td>
            <td>${item.spec}</td>
            <td><span style="color:var(--color-danger);font-weight:600">${item.stock} ${item.unit}</span></td>
            <td>${item.minStock} ${item.unit}</td>
            <td><span style="color:var(--color-danger);font-weight:600">${gap} ${item.unit}</span></td>
            <td><span class="badge ${urgency === '紧急' ? 'badge-danger' : 'badge-warning'}">${urgency}</span></td>
          </tr>
        `;
      }).join('');

    normalBody.innerHTML = normalItems.map((item) => {
      const ratio = item.minStock ? ((item.stock / item.minStock) * 100).toFixed(0) : '0';
      return `
        <tr>
          <td>${item.id}</td>
          <td><strong>${item.name}</strong></td>
          <td>${item.category}</td>
          <td>${item.stock} ${item.unit}</td>
          <td>${item.minStock} ${item.unit}</td>
          <td>${ratio}%</td>
        </tr>
      `;
    }).join('');

    warningBody.dataset.bound = '1';
  }

  function init() {
    switch (view.pageName()) {
      case 'index.html':
        if (document.getElementById('inventory-tbody')) initIndexPage();
        break;
      case 'layout.html':
        initLayoutPage();
        break;
      case 'operation.html':
        initOperationPage();
        break;
      case 'transport.html':
        initTransportPage();
        break;
      case 'warning.html':
        initWarningPage();
        break;
      default:
        break;
    }
  }

  return {
    init
  };
})(warehouseSystem.store, warehouseSystem.renderers, EnterpriseView);

warehouseSystem.init = function() {
  try {
    warehouseSystem.pages.init();
  } catch (error) {
    console.error('warehouseSystem.init failed:', error);
  }
};

warehouseSystem.getState = function() {
  return warehouseSystem.store.snapshot();
};

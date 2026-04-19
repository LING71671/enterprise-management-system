'use strict';

window.warehouseSystem = window.warehouseSystem || {};

// 仓储管理本地状态：库存、入库、出库、货位。
warehouseSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_warehouse_state',
  fields: [
    { name: 'inventory', type: 'array' },
    { name: 'inbound', type: 'array' },
    { name: 'outbound', type: 'array' },
    { name: 'locations', type: 'array' }
  ],
  getDefaults() {
    const source = typeof warehouseData !== 'undefined' ? warehouseData : {};
    return {
      inventory: EnterpriseState.clone(source.inventory || []),
      inbound: EnterpriseState.clone(source.inbound || []),
      outbound: EnterpriseState.clone(source.outbound || []),
      locations: EnterpriseState.clone(source.locations || [])
    };
  }
});

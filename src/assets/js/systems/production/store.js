'use strict';

window.productionSystem = window.productionSystem || {};

// 生产管理本地状态：计划、任务、物料、订单、质检。
productionSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_production_state',
  fields: [
    { name: 'plans', type: 'array' },
    { name: 'tasks', type: 'array' },
    { name: 'materials', type: 'array' },
    { name: 'orders', type: 'array' },
    { name: 'qualityRecords', type: 'array' }
  ],
  getDefaults() {
    const source = typeof productionData !== 'undefined' ? productionData : {};
    return {
      plans: EnterpriseState.clone(source.plans || []),
      tasks: EnterpriseState.clone(source.tasks || []),
      materials: EnterpriseState.clone(source.materials || []),
      orders: EnterpriseState.clone(source.orders || []),
      qualityRecords: EnterpriseState.clone(source.qualityRecords || [])
    };
  }
});

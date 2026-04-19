'use strict';

window.productionSystem = window.productionSystem || {};

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

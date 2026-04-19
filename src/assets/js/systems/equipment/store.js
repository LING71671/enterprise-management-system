'use strict';

window.equipmentSystem = window.equipmentSystem || {};

// 设备管理本地状态：设备档案、维护计划、故障记录。
equipmentSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_equipment_state',
  fields: [
    { name: 'equipment', type: 'array' },
    { name: 'maintenance', type: 'array' },
    { name: 'faults', type: 'array' }
  ],
  getDefaults() {
    const source = typeof equipmentData !== 'undefined' ? equipmentData : {};
    return {
      equipment: EnterpriseState.clone(source.equipment || []),
      maintenance: EnterpriseState.clone(source.maintenance || []),
      faults: EnterpriseState.clone(source.faults || [])
    };
  }
});

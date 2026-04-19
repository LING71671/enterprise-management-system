'use strict';

window.equipmentSystem = window.equipmentSystem || {};

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

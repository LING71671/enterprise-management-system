'use strict';

window.equipmentSystem = window.equipmentSystem || {};

equipmentSystem.actions = (function(store) {
  // 新增设备档案。
  function createEquipment(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('EQ', state.equipment),
        name: payload.name,
        model: payload.model || 'NEW-100',
        location: payload.location || '新车间',
        status: payload.status || '运行中',
        purchaseDate: payload.purchaseDate || '2026-04-19',
        lastMaintain: payload.lastMaintain || '2026-04-19',
        nextMaintain: payload.nextMaintain || '2026-07-19'
      };

      state.equipment.push(item);
      return item;
    });
  }

  // 删除设备档案。
  function deleteEquipment(id) {
    store.mutate((state) => {
      state.equipment = state.equipment.filter((item) => item.id !== id);
    });
  }

  // 新增设备维护计划。
  function createMaintenance(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('MT', state.maintenance),
        equipId: payload.equipId || '',
        equipName: payload.equipName,
        type: payload.type || '定期保养',
        planDate: payload.planDate || '2026-05-01',
        status: payload.status || '待执行',
        technician: payload.technician || '张工',
        cost: Number(payload.cost) || 0
      };

      state.maintenance.push(item);
      return item;
    });
  }

  // 删除设备维护计划。
  function deleteMaintenance(id) {
    store.mutate((state) => {
      state.maintenance = state.maintenance.filter((item) => item.id !== id);
    });
  }

  // 新增设备故障记录。
  function createFault(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('FT', state.faults),
        equipId: payload.equipId || '',
        equipName: payload.equipName,
        faultDate: payload.faultDate || '2026-04-19',
        description: payload.description || '待补充',
        severity: payload.severity || '一般',
        status: payload.status || '待处理',
        handler: payload.handler || '张工'
      };

      state.faults.push(item);
      return item;
    });
  }

  // 删除设备故障记录。
  function deleteFault(id) {
    store.mutate((state) => {
      state.faults = state.faults.filter((item) => item.id !== id);
    });
  }

  return {
    createEquipment,
    deleteEquipment,
    createMaintenance,
    deleteMaintenance,
    createFault,
    deleteFault
  };
})(equipmentSystem.store);

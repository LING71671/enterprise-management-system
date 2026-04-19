'use strict';

const equipmentModule = (function(system) {
  // 设备管理兼容入口，真实页面逻辑由 equipmentSystem 负责。
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createEquipment: (...args) => system.actions.createEquipment(...args),
    deleteEquipment: (...args) => system.actions.deleteEquipment(...args),
    createMaintenance: (...args) => system.actions.createMaintenance(...args),
    deleteMaintenance: (...args) => system.actions.deleteMaintenance(...args),
    createFault: (...args) => system.actions.createFault(...args),
    deleteFault: (...args) => system.actions.deleteFault(...args)
  };
})(window.equipmentSystem);

window.equipmentModule = equipmentModule;

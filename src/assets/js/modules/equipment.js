'use strict';

const equipmentModule = (function(system) {
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

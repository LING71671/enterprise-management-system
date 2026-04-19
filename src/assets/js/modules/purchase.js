'use strict';

const purchaseModule = (function(system) {
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createSupplier: (...args) => system.actions.createSupplier(...args),
    deleteSupplier: (...args) => system.actions.deleteSupplier(...args),
    createOrder: (...args) => system.actions.createOrder(...args)
  };
})(window.purchaseSystem);

window.purchaseModule = purchaseModule;

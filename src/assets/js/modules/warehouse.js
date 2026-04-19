'use strict';

const warehouseModule = (function(system) {
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState()
  };
})(window.warehouseSystem);

window.warehouseModule = warehouseModule;

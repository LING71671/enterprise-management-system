'use strict';

const warehouseModule = (function(system) {
  // 仓储管理兼容入口，真实页面逻辑由 warehouseSystem 负责。
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

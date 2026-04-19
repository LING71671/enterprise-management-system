'use strict';

const productionModule = (function(system) {
  // 生产管理兼容入口，真实页面逻辑由 productionSystem 负责。
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createPlan: (...args) => system.actions.createPlan(...args),
    deletePlan: (...args) => system.actions.deletePlan(...args)
  };
})(window.productionSystem);

window.productionModule = productionModule;

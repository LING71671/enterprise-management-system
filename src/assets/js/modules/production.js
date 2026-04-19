'use strict';

const productionModule = (function(system) {
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

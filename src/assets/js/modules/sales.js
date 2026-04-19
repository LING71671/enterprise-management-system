'use strict';

const salesModule = (function(system) {
  // 销售管理兼容入口，真实页面逻辑由 salesSystem 负责。
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createCustomer: (...args) => system.actions.createCustomer(...args),
    deleteCustomer: (...args) => system.actions.deleteCustomer(...args),
    createOrder: (...args) => system.actions.createOrder(...args),
    createPricing: (...args) => system.actions.createPricing(...args)
  };
})(window.salesSystem);

window.salesModule = salesModule;

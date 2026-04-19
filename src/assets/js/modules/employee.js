'use strict';

const employeeModule = (function(system) {
  // 员工管理兼容入口，真实页面逻辑由 employeeSystem 负责。
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createEmployee: (...args) => system.actions.createEmployee(...args),
    updateEmployee: (...args) => system.actions.updateEmployee(...args),
    deleteEmployee: (...args) => system.actions.deleteEmployee(...args),
    createRecruitment: (...args) => system.actions.createRecruitment(...args),
    deleteRecruitment: (...args) => system.actions.deleteRecruitment(...args)
  };
})(window.employeeSystem);

window.employeeModule = employeeModule;

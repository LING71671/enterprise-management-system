'use strict';

window.employeeSystem = window.employeeSystem || {};

employeeSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_employee_state',
  fields: [
    { name: 'employees', type: 'array' },
    { name: 'attendance', type: 'array' },
    { name: 'recruitment', type: 'array' },
    { name: 'performance', type: 'array' }
  ],
  getDefaults() {
    const source = typeof employeeData !== 'undefined' ? employeeData : {};
    return {
      employees: EnterpriseState.clone(source.employees || []),
      attendance: EnterpriseState.clone(source.attendance || []),
      recruitment: EnterpriseState.clone(source.recruitment || []),
      performance: EnterpriseState.clone(source.performance || [])
    };
  }
});

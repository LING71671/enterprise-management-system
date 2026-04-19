'use strict';

window.employeeSystem = window.employeeSystem || {};

employeeSystem.actions = (function(store) {
  function createEmployee(payload) {
    return store.mutate((state) => {
      const employee = {
        id: EnterpriseState.nextId('E', state.employees),
        name: payload.name,
        gender: payload.gender || '男',
        dept: payload.dept || '未分配',
        position: payload.position || '待定',
        phone: payload.phone || '',
        email: payload.email || '',
        entryDate: payload.entryDate || '',
        salary: Number(payload.salary) || 0,
        status: payload.status || '试用期'
      };

      state.employees.push(employee);
      return employee;
    });
  }

  function updateEmployee(id, payload) {
    return store.mutate((state) => {
      const employee = state.employees.find((item) => item.id === id);
      if (!employee) return null;

      Object.assign(employee, {
        name: payload.name,
        gender: payload.gender,
        dept: payload.dept,
        position: payload.position,
        phone: payload.phone,
        email: payload.email,
        entryDate: payload.entryDate,
        salary: Number(payload.salary) || 0
      });
      return employee;
    });
  }

  function deleteEmployee(id) {
    store.mutate((state) => {
      state.employees = state.employees.filter((item) => item.id !== id);
    });
  }

  function createRecruitment(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('R', state.recruitment),
        position: payload.position,
        dept: payload.dept || '人事部',
        headcount: Number(payload.headcount) || 1,
        status: payload.status || '待发布',
        publishDate: payload.publishDate || '2026-04-19',
        deadline: payload.deadline || '2026-05-19',
        applicants: Number(payload.applicants) || 0
      };

      state.recruitment.push(item);
      return item;
    });
  }

  function deleteRecruitment(id) {
    store.mutate((state) => {
      state.recruitment = state.recruitment.filter((item) => item.id !== id);
    });
  }

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    createRecruitment,
    deleteRecruitment
  };
})(employeeSystem.store);

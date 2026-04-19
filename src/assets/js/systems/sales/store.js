'use strict';

window.salesSystem = window.salesSystem || {};

// 销售管理本地状态：客户、订单、报表、定价、团队。
salesSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_sales_state',
  fields: [
    { name: 'customers', type: 'array' },
    { name: 'orders', type: 'array' },
    { name: 'report', type: 'object' },
    { name: 'pricing', type: 'array' },
    { name: 'team', type: 'array' }
  ],
  getDefaults() {
    const source = typeof salesData !== 'undefined' ? salesData : {};
    return {
      customers: EnterpriseState.clone(source.customers || []),
      orders: EnterpriseState.clone(source.orders || []),
      report: EnterpriseState.clone(source.report || { monthly: [] }),
      pricing: EnterpriseState.clone(source.pricing || []),
      team: EnterpriseState.clone(source.team || [])
    };
  }
});

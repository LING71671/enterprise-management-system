'use strict';

window.purchaseSystem = window.purchaseSystem || {};

// 采购管理本地状态：供应商、采购订单、采购分析。
purchaseSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_purchase_state',
  fields: [
    { name: 'suppliers', type: 'array' },
    { name: 'orders', type: 'array' },
    { name: 'analysis', type: 'object' }
  ],
  getDefaults() {
    const source = typeof purchaseData !== 'undefined' ? purchaseData : {};
    return {
      suppliers: EnterpriseState.clone(source.suppliers || []),
      orders: EnterpriseState.clone(source.orders || []),
      analysis: EnterpriseState.clone(source.analysis || { monthly: [] })
    };
  }
});

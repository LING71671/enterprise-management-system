'use strict';

window.salesSystem = window.salesSystem || {};

salesSystem.actions = (function(store) {
  // 新增客户档案。
  function createCustomer(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('C', state.customers),
        name: payload.name,
        contact: payload.contact || '待定',
        phone: payload.phone || '',
        email: payload.email || '',
        city: payload.city || '北京',
        level: payload.level || '普通',
        totalAmount: Number(payload.totalAmount) || 0
      };

      state.customers.push(item);
      return item;
    });
  }

  // 删除客户档案。
  function deleteCustomer(id) {
    store.mutate((state) => {
      state.customers = state.customers.filter((item) => item.id !== id);
    });
  }

  // 新增销售订单并计算订单金额。
  function createOrder(payload) {
    return store.mutate((state) => {
      const quantity = Number(payload.quantity) || 0;
      const unitPrice = Number(payload.unitPrice) || 0;
      const item = {
        id: EnterpriseState.nextId('SO', state.orders),
        customerId: payload.customerId || '',
        customerName: payload.customerName,
        product: payload.product,
        quantity,
        unitPrice,
        amount: quantity * unitPrice,
        status: payload.status || '待审核',
        createDate: payload.createDate || '2026-04-19',
        deliveryDate: payload.deliveryDate || '2026-05-05'
      };

      state.orders.push(item);
      return item;
    });
  }

  // 新增产品定价策略并计算折扣。
  function createPricing(payload) {
    return store.mutate((state) => {
      const standardPrice = Number(payload.standardPrice) || 0;
      const currentPrice = Number(payload.currentPrice) || standardPrice;
      const item = {
        id: EnterpriseState.nextId('PR', state.pricing),
        product: payload.product,
        standardPrice,
        currentPrice,
        discount: standardPrice ? Number((currentPrice / standardPrice).toFixed(2)) : 1,
        validFrom: payload.validFrom || '2026-04-19',
        validTo: payload.validTo || '2026-12-31',
        status: payload.status || '生效中'
      };

      state.pricing.push(item);
      return item;
    });
  }

  return {
    createCustomer,
    deleteCustomer,
    createOrder,
    createPricing
  };
})(salesSystem.store);

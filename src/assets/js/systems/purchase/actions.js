'use strict';

window.purchaseSystem = window.purchaseSystem || {};

purchaseSystem.actions = (function(store) {
  // 新增供应商档案。
  function createSupplier(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('S', state.suppliers),
        name: payload.name,
        contact: payload.contact || '待定',
        phone: payload.phone || '',
        category: payload.category || '原材料',
        rating: Number(payload.rating) || 3,
        status: payload.status || '合作中'
      };

      state.suppliers.push(item);
      return item;
    });
  }

  // 删除供应商档案。
  function deleteSupplier(id) {
    store.mutate((state) => {
      state.suppliers = state.suppliers.filter((item) => item.id !== id);
    });
  }

  // 新增采购订单并计算订单金额。
  function createOrder(payload) {
    return store.mutate((state) => {
      const quantity = Number(payload.quantity) || 0;
      const unitPrice = Number(payload.unitPrice) || 0;
      const item = {
        id: EnterpriseState.nextId('PUR', state.orders),
        supplierId: payload.supplierId || '',
        supplierName: payload.supplierName,
        item: payload.item,
        quantity,
        unit: payload.unit || '件',
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

  return {
    createSupplier,
    deleteSupplier,
    createOrder
  };
})(purchaseSystem.store);

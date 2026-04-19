'use strict';

// 采购管理子系统的种子数据，localStorage 为空时用于初始化页面。
const purchaseData = {
  suppliers: [
    { id: 'S001', name: '北京钢铁供应商', contact: '刘总', phone: '13700001001', category: '原材料', rating: 5, status: '合作中' },
    { id: 'S002', name: '上海电机制造', contact: '陈经理', phone: '13700001002', category: '零部件', rating: 4, status: '合作中' },
    { id: 'S003', name: '广州橡胶制品', contact: '黄总', phone: '13700001003', category: '辅材', rating: 3, status: '合作中' },
    { id: 'S004', name: '深圳精密零件', contact: '周总', phone: '13700001004', category: '零部件', rating: 5, status: '合作中' },
    { id: 'S005', name: '天津化工原料', contact: '吴经理', phone: '13700001005', category: '原材料', rating: 2, status: '暂停' },
  ],

  orders: [
    { id: 'PUR001', supplierId: 'S001', supplierName: '北京钢铁供应商', item: '钢材Q235', quantity: 20, unit: '吨', unitPrice: 4500, amount: 90000, status: '已到货', createDate: '2026-03-01', deliveryDate: '2026-03-15' },
    { id: 'PUR002', supplierId: 'S002', supplierName: '上海电机制造', item: '3kW电机', quantity: 20, unit: '台', unitPrice: 3200, amount: 64000, status: '运输中', createDate: '2026-03-05', deliveryDate: '2026-03-22' },
    { id: 'PUR003', supplierId: 'S003', supplierName: '广州橡胶制品', item: '橡胶密封圈', quantity: 1200, unit: '个', unitPrice: 15, amount: 18000, status: '待发货', createDate: '2026-03-10', deliveryDate: '2026-03-28' },
    { id: 'PUR004', supplierId: 'S004', supplierName: '深圳精密零件', item: '精密轴承', quantity: 50, unit: '套', unitPrice: 680, amount: 34000, status: '待审核', createDate: '2026-03-15', deliveryDate: '2026-04-05' },
  ],

  analysis: {
    monthly: [
      { month: '2025-10', amount: 320000, orders: 8 },
      { month: '2025-11', amount: 280000, orders: 7 },
      { month: '2025-12', amount: 450000, orders: 12 },
      { month: '2026-01', amount: 190000, orders: 5 },
      { month: '2026-02', amount: 360000, orders: 9 },
      { month: '2026-03', amount: 206000, orders: 4 },
    ]
  }
};

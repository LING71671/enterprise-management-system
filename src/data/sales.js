'use strict';

// 销售管理子系统的种子数据，localStorage 为空时用于初始化页面。
const salesData = {
  customers: [
    { id: 'C001', name: '北京科技有限公司', contact: '张总', phone: '13900001001', email: 'zhang@bjtech.com', city: '北京', level: 'VIP', totalAmount: 580000 },
    { id: 'C002', name: '上海贸易集团', contact: '李经理', phone: '13900001002', email: 'li@shtrade.com', city: '上海', level: '普通', totalAmount: 230000 },
    { id: 'C003', name: '广州制造有限公司', contact: '王总', phone: '13900001003', email: 'wang@gzmfg.com', city: '广州', level: 'VIP', totalAmount: 920000 },
    { id: 'C004', name: '深圳电子科技', contact: '赵总', phone: '13900001004', email: 'zhao@szelec.com', city: '深圳', level: '重要', totalAmount: 450000 },
    { id: 'C005', name: '成都智能装备', contact: '陈总', phone: '13900001005', email: 'chen@cdequip.com', city: '成都', level: '普通', totalAmount: 120000 },
  ],

  orders: [
    { id: 'SO001', customerId: 'C001', customerName: '北京科技有限公司', product: '产品A', quantity: 200, unitPrice: 1200, amount: 240000, status: '已完成', createDate: '2026-03-01', deliveryDate: '2026-03-20' },
    { id: 'SO002', customerId: 'C003', customerName: '广州制造有限公司', product: '产品B', quantity: 150, unitPrice: 980, amount: 147000, status: '配送中', createDate: '2026-03-05', deliveryDate: '2026-03-25' },
    { id: 'SO003', customerId: 'C004', customerName: '深圳电子科技', product: '产品A', quantity: 300, unitPrice: 1200, amount: 360000, status: '待发货', createDate: '2026-03-10', deliveryDate: '2026-04-05' },
    { id: 'SO004', customerId: 'C002', customerName: '上海贸易集团', product: '产品C', quantity: 100, unitPrice: 2300, amount: 230000, status: '待审核', createDate: '2026-03-15', deliveryDate: '2026-04-10' },
    { id: 'SO005', customerId: 'C005', customerName: '成都智能装备', product: '产品B', quantity: 80, unitPrice: 980, amount: 78400, status: '已完成', createDate: '2026-02-20', deliveryDate: '2026-03-10' },
  ],

  report: {
    monthly: [
      { month: '2025-10', revenue: 680000, orders: 12, newCustomers: 2 },
      { month: '2025-11', revenue: 750000, orders: 15, newCustomers: 3 },
      { month: '2025-12', revenue: 920000, orders: 18, newCustomers: 4 },
      { month: '2026-01', revenue: 560000, orders: 10, newCustomers: 1 },
      { month: '2026-02', revenue: 830000, orders: 16, newCustomers: 3 },
      { month: '2026-03', revenue: 1055400, orders: 5, newCustomers: 1 },
    ]
  },

  pricing: [
    { id: 'PR001', product: '产品A', standardPrice: 1500, currentPrice: 1200, discount: 0.8, validFrom: '2026-01-01', validTo: '2026-06-30', status: '生效中' },
    { id: 'PR002', product: '产品B', standardPrice: 1200, currentPrice: 980, discount: 0.82, validFrom: '2026-01-01', validTo: '2026-06-30', status: '生效中' },
    { id: 'PR003', product: '产品C', standardPrice: 2300, currentPrice: 2300, discount: 1.0, validFrom: '2026-03-01', validTo: '2026-12-31', status: '生效中' },
  ],

  team: [
    { id: 'T001', name: '李娜', role: '销售经理', region: '华北', target: 2000000, achieved: 1580000, rate: 0.79 },
    { id: 'T002', name: '吴静', role: '销售专员', region: '华东', target: 800000, achieved: 455400, rate: 0.57 },
    { id: 'T003', name: '刘洋', role: '销售专员', region: '华南', target: 1000000, achieved: 920000, rate: 0.92 },
  ]
};

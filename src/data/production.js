'use strict';

const productionData = {
  plans: [
    { id: 'PP001', name: '2026年Q1生产计划', startDate: '2026-01-01', endDate: '2026-03-31', status: '进行中', products: ['产品A', '产品B'] },
    { id: 'PP002', name: '2026年Q2生产计划', startDate: '2026-04-01', endDate: '2026-06-30', status: '待启动', products: ['产品C', '产品D'] },
    { id: 'PP003', name: '特供订单生产计划', startDate: '2026-03-10', endDate: '2026-03-25', status: '已完成', products: ['产品A'] },
  ],

  tasks: [
    { id: 'PT001', planId: 'PP001', productName: '产品A', quantity: 500, progress: 80, assignee: '王磊', deadline: '2026-03-20' },
    { id: 'PT002', planId: 'PP001', productName: '产品B', quantity: 300, progress: 60, assignee: '陈浩', deadline: '2026-03-25' },
    { id: 'PT003', planId: 'PP001', productName: '产品C', quantity: 200, progress: 100, assignee: '王磊', deadline: '2026-03-10' },
    { id: 'PT004', planId: 'PP002', productName: '产品D', quantity: 400, progress: 0, assignee: '周强', deadline: '2026-05-15' },
  ],

  materials: [
    { id: 'PM001', name: '钢材', spec: 'Q235 10mm', unit: '吨', required: 50, stock: 35, shortage: 15 },
    { id: 'PM002', name: '铝合金', spec: '6061-T6', unit: '吨', required: 20, stock: 22, shortage: 0 },
    { id: 'PM003', name: '橡胶密封圈', spec: 'Φ50mm', unit: '个', required: 2000, stock: 800, shortage: 1200 },
    { id: 'PM004', name: '螺栓', spec: 'M12×50', unit: '箱', required: 100, stock: 120, shortage: 0 },
    { id: 'PM005', name: '电机', spec: '3kW 380V', unit: '台', required: 30, stock: 10, shortage: 20 },
  ],

  orders: [
    { id: 'PO001', customer: '北京科技有限公司', product: '产品A', quantity: 200, status: '生产中', createDate: '2026-03-01', deliveryDate: '2026-03-25' },
    { id: 'PO002', customer: '上海贸易集团', product: '产品B', quantity: 150, status: '待生产', createDate: '2026-03-05', deliveryDate: '2026-04-10' },
    { id: 'PO003', customer: '广州制造有限公司', product: '产品C', quantity: 100, status: '已完成', createDate: '2026-02-20', deliveryDate: '2026-03-10' },
    { id: 'PO004', customer: '深圳电子科技', product: '产品A', quantity: 300, status: '待审核', createDate: '2026-03-15', deliveryDate: '2026-04-20' },
  ],

  qualityRecords: [
    { id: 'PQ001', orderId: 'PO001', inspector: '周强', date: '2026-03-18', result: '合格', defects: 0 },
    { id: 'PQ002', orderId: 'PO003', inspector: '周强', date: '2026-03-10', result: '合格', defects: 2 },
    { id: 'PQ003', orderId: 'PO002', inspector: '周强', date: '2026-03-12', result: '不合格', defects: 15 },
  ]
};

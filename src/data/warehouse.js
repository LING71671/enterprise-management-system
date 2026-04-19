'use strict';

// 仓储管理子系统的种子数据，localStorage 为空时用于初始化页面。
const warehouseData = {
  inventory: [
    { id: 'W001', name: '产品A成品', category: '成品', spec: '标准型', unit: '件', stock: 320, minStock: 100, location: 'A-01-01', lastUpdate: '2026-03-18' },
    { id: 'W002', name: '产品B成品', category: '成品', spec: '标准型', unit: '件', stock: 85, minStock: 100, location: 'A-01-02', lastUpdate: '2026-03-17' },
    { id: 'W003', name: '钢材Q235', category: '原材料', spec: '10mm', unit: '吨', stock: 35, minStock: 20, location: 'B-02-01', lastUpdate: '2026-03-15' },
    { id: 'W004', name: '橡胶密封圈', category: '辅材', spec: 'Φ50mm', unit: '个', stock: 800, minStock: 500, location: 'C-03-02', lastUpdate: '2026-03-10' },
    { id: 'W005', name: '3kW电机', category: '零部件', spec: '380V', unit: '台', stock: 10, minStock: 15, location: 'B-02-03', lastUpdate: '2026-03-05' },
    { id: 'W006', name: '产品C成品', category: '成品', spec: '高级型', unit: '件', stock: 45, minStock: 50, location: 'A-02-01', lastUpdate: '2026-03-12' },
  ],

  inbound: [
    { id: 'IN001', item: '钢材Q235', quantity: 20, unit: '吨', supplier: '北京钢铁供应商', date: '2026-03-15', operator: '仓管员小张' },
    { id: 'IN002', item: '橡胶密封圈', quantity: 500, unit: '个', supplier: '广州橡胶制品', date: '2026-03-10', operator: '仓管员小李' },
    { id: 'IN003', item: '产品A成品', quantity: 100, unit: '件', supplier: '生产部', date: '2026-03-18', operator: '仓管员小张' },
  ],

  outbound: [
    { id: 'OUT001', item: '产品A成品', quantity: 200, unit: '件', customer: '北京科技有限公司', date: '2026-03-20', operator: '仓管员小李' },
    { id: 'OUT002', item: '产品C成品', quantity: 100, unit: '件', customer: '广州制造有限公司', date: '2026-03-10', operator: '仓管员小张' },
    { id: 'OUT003', item: '钢材Q235', quantity: 5, unit: '吨', customer: '生产部', date: '2026-03-16', operator: '仓管员小李' },
  ],

  locations: [
    { id: 'LOC001', code: 'A-01', zone: 'A区', type: '成品区', capacity: 500, used: 450, status: '正常' },
    { id: 'LOC002', code: 'A-02', zone: 'A区', type: '成品区', capacity: 300, used: 45, status: '正常' },
    { id: 'LOC003', code: 'B-02', zone: 'B区', type: '原材料区', capacity: 200, used: 120, status: '正常' },
    { id: 'LOC004', code: 'C-03', zone: 'C区', type: '辅材区', capacity: 1000, used: 800, status: '正常' },
  ]
};

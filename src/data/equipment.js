'use strict';

const equipmentData = {
  equipment: [
    { id: 'EQ001', name: '数控车床A', model: 'CNC-2000', location: '车间一', status: '运行中', purchaseDate: '2022-05-10', lastMaintain: '2026-02-15', nextMaintain: '2026-05-15' },
    { id: 'EQ002', name: '冲压机B', model: 'CP-500T', location: '车间二', status: '运行中', purchaseDate: '2021-08-20', lastMaintain: '2026-01-10', nextMaintain: '2026-04-10' },
    { id: 'EQ003', name: '焊接机器人C', model: 'WR-6A', location: '车间一', status: '维修中', purchaseDate: '2023-03-15', lastMaintain: '2026-03-01', nextMaintain: '2026-06-01' },
    { id: 'EQ004', name: '喷涂设备D', model: 'SP-200', location: '车间三', status: '停机', purchaseDate: '2020-11-05', lastMaintain: '2025-11-05', nextMaintain: '2026-02-05' },
    { id: 'EQ005', name: '检测仪E', model: 'DT-100', location: '质检室', status: '运行中', purchaseDate: '2024-01-20', lastMaintain: '2026-03-10', nextMaintain: '2026-06-10' },
  ],

  maintenance: [
    { id: 'MT001', equipId: 'EQ001', equipName: '数控车床A', type: '定期保养', planDate: '2026-05-15', status: '待执行', technician: '李师傅', cost: 2000 },
    { id: 'MT002', equipId: 'EQ002', equipName: '冲压机B', type: '定期保养', planDate: '2026-04-10', status: '待执行', technician: '王师傅', cost: 3500 },
    { id: 'MT003', equipId: 'EQ003', equipName: '焊接机器人C', type: '故障维修', planDate: '2026-03-18', status: '进行中', technician: '张工', cost: 8000 },
    { id: 'MT004', equipId: 'EQ004', equipName: '喷涂设备D', type: '大修', planDate: '2026-03-20', status: '待执行', technician: '外包团队', cost: 25000 },
  ],

  faults: [
    { id: 'FT001', equipId: 'EQ003', equipName: '焊接机器人C', faultDate: '2026-03-01', description: '焊接精度下降，定位偏差超标', severity: '严重', status: '维修中', handler: '张工' },
    { id: 'FT002', equipId: 'EQ004', equipName: '喷涂设备D', faultDate: '2026-02-20', description: '喷涂压力不稳定，出现断流', severity: '一般', status: '待处理', handler: '外包团队' },
    { id: 'FT003', equipId: 'EQ001', equipName: '数控车床A', faultDate: '2026-01-15', description: '主轴异响，已更换轴承', severity: '一般', status: '已解决', handler: '李师傅' },
  ]
};

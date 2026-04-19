'use strict';

window.equipmentSystem = window.equipmentSystem || {};

equipmentSystem.renderers = (function(view) {
  const equipmentStatusMap = { 运行中: 'badge-success', 维修中: 'badge-warning', 停机: 'badge-danger' };
  const maintenanceStatusMap = { 待执行: 'badge-warning', 进行中: 'badge-info', 已完成: 'badge-success' };
  const severityMap = { 严重: 'badge-danger', 一般: 'badge-warning', 轻微: 'badge-info' };
  const faultStatusMap = { 维修中: 'badge-warning', 待处理: 'badge-danger', 已解决: 'badge-success' };

  // 渲染设备管理页面顶部统计卡片。
  function stats(items) {
    view.setHtml('stats-grid', view.renderStats(items));
  }

  return {
    stats,
    equipmentStatusMap,
    maintenanceStatusMap,
    severityMap,
    faultStatusMap
  };
})(EnterpriseView);

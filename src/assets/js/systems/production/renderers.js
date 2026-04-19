'use strict';

window.productionSystem = window.productionSystem || {};

productionSystem.renderers = (function(view) {
  const orderStatusMap = { 已完成: 'badge-success', 生产中: 'badge-info', 待生产: 'badge-warning', 待审核: 'badge-default' };
  const planStatusMap = { 进行中: 'badge-success', 待启动: 'badge-warning', 已完成: 'badge-info' };

  // 渲染生产管理页面顶部统计卡片。
  function stats(items) {
    view.setHtml('stats-grid', view.renderStats(items));
  }

  return {
    stats,
    orderStatusMap,
    planStatusMap,
    renderProgress: view.renderProgress
  };
})(EnterpriseView);

'use strict';

window.salesSystem = window.salesSystem || {};

salesSystem.renderers = (function(view) {
  const orderStatusMap = { 已完成: 'badge-success', 配送中: 'badge-info', 待发货: 'badge-warning', 待审核: 'badge-default' };
  const levelMap = { VIP: 'badge-danger', 重要: 'badge-warning', 普通: 'badge-default' };

  // 渲染销售管理页面顶部统计卡片。
  function stats(items) {
    view.setHtml('stats-grid', view.renderStats(items));
  }

  return {
    stats,
    orderStatusMap,
    levelMap
  };
})(EnterpriseView);

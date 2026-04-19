'use strict';

window.purchaseSystem = window.purchaseSystem || {};

purchaseSystem.renderers = (function(view) {
  const orderStatusMap = { 已到货: 'badge-success', 运输中: 'badge-info', 待发货: 'badge-warning', 待审核: 'badge-default' };
  const supplierStatusMap = { 合作中: 'badge-success', 暂停: 'badge-warning' };

  // 渲染采购管理页面顶部统计卡片。
  function stats(items) {
    view.setHtml('stats-grid', view.renderStats(items));
  }

  // 渲染供应商评级星级。
  function stars(rating) {
    return '⭐'.repeat(rating) + '<span style="color:var(--color-text-secondary)">' + '☆'.repeat(5 - rating) + '</span>';
  }

  return {
    stats,
    stars,
    orderStatusMap,
    supplierStatusMap
  };
})(EnterpriseView);

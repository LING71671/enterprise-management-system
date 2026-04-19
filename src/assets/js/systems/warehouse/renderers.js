'use strict';

window.warehouseSystem = window.warehouseSystem || {};

warehouseSystem.renderers = (function(view) {
  function stats(items) {
    view.setHtml('stats-grid', view.renderStats(items));
  }

  return {
    stats
  };
})(EnterpriseView);

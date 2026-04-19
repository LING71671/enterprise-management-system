'use strict';

window.employeeSystem = window.employeeSystem || {};

employeeSystem.renderers = (function(view) {
  const employeeStatusMap = { 在职: 'badge-success', 试用期: 'badge-warning', 离职: 'badge-danger' };
  const recruitmentStatusMap = { 招聘中: 'badge-success', 已完成: 'badge-info', 待发布: 'badge-default' };
  const gradeMap = { 'A+': 'badge-success', A: 'badge-success', 'B+': 'badge-info', B: 'badge-info', C: 'badge-warning' };

  // 渲染员工管理页面顶部统计卡片。
  function stats(items) {
    view.setHtml('stats-grid', view.renderStats(items));
  }

  // 输出员工状态徽章。
  function employeeStatus(status) {
    return view.renderBadge(status, employeeStatusMap[status] || 'badge-default');
  }

  return {
    stats,
    employeeStatus,
    employeeStatusMap,
    recruitmentStatusMap,
    gradeMap
  };
})(EnterpriseView);

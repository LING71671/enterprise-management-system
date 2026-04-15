/**
 * 跨子系统共享工具函数
 * Shared utilities across all subsystems
 */

'use strict';

/**
 * 初始化页面公共组件（头部和侧边栏）
 * @param {string} headerPath - 头部组件路径（相对于页面）
 * @param {string} sidebarPath - 侧边栏组件路径（相对于页面）
 * @param {boolean} initMobileNav - 是否初始化移动端导航
 */
function initPageComponents(headerPath, sidebarPath, initMobileNav = true) {
  let headerLoaded = false;
  let sidebarLoaded = false;

  function tryInitMobileNav() {
    if (initMobileNav && headerLoaded && sidebarLoaded) {
      if (typeof MobileNav !== 'undefined') MobileNav.init();
    }
  }

  fetch(headerPath)
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById('header-placeholder');
      if (placeholder) {
        placeholder.innerHTML = html;
        if (typeof appNav !== 'undefined') appNav.init();
      }
      headerLoaded = true;
      tryInitMobileNav();
    })
    .catch(err => console.error('Header loading failed:', err));

  fetch(sidebarPath)
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById('sidebar-placeholder');
      if (placeholder) placeholder.innerHTML = html;
      sidebarLoaded = true;
      tryInitMobileNav();
    })
    .catch(err => console.error('Sidebar loading failed:', err));
}

/**
 * 渲染统计卡片
 * @param {string} containerId - 容器元素ID
 * @param {Array} stats - 统计数据数组 [{icon, value, label}]
 */
function renderStatsGrid(containerId, stats) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <div class="stat-icon">${stat.icon}</div>
      <div class="stat-info">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    </div>
  `).join('');
}

/**
 * 渲染表格
 * @param {string} tbodyId - tbody元素ID
 * @param {Array} data - 数据数组
 * @param {Function} rowRenderer - 行渲染函数
 */
function renderTable(tbodyId, data, rowRenderer) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = data.map(rowRenderer).join('');
}

/**
 * 员工状态徽章映射
 */
const EmployeeStatusBadgeMap = {
  '在职': 'badge-success',
  '试用期': 'badge-warning',
  '离职': 'badge-danger'
};

/**
 * 设备状态徽章映射
 */
const EquipmentStatusBadgeMap = {
  '运行中': 'badge-success',
  '维修中': 'badge-warning',
  '停机': 'badge-danger'
};

/**
 * 生产订单状态徽章映射
 */
const ProductionOrderStatusBadgeMap = {
  '已完成': 'badge-success',
  '生产中': 'badge-info',
  '待生产': 'badge-warning',
  '待审核': 'badge-default'
};

/**
 * 销售订单状态徽章映射
 */
const SalesOrderStatusBadgeMap = {
  '已完成': 'badge-success',
  '配送中': 'badge-info',
  '待发货': 'badge-warning',
  '待审核': 'badge-default'
};

/**
 * 采购订单状态徽章映射
 */
const PurchaseOrderStatusBadgeMap = {
  '已到货': 'badge-success',
  '运输中': 'badge-info',
  '待发货': 'badge-warning',
  '待审核': 'badge-default'
};

/**
 * 生产计划状态徽章映射
 */
const ProductionPlanStatusBadgeMap = {
  '进行中': 'badge-success',
  '待启动': 'badge-warning',
  '已完成': 'badge-info'
};

/**
 * 维护计划状态徽章映射
 */
const MaintenanceStatusBadgeMap = {
  '待执行': 'badge-warning',
  '进行中': 'badge-info',
  '已完成': 'badge-success'
};

/**
 * 质检结果徽章映射
 */
const QCStatusBadgeMap = {
  '合格': 'badge-success',
  '不合格': 'badge-danger'
};

/**
 * 客户等级徽章映射
 */
const CustomerLevelBadgeMap = {
  'VIP': 'badge-danger',
  '重要': 'badge-warning',
  '普通': 'badge-default'
};

/**
 * 供应商状态徽章映射
 */
const SupplierStatusBadgeMap = {
  '合作中': 'badge-success',
  '暂停': 'badge-warning'
};

/**
 * 招聘状态徽章映射
 */
const RecruitmentStatusBadgeMap = {
  '招聘中': 'badge-success',
  '已完成': 'badge-info',
  '待发布': 'badge-default'
};

/**
 * 通用状态徽章映射（向后兼容）
 * @deprecated 建议使用特定领域的映射
 */
const StatusBadgeMap = {
  // 通用状态
  'active': 'badge-success',
  'inactive': 'badge-default',
  'pending': 'badge-warning',
  'completed': 'badge-success',
  'failed': 'badge-danger'
};

/**
 * 获取员工状态徽章类名
 * @param {string} status - 状态值
 * @returns {string} 徽章类名
 */
function getEmployeeStatusBadgeClass(status) {
  return EmployeeStatusBadgeMap[status] || 'badge-default';
}

/**
 * 获取设备状态徽章类名
 * @param {string} status - 状态值
 * @returns {string} 徽章类名
 */
function getEquipmentStatusBadgeClass(status) {
  return EquipmentStatusBadgeMap[status] || 'badge-default';
}

/**
 * 获取生产订单状态徽章类名
 * @param {string} status - 状态值
 * @returns {string} 徽章类名
 */
function getProductionOrderStatusBadgeClass(status) {
  return ProductionOrderStatusBadgeMap[status] || 'badge-default';
}

/**
 * 获取销售订单状态徽章类名
 * @param {string} status - 状态值
 * @returns {string} 徽章类名
 */
function getSalesOrderStatusBadgeClass(status) {
  return SalesOrderStatusBadgeMap[status] || 'badge-default';
}

/**
 * 获取采购订单状态徽章类名
 * @param {string} status - 状态值
 * @returns {string} 徽章类名
 */
function getPurchaseOrderStatusBadgeClass(status) {
  return PurchaseOrderStatusBadgeMap[status] || 'badge-default';
}

/**
 * 创建模态框控制对象
 * @param {string} overlayId - 遮罩层ID
 * @returns {Object} 模态框控制对象 {open, close}
 */
function createModalController(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return null;

  return {
    open: () => addClass(overlay, 'active'),
    close: () => removeClass(overlay, 'active'),
    isOpen: () => hasClass(overlay, 'active')
  };
}

/**
 * 搜索过滤函数
 * @param {Array} data - 原始数据
 * @param {string} keyword - 搜索关键词
 * @param {Array} fields - 要搜索的字段
 * @returns {Array} 过滤后的数据
 */
function filterByKeyword(data, keyword, fields) {
  if (!keyword) return data;
  const kw = keyword.toLowerCase();
  return data.filter(item =>
    fields.some(field => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(kw);
    })
  );
}

/**
 * 带确认对话框的删除操作
 * @param {string} message - 确认消息
 * @param {Function} onConfirm - 确认后的回调
 */
function confirmDelete(message, onConfirm) {
  if (confirm(message)) {
    onConfirm();
  }
}

/**
 * 计算百分比
 * @param {number} value - 当前值
 * @param {number} total - 总值
 * @param {number} decimals - 小数位数
 * @returns {string} 百分比字符串
 */
function calculatePercentage(value, total, decimals = 1) {
  if (!total) return '0';
  return ((value / total) * 100).toFixed(decimals);
}

/**
 * 渲染进度条HTML
 * @param {number} percent - 百分比 (0-100)
 * @param {string} color - 颜色变量或CSS颜色值
 * @returns {string} 进度条HTML
 */
function renderProgressBar(percent, color = 'var(--color-primary)') {
  return `
    <div style="display:flex;align-items:center;gap:8px">
      <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
        <div style="width:${percent}%;height:100%;background:${color};border-radius:4px"></div>
      </div>
      <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:40px">${percent}%</span>
    </div>
  `;
}

// 导出共享函数（如果支持模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initPageComponents,
    renderStatsGrid,
    renderTable,
    EmployeeStatusBadgeMap,
    EquipmentStatusBadgeMap,
    ProductionOrderStatusBadgeMap,
    SalesOrderStatusBadgeMap,
    PurchaseOrderStatusBadgeMap,
    ProductionPlanStatusBadgeMap,
    MaintenanceStatusBadgeMap,
    QCStatusBadgeMap,
    CustomerLevelBadgeMap,
    SupplierStatusBadgeMap,
    RecruitmentStatusBadgeMap,
    StatusBadgeMap,
    getEmployeeStatusBadgeClass,
    getEquipmentStatusBadgeClass,
    getProductionOrderStatusBadgeClass,
    getSalesOrderStatusBadgeClass,
    getPurchaseOrderStatusBadgeClass,
    createModalController,
    filterByKeyword,
    confirmDelete,
    calculatePercentage,
    renderProgressBar
  };
}

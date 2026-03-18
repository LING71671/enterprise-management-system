# 文件内容规范

## CSS 文件

### `src/assets/css/base/variables.css`
定义全局 CSS 变量，所有样式统一引用。
```css
/* 示例结构 */
:root {
/* 主题色 */
--color-primary: #1890ff;
--color-success: #52c41a;
--color-warning: #faad14;
--color-danger: #f5222d;

/* 文字颜色 */
--color-text-primary: #333;
--color-text-secondary: #666;
--color-text-disabled: #ccc;

/* 背景色 */
--color-bg: #f5f5f5;
--color-bg-white: #fff;

/* 边框 */
--border-color: #e8e8e8;
--border-radius: 4px;

/* 间距 */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;

/* 字体 */
--font-size-sm: 12px;
--font-size-base: 14px;
--font-size-lg: 16px;

/* 阴影 */
--shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
--shadow-md: 0 4px 12px rgba(0,0,0,0.12);
}
```

### `src/assets/css/main.css`
样式入口文件，按顺序引入所有样式。
```css
/* 1. 基础样式 */
@import './base/reset.css';
@import './base/variables.css';
@import './base/typography.css';

/* 2. 组件样式 */
@import './components/header.css';
@import './components/sidebar.css';
@import './components/button.css';
@import './components/form.css';
@import './components/table.css';
@import './components/card.css';
@import './components/modal.css';

/* 3. 页面样式 */
@import './pages/login.css';
@import './pages/production.css';
@import './pages/sales.css';
@import './pages/equipment.css';
@import './pages/purchase.css';
@import './pages/warehouse.css';
@import './pages/employee.css';
```

---

## JavaScript 文件

### `src/assets/js/utils/dom.js`
DOM 操作工具函数。
```javascript
/* 应包含的功能 */
// 选择器
function $(selector) {}
function $$(selector) {}

// 元素创建
function createElement(tag, className, innerHTML) {}

// 事件绑定
function on(element, event, handler) {}
function delegate(parent, selector, event, handler) {}

// 类名操作
function addClass(element, className) {}
function removeClass(element, className) {}
function hasClass(element, className) {}
function toggleClass(element, className) {}

// 显示隐藏
function show(element) {}
function hide(element) {}
function toggle(element) {}
```

### `src/assets/js/utils/storage.js`
本地存储工具。
```javascript
/* 应包含的功能 */
const storage = {
// localStorage
set(key, value) {},
get(key) {},
remove(key) {},
clear() {},

// sessionStorage
session: {
set(key, value) {},
get(key) {},
remove(key) {},
clear() {}
}
};
```

### `src/assets/js/utils/format.js`
数据格式化工具。
```javascript
/* 应包含的功能 */
// 日期格式化
function formatDate(date, pattern) {}

// 数字格式化
function formatNumber(num, decimals) {}

// 金额格式化
function formatMoney(amount, currency) {}

// 百分比格式化
function formatPercent(value) {}
```

### `src/assets/js/utils/validate.js`
表单验证工具。
```javascript
/* 应包含的功能 */
const validators = {
// 必填
required(value, message) {},

// 邮箱
email(value, message) {},

// 手机号
phone(value, message) {},

// 长度范围
length(value, min, max, message) {},

// 数字范围
range(value, min, max, message) {}
};

// 验证表单
function validateForm(formData, rules) {}
```

### `src/assets/js/main.js`
JS 入口文件。
```javascript
/* 应包含的功能 */
// 1. 导入所有模块
// 2. 初始化应用
// 3. 绑定全局事件
// 4. 启动路由
```

---

## 模拟数据文件

### `src/data/production.js`
```javascript
/* 应包含的数据结构 */
const productionData = {
// 生产计划列表
plans: [
{ id, name, startDate, endDate, status, products: [] }
],

// 生产任务
tasks: [
{ id, planId, productName, quantity, progress, assignee, deadline }
],

// 物料需求
materials: [
{ id, name, spec, unit, required, stock, shortage }
],

// 生产订单
orders: [
{ id, customer, product, quantity, status, createDate, deliveryDate }
],

// 质检记录
qualityRecords: [
{ id, orderId, inspector, date, result, defects }
]
};
```

---

## HTML 页面模板

每个页面应包含：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>页面标题 - 企业管理系统</title>
<!-- 引入主样式 -->
<link rel="stylesheet" href="../../assets/css/main.css">
<!-- 引入页面专属样式（如有） -->
</head>
<body>
<!-- 引入公共组件 -->
<!-- 页面内容 -->
<!-- 引入JS文件 -->
<script src="../../assets/js/main.js"></script>
<script src="../../assets/js/modules/xxx.js"></script>
</body>
</html>
```

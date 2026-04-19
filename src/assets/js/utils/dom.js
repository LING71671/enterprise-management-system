'use strict';

// 企业管理静态页的单元素查询封装，减少各模块直接写 document.querySelector。
function $(selector, context) {
  return (context || document).querySelector(selector);
}

// 企业管理静态页的多元素查询封装，返回数组便于批量初始化组件。
function $$(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}

// 创建后台页面运行时需要的临时节点。
function createElement(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

// 安全绑定页面事件，适配部分业务页不存在某些按钮的情况。
function on(element, event, handler) {
  if (element) element.addEventListener(event, handler);
}

// 表格操作按钮使用事件委托，支持业务列表刷新后继续响应点击。
function delegate(parent, selector, event, handler) {
  on(parent, event, function (e) {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

// 为业务弹窗、导航项、按钮添加状态类。
function addClass(element, className) {
  if (element) element.classList.add(className);
}

// 移除业务弹窗、导航项、按钮状态类。
function removeClass(element, className) {
  if (element) element.classList.remove(className);
}

// 判断当前组件是否处于某个 UI 状态。
function hasClass(element, className) {
  return element ? element.classList.contains(className) : false;
}

// 切换侧边栏、菜单、弹窗状态类。
function toggleClass(element, className) {
  if (element) element.classList.toggle(className);
}

// 显示被隐藏的后台页面组件。
function show(element) {
  if (element) element.style.display = '';
}

// 隐藏后台页面组件但保留其 DOM 状态。
function hide(element) {
  if (element) element.style.display = 'none';
}

// 在显示和隐藏之间切换简单组件。
function toggle(element) {
  if (element) {
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }
}

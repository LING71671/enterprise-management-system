/**
 * DOM 操作工具库
 * 
 * 这个文件提供了一系列简化 DOM 操作的辅助函数。
 * DOM（Document Object Model）是浏览器用来表示网页结构的树形对象模型，
 * 通过这些工具函数，我们可以更方便地操作页面元素。
 *
 * 学习目标：
 * 1. 理解什么是 DOM 选择器
 * 2. 掌握元素的选择、创建、样式控制
 * 3. 理解事件绑定和事件委托的概念
 */

'use strict';

/**
 * 单元素选择器 - 类似于 jQuery 的 $ 函数
 * 
 * 作用：在页面中查找符合条件的第一个元素
 * 
 * @param {string} selector - CSS 选择器字符串，例如：
 *   - '#id' - 按 ID 选择
 *   - '.class' - 按类名选择
 *   - 'div' - 按标签名选择
 *   - '.list li' - 按层级选择
 * @param {Element} [context=document] - 可选，指定在哪个父元素内查找
 * @returns {Element|null} 找到的元素，如果没找到返回 null
 *
 * 使用示例：
 *   const btn = $('#submit');           // 查找 ID 为 submit 的元素
 *   const firstItem = $('.item');       // 查找第一个 class 为 item 的元素
 *   const navLink = $('a', navElement); // 在 navElement 内查找第一个 a 标签
 */
function $(selector, context) {
  // (context || document) 表示：如果提供了 context 就用它，否则用整个文档
  // querySelector 是浏览器内置的方法，返回匹配的第一个元素
  return (context || document).querySelector(selector);
}

/**
 * 多元素选择器
 * 
 * 作用：在页面中查找所有符合条件的元素，返回一个数组
 * 
 * @param {string} selector - CSS 选择器字符串
 * @param {Element} [context=document] - 可选，指定在哪个父元素内查找
 * @returns {Array<Element>} 元素数组，如果没找到返回空数组
 *
 * 使用示例：
 *   const allButtons = $$('button');           // 获取所有按钮
 *   const listItems = $$('.list li');          // 获取列表中的所有项
 *   const inputs = $$('input', formElement);   // 获取表单中的所有输入框
 */
function $$(selector, context) {
  // querySelectorAll 返回的是一个 NodeList（节点列表），不是真正的数组
  // Array.from() 把它转换成真正的数组，这样就可以使用数组方法（如 map、filter）
  return Array.from((context || document).querySelectorAll(selector));
}

/**
 * 创建元素并设置属性
 * 
 * 作用：创建一个新的 HTML 元素，并可选地设置类名和内部内容
 * 
 * @param {string} tag - HTML 标签名，如 'div', 'span', 'button'
 * @param {string} [className] - 可选，要添加的 CSS 类名
 * @param {string} [innerHTML] - 可选，元素的内部 HTML 内容
 * @returns {Element} 创建好的新元素
 *
 * 使用示例：
 *   const div = createElement('div', 'container');
 *   const btn = createElement('button', 'btn-primary', '点击我');
 *   const card = createElement('div', 'card', '<h2>标题</h2>');
 */
function createElement(tag, className, innerHTML) {
  // 使用 document.createElement 创建新元素
  const el = document.createElement(tag);
  
  // 如果提供了 className，就设置类名
  // className 是元素的一个属性，用于设置 CSS 类
  if (className) el.className = className;
  
  // 如果提供了 innerHTML，就设置内部 HTML
  // innerHTML 可以设置元素的 HTML 内容（包括标签）
  if (innerHTML) el.innerHTML = innerHTML;
  
  return el;
}

/**
 * 绑定事件监听器
 * 
 * 作用：给元素添加事件监听，当事件发生时执行指定的函数
 * 
 * @param {Element} element - 要绑定事件的元素
 * @param {string} event - 事件名称，如 'click', 'input', 'submit'
 * @param {Function} handler - 事件触发时要执行的函数
 *
 * 使用示例：
 *   const btn = document.getElementById('myBtn');
 *   on(btn, 'click', function() {
 *     alert('按钮被点击了！');
 *   });
 *
 * 常见的事件类型：
 *   - click: 点击
 *   - mouseover: 鼠标移入
 *   - mouseout: 鼠标移出
 *   - input: 输入框内容变化
 *   - submit: 表单提交
 *   - keydown: 键盘按键按下
 */
function on(element, event, handler) {
  // 先检查元素是否存在，避免报错
  // addEventListener 是标准的绑定事件方法
  // 它接收两个参数：事件名称 和 处理函数
  if (element) element.addEventListener(event, handler);
}

/**
 * 事件委托
 * 
 * 作用：将事件绑定到父元素上，由父元素统一处理子元素的事件
 * 
 * 为什么要用事件委托？
 * 1. 性能更好：只需要绑定一个事件监听器，而不是给每个子元素都绑定
 * 2. 动态元素也能响应：后来添加的子元素也能触发事件
 * 
 * @param {Element} parent - 父元素，事件绑定在这里
 * @param {string} selector - 子元素的选择器
 * @param {string} event - 事件名称
 * @param {Function} handler - 事件处理函数
 *
 * 使用示例：
 *   // 给列表中的所有按钮添加点击事件
 *   const list = document.getElementById('myList');
 *   delegate(list, '.delete-btn', 'click', function(e) {
 *     // this 指向被点击的按钮
 *     this.parentElement.remove();
 *   });
 */
function delegate(parent, selector, event, handler) {
  // 在父元素上绑定事件
  on(parent, event, function (e) {
    // e.target 是实际被点击的元素
    // closest(selector) 会向上查找最近的匹配选择器的祖先元素
    const target = e.target.closest(selector);
    
    // 检查是否找到了目标，并且目标确实在父元素内
    // parent.contains(target) 确保目标元素是父元素的子元素
    if (target && parent.contains(target)) {
      // handler.call(target, e) 调用处理函数
      // .call() 的第一个参数设置函数内部的 this 指向 target
      handler.call(target, e);
    }
  });
}

/**
 * 添加 CSS 类名
 * 
 * 作用：给元素添加一个或多个 CSS 类名
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要添加的类名
 *
 * 使用示例：
 *   const box = document.getElementById('box');
 *   addClass(box, 'active');      // 添加单个类
 *   addClass(box, 'big red');     // 添加多个类（用空格分隔）
 */
function addClass(element, className) {
  // classList 是元素的一个属性，提供了操作类名的方法
  // add() 方法可以添加一个或多个类名
  if (element) element.classList.add(className);
}

/**
 * 移除 CSS 类名
 * 
 * 作用：从元素上移除指定的 CSS 类名
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要移除的类名
 *
 * 使用示例：
 *   removeClass(box, 'active');   // 移除 active 类
 *   removeClass(box, 'hidden');   // 移除 hidden 类
 */
function removeClass(element, className) {
  // remove() 方法移除指定的类名
  if (element) element.classList.remove(className);
}

/**
 * 检查是否包含 CSS 类名
 * 
 * 作用：判断元素是否包含指定的类名
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要检查的类名
 * @returns {boolean} 如果包含返回 true，否则返回 false
 *
 * 使用示例：
 *   if (hasClass(box, 'active')) {
 *     console.log('盒子是激活状态');
 *   }
 */
function hasClass(element, className) {
  // contains() 方法检查是否包含指定类名
  // 如果元素不存在，返回 false
  return element ? element.classList.contains(className) : false;
}

/**
 * 切换 CSS 类名
 * 
 * 作用：如果元素有该类名就移除，没有就添加
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要切换的类名
 *
 * 使用示例：
 *   // 点击按钮切换菜单的显示/隐藏
 *   toggleClass(menu, 'hidden');
 *   
 *   // 切换激活状态
 *   toggleClass(button, 'active');
 */
function toggleClass(element, className) {
  // toggle() 方法自动切换类名的存在状态
  if (element) element.classList.toggle(className);
}

/**
 * 显示元素
 * 
 * 作用：让隐藏的元素显示出来
 * 
 * @param {Element} element - 要显示的元素
 *
 * 使用示例：
 *   show(loadingSpinner);   // 显示加载动画
 *   show(errorMessage);     // 显示错误信息
 */
function show(element) {
  // 将 display 样式设置为空字符串
  // 这样元素会使用默认的显示方式（由 CSS 决定）
  if (element) element.style.display = '';
}

/**
 * 隐藏元素
 * 
 * 作用：让元素隐藏（不显示，但还存在于页面中）
 * 
 * @param {Element} element - 要隐藏的元素
 *
 * 使用示例：
 *   hide(loadingSpinner);   // 隐藏加载动画
 *   hide(errorMessage);     // 隐藏错误信息
 */
function hide(element) {
  // 'none' 表示元素不显示，也不占用空间
  if (element) element.style.display = 'none';
}

/**
 * 切换元素的显示/隐藏状态
 * 
 * 作用：如果元素是显示的则隐藏，如果是隐藏的则显示
 * 
 * @param {Element} element - 要切换的元素
 *
 * 使用示例：
 *   // 点击按钮切换下拉菜单
 *   toggle(dropdownMenu);
 */
function toggle(element) {
  if (element) {
    // 三目运算符：条件 ? 条件为真时的值 : 条件为假时的值
    // 如果当前 display 是 'none'，就设为空（显示）
    // 否则设为 'none'（隐藏）
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }
}

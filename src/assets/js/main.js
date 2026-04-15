'use strict';

// 导入顺序：utils → modules
// 各页面按需引入对应 module，main.js 只做全局初始化

document.addEventListener('DOMContentLoaded', () => {
  // 非登录页执行鉴权和导航初始化
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.endsWith('login.html') || currentPath.endsWith('register.html');
  if (!isLoginPage) {
    auth.guard();
    // appNav.init() 在每个页面的 fetch header 回调里执行了，这里可以不强制，但防止遗漏保留
    if (typeof appNav !== 'undefined') appNav.init();
    // 初始化移动端导航（侧边栏切换）
    if (typeof MobileNav !== 'undefined') MobileNav.init();
  }

  // 初始化鼠标跟随动效
  initCustomCursor();

  // 监听 DOM 树变化，修正通过 fetch 注入的 header 和 sidebar 的跳转路径
  initPathObserver();
});

function initPathObserver() {
  function fixComponentPaths() {
    const pathParts = window.location.pathname.split('/');
    const pagesIndex = pathParts.lastIndexOf('pages');
    if (pagesIndex === -1) return;

    const depth = Math.max(0, pathParts.length - pagesIndex - 2);
    const pagesPath = depth > 0 ? '../'.repeat(depth) : '';
    const rootPath = pagesPath + '../';

    // 修复 Header Logo 路径
    const logoImg = document.getElementById('header-logo-img');
    if (logoImg && !logoImg.dataset.fixed) {
      logoImg.style.display = '';  // Reset display FIRST
      logoImg.dataset.fixed = '1';  // Mark as fixed
      // Delay src change to allow onerror handler to work
      setTimeout(() => {
        logoImg.src = rootPath + 'assets/images/logo.png';
      }, 0);
    }

    // 修复侧边栏导航路径并绑定点击事件
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-page]:not([data-fixed])');
    sidebarItems.forEach(item => {
      const targetPage = item.getAttribute('data-page');
      const fixedHref = pagesPath + targetPage;
      item.setAttribute('href', fixedHref);
      item.dataset.fixed = '1';

      // 确保链接可点击（href 属性已修复，无需额外跳转）
    });
  }

  const observer = new MutationObserver(fixComponentPaths);
  observer.observe(document.body, { childList: true, subtree: true });
  fixComponentPaths();
}

function initCustomCursor() {
  if (window.innerWidth <= 768) return; // 移动端不加载
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // 避免初始未移动前的卡顿滞后感
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  // 使用 requestAnimationFrame 平滑移动
  function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 为可点击元素增加 hover 态
  const addHover = () => cursor.classList.add('hover');
  const removeHover = () => cursor.classList.remove('hover');

  const interactives = document.querySelectorAll('a, button, input, .module-card, .founder-card, .product-card, .tech-card, .btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', addHover);
    el.addEventListener('mouseleave', removeHover);
  });
}

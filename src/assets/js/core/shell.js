'use strict';

const appShell = (function() {
  // 为后台页面装配 header、sidebar、footer；无占位页面自动跳过。
  async function loadPageShell(pageMeta) {
    const tasks = [];

    if (document.getElementById('header-placeholder')) {
      tasks.push(loadComponent('header-placeholder', pageMeta.rootPath + 'components/header.html'));
    }

    if (document.getElementById('sidebar-placeholder')) {
      tasks.push(loadComponent('sidebar-placeholder', pageMeta.rootPath + 'components/sidebar.html'));
    }

    if (document.getElementById('footer-placeholder')) {
      tasks.push(loadComponent('footer-placeholder', pageMeta.rootPath + 'components/footer.html'));
    }

    await Promise.all(tasks);
  }

  // 加载 src/components 下的公共 HTML 片段，支撑静态页面复用。
  async function loadComponent(placeholderId, url) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder || placeholder.dataset.loaded === '1') {
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }

      placeholder.innerHTML = await response.text();
      placeholder.dataset.loaded = '1';
    } catch (error) {
      console.error('Failed to load component:', url, error);
    }
  }

  // 业务后台页有侧边栏时按需加载移动端抽屉导航。
  async function ensureMobileNav(pageMeta) {
    if (!document.getElementById('sidebar-placeholder') && !document.querySelector('.sidebar')) {
      return;
    }

    if (typeof MobileNav !== 'undefined') {
      return;
    }

    await appScriptLoader.loadScript(pageMeta.rootPath + 'assets/js/modules/mobile-nav.js', 'mobile-nav');
  }

  // 公共组件注入完成后刷新导航高亮、用户头像和移动端菜单状态。
  function initSharedNavigation() {
    if (typeof appNav !== 'undefined') {
      appNav.init();
    }

    if (typeof MobileNav !== 'undefined') {
      MobileNav.init();
    }
  }

  return {
    loadPageShell,
    ensureMobileNav,
    initSharedNavigation
  };
})();

window.appShell = appShell;

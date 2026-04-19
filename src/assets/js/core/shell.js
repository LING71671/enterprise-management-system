'use strict';

const appShell = (function() {
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

  async function ensureMobileNav(pageMeta) {
    if (!document.getElementById('sidebar-placeholder') && !document.querySelector('.sidebar')) {
      return;
    }

    if (typeof MobileNav !== 'undefined') {
      return;
    }

    await appScriptLoader.loadScript(pageMeta.rootPath + 'assets/js/modules/mobile-nav.js', 'mobile-nav');
  }

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

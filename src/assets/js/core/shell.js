'use strict';

const appShell = (function() {
  /**
   * 为当前页面加载公共外壳片段。
   * @param {{rootPath: string}} pageMeta 当前页面资源根路径。
   * @returns {Promise<void>} 可用占位符对应的组件全部加载后 resolve。
   *
   * 原因：静态项目没有服务端模板，header/sidebar/footer 通过占位符异步复用。
   */
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

  /**
   * 将一个公共 HTML 组件加载到指定占位符。
   * @param {string} placeholderId 占位元素 id。
   * @param {string} url 公共组件 HTML 的相对路径。
   * @returns {Promise<void>} 组件加载成功、已加载或失败记录后 resolve。
   *
   * 原因：组件失败不能阻断业务页，错误只记录到控制台，页面主体仍可使用。
   */
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

  /**
   * 在有侧边栏的后台页面按需加载移动端导航模块。
   * @param {{rootPath: string}} pageMeta 当前页面资源根路径。
   * @returns {Promise<void>} 模块已存在、无需加载或加载完成后 resolve。
   *
   * 原因：部分页面没有侧边栏，按需加载可以避免公开页和简单页引入无用逻辑。
   */
  async function ensureMobileNav(pageMeta) {
    if (!document.getElementById('sidebar-placeholder') && !document.querySelector('.sidebar')) {
      return;
    }

    if (typeof MobileNav !== 'undefined') {
      return;
    }

    await appScriptLoader.loadScript(pageMeta.rootPath + 'assets/js/core/mobile-nav.js', 'mobile-nav');
  }

  /**
   * 初始化注入后的导航相关交互。
   * @returns {void}
   *
   * 原因：导航模块依赖 header/sidebar DOM，必须在公共组件加载完成后再绑定。
   */
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

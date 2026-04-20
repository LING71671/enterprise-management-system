'use strict';

const appRouter = (function() {
  const PUBLIC_PAGES = new Set(['landing.html', 'login.html', 'register.html']);

  /**
   * 将 URL 最后一段统一规范为页面文件名。
   * @param {string} pageName 原始页面名或路径最后一段。
   * @returns {string} 规范化后的页面文件名。
   */
  function normalizePageName(pageName) {
    const raw = String(pageName || '').trim().replace(/\/+$/, '');

    if (!raw) {
      return '';
    }

    const lastSegment = raw.split('/').pop() || '';
    return lastSegment.includes('.') ? lastSegment : `${lastSegment}.html`;
  }

  /**
   * 从当前 URL 解析页面名、业务域和资源路径。
   * @returns {{pageName: string, section: string, pagesPath: string, rootPath: string}} 页面运行时元信息。
   *
   * 原因：静态多级目录页面需要自己计算 `../` 层级，公共组件和业务脚本才能在任意子页面加载。
   */
  function getPageMeta() {
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/').filter(Boolean);
    const pagesIndex = pathParts.indexOf('pages');
    const isDirectoryUrl = pathname.endsWith('/');
    const rawPageName = isDirectoryUrl ? 'index.html' : pathParts[pathParts.length - 1] || '';
    const pageName = normalizePageName(rawPageName);

    if (pagesIndex === -1) {
      return {
        pageName,
        section: '',
        pagesPath: '',
        rootPath: ''
      };
    }

    const depth = Math.max(0, pathParts.length - pagesIndex - (isDirectoryUrl ? 1 : 2));
    const pagesPath = depth > 0 ? '../'.repeat(depth) : '';
    const rootPath = pagesPath + '../';
    const sectionCandidate = pathParts[pagesIndex + 1] || '';
    const section = sectionCandidate.endsWith('.html') ? '' : sectionCandidate;

    return {
      pageName,
      section,
      pagesPath,
      rootPath
    };
  }

  /**
   * 判断当前页面是否允许未登录访问。
   * @param {{pageName: string}} pageMeta 当前页面元信息。
   * @returns {boolean} 公开页返回 true，后台业务页返回 false。
   */
  function isPublicPage(pageMeta) {
    return PUBLIC_PAGES.has(normalizePageName(pageMeta.pageName));
  }

  /**
   * 修正公共组件里的静态资源和业务页链接。
   * @returns {void}
   *
   * 原因：MutationObserver 会在 header/sidebar 注入后触发，dataset.fixed 防止同一链接被重复改写。
   */
  function fixComponentPaths() {
    const pageMeta = getPageMeta();
    if (!pageMeta.rootPath && !pageMeta.pagesPath) return;

    fixHeaderLogoPath(pageMeta);
    fixSidebarItemPaths(pageMeta);
  }

  /**
   * 修正公共 header 中的品牌图片路径。
   * @param {{rootPath: string}} pageMeta 当前页面元信息。
   * @returns {void}
   *
   * 原因：header 片段被不同层级页面复用，图片路径必须按当前页面重新计算。
   */
  function fixHeaderLogoPath(pageMeta) {
    const logoImg = document.getElementById('header-logo-img');
    if (!logoImg || logoImg.dataset.fixed) {
      return;
    }

    logoImg.style.display = '';
    logoImg.dataset.fixed = '1';
    setTimeout(() => {
      logoImg.src = pageMeta.rootPath + 'assets/images/logo.png';
    }, 0);
  }

  /**
   * 修正公共 sidebar 中的业务页面链接。
   * @param {{pagesPath: string}} pageMeta 当前页面元信息。
   * @returns {void}
   *
   * 原因：侧边栏 HTML 片段不知道调用页面层级，注入后需要统一补齐可访问链接。
   */
  function fixSidebarItemPaths(pageMeta) {
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-page]:not([data-fixed])');
    sidebarItems.forEach((item) => {
      const targetPage = item.getAttribute('data-page');
      const fixedHref = pageMeta.pagesPath + targetPage;
      item.setAttribute('href', fixedHref);
      item.dataset.fixed = '1';
    });
  }

  /**
   * 监听公共组件注入，并修正组件内部的图片和侧边栏链接路径。
   * @returns {void}
   *
   * 原因：header/sidebar 是从 src/components 注入的静态片段，片段内路径无法提前知道调用页面层级。
   */
  function initPathObserver() {
    const observer = new MutationObserver(fixComponentPaths);
    observer.observe(document.body, { childList: true, subtree: true });
    fixComponentPaths();
  }

  return {
    getPageMeta,
    isPublicPage,
    initPathObserver
  };
})();

window.appRouter = appRouter;

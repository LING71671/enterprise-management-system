'use strict';

const appRouter = (function() {
  const PUBLIC_PAGES = new Set(['landing.html', 'login.html', 'register.html']);

  // 从 pages 路径解析当前业务域和页面层级。
  function getPageMeta() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const pagesIndex = pathParts.indexOf('pages');
    const pageName = pathParts[pathParts.length - 1] || '';

    if (pagesIndex === -1) {
      return {
        pageName,
        section: '',
        pagesPath: '',
        rootPath: ''
      };
    }

    const depth = Math.max(0, pathParts.length - pagesIndex - 2);
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

  // 登录、注册、落地页是公开页，其余企业管理页面都需要会话。
  function isPublicPage(pageMeta) {
    return PUBLIC_PAGES.has(pageMeta.pageName);
  }

  // 公共 header/sidebar 注入后，按当前页面层级修正 logo 和侧边栏链接。
  function initPathObserver() {
    function fixComponentPaths() {
      const pageMeta = getPageMeta();
      if (!pageMeta.rootPath && !pageMeta.pagesPath) return;

      const logoImg = document.getElementById('header-logo-img');
      if (logoImg && !logoImg.dataset.fixed) {
        logoImg.style.display = '';
        logoImg.dataset.fixed = '1';
        setTimeout(() => {
          logoImg.src = pageMeta.rootPath + 'assets/images/logo.png';
        }, 0);
      }

      const sidebarItems = document.querySelectorAll('.sidebar-item[data-page]:not([data-fixed])');
      sidebarItems.forEach((item) => {
        const targetPage = item.getAttribute('data-page');
        const fixedHref = pageMeta.pagesPath + targetPage;
        item.setAttribute('href', fixedHref);
        item.dataset.fixed = '1';
      });
    }

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

'use strict';

// 企业管理系统统一启动入口：加载运行时、公共组件和当前业务子系统。
document.addEventListener('DOMContentLoaded', async () => {
  const initialMeta = getInitialPageMeta();

  try {
    await loadCoreRuntime(initialMeta.rootPath);

    const pageMeta = appRouter.getPageMeta();
    if (!appRouter.isPublicPage(pageMeta) && typeof auth !== 'undefined' && !auth.isLoggedIn()) {
      auth.guard();
      return;
    }

    appCursor.init();
    appRouter.initPathObserver();

    await appShell.loadPageShell(pageMeta);
    await appShell.ensureMobileNav(pageMeta);
    appShell.initSharedNavigation();
    await appScriptLoader.initBusinessModule(pageMeta);
  } catch (error) {
    console.error('App bootstrap failed:', error);
  }
});

// 在 router 尚未加载前，先算出静态资源根路径，保证深层业务页面也能加载 core。
function getInitialPageMeta() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const pagesIndex = pathParts.indexOf('pages');
  const pageName = pathParts[pathParts.length - 1] || '';

  if (pagesIndex === -1) {
    return {
      pageName,
      rootPath: ''
    };
  }

  const depth = Math.max(0, pathParts.length - pagesIndex - 2);
  const pagesPath = depth > 0 ? '../'.repeat(depth) : '';

  return {
    pageName,
    rootPath: pagesPath + '../'
  };
}

// 按企业管理页面启动所需顺序加载核心能力，避免每个 HTML 重复声明脚本。
async function loadCoreRuntime(rootPath) {
  const coreScripts = ['module-loader', 'router', 'shell', 'cursor'];

  for (const name of coreScripts) {
    await loadRuntimeScript(rootPath + 'assets/js/core/' + name + '.js', 'core-' + name);
  }
}

// 无构建工具场景下的脚本加载器，维持当前纯静态部署方式。
function loadRuntimeScript(src, key) {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[data-runtime-script="' + key + '"]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.dataset.runtimeScript = key;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load script: ' + src));
    document.body.appendChild(script);
  });
}

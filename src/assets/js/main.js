'use strict';

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

async function loadCoreRuntime(rootPath) {
  const coreScripts = ['module-loader', 'router', 'shell', 'cursor'];

  for (const name of coreScripts) {
    await loadRuntimeScript(rootPath + 'assets/js/core/' + name + '.js', 'core-' + name);
  }
}

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

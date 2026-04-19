'use strict';

const appScriptLoader = (function() {
  const BUSINESS_MODULES = {
    employee: 'employeeModule',
    equipment: 'equipmentModule',
    production: 'productionModule',
    purchase: 'purchaseModule',
    sales: 'salesModule',
    warehouse: 'warehouseModule'
  };

  const BUSINESS_SCRIPT_ORDER = ['store', 'actions', 'renderers', 'pages'];
  const SHARED_SCRIPTS = ['state', 'view'];

  // 加载静态 JS 文件并标记 key，防止业务页多次初始化时重复注入。
  function loadScript(src, key) {
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

  // 所有业务子系统都依赖 shared 状态容器和页面渲染辅助。
  async function loadSharedScripts(rootPath) {
    for (const name of SHARED_SCRIPTS) {
      await loadScript(rootPath + 'assets/js/shared/' + name + '.js', 'shared-' + name);
    }
  }

  // 按“状态-业务操作-展示映射-页面绑定-兼容门面”的业务域顺序加载。
  async function loadBusinessScripts(pageMeta) {
    const moduleGlobal = BUSINESS_MODULES[pageMeta.section];
    if (!moduleGlobal || typeof window[moduleGlobal] !== 'undefined') {
      return moduleGlobal;
    }

    await loadSharedScripts(pageMeta.rootPath);

    for (const name of BUSINESS_SCRIPT_ORDER) {
      await loadScript(
        pageMeta.rootPath + 'assets/js/systems/' + pageMeta.section + '/' + name + '.js',
        pageMeta.section + '-' + name
      );
    }

    await loadScript(
      pageMeta.rootPath + 'assets/js/modules/' + pageMeta.section + '.js',
      pageMeta.section + '-facade'
    );

    return moduleGlobal;
  }

  // 加载当前业务域并调用旧的 window.xxxModule.init 兼容入口。
  async function initBusinessModule(pageMeta) {
    const moduleGlobal = await loadBusinessScripts(pageMeta);
    if (!moduleGlobal) {
      return;
    }

    const moduleApi = window[moduleGlobal];
    if (moduleApi && typeof moduleApi.init === 'function') {
      moduleApi.init();
    }
  }

  return {
    loadScript,
    initBusinessModule
  };
})();

window.appScriptLoader = appScriptLoader;

'use strict';

const EnterpriseState = (function() {
  // 复制模拟业务数据，避免页面渲染直接污染 src/data 下的种子数据。
  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  // 为业务记录生成连续编号。
  function nextId(prefix, list) {
    const maxId = list.reduce((max, item) => {
      const match = String(item.id || '').match(/(\d+)$/);
      return Math.max(max, match ? Number(match[1]) : 0);
    }, 0);

    return prefix + String(maxId + 1).padStart(3, '0');
  }

  // 创建无后端业务状态容器：优先读 localStorage，缺失时回退到模拟数据。
  function createStore(options) {
    let current = load();

    // 按业务域字段规则合并本地状态和默认种子数据。
    function normalize(raw, defaults) {
      return options.fields.reduce((result, field) => {
        const storedValue = raw && raw[field.name];
        const defaultValue = defaults[field.name];
        result[field.name] = field.type === 'array'
          ? Array.isArray(storedValue) ? storedValue : defaultValue
          : storedValue || defaultValue;
        return result;
      }, {});
    }

    // 从 localStorage 读取当前业务域状态，保证刷新页面后演示数据不丢。
    function load() {
      const defaults = options.getDefaults();
      const stored = typeof storage !== 'undefined' && typeof storage.get === 'function'
        ? storage.get(options.storageKey)
        : null;

      return normalize(stored, defaults);
    }

    // 重新同步业务状态，页面刷新列表前统一调用。
    function sync() {
      current = load();
      return current;
    }

    // 将当前业务域状态持久化到浏览器本地。
    function persist() {
      if (typeof storage !== 'undefined' && typeof storage.set === 'function') {
        storage.set(options.storageKey, current);
      }
    }

    // 包装新增/删除/编辑操作，确保写入前拿到最新本地状态。
    function mutate(callback) {
      current = sync();
      const result = callback(current);
      persist();
      return result;
    }

    // 暴露只读快照，供调试或门面 API 查看业务状态。
    function snapshot() {
      return clone(sync());
    }

    return {
      sync,
      persist,
      mutate,
      snapshot
    };
  }

  return {
    clone,
    nextId,
    createStore
  };
})();

window.EnterpriseState = EnterpriseState;

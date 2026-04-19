'use strict';

const EnterpriseState = (function() {
  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function nextId(prefix, list) {
    const maxId = list.reduce((max, item) => {
      const match = String(item.id || '').match(/(\d+)$/);
      return Math.max(max, match ? Number(match[1]) : 0);
    }, 0);

    return prefix + String(maxId + 1).padStart(3, '0');
  }

  function createStore(options) {
    let current = load();

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

    function load() {
      const defaults = options.getDefaults();
      const stored = typeof storage !== 'undefined' && typeof storage.get === 'function'
        ? storage.get(options.storageKey)
        : null;

      return normalize(stored, defaults);
    }

    function sync() {
      current = load();
      return current;
    }

    function persist() {
      if (typeof storage !== 'undefined' && typeof storage.set === 'function') {
        storage.set(options.storageKey, current);
      }
    }

    function mutate(callback) {
      current = sync();
      const result = callback(current);
      persist();
      return result;
    }

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

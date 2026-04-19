'use strict';

const storageMemory = {
  local: {},
  session: {}
};

function serialize(value) {
  return JSON.stringify(value);
}

function parse(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getStorageArea(name) {
  try {
    return window[name];
  } catch {
    return null;
  }
}

function canUseStorage(area) {
  try {
    if (!area) return false;
    const key = '__xm_storage_test__';
    area.setItem(key, '1');
    area.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function getCookie(key) {
  const encodedKey = encodeURIComponent(key) + '=';
  const item = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(encodedKey));
  return item ? decodeURIComponent(item.slice(encodedKey.length)) : null;
}

function setCookie(key, value) {
  document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + '; path=/; SameSite=Lax';
}

function removeCookie(key) {
  document.cookie = encodeURIComponent(key) + '=; path=/; max-age=0; SameSite=Lax';
}

/**
 * 浏览器存储封装。
 * 输入：业务 key 和可 JSON 序列化的值。
 * 输出：localStorage 持久数据和 sessionStorage 会话数据的统一读写 API。
 *
 * 原因：项目没有后端，业务演示数据必须在刷新后保留；登录态只保留在当前浏览器会话中。
 */
const storage = {
  /** @param {string} key 存储 key。@param {*} value 需要持久保存的业务数据。@returns {void} */
  set(key, value) {
    const serialized = serialize(value);
    storageMemory.local[key] = serialized;
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      area.setItem(key, serialized);
      return;
    }
    setCookie('local_' + key, serialized);
  },
  /** @param {string} key 存储 key。@returns {*|null} 解析后的业务数据；解析失败返回 null。 */
  get(key) {
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      return parse(area.getItem(key));
    }
    return parse(storageMemory.local[key]) || parse(getCookie('local_' + key));
  },
  /** @param {string} key 存储 key。@returns {void} */
  remove(key) {
    delete storageMemory.local[key];
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      area.removeItem(key);
    }
    removeCookie('local_' + key);
  },
  /** @returns {void} 清空全部持久业务数据。 */
  clear() {
    document.cookie.split(';').forEach((part) => {
      const key = decodeURIComponent(part.split('=')[0].trim());
      if (key.startsWith('local_')) {
        removeCookie(key);
      }
    });
    storageMemory.local = {};
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      area.clear();
    }
  },

  session: {
    /** @param {string} key 会话 key。@param {*} value 当前登录用户会话数据。@returns {void} */
    set(key, value) {
      const serialized = serialize(value);
      storageMemory.session[key] = serialized;
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        area.setItem(key, serialized);
        return;
      }
      setCookie(key, serialized);
    },
    /** @param {string} key 会话 key。@returns {*|null} 解析后的会话数据；解析失败返回 null。 */
    get(key) {
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        return parse(area.getItem(key));
      }
      return parse(storageMemory.session[key]) || parse(getCookie(key));
    },
    /** @param {string} key 会话 key。@returns {void} */
    remove(key) {
      delete storageMemory.session[key];
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        area.removeItem(key);
      }
      removeCookie(key);
    },
    /** @returns {void} 清空当前浏览器会话。 */
    clear() {
      Object.keys(storageMemory.session).forEach((key) => removeCookie(key));
      storageMemory.session = {};
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        area.clear();
      }
    }
  }
};

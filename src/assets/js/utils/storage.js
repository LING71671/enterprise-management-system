'use strict';

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
    localStorage.setItem(key, JSON.stringify(value));
  },
  /** @param {string} key 存储 key。@returns {*|null} 解析后的业务数据；解析失败返回 null。 */
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  /** @param {string} key 存储 key。@returns {void} */
  remove(key) {
    localStorage.removeItem(key);
  },
  /** @returns {void} 清空全部持久业务数据。 */
  clear() {
    localStorage.clear();
  },

  session: {
    /** @param {string} key 会话 key。@param {*} value 当前登录用户会话数据。@returns {void} */
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    /** @param {string} key 会话 key。@returns {*|null} 解析后的会话数据；解析失败返回 null。 */
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch {
        return null;
      }
    },
    /** @param {string} key 会话 key。@returns {void} */
    remove(key) {
      sessionStorage.removeItem(key);
    },
    /** @returns {void} 清空当前浏览器会话。 */
    clear() {
      sessionStorage.clear();
    }
  }
};

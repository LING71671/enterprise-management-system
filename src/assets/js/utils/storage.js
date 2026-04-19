'use strict';

// 企业管理系统的浏览器本地存储封装：业务数据用 localStorage，会话用 sessionStorage。
const storage = {
  // 写入需要持久保留的业务演示数据。
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  // 读取业务演示数据，解析失败时返回 null 以便回退到模拟数据。
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  // 删除指定业务数据 key。
  remove(key) {
    localStorage.removeItem(key);
  },
  // 清空全部持久业务数据。
  clear() {
    localStorage.clear();
  },

  session: {
    // 写入当前登录用户会话数据。
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    // 读取当前会话数据，解析失败时视为未登录。
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch {
        return null;
      }
    },
    // 删除指定会话数据。
    remove(key) {
      sessionStorage.removeItem(key);
    },
    // 清空当前浏览器会话。
    clear() {
      sessionStorage.clear();
    }
  }
};

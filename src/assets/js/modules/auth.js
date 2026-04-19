'use strict';

const auth = {
  USER_KEY: 'xm_user',

  /**
   * 使用演示管理员账号登录。
   * @param {string} username 用户名。
   * @param {string} password 密码。
   * @returns {boolean} 账号匹配并写入 sessionStorage 时返回 true。
   *
   * 原因：项目没有后端认证服务，登录态只需要支撑本机演示流程。
   */
  login(username, password) {
    try {
      if (username === 'admin' && password === '123456') {
        const user = { username, role: '管理员', loginTime: Date.now() };
        storage.session.set(this.USER_KEY, user);
        return true;
      }
    } catch (error) {
      console.error('auth.login failed:', error);
    }
    return false;
  },

  /**
   * 退出当前演示会话并返回落地页。
   * @returns {void}
   *
   * 原因：后台页面位于多级目录时，跳转前需要按 pages 层级计算相对路径。
   */
  logout() {
    try {
      storage.session.remove(this.USER_KEY);
      const pathParts = window.location.pathname.split('/');
      const pagesIndex = pathParts.lastIndexOf('pages');
      if (pagesIndex !== -1) {
        const depth = pathParts.length - pagesIndex - 2;
        const relativePath = depth > 0 ? '../'.repeat(depth) : './';
        window.location.href = relativePath + 'landing.html';
        return;
      }
    } catch (error) {
      console.error('auth.logout failed:', error);
    }
    window.location.href = 'landing.html';
  },

  /**
   * 读取当前浏览器会话用户。
   * @returns {{username: string, role: string, loginTime: number}|null} 当前用户；读取失败或未登录返回 null。
   */
  getUser() {
    try {
      return storage.session.get(this.USER_KEY);
    } catch (error) {
      console.error('auth.getUser failed:', error);
      return null;
    }
  },

  /**
   * 判断是否存在有效演示会话。
   * @returns {boolean} 存在用户会话时返回 true。
   */
  isLoggedIn() {
    return !!this.getUser();
  },

  /**
   * 保护后台业务页面。
   * @returns {void}
   *
   * 原因：静态页面无法通过服务端拦截，未登录时只能在浏览器端重定向到登录页。
   */
  guard() {
    try {
      if (!this.isLoggedIn()) {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        let depth = 0;
        for (let i = 0; i < pathParts.length; i += 1) {
          if (pathParts[i] === 'pages') {
            depth = pathParts.length - i - 1;
            break;
          }
        }
        const basePath = '../'.repeat(depth > 0 ? depth : 1);
        window.location.href = basePath + 'pages/login.html';
      }
    } catch (error) {
      console.error('auth.guard failed:', error);
    }
  },

  /**
   * 注册演示账号到 localStorage。
   * @param {string} username 用户名。
   * @param {string} email 邮箱。
   * @param {string} password 密码。
   * @returns {boolean} 用户名和邮箱未重复时返回 true。
   *
   * 原因：注册页需要形成无后端闭环，账号数据只在当前浏览器中保存。
   */
  register(username, email, password) {
    try {
      const users = storage.get('xm_users') || [];
      const exists = users.some((user) => user.username === username || user.email === email);
      if (exists) {
        return false;
      }
      users.push({ username, email, password, regTime: Date.now() });
      storage.set('xm_users', users);
      return true;
    } catch (error) {
      console.error('auth.register failed:', error);
      return false;
    }
  }
};

window.auth = auth;

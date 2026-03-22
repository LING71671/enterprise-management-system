'use strict';

const auth = {
  USER_KEY: 'xm_user',

  login(username, password) {
    // 模拟账号验证
    if (username === 'admin' && password === '123456') {
      const user = { username, role: '管理员', loginTime: Date.now() };
      storage.session.set(this.USER_KEY, user);
      return true;
    }
    return false;
  },

  logout() {
    storage.session.remove(this.USER_KEY);
    // 退出登录跳转到首页
    const pathParts = window.location.pathname.split('/');
    const pagesIndex = pathParts.lastIndexOf('pages');
    if (pagesIndex !== -1) {
      // 计算从当前位置到pages目录的路径
      const depth = pathParts.length - pagesIndex - 1;
      const relativePath = depth > 0 ? '../'.repeat(depth) : './';
      // 首页在pages目录下，直接从pages进入
      window.location.href = relativePath + 'landing.html';
    } else {
      window.location.href = 'landing.html';
    }
  },

  getUser() {
    return storage.session.get(this.USER_KEY);
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  guard() {
    if (!this.isLoggedIn()) {
      // 使用相对路径，支持子目录部署
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      let depth = 0;
      for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i] === 'pages') {
          depth = pathParts.length - i - 1;
          break;
        }
      }
      const basePath = '../'.repeat(depth > 0 ? depth : 1);
      window.location.href = basePath + 'pages/login.html';
    }
  },

  register(username, email, password) {
    // 模拟注册（实际应调用后端API）
    const users = storage.local.get('xm_users') || [];
    const exists = users.some(u => u.username === username || u.email === email);
    if (exists) {
      return false;
    }
    users.push({ username, email, password, regTime: Date.now() });
    storage.local.set('xm_users', users);
    return true;
  }
};

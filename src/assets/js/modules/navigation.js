'use strict';

const appNav = {
  // 初始化后台公共导航：高亮当前菜单、绑定退出、渲染用户。
  init() {
    this.highlightActive();
    this.bindLogout();
    this.renderUser();
  },

  // 根据当前页面路径高亮侧边栏菜单项。
  highlightActive() {
    const current = window.location.pathname;
    $$('.sidebar-item').forEach(item => {
      const href = item.getAttribute('href');
      const dataPage = item.getAttribute('data-page');
      // 支持组件注入后的 data-page 链接和静态 href 链接。
      const page = dataPage || (href ? href.replace(/.*pages\//, '').replace('.html', '') : '');
      if (page && current.includes(page.replace('.html', ''))) {
        addClass(item, 'active');
      }
    });
  },

  // 将当前登录用户渲染到 header 右侧区域。
  renderUser() {
    const user = auth.getUser();
    if (!user) return;
    const el = $('.header-user .username');
    if (el) el.textContent = user.username;
    const avatar = $('.header-user .avatar');
    if (avatar) avatar.textContent = user.username.charAt(0).toUpperCase();
  },

  // 绑定退出登录按钮，统一走 auth.logout。
  bindLogout() {
    const btn = $('#logout-btn');
    on(btn, 'click', () => auth.logout());
  }
};

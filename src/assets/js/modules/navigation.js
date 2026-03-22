'use strict';

const appNav = {
  init() {
    this.highlightActive();
    this.bindLogout();
    this.renderUser();
  },

  highlightActive() {
    const current = window.location.pathname;
    $$('.sidebar-item').forEach(item => {
      const href = item.getAttribute('href');
      const dataPage = item.getAttribute('data-page');
      // 支持动态生成的链接（使用 data-page 属性）和静态链接
      const page = dataPage || (href ? href.replace(/.*pages\//, '').replace('.html', '') : '');
      if (page && current.includes(page.replace('.html', ''))) {
        addClass(item, 'active');
      }
    });
  },

  renderUser() {
    const user = auth.getUser();
    if (!user) return;
    const el = $('.header-user .username');
    if (el) el.textContent = user.username;
    const avatar = $('.header-user .avatar');
    if (avatar) avatar.textContent = user.username.charAt(0).toUpperCase();
  },

  bindLogout() {
    const btn = $('#logout-btn');
    on(btn, 'click', () => auth.logout());
  }
};

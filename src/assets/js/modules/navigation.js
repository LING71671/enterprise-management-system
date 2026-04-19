'use strict';

const appNav = {
  /**
   * 初始化后台公共导航。
   * @returns {void}
   *
   * 原因：header/sidebar 是异步注入的，注入完成后统一高亮菜单、绑定退出和渲染用户信息。
   */
  init() {
    this.highlightActive();
    this.bindLogout();
    this.renderUser();
  },

  /**
   * 根据当前页面路径高亮侧边栏菜单项。
   * @returns {void}
   *
   * 原因：组件内链接会被 router 修正，data-page 和 href 两种来源都要兼容。
   */
  highlightActive() {
    const current = window.location.pathname;
    $$('.sidebar-item').forEach(item => {
      const href = item.getAttribute('href');
      const dataPage = item.getAttribute('data-page');
      // data-page 来自组件模板，href 来自修正后的真实链接，两者任意存在即可参与匹配。
      const page = dataPage || (href ? href.replace(/.*pages\//, '').replace('.html', '') : '');
      if (page && current.includes(page.replace('.html', ''))) {
        addClass(item, 'active');
      }
    });
  },

  /**
   * 将当前登录用户渲染到 header 右侧区域。
   * @returns {void}
   */
  renderUser() {
    const user = auth.getUser();
    if (!user) return;
    const el = $('.header-user .username');
    if (el) el.textContent = user.username;
    const avatar = $('.header-user .avatar');
    if (avatar) avatar.textContent = user.username.charAt(0).toUpperCase();
  },

  /**
   * 绑定退出登录按钮。
   * @returns {void}
   */
  bindLogout() {
    const btn = $('#logout-btn');
    on(btn, 'click', () => auth.logout());
  }
};

window.appNav = appNav;

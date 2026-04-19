'use strict';

const MobileNav = {
  sidebar: null,
  overlay: null,
  hamburgerBtn: null,
  isOpen: false,

  // 初始化后台移动端抽屉导航所需 DOM 引用。
  init() {
    this.sidebar = document.querySelector('.sidebar');
    this.overlay = document.getElementById('sidebar-overlay');
    this.hamburgerBtn = document.getElementById('hamburger-btn');

    if (!this.sidebar || !this.overlay || !this.hamburgerBtn) {
      console.warn('MobileNav: Required elements not found');
      return;
    }

    this.bindEvents();
    this.handleResize();
  },

  // 绑定汉堡按钮、遮罩、ESC 和窗口尺寸变化事件。
  bindEvents() {
    this.hamburgerBtn.addEventListener('click', () => this.toggleSidebar());
    this.overlay.addEventListener('click', () => this.closeSidebar());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeSidebar();
      }
    });

    window.addEventListener('resize', () => this.handleResize());
  },

  // 根据当前状态切换后台侧边栏开合。
  toggleSidebar() {
    if (this.isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  },

  // 打开移动端侧边栏并锁定页面滚动。
  openSidebar() {
    this.sidebar.classList.add('open');
    this.overlay.classList.add('active');
    this.hamburgerBtn.classList.add('active');
    this.hamburgerBtn.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  },

  // 关闭移动端侧边栏并恢复页面滚动。
  closeSidebar() {
    this.sidebar.classList.remove('open');
    this.overlay.classList.remove('active');
    this.hamburgerBtn.classList.remove('active');
    this.hamburgerBtn.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
    document.body.style.overflow = '';
  },

  // 桌面宽度下自动关闭移动端抽屉状态。
  handleResize() {
    if (window.innerWidth > 768 && this.isOpen) {
      this.closeSidebar();
    }
  }
};

window.MobileNav = MobileNav;

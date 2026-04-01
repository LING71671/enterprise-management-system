'use strict';

const MobileNav = {
  sidebar: null,
  overlay: null,
  hamburgerBtn: null,
  isOpen: false,

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

  toggleSidebar() {
    if (this.isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  },

  openSidebar() {
    this.sidebar.classList.add('open');
    this.overlay.classList.add('active');
    this.hamburgerBtn.classList.add('active');
    this.hamburgerBtn.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  },

  closeSidebar() {
    this.sidebar.classList.remove('open');
    this.overlay.classList.remove('active');
    this.hamburgerBtn.classList.remove('active');
    this.hamburgerBtn.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
    document.body.style.overflow = '';
  },

  handleResize() {
    if (window.innerWidth > 768 && this.isOpen) {
      this.closeSidebar();
    }
  }
};

window.MobileNav = MobileNav;

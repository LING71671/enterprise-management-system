'use strict';

window.appPages = window.appPages || {};

window.appPages.landing = (function () {
  /**
   * 批量为页面上所有锚点链接绑定平滑滚动事件。
   * @returns {void}
   *
   * 原因：前台展示页使用单页锚点导航，阻止默认跳转可以保留平滑滚动体验。
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
  }

  /**
   * 处理单个锚点链接的点击事件。
   * @param {Event} e 浏览器传入的点击事件对象；this 指向被点击的 a 标签。
   * @returns {void}
   *
   * 原因：拦截浏览器默认的瞬间跳转，改为平滑滚动到目标位置，提升用户体验。
   */
  function handleAnchorClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  /**
   * 控制落地页移动端菜单展开与收起。
   * @returns {void}
   */
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
    });

    // 链接点击后收起菜单，避免移动端菜单遮挡滚动到的目标区块。
    document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
      });
    });
  }

  /**
   * 批量为落地页核心展示模块绑定进入视口动画。
   * @returns {void}
   *
   * 原因：IntersectionObserver 能让动画只在元素接近视口时触发，减少首屏加载时的动画压力。
   */
  function initAnimations() {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const selectors = '.hero-container, .stat-card, .tech-card, .product-card, .founder-card, .partner-logo, #cta';
    document.querySelectorAll(selectors).forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * 处理 IntersectionObserver 的视口交叉回调。
   * @param {IntersectionObserverEntry[]} entries 观察器返回的交叉信息数组。
   * @param {IntersectionObserver} observer 观察器实例，用于取消已完成动画的元素。
   * @returns {void}
   *
   * 原因：将回调逻辑从观察器初始化中分离，使观察器配置与业务处理各司其职。
   */
  function handleIntersection(entries, observer) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        applyElementAnimation(entry.target, index);
        observer.unobserve(entry.target);
      }
    });
  }

  /**
   * 根据元素类型分配对应的入场动画和阶梯延迟。
   * @param {HTMLElement} element 进入视口的目标元素。
   * @param {number} index 元素在当前批次中的索引，用于计算阶梯延迟。
   * @returns {void}
   *
   * 原因：将动画规则从观察器回调中分离，新增展示模块时只需在此处追加条件分支。
   */
  function applyElementAnimation(element, index) {
    if (element.classList.contains('hero-container')) {
      element.classList.add('fade-in');
    } else if (element.classList.contains('stat-card')) {
      element.classList.add('slide-up', `delay-${(index % 3) * 100}`);
    } else if (element.classList.contains('tech-card')) {
      element.classList.add('scale-in', `delay-${(index % 3) * 100}`);
    } else if (element.classList.contains('product-card')) {
      element.classList.add('slide-up', `delay-${(index % 6) * 100}`);
    } else if (element.classList.contains('founder-card')) {
      element.classList.add('fade-in', `delay-${(index % 4) * 100}`);
    } else if (element.classList.contains('partner-logo')) {
      element.classList.add('scale-in', `delay-${(index % 9) * 100}`);
    } else if (element.classList.contains('cta')) {
      element.classList.add('slide-up');
    }
  }

  return {
    /**
     * 初始化落地页专属交互。
     * @returns {void}
     *
     * 原因：落地页不进入后台业务模块加载链路，脚本在页面底部直接运行。
     */
    init: function () {
      initSmoothScroll();

      initMobileMenu();
      initAnimations();
    }
  };
})();

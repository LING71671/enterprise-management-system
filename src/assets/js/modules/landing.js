'use strict';
const landing = (function() {
  // 落地页锚点导航平滑滚动到目标展示区块。
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // 滚动后给顶部导航增加沉浸式背景，提升前台展示页层次。
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // 控制落地页移动端菜单展开与链接点击后收起。
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
    
    // 点击菜单链接后关闭菜单，避免遮挡目标区块。
    document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // 为企业介绍、产品卡片和合作伙伴标识添加进入视口动画。
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 根据落地页内容类型应用对应动画节奏。
          const element = entry.target;
          
          if (element.classList.contains('hero-container')) {
            element.classList.add('fade-in');
          } else if (element.classList.contains('stat-card')) {
            element.classList.add('slide-up');
            element.classList.add(`delay-${(index % 3) * 100}`);
          } else if (element.classList.contains('tech-card')) {
            element.classList.add('scale-in');
            element.classList.add(`delay-${(index % 3) * 100}`);
          } else if (element.classList.contains('product-card')) {
            element.classList.add('slide-up');
            element.classList.add(`delay-${(index % 6) * 100}`);
          } else if (element.classList.contains('founder-card')) {
            element.classList.add('fade-in');
            element.classList.add(`delay-${(index % 4) * 100}`);
          } else if (element.classList.contains('partner-logo')) {
            element.classList.add('scale-in');
            element.classList.add(`delay-${(index % 9) * 100}`);
          } else if (element.classList.contains('cta')) {
            element.classList.add('slide-up');
          }
          
          // 动画只触发一次，避免来回滚动导致重复闪烁。
          observer.unobserve(element);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // 观察落地页各展示模块。
    document.querySelectorAll('.hero-container, .stat-card, .tech-card, .product-card, .founder-card, .partner-logo, #cta').forEach(el => {
      observer.observe(el);
    });
  }

  return {
    // 初始化落地页专属交互，不进入后台业务模块加载链路。
    init: function() {
      initSmoothScroll();
      initNavbarScroll();
      initMobileMenu();
      initAnimations();
    }
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  landing.init();
});

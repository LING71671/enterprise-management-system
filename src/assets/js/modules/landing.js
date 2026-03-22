'use strict';
const landing = (function() {
  // 平滑滚动
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

  // 导航栏滚动效果
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

  // 滚动动画
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-card, .tech-card, .product-card').forEach(el => {
      observer.observe(el);
    });
  }

  return {
    init: function() {
      initSmoothScroll();
      initNavbarScroll();
      initAnimations();
    }
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  landing.init();
});

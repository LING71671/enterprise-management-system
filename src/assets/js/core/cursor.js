'use strict';

const appCursor = (function() {
  // 前台/后台桌面端使用品牌化光标，移动端跳过以保持触控体验。
  function init() {
    if (window.innerWidth <= 768 || document.querySelector('.custom-cursor')) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    function updateCursor() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(updateCursor);
    }

    requestAnimationFrame(updateCursor);

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    const addHover = () => cursor.classList.add('hover');
    const removeHover = () => cursor.classList.remove('hover');
    const interactives = document.querySelectorAll('a, button, input, .module-card, .founder-card, .product-card, .tech-card, .btn');
    interactives.forEach((element) => {
      element.addEventListener('mouseenter', addHover);
      element.addEventListener('mouseleave', removeHover);
    });
  }

  return {
    init
  };
})();

window.appCursor = appCursor;

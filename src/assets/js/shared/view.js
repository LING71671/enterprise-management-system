'use strict';

const EnterpriseView = (function() {
  function setHtml(id, html) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  }

  function pageName() {
    return window.location.pathname.split('/').pop() || '';
  }

  function renderStats(items) {
    return items.map((item) => `
      <div class="stat-card"><div class="stat-icon">${item.icon}</div><div class="stat-info"><div class="stat-value">${item.value}</div><div class="stat-label">${item.label}</div></div></div>
    `).join('');
  }

  function renderBadge(text, className) {
    return `<span class="badge ${className || 'badge-default'}">${text}</span>`;
  }

  function renderProgress(progress) {
    const color = progress === 100 ? 'var(--color-success)' : progress >= 60 ? 'var(--color-primary)' : 'var(--color-warning)';
    return `
      <div style="display:flex;align-items:center;gap:8px">
        <div style="flex:1;height:8px;background:var(--color-bg);border-radius:4px;overflow:hidden">
          <div style="width:${progress}%;height:100%;background:${color};border-radius:4px"></div>
        </div>
        <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);width:36px">${progress}%</span>
      </div>
    `;
  }

  function bindModalClose(closeModal) {
    on(document.getElementById('modal-close'), 'click', closeModal);
    on(document.getElementById('modal-cancel'), 'click', closeModal);
    on(document.getElementById('modal-overlay'), 'click', (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    });
  }

  return {
    setHtml,
    pageName,
    renderStats,
    renderBadge,
    renderProgress,
    bindModalClose
  };
})();

window.EnterpriseView = EnterpriseView;

'use strict';

const EnterpriseView = (function() {
  // 读取业务表单控件值，兼容不同子系统页面字段缺失的情况。
  function getValue(id, fallback = '') {
    const element = document.getElementById(id);
    return element && typeof element.value !== 'undefined' ? element.value : fallback;
  }

  // 读取搜索框/业务表单文本，并统一去除首尾空白。
  function getTrimmedValue(id, fallback = '') {
    return String(getValue(id, fallback)).trim();
  }

  // 向当前业务页面的统计区或表格区写入 HTML。
  function setHtml(id, html) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  }

  // 获取当前子页面文件名，用于 systems/<domain>/pages.js 分发初始化。
  function pageName() {
    return window.location.pathname.split('/').pop() || '';
  }

  // 将各子系统的指标配置渲染为统一后台统计卡片。
  function renderStats(items) {
    return items.map((item) => `
      <div class="stat-card"><div class="stat-icon">${item.icon}</div><div class="stat-info"><div class="stat-value">${item.value}</div><div class="stat-label">${item.label}</div></div></div>
    `).join('');
  }

  // 生成后台表格中的状态徽章。
  function renderBadge(text, className) {
    return `<span class="badge ${className || 'badge-default'}">${text}</span>`;
  }

  // 渲染业务表格行，并在无数据时输出统一空状态。
  function renderRows(tbody, list, rowRenderer, emptyOptions) {
    if (!tbody) return;

    if (!list.length && emptyOptions) {
      const colspan = emptyOptions.colspan || 1;
      const text = emptyOptions.text || '暂无数据';
      tbody.innerHTML = `<tr><td colspan="${colspan}" style="text-align:center;color:var(--color-text-secondary);padding:var(--spacing-xl)">${text}</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(rowRenderer).join('');
  }

  // 对业务列表按指定字段执行关键词过滤。
  function filterByKeyword(list, keyword, fields) {
    const normalized = String(keyword || '').trim().toLowerCase();
    if (!normalized) return list;

    return list.filter((item) => {
      const text = fields.map((field) => item[field] || '').join(' ').toLowerCase();
      return text.includes(normalized);
    });
  }

  // 无后端原型里用 prompt 快速采集新增记录字段。
  function promptFields(fields) {
    const result = {};

    for (const field of fields) {
      const value = window.prompt(field.label, field.defaultValue || '');
      if (field.required && !value) {
        return null;
      }
      result[field.name] = value || field.defaultValue || '';
    }

    return result;
  }

  // 统一业务记录删除确认流程，并在删除后刷新当前表格。
  function confirmDelete(message, deleteAction, afterDelete) {
    if (!window.confirm(message)) return;

    deleteAction();
    if (typeof afterDelete === 'function') {
      afterDelete();
    }
  }

  // 渲染生产任务进度条，也可复用于其他百分比进度场景。
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

  // 绑定后台详情/编辑弹窗关闭行为，兼容各业务页面的 modal 结构。
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
    getValue,
    getTrimmedValue,
    setHtml,
    pageName,
    renderStats,
    renderBadge,
    renderRows,
    filterByKeyword,
    promptFields,
    confirmDelete,
    renderProgress,
    bindModalClose
  };
})();

window.EnterpriseView = EnterpriseView;

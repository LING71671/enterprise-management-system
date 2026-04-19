'use strict';

const EnterpriseView = (function() {
  /**
   * 读取业务表单控件值。
   * @param {string} id 控件 id。
   * @param {string} [fallback=''] 控件不存在或没有 value 时的回退值。
   * @returns {string} 控件值或回退值。
   *
   * 原因：不同业务子页面共用初始化逻辑，字段缺失时不能打断页面加载。
   */
  function getValue(id, fallback = '') {
    const element = document.getElementById(id);
    return element && typeof element.value !== 'undefined' ? element.value : fallback;
  }

  /**
   * 读取文本控件并去除首尾空白。
   * @param {string} id 控件 id。
   * @param {string} [fallback=''] 回退值。
   * @returns {string} 规范化后的文本。
   */
  function getTrimmedValue(id, fallback = '') {
    return String(getValue(id, fallback)).trim();
  }

  /**
   * 向指定容器写入 HTML。
   * @param {string} id 容器 id。
   * @param {string} html 业务渲染后的 HTML 字符串。
   * @returns {void}
   *
   * 原因：当前项目没有前端框架，统计卡片和表格行通过字符串模板统一渲染。
   */
  function setHtml(id, html) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  }

  /**
   * 获取当前子页面文件名。
   * @returns {string} URL 最后一段文件名。
   */
  function pageName() {
    return window.location.pathname.split('/').pop() || '';
  }

  /**
   * 渲染业务统计卡片。
   * @param {Array<{icon: string, value: string|number, label: string}>} items 指标配置。
   * @returns {string} 统计卡片 HTML。
   */
  function renderStats(items) {
    return items.map((item, index) => `
      <div class="stat-card slide-up delay-${(index % 4) * 100}"><div class="stat-icon">${item.icon}</div><div class="stat-info"><div class="stat-value">${item.value}</div><div class="stat-label">${item.label}</div></div></div>
    `).join('');
  }

  /**
   * 渲染表格状态徽章。
   * @param {string} text 徽章文案。
   * @param {string} [className] badge 颜色类。
   * @returns {string} 徽章 HTML。
   */
  function renderBadge(text, className) {
    return `<span class="badge ${className || 'badge-default'}">${text}</span>`;
  }

  /**
   * 渲染业务表格行。
   * @param {HTMLElement|null} tbody 表格 body。
   * @param {Array} list 当前列表数据。
   * @param {Function} rowRenderer 单行渲染函数。
   * @param {Object} [emptyOptions] 空状态配置，包含 colspan 和 text。
   * @returns {void}
   *
   * 原因：所有业务域都有列表页，统一空状态能减少各页面重复模板。
   */
  function renderRows(tbody, list, rowRenderer, emptyOptions) {
    if (!tbody) return;

    if (!list.length && emptyOptions) {
      const colspan = emptyOptions.colspan || 1;
      const text = emptyOptions.text || '暂无数据';
      tbody.innerHTML = `<tr><td colspan="${colspan}" style="text-align:center;color:var(--color-text-secondary);padding:var(--spacing-xl)">${text}</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(rowRenderer).join('');
    applyTableLabels(tbody);
  }

  /**
   * 为移动端卡片表格补充列名。
   * @param {HTMLElement} tbody 表格 body。
   * @returns {void}
   *
   * 原因：CSS 在窄屏下通过 td[data-label] 展示字段名，统一补齐可避免每个业务行模板重复维护。
   */
  function applyTableLabels(tbody) {
    const table = tbody.closest('table');
    if (!table) return;

    const labels = Array.from(table.querySelectorAll('thead th')).map((th) => th.textContent.trim());
    if (!labels.length) return;

    Array.from(tbody.querySelectorAll('tr')).forEach((row) => {
      const cells = Array.from(row.children).filter((cell) => cell.tagName === 'TD');
      const isEmptyRow = cells.length === 1 && cells[0].hasAttribute('colspan');
      if (isEmptyRow) return;

      cells.forEach((cell, index) => {
        if (labels[index] && !cell.hasAttribute('data-label')) {
          cell.setAttribute('data-label', labels[index]);
        }
      });
    });
  }

  /**
   * 按关键词过滤业务列表。
   * @param {Array<Object>} list 原始列表。
   * @param {string} keyword 搜索关键词。
   * @param {string[]} fields 参与匹配的字段名。
   * @returns {Array<Object>} 过滤后的列表；关键词为空时返回原列表。
   */
  function filterByKeyword(list, keyword, fields) {
    const normalized = String(keyword || '').trim().toLowerCase();
    if (!normalized) return list;

    return list.filter((item) => {
      const text = fields.map((field) => item[field] || '').join(' ').toLowerCase();
      return text.includes(normalized);
    });
  }

  /**
   * 通过 prompt 采集新增记录字段。
   * @param {Array<Object>} fields 字段配置，包含 name、label、defaultValue 和 required。
   * @returns {Object|null} 用户输入对象；必填字段为空时返回 null。
   *
   * 原因：无后端原型优先闭合业务流程，prompt 能快速完成新增演示而不引入额外表单结构。
   */
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

  /**
   * 执行业务删除确认。
   * @param {string} message 确认提示文案。
   * @param {Function} deleteAction 删除操作。
   * @param {Function} [afterDelete] 删除后的刷新回调。
   * @returns {void}
   */
  function confirmDelete(message, deleteAction, afterDelete) {
    if (!window.confirm(message)) return;

    deleteAction();
    if (typeof afterDelete === 'function') {
      afterDelete();
    }
  }

  /**
   * 渲染百分比进度条。
   * @param {number} progress 0 到 100 的进度值。
   * @returns {string} 进度条 HTML。
   *
   * 原因：生产排产和其他进度型字段需要统一颜色阈值和数字展示。
   */
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

  /**
   * 绑定后台弹窗关闭行为。
   * @param {Function} closeModal 关闭弹窗的业务回调。
   * @returns {void}
   *
   * 原因：关闭按钮、取消按钮和遮罩点击都应进入同一关闭流程，确保编辑状态同步清理。
   */
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

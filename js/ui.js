

// ─── Toast Notifications ───────────────────────────────────────────────────────

const UI = {
  _toastContainer: null,

  /** Initialize toast container */
  initToasts() {
    if (document.getElementById('toast-container')) return;
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
    this._toastContainer = container;
  },

  /**
   * Show a toast notification
   * @param {string} message - Toast message
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {number} duration - ms before auto-dismiss (default 3500)
   */
  showToast(message, type = 'info', duration = 3500) {
    if (!this._toastContainer) this.initToasts();

    const icons = {
      success: 'check-circle',
      error:   'x-circle',
      warning: 'alert-triangle',
      info:    'info',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} slide-in-right`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i>
      <span class="toast-message">${this._escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Dismiss notification">
        <i data-lucide="x" class="icon-xs"></i>
      </button>
    `;

    this._toastContainer.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this._dismissToast(toast);
    });

    // Auto-dismiss
    const timer = setTimeout(() => this._dismissToast(toast), duration);

    // Pause on hover
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => {
      setTimeout(() => this._dismissToast(toast), 1000);
    });

    return toast;
  },

  _dismissToast(toast) {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  },

  // ─── Modal System ─────────────────────────────────────────────────────────────

  /**
   * Open a generic modal
   * @param {string} title
   * @param {string} content - HTML string
   * @param {Array<{label, action, variant}>} actions
   * @param {string} size - 'sm'|'md'|'lg'|'xl'
   */
  openModal(title, content, actions = [], size = 'md') {
    // Remove existing modal
    this.closeModal();

    const modal = document.createElement('div');
    modal.id = 'generic-modal';
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'generic-modal-title');

    const actionHTML = actions.map((a, i) =>
      `<button class="btn btn-${a.variant || 'secondary'} modal-action" data-action-index="${i}">
        ${a.icon ? `<i data-lucide="${a.icon}" class="icon-sm"></i>` : ''}
        ${this._escapeHtml(a.label)}
      </button>`
    ).join('');

    modal.innerHTML = `
      <div class="modal-box modal-${size} scale-in">
        <div class="modal-header">
          <h3 id="generic-modal-title" class="modal-title">${this._escapeHtml(title)}</h3>
          <button class="modal-close" id="generic-modal-close" aria-label="Close dialog">
            <i data-lucide="x"></i>
          </button>
        </div>
        <div class="modal-body">${content}</div>
        ${actions.length ? `<div class="modal-footer">${actionHTML}</div>` : ''}
      </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    if (window.lucide) lucide.createIcons();

    // Close handlers
    modal.querySelector('#generic-modal-close').addEventListener('click', () => this.closeModal());
    modal.addEventListener('click', e => { if (e.target === modal) this.closeModal(); });

    const escFn = (e) => {
      if (e.key === 'Escape') { this.closeModal(); document.removeEventListener('keydown', escFn); }
    };
    document.addEventListener('keydown', escFn);

    // Bind action buttons
    modal.querySelectorAll('.modal-action').forEach(btn => {
      const idx = parseInt(btn.dataset.actionIndex, 10);
      const action = actions[idx];
      if (action && action.onClick) {
        btn.addEventListener('click', () => action.onClick(btn));
      }
    });

    return modal;
  },

  closeModal() {
    const modal = document.getElementById('generic-modal');
    if (modal) {
      modal.querySelector('.modal-box')?.classList.add('scale-out');
      setTimeout(() => {
        modal.remove();
        document.body.classList.remove('modal-open');
      }, 200);
    }
  },

  // ─── Confirm Dialog ───────────────────────────────────────────────────────────

  /**
   * Show a confirmation dialog
   * @param {string} message
   * @param {string} title
   * @returns {Promise<boolean>}
   */
  confirmDialog(message, title = 'Confirm Action', variant = 'danger') {
    return new Promise(resolve => {
      const modal = document.createElement('div');
      modal.id = 'confirm-modal';
      modal.className = 'modal-overlay';
      modal.setAttribute('role', 'alertdialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'confirm-title');
      modal.setAttribute('aria-describedby', 'confirm-message');

      const iconMap = { danger: 'alert-triangle', warning: 'alert-circle', info: 'info' };

      modal.innerHTML = `
        <div class="modal-box modal-sm scale-in confirm-box">
          <div class="confirm-icon confirm-icon-${variant}">
            <i data-lucide="${iconMap[variant] || 'alert-triangle'}"></i>
          </div>
          <h3 id="confirm-title" class="confirm-title">${this._escapeHtml(title)}</h3>
          <p id="confirm-message" class="confirm-message">${this._escapeHtml(message)}</p>
          <div class="confirm-actions">
            <button class="btn btn-ghost" id="confirm-cancel">Cancel</button>
            <button class="btn btn-${variant === 'danger' ? 'danger' : 'primary'}" id="confirm-ok">Confirm</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.classList.add('modal-open');
      if (window.lucide) lucide.createIcons();

      const cleanup = (result) => {
        modal.querySelector('.modal-box')?.classList.add('scale-out');
        setTimeout(() => { modal.remove(); document.body.classList.remove('modal-open'); }, 200);
        resolve(result);
      };

      modal.querySelector('#confirm-ok').addEventListener('click', () => cleanup(true));
      modal.querySelector('#confirm-cancel').addEventListener('click', () => cleanup(false));
      modal.addEventListener('click', e => { if (e.target === modal) cleanup(false); });

      const escFn = (e) => { if (e.key === 'Escape') { cleanup(false); document.removeEventListener('keydown', escFn); } };
      document.addEventListener('keydown', escFn);

      modal.querySelector('#confirm-ok').focus();
    });
  },

  // ─── Data Table ───────────────────────────────────────────────────────────────

  /**
   * Create a sortable, searchable, paginated data table
   * @param {Array} data
   * @param {Array<{key, label, render, sortable}>} columns
   * @param {Object} options - {pageSize, searchable, onEdit, onDelete, onView}
   * @returns {HTMLElement}
   */
  createTable(data, columns, options = {}) {
    const {
      pageSize   = 10,
      searchable = true,
      onEdit,
      onDelete,
      onView,
      idKey = 'id',
    } = options;

    let currentPage  = 1;
    let sortKey      = null;
    let sortDir      = 'asc';
    let searchQuery  = '';
    let filteredData = [...data];

    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';

    const renderTable = () => {
      // Filter
      filteredData = data.filter(row => {
        if (!searchQuery) return true;
        return columns.some(col => {
          const val = row[col.key];
          return val && String(val).toLowerCase().includes(searchQuery.toLowerCase());
        });
      });

      // Sort
      if (sortKey) {
        filteredData.sort((a, b) => {
          const va = a[sortKey] ?? '';
          const vb = b[sortKey] ?? '';
          if (va < vb) return sortDir === 'asc' ? -1 : 1;
          if (va > vb) return sortDir === 'asc' ? 1 : -1;
          return 0;
        });
      }

      // Paginate
      const totalPages  = Math.ceil(filteredData.length / pageSize) || 1;
      currentPage       = Math.min(currentPage, totalPages);
      const start       = (currentPage - 1) * pageSize;
      const pageData    = filteredData.slice(start, start + pageSize);

      // Build HTML
      const hasActions = onEdit || onDelete || onView;

      wrapper.innerHTML = `
        ${searchable ? `
          <div class="table-toolbar">
            <div class="table-search">
              <i data-lucide="search" class="icon-sm search-icon"></i>
              <input type="search" class="table-search-input" id="table-search-${Date.now()}"
                placeholder="Search..." value="${this._escapeHtml(searchQuery)}"
                aria-label="Search table">
            </div>
            <span class="table-count">${filteredData.length} record${filteredData.length !== 1 ? 's' : ''}</span>
          </div>
        ` : ''}

        <div class="table-scroll">
          <table class="data-table" role="table" aria-label="Data table">
            <thead>
              <tr role="row">
                ${columns.map(col => `
                  <th role="columnheader" class="${col.sortable !== false ? 'sortable' : ''} ${sortKey === col.key ? 'sorted-' + sortDir : ''}"
                    ${col.sortable !== false ? `data-sort="${col.key}" tabindex="0"` : ''}
                    aria-sort="${sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}">
                    ${this._escapeHtml(col.label)}
                    ${col.sortable !== false ? `<i data-lucide="${sortKey === col.key ? (sortDir === 'asc' ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="sort-icon"></i>` : ''}
                  </th>
                `).join('')}
                ${hasActions ? '<th role="columnheader">Actions</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${pageData.length === 0 ? `
                <tr><td colspan="${columns.length + (hasActions ? 1 : 0)}" class="table-empty">
                  <i data-lucide="search-x" class="table-empty-icon"></i>
                  <p>No records found</p>
                </td></tr>
              ` : pageData.map(row => `
                <tr role="row" data-id="${row[idKey]}">
                  ${columns.map(col => `
                    <td role="cell" data-label="${this._escapeHtml(col.label)}">
                      ${col.render ? col.render(row[col.key], row) : this._escapeHtml(String(row[col.key] ?? '—'))}
                    </td>
                  `).join('')}
                  ${hasActions ? `
                    <td role="cell" class="table-actions">
                      ${onView   ? `<button class="btn-icon btn-view"   data-id="${row[idKey]}" aria-label="View record"><i data-lucide="eye" class="icon-sm"></i></button>` : ''}
                      ${onEdit   ? `<button class="btn-icon btn-edit"   data-id="${row[idKey]}" aria-label="Edit record"><i data-lucide="edit-2" class="icon-sm"></i></button>` : ''}
                      ${onDelete ? `<button class="btn-icon btn-delete" data-id="${row[idKey]}" aria-label="Delete record"><i data-lucide="trash-2" class="icon-sm"></i></button>` : ''}
                    </td>
                  ` : ''}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${totalPages > 1 ? `
          <div class="table-pagination">
            <button class="btn-icon pagination-btn" id="prev-page" aria-label="Previous page" ${currentPage === 1 ? 'disabled' : ''}>
              <i data-lucide="chevron-left"></i>
            </button>
            <div class="pagination-pages">
              ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                <button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}" aria-label="Page ${p}" aria-current="${p === currentPage ? 'page' : 'false'}">${p}</button>
              `).join('')}
            </div>
            <button class="btn-icon pagination-btn" id="next-page" aria-label="Next page" ${currentPage === totalPages ? 'disabled' : ''}>
              <i data-lucide="chevron-right"></i>
            </button>
            <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
          </div>
        ` : ''}
      `;

      if (window.lucide) lucide.createIcons();

      // Bind sort headers
      wrapper.querySelectorAll('[data-sort]').forEach(th => {
        const click = () => {
          const key = th.dataset.sort;
          if (sortKey === key) { sortDir = sortDir === 'asc' ? 'desc' : 'asc'; }
          else { sortKey = key; sortDir = 'asc'; }
          renderTable();
        };
        th.addEventListener('click', click);
        th.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') click(); });
      });

      // Bind search
      const searchInput = wrapper.querySelector('.table-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', e => {
          searchQuery  = e.target.value;
          currentPage  = 1;
          renderTable();
        });
      }

      // Bind pagination
      wrapper.querySelector('#prev-page')?.addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; renderTable(); }
      });
      wrapper.querySelector('#next-page')?.addEventListener('click', () => {
        if (currentPage < totalPages) { currentPage++; renderTable(); }
      });
      wrapper.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentPage = parseInt(btn.dataset.page, 10);
          renderTable();
        });
      });

      // Bind action buttons
      wrapper.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', () => onView(btn.dataset.id, data.find(r => r[idKey] === btn.dataset.id)));
      });
      wrapper.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => onEdit(btn.dataset.id, data.find(r => r[idKey] === btn.dataset.id)));
      });
      wrapper.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => onDelete(btn.dataset.id, data.find(r => r[idKey] === btn.dataset.id)));
      });
    };

    renderTable();

    // Expose refresh method
    wrapper.refresh = (newData) => {
      data = newData;
      currentPage = 1;
      renderTable();
    };

    return wrapper;
  },

  // ─── Form Validator ───────────────────────────────────────────────────────────

  /**
   * Validate a form element against rules
   * @param {HTMLFormElement} formEl
   * @param {Object} rules - { fieldName: { required, minLength, maxLength, pattern, message } }
   * @returns {boolean}
   */
  validateForm(formEl, rules) {
    let valid = true;

    // Clear previous errors
    formEl.querySelectorAll('.field-error').forEach(el => el.remove());
    formEl.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    for (const [fieldName, rule] of Object.entries(rules)) {
      const input = formEl.elements[fieldName];
      if (!input) continue;

      const value = input.value.trim();
      let error   = null;

      if (rule.required && !value) {
        error = rule.message || `${rule.label || fieldName} is required.`;
      } else if (rule.minLength && value.length < rule.minLength) {
        error = rule.message || `Must be at least ${rule.minLength} characters.`;
      } else if (rule.maxLength && value.length > rule.maxLength) {
        error = rule.message || `Must not exceed ${rule.maxLength} characters.`;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        error = rule.message || `Invalid format for ${rule.label || fieldName}.`;
      } else if (rule.custom) {
        error = rule.custom(value, formEl);
      }

      if (error) {
        valid = false;
        input.classList.add('input-error');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);

        const errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.setAttribute('role', 'alert');
        errorEl.textContent = error;
        input.parentNode.insertBefore(errorEl, input.nextSibling);
      }
    }

    return valid;
  },

  // ─── Loader ───────────────────────────────────────────────────────────────────

  showLoader(targetEl = null) {
    if (targetEl) {
      targetEl.classList.add('loading');
      const spinner = document.createElement('div');
      spinner.className = 'inline-spinner';
      spinner.innerHTML = '<i data-lucide="loader-2" class="spin"></i>';
      targetEl.appendChild(spinner);
      if (window.lucide) lucide.createIcons();
    } else {
      let overlay = document.getElementById('page-loader');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'page-loader';
        overlay.innerHTML = `
          <div class="page-loader-inner">
            <div class="loader-logo">
              <i data-lucide="shield" class="loader-shield"></i>
            </div>
            <div class="loader-bar"><div class="loader-progress"></div></div>
          </div>
        `;
        document.body.appendChild(overlay);
        if (window.lucide) lucide.createIcons();
      }
    }
  },

  hideLoader(targetEl = null) {
    if (targetEl) {
      targetEl.classList.remove('loading');
      targetEl.querySelector('.inline-spinner')?.remove();
    } else {
      const overlay = document.getElementById('page-loader');
      if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 300);
      }
    }
  },

  // ─── Skeleton Loader ──────────────────────────────────────────────────────────

  /** Create skeleton loader HTML */
  skeleton(rows = 3, cols = 4) {
    const cells = Array.from({ length: cols }, () => '<td><div class="skeleton skeleton-text"></div></td>').join('');
    const rowsHTML = Array.from({ length: rows }, () => `<tr>${cells}</tr>`).join('');
    return `<div class="skeleton-wrapper"><table class="data-table"><tbody>${rowsHTML}</tbody></table></div>`;
  },

  skeletonCards(count = 4) {
    return Array.from({ length: count }, () => `
      <div class="skeleton-card">
        <div class="skeleton skeleton-circle"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text skeleton-short"></div>
      </div>
    `).join('');
  },

  // ─── Export to CSV ────────────────────────────────────────────────────────────

  exportCSV(data, columns, filename = 'export.csv') {
    const header  = columns.map(c => `"${c.label}"`).join(',');
    const rows    = data.map(row =>
      columns.map(c => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csv     = [header, ...rows].join('\n');
    const blob    = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url     = URL.createObjectURL(blob);
    const link    = document.createElement('a');
    link.href     = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // ─── Utilities ─────────────────────────────────────────────────────────────────

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /** Format date string */
  formatDate(dateStr, options = {}) {
    if (!dateStr) return '—';
    try {
      const opts = { year: 'numeric', month: 'long', day: 'numeric', ...options };
      return new Date(dateStr).toLocaleDateString('en-BD', opts);
    } catch (_) { return dateStr; }
  },

  /** Format date to relative time */
  relativeTime(dateStr) {
    if (!dateStr) return '—';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins  = Math.floor(diff / 60000);
    const hrs   = Math.floor(mins / 60);
    const days  = Math.floor(hrs / 24);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days < 7) return `${days}d ago`;
    return this.formatDate(dateStr, { year: 'numeric', month: 'short', day: 'numeric' });
  },

  /** Category badge HTML */
  categoryBadge(category) {
    const colorMap = {
      Exam:     'badge-red',
      Holiday:  'badge-green',
      Event:    'badge-blue',
      Academic: 'badge-purple',
      Sports:   'badge-orange',
      Cultural: 'badge-teal',
      Ceremony: 'badge-gold',
    };
    const cls = colorMap[category] || 'badge-gray';
    return `<span class="badge ${cls}">${this._escapeHtml(category)}</span>`;
  },

  /** Debounce utility */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /** Grade display HTML */
  gradeDisplay(marks) {
    if (!window.GRADING) return marks;
    const grade = GRADING.getGrade(marks);
    const cls   = GRADING.getGradeClass(grade);
    return `<span class="grade-badge ${cls}">${grade}</span>`;
  },
};

// ─── Canvas Charts (no Chart.js) ────────────────────────────────────────────────

const Charts = {
  /** Draw a bar chart on a canvas element */
  bar(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const {
      labels    = data.map((_, i) => `Item ${i + 1}`),
      color     = '#1B4332',
      accentColor = '#D4A017',
      bgColor   = 'transparent',
      padding   = 40,
      animate   = true,
    } = options;

    const W = canvas.width;
    const H = canvas.height;
    const maxVal = Math.max(...data, 1);
    const barW   = ((W - padding * 2) / data.length) * 0.6;
    const gap    = ((W - padding * 2) / data.length) * 0.4;
    let progress = animate ? 0 : 1;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);

      data.forEach((val, i) => {
        const x     = padding + i * ((W - padding * 2) / data.length) + gap / 2;
        const barH  = ((val / maxVal) * (H - padding * 2)) * progress;
        const y     = H - padding - barH;

        // Bar
        const grad = ctx.createLinearGradient(x, y, x, H - padding);
        grad.addColorStop(0, accentColor);
        grad.addColorStop(1, color);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();

        // Label
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#666';
        ctx.font = '11px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barW / 2, H - padding + 16);

        // Value
        if (progress === 1) {
          ctx.fillStyle = color;
          ctx.font = 'bold 12px DM Sans, sans-serif';
          ctx.fillText(val, x + barW / 2, y - 6);
        }
      });

      // Axis
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#ddd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding - 5, H - padding);
      ctx.lineTo(W - padding, H - padding);
      ctx.stroke();

      if (animate && progress < 1) {
        progress = Math.min(progress + 0.04, 1);
        requestAnimationFrame(draw);
      }
    };

    draw();
  },

  /** Draw a pie/donut chart */
  donut(canvasId, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const {
      labels  = data.map((_, i) => `Slice ${i + 1}`),
      colors  = ['#1B4332', '#D4A017', '#2ECC71', '#3498db', '#e74c3c', '#9b59b6'],
      title   = '',
      animate = true,
    } = options;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R  = Math.min(W, H) / 2 - 30;
    const r  = R * 0.55; // inner radius for donut
    const total = data.reduce((a, b) => a + b, 0);
    let progress = animate ? 0 : 1;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let startAngle = -Math.PI / 2;

      data.forEach((val, i) => {
        const slice = (val / total) * Math.PI * 2 * progress;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, startAngle, startAngle + slice);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        startAngle += slice;
      });

      // Inner circle (donut hole)
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card-bg').trim() || '#fff';
      ctx.fill();

      // Center text
      if (title) {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#333';
        ctx.font = 'bold 14px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, cx, cy + 5);
      }

      // Legend
      const legendX = 8;
      data.forEach((val, i) => {
        const lY = H - 20 - (data.length - 1 - i) * 20;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(legendX, lY - 8, 12, 12);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#666';
        ctx.font = '11px DM Sans, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${labels[i]} (${Math.round((val / total) * 100)}%)`, legendX + 18, lY + 2);
      });

      if (animate && progress < 1) {
        progress = Math.min(progress + 0.04, 1);
        requestAnimationFrame(draw);
      }
    };

    draw();
  },
};

// ─── Export ────────────────────────────────────────────────────────────────────

window.UI     = UI;
window.Charts = Charts;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  UI.initToasts();
});

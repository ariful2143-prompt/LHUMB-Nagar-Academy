/**
 * DMHS — Dhaka Model High School
 * Core Application Logic: Auth, Routing, Session Management
 */

// ─── Constants ─────────────────────────────────────────────────────────────────

const SESSION_KEY = 'dmhs_session';
const THEME_KEY   = 'dmhs_theme';
const REMEMBER_KEY = 'dmhs_remember';

// ─── Theme System ───────────────────────────────────────────────────────────────

const ThemeManager = {
  /** Apply saved or preferred theme immediately (call before render) */
  applyOnLoad() {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved || preferred;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
  },

  /** Toggle between light and dark */
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    this._updateToggleButton(next);
    return next;
  },

  /** Get current theme */
  current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  /** Update toggle button icon (sun/moon) */
  _updateToggleButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = `<i data-lucide="sun" class="icon-sm"></i>`;
    } else {
      btn.innerHTML = `<i data-lucide="moon" class="icon-sm"></i>`;
    }
    // Re-render Lucide icons
    if (window.lucide) lucide.createIcons();
  },

  /** Bind theme toggle button */
  bindToggle(buttonId = 'theme-toggle') {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    btn.addEventListener('click', () => this.toggle());
    this._updateToggleButton(this.current());
  },
};

// ─── Auth System ───────────────────────────────────────────────────────────────

const Auth = {
  /** Attempt login — returns {success, user, error} */
  login(username, password, role) {
    if (!window.DB) return { success: false, error: 'Database not initialized.' };

    const users = DB.getAll(DB_KEYS.USERS);
    const user  = users.find(
      u => u.username === username.trim() && u.password === password && u.role === role
    );

    if (!user) {
      return { success: false, error: 'Invalid username, password, or role.' };
    }

    // Build session object
    const session = {
      id:       user.id,
      username: user.username,
      name:     user.name,
      role:     user.role,
      email:    user.email,
      teacherId: user.teacherId || null,
      studentId: user.studentId || null,
      loginTime: new Date().toISOString(),
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    DB._logActivity('LOGIN', 'auth', user.id);
    return { success: true, user: session };
  },

  /** Logout — clear session and redirect */
  logout(redirectTo = 'index.html') {
    const session = this.getSession();
    if (session) DB._logActivity('LOGOUT', 'auth', session.id);
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = redirectTo;
  },

  /** Get current session */
  getSession() {
    try {
      const s = sessionStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch (_) {
      return null;
    }
  },

  /** Check if logged in */
  isLoggedIn() {
    return !!this.getSession();
  },

  /** Get current user's role */
  getRole() {
    const s = this.getSession();
    return s ? s.role : null;
  },

  /** Require auth — redirect to page if not logged in */
  require(expectedRole, redirectTo = 'index.html') {
    const session = this.getSession();
    if (!session) {
      window.location.href = redirectTo;
      return null;
    }
    if (expectedRole && session.role !== expectedRole) {
      window.location.href = redirectTo;
      return null;
    }
    return session;
  },

  /** Change password for current user */
  changePassword(currentPass, newPass) {
    const session = this.getSession();
    if (!session) return { success: false, error: 'Not logged in.' };

    const users = DB.getAll(DB_KEYS.USERS);
    const user  = users.find(u => u.id === session.id);
    if (!user) return { success: false, error: 'User not found.' };
    if (user.password !== currentPass) return { success: false, error: 'Current password is incorrect.' };
    if (newPass.length < 6) return { success: false, error: 'New password must be at least 6 characters.' };

    DB.update(DB_KEYS.USERS, session.id, { password: newPass });
    return { success: true };
  },
};

// ─── Router ─────────────────────────────────────────────────────────────────────

const Router = {
  /** Navigate to a named panel (within same page) */
  showPanel(panelId) {
    // Hide all panels
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-hidden', 'true');
    });

    // Show target panel
    const target = document.getElementById(`panel-${panelId}`);
    if (target) {
      target.classList.add('active');
      target.setAttribute('aria-hidden', 'false');
      target.scrollTop = 0;
    }

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.panel === panelId);
    });

    // Update URL hash
    window.location.hash = panelId;
  },

  /** Restore panel from hash */
  restoreFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) this.showPanel(hash);
  },
};

// ─── Login Modal System ─────────────────────────────────────────────────────────

const LoginModal = {
  _modal: null,

  open() {
    if (document.getElementById('login-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'login-modal-title');
    modal.innerHTML = `
      <div class="modal-box login-modal-box scale-in">
        <button class="modal-close" id="login-modal-close" aria-label="Close login modal">
          <i data-lucide="x"></i>
        </button>
        <div class="login-header">
          <div class="login-logo">
            <i data-lucide="shield" class="login-shield-icon"></i>
          </div>
          <h2 id="login-modal-title" class="login-title">Portal Login</h2>
          <p class="login-subtitle">Dhaka Model High School</p>
        </div>

        <div class="role-tabs" role="tablist" aria-label="Select role">
          <button class="role-tab active" data-role="admin"   role="tab" aria-selected="true"  aria-controls="login-form-panel" id="tab-admin">
            <i data-lucide="shield-check"></i> Admin
          </button>
          <button class="role-tab"        data-role="teacher" role="tab" aria-selected="false" aria-controls="login-form-panel" id="tab-teacher">
            <i data-lucide="book-open"></i> Teacher
          </button>
          <button class="role-tab"        data-role="student" role="tab" aria-selected="false" aria-controls="login-form-panel" id="tab-student">
            <i data-lucide="graduation-cap"></i> Student
          </button>
        </div>

        <form id="login-form" class="login-form" novalidate>
          <input type="hidden" id="login-role" value="admin">

          <div class="form-group">
            <label for="login-username" class="form-label">
              <i data-lucide="user" class="icon-xs"></i> Username
            </label>
            <div class="input-wrapper">
              <input type="text" id="login-username" name="username"
                class="form-input" placeholder="Enter your username"
                autocomplete="username" required>
            </div>
            <span class="form-error" id="username-error"></span>
          </div>

          <div class="form-group">
            <label for="login-password" class="form-label">
              <i data-lucide="lock" class="icon-xs"></i> Password
            </label>
            <div class="input-wrapper password-wrapper">
              <input type="password" id="login-password" name="password"
                class="form-input" placeholder="Enter your password"
                autocomplete="current-password" required>
              <button type="button" class="password-toggle" id="pwd-toggle"
                aria-label="Toggle password visibility">
                <i data-lucide="eye" class="icon-xs"></i>
              </button>
            </div>
            <span class="form-error" id="password-error"></span>
          </div>

          <div class="form-group form-row">
            <label class="checkbox-label">
              <input type="checkbox" id="remember-me" class="checkbox-input">
              <span class="checkbox-custom"></span>
              Remember me
            </label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <div class="form-error form-error-main" id="login-error"></div>

          <button type="submit" class="btn btn-primary btn-full" id="login-submit">
            <i data-lucide="log-in" class="icon-sm"></i>
            <span>Sign In</span>
            <span class="btn-loader hidden"><i data-lucide="loader-2" class="spin"></i></span>
          </button>
        </form>

        <div class="login-credentials-hint">
          <details>
            <summary><i data-lucide="info" class="icon-xs"></i> Demo Credentials</summary>
            <div class="creds-grid">
              <div><strong>Admin:</strong> admin / admin123</div>
              <div><strong>Teacher:</strong> teacher1 / teach123</div>
              <div><strong>Student:</strong> student1 / stud123</div>
            </div>
          </details>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    // Render Lucide icons
    if (window.lucide) lucide.createIcons();

    // Bind events
    this._bindEvents(modal);

    // Focus first input
    setTimeout(() => {
      const input = modal.querySelector('#login-username');
      if (input) input.focus();
    }, 100);

    this._modal = modal;
  },

  close() {
    const modal = document.getElementById('login-modal');
    if (modal) {
      modal.classList.add('fade-out');
      setTimeout(() => {
        modal.remove();
        document.body.classList.remove('modal-open');
      }, 200);
    }
    this._modal = null;
  },

  _bindEvents(modal) {
    // Close button
    modal.querySelector('#login-modal-close').addEventListener('click', () => this.close());

    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });

    // ESC key
    const escHandler = (e) => {
      if (e.key === 'Escape') { this.close(); document.removeEventListener('keydown', escHandler); }
    };
    document.addEventListener('keydown', escHandler);

    // Role tabs
    modal.querySelectorAll('.role-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        modal.querySelectorAll('.role-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.getElementById('login-role').value = tab.dataset.role;
        // Clear errors
        document.getElementById('login-error').textContent = '';
      });
    });

    // Password toggle
    modal.querySelector('#pwd-toggle').addEventListener('click', () => {
      const pwd = modal.querySelector('#login-password');
      const icon = modal.querySelector('#pwd-toggle i');
      if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
      } else {
        pwd.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
      }
      if (window.lucide) lucide.createIcons();
    });

    // Form submit
    modal.querySelector('#login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      const role     = document.getElementById('login-role').value;
      const remember = document.getElementById('remember-me').checked;
      const errorEl  = document.getElementById('login-error');
      const submitBtn = document.getElementById('login-submit');
      const loader    = submitBtn.querySelector('.btn-loader');
      const label     = submitBtn.querySelector('span:not(.btn-loader)');

      // Clear errors
      errorEl.textContent = '';
      document.getElementById('username-error').textContent = '';
      document.getElementById('password-error').textContent = '';

      // Validate
      let valid = true;
      if (!username.trim()) {
        document.getElementById('username-error').textContent = 'Username is required.';
        valid = false;
      }
      if (!password) {
        document.getElementById('password-error').textContent = 'Password is required.';
        valid = false;
      }
      if (!valid) return;

      // Show loader
      submitBtn.disabled = true;
      loader.classList.remove('hidden');
      label.classList.add('hidden');

      // Simulate async delay
      await new Promise(r => setTimeout(r, 600));

      const result = Auth.login(username, password, role);

      loader.classList.add('hidden');
      label.classList.remove('hidden');
      submitBtn.disabled = false;

      if (!result.success) {
        errorEl.textContent = result.error;
        errorEl.classList.add('shake');
        setTimeout(() => errorEl.classList.remove('shake'), 500);
        return;
      }

      // Save remember me
      if (remember) {
        localStorage.setItem(REMEMBER_KEY, JSON.stringify({ username, role }));
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      // Success — redirect based on role
      this.close();
      UI.showToast(`Welcome back, ${result.user.name}!`, 'success');

      setTimeout(() => {
        const redirectMap = {
          admin:   'admin.html',
          teacher: 'teacher.html',
          student: 'student.html',
        };
        window.location.href = redirectMap[result.user.role] || 'index.html';
      }, 800);
    });

    // Pre-fill remembered credentials
    const remembered = JSON.parse(localStorage.getItem(REMEMBER_KEY) || 'null');
    if (remembered) {
      document.getElementById('login-username').value = remembered.username;
      document.getElementById('remember-me').checked = true;
      // Activate the remembered role tab
      const tab = modal.querySelector(`.role-tab[data-role="${remembered.role}"]`);
      if (tab) tab.click();
    }
  },
};

// ─── Scroll Utilities ──────────────────────────────────────────────────────────

const Scroll = {
  /** Smooth scroll to element */
  to(selector, offset = 80) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  },

  /** Set up IntersectionObserver for scroll-reveal animations */
  setupReveal(selector = '.reveal', rootMargin = '0px 0px -80px 0px') {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin, threshold: 0.1 });

    els.forEach(el => observer.observe(el));
    return observer;
  },

  /** Sticky navbar glass effect on scroll */
  setupNavbarGlass(navbarSelector = '#main-navbar', threshold = 50) {
    const navbar = document.querySelector(navbarSelector);
    if (!navbar) return;

    const handler = () => {
      if (window.scrollY > threshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler(); // Initial check
  },
};

// ─── Counter Animation ─────────────────────────────────────────────────────────

const Counter = {
  /** Animate a number counter on scroll */
  setup(containerSelector = '.stats-section') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const counters = container.querySelectorAll('[data-count]');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => this._animate(counter));
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(container);
  },

  _animate(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration || '2000', 10);
    const isFloat  = target % 1 !== 0;
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isFloat
        ? (eased * target).toFixed(2)
        : Math.floor(eased * target);
      el.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = `${prefix}${isFloat ? target.toFixed(2) : target}${suffix}`;
    };

    requestAnimationFrame(update);
  },
};

// ─── Typewriter Effect ─────────────────────────────────────────────────────────

const Typewriter = {
  run(el, texts, speed = 80, pause = 2000) {
    if (!el) return;
    let textIdx   = 0;
    let charIdx   = 0;
    let deleting  = false;
    let timeoutId = null;

    const type = () => {
      const current = texts[textIdx];

      if (!deleting) {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          timeoutId = setTimeout(type, pause);
          return;
        }
      } else {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          textIdx  = (textIdx + 1) % texts.length;
        }
      }

      timeoutId = setTimeout(type, deleting ? speed / 2 : speed);
    };

    type();
    return () => clearTimeout(timeoutId);
  },
};

// ─── Export ─────────────────────────────────────────────────────────────────────

window.ThemeManager = ThemeManager;
window.Auth         = Auth;
window.Router       = Router;
window.LoginModal   = LoginModal;
window.Scroll       = Scroll;
window.Counter      = Counter;
window.Typewriter   = Typewriter;
window.SESSION_KEY  = SESSION_KEY;
window.THEME_KEY    = THEME_KEY;

// Apply theme immediately to prevent flash
ThemeManager.applyOnLoad();

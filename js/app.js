// Main App Router and State Manager — with Auth Integration
(function() {

  // App views container registry
  window.App = {
    currentView: 'dashboard',

    init: function() {
      // ─── AUTH CHECK ──────────────────────────────────────────────
      this.checkAuth();
      this.bindEvents();
      this.loadView(this.currentView);
    },

    checkAuth: function() {
      // If AuthSystem exists and user is not logged in, redirect to auth page
      if (typeof window.AuthSystem !== 'undefined' && !window.AuthSystem.isLoggedIn()) {
        window.location.href = 'auth.html';
        return;
      }

      // If logged in, display user info in sidebar
      if (typeof window.AuthSystem !== 'undefined') {
        const user = window.AuthSystem.getCurrentUser();
        if (user) {
          const nameEl = document.getElementById('user-name-disp');
          const roleEl = document.getElementById('user-role-disp');
          if (nameEl) nameEl.textContent = user.name;
          if (roleEl) roleEl.textContent = user.role === 'admin' ? 'Administrator' : (user.role === 'faculty' ? 'Faculty Member' : 'Student');
        }
      }
    },

    bindEvents: function() {
      // Sidebar link routing
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetView = link.getAttribute('data-view');
          if (targetView) {
            this.loadView(targetView);
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      });

      // Sidebar Collapse Toggle
      const menuBtn = document.getElementById('menu-toggle-btn');
      const sidebar = document.getElementById('app-sidebar');
      if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
          sidebar.classList.toggle('collapsed');
        });
      }

      // Modal Close events
      const closeBtn = document.getElementById('modal-close-btn');
      const modalOverlay = document.getElementById('common-modal-overlay');
      if (closeBtn && modalOverlay) {
        closeBtn.addEventListener('click', this.closeModal);
        modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) {
            this.closeModal();
          }
        });
      }

      // Quick Actions Trigger
      const quickActionBtn = document.getElementById('quick-action-btn');
      if (quickActionBtn) {
        quickActionBtn.addEventListener('click', () => {
          this.showQuickActions();
        });
      }

      // Notifications Toggle
      const notifBtn = document.getElementById('notif-btn');
      if (notifBtn) {
        notifBtn.addEventListener('click', () => {
          this.showNotifications();
        });
      }

      // Logout Button
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          this.handleLogout();
        });
      }

      // Global Search input
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const val = e.target.value.toLowerCase().trim();
          this.handleGlobalSearch(val);
        });
      }
    },

    loadView: function(viewName) {
      const container = document.getElementById('app-view-container');
      if (!container) return;

      container.innerHTML = '<div class="loading-spinner">Loading view...</div>';
      this.currentView = viewName;

      const viewModule = window[viewName + 'View'];
      if (viewModule && typeof viewModule.render === 'function') {
        container.innerHTML = '';
        const viewEl = document.createElement('div');
        viewEl.className = 'page-transition';
        viewModule.render(viewEl);
        container.appendChild(viewEl);
      } else {
        // Fallback for settings or missing views
        container.innerHTML = `
          <div class="page-header">
            <div>
              <h1>${viewName.charAt(0).toUpperCase() + viewName.slice(1)}</h1>
              <p>System Preferences and System Configurations.</p>
            </div>
          </div>
          <div class="card animate-fade-in" style="margin-top: 24px;">
            <h3 style="margin-bottom: 16px;">System Configuration Panel</h3>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Manage application settings, custom credentials, user privileges, and system API configuration integrations.</p>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Institution Name</label>
                <input type="text" class="form-control" value="Aegis Model University">
              </div>
              <div class="form-group">
                <label class="form-label">System Time Zone</label>
                <select class="form-control">
                  <option>UTC +05:30 (Calcutta, Mumbai)</option>
                  <option>UTC +00:00 (London, GMT)</option>
                  <option>UTC -05:00 (New York, EST)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Academic Calendar Start Year</label>
                <input type="number" class="form-control" value="2026">
              </div>
              <div class="form-group">
                <label class="form-label">Enable Automated Result Processing</label>
                <select class="form-control">
                  <option>Enabled (Real-time Grade Calculation)</option>
                  <option>Disabled (Manual Batch Runs)</option>
                </select>
              </div>
            </div>
            <button class="btn btn-primary" style="margin-top: 16px;" onclick="alert('Configuration parameters persisted successfully!')">Save Preferences</button>
          </div>
        `;
      }
    },

    // ─── MODAL HELPERS ─────────────────────────────────────────────
    showModal: function(title, bodyHTML, footerHTML = '') {
      const modalOverlay = document.getElementById('common-modal-overlay');
      const titleEl = document.getElementById('modal-title-text');
      const bodyEl = document.getElementById('modal-body-content');
      const footerEl = document.getElementById('modal-footer-content');

      if (!modalOverlay || !titleEl || !bodyEl || !footerEl) return;

      titleEl.innerText = title;
      bodyEl.innerHTML = bodyHTML;
      footerEl.innerHTML = footerHTML;

      modalOverlay.classList.add('active');
    },

    closeModal: function() {
      const modalOverlay = document.getElementById('common-modal-overlay');
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    },

    // ─── LOGOUT ────────────────────────────────────────────────────
    handleLogout: function() {
      if (confirm('Are you sure you want to sign out?')) {
        if (typeof window.AuthSystem !== 'undefined') {
          window.AuthSystem.logout();
        } else {
          window.location.href = 'auth.html';
        }
      }
    },

    showQuickActions: function() {
      const bodyHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <button class="btn btn-secondary" style="padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 10px;" id="qa-add-student">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
            <span>Add New Student</span>
          </button>
          <button class="btn btn-secondary" style="padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 10px;" id="qa-add-announcement">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span>Post Notice</span>
          </button>
          <button class="btn btn-secondary" style="padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 10px;" id="qa-record-fee">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            <span>Record Fee Payment</span>
          </button>
          <button class="btn btn-secondary" style="padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 10px;" id="qa-mark-attendance">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
            <span>Daily Attendance</span>
          </button>
        </div>
      `;
      this.showModal('Quick Action Hub', bodyHTML, '<button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>');

      document.getElementById('qa-add-student').addEventListener('click', () => {
        this.closeModal();
        this.loadView('students');
        setTimeout(() => {
          if (window.studentsView && typeof window.studentsView.openAddStudentModal === 'function') {
            window.studentsView.openAddStudentModal();
          }
        }, 100);
      });

      document.getElementById('qa-add-announcement').addEventListener('click', () => {
        this.closeModal();
        this.loadView('announcements');
        setTimeout(() => {
          if (window.announcementsView && typeof window.announcementsView.openPostModal === 'function') {
            window.announcementsView.openPostModal();
          }
        }, 100);
      });

      document.getElementById('qa-record-fee').addEventListener('click', () => {
        this.closeModal();
        this.loadView('finance');
        setTimeout(() => {
          if (window.financeView && typeof window.financeView.openPaymentModal === 'function') {
            window.financeView.openPaymentModal();
          }
        }, 100);
      });

      document.getElementById('qa-mark-attendance').addEventListener('click', () => {
        this.closeModal();
        this.loadView('attendance');
      });
    },

    showNotifications: function() {
      const announcements = window.UniversityDB.getAnnouncements();
      let announcementsHtml = announcements.map(ann => `
        <div style="padding: 12px; border-bottom: 1px solid var(--border); display: flex; gap: 12px;">
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${ann.color || 'var(--primary)'}; margin-top: 6px; flex-shrink:0;"></div>
          <div>
            <h5 style="margin: 0; font-weight: 600;">${ann.title}</h5>
            <p style="margin: 4px 0 0; font-size: 0.8rem; color: var(--text-muted);">${ann.content.slice(0, 100)}...</p>
            <span style="font-size: 0.7rem; color: var(--text-subtle); display: block; margin-top: 4px;">Posted: ${ann.date}</span>
          </div>
        </div>
      `).join('');

      const bodyHTML = `
        <div style="max-height: 400px; overflow-y: auto;">
          <h4 style="margin-bottom: 12px; font-family: var(--font-display);">Recent Broadcasts & System Notices</h4>
          ${announcementsHtml}
        </div>
      `;
      this.showModal('Notifications Desk', bodyHTML, '<button class="btn btn-secondary" onclick="window.App.closeModal()">Dismiss All</button>');
    },

    handleGlobalSearch: function(val) {
      if (this.currentView === 'students' && window.studentsView && typeof window.studentsView.applyFilters === 'function') {
        const input = document.getElementById('search-name');
        if (input) {
          input.value = val;
          window.studentsView.applyFilters();
        }
      } else if (this.currentView === 'faculty' && window.facultyView && typeof window.facultyView.applySearch === 'function') {
        const input = document.getElementById('faculty-search');
        if (input) {
          input.value = val;
          window.facultyView.applySearch();
        }
      } else if (this.currentView === 'courses' && window.coursesView && typeof window.coursesView.applyFilters === 'function') {
        const input = document.getElementById('course-search');
        if (input) {
          input.value = val;
          window.coursesView.applyFilters();
        }
      }
    }
  };

  // Launch application on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.App.init();
  });

})();

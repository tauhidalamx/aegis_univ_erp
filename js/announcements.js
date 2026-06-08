// Notice Board & Announcements Module
window.announcementsView = (function() {
  
  function render(container) {
    const announcements = window.UniversityDB.getAnnouncements();

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Notice Board & Campus Broadcasts</h1>
          <p>Read official academic, administrative, event, and system notices. Create new board notifications.</p>
        </div>
        <button class="btn btn-primary" id="btn-post-notice">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Post Notice
        </button>
      </div>

      <!-- Notices grid -->
      <div class="grid-2 animate-fade-in delay-1 mt-6" id="notices-grid-container">
        <!-- Loaded dynamically -->
      </div>
    `;

    document.getElementById('btn-post-notice').addEventListener('click', openPostModal);
    populateNotices(announcements);
  }

  function populateNotices(list) {
    const container = document.getElementById('notices-grid-container');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="card col-span-full text-center text-brand-text-muted p-8">
          No notices posted on notice board.
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(ann => `
      <div class="card flex flex-col gap-4" style="border-left: 5px solid ${ann.color || 'var(--color-brand-primary)'};">
        <div class="flex justify-between items-center">
          <span class="badge bg-brand-bg-tertiary text-brand-text-main font-bold">${ann.tag}</span>
          <span class="text-xs text-brand-text-subtle">${ann.date}</span>
        </div>
        <div>
          <h3 class="font-display text-lg mb-1.5 font-semibold">${ann.title}</h3>
          <p class="text-brand-text-muted text-sm leading-relaxed">${ann.content}</p>
        </div>
        <div class="flex justify-end gap-2 mt-auto pt-2.5 border-t border-brand-border">
          <button class="btn btn-secondary btn-sm edit-notice-btn" data-id="${ann.id}">Remove Notice</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.edit-notice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        removeNotice(id);
      });
    });
  }

  function openPostModal() {
    const bodyHTML = `
      <div class="form-group">
        <label class="form-label">Notice Title</label>
        <input type="text" class="form-control" id="post-ann-title" placeholder="e.g. End Semester Holiday Schedule" required>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Broadcast Tag</label>
          <select class="form-control" id="post-ann-tag">
            <option>Academic</option>
            <option>Event</option>
            <option>System</option>
            <option>Administration</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Color Theme Accent</label>
          <select class="form-control" id="post-ann-color">
            <option value="var(--color-brand-primary)">Indigo (Academic)</option>
            <option value="var(--color-brand-accent-emerald)">Emerald (Event)</option>
            <option value="var(--color-brand-accent-ruby)">Ruby (Alerts)</option>
            <option value="var(--color-brand-accent-cyan)">Cyan (Tech)</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Broadcast Content Details</label>
        <textarea class="form-control" id="post-ann-content" rows="4" placeholder="Enter notice brief descriptions..." required></textarea>
      </div>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-notice">Post Board Notice</button>
    `;

    window.App.showModal('Post Notice Board Broadcast', bodyHTML, footerHTML);

    document.getElementById('btn-submit-notice').addEventListener('click', () => {
      const title = document.getElementById('post-ann-title').value.trim();
      const tag = document.getElementById('post-ann-tag').value;
      const color = document.getElementById('post-ann-color').value;
      const content = document.getElementById('post-ann-content').value.trim();

      if (!title || !content) {
        alert("Please enter a notice title and description brief.");
        return;
      }

      const announcements = window.UniversityDB.getAnnouncements();
      const newId = announcements.length + 1;
      const today = new Date().toISOString().split('T')[0];

      const newAnn = {
        id: newId,
        title: title,
        tag: tag,
        color: color,
        content: content,
        date: today
      };

      window.UniversityDB.addAnnouncement(newAnn);
      window.App.closeModal();
      alert("Notice posted on campus board!");
      populateNotices(announcements);
    });
  }

  function removeNotice(id) {
    const list = window.UniversityDB.getAnnouncements();
    const idx = list.findIndex(ann => ann.id === id);
    if (idx !== -1) {
      list.splice(idx, 1);
      alert("Broadcast notice removed.");
      populateNotices(list);
    }
  }

  return {
    render: render,
    openPostModal: openPostModal
  };

})();

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
      <form id="post-ann-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <div class="form-group">
          <label class="form-label">Notice Title *</label>
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
          <label class="form-label">Target Audience</label>
          <select class="form-control" id="post-ann-target">
            <option>All Users</option>
            <option>Students Only</option>
            <option>Faculty Only</option>
            <option>Administrators Only</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Broadcast Content Details *</label>
          <textarea class="form-control" id="post-ann-content" rows="4" placeholder="Enter notice brief descriptions..." required></textarea>
        </div>

        <!-- AI Notice Engagement Reach Predictor -->
        <div class="card mt-4 p-4 bg-brand-bg-tertiary border border-brand-border">
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></span>
              <span class="text-xs font-bold uppercase tracking-wider text-brand-text-main font-display">AI Notice Reach Predictor</span>
            </div>
            <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald" id="ann-ai-reach-status">Calculating...</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs text-brand-text-muted">
            <div>
              <span class="text-[0.7rem] text-brand-text-subtle">Estimated Read Rate:</span>
              <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="ann-ai-reach-pct">Calculating...</div>
            </div>
            <div>
              <span class="text-[0.7rem] text-brand-text-subtle">Target Audience Reach:</span>
              <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="ann-ai-reach-count">Calculating...</div>
            </div>
          </div>
        </div>
      </form>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-notice">Post Board Notice</button>
    `;

    window.App.showModal('Post Notice Board Broadcast', bodyHTML, footerHTML);

    const titleInput = document.getElementById('post-ann-title');
    const tagSelect = document.getElementById('post-ann-tag');
    const contentText = document.getElementById('post-ann-content');

    if (titleInput && tagSelect && contentText) {
      titleInput.addEventListener('input', runAnnounceTfInference);
      tagSelect.addEventListener('change', runAnnounceTfInference);
      contentText.addEventListener('input', runAnnounceTfInference);
    }
    
    runAnnounceTfInference();

    document.getElementById('btn-submit-notice').addEventListener('click', () => {
      const title = document.getElementById('post-ann-title').value.trim();
      const tag = document.getElementById('post-ann-tag').value;
      const color = document.getElementById('post-ann-color').value;
      const target = document.getElementById('post-ann-target').value;
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
        target: target,
        content: content,
        date: today
      };

      window.UniversityDB.addAnnouncement(newAnn);
      window.App.closeModal();
      alert("Notice posted on campus board!");
      populateNotices(announcements);
    });
  }

  async function runAnnounceTfInference() {
    const titleEl = document.getElementById('post-ann-title');
    const tagEl = document.getElementById('post-ann-tag');
    const contentEl = document.getElementById('post-ann-content');

    if (!titleEl || !tagEl || !contentEl) return;

    if (typeof tf === 'undefined') {
      const el = document.getElementById('ann-ai-reach-pct');
      if (el) el.textContent = 'TF Unavailable';
      return;
    }

    try {
      const titleLen = titleEl.value.length;
      const contentLen = contentEl.value.length;
      const tag = tagEl.value;

      const isAcad = tag === 'Academic' ? 1.0 : 0.4;
      const inputVal = [titleLen / 100.0, contentLen / 500.0, isAcad];

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 3, activation: 'tanh', inputShape: [3] }));
      model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

      const w1 = tf.tensor2d([
        [0.8],
        [-0.4],
        [0.6]
      ]);
      const b1 = tf.tensor1d([0.2]);
      model.layers[1].setWeights([w1, b1]);

      const inputTensor = tf.tensor2d([inputVal], [1, 3]);
      const outputTensor = model.predict(inputTensor);
      const outputVal = (await outputTensor.data())[0];

      inputTensor.dispose();
      outputTensor.dispose();
      w1.dispose();
      b1.dispose();
      model.dispose();

      var reachProb = outputVal;
      if (titleLen < 5 || contentLen < 10) {
        reachProb = 0.05;
      }

      const pctEl = document.getElementById('ann-ai-reach-pct');
      const countEl = document.getElementById('ann-ai-reach-count');
      const statusEl = document.getElementById('ann-ai-reach-status');

      const totalStudents = window.UniversityDB.getStudents().length || 30;
      const reachedCount = Math.round(totalStudents * reachProb);

      if (pctEl) pctEl.textContent = (reachProb * 100).toFixed(1) + '%';
      if (countEl) countEl.textContent = reachedCount + ' students';
      if (statusEl) {
        if (reachProb > 0.6) {
          statusEl.textContent = 'High Engagement';
          statusEl.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald';
        } else if (reachProb > 0.3) {
          statusEl.textContent = 'Moderate Reach';
          statusEl.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber';
        } else {
          statusEl.textContent = 'Low Engagement Warning';
          statusEl.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby';
        }
      }
    } catch (err) {
      console.error('TF Notice inference failed:', err);
    }
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

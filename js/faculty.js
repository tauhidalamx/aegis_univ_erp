// Faculty Directory Module
window.facultyView = (function() {
  
  function render(container) {
    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Faculty Directory</h1>
          <p>Manage faculty credentials, academic departments, research specializations, and teaching assignments.</p>
        </div>
        <button class="btn btn-primary" id="btn-add-faculty">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="11" x2="22" y2="11"/><line x1="19" y1="8" x2="19" y2="14"/></svg>
          Add Faculty Member
        </button>
      </div>

      <!-- Search Controls -->
      <div class="card animate-fade-in delay-1" style="margin-top: 24px;">
        <div class="grid-2" style="grid-template-columns: 2fr 1fr; align-items: end;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Search Faculty Directory</label>
            <input type="text" class="form-control" placeholder="Search by name, email, or department" id="faculty-search">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Department</label>
            <select class="form-control" id="faculty-dept-filter">
              <option value="ALL">All Departments</option>
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Administration</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Faculty Workload Chart & Visual Overview -->
      <div class="card animate-fade-in delay-2" style="margin-top: 24px;">
        <h3 style="margin-bottom: 16px; font-family: var(--font-display);">Workload Management Dashboard</h3>
        <p style="color:var(--text-muted); margin-bottom: 20px; font-size: 0.9rem;">Maximum weekly limit: 18 hours. Values over 15 hours represent heavy workload.</p>
        <div class="chart-wrapper" style="height: 200px;">
          <canvas id="faculty-workload-chart"></canvas>
        </div>
      </div>

      <!-- Faculty Directory Grid -->
      <div class="grid-3 animate-fade-in delay-3" style="margin-top: 24px;" id="faculty-cards-container">
        <!-- Loaded dynamically -->
      </div>
    `;

    document.getElementById('faculty-search').addEventListener('input', applySearch);
    document.getElementById('faculty-dept-filter').addEventListener('change', applySearch);
    document.getElementById('btn-add-faculty').addEventListener('click', openAddFacultyModal);

    applySearch();
  }

  function applySearch() {
    const searchVal = document.getElementById('faculty-search').value.toLowerCase().trim();
    const deptVal = document.getElementById('faculty-dept-filter').value;

    const faculty = window.UniversityDB.getFaculty();
    const filtered = faculty.filter(f => {
      const matchSearch = f.name.toLowerCase().includes(searchVal) || f.email.toLowerCase().includes(searchVal) || f.id.toLowerCase().includes(searchVal);
      const matchDept = deptVal === 'ALL' || f.dept === deptVal;
      return matchSearch && matchDept;
    });

    populateCards(filtered);
    renderWorkloadChart(filtered);
  }

  function populateCards(data) {
    const container = document.getElementById('faculty-cards-container');
    if (!container) return;

    if (data.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 32px;">
          No matching faculty listings found in database.
        </div>
      `;
      return;
    }

    container.innerHTML = data.map(fac => {
      let loadPercent = Math.min((fac.workload / 18) * 100, 100);
      let barColor = 'var(--primary)';
      if (fac.workload > 15) barColor = 'var(--accent-ruby)';
      else if (fac.workload > 12) barColor = 'var(--accent-amber)';
      else barColor = 'var(--accent-emerald)';

      return `
        <div class="card" style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; gap:16px; align-items:center;">
            <img src="${fac.avatar}" style="width: 52px; height: 52px; border-radius:50%; object-fit:cover; border:1px solid var(--border);">
            <div>
              <h4 style="margin:0; font-family: var(--font-display);">${fac.name}</h4>
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:500;">${fac.designation} (${fac.dept})</span>
            </div>
          </div>
          
          <div style="font-size:0.85rem; color:var(--text-muted);">
            <div><strong>Email:</strong> ${fac.email}</div>
            <div><strong>ID:</strong> <code>${fac.id}</code></div>
          </div>

          <!-- Workload Progress bar -->
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
              <span>Workload Assigned</span>
              <strong>${fac.workload} hrs / wk</strong>
            </div>
            <div style="height: 6px; background-color: var(--bg-tertiary); border-radius:3px; overflow:hidden;">
              <div style="width: ${loadPercent}%; height:100%; background-color: ${barColor};"></div>
            </div>
          </div>

          <div style="display:flex; gap:8px; margin-top:auto;">
            <button class="btn btn-secondary btn-sm assign-class-btn" style="flex:1;" data-id="${fac.id}">Class Workload</button>
            <button class="btn btn-secondary btn-sm" onclick="alert('Viewing publications...')">Research</button>
          </div>
        </div>
      `;
    }).join('');

    // Bind workload buttons
    container.querySelectorAll('.assign-class-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openAssignClassModal(id);
      });
    });
  }

  let workloadChartObj = null;

  function renderWorkloadChart(facList) {
    const ctx = document.getElementById('faculty-workload-chart');
    if (!ctx) return;

    if (workloadChartObj) workloadChartObj.destroy();

    const labels = facList.map(f => f.name.split(' ').slice(1).join(' ')); // Use last names for neatness
    const workloadData = facList.map(f => f.workload);
    const colors = facList.map(f => f.workload > 15 ? '#f43f5e' : (f.workload > 12 ? '#f59e0b' : '#10b981'));

    workloadChartObj = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Weekly teaching hours',
          data: workloadData,
          backgroundColor: colors,
          borderColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' },
            max: 20
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  function openAssignClassModal(facId) {
    const facultyList = window.UniversityDB.getFaculty();
    const fac = facultyList.find(f => f.id === facId);
    if (!fac) return;

    const bodyHTML = `
      <p style="margin-bottom:16px; color:var(--text-muted);">Adjust workload allocations and curriculum credits assignment for <strong>${fac.name}</strong>.</p>
      <div class="form-group">
        <label class="form-label">Current Weekly Lecture Workload (Hours)</label>
        <input type="number" class="form-control" id="mod-fac-workload" value="${fac.workload}" min="0" max="24">
      </div>
      
      <h4 style="margin-top:20px; margin-bottom:12px;">Assigned Course Catalog</h4>
      <ul style="padding-left: 20px; color: var(--text-main);">
        ${fac.courses.map(code => {
          const c = window.UniversityDB.getCourses().find(course => course.code === code);
          return `<li><code>${code}</code> - ${c ? c.title : 'Research Project'}</li>`;
        }).join('')}
      </ul>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-workload">Save Changes</button>
    `;

    window.App.showModal('Modify Academic Workload', bodyHTML, footerHTML);

    document.getElementById('btn-save-workload').addEventListener('click', () => {
      const load = parseInt(document.getElementById('mod-fac-workload').value);
      if (!isNaN(load) && load >= 0 && load <= 24) {
        fac.workload = load;
        window.App.closeModal();
        alert("Workload parameters updated successfully!");
        applySearch();
      } else {
        alert("Please enter a valid workload hours number.");
      }
    });
  }

  function openAddFacultyModal() {
    const bodyHTML = `
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" class="form-control" id="add-fac-name" required placeholder="e.g. Dr. Ada Lovelace">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-control" id="add-fac-email" required placeholder="e.g. ada@modeluni.edu">
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Department</label>
          <select class="form-control" id="add-fac-dept">
            <option value="CS">Computer Science</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="BI">Bioinformatics</option>
            <option value="BA">Business Administration</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Designation</label>
          <select class="form-control" id="add-fac-designation">
            <option>Professor</option>
            <option>Associate Professor</option>
            <option>Assistant Professor</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Initial Workload (Hours/Week)</label>
        <input type="number" class="form-control" id="add-fac-workload" min="0" max="20" value="12">
      </div>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-faculty">Add Member</button>
    `;

    window.App.showModal('Add Faculty Member', bodyHTML, footerHTML);

    document.getElementById('btn-submit-faculty').addEventListener('click', () => {
      const name = document.getElementById('add-fac-name').value.trim();
      const email = document.getElementById('add-fac-email').value.trim();
      const dept = document.getElementById('add-fac-dept').value;
      const designation = document.getElementById('add-fac-designation').value;
      const workload = parseInt(document.getElementById('add-fac-workload').value) || 12;

      if (!name || !email) {
        alert("Please enter both name and email.");
        return;
      }

      const facultyList = window.UniversityDB.getFaculty();
      const newId = 'FAC' + String(facultyList.length + 1).padStart(3, '0');

      const newFac = {
        id: newId,
        name: name,
        email: email,
        dept: dept,
        designation: designation,
        workload: workload,
        courses: [],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      };

      facultyList.push(newFac);
      window.App.closeModal();
      alert(`Faculty member ${name} enrolled with ID ${newId}`);
      applySearch();
    });
  }

  return {
    render: render,
    applySearch: applySearch
  };

})();

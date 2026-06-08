// Dashboard Module
window.dashboardView = (function() {
  
  let enrollmentChart = null;
  let deptChart = null;

  function render(container) {
    const students = window.UniversityDB.getStudents();
    const faculty = window.UniversityDB.getFaculty();
    const courses = window.UniversityDB.getCourses();
    const depts = window.UniversityDB.getDepartments();
    const activities = window.UniversityDB.getActivities();
    const announcements = window.UniversityDB.getAnnouncements();
    const transactions = window.UniversityDB.getTransactions();

    // Calculations
    const activeStudents = students.filter(s => s.status === 'Active').length;
    const totalFaculty = faculty.length;
    const activeCourses = courses.filter(c => c.status === 'Active').length;
    const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Administrative Dashboard</h1>
          <p>Model University overall metrics, trends, and recent campus activities.</p>
        </div>
        <div class="btn-group" style="display:flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="alert('Exporting Report...')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Sheet
          </button>
          <button class="btn btn-primary btn-sm" id="dashboard-refresh-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Reload View
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="kpi-grid animate-fade-in delay-1" style="margin-top: 24px;">
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Enrollment</span>
            <span class="kpi-value">${activeStudents}</span>
            <span class="kpi-growth text-accent-emerald">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              +4.8% from last sem
            </span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Assigned Faculty</span>
            <span class="kpi-value">${totalFaculty}</span>
            <span class="kpi-growth text-accent-cyan">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              100% Retained
            </span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Courses</span>
            <span class="kpi-value">${activeCourses}</span>
            <span class="kpi-growth text-accent-emerald">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              +3 New Catalog
            </span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Term Collection</span>
            <span class="kpi-value">$${totalRevenue.toLocaleString()}</span>
            <span class="kpi-growth text-accent-emerald">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              92.3% Cleared
            </span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid-2 animate-fade-in delay-2" style="margin-top: 24px;">
        <div class="card">
          <h3 style="margin-bottom: 20px; font-family: var(--font-display);">Enrollment Trends</h3>
          <div class="chart-wrapper">
            <canvas id="enrollment-line-chart"></canvas>
          </div>
        </div>
        
        <div class="card">
          <h3 style="margin-bottom: 20px; font-family: var(--font-display);">Department Distribution</h3>
          <div class="chart-wrapper">
            <canvas id="dept-donut-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Bottom Layout split: Notices & Updates / Activities -->
      <div class="grid-2 animate-fade-in delay-3" style="margin-top: 24px;">
        <div class="card">
          <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 20px;">
            <h3 style="font-family: var(--font-display);">Official Notices</h3>
            <button class="btn btn-secondary btn-sm" id="view-notices-btn">View All</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${announcements.slice(0, 3).map(ann => `
              <div style="border-left: 3px solid ${ann.color}; padding-left: 16px;">
                <div style="display:flex; justify-content:space-between; align-items: center;">
                  <span class="badge" style="background-color: var(--bg-tertiary); color: var(--text-main); font-size: 0.7rem; padding: 2px 6px;">${ann.tag}</span>
                  <span style="font-size: 0.75rem; color: var(--text-subtle);">${ann.date}</span>
                </div>
                <h4 style="margin: 8px 0 4px 0; font-size: 0.95rem; font-weight: 600;">${ann.title}</h4>
                <p style="font-size: 0.825rem; color: var(--text-muted); line-height: 1.4;">${ann.content}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom: 20px; font-family: var(--font-display);">Log Audit Trail</h3>
          <div style="display:flex; flex-direction:column; gap: 16px;">
            ${activities.map(act => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div class="pulse-dot"></div>
                  <span style="font-size: 0.875rem; color: var(--text-main);">${act.text}</span>
                </div>
                <span style="font-size: 0.75rem; color: var(--text-subtle);">${act.time}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Bind reload button
    document.getElementById('dashboard-refresh-btn').addEventListener('click', () => {
      render(container);
    });

    document.getElementById('view-notices-btn').addEventListener('click', () => {
      window.App.loadView('announcements');
    });

    // Load Charts
    setTimeout(() => {
      initCharts(students, depts);
    }, 100);
  }

  function initCharts(students, depts) {
    // 1. Enrollment Line Chart
    const ctxEnrollment = document.getElementById('enrollment-line-chart');
    if (ctxEnrollment) {
      if (enrollmentChart) enrollmentChart.destroy();
      
      enrollmentChart = new Chart(ctxEnrollment, {
        type: 'line',
        data: {
          labels: ['2022-A', '2022-B', '2023-A', '2023-B', '2024-A', '2024-B', '2025-A', '2025-B', '2026-A'],
          datasets: [{
            label: 'Total Enrollment',
            data: [350, 390, 420, 480, 510, 560, 620, 680, 715],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
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
              ticks: { color: '#94a3b8' }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8' }
            }
          }
        }
      });
    }

    // 2. Department Distribution Donut Chart
    const ctxDept = document.getElementById('dept-donut-chart');
    if (ctxDept) {
      if (deptChart) deptChart.destroy();

      // Compute counts by department code
      const deptCounts = {};
      depts.forEach(d => {
        deptCounts[d.code] = { count: 0, name: d.name, color: d.color };
      });
      students.forEach(s => {
        if (deptCounts[s.dept]) {
          deptCounts[s.dept].count++;
        }
      });

      const labels = Object.keys(deptCounts);
      const data = Object.values(deptCounts).map(d => d.count);
      const backgroundColors = Object.values(deptCounts).map(d => d.color);

      deptChart = new Chart(ctxDept, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColors,
            borderColor: '#121829',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#94a3b8',
                font: { family: 'Inter' }
              }
            }
          },
          cutout: '65%'
        }
      });
    }
  }

  return {
    render: render
  };

})();

// Dashboard Module
window.dashboardView = (function() {
  
  let enrollmentChart = null;
  let deptChart = null;
  let forecastChart = null;
  let telemetryInterval = null;

  // Local storage helpers for tasks
  function getTasks() {
    const defaultTasks = [
      { id: 1, text: "Approve graduation transcripts for STU006 PATEL", priority: "High", done: false },
      { id: 2, text: "Audit Stripe collection batch receipts for fee payments", priority: "Medium", done: true },
      { id: 3, text: "Verify blockchain credential hashes for CS101 course completions", priority: "Low", done: false }
    ];
    const saved = localStorage.getItem('aegis_admin_tasks');
    return saved ? JSON.parse(saved) : defaultTasks;
  }

  function saveTasks(tasks) {
    localStorage.setItem('aegis_admin_tasks', JSON.stringify(tasks));
  }

  // Local storage helpers for calendar events
  function getEvents() {
    const defaultEvents = [
      { id: 1, date: "2026-06-15", title: "Semester Term Exams start", type: "Exam" },
      { id: 2, date: "2026-06-28", title: "Course Registration Deadline", type: "Academic" },
      { id: 3, date: "2026-07-01", title: "Summer Recess begins", type: "Holiday" }
    ];
    const saved = localStorage.getItem('aegis_academic_events');
    return saved ? JSON.parse(saved) : defaultEvents;
  }

  function saveEvents(events) {
    localStorage.setItem('aegis_academic_events', JSON.stringify(events));
  }

  function updateTasksUI(container) {
    const listContainer = container.querySelector('#tasks-list-container');
    if (!listContainer) return;
    const tasks = getTasks();

    listContainer.innerHTML = tasks.length === 0 ? `
      <div class="text-center py-6 text-brand-text-muted text-xs">No pending tasks. Great job!</div>
    ` : tasks.map(t => {
      let priorityClass = 'bg-brand-primary/10 text-brand-primary';
      if (t.priority === 'High') priorityClass = 'bg-brand-accent-ruby/10 text-brand-accent-ruby';
      else if (t.priority === 'Medium') priorityClass = 'bg-brand-accent-amber/10 text-brand-accent-amber';
      else if (t.priority === 'Low') priorityClass = 'bg-brand-accent-cyan/10 text-brand-accent-cyan';

      return `
        <div class="flex items-center justify-between p-2.5 border border-brand-border rounded-xl bg-brand-bg-tertiary/30 hover:bg-brand-bg-tertiary/50 transition-all duration-200 ${t.done ? 'opacity-55' : ''}">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <input type="checkbox" class="task-checkbox accent-brand-primary cursor-pointer w-4 h-4 shrink-0" data-id="${t.id}" ${t.done ? 'checked' : ''}>
            <span class="text-xs font-medium text-brand-text-main truncate ${t.done ? 'line-through text-brand-text-subtle' : ''}">${t.text}</span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0 ml-2">
            <span class="badge ${priorityClass} text-[0.6rem] px-1.5 py-0.5">${t.priority}</span>
            <button class="delete-task-btn text-brand-text-subtle hover:text-brand-accent-ruby p-1 transition-colors bg-transparent border-none cursor-pointer" data-id="${t.id}" title="Delete Task">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind events
    listContainer.querySelectorAll('.task-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const tasks = getTasks();
        const t = tasks.find(item => item.id === id);
        if (t) {
          t.done = e.target.checked;
          saveTasks(tasks);
          updateTasksUI(container);
        }
      });
    });

    listContainer.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        let tasks = getTasks();
        tasks = tasks.filter(item => item.id !== id);
        saveTasks(tasks);
        updateTasksUI(container);
      });
    });
  }

  function updateEventsUI(container) {
    const eventContainer = container.querySelector('#events-list-container');
    if (!eventContainer) return;
    const events = getEvents();

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    eventContainer.innerHTML = events.length === 0 ? `
      <div class="text-center py-6 text-brand-text-muted text-xs">No upcoming events scheduled.</div>
    ` : events.map(ev => {
      let typeColor = 'border-brand-primary';
      let typeBadge = 'bg-brand-primary/10 text-brand-primary';
      if (ev.type === 'Exam') {
        typeColor = 'border-brand-accent-ruby';
        typeBadge = 'bg-brand-accent-ruby/10 text-brand-accent-ruby';
      } else if (ev.type === 'Holiday') {
        typeColor = 'border-brand-accent-amber';
        typeBadge = 'bg-brand-accent-amber/10 text-brand-accent-amber';
      } else if (ev.type === 'Academic') {
        typeColor = 'border-brand-accent-cyan';
        typeBadge = 'bg-brand-accent-cyan/10 text-brand-accent-cyan';
      }

      const dateObj = new Date(ev.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      return `
        <div class="flex items-center justify-between p-2.5 border-l-4 ${typeColor} bg-brand-bg-tertiary/30 rounded-r-xl border border-y-brand-border border-r-brand-border hover:bg-brand-bg-tertiary/50 transition-all duration-200">
          <div class="min-w-0 flex-1">
            <h4 class="text-xs font-semibold text-brand-text-main mt-0 mb-0.5 truncate">${ev.title}</h4>
            <span class="text-[0.65rem] text-brand-text-subtle">${formattedDate}</span>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-2">
            <span class="badge ${typeBadge} text-[0.6rem] px-1.5 py-0.5">${ev.type}</span>
            <button class="delete-event-btn text-brand-text-subtle hover:text-brand-accent-ruby p-1 transition-colors bg-transparent border-none cursor-pointer" data-id="${ev.id}" title="Remove Event">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    eventContainer.querySelectorAll('.delete-event-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        let events = getEvents();
        events = events.filter(item => item.id !== id);
        saveEvents(events);
        updateEventsUI(container);
      });
    });
  }

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
    const totalDue = students.reduce((acc, curr) => acc + (curr.feeTotal - curr.feePaid), 0);
    const avgAttendance = Math.round(students.reduce((acc, curr) => acc + (curr.attendance || 0), 0) / (students.length || 1));

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Administrative Dashboard</h1>
          <p>Model University overall metrics, trends, and recent campus activities.</p>
        </div>
        <div class="btn-group flex gap-2">
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
      <div class="kpi-grid animate-fade-in delay-1 mt-6">
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Enrollment</span>
            <span class="kpi-value">${activeStudents}</span>
            <span class="kpi-growth text-brand-accent-emerald">
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
            <span class="kpi-growth text-brand-accent-cyan">
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
            <span class="kpi-growth text-brand-accent-emerald">
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
            <span class="kpi-label">Average Attendance</span>
            <span class="kpi-value">${avgAttendance}%</span>
            <span class="kpi-growth text-brand-accent-emerald">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              +1.2% this week
            </span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Term Collection</span>
            <span class="kpi-value">$${totalRevenue.toLocaleString()}</span>
            <span class="kpi-growth text-brand-accent-emerald">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              92.3% Cleared
            </span>
          </div>
          <div class="kpi-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
      </div>

      <!-- Operations Hub & System Telemetry Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-2">
        <!-- Telemetry Monitor -->
        <div class="card">
          <div class="flex items-center justify-between border-b border-brand-border pb-3 mb-4">
            <h3 class="font-display text-base font-bold flex items-center gap-2 m-0">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-brand-primary)" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Infrastructure & System Telemetry
            </h3>
            <div class="flex items-center gap-1.5">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent-emerald opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-accent-emerald"></span>
              </span>
              <span class="text-[0.65rem] font-semibold text-brand-accent-emerald">Online</span>
            </div>
          </div>
          <div class="flex flex-col gap-3 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-brand-text-subtle">Simulated CPU Load:</span>
              <div class="flex items-center gap-3 w-40">
                <div class="bg-brand-bg-primary h-1.5 rounded-full overflow-hidden flex-1 border border-brand-border">
                  <div id="telemetry-cpu-bar" class="bg-brand-primary h-full rounded-full transition-[width] duration-300" style="width: 24%"></div>
                </div>
                <span id="telemetry-cpu-val" class="font-mono font-bold w-10 text-right">24%</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-brand-text-subtle">Memory Allocation:</span>
              <div class="flex items-center gap-3 w-40">
                <div class="bg-brand-bg-primary h-1.5 rounded-full overflow-hidden flex-1 border border-brand-border">
                  <div id="telemetry-ram-bar" class="bg-brand-accent-cyan h-full rounded-full transition-[width] duration-300" style="width: 64%"></div>
                </div>
                <span id="telemetry-ram-val" class="font-mono font-bold text-[0.65rem] w-32 text-right">5.12 GB / 8.00 GB</span>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-subtle">Core API Latency:</span>
              <span id="telemetry-latency-val" class="font-mono font-bold text-brand-accent-emerald">12ms</span>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-subtle">Local DB Registry:</span>
              <span class="font-mono font-bold text-brand-text-main">SQLite 3.45.1 (1.2 MB)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-subtle">EduChain Testnet Node:</span>
              <span class="font-mono font-bold text-brand-accent-cyan">Synced • Block #254</span>
            </div>
          </div>
        </div>

        <!-- Funding & Budget Allocations -->
        <div class="card">
          <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border pb-3">Funding & Budget Allocations</h3>
          <div class="flex flex-col gap-3.5 mt-2">
            <div>
              <div class="flex justify-between text-[0.7rem] font-semibold mb-1">
                <span class="text-brand-text-main">University Core Operating Budget</span>
                <span class="text-brand-text-muted">$1,450,000 / $1,800,000 (80.5%)</span>
              </div>
              <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border">
                <div class="bg-gradient-to-r from-brand-primary to-brand-accent-cyan h-full rounded-full" style="width: 80.5%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-[0.7rem] font-semibold mb-1">
                <span class="text-brand-text-main">Scholarship & Research Allocations</span>
                <span class="text-brand-text-muted">$85,000 / $120,000 (70.8%)</span>
              </div>
              <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border">
                <div class="bg-gradient-to-r from-brand-accent-emerald to-brand-accent-cyan h-full rounded-full" style="width: 70.8%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-[0.7rem] font-semibold mb-1">
                <span class="text-brand-text-main">Fee Invoice Collections Target</span>
                <span class="text-brand-text-muted">$${totalRevenue.toLocaleString()} / $${(totalRevenue + totalDue).toLocaleString()} (${((totalRevenue / (totalRevenue + totalDue || 1)) * 100).toFixed(1)}%)</span>
              </div>
              <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border">
                <div class="bg-gradient-to-r from-brand-accent-amber to-brand-accent-ruby h-full rounded-full" style="width: ${((totalRevenue / (totalRevenue + totalDue || 1)) * 100).toFixed(1)}%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid-2 animate-fade-in delay-2 mt-6">
        <div class="card">
          <h3 class="mb-5 font-display text-lg font-bold">Enrollment Trends</h3>
          <div class="chart-wrapper">
            <canvas id="enrollment-line-chart"></canvas>
          </div>
        </div>
        
        <div class="card">
          <h3 class="mb-5 font-display text-lg font-bold">Department Distribution</h3>
          <div class="chart-wrapper">
            <canvas id="dept-donut-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- AI Prediction Section -->
      <div class="card animate-fade-in delay-3 mt-6">
        <div class="flex justify-between items-center border-b border-brand-border pb-4 mb-5">
          <div>
            <h3 class="font-display flex items-center gap-2 m-0 text-lg font-bold">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-brand-primary)" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              AI Enrollment Forecasting
            </h3>
            <p class="text-[0.85rem] text-brand-text-muted mt-1 m-0">Train an in-browser neural network on historical enrollment trends using TensorFlow.js.</p>
          </div>
          <span class="badge bg-brand-primary/10 text-brand-primary font-semibold">Powered by TensorFlow.js</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <!-- Controls Panel -->
          <div class="flex flex-col gap-5 border-r border-brand-border pr-8 max-md:border-r-0 max-md:pr-0">
            <div>
              <label class="block text-[0.825rem] text-brand-text-subtle mb-2">Optimizer Learning Rate</label>
              <select id="tf-lr-select" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="0.01">0.01 (Slow & Stable)</option>
                <option value="0.05" selected>0.05 (Default)</option>
                <option value="0.1">0.10 (Fast)</option>
              </select>
            </div>

            <div>
              <label class="block text-[0.825rem] text-brand-text-subtle mb-2">Training Epochs</label>
              <input type="range" id="tf-epochs-range" min="50" max="300" step="50" value="150" class="w-full accent-brand-primary">
              <span id="tf-epochs-val" class="text-[0.8rem] text-brand-text-muted float-right mt-1">150 epochs</span>
            </div>

            <div>
              <label class="block text-[0.825rem] text-brand-text-subtle mb-2">Forecast Horizon</label>
              <select id="tf-horizon-select" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="1">1 Term (2026-B)</option>
                <option value="2" selected>2 Terms (2026-B & 2027-A)</option>
                <option value="3">3 Terms (Up to 2027-B)</option>
              </select>
            </div>

            <button class="btn btn-primary w-full justify-center flex items-center gap-2" id="tf-train-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Run ML Projection
            </button>

            <!-- Live Status -->
            <div id="tf-status-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border" style="display:none;">
              <div class="flex justify-between text-[0.8rem] mb-1.5">
                <span class="text-brand-text-subtle">Epoch:</span>
                <span id="tf-epoch-disp" class="font-semibold text-brand-text-main">0/150</span>
              </div>
              <div class="flex justify-between text-[0.8rem] mb-3">
                <span class="text-brand-text-subtle">Training Loss:</span>
                <span id="tf-loss-disp" class="font-mono text-brand-accent-amber">0.0000</span>
              </div>
              <!-- Progress Bar -->
              <div class="bg-brand-bg-primary rounded-full h-1.5 overflow-hidden w-full">
                <div id="tf-progress-bar" class="bg-brand-primary h-full w-0 transition-[width] duration-100"></div>
              </div>
            </div>
            
            <div id="tf-metrics-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border text-[0.825rem] leading-normal">
              <div class="text-brand-text-main font-semibold mb-1">Last Projection Metrics:</div>
              <div>Status: <span id="tf-status-text" class="text-brand-accent-cyan font-bold">Untrained</span></div>
              <div>Equation Fit: <span id="tf-equation-fit" class="text-brand-text-muted">y = mx + c</span></div>
            </div>
          </div>

          <!-- Forecast Chart -->
          <div class="flex flex-col h-[350px]">
            <div class="flex justify-between mb-3 items-center">
              <h4 class="text-[0.95rem] font-semibold text-brand-text-main m-0">Projection Curve</h4>
              <span id="tf-projection-hint" class="text-[0.75rem] text-brand-text-muted">Historical data points vs Model Fit</span>
            </div>
            <div class="chart-wrapper flex-1">
              <canvas id="tf-forecast-chart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Layout split: Workflows, Calendar, Notices & Audits -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in delay-3 mt-6">
        
        <!-- Administrative Task checklist -->
        <div class="card flex flex-col h-[400px]">
          <h3 class="mb-3 font-display text-base font-bold m-0 border-b border-brand-border pb-3 shrink-0">Administrative Tasks</h3>
          
          <!-- Add Task Inline Form -->
          <div class="flex gap-1.5 mb-3 shrink-0">
            <input type="text" id="new-task-input" placeholder="Add task..." class="bg-brand-bg-tertiary border border-brand-border text-brand-text-main px-2.5 py-1.5 rounded-lg text-[0.7rem] outline-none focus:border-brand-primary/40 flex-1">
            <select id="new-task-priority" class="bg-brand-bg-tertiary border border-brand-border text-brand-text-main px-1.5 py-1.5 rounded-lg text-[0.7rem] outline-none focus:border-brand-primary/40 shrink-0 font-semibold cursor-pointer">
              <option value="High">High</option>
              <option value="Medium" selected>Medium</option>
              <option value="Low">Low</option>
            </select>
            <button class="btn btn-primary btn-sm flex items-center justify-center w-8 h-8 rounded-lg shrink-0 p-0 text-base" id="add-task-btn" title="Add Task">+</button>
          </div>

          <!-- Tasks List Container -->
          <div id="tasks-list-container" class="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1">
            <!-- Loaded dynamically -->
          </div>
        </div>

        <!-- Academic Event Calendar -->
        <div class="card flex flex-col h-[400px]">
          <div class="flex justify-between items-center mb-3 border-b border-brand-border pb-3 shrink-0">
            <h3 class="font-display text-base font-bold m-0">Academic Event Planner</h3>
            <button class="btn btn-secondary btn-sm flex items-center gap-1 px-2 py-1" id="toggle-event-form-btn">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Event
            </button>
          </div>

          <!-- Add Event Form Panel (Collapsible) -->
          <div id="add-event-panel" class="hidden bg-brand-bg-tertiary/40 p-2.5 rounded-xl border border-brand-border mb-3 shrink-0 animate-fade-in">
            <div class="flex flex-col gap-2">
              <div class="flex gap-2">
                <input type="text" id="new-event-title" placeholder="Event Name..." class="bg-brand-bg-tertiary border border-brand-border text-brand-text-main px-2.5 py-1 rounded-lg text-xs outline-none focus:border-brand-primary/40 flex-1">
                <select id="new-event-type" class="bg-brand-bg-tertiary border border-brand-border text-brand-text-main px-1.5 py-1 rounded-lg text-xs outline-none focus:border-brand-primary/40 shrink-0 font-semibold cursor-pointer">
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam</option>
                  <option value="Holiday">Holiday</option>
                </select>
              </div>
              <div class="flex gap-2 items-center justify-between">
                <input type="date" id="new-event-date" class="bg-brand-bg-tertiary border border-brand-border text-brand-text-main px-2 py-1 rounded-lg text-[0.7rem] outline-none focus:border-brand-primary/40 flex-1">
                <button class="btn btn-primary btn-sm px-3.5 py-1" id="save-event-btn">Save</button>
              </div>
            </div>
          </div>

          <!-- Events List Container -->
          <div id="events-list-container" class="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1">
            <!-- Loaded dynamically -->
          </div>
        </div>

        <!-- Notices Board & Log Audit Trail -->
        <div class="card flex flex-col h-[400px]">
          <!-- Tabs to switch between Notices and Activity logs -->
          <div class="flex border-b border-brand-border pb-1.5 mb-3 shrink-0 gap-3">
            <button id="tab-notices" class="bg-transparent border-none text-brand-text-main font-display text-base font-bold pb-1 cursor-pointer border-b-2 border-brand-primary" style="margin-bottom: -7px;">
              Notices
            </button>
            <button id="tab-activities" class="bg-transparent border-none text-brand-text-muted font-display text-base font-semibold pb-1 cursor-pointer border-b-2 border-transparent hover:text-brand-text-main" style="margin-bottom: -7px;">
              Audit Logs
            </button>
          </div>

          <!-- Tab Content: Notices -->
          <div id="notices-tab-content" class="flex-1 overflow-y-auto flex flex-col gap-3.5 pr-1">
            ${announcements.slice(0, 3).map(ann => `
              <div class="pl-3 border-l-2" style="border-color: ${ann.color}">
                <div class="flex justify-between items-center">
                  <span class="badge bg-brand-bg-tertiary text-brand-text-main text-[0.65rem] px-1.5 py-0.5 rounded">${ann.tag}</span>
                  <span class="text-[0.65rem] text-brand-text-subtle">${ann.date}</span>
                </div>
                <h4 class="my-1.5 text-xs font-semibold text-brand-text-main">${ann.title}</h4>
                <p class="text-[0.75rem] text-brand-text-muted leading-relaxed m-0">${ann.content}</p>
              </div>
            `).join('')}
            <div class="mt-2 text-right">
              <button class="btn btn-secondary btn-sm w-full" id="view-notices-btn">View All Notices</button>
            </div>
          </div>

          <!-- Tab Content: Activities -->
          <div id="activities-tab-content" class="hidden flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
            ${activities.map(act => `
              <div class="flex items-center justify-between pb-2 border-b border-brand-border/60">
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-brand-accent-cyan shrink-0"></div>
                  <span class="text-xs text-brand-text-main truncate">${act.text}</span>
                </div>
                <span class="text-[0.65rem] text-brand-text-subtle shrink-0 ml-2">${act.time}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    // Bind reload button
    const refreshBtn = container.querySelector('#dashboard-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        render(container);
      });
    }

    const noticesBtn = container.querySelector('#view-notices-btn');
    if (noticesBtn) {
      noticesBtn.addEventListener('click', () => {
        window.App.loadView('announcements');
      });
    }

    // Bind slider change
    const epochsRange = container.querySelector('#tf-epochs-range');
    const epochsVal = container.querySelector('#tf-epochs-val');
    if (epochsRange && epochsVal) {
      epochsRange.addEventListener('input', (e) => {
        epochsVal.innerText = `${e.target.value} epochs`;
      });
    }

    // Bind Train Button
    const trainBtn = container.querySelector('#tf-train-btn');
    if (trainBtn) {
      trainBtn.addEventListener('click', () => {
        runTfTraining(container, students);
      });
    }

    // Load Tasks & Events lists
    updateTasksUI(container);
    updateEventsUI(container);

    // Bind Add Task action
    const addTaskBtn = container.querySelector('#add-task-btn');
    const newTaskInput = container.querySelector('#new-task-input');
    const newTaskPriority = container.querySelector('#new-task-priority');
    if (addTaskBtn && newTaskInput && newTaskPriority) {
      addTaskBtn.addEventListener('click', () => {
        const text = newTaskInput.value.trim();
        if (!text) return;
        const priority = newTaskPriority.value;
        const tasks = getTasks();
        const newTask = {
          id: Date.now(),
          text: text,
          priority: priority,
          done: false
        };
        tasks.push(newTask);
        saveTasks(tasks);
        newTaskInput.value = '';
        updateTasksUI(container);
      });
      newTaskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          addTaskBtn.click();
        }
      });
    }

    // Bind Add Event actions
    const toggleEventFormBtn = container.querySelector('#toggle-event-form-btn');
    const addEventPanel = container.querySelector('#add-event-panel');
    const saveEventBtn = container.querySelector('#save-event-btn');
    const newEventTitle = container.querySelector('#new-event-title');
    const newEventType = container.querySelector('#new-event-type');
    const newEventDate = container.querySelector('#new-event-date');

    if (toggleEventFormBtn && addEventPanel) {
      toggleEventFormBtn.addEventListener('click', () => {
        addEventPanel.classList.toggle('hidden');
        if (newEventDate && !newEventDate.value) {
          newEventDate.value = new Date().toISOString().split('T')[0];
        }
      });
    }

    if (saveEventBtn && newEventTitle && newEventDate && newEventType) {
      saveEventBtn.addEventListener('click', () => {
        const title = newEventTitle.value.trim();
        const date = newEventDate.value;
        const type = newEventType.value;

        if (!title || !date) {
          alert('Please enter both event name and date.');
          return;
        }

        const events = getEvents();
        const newEvent = {
          id: Date.now(),
          title: title,
          date: date,
          type: type
        };
        events.push(newEvent);
        saveEvents(events);

        newEventTitle.value = '';
        addEventPanel.classList.add('hidden');
        updateEventsUI(container);
      });
    }

    // Bind Notices/Activities Tabs
    const tabNotices = container.querySelector('#tab-notices');
    const tabActivities = container.querySelector('#tab-activities');
    const noticesContent = container.querySelector('#notices-tab-content');
    const activitiesContent = container.querySelector('#activities-tab-content');

    if (tabNotices && tabActivities && noticesContent && activitiesContent) {
      tabNotices.addEventListener('click', () => {
        tabNotices.classList.add('border-brand-primary', 'text-brand-text-main');
        tabNotices.classList.remove('border-transparent', 'text-brand-text-muted');
        tabActivities.classList.add('border-transparent', 'text-brand-text-muted');
        tabActivities.classList.remove('border-brand-primary', 'text-brand-text-main');

        noticesContent.classList.remove('hidden');
        activitiesContent.classList.add('hidden');
      });

      tabActivities.addEventListener('click', () => {
        tabActivities.classList.add('border-brand-primary', 'text-brand-text-main');
        tabActivities.classList.remove('border-transparent', 'text-brand-text-muted');
        tabNotices.classList.add('border-transparent', 'text-brand-text-muted');
        tabNotices.classList.remove('border-brand-primary', 'text-brand-text-main');

        activitiesContent.classList.remove('hidden');
        noticesContent.classList.add('hidden');
      });
    }

    // Setup Telemetry Fluctuations
    if (telemetryInterval) clearInterval(telemetryInterval);

    telemetryInterval = setInterval(() => {
      const cpuBar = container.querySelector('#telemetry-cpu-bar');
      const cpuVal = container.querySelector('#telemetry-cpu-val');
      const latencyVal = container.querySelector('#telemetry-latency-val');
      const ramBar = container.querySelector('#telemetry-ram-bar');
      const ramVal = container.querySelector('#telemetry-ram-val');

      if (cpuBar && cpuVal && latencyVal && ramBar && ramVal) {
        const cpu = Math.floor(15 + Math.random() * 30);
        cpuBar.style.width = `${cpu}%`;
        cpuVal.innerText = `${cpu}%`;

        const latency = Math.floor(8 + Math.random() * 15);
        latencyVal.innerText = `${latency}ms`;

        const ramPercent = (63 + Math.random() * 3).toFixed(1);
        const ramUsed = (8 * ramPercent / 100).toFixed(2);
        ramBar.style.width = `${ramPercent}%`;
        ramVal.innerText = `${ramUsed} GB / 8.00 GB (${ramPercent}%)`;
      } else {
        clearInterval(telemetryInterval);
        telemetryInterval = null;
      }
    }, 2500);

    // Load Charts
    setTimeout(() => {
      initCharts(container, students, depts);
      initForecastChart(container, students);
    }, 100);
  }

  function initCharts(container, students, depts) {
    // 1. Enrollment Line Chart
    const ctxEnrollment = container.querySelector('#enrollment-line-chart');
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
    const ctxDept = container.querySelector('#dept-donut-chart');
    if (ctxDept) {
      if (deptChart) deptChart.destroy();

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

  function initForecastChart(container, students) {
    const ctx = container.querySelector('#tf-forecast-chart');
    if (!ctx) return;
    
    if (forecastChart) forecastChart.destroy();

    const activeStudents = students.filter(s => s.status === 'Active').length;
    const historicalLabels = ['2022-A', '2022-B', '2023-A', '2023-B', '2024-A', '2024-B', '2025-A', '2025-B', '2026-A'];
    const historicalData = [350, 390, 420, 480, 510, 560, 620, 680, activeStudents];

    forecastChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalLabels,
        datasets: [
          {
            label: 'Historical Enrollment',
            data: historicalData,
            borderColor: 'rgba(99, 102, 241, 0.4)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#6366f1',
            pointRadius: 6,
            borderWidth: 2,
            showLine: true
          },
          {
            label: 'Model Fit & Prediction',
            data: [],
            borderColor: '#f59e0b',
            backgroundColor: 'transparent',
            borderWidth: 3,
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { color: '#94a3b8' }
          }
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

  async function runTfTraining(container, students) {
    const trainBtn = container.querySelector('#tf-train-btn');
    if (!trainBtn || trainBtn.disabled) return;
    
    if (typeof tf === 'undefined') {
      alert('TensorFlow.js is currently loading or unavailable. Please check your internet connection.');
      return;
    }

    trainBtn.disabled = true;
    trainBtn.innerText = 'Training Model...';
    
    const statusCard = container.querySelector('#tf-status-card');
    if (statusCard) statusCard.style.display = 'block';
    
    const activeStudents = students.filter(s => s.status === 'Active').length;
    const xVal = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const yVal = [350, 390, 420, 480, 510, 560, 620, 680, activeStudents];

    // Normalize: X / 8, Y / 1000
    const xs = tf.tensor2d(xVal.map(x => x / 8), [9, 1]);
    const ys = tf.tensor2d(yVal.map(y => y / 1000), [9, 1]);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    const lrSelect = container.querySelector('#tf-lr-select');
    const epochsRange = container.querySelector('#tf-epochs-range');
    const horizonSelect = container.querySelector('#tf-horizon-select');

    const lr = lrSelect ? parseFloat(lrSelect.value) : 0.05;
    const epochs = epochsRange ? parseInt(epochsRange.value) : 150;
    const horizon = horizonSelect ? parseInt(horizonSelect.value) : 2;

    model.compile({
      optimizer: tf.train.adam(lr),
      loss: 'meanSquaredError'
    });

    try {
      await model.fit(xs, ys, {
        epochs: epochs,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            const progress = ((epoch + 1) / epochs) * 100;
            const disp = container.querySelector('#tf-epoch-disp');
            const lossDisp = container.querySelector('#tf-loss-disp');
            const pBar = container.querySelector('#tf-progress-bar');
            if (disp) disp.innerText = `${epoch + 1}/${epochs}`;
            if (lossDisp) lossDisp.innerText = logs.loss.toFixed(6);
            if (pBar) pBar.style.width = `${progress}%`;
          }
        }
      });

      // Get weights
      const weights = model.layers[0].getWeights();
      const w = weights[0].dataSync()[0];
      const b = weights[1].dataSync()[0];

      // De-normalize: y = (1000 * w / 8) * x + 1000 * b
      const m = (1000 * w) / 8;
      const c = 1000 * b;

      // Update metrics panel
      const statusText = container.querySelector('#tf-status-text');
      const fitText = container.querySelector('#tf-equation-fit');
      if (statusText) {
        statusText.innerText = 'Trained successfully';
        statusText.className = 'text-brand-accent-emerald font-bold';
      }
      if (fitText) fitText.innerText = `y = ${m.toFixed(2)}x + ${c.toFixed(2)}`;

      // Generate projection data
      const totalTerms = 9 + horizon; // 9 historical terms + horizon
      const allLabels = ['2022-A', '2022-B', '2023-A', '2023-B', '2024-A', '2024-B', '2025-A', '2025-B', '2026-A'];
      
      const years = [2026, 2027, 2028];
      let currentYearIndex = 0;
      let currentTermLetter = 'B';
      for (let i = 0; i < horizon; i++) {
        allLabels.push(`${years[currentYearIndex]}-${currentTermLetter}`);
        if (currentTermLetter === 'B') {
          currentTermLetter = 'A';
          currentYearIndex++;
        } else {
          currentTermLetter = 'B';
        }
      }

      const fitAndPredictData = [];
      for (let i = 0; i < totalTerms; i++) {
        const val = m * i + c;
        fitAndPredictData.push(Math.round(val));
      }

      // Update forecast chart
      forecastChart.data.labels = allLabels;
      
      // Update historical data padding
      const paddedHistorical = [...yVal];
      while (paddedHistorical.length < totalTerms) {
        paddedHistorical.push(null);
      }
      forecastChart.data.datasets[0].data = paddedHistorical;

      // Update fit and predict dataset
      forecastChart.data.datasets[1].data = fitAndPredictData;
      forecastChart.update();

    } catch (err) {
      console.error('Error during TensorFlow training:', err);
      alert('Error during TensorFlow training: ' + err.message);
    } finally {
      // Clean up tensors
      xs.dispose();
      ys.dispose();
      model.dispose();
      
      if (trainBtn) {
        trainBtn.disabled = false;
        trainBtn.innerText = 'Run ML Projection';
      }
    }
  }

  return {
    render: render
  };

})();

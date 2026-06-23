// Finance & Fees Module
window.financeView = (function() {
  
  let revenueForecastChart = null;

  function render(container) {
    const students = window.UniversityDB.getStudents();
    const transactions = window.UniversityDB.getTransactions();

    const currentUser = window.AuthSystem && window.AuthSystem.getCurrentUser();
    const isStudent = currentUser && currentUser.role === 'student';

    if (isStudent) {
      renderStudentFinance(container, currentUser, students, transactions);
      return;
    }

    // Stats calculations
    const totalDue = students.reduce((acc, curr) => acc + (curr.feeTotal - curr.feePaid), 0);
    const collected = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const overdueCount = students.filter(s => (s.feeTotal - s.feePaid) > 2000).length;

    container.innerHTML = `
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Finance & Collections</h1>
          <p class="text-sm text-brand-text-muted mt-1">Track scholarship distribution, audit ledger transactions, check student account balances, and execute invoice logs.</p>
        </div>
        <button class="btn btn-primary" id="btn-collect-payment">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          <span>Record Fee Payment</span>
        </button>
      </div>

      <!-- Financial KPI Metrics -->
      <div class="kpi-grid animate-fade-in delay-1">
        
        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-accent-emerald/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Cumulative Collections</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">$${collected.toLocaleString()}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-emerald font-semibold mt-2.5">Audited Fiscal Year</span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-emerald transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>

        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-accent-ruby/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Outstanding Balance</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">$${totalDue.toLocaleString()}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-ruby font-semibold mt-2.5">Pending Invoices</span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-ruby transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>

        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-accent-amber/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Overdue Accounts</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">${overdueCount} Accounts</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-amber font-semibold mt-2.5">Balances > $2,000</span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-amber transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
        </div>

      </div>

      <!-- Main Ledger Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mt-6 animate-fade-in delay-2">
        
        <!-- Student Balances Ledger -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Student Accounts Balance Sheet</h3>
          <div class="table-container max-h-[420px] overflow-y-auto border border-brand-border/50">
            <table>
              <thead>
                <tr>
                  <th class="p-4">Student ID</th>
                  <th class="p-4">Name</th>
                  <th class="p-4">Total Due</th>
                  <th class="p-4">Paid</th>
                  <th class="p-4">Status</th>
                </tr>
              </thead>
              <tbody id="finance-balances-body">
                <!-- Loaded dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Transactions Audit -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Recent Audit Receipts</h3>
          <div class="flex flex-col gap-3.5 max-h-[420px] overflow-y-auto pr-1">
            ${transactions.map(txn => `
              <div class="p-3.5 border border-brand-border/60 rounded-xl bg-brand-bg-tertiary/40 flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-accent-emerald/30 hover:bg-brand-bg-tertiary/60">
                <div>
                  <strong class="text-brand-accent-emerald text-sm font-bold">+$${txn.amount.toLocaleString()}</strong>
                  <div class="text-xs text-white font-medium mt-1">${txn.studentName}</div>
                  <span class="text-[0.7rem] text-brand-text-subtle mt-0.5 block">${txn.date} via ${txn.method}</span>
                </div>
                <code class="text-[0.7rem] bg-white/[0.04] px-2 py-1 rounded font-mono text-brand-text-muted">${txn.txId}</code>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- AI Collections Forecast Section -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl animate-fade-in delay-3 mt-6">
        <div class="flex justify-between items-center border-b border-brand-border/30 pb-4 mb-5">
          <div>
            <h3 class="font-display flex items-center gap-2 m-0 text-lg font-bold text-white">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-brand-accent-emerald)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              AI Revenue & Collections Forecasting
            </h3>
            <p class="text-[0.85rem] text-brand-text-muted mt-1 m-0">Regression modeling on historical collections registry using TensorFlow.js optimizer weights.</p>
          </div>
          <span class="badge bg-brand-accent-emerald/10 border-brand-accent-emerald/20 text-brand-accent-emerald font-semibold text-xs py-1 px-3">TensorFlow.js Engine</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <!-- Controls Panel -->
          <div class="flex flex-col gap-5 border-r border-brand-border/30 pr-8 max-md:border-r-0 max-md:pr-0">
            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Optimizer Learning Rate</label>
              <select id="tf-finance-lr" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="0.01">0.01 (Slow & Stable)</option>
                <option value="0.05" selected>0.05 (Default)</option>
                <option value="0.1">0.10 (Fast)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Training Epochs</label>
              <input type="range" id="tf-finance-epochs" min="50" max="300" step="50" value="150" class="w-full accent-brand-accent-emerald cursor-pointer">
              <span id="tf-finance-epochs-val" class="text-[0.8rem] text-brand-text-muted float-right mt-1 font-mono">150 epochs</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Forecast Horizon</label>
              <select id="tf-finance-horizon" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="1">1 Term (2026-B)</option>
                <option value="2" selected>2 Terms (2026-B & 2027-A)</option>
                <option value="3">3 Terms (Up to 2027-B)</option>
              </select>
            </div>

            <button class="btn btn-primary w-full justify-center flex items-center gap-2" id="tf-finance-train-btn" style="background-color: var(--color-brand-accent-emerald); box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>Run Revenue Projection</span>
            </button>

            <!-- Live Status -->
            <div id="tf-finance-status-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border/40" style="display:none;">
              <div class="flex justify-between text-[0.8rem] mb-1.5">
                <span class="text-brand-text-subtle">Epoch:</span>
                <span id="tf-finance-epoch-disp" class="font-semibold text-brand-text-main font-mono">0/150</span>
              </div>
              <div class="flex justify-between text-[0.8rem] mb-3">
                <span class="text-brand-text-subtle">Training Loss:</span>
                <span id="tf-finance-loss-disp" class="font-mono text-brand-accent-amber">0.0000</span>
              </div>
              <!-- Progress Bar -->
              <div class="bg-brand-bg-primary rounded-full h-1.5 overflow-hidden w-full">
                <div id="tf-finance-progress-bar" class="bg-brand-accent-emerald h-full w-0 transition-[width] duration-100"></div>
              </div>
            </div>
            
            <div id="tf-finance-metrics-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border/40 text-[0.825rem] leading-normal flex flex-col gap-1.5">
              <div class="text-brand-text-main font-bold">Projection Diagnostics:</div>
              <div>Status: <span id="tf-finance-status-text" class="text-brand-accent-cyan font-bold uppercase">Untrained</span></div>
              <div>Gradient Fit: <span id="tf-finance-equation-fit" class="text-brand-text-muted font-mono">y = mx + c</span></div>
            </div>
          </div>

          <!-- Forecast Chart -->
          <div class="flex flex-col h-[350px]">
            <div class="flex justify-between mb-3 items-center">
              <h4 class="text-sm font-semibold text-white m-0">Revenue Projection Curve</h4>
              <span id="tf-finance-projection-hint" class="text-[0.75rem] text-brand-text-muted">Historical fee revenues vs Model Fit</span>
            </div>
            <div class="chart-wrapper flex-1">
              <canvas id="tf-finance-forecast-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    const payBtn = container.querySelector('#btn-collect-payment');
    if (payBtn) {
      payBtn.addEventListener('click', openPaymentModal);
    }
    
    // Bind slider change
    const epochsRange = container.querySelector('#tf-finance-epochs');
    const epochsVal = container.querySelector('#tf-finance-epochs-val');
    if (epochsRange && epochsVal) {
      epochsRange.addEventListener('input', (e) => {
        epochsVal.innerText = `${e.target.value} epochs`;
      });
    }

    // Bind Train Button
    const trainBtn = container.querySelector('#tf-finance-train-btn');
    if (trainBtn) {
      trainBtn.addEventListener('click', () => {
        runRevenueTfTraining(container, collected);
      });
    }

    populateBalancesTable(container, students);

    // Load Forecast Charts
    setTimeout(() => {
      initRevenueForecastChart(container, collected);
    }, 100);
  }

  function populateBalancesTable(container, students) {
    const tbody = container.querySelector('#finance-balances-body');
    if (!tbody) return;

    tbody.innerHTML = students.map(s => {
      const balance = s.feeTotal - s.feePaid;
      let statusHtml = '<span class="badge badge-success">Fully Paid</span>';
      if (balance > 2500) {
        statusHtml = '<span class="badge badge-danger">Delinquent</span>';
      } else if (balance > 0) {
        statusHtml = '<span class="badge badge-warning">Partial</span>';
      }

      return `
        <tr>
          <td><code>${s.id}</code></td>
          <td><strong>${s.name}</strong></td>
          <td>$${s.feeTotal}</td>
          <td>$${s.feePaid}</td>
          <td>${statusHtml}</td>
        </tr>
      `;
    }).join('');
  }

  function renderStudentFinance(container, currentUser, students, transactions) {
    // Resolve student record
    let student = students.find(s => s.email === currentUser.email || s.name === currentUser.name);
    if (!student) {
      // Fallback
      student = students[0];
    }

    const outstanding = student.feeTotal - student.feePaid;
    const fillPercentage = Math.min((student.feePaid / student.feeTotal) * 100, 100);

    // Filter student-specific transactions
    const studentTxns = transactions.filter(tx => tx.studentId === student.id);

    container.innerHTML = `
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Student Statement</h1>
          <p class="text-sm text-brand-text-muted mt-1">Verify outstanding tuition balances, audit history logs, and process simulated payments.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-1">
        <!-- Personal Info & Dues Summary -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex flex-col gap-5">
          <div class="flex items-center gap-4 border-b border-brand-border/30 pb-4">
            <img src="${student.avatar}" class="w-16 h-16 rounded-full object-cover border border-brand-border/60">
            <div>
              <h3 class="m-0 font-display text-lg font-bold text-white">${student.name}</h3>
              <span class="text-xs text-brand-text-muted">Student ID: <code>${student.id}</code> | Dept: ${student.dept}</span>
            </div>
          </div>
          
          <div class="flex flex-col gap-3.5 text-xs">
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium">Registration Semester:</span>
              <strong class="text-white">Semester ${student.semester}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium">Academic Scholarship:</span>
              <strong class="text-brand-accent-cyan">${student.scholarship || 'None'}</strong>
            </div>
            <div class="flex justify-between border-t border-brand-border/30 pt-3">
              <span class="text-brand-text-muted font-medium">Total Semester Tuition Fee:</span>
              <strong class="text-white font-mono">$${student.feeTotal.toLocaleString()}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium text-brand-accent-emerald">Total Fee Paid:</span>
              <strong class="text-brand-accent-emerald font-mono">$${student.feePaid.toLocaleString()}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium text-brand-accent-ruby">Outstanding Balance:</span>
              <strong class="text-brand-accent-ruby font-mono">$${outstanding.toLocaleString()}</strong>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="mt-2">
            <div class="flex justify-between text-xs font-semibold mb-1.5">
              <span class="text-brand-text-muted uppercase tracking-wider">Tuition Clearance Progress</span>
              <span class="text-white font-mono">${fillPercentage.toFixed(1)}%</span>
            </div>
            <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border/40">
              <div class="bg-gradient-to-r from-brand-accent-emerald to-brand-primary h-full rounded-full" style="width: ${fillPercentage}%"></div>
            </div>
          </div>
        </div>

        <!-- Simulated Payment Portal -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border/30 pb-3 text-white">Online Payment Gateway</h3>
          <p class="text-xs text-brand-text-muted mb-4 font-normal">Process a simulated credit transfer to clear outstanding university dues.</p>
          
          <div class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Payment Amount ($)</label>
              <input type="number" id="stu-pay-amount" class="form-control mt-1 w-full" min="1" max="${outstanding}" value="${Math.min(outstanding, 1000)}" ${outstanding === 0 ? 'disabled' : ''}>
            </div>
            <div class="form-group">
              <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Select Gateway</label>
              <select id="stu-pay-method" class="form-control mt-1 w-full" ${outstanding === 0 ? 'disabled' : ''}>
                <option>Stripe Card</option>
                <option>PayPal</option>
                <option>Bank Direct Transfer</option>
              </select>
            </div>
            <button class="btn btn-primary w-full justify-center flex items-center gap-2 mt-2" id="btn-stu-pay" ${outstanding === 0 ? 'disabled' : ''}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              <span>${outstanding === 0 ? 'Statement Cleared' : 'Process Payment'}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- AI Tuition Default Risk Estimator -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mt-6 animate-fade-in delay-2">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/30">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-accent-amber animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-white font-display">AI Payment Delay Predictor</span>
          </div>
          <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald animate-fade-in" id="finance-ai-delay-status">Low Risk</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-brand-text-muted">
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Predicted Delay Probability:</span>
            <div class="font-bold text-white font-mono text-sm mt-0.5 animate-fade-in" id="finance-ai-delay-pct">Calculating...</div>
          </div>
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Projected Clearance Date:</span>
            <div class="font-bold text-white font-mono text-sm mt-0.5 animate-fade-in" id="finance-ai-clearance-date">Semester end</div>
          </div>
        </div>
      </div>

      <!-- Personal Receipts / Transaction History -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mt-6 animate-fade-in delay-2">
        <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border/30 pb-3 text-white">Statement Transaction Ledger</h3>
        
        <div class="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1">
          ${studentTxns.length === 0 ? `
            <div class="text-center py-6 text-brand-text-muted text-xs">No prior transaction receipts found.</div>
          ` : studentTxns.map(txn => `
            <div class="p-3.5 border border-brand-border/60 rounded-xl bg-brand-bg-tertiary/40 flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-accent-emerald/30 hover:bg-brand-bg-tertiary/60">
              <div>
                <strong class="text-brand-accent-emerald text-sm font-bold">+$${txn.amount.toLocaleString()}</strong>
                <span class="text-xs text-brand-text-muted ml-3">${txn.date} via ${txn.method}</span>
              </div>
              <div class="flex items-center gap-3">
                <code class="text-[0.7rem] bg-white/[0.04] px-2 py-1 rounded font-mono text-brand-text-muted">${txn.txId}</code>
                <span class="badge badge-success text-[0.65rem] py-0.5">Success</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    runFinanceTfInference(student, outstanding);

    // Bind Payment Button
    const payBtn = container.querySelector('#btn-stu-pay');
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        const amountInput = container.querySelector('#stu-pay-amount');
        const methodSelect = container.querySelector('#stu-pay-method');
        const amount = parseInt(amountInput.value);
        const method = methodSelect.value;

        if (isNaN(amount) || amount <= 0 || amount > outstanding) {
          alert(`Please enter a valid amount between $1 and $${outstanding}.`);
          return;
        }

        // Record transaction
        const txId = 'TXN' + Math.floor(1000 + Math.random() * 9000);
        const today = new Date().toISOString().split('T')[0];

        const txn = {
          txId: txId,
          studentId: student.id,
          studentName: student.name,
          amount: amount,
          date: today,
          status: 'Paid',
          method: method
        };

        window.UniversityDB.addTransaction(txn);
        
        // Update student accounts
        student.feePaid = Math.min(student.feeTotal, student.feePaid + amount);

        alert(`✅ Payment of $${amount} processed successfully!\nTransaction ID: ${txId}`);
        
        // Re-render
        renderStudentFinance(container, currentUser, students, transactions);
      });
    }
  }

  function openPaymentModal() {
    const students = window.UniversityDB.getStudents();
    const stuOptions = students.map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join('');

    const bodyHTML = `
      <form id="record-payment-form">
        <div class="form-group">
          <label class="form-label">Select Student Account</label>
          <select class="form-control" id="pay-student-select">
            ${stuOptions}
          </select>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Receipt Amount ($)</label>
            <input type="number" class="form-control" id="pay-amount" min="1" max="10000" value="1000" required>
          </div>
          <div class="form-group">
            <label class="form-label">Payment Gateway / Method</label>
            <select class="form-control" id="pay-method">
              <option>Stripe</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Scholarship Voucher</option>
            </select>
          </div>
        </div>
      </form>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-payment">Complete Transaction</button>
    `;

    window.App.showModal('Record Fee Payment Receipt', bodyHTML, footerHTML);

    document.getElementById('btn-submit-payment').addEventListener('click', () => {
      const studentId = document.getElementById('pay-student-select').value;
      const amount = parseInt(document.getElementById('pay-amount').value);
      const method = document.getElementById('pay-method').value;

      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid billing transaction amount.");
        return;
      }

      const stu = window.UniversityDB.getStudents().find(s => s.id === studentId);
      if (!stu) {
        alert("Student record validation failed.");
        return;
      }

      // Record transaction
      const txId = 'TXN' + Math.floor(1000 + Math.random() * 9000);
      const today = new Date().toISOString().split('T')[0];

      const txn = {
        txId: txId,
        studentId: studentId,
        studentName: stu.name,
        amount: amount,
        date: today,
        status: 'Paid',
        method: method
      };

      window.UniversityDB.addTransaction(txn);
      
      // Update student accounts
      stu.feePaid = Math.min(stu.feeTotal, stu.feePaid + amount);

      window.App.closeModal();
      alert(`Payment of $${amount} logged successfully for ${stu.name}.\nReceipt Reference ID: ${txId}`);
      
      // Re-render
      window.App.loadView('finance');
    });
  }

  function initRevenueForecastChart(container, collected) {
    const ctx = container.querySelector('#tf-finance-forecast-chart');
    if (!ctx) return;
    
    if (revenueForecastChart) revenueForecastChart.destroy();

    const historicalLabels = ['2022-A', '2022-B', '2023-A', '2023-B', '2024-A', '2024-B', '2025-A', '2025-B', '2026-A'];
    const historicalData = [65000, 72000, 78000, 85000, 92000, 102000, 108000, 118000, collected];

    revenueForecastChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalLabels,
        datasets: [
          {
            label: 'Historical Revenue ($)',
            data: historicalData,
            borderColor: 'rgba(16, 185, 129, 0.4)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#10b981',
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

  async function runRevenueTfTraining(container, collected) {
    const trainBtn = container.querySelector('#tf-finance-train-btn');
    if (!trainBtn || trainBtn.disabled) return;

    if (typeof tf === 'undefined') {
      alert('TensorFlow.js is currently loading or unavailable. Please check your internet connection.');
      return;
    }

    trainBtn.disabled = true;
    trainBtn.innerText = 'Training Model...';

    const statusCard = container.querySelector('#tf-finance-status-card');
    if (statusCard) statusCard.style.display = 'block';

    const xVal = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const yVal = [65000, 72000, 78000, 85000, 92000, 102000, 108000, 118000, collected];

    // Normalize: X / 8, Y / 150000
    const xs = tf.tensor2d(xVal.map(x => x / 8), [9, 1]);
    const ys = tf.tensor2d(yVal.map(y => y / 150000), [9, 1]);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    const lrSelect = container.querySelector('#tf-finance-lr');
    const epochsRange = container.querySelector('#tf-finance-epochs');
    const horizonSelect = container.querySelector('#tf-finance-horizon');

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
            const disp = container.querySelector('#tf-finance-epoch-disp');
            const lossDisp = container.querySelector('#tf-finance-loss-disp');
            const pBar = container.querySelector('#tf-finance-progress-bar');
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

      // De-normalize: y = (150000 * w / 8) * x + 150000 * b
      const m = (150000 * w) / 8;
      const c = 150000 * b;

      // Update metrics panel
      const statusText = container.querySelector('#tf-finance-status-text');
      const fitText = container.querySelector('#tf-finance-equation-fit');
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
      revenueForecastChart.data.labels = allLabels;
      
      // Update historical data padding
      const paddedHistorical = [...yVal];
      while (paddedHistorical.length < totalTerms) {
        paddedHistorical.push(null);
      }
      revenueForecastChart.data.datasets[0].data = paddedHistorical;

      // Update fit and predict dataset
      revenueForecastChart.data.datasets[1].data = fitAndPredictData;
      revenueForecastChart.update();

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
        trainBtn.innerText = 'Run Revenue Projection';
      }
    }
  }

  async function runFinanceTfInference(student, outstanding) {
    if (typeof tf === 'undefined') {
      const el = document.getElementById('finance-ai-delay-pct');
      if (el) el.textContent = 'TF Unavailable';
      return;
    }
    try {
      const inputVal = [outstanding / (student.feeTotal || 5000), student.gpa / 4.0, student.attendance / 100.0];

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 3, activation: 'tanh', inputShape: [3] }));
      model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

      const w1 = tf.tensor2d([
        [1.5],
        [-0.5],
        [-0.8]
      ]);
      const b1 = tf.tensor1d([0.1]);
      model.layers[1].setWeights([w1, b1]);

      const inputTensor = tf.tensor2d([inputVal], [1, 3]);
      const outputTensor = model.predict(inputTensor);
      const outputVal = (await outputTensor.data())[0];

      inputTensor.dispose();
      outputTensor.dispose();
      w1.dispose();
      b1.dispose();
      model.dispose();

      var delayProb = outputVal;
      if (outstanding === 0) {
        delayProb = 0.0;
      }

      const pctEl = document.getElementById('finance-ai-delay-pct');
      const statusEl = document.getElementById('finance-ai-delay-status');
      const dateEl = document.getElementById('finance-ai-clearance-date');

      if (pctEl) pctEl.textContent = (delayProb * 100).toFixed(1) + '%';
      if (statusEl) {
        if (delayProb > 0.4) {
          statusEl.textContent = 'Elevated Default Risk';
          statusEl.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby';
          if (dateEl) dateEl.textContent = 'Delayed (> 30 days)';
        } else if (delayProb > 0.1) {
          statusEl.textContent = 'Grace Period Predict';
          statusEl.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber';
          if (dateEl) dateEl.textContent = 'Within 15 days';
        } else {
          statusEl.textContent = 'Low Risk Statement';
          statusEl.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald';
          if (dateEl) dateEl.textContent = 'On time';
        }
      }
    } catch (err) {
      console.error('TF Student finance inference failed:', err);
    }
  }

  return {
    render: render,
    openPaymentModal: openPaymentModal
  };

})();

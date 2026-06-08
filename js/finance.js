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
      <div class="page-header animate-fade-in">
        <div>
          <h1>Finance & Collections</h1>
          <p>Track scholarship distribution, audit recent transactions, check student balances, and issue invoices.</p>
        </div>
        <button class="btn btn-primary" id="btn-collect-payment">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          Record Fee payment
        </button>
      </div>

      <!-- Financial KPI Metrics -->
      <div class="kpi-grid animate-fade-in delay-1 mt-6">
        
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Cumulative Collections</span>
            <span class="kpi-value">$${collected.toLocaleString()}</span>
            <span class="kpi-growth text-brand-accent-emerald">Audited Fiscal Year</span>
          </div>
          <div class="kpi-icon text-brand-accent-emerald">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Outstanding Receivables</span>
            <span class="kpi-value">$${totalDue.toLocaleString()}</span>
            <span class="kpi-growth text-brand-accent-ruby">Pending Invoices</span>
          </div>
          <div class="kpi-icon text-brand-accent-ruby">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Overdue Accounts</span>
            <span class="kpi-value">${overdueCount} Students</span>
            <span class="kpi-growth text-brand-accent-amber">Balances > $2,000</span>
          </div>
          <div class="kpi-icon text-brand-accent-amber">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
        </div>

      </div>

      <!-- Main Ledger Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 animate-fade-in delay-2 mt-6">
        
        <!-- Student Balances Ledger -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-semibold">Student Accounts Balance Sheet</h3>
          <div class="table-container max-h-[420px] overflow-y-auto">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Total Due</th>
                  <th>Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="finance-balances-body">
                <!-- Loaded dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Transactions Audit -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-semibold">Recent Audit Receipts</h3>
          <div class="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1">
            ${transactions.map(txn => `
              <div class="p-3 border border-brand-border rounded-xl bg-brand-bg-tertiary flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-accent-emerald/30 hover:bg-brand-bg-tertiary/60">
                <div>
                  <strong class="text-brand-accent-emerald text-base">+$${txn.amount}</strong>
                  <div class="text-[0.8rem] font-semibold mt-0.5">${txn.studentName}</div>
                  <span class="text-xs text-brand-text-subtle">${txn.date} via ${txn.method}</span>
                </div>
                <code class="text-xs bg-white/[0.03] px-2 py-1 rounded">${txn.txId}</code>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- AI Collections Forecast Section -->
      <div class="card animate-fade-in delay-3 mt-6">
        <div class="flex justify-between items-center border-b border-brand-border pb-4 mb-5">
          <div>
            <h3 class="font-display flex items-center gap-2 m-0 text-lg font-bold">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-brand-accent-emerald)" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              AI Fee Collections Forecasting
            </h3>
            <p class="text-[0.85rem] text-brand-text-muted mt-1 m-0">Train an in-browser neural network on historical fee collection trends using TensorFlow.js.</p>
          </div>
          <span class="badge bg-brand-accent-emerald/10 text-brand-accent-emerald font-semibold">Powered by TensorFlow.js</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <!-- Controls Panel -->
          <div class="flex flex-col gap-5 border-r border-brand-border pr-8 max-md:border-r-0 max-md:pr-0">
            <div>
              <label class="block text-[0.825rem] text-brand-text-subtle mb-2">Optimizer Learning Rate</label>
              <select id="tf-finance-lr" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="0.01">0.01 (Slow & Stable)</option>
                <option value="0.05" selected>0.05 (Default)</option>
                <option value="0.1">0.10 (Fast)</option>
              </select>
            </div>

            <div>
              <label class="block text-[0.825rem] text-brand-text-subtle mb-2">Training Epochs</label>
              <input type="range" id="tf-finance-epochs" min="50" max="300" step="50" value="150" class="w-full accent-brand-accent-emerald">
              <span id="tf-finance-epochs-val" class="text-[0.8rem] text-brand-text-muted float-right mt-1">150 epochs</span>
            </div>

            <div>
              <label class="block text-[0.825rem] text-brand-text-subtle mb-2">Forecast Horizon</label>
              <select id="tf-finance-horizon" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="1">1 Term (2026-B)</option>
                <option value="2" selected>2 Terms (2026-B & 2027-A)</option>
                <option value="3">3 Terms (Up to 2027-B)</option>
              </select>
            </div>

            <button class="btn btn-primary w-full justify-center flex items-center gap-2" id="tf-finance-train-btn" style="background-color: var(--color-brand-accent-emerald); box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Run Revenue Projection
            </button>

            <!-- Live Status -->
            <div id="tf-finance-status-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border" style="display:none;">
              <div class="flex justify-between text-[0.8rem] mb-1.5">
                <span class="text-brand-text-subtle">Epoch:</span>
                <span id="tf-finance-epoch-disp" class="font-semibold text-brand-text-main">0/150</span>
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
            
            <div id="tf-finance-metrics-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border text-[0.825rem] leading-normal">
              <div class="text-brand-text-main font-semibold mb-1">Last Projection Metrics:</div>
              <div>Status: <span id="tf-finance-status-text" class="text-brand-accent-cyan font-bold">Untrained</span></div>
              <div>Equation Fit: <span id="tf-finance-equation-fit" class="text-brand-text-muted">y = mx + c</span></div>
            </div>
          </div>

          <!-- Forecast Chart -->
          <div class="flex flex-col h-[350px]">
            <div class="flex justify-between mb-3 items-center">
              <h4 class="text-[0.95rem] font-semibold text-brand-text-main m-0">Revenue Projection Curve</h4>
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
      <div class="page-header animate-fade-in">
        <div>
          <h1>My Student Fee Statement</h1>
          <p>Verify outstanding tuition dues, download invoices, and execute simulated payments.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-1">
        <!-- Personal Info & Dues Summary -->
        <div class="card flex flex-col gap-5">
          <div class="flex items-center gap-4 border-b border-brand-border pb-4">
            <img src="${student.avatar}" class="w-16 h-16 rounded-full object-cover border border-brand-border">
            <div>
              <h3 class="m-0 font-display text-lg font-bold">${student.name}</h3>
              <span class="text-xs text-brand-text-muted">Student ID: <code>${student.id}</code> | Dept: ${student.dept}</span>
            </div>
          </div>
          
          <div class="flex flex-col gap-3 text-sm">
            <div class="flex justify-between">
              <span class="text-brand-text-subtle">Registration Semester:</span>
              <strong class="text-brand-text-main">Semester ${student.semester}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-subtle">Academic Scholarship:</span>
              <strong class="text-brand-accent-cyan">${student.scholarship || 'None'}</strong>
            </div>
            <div class="flex justify-between border-t border-brand-border/40 pt-3">
              <span class="text-brand-text-subtle">Total Semester Tuition Fee:</span>
              <strong class="text-brand-text-main">$${student.feeTotal.toLocaleString()}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-subtle text-brand-accent-emerald">Total Fee Paid:</span>
              <strong class="text-brand-accent-emerald">$${student.feePaid.toLocaleString()}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-subtle text-brand-accent-ruby">Outstanding Balance:</span>
              <strong class="text-brand-accent-ruby">$${outstanding.toLocaleString()}</strong>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="mt-2">
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-brand-text-subtle">Tuition Clearance Progress</span>
              <span class="text-brand-text-main">${fillPercentage.toFixed(1)}%</span>
            </div>
            <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border">
              <div class="bg-gradient-to-r from-brand-accent-emerald to-brand-primary h-full rounded-full" style="width: ${fillPercentage}%"></div>
            </div>
          </div>
        </div>

        <!-- Simulated Payment Portal -->
        <div class="card">
          <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border pb-3">Pay Tuition Online</h3>
          <p class="text-xs text-brand-text-muted mb-4">Execute a simulated billing payment to clear your outstanding student dues.</p>
          
          <div class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label">Payment Amount ($)</label>
              <input type="number" id="stu-pay-amount" class="form-control" min="1" max="${outstanding}" value="${Math.min(outstanding, 1000)}" ${outstanding === 0 ? 'disabled' : ''}>
            </div>
            <div class="form-group">
              <label class="form-label">Select Payment Gateway</label>
              <select id="stu-pay-method" class="form-control" ${outstanding === 0 ? 'disabled' : ''}>
                <option>Stripe Card</option>
                <option>PayPal</option>
                <option>Bank Direct Transfer</option>
              </select>
            </div>
            <button class="btn btn-primary w-full justify-center flex items-center gap-2 mt-2" id="btn-stu-pay" ${outstanding === 0 ? 'disabled' : ''}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              ${outstanding === 0 ? 'Tuition Balance Cleared' : 'Process Payment'}
            </button>
          </div>
        </div>
      </div>

      <!-- Personal Receipts / Transaction History -->
      <div class="card mt-6 animate-fade-in delay-2">
        <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border pb-3">My Billing Transaction History</h3>
        
        <div class="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
          ${studentTxns.length === 0 ? `
            <div class="text-center py-6 text-brand-text-muted text-xs">No prior transaction receipts found.</div>
          ` : studentTxns.map(txn => `
            <div class="p-3 border border-brand-border rounded-xl bg-brand-bg-tertiary flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-accent-emerald/30 hover:bg-brand-bg-tertiary/60">
              <div>
                <strong class="text-brand-accent-emerald text-base">+$${txn.amount}</strong>
                <span class="text-xs text-brand-text-subtle ml-3">${txn.date} via ${txn.method}</span>
              </div>
              <div class="flex items-center gap-2">
                <code class="text-xs bg-white/[0.03] px-2 py-1 rounded">${txn.txId}</code>
                <span class="badge badge-success text-[0.65rem] py-0.5">Success</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

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

  return {
    render: render,
    openPaymentModal: openPaymentModal
  };

})();

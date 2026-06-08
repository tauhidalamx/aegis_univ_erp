// Finance & Fees Module
window.financeView = (function() {
  
  function render(container) {
    const students = window.UniversityDB.getStudents();
    const transactions = window.UniversityDB.getTransactions();

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
      <div class="kpi-grid animate-fade-in delay-1" style="margin-top: 24px;">
        
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Cumulative Collections</span>
            <span class="kpi-value">$${collected.toLocaleString()}</span>
            <span class="kpi-growth text-accent-emerald">Audited Fiscal Year</span>
          </div>
          <div class="kpi-icon text-accent-emerald">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Outstanding Receivables</span>
            <span class="kpi-value">$${totalDue.toLocaleString()}</span>
            <span class="kpi-growth text-accent-ruby">Pending Invoices</span>
          </div>
          <div class="kpi-icon text-accent-ruby">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>

        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Overdue Accounts</span>
            <span class="kpi-value">${overdueCount} Students</span>
            <span class="kpi-growth text-accent-amber">Balances > $2,000</span>
          </div>
          <div class="kpi-icon text-accent-amber">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
        </div>

      </div>

      <!-- Main Ledger Tables -->
      <div class="grid-2 animate-fade-in delay-2" style="margin-top: 24px; grid-template-columns: 1.4fr 1fr;">
        
        <!-- Student Balances Ledger -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family: var(--font-display);">Student Accounts Balance Sheet</h3>
          <div class="table-container" style="max-height: 420px; overflow-y:auto;">
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
          <h3 style="margin-bottom:16px; font-family: var(--font-display);">Recent Audit Receipts</h3>
          <div style="display:flex; flex-direction:column; gap:16px; max-height:420px; overflow-y:auto; padding-right:4px;">
            ${transactions.map(txn => `
              <div style="padding:12px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="color:var(--accent-emerald); font-size:1.05rem;">+$${txn.amount}</strong>
                  <div style="font-size:0.8rem; font-weight:600; margin-top:2px;">${txn.studentName}</div>
                  <span style="font-size:0.75rem; color:var(--text-subtle);">${txn.date} via ${txn.method}</span>
                </div>
                <code style="font-size:0.75rem; background:rgba(255,255,255,0.03); padding:4px 8px; border-radius:4px;">${txn.txId}</code>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    document.getElementById('btn-collect-payment').addEventListener('click', openPaymentModal);
    populateBalancesTable(students);
  }

  function populateBalancesTable(students) {
    const tbody = document.getElementById('finance-balances-body');
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

  return {
    render: render,
    openPaymentModal: openPaymentModal
  };

})();

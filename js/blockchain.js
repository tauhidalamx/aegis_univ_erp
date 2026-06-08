// Blockchain & Web3 Module — Certificate Verification, Credential Wallet, On-Chain Ledger
window.blockchainView = (function() {

  // ─── SIMULATED BLOCKCHAIN STATE ──────────────────────────────────
  const CHAIN = [];
  const CERTIFICATES = [];
  const WALLETS = {};

  // Generate a pseudo-random hash
  function generateHash(input) {
    let hash = 0;
    const str = input + Date.now() + Math.random();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(16, '0') +
      Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0') +
      Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
  }

  // Initialize genesis block and seed data
  function initChain() {
    if (CHAIN.length > 0) return;

    // Genesis Block
    CHAIN.push({
      index: 0,
      timestamp: '2026-01-01T00:00:00Z',
      type: 'GENESIS',
      data: { message: 'Aegis University Blockchain Genesis Block' },
      hash: '0x0000000000000000000000000000000000000000',
      prevHash: '0x0000000000000000000000000000000000000000',
      nonce: 0,
      gasUsed: 0
    });

    // Seed certificate blocks
    const students = window.UniversityDB.getStudents();
    const seedCerts = [
      { studentId: 'STU001', studentName: 'Alex Rivera', type: 'Course Completion', course: 'CS101 - Intro to Programming', grade: 'A', issueDate: '2026-01-15' },
      { studentId: 'STU002', studentName: 'Zoe Chen', type: 'Course Completion', course: 'CS202 - Data Structures', grade: 'A+', issueDate: '2026-02-20' },
      { studentId: 'STU006', studentName: 'Sophia Patel', type: 'Degree Certificate', course: 'B.Tech Computer Science', grade: 'First Class with Distinction', issueDate: '2026-03-01' },
      { studentId: 'STU009', studentName: 'Devon Miller', type: 'Course Completion', course: 'EE302 - Microprocessors', grade: 'A', issueDate: '2026-03-10' },
      { studentId: 'STU008', studentName: 'Elena Rostova', type: 'Merit Certificate', course: 'BA201 - Organizational Behavior', grade: 'University Gold Medal', issueDate: '2026-04-05' },
      { studentId: 'STU004', studentName: 'Emily Watson', type: 'Course Completion', course: 'BI101 - Biotechnology Fundamentals', grade: 'B+', issueDate: '2026-04-18' },
    ];

    seedCerts.forEach((cert, i) => {
      const certHash = generateHash(cert.studentId + cert.course);
      const block = {
        index: CHAIN.length,
        timestamp: cert.issueDate + 'T10:00:00Z',
        type: 'CERT_ISSUE',
        data: cert,
        hash: certHash,
        prevHash: CHAIN[CHAIN.length - 1].hash,
        nonce: Math.floor(Math.random() * 99999),
        gasUsed: Math.floor(21000 + Math.random() * 50000)
      };
      CHAIN.push(block);

      cert.blockIndex = block.index;
      cert.txHash = certHash;
      cert.verified = true;
      CERTIFICATES.push(cert);
    });

    // Seed fee payment blocks
    const txns = window.UniversityDB.getTransactions();
    txns.forEach(tx => {
      const txHash = generateHash(tx.txId + tx.studentId);
      CHAIN.push({
        index: CHAIN.length,
        timestamp: tx.date + 'T12:00:00Z',
        type: 'FEE_PAYMENT',
        data: { txId: tx.txId, studentId: tx.studentId, studentName: tx.studentName, amount: tx.amount, method: tx.method },
        hash: txHash,
        prevHash: CHAIN[CHAIN.length - 1].hash,
        nonce: Math.floor(Math.random() * 99999),
        gasUsed: Math.floor(21000 + Math.random() * 30000)
      });
    });

    // Seed wallets
    students.forEach(s => {
      WALLETS[s.id] = {
        address: generateHash(s.id + s.name).slice(0, 42),
        balance: parseFloat((Math.random() * 2.5 + 0.01).toFixed(4)),
        network: 'Aegis EduChain (Testnet)',
        certificates: CERTIFICATES.filter(c => c.studentId === s.id).length
      };
    });
  }

  // ─── MAIN RENDER ─────────────────────────────────────────────────
  let chainChart = null;

  function render(container) {
    initChain();

    const totalBlocks = CHAIN.length;
    const totalCerts = CERTIFICATES.length;
    const totalGasUsed = CHAIN.reduce((a, b) => a + (b.gasUsed || 0), 0);
    const uniqueWallets = Object.keys(WALLETS).length;

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Blockchain & Web3 Hub</h1>
          <p>Decentralized credential verification, digital certificate minting, on-chain ledger, and student wallet management.</p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" id="btn-verify-cert">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            Verify Certificate
          </button>
          <button class="btn btn-primary btn-sm" id="btn-mint-cert">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Mint Certificate NFT
          </button>
        </div>
      </div>

      <!-- Chain KPI Summary -->
      <div class="kpi-grid animate-fade-in delay-1" style="margin-top:24px;">
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Chain Height</span>
            <span class="kpi-value" style="color:var(--primary);">#${totalBlocks}</span>
            <span class="kpi-growth text-accent-emerald">Live • Synced</span>
          </div>
          <div class="kpi-icon" style="color:var(--primary);">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Certificates Issued</span>
            <span class="kpi-value" style="color:var(--accent-emerald);">${totalCerts}</span>
            <span class="kpi-growth text-accent-cyan">Immutable Credentials</span>
          </div>
          <div class="kpi-icon" style="color:var(--accent-emerald);">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Gas Consumed</span>
            <span class="kpi-value" style="color:var(--accent-amber);">${(totalGasUsed / 1000).toFixed(1)}K</span>
            <span class="kpi-growth text-accent-amber">Cumulative Wei</span>
          </div>
          <div class="kpi-icon" style="color:var(--accent-amber);">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Wallets</span>
            <span class="kpi-value" style="color:var(--accent-cyan);">${uniqueWallets}</span>
            <span class="kpi-growth text-accent-emerald">EduChain Testnet</span>
          </div>
          <div class="kpi-icon" style="color:var(--accent-cyan);">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 10H18a2 2 0 100 4h4"/></svg>
          </div>
        </div>
      </div>

      <!-- Two Column: Chain Activity Chart + Certificates -->
      <div class="grid-2 animate-fade-in delay-2" style="margin-top:24px;">

        <!-- Block Activity Chart -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family:var(--font-display);">Block Activity Timeline</h3>
          <div class="chart-wrapper" style="height:220px;">
            <canvas id="chain-activity-chart"></canvas>
          </div>
        </div>

        <!-- Issued Certificates List -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-family:var(--font-display);">Minted Credential NFTs</h3>
            <span class="badge badge-success">${totalCerts} On-Chain</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px; max-height:280px; overflow-y:auto; padding-right:4px;" id="cert-list-container">
            ${CERTIFICATES.map(cert => `
              <div style="padding:14px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center; gap:12px;">
                <div style="flex:1; min-width:0;">
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${cert.type === 'Degree Certificate' ? 'var(--accent-amber)' : (cert.type === 'Merit Certificate' ? 'var(--accent-ruby)' : 'var(--accent-emerald)')}" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <strong style="font-size:0.9rem;">${cert.studentName}</strong>
                    <span class="badge" style="font-size:0.65rem; background:rgba(99,102,241,0.1); color:var(--primary);">${cert.type}</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-muted);">${cert.course}</div>
                  <code style="font-size:0.65rem; color:var(--text-subtle); word-break:break-all;">${cert.txHash.slice(0, 30)}...</code>
                </div>
                <div style="text-align:right; flex-shrink:0;">
                  <span class="badge badge-success" style="font-size:0.7rem;">✓ Verified</span>
                  <div style="font-size:0.7rem; color:var(--text-subtle); margin-top:4px;">Block #${cert.blockIndex}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Two Column: Block Explorer + Student Wallets -->
      <div class="grid-2 animate-fade-in delay-3" style="margin-top:24px;">

        <!-- Block Explorer -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family:var(--font-display);">Block Explorer — On-Chain Ledger</h3>
          <div style="max-height:380px; overflow-y:auto; padding-right:4px;">
            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="padding:10px; font-size:0.75rem;">Block</th>
                  <th style="padding:10px; font-size:0.75rem;">Type</th>
                  <th style="padding:10px; font-size:0.75rem;">Hash</th>
                  <th style="padding:10px; font-size:0.75rem;">Gas</th>
                  <th style="padding:10px; font-size:0.75rem;">Nonce</th>
                </tr>
              </thead>
              <tbody>
                ${CHAIN.slice().reverse().map(block => {
                  let typeColor = 'var(--text-muted)';
                  let typeBadge = 'badge-info';
                  if (block.type === 'CERT_ISSUE') { typeColor = 'var(--accent-emerald)'; typeBadge = 'badge-success'; }
                  else if (block.type === 'FEE_PAYMENT') { typeColor = 'var(--accent-amber)'; typeBadge = 'badge-warning'; }
                  else if (block.type === 'GENESIS') { typeColor = 'var(--primary)'; typeBadge = 'badge-info'; }

                  return `
                    <tr style="border-bottom:1px solid var(--border); cursor:pointer;" class="block-row" data-idx="${block.index}">
                      <td style="padding:10px; font-weight:700; color:var(--primary); font-size:0.85rem;">#${block.index}</td>
                      <td style="padding:10px;"><span class="badge ${typeBadge}" style="font-size:0.7rem;">${block.type.replace('_', ' ')}</span></td>
                      <td style="padding:10px;"><code style="font-size:0.7rem; color:var(--text-muted);">${block.hash.slice(0, 18)}...</code></td>
                      <td style="padding:10px; font-size:0.8rem; color:var(--text-muted);">${(block.gasUsed || 0).toLocaleString()}</td>
                      <td style="padding:10px; font-size:0.8rem; color:var(--text-subtle);">${block.nonce}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Student Wallets -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family:var(--font-display);">Student Credential Wallets</h3>
          <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">Aegis EduChain Testnet — Each student receives a decentralized identity wallet upon enrollment.</p>
          <div style="display:flex; flex-direction:column; gap:12px; max-height:330px; overflow-y:auto; padding-right:4px;">
            ${window.UniversityDB.getStudents().map(stu => {
              const w = WALLETS[stu.id];
              if (!w) return '';
              return `
                <div style="padding:14px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; align-items:center; gap:12px; min-width:0; flex:1;">
                    <img src="${stu.avatar}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:1px solid var(--border); flex-shrink:0;">
                    <div style="min-width:0;">
                      <strong style="font-size:0.875rem;">${stu.name}</strong>
                      <code style="display:block; font-size:0.65rem; color:var(--text-subtle); word-break:break-all;">${w.address}</code>
                    </div>
                  </div>
                  <div style="text-align:right; flex-shrink:0; margin-left:12px;">
                    <div style="font-weight:700; color:var(--accent-cyan); font-size:0.95rem;">${w.balance} ETH</div>
                    <span style="font-size:0.7rem; color:var(--text-subtle);">${w.certificates} cert(s)</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Smart Contract Simulation -->
      <div class="card animate-fade-in delay-4" style="margin-top:24px;">
        <h3 style="margin-bottom:8px; font-family:var(--font-display);">Smart Contract — Fee Payment Gateway</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:20px;">Execute a simulated on-chain fee transaction through the Aegis University smart contract.</p>
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr auto; gap:16px; align-items:end;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Student Wallet</label>
            <select class="form-control" id="sc-student-select">
              ${window.UniversityDB.getStudents().map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Amount (ETH)</label>
            <input type="number" class="form-control" id="sc-amount" value="0.5" min="0.01" max="10" step="0.01">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Gas Limit</label>
            <input type="number" class="form-control" id="sc-gas" value="21000" min="21000" max="100000">
          </div>
          <button class="btn btn-primary" id="btn-execute-sc" style="height:42px;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Execute
          </button>
        </div>
        <div id="sc-receipt" style="margin-top:16px;"></div>
      </div>
    `;

    // ─── EVENT BINDINGS ────────────────────────────────────────────
    document.getElementById('btn-mint-cert').addEventListener('click', openMintModal);
    document.getElementById('btn-verify-cert').addEventListener('click', openVerifyModal);
    document.getElementById('btn-execute-sc').addEventListener('click', executeSmartContract);

    // Block row click → detail modal
    container.querySelectorAll('.block-row').forEach(row => {
      row.addEventListener('click', () => {
        const idx = parseInt(row.getAttribute('data-idx'));
        openBlockDetailModal(idx);
      });
    });

    // Render chart
    setTimeout(() => renderChainChart(), 100);
  }

  // ─── CHAIN ACTIVITY CHART ───────────────────────────────────────
  function renderChainChart() {
    const ctx = document.getElementById('chain-activity-chart');
    if (!ctx) return;
    if (chainChart) chainChart.destroy();

    // Group blocks by type
    const certBlocks = CHAIN.filter(b => b.type === 'CERT_ISSUE').length;
    const feeBlocks = CHAIN.filter(b => b.type === 'FEE_PAYMENT').length;
    const otherBlocks = CHAIN.filter(b => b.type === 'GENESIS').length;

    // Monthly gas consumption simulation
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const gasData = [12000, 28000, 45000, 38000, 62000, 54000];

    chainChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Gas Used (Wei)',
            data: gasData,
            backgroundColor: 'rgba(99, 102, 241, 0.6)',
            borderColor: '#6366f1',
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
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

  // ─── BLOCK DETAIL MODAL ──────────────────────────────────────────
  function openBlockDetailModal(idx) {
    const block = CHAIN.find(b => b.index === idx);
    if (!block) return;

    const dataStr = JSON.stringify(block.data, null, 2);

    const bodyHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 24px; font-size:0.875rem; margin-bottom:20px;">
        <div><span style="color:var(--text-muted);">Block Index:</span> <strong style="color:var(--primary);">#${block.index}</strong></div>
        <div><span style="color:var(--text-muted);">Block Type:</span> <strong>${block.type}</strong></div>
        <div><span style="color:var(--text-muted);">Timestamp:</span> <strong>${block.timestamp}</strong></div>
        <div><span style="color:var(--text-muted);">Nonce:</span> <strong>${block.nonce}</strong></div>
        <div><span style="color:var(--text-muted);">Gas Used:</span> <strong>${(block.gasUsed || 0).toLocaleString()} Wei</strong></div>
        <div><span style="color:var(--text-muted);">Status:</span> <span class="badge badge-success">Confirmed</span></div>
      </div>
      <div style="margin-bottom:16px;">
        <span style="color:var(--text-muted); font-size:0.85rem;">Block Hash:</span>
        <code style="display:block; margin-top:4px; padding:10px; background:var(--bg-tertiary); border-radius:var(--radius-sm); font-size:0.75rem; word-break:break-all; color:var(--accent-cyan);">${block.hash}</code>
      </div>
      <div style="margin-bottom:16px;">
        <span style="color:var(--text-muted); font-size:0.85rem;">Previous Hash:</span>
        <code style="display:block; margin-top:4px; padding:10px; background:var(--bg-tertiary); border-radius:var(--radius-sm); font-size:0.75rem; word-break:break-all; color:var(--text-subtle);">${block.prevHash}</code>
      </div>
      <div>
        <span style="color:var(--text-muted); font-size:0.85rem;">Block Data Payload:</span>
        <pre style="margin-top:4px; padding:12px; background:var(--bg-tertiary); border-radius:var(--radius-sm); font-size:0.75rem; color:var(--accent-emerald); overflow-x:auto; white-space:pre-wrap;">${dataStr}</pre>
      </div>
    `;

    window.App.showModal('Block Inspector — #' + block.index, bodyHTML, '<button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>');
  }

  // ─── MINT CERTIFICATE MODAL ──────────────────────────────────────
  function openMintModal() {
    const students = window.UniversityDB.getStudents();
    const courses = window.UniversityDB.getCourses();

    const stuOpts = students.map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join('');
    const courseOpts = courses.map(c => `<option value="${c.code} - ${c.title}">${c.code} - ${c.title}</option>`).join('');

    const bodyHTML = `
      <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:20px;">Mint a new verifiable credential NFT to the Aegis EduChain. This certificate becomes permanently immutable once confirmed.</p>
      <div class="form-group">
        <label class="form-label">Student</label>
        <select class="form-control" id="mint-student">${stuOpts}</select>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Certificate Type</label>
          <select class="form-control" id="mint-type">
            <option>Course Completion</option>
            <option>Degree Certificate</option>
            <option>Merit Certificate</option>
            <option>Research Publication</option>
            <option>Internship Certificate</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Grade / Honor</label>
          <select class="form-control" id="mint-grade">
            <option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option>
            <option>First Class with Distinction</option><option>University Gold Medal</option><option>Pass</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Course / Program</label>
        <select class="form-control" id="mint-course">${courseOpts}</select>
      </div>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-confirm-mint">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Mint to Chain
      </button>
    `;

    window.App.showModal('Mint Credential NFT', bodyHTML, footerHTML);

    document.getElementById('btn-confirm-mint').addEventListener('click', () => {
      const studentId = document.getElementById('mint-student').value;
      const stu = students.find(s => s.id === studentId);
      const certType = document.getElementById('mint-type').value;
      const grade = document.getElementById('mint-grade').value;
      const course = document.getElementById('mint-course').value;

      if (!stu) return;

      const cert = {
        studentId: stu.id,
        studentName: stu.name,
        type: certType,
        course: course,
        grade: grade,
        issueDate: new Date().toISOString().split('T')[0]
      };

      const txHash = generateHash(stu.id + course + Date.now());
      const block = {
        index: CHAIN.length,
        timestamp: new Date().toISOString(),
        type: 'CERT_ISSUE',
        data: cert,
        hash: txHash,
        prevHash: CHAIN[CHAIN.length - 1].hash,
        nonce: Math.floor(Math.random() * 99999),
        gasUsed: Math.floor(21000 + Math.random() * 50000)
      };
      CHAIN.push(block);

      cert.blockIndex = block.index;
      cert.txHash = txHash;
      cert.verified = true;
      CERTIFICATES.push(cert);

      // Update wallet
      if (WALLETS[stu.id]) {
        WALLETS[stu.id].certificates++;
      }

      window.App.closeModal();
      alert(`✅ Certificate NFT minted successfully!\n\nStudent: ${stu.name}\nType: ${certType}\nBlock: #${block.index}\nTx Hash: ${txHash.slice(0, 32)}...`);

      // Re-render
      const viewContainer = document.querySelector('.page-transition');
      if (viewContainer) render(viewContainer);
    });
  }

  // ─── VERIFY CERTIFICATE MODAL ────────────────────────────────────
  function openVerifyModal() {
    const bodyHTML = `
      <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:20px;">Enter a transaction hash or student ID to verify the authenticity of a certificate on the Aegis EduChain.</p>
      <div class="form-group">
        <label class="form-label">Transaction Hash or Student ID</label>
        <input type="text" class="form-control" id="verify-input" placeholder="e.g. 0x... or STU001">
      </div>
      <div id="verify-result" style="margin-top:16px;"></div>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>
      <button class="btn btn-primary" id="btn-run-verify">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
        Verify On-Chain
      </button>
    `;

    window.App.showModal('Verify Certificate Authenticity', bodyHTML, footerHTML);

    document.getElementById('btn-run-verify').addEventListener('click', () => {
      const input = document.getElementById('verify-input').value.trim();
      const resultDiv = document.getElementById('verify-result');
      if (!input) {
        resultDiv.innerHTML = '<p style="color:var(--accent-ruby);">Please enter a hash or student ID.</p>';
        return;
      }

      // Search by hash or student ID
      let found = CERTIFICATES.filter(c =>
        c.txHash.toLowerCase().includes(input.toLowerCase()) ||
        c.studentId.toUpperCase() === input.toUpperCase()
      );

      if (found.length === 0) {
        resultDiv.innerHTML = `
          <div style="padding:16px; border:1px solid rgba(244,63,94,0.3); border-radius:var(--radius-md); background:rgba(244,63,94,0.05);">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-ruby)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <strong style="color:var(--accent-ruby);">Not Found</strong>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted);">No matching certificates found on the Aegis EduChain for this query. The credential may be invalid or not yet minted.</p>
          </div>
        `;
        return;
      }

      resultDiv.innerHTML = found.map(cert => `
        <div style="padding:16px; border:1px solid rgba(16,185,129,0.3); border-radius:var(--radius-md); background:rgba(16,185,129,0.05); margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <strong style="color:var(--accent-emerald);">✓ Verified on Blockchain</strong>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.85rem;">
            <div><span style="color:var(--text-muted);">Student:</span> <strong>${cert.studentName}</strong></div>
            <div><span style="color:var(--text-muted);">Type:</span> <strong>${cert.type}</strong></div>
            <div><span style="color:var(--text-muted);">Course:</span> <strong>${cert.course}</strong></div>
            <div><span style="color:var(--text-muted);">Grade:</span> <strong>${cert.grade}</strong></div>
            <div><span style="color:var(--text-muted);">Issue Date:</span> <strong>${cert.issueDate}</strong></div>
            <div><span style="color:var(--text-muted);">Block:</span> <strong style="color:var(--primary);">#${cert.blockIndex}</strong></div>
          </div>
          <code style="display:block; margin-top:10px; font-size:0.7rem; color:var(--accent-cyan); word-break:break-all;">${cert.txHash}</code>
        </div>
      `).join('');
    });
  }

  // ─── SMART CONTRACT EXECUTION ────────────────────────────────────
  function executeSmartContract() {
    const studentId = document.getElementById('sc-student-select').value;
    const amount = parseFloat(document.getElementById('sc-amount').value);
    const gas = parseInt(document.getElementById('sc-gas').value);
    const receiptDiv = document.getElementById('sc-receipt');

    const stu = window.UniversityDB.getStudents().find(s => s.id === studentId);
    if (!stu || isNaN(amount) || amount <= 0) {
      receiptDiv.innerHTML = '<p style="color:var(--accent-ruby);">Invalid transaction parameters.</p>';
      return;
    }

    // Show loading state
    receiptDiv.innerHTML = `
      <div style="padding:16px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--bg-tertiary); text-align:center;">
        <div class="animate-pulse-glow" style="display:inline-block; width:12px; height:12px; border-radius:50%; background:var(--primary); margin-right:8px;"></div>
        <span style="color:var(--text-muted);">Broadcasting transaction to EduChain network...</span>
      </div>
    `;

    // Simulate mining delay
    setTimeout(() => {
      const txHash = generateHash(studentId + amount + Date.now());
      const usdEquiv = (amount * 3800).toFixed(2); // Simulated ETH price

      const block = {
        index: CHAIN.length,
        timestamp: new Date().toISOString(),
        type: 'FEE_PAYMENT',
        data: {
          txId: 'SC-' + Math.floor(1000 + Math.random() * 9000),
          studentId: studentId,
          studentName: stu.name,
          amount: amount + ' ETH',
          usdEquivalent: '$' + usdEquiv,
          method: 'Smart Contract'
        },
        hash: txHash,
        prevHash: CHAIN[CHAIN.length - 1].hash,
        nonce: Math.floor(Math.random() * 99999),
        gasUsed: gas
      };
      CHAIN.push(block);

      // Update student fee
      const feeUsd = Math.min(stu.feeTotal, stu.feePaid + parseInt(usdEquiv));
      window.UniversityDB.updateStudent(studentId, { feePaid: feeUsd });

      // Deduct wallet balance
      if (WALLETS[studentId]) {
        WALLETS[studentId].balance = Math.max(0, parseFloat((WALLETS[studentId].balance - amount).toFixed(4)));
      }

      receiptDiv.innerHTML = `
        <div style="padding:20px; border:1px solid rgba(16,185,129,0.3); border-radius:var(--radius-md); background:rgba(16,185,129,0.05);">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <strong style="color:var(--accent-emerald); font-size:1.05rem;">Transaction Confirmed ✓</strong>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.85rem;">
            <div><span style="color:var(--text-muted);">From:</span> <strong>${stu.name}</strong></div>
            <div><span style="color:var(--text-muted);">To:</span> <strong>Aegis University Treasury</strong></div>
            <div><span style="color:var(--text-muted);">Amount:</span> <strong style="color:var(--accent-cyan);">${amount} ETH</strong> <span style="color:var(--text-subtle);">(~$${usdEquiv})</span></div>
            <div><span style="color:var(--text-muted);">Gas Used:</span> <strong>${gas.toLocaleString()} Wei</strong></div>
            <div><span style="color:var(--text-muted);">Block:</span> <strong style="color:var(--primary);">#${block.index}</strong></div>
            <div><span style="color:var(--text-muted);">Status:</span> <span class="badge badge-success">Finalized</span></div>
          </div>
          <code style="display:block; margin-top:12px; padding:10px; background:var(--bg-primary); border-radius:var(--radius-sm); font-size:0.7rem; word-break:break-all; color:var(--accent-cyan);">TX: ${txHash}</code>
        </div>
      `;
    }, 1500);
  }

  return {
    render: render
  };

})();

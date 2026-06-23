// Recruitment & Admissions Module with TensorFlow.js Pipeline Converter
window.recruitmentView = (function() {
  'use strict';

  // Mock candidates database
  const ADMISSIONS_PIPELINE = [
    { name: 'Marcus Sterling', program: 'Computer Science', gpa: 3.8, sat: 1450, interview: 9.0, status: 'Review' },
    { name: 'Aaliyah Jones', program: 'Bioinformatics', gpa: 3.5, sat: 1320, interview: 8.5, status: 'Review' },
    { name: 'Hiroshi Sato', program: 'Electrical Eng', gpa: 3.9, sat: 1510, interview: 9.5, status: 'Approved' },
    { name: 'Clara Oswald', program: 'Business Admin', gpa: 3.2, sat: 1240, interview: 7.0, status: 'Review' },
    { name: 'Bruce Banner', program: 'Mechanical Eng', gpa: 3.7, sat: 1400, interview: 8.0, status: 'Review' }
  ];

  function render(container) {
    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Recruitment & Admissions Converter</h1>
          <p>Analyze prospective student acceptance parameters, evaluate faculty candidates, and run neural suitability metrics.</p>
        </div>
      </div>

      <!-- Overview stats -->
      <div class="kpi-grid animate-fade-in delay-1 mt-6">
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Applications</span>
            <span class="kpi-value">${ADMISSIONS_PIPELINE.length} Candidates</span>
            <span class="kpi-growth text-brand-primary">Fall Intake 2026</span>
          </div>
          <div class="kpi-icon text-brand-primary">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">AI Target Conversion Rate</span>
            <span class="kpi-value" id="rec-ai-target-conversion">78.5%</span>
            <span class="kpi-growth text-brand-accent-emerald">Optimized Cap</span>
          </div>
          <div class="kpi-icon text-brand-accent-emerald">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
      </div>

      <!-- Form Evaluation & Admissions list -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 animate-fade-in delay-2 mt-6">
        
        <!-- Candidates Table -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-bold">Admissions Pipeline Roster</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Target Program</th>
                  <th>GPA / SAT</th>
                  <th>Interview</th>
                  <th class="text-right">AI Conversion Rate</th>
                </tr>
              </thead>
              <tbody id="admissions-roster-body">
                <!-- Loaded dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Interactive AI Evaluator Card -->
        <div class="card">
          <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border pb-3">Interactive Admission Evaluator</h3>
          <p class="text-xs text-brand-text-muted mb-4">Input prospective scores to predict conversion likelihood using in-browser classification networks.</p>
          
          <div class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label">Applicant GPA</label>
              <input type="number" id="eval-gpa" class="form-control" min="1.0" max="4.0" step="0.1" value="3.6">
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">SAT Score</label>
                <input type="number" id="eval-sat" class="form-control" min="800" max="1600" step="10" value="1350">
              </div>
              <div class="form-group">
                <label class="form-label">Interview Score (1-10)</label>
                <input type="number" id="eval-interview" class="form-control" min="1" max="10" step="0.5" value="8.0">
              </div>
            </div>
            
            <!-- Optimizer training configs -->
            <div class="grid-2 p-3 bg-brand-bg-tertiary border border-brand-border rounded-xl">
              <div class="form-group mb-0">
                <label class="form-label text-[0.65rem] uppercase">Learning Rate</label>
                <select id="eval-lr" class="form-control text-xs py-1 px-2">
                  <option value="0.1">0.10 (Fast)</option>
                  <option value="0.05" selected>0.05 (Balanced)</option>
                  <option value="0.01">0.01 (Slow)</option>
                </select>
              </div>
              <div class="form-group mb-0">
                <label class="form-label text-[0.65rem] uppercase">Training Epochs</label>
                <input type="number" id="eval-epochs" class="form-control text-xs py-1 px-2" value="25" min="5" max="100">
              </div>
            </div>

            <!-- Training progress indicator -->
            <div id="eval-training-card" class="p-3 bg-brand-bg-primary rounded-xl border border-brand-border/40 text-xs hidden animate-fade-in">
              <div class="flex justify-between items-center mb-1">
                <span>Model Tuning...</span>
                <span id="eval-epoch-disp" class="font-mono font-bold text-brand-primary">0/25</span>
              </div>
              <div class="flex justify-between items-center text-[0.65rem] text-brand-text-subtle mb-2">
                <span>Mean Squared Error (Loss):</span>
                <span id="eval-loss-disp" class="font-mono font-bold text-brand-accent-amber">0.000000</span>
              </div>
              <div class="w-full bg-brand-bg-secondary h-2.5 rounded-full overflow-hidden border border-brand-border/40">
                <div id="eval-progress-bar" class="bg-brand-primary h-full rounded-full transition-all duration-150" style="width: 0%"></div>
              </div>
            </div>

            <button class="btn btn-primary w-full justify-center flex items-center gap-2 mt-2 cursor-pointer" id="btn-run-eval">
              Project Converter Score
            </button>
          </div>
        </div>
      </div>
    `;

    const evalBtn = container.querySelector('#btn-run-eval');
    if (evalBtn) {
      evalBtn.addEventListener('click', () => {
        runAdmissionsTfTraining(container);
      });
    }

    populateTable(container);
  }

  async function populateTable(container) {
    const tbody = container.querySelector('#admissions-roster-body');
    if (!tbody) return;

    let html = '';
    for (const item of ADMISSIONS_PIPELINE) {
      var prob = await predictDirectSuitability(item.gpa, item.sat, item.interview);
      var pct = (prob * 100).toFixed(1) + '%';
      
      let badgeClass = 'text-brand-accent-emerald';
      if (prob < 0.4) badgeClass = 'text-brand-accent-ruby';
      else if (prob < 0.7) badgeClass = 'text-brand-accent-amber';

      html += `
        <tr class="border-b border-brand-border/40">
          <td><strong>${item.name}</strong></td>
          <td>${item.program}</td>
          <td>GPA ${item.gpa.toFixed(2)} / SAT ${item.sat}</td>
          <td>${item.interview.toFixed(1)} / 10.0</td>
          <td class="text-right font-mono font-bold ${badgeClass}">${pct}</td>
        </tr>
      `;
    }
    tbody.innerHTML = html;
  }

  async function predictDirectSuitability(gpa, sat, interview) {
    if (typeof tf === 'undefined') return 0.5;
    try {
      const gpaNormalized = gpa / 4.0;
      const satNormalized = (sat - 800) / 800.0;
      const intNormalized = interview / 10.0;

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 3, activation: 'sigmoid', inputShape: [3] }));
      model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

      const w1 = tf.tensor2d([
        [1.2],
        [1.8],
        [1.5]
      ]);
      const b1 = tf.tensor1d([0.1]);
      model.layers[1].setWeights([w1, b1]);

      const input = tf.tensor2d([[gpaNormalized, satNormalized, intNormalized]], [1, 3]);
      const output = model.predict(input);
      const val = (await output.data())[0];

      input.dispose();
      output.dispose();
      w1.dispose();
      b1.dispose();
      model.dispose();

      return val;
    } catch (e) {
      return 0.5;
    }
  }

  async function runAdmissionsTfTraining(container) {
    const evalBtn = container.querySelector('#btn-run-eval');
    const trainCard = container.querySelector('#eval-training-card');
    const epochDisp = container.querySelector('#eval-epoch-disp');
    const lossDisp = container.querySelector('#eval-loss-disp');
    const progress = container.querySelector('#eval-progress-bar');

    if (typeof tf === 'undefined') {
      alert('TensorFlow.js is currently loading or unavailable.');
      return;
    }

    const gpaVal = parseFloat(container.querySelector('#eval-gpa').value);
    const satVal = parseInt(container.querySelector('#eval-sat').value);
    const intVal = parseFloat(container.querySelector('#eval-interview').value);

    if (isNaN(gpaVal) || isNaN(satVal) || isNaN(intVal)) {
      alert('Please input valid numeric assessment details.');
      return;
    }

    if (evalBtn) {
      evalBtn.disabled = true;
      evalBtn.innerText = 'Training Model...';
    }
    if (trainCard) trainCard.classList.remove('hidden');

    const lr = parseFloat(container.querySelector('#eval-lr').value);
    const epochs = parseInt(container.querySelector('#eval-epochs').value);

    // Normalize prospective inputs
    const gpaN = gpaVal / 4.0;
    const satN = (satVal - 800) / 800.0;
    const intN = intVal / 10.0;

    // Train regression sequential model
    const trainX = tf.tensor2d([
      [3.8 / 4.0, (1450 - 800)/800, 9/10],
      [3.5 / 4.0, (1320 - 800)/800, 8.5/10],
      [3.9 / 4.0, (1510 - 800)/800, 9.5/10],
      [3.2 / 4.0, (1240 - 800)/800, 7/10],
      [3.7 / 4.0, (1400 - 800)/800, 8/10]
    ], [5, 3]);

    const trainY = tf.tensor2d([
      [0.85],
      [0.65],
      [0.98],
      [0.28],
      [0.72]
    ], [5, 1]);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 3, activation: 'sigmoid', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
      optimizer: tf.train.adam(lr),
      loss: 'meanSquaredError'
    });

    try {
      await model.fit(trainX, trainY, {
        epochs: epochs,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            const p = ((epoch + 1) / epochs) * 100;
            if (epochDisp) epochDisp.innerText = `${epoch + 1}/${epochs}`;
            if (lossDisp) lossDisp.innerText = logs.loss.toFixed(6);
            if (progress) progress.style.width = `${p}%`;
          }
        }
      });

      // Predict target value
      const queryTensor = tf.tensor2d([[gpaN, satN, intN]], [1, 3]);
      const prediction = model.predict(queryTensor);
      const predictionVal = (await prediction.data())[0];

      queryTensor.dispose();
      prediction.dispose();

      const convVal = container.querySelector('#rec-ai-target-conversion');
      if (convVal) {
        convVal.textContent = (predictionVal * 100).toFixed(1) + '%';
      }

      alert(`AI Projection Completed!\nPredicted application conversion likelihood: ${(predictionVal * 100).toFixed(1)}%`);

    } catch (err) {
      console.error('TF Recruitment training error:', err);
    } finally {
      trainX.dispose();
      trainY.dispose();
      model.dispose();

      if (evalBtn) {
        evalBtn.disabled = false;
        evalBtn.innerText = 'Project Converter Score';
      }
      if (trainCard) trainCard.classList.add('hidden');
    }
  }

  return {
    render: render
  };

})();

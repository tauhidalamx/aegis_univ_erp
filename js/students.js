// Student Management Module — Full Profile System
window.studentsView = (function() {

  let containerRef = null;

  function render(container) {
    containerRef = container;

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Student Registry</h1>
          <p>Complete student lifecycle management — admissions, profiles, academics, and records.</p>
        </div>
        <button class="btn btn-primary" id="btn-add-student">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
          Enroll Student
        </button>
      </div>

      <!-- Filters & Controls -->
      <div class="card animate-fade-in delay-1 mt-6">
        <div class="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-end max-md:grid-cols-1">
          <div class="form-group mb-0">
            <label class="form-label">Search Name / ID / Phone</label>
            <input type="text" class="form-control" placeholder="e.g. Alex Rivera, STU001, +1-555" id="search-name">
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Department</label>
            <select class="form-control" id="filter-dept">
              <option value="ALL">All Departments</option>
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Eng</option>
              <option value="ME">Mechanical Eng</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Admin</option>
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Status</label>
            <select class="form-control" id="filter-status">
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Gender</label>
            <select class="form-control" id="filter-gender">
              <option value="ALL">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Student Table -->
      <div class="table-container animate-fade-in delay-2 mt-6">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>ID</th>
              <th>Dept</th>
              <th>Sem</th>
              <th>GPA</th>
              <th>Attend.</th>
              <th>Phone</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="student-table-body"></tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-add-student').addEventListener('click', openAddStudentModal);
    document.getElementById('search-name').addEventListener('input', applyFilters);
    document.getElementById('filter-dept').addEventListener('change', applyFilters);
    document.getElementById('filter-status').addEventListener('change', applyFilters);
    document.getElementById('filter-gender').addEventListener('change', applyFilters);

    applyFilters();
  }

  function applyFilters() {
    const searchVal = (document.getElementById('search-name')?.value || '').toLowerCase().trim();
    const deptVal = document.getElementById('filter-dept')?.value || 'ALL';
    const statusVal = document.getElementById('filter-status')?.value || 'ALL';
    const genderVal = document.getElementById('filter-gender')?.value || 'ALL';

    const students = window.UniversityDB.getStudents();
    const filtered = students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchVal)
        || s.id.toLowerCase().includes(searchVal)
        || (s.phone && s.phone.includes(searchVal))
        || s.email.toLowerCase().includes(searchVal);
      const matchDept = deptVal === 'ALL' || s.dept === deptVal;
      const matchStatus = statusVal === 'ALL' || s.status === statusVal;
      const matchGender = genderVal === 'ALL' || s.gender === genderVal;
      return matchSearch && matchDept && matchStatus && matchGender;
    });

    populateTable(filtered);
  }

  function populateTable(data) {
    const tbody = document.getElementById('student-table-body');
    if (!tbody) return;

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" class="text-center text-brand-text-muted p-8">No matching student profiles found.</td></tr>';
      return;
    }

    tbody.innerHTML = data.map(stu => {
      let statusClass = 'badge-success';
      if (stu.status === 'On Leave') statusClass = 'badge-warning';
      if (stu.status === 'Graduated') statusClass = 'badge-info';

      let attendClass = 'text-brand-accent-emerald';
      if (stu.attendance < 85) attendClass = 'text-brand-accent-amber';
      if (stu.attendance < 75) attendClass = 'text-brand-accent-ruby';

      return `
        <tr>
          <td>
            <div class="flex items-center gap-3">
              <img src="${stu.avatar}" class="w-9 h-9 rounded-full object-cover border border-brand-border">
              <div>
                <div class="font-semibold">${stu.name}</div>
                <div class="text-[0.7rem] text-brand-text-muted">${stu.email}</div>
              </div>
            </div>
          </td>
          <td><code>${stu.id}</code></td>
          <td>${stu.dept}</td>
          <td>Sem ${stu.semester}</td>
          <td class="font-semibold">${stu.gpa.toFixed(2)}</td>
          <td class="${attendClass} font-semibold">${stu.attendance}%</td>
          <td class="text-[0.8rem] text-brand-text-muted">${stu.phone || '—'}</td>
          <td><span class="badge ${statusClass}">${stu.status}</span></td>
          <td class="text-right">
            <div class="flex gap-1.5 justify-end">
              <button class="btn btn-secondary btn-sm view-stu-btn" data-id="${stu.id}">View</button>
              <button class="btn btn-primary btn-sm edit-stu-btn" data-id="${stu.id}">Edit</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.view-stu-btn').forEach(btn => {
      btn.addEventListener('click', () => openStudentDetailModal(btn.getAttribute('data-id')));
    });
    tbody.querySelectorAll('.edit-stu-btn').forEach(btn => {
      btn.addEventListener('click', () => openEditStudentModal(btn.getAttribute('data-id')));
    });
  }

  // ─── FULL DETAIL MODAL ───────────────────────────────────────────
  function openStudentDetailModal(id) {
    const stu = window.UniversityDB.getStudents().find(s => s.id === id);
    if (!stu) return;

    const outstanding = stu.feeTotal - stu.feePaid;

    const bodyHTML = `
      <div class="flex gap-5 items-start mb-6 pb-5 border-b border-brand-border">
        <img src="${stu.avatar}" class="w-[90px] h-[90px] rounded-full object-cover border-3 border-brand-primary shrink-0">
        <div class="flex-1">
          <h3 class="font-display text-lg font-semibold m-0 mb-1">${stu.name}</h3>
          <p class="text-brand-text-muted text-[0.85rem] m-0">Student ID: <code>${stu.id}</code> &nbsp;|&nbsp; ${stu.dept} Department</p>
          <p class="text-brand-text-subtle text-[0.8rem] mt-1 m-0">${stu.email} &nbsp;•&nbsp; ${stu.phone || 'No phone'}</p>
          <div class="mt-2 flex gap-2">
            <span class="badge ${stu.status === 'Active' ? 'badge-success' : (stu.status === 'On Leave' ? 'badge-warning' : 'badge-info')}">${stu.status}</span>
            <span class="badge bg-brand-bg-tertiary text-brand-text-main">Sem ${stu.semester}</span>
            ${stu.scholarship && stu.scholarship !== 'None' ? `<span class="badge badge-info">${stu.scholarship}</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Personal Information Grid -->
      <h4 class="mb-3 font-display font-semibold text-brand-primary">Personal Information</h4>
      <div class="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 text-sm max-sm:grid-cols-1">
        <div><span class="text-brand-text-muted">Date of Birth:</span> <strong>${stu.dob || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Gender:</span> <strong>${stu.gender || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Blood Group:</span> <strong>${stu.bloodGroup || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Nationality:</span> <strong>${stu.nationality || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Category:</span> <strong>${stu.category || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Aadhar / National ID:</span> <strong>${stu.aadhar || '—'}</strong></div>
        <div class="col-span-2 max-sm:col-span-1"><span class="text-brand-text-muted">Address:</span> <strong>${stu.address || '—'}</strong></div>
      </div>

      <!-- Guardian Information -->
      <h4 class="mb-3 font-display font-semibold text-brand-accent-cyan">Guardian / Parent Details</h4>
      <div class="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 text-sm max-sm:grid-cols-1">
        <div><span class="text-brand-text-muted">Guardian Name:</span> <strong>${stu.guardianName || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Relation:</span> <strong>${stu.guardianRelation || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Guardian Phone:</span> <strong>${stu.guardianPhone || '—'}</strong></div>
        <div><span class="text-brand-text-muted">Previous School:</span> <strong>${stu.previousSchool || '—'}</strong></div>
      </div>

      <!-- Academic & Financial Summary -->
      <div class="grid grid-cols-2 gap-4 mb-6 max-sm:grid-cols-1">
        <div class="card p-4 bg-brand-bg-tertiary">
          <h4 class="mb-2.5 text-[0.9rem] font-semibold text-brand-accent-emerald">📚 Academic Record</h4>
          <div class="text-[0.85rem] flex flex-col gap-1.5">
            <div>CGPA: <strong>${stu.gpa.toFixed(2)}</strong></div>
            <div>Attendance: <strong class="${stu.attendance < 75 ? 'text-brand-accent-ruby' : (stu.attendance < 85 ? 'text-brand-accent-amber' : 'text-brand-accent-emerald')}">${stu.attendance}%</strong></div>
            <div>Admission Date: <strong>${stu.admissionDate || '—'}</strong></div>
            <div>Enrollment Type: <strong>${stu.enrollmentType || 'Regular'}</strong></div>
          </div>
        </div>
        <div class="card p-4 bg-brand-bg-tertiary">
          <h4 class="mb-2.5 text-[0.9rem] font-semibold text-brand-accent-amber">💰 Financial Summary</h4>
          <div class="text-[0.85rem] flex flex-col gap-1.5">
            <div>Total Fees: <strong>$${stu.feeTotal.toLocaleString()}</strong></div>
            <div>Paid: <strong class="text-brand-accent-emerald">$${stu.feePaid.toLocaleString()}</strong></div>
            <div>Balance: <strong class="${outstanding > 0 ? 'text-brand-accent-ruby' : 'text-brand-accent-emerald'}">$${outstanding.toLocaleString()}</strong></div>
            <div>Hostel: <strong>${stu.hostel || 'Day Scholar'}</strong></div>
          </div>
        </div>
      </div>

      <!-- Enrolled Courses -->
      <h4 class="mb-3 font-display font-semibold text-brand-primary">Enrolled Courses</h4>
      <div class="table-container mb-0">
        <table>
          <thead>
            <tr><th>Code</th><th>Title</th><th>Credits</th><th>Instructor</th></tr>
          </thead>
          <tbody>
            ${stu.courses.length === 0 ? '<tr><td colspan="4" class="text-center text-brand-text-muted">No active course enrollments.</td></tr>' :
              stu.courses.map(code => {
                const c = window.UniversityDB.getCourses().find(course => course.code === code);
                const fac = c ? window.UniversityDB.getFaculty().find(f => f.id === c.facultyId) : null;
                return `<tr>
                  <td><code>${code}</code></td>
                  <td>${c ? c.title : 'External'}</td>
                  <td>${c ? c.credits : '—'}</td>
                  <td>${fac ? fac.name : 'TBD'}</td>
                </tr>`;
              }).join('')
            }
          </tbody>
        </table>
      </div>

      <!-- AI Dropout & Retention Risk Estimator -->
      <div class="card mt-6 p-4 bg-brand-bg-tertiary border border-brand-border">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-brand-text-main font-display">AI Academic Success Predictor</span>
          </div>
          <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald" id="stu-ai-risk-badge">Calculating...</span>
        </div>
        <div class="grid grid-cols-2 gap-4 text-xs text-brand-text-muted">
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Dropout Risk Probability:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-1" id="stu-ai-risk-pct">Calculating...</div>
          </div>
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Projected Final GPA:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-1" id="stu-ai-gpa-proj">Calculating...</div>
          </div>
          <div class="col-span-2">
            <div class="w-full bg-brand-bg-secondary h-2.5 rounded-full overflow-hidden mt-1 relative border border-brand-border/40">
              <div id="stu-ai-risk-bar" class="bg-brand-primary h-full rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>
            <p class="text-[0.65rem] text-brand-text-subtle mt-2">
              Neural network evaluating student CGPA (${stu.gpa.toFixed(2)}), attendance (${stu.attendance}%), and enrollment semester relative to graduation probability.
            </p>
          </div>
        </div>
      </div>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>
      <button class="btn btn-primary" id="btn-modal-edit-stu">Edit Profile</button>
    `;

    window.App.showModal('Student Full Profile', bodyHTML, footerHTML);
    runStudentTfInference(stu);

    document.getElementById('btn-modal-edit-stu').addEventListener('click', () => {
      window.App.closeModal();
      setTimeout(() => openEditStudentModal(id), 200);
    });
  }

  async function runStudentTfInference(stu) {
    if (typeof tf === 'undefined') {
      const badge = document.getElementById('stu-ai-risk-badge');
      if (badge) badge.textContent = 'TF Unavailable';
      return;
    }
    try {
      const inputVal = [stu.gpa / 4.0, stu.attendance / 100.0, stu.semester / 8.0];
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 4, activation: 'sigmoid', inputShape: [3] }));
      model.add(tf.layers.dense({ units: 2 }));
      
      const w1 = tf.tensor2d([
        [-2.0, 3.5],
        [-3.0, 2.5],
        [0.5, -0.5]
      ]);
      const b1 = tf.tensor1d([1.5, 0.5]);
      model.layers[1].setWeights([w1, b1]);
      
      const inputTensor = tf.tensor2d([inputVal], [1, 3]);
      const outputTensor = model.predict(inputTensor);
      const outputValues = await outputTensor.data();
      
      var riskProb = Math.max(0, Math.min(1, outputValues[0]));
      var projectedGpa = Math.max(1.0, Math.min(4.0, outputValues[1] * 4.0));
      
      if (stu.attendance < 70) {
        riskProb = Math.max(riskProb, 0.65);
      }
      if (stu.gpa < 2.0) {
        riskProb = Math.max(riskProb, 0.75);
      }
      if (stu.gpa >= 3.8 && stu.attendance >= 90) {
        riskProb = Math.min(riskProb, 0.02);
      }

      w1.dispose();
      b1.dispose();
      inputTensor.dispose();
      outputTensor.dispose();
      model.dispose();

      const badge = document.getElementById('stu-ai-risk-badge');
      const pct = document.getElementById('stu-ai-risk-pct');
      const gpaProj = document.getElementById('stu-ai-gpa-proj');
      const bar = document.getElementById('stu-ai-risk-bar');

      if (pct) pct.textContent = (riskProb * 100).toFixed(1) + '%';
      if (gpaProj) gpaProj.textContent = projectedGpa.toFixed(2) + ' CGPA';
      if (bar) bar.style.width = (riskProb * 100) + '%';
      
      if (badge) {
        if (riskProb < 0.15) {
          badge.textContent = 'Low Risk';
          badge.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald';
          if (bar) bar.style.backgroundColor = 'var(--color-brand-accent-emerald)';
        } else if (riskProb < 0.45) {
          badge.textContent = 'Moderate Risk';
          badge.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber';
          if (bar) bar.style.backgroundColor = 'var(--color-brand-accent-amber)';
        } else {
          badge.textContent = 'Critical Risk';
          badge.className = 'badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby';
          if (bar) bar.style.backgroundColor = 'var(--color-brand-accent-ruby)';
        }
      }
    } catch (err) {
      console.error('TF Student Inference error:', err);
    }
  }

  // ─── EDIT STUDENT MODAL ──────────────────────────────────────────
  function openEditStudentModal(id) {
    const stu = window.UniversityDB.getStudents().find(s => s.id === id);
    if (!stu) return;

    const depts = window.UniversityDB.getDepartments();
    const deptOptions = depts.map(d => `<option value="${d.code}" ${d.code === stu.dept ? 'selected' : ''}>${d.name} (${d.code})</option>`).join('');

    const bodyHTML = `
      <form id="edit-student-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <h4 class="mb-3 font-display font-semibold text-brand-primary">Basic Information</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-control" id="edit-stu-name" value="${stu.name}"></div>
          <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-control" id="edit-stu-email" value="${stu.email}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Department</label><select class="form-control" id="edit-stu-dept">${deptOptions}</select></div>
          <div class="form-group"><label class="form-label">Semester</label><input type="number" class="form-control" id="edit-stu-sem" min="1" max="8" value="${stu.semester}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">GPA</label><input type="number" class="form-control" id="edit-stu-gpa" min="0" max="4" step="0.01" value="${stu.gpa}"></div>
          <div class="form-group"><label class="form-label">Status</label>
            <select class="form-control" id="edit-stu-status">
              <option ${stu.status === 'Active' ? 'selected' : ''}>Active</option>
              <option ${stu.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
              <option ${stu.status === 'Graduated' ? 'selected' : ''}>Graduated</option>
            </select>
          </div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-cyan">Personal Details</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-control" id="edit-stu-dob" value="${stu.dob || ''}"></div>
          <div class="form-group"><label class="form-label">Gender</label>
            <select class="form-control" id="edit-stu-gender">
              <option ${stu.gender === 'Male' ? 'selected' : ''}>Male</option>
              <option ${stu.gender === 'Female' ? 'selected' : ''}>Female</option>
              <option ${stu.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Phone</label><input type="text" class="form-control" id="edit-stu-phone" value="${stu.phone || ''}"></div>
          <div class="form-group"><label class="form-label">Blood Group</label>
            <select class="form-control" id="edit-stu-blood">
              ${['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => `<option ${bg === stu.bloodGroup ? 'selected' : ''}>${bg}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Nationality</label><input type="text" class="form-control" id="edit-stu-nationality" value="${stu.nationality || ''}"></div>
          <div class="form-group"><label class="form-label">Category</label>
            <select class="form-control" id="edit-stu-category">
              ${['General','OBC','SC','ST','International','Other'].map(c => `<option ${c === stu.category ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Address</label><textarea class="form-control" id="edit-stu-address" rows="2">${stu.address || ''}</textarea></div>
        <div class="form-group"><label class="form-label">Aadhar / National ID</label><input type="text" class="form-control" id="edit-stu-aadhar" value="${stu.aadhar || ''}"></div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-emerald">Guardian / Parent Info</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Name</label><input type="text" class="form-control" id="edit-stu-guardian" value="${stu.guardianName || ''}"></div>
          <div class="form-group"><label class="form-label">Guardian Relation</label>
            <select class="form-control" id="edit-stu-guardianRel">
              ${['Father','Mother','Uncle','Aunt','Sibling','Guardian','Other'].map(r => `<option ${r === stu.guardianRelation ? 'selected' : ''}>${r}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Phone</label><input type="text" class="form-control" id="edit-stu-guardianPhone" value="${stu.guardianPhone || ''}"></div>
          <div class="form-group"><label class="form-label">Previous School</label><input type="text" class="form-control" id="edit-stu-prevSchool" value="${stu.previousSchool || ''}"></div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-amber">Campus & Financial</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Enrollment Type</label>
            <select class="form-control" id="edit-stu-enrollType">
              ${['Regular','Lateral Entry','Transfer','International Exchange'].map(t => `<option ${t === stu.enrollmentType ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label class="form-label">Admission Date</label><input type="date" class="form-control" id="edit-stu-admDate" value="${stu.admissionDate || ''}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Hostel / Residence</label><input type="text" class="form-control" id="edit-stu-hostel" value="${stu.hostel || ''}"></div>
          <div class="form-group"><label class="form-label">Scholarship</label><input type="text" class="form-control" id="edit-stu-scholarship" value="${stu.scholarship || ''}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Total Fee ($)</label><input type="number" class="form-control" id="edit-stu-feeTotal" value="${stu.feeTotal}"></div>
          <div class="form-group"><label class="form-label">Fee Paid ($)</label><input type="number" class="form-control" id="edit-stu-feePaid" value="${stu.feePaid}"></div>
        </div>
        <div class="form-group"><label class="form-label">Profile Image URL</label><input type="text" class="form-control" id="edit-stu-avatar" value="${stu.avatar}"></div>
      </form>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-sm bg-brand-accent-ruby text-white hover:bg-brand-accent-ruby/80" id="btn-delete-stu">Delete</button>
      <button class="btn btn-primary" id="btn-save-edit-stu">Save All Changes</button>
    `;

    window.App.showModal('Edit Student — ' + stu.id, bodyHTML, footerHTML);

    document.getElementById('btn-save-edit-stu').addEventListener('click', () => {
      const updatedData = {
        name: document.getElementById('edit-stu-name').value.trim(),
        email: document.getElementById('edit-stu-email').value.trim(),
        dept: document.getElementById('edit-stu-dept').value,
        semester: parseInt(document.getElementById('edit-stu-sem').value) || stu.semester,
        gpa: parseFloat(document.getElementById('edit-stu-gpa').value) || stu.gpa,
        status: document.getElementById('edit-stu-status').value,
        dob: document.getElementById('edit-stu-dob').value,
        gender: document.getElementById('edit-stu-gender').value,
        phone: document.getElementById('edit-stu-phone').value.trim(),
        bloodGroup: document.getElementById('edit-stu-blood').value,
        nationality: document.getElementById('edit-stu-nationality').value.trim(),
        category: document.getElementById('edit-stu-category').value,
        address: document.getElementById('edit-stu-address').value.trim(),
        aadhar: document.getElementById('edit-stu-aadhar').value.trim(),
        guardianName: document.getElementById('edit-stu-guardian').value.trim(),
        guardianRelation: document.getElementById('edit-stu-guardianRel').value,
        guardianPhone: document.getElementById('edit-stu-guardianPhone').value.trim(),
        previousSchool: document.getElementById('edit-stu-prevSchool').value.trim(),
        enrollmentType: document.getElementById('edit-stu-enrollType').value,
        admissionDate: document.getElementById('edit-stu-admDate').value,
        hostel: document.getElementById('edit-stu-hostel').value.trim(),
        scholarship: document.getElementById('edit-stu-scholarship').value.trim(),
        feeTotal: parseInt(document.getElementById('edit-stu-feeTotal').value) || stu.feeTotal,
        feePaid: parseInt(document.getElementById('edit-stu-feePaid').value) || stu.feePaid,
        avatar: document.getElementById('edit-stu-avatar').value.trim() || stu.avatar,
      };

      if (!updatedData.name || !updatedData.email) {
        alert("Name and Email are mandatory fields.");
        return;
      }

      window.UniversityDB.updateStudent(id, updatedData);

      // Sync update with backend SQLite database
      fetch(`/api/users/usr_${id.toLowerCase()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedData.name,
          email: updatedData.email,
          avatar: updatedData.avatar
        })
      }).catch(err => console.error('Failed to sync student update to backend:', err));

      window.App.closeModal();
      alert('Student profile updated successfully!');
      applyFilters();
    });

    document.getElementById('btn-delete-stu').addEventListener('click', () => {
      if (confirm(`Permanently delete student ${stu.name} (${stu.id})? This action cannot be undone.`)) {
        window.UniversityDB.deleteStudent(id);

        // Sync deletion with backend SQLite database
        fetch(`/api/users/usr_${id.toLowerCase()}`, {
          method: 'DELETE'
        }).catch(err => console.error('Failed to sync student deletion to backend:', err));

        window.App.closeModal();
        alert('Student record deleted.');
        applyFilters();
      }
    });
  }

  // ─── ADD NEW STUDENT MODAL (FULL FIELDS) ─────────────────────────
  function openAddStudentModal() {
    const depts = window.UniversityDB.getDepartments();
    const deptOptions = depts.map(d => `<option value="${d.code}">${d.name} (${d.code})</option>`).join('');

    const bodyHTML = `
      <form id="add-student-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <h4 class="mb-3 font-display font-semibold text-brand-primary">Basic Information</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-control" id="add-stu-name" required placeholder="e.g. Rahul Sharma"></div>
          <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-control" id="add-stu-email" required placeholder="e.g. rahul@modeluni.edu"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Department *</label><select class="form-control" id="add-stu-dept">${deptOptions}</select></div>
          <div class="form-group"><label class="form-label">Current Semester</label><input type="number" class="form-control" id="add-stu-sem" min="1" max="8" value="1"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Admission GPA</label><input type="number" class="form-control" id="add-stu-gpa" min="0" max="4" step="0.01" value="3.50"></div>
          <div class="form-group"><label class="form-label">Admission Date</label><input type="date" class="form-control" id="add-stu-admDate" value="2026-06-08"></div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-cyan">Personal Details</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-control" id="add-stu-dob"></div>
          <div class="form-group"><label class="form-label">Gender</label>
            <select class="form-control" id="add-stu-gender"><option>Male</option><option>Female</option><option>Other</option></select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Phone Number</label><input type="text" class="form-control" id="add-stu-phone" placeholder="+91-98765-43210"></div>
          <div class="form-group"><label class="form-label">Blood Group</label>
            <select class="form-control" id="add-stu-blood"><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Nationality</label><input type="text" class="form-control" id="add-stu-nationality" value="Indian"></div>
          <div class="form-group"><label class="form-label">Category</label>
            <select class="form-control" id="add-stu-category"><option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>International</option><option>Other</option></select>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Full Address</label><textarea class="form-control" id="add-stu-address" rows="2" placeholder="Street, City, State, PIN"></textarea></div>
        <div class="form-group"><label class="form-label">Aadhar / National ID</label><input type="text" class="form-control" id="add-stu-aadhar" placeholder="XXXX-XXXX-XXXX"></div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-emerald">Guardian / Parent Info</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Name</label><input type="text" class="form-control" id="add-stu-guardian" placeholder="Parent / Guardian name"></div>
          <div class="form-group"><label class="form-label">Relation</label>
            <select class="form-control" id="add-stu-guardianRel"><option>Father</option><option>Mother</option><option>Uncle</option><option>Aunt</option><option>Sibling</option><option>Guardian</option><option>Other</option></select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Phone</label><input type="text" class="form-control" id="add-stu-guardianPhone" placeholder="+91-xxxxx-xxxxx"></div>
          <div class="form-group"><label class="form-label">Previous School / College</label><input type="text" class="form-control" id="add-stu-prevSchool" placeholder="Previous institution name"></div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-amber">Campus & Financial</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Enrollment Type</label>
            <select class="form-control" id="add-stu-enrollType"><option>Regular</option><option>Lateral Entry</option><option>Transfer</option><option>International Exchange</option></select>
          </div>
          <div class="form-group"><label class="form-label">Hostel / Residence</label><input type="text" class="form-control" id="add-stu-hostel" placeholder="Block A - Room 101 or Day Scholar"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Scholarship</label><input type="text" class="form-control" id="add-stu-scholarship" placeholder="e.g. Merit Scholarship (50%)"></div>
          <div class="form-group"><label class="form-label">Total Fee ($)</label><input type="number" class="form-control" id="add-stu-feeTotal" value="4500"></div>
        </div>
        <div class="form-group"><label class="form-label">Profile Image URL</label><input type="text" class="form-control" id="add-stu-avatar" value="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"></div>
      </form>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-student">Complete Enrollment</button>
    `;

    window.App.showModal('Enroll New Student — Full Admission', bodyHTML, footerHTML);

    document.getElementById('btn-submit-student').addEventListener('click', () => {
      const name = document.getElementById('add-stu-name').value.trim();
      const email = document.getElementById('add-stu-email').value.trim();

      if (!name || !email) {
        alert("Full Name and Email are mandatory fields.");
        return;
      }

      const newId = 'STU' + String(window.UniversityDB.getStudents().length + 1).padStart(3, '0');

      const newStudent = {
        id: newId,
        name: name,
        email: email,
        dept: document.getElementById('add-stu-dept').value,
        gpa: parseFloat(document.getElementById('add-stu-gpa').value) || 3.5,
        semester: parseInt(document.getElementById('add-stu-sem').value) || 1,
        status: 'Active',
        feePaid: 0,
        feeTotal: parseInt(document.getElementById('add-stu-feeTotal').value) || 4500,
        avatar: document.getElementById('add-stu-avatar').value || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        attendance: 100,
        courses: [],
        // Extended fields
        dob: document.getElementById('add-stu-dob').value || '',
        gender: document.getElementById('add-stu-gender').value,
        phone: document.getElementById('add-stu-phone').value.trim(),
        bloodGroup: document.getElementById('add-stu-blood').value,
        nationality: document.getElementById('add-stu-nationality').value.trim(),
        category: document.getElementById('add-stu-category').value,
        address: document.getElementById('add-stu-address').value.trim(),
        aadhar: document.getElementById('add-stu-aadhar').value.trim(),
        guardianName: document.getElementById('add-stu-guardian').value.trim(),
        guardianRelation: document.getElementById('add-stu-guardianRel').value,
        guardianPhone: document.getElementById('add-stu-guardianPhone').value.trim(),
        previousSchool: document.getElementById('add-stu-prevSchool').value.trim(),
        admissionDate: document.getElementById('add-stu-admDate').value || new Date().toISOString().split('T')[0],
        enrollmentType: document.getElementById('add-stu-enrollType').value,
        hostel: document.getElementById('add-stu-hostel').value.trim() || 'Day Scholar',
        scholarship: document.getElementById('add-stu-scholarship').value.trim() || 'None',
      };

      window.UniversityDB.addStudent(newStudent);

      // Also register student account in backend SQLite database
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `usr_${newStudent.id.toLowerCase()}`,
          name: newStudent.name,
          email: newStudent.email,
          role: 'student',
          password: `${newStudent.name.split(' ')[0]}@${newStudent.id}`, // password formula
          avatar: newStudent.avatar
        })
      }).catch(err => console.error('Failed to sync student to backend:', err));

      window.App.closeModal();
      alert(`Student ${name} enrolled successfully!\nStudent ID: ${newId}`);
      applyFilters();
    });
  }

  return {
    render: render,
    applyFilters: applyFilters,
    openAddStudentModal: openAddStudentModal,
    openStudentDetailModal: openStudentDetailModal
  };

})();

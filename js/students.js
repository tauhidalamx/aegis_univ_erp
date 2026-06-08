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
      <div class="card animate-fade-in delay-1" style="margin-top: 24px;">
        <div style="display:grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap:16px; align-items: end;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Search Name / ID / Phone</label>
            <input type="text" class="form-control" placeholder="e.g. Alex Rivera, STU001, +1-555" id="search-name">
          </div>
          <div class="form-group" style="margin-bottom:0;">
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
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Status</label>
            <select class="form-control" id="filter-status">
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
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
      <div class="table-container animate-fade-in delay-2" style="margin-top: 24px;">
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
              <th style="text-align: right;">Actions</th>
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
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; color:var(--text-muted); padding:32px;">No matching student profiles found.</td></tr>';
      return;
    }

    tbody.innerHTML = data.map(stu => {
      let statusClass = 'badge-success';
      if (stu.status === 'On Leave') statusClass = 'badge-warning';
      if (stu.status === 'Graduated') statusClass = 'badge-info';

      let attendClass = 'text-accent-emerald';
      if (stu.attendance < 85) attendClass = 'text-accent-amber';
      if (stu.attendance < 75) attendClass = 'text-accent-ruby';

      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${stu.avatar}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:1px solid var(--border);">
              <div>
                <div style="font-weight:600;">${stu.name}</div>
                <div style="font-size:0.7rem; color:var(--text-muted);">${stu.email}</div>
              </div>
            </div>
          </td>
          <td><code>${stu.id}</code></td>
          <td>${stu.dept}</td>
          <td>Sem ${stu.semester}</td>
          <td style="font-weight:600;">${stu.gpa.toFixed(2)}</td>
          <td class="${attendClass}" style="font-weight:600;">${stu.attendance}%</td>
          <td style="font-size:0.8rem; color:var(--text-muted);">${stu.phone || '—'}</td>
          <td><span class="badge ${statusClass}">${stu.status}</span></td>
          <td style="text-align:right;">
            <div style="display:flex; gap:6px; justify-content:flex-end;">
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
      <div style="display:flex; gap:20px; align-items:flex-start; margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid var(--border);">
        <img src="${stu.avatar}" style="width:90px; height:90px; border-radius:50%; object-fit:cover; border:3px solid var(--primary); flex-shrink:0;">
        <div style="flex:1;">
          <h3 style="font-family:var(--font-display); margin:0 0 4px 0;">${stu.name}</h3>
          <p style="color:var(--text-muted); font-size:0.85rem; margin:0;">Student ID: <code>${stu.id}</code> &nbsp;|&nbsp; ${stu.dept} Department</p>
          <p style="color:var(--text-subtle); font-size:0.8rem; margin:4px 0 0 0;">${stu.email} &nbsp;•&nbsp; ${stu.phone || 'No phone'}</p>
          <div style="margin-top:8px; display:flex; gap:8px;">
            <span class="badge ${stu.status === 'Active' ? 'badge-success' : (stu.status === 'On Leave' ? 'badge-warning' : 'badge-info')}">${stu.status}</span>
            <span class="badge" style="background:var(--bg-tertiary); color:var(--text-main);">Sem ${stu.semester}</span>
            ${stu.scholarship && stu.scholarship !== 'None' ? `<span class="badge badge-info">${stu.scholarship}</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Personal Information Grid -->
      <h4 style="margin-bottom:12px; font-family:var(--font-display); color:var(--primary);">Personal Information</h4>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 24px; margin-bottom:24px; font-size:0.875rem;">
        <div><span style="color:var(--text-muted);">Date of Birth:</span> <strong>${stu.dob || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Gender:</span> <strong>${stu.gender || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Blood Group:</span> <strong>${stu.bloodGroup || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Nationality:</span> <strong>${stu.nationality || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Category:</span> <strong>${stu.category || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Aadhar / National ID:</span> <strong>${stu.aadhar || '—'}</strong></div>
        <div style="grid-column:1/-1;"><span style="color:var(--text-muted);">Address:</span> <strong>${stu.address || '—'}</strong></div>
      </div>

      <!-- Guardian Information -->
      <h4 style="margin-bottom:12px; font-family:var(--font-display); color:var(--accent-cyan);">Guardian / Parent Details</h4>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px 24px; margin-bottom:24px; font-size:0.875rem;">
        <div><span style="color:var(--text-muted);">Guardian Name:</span> <strong>${stu.guardianName || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Relation:</span> <strong>${stu.guardianRelation || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Guardian Phone:</span> <strong>${stu.guardianPhone || '—'}</strong></div>
        <div><span style="color:var(--text-muted);">Previous School:</span> <strong>${stu.previousSchool || '—'}</strong></div>
      </div>

      <!-- Academic & Financial Summary -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
        <div class="card" style="padding:16px; background:var(--bg-tertiary);">
          <h4 style="margin-bottom:10px; font-size:0.9rem; color:var(--accent-emerald);">📚 Academic Record</h4>
          <div style="font-size:0.85rem; display:flex; flex-direction:column; gap:6px;">
            <div>CGPA: <strong>${stu.gpa.toFixed(2)}</strong></div>
            <div>Attendance: <strong class="${stu.attendance < 75 ? 'text-accent-ruby' : (stu.attendance < 85 ? 'text-accent-amber' : 'text-accent-emerald')}">${stu.attendance}%</strong></div>
            <div>Admission Date: <strong>${stu.admissionDate || '—'}</strong></div>
            <div>Enrollment Type: <strong>${stu.enrollmentType || 'Regular'}</strong></div>
          </div>
        </div>
        <div class="card" style="padding:16px; background:var(--bg-tertiary);">
          <h4 style="margin-bottom:10px; font-size:0.9rem; color:var(--accent-amber);">💰 Financial Summary</h4>
          <div style="font-size:0.85rem; display:flex; flex-direction:column; gap:6px;">
            <div>Total Fees: <strong>$${stu.feeTotal.toLocaleString()}</strong></div>
            <div>Paid: <strong class="text-accent-emerald">$${stu.feePaid.toLocaleString()}</strong></div>
            <div>Balance: <strong class="${outstanding > 0 ? 'text-accent-ruby' : 'text-accent-emerald'}">$${outstanding.toLocaleString()}</strong></div>
            <div>Hostel: <strong>${stu.hostel || 'Day Scholar'}</strong></div>
          </div>
        </div>
      </div>

      <!-- Enrolled Courses -->
      <h4 style="margin-bottom:12px; font-family:var(--font-display); color:var(--primary);">Enrolled Courses</h4>
      <div class="table-container" style="margin-bottom:0;">
        <table>
          <thead>
            <tr><th>Code</th><th>Title</th><th>Credits</th><th>Instructor</th></tr>
          </thead>
          <tbody>
            ${stu.courses.length === 0 ? '<tr><td colspan="4" style="text-align:center;color:var(--text-muted)">No active course enrollments.</td></tr>' :
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
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>
      <button class="btn btn-primary" id="btn-modal-edit-stu">Edit Profile</button>
    `;

    window.App.showModal('Student Full Profile', bodyHTML, footerHTML);

    document.getElementById('btn-modal-edit-stu').addEventListener('click', () => {
      window.App.closeModal();
      setTimeout(() => openEditStudentModal(id), 200);
    });
  }

  // ─── EDIT STUDENT MODAL ──────────────────────────────────────────
  function openEditStudentModal(id) {
    const stu = window.UniversityDB.getStudents().find(s => s.id === id);
    if (!stu) return;

    const depts = window.UniversityDB.getDepartments();
    const deptOptions = depts.map(d => `<option value="${d.code}" ${d.code === stu.dept ? 'selected' : ''}>${d.name} (${d.code})</option>`).join('');

    const bodyHTML = `
      <form id="edit-student-form" style="max-height:60vh; overflow-y:auto; padding-right:8px;">
        <h4 style="margin-bottom:12px; font-family:var(--font-display); color:var(--primary);">Basic Information</h4>
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

        <h4 style="margin:20px 0 12px; font-family:var(--font-display); color:var(--accent-cyan);">Personal Details</h4>
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

        <h4 style="margin:20px 0 12px; font-family:var(--font-display); color:var(--accent-emerald);">Guardian / Parent Info</h4>
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

        <h4 style="margin:20px 0 12px; font-family:var(--font-display); color:var(--accent-amber);">Campus & Financial</h4>
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
      <button class="btn btn-sm" style="background:var(--accent-ruby); color:#fff;" id="btn-delete-stu">Delete</button>
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
      window.App.closeModal();
      alert('Student profile updated successfully!');
      applyFilters();
    });

    document.getElementById('btn-delete-stu').addEventListener('click', () => {
      if (confirm(`Permanently delete student ${stu.name} (${stu.id})? This action cannot be undone.`)) {
        window.UniversityDB.deleteStudent(id);
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
      <form id="add-student-form" style="max-height:60vh; overflow-y:auto; padding-right:8px;">
        <h4 style="margin-bottom:12px; font-family:var(--font-display); color:var(--primary);">Basic Information</h4>
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

        <h4 style="margin:20px 0 12px; font-family:var(--font-display); color:var(--accent-cyan);">Personal Details</h4>
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

        <h4 style="margin:20px 0 12px; font-family:var(--font-display); color:var(--accent-emerald);">Guardian / Parent Info</h4>
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

        <h4 style="margin:20px 0 12px; font-family:var(--font-display); color:var(--accent-amber);">Campus & Financial</h4>
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
      window.App.closeModal();
      alert(`Student ${name} enrolled successfully!\nStudent ID: ${newId}`);
      applyFilters();
    });
  }

  return {
    render: render,
    applyFilters: applyFilters,
    openAddStudentModal: openAddStudentModal
  };

})();

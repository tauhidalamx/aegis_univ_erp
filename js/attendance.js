// Attendance & Timetable Module
window.attendanceView = (function() {
  
  function render(container) {
    const courses = window.UniversityDB.getCourses().filter(c => c.status === 'Active');
    const courseOptions = courses.map(c => `<option value="${c.code}">${c.code} - ${c.title}</option>`).join('');

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Attendance & Weekly Schedule</h1>
          <p>Mark class attendances, view department timetables, and monitor student academic participation.</p>
        </div>
      </div>

      <div class="grid-2 animate-fade-in delay-1" style="margin-top: 24px;">
        
        <!-- Attendance Sheet Panel -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family: var(--font-display);">Register Attendance</h3>
          
          <div class="grid-2" style="grid-template-columns: 1.5fr 1fr; gap:16px; margin-bottom: 20px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Select Course</label>
              <select class="form-control" id="attendance-course-select">
                ${courseOptions}
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Session Date</label>
              <input type="date" class="form-control" id="attendance-date" value="2026-06-08">
            </div>
          </div>

          <div style="max-height: 380px; overflow-y:auto; border: 1px solid var(--border); border-radius: var(--radius-md); background-color: var(--bg-primary); padding: 12px; margin-bottom: 20px;">
            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="padding: 10px; font-size:0.75rem;">Student Name</th>
                  <th style="padding: 10px; font-size:0.75rem; text-align:center;">Mark Attendance</th>
                </tr>
              </thead>
              <tbody id="attendance-student-list">
                <!-- Loaded dynamically on course change -->
              </tbody>
            </table>
          </div>

          <button class="btn btn-primary" id="btn-save-attendance" style="width:100%;">Commit Session Attendance</button>
        </div>

        <!-- Weekly Timetable Grid -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family: var(--font-display);">Campus Master Schedule</h3>
          <p style="color:var(--text-muted); font-size: 0.85rem; margin-bottom:16px;">Standard working hours block (Monday - Friday).</p>
          
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); background: rgba(99, 102, 241, 0.04); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color: var(--primary);">Monday (09:00 AM - 11:00 AM)</strong>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">CS101 - Intro Programming (Hall A)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>
            
            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color: var(--accent-cyan);">Tuesday (11:30 AM - 01:30 PM)</strong>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">EE201 - Signals and Systems (Hall B)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>

            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color: var(--accent-amber);">Wednesday (02:00 PM - 04:00 PM)</strong>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">ME102 - Engineering Thermodynamics (Hall C)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>

            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color: var(--primary);">Thursday (09:00 AM - 11:00 AM)</strong>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">CS202 - Data Structures (Lab 3)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>

            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color: var(--accent-emerald);">Friday (10:00 AM - 12:00 PM)</strong>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">BI101 - Biotechnology Basics (BI Lab)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>
          </div>
        </div>

      </div>
    `;

    const courseSelect = document.getElementById('attendance-course-select');
    if (courseSelect) {
      courseSelect.addEventListener('change', () => {
        loadStudentsForCourse(courseSelect.value);
      });
      // Initial load
      loadStudentsForCourse(courseSelect.value);
    }

    document.getElementById('btn-save-attendance').addEventListener('click', () => {
      const selectedCourse = courseSelect.value;
      const sessionDate = document.getElementById('attendance-date').value;
      const checkboxes = document.querySelectorAll('.attendance-checkbox');
      
      let presentCount = 0;
      checkboxes.forEach(cb => {
        const studentId = cb.getAttribute('data-id');
        const isPresent = cb.checked;
        if (isPresent) presentCount++;
        
        // Simulating updating attendance scores in local state
        const student = window.UniversityDB.getStudents().find(s => s.id === studentId);
        if (student) {
          // Add a tiny random variance or simple calculation to modify attendance score
          let currentAttend = student.attendance;
          if (isPresent && currentAttend < 100) {
            student.attendance = Math.min(100, Math.round(currentAttend + (100 - currentAttend) * 0.05));
          } else if (!isPresent && currentAttend > 0) {
            student.attendance = Math.max(0, Math.round(currentAttend - currentAttend * 0.05));
          }
        }
      });

      alert(`Attendance recorded for ${sessionDate}! Course: ${selectedCourse}.\n${presentCount} students marked present.`);
    });
  }

  function loadStudentsForCourse(courseCode) {
    const tbody = document.getElementById('attendance-student-list');
    if (!tbody) return;

    // Filter students enrolled in this course code or match department
    const students = window.UniversityDB.getStudents();
    const course = window.UniversityDB.getCourses().find(c => c.code === courseCode);
    if (!course) return;

    // Find students whose courses array contains this code, or fallback to department students
    let enrolledStudents = students.filter(s => s.courses.includes(courseCode));
    if (enrolledStudents.length === 0) {
      // Fallback: load students of same department
      enrolledStudents = students.filter(s => s.dept === course.dept);
    }

    if (enrolledStudents.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="2" style="text-align:center; color:var(--text-muted); padding:16px;">No students enrolled in this department section.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = enrolledStudents.map(s => `
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 10px; font-size:0.875rem;">
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="${s.avatar}" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
            <div>
              <strong>${s.name}</strong> <code style="font-size:0.7rem;">${s.id}</code>
            </div>
          </div>
        </td>
        <td style="padding: 10px; text-align:center;">
          <input type="checkbox" class="attendance-checkbox" data-id="${s.id}" checked style="width:16px; height:16px; cursor:pointer; accent-color: var(--primary);">
        </td>
      </tr>
    `).join('');
  }

  return {
    render: render
  };

})();

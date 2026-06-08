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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-fade-in delay-1">
        
        <!-- Attendance Sheet Panel -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-bold">Register Attendance</h3>
          
          <div class="grid grid-cols-[1.5fr_1fr] gap-4 mb-5 max-sm:grid-cols-1">
            <div class="form-group mb-0">
              <label class="form-label">Select Course</label>
              <select class="form-control" id="attendance-course-select">
                ${courseOptions}
              </select>
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Session Date</label>
              <input type="date" class="form-control" id="attendance-date" value="2026-06-08">
            </div>
          </div>

          <div class="max-h-[380px] overflow-y-auto border border-brand-border rounded-xl bg-brand-bg-primary p-3 mb-5">
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th class="p-2.5 text-[0.75rem]">Student Name</th>
                  <th class="p-2.5 text-[0.75rem] text-center">Mark Attendance</th>
                </tr>
              </thead>
              <tbody id="attendance-student-list">
                <!-- Loaded dynamically on course change -->
              </tbody>
            </table>
          </div>

          <button class="btn btn-primary w-full" id="btn-save-attendance">Commit Session Attendance</button>
        </div>

        <!-- Weekly Timetable Grid -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-bold">Campus Master Schedule</h3>
          <p class="text-brand-text-muted text-[0.85rem] mb-4">Standard working hours block (Monday - Friday).</p>
          
          <div class="flex flex-col gap-3">
            <div class="p-3 border border-brand-border rounded-xl flex justify-between items-center bg-brand-primary/5">
              <div>
                <strong class="text-brand-primary">Monday (09:00 AM - 11:00 AM)</strong>
                <div class="text-[0.8rem] text-brand-text-muted mt-0.5">CS101 - Intro Programming (Hall A)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>
            
            <div class="p-3 border border-brand-border rounded-xl flex justify-between items-center">
              <div>
                <strong class="text-brand-accent-cyan">Tuesday (11:30 AM - 01:30 PM)</strong>
                <div class="text-[0.8rem] text-brand-text-muted mt-0.5">EE201 - Signals and Systems (Hall B)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>

            <div class="p-3 border border-brand-border rounded-xl flex justify-between items-center">
              <div>
                <strong class="text-brand-accent-amber">Wednesday (02:00 PM - 04:00 PM)</strong>
                <div class="text-[0.8rem] text-brand-text-muted mt-0.5">ME102 - Engineering Thermodynamics (Hall C)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>

            <div class="p-3 border border-brand-border rounded-xl flex justify-between items-center">
              <div>
                <strong class="text-brand-primary">Thursday (09:00 AM - 11:00 AM)</strong>
                <div class="text-[0.8rem] text-brand-text-muted mt-0.5">CS202 - Data Structures (Lab 3)</div>
              </div>
              <span class="badge badge-info">Active</span>
            </div>

            <div class="p-3 border border-brand-border rounded-xl flex justify-between items-center">
              <div>
                <strong class="text-brand-accent-emerald">Friday (10:00 AM - 12:00 PM)</strong>
                <div class="text-[0.8rem] text-brand-text-muted mt-0.5">BI101 - Biotechnology Basics (BI Lab)</div>
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
          <td colspan="2" class="text-center text-brand-text-muted p-4">No students enrolled in this department section.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = enrolledStudents.map(s => `
      <tr class="border-b border-brand-border">
        <td class="p-2.5 text-sm">
          <div class="flex items-center gap-2">
            <img src="${s.avatar}" class="w-7 h-7 rounded-full object-cover">
            <div>
              <strong>${s.name}</strong> <code class="text-[0.7rem]">${s.id}</code>
            </div>
          </div>
        </td>
        <td class="p-2.5 text-center">
          <input type="checkbox" class="attendance-checkbox w-4 h-4 cursor-pointer accent-brand-primary" data-id="${s.id}" checked>
        </td>
      </tr>
    `).join('');
  }

  return {
    render: render
  };

})();

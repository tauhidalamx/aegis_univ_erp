// Courses & Curriculum Module
window.coursesView = (function() {
  
  function render(container) {
    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Course Catalog</h1>
          <p>Browse semester curricula, assign credits, verify course capacities, and check active sections.</p>
        </div>
        <button class="btn btn-primary" id="btn-add-course">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          Create New Course
        </button>
      </div>

      <!-- Search Filters -->
      <div class="card animate-fade-in delay-1" style="margin-top: 24px;">
        <div class="grid-2" style="grid-template-columns: 2fr 1fr; align-items: end;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Search Courses</label>
            <input type="text" class="form-control" placeholder="Search by course code, title, or instructor..." id="course-search">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Department Stream</label>
            <select class="form-control" id="course-dept-filter">
              <option value="ALL">All Departments</option>
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Administration</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Course Cards Container -->
      <div class="grid-3 animate-fade-in delay-2" style="margin-top: 24px;" id="courses-grid-body">
        <!-- Loaded dynamically -->
      </div>
    `;

    document.getElementById('course-search').addEventListener('input', applyFilters);
    document.getElementById('course-dept-filter').addEventListener('change', applyFilters);
    document.getElementById('btn-add-course').addEventListener('click', openAddCourseModal);

    applyFilters();
  }

  function applyFilters() {
    const searchVal = document.getElementById('course-search').value.toLowerCase().trim();
    const deptVal = document.getElementById('course-dept-filter').value;

    const courses = window.UniversityDB.getCourses();
    const filtered = courses.filter(c => {
      const instructor = window.UniversityDB.getFaculty().find(f => f.id === c.facultyId);
      const instructorName = instructor ? instructor.name.toLowerCase() : '';
      
      const matchSearch = c.code.toLowerCase().includes(searchVal) || c.title.toLowerCase().includes(searchVal) || instructorName.includes(searchVal);
      const matchDept = deptVal === 'ALL' || c.dept === deptVal;
      return matchSearch && matchDept;
    });

    populateGrid(filtered);
  }

  function populateGrid(data) {
    const container = document.getElementById('courses-grid-body');
    if (!container) return;

    if (data.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 32px;">
          No matching courses found in the current academic calendar catalog.
        </div>
      `;
      return;
    }

    container.innerHTML = data.map(c => {
      const instructor = window.UniversityDB.getFaculty().find(f => f.id === c.facultyId);
      const instructorName = instructor ? instructor.name : 'Unassigned';
      const fillPercentage = Math.min((c.enrolledCount / c.maxEnrollment) * 100, 100);
      
      let fillClass = 'bg-accent-emerald';
      if (fillPercentage > 90) fillClass = 'text-accent-ruby';
      else if (fillPercentage > 75) fillClass = 'text-accent-amber';

      return `
        <div class="card" style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <code style="font-size: 1.1rem; color: var(--primary); font-weight:700;">${c.code}</code>
            <span class="badge badge-info">${c.credits} Credits</span>
          </div>
          
          <div>
            <h4 style="margin: 0 0 6px 0; font-family: var(--font-display); font-size:1.1rem;">${c.title}</h4>
            <span style="font-size:0.75rem; color:var(--text-muted);">Instructor: <strong>${instructorName}</strong></span>
          </div>

          <!-- Enrollment stats progress -->
          <div>
            <div style="display:flex; justify-content:space-between; font-size: 0.8rem; margin-bottom:4px;">
              <span>Enrolled Seats</span>
              <strong class="${fillClass}">${c.enrolledCount} / ${c.maxEnrollment}</strong>
            </div>
            <div style="height:6px; background-color: var(--bg-tertiary); border-radius:3px; overflow:hidden;">
              <div style="width: ${fillPercentage}%; height:100%; background-color: var(--primary);"></div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:10px; border-top:1px solid var(--border);">
            <span style="font-size:0.8rem; color:var(--text-subtle);">Department: ${c.dept}</span>
            <button class="btn btn-secondary btn-sm syllabus-btn" data-code="${c.code}">Syllabus</button>
          </div>
        </div>
      `;
    }).join('');

    // Bind syllabus buttons
    container.querySelectorAll('.syllabus-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        openSyllabusModal(code);
      });
    });
  }

  function openSyllabusModal(code) {
    const courses = window.UniversityDB.getCourses();
    const c = courses.find(course => course.code === code);
    if (!c) return;

    const instructor = window.UniversityDB.getFaculty().find(f => f.id === c.facultyId);
    const instructorName = instructor ? instructor.name : 'TBD';

    const bodyHTML = `
      <h3 style="font-family: var(--font-display); margin-bottom:8px;">${c.title}</h3>
      <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:20px;">Code: <code>${c.code}</code> | Dept: ${c.dept} | Credits: ${c.credits}</p>
      
      <h4 style="margin-bottom:10px;">Course Description</h4>
      <p style="color:var(--text-main); font-size:0.9rem; line-height:1.6; margin-bottom:20px;">
        This academic course covers modern concepts of ${c.title.toLowerCase()} inside the college syllabus. Students will understand core practices, theoretical bounds, build assignments, and review real-world implementations led by ${instructorName}.
      </p>

      <h4 style="margin-bottom:10px;">Weekly Syllabus Outline</h4>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div style="padding:10px; background-color:var(--bg-tertiary); border-radius:var(--radius-sm);">
          <strong>Weeks 1-4:</strong> Fundamental Theories & Systems Overview.
        </div>
        <div style="padding:10px; background-color:var(--bg-tertiary); border-radius:var(--radius-sm);">
          <strong>Weeks 5-8:</strong> Core Architectural Implementations & Lab Projects.
        </div>
        <div style="padding:10px; background-color:var(--bg-tertiary); border-radius:var(--radius-sm);">
          <strong>Weeks 9-12:</strong> Advanced Topics, Integrations & Final Seminar Review.
        </div>
      </div>
    `;

    window.App.showModal('Academic Course Syllabus', bodyHTML, '<button class="btn btn-secondary" onclick="window.App.closeModal()">Close Window</button>');
  }

  function openAddCourseModal() {
    const facultyOptions = window.UniversityDB.getFaculty().map(f => `<option value="${f.id}">${f.name}</option>`).join('');

    const bodyHTML = `
      <div class="form-group">
        <label class="form-label">Course Title</label>
        <input type="text" class="form-control" id="add-c-title" placeholder="e.g. Distributed Operating Systems" required>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Course Code</label>
          <input type="text" class="form-control" id="add-c-code" placeholder="e.g. CS420" required>
        </div>
        <div class="form-group">
          <label class="form-label">Credits</label>
          <input type="number" class="form-control" id="add-c-credits" min="1" max="5" value="3" required>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Department Stream</label>
          <select class="form-control" id="add-c-dept">
            <option value="CS">Computer Science</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="BI">Bioinformatics</option>
            <option value="BA">Business Administration</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Instructor</label>
          <select class="form-control" id="add-c-instructor">
            ${facultyOptions}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Maximum Class Intake (Seats)</label>
        <input type="number" class="form-control" id="add-c-max" value="60" min="10" max="150">
      </div>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-course">Publish Course</button>
    `;

    window.App.showModal('Create Academic Course', bodyHTML, footerHTML);

    document.getElementById('btn-submit-course').addEventListener('click', () => {
      const title = document.getElementById('add-c-title').value.trim();
      const code = document.getElementById('add-c-code').value.trim();
      const credits = parseInt(document.getElementById('add-c-credits').value) || 3;
      const dept = document.getElementById('add-c-dept').value;
      const instructorId = document.getElementById('add-c-instructor').value;
      const maxEnroll = parseInt(document.getElementById('add-c-max').value) || 60;

      if (!title || !code) {
        alert("Please provide course title and course code details.");
        return;
      }

      const courses = window.UniversityDB.getCourses();
      
      // Check for code collision
      if (courses.some(c => c.code.toUpperCase() === code.toUpperCase())) {
        alert(`Course code ${code} already exists in the registry.`);
        return;
      }

      const newCourse = {
        code: code.toUpperCase(),
        title: title,
        dept: dept,
        credits: credits,
        facultyId: instructorId,
        maxEnrollment: maxEnroll,
        enrolledCount: 0,
        status: 'Active'
      };

      courses.push(newCourse);
      window.App.closeModal();
      alert(`Course "${title}" created successfully!`);
      applyFilters();
    });
  }

  return {
    render: render,
    applyFilters: applyFilters
  };

})();

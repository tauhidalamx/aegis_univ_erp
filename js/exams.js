// Exams & Grades Module
window.examsView = (function() {
  
  function render(container) {
    const exams = window.UniversityDB.getExams();
    const students = window.UniversityDB.getStudents();
    const courses = window.UniversityDB.getCourses();

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Exams & Academic Grading</h1>
          <p>Schedule term exams, verify student transcripts, calculate GPAs, and input course evaluations.</p>
        </div>
      </div>

      <div class="grid-2 animate-fade-in delay-1" style="margin-top: 24px;">
        
        <!-- Exam Schedules list -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family: var(--font-display);">Upcoming Exams</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${exams.map(ex => {
              const c = courses.find(course => course.code === ex.code);
              return `
                <div style="padding:16px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <code style="color:var(--primary); font-weight:700; font-size:1rem;">${ex.code}</code>
                    <h4 style="margin:4px 0 2px 0; font-family:var(--font-display);">${ex.name}</h4>
                    <span style="font-size:0.8rem; color:var(--text-muted);">${ex.date} @ ${ex.time}</span>
                  </div>
                  <div style="text-align:right;">
                    <span class="badge badge-info" style="font-size:0.75rem;">${ex.venue}</span>
                    <div style="font-size:0.75rem; color:var(--text-subtle); margin-top:4px;">${c ? c.credits : 3} Credits</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Transcript Workspace Panel -->
        <div class="card">
          <h3 style="margin-bottom:16px; font-family: var(--font-display);">Academic Transcript Generator</h3>
          <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:20px;">Retrieve official term grade reports for enrolled students.</p>
          
          <div class="form-group">
            <label class="form-label">Search Student Profile (Select ID)</label>
            <select class="form-control" id="transcript-student-select">
              ${students.map(s => `<option value="${s.id}">${s.id} - ${s.name} (${s.dept})</option>`).join('')}
            </select>
          </div>

          <div id="transcript-sheet-body" style="padding:16px; border: 1px dashed var(--border); border-radius: var(--radius-md); background:rgba(255,255,255,0.01); margin-top:20px;">
            <!-- Loaded dynamically on select -->
          </div>
        </div>

      </div>

      <!-- Quick Grade Entry System Card -->
      <div class="card animate-fade-in delay-2" style="margin-top:24px;">
        <h3 style="margin-bottom:16px; font-family: var(--font-display);">Interactive Term Grade Entry</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">Enter raw final assessment scores (0-100) to automate grade and GPA logs.</p>
        
        <div class="grid-3" style="grid-template-columns: 1fr 1fr 1fr; align-items:end; margin-bottom: 24px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Subject Code</label>
            <select class="form-control" id="grade-course-select">
              ${courses.map(c => `<option value="${c.code}">${c.code} - ${c.title}</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Selected Student</label>
            <select class="form-control" id="grade-student-select">
              ${students.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0; display:flex; flex-direction:row; gap:8px;">
            <div style="flex:1;">
              <label class="form-label">Term Score</label>
              <input type="number" class="form-control" id="grade-score" min="0" max="100" value="85">
            </div>
            <button class="btn btn-primary" id="btn-submit-grade">Submit Grade</button>
          </div>
        </div>
      </div>
    `;

    const transSelect = document.getElementById('transcript-student-select');
    if (transSelect) {
      transSelect.addEventListener('change', () => {
        generateTranscriptView(transSelect.value);
      });
      // Initial load
      generateTranscriptView(transSelect.value);
    }

    document.getElementById('btn-submit-grade').addEventListener('click', () => {
      const courseCode = document.getElementById('grade-course-select').value;
      const studentId = document.getElementById('grade-student-select').value;
      const score = parseInt(document.getElementById('grade-score').value);

      if (isNaN(score) || score < 0 || score > 100) {
        alert("Please enter a valid final assessment score between 0 and 100.");
        return;
      }

      // Convert score to grade points
      let grade = 'F';
      let gpaDelta = 0.0;
      if (score >= 90) { grade = 'A+'; gpaDelta = 4.0; }
      else if (score >= 80) { grade = 'A'; gpaDelta = 3.7; }
      else if (score >= 70) { grade = 'B'; gpaDelta = 3.0; }
      else if (score >= 60) { grade = 'C'; gpaDelta = 2.0; }
      else if (score >= 50) { grade = 'D'; gpaDelta = 1.0; }

      // Update student grade simulator
      const stu = window.UniversityDB.getStudents().find(s => s.id === studentId);
      if (stu) {
        // Adjust GPA slightly towards the new grade
        stu.gpa = Math.min(4.0, parseFloat(((stu.gpa * 0.8) + (gpaDelta * 0.2)).toFixed(2)));
        alert(`Grade updated for ${stu.name}!\nCourse: ${courseCode} | Score: ${score}% | Grade: ${grade}.\nNew cumulative GPA computed: ${stu.gpa}`);
        
        // Refresh transcript views if the same student was selected
        if (transSelect.value === studentId) {
          generateTranscriptView(studentId);
        }
      }
    });
  }

  function generateTranscriptView(studentId) {
    const container = document.getElementById('transcript-sheet-body');
    if (!container) return;

    const stu = window.UniversityDB.getStudents().find(s => s.id === studentId);
    if (!stu) {
      container.innerHTML = `<span style="color:var(--text-muted);">Select a valid student profile ID.</span>`;
      return;
    }

    // Mock academic course grades
    const grades = [
      { code: stu.courses[0] || 'CS101', title: 'Intro Programming', grade: 'A', credits: 4 },
      { code: stu.courses[1] || 'CS302', title: 'Database Systems', grade: 'A+', credits: 3 },
      { code: stu.courses[2] || 'CS305', title: 'Software Engineering', grade: 'B', credits: 3 }
    ];

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-weight:600; font-family:var(--font-display);">${stu.name}</span>
        <code style="font-size:0.8rem;">CGPA: ${stu.gpa.toFixed(2)}</code>
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:0.825rem;">
        <thead>
          <tr style="border-bottom:1px solid var(--border);">
            <th style="padding: 6px 0; text-align:left; color:var(--text-muted);">Subject</th>
            <th style="padding: 6px 0; text-align:center; color:var(--text-muted);">Credits</th>
            <th style="padding: 6px 0; text-align:right; color:var(--text-muted);">Grade</th>
          </tr>
        </thead>
        <tbody>
          ${grades.map(g => `
            <tr style="border-bottom:1px dashed var(--border);">
              <td style="padding:8px 0;"><code>${g.code}</code> - ${g.title}</td>
              <td style="padding:8px 0; text-align:center;">${g.credits}</td>
              <td style="padding:8px 0; text-align:right; font-weight:600; color:var(--primary);">${g.grade}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="margin-top:16px; text-align:right;">
        <button class="btn btn-secondary btn-sm" onclick="alert('Sending digital transcript via Secure email...')">Email Transcript PDF</button>
      </div>
    `;
  }

  return {
    render: render
  };

})();

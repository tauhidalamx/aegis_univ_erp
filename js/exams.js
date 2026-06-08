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

      <div class="grid-2 animate-fade-in delay-1 mt-6">
        
        <!-- Exam Schedules list -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-semibold">Upcoming Exams</h3>
          <div class="flex flex-col gap-3">
            ${exams.map(ex => {
              const c = courses.find(course => course.code === ex.code);
              return `
                <div class="p-4 border border-brand-border rounded-xl bg-brand-bg-tertiary flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-primary/30 hover:bg-brand-primary/5">
                  <div>
                    <code class="text-brand-primary font-bold text-base">${ex.code}</code>
                    <h4 class="mt-1 mb-0.5 font-display font-medium">${ex.name}</h4>
                    <span class="text-xs text-brand-text-muted">${ex.date} @ ${ex.time}</span>
                  </div>
                  <div class="text-right">
                    <span class="badge badge-info text-[0.75rem]">${ex.venue}</span>
                    <div class="text-[0.75rem] text-brand-text-subtle mt-1">${c ? c.credits : 3} Credits</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Transcript Workspace Panel -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-semibold">Academic Transcript Generator</h3>
          <p class="text-brand-text-muted text-xs mb-5">Retrieve official term grade reports for enrolled students.</p>
          
          <div class="form-group">
            <label class="form-label">Search Student Profile (Select ID)</label>
            <select class="form-control" id="transcript-student-select">
              ${students.map(s => `<option value="${s.id}">${s.id} - ${s.name} (${s.dept})</option>`).join('')}
            </select>
          </div>

          <div id="transcript-sheet-body" class="p-4 border border-dashed border-brand-border rounded-xl bg-white/[0.01] mt-5">
            <!-- Loaded dynamically on select -->
          </div>
        </div>

      </div>

      <!-- Quick Grade Entry System Card -->
      <div class="card animate-fade-in delay-2 mt-6">
        <h3 class="mb-4 font-display text-lg font-semibold">Interactive Term Grade Entry</h3>
        <p class="text-brand-text-muted text-sm mb-5">Enter raw final assessment scores (0-100) to automate grade and GPA logs.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-6">
          <div class="form-group mb-0">
            <label class="form-label">Subject Code</label>
            <select class="form-control" id="grade-course-select">
              ${courses.map(c => `<option value="${c.code}">${c.code} - ${c.title}</option>`).join('')}
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Selected Student</label>
            <select class="form-control" id="grade-student-select">
              ${students.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group mb-0 flex flex-row gap-2">
            <div class="flex-1">
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
      container.innerHTML = `<span class="text-brand-text-muted">Select a valid student profile ID.</span>`;
      return;
    }

    // Mock academic course grades
    const grades = [
      { code: stu.courses[0] || 'CS101', title: 'Intro Programming', grade: 'A', credits: 4 },
      { code: stu.courses[1] || 'CS302', title: 'Database Systems', grade: 'A+', credits: 3 },
      { code: stu.courses[2] || 'CS305', title: 'Software Engineering', grade: 'B', credits: 3 }
    ];

    container.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <span class="font-semibold font-display">${stu.name}</span>
        <code class="text-xs">CGPA: ${stu.gpa.toFixed(2)}</code>
      </div>
      <table class="w-full border-collapse text-[0.825rem]">
        <thead>
          <tr class="border-b border-brand-border">
            <th class="py-1.5 px-0 text-left text-brand-text-muted bg-transparent border-b-0 uppercase tracking-normal">Subject</th>
            <th class="py-1.5 px-0 text-center text-brand-text-muted bg-transparent border-b-0 uppercase tracking-normal">Credits</th>
            <th class="py-1.5 px-0 text-right text-brand-text-muted bg-transparent border-b-0 uppercase tracking-normal">Grade</th>
          </tr>
        </thead>
        <tbody>
          ${grades.map(g => `
            <tr class="border-b border-dashed border-brand-border">
              <td class="py-2 px-0 border-b-0"><code>${g.code}</code> - ${g.title}</td>
              <td class="py-2 px-0 text-center border-b-0">${g.credits}</td>
              <td class="py-2 px-0 text-right font-semibold text-brand-primary border-b-0">${g.grade}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="mt-4 text-right">
        <button class="btn btn-secondary btn-sm" onclick="alert('Sending digital transcript via Secure email...')">Email Transcript PDF</button>
      </div>
    `;
  }

  return {
    render: render
  };

})();

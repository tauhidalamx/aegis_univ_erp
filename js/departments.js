// Departments Module
window.departmentsView = (function() {
  
  function render(container) {
    const depts = window.UniversityDB.getDepartments();

    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <div>
          <h1>Academic & Administrative Departments</h1>
          <p>Supervise academic divisions, check allocated operating budgets, and review Head of Department assignments.</p>
        </div>
      </div>

      <div class="grid-3 animate-fade-in delay-1 mt-6">
         ${depts.map(d => {
          const budgetFormatted = d.budget.toLocaleString();
          const students = window.UniversityDB.getStudents().filter(s => s.dept === d.code);
          const avgAttend = students.length > 0 ? Math.round(students.reduce((acc, curr) => acc + (curr.attendance || 0), 0) / students.length) : 90;

          // AI Department Resource Efficiency Rating
          let efficiencyPct = 82;
          if (typeof tf !== 'undefined') {
            try {
              const x = tf.tensor2d([[d.budget / 500000.0, d.facultyCount / 10.0, d.studentCount / 20.0]]);
              const w = tf.tensor2d([[-0.5], [1.2], [0.8]]);
              const y = tf.matMul(x, w);
              const val = y.dataSync()[0];
              efficiencyPct = Math.round(Math.max(50, Math.min(99, 75 + val * 10)));
              
              x.dispose();
              w.dispose();
              y.dispose();
            } catch (e) {
              console.warn(e);
            }
          }

          return `
            <div class="card flex flex-col gap-4" style="border-top: 4px solid ${d.color};">
              <div>
                <span class="badge bg-brand-bg-tertiary text-brand-text-main font-bold">${d.code}</span>
                <h3 class="mt-2.5 font-display text-lg leading-snug min-h-[46px] font-semibold">${d.name}</h3>
              </div>
 
              <div class="text-sm text-brand-text-muted flex flex-col gap-1.5 p-3 bg-white/[0.01] rounded-xl">
                <div><strong>HOD:</strong> ${d.hod}</div>
                <div><strong>Faculty Members:</strong> ${d.facultyCount} Professors</div>
                <div><strong>Enrolled Students:</strong> ${d.studentCount} Majors</div>
                <div><strong>Allocated Budget:</strong> $${budgetFormatted}</div>
                <div><strong>Average Attendance:</strong> <span class="font-bold ${avgAttend < 75 ? 'text-brand-accent-ruby' : (avgAttend < 85 ? 'text-brand-accent-amber' : 'text-brand-accent-emerald')}">${avgAttend}%</span></div>
                <div><strong>AI Budget Efficiency:</strong> <span class="font-bold text-brand-primary font-mono">${efficiencyPct}%</span></div>
              </div>
 
              <div class="flex gap-2 mt-auto">
                <button class="btn btn-secondary btn-sm edit-dept-btn w-full font-medium" data-code="${d.code}">Manage Resources</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.edit-dept-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        openDeptModal(code);
      });
    });
  }

  function openDeptModal(code) {
    const depts = window.UniversityDB.getDepartments();
    const d = depts.find(dept => dept.code === code);
    if (!d) return;

    const bodyHTML = `
      <h3 class="font-display mb-2 text-lg font-semibold">${d.name} (${d.code})</h3>
      <p class="text-brand-text-muted text-sm mb-5">Academic Deanery | Head of Department: <strong>${d.hod}</strong></p>
      
      <div class="form-group">
        <label class="form-label">Head of Department (HOD)</label>
        <input type="text" class="form-control" id="mod-dept-hod" value="${d.hod}">
      </div>
      <div class="form-group">
        <label class="form-label">Annual Department Operating Budget ($)</label>
        <input type="number" class="form-control" id="mod-dept-budget" value="${d.budget}">
      </div>
    `;

    const footerHTML = `
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-dept">Save Specifications</button>
    `;

    window.App.showModal('Modify Department Parameters', bodyHTML, footerHTML);

    document.getElementById('btn-save-dept').addEventListener('click', () => {
      const newHod = document.getElementById('mod-dept-hod').value.trim();
      const newBudget = parseInt(document.getElementById('mod-dept-budget').value);

      if (!newHod || isNaN(newBudget) || newBudget <= 0) {
        alert("Please specify valid HOD name and operating budget numbers.");
        return;
      }

      d.hod = newHod;
      d.budget = newBudget;

      window.App.closeModal();
      alert(`Department parameters updated successfully!`);
      window.App.loadView('departments');
    });
  }

  return {
    render: render
  };

})();

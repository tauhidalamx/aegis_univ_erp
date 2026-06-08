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

      <div class="grid-3 animate-fade-in delay-1" style="margin-top: 24px;">
        ${depts.map(d => {
          const budgetFormatted = d.budget.toLocaleString();
          return `
            <div class="card" style="border-top: 4px solid ${d.color}; display:flex; flex-direction:column; gap:16px;">
              <div>
                <span class="badge" style="background-color: var(--bg-tertiary); color: var(--text-main); font-weight:700;">${d.code}</span>
                <h3 style="margin-top:10px; font-family: var(--font-display); font-size:1.2rem; line-height:1.3; min-height:46px;">${d.name}</h3>
              </div>

              <div style="font-size:0.875rem; color:var(--text-muted); display:flex; flex-direction:column; gap:6px; padding:12px; background:rgba(255,255,255,0.01); border-radius:var(--radius-md);">
                <div><strong>HOD:</strong> ${d.hod}</div>
                <div><strong>Faculty Members:</strong> ${d.facultyCount} Professors</div>
                <div><strong>Enrolled Students:</strong> ${d.studentCount} Majors</div>
                <div><strong>Allocated Budget:</strong> $${budgetFormatted}</div>
              </div>

              <div style="display:flex; gap:8px; margin-top:auto;">
                <button class="btn btn-secondary btn-sm edit-dept-btn" style="width:100%;" data-code="${d.code}">Manage Resources</button>
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
      <h3 style="font-family:var(--font-display); margin-bottom:8px;">${d.name} (${d.code})</h3>
      <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:20px;">Academic Deanery | Head of Department: <strong>${d.hod}</strong></p>
      
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

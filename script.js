// Build dropdowns + inputs dynamically (4 per gear)
const stats = ["Attack Speed", "Crit Chance", "Evasion", "Crit Damage"];
document.querySelectorAll(".gear-block").forEach(block => {
  const gear = block.dataset.gear;
  for (let i = 1; i <= 4; i++) {
    const label = document.createElement("label");
    label.innerHTML = `Line ${i}: `;
    const select = document.createElement("select");
    select.id = `${gear}_stat${i}`;
    stats.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      select.appendChild(opt);
    });
    const input = document.createElement("input");
    input.type = "number";
    input.value = 0;
    input.id = `${gear}_val${i}`;
    label.appendChild(select);
    label.appendChild(input);
    block.appendChild(label);
  }
});

// Tab switching
document.querySelectorAll(".tablink").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tablink").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tabcontent").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Calculate totals
document.getElementById("calcBtn").addEventListener("click", () => {
  const totals = {};
  document.querySelectorAll(".gear-block").forEach(block => {
    const gear = block.dataset.gear;
    for (let i = 1; i <= 4; i++) {
      const stat = document.getElementById(`${gear}_stat${i}`).value;
      const val = parseFloat(document.getElementById(`${gear}_val${i}`).value) || 0;
      if (!totals[stat]) totals[stat] = 0;
      totals[stat] += val;
    }
  });

  // Show results
  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "";
  for (const [stat, val] of Object.entries(totals)) {
    const li = document.createElement("li");
    li.textContent = `${stat}: ${val.toFixed(2)}`;
    resultsList.appendChild(li);
  }
});

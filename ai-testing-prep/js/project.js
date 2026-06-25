/* ============================================================
   project.js — Project explainer page logic.
   Reads PROJECT from data.js and builds all sections.
   ============================================================ */

/* -- Render the tech stack pills ---------------------------- */
function renderStack() {
  const wrap = document.getElementById("stack-wrap");
  if (!wrap) return;

  wrap.innerHTML = PROJECT.stack
    .map(s => `<span class="tag">${s}</span>`)
    .join("");
}

/* -- Render the architecture grid --------------------------- */
function renderArchitecture() {
  const grid = document.getElementById("arch-grid");
  if (!grid) return;

  grid.innerHTML = PROJECT.architecture
    .map(item => `
      <div class="arch-box">
        <div class="arch-icon">${item.icon}</div>
        <div class="arch-title">${item.title}</div>
        <div class="arch-sub">${item.sub}</div>
      </div>
    `)
    .join("");
}

/* -- Render the pipeline flow row --------------------------- */
function renderPipeline() {
  const row = document.getElementById("pipeline-row");
  if (!row) return;

  row.innerHTML = PROJECT.pipeline
    .map((step, i) => {
      const node  = `<div class="flow-node">${step}</div>`;
      const arrow = i < PROJECT.pipeline.length - 1
        ? `<span class="flow-arrow">→</span>`
        : "";
      return node + arrow;
    })
    .join("");
}

/* -- Render the responsibility cards ------------------------ */
function renderResponsibilities() {
  const wrap = document.getElementById("resp-wrap");
  if (!wrap) return;

  wrap.innerHTML = PROJECT.responsibilities
    .map((r, i) => `
      <div class="resp-card">
        <div class="resp-num">${i + 1}</div>
        <div class="resp-content">
          <h3>${r.title}</h3>
          <p>${r.detail}</p>
        </div>
      </div>
    `)
    .join("");
}

/* -- Build one interview Q&A accordion item ----------------- */
function buildProjectQA(item, index) {
  return `
    <div class="q-card" id="pqa-${index}">
      <div class="q-head" onclick="toggleProjectQA(${index})">
        <span class="q-num">Q${index + 1}</span>
        <span class="q-text">${item.q}</span>
        <div class="q-meta">
          <span class="q-chevron" id="pchev-${index}">▾</span>
        </div>
      </div>
      <div class="q-body" id="pqbody-${index}">
        <div class="ans-label">How to answer</div>
        <div class="ans-text">${item.a}</div>
        ${item.tip ? `
        <div class="tip-box">
          <strong>Interview tip:</strong> ${item.tip}
        </div>` : ""}
      </div>
    </div>
  `;
}

/* -- Render all project interview Q&A ----------------------- */
function renderProjectQA() {
  const wrap = document.getElementById("project-qa-wrap");
  if (!wrap) return;

  wrap.innerHTML = PROJECT.interviewQA
    .map((item, i) => buildProjectQA(item, i))
    .join("");
}

/* -- Toggle a project Q&A card ------------------------------ */
function toggleProjectQA(index) {
  const card = document.getElementById(`pqa-${index}`);
  const body = document.getElementById(`pqbody-${index}`);
  const chev = document.getElementById(`pchev-${index}`);

  if (!card) return;

  const isOpen = card.classList.toggle("is-open");
  if (body) body.style.display = isOpen ? "block" : "none";
  if (chev) chev.style.transform = isOpen ? "rotate(180deg)" : "";
}

/* -- Populate the static text fields (title, placement, summary) */
function renderProjectHeader() {
  const titleEl     = document.getElementById("project-title");
  const placementEl = document.getElementById("project-placement");
  const summaryEl   = document.getElementById("project-summary");

  if (titleEl)     titleEl.textContent  = PROJECT.title;
  if (placementEl) placementEl.textContent = PROJECT.placement;
  if (summaryEl)   summaryEl.innerHTML  = PROJECT.summary;
}

/* -- Init: called when the page loads ----------------------- */
function initProject() {
  renderProjectHeader();
  renderStack();
  renderArchitecture();
  renderPipeline();
  renderResponsibilities();
  renderProjectQA();
}

document.addEventListener("DOMContentLoaded", initProject);

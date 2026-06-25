/* ============================================================
   quiz.js — Interview Q&A page logic.
   Reads QUESTIONS from data.js and builds the interactive
   accordion list with topic/difficulty filters and progress.
   ============================================================ */

/* -- State -------------------------------------------------- */
let activeTopic = "all";
let activeDiff  = "all";
const known = new Set();          // stores indices of questions marked known

/* -- Utility: get unique topics from data ------------------- */
function getTopics() {
  return ["all", ...new Set(QUESTIONS.map(q => q.topic))];
}

/* -- Build the topic filter buttons ------------------------- */
function buildTopicFilters() {
  const wrap = document.getElementById("topic-filters");
  if (!wrap) return;

  getTopics().forEach(topic => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (topic === "all" ? " active" : "");
    btn.textContent = topic === "all" ? "All topics" : topic;
    btn.dataset.topic = topic;

    btn.addEventListener("click", () => {
      activeTopic = topic;
      // update active state on all topic buttons
      wrap.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderQuestions();
    });

    wrap.appendChild(btn);
  });
}

/* -- Build the difficulty filter buttons -------------------- */
function buildDiffFilters() {
  const wrap = document.getElementById("diff-filters");
  if (!wrap) return;

  const diffs = ["all", "easy", "medium", "hard"];

  diffs.forEach(diff => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (diff === "all" ? " active" : "");
    btn.textContent = diff === "all" ? "All levels" : diff.charAt(0).toUpperCase() + diff.slice(1);
    btn.dataset.diff = diff;

    btn.addEventListener("click", () => {
      activeDiff = diff;
      // update active state
      wrap.querySelectorAll(".filter-btn").forEach(b => {
        b.className = "filter-btn";
      });
      btn.className = diff === "all" ? "filter-btn active" : `filter-btn active-${diff}`;
      renderQuestions();
    });

    wrap.appendChild(btn);
  });
}

/* -- Filter questions based on current selections ----------- */
function getFiltered() {
  return QUESTIONS.filter(q => {
    const topicMatch = activeTopic === "all" || q.topic === activeTopic;
    const diffMatch  = activeDiff  === "all" || q.diff  === activeDiff;
    return topicMatch && diffMatch;
  });
}

/* -- Build HTML for a single question card ------------------ */
function buildQCard(q, displayIndex, globalIndex) {
  const isKnown = known.has(globalIndex);

  return `
    <div class="q-card" id="qcard-${globalIndex}">
      <div class="q-head" onclick="toggleCard(${globalIndex})">
        <span class="q-num">${displayIndex}</span>
        <span class="q-text">${q.q}</span>
        <div class="q-meta">
          <span class="pill pill-${q.diff}">${q.diff}</span>
          <span class="q-chevron" id="chev-${globalIndex}">▾</span>
        </div>
      </div>
      <div class="q-body" id="qbody-${globalIndex}">
        <div class="ans-label">Answer</div>
        <div class="ans-text">${q.a}</div>
        ${q.tip ? `
        <div class="tip-box">
          <strong>Interview tip:</strong> ${q.tip}
        </div>` : ""}
        <button
          class="mark-btn ${isKnown ? "known" : ""}"
          id="markbtn-${globalIndex}"
          onclick="toggleKnown(event, ${globalIndex})"
        >
          ${isKnown ? "✓ Known" : "☆ Mark as known"}
        </button>
      </div>
    </div>
  `;
}

/* -- Render the question list ------------------------------- */
function renderQuestions() {
  const area = document.getElementById("q-list");
  if (!area) return;

  const filtered = getFiltered();

  if (filtered.length === 0) {
    area.innerHTML = '<div class="empty-state">No questions match these filters.</div>';
    updateStats(0);
    return;
  }

  area.innerHTML = filtered
    .map((q, i) => {
      const globalIndex = QUESTIONS.indexOf(q);
      return buildQCard(q, i + 1, globalIndex);
    })
    .join("");

  updateStats(filtered.length);
}

/* -- Toggle a question card open / closed ------------------- */
function toggleCard(globalIndex) {
  const card  = document.getElementById(`qcard-${globalIndex}`);
  const body  = document.getElementById(`qbody-${globalIndex}`);
  const chev  = document.getElementById(`chev-${globalIndex}`);

  if (!card) return;

  const isOpen = card.classList.toggle("is-open");

  // show/hide the answer body
  if (body) body.style.display = isOpen ? "block" : "none";

  // rotate the chevron
  if (chev) chev.style.transform = isOpen ? "rotate(180deg)" : "";
}

/* -- Toggle "known" status for a question ------------------- */
function toggleKnown(event, globalIndex) {
  event.stopPropagation();   // don't trigger the card toggle

  if (known.has(globalIndex)) {
    known.delete(globalIndex);
  } else {
    known.add(globalIndex);
  }

  const isKnown = known.has(globalIndex);
  const btn = document.getElementById(`markbtn-${globalIndex}`);
  if (btn) {
    btn.className = `mark-btn ${isKnown ? "known" : ""}`;
    btn.textContent = isKnown ? "✓ Known" : "☆ Mark as known";
  }

  updateStats();
}

/* -- Update the stats row and progress bar ------------------ */
function updateStats(filteredCount) {
  const total   = QUESTIONS.length;
  const knownN  = known.size;
  const pct     = Math.round((knownN / total) * 100);
  const left    = total - knownN;

  const elTotal = document.getElementById("stat-total");
  const elKnown = document.getElementById("stat-known");
  const elPct   = document.getElementById("stat-pct");
  const elLeft  = document.getElementById("stat-left");
  const bar     = document.getElementById("progress-fill");

  if (elTotal) elTotal.textContent = total;
  if (elKnown) elKnown.textContent = knownN;
  if (elPct)   elPct.textContent   = pct + "%";
  if (elLeft)  elLeft.textContent  = left;
  if (bar)     bar.style.width     = pct + "%";
}

/* -- Init: called when the page loads ----------------------- */
function initQuiz() {
  buildTopicFilters();
  buildDiffFilters();
  renderQuestions();
}

// Run on page load
document.addEventListener("DOMContentLoaded", initQuiz);

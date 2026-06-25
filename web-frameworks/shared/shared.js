// ── COPY BUTTONS ──
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1800);
  });
}

// ── SCROLL PROGRESS ──
const scrollFill = document.getElementById('scroll-fill');
if (scrollFill) {
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    scrollFill.style.width = scrolled + '%';
    if (typeof updateProgress === 'function') updateProgress(scrolled);
  }, { passive: true });
}

// ── SIDEBAR ACTIVE LINKS ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const currentSectionEl = document.getElementById('current-section');
const progressLabel = document.getElementById('progress-label');
const progressFill = document.getElementById('progress-fill');

let visited = new Set();

function updateProgress(pct) {
  if (progressFill) progressFill.style.width = Math.min(pct, 100).toFixed(0) + '%';
  if (progressLabel) progressLabel.textContent = Math.min(pct, 100).toFixed(0) + '% complete';
}

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
        const active = document.querySelector(`a[href="#${id}"]`);
        if (active && currentSectionEl) currentSectionEl.textContent = active.textContent.trim();
        visited.add(id);
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ── SEARCH ──
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    navLinks.forEach(link => {
      const match = link.textContent.toLowerCase().includes(q);
      link.style.display = match || !q ? 'block' : 'none';
    });
  });
}

// ── QUIZ ──
function answer(btn, isCorrect) {
  const block = btn.closest('.quiz-block');
  const opts = block.querySelectorAll('.quiz-opt');
  opts.forEach(o => o.disabled = true);
  btn.classList.add(isCorrect ? 'correct' : 'wrong');

  if (!isCorrect) {
    opts.forEach(o => {
      if (o.dataset.correct || o === opts[1]) {
        o.classList.add('correct');
      }
    });
  }

  const feedback = block.querySelector('.quiz-feedback');
  if (feedback) {
    feedback.textContent = isCorrect
      ? '✅ Correct! transform and opacity are GPU-composited — they skip layout and paint entirely.'
      : '❌ Not quite. Only transform and opacity skip layout/paint and run on the GPU.';
    feedback.style.color = isCorrect ? '#4ade80' : '#f87171';
    feedback.classList.add('show');
  }
}

// ── FADE IN ON SCROLL ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.module').forEach(m => {
  m.style.opacity = '0';
  m.style.transform = 'translateY(20px)';
  m.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(m);
});

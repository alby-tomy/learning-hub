// ── Sidebar search ──
const searchInput = document.getElementById('sd-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.sb-link').forEach(a => {
      a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
    document.querySelectorAll('.sb-group-label').forEach(label => {
      const visible = [...label.parentElement.querySelectorAll('.sb-link')]
        .some(a => a.style.display !== 'none');
      label.style.display = visible ? '' : 'none';
    });
  });
}

// ── Scroll-spy ──
const sections = document.querySelectorAll('.chapter');
const links    = document.querySelectorAll('.sb-link');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.sb-link[href="#${e.target.id}"]`);
      if (active) { active.classList.add('active'); active.scrollIntoView({ block: 'nearest' }); }
    }
  });
}, { threshold: 0.1, rootMargin: '-5% 0px -80% 0px' });
sections.forEach(s => obs.observe(s));

// ── Mobile sidebar close ──
document.querySelectorAll('.sb-link').forEach(link =>
  link.addEventListener('click', () =>
    document.getElementById('sidebar').classList.remove('open')));

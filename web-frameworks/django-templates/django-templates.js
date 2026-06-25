// ── SCROLL SPY ──
const sections = document.querySelectorAll('.chapter');
const links    = document.querySelectorAll('.toc a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const id = '#' + entry.target.id;
      const active = document.querySelector(`.toc a[href="${id}"]`);
      if (active) {
        active.classList.add('active');
        active.scrollIntoView({ block: 'nearest' });
      }
    }
  });
}, { rootMargin: '-20% 0px -75% 0px' });

sections.forEach(s => observer.observe(s));

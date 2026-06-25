// Scroll-triggered entrance animation for elements with class "reveal"
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "-40px", threshold: 0.05 }
  );

  items.forEach((el, i) => {
    const delay = el.dataset.delay || Math.min(i * 0.05, 0.3);
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });
})();

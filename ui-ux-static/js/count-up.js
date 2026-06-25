// Animated number count-up, triggered immediately on page load (these
// stats live in the hero, always above the fold — no need to gate on
// scroll visibility, which is flaky for elements already in view).
(function () {
  const els = document.querySelectorAll("[data-countup]");
  if (!els.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  els.forEach((el) => {
    const value = parseFloat(el.dataset.countup);
    const suffix = el.dataset.suffix || "";
    const duration = parseFloat(el.dataset.duration || "1.2") * 1000;

    if (prefersReducedMotion || Number.isNaN(value)) {
      el.textContent = value + suffix;
      return;
    }

    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
})();

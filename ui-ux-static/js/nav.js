// Back-navigation button — browser-style "go back" on every page
(function () {
  const backBtn = document.querySelector(".nav-back");
  if (!backBtn) return;
  backBtn.addEventListener("click", () => {
    history.back();
  });
})();

// Mobile navigation toggle
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".nav-mobile-panel");
  if (!toggle || !panel) return;

  const iconOpen = toggle.querySelector(".icon-menu");
  const iconClose = toggle.querySelector(".icon-close");

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    if (iconOpen && iconClose) {
      iconOpen.style.display = isOpen ? "none" : "block";
      iconClose.style.display = isOpen ? "block" : "none";
    }
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      if (iconOpen && iconClose) {
        iconOpen.style.display = "block";
        iconClose.style.display = "none";
      }
    });
  });
})();

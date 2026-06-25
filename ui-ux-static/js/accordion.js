// FAQ-style accordion — works for any .accordion-item / .accordion-trigger pair
(function () {
  const triggers = document.querySelectorAll(".accordion-trigger");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    const item = trigger.closest(".accordion-item");
    const panel = item.querySelector(".accordion-panel");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = "0px";
        trigger.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Open the first item in each accordion group by default
  document.querySelectorAll(".accordion-group").forEach((group) => {
    const first = group.querySelector(".accordion-item");
    if (!first) return;
    first.classList.add("open");
    const panel = first.querySelector(".accordion-panel");
    const trigger = first.querySelector(".accordion-trigger");
    panel.style.maxHeight = panel.scrollHeight + "px";
    trigger.setAttribute("aria-expanded", "true");
  });

  // Keep open panels correctly sized if the layout reflows (e.g. resize)
  window.addEventListener("resize", () => {
    document.querySelectorAll(".accordion-item.open .accordion-panel").forEach((panel) => {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });
})();

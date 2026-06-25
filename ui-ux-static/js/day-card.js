// Schedule page — click a day to expand its full agenda + timeline
(function () {
  document.querySelectorAll(".day-card-trigger").forEach((trigger) => {
    const card = trigger.closest(".day-card");
    const panel = card.querySelector(".day-card-panel");

    trigger.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");

      if (isOpen) {
        card.classList.remove("open");
        panel.style.maxHeight = "0px";
        trigger.setAttribute("aria-expanded", "false");
      } else {
        card.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

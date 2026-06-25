// Click-to-flip concept cards
(function () {
  document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => {
      const flipped = card.classList.toggle("flipped");
      card.setAttribute("aria-pressed", String(flipped));
    });
  });
})();

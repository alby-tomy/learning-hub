// Resources page — filter tool cards by category pill
(function () {
  const filterBar = document.querySelector(".category-filters");
  if (!filterBar) return;

  const buttons = filterBar.querySelectorAll(".category-filter-btn");
  const cards = document.querySelectorAll(".tool-card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      buttons.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });

      cards.forEach((card) => {
        const show = category === "All" || card.dataset.category === category;
        card.hidden = !show;
      });
    });
  });
})();

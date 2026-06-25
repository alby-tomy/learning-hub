// Rotating testimonial carousel — crossfades every 4 seconds
(function () {
  const wrap = document.querySelector(".testimonial-wrap");
  if (!wrap) return;

  const cards = wrap.querySelectorAll(".testimonial-card");
  const dots = wrap.parentElement.querySelectorAll(".testimonial-dots button");
  let index = 0;
  let timer;

  function show(i) {
    index = i;
    cards.forEach((card, j) => card.classList.toggle("active", j === i));
    dots.forEach((dot, j) => dot.classList.toggle("active", j === i));
  }

  function next() {
    show((index + 1) % cards.length);
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      show(i);
      restart();
    });
  });

  show(0);
  restart();
})();

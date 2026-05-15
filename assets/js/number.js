function animateCounter(element, target, duration = 2000) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * easeOutCubic);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        animateCounter(counter, target, 2000);
        counter.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".counter").forEach((counter) => {
  observer.observe(counter);
});

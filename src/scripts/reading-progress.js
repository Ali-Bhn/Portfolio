// Fills the fixed top bar based on how far the reader has scrolled through the article.
const fill = document.querySelector(".reading-progress-fill");
const article = document.querySelector("[data-reading-target]");

if (fill && article) {
  const updateProgress = () => {
    const { top, height } = article.getBoundingClientRect();
    const viewport = window.innerHeight;
    const scrollable = height - viewport;
    const scrolled = scrollable <= 0 ? 1 : Math.min(Math.max(-top, 0) / scrollable, 1);

    fill.style.width = `${scrolled * 100}%`;
  };

  document.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

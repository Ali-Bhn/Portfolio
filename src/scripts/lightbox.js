// Lightweight lightbox for the project screenshot gallery — no external library.
const items = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.querySelector(".lightbox");

if (items.length && lightbox) {
  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector("figcaption");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");
  let activeIndex = 0;

  const show = (index) => {
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    const fullSrc = item.dataset.fullSrc || item.querySelector("img").src;

    image.src = fullSrc;
    image.alt = item.dataset.alt || "";
    caption.textContent = item.dataset.caption || "";
    caption.hidden = !item.dataset.caption;
  };

  const open = (index) => {
    show(index);
    lightbox.classList.add("is-open");
    document.body.classList.add("nav-open");
    closeButton.focus();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
  });

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => show(activeIndex - 1));
  nextButton.addEventListener("click", () => show(activeIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(activeIndex - 1);
    if (event.key === "ArrowRight") show(activeIndex + 1);
  });
}

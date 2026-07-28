// Highlights the current section's link in the table of contents while scrolling.
const tocLinks = document.querySelectorAll(".toc a");
const headings = Array.from(tocLinks)
  .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
  .filter(Boolean);

if (tocLinks.length && headings.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
        if (!link) return;
        link.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { rootMargin: "-20% 0px -70% 0px" },
  );

  headings.forEach((heading) => observer.observe(heading));
}

// Small vanilla JavaScript file for navigation and the mouse-follow glow effect.
const root = document.documentElement;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationItems = document.querySelectorAll(".nav-links a");

// Toggle the mobile navigation while keeping the ARIA state in sync.
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");

  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
  document.body.classList.toggle("nav-open", isOpen);
});

// Close the mobile menu after a navigation link is selected.
navigationItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü öffnen");
    document.body.classList.remove("nav-open");
  });
});

// Smooth cursor halo: CSS variables are updated with requestAnimationFrame.
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

window.addEventListener("pointermove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;

  root.style.setProperty("--mouse-x", `${glowX}px`);
  root.style.setProperty("--mouse-y", `${glowY}px`);

  requestAnimationFrame(animateGlow);
}

animateGlow();
// Smooth cursor halo: CSS variables are updated with requestAnimationFrame.
const root = document.documentElement;

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

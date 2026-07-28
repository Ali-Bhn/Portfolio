// Native share sheet where available, clipboard copy as the universal fallback.
document.querySelectorAll("[data-share-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(window.location.href);
    const original = button.getAttribute("aria-label");
    button.textContent = "✓";
    setTimeout(() => {
      button.textContent = "🔗";
      if (original) button.setAttribute("aria-label", original);
    }, 1600);
  });
});

document.querySelectorAll("[data-share-native]").forEach((button) => {
  if (!navigator.share) {
    button.hidden = true;
    return;
  }

  button.addEventListener("click", () => {
    navigator.share({
      title: document.title,
      url: window.location.href,
    });
  });
});

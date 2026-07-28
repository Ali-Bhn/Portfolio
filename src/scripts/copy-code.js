// Adds a "Copy" button to every Shiki-rendered code block on the page.
document.querySelectorAll(".prose pre").forEach((pre) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-code-button";
  button.textContent = "Copy";

  button.addEventListener("click", async () => {
    const code = pre.querySelector("code")?.innerText ?? "";
    await navigator.clipboard.writeText(code);

    button.textContent = "Copied!";
    button.classList.add("is-copied");

    setTimeout(() => {
      button.textContent = "Copy";
      button.classList.remove("is-copied");
    }, 1800);
  });

  pre.appendChild(button);
});

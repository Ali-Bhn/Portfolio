import { visit } from "unist-util-visit";

// Renders GitHub-style alert blockquotes (> [!NOTE], > [!TIP], > [!WARNING], ...)
// as styled callout boxes, so plain Markdown files can contain Notes/Warnings
// without needing MDX component imports.
const LABELS = {
  NOTE: "ℹ️ Note",
  TIP: "💡 Tip",
  IMPORTANT: "❗ Important",
  WARNING: "⚠️ Warning",
  CAUTION: "⛔ Caution",
};

const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n?/i;

export function remarkAlerts() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const firstParagraph = node.children[0];
      if (!firstParagraph || firstParagraph.type !== "paragraph") return;

      const firstText = firstParagraph.children[0];
      if (!firstText || firstText.type !== "text") return;

      const match = MARKER.exec(firstText.value);
      if (!match) return;

      const type = match[1].toUpperCase();
      firstText.value = firstText.value.slice(match[0].length);

      if (firstText.value === "") {
        firstParagraph.children.shift();
      }

      if (firstParagraph.children.length === 0) {
        node.children.shift();
      }

      node.data = {
        hName: "div",
        hProperties: { className: ["alert", `alert-${type.toLowerCase()}`] },
      };

      node.children.unshift({
        type: "paragraph",
        data: { hName: "p", hProperties: { className: ["alert-title"] } },
        children: [{ type: "text", value: LABELS[type] }],
      });
    });
  };
}

// One-off generator for on-brand placeholder cover/screenshot art, run manually
// via `node scripts/generate-placeholders.mjs`. Not part of the Astro build.
// Replace these with real screenshots at any time — see README section on adding projects.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const COLORS = {
  bg: "#06111f",
  bgSoft: "#0b1d33",
  primary: "#38bdf8",
  primaryStrong: "#0ea5e9",
  text: "#f8fafc",
  muted: "#b7c6d8",
};

function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function placeholderSvg({ width, height, title, subtitle, icon }) {
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.bgSoft}" />
      <stop offset="100%" stop-color="${COLORS.bg}" />
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="15%" r="75%">
      <stop offset="0%" stop-color="${COLORS.primary}" stop-opacity="0.35" />
      <stop offset="45%" stop-color="${COLORS.primaryStrong}" stop-opacity="0.12" />
      <stop offset="100%" stop-color="${COLORS.primary}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />
  <rect width="${width}" height="${height}" fill="url(#glow)" />
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="rgba(148,163,184,0.22)" stroke-width="2" />
  <circle cx="${width / 2}" cy="${height / 2 - Math.round(height * 0.14)}" r="${Math.round(height * 0.09)}" fill="none" stroke="${COLORS.primary}" stroke-width="3" opacity="0.85" />
  <text x="${width / 2}" y="${height / 2 - Math.round(height * 0.14) + Math.round(height * 0.035)}" font-size="${Math.round(height * 0.09)}" font-weight="800" fill="${COLORS.primary}" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif">${escapeXml(icon)}</text>
  <text x="${width / 2}" y="${height / 2 + Math.round(height * 0.11)}" font-size="${Math.round(width * 0.045)}" font-weight="800" fill="${COLORS.text}" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif">${escapeXml(title)}</text>
  ${
    subtitle
      ? `<text x="${width / 2}" y="${height / 2 + Math.round(height * 0.11) + Math.round(width * 0.028)}" font-size="${Math.round(width * 0.022)}" fill="${COLORS.muted}" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" letter-spacing="2">${escapeXml(subtitle.toUpperCase())}</text>`
      : ""
  }
</svg>`;
}

const projects = [
  {
    slug: "portfolio-website",
    icon: "PF",
    title: "Portfolio Website",
    shots: ["Startseite", "Projektübersicht", "Projekt-Detailseite"],
  },
  {
    slug: "weather-app",
    icon: "WA",
    title: "Wetter App",
    shots: ["Stadtsuche", "Wetterdetails"],
  },
  {
    slug: "quiz-app",
    icon: "QZ",
    title: "Quiz App",
    shots: ["Frage & Antworten", "Ergebnis-Ansicht"],
  },
  {
    slug: "todo-app",
    icon: "TD",
    title: "Todo App",
    shots: ["Aufgabenliste", "Neue Aufgabe hinzufügen"],
  },
  {
    slug: "expense-tracker",
    icon: "ET",
    title: "Expense Tracker",
    shots: ["Kontoübersicht", "Transaktionsverlauf"],
  },
];

async function run() {
  for (const project of projects) {
    const dir = path.join("src/assets/images/projects", project.slug);
    await mkdir(dir, { recursive: true });

    await sharp(Buffer.from(placeholderSvg({ width: 1600, height: 900, title: project.title, subtitle: "Cover", icon: project.icon })))
      .jpeg({ quality: 88 })
      .toFile(path.join(dir, "cover.jpg"));

    for (const [index, label] of project.shots.entries()) {
      await sharp(
        Buffer.from(
          placeholderSvg({ width: 1600, height: 1000, title: label, subtitle: project.title, icon: project.icon }),
        ),
      )
        .jpeg({ quality: 88 })
        .toFile(path.join(dir, `screenshot-${index + 1}.jpg`));
    }
  }

  await mkdir("public", { recursive: true });
  await sharp(
    Buffer.from(
      placeholderSvg({ width: 1200, height: 630, title: "Ali Bahadoran", subtitle: "Portfolio", icon: "PF" }),
    ),
  )
    .png()
    .toFile("public/og-default.png");

  console.log(`Generated placeholder art for ${projects.length} projects + og-default.png`);
}

run();

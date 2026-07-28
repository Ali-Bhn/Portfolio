---
title: "Portfolio Website"
shortDescription: "Meine persönliche Portfolio-Website: von statischem HTML zu einer content-getriebenen Astro-Architektur."
description: "Persönliche Portfolio-Website von Ali Bahadoran, gebaut mit Astro und Content Collections. Diese Seite selbst ist das größte Projekt in dieser Übersicht."
coverImage: "../../assets/images/projects/portfolio-website/cover.jpg"
coverImageAlt: "Titelbild des Portfolio-Website-Projekts"
screenshots:
  - src: "../../assets/images/projects/portfolio-website/screenshot-1.jpg"
    alt: "Startseite der Portfolio-Website"
    caption: "Startseite mit Hero-Bereich und Kurzprofil"
  - src: "../../assets/images/projects/portfolio-website/screenshot-2.jpg"
    alt: "Projektübersicht der Portfolio-Website"
    caption: "Die neue /projects Übersichtsseite"
  - src: "../../assets/images/projects/portfolio-website/screenshot-3.jpg"
    alt: "Einzelne Projektseite der Portfolio-Website"
    caption: "Automatisch generierte Detailseite eines Projekts"
technologies: ["Astro", "TypeScript", "Markdown/MDX", "CSS", "GitHub Actions"]
liveUrl: "https://bahadoran.de"
githubUrl: "https://github.com/Ali-Bhn/Portfolio"
date: 2025-11-02
updatedDate: 2026-07-28
category: "Web App"
difficulty: "Intermediate"
status: "completed"
tags: ["astro", "content-collections", "seo", "architecture"]
featured: true
order: 1
seo:
  description: "Wie diese Portfolio-Website mit Astro Content Collections aufgebaut ist: eine skalierbare, SEO-freundliche Architektur für Projektseiten."
---

## Overview

Diese Website ist selbst mein größtes und langlebigstes Projekt. Sie begann als eine einzelne, handgeschriebene `index.html`-Datei und wurde zu einer content-getriebenen Architektur mit [Astro](https://astro.build) ausgebaut, in der jedes Projekt seine eigene Seite automatisch aus einer Markdown-Datei erhält — genau wie diese, die du gerade liest.

## Problem

Die ursprüngliche Version hatte drei fest verdrahtete `<article>`-Karten im HTML, deren Links direkt auf GitHub zeigten. Für jedes neue Projekt hätte ich Copy-Paste-HTML schreiben, Metadaten manuell pflegen und daran denken müssen, Sitemap und SEO-Tags von Hand zu aktualisieren. Das skaliert nicht über Jahre hinweg.

## Solution

Jedes Projekt ist jetzt eine einzelne Markdown-Datei in `src/content/projects/`. Eine zentrale Zod-Schema-Definition validiert die Frontmatter (Titel, Technologien, Status, Bilder, …), Astros dynamisches Routing (`/projects/[slug].astro`) erzeugt daraus automatisch eine eigene, SEO-optimierte Seite, und dieselbe Collection speist sowohl die Startseite als auch die `/projects`-Übersicht.

## Features

- Automatisch generierte Projektseiten aus Markdown/MDX-Dateien
- Table of Contents, die sich aus den tatsächlich verwendeten Überschriften ergibt
- Bildergalerie mit Lightbox, responsiven Bildern und Lazy Loading
- Lesefortschrittsbalken, geschätzte Lesezeit, Vorheriges/Nächstes-Projekt-Navigation
- Automatisch generierte Sitemap, Open-Graph-Bilder und JSON-LD-Strukturdaten
- Code-Blöcke mit Syntax-Highlighting und Copy-Button

> [!NOTE]
> Diese Seite selbst demonstriert alle Features: Galerie weiter unten, Inhaltsverzeichnis rechts, Lesefortschritt oben.

## Development Process

Die Migration verlief in klaren Schritten: zuerst das bestehende Design (Farben, Typografie, Glassmorphism, Animationen) 1:1 in wiederverwendbare Astro-Komponenten übertragen, danach das Content-System aufgebaut und zuletzt die Routen durch dynamische, datengetriebene Seiten ersetzt.

```ts
// src/content.config.ts
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      coverImage: image(),
      technologies: z.array(z.string()),
      liveUrl: z.string().url().optional(),
      status: z.enum(["completed", "in-progress", "planned"]),
      // ...
    }),
});
```

## Challenges

> [!WARNING]
> Die größte Herausforderung war, das bestehende Look & Feel exakt beizubehalten, während sich die komplette Architektur darunter ändert — jede CSS-Variable und Klasse musste 1:1 übernommen werden, nicht neu gestaltet.

Eine weitere Herausforderung war die Balance zwischen Flexibilität und Struktur: der Markdown-Body sollte komplett frei bleiben (Überschriften, Tabellen, Bilder, Codeblöcke), während drumherum (Buttons, Tech-Chips, Galerie) automatisch aus der Frontmatter gerendert wird.

## Lessons Learned

- Content Collections mit Zod-Schemas verhindern kaputte Projektseiten durch Tippfehler in der Frontmatter
- Ein sauberer Trennung zwischen "freiem Markdown-Body" und "strukturierten Metadaten" macht die Pflege für Jahre einfach
- Kleine, wiederverwendbare Astro-Komponenten (Card, Gallery, TOC, …) halten den Code duplikatsfrei

## Future Improvements

| Idee | Nutzen |
| --- | --- |
| RSS-Feed für neue Projekte | Follower informieren, ohne die Seite zu besuchen |
| Automatische Screenshots via Playwright | Immer aktuelle Vorschaubilder ohne manuellen Aufwand |
| Mehrsprachigkeit (DE/EN) | Größere Reichweite für internationale Recruiter |

> [!TIP]
> Ein neues Projekt hinzuzufügen bedeutet: eine Markdown-Datei anlegen, Bilder ablegen, pushen. Mehr dazu im Repository-README.

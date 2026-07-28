# Portfolio

Persönliche Portfolio-Website von Ali Bahadoran — [bahadoran.de](https://bahadoran.de).

Gebaut mit [Astro](https://astro.build) und Content Collections: jedes Projekt ist eine einzelne Markdown-Datei, aus der automatisch eine eigene Seite, ein Eintrag auf der Startseite/`/projects`-Übersicht, SEO-Metadaten und ein Sitemap-Eintrag entstehen.

## Lokal entwickeln

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # Production-Build nach dist/
npm run preview   # Build lokal testen
```

## Ein neues Projekt hinzufügen

**Kein Code, keine neue Route, keine Sitemap-Pflege nötig.** Nur:

1. Projekt irgendwo deployen (Cloudflare Pages, Netlify, Vercel oder GitHub Pages) — für den "Live Demo"-Button.
2. Screenshots machen und in einen neuen Ordner legen: `src/assets/images/projects/<slug>/`.
3. Eine neue Datei anlegen: `src/content/projects/<slug>.md` (Vorlage: eine der bestehenden Dateien kopieren).
4. Frontmatter ausfüllen (Titel, Beschreibung, Bilder, Technologien, Links, Datum, Kategorie, Schwierigkeit, Status, Tags, …) und darunter frei in Markdown schreiben — Überschriften, Bilder, Codeblöcke, Tabellen, Listen, Zitate, Hinweisboxen (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!IMPORTANT]`, `> [!CAUTION]`) sind alle erlaubt.
5. Committen und pushen.

Danach erscheint das Projekt automatisch:

- auf der Startseite (wenn `featured: true` gesetzt ist, sonst automatisch als eines der neuesten Projekte),
- auf `/projects`,
- unter seiner eigenen Seite `/projects/<slug>`,
- in der Sitemap, mit SEO-Tags (Title, Description, Open Graph, Twitter Card, JSON-LD) und Breadcrumbs.

## Ein Projekt bearbeiten

Die entsprechende Datei in `src/content/projects/` bearbeiten und pushen. Fertig.

## Ein Projekt entfernen

Die Markdown-Datei (und optional ihren Bilder-Ordner) löschen und pushen. Seite, Sitemap-Eintrag und Karten-Einträge verschwinden automatisch.

## Frontmatter-Referenz

| Feld | Pflicht | Beschreibung |
| --- | --- | --- |
| `title` | ✓ | Projektname |
| `shortDescription` | ✓ | Kurzbeschreibung für die Karten |
| `description` | ✓ | Längere Beschreibung, auch als Meta-Description-Fallback |
| `coverImage` | ✓ | Pfad zum Titelbild, relativ zur `.md`-Datei |
| `coverImageAlt` | ✓ | Alt-Text des Titelbilds |
| `screenshots` | – | Liste von `{ src, alt, caption? }` für die Galerie |
| `technologies` | ✓ | Liste verwendeter Technologien |
| `liveUrl` | – | Link zur Live-Demo (Button wird nur angezeigt, wenn gesetzt) |
| `githubUrl` | – | Link zum Quellcode (Button wird nur angezeigt, wenn gesetzt) |
| `date` | ✓ | Erstellungsdatum (`YYYY-MM-DD`) |
| `updatedDate` | – | Datum der letzten größeren Überarbeitung |
| `category` | ✓ | z. B. "Web App", "Übungsprojekt" |
| `difficulty` | ✓ | `Beginner` \| `Intermediate` \| `Advanced` |
| `status` | ✓ | `completed` \| `in-progress` \| `planned` |
| `tags` | – | Für "Ähnliche Projekte" und Filterung |
| `featured` | – | Auf der Startseite bevorzugt anzeigen |
| `order` | – | Reihenfolge unter den featured Projekten |
| `seo` | – | Optionale Overrides für `description`/`title` |

Alle Felder werden über ein Zod-Schema in `src/content.config.ts` validiert — ein Tippfehler in der Frontmatter lässt den Build fehlschlagen, statt eine kaputte Seite live zu schalten.

## Deployment

Ein GitHub-Actions-Workflow (`.github/workflows/deploy.yml`) baut die Seite bei jedem Push auf `main` und deployed sie automatisch auf GitHub Pages (Custom Domain `bahadoran.de` über `public/CNAME`).

**Einmaliger manueller Schritt:** In den Repository-Settings unter **Pages** die Option **Source** auf **"GitHub Actions"** stellen (statt "Deploy from a branch").

## Platzhalter-Bilder ersetzen

Die aktuellen Cover-/Galerie-Bilder sind automatisch generierte Platzhalter (`scripts/generate-placeholders.mjs`, dark-navy/cyan Design passend zur Seite). Sobald echte Screenshots vorhanden sind, einfach die Dateien in `src/assets/images/projects/<slug>/` durch echte Bilder ersetzen (gleicher Dateiname oder Frontmatter-Pfad anpassen).

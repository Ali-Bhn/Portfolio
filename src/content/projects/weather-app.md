---
title: "Wetter App"
shortDescription: "Wetter-App mit Live-Daten von Open-Meteo: Stadtsuche, aktuelle Temperatur, Luftfeuchtigkeit und Wind."
description: "Eigenständig entwickelte Wetter-App mit HTML, CSS und JavaScript. Über die Open-Meteo API werden Geokoordinaten und Live-Wetterdaten geladen und dynamisch dargestellt."
coverImage: "../../assets/images/projects/weather-app/cover.jpg"
coverImageAlt: "Titelbild der Wetter App"
screenshots:
  - src: "../../assets/images/projects/weather-app/screenshot-1.jpg"
    alt: "Stadtsuche der Wetter App"
    caption: "Eingabefeld zur Suche einer Stadt"
  - src: "../../assets/images/projects/weather-app/screenshot-2.jpg"
    alt: "Wetterdetails der Wetter App"
    caption: "Angezeigte Wetterdetails nach der Suche"
technologies: ["HTML", "CSS", "JavaScript", "Fetch API", "Open-Meteo API"]
githubUrl: "https://github.com/Ali-Bhn/JS-Aufgaben/tree/main/aufgabe-7-Wheather%20App"
date: 2026-02-10
category: "Übungsprojekt"
difficulty: "Beginner"
status: "in-progress"
tags: ["javascript", "api", "dom", "fetch"]
featured: true
order: 2
---

## Overview

Eine kleine Wetter-App, die zeigt, wie man mit der Fetch API externe REST-Schnittstellen anspricht und die Antwort dynamisch ins DOM rendert — ganz ohne Framework.

## Problem

Ich wollte verstehen, wie man in reinem JavaScript asynchron Daten von zwei verschiedenen APIs lädt (Geocoding und Wetterdaten), Ladezustände und Fehler behandelt und das Ergebnis sauber ins DOM einfügt.

## Solution

Bei einer Suche wird zuerst über die Open-Meteo Geocoding-API der Stadtname in Koordinaten aufgelöst, danach mit diesen Koordinaten das aktuelle Wetter abgerufen. Während des Ladens erscheint ein Lade-Hinweis, bei leerer Eingabe oder unbekannter Stadt eine passende Fehlermeldung.

```js
async function ladeWetter(cityName) {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=de&format=json`;
  const responseLocation = await fetch(geocodingUrl);
  const dataLocation = await responseLocation.json();

  if (!dataLocation.results || dataLocation.results.length === 0) {
    renderError("Stadt nicht gefunden.");
    return;
  }
  // ... Wetterdaten für die gefundene Stadt laden
}
```

## Features

- Stadtsuche per Eingabefeld oder Enter-Taste
- Aktuelle Temperatur, Luftfeuchtigkeit und Windgeschwindigkeit
- Wettericon und -beschreibung passend zum WMO-Wettercode
- Lade- und Fehlerzustände statt einer leeren Seite

## Development Process

Die App ist bewusst ohne Build-Tool und Abhängigkeiten geschrieben, um die Grundlagen von `async`/`await`, `fetch` und DOM-Manipulation zu festigen, bevor Frameworks dazukommen.

## Challenges

> [!NOTE]
> Die Open-Meteo API benötigt keinen API-Key, dafür musste die Zuordnung von Wettercodes zu Icons/Beschreibungen selbst als `switch`-Tabelle gepflegt werden.

Das Verketten zweier abhängiger API-Aufrufe (erst Ort finden, dann Wetter für diesen Ort laden) mit sauberer Fehlerbehandlung an beiden Stellen war die größte Lernkurve.

## Lessons Learned

- `try`/`catch`/`finally` macht asynchrone Fehlerbehandlung deutlich lesbarer als verschachtelte `.then()`-Ketten
- UI-Zustände (Loading/Error/Success) früh einzuplanen erspart späteres Nachrüsten

## Future Improvements

- Standort automatisch über die Browser-Geolocation-API vorschlagen
- Mehrtägige Vorhersage statt nur aktueller Werte
- Eigenes Hosting (z. B. Netlify), damit ein Live-Demo-Link verlinkt werden kann

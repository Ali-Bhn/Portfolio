---
title: "Quiz App"
shortDescription: "Multiple-Choice-Quiz mit Punktestand-Tracking und Wiederholungsfunktion."
description: "Eine kleine Multiple-Choice-Quiz-App in Vanilla JavaScript: Fragen werden dynamisch gerendert, richtige und falsche Antworten visuell markiert und der Punktestand am Ende angezeigt."
coverImage: "../../assets/images/projects/quiz-app/cover.jpg"
coverImageAlt: "Titelbild der Quiz App"
screenshots:
  - src: "../../assets/images/projects/quiz-app/screenshot-1.jpg"
    alt: "Frage-und-Antwort-Ansicht der Quiz App"
    caption: "Eine Frage mit vier Antwortmöglichkeiten"
  - src: "../../assets/images/projects/quiz-app/screenshot-2.jpg"
    alt: "Ergebnisansicht der Quiz App"
    caption: "Punktestand am Ende des Quiz"
technologies: ["HTML", "CSS", "JavaScript", "DOM"]
githubUrl: "https://github.com/Ali-Bhn/JS-Aufgaben/tree/main/Aufgabe-10-Quiz-App"
date: 2026-03-05
category: "Übungsprojekt"
difficulty: "Beginner"
status: "in-progress"
tags: ["javascript", "dom", "events"]
---

## Overview

Eine Multiple-Choice-Quiz-App mit vier Beispielfragen zu Web-Grundlagen, die zeigt, wie man Zustand (aktuelle Frage, Punktestand) in reinem JavaScript verwaltet, ohne ein Framework zu nutzen.

## Problem

Ziel war es, Frage-für-Frage-Logik, Auswahl-Feedback (richtig/falsch) und einen Abschluss-Screen mit Punktestand umzusetzen — inklusive der Möglichkeit, das Quiz erneut zu starten.

## Solution

Die Fragen liegen als Array von Objekten vor. Für jede Frage werden die Antwort-Buttons dynamisch erzeugt, ein Klick markiert die gewählte sowie die tatsächlich richtige Antwort und deaktiviert alle Buttons, bis der "Weiter"-Button gedrückt wird.

```js
function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  // alle Buttons deaktivieren, richtige Antwort hervorheben
}
```

## Features

- Dynamisch gerenderte Fragen und Antwortmöglichkeiten
- Visuelles Feedback für richtige/falsche Auswahl
- Punktestand-Tracking über den gesamten Fragenkatalog
- "Play Again"-Funktion, die Zustand und Fragenindex zurücksetzt

## Development Process

Der Fokus lag auf einer klaren Zustandsmaschine: `currentQuestionIndex` und `score` als einzige veränderliche Werte, alles andere wird aus diesem Zustand neu gerendert.

## Challenges

> [!NOTE]
> Nach der letzten Frage übernimmt derselbe Button zwei Rollen ("Weiter" vs. "Play Again") — das musste sauber anhand des Frageindex unterschieden werden, um keinen zusätzlichen Button zu brauchen.

## Lessons Learned

- Zustand zentral zu halten (statt über viele einzelne Variablen verteilt) vereinfacht Reset-Logik enorm
- `dataset`-Attribute eignen sich gut, um Antwortdaten direkt am DOM-Element zu speichern

## Future Improvements

- Größerer, kategorisierter Fragenpool statt vier fester Fragen
- Timer pro Frage für mehr Spannung
- Highscore-Speicherung im `localStorage`

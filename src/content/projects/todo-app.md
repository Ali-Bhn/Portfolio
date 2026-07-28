---
title: "Todo App"
shortDescription: "Einfache Todo-Liste mit persistenter Speicherung im Browser über localStorage."
description: "Eine Todo-App in Vanilla JavaScript, die Aufgaben hinzufügt, löscht und dauerhaft im localStorage des Browsers speichert, sodass sie auch nach einem Reload erhalten bleiben."
coverImage: "../../assets/images/projects/todo-app/cover.jpg"
coverImageAlt: "Titelbild der Todo App"
screenshots:
  - src: "../../assets/images/projects/todo-app/screenshot-1.jpg"
    alt: "Aufgabenliste der Todo App"
    caption: "Liste bestehender Aufgaben"
  - src: "../../assets/images/projects/todo-app/screenshot-2.jpg"
    alt: "Neue Aufgabe hinzufügen in der Todo App"
    caption: "Eingabefeld zum Hinzufügen einer neuen Aufgabe"
technologies: ["HTML", "CSS", "JavaScript", "localStorage"]
githubUrl: "https://github.com/Ali-Bhn/JS-Aufgaben/tree/main/aufgabe-6-TodoApp"
date: 2026-01-15
category: "Übungsprojekt"
difficulty: "Beginner"
status: "in-progress"
tags: ["javascript", "localstorage", "dom"]
---

## Overview

Eine klassische Todo-Liste: Aufgaben hinzufügen, abhaken bzw. löschen, und alles bleibt auch nach dem Schließen des Tabs erhalten.

## Problem

Ohne Backend sollten Aufgaben trotzdem dauerhaft gespeichert werden — die Lösung war, den Browser selbst als einfache Datenbank zu nutzen.

## Solution

Jede Aufgabe ist ein Objekt mit `id`, `text` und `erledigt`-Status. Das gesamte Array wird bei jeder Änderung als JSON im `localStorage` gespeichert und beim Laden der Seite direkt wieder eingelesen.

```js
const neuesTodo = { id: Date.now(), text, erledigt: false };
todos.push(neuesTodo);
localStorage.setItem("todos", JSON.stringify(todos));
renderTodos();
```

## Features

- Aufgaben per Eingabefeld hinzufügen
- Aufgaben einzeln löschen
- Persistenz über Browser-Neustarts hinweg via `localStorage`
- Leere Eingaben werden ignoriert

## Development Process

Bewusst minimalistisch gehalten: ein Array als einzige Quelle der Wahrheit ("Single Source of Truth"), eine `renderTodos()`-Funktion, die die Liste bei jeder Änderung komplett neu zeichnet.

## Challenges

> [!TIP]
> `Date.now()` als eindeutige ID ist einfach, aber bei sehr schnellen, aufeinanderfolgenden Aktionen theoretisch nicht kollisionssicher — für dieses Übungsprojekt aber vollkommen ausreichend.

## Lessons Learned

- `localStorage` ist ein einfacher Einstieg in clientseitige Persistenz, bevor eine echte Datenbank nötig ist
- Ein "Re-render bei jeder Änderung"-Ansatz ist leicht verständlich, zeigt aber auch die Grenzen von Vanilla JS bei größeren Listen

## Future Improvements

- Aufgaben als erledigt markieren statt nur löschen zu können
- Drag-and-drop-Sortierung
- Kategorien/Tags pro Aufgabe

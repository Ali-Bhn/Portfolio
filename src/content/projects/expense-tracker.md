---
title: "Expense Tracker"
shortDescription: "Ausgaben-Tracker mit Einnahmen/Ausgaben-Übersicht, Saldo-Berechnung und Euro-Formatierung."
description: "Ein Ausgaben-Tracker in Vanilla JavaScript: Transaktionen werden erfasst, als Einnahme oder Ausgabe eingeordnet und der Saldo automatisch berechnet und formatiert."
coverImage: "../../assets/images/projects/expense-tracker/cover.jpg"
coverImageAlt: "Titelbild des Expense Trackers"
screenshots:
  - src: "../../assets/images/projects/expense-tracker/screenshot-1.jpg"
    alt: "Kontoübersicht des Expense Trackers"
    caption: "Saldo, Einnahmen und Ausgaben im Überblick"
  - src: "../../assets/images/projects/expense-tracker/screenshot-2.jpg"
    alt: "Transaktionsverlauf des Expense Trackers"
    caption: "Liste aller erfassten Transaktionen"
technologies: ["HTML", "CSS", "JavaScript", "localStorage", "Intl API"]
githubUrl: "https://github.com/Ali-Bhn/JS-Aufgaben/tree/main/Aufgabe-15-Expense-Tracker"
date: 2026-04-20
category: "Übungsprojekt"
difficulty: "Beginner"
status: "in-progress"
tags: ["javascript", "localstorage", "forms"]
---

## Overview

Ein einfacher Ausgaben-Tracker: Transaktionen mit Betrag und Beschreibung erfassen, automatisch als Einnahme (positiv) oder Ausgabe (negativ) einordnen und den Saldo live berechnen.

## Problem

Ich wollte Formularverarbeitung, Datenaggregation (Summen, Filter) und Währungsformatierung in einer kleinen, realistischen Anwendung üben.

## Solution

Ein Formular nimmt Beschreibung und Betrag entgegen. Beim Absenden wird die Transaktion im `localStorage` gespeichert, die Liste neu gerendert und Saldo, Einnahmen sowie Ausgaben über `Array.reduce` neu berechnet.

```js
function updateSummary() {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}
```

## Features

- Transaktionen mit Beschreibung und Betrag erfassen
- Automatische Einordnung als Einnahme oder Ausgabe je nach Vorzeichen
- Live berechneter Saldo, inklusive Euro-Formatierung über die `Intl.NumberFormat`-API
- Einzelne Transaktionen löschen
- Persistenz über `localStorage`

## Development Process

Der Datenfluss ist bewusst einfach gehalten: ein Array `transactions` als einzige Datenquelle, zwei reine Anzeige-Funktionen (`updateTransactionList`, `updateSummary`), die nach jeder Änderung erneut aufgerufen werden.

## Challenges

> [!WARNING]
> Die ursprüngliche Lösch-Implementierung nutzte ein Inline-`onclick`-Attribut mit globaler Funktion — funktional, aber nicht die sauberste Variante. Eine Migration zu `addEventListener` mit Event-Delegation ist eine sinnvolle nächste Verbesserung.

## Lessons Learned

- `Intl.NumberFormat` übernimmt Währungsformatierung zuverlässiger als manuelle String-Verkettung
- Positive/negative Vorzeichen als einfache Möglichkeit, Einnahmen und Ausgaben ohne zusätzliches Feld zu unterscheiden

## Future Improvements

- Kategorien pro Transaktion (z. B. Miete, Freizeit, Gehalt)
- Diagramm-Übersicht der Ausgaben pro Kategorie
- Export als CSV

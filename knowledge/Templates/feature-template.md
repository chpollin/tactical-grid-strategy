---
type: feature
phase:
status: draft
priority:
created: {{date}}
updated: {{date}}
tags: [feature]
---

# Feature: [Feature-Name]

## Beschreibung

[Kurze Beschreibung des Features in 1-2 Sätzen]

---

## Motivation

**Problem:**
[Welches Problem löst dieses Feature?]

**User-Story:**
Als [Benutzer-Typ] möchte ich [Ziel], damit [Nutzen].

---

## Anforderungen

### Funktionale Requirements
- [ ] FR-X.1: [Requirement-Beschreibung]
- [ ] FR-X.2: [Requirement-Beschreibung]

### Non-Funktionale Requirements
- [ ] NFR-X.1: Performance < Xms
- [ ] NFR-X.2: Browser-Kompatibilität

---

## Design

### UI/UX
[Skizze, Screenshot oder Beschreibung]

### Datenstrukturen
```javascript
// Neue/geänderte Datenstrukturen
const newFeature = {
    ...
};
```

### API-Änderungen
- Neue Funktionen: `functionName()`
- Geänderte Module: `module.js`

---

## Implementierung

### Betroffene Dateien
- [ ] `js/module.js` - [Änderung]
- [ ] `css/style.css` - [Änderung]

### Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Geschätzte Zeit
X Stunden

---

## Tests

### Testfälle
- [ ] TC-X: [Testfall-Beschreibung]
- [ ] TC-Y: [Testfall-Beschreibung]

### Akzeptanzkriterien
- [ ] [Kriterium 1]
- [ ] [Kriterium 2]

---

## Dependencies

### Blockiert durch:
- [[feature-name|Feature X]]

### Blockiert:
- [[feature-name|Feature Y]]

### Related:
- [[02-Design/GAME_DESIGN#Section|Game Design Concept]]
- [[04-Requirements/REQUIREMENTS#FR-X|Related Requirement]]

---

## Notizen

[Zusätzliche Gedanken, Risiken, Alternativen]

---

**Status:** Draft
**Owner:** [Name]
**Phase:** [MVP / Phase 2 / Phase 3 / Phase 4]

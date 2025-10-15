---
type: bug
severity:
status: open
created: {{date}}
updated: {{date}}
tags: [bug]
---

# Bug: [Kurze Beschreibung]

## Symptom

**Was passiert:**
[Beschreibung des Fehlers]

**Erwartetes Verhalten:**
[Was sollte eigentlich passieren?]

---

## Reproduktion

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Reproduzierbarkeit
- [ ] Immer (100%)
- [ ] Häufig (>50%)
- [ ] Manchmal (<50%)
- [ ] Selten

---

## Umgebung

**Browser:** [Chrome 120 / Firefox 119 / Edge 120]
**OS:** [Windows 11 / macOS 14 / Linux]
**Bildschirmauflösung:** [1920x1080]

---

## Logs & Errors

### Console Output
```javascript
// Console-Errors (F12)
Error: ...
```

### Game State
```javascript
// gameState-Snapshot (falls relevant)
{
    turn: X,
    currentPlayer: Y,
    ...
}
```

### Screenshots
[Füge Screenshots hinzu]

---

## Analyse

### Root Cause (vermutlich)
[Hypothese über die Ursache]

### Betroffener Code
- **Datei:** `js/module.js`
- **Funktion:** `functionName()`
- **Zeile:** ~XX

### Related Issues
- [[bug-name|Similar Bug]]
- [[04-Requirements/REQUIREMENTS#TC-X|Failed Test Case]]

---

## Priorität & Impact

**Severity:**
- [ ] **Critical** - Spiel unspielbar
- [ ] **High** - Major Feature kaputt
- [ ] **Medium** - Minor Feature kaputt
- [ ] **Low** - Kosmetisch

**Impact:**
- [ ] Blockt MVP-Release
- [ ] Blockt Phase X
- [ ] Nice-to-fix

---

## Fix

### Vorgeschlagene Lösung
[Wie könnte der Bug behoben werden?]

### Betroffene Dateien
- [ ] `js/module.js` - [Änderung]

### Tests nach Fix
- [ ] TC-X erneut durchführen
- [ ] Regression-Tests

---

## Notizen

[Zusätzliche Beobachtungen, Workarounds]

---

**Status:** Open
**Assigned to:** [Name]
**Fixed in:** [Version]

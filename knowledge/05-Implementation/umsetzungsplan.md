# Umsetzungsplan: Webbasiertes Strategie-Spiel

**Projekt:** Turn-based Strategy Game
**Technologie:** Vanilla JavaScript, HTML5, CSS3
**Ansatz:** MVP → Iterative Erweiterung

---

## Phase 1: MVP (Minimum Viable Product) - Tag 1-2

### Ziel
Ein spielbares, rundenbasiertes Strategie-Spiel mit Grundfunktionen.

### Features
- [x] 8x8 Grid-Spielfeld
- [x] 2 Spieler (Hot-Seat am selben Computer)
- [x] Je 5 Einheiten pro Spieler
- [x] Einheiten auswählen und bewegen
- [x] Einfacher Kampf (Einheit trifft auf Gegner)
- [x] Siegbedingung: Alle gegnerischen Einheiten eliminiert

### Technische Umsetzung

#### 1.1 Projekt-Setup (30 Min)
```
Dateistruktur:
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── game.js
│   ├── map.js
│   └── units.js
└── README.md
```

#### 1.2 HTML-Grundstruktur (30 Min)
- Einfaches HTML5-Dokument
- Container für Spielfeld
- Info-Panel (aktueller Spieler, Statistiken)
- Buttons (Spielzug beenden, Neues Spiel)

#### 1.3 CSS-Styling (1 Stunde)
- Grid-Layout mit CSS Grid oder Flexbox
- Kachel-Design (Schachbrett-Muster)
- Einheiten als farbige Kreise/Quadrate oder Emojis
- Hover-Effekte für Interaktivität
- Highlight für ausgewählte Einheit

#### 1.4 Spielfeld-Logik (2 Stunden)
```javascript
// map.js
- createMap(width, height) - 2D Array erstellen
- renderMap() - HTML-Elemente generieren
- getTile(x, y) - Kachel-Informationen abrufen
- highlightTile(x, y) - Visuelle Hervorhebung
```

#### 1.5 Einheiten-System (2 Stunden)
```javascript
// units.js
- Unit-Objekt: { id, player, x, y, hp, attack, movement }
- createUnits() - Start-Einheiten platzieren
- moveUnit(unit, newX, newY) - Bewegung validieren & ausführen
- attackUnit(attacker, defender) - Kampfmechanik
```

#### 1.6 Game-Loop & State (3 Stunden)
```javascript
// game.js
- game.state: { currentPlayer, selectedUnit, units, turn }
- init() - Spiel initialisieren
- selectUnit(x, y) - Einheit auswählen
- handleTileClick(x, y) - Hauptinteraktion
- endTurn() - Spieler wechseln
- checkWinCondition() - Siegbedingung prüfen
```

#### 1.7 Event-Handling (1 Stunde)
- Click-Events auf Kacheln
- Button-Events (End Turn, New Game)
- Keyboard-Shortcuts (optional)

#### 1.8 Testing & Bugfixing (1 Stunde)
- Gameplay testen
- Edge Cases fixen
- UI-Feedback verbessern

---

## Phase 2: Erste Erweiterungen - Tag 3-4

### 2.1 Verschiedene Einheitentypen (2 Stunden)
- **Krieger:** Hoher Angriff, niedrige Bewegung
- **Späher:** Niedrige HP, hohe Bewegung
- **Bogenschütze:** Fernkampf (2 Felder Reichweite)

### 2.2 Bewegungsreichweite visualisieren (1 Stunde)
- Highlight aller erreichbaren Felder beim Auswählen
- Validierung: Einheit kann nur X Felder weit ziehen

### 2.3 Angriffsreichweite & Vorschau (1 Stunde)
- Anzeige möglicher Angriffsziele
- Damage-Vorschau vor Angriff

### 2.4 Animations-System (2 Stunden)
- CSS-Transitions für Bewegung
- Kampf-Animationen (z.B. Shake-Effekt)
- HP-Balken mit Fade-Effekt

### 2.5 Sound-Effekte (1 Stunde)
- Klick-Sound
- Kampf-Sound
- Sieg/Niederlage-Sound
- (mit Web Audio API oder einfache <audio>-Tags)

---

## Phase 3: Ressourcen & Gebäude - Tag 5-7

### 3.1 Ressourcen-System (3 Stunden)
```javascript
resources: {
    player1: { gold: 100, wood: 50 },
    player2: { gold: 100, wood: 50 }
}
```
- Ressourcen-Anzeige im UI
- Ressourcen-Kosten für Aktionen

### 3.2 Einheiten rekrutieren (2 Stunden)
- Button "Einheit kaufen" im UI
- Kosten: Gold/Holz
- Einheit auf Startfeld spawnen

### 3.3 Gebäude platzieren (3 Stunden)
- **Basis/HQ:** Rekrutierungspunkt
- **Goldmine:** +10 Gold pro Runde
- **Turm:** Verteidigungsstruktur
- Bau-Menü im UI

### 3.4 Terrain-Typen (2 Stunden)
- **Gras:** Normal
- **Wald:** +1 Verteidigung, -1 Bewegung
- **Gebirge:** Unpassierbar
- Zufällige Map-Generierung

---

## Phase 4: KI-Gegner - Tag 8-10

### 4.1 Simple KI (4 Stunden)
```javascript
// ai.js
- Random Movement (erstmal)
- Angriff wenn in Reichweite
- Bewegt sich Richtung Gegner
```

### 4.2 Bessere KI (4 Stunden)
- **Minimax-Algorithmus** (vereinfacht)
- Bewertung von Spielzuständen
- Defensive/Offensive Strategie

### 4.3 Schwierigkeitsstufen (2 Stunden)
- Leicht: Random Moves
- Mittel: Basis-Strategie
- Schwer: Optimierte Züge

---

## Phase 5: Polish & Features - Tag 11-14

### 5.1 UI/UX Verbesserungen (3 Stunden)
- Besseres Design (moderne UI)
- Tooltips (Einheiten-Info beim Hover)
- Tutorial/Anleitung
- Responsive Design (Mobile)

### 5.2 Save/Load System (3 Stunden)
- localStorage nutzen
- Spielstand speichern
- Spielstand laden

### 5.3 Multiplayer (Optional, 6+ Stunden)
- WebSocket-Server (z.B. Node.js + Socket.io)
- Online-Matches
- **KOMPLEX! Nur wenn Zeit**

### 5.4 Map-Editor (2 Stunden)
- Eigene Maps erstellen
- JSON-Export/Import

### 5.5 Campaign-Modus (4 Stunden)
- 5-10 vordefinierte Missionen
- Steigende Schwierigkeit
- Story-Elemente (Text)

---

## Technische Entscheidungen

### ✅ Was wir nutzen
- **DOM-Rendering** (HTML/CSS) statt Canvas
  - Grund: Einfacher zu debuggen, CSS-Animationen gratis
- **ES6 Module** (import/export)
  - Grund: Saubere Code-Organisation
- **Einfache Objekte** statt komplexe Klassen
  - Grund: Weniger Overhead, schneller produktiv
- **localStorage** für Saves
  - Grund: Keine Backend-Infrastruktur nötig

### ❌ Was wir vermeiden (am Anfang)
- Komplexe Frameworks (React, Vue)
- WebGL/Canvas (erst später wenn nötig)
- Backend/Datenbank (localStorage reicht)
- Komplexe Build-Tools (Webpack, etc.)

---

## Meilensteine & Timeline

| Phase | Zeitrahmen | Deliverable |
|-------|------------|-------------|
| **Phase 1** | Tag 1-2 | Spielbares MVP |
| **Phase 2** | Tag 3-4 | Poliertes Gameplay |
| **Phase 3** | Tag 5-7 | Strategische Tiefe |
| **Phase 4** | Tag 8-10 | KI-Gegner |
| **Phase 5** | Tag 11-14 | Finales Produkt |

---

## Erfolgsmetriken

### MVP ist erfolgreich wenn:
- [x] 2 Spieler können gegeneinander spielen
- [x] Spiel ist verständlich ohne Anleitung
- [x] Keine Game-Breaking Bugs
- [x] Jedes Spiel endet mit klarem Sieger

### Finales Produkt ist erfolgreich wenn:
- [x] Spaßig für mindestens 30 Minuten Gameplay
- [x] KI bietet Herausforderung
- [x] Visuell ansprechend
- [x] Performance: 60 FPS auf Durchschnitts-PC
- [x] Code ist wartbar und erweiterbar

---

## Nächste Schritte

1. **JETZT:** Mit Phase 1.1 starten (Projekt-Setup)
2. **Dann:** MVP in 1-2 Tagen durchziehen
3. **Review:** MVP testen und Feedback einholen
4. **Entscheiden:** Welche Features aus Phase 2+ umsetzen

---

## Risiken & Mitigation

| Risiko | Wahrscheinlichkeit | Mitigation |
|--------|-------------------|------------|
| Scope Creep (zu viele Features) | Hoch | Strikt an MVP halten, Features erst nach MVP |
| Performance-Probleme | Mittel | Profiling, ggf. auf Canvas umsteigen |
| Komplexe KI zu schwer | Mittel | Simple Random-KI zuerst, dann verbessern |
| Zeit-Überschreitung | Mittel | Phasen 4-5 sind optional |

---

## Ressourcen & Lernen

### Hilfreiche Tutorials
- MDN Web Docs (JavaScript, Canvas)
- Game Development Patterns (Robert Nystrom)
- Red Blob Games (Hexagons, Pathfinding)

### Inspiration
- Battle for Wesnoth (Open Source TBS)
- Into the Breach
- Fire Emblem

---

**Viel Erfolg! 🎮**

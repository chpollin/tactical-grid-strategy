# REQUIREMENTS: Funktionale & Non-Funktionale Anforderungen

**Version:** 1.1 (Feedback-Integration)
**Abhängigkeiten:** README.md, GAME_DESIGN.md, DATA.md
**Status:** Requirements Finalized + Patches

---

## 1. Funktionale Anforderungen (MVP - Phase 1)

### FR-1: Spielfeld-Darstellung
**Priorität:** MUSS
**Testbar:** ✅

- **FR-1.1:** System zeigt 8x8 Grid mit sichtbaren Grenzen
- **FR-1.2:** Jede Tile hat eindeutige Koordinaten (x,y mit x,y ∈ [0,7])
- **FR-1.3:** Tiles haben visuelle Unterscheidung (Schachbrett-Muster)
- **FR-1.4:** Alle Tiles sind per Mausklick auswählbar

**Akzeptanzkriterium:** Spieler kann alle 64 Tiles visuell unterscheiden und anklicken.

---

### FR-2: Einheiten-Verwaltung
**Priorität:** MUSS
**Testbar:** ✅

- **FR-2.1:** Spiel startet mit 5 Einheiten pro Spieler (siehe DATA.md)
- **FR-2.2:** Einheiten sind visuell unterscheidbar (Spieler 1: Blau, Spieler 2: Rot)
- **FR-2.3:** Einheitentyp ist erkennbar (Warrior, Scout, Archer)
- **FR-2.4:** HP-Anzeige über/unter jeder Einheit
- **FR-2.5:** Einheit kann nur vom aktuellen Spieler ausgewählt werden

**Akzeptanzkriterium:** Spieler sieht alle Einheiten, deren Typ, HP und Zugehörigkeit.

---

### FR-3: Einheit Auswählen
**Priorität:** MUSS
**Testbar:** ✅

- **FR-3.1:** Klick auf eigene Einheit → Einheit wird ausgewählt (visuelle Markierung)
- **FR-3.2:** Klick auf leeres Tile/Gegner während Auswahl → Deselect
- **FR-3.3:** Klick auf andere eigene Einheit → Wechsel der Auswahl
- **FR-3.4:** Nur eine Einheit kann gleichzeitig ausgewählt sein

**Akzeptanzkriterium:** Genau eine Einheit ist zu jedem Zeitpunkt selected (oder keine).

---

### FR-4: Bewegung
**Priorität:** MUSS
**Testbar:** ✅

- **FR-4.1:** Nach Auswahl: Erreichbare Tiles werden hervorgehoben (grün)
- **FR-4.2:** Bewegungsreichweite basiert auf `unit.movement` (Warrior: 2, Scout: 4, Archer: 2)
- **FR-4.3:** Bewegung ist **nur orthogonal** (↑↓←→), **keine Diagonalen**
- **FR-4.4:** Klick auf erreichbares Tile → Einheit bewegt sich dorthin
- **FR-4.5:** Einheit kann nicht durch andere Einheiten ziehen
- **FR-4.6:** Einheit kann nicht über Spielfeldrand hinaus
- **FR-4.7:** Nach Bewegung: `hasMoved = true`
- **FR-4.8:** Einheit mit `hasMoved = true` kann nicht erneut bewegen (diese Runde)
- **FR-4.9:** ⚠️ **Einheit mit `hasAttacked = true` kann sich in dieser Runde NICHT mehr bewegen** (Attack→Move verboten)

**Akzeptanzkriterium:** Warrior kann max. 2 Tiles orthogonal (nur ↑↓←→), Scout max. 4 Tiles orthogonal.

---

### FR-5: Angriff (Nahkampf)
**Priorität:** MUSS
**Testbar:** ✅

- **FR-5.1:** Nach Bewegung/Auswahl: Angreifbare Gegner werden hervorgehoben (rot)
- **FR-5.2:** Warrior/Scout können nur adjacent (1 Tile) angreifen
- **FR-5.3:** Klick auf Gegner in Range → Kampf wird ausgeführt
- **FR-5.4:** Schaden = `Attacker.attack - Defender.defense` (min. 1)
- **FR-5.5:** Defender schlägt zurück (wenn HP > 0 nach Angriff)
- **FR-5.6:** Gegenangriff-Schaden = `Defender.attack - Attacker.defense` (min. 1)
- **FR-5.7:** Unit mit HP ≤ 0 wird vom Spielfeld entfernt
- **FR-5.8:** Nach Angriff: `hasAttacked = true`

**Akzeptanzkriterium:** Warrior (ATK 4) gegen Scout (DEF 1, HP 6) macht 3 Schaden → Scout hat 3 HP übrig.

---

### FR-6: Angriff (Fernkampf - Archer)
**Priorität:** MUSS
**Testbar:** ✅

- **FR-6.1:** Archer kann Gegner in 2-3 Tiles Entfernung angreifen (Manhattan-Distanz)
- **FR-6.2:** Archer kann NICHT adjacent (1 Tile) angreifen
- **FR-6.3:** Fernkampf löst KEINEN Gegenangriff aus
- **FR-6.4:** Fernkampf-Schaden wie Nahkampf berechnet
- **FR-6.5:** ⚠️ **MVP: KEIN Line-of-Sight** - Archer schießt rein reichweitenbasiert (Phase 2: LoS mit Terrain)

**Akzeptanzkriterium:** Archer schießt auf Warrior 2 Tiles entfernt → Warrior schlägt nicht zurück.

---

### FR-7: Rundenende
**Priorität:** MUSS
**Testbar:** ✅

- **FR-7.1:** "End Turn" Button ist jederzeit klickbar
- **FR-7.2:** Nach Klick: `currentPlayer` wechselt (1 → 2 → 1 → ...)
- **FR-7.3:** Alle Einheiten des vorherigen Spielers: `hasMoved = false`, `hasAttacked = false`
- **FR-7.4:** Turn-Counter erhöht sich um 1 (wenn wieder bei Spieler 1)
- **FR-7.5:** UI zeigt aktuellen Spieler an ("Spieler 1's Zug" / "Spieler 2's Zug")

**Akzeptanzkriterium:** Nach "End Turn" kann Spieler 2 seine Einheiten bewegen, Spieler 1 nicht.

---

### FR-8: Siegbedingung
**Priorität:** MUSS
**Testbar:** ✅

- **FR-8.1:** Nach jedem Angriff: Prüfe ob ein Spieler keine Einheiten mehr hat
- **FR-8.2:** Wenn Spieler keine Einheiten: Gegner gewinnt
- **FR-8.3:** Victory-Screen zeigt Gewinner an
- **FR-8.4:** "New Game" Button startet Spiel neu (zurück zu INITIAL_STATE)

**Akzeptanzkriterium:** Wenn Spieler 1 alle Einheiten verliert → "Spieler 2 gewinnt!" Screen.

---

### FR-9: UI-Feedback
**Priorität:** MUSS
**Testbar:** ✅

- **FR-9.1:** Hover über Tile → Tile wird hervorgehoben
- **FR-9.2:** Kampf-Animation (z.B. Shake-Effekt bei Schaden)
- **FR-9.3:** HP-Änderung visuell angezeigt (Zahl blinkt bei Schaden)
- **FR-9.4:** Game-Log zeigt letzte 5 Aktionen (z.B. "Warrior moved to [3,5]")

**Akzeptanzkriterium:** Spieler versteht jede Aktion ohne Console zu öffnen.

---

## 2. Non-Funktionale Anforderungen

### NFR-1: Performance
**Priorität:** MUSS

- **NFR-1.1:** Initial Load: < 2 Sekunden
- **NFR-1.2:** Click-Response: < 50ms
- **NFR-1.3:** Animation Frame-Rate: 60 FPS
- **NFR-1.4:** Spiel läuft auf modernen Browsern (Chrome, Firefox, Edge)

**Testbar:** ✅ (mit Performance-Profiling)

---

### NFR-2: Code-Qualität
**Priorität:** SOLLTE

- **NFR-2.1:** Vanilla JavaScript (ES6+), keine Frameworks
- **NFR-2.2:** Modulare Struktur (separate Files: game.js, map.js, units.js)
- **NFR-2.3:** Funktionen sind maximal 50 Zeilen lang
- **NFR-2.4:** Kritische Funktionen haben JSDoc-Kommentare
- **NFR-2.5:** ⚠️ **Keine globalen Variablen** - `gameState` wird aus `state.js` exportiert
- **NFR-2.6:** ⚠️ **Keine direkten Map-Zugriffe** außerhalb `map.js` - nur via API (`getTileAt`, `moveUnit`)

**Testbar:** ✅ (Code-Review)

---

### NFR-3: Wartbarkeit
**Priorität:** SOLLTE

- **NFR-3.1:** Datenstrukturen wie in DATA.md definiert
- **NFR-3.2:** Game-Regeln sind in GAME_DESIGN.md dokumentiert
- **NFR-3.3:** Magic Numbers als Konstanten (z.B. `GRID_SIZE = 8`)
- **NFR-3.4:** Code ist ohne Kommentare verständlich (sprechende Namen)

**Testbar:** ✅ (Code-Review gegen DATA.md)

---

### NFR-4: Benutzerfreundlichkeit
**Priorität:** MUSS

- **NFR-4.1:** Spiel ist ohne Tutorial verständlich (MVP)
- **NFR-4.2:** Alle Aktionen sind rückgängig machbar (via Deselect)
- **NFR-4.3:** Keine "Game-Breaking" Bugs (Spiel bleibt nicht hängen)
- **NFR-4.4:** Farben sind color-blind-friendly (Blau/Rot + Symbole)

**Testbar:** ✅ (User-Testing mit 3 Personen)

---

### NFR-5: Browser-Kompatibilität
**Priorität:** MUSS

- **NFR-5.1:** Chrome 90+
- **NFR-5.2:** Firefox 88+
- **NFR-5.3:** Edge 90+
- **NFR-5.4:** Safari 14+ (optional)

**Testbar:** ✅ (Cross-Browser Testing)

---

## 3. Phase 2 Requirements (Nice-to-Have)

### FR-10: Terrain-System
**Priorität:** KANN
**Testbar:** ✅

- **FR-10.1:** Tiles haben Terrain-Typen (Grass, Forest, Mountain)
- **FR-10.2:** Forest: +1 Defense Bonus
- **FR-10.3:** Forest: Bewegungskosten = 2 (statt 1)
- **FR-10.4:** Mountain: Unpassierbar

---

### FR-11: Animationen
**Priorität:** KANN
**Testbar:** ✅

- **FR-11.1:** Einheit gleitet zu neuem Tile (CSS Transition)
- **FR-11.2:** Angriff: Attacker bewegt sich leicht zum Ziel (Shake)
- **FR-11.3:** Tod: Einheit faded aus (Opacity 1 → 0)
- **FR-11.4:** HP-Balken: Smooth Decrease bei Schaden

---

## 4. Phase 3 Requirements (Erweiterungen)

### FR-12: Ressourcen-System
**Priorität:** KANN

- **FR-12.1:** Spieler startet mit 100 Gold, 50 Wood
- **FR-12.2:** +10 Gold pro Runde (automatisch)
- **FR-12.3:** Ressourcen-Anzeige im UI (Top-Right Panel)

---

### FR-13: Einheiten-Rekrutierung
**Priorität:** KANN

- **FR-13.1:** "Recruit" Button bei Auswahl von HQ
- **FR-13.2:** Auswahl aus 3 Einheitentypen
- **FR-13.3:** Kosten werden von Ressourcen abgezogen
- **FR-13.4:** Neue Einheit spawnt adjacent zu HQ
- **FR-13.5:** Max 1 Rekrutierung pro HQ pro Runde

---

### FR-14: Gebäude
**Priorität:** KANN

- **FR-14.1:** HQ existiert von Spielstart (pro Spieler)
- **FR-14.2:** Goldmine kann gebaut werden (100 Gold, 50 Wood)
- **FR-14.3:** Goldmine: +20 Gold pro Runde
- **FR-14.4:** Turm kann gebaut werden (80 Gold, 30 Wood)
- **FR-14.5:** Turm: ATK 3, Range 2, HP 15 (statisch, schießt automatisch)

---

## 5. Phase 4 Requirements (KI)

### FR-15: KI-Gegner
**Priorität:** KANN

- **FR-15.1:** "Play vs AI" Option im Hauptmenü
- **FR-15.2:** KI bewegt alle ihre Einheiten pro Zug
- **FR-15.3:** KI greift an, wenn Gegner in Reichweite
- **FR-15.4:** KI bewegt sich Richtung nächster Gegner (Simple Pathfinding)
- **FR-15.5:** KI-Zug dauert max. 3 Sekunden

---

## 6. Testfälle (Akzeptanz-Tests)

### TC-1: Basis-Gameplay
```
GIVEN: Neues Spiel gestartet
WHEN: Spieler 1 wählt Warrior bei [1,7]
THEN: Warrior ist selected, Tiles [0,7], [2,7], [1,6], [1,5] sind grün highlighted

WHEN: Spieler 1 klickt auf [1,5]
THEN: Warrior steht bei [1,5], hasMoved = true

WHEN: Spieler 1 klickt erneut auf Warrior
THEN: Keine Movement-Highlights (da hasMoved = true)
```

### TC-2: Kampf & Gegenangriff
```
GIVEN: Warrior (ATK 4, HP 10) bei [3,3], Scout (DEF 1, HP 6) bei [3,4]
WHEN: Warrior greift Scout an
THEN: Scout HP = 3 (6 - (4-1)), Warrior HP = 9 (10 - max(1, 2-2))

WHEN: Scout greift Warrior an (nächste Runde)
THEN: Warrior HP = 8 (9 - 1)
```

### TC-3: Archer-Fernkampf
```
GIVEN: Archer bei [2,2], Warrior bei [4,2]
WHEN: Archer greift Warrior an (Distanz = 2)
THEN: Warrior verliert 2 HP (3-1), Warrior schlägt NICHT zurück
```

### TC-4: Siegbedingung
```
GIVEN: Spieler 1 hat 1 Scout (HP 1), Spieler 2 hat 1 Warrior
WHEN: Warrior tötet Scout
THEN: Victory Screen "Spieler 2 gewinnt!"
```

### TC-5: Runden-Wechsel
```
GIVEN: Spieler 1 am Zug, alle Units hasMoved = true
WHEN: "End Turn" geklickt
THEN: currentPlayer = 2, alle Spieler 1 Units: hasMoved = false
```

### TC-6: Archer Adjacent-Verbot (NEU)
```
GIVEN: Archer bei [3,3], Warrior bei [3,4] (adjacent, Distanz = 1)
WHEN: Spieler versucht Archer auf Warrior anzugreifen
THEN: Warrior wird NICHT als Angriffsziel highlighted (nicht in Range 2-3)
```

### TC-7: Attack→Move Verbot (NEU)
```
GIVEN: Warrior bei [3,3], Scout bei [3,4]
WHEN: Warrior greift Scout an (hasAttacked = true)
THEN: Keine Movement-Highlights mehr für Warrior (Bewegung gesperrt)

WHEN: Spieler klickt auf Warrior
THEN: Nur Attack-Range wird angezeigt (falls weitere Gegner in Range)
```

### TC-8: Bewegungs-Blockierung (NEU)
```
GIVEN: Scout bei [2,2], Warrior (Spieler 1) bei [3,2], Ziel bei [5,2]
WHEN: Scout versucht sich zu [5,2] zu bewegen
THEN: [4,2] und [5,2] sind NICHT erreichbar (Warrior blockiert Pfad)
```

---

## 7. Out-of-Scope (Explizit NICHT in MVP)

❌ Online-Multiplayer (WebSockets)
❌ Mobile Touch-Optimierung
❌ Sound-Effekte (erst Phase 2)
❌ Tutorial/Onboarding (erst Phase 5)
❌ Save/Load System (erst Phase 5)
❌ Custom Maps (erst Phase 5)
❌ Abilities/Special Powers
❌ Items/Equipment

---

## 8. Validierungs-Checkliste

Vor Code-Implementierung prüfen:

- [ ] Alle MUSS-Requirements implementiert?
- [ ] Testfälle **TC-1 bis TC-8** erfolgreich?
- [ ] Performance NFR-1 erfüllt?
- [ ] Code folgt DATA.md Strukturen?
- [ ] Keine Magic Numbers (alle als Konstanten)?
- [ ] **tiles[y][x] korrekt verwendet** (nicht [x][y])?
- [ ] **Map-Zugriffe nur via map.js API**?
- [ ] **Attack→Move explizit verhindert**?
- [ ] Cross-Browser getestet?

---

**Savepoint v1.1:** Alle Requirements + Feedback-Patches integriert. Code wird gegen TC-1 bis TC-8 validiert.

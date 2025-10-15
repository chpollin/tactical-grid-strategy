# MVP Testing Guide

**Version:** 1.0
**Datum:** 2025-10-15
**Status:** MVP Ready for Testing

---

## 🚀 Spiel starten

1. Öffne `index.html` in einem Browser (Chrome, Firefox, Edge)
2. Spiel startet automatisch

---

## ✅ Testfälle (TC-1 bis TC-8)

### TC-1: Basis-Gameplay ✅
**Ziel:** Bewegung funktioniert korrekt

1. Klick auf **Warrior bei [1,7]** (Spieler 1, blau, unten links)
2. **Erwarte:** Warrior ist selected (gelber Border), grüne Tiles zeigen Bewegungsreichweite
3. **Check:** Tiles [0,7], [2,7], [1,6], [1,5] sind grün highlighted (max 2 Tiles)
4. Klick auf **[1,5]** (2 Tiles nach oben)
5. **Erwarte:** Warrior steht jetzt bei [1,5]
6. **Erwarte:** Log zeigt "warrior moved to [1,5]"
7. Klick erneut auf Warrior
8. **Erwarte:** KEINE grünen Tiles (hasMoved = true)
9. **Erwarte:** Rote Tiles zeigen Angriffsziele

---

### TC-2: Kampf & Gegenangriff ✅
**Ziel:** Nahkampf + Counter-Damage funktioniert

1. Bewege **Warrior (Spieler 1)** zu **[2,6]**
2. Klick "Spielzug beenden"
3. Bewege **Scout (Spieler 2)** von [2,0] zu **[2,5]** (adjacent zu Warrior)
4. Klick "Spielzug beenden"
5. Warrior greift Scout an
6. **Erwarte:** Scout HP sinkt von 6 auf 3 (Damage: 4 ATK - 1 DEF = 3)
7. **Erwarte:** Warrior HP sinkt von 10 auf 9 (Counter: 2 ATK - 2 DEF = 1 min)
8. **Erwarte:** Log zeigt beide Schäden

---

### TC-3: Archer-Fernkampf ✅
**Ziel:** Archer schießt ohne Gegenangriff

1. Bewege **Archer (Spieler 1)** von [3,7] zu **[3,5]**
2. Klick "Spielzug beenden"
3. Bewege **Warrior (Spieler 2)** von [1,0] zu **[3,3]** (2 Tiles von Archer entfernt)
4. Klick "Spielzug beenden"
5. Archer greift Warrior an (Distanz = 2)
6. **Erwarte:** Warrior verliert 2 HP (3 ATK - 2 DEF = 1... wait, check: 3-1=2)
7. **Erwarte:** Archer HP bleibt bei 8 (KEIN Gegenangriff!)
8. **Erwarte:** Log zeigt NUR Archer-Schaden, keinen Counter

---

### TC-4: Siegbedingung ✅
**Ziel:** Victory-Screen bei Elimination

1. **Schnelltest:** Spiele bis nur noch 1 Scout (Spieler 1) übrig ist
2. Gegnerischer Warrior tötet letzten Scout
3. **Erwarte:** Victory-Screen erscheint: "Spieler 2 gewinnt!"
4. **Erwarte:** Klicks auf Board haben keine Wirkung mehr
5. Klick "Neues Spiel"
6. **Erwarte:** Spiel startet neu mit allen 10 Einheiten

---

### TC-5: Runden-Wechsel ✅
**Ziel:** Turn-Mechanik funktioniert

1. Bewege alle 5 Einheiten von Spieler 1
2. **Erwarte:** Alle haben grüne Highlights nur beim ersten Klick
3. Klick "Spielzug beenden"
4. **Erwarte:** Top-Bar zeigt "Spieler 2's Zug"
5. **Erwarte:** Runde bleibt bei 1
6. Klick auf Spieler 1 Unit
7. **Erwarte:** Nichts passiert (nicht am Zug)
8. Klick auf Spieler 2 Unit
9. **Erwarte:** Selection funktioniert
10. Klick "Spielzug beenden" (Spieler 2)
11. **Erwarte:** "Spieler 1's Zug", Runde: 2

---

### TC-6: Archer Adjacent-Verbot ✅ (NEU)
**Ziel:** Archer kann NICHT auf Distanz 1 schießen

1. Bewege **Archer (Spieler 1)** neben einen Gegner (Distanz = 1)
2. Klick auf Archer
3. **Erwarte:** Gegner ist NICHT rot highlighted (nicht in Range)
4. **Erwarte:** Nur Gegner in Distanz 2-3 sind rot
5. Klick auf adjacent Gegner
6. **Erwarte:** Nichts passiert (kein Angriff)

---

### TC-7: Attack→Move Verbot ✅ (NEU)
**Ziel:** Nach Angriff keine Bewegung mehr

1. Bewege **Warrior** zu einem Gegner (adjacent)
2. Warrior greift an (hasAttacked = true)
3. Klick auf Warrior
4. **Erwarte:** KEINE grünen Tiles (Bewegung gesperrt!)
5. **Erwarte:** Nur rote Tiles (falls weitere Gegner in Range)

---

### TC-8: Bewegungs-Blockierung ✅ (NEU)
**Ziel:** Units blockieren Pfade

1. Platziere **Scout (Spieler 1)** bei [2,2]
2. Platziere **Warrior (Spieler 1)** bei [3,2]
3. Klick auf Scout
4. **Erwarte:** [4,2], [5,2], [6,2] sind NICHT grün (Warrior blockiert Pfad)
5. **Erwarte:** [2,3], [2,4], [2,5], [2,6] SIND grün (andere Richtung frei)

---

## 🔍 Performance-Tests (NFR)

### Load-Time
1. Öffne DevTools (F12) → Network-Tab
2. Reload Page (Ctrl+R)
3. **Erwarte:** DOMContentLoaded < 2s
4. **Erwarte:** Keine 404-Errors

### Click-Response
1. Öffne DevTools → Performance-Tab
2. Start Recording
3. Klick auf Unit → Klick auf Tile
4. Stop Recording
5. **Erwarte:** Click-Handler < 50ms

### Frame-Rate
1. Öffne DevTools → Rendering → Frame Rendering Stats
2. Bewege Units, wechsle Turns
3. **Erwarte:** 60 FPS (oder nahe dran)

---

## 🐛 Bekannte Fehlerquellen (Debugging)

### Problem: "Units erscheinen nicht"
→ **Check:** Console-Errors? (F12)
→ **Check:** `gameState.units` hat 10 Einheiten? (Console: `gameState.units.length`)

### Problem: "Klick funktioniert nicht"
→ **Check:** Event-Listener registriert? (Console: sollte keine Errors zeigen)
→ **Check:** `handleTileClick` wird aufgerufen? (add `console.log` in game.js)

### Problem: "Units bewegen sich falsch"
→ **Check:** `tiles[y][x]` korrekt verwendet? (nicht `[x][y]`)
→ **Check:** `moveUnit` synchronisiert Map? (Console: `gameState.map.tiles[3][5].unit`)

### Problem: "Archer greift adjacent an"
→ **Check:** `UNIT_STATS.archer.minRange = 2` gesetzt?
→ **Check:** `getAttackRange` prüft `minRange`?

---

## ✅ Final Checklist

- [ ] TC-1 bis TC-8 bestehen
- [ ] Keine Console-Errors
- [ ] Load-Time < 2s
- [ ] Click-Response < 50ms
- [ ] Cross-Browser getestet (Chrome, Firefox, Edge)
- [ ] Victory-Screen funktioniert
- [ ] "Neues Spiel" startet korrekt neu

---

**Status:** MVP ist fertig, wenn alle Checkboxen ✅ sind!

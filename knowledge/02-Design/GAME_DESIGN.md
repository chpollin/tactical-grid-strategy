# GAME DESIGN: Tactical Grid Strategy

**Version:** 1.1 (Feedback-Integration)
**Abhängigkeiten:** README.md
**Status:** Requirements Definition + Patches

---

## Core Mechanics

### 1. Grid System

**Spielfeld:** 8x8 Grid (64 Tiles)
**Koordinaten:** `[x, y]` mit `x,y ∈ [0,7]`
**Tile-Eigenschaften:**
```javascript
{
  x: number,
  y: number,
  terrain: "grass" | "forest" | "mountain",  // Phase 3
  unit: Unit | null,
  building: Building | null  // Phase 3
}
```

**Bewegung:** **Nur orthogonal** (4 Richtungen: ↑↓←→)
**Diagonale:** ❌ Nicht erlaubt (vereinfacht Pathfinding)
**Distanz-Berechnung:** Manhattan-Distanz `|dx| + |dy|`

---

### 2. Einheiten-Typen (MVP)

| Typ | HP | Attack | Defense | Movement | Range | Kosten |
|-----|-----|--------|---------|----------|-------|--------|
| **Warrior** | 10 | 4 | 2 | 2 | 1 (Melee) | - |
| **Scout** | 6 | 2 | 1 | 4 | 1 (Melee) | - |
| **Archer** | 8 | 3 | 1 | 2 | 2-3 (Ranged) | - |

**Einheiten-Properties:**
```javascript
{
  id: string,           // Unique ID
  type: "warrior" | "scout" | "archer",
  player: 1 | 2,
  x: number,
  y: number,
  hp: number,           // Current HP
  maxHp: number,        // Max HP
  hasMoved: boolean,    // Pro Runde
  hasAttacked: boolean  // Pro Runde
}
```

---

### 3. Kampf-Mechanik

#### Angriffs-Berechnung
```
Damage = Attacker.Attack - Defender.Defense
Minimum Damage = 1 (immer mindestens 1 Schaden)
```

#### Fernkampf (Archer)
- **Range:** 2-3 Tiles Manhattan-Distanz
- **Adjacent-Verbot:** Kann NICHT auf Distanz 1 schießen (Minimum-Range = 2)
- **Kein Gegenangriff:** Defender schlägt nicht zurück
- **⚠️ MVP: KEIN Line-of-Sight** - Archer schießt rein reichweitenbasiert (Einheiten/Terrain blockieren NICHT)
- **Phase 2+:** LoS-Implementierung mit Terrain-Blockierung

#### Nahkampf (Warrior, Scout)
- **Range:** 1 Tile (benachbart)
- **Gegenangriff:** Defender schlägt zurück (wenn noch am Leben)

#### Elimination
- Unit mit `HP ≤ 0` wird vom Feld entfernt
- Tile wird frei

**Beispiel:**
```
Warrior (ATK 4) greift Scout (DEF 1, HP 6) an
→ Schaden: 4 - 1 = 3
→ Scout HP: 6 - 3 = 3 (überlebt)
→ Gegenangriff: Scout (ATK 2) vs Warrior (DEF 2)
→ Schaden: 2 - 2 = 1 (Minimum)
→ Warrior HP: 10 - 1 = 9
```

---

### 4. Rundenablauf

#### Phase A: Spieler-Zug
1. **Select Unit:** Klick auf eigene Einheit
2. **Show Movement Range:** Highlight erreichbare Tiles
3. **Move:** Klick auf Ziel-Tile → Unit bewegt sich
4. **Show Attack Range:** Highlight Angriffsziele
5. **Attack (Optional):** Klick auf Gegner → Kampf wird ausgeführt
6. **Repeat:** Weitere Einheiten aktivieren
7. **End Turn:** Button klicken → Gegner ist dran

#### Phase B: Gegner-Zug
- **MVP:** Zweiter menschlicher Spieler (Hot-Seat)
- **Phase 4:** KI-gesteuert

#### Runden-Reset
- Alle Units: `hasMoved = false`, `hasAttacked = false`

---

### 5. Siegbedingungen

**Primär (MVP):**
- ✅ Alle gegnerischen Einheiten eliminiert

**Sekundär (Phase 3+):**
- ✅ Gegnerische Basis zerstört
- ✅ Alle Ressourcenquellen kontrolliert für 5 Runden
- ❌ Zeitlimit überschritten → Mehr Einheiten übrig gewinnt

---

### 6. Start-Setup

**Einheiten-Platzierung (MVP):**
```
Spieler 1 (Blau) - Untere Reihen (y = 6, 7):
- 2x Warrior [1,7], [6,7]
- 2x Scout [2,7], [5,7]
- 1x Archer [3,7]

Spieler 2 (Rot) - Obere Reihen (y = 0, 1):
- 2x Warrior [1,0], [6,0]
- 2x Scout [2,0], [5,0]
- 1x Archer [3,0]
```

**Symmetrisch:** Beide Spieler starten mit identischen Ressourcen/Units

---

## Phase 2: Erweiterte Mechaniken

### Terrain-Modifikatoren

| Terrain | Bewegungskosten | Defense Bonus | Vision Bonus |
|---------|----------------|---------------|--------------|
| **Grass** | 1 | 0 | 0 |
| **Forest** | 2 | +1 | -1 (Versteckt) |
| **Mountain** | ∞ (unpassierbar) | - | +2 (Aussicht) |

### Fog of War (Optional Phase 3)
- Spieler sieht nur Tiles in Sichtweite eigener Einheiten
- **Scout Vision:** 3 Tiles
- **Warrior/Archer Vision:** 2 Tiles

---

## Phase 3: Ressourcen & Wirtschaft

### Ressourcen-Typen
```javascript
{
  gold: number,   // Einheiten rekrutieren
  wood: number    // Gebäude bauen (optional)
}
```

### Ressourcen-Generierung
- **Start:** 100 Gold, 50 Wood
- **Pro Runde:** +10 Gold (Basis-Einkommen)
- **Goldmine:** +20 Gold pro Runde (muss gebaut werden)

### Einheiten-Rekrutierung

| Typ | Gold-Kosten | Spawn-Location |
|-----|-------------|----------------|
| Warrior | 50 | HQ/Basis |
| Scout | 30 | HQ/Basis |
| Archer | 60 | HQ/Basis |

**Limit:** Max 1 Rekrutierung pro Basis pro Runde

### Gebäude

| Typ | Gold | Wood | Effekt |
|-----|------|------|--------|
| **HQ/Basis** | - | - | Start-Gebäude, Rekrutierung |
| **Goldmine** | 100 | 50 | +20 Gold/Runde |
| **Turm** | 80 | 30 | ATK 3, Range 2, HP 15 (statisch) |

---

## Balancing-Philosophie

### Design-Prinzipien
1. **Rock-Paper-Scissors:** Warrior > Scout > Archer > Warrior
   - Warrior: Tanky, langsam
   - Scout: Schnell, schwach
   - Archer: Range, vulnerable
2. **Positioning wichtiger als Stats:** Gute Platzierung schlägt stärkere Einheit
3. **Kein RNG (MVP):** Deterministischer Schaden (kein Würfeln)
4. **Kurze Matches:** 10-20 Minuten pro Spiel

### Balancing-Ziele
- **Time to Kill:** 2-3 Angriffe um Einheit zu eliminieren
- **Movement-to-Attack Ratio:** Einheiten erreichen Gegner in 2-3 Runden
- **Economy:** Neue Einheit alle 2-3 Runden rekrutierbar (Phase 3)

---

## UI/UX Design

### Visual Feedback
- **Selected Unit:** Dicke Border (z.B. 3px gelb)
- **Movement Range:** Tiles mit grünem Overlay (opacity 0.3)
- **Attack Range:** Tiles mit rotem Overlay (opacity 0.3)
- **Enemy in Range:** Pulsierendes Rot
- **Hover:** Tile hebt sich leicht an (transform: scale(1.05))

### HUD-Elemente
```
Top Bar:
- Current Player (Spieler 1 / Spieler 2)
- Turn Counter
- [End Turn] Button

Right Panel (Phase 3):
- Ressourcen-Anzeige
- Selected Unit Info (HP, ATK, DEF, Movement)
- Action Buttons (Move, Attack, Wait)

Bottom Panel:
- Game Log (letzte 5 Aktionen)
```

### Color Scheme
- **Player 1:** Blau (#3498db)
- **Player 2:** Rot (#e74c3c)
- **Neutral:** Grau (#95a5a6)
- **Grass:** Grün (#2ecc71)
- **UI Background:** Dunkelgrau (#34495e)

---

## Edge Cases & Rules

### Bewegung
- ❌ Kann nicht auf Tile mit anderer Einheit ziehen
- ❌ Kann nicht über Einheiten hinweg ziehen (kein Phasing)
- ✅ Kann Bewegung abbrechen (Rechtsklick → deselect)

### Angriff
- ❌ Kann nicht eigene Einheiten angreifen
- ❌ Kann nicht angreifen nach Bewegung über max. Movement hinaus
- ✅ Kann angreifen ohne vorher zu bewegen
- ✅ Archer kann nur in Range 2-3 schießen (nicht adjacent!)

### Reihenfolge
- ✅ Bewegung → dann Angriff (beide in einer Aktivierung)
- ❌ **Angriff → dann Bewegung (STRIKT VERBOTEN!)**
- ✅ Einheit aktivieren → nur bewegen → Ende (Angriff optional)
- ⚠️ **Sobald `hasAttacked = true`, ist Bewegung gesperrt für diese Runde**

---

## Testfälle (für Playtesting)

### Must-Test Scenarios
1. **Warrior vs Scout:** Warrior sollte gewinnen (1v1)
2. **Archer vs Warrior:** Archer sollte Warrior besiegen ohne Schaden (Kiting)
3. **2v1 Pincer:** Zwei Einheiten flankieren eine → Sollte schnell eliminieren
4. **Scout Rush:** 3 Scouts können Archer überwältigen
5. **Stalemate Prevention:** Spiel darf nicht in endlosen Loop geraten

---

## Erweiterbarkeit

### Hooks für Phase 4+
- **Abilities:** Spezialfähigkeiten (z.B. Scout "Sprint" +2 Movement für 1 Runde)
- **Items:** Ausrüstung (+1 ATK Schwert)
- **Leveling:** Einheiten sammeln XP und steigen auf
- **Multiplayer:** WebSocket-Integration vorbereiten

---

**Savepoint:** Dieses Dokument definiert alle Game-Design-Entscheidungen. Code muss gegen diese Regeln validiert werden.

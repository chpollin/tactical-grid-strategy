# DATA: Datenstrukturen & Beispiele

**Version:** 1.0
**Abhängigkeiten:** README.md, GAME_DESIGN.md
**Status:** Data Definition Phase

---

## ⚠️ WARNUNG: Daten-Vortex Prevention

Dieses Dokument definiert die **kanonische Datenrepräsentation**. Alle Code-Module müssen diese Strukturen verwenden. Bei Abweichungen → zurück zu diesem Dokument!

---

## 1. Game State (Root-Objekt)

```javascript
const gameState = {
  // Meta
  turn: 1,                    // Aktuelle Runde
  currentPlayer: 1,           // 1 oder 2
  phase: "selection",         // "selection" | "movement" | "attack" | "gameover"
  winner: null,               // null | 1 | 2

  // Spielfeld
  map: Map,                   // Siehe 2. Map Structure

  // Einheiten
  units: [Unit],              // Array aller Units (siehe 3. Unit)

  // UI State
  selectedUnit: null,         // Unit ID oder null
  highlightedTiles: [],       // Array von {x, y, type: "move"|"attack"}

  // Phase 3: Ressourcen (optional)
  resources: {
    1: { gold: 100, wood: 50 },
    2: { gold: 100, wood: 50 }
  },

  // Phase 3: Gebäude (optional)
  buildings: [Building]       // Siehe 5. Building
};
```

---

## 2. Map Structure

```javascript
const map = {
  width: 8,
  height: 8,
  tiles: [
    [Tile, Tile, ...],  // Row 0 (y=0)
    [Tile, Tile, ...],  // Row 1 (y=1)
    // ... 8 rows total
  ]
};

// Einzelne Tile
const tile = {
  x: 0,                      // 0-7
  y: 0,                      // 0-7
  terrain: "grass",          // "grass" | "forest" | "mountain" (Phase 2)
  unit: null,                // Unit ID oder null
  building: null,            // Building ID oder null (Phase 3)

  // Phase 2: Fog of War
  visibleTo: [1, 2]          // Welche Spieler dieses Tile sehen können
};
```

**Zugriff auf Tile:**
```javascript
// map.tiles[y][x]  ← WICHTIG: y zuerst (row), dann x (column)!
const tile = map.tiles[3][5];  // Tile bei x=5, y=3
```

---

## 3. Unit Structure

```javascript
const unit = {
  // Identifikation
  id: "unit_1_0",            // Format: "unit_{player}_{index}"
  type: "warrior",           // "warrior" | "scout" | "archer"
  player: 1,                 // 1 oder 2

  // Position
  x: 1,
  y: 7,

  // Stats (aus UNIT_STATS kopiert bei Erstellung)
  hp: 10,
  maxHp: 10,
  attack: 4,
  defense: 2,
  movement: 2,
  range: 1,                  // 1 = Melee, 2-3 = Ranged

  // Zustand
  hasMoved: false,
  hasAttacked: false,

  // Phase 4: Leveling (optional)
  level: 1,
  xp: 0
};
```

---

## 4. Unit Stats (Konstanten)

```javascript
const UNIT_STATS = {
  warrior: {
    maxHp: 10,
    attack: 4,
    defense: 2,
    movement: 2,
    range: 1,
    cost: { gold: 50, wood: 0 }  // Phase 3
  },

  scout: {
    maxHp: 6,
    attack: 2,
    defense: 1,
    movement: 4,
    range: 1,
    cost: { gold: 30, wood: 0 }
  },

  archer: {
    maxHp: 8,
    attack: 3,
    defense: 1,
    movement: 2,
    range: 2,  // Kann 2-3 Tiles weit schießen
    minRange: 2,  // Kann NICHT adjacent angreifen
    maxRange: 3,
    cost: { gold: 60, wood: 0 }
  }
};
```

---

## 5. Building Structure (Phase 3)

```javascript
const building = {
  id: "building_1_0",
  type: "hq",                // "hq" | "goldmine" | "tower"
  player: 1,
  x: 3,
  y: 7,
  hp: 20,
  maxHp: 20,

  // Tower-spezifisch
  attack: 3,                 // Nur bei type="tower"
  range: 2,

  // Ressourcen-Generierung
  goldPerTurn: 0             // 0 für HQ, 20 für goldmine
};

const BUILDING_STATS = {
  hq: {
    maxHp: 30,
    cost: null,  // Wird nicht gebaut, existiert von Start
    goldPerTurn: 0
  },

  goldmine: {
    maxHp: 15,
    cost: { gold: 100, wood: 50 },
    goldPerTurn: 20
  },

  tower: {
    maxHp: 15,
    cost: { gold: 80, wood: 30 },
    attack: 3,
    range: 2,
    goldPerTurn: 0
  }
};
```

---

## 6. Action/Event Log

```javascript
const gameLog = [
  {
    turn: 1,
    player: 1,
    action: "move",
    unitId: "unit_1_0",
    from: { x: 1, y: 7 },
    to: { x: 1, y: 5 }
  },
  {
    turn: 1,
    player: 1,
    action: "attack",
    attackerId: "unit_1_0",
    defenderId: "unit_2_3",
    damage: 3,
    counterDamage: 1,
    defenderKilled: false
  },
  {
    turn: 1,
    player: 1,
    action: "endTurn"
  }
];
```

---

## 7. UI State

```javascript
const uiState = {
  selectedUnitId: null,
  hoveredTile: { x: 3, y: 5 },

  // Highlighted Tiles für Movement/Attack Range
  highlights: [
    { x: 2, y: 5, type: "move" },
    { x: 3, y: 5, type: "move" },
    { x: 4, y: 5, type: "move" },
    { x: 2, y: 4, type: "attack" }
  ],

  // Modals/Popups
  showEndTurnConfirm: false,
  showVictoryScreen: false,

  // Animations (Phase 2)
  activeAnimations: []
};
```

---

## 8. Start-State (Beispiel)

```javascript
const INITIAL_STATE = {
  turn: 1,
  currentPlayer: 1,
  phase: "selection",
  winner: null,

  map: {
    width: 8,
    height: 8,
    tiles: createEmptyMap()  // Funktion generiert 8x8 grass tiles
  },

  units: [
    // Spieler 1 (Blau)
    { id: "unit_1_0", type: "warrior", player: 1, x: 1, y: 7, hp: 10, maxHp: 10, attack: 4, defense: 2, movement: 2, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_1_1", type: "warrior", player: 1, x: 6, y: 7, hp: 10, maxHp: 10, attack: 4, defense: 2, movement: 2, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_1_2", type: "scout", player: 1, x: 2, y: 7, hp: 6, maxHp: 6, attack: 2, defense: 1, movement: 4, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_1_3", type: "scout", player: 1, x: 5, y: 7, hp: 6, maxHp: 6, attack: 2, defense: 1, movement: 4, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_1_4", type: "archer", player: 1, x: 3, y: 7, hp: 8, maxHp: 8, attack: 3, defense: 1, movement: 2, range: 2, hasMoved: false, hasAttacked: false },

    // Spieler 2 (Rot)
    { id: "unit_2_0", type: "warrior", player: 2, x: 1, y: 0, hp: 10, maxHp: 10, attack: 4, defense: 2, movement: 2, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_2_1", type: "warrior", player: 2, x: 6, y: 0, hp: 10, maxHp: 10, attack: 4, defense: 2, movement: 2, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_2_2", type: "scout", player: 2, x: 2, y: 0, hp: 6, maxHp: 6, attack: 2, defense: 1, movement: 4, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_2_3", type: "scout", player: 2, x: 5, y: 0, hp: 6, maxHp: 6, attack: 2, defense: 1, movement: 4, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_2_4", type: "archer", player: 2, x: 3, y: 0, hp: 8, maxHp: 8, attack: 3, defense: 1, movement: 2, range: 2, hasMoved: false, hasAttacked: false }
  ],

  selectedUnit: null,
  highlightedTiles: [],

  resources: {
    1: { gold: 100, wood: 50 },
    2: { gold: 100, wood: 50 }
  },

  buildings: []
};
```

---

## 9. Daten-Transformationen (KRITISCH!)

### 9.1 Unit Position → Map Tile Update
```javascript
// FALSCH: Direkt x/y ändern ohne Map-Update
unit.x = 5;  // ❌ Map weiß nichts davon!

// RICHTIG: Synchronisierte Update-Funktion
function moveUnit(unit, newX, newY) {
  map.tiles[unit.y][unit.x].unit = null;  // Alte Position leeren
  unit.x = newX;
  unit.y = newY;
  map.tiles[newY][newX].unit = unit.id;   // Neue Position setzen
}
```

### 9.2 Array-Index vs. Coordinate System
```javascript
// ⚠️ VORSICHT: Y ist Row, X ist Column!

// DOM: <div data-x="3" data-y="5">
const domTile = event.target;
const x = parseInt(domTile.dataset.x);  // Column
const y = parseInt(domTile.dataset.y);  // Row

// Map-Zugriff:
const tile = map.tiles[y][x];  // ← NICHT [x][y]!
```

### 9.3 Deep Copy bei State-Updates
```javascript
// FALSCH: Shallow Copy
const newState = gameState;  // ❌ Referenz, kein Copy!

// RICHTIG: Deep Copy (für Undo/Redo später)
const newState = JSON.parse(JSON.stringify(gameState));
```

---

## 10. Validierungs-Funktionen

```javascript
// Diese Funktionen müssen existieren, um Data Integrity zu garantieren

function isValidPosition(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getTileAt(x, y) {
  if (!isValidPosition(x, y)) return null;
  return map.tiles[y][x];
}

function getUnitById(unitId) {
  return gameState.units.find(u => u.id === unitId);
}

function getUnitAt(x, y) {
  const tile = getTileAt(x, y);
  if (!tile || !tile.unit) return null;
  return getUnitById(tile.unit);
}

function isEnemyUnit(unitId, player) {
  const unit = getUnitById(unitId);
  return unit && unit.player !== player;
}
```

---

## 11. LocalStorage Schema (Phase 5)

```javascript
// Key: "tacticalgame_save_1"
{
  version: "1.0",
  timestamp: 1697366400000,
  gameState: { ...gameState },  // Kompletter State
  playerNames: {
    1: "Player 1",
    2: "Player 2"
  }
}
```

---

## 12. Testdaten für Development

```javascript
// Schneller Test-State: Nur wenige Units für schnelles Testen
const TEST_STATE = {
  ...INITIAL_STATE,
  units: [
    { id: "unit_1_0", type: "warrior", player: 1, x: 3, y: 4, hp: 10, maxHp: 10, attack: 4, defense: 2, movement: 2, range: 1, hasMoved: false, hasAttacked: false },
    { id: "unit_2_0", type: "warrior", player: 2, x: 4, y: 3, hp: 5, maxHp: 10, attack: 4, defense: 2, movement: 2, range: 1, hasMoved: false, hasAttacked: false }
  ]
};

// Test: Unit kurz vor Tod
const DAMAGE_TEST_STATE = {
  ...INITIAL_STATE,
  units: [
    { id: "unit_1_0", type: "archer", player: 1, x: 2, y: 4, hp: 8, maxHp: 8, attack: 3, defense: 1, movement: 2, range: 2, hasMoved: false, hasAttacked: false },
    { id: "unit_2_0", type: "scout", player: 2, x: 4, y: 4, hp: 1, maxHp: 6, attack: 2, defense: 1, movement: 4, range: 1, hasMoved: false, hasAttacked: false }
  ]
};
```

---

## ⚠️ DATEN-VORTEX CHECKPOINTS

Bei jeder Implementierung folgende Fragen checken:

1. ✅ Ist Map-Tile synchron mit Unit.x/Unit.y?
2. ✅ Wird [y][x] korrekt verwendet (nicht [x][y])?
3. ✅ Ist Deep Copy verwendet bei State-Änderungen?
4. ✅ Sind alle IDs unique?
5. ✅ Sind bounds-checks vorhanden (0 ≤ x,y < 8)?

**Bei Bugs zuerst hier prüfen!**

---

**Savepoint:** Alle Datenstrukturen sind hier definiert. Code MUSS diese 1:1 verwenden. Keine "kreativen" Abweichungen!

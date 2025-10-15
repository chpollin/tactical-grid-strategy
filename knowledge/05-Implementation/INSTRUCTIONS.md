# INSTRUCTIONS: Technische Implementierung

**Version:** 1.0
**Abhängigkeiten:** README.md, GAME_DESIGN.md, DATA.md, REQUIREMENTS.md
**Status:** Implementation Guide

---

## ⚠️ KRITISCHE WARNUNG: Daten-Vortex Prevention

**Vor jeder Implementierung lesen:**

1. ✅ DATA.md definiert die **einzig gültige** Datenstruktur
2. ✅ Keine "kreativen" Abweichungen von DATA.md
3. ✅ Bei Unklarheiten → zurück zu DATA.md, NICHT improvisieren
4. ✅ Array-Indizes: **IMMER** `tiles[y][x]` (nicht `[x][y]`)
5. ✅ Unit-Position-Updates: **IMMER** Map synchron halten

**Validierungs-Checkpoints sind mit 🔍 markiert**

---

## Implementierungs-Reihenfolge (STRIKT einhalten!)

### Phase 0: Setup (30 Min)
1. Projekt-Struktur erstellen
2. HTML-Grundgerüst
3. CSS-Reset & Grid-Layout
4. JavaScript-Module verlinken

### Phase 1: Rendering (2 Stunden)
1. Map-Rendering (DOM-basiert)
2. Unit-Rendering
3. UI-Panel (Current Player, End Turn Button)

### Phase 2: Interaktion (3 Stunden)
1. Click-Handler auf Tiles
2. Unit Selection Logic
3. Movement Highlighting
4. Movement Execution

### Phase 3: Kampf (2 Stunden)
1. Attack Range Highlighting
2. Damage Calculation
3. Counter-Attack
4. Unit Removal (Death)

### Phase 4: Game Flow (1 Stunde)
1. Turn Management
2. Win Condition Check
3. New Game Button

### Phase 5: Polish (1 Stunde)
1. Animations (CSS Transitions)
2. Game Log
3. Bug-Fixing

---

## STEP-BY-STEP IMPLEMENTATION

---

## Step 1: Projekt-Setup

### 1.1 Dateistruktur erstellen
```
project/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── constants.js
│   ├── state.js
│   ├── map.js
│   ├── units.js
│   ├── combat.js
│   ├── ui.js
│   └── game.js
└── (Knowledge Vault Docs bleiben im Root)
```

### 1.2 HTML-Grundgerüst (index.html)
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tactical Grid Strategy</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="game-container">
        <!-- Top Bar -->
        <div id="top-bar">
            <div id="current-player">Spieler 1's Zug</div>
            <div id="turn-counter">Runde: 1</div>
            <button id="end-turn-btn">Spielzug beenden</button>
        </div>

        <!-- Game Board -->
        <div id="game-board"></div>

        <!-- Game Log -->
        <div id="game-log">
            <h3>Spielverlauf</h3>
            <ul id="log-list"></ul>
        </div>

        <!-- Victory Screen (hidden by default) -->
        <div id="victory-screen" class="hidden">
            <div id="victory-content">
                <h1 id="victory-message"></h1>
                <button id="new-game-btn">Neues Spiel</button>
            </div>
        </div>
    </div>

    <!-- Scripts (type="module" für ES6 imports) -->
    <script type="module" src="js/game.js"></script>
</body>
</html>
```

### 🔍 Checkpoint 1.2: HTML validieren
- [ ] Alle IDs vorhanden?
- [ ] Script als `type="module"`?

---

## Step 2: Konstanten definieren (constants.js)

```javascript
// constants.js
export const GRID_SIZE = 8;

export const UNIT_STATS = {
    warrior: {
        maxHp: 10,
        attack: 4,
        defense: 2,
        movement: 2,
        range: 1
    },
    scout: {
        maxHp: 6,
        attack: 2,
        defense: 1,
        movement: 4,
        range: 1
    },
    archer: {
        maxHp: 8,
        attack: 3,
        defense: 1,
        movement: 2,
        range: 2,
        minRange: 2,
        maxRange: 3
    }
};

export const PLAYER_COLORS = {
    1: '#3498db',  // Blau
    2: '#e74c3c'   // Rot
};

export const TERRAIN_TYPES = {
    grass: { color: '#2ecc71', moveCost: 1, defenseBonus: 0 }
    // Phase 2: forest, mountain
};
```

### 🔍 Checkpoint 2: Konstanten prüfen
- [ ] UNIT_STATS stimmt mit DATA.md überein?
- [ ] Alle exports korrekt?

---

## Step 3: Game State initialisieren (state.js)

```javascript
// state.js
import { GRID_SIZE, UNIT_STATS } from './constants.js';

export let gameState = null;

export function initGameState() {
    gameState = {
        turn: 1,
        currentPlayer: 1,
        phase: "selection",
        winner: null,

        map: createMap(),
        units: createInitialUnits(),

        selectedUnit: null,
        highlightedTiles: []
    };

    // Units in Map eintragen
    gameState.units.forEach(unit => {
        gameState.map.tiles[unit.y][unit.x].unit = unit.id;
    });

    return gameState;
}

function createMap() {
    const tiles = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        const row = [];
        for (let x = 0; x < GRID_SIZE; x++) {
            row.push({
                x,
                y,
                terrain: 'grass',
                unit: null,
                building: null
            });
        }
        tiles.push(row);
    }
    return { width: GRID_SIZE, height: GRID_SIZE, tiles };
}

function createInitialUnits() {
    const units = [];

    // Spieler 1 (y=7, y=6)
    units.push(createUnit('warrior', 1, 1, 7, 0));
    units.push(createUnit('warrior', 1, 6, 7, 1));
    units.push(createUnit('scout', 1, 2, 7, 2));
    units.push(createUnit('scout', 1, 5, 7, 3));
    units.push(createUnit('archer', 1, 3, 7, 4));

    // Spieler 2 (y=0, y=1)
    units.push(createUnit('warrior', 2, 1, 0, 0));
    units.push(createUnit('warrior', 2, 6, 0, 1));
    units.push(createUnit('scout', 2, 2, 0, 2));
    units.push(createUnit('scout', 2, 5, 0, 3));
    units.push(createUnit('archer', 2, 3, 0, 4));

    return units;
}

function createUnit(type, player, x, y, index) {
    const stats = UNIT_STATS[type];
    return {
        id: `unit_${player}_${index}`,
        type,
        player,
        x,
        y,
        hp: stats.maxHp,
        maxHp: stats.maxHp,
        attack: stats.attack,
        defense: stats.defense,
        movement: stats.movement,
        range: stats.range,
        hasMoved: false,
        hasAttacked: false
    };
}

// Helper-Funktionen
export function getUnitById(unitId) {
    return gameState.units.find(u => u.id === unitId);
}

export function getUnitAt(x, y) {
    if (!isValidPosition(x, y)) return null;
    const tile = gameState.map.tiles[y][x];
    return tile.unit ? getUnitById(tile.unit) : null;
}

export function isValidPosition(x, y) {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}

export function removeUnit(unitId) {
    const unit = getUnitById(unitId);
    if (!unit) return;

    // Aus Map entfernen
    gameState.map.tiles[unit.y][unit.x].unit = null;

    // Aus units-Array entfernen
    const index = gameState.units.findIndex(u => u.id === unitId);
    if (index !== -1) {
        gameState.units.splice(index, 1);
    }
}
```

### 🔍 Checkpoint 3: State-Initialisierung
- [ ] `createMap()` erstellt 8x8 Grid?
- [ ] Alle 10 Units korrekt platziert?
- [ ] `tiles[y][x].unit` korrekt gesetzt?
- [ ] **KRITISCH:** Ist `tiles[y][x]` verwendet (NICHT `[x][y]`)?

---

## Step 4: Map-Rendering (map.js)

```javascript
// map.js
import { gameState, getUnitAt } from './state.js';
import { PLAYER_COLORS } from './constants.js';
import { handleTileClick } from './game.js';

export function renderMap() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    const { tiles } = gameState.map;

    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            const tile = tiles[y][x];
            const tileDiv = createTileElement(tile);
            board.appendChild(tileDiv);
        }
    }
}

function createTileElement(tile) {
    const div = document.createElement('div');
    div.className = 'tile';
    div.dataset.x = tile.x;
    div.dataset.y = tile.y;

    // Schachbrett-Muster
    if ((tile.x + tile.y) % 2 === 0) {
        div.classList.add('tile-light');
    } else {
        div.classList.add('tile-dark');
    }

    // Unit rendern (falls vorhanden)
    const unit = getUnitAt(tile.x, tile.y);
    if (unit) {
        const unitDiv = createUnitElement(unit);
        div.appendChild(unitDiv);
    }

    // Click-Handler
    div.addEventListener('click', () => handleTileClick(tile.x, tile.y));

    return div;
}

function createUnitElement(unit) {
    const div = document.createElement('div');
    div.className = `unit unit-${unit.type} player-${unit.player}`;
    div.style.backgroundColor = PLAYER_COLORS[unit.player];

    // HP-Anzeige
    const hpBar = document.createElement('div');
    hpBar.className = 'hp-bar';
    hpBar.style.width = `${(unit.hp / unit.maxHp) * 100}%`;
    div.appendChild(hpBar);

    // Type-Icon (erstmal Text)
    const typeIcon = document.createElement('div');
    typeIcon.className = 'unit-icon';
    typeIcon.textContent = unit.type[0].toUpperCase(); // W, S, A
    div.appendChild(typeIcon);

    return div;
}

export function highlightTiles(tiles, type) {
    // type: "move" | "attack"
    tiles.forEach(({ x, y }) => {
        const tileDiv = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (tileDiv) {
            tileDiv.classList.add(`highlight-${type}`);
        }
    });
}

export function clearHighlights() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove('highlight-move', 'highlight-attack');
    });
}

export function markSelectedUnit(unitId) {
    // Remove previous selection
    document.querySelectorAll('.unit').forEach(u => u.classList.remove('selected'));

    if (!unitId) return;

    const unit = getUnitById(unitId);
    if (!unit) return;

    const tileDiv = document.querySelector(`[data-x="${unit.x}"][data-y="${unit.y}"]`);
    if (tileDiv) {
        const unitDiv = tileDiv.querySelector('.unit');
        if (unitDiv) unitDiv.classList.add('selected');
    }
}
```

### 🔍 Checkpoint 4: Map-Rendering
- [ ] 64 Tiles werden gerendert?
- [ ] Schachbrett-Muster sichtbar?
- [ ] Units erscheinen an korrekter Position?
- [ ] `dataset.x` und `dataset.y` korrekt gesetzt?

---

## Step 5: Movement-Logik (units.js)

```javascript
// units.js
import { gameState, isValidPosition, getUnitAt } from './state.js';

export function getMovementRange(unit) {
    if (unit.hasMoved) return [];

    const reachable = [];
    const visited = new Set();
    const queue = [{ x: unit.x, y: unit.y, distance: 0 }];

    while (queue.length > 0) {
        const current = queue.shift();
        const key = `${current.x},${current.y}`;

        if (visited.has(key)) continue;
        visited.add(key);

        if (current.distance > 0 && current.distance <= unit.movement) {
            reachable.push({ x: current.x, y: current.y });
        }

        if (current.distance >= unit.movement) continue;

        // 4 Richtungen (orthogonal)
        const directions = [
            { dx: 0, dy: -1 },  // Oben
            { dx: 0, dy: 1 },   // Unten
            { dx: -1, dy: 0 },  // Links
            { dx: 1, dy: 0 }    // Rechts
        ];

        directions.forEach(({ dx, dy }) => {
            const newX = current.x + dx;
            const newY = current.y + dy;

            if (!isValidPosition(newX, newY)) return;

            // Blockiert von anderer Unit?
            const occupyingUnit = getUnitAt(newX, newY);
            if (occupyingUnit) return;

            queue.push({ x: newX, y: newY, distance: current.distance + 1 });
        });
    }

    return reachable;
}

export function moveUnit(unit, newX, newY) {
    // 🔍 KRITISCH: Map synchron halten!
    gameState.map.tiles[unit.y][unit.x].unit = null;  // Alte Position

    unit.x = newX;
    unit.y = newY;
    unit.hasMoved = true;

    gameState.map.tiles[newY][newX].unit = unit.id;  // Neue Position
}
```

### 🔍 Checkpoint 5: Movement
- [ ] `getMovementRange()` gibt korrekte Tiles zurück?
- [ ] Warrior: max 2 Tiles, Scout: max 4 Tiles?
- [ ] Bewegung durch Einheiten blockiert?
- [ ] **KRITISCH:** `tiles[unit.y][unit.x]` korrekt aktualisiert?

---

## Step 6: Combat-Logik (combat.js)

```javascript
// combat.js
import { gameState, getUnitById, removeUnit, isValidPosition, getUnitAt } from './state.js';
import { UNIT_STATS } from './constants.js';

export function getAttackRange(unit) {
    if (unit.hasAttacked) return [];

    const targets = [];
    const range = unit.range;

    // Archer: minRange=2, maxRange=3
    const minRange = UNIT_STATS[unit.type].minRange || 1;
    const maxRange = UNIT_STATS[unit.type].maxRange || range;

    for (let dy = -maxRange; dy <= maxRange; dy++) {
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            const distance = Math.abs(dx) + Math.abs(dy);  // Manhattan Distance

            if (distance < minRange || distance > maxRange) continue;

            const targetX = unit.x + dx;
            const targetY = unit.y + dy;

            if (!isValidPosition(targetX, targetY)) continue;

            const targetUnit = getUnitAt(targetX, targetY);
            if (!targetUnit) continue;

            // Nur Gegner angreifbar
            if (targetUnit.player !== unit.player) {
                targets.push({ x: targetX, y: targetY });
            }
        }
    }

    return targets;
}

export function executeAttack(attackerId, defenderId) {
    const attacker = getUnitById(attackerId);
    const defender = getUnitById(defenderId);

    if (!attacker || !defender) return null;

    // Schaden berechnen
    const damage = Math.max(1, attacker.attack - defender.defense);
    defender.hp -= damage;

    let counterDamage = 0;
    let attackerDied = false;
    let defenderDied = false;

    // Gegenangriff (nur bei Nahkampf + Defender lebt)
    const distance = Math.abs(attacker.x - defender.x) + Math.abs(attacker.y - defender.y);
    if (defender.hp > 0 && distance === 1) {
        counterDamage = Math.max(1, defender.attack - attacker.defense);
        attacker.hp -= counterDamage;
    }

    // Tod-Check
    if (defender.hp <= 0) {
        removeUnit(defenderId);
        defenderDied = true;
    }

    if (attacker.hp <= 0) {
        removeUnit(attackerId);
        attackerDied = true;
    }

    attacker.hasAttacked = true;

    return {
        damage,
        counterDamage,
        defenderDied,
        attackerDied
    };
}
```

### 🔍 Checkpoint 6: Combat
- [ ] Damage-Formel korrekt? (ATK - DEF, min 1)
- [ ] Gegenangriff nur bei Nahkampf (distance === 1)?
- [ ] Units werden bei HP ≤ 0 entfernt?
- [ ] Archer kann nicht adjacent angreifen?

---

## Step 7: Game-Loop & Interaktion (game.js)

```javascript
// game.js
import { initGameState, gameState, getUnitAt, getUnitById } from './state.js';
import { renderMap, highlightTiles, clearHighlights, markSelectedUnit } from './map.js';
import { getMovementRange, moveUnit } from './units.js';
import { getAttackRange, executeAttack } from './combat.js';
import { updateUI, addLogEntry, showVictoryScreen } from './ui.js';

export function initGame() {
    initGameState();
    renderMap();
    updateUI();

    // Event Listeners
    document.getElementById('end-turn-btn').addEventListener('click', endTurn);
    document.getElementById('new-game-btn').addEventListener('click', () => {
        initGame();
        document.getElementById('victory-screen').classList.add('hidden');
    });
}

export function handleTileClick(x, y) {
    if (gameState.winner) return;  // Spiel vorbei

    const clickedUnit = getUnitAt(x, y);
    const selectedUnit = gameState.selectedUnit ? getUnitById(gameState.selectedUnit) : null;

    // Fall 1: Eigene Einheit auswählen
    if (clickedUnit && clickedUnit.player === gameState.currentPlayer) {
        selectUnit(clickedUnit.id);
        return;
    }

    // Fall 2: Bewegung ausführen
    if (selectedUnit && !clickedUnit) {
        const moveRange = getMovementRange(selectedUnit);
        const canMove = moveRange.some(tile => tile.x === x && tile.y === y);

        if (canMove) {
            moveUnit(selectedUnit, x, y);
            addLogEntry(`${selectedUnit.type} moved to [${x},${y}]`);
            renderMap();

            // Nach Bewegung: Attack-Range zeigen
            selectUnit(selectedUnit.id);
            return;
        }
    }

    // Fall 3: Angriff ausführen
    if (selectedUnit && clickedUnit && clickedUnit.player !== gameState.currentPlayer) {
        const attackRange = getAttackRange(selectedUnit);
        const canAttack = attackRange.some(tile => tile.x === x && tile.y === y);

        if (canAttack) {
            const result = executeAttack(selectedUnit.id, clickedUnit.id);
            addLogEntry(`${selectedUnit.type} attacked ${clickedUnit.type} for ${result.damage} damage`);

            if (result.counterDamage > 0) {
                addLogEntry(`${clickedUnit.type} counterattacked for ${result.counterDamage} damage`);
            }

            renderMap();
            clearHighlights();
            gameState.selectedUnit = null;

            checkWinCondition();
            return;
        }
    }

    // Fall 4: Deselect
    clearHighlights();
    gameState.selectedUnit = null;
    markSelectedUnit(null);
}

function selectUnit(unitId) {
    const unit = getUnitById(unitId);
    if (!unit || unit.player !== gameState.currentPlayer) return;

    gameState.selectedUnit = unitId;
    markSelectedUnit(unitId);

    clearHighlights();

    // Movement-Range zeigen (wenn noch nicht bewegt)
    if (!unit.hasMoved) {
        const moveRange = getMovementRange(unit);
        highlightTiles(moveRange, 'move');
    }

    // Attack-Range zeigen (wenn noch nicht angegriffen)
    if (!unit.hasAttacked) {
        const attackRange = getAttackRange(unit);
        highlightTiles(attackRange, 'attack');
    }
}

function endTurn() {
    // Reset alle Units des aktuellen Spielers
    gameState.units.forEach(unit => {
        if (unit.player === gameState.currentPlayer) {
            unit.hasMoved = false;
            unit.hasAttacked = false;
        }
    });

    // Spieler wechseln
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;

    // Runde erhöhen (wenn wieder bei Spieler 1)
    if (gameState.currentPlayer === 1) {
        gameState.turn++;
    }

    clearHighlights();
    gameState.selectedUnit = null;
    updateUI();
    addLogEntry(`--- Spieler ${gameState.currentPlayer}'s Zug ---`);
}

function checkWinCondition() {
    const player1Units = gameState.units.filter(u => u.player === 1).length;
    const player2Units = gameState.units.filter(u => u.player === 2).length;

    if (player1Units === 0) {
        gameState.winner = 2;
        showVictoryScreen(2);
    } else if (player2Units === 0) {
        gameState.winner = 1;
        showVictoryScreen(1);
    }
}

// Start game when page loads
window.addEventListener('DOMContentLoaded', initGame);
```

### 🔍 Checkpoint 7: Game Loop
- [ ] Klick auf eigene Unit → Selection funktioniert?
- [ ] Klick auf grünes Tile → Unit bewegt sich?
- [ ] Klick auf Gegner → Angriff wird ausgeführt?
- [ ] "End Turn" → Spieler wechselt?

---

## Step 8: UI-Updates (ui.js)

```javascript
// ui.js
import { gameState } from './state.js';

export function updateUI() {
    // Current Player
    document.getElementById('current-player').textContent =
        `Spieler ${gameState.currentPlayer}'s Zug`;

    // Turn Counter
    document.getElementById('turn-counter').textContent =
        `Runde: ${gameState.turn}`;
}

const logEntries = [];
export function addLogEntry(message) {
    logEntries.push(message);

    // Nur letzte 5 anzeigen
    const recent = logEntries.slice(-5);

    const logList = document.getElementById('log-list');
    logList.innerHTML = '';

    recent.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        logList.appendChild(li);
    });
}

export function showVictoryScreen(winner) {
    document.getElementById('victory-message').textContent =
        `Spieler ${winner} gewinnt!`;
    document.getElementById('victory-screen').classList.remove('hidden');
}
```

---

## Step 9: CSS-Styling (style.css)

```css
/* style.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #2c3e50;
    color: #ecf0f1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

#game-container {
    max-width: 900px;
    width: 100%;
    padding: 20px;
}

/* Top Bar */
#top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #34495e;
    border-radius: 8px 8px 0 0;
    margin-bottom: 0;
}

#current-player {
    font-size: 1.2em;
    font-weight: bold;
}

#end-turn-btn {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

#end-turn-btn:hover {
    background-color: #c0392b;
}

/* Game Board */
#game-board {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
    background-color: #34495e;
    padding: 10px;
    border-radius: 0 0 8px 8px;
    aspect-ratio: 1;
}

.tile {
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.1s;
}

.tile-light {
    background-color: #95a5a6;
}

.tile-dark {
    background-color: #7f8c8d;
}

.tile:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

/* Highlights */
.highlight-move {
    background-color: rgba(46, 204, 113, 0.5) !important;
    box-shadow: inset 0 0 10px #2ecc71;
}

.highlight-attack {
    background-color: rgba(231, 76, 60, 0.5) !important;
    box-shadow: inset 0 0 10px #e74c3c;
}

/* Units */
.unit {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    border: 3px solid #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.3s ease;
}

.unit.selected {
    border: 4px solid #f1c40f;
    box-shadow: 0 0 15px #f1c40f;
}

.unit-icon {
    font-size: 1.5em;
    font-weight: bold;
    color: white;
}

/* HP Bar */
.hp-bar {
    position: absolute;
    bottom: -5px;
    left: 0;
    height: 4px;
    background-color: #2ecc71;
    transition: width 0.3s;
}

/* Game Log */
#game-log {
    margin-top: 20px;
    padding: 15px;
    background-color: #34495e;
    border-radius: 8px;
}

#game-log h3 {
    margin-bottom: 10px;
}

#log-list {
    list-style: none;
    font-size: 0.9em;
    opacity: 0.8;
}

#log-list li {
    padding: 5px 0;
    border-bottom: 1px solid #2c3e50;
}

/* Victory Screen */
#victory-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

#victory-screen.hidden {
    display: none;
}

#victory-content {
    background-color: #34495e;
    padding: 50px;
    border-radius: 10px;
    text-align: center;
}

#victory-message {
    font-size: 3em;
    margin-bottom: 30px;
    color: #f1c40f;
}

#new-game-btn {
    padding: 15px 30px;
    font-size: 1.2em;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#new-game-btn:hover {
    background-color: #27ae60;
}
```

---

## 🔍 FINALE VALIDIERUNG

### Pre-Launch Checklist

**Funktionale Tests:**
- [ ] TC-1: Bewegung funktioniert (Warrior 2 Tiles, Scout 4 Tiles)
- [ ] TC-2: Nahkampf mit Gegenangriff funktioniert
- [ ] TC-3: Archer-Fernkampf ohne Gegenangriff funktioniert
- [ ] TC-4: Siegbedingung wird erkannt
- [ ] TC-5: Rundenende wechselt Spieler korrekt

**Daten-Integrität:**
- [ ] `tiles[y][x]` überall korrekt verwendet?
- [ ] Unit-Position synchron mit Map?
- [ ] Keine Units mit HP ≤ 0 im Array?
- [ ] Alle IDs unique?

**Performance:**
- [ ] Klick-Response < 50ms?
- [ ] Keine Console-Errors?
- [ ] Läuft in Chrome/Firefox?

**Code-Qualität:**
- [ ] Alle Magic Numbers als Konstanten?
- [ ] Funktionen < 50 Zeilen?
- [ ] Keine globalen Variablen (außer `gameState`)?

---

## Debugging-Tipps

### Problem: "Unit bewegt sich nicht"
→ Check: `getMovementRange()` gibt Array zurück?
→ Check: `hasMoved` ist `false`?
→ Check: Tile-Coordinates korrekt (`tiles[y][x]`)?

### Problem: "Angriff macht keinen Schaden"
→ Check: `executeAttack()` wird aufgerufen?
→ Check: `damage = Math.max(1, ...)` vorhanden?
→ Console: `console.log(attacker, defender, damage)`

### Problem: "Map zeigt Units an falscher Position"
→ **KRITISCH:** `tiles[y][x]` vs `tiles[x][y]` verwechselt?
→ Check: `dataset.x` und `dataset.y` korrekt?

---

## Erweiterungen (Post-MVP)

### Phase 2: Animationen
- `transition: all 0.3s ease` auf Unit-Movement
- Keyframe-Animation für Angriff

### Phase 3: Ressourcen
- `resources` State hinzufügen
- UI-Panel für Gold/Wood
- Recruit-Button bei HQ-Selection

### Phase 4: KI
- `ai.js` erstellen
- Simple Random-AI zuerst
- Minimax-Algorithmus später

---

**Savepoint:** Diese Implementierungsanleitung ist die technische Wahrheit. Bei Bugs zurück zu diesem Dokument!

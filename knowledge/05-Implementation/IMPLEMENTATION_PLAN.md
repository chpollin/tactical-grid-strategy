# IMPLEMENTIERUNGSPLAN: MVP Tactical Grid Strategy

**Version:** 1.1 (Post-Feedback)
**Abhängigkeiten:** README.md, GAME_DESIGN.md, DATA.md, REQUIREMENTS.md
**Status:** Ready to Code
**Geschätzte Zeit:** 6-8 Stunden (MVP komplett)

---

## 🎯 Definition of Done (MVP)

MVP ist **fertig**, wenn:

- ✅ **Mechanik:** Bewegung (orthogonal, reichweitenbasiert), Nah- & Fernkampf, **KEIN Attack→Move**
- ✅ **UI/UX:** Selection, Highlights, Log, HP-Feedback, Turn-Anzeige
- ✅ **Siegbedingung:** Elimination-Check + Victory-Screen
- ✅ **Datenintegrität:** `tiles[y][x]` korrekt, Map↔Unit synchron, nur map.js API
- ✅ **Tests:** TC-1 bis TC-8 bestehen
- ✅ **NFRs:** <50ms Input-Latency, 60 FPS, keine Globals außer exports

---

## 📦 Dateistruktur

```
project/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── constants.js    (UNIT_STATS, GRID_SIZE, COLORS)
│   ├── state.js        (gameState, initGameState, getUnitById, removeUnit)
│   ├── map.js          (renderMap, getTileAt, moveUnit - EINZIGE Map-Schnittstelle)
│   ├── units.js        (getMovementRange)
│   ├── combat.js       (getAttackRange, executeAttack)
│   ├── ui.js           (updateUI, addLogEntry, showVictoryScreen)
│   └── game.js         (handleTileClick, endTurn, checkWin, initGame)
└── knowledge/          (Dokumentation, nicht für Deployment)
```

---

## ⚡ Implementierungs-Steps (kompakt)

### STEP 1: Setup (30 Min)

**1.1 HTML (index.html)**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Tactical Grid Strategy</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="game-container">
        <div id="top-bar">
            <div id="current-player">Spieler 1's Zug</div>
            <div id="turn-counter">Runde: 1</div>
            <button id="end-turn-btn">Spielzug beenden</button>
        </div>
        <div id="game-board"></div>
        <div id="game-log">
            <h3>Spielverlauf</h3>
            <ul id="log-list"></ul>
        </div>
        <div id="victory-screen" class="hidden">
            <div id="victory-content">
                <h1 id="victory-message"></h1>
                <button id="new-game-btn">Neues Spiel</button>
            </div>
        </div>
    </div>
    <script type="module" src="js/game.js"></script>
</body>
</html>
```

**🔍 Checkpoint:** HTML validiert, `type="module"` gesetzt

---

### STEP 2: Konstanten (constants.js) - 15 Min

```javascript
export const GRID_SIZE = 8;

export const UNIT_STATS = {
    warrior: { maxHp: 10, attack: 4, defense: 2, movement: 2, range: 1 },
    scout: { maxHp: 6, attack: 2, defense: 1, movement: 4, range: 1 },
    archer: { maxHp: 8, attack: 3, defense: 1, movement: 2, range: 2, minRange: 2, maxRange: 3 }
};

export const PLAYER_COLORS = {
    1: '#3498db',
    2: '#e74c3c'
};
```

**🔍 Checkpoint:** Stats stimmen mit GAME_DESIGN.md überein

---

### STEP 3: State (state.js) - 45 Min

```javascript
import { GRID_SIZE, UNIT_STATS } from './constants.js';

export let gameState = null;

export function initGameState() {
    gameState = {
        turn: 1,
        currentPlayer: 1,
        winner: null,
        map: createMap(),
        units: createInitialUnits(),
        selectedUnit: null
    };

    // Units in Map eintragen
    gameState.units.forEach(u => {
        gameState.map.tiles[u.y][u.x].unit = u.id;
    });

    return gameState;
}

function createMap() {
    const tiles = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        const row = [];
        for (let x = 0; x < GRID_SIZE; x++) {
            row.push({ x, y, terrain: 'grass', unit: null, building: null });
        }
        tiles.push(row);
    }
    return { width: GRID_SIZE, height: GRID_SIZE, tiles };
}

function createInitialUnits() {
    const units = [];
    const positions = [
        // Player 1
        ['warrior', 1, 1, 7, 0], ['warrior', 1, 6, 7, 1],
        ['scout', 1, 2, 7, 2], ['scout', 1, 5, 7, 3],
        ['archer', 1, 3, 7, 4],
        // Player 2
        ['warrior', 2, 1, 0, 0], ['warrior', 2, 6, 0, 1],
        ['scout', 2, 2, 0, 2], ['scout', 2, 5, 0, 3],
        ['archer', 2, 3, 0, 4]
    ];

    positions.forEach(([type, player, x, y, idx]) => {
        const stats = UNIT_STATS[type];
        units.push({
            id: `unit_${player}_${idx}`,
            type, player, x, y,
            hp: stats.maxHp,
            maxHp: stats.maxHp,
            attack: stats.attack,
            defense: stats.defense,
            movement: stats.movement,
            range: stats.range,
            hasMoved: false,
            hasAttacked: false
        });
    });

    return units;
}

export function getUnitById(id) {
    return gameState.units.find(u => u.id === id);
}

export function removeUnit(id) {
    const unit = getUnitById(id);
    if (!unit) return;
    gameState.map.tiles[unit.y][unit.x].unit = null;
    gameState.units = gameState.units.filter(u => u.id !== id);
}

export function isValidPosition(x, y) {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}
```

**🔍 Checkpoint:**
- [ ] 10 Units erstellt?
- [ ] `tiles[y][x]` korrekt?
- [ ] Alle Units haben korrekte Stats?

---

### STEP 4: Map API (map.js) - 1 Stunde

```javascript
import { gameState, getUnitById, isValidPosition } from './state.js';
import { PLAYER_COLORS } from './constants.js';
import { handleTileClick } from './game.js';

export function getTileAt(x, y) {
    if (!isValidPosition(x, y)) return null;
    return gameState.map.tiles[y][x];
}

export function getUnitAt(x, y) {
    const tile = getTileAt(x, y);
    return tile?.unit ? getUnitById(tile.unit) : null;
}

export function moveUnit(unit, newX, newY) {
    // ⚠️ KRITISCH: Map synchron halten!
    gameState.map.tiles[unit.y][unit.x].unit = null;
    unit.x = newX;
    unit.y = newY;
    unit.hasMoved = true;
    gameState.map.tiles[newY][newX].unit = unit.id;
}

export function renderMap() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    const { tiles } = gameState.map;

    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            const tileDiv = document.createElement('div');
            tileDiv.className = 'tile';
            tileDiv.dataset.x = x;
            tileDiv.dataset.y = y;

            // Schachbrett
            if ((x + y) % 2 === 0) tileDiv.classList.add('tile-light');
            else tileDiv.classList.add('tile-dark');

            // Unit rendern
            const unit = getUnitAt(x, y);
            if (unit) {
                const unitDiv = document.createElement('div');
                unitDiv.className = `unit unit-${unit.type} player-${unit.player}`;
                unitDiv.style.backgroundColor = PLAYER_COLORS[unit.player];

                // HP Bar
                const hpBar = document.createElement('div');
                hpBar.className = 'hp-bar';
                hpBar.style.width = `${(unit.hp / unit.maxHp) * 100}%`;
                unitDiv.appendChild(hpBar);

                // Icon
                const icon = document.createElement('div');
                icon.className = 'unit-icon';
                icon.textContent = unit.type[0].toUpperCase();
                unitDiv.appendChild(icon);

                tileDiv.appendChild(unitDiv);
            }

            tileDiv.addEventListener('click', () => handleTileClick(x, y));
            board.appendChild(tileDiv);
        }
    }
}

export function highlightTiles(tiles, type) {
    tiles.forEach(({ x, y }) => {
        const tile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (tile) tile.classList.add(`highlight-${type}`);
    });
}

export function clearHighlights() {
    document.querySelectorAll('.tile').forEach(t => {
        t.classList.remove('highlight-move', 'highlight-attack');
    });
}

export function markSelectedUnit(unitId) {
    document.querySelectorAll('.unit').forEach(u => u.classList.remove('selected'));
    if (!unitId) return;

    const unit = getUnitById(unitId);
    if (!unit) return;

    const tile = document.querySelector(`[data-x="${unit.x}"][data-y="${unit.y}"]`);
    if (tile) {
        const unitDiv = tile.querySelector('.unit');
        if (unitDiv) unitDiv.classList.add('selected');
    }
}
```

**🔍 Checkpoint:**
- [ ] `getTileAt` und `getUnitAt` funktionieren?
- [ ] `moveUnit` setzt `tiles[y][x]` korrekt?
- [ ] Map rendert 64 Tiles?

---

### STEP 5: Movement (units.js) - 45 Min

```javascript
import { gameState, isValidPosition } from './state.js';
import { getUnitAt } from './map.js';

export function getMovementRange(unit) {
    if (unit.hasMoved || unit.hasAttacked) return [];  // ⚠️ Attack→Move Verbot!

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

        // 4 Richtungen orthogonal
        const dirs = [[0,-1], [0,1], [-1,0], [1,0]];

        dirs.forEach(([dx, dy]) => {
            const newX = current.x + dx;
            const newY = current.y + dy;

            if (!isValidPosition(newX, newY)) return;
            if (getUnitAt(newX, newY)) return;  // Blockiert

            queue.push({ x: newX, y: newY, distance: current.distance + 1 });
        });
    }

    return reachable;
}
```

**🔍 Checkpoint:**
- [ ] Warrior: max 2 Tiles?
- [ ] Scout: max 4 Tiles?
- [ ] Bewegung blockiert durch Units?
- [ ] `hasAttacked` sperrt Bewegung?

---

### STEP 6: Combat (combat.js) - 45 Min

```javascript
import { gameState, getUnitById, removeUnit, isValidPosition } from './state.js';
import { getUnitAt } from './map.js';
import { UNIT_STATS } from './constants.js';

export function getAttackRange(unit) {
    if (unit.hasAttacked) return [];

    const targets = [];
    const stats = UNIT_STATS[unit.type];
    const minRange = stats.minRange || 1;
    const maxRange = stats.maxRange || unit.range;

    for (let dy = -maxRange; dy <= maxRange; dy++) {
        for (let dx = -maxRange; dx <= maxRange; dx++) {
            const distance = Math.abs(dx) + Math.abs(dy);  // Manhattan

            if (distance < minRange || distance > maxRange) continue;

            const targetX = unit.x + dx;
            const targetY = unit.y + dy;

            if (!isValidPosition(targetX, targetY)) continue;

            const targetUnit = getUnitAt(targetX, targetY);
            if (targetUnit && targetUnit.player !== unit.player) {
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

    // Damage
    const damage = Math.max(1, attacker.attack - defender.defense);
    defender.hp -= damage;

    let counterDamage = 0;

    // Counter (nur Melee)
    const distance = Math.abs(attacker.x - defender.x) + Math.abs(attacker.y - defender.y);
    if (defender.hp > 0 && distance === 1) {
        counterDamage = Math.max(1, defender.attack - attacker.defense);
        attacker.hp -= counterDamage;
    }

    // Death
    const defenderDied = defender.hp <= 0;
    const attackerDied = attacker.hp <= 0;

    if (defenderDied) removeUnit(defenderId);
    if (attackerDied) removeUnit(attackerId);

    if (!attackerDied) attacker.hasAttacked = true;

    return { damage, counterDamage, defenderDied, attackerDied };
}
```

**🔍 Checkpoint:**
- [ ] Damage-Formel korrekt?
- [ ] Archer: kein Counter bei Range 2-3?
- [ ] Archer: kann NICHT adjacent angreifen?

---

### STEP 7: Game Loop (game.js) - 1.5 Stunden

```javascript
import { initGameState, gameState, getUnitById } from './state.js';
import { renderMap, getUnitAt, clearHighlights, highlightTiles, markSelectedUnit, moveUnit } from './map.js';
import { getMovementRange } from './units.js';
import { getAttackRange, executeAttack } from './combat.js';
import { updateUI, addLogEntry, showVictoryScreen } from './ui.js';

export function initGame() {
    initGameState();
    renderMap();
    updateUI();

    document.getElementById('end-turn-btn').addEventListener('click', endTurn);
    document.getElementById('new-game-btn').addEventListener('click', () => {
        initGame();
        document.getElementById('victory-screen').classList.add('hidden');
    });
}

export function handleTileClick(x, y) {
    if (gameState.winner) return;

    const clickedUnit = getUnitAt(x, y);
    const selectedUnit = gameState.selectedUnit ? getUnitById(gameState.selectedUnit) : null;

    // Fall 1: Eigene Einheit auswählen
    if (clickedUnit && clickedUnit.player === gameState.currentPlayer) {
        selectUnit(clickedUnit.id);
        return;
    }

    // Fall 2: Bewegung
    if (selectedUnit && !clickedUnit) {
        const moveRange = getMovementRange(selectedUnit);
        if (moveRange.some(t => t.x === x && t.y === y)) {
            moveUnit(selectedUnit, x, y);
            addLogEntry(`${selectedUnit.type} moved to [${x},${y}]`);
            renderMap();
            selectUnit(selectedUnit.id);  // Re-select für Attack-Highlight
            return;
        }
    }

    // Fall 3: Angriff
    if (selectedUnit && clickedUnit && clickedUnit.player !== gameState.currentPlayer) {
        const attackRange = getAttackRange(selectedUnit);
        if (attackRange.some(t => t.x === x && t.y === y)) {
            const result = executeAttack(selectedUnit.id, clickedUnit.id);
            addLogEntry(`${selectedUnit.type} attacked ${clickedUnit.type} (${result.damage} dmg)`);
            if (result.counterDamage > 0) {
                addLogEntry(`  Counterattack: ${result.counterDamage} dmg`);
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

    // Movement (nur wenn nicht attackiert!)
    if (!unit.hasAttacked) {
        const moveRange = getMovementRange(unit);
        highlightTiles(moveRange, 'move');
    }

    // Attack
    if (!unit.hasAttacked) {
        const attackRange = getAttackRange(unit);
        highlightTiles(attackRange, 'attack');
    }
}

function endTurn() {
    gameState.units.forEach(u => {
        if (u.player === gameState.currentPlayer) {
            u.hasMoved = false;
            u.hasAttacked = false;
        }
    });

    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    if (gameState.currentPlayer === 1) gameState.turn++;

    clearHighlights();
    gameState.selectedUnit = null;
    updateUI();
    addLogEntry(`--- Spieler ${gameState.currentPlayer}'s Zug ---`);
}

function checkWinCondition() {
    const p1Units = gameState.units.filter(u => u.player === 1).length;
    const p2Units = gameState.units.filter(u => u.player === 2).length;

    if (p1Units === 0) {
        gameState.winner = 2;
        showVictoryScreen(2);
    } else if (p2Units === 0) {
        gameState.winner = 1;
        showVictoryScreen(1);
    }
}

window.addEventListener('DOMContentLoaded', initGame);
```

**🔍 Checkpoint:**
- [ ] Klick auf Unit → Selection?
- [ ] Klick auf grünes Tile → Bewegung?
- [ ] Klick auf rotes Tile → Angriff?
- [ ] Nach Angriff: keine Movement-Highlights?

---

### STEP 8: UI (ui.js) - 30 Min

```javascript
import { gameState } from './state.js';

export function updateUI() {
    document.getElementById('current-player').textContent = `Spieler ${gameState.currentPlayer}'s Zug`;
    document.getElementById('turn-counter').textContent = `Runde: ${gameState.turn}`;
}

const logEntries = [];
export function addLogEntry(message) {
    logEntries.push(message);
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
    document.getElementById('victory-message').textContent = `Spieler ${winner} gewinnt!`;
    document.getElementById('victory-screen').classList.remove('hidden');
}
```

---

### STEP 9: CSS (style.css) - 45 Min

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

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

#top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #34495e;
    border-radius: 8px 8px 0 0;
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
}

#end-turn-btn:hover {
    background-color: #c0392b;
}

#game-board {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
    background-color: #34495e;
    padding: 10px;
    aspect-ratio: 1;
}

.tile {
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: transform 0.1s;
}

.tile-light { background-color: #95a5a6; }
.tile-dark { background-color: #7f8c8d; }

.tile:hover {
    transform: scale(1.05);
}

.highlight-move {
    background-color: rgba(46, 204, 113, 0.5) !important;
    box-shadow: inset 0 0 10px #2ecc71;
}

.highlight-attack {
    background-color: rgba(231, 76, 60, 0.5) !important;
    box-shadow: inset 0 0 10px #e74c3c;
}

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

.hp-bar {
    position: absolute;
    bottom: -5px;
    left: 0;
    height: 4px;
    background-color: #2ecc71;
    transition: width 0.3s;
}

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

## ✅ FINALE VALIDIERUNG

### Pre-Launch Checklist

**Funktionale Tests (TC-1 bis TC-8):**
- [ ] TC-1: Bewegung (Warrior 2 Tiles, Scout 4 Tiles)
- [ ] TC-2: Nahkampf + Gegenangriff
- [ ] TC-3: Archer-Fernkampf (kein Counter)
- [ ] TC-4: Siegbedingung
- [ ] TC-5: Rundenende
- [ ] TC-6: Archer kann NICHT adjacent angreifen
- [ ] TC-7: Nach Angriff keine Bewegung mehr
- [ ] TC-8: Bewegung blockiert durch Units

**Daten-Integrität:**
- [ ] `tiles[y][x]` überall korrekt?
- [ ] `moveUnit` synchronisiert Map?
- [ ] Keine direkten Map-Zugriffe außerhalb map.js?
- [ ] Alle IDs unique?

**Performance:**
- [ ] Initial Load < 2s?
- [ ] Click-Response < 50ms?
- [ ] Keine Console-Errors?

---

## 🚀 Deployment

1. Teste in Chrome, Firefox, Edge
2. Copy `index.html`, `css/`, `js/` nach Deployment-Ordner
3. `knowledge/` bleibt lokal (nicht deployen!)
4. Optional: GitHub Pages Upload

---

## 🔄 Nächste Schritte (Post-MVP)

### Phase 2 (Sofort möglich):
- CSS-Animationen (transitions)
- Terrain-Tiles
- Sound-Effekte

### Phase 3 (Erweiterung):
- Ressourcen-System
- Gebäude
- Einheiten rekrutieren

### Phase 4 (KI):
- Simple Random-AI
- Minimax-Algorithmus

---

**Savepoint:** Dieser Plan ist ready-to-code. Jeder Step hat Checkpoints. Bei Bugs → zurück zum entsprechenden Step!

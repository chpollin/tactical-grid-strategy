// map.js - Map-Rendering und Map-API (EINZIGE Map-Schnittstelle!)
import { gameState, getUnitById, isValidPosition } from './state.js';
import { PLAYER_COLORS } from './constants.js';

// API: Tile-Zugriff
export function getTileAt(x, y) {
    if (!isValidPosition(x, y)) return null;
    return gameState.map.tiles[y][x];  // ⚠️ tiles[y][x] nicht [x][y]!
}

// API: Unit an Position
export function getUnitAt(x, y) {
    const tile = getTileAt(x, y);
    return tile?.unit ? getUnitById(tile.unit) : null;
}

// API: Unit bewegen (synchronisiert Map!)
export function moveUnit(unit, newX, newY) {
    // ⚠️ KRITISCH: Map synchron halten!
    gameState.map.tiles[unit.y][unit.x].unit = null;  // Alte Position leeren

    unit.x = newX;
    unit.y = newY;
    unit.hasMoved = true;

    gameState.map.tiles[newY][newX].unit = unit.id;  // Neue Position setzen
}

// Rendering
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

    // Click-Handler wird von game.js gesetzt
    div.addEventListener('click', () => {
        // Import wird dynamisch aufgelöst
        import('./game.js').then(module => {
            module.handleTileClick(tile.x, tile.y);
        });
    });

    return div;
}

function createUnitElement(unit) {
    const div = document.createElement('div');
    div.className = `unit unit-${unit.type} player-${unit.player}`;
    div.style.backgroundColor = PLAYER_COLORS[unit.player];

    // HP-Balken
    const hpBar = document.createElement('div');
    hpBar.className = 'hp-bar';
    hpBar.style.width = `${(unit.hp / unit.maxHp) * 100}%`;
    div.appendChild(hpBar);

    // Type-Icon (erster Buchstabe)
    const typeIcon = document.createElement('div');
    typeIcon.className = 'unit-icon';
    typeIcon.textContent = unit.type[0].toUpperCase(); // W, S, A
    div.appendChild(typeIcon);

    return div;
}

// Highlighting
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

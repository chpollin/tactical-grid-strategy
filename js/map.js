// map.js - Map-Rendering und Map-API (EINZIGE Map-Schnittstelle!)
import { gameState, getUnitById, isValidPosition } from './state.js';
import { PLAYER_COLORS, TERRAIN_TYPES } from './constants.js';

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
    return new Promise((resolve) => {
        const oldX = unit.x;
        const oldY = unit.y;

        // Get tile elements
        const oldTile = document.querySelector(`[data-x="${oldX}"][data-y="${oldY}"]`);
        const newTile = document.querySelector(`[data-x="${newX}"][data-y="${newY}"]`);
        const unitElement = oldTile?.querySelector('.unit');

        if (!unitElement || !newTile) {
            // Fallback: instant move
            performMove(unit, newX, newY);
            resolve();
            return;
        }

        // Calculate pixel distance for animation
        const oldRect = oldTile.getBoundingClientRect();
        const newRect = newTile.getBoundingClientRect();
        const deltaX = newRect.left - oldRect.left;
        const deltaY = newRect.top - oldRect.top;

        // Animate with requestAnimationFrame to prevent first-move teleport
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                unitElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                unitElement.classList.add('moving');
            });
        });

        // Wait for animation, then update data
        setTimeout(() => {
            performMove(unit, newX, newY);
            resolve();
        }, 500); // Match --anim-slow
    });
}

function performMove(unit, newX, newY) {
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

    // Terrain styling
    const terrain = TERRAIN_TYPES[tile.terrain];
    if (terrain) {
        div.classList.add(terrain.cssClass);
        div.dataset.terrain = tile.terrain;
    } else {
        // Fallback to grassland
        div.classList.add('tile-grassland');
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
    div.id = unit.id;

    // Add data attributes for CSS styling
    div.dataset.player = unit.player;
    div.dataset.faction = unit.faction;
    div.dataset.type = unit.type;

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

// Animate attack
export function animateAttack(attackerId, defenderId) {
    return new Promise((resolve) => {
        const attacker = getUnitById(attackerId);
        const defender = getUnitById(defenderId);

        if (!attacker || !defender) {
            resolve();
            return;
        }

        // Get unit elements
        const attackerTile = document.querySelector(`[data-x="${attacker.x}"][data-y="${attacker.y}"]`);
        const defenderTile = document.querySelector(`[data-x="${defender.x}"][data-y="${defender.y}"]`);

        const attackerUnit = attackerTile?.querySelector('.unit');
        const defenderUnit = defenderTile?.querySelector('.unit');

        // Attacker shakes
        attackerUnit?.classList.add('attacking');

        setTimeout(() => {
            // Defender takes damage flash
            defenderUnit?.classList.add('taking-damage');

            setTimeout(() => {
                attackerUnit?.classList.remove('attacking');
                defenderUnit?.classList.remove('taking-damage');
                resolve();
            }, 300);
        }, 150);
    });
}

// Animate HP bar update
export function updateUnitHP(unitId, newHP, maxHP) {
    const unit = getUnitById(unitId);
    if (!unit) return;

    const tile = document.querySelector(`[data-x="${unit.x}"][data-y="${unit.y}"]`);
    const hpBar = tile?.querySelector('.hp-bar');

    if (hpBar) {
        // Flash red, then transition to new width
        hpBar.classList.add('damaged');
        setTimeout(() => {
            hpBar.style.width = `${(newHP / maxHP) * 100}%`;
            setTimeout(() => {
                hpBar.classList.remove('damaged');
            }, 300);
        }, 100);
    }
}

// Animate unit death
export function animateDeath(unitId) {
    return new Promise((resolve) => {
        const unit = getUnitById(unitId);
        if (!unit) {
            resolve();
            return;
        }

        const tile = document.querySelector(`[data-x="${unit.x}"][data-y="${unit.y}"]`);
        const unitElement = tile?.querySelector('.unit');

        if (unitElement) {
            unitElement.classList.add('dying');
            setTimeout(resolve, 500);
        } else {
            resolve();
        }
    });
}

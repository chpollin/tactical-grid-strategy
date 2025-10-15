// state.js - Game State Management
import { GRID_SIZE, UNIT_STATS } from './constants.js';

export let gameState = null;
export let isAnimating = false;

export function setAnimating(value) {
    isAnimating = value;
}

export function initGameState() {
    gameState = {
        turn: 1,
        currentPlayer: 1,
        winner: null,
        map: createMap(),
        units: createInitialUnits(),
        selectedUnit: null
    };

    // Units in Map eintragen (tiles[y][x].unit = unitId)
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

    // Spieler 1 (Blau) - Untere Reihen
    units.push(createUnit('warrior', 1, 1, 7, 0));
    units.push(createUnit('warrior', 1, 6, 7, 1));
    units.push(createUnit('scout', 1, 2, 7, 2));
    units.push(createUnit('scout', 1, 5, 7, 3));
    units.push(createUnit('archer', 1, 3, 7, 4));

    // Spieler 2 (Rot) - Obere Reihen
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

export function isValidPosition(x, y) {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}

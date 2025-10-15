// game.js - Main Game Loop
import { initGameState, gameState, getUnitById } from './state.js';
import { renderMap, getUnitAt, clearHighlights, highlightTiles, markSelectedUnit, moveUnit } from './map.js';
import { getMovementRange } from './units.js';
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

    console.log('Game initialized!', gameState);
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

    // Movement-Range zeigen (nur wenn noch nicht angegriffen!)
    if (!unit.hasAttacked) {
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

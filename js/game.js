// game.js - Main Game Loop
import { initGameState, gameState, getUnitById, isAnimating, setAnimating } from './state.js';
import { renderMap, getUnitAt, clearHighlights, highlightTiles, markSelectedUnit, moveUnit, animateAttack, updateUnitHP, animateDeath } from './map.js';
import { getMovementRange } from './units.js';
import { getAttackRange, executeAttack } from './combat.js';
import { updateUI, addLogEntry, showVictoryScreen, showTurnTransition } from './ui.js';

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

export async function handleTileClick(x, y) {
    if (gameState.winner || isAnimating) return;  // Spiel vorbei oder Animation läuft

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
            setAnimating(true);  // LOCK inputs
            await moveUnit(selectedUnit, x, y);  // AWAIT animation
            addLogEntry(`${selectedUnit.type} moved to [${x},${y}]`);
            renderMap();

            // Nach Bewegung: Attack-Range zeigen
            selectUnit(selectedUnit.id);
            setAnimating(false);  // UNLOCK inputs
            return;
        }
    }

    // Fall 3: Angriff ausführen
    if (selectedUnit && clickedUnit && clickedUnit.player !== gameState.currentPlayer) {
        const attackRange = getAttackRange(selectedUnit);
        const canAttack = attackRange.some(tile => tile.x === x && tile.y === y);

        if (canAttack) {
            setAnimating(true);  // LOCK inputs

            // Animate attack
            await animateAttack(selectedUnit.id, clickedUnit.id);

            // Execute combat
            const result = executeAttack(selectedUnit.id, clickedUnit.id);

            // Update HP bars with animation
            if (!result.defenderDied) {
                const defender = getUnitById(clickedUnit.id);
                if (defender) updateUnitHP(defender.id, defender.hp, defender.maxHp);
            }

            if (result.counterDamage > 0 && !result.attackerDied) {
                const attacker = getUnitById(selectedUnit.id);
                if (attacker) updateUnitHP(attacker.id, attacker.hp, attacker.maxHp);
            }

            // Animate deaths
            if (result.defenderDied) {
                await animateDeath(clickedUnit.id);
            }
            if (result.attackerDied) {
                await animateDeath(selectedUnit.id);
            }

            // Log
            addLogEntry(`${selectedUnit.type} attacked ${clickedUnit.type} (${result.damage} dmg)`);
            if (result.counterDamage > 0) {
                addLogEntry(`  Counterattack: ${result.counterDamage} dmg`);
            }

            renderMap();
            clearHighlights();
            gameState.selectedUnit = null;

            checkWinCondition();
            setAnimating(false);  // UNLOCK inputs
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

async function endTurn() {
    if (isAnimating) return;  // Prevent spam during animations

    setAnimating(true);  // LOCK inputs

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

    // Show turn transition
    await showTurnTransition(gameState.currentPlayer);

    setAnimating(false);  // UNLOCK inputs
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

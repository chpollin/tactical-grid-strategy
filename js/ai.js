// ai.js - Simple Random AI Opponent
import { gameState, getUnitById } from './state.js';
import { getMovementRange } from './units.js';
import { getAttackRange } from './combat.js';
import { handleTileClick } from './game.js';

/**
 * Get all units belonging to the AI player
 * @returns {Array} Array of AI units
 */
function getAIUnits() {
    return gameState.units.filter(unit => unit.player === gameState.currentPlayer);
}

/**
 * Get all valid move positions for a unit
 * @param {Object} unit - The unit to check
 * @returns {Array} Array of {x, y} positions
 */
function getValidMoves(unit) {
    if (unit.hasMoved || unit.hasAttacked) return [];
    return getMovementRange(unit);
}

/**
 * Get all valid attack targets for a unit
 * @param {Object} unit - The unit to check
 * @returns {Array} Array of enemy units that can be attacked
 */
function getValidAttacks(unit) {
    if (unit.hasAttacked) return [];

    const attackRange = getAttackRange(unit);
    const targets = [];

    attackRange.forEach(tile => {
        const targetUnit = gameState.units.find(u =>
            u.x === tile.x &&
            u.y === tile.y &&
            u.player !== unit.player
        );
        if (targetUnit) {
            targets.push(targetUnit);
        }
    });

    return targets;
}

/**
 * Choose a random element from an array
 * @param {Array} array - Array to choose from
 * @returns {*} Random element or null if array is empty
 */
function randomChoice(array) {
    if (array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Calculate simple heuristic value for an attack target
 * Priority: Low HP enemies, then high-value targets (Warriors > Archers > Scouts)
 * @param {Object} target - Enemy unit
 * @returns {number} Heuristic value (higher = better target)
 */
function evaluateAttackTarget(target) {
    const typeValue = {
        'warrior': 3,
        'archer': 2,
        'scout': 1
    };

    // Prioritize low HP targets (can kill them)
    const hpFactor = (target.maxHp - target.hp) * 2;
    const typeFactor = typeValue[target.type] || 1;

    return hpFactor + typeFactor;
}

/**
 * Execute a single AI unit's turn
 * Strategy: Attack if possible (prioritize low HP), otherwise move randomly
 * @param {Object} unit - The AI unit to act
 * @returns {Promise<boolean>} True if action was taken, false otherwise
 */
async function executeUnitAction(unit) {
    // Check for valid attacks first (aggressive AI)
    const validAttacks = getValidAttacks(unit);

    if (validAttacks.length > 0) {
        // Choose best target based on heuristic
        validAttacks.sort((a, b) => evaluateAttackTarget(b) - evaluateAttackTarget(a));
        const target = validAttacks[0];

        console.log(`AI: ${unit.id} attacking ${target.id} at [${target.x},${target.y}]`);
        await handleTileClick(target.x, target.y);
        return true;
    }

    // No attacks available, try to move
    const validMoves = getValidMoves(unit);

    if (validMoves.length > 0) {
        const moveTarget = randomChoice(validMoves);
        console.log(`AI: ${unit.id} moving to [${moveTarget.x},${moveTarget.y}]`);
        await handleTileClick(moveTarget.x, moveTarget.y);

        // After moving, check if we can attack
        await new Promise(resolve => setTimeout(resolve, 300)); // Brief pause

        const validAttacksAfterMove = getValidAttacks(unit);
        if (validAttacksAfterMove.length > 0) {
            validAttacksAfterMove.sort((a, b) => evaluateAttackTarget(b) - evaluateAttackTarget(a));
            const target = validAttacksAfterMove[0];
            console.log(`AI: ${unit.id} attacking ${target.id} after move`);
            await handleTileClick(target.x, target.y);
        }

        return true;
    }

    // No valid actions
    console.log(`AI: ${unit.id} has no valid actions`);
    return false;
}

/**
 * Execute a full AI turn
 * Iterates through all AI units and makes decisions
 * @returns {Promise<void>}
 */
export async function executeAITurn() {
    console.log('AI Turn Start - Player', gameState.currentPlayer);

    const aiUnits = getAIUnits();

    // Randomize unit order for variety
    const shuffledUnits = [...aiUnits].sort(() => Math.random() - 0.5);

    for (const unit of shuffledUnits) {
        // Check if unit still exists (might have died in counterattack)
        const currentUnit = getUnitById(unit.id);
        if (!currentUnit) continue;

        // Select the unit first
        await handleTileClick(currentUnit.x, currentUnit.y);
        await new Promise(resolve => setTimeout(resolve, 250)); // Pause to show selection

        // Execute action
        await executeUnitAction(currentUnit);

        // Pause between units
        await new Promise(resolve => setTimeout(resolve, 400));
    }

    console.log('AI Turn Complete');
}

/**
 * Check if current player is AI
 * @returns {boolean}
 */
export function isAIPlayer() {
    return gameState.aiEnabled && gameState.currentPlayer === 2;
}

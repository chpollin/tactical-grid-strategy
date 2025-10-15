// combat.js - Combat Logic
import { gameState, getUnitById, removeUnit, isValidPosition } from './state.js';
import { getUnitAt, getTileAt } from './map.js';
import { UNIT_STATS, TERRAIN_TYPES } from './constants.js';

export function getAttackRange(unit) {
    if (unit.hasAttacked) return [];

    const targets = [];
    const stats = UNIT_STATS[unit.type];
    const minRange = stats.minRange || 1;
    const maxRange = stats.maxRange || unit.range;

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

    // Get terrain defense bonuses
    const defenderTile = getTileAt(defender.x, defender.y);
    const defenderTerrain = TERRAIN_TYPES[defenderTile?.terrain];
    const defenderBonus = defenderTerrain?.defenseBonus || 0;

    const attackerTile = getTileAt(attacker.x, attacker.y);
    const attackerTerrain = TERRAIN_TYPES[attackerTile?.terrain];
    const attackerBonus = attackerTerrain?.defenseBonus || 0;

    // Schaden berechnen (mit Terrain-Bonus)
    const damage = Math.max(1, attacker.attack - (defender.defense + defenderBonus));
    defender.hp -= damage;

    let counterDamage = 0;
    let attackerDied = false;
    let defenderDied = false;

    // Gegenangriff (nur bei Nahkampf + Defender lebt)
    const distance = Math.abs(attacker.x - defender.x) + Math.abs(attacker.y - defender.y);
    if (defender.hp > 0 && distance === 1) {
        counterDamage = Math.max(1, defender.attack - (attacker.defense + attackerBonus));
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

    // Attacker hat angegriffen (wenn noch lebt)
    if (!attackerDied) {
        attacker.hasAttacked = true;
    }

    return {
        damage,
        counterDamage,
        defenderDied,
        attackerDied
    };
}

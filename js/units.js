// units.js - Movement Logic
import { gameState, isValidPosition } from './state.js';
import { getUnitAt } from './map.js';

export function getMovementRange(unit) {
    // ⚠️ Attack→Move Verbot: Wenn hasAttacked, keine Bewegung!
    if (unit.hasMoved || unit.hasAttacked) return [];

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

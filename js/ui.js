// ui.js - UI Updates
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

export function showTurnTransition(playerNumber) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('turn-overlay');
        const message = document.getElementById('turn-overlay-message');

        message.textContent = `Spieler ${playerNumber}'s Zug`;
        overlay.classList.remove('hidden', 'fading-out');

        // Show for 1 second, then fade out
        setTimeout(() => {
            overlay.classList.add('fading-out');

            setTimeout(() => {
                overlay.classList.add('hidden');
                resolve();
            }, 150); // Match fade-out duration
        }, 1000);
    });
}

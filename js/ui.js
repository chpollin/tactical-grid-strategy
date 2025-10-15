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

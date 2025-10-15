// constants.js - Alle Spiel-Konstanten
export const GRID_SIZE = 8;

export const UNIT_STATS = {
    warrior: {
        maxHp: 10,
        attack: 4,
        defense: 2,
        movement: 2,
        range: 1
    },
    scout: {
        maxHp: 6,
        attack: 2,
        defense: 1,
        movement: 4,
        range: 1
    },
    archer: {
        maxHp: 8,
        attack: 3,
        defense: 1,
        movement: 2,
        range: 2,
        minRange: 2,  // Kann nicht adjacent angreifen
        maxRange: 3
    }
};

export const PLAYER_COLORS = {
    1: '#3498db',  // Blau
    2: '#e74c3c'   // Rot
};

// ===== TERRAIN SYSTEM =====
export const TERRAIN_TYPES = {
    grassland: {
        id: 'grassland',
        name: 'Grasland',
        cssClass: 'tile-grassland',
        moveCost: 1,
        defenseBonus: 0,
        description: 'Offenes Grasland - normale Bewegung'
    },
    forest: {
        id: 'forest',
        name: 'Elfen-Wald',
        cssClass: 'tile-forest',
        moveCost: 2,
        defenseBonus: 1,
        description: 'Dichter Wald - langsame Bewegung, Deckung'
    },
    mountain: {
        id: 'mountain',
        name: 'Zwergen-Gebirge',
        cssClass: 'tile-mountain',
        moveCost: 3,
        defenseBonus: 2,
        description: 'Felsiges Gebirge - sehr langsam, starke Deckung'
    }
};

// ===== FACTION SYSTEM =====
export const FACTIONS = {
    elves: {
        id: 'elves',
        name: 'Wald-Elfen',
        description: 'Schnelle, elegante Waldbewohner',
        color: '#3AA6FF',
        units: {
            warrior: { name: 'Waldläufer', icon: 'W' },
            scout: { name: 'Späher', icon: 'S' },
            archer: { name: 'Bogenschütze', icon: 'A' }
        }
    },
    dwarves: {
        id: 'dwarves',
        name: 'Berg-Zwerge',
        description: 'Robuste, zähe Bergbewohner',
        color: '#FF5A4E',
        units: {
            warrior: { name: 'Schildwache', icon: 'W' },
            scout: { name: 'Minenkämpfer', icon: 'S' },
            archer: { name: 'Armbrustschütze', icon: 'A' }
        }
    }
};

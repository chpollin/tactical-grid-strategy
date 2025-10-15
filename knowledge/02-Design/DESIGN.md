---
type: design
phase: visual-design
status: active
version: 2.0
created: 2025-10-15
updated: 2025-10-15
tags: [design, ui, ux, visual, aesthetics, branding]
---

# VISUAL DESIGN GUIDE: Tactical Grid Strategy

**Version:** 2.0
**Ziel:** Professionelles, kohärentes und ästhetisches Design-System
**Status:** Post-Phase 4 Enhancement Plan

---

## 🎨 Design Philosophy

### **Core Principles**

1. **Clarity First** - Spielzustand muss immer klar erkennbar sein
2. **Tactical Aesthetics** - Militärische Präzision trifft moderne UI
3. **Smooth Feedback** - Jede Aktion fühlt sich responsiv an
4. **Accessibility** - WCAG 2.1 Level AA konform
5. **Scalability** - Design funktioniert auf allen Bildschirmgrößen

### **Design Inspiration**

- **Into the Breach** - Klare Grid-Visualisierung, minimalistisch
- **Advance Wars** - Farbcodierte Teams, klare Ikonographie
- **XCOM** - Professionelles Taktik-Interface
- **Material Design** - Moderne Animationen, Elevation

---

## 🎯 Current Design Analysis

### **✅ Was funktioniert gut:**

1. **Farbschema** - Klare Team-Unterscheidung (Blau vs Rot)
2. **Animationen** - Smooth, professionell (11 Keyframe-Animationen)
3. **Grid Layout** - Sauber, schachbrett-artig
4. **Hover-States** - Feedback bei Interaktion
5. **Modal System** - Mode Selection ist klar und ansprechend

### **⚠️ Verbesserungspotenzial:**

1. **Farbpalette** - Aktuell funktional, aber generisch
2. **Typographie** - Standard System-Fonts
3. **Grid-Tiles** - Flach, wenig Tiefe
4. **Unit Icons** - Simple Buchstaben (W/S/A)
5. **HP Bars** - Minimalistisch, aber kaum sichtbar
6. **Board Border** - Fehlt taktische "Command Center" Atmosphäre
7. **Background** - Einfarbig, könnte atmosphärischer sein

---

## 🌈 Enhanced Color Palette

### **Primary Colors (Tactical Dark Theme)**

```css
:root {
    /* Base Colors - Dark Military Theme */
    --color-bg-primary: #1a1f2e;      /* Deep Navy Blue */
    --color-bg-secondary: #252b3a;    /* Slightly lighter */
    --color-bg-elevated: #2d3548;     /* Cards & Modals */

    /* Accent Colors */
    --color-accent-primary: #5dade2;  /* Tactical Blue */
    --color-accent-gold: #f39c12;     /* Warning/Selection */
    --color-accent-success: #27ae60;  /* Move Range */
    --color-accent-danger: #e74c3c;   /* Attack Range */

    /* Player Colors */
    --color-player1: #3498db;         /* Bright Blue */
    --color-player1-dark: #2980b9;
    --color-player1-glow: rgba(52, 152, 219, 0.5);

    --color-player2: #e74c3c;         /* Bright Red */
    --color-player2-dark: #c0392b;
    --color-player2-glow: rgba(231, 76, 60, 0.5);

    /* Neutral Colors */
    --color-text-primary: #ecf0f1;
    --color-text-secondary: #bdc3c7;
    --color-text-muted: #7f8c8d;

    /* Grid Colors */
    --color-tile-light: #34495e;
    --color-tile-dark: #2c3e50;
    --color-tile-hover: #3d566e;
    --color-tile-border: #1a252f;
}
```

### **Semantic Colors**

```css
:root {
    /* Feedback Colors */
    --color-hp-full: #2ecc71;
    --color-hp-medium: #f39c12;
    --color-hp-low: #e74c3c;
    --color-hp-critical: #c0392b;

    /* Status Colors */
    --color-selected: #f1c40f;
    --color-disabled: #7f8c8d;
    --color-ai-thinking: #5dade2;
}
```

---

## 🔤 Typography System

### **Font Stack**

```css
:root {
    /* Primary Font - Clean, Modern */
    --font-primary: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;

    /* Tactical Font - Headers, Numbers */
    --font-tactical: 'Rajdhani', 'Orbitron', 'Courier New', monospace;

    /* Fallback */
    --font-fallback: system-ui, sans-serif;
}
```

### **Font Sizes & Weights**

```css
:root {
    /* Font Sizes */
    --fs-xs: 0.75rem;     /* 12px */
    --fs-sm: 0.875rem;    /* 14px */
    --fs-base: 1rem;      /* 16px */
    --fs-lg: 1.125rem;    /* 18px */
    --fs-xl: 1.25rem;     /* 20px */
    --fs-2xl: 1.5rem;     /* 24px */
    --fs-3xl: 2rem;       /* 32px */
    --fs-4xl: 2.5rem;     /* 40px */

    /* Font Weights */
    --fw-regular: 400;
    --fw-medium: 500;
    --fw-semibold: 600;
    --fw-bold: 700;
}
```

### **Implementation**

```css
body {
    font-family: var(--font-primary);
    font-size: var(--fs-base);
    font-weight: var(--fw-regular);
    line-height: 1.6;
}

h1, h2, h3 {
    font-family: var(--font-tactical);
    font-weight: var(--fw-bold);
}

.unit-icon, .turn-counter {
    font-family: var(--font-tactical);
}
```

---

## 🎭 Visual Hierarchy

### **Elevation System (Shadows & Depth)**

```css
:root {
    /* Elevation Levels */
    --elevation-0: none;
    --elevation-1: 0 2px 4px rgba(0,0,0,0.15);
    --elevation-2: 0 4px 8px rgba(0,0,0,0.2);
    --elevation-3: 0 8px 16px rgba(0,0,0,0.25);
    --elevation-4: 0 12px 24px rgba(0,0,0,0.3);
    --elevation-5: 0 16px 32px rgba(0,0,0,0.4);

    /* Inner Shadows (Inset) */
    --inset-soft: inset 0 2px 4px rgba(0,0,0,0.1);
    --inset-medium: inset 0 4px 8px rgba(0,0,0,0.2);
}
```

### **Glow Effects**

```css
:root {
    /* Team Glows */
    --glow-player1: 0 0 20px var(--color-player1-glow);
    --glow-player2: 0 0 20px var(--color-player2-glow);
    --glow-selected: 0 0 25px rgba(241, 196, 15, 0.6);
    --glow-attack: 0 0 15px rgba(231, 76, 60, 0.4);
    --glow-move: 0 0 15px rgba(46, 204, 113, 0.4);
}
```

---

## 🎮 Component Redesigns

### **1. Game Board**

**Problem:** Flaches Grid ohne Tiefe
**Lösung:** Tactical Command Table mit 3D-Effekt

```css
#game-board {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    padding: 15px;
    border: 3px solid #1a252f;
    border-radius: 8px;
    box-shadow:
        var(--elevation-4),
        inset 0 0 30px rgba(0,0,0,0.3);
    position: relative;
}

/* Grid Lines - Tactical Overlay */
#game-board::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    background:
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent calc(12.5% - 1px),
            rgba(52, 152, 219, 0.1) calc(12.5% - 1px),
            rgba(52, 152, 219, 0.1) 12.5%
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent calc(12.5% - 1px),
            rgba(52, 152, 219, 0.1) calc(12.5% - 1px),
            rgba(52, 152, 219, 0.1) 12.5%
        );
    pointer-events: none;
    z-index: 1;
}
```

### **2. Tiles - Hexagonal Alternative**

**Option A: Enhanced Squares (Einfacher)**

```css
.tile {
    background: var(--color-tile-light);
    border: 1px solid var(--color-tile-border);
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
}

.tile::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 30%,
        rgba(255,255,255,0.05) 0%,
        transparent 70%
    );
    pointer-events: none;
}

.tile:hover {
    background: var(--color-tile-hover);
    box-shadow: var(--elevation-2);
    transform: translateY(-2px);
}
```

**Option B: Tactical Grid Pattern (Fortgeschritten)**

```css
.tile {
    background:
        linear-gradient(45deg, transparent 48%, rgba(52, 152, 219, 0.03) 49%, rgba(52, 152, 219, 0.03) 51%, transparent 52%),
        linear-gradient(-45deg, transparent 48%, rgba(52, 152, 219, 0.03) 49%, rgba(52, 152, 219, 0.03) 51%, transparent 52%),
        var(--color-tile-light);
    background-size: 10px 10px;
}
```

### **3. Units - Enhanced Icons**

**Problem:** Simple Buchstaben (W/S/A)
**Lösung:** Icon-System mit Shapes & Colors

```css
.unit {
    width: 85%;
    height: 85%;
    border-radius: 50%;
    background: radial-gradient(
        circle at 30% 30%,
        rgba(255,255,255,0.2),
        transparent 70%
    );
    border: 3px solid currentColor;
    box-shadow: var(--elevation-3);
    position: relative;
}

/* Player 1 Units */
.unit.player-1 {
    background-color: var(--color-player1);
    color: var(--color-player1-dark);
    box-shadow: var(--elevation-3), var(--glow-player1);
}

/* Player 2 Units */
.unit.player-2 {
    background-color: var(--color-player2);
    color: var(--color-player2-dark);
    box-shadow: var(--elevation-3), var(--glow-player2);
}

/* Unit Type Indicators */
.unit-icon {
    font-size: 1.8em;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    font-family: var(--font-tactical);
}

/* Alternative: Shape-Based Icons */
.unit.warrior::after {
    content: '⚔';
    font-size: 2em;
}

.unit.scout::after {
    content: '👁';
    font-size: 1.6em;
}

.unit.archer::after {
    content: '🏹';
    font-size: 1.6em;
}
```

### **4. HP Bars - Advanced**

**Problem:** Zu klein, kaum sichtbar
**Lösung:** Prominent, farbcodiert, animated

```css
.hp-bar-container {
    position: absolute;
    bottom: -8px;
    left: 5%;
    width: 90%;
    height: 6px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.3);
}

.hp-bar {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                background-color 0.3s ease;
    box-shadow: 0 0 8px currentColor;
}

/* Dynamic Colors */
.hp-bar.hp-full {
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    box-shadow: 0 0 8px rgba(46, 204, 113, 0.6);
}

.hp-bar.hp-medium {
    background: linear-gradient(90deg, #e67e22, #f39c12);
    box-shadow: 0 0 8px rgba(243, 156, 18, 0.6);
}

.hp-bar.hp-low {
    background: linear-gradient(90deg, #c0392b, #e74c3c);
    box-shadow: 0 0 8px rgba(231, 76, 60, 0.6);
    animation: pulse-danger 1s ease-in-out infinite;
}

@keyframes pulse-danger {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}
```

### **5. Top Bar - Command Center**

```css
#top-bar {
    background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
    border: 2px solid #1a1f2e;
    padding: 20px 30px;
    box-shadow: var(--elevation-3);
    position: relative;
    overflow: hidden;
}

/* Tactical Scanline Effect */
#top-bar::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(52, 152, 219, 0.1),
        transparent
    );
    animation: scanline 3s linear infinite;
}

@keyframes scanline {
    0% { left: -100%; }
    100% { left: 100%; }
}

#current-player {
    font-family: var(--font-tactical);
    font-size: 1.4em;
    font-weight: var(--fw-bold);
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

#turn-counter {
    font-family: var(--font-tactical);
    background: rgba(52, 152, 219, 0.2);
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid rgba(52, 152, 219, 0.4);
}
```

### **6. Buttons - Tactical Style**

```css
.btn {
    font-family: var(--font-tactical);
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

/* End Turn Button */
#end-turn-btn {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    box-shadow:
        var(--elevation-2),
        inset 0 1px 0 rgba(255,255,255,0.2);
}

#end-turn-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,0.2),
        transparent
    );
    transition: left 0.5s;
}

#end-turn-btn:hover::before {
    left: 100%;
}

#end-turn-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--elevation-3);
}

#end-turn-btn:active {
    transform: translateY(0);
}
```

### **7. Game Log - Tactical Feed**

```css
#game-log {
    background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
    border: 2px solid #1a1f2e;
    border-radius: 8px;
    padding: 20px;
    box-shadow: var(--elevation-3);
    max-height: 200px;
    overflow-y: auto;
}

#game-log h3 {
    font-family: var(--font-tactical);
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-accent-primary);
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(52, 152, 219, 0.3);
}

#log-list li {
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    padding: 8px 12px;
    margin-bottom: 5px;
    background: rgba(0,0,0,0.2);
    border-left: 3px solid var(--color-accent-primary);
    border-radius: 2px;
    animation: slideInFromLeft 0.3s ease-out;
}

@keyframes slideInFromLeft {
    from {
        transform: translateX(-20px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Scrollbar Styling */
#game-log::-webkit-scrollbar {
    width: 8px;
}

#game-log::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.2);
    border-radius: 4px;
}

#game-log::-webkit-scrollbar-thumb {
    background: var(--color-accent-primary);
    border-radius: 4px;
}
```

---

## 🎬 Enhanced Animations

### **Micro-Interactions**

```css
/* Tile Selection Ripple */
@keyframes ripple {
    0% {
        box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
    }
    100% {
        box-shadow: 0 0 0 20px rgba(52, 152, 219, 0);
    }
}

.tile.highlight-move {
    animation: ripple 1.5s ease-out infinite;
}

/* Unit Spawn Animation */
@keyframes unitSpawn {
    0% {
        transform: scale(0) rotate(-180deg);
        opacity: 0;
    }
    60% {
        transform: scale(1.2) rotate(10deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}

.unit.spawning {
    animation: unitSpawn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Damage Numbers */
.damage-number {
    position: absolute;
    font-family: var(--font-tactical);
    font-size: 2em;
    font-weight: bold;
    color: var(--color-danger);
    text-shadow: 0 0 10px rgba(231, 76, 60, 0.8);
    animation: floatUpAndFade 1s ease-out forwards;
    pointer-events: none;
    z-index: 1000;
}

@keyframes floatUpAndFade {
    0% {
        transform: translateY(0) scale(0.5);
        opacity: 1;
    }
    100% {
        transform: translateY(-50px) scale(1.2);
        opacity: 0;
    }
}
```

---

## 🖼️ Background Enhancements

### **Option 1: Subtle Tactical Pattern**

```css
body {
    background:
        radial-gradient(circle at 20% 50%, rgba(52, 152, 219, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(231, 76, 60, 0.05) 0%, transparent 50%),
        linear-gradient(135deg, #1a1f2e 0%, #2c3e50 100%);
}
```

### **Option 2: Animated Grid**

```css
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
        linear-gradient(0deg, transparent 24%, rgba(52, 152, 219, 0.05) 25%, rgba(52, 152, 219, 0.05) 26%, transparent 27%, transparent 74%, rgba(52, 152, 219, 0.05) 75%, rgba(52, 152, 219, 0.05) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(52, 152, 219, 0.05) 25%, rgba(52, 152, 219, 0.05) 26%, transparent 27%, transparent 74%, rgba(52, 152, 219, 0.05) 75%, rgba(52, 152, 219, 0.05) 76%, transparent 77%, transparent);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: -1;
}
```

---

## 🎯 Highlight System Redesign

### **Enhanced Feedback**

```css
/* Move Range - Green Glow */
.highlight-move {
    background: radial-gradient(
        circle at center,
        rgba(46, 204, 113, 0.4) 0%,
        rgba(46, 204, 113, 0.2) 50%,
        transparent 100%
    ) !important;
    border: 2px solid var(--color-accent-success);
    box-shadow:
        inset 0 0 20px rgba(46, 204, 113, 0.3),
        var(--glow-move);
    animation: pulse-move 2s ease-in-out infinite;
}

@keyframes pulse-move {
    0%, 100% {
        box-shadow:
            inset 0 0 20px rgba(46, 204, 113, 0.3),
            0 0 10px rgba(46, 204, 113, 0.4);
    }
    50% {
        box-shadow:
            inset 0 0 30px rgba(46, 204, 113, 0.5),
            0 0 20px rgba(46, 204, 113, 0.6);
    }
}

/* Attack Range - Red Pulse */
.highlight-attack {
    background: radial-gradient(
        circle at center,
        rgba(231, 76, 60, 0.4) 0%,
        rgba(231, 76, 60, 0.2) 50%,
        transparent 100%
    ) !important;
    border: 2px solid var(--color-accent-danger);
    box-shadow:
        inset 0 0 20px rgba(231, 76, 60, 0.3),
        var(--glow-attack);
    animation: pulse-attack 1s ease-in-out infinite;
}

@keyframes pulse-attack {
    0%, 100% {
        box-shadow:
            inset 0 0 20px rgba(231, 76, 60, 0.3),
            0 0 10px rgba(231, 76, 60, 0.4);
    }
    50% {
        box-shadow:
            inset 0 0 30px rgba(231, 76, 60, 0.5),
            0 0 20px rgba(231, 76, 60, 0.6);
    }
}
```

---

## 📱 Responsive Enhancements

```css
/* Tablet */
@media (max-width: 1024px) {
    #game-container {
        max-width: 700px;
    }

    .unit-icon {
        font-size: 1.3em;
    }
}

/* Mobile */
@media (max-width: 768px) {
    #game-board {
        padding: 8px;
        gap: 1px;
    }

    .unit {
        width: 90%;
        height: 90%;
    }

    .unit-icon {
        font-size: 1em;
    }

    .hp-bar-container {
        display: none; /* Too small on mobile */
    }

    .mode-buttons {
        flex-direction: column;
    }
}
```

---

## 🎨 Implementation Priority

### **Phase 1: Quick Wins (1-2h)**

1. ✅ Enhanced Color Palette (CSS Variables)
2. ✅ Typography System (Google Fonts Integration)
3. ✅ Top Bar Redesign
4. ✅ Button Styling
5. ✅ Background Pattern

### **Phase 2: Visual Polish (2-3h)**

6. ⏳ Enhanced Tiles (3D Effect)
7. ⏳ Improved Unit Icons (Shape System)
8. ⏳ Advanced HP Bars
9. ⏳ Game Log Styling
10. ⏳ Highlight System Redesign

### **Phase 3: Advanced Features (3-4h)**

11. ⏳ Damage Numbers Animation
12. ⏳ Unit Spawn Animations
13. ⏳ Tactical Grid Overlay
14. ⏳ Particle Effects (optional)
15. ⏳ Sound Integration (optional)

---

## 📦 External Resources

### **Fonts (Google Fonts)**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
```

### **Icons (Optional - Font Awesome)**

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

**Icon Mapping:**
- Warrior: `<i class="fas fa-shield-alt"></i>` ⚔️
- Scout: `<i class="fas fa-running"></i>` 🏃
- Archer: `<i class="fas fa-crosshairs"></i>` 🎯

---

## 🔍 Quality Checklist

### **Before Implementation:**

- [ ] Alle Farben in CSS Variables ausgelagert
- [ ] Contrast Ratio ≥ 4.5:1 (WCAG AA)
- [ ] Alle Animationen haben `prefers-reduced-motion` Support
- [ ] Mobile-First CSS geschrieben
- [ ] Browser-Kompatibilität getestet (Chrome, Firefox, Edge)

### **After Implementation:**

- [ ] Lighthouse Score ≥ 90 (Performance, Accessibility, Best Practices)
- [ ] Visuelle Regression Tests
- [ ] User Feedback gesammelt
- [ ] Design dokumentiert (Screenshots, Videos)

---

## 📸 Visual References

### **Mockup Checklist:**

1. **Landing Page** - Mode Selection Modal
2. **Game Board** - Player 1 Turn
3. **Game Board** - AI Turn (Thinking Overlay)
4. **Combat** - Attack Animation Sequence
5. **Victory Screen** - Player Wins
6. **Mobile View** - Responsive Layout

---

## 🚀 Next Steps

1. **Create PHASE5_DESIGN_PLAN.md** - Step-by-Step Implementation Guide
2. **Backup Current CSS** - Before major changes
3. **Implement Phase 1** - Color Palette & Typography
4. **User Testing** - Gather feedback on new design
5. **Iterate** - Refine based on feedback

---

**Author:** Tactical Strategy Design Team
**Last Updated:** 2025-10-15
**Status:** Ready for Implementation
**Estimated Time:** 6-9 hours total

---

## 🎯 Design Goals Summary

| Goal | Current | Target | Priority |
|------|---------|--------|----------|
| **Visual Appeal** | 6/10 | 9/10 | High |
| **Clarity** | 8/10 | 9/10 | Medium |
| **Professionalism** | 7/10 | 9/10 | High |
| **Immersion** | 5/10 | 8/10 | Medium |
| **Accessibility** | 8/10 | 9/10 | High |

**Target:** AAA Indie Game Visual Quality 🎮✨

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

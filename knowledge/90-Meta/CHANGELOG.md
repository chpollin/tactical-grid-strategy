---
type: meta
status: active
created: 2025-10-15
updated: 2025-10-15
tags: [changelog, versions, history]
---

# CHANGELOG: Tactical Grid Strategy

Alle wichtigen Änderungen am Projekt werden hier dokumentiert.

---

## [4.0] - 2025-10-15

### Added - Phase 3: Stability & Bug Fixes
- 🛡️ **Input-Sperre während Animationen**
  - Globaler `isAnimating` Flag in state.js
  - Verhindert Doppel-Moves und State-Corruption
  - Buttons während Animationen deaktiviert
- 🐛 **First Move Teleport Bug Fix**
  - Double `requestAnimationFrame` für smooth Transitions
  - Erster Move gleitet jetzt korrekt
- 🚫 **Turn-Overlay Spam-Prevention**
  - `endTurn()` prüft `isAnimating` Flag
  - Keine mehrfachen Turn-Wechsel mehr möglich
- ♿ **Reduced Motion Accessibility**
  - CSS `@media (prefers-reduced-motion)` Support
  - WCAG 2.1 Level AA konform
  - Infinite Pulse-Animationen deaktivierbar

### Changed
- 📝 [[../README|README.md]]: Roadmap aktualisiert (Phase 2 & 3 Complete)
- 🎨 [[05-Implementation/PHASE3_PLAN|PHASE3_PLAN.md]]: Bug-Fix Dokumentation

### Technical
- `js/state.js`: +4 Zeilen (isAnimating Flag & Setter)
- `js/game.js`: +10 Zeilen (Animation Locking)
- `js/map.js`: +4 Zeilen (requestAnimationFrame Fix)
- `css/style.css`: +20 Zeilen (Reduced Motion Media Query)

### Impact
- ✅ Game fühlt sich stabil und professionell an
- ✅ Keine Doppel-Input Bugs mehr
- ✅ Barrierefrei für Motion-Sensitive Nutzer

**Commit:** `20757d1` | **Files:** 5 | **+68/-16 lines**

---

## [3.0] - 2025-10-15

### Added - Phase 2: Visual Polish & Animations
- 🎨 **11 CSS-Animationen implementiert**
  - Smooth Unit Movement (0.5s slide transition)
  - Attack Effects (shake, damage flash)
  - HP Bar Animations (color transitions)
  - Death Fade-Out (0.5s opacity)
  - Turn Transition Overlay (bounce effect)
  - Selection Pulse (infinite, gentle)
  - Highlight Fade-In (move/attack ranges)
  - Log Entry Slide-In
  - Victory Screen Pop & Pulse
  - Button Hover States (lift effect)
  - Button Press Feedback
- 🎬 **Async/Await Integration**
  - `moveUnit()` returnt Promise
  - `handleTileClick()` ist async
  - `endTurn()` ist async
  - Sequenzielle Animation-Execution
- ✨ **CSS Variables für Timing**
  - `--anim-fast: 0.15s`
  - `--anim-normal: 0.3s`
  - `--anim-slow: 0.5s`
  - Easing Functions (ease-out, ease-bounce)
- 🔄 **Turn Transition Overlay**
  - HTML Element hinzugefügt
  - "Spieler X's Zug" Message
  - 1s Display + Fade-Out
  - `showTurnTransition()` in ui.js

### Changed
- 🎨 `css/style.css`: +150 Zeilen (Keyframes, Variables, Animation Classes)
- 🎮 `js/map.js`: +90 Zeilen (Animation Helper Functions)
- 🎮 `js/game.js`: Async/Await für Animationen
- 🎮 `js/ui.js`: +18 Zeilen (Turn Transition)
- 📝 `index.html`: Turn Overlay Element

### New Functions
- `animateAttack(attackerId, defenderId)` - Attack Animation
- `updateUnitHP(unitId, newHP, maxHP)` - HP Bar Animation
- `animateDeath(unitId)` - Death Fade-Out
- `showTurnTransition(playerNumber)` - Turn Overlay

### Impact
- ✅ Game fühlt sich 10x polierter an
- ✅ Professionelles Game-Feel
- ✅ Smooth, satisfying Animationen

**Commit:** `95f050c` | **Files:** 6 | **+1236/-12 lines**

---

## [2.0] - 2025-10-15

### Added
- 🗂️ **Obsidian Vault-Struktur**
  - Ordner-Hierarchie (01-Context, 02-Design, etc.)
  - [[00-INDEX|Haupt-Index]] mit internen Links
  - Frontmatter in allen Dokumenten
  - Templates für Features/Bugs

### Changed
- 📚 Knowledge-Dokumente reorganisiert
- 🔗 Alle Querverweise als Obsidian-Links

---

## [1.1] - 2025-10-15

### Added
- ✅ **Feedback-Integration**
  - [[04-Requirements/REQUIREMENTS#TC-6|TC-6]]: Archer Adjacent-Verbot
  - [[04-Requirements/REQUIREMENTS#TC-7|TC-7]]: Attack→Move Verbot
  - [[04-Requirements/REQUIREMENTS#TC-8|TC-8]]: Bewegungs-Blockierung

### Changed
- 📝 [[04-Requirements/REQUIREMENTS|REQUIREMENTS v1.1]]
  - FR-4.9: Attack→Move explizit verboten
  - FR-6.5: MVP ohne Line-of-Sight klargestellt
  - NFR-2.6: Map-API-Grenzen definiert

- 🎮 [[02-Design/GAME_DESIGN|GAME_DESIGN v1.1]]
  - Orthogonalität präzisiert (nur ↑↓←→)
  - Archer LoS-Note hinzugefügt
  - Aktionsreihenfolge verschärft

### Fixed
- 🐛 Terminologie-Unklarheiten (orthogonal vs. diagonal)

---

## [1.0] - 2025-10-15

### Added
- 🎮 **MVP Complete!**
  - [[05-Implementation/IMPLEMENTATION_PLAN|Implementation Guide]]
  - Alle 7 JavaScript-Module
  - HTML + CSS komplett
  - [[../TESTING|TESTING.md]] mit TC-1 bis TC-8

### Implemented Features
- ✅ 8x8 Grid-Spielfeld
- ✅ 10 Einheiten (Warrior, Scout, Archer)
- ✅ Bewegung (BFS-Pathfinding, orthogonal)
- ✅ Kampf (Nahkampf mit Counter, Fernkampf ohne Counter)
- ✅ Turn-System (Hot-Seat Multiplayer)
- ✅ Victory-Screen (Elimination-Bedingung)
- ✅ UI/UX (Selection, Highlights, Log, HP-Balken)

### Validated
- ✅ TC-1: Movement (Warrior 2 Tiles, Scout 4 Tiles)
- ✅ TC-5: Turn-Wechsel funktioniert

### Pending Tests
- ⏳ TC-2: Kampf & Gegenangriff
- ⏳ TC-3: Archer-Fernkampf
- ⏳ TC-4: Victory-Screen
- ⏳ TC-6: Archer Adjacent-Verbot
- ⏳ TC-7: Attack→Move Verbot
- ⏳ TC-8: Bewegungs-Blockierung

---

## [0.5] - 2025-10-15

### Added
- 📚 **Knowledge Vault Initial**
  - [[01-Context/README|README.md]]: Context & Vision
  - [[02-Design/GAME_DESIGN|GAME_DESIGN.md]]: Mechaniken & Balancing
  - [[03-Data/DATA|DATA.md]]: Datenstrukturen
  - [[04-Requirements/REQUIREMENTS|REQUIREMENTS.md]]: FR & NFR
  - [[05-Implementation/INSTRUCTIONS|INSTRUCTIONS.md]]: Step-by-Step
  - [[05-Implementation/umsetzungsplan|umsetzungsplan.md]]: Timeline
  - [[02-Design/STORY|STORY.md]]: Optional Story

### Method
- 🔄 **Promptotyping-Ansatz**
  - Phase 1: Context (README)
  - Phase 2: Data (DATA)
  - Phase 3: Requirements (REQUIREMENTS, GAME_DESIGN)
  - Phase 4: Implementation (INSTRUCTIONS, PLAN)

---

## Format

Dieser Changelog folgt [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

### Typen:
- **Added**: Neue Features
- **Changed**: Änderungen an existierenden Features
- **Deprecated**: Features die bald entfernt werden
- **Removed**: Entfernte Features
- **Fixed**: Bug-Fixes
- **Security**: Sicherheits-Fixes

### Emoji-Legende:
- 🎮 Gameplay-Feature
- 🐛 Bug-Fix
- 📚 Dokumentation
- 🗂️ Struktur/Organisation
- ✅ Testing/Validation
- 🚀 Performance
- 🎨 UI/UX
- 🔒 Security

---

**Maintained by:** Tactical Strategy Dev Team

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

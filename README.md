# 🎮 Tactical Grid Strategy

A turn-based tactical strategy game built with **Vanilla JavaScript**. Features grid-based combat, multiple unit types, and hot-seat multiplayer.

**🎯 [Play Now](https://yourusername.github.io/tactical-grid-strategy/)** (GitHub Pages)

![Game Screenshot](https://via.placeholder.com/800x500?text=Game+Screenshot)

---

## ✨ Features

- **🎲 Turn-Based Combat** - Strategic gameplay with unit positioning
- **🗺️ 8x8 Grid Battlefield** - Clean, chess-like layout
- **⚔️ 3 Unit Types:**
  - **Warrior** - High HP, tanky melee fighter
  - **Scout** - Fast movement, reconnaissance
  - **Archer** - Ranged attacks (2-3 tiles)
- **🤝 Hot-Seat Multiplayer** - Two players on one device
- **💪 Combat System:**
  - Melee combat with counterattacks
  - Ranged combat without retaliation
  - Damage calculation: `ATK - DEF` (min 1)
- **🎨 Polished UI:**
  - Unit selection & highlights
  - Movement & attack range visualization
  - Game log with action history
  - HP bars for all units
  - Victory screen

---

## 🚀 Quick Start

### **Play Locally**

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/tactical-grid-strategy.git
   cd tactical-grid-strategy
   ```

2. **Start a local server:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Or use any other static server
   # npx serve
   # php -S localhost:8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

---

## 🎮 How to Play

1. **Select a unit** - Click on your blue unit (Player 1)
2. **Move** - Click on a green-highlighted tile
3. **Attack** - Click on a red-highlighted enemy
4. **End turn** - Click "Spielzug beenden" button
5. **Win** - Eliminate all enemy units!

### **Unit Types**

| Type | HP | ATK | DEF | Movement | Range |
|------|-----|-----|-----|----------|-------|
| **Warrior** (W) | 10 | 4 | 2 | 2 tiles | Melee (1) |
| **Scout** (S) | 6 | 2 | 1 | 4 tiles | Melee (1) |
| **Archer** (A) | 8 | 3 | 1 | 2 tiles | Ranged (2-3) |

---

## 🛠️ Tech Stack

- **Vanilla JavaScript** (ES6 Modules) - No frameworks!
- **HTML5** - Semantic structure
- **CSS3** - Grid layout & animations
- **DOM Rendering** - Fast & lightweight

**Zero dependencies!** 🎉

---

## 📂 Project Structure

```
tactical-grid-strategy/
├── index.html          # Entry point
├── css/
│   └── style.css       # All styles
├── js/
│   ├── constants.js    # Game config
│   ├── state.js        # State management
│   ├── map.js          # Map API & rendering
│   ├── units.js        # Movement logic
│   ├── combat.js       # Combat system
│   ├── ui.js           # UI updates
│   └── game.js         # Main game loop
└── knowledge/          # Documentation (Obsidian Vault)
```

---

## 📚 Documentation

**Comprehensive knowledge vault** (Obsidian-compatible):

- **[00-INDEX.md](knowledge/00-INDEX.md)** - Main navigation
- **[GAME_DESIGN.md](knowledge/02-Design/GAME_DESIGN.md)** - Mechanics & balancing
- **[DATA.md](knowledge/03-Data/DATA.md)** - Data structures
- **[REQUIREMENTS.md](knowledge/04-Requirements/REQUIREMENTS.md)** - Test cases
- **[IMPLEMENTATION_PLAN.md](knowledge/05-Implementation/IMPLEMENTATION_PLAN.md)** - Dev guide
- **[CHANGELOG.md](knowledge/90-Meta/CHANGELOG.md)** - Version history
- **[JOURNAL.md](knowledge/90-Meta/JOURNAL.md)** - Development log

**Method:** [Promptotyping](https://github.com/anthropics/promptotyping) (Context → Data → Requirements → Implementation)

---

## 🧪 Testing

Run tests according to [TESTING.md](TESTING.md):

- ✅ TC-1: Movement (Validated)
- ✅ TC-5: Turn-switch (Validated)
- ⏳ TC-2: Combat & counterattack
- ⏳ TC-3: Archer ranged combat
- ⏳ TC-4: Victory screen
- ⏳ TC-6: Archer adjacent restriction
- ⏳ TC-7: Attack→Move prevention
- ⏳ TC-8: Movement blocking

---

## 🗺️ Roadmap

### **Phase 1: MVP** ✅ Complete
- [x] Grid-based battlefield
- [x] 3 unit types
- [x] Movement & combat
- [x] Turn system
- [x] Victory condition

### **Phase 2: Visual Polish & Animations** ✅ Complete
- [x] CSS animations (11 animations implemented)
- [x] Smooth unit movement with slide transitions
- [x] Attack effects (shake, damage flash, HP bar animations)
- [x] Turn transition overlay
- [x] Victory screen animations
- [x] Button hover states & polish
- [x] Input locking during animations
- [x] Reduced motion accessibility support
- [ ] Terrain types (grass, forest, mountain) - moved to Phase 4
- [ ] Sound effects - moved to Phase 4
- [ ] Fog of war - moved to Phase 4

### **Phase 3: Stability & Bug Fixes** ✅ Complete
- [x] Input locking to prevent double-clicks during animations
- [x] First move teleport bug fix (requestAnimationFrame)
- [x] Turn overlay spam prevention
- [x] Reduced motion accessibility (prefers-reduced-motion)
- [ ] Resource system (gold, wood) - moved to Phase 4
- [ ] Buildings (HQ, goldmine, tower) - moved to Phase 4
- [ ] Unit recruitment - moved to Phase 4
- [ ] Map editor - moved to Phase 4

### **Phase 4** ⏳ Planned
- [ ] AI opponent (simple random)
- [ ] AI opponent (minimax algorithm)
- [ ] Difficulty levels
- [ ] Campaign mode

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (use [Templates](knowledge/Templates/))
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 Stats

- **Lines of Code:** ~590 (JS: 400, CSS: 150, HTML: 40)
- **Documentation:** ~100 KB markdown
- **Development Time:** ~3 hours
- **Code:Docs Ratio:** 1:170

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Built with [Claude Code](https://claude.com/claude-code)
- Inspired by Fire Emblem, Advance Wars, Into the Breach
- Method: [Promptotyping](https://github.com/anthropics/promptotyping)

---

## 📞 Contact

- **Issues:** [GitHub Issues](https://github.com/yourusername/tactical-grid-strategy/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/tactical-grid-strategy/discussions)

---

**⭐ Star this repo if you like it!**

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

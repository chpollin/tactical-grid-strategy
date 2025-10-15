---
type: implementation
phase: 4
status: in-progress
version: 1.0
created: 2025-10-15
updated: 2025-10-15
tags: [implementation, phase4, ai, mvp]
---

# PHASE 4 IMPLEMENTATION PLAN: AI Opponent

**Goal:** Add a Simple Random AI opponent so players can play solo against the computer.

**Status:** 🚧 In Progress
**Estimated Time:** 1-2 hours
**Complexity:** Low-Medium

---

## 📋 Overview

Transform the game from hot-seat multiplayer to include an AI opponent with:
- Random but valid move selection
- Automatic turn execution
- Configurable game mode (Human vs Human / Human vs AI)
- Smooth AI turn transitions with thinking delay

---

## 🎯 Success Criteria

- [ ] AI can control Player 2 and make valid moves
- [ ] AI follows all game rules (movement, combat, turn order)
- [ ] UI allows selecting game mode before match
- [ ] AI has visible "thinking" delay for better UX
- [ ] Game remains stable with AI opponent
- [ ] All existing features still work

---

## 🏗️ Architecture

### New Module: `js/ai.js`

```javascript
// AI Strategy: Simple Random
export function makeAIMove(state) {
  // 1. Get all AI units
  // 2. For each unit:
  //    - Get valid moves
  //    - Get valid attacks
  //    - Randomly decide: move, attack, or skip
  // 3. Return action object
}
```

### State Extension: `js/state.js`

```javascript
// Add game mode tracking
gameMode: "pvp" | "pve"  // Player vs Player or Player vs AI
aiEnabled: boolean
```

### Game Loop Integration: `js/game.js`

```javascript
async function endTurn() {
  // ... existing turn logic ...

  if (state.aiEnabled && state.currentPlayer === 2) {
    await executeAITurn();
  }
}

async function executeAITurn() {
  // 1. Show "AI is thinking..."
  // 2. Wait 1-2 seconds
  // 3. Execute AI moves
  // 4. End AI turn
}
```

---

## 📝 Implementation Steps

### **STEP 1: Create AI Module**

**File:** `js/ai.js`

**Functions:**
1. `getAIUnits(state)` - Filter units for AI player
2. `getValidMovesForUnit(unit, state)` - Get all valid move positions
3. `getValidAttacksForUnit(unit, state)` - Get all attackable enemies
4. `makeRandomDecision(unit, state)` - Randomly choose action
5. `executeAITurn(state)` - Main AI turn controller

**Strategy:**
- Prioritize attacks if available (aggressive AI)
- Otherwise move randomly
- Skip units with no valid actions

---

### **STEP 2: Add Game Mode Selection UI**

**File:** `index.html`

Add mode selection before game starts:
```html
<div id="game-mode-selection" class="modal">
  <h2>Choose Game Mode</h2>
  <button id="mode-pvp">Player vs Player</button>
  <button id="mode-pve">Player vs AI</button>
</div>
```

**File:** `css/style.css`

Style the modal overlay.

---

### **STEP 3: Extend State Management**

**File:** `js/state.js`

Add:
```javascript
gameMode: "pvp",
aiEnabled: false,
aiThinking: false
```

---

### **STEP 4: Integrate AI with Game Loop**

**File:** `js/game.js`

Modify:
- `endTurn()` - Check if AI should play
- Add `executeAITurn()` - AI turn controller
- Add delay for "thinking" animation

---

### **STEP 5: AI Thinking Indicator**

**File:** `js/ui.js`

Add:
```javascript
export function showAIThinking() {
  // Display "AI is thinking..." overlay
}

export function hideAIThinking() {
  // Hide overlay
}
```

---

### **STEP 6: Testing**

**Manual Tests:**
- [ ] AI makes valid moves
- [ ] AI attacks when possible
- [ ] AI doesn't break game rules
- [ ] AI turn ends properly
- [ ] Victory detection works with AI
- [ ] Can switch between PvP and PvE modes

---

## 🎨 UI/UX Considerations

### AI Turn Flow:
1. Player clicks "End Turn"
2. Turn transition: "Spieler 2's Zug (AI)"
3. Brief pause (0.5s)
4. AI thinking overlay appears
5. AI actions execute with animations
6. AI thinking overlay disappears
7. Turn transitions back to Player 1

### Visual Feedback:
- AI units highlighted during selection
- Same animations as human player
- Visible delays between actions (250ms)
- "AI is thinking..." text overlay

---

## 🔧 Technical Details

### AI Decision Algorithm (Simple Random):

```
for each AI unit:
  if unit has not acted this turn:
    attacks = get valid attack targets
    moves = get valid move positions

    if attacks.length > 0:
      randomly select attack target
      execute attack
    else if moves.length > 0:
      randomly select move position
      execute move
    else:
      skip unit (no valid actions)
```

### Future AI Improvements (Phase 5):
- **Heuristic Scoring:** Evaluate moves by value
- **Minimax Algorithm:** Look ahead 2-3 moves
- **Difficulty Levels:** Easy/Medium/Hard
- **Unit Prioritization:** Protect weak units, hunt low-HP enemies

---

## 📊 Expected Code Changes

| File | Lines Added | Complexity |
|------|-------------|------------|
| `js/ai.js` | ~150 | Medium |
| `js/state.js` | ~5 | Low |
| `js/game.js` | ~40 | Medium |
| `js/ui.js` | ~20 | Low |
| `index.html` | ~20 | Low |
| `css/style.css` | ~40 | Low |
| **Total** | **~275** | **Medium** |

---

## 🐛 Known Edge Cases

1. **AI has no valid moves:** Skip turn gracefully
2. **AI eliminates all player units:** Victory detection works
3. **Animation spam:** Ensure proper sequencing
4. **Input during AI turn:** Disable user input completely

---

## 🚀 Performance Considerations

- AI decision-making should be < 100ms
- Add artificial delay for UX (user expects AI to "think")
- Use existing animation system (no new performance issues)

---

## 📚 Documentation Updates Needed

- [ ] Update [README.md](../../README.md) - Add AI feature
- [ ] Update [CHANGELOG.md](../90-Meta/CHANGELOG.md) - Version 5.0
- [ ] Update [00-INDEX.md](../00-INDEX.md) - Phase 4 status
- [ ] Create test cases TC-13, TC-14, TC-15 for AI

---

## 🎯 Next Phase Preview (Phase 5)

After Simple Random AI works:
- Smart AI with evaluation function
- Minimax algorithm with alpha-beta pruning
- Difficulty selection (Easy/Medium/Hard)
- AI personality types (Aggressive, Defensive, Balanced)

---

**Dependencies:**
- Phase 1 (MVP) ✅
- Phase 2 (Animations) ✅
- Phase 3 (Stability) ✅

**Risks:**
- Low - AI uses existing game API
- All moves validated through existing systems

**Estimated Completion:** 2025-10-15 (same day)

---

**Author:** Tactical Strategy Dev Team
**Last Updated:** 2025-10-15

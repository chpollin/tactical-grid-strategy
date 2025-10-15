---
type: context
phase: mvp
status: finalized
version: 1.0
created: 2025-10-15
updated: 2025-10-15
tags: [context, vision, scope, mvp]
---

# CONTEXT: Tactical Grid Strategy Game

**Version:** 1.0
**Datum:** 2025-10-15
**Status:** Context Definition Phase

---

## Vision

Ein **rundenbasiertes taktisches Strategiespiel** im Browser, das mit Vanilla JavaScript implementiert wird. Fokus auf klare Mechaniken, schnelles Gameplay und iterative Erweiterbarkeit.

---

## Zielgruppe

- **Primär:** Hobby-Entwickler, die Game Development lernen wollen
- **Sekundär:** Casual-Strategie-Spieler (15-30 Min Sessions)
- **Skill-Level:** Einsteigerfreundlich, mit taktischer Tiefe

---

## Kern-Game-Loop

```
Runde Start
  ↓
Einheit auswählen → Bewegen → (Optional: Angreifen)
  ↓
Weitere Einheit auswählen → Aktionen ausführen
  ↓
Spielzug beenden
  ↓
Gegnerzug (später: KI)
  ↓
Siegbedingung prüfen → Falls nicht erfüllt: Nächste Runde
```

**Durchschnittliche Aktionen pro Zug:** 3-5 Einheiten bewegen/befehligen
**Spieldauer:** 10-20 Minuten pro Match

---

## Domain & Thema

**Genre:** Turn-Based Tactical Combat (ähnlich Fire Emblem, Advance Wars)

**Setting:**
- **MVP:** Abstrakt (Spieler 1 vs Spieler 2, farbcodiert)
- **Phase 2+:** Medieval Fantasy (optionale Story-Layer)

**Ton:** Leicht, zugänglich, keine düstere Story nötig

---

## Technische Rahmenbedingungen

| Kriterium | Anforderung |
|-----------|-------------|
| **Technologie** | Vanilla JavaScript (ES6+), HTML5, CSS3 |
| **Rendering** | DOM-basiert (HTML/CSS), später Canvas-Migration möglich |
| **Browser-Support** | Moderne Browser (Chrome, Firefox, Edge) |
| **Performance-Ziel** | 60 FPS bei bis zu 50 Einheiten |
| **Persistenz** | localStorage (kein Backend) |
| **Deployment** | Statische Files (GitHub Pages, Netlify) |

---

## Scope-Definition

### ✅ IN-SCOPE (MVP - Phase 1)
- 8x8 Grid-basiertes Spielfeld
- 2 Spieler (Hot-Seat Multiplayer)
- 3 Einheitentypen (Warrior, Scout, Archer)
- Bewegung mit Reichweitenbegrenzung
- Nahkampf & Fernkampf
- Siegbedingung: Elimination aller gegnerischen Einheiten

### 🔄 IN-SCOPE (Phase 2-3 Erweiterungen)
- Ressourcen-System (Gold, Holz)
- Gebäude (Basis, Goldmine, Turm)
- Terrain-Typen (Gras, Wald, Gebirge)
- Einheiten rekrutieren
- KI-Gegner (Simple → Advanced)

### ❌ OUT-OF-SCOPE (Vorerst)
- Online-Multiplayer (WebSockets)
- 3D-Grafik
- Komplexe Animations-Engine
- Story-Campaign (außer optional später)
- Mobile Touch-Optimierung

---

## Erfolgskriterien

### MVP ist erfolgreich, wenn:
1. ✅ Zwei Personen können gegeneinander spielen (Hot-Seat)
2. ✅ Alle Kern-Mechaniken funktionieren ohne Bugs
3. ✅ UI ist intuitiv (kein Tutorial nötig für MVP)
4. ✅ Jedes Spiel endet mit klarem Sieger
5. ✅ Code ist modular und erweiterbar

### Langfristig erfolgreich, wenn:
1. ✅ KI bietet Herausforderung (Phase 4)
2. ✅ Replay-Value durch verschiedene Strategien
3. ✅ Performance: <50ms Reaktionszeit auf User-Input
4. ✅ Code ist wartbar (klare Struktur, kommentiert)

---

## Risiken & Mitigation

| Risiko | Impact | Wahrscheinlichkeit | Mitigation |
|--------|--------|-------------------|------------|
| **Scope Creep** | Hoch | Hoch | Strikte Phase-Trennung, MVP zuerst |
| **Balancing-Probleme** | Mittel | Mittel | Playtesting nach jeder Phase, Daten-driven Design |
| **Performance bei vielen Einheiten** | Mittel | Niedrig | Profiling, Event Delegation, später Canvas |
| **KI zu komplex** | Niedrig | Mittel | Starte mit Random-KI, iterativ verbessern |

---

## Stakeholder & Experten

**Entwickler:** Solo-Developer (du)
**Playtester:** TBD (nach MVP)
**Domain-Experte:** Nicht erforderlich (Game Design selbst lernen)

---

## Nächste Phase

→ **GAME_DESIGN.md** (Detaillierte Mechaniken)
→ **DATA.md** (Datenstrukturen definieren)

---

**Token-Effizienz:** Dieses Dokument dient als Savepoint für alle Context-Entscheidungen. Bei Unklarheiten zurück zu diesem Dokument.

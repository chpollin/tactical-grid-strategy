# 🗂️ Tactical Grid Strategy - Obsidian Knowledge Vault

**Projekt:** Rundenbasiertes taktisches Strategiespiel
**Technologie:** Vanilla JavaScript, HTML5, CSS3
**Status:** MVP Complete ✅

---

## 🚀 Quick Start

### Für Obsidian-Nutzer:
1. **Obsidian installieren:** https://obsidian.md
2. **Vault öffnen:** "Open folder as vault" → Diesen `knowledge/` Ordner auswählen
3. **Start:** Öffne [[00-INDEX]] für Navigation

### Für Nicht-Obsidian-Nutzer:
Die Markdown-Dateien sind auch ohne Obsidian lesbar:
- **Start hier:** [00-INDEX.md](00-INDEX.md)
- Alle Links funktionieren in jedem Markdown-Viewer

---

## 📂 Struktur

```
knowledge/
├── 00-INDEX.md              # 🎯 Haupt-Navigation (START HIER!)
├── 01-Context/
│   └── README.md            # Vision, Scope, Erfolgskriterien
├── 02-Design/
│   ├── GAME_DESIGN.md       # Mechaniken, Balancing, Regeln
│   └── STORY.md             # Optional: Narrative
├── 03-Data/
│   └── DATA.md              # Datenstrukturen, Schemas
├── 04-Requirements/
│   └── REQUIREMENTS.md      # FR, NFR, Tests (TC-1 bis TC-8)
├── 05-Implementation/
│   ├── IMPLEMENTATION_PLAN.md    # Kompakter Implementation Guide
│   ├── INSTRUCTIONS.md           # Detaillierte Steps (deprecated)
│   └── umsetzungsplan.md         # Timeline (deprecated)
├── 90-Meta/
│   └── CHANGELOG.md         # Version-Historie
├── Templates/
│   ├── feature-template.md
│   └── bug-report-template.md
└── .obsidian/               # Obsidian-Config (auto-generiert)
```

---

## 🎯 Kern-Dokumentation

| Dokument | Zweck | Zielgruppe |
|----------|-------|------------|
| [[00-INDEX]] | Navigation & Overview | Alle |
| [[01-Context/README\|Context]] | Vision & Scope | Product Owner, Devs |
| [[02-Design/GAME_DESIGN\|Game Design]] | Spielmechaniken | Game Designer, Devs |
| [[03-Data/DATA\|Data]] | Datenstrukturen | Devs |
| [[04-Requirements/REQUIREMENTS\|Requirements]] | Tests & Validierung | QA, Devs |
| [[05-Implementation/IMPLEMENTATION_PLAN\|Implementation]] | Code-Guide | Devs |

---

## 🏷️ Wichtige Tags

- `#mvp` - MVP-relevante Dokumente
- `#context` - Context-Definition
- `#design` - Game-Design-Docs
- `#data` - Datenstrukturen
- `#requirements` - Anforderungen & Tests
- `#implementation` - Technische Umsetzung

---

## 🔗 Obsidian-Features

### Graph View
Zeigt Beziehungen zwischen Dokumenten:
- Context → Design → Data → Requirements → Implementation

### Backlinks
Jedes Dokument zeigt automatisch, wo es referenziert wird

### Tags
Filtern nach Phase, Status, Typ

### Templates
Nutze Templates für neue Features/Bugs:
- [[Templates/feature-template]]
- [[Templates/bug-report-template]]

---

## 📊 Status

**MVP:** ✅ Complete (Version 1.1)
**Phase 2:** ⏳ Planned
**Phase 3:** ⏳ Planned
**Phase 4:** ⏳ Planned

Siehe [[90-Meta/CHANGELOG|CHANGELOG]] für Details.

---

## 🆘 Support

- **Bugs:** Nutze [[Templates/bug-report-template|Bug Report Template]]
- **Features:** Nutze [[Templates/feature-template|Feature Template]]
- **Fragen:** Siehe [[00-INDEX#Troubleshooting|Troubleshooting]]

---

## 📜 Lizenz

MIT (optional)

---

**Maintained by:** Tactical Strategy Dev Team
**Last Updated:** 2025-10-15

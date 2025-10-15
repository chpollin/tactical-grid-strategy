# STORY: Narrative & Setting (Optional)

**Version:** 1.0
**Abhängigkeiten:** README.md, GAME_DESIGN.md
**Status:** Optional Enhancement
**Priorität:** Phase 5+

---

## ⚠️ MVP-Hinweis

**Story ist NICHT Teil des MVP!** Das Spiel ist vollständig spielbar ohne narrative Elemente. Dieses Dokument dient als Erweiterungsoption für spätere Phasen.

---

## Setting: Das Königreich der Zwei Türme

### Hintergrund

In einer mittelalterlichen Fantasy-Welt stehen sich zwei mächtige Häuser gegenüber:

**Das Blaue Haus (Spieler 1)** - *Haus Azuris*
- Symbol: Blauer Falke
- Motto: "Mit Strategie und Weitsicht"
- Spezialisierung: Scouts und schnelle Taktiken
- Heimat: Nördliche Berge

**Das Rote Haus (Spieler 2)** - *Haus Crimson*
- Symbol: Roter Löwe
- Motto: "Stärke durch Einheit"
- Spezialisierung: Warriors und direkte Konfrontation
- Heimat: Südliche Ebenen

### Konflikt

Ein neutrales Territorium (das 8x8 Schlachtfeld) liegt zwischen beiden Königreichen. Wer die Kontrolle über dieses strategische Land erlangt, wird die Vorherrschaft über die gesamte Region erlangen.

---

## Einheiten-Lore (Optional Flavor-Text)

### Warrior (Krieger)
*"Veteranen des Schlachtfelds, geschützt durch schwere Rüstung und ausgebildet im direkten Kampf. Langsam, aber unaufhaltsam."*

**Flavor:**
- Tragen schwere Plattenrüstung
- Kämpfen mit Langschwert und Schild
- Veteranen mit jahrelanger Erfahrung

### Scout (Späher)
*"Leichtgepanzerte Kundschafter, die Geschwindigkeit über Stärke setzen. Perfekt für schnelle Flankenangriffe."*

**Flavor:**
- Tragen Lederrüstung
- Bewaffnet mit Dolchen
- Junge, agile Kämpfer

### Archer (Bogenschütze)
*"Meisterschützen mit Langbögen, die aus sicherer Distanz Tod und Verderben regnen lassen."*

**Flavor:**
- Tragen leichte Stoffrüstung
- Langbögen mit effektiver Reichweite
- Geschulte Präzisionsschützen

---

## Terrain-Lore (Phase 2+)

### Grass (Grasland)
Offene Ebenen, perfekt für schnelle Bewegungen und klare Sichtlinien.

### Forest (Wald)
Dichtes Unterholz bietet Deckung, verlangsamt aber die Bewegung.

### Mountain (Gebirge)
Unpassierbare Felswände, die das Schlachtfeld segmentieren.

---

## Campaign-Ideen (Phase 5+)

### Mission 1: "Erste Konfrontation"
- Standard 8x8 Grid
- Beide Spieler mit Standard-Einheiten
- Tutorial-Mission
- **Lore:** Erste Begegnung der beiden Häuser

### Mission 2: "Der Waldpass"
- Map mit Forest-Tiles in der Mitte
- Spieler 1 hat +1 Scout
- **Lore:** Kampf um einen strategischen Waldweg

### Mission 3: "Bergfestung"
- Map mit Mountain-Tiles als Barrieren
- Spieler 2 hat Turm (Defense-Building)
- **Lore:** Angriff auf eine befestigte Position

### Mission 4: "Ressourcen-Krieg"
- Beide Spieler starten mit 50 Gold
- 2 Goldminen auf der Map (neutral)
- **Lore:** Kampf um wertvolle Goldminen

### Mission 5: "Finale Schlacht"
- Große Map (10x10)
- Beide Spieler mit je 10 Einheiten
- KI-Gegner auf "Schwer"
- **Lore:** Die entscheidende Schlacht um die Vorherrschaft

---

## Dialog-Snippets (Optional UI-Flavor)

### Spielstart
> *"Das Schicksal des Königreichs wird heute entschieden. Möge der klügere Stratege siegen!"*

### Erste Einheit stirbt
> *"Ein tapferer Kämpfer ist gefallen..."*

### Spieler gewinnt
> *"Sieg! Das [Blaue/Rote] Haus herrscht über das Land!"*

### Spieler verliert
> *"Die Schlacht ist verloren... aber der Krieg geht weiter."*

---

## Visual Themes (Phase 5+)

### Haus Azuris (Blau)
- **Farben:** Blau, Silber, Weiß
- **Architektur:** Spitze Türme, Falken-Symbole
- **Musik:** Orchestral, heroisch

### Haus Crimson (Rot)
- **Farben:** Rot, Gold, Schwarz
- **Architektur:** Massive Festungen, Löwen-Symbole
- **Musik:** Trommeln, kriegerisch

---

## Multiplayer-Lore (Optional)

### Ranked Mode
Spieler treten gegeneinander an, um ihren Rang im "Kriegsrat" zu erhöhen:
- Bronze (Rekrut)
- Silber (Veteran)
- Gold (Kommandant)
- Platin (General)
- Diamant (Kriegsherr)

---

## Story-Integration (Minimal MVP)

Wenn Story in MVP integriert werden soll (NICHT empfohlen, aber möglich):

**Nur Text-Overlay beim Start:**
```
"Zwei Häuser. Ein Schlachtfeld. Wer wird siegen?"

[Spieler 1: Haus Azuris] vs [Spieler 2: Haus Crimson]

[Start Game]
```

**Kosten:** +30 Min Implementierung
**Nutzen:** Atmosphäre, aber kein Gameplay-Vorteil

---

## ⚠️ Wichtig: Story vs. Gameplay

**Regel:** Story darf NIEMALS Gameplay behindern!

- ❌ Lange Intros überspringen können
- ❌ Dialog-Boxen blockieren UI
- ❌ Story erklärt Mechaniken besser als Tutorial
- ✅ Story ist reines Flavor-Text
- ✅ Spiel ist ohne Story komplett verständlich

---

**Savepoint:** Story ist optionales Enhancement. MVP braucht keine Story! Erst nach erfolgreicher Gameplay-Implementierung erwägen.

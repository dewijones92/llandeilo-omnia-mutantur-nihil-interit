---
title: Realistic models of important buildings
kind: design
status: proposed
updated: 2026-09-28
---

# Realistic models for the important buildings, through time

Raised by Dewi, 2026-09-28. **Proposed, not built.**

## The idea

The important places (castles, the abbey, the church, the forts, the bridge, Newton House) get
**realistic, accurate models**, one per phase, so each changes as it really did: built, extended,
besieged, slighted, ruined, restored.

## ⚠️ This changes an agreed decision

CLAUDE.md records **"Clean low-poly"** as the agreed look (Dewi chose it over "rich stylised" and
"high-poly now"). Realistic landmarks would change that, so it needs a decision:

| Option | What it looks like | Cost |
|---|---|---|
| A. Accurate low-poly | Same clean style, but modelled from the real plans: right towers, wards, gatehouses, heights | Moderate; keeps the look consistent |
| B. Realistic landmarks in a low-poly world | Detailed, textured hero buildings on the stylised valley | High; risk of a style clash |
| C. Realistic everywhere | Change the whole look | Very high; phones and bundle size suffer |

## Phases to model (from the research)

| Place | Phases |
|---|---|
| Dinefwr Castle | Lord Rhys's castle (after 1163) · 13th/14th-century stone castle with the great round tower · Tudor residence · ruin with the summerhouse on the tower |
| Carreg Cennen | Welsh castle (form unknown, so labelled reconstructed) · Giffard's rebuild 1287–1321 with the twin-towered gatehouse · slighted ruin after 1462 |
| Dryslwyn | Three-ward castle of the 1220s · 1287 siege damage · ruin |
| Talley Abbey | Unfinished cruciform church and cloister · the ruin with its two surviving tower walls |
| St Teilo's | Clas church (form unknown) · medieval church · c. 1600 west tower · George Gilbert Scott's rebuild 1848–51 |
| Roman forts | The larger fort · the smaller fort · buried and forgotten · found 2003 |
| Garn Goch | Stone ramparts in use · rubble banks today |
| Newton House | 1660 house · turrets from 1760–80 · Gothic recasing 1856–57 |
| Llandeilo Bridge | The seven-arched bridge · the 1848 single arch (44.2m span) |

## How models could be made

- **Blender, scripted** (installed): build each phase from the documented plans and dimensions in
  the research, export glTF, compress with gltf-transform.
- **Photogrammetry scans**: some castles have CC-BY scans on Sketchfab; usable only with a licence
  that allows it, recorded in the asset manifest, and only for "today" (a scan shows the ruin).
- **Paid asset packs or AI 3D generators**: possible, but a licence and accuracy question each time.
- Every model is *reconstructed* for any phase that does not survive, and its ⓘ says what it is
  based on (a plan, a description, an analogy).

## Questions

- 💭 Option A, B or C?
- 💭 Which place first? Dinefwr or Carreg Cennen have the richest records.
- 💭 How far does "realistic" go: textured stone, or accurate shape in the current flat colours?

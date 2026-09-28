---
title: Timeline experience
kind: design
status: proposed
updated: 2026-09-28
---

# Timeline experience: stepping through history

Raised by Dewi, 2026-09-28. **Proposed, not built.**

## 1. Previous and next

Someone wanting to go through history in order needs **◀ Previous** and **Next ▶** buttons, not
only a slider to drag.

- Two buttons beside the year readout, stepping through the **magnetic key dates** (22 today),
  in time order. The count and position show, e.g. "Battle of Llandeilo Fawr · 12 of 22".
- **Already there, but hidden:** PageUp and PageDown do exactly this from the keyboard. The buttons
  would make it visible, and the same code path serves both.
- Keyboard: ← and → for next and previous when the slider is not focused; the slider keeps its
  fine arrow-key scrubbing.
- At the ends: Next on the last date goes to "today"; Previous on the first goes to 12,500 BC.
- 💭 Should non-magnetic dates be steppable too, with a "major only" / "everything" switch?

## 2. The camera goes to the action

At each key date, **the camera flies to where it happened** and frames it.

- Each key date gets a **shot**: target point, distance, angle, and optionally a slow drift.
  Default: the event's place, at the close-up distance used by place labels.
- Examples: 1282 frames the road below Llandeilo where the ambush happened; 1287 frames Dryslwyn
  from the side the siege came from; 1857 follows the first train into the station.
- Dragging the slider freely never moves the camera. Only Next, Previous, clicking a marker or a
  snap does. A "Whole valley" button always brings you back.
- 💭 Should the camera keep its own position when you step, if you have moved it yourself?
- 💭 A **guided tour** mode (play button) would chain these shots with narration: see [`ideas.md`](ideas.md).

## 3. Sound and effects per event

Each key date and era can carry **effects**: short sounds and visual effects tied to the moment,
on top of the ambient sound bed that already crossfades by era.

| Moment | Sound | Visual |
|---|---|---|
| Railway (1857 on) | Steam locomotive: chuff, whistle, rails | **Smoke and steam from the train's chimney**, trailing behind it |
| Forge, smithy | Hammer on anvil | Sparks, chimney smoke |
| 1282 ambush | Distant shouts, horses (kept restrained) | Dust on the road |
| 1287 siege of Dryslwyn | Trebuchet thud, masonry falling | Stone shot, dust, a collapsing wall section |
| 1403 Glyndŵr | Siege noise at Carreg Cennen | Smoke from the camp |
| 1843 Walk Gate | Night, a crowd, a gate breaking | Torches, night lighting |
| Church and abbey | Bells, chant | Candlelight in windows at dusk |
| Iron Age | Livestock, quern grinding | Hearth smoke from roundhouses (already built) |
| Ice Age | Wind | Drifting snow |

Rules that follow from the project's first law:

- **Sounds are labelled like everything else.** Almost every effect is *reconstructed* (we know a
  train ran, not how it sounded that day), and the ⓘ says so.
- **Only what the research supports**: a trebuchet at Dryslwyn is documented; battle noise at the
  1282 ambush is reconstructed and kept restrained because almost nothing is known.
- Sources: generated in the browser (as the ambient beds are now), or CC0/CC-BY recordings with
  their licences in the asset manifest.
- Effects play only near the event in time and in view, and respect the Sound toggle.

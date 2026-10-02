---
title: Timeline experience
kind: design
status: partly built
updated: 2026-10-02
---

# Timeline experience: stepping through history

Raised by Dewi, 2026-09-28. **Partly built**: sections 1 and 2, and the train in section 3.

## 1. Previous and next

**Built 2026-09-28**: ◀ Previous and Next ▶ with a counter, PageUp/PageDown, and ← → when the page
or a step button has focus. Every event has a camera shot (`shot` on the event: a framing of close,
site, area or valley, and optionally a feature to frame instead of the event's place), and the
camera flies there on Next, Previous or a marker click.

How the build differs from the proposal below, and why (corrected 2026-09-28 after review):

- **A snap moves only the slider, not the camera.** The first proposal (since rewritten below) had
  snaps fly the camera too, but a third of the slider is within snapping distance of a key date, so
  ordinary drags kept pulling the camera away from a place you had flown to.
- **The counter reads "12 / 22"**, with the event's title in the moment card rather than repeated.
- **← → work when the page or anything on the timeline except the slider has focus.** Once you click the 3D view, Babylon gives the
  canvas focus and the arrow keys orbit the camera instead. Modified keys (Alt+← for Back) are left
  to the browser.
- **Steps count from where the slider is heading**, so two quick clicks on Next move two dates, and
  Next straight after a marker click steps on from that marker.
- **A minor marker flies to its own event**, rather than snapping to the nearest key date.

Someone wanting to go through history in order needs **◀ Previous** and **Next ▶** buttons, not
only a slider to drag.

- Two buttons beside the year readout, stepping through the **magnetic key dates** (22 today),
  in time order. The count and position show, e.g. "Battle of Llandeilo Fawr · 12 of 22".
- **Already there, but hidden:** PageUp and PageDown do exactly this from the keyboard. The buttons
  would make it visible, and the same code path serves both.
- Keyboard: ← and → for next and previous when the slider is not focused; the slider keeps its
  fine arrow-key scrubbing.
- At the ends the buttons are disabled (the first key date is already 12,500 BC).
- 💭 Should non-magnetic dates be steppable too, with a "major only" / "everything" switch?

## 2. The camera goes to the action

At each key date, **the camera flies to where it happened** and frames it.

- Each key date gets a **shot**: target point, distance, angle, and optionally a slow drift.
  Default: the event's place, at the close-up distance used by place labels.
- Examples: 1282 frames the area around Llandeilo (the research says only "near Llandeilo Fawr", so
  no precise spot is implied); 1287 frames Dryslwyn; 1857 frames the station. A shot never implies
  a location or direction the research does not support.
- Dragging the slider never moves the camera, even when it snaps. Only Next, Previous or clicking a
  marker does. A "Whole valley" button always brings you back.
- 💭 Should the camera keep its own position when you step, if you have moved it yourself?
- 💭 A **guided tour** mode (play button) would chain these shots with narration: see [`ideas.md`](ideas.md).

## 3. Sound and effects per event

**Partly built 2026-09-28**: the train trails steam from its chimney (the one smoke system, `style:
'steam'`, following the train), and its sound bed scales with the camera's distance to the train.

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
- Sources: generated in the browser (as the ambient beds are now), or recordings under any open licence
  ([ADR 0026](../adr/0026-open-licences-including-nc.md); corrected 2026-10-02 from "CC0/CC-BY") with
  their licences in the asset manifest.
- Effects play only near the event in time and in view, and respect the Sound toggle.

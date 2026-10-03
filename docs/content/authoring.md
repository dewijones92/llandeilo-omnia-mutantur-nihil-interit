---
title: Authoring content
kind: guide
status: current
updated: 2026-10-03
---

# How research becomes content

Content lives in `src/content/` as typed TypeScript data. The domain types in `src/domain/model.ts`
decide what can be written, so many mistakes are compile errors rather than review comments.

## Provenance: every item has one

| Tier | Use it for | Must carry |
|---|---|---|
| `documented` | A claim a researched source makes | At least one `src('note:Sn')` (the type forbids an empty list), optional `note` |
| `reconstructed` | Inferred from archaeology, typology or comparison (a roundhouse's form, a castle's plan) | A `basis` in both languages, plus sources where they exist |
| `imagined` | Invented to fill a gap (dialogue, a farmstead's exact spot, a family) | `groundedIn`, saying what it is based on |

Rules that follow:

- Cite a source only for what it actually says. If a note flags a claim as single-source or
  contested, say so in the item's text or `note`.
- Never put invented words in a real person's mouth. Documented people may appear in imagined
  scenes; their lines are marked as invented.
- When unsure, write the uncertainty into the content ("16 or 17 June", "no chronicle names…").

## Citations

Sources come from the research notes via `tools/research/extract-sources.mjs`. A key such as
`medieval:S27` means source S27 in `era-medieval-to-1282.md`. After any change to a note's source
list, regenerate and fix whatever no longer compiles, re-mapping by title.

## Time

Years are astronomical (`bc(800)` is -799, `ad(1282)` is 1282). A feature is fully present from
`from` to `to` and fades in just before and out just after, so a replacement (a ruin, a rebuilt
church) that starts on the year its predecessor ends crossfades cleanly; one with `datesExact` is on
from `from` to `to` and never outside them (ADR 0034, 0035). When a source names the day, write it
with `onDay(1840, 4, 10)` (the start of that day, leap years counted), not a decimal guessed from the
month. For a source's last day (the last steam train), use the next day's `onDay`, so the change
falls at the end of that day. Key dates marked `magnetic` snap the slider and show a moment card.

## Places and features

- Positions are OS grid references (EPSG:27700). Prefer the grid reference from Coflein or Cadw;
  convert lat/lon with `gdaltransform -s_srs EPSG:4326 -t_srs EPSG:27700` only when there is none.
- Feature kinds are a closed union; the renderer has one builder per kind. Adding a kind means
  adding its builder, and the compiler lists everywhere that needs handling.
- Landmarks are drawn larger than life (`WORLD.landmarkScale` in `src/domain/geo.ts`) so they read on
  the diorama; very large earthworks (hillforts) use their true footprint; town buildings use real OS
  footprints at true size, with heights exaggerated by `WORLD.verticalExaggeration`, like the hills.
  The About panel reads both numbers from `WORLD`, so it cannot drift.

## Building models (`building` features)

Important buildings are `building` features: a **plan** in `src/content/buildings.ts` plus a
**condition** (`standing` or `ruin`). One renderer (`src/world/buildings.ts`) draws every plan,
with one builder per part type: `wall`, `tower`, `hall`, `prism`, `ditch`, `bridge`, `platform`.
There is no per-castle or per-era code.

- **Plans are in true metres**, measured east (x) and north (y) from the feature's grid reference.
  Angles are degrees anticlockwise from east. A plan's `angle` turns the whole plan; a hall's or
  tower's `angle` turns that part. A part's `sides` and `openings` name walls in the part's own frame
  before rotation: `e` and `w` are its ends, `n` and `s` its long sides.
- **Only documented dimensions are "documented".** Everything else in a plan (positions, heights,
  widths) is a reconstruction, and the feature's provenance note must say which parts are
  approximate. Where a phase's form is unknown, keep a modest plan and label it `reconstructed`.
- **Phases share parts.** A later phase spreads the earlier phase's parts and adds to them
  (`CARREG_CENNEN = [...CC_INNER, ...CC_OUTER]`); a ruin reuses its standing plan with
  `condition: 'ruin'`.
- **Ruins come from the plan, not from code.** Each part may carry `ruin`: `{ stands }` (the
  fraction of its height that survives, broken deterministically), optionally `sides` (which walls
  of a square tower or hall stand, e.g. Talley's two tower walls), or `'gone'`. A part with no
  `ruin` keeps 45% in a ruin, and timber, daub and thatch rot away.
- **`platform`** levels a ward to the ground height at the grid reference, so a castle stands on its
  summit rather than draping down a 105m-spaced terrain mesh. Walls still reach down to the real
  ground. Its outline must be convex and follow the outer walls.
- **Scale: one rule, chosen by `setting`.** `landscape` plans (castles, the abbey, country houses,
  follies) are scaled `WORLD.landmarkScale` in all three axes so they read on the diorama.
  `map` plans (the church inside the town, the bridges across the drawn Tywi) sit among true-size
  map data, so they are drawn at **true footprint**, with heights × the terrain's vertical
  exaggeration. A `map` plan hides any OS building footprint it covers, so the church is not
  drawn twice; any plan hides the OS footprint that contains its grid reference (the landmark's own
  outline), and nothing else.
- **Orientation**: use a documented one (OS footprint, road line, a described side) and say so;
  otherwise the note says orientation is approximate.
- A town at a documented size uses the `nearest` OS footprints to its centre. The count can be
  documented while which buildings stood is reconstructed; label it that way.
- Active settlements clear woodland around them, so a hillfort sits on open ground.
- Every event has a camera shot, used when Previous, Next or its marker takes you there. By default
  it frames the event's place at site distance. Set `shot` to choose `close`, `site` or `area`, to
  frame a `feature` by id instead of the place, or to ask for the whole `valley`. Don't frame closer
  than the research places the event: "near Llandeilo Fawr" is an `area`, not a spot. A test fails
  if a shot resolves to nothing or points outside the disc.

## Text

UI strings live in `src/content/strings.ts`, and every content text is `{ en, cy }`. Welsh place
names come first. A human check of the Welsh is still pending.

## Conversations and voices

- A conversation is always `imagined`, and its `groundedIn` says what it rests on. A line that
  quotes a real text sets `quote`, naming the source; everything else is invented dialogue.
- `spoken` is in the period language where we have it; otherwise modern Welsh stands in, and the
  conversation's `languageNote` says so.
- Voices are generated by `node tools/voices/build-voices.ts` (edge-tts, which sends the text to
  Microsoft's online service). It regenerates only lines whose text or voice changed. Latin is
  read by `it-IT-DiegoNeural` (Church-style pronunciation), as chosen by ear.

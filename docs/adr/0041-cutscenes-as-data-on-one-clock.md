---
title: "ADR 0041: Cutscenes are data on one pure clock, drawn by one crowd system"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0041: Cutscenes are data on one pure clock, drawn by one crowd system

- **Status:** Accepted (decided by Claude under the proactive mandate, [ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md), so Dewi can overrule it); amended by [0042](0042-a-scene-draws-its-own-year.md)
- **Date:** 2026-10-03

## Context

Dewi agreed cutscenes at key dates on 2026-10-02, the first being the Roman army arriving at
Dinefwr ([design](../design/cutscenes.md), [decision log](../process/decision-log.md)). He chose a
narrator in the UI language with captions always on. The research
([roman-arrival](../research/roman-arrival.md) and its
[independent check](../research/reviews/roman-arrival-check-2026-10-02.md)) says no source describes
the arrival itself: the route, kit and order of march are reconstructed, the watchers imagined. More
scenes are planned (Dryslwyn 1287, the Walk Gate 1843, the first train 1857), so the unified law asks
for one engine, not code per scene.

## Decision

- **A cutscene is data** (`Cutscene` in `src/domain/cutscene.ts`, scenes in `src/content/cutscenes.ts`):
  an event id (the key date it plays at and lands on), a duration, camera keys, and tracks on one
  clock: `actors` (a kind of figure, a count, ranks and files, a route of grid references and how far
  along it the front rank is at the track's start and end), `sound` (a procedural cue), `caption`
  (bilingual text with its own provenance) and `feature` (a feature that builds from nothing). The
  scene and every track carry a provenance.
- **The camera is a field, not a track**, so a scene cannot have two cameras. A key gives a target
  grid reference, a distance in metres, a compass heading and a pitch, and how it is reached: eased,
  or a cut (hold the previous key, then jump). `src/domain/compass.ts` turns heading and pitch into
  camera angles.
- **The domain is pure and unit-tested**: `frameAt(scene, s)` says where the camera is, which caption
  shows, where every figure stands and faces, and how far built each feature is; `cuesBetween` fires
  each sound once as the clock passes it; `advance` moves the clock and stops it, ended, at the
  duration. Figures before the start of their route have not arrived and those past its end have gone
  in through the gate, so neither is drawn.
- **One crowd system** (`src/world/crowd.ts`): one thin-instanced low-poly mesh per kind of figure
  (scout, rider, pioneer, standard, trumpeter, auxiliary, mule, servant, farmer), filled each frame
  from the domain's placements, so a column of about 650 figures costs nine draw calls. Figures reuse the
  people's body parts (`bodyParts` in `src/world/people.ts`).
- **One stage** (`src/world/stage.ts`) draws a frame: it holds the camera through `Flight.hold`, lifts
  it if a shot would put it inside a hill, relaxes the camera's limits for close, low shots, and turns
  walking groups into dust plumes for the existing smoke layer (a `dust` style beside `hearth` and
  `steam`).
- **Procedural sound goes through the one mixer**: `Ambience.cue` plays procedural cues on a cue bus
  (a cornu's rough call, the tramp of feet, hooves, mules, axes), `duck` lowers the ambient beds, and
  `stopCues` swaps the bus so a skipped scene falls silent at once. The narration does not: it plays
  as an HTML audio element, as conversation voices do, so the mixer's master gain, duck and
  `stopCues` do not touch it; the player stops it itself, and checks the sound switch when each caption
  starts. *(Corrected 2026-10-03: this line first said all sound went through the one mixer; the
  second-Opus review found the narration does not.)*
- **Narration is pre-generated with edge-tts** by the existing `tools/voices/build-voices.ts`, one clip
  per caption per language (Sonia for English, Nia for Welsh), and the tool writes each clip's length
  to `src/content/generated/narration.ts`. A content test fails if any caption is shown for less time
  than its narration takes in either language, so the captions are timed to the voice, not guessed.
- **The player** (`src/ui/cutscene.ts`) runs the clock, shows the letterbox, captions with their ⓘ,
  the scene's ⓘ and Skip, and reads each caption when sound is on. While it plays the rest of the
  interface fades out, the timeline is hidden and locked (`TimelineBar.lock`), keys other than Escape do
  nothing and canvas taps are ignored. (Amended by [ADR 0042](0042-a-scene-draws-its-own-year.md): the
  world is drawn at the scene's year, an open ⓘ pauses the scene and Escape closes it first, and the
  interface behind is inert.) Skip, Escape or the end land on the key date and fly to the
  event's usual shot. `?cutscene=<id>&cutsceneAt=<s>` opens a scene part-way through, for screenshots.

## Consequences

- A new scene is a content entry: routes from grid references, tracks, captions and a narration run
  of `build-voices.ts`. No renderer change unless it needs a new kind of figure or sound.
- The engine runs on rendered frames, so on a slow renderer (CI's SwiftShader) a scene plays in
  wall time but jumps between frames.
- Shadows are rendered once (ADR 0013), so moving figures receive shadows but cast none; the fort's
  shadow map is refreshed at most four times a second while it builds.
- Narration that grows longer than its caption window fails the content test until the timings or
  the text change.

## Alternatives considered

- **Code per scene** (a script that moves meshes): rejected by the unified law, and untestable without
  a browser.
- **The camera as one track among many** (the design sketch): two camera tracks would have been
  representable.
- **A music track**: the research says the army marched without noise and found no music on the
  march, so the first scene has none and the kind is left out until a scene needs it.
- **Showing the timeline, locked, under the letterbox** (the design sketch: "any click on the timeline
  ends it"): the bars and captions need the space, so it is hidden and locked; Skip and Escape end the
  scene.
- **Live text-to-speech in the browser**: robotic voices were ruled out on 2026-09-26.

---
title: Cutscenes
kind: design
status: agreed
updated: 2026-10-02
---

# Cutscenes at key dates

Agreed by Dewi, 2026-10-02 ("romans marching in to llandeilo -- with a cutscene ... i am a massive
fan of cutscenes"). **Agreed; research under way, not built.**

## The idea

At a key date you can press **Watch** (or let a guided tour play it) and the app plays a short scene,
perhaps 20 to 60 seconds: the camera moves, people and animals move along real routes, the sound and
music swell, captions say what is happening, and every element keeps its ⓘ. **Skip** or Escape ends
it and leaves you at the key date, free to explore. First: the Roman army arriving at Dinefwr,
c. AD 74. Others that the research already supports: the 1287 siege of Dryslwyn, the night of the
Walk Gate (1843), the first train (20 January 1857), the flood under the new bridge (1848).

## One model, not code per scene (the unified law)

A cutscene is **data** in `src/content/cutscenes.ts`, played by one engine:

```ts
interface Cutscene {
  id: CutsceneId;
  event: EventId;             // the key date it belongs to
  sky?: { season: Season; hour: number; provenance: Provenance }; // only where a source dates it
  duration: Seconds;
  tracks: readonly Track[];   // all on one clock, from 0 to duration
  provenance: Provenance;     // the whole scene, and each track has its own
}
type Track =
  | { kind: 'camera'; keys: readonly CameraKey[] }               // target, distance, angle, ease
  | { kind: 'actors'; actor: ActorKind; count: number; route: readonly GridRef[]; from: Seconds; to: Seconds; provenance: Provenance }
  | { kind: 'sound'; sound: SoundId; at: Seconds; place?: GridRef; provenance: Provenance }
  | { kind: 'music'; piece: PieceId; from: Seconds; provenance: Provenance }
  | { kind: 'caption'; text: Bilingual; from: Seconds; to: Seconds }
  | { kind: 'feature'; feature: FeatureId; show: 'build' | 'appear' | 'fall'; from: Seconds; to: Seconds };
```

- **Routes are grid references** from the research (a Roman road line from Coflein, the Tywi), never
  free-hand, so the same journeys serve the agreed "people arriving from afar" item.
- **Actors are one crowd system** (instanced low-poly figures with a few kits: Roman auxiliary,
  legionary, mule, cart, farmer, cattle), not a model per scene.
- **The engine is pure where it can be:** the domain works out, for a time `s` in the scene, where the
  camera is and what each track is doing (testable without a browser); the renderer, audio and UI only
  read that state.
- **Sky:** a scene may set the season and hour only when a source dates them; otherwise it keeps the
  viewer's own sky, and the caption says the time of day is not recorded.

## Honesty

- The scene's ⓘ lists what is documented (the conquest, the forts' size and date), what is
  reconstructed (the column's kit and order of march, from Josephus and finds elsewhere), and what is
  imagined (faces, a particular soldier, the weather that day).
- Captions never quote a real person with invented words.
- If the route or direction is unknown, the caption says so, and the scene picks the more likely one
  from the research rather than presenting it as fact.

## Controls

**Watch** on the moment card when the date has a scene; **Skip** and Escape end it; the slider and
keys are locked while it plays, and any click on the timeline ends it. Sound follows the Sound toggle.
It plays on the 2.6×-scaled diorama, so close-ups of figures are framed to read at that scale.

## Tests

The domain clock is unit-tested (camera keys interpolate, tracks start and stop on time, a scene ends
where its key date is). One e2e flow: Watch, see the caption change, Skip, land on the key date.

---
title: "ADR 0056: Every building stands level at the highest ground under it, and the Roman forts' plots are terraced"
kind: adr
status: accepted
updated: 2026-10-16
---

# ADR 0056: Every building stands level at the highest ground under it, and the Roman forts' plots are terraced

- **Status:** Accepted; extends [ADR 0049](0049-lidar-terrain-tiles-blended-into-terrain-50.md) (its ground edits
  are now fed from the timeline) and amends [ADR 0053](0053-the-blender-pipeline-sheet-script-fitted-gltf.md)
  (a rigid part no longer stands at its own point)
- **Date:** 2026-10-16
- **Decided by:** Claude, under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
  so Dewi can overrule it. Dewi agreed the work on 2026-10-16 (the todo file's "Agreed 2026-10-16", from issue 3's
  comment: research levelling, then draw terraced platforms as a reconstruction or seat each building so nothing is
  buried). The ADR number 0056 was given by the workflow that ran this track (another branch holds 0055).

## Context

Issue 3's commenter showed Fort 1 at c. AD 74 with barracks sunk into the hill on its downhill side. Two causes,
both measured ([research note](../research/roman-forts-and-vicus.md#the-ground-the-forts-stood-on-levelling-and-terraces-2026-10-16)):

- **Seating at one point.** The procedural builder stood a hall or tower at the ground under its centre, and a
  Blender model's rigid part at the ground under its own point (ADR 0053). Across a 50m barrack today's ground
  falls up to 3.59m in Fort 1, so the uphill end was buried up to 2.43m of ground.
- **Exaggerated hills, true-height buildings.** The ground is drawn 2.4 times its height (ADR 0009) and the forts
  at true height (ADR 0046), so 2.43m of ground was 5.8m against walls 3m high: whole buildings vanished. The e2e
  measure below read 5.84m under the drawn mesh at barrack 15.

The same measure over every plan in the app (the `dewidebug seats` lines, 2026-10-16) found buildings buried
at one point everywhere there is a slope: Dryslwyn's by up to 17.17m of ground, Aberglasney's 6.05m, Carreg Cennen's
4.56m, Talley's 3.98m. Only prisms were already seated at their highest corner.

The research found no terrace at Dinefwr and no source for a terrace under each barrack of an early timber fort,
but levelling for Fort 2 in one trench, and Roman builders levelling and building up ground for barracks and works
elsewhere (Vindolanda, Hardknott, Birdoswald). So a levelled plot under each fort building is a labelled analogy.

## Decision

**1. One seating rule for every standing part of every plan** ([`src/domain/plot.ts`](../../src/domain/plot.ts)).
A hall, tower or prism stands level at the highest ground under its footprint (its corners, the middle of each
side and its centre: `footprintSamples`, `seatOf`), so no corner is buried; its walls carry down to the lowest
ground as before. The procedural builder (`buildPlan`, via `seatIn`) and the Blender models (`loadLandmark`, via the
frame's `seat`, filled by `planSeats` from the same function) read it, so a model stands where its fallback does.
`SEAT_TOLERANCE` (0.15m, a sill beam) is how far under the ground a floor may lie and still stand on it.

**2. Terraces are plan parts, drawn by the ground.** A new part, `terrace` (`at`, `length`, `width`, `angle`,
`batter`, `carries`: the ids of the buildings on it), with its own name and provenance like every other part, so
it is listed on the fort's card. `terraceEdits` turns each into a `terrace` ground edit (a new `EditShape`: a turned
rectangle at a set height, eased into the ground over its batter), levelled at the mean of the base ground across it,
so what is cut uphill roughly fills downhill. The build sheet leaves terraces out (`shapesGround`), so no model is
stale and none is rebuilt.

**3. The ground edits follow the timeline, by feature.** A feature's terraces are drawn exactly while the feature is
drawn: `FeatureLayer.apply` calls `Terrain.setGroundEdits(editsDrawn(...))` with the snapshot's features, the seam
ADR 0049 left unfed. The guess game's same-scene rule needs nothing new, since a changed ground is always a changed
set of features.

**4. A feature is built once, on the ground of its first year.** Meshes are built at start, but a fort is drawn only
while its own terraces are; so each building feature is built on the base ground with the terraces of every feature
drawn in full in its first year (`editsBuiltOn`, `Terrain.surfaceWith`), its own among them. Fort 1's backfilled
ditches are built on Fort 2's terraces, which are drawn with them.

**5. Tiles under a drawn edit take a finer step.** A 4m mesh draws a terrace a few metres across; a 10m or 20m mesh
smears it, and walls sink again into the smeared slope. A tile under an edit drawn now is treated as `EDITED_NEARER`
(320/850) of its distance when its step is chosen, so it is 4m out to 850m instead of 320m.

**6. The content.** One terrace under each headquarters, commander's house and barrack of both forts, and one shared
by each fort's two granaries (1 to 2m apart, closer than two plots' margins): 19 in Fort 1, 9 in Fort 2, each
reconstructed with the note's sources. A plot runs 3m level beyond the walls and eases into the slope over 1.25m,
so beside a barrack it ends halfway across the street to the next. The 3m was tuned on the drawn 4m mesh at the
issue's framing: 3m left a wall at most 0.25m under the mesh, 1.5m left 0.95m, 2.5m 1.07m, and a 1m end margin
1.56m. The vicus houses, imagined, get no terrace (the analogies are military); they stand by the rule alone, and
their ⓘ says so. No stone is drawn (ADR 0046 holds).

## Consequences

- **Measured** (e2e `AD … buildings stand on the mesh drawn`, at the issue's framing, 1600x900): the deepest any wall
  stands under the mesh drawn is 0.25m in Fort 1 at AD 74, 0.12m in Fort 2 and 0.10m in the vicus at AD 110. With the
  seating rule put back to one point (terraces kept) it read 0.57, 0.63 and 1.64; with neither, as on main, 5.84
  (barrack 15), 1.71 and 1.57. Plot footings, the most a floor stands above the lowest ground under it, are now at most
  0.53m in Fort 1 (1.87m under its headquarters with no terraces).
- **Every landmark changes where it stood on a slope.** Buildings rise to their highest corner, with taller walls
  downhill: Dryslwyn's hall block and Carreg Cennen's towers stand visibly taller, Aberglasney's house shows its full
  walls instead of sinking into the bank. Looked at before and after (the build log, 2026-10-16). The rule makes no
  claim about how those sites met their slopes; they have no terraces because nothing has been researched for them.
- **Roads beside a terrace are uneven close up.** A fort road laid by the plan follows the build ground, which a
  terrace's batter reaches at the road's edge, and the 4m mesh rises over it there in patches. Seen at 200m; not
  visible at the issue's framing. Plan roads are not re-laid on the drawn mesh (ADR 0049, decision 8), and a 2m mesh
  (its decision 5) would fix both this and the last 0.25m.
- **Cost.** Up to two more 4m tiles while a fort is drawn and near (byStep 4m: 5 against 3 at the issue's framing),
  and a rebuild of the fort's tiles when the slider crosses a fort's first or last year. Not timed.
- Things placed once at start still do not follow an edit (ADR 0049, decision 8): people, labels and trees near a
  terrace stand on the base ground. None was seen inside a fort.

## Alternatives considered

- **A plinth under each building, no ground edit.** Never buried, but with the hills exaggerated a 3.6m fall is an
  8.6m plinth under a 3m barrack; and the ground the building stands on is ground, so it belongs to the ground and its
  exaggeration, not to the building's true height.
- **One terrace per row of barracks.** No conflict between neighbours, but a 4 to 5m fall across a row needs scarps of
  up to 6m as drawn, and nothing supports such large earthworks over smaller plots.
- **Seating on the drawn mesh, re-laid as tiles change step.** Exact at any step, but buildings are merged meshes
  built once; re-laying them is the seam ADR 0049 left for later.
- **A 2m mesh under edits.** 127,000 triangles and 0.4 to 2.5s a tile (ADR 0049, decision 5).
- **Seat at the centre and accept the burial outside the forts.** A special case for one place, which the twin laws
  rule out.

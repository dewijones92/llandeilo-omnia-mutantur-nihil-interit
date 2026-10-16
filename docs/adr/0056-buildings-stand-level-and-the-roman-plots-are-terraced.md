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
- **Date:** 2026-10-16 (amended the same day after the independent review: the e2e reads the drawn floors and roads,
  roads lie on the mesh, the terrace ⓘ keeps its hedge, towers' footprints and terraces' scale are read from one
  place, and a feature is built only on the terraces that reach it; amended again after Dewi's decision, below: the e2e
  reads the walls off the drawn geometry, the plots' batter is two cells wide, the hedges are tightened and the
  castles' ⓘ say where a downhill wall's extra height comes from)
- **Decided by:** Claude, under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
  so Dewi can overrule it. Dewi agreed the work on 2026-10-16 (the todo file's "Agreed 2026-10-16", from issue 3's
  comment: research levelling, then draw terraced platforms as a reconstruction or seat each building so nothing is
  buried). The ADR number 0056 was given by the workflow that ran this track (another branch holds 0055).
  **Dewi, 2026-10-16, on whether the castles on steep ground should keep the rule: "One rule for all".** So the
  seating rule stays for every building, Dryslwyn's and Carreg Cennen's included, with no exemption.

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
but a layer in one trench that the excavator reads as *possibly* levelling laid for Fort 2, and Roman builders
levelling and building up ground for barracks and works elsewhere (Vindolanda; Hardknott, from two sources). Birdoswald
is an encyclopedia's summary of a guidebook nobody here has read: a lead, not counted. So a levelled plot under each
fort building is a labelled analogy, and the analogy is general (levelling for barracks and works), not a terrace
under each barrack of an early timber fort, which no source read shows.

## Decision

**1. One seating rule for every standing part of every plan** ([`src/domain/plot.ts`](../../src/domain/plot.ts)).
A hall, tower or prism stands level at the highest ground under its footprint (its corners, the middle of each
side and its centre: `footprintSamples`, `seatOf`), so no corner is buried; its walls carry down to the lowest
ground as before. The procedural builder (`buildPlan`, via `seatIn`) and the Blender models (`loadLandmark`, via the
frame's `seat`, filled from the floors the procedural draw recorded) read it, so a model stands where its fallback does.
A tower's footprint is `towerRing` (`src/domain/plan.ts`), the one outline the renderer draws and the seat reads, hexagons
and octagons included: they are drawn with their sides tangent to the circle of the tower's size, so their corners lie
up to 15% further out than its radius, and the seat once sampled a round ring that missed them.
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
drawn in full in its first year, its own among them, and only those that reach the ground it clears (`editsBuiltOn`,
`Terrain.surfaceWith`, with `clearingMetres`, moved from the renderer to the domain so the tests read the same number).
Fort 1's backfilled ditches are built on Fort 2's terraces, which are drawn with them; a feature elsewhere in the valley
that starts in a fort's years is built on none (the review found Garn Goch's ruin built on all 19 of Fort 1's).

**5. Tiles under a drawn edit take a finer step.** A 4m mesh draws a terrace a few metres across; a 10m or 20m mesh
smears it, and walls sink again into the smeared slope. A tile under an edit drawn now is treated as `EDITED_NEARER`
(320/850) of its distance when its step is chosen, so it is 4m out to 850m instead of 320m.

**5a. Roads and ditches lie on the mesh that will be drawn.** A plan's road and ditch ribbons were laid on the smooth
ground, but a 4m mesh cannot follow a terrace's batter as the smooth ground does, so the ribbons floated and sank by
up to 2.06m (Fort 1) where they crossed one. `Terrain.meshWith` computes the 4m tile a feature's edits would draw
(`DetailTerrain.drawnWith`, cached per tile and set of edits), `buildPlan` lays ribbons on it (`Frame.ribbon`), and a
road is sampled every 2m, twice as often as the mesh is cut. Map roads and rails already followed the drawn mesh
(`ribbonGroundAt`, with `onDrawnChange`); a plan is built once, so this reads the mesh its own terraces make.

**6. The content.** One terrace under each headquarters, commander's house and barrack of both forts, and one shared
by each fort's two granaries (1 to 2m apart, closer than two plots' margins): 19 in Fort 1, 9 in Fort 2, each
reconstructed with the note's sources. A plot runs 3m level beyond the walls and eases into the slope over 8m, two cells of
the 4m mesh drawn near, so beside a barrack the two plots' eases cross in the 8.5m street. The 3m was tuned on the drawn 4m mesh at the issue's framing, with a 1.25m batter: 3m left a wall
at most 0.25m under the mesh, 1.5m left 0.95m, 2.5m 1.07m, and a 1m end margin 1.56m. The 1.25m batter fell inside one
cell, so the mesh drew it as a single steep, dark facet, with slivers at the plots' corners and patchy ramps where the
roads crossed (the review's close shots at a radius of 16m); 4m left a small sliver at each plot's end, and at 8m it is a ramp, with the same measure
reading a wall at most 0.06m under the mesh in Fort 1, 0.12m in Fort 2 and 0.10m in the vicus. The vicus houses, imagined, get no terrace (the analogies are military); they stand by the rule alone, and
their ⓘ says so. No stone is drawn (ADR 0046 holds). The terrace's ⓘ keeps the excavator's hedge (the Trench 2 layer
"possibly" represents levelling), cites only sources it can carry (Vindolanda, Hardknott from English Heritage, the
project's note) and leaves Birdoswald out until its guidebook is read (the review: an encyclopedia lead is not a
source, and naming it in the ⓘ still lent it weight). `terraceEdits` places a
terrace at its plan's setting scale, like the buildings; every terrace today is on a true-scale plan.

## Consequences

- **Measured** (e2e `AD … buildings stand on the mesh drawn`, at the issue's framing, 1600x900): the deepest any wall
  stands under the mesh drawn is 0.06m in Fort 1 at AD 74, 0.12m in Fort 2 and 0.10m in the vicus at AD 110. With the
  seating rule put back to one point (terraces kept) it read 0.57, 0.63 and 1.64; with neither, as on main, 5.84
  (barrack 15), 1.71 and 1.57. Plot footings, the most a floor stands above the lowest ground under it, are at most
  0.53m in Fort 1 (1.87m under its headquarters with no terraces). The e2e reads each part's floor **off the vertices
  drawn**: the lowest wall top at the footprint's corners in the procedural near mesh and in the model's run for the
  part (a gate leaf, which turns on its hinge, by its highest vertex), less the wall's height. The builders' recorded
  floors are kept only to be compared with the drawing: they agree to within a hundredth of a millimetre where both
  exist, and the test fails if they ever differ by 0.1m. A recorded floor is a claim, and the review's mutants showed a
  builder can record one and draw another: a hall drawn at its centre's ground while recording the seat (M1) and a
  rigid model part placed at its own point's ground while recording the seat (M3) both passed the first version of the
  test; both now fail it, as does putting the one-point seat back inside `seatIn`. The e2e also reads the heights each
  road's edges were laid at, so leaving the ribbons on the smooth ground fails it (the review found the first version
  read only the precomputed seat and passed with the renderer reverted).
- **Every landmark changes where it stood on a slope.** Buildings rise to their highest corner, with taller walls
  downhill: Dryslwyn's hall block and Carreg Cennen's towers stand visibly taller, Aberglasney's house shows its full
  walls instead of sinking into the bank. Looked at before and after (the build log, 2026-10-16). The rule makes no
  claim about how those sites met their slopes; they have no terraces because nothing has been researched for them.
  A downhill wall can show about a storey taller than its plan (Dryslwyn's hall block), because the hills are drawn
  2.4 times as high and the castle larger than life; the ⓘ of every Dryslwyn plan says so, in both languages (the
  generic seating note, `SLOPE_SEATING` in `src/content/buildings.ts`): that height is the app's drawing of the slope,
  not the sources'. Carreg Cennen, Talley and Aberglasney are lifted the same way (up to 4.56m, 3.98m and 6.05m of
  ground) and do not yet carry the note.
- **Roads cross terrace steps.** With the ribbons on the mesh (5a) a fort road meets each barrack's plot as a short
  ramp, not as the patches the first version drew; the step is the reconstruction's own (adjacent plots differ by up to
  about a metre across a street), drawn with its batter, and a 2m mesh would round it further (ADR 0049, decision 5).
- **Cost, measured 2026-10-16** (GPU through WSL, High, 1920x1080, vsync off, the fort at AD 76, machine at load 12 to
  17, two runs each, this branch against main at 1435e2a): idle 144 to 160fps against 151 to 156, orbit 54 to 112
  against 71 to 73, scrub 18 to 40 against 17 to 19; no cost measurable through the noise. Start-up: the features build
  took 227 to 240ms against 189 to 193 (the two forts' 4m tiles with their edits are computed once, cached). The main
  chunk grew by 4,194 bytes gzipped (559,939 against 555,745). Up to two more 4m tiles while a fort is drawn and near
  (byStep 4m: 5 against 3 at the issue's framing).
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
- **Keep the 1.25m batter and add a plinth or skirt to hide the facet.** More geometry to hide a ramp a wider batter
  draws for free.
- **Exempt the castles, whose slopes the app exaggerates most.** Dewi, 2026-10-16: "One rule for all". Dryslwyn's
  hall block stands taller on its downhill side and says why.
- **A 2m mesh under edits.** 127,000 triangles and 0.4 to 2.5s a tile (ADR 0049, decision 5).
- **Seat at the centre and accept the burial outside the forts.** A special case for one place, which the twin laws
  rule out.

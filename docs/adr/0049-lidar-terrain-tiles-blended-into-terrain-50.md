---
title: "ADR 0049: LiDAR terrain in tiles, blended into Terrain 50, with period changes kept apart"
kind: adr
status: accepted
updated: 2026-10-16
---

# ADR 0049: LiDAR terrain in tiles, blended into Terrain 50, with period changes kept apart

- **Status:** Accepted, extends [ADR 0009](0009-terrain-os-terrain50-low-poly.md)
- **Date:** 2026-10-09; amended 2026-10-10 (the review's findings, and the merge with main, which took ADRs
  0041 to 0048: this was 0041 on its branch, became 0048 at the first merge, and 0049 when the GPU kit took 0048;
  the second review's two findings, ribbons buried by the coarse mesh and the tree identity untested; and the
  third's, ribbon corners under the mesh and the train's re-laying untested); amended 2026-10-16 (a third
  area, Dinefwr Castle: see "Amendment" below; no new ADR, since nothing in the design changed)
- **Decided by:** Claude, under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
  so Dewi can overrule it. Dewi agreed the work itself (GitHub issue 2, 2026-10-09) and said to credit
  the source and not chase licence problems; every design choice below is Claude's.

## Context

CLAUDE.md has long said "OS Terrain 50 for the whole circle; Welsh Government LiDAR (1-2m) for the
close-up places", but only Terrain 50 was built. Its 50m cells put the town and the Roman forts on soft,
featureless ground: the 105m triangles of the mesh drown the real terraces, banks and slopes. Issue 2
asks for detailed, real-scale ground for the town and the forts, tiled, with levels of detail, the base
kept apart from period changes, documented sources, and room to grow.

Facts that shaped it (data note: [`docs/data/lidar.md`](../data/lidar.md)):

- The 1m DTM is available for the whole of the region, free of nodata, in EPSG:27700. Over 25 tiles it is
  48MB of GeoTIFF, which is not for the repository or the browser.
- It agrees with Terrain 50 to 0.19m on average, so the two share a frame and can be blended.
- Buildings, roads, trees, people, the railway and every feature are placed once, at start, on
  `Terrain.heightAt`. Anything that changes the drawn ground must change that answer too, or the town
  floats or sinks.
- The coarse mesh is irregular, flat-shaded and low-poly, and the look must not change outside the
  region.

## Decision

**1. Tiles.** `tools/terrain/fetch-lidar.sh` and `build-lidar.py` turn the 1m tiles into 500m tiles of
vertex heights (`uint16` centimetres, edge vertices shared with the neighbour), all in one file,
`public/data/lidar/lidar.bin`, with a manifest (`lidar.json`) that names the region, the areas, every tile and every source file's
hash. Tiles that touch the two priority areas (`tools/terrain/lidar-areas.json`: Llandeilo 1.5km, the
Roman forts 1km, centred on those places' references) keep every 2m; the rest of a 5km by 4km region
keeps every 10m. Raw downloads stay outside git; 3.0MB of processed tiles are committed. A new area is a
line in `lidar-areas.json` and a rerun (done once since, for the castle: see "Amendment, 2026-10-16" below).

**2. One ground, one seam.** `Terrain` ([`src/world/terrain.ts`](../../src/world/terrain.ts)) answers
"how high is the ground here" for everything: OS Terrain 50 outside the region, and inside it the LiDAR,
eased in from the rim over 300m (`DetailGround.metresAt`, `rimWeight`), with river channels carved
(`carveChannel`) and the period's ground edits laid over (below). Buildings, trees, features, labels,
roads, people and rivers all ask it (`heightAt`, `surfaceAt`, `inDetail`); the trees that stood on
triangle centroids use it inside the region. No place or era has its own path.

A ribbon laid along a line (a road, a railway section, the train's path) takes the
ground's height only at its vertices and runs straight between them, so over OS road legs hundreds of
metres long it cut through the 2m ground (found by the review: 10 of 162 road legs in the region had
ground above them, the worst by 3.7m over a 551m leg). `Terrain.lineOnGround` therefore adds a point
every 4m, the finest mesh step, to any line inside the region (`densifyWhere`, in the one polyline
helper of [ADR 0043](0043-one-polyline-helper.md)), and the fort ribbons use the same step (the forts' ditches and roads are laid once, by `buildPlan`, on the
2m ground `surfaceAt`, and are not laid again; decision 8). Outside the
region lines are as before. Street lamps are points, each standing on the ground at its own place, so
they need nothing.

**Ribbons follow the mesh that is drawn, not the 2m ground** (second review, 2026-10-10). Inside the region
`surfaceAt` is the smooth ground from the 2m and 10m samples. The mesh drawn there is cut at 4, 10 or 20m
by camera distance, so it differs from that ground (the gaps are in the consequences below), and a ribbon laid on the ground is buried wherever the mesh is higher. The first road test compared
ribbons with `surfaceAt`, so it could not see that. `Terrain.drawnAt` now reads the resident tile at its
step with the same cut of each cell as `tileGeometry` (`tileSurfaceAt`, one `cutsNorthWestToSouthEast`
for both), and `Terrain.drawnAtStep` reads any step a tile can be drawn at (`drawnSteps`: 4, 10 and 20,
held to the tile's own data step). Measured by the e2e test on the 6,216 road and rail legs in the region,
nine samples each, against the old build: 709 samples under the mesh at the overview, 276 in the town view
(where far tiles are coarse) and 89 even at 10m. Two fixes were tried against that measure:
- *Lift each ribbon vertex to the highest mesh any step can draw there.* Never under, but a coarse mesh
  bridges every cutting, so the road then hovers over the 4m mesh in the town close-up: up to 1.22 world
  units (5m) above it, with 714 samples more than 0.6 units (2.5m) above. Rejected.
- *Lay the ribbon on the mesh drawn, and again when its tile is redrawn.* Chosen. `Terrain.ribbonGroundAt`
  is `drawnAt` inside the region (the 2m ground until a tile is built, outside it as before),
  `Terrain.onDrawnChange` publishes the areas of the tiles just built (at a new step, or after a ground
  edit), and `Features` calls `Ribbon.relay` on every road and rail ribbon and `Train.relay` on its path,
  which re-lay only the vertices inside those areas and upload only if one moved. Each ribbon corner is
  laid at the ground under its own x and z, not under its centreline point: a ribbon is up to 1.6 units
  wide, and on a slope the two corners of one pair stand on different ground (the third review found
  corners under the mesh (its count: 186 of 10,180 road corners and 89 of 2,434 rail corners at the 2020
  overview, by as much as 0.46 units), while the e2e sampled only the midpoint. Result, by the e2e test, which now
  samples both edges of every leg (6,216 legs, nine samples along each edge), at the overview, in the town
  at radius 60 and back at the overview: none under the mesh (the old code read 2,412 samples under at the
  overview by the same test), lowest 0.10 above it, and at most 0.46 units (overview) and 0.51 (town)
  above it, which is the 0.3 or 0.35 lift plus the chord between vertices. The train has its own e2e test: put at the vertex of its line nearest the town
  (`Train.placeNear`, behind `llandeiloDebug.placeTrainNear`, as it takes minutes to run there), at the
  overview, then after the camera flies to it and its tile is drawn at 4m, then back out at 20m, it stands
  its lift (0.4) above the mesh drawn under it to within 0.002 units each time (the test allows 0.05). With
  `Train.relay` switched off the overview reading was 0.19 off and the one back out 0.10 off; the close one
  happened to be 0.01 off. Looked at on the GPU in the town at radius 60 after the corner fix: the roads are whole
  and lie on the ground (`docs/images/lidar/ribbons-town-r60.jpg`). `ribbons-overview-2020.jpg` is from before it.
The cost of a relay is not small. Every call to `Ribbon.relay` loops every followed corner of its ribbon: the
road ribbon's 10,187 in the region, and each of the eight rail ribbons' (1,052 and 1,385 for the two seen to be
laid again in a fly-in to the town; the other six were not counted). When any corner moves, the whole ribbon's normals are recomputed
(`VertexData.ComputeNormals` over every one of the roads mesh's 16,496 vertices) and its position and normal
buffers re-uploaded. Six to seven batches were seen during one fly-in from the overview to the town and back,
bounded by the 15% hysteresis on a tile's step. Acceptable at
this size; a ribbon cut into per-tile meshes would make it proportional to the tiles redrawn, if it ever shows.
This is the seam decision 8 said was missing, built for ribbons and the train only.

**3. A hole that is watertight.** The coarse mesh gets points every 40m along the rim of the region and
drops its own points within 22m of it (the Gabriel condition), so every rim segment is an edge of the
Delaunay triangulation; triangles whose centroid lies inside are left out of the drawn index but kept in
`tris`, so land cover and trees still see them. The detail meshes' edge vertices take the straight-line
profile of those same rim points (`RimProfile`), so the two surfaces meet along the same lines. The
shipped check is `Terrain.seam()` (`llandeiloDebug.seam()`): it reads the real vertex buffers and compares
every detail vertex on the rim with the coarse mesh's rim line. At the overview, on the first build, it read 2,696
detail vertices and 450 base vertices with a largest gap of 0.0000038 world units and none unmatched;
the e2e test asks for more than 1,000 detail vertices, none unmatched and a gap under 0.001.

**4. Levels of detail by tile.** A tile is the unit of loading and of detail. Its mesh step is chosen by
the distance from the eye to the nearest point of the tile (`stepForDistance`: 4m under 320m, 10m under
850m, 20m beyond), with 15% hysteresis (`chooseStep`) so a wobble at a band edge does not rebuild it.
`DetailTerrain` builds or swaps meshes nearest first inside a 6ms-a-frame budget, at least one a frame, or
all at once at start-up (`settleDetail`); a tile's skirt hangs 6m from every edge so a neighbour
at another step leaves no gap. Meshes are flat-shaded and non-indexed (`tileGeometry`, pure and tested)
to keep the low-poly look. Tile meshes are shadow casters; their shadows refresh at most every 700ms.

**5. The mesh stops at 4m, the data does not.** The 2m data sets the ground height for everything that
stands on it and is what a later reconstruction will measure against. A 2m mesh costs 127,000 triangles
a tile; a first version that drew them built one in 0.4 to 2.5 seconds on this laptop (nearly all the GPU upload; 15MB of vertices) and hitched the camera, and a mesh of 4m is 32,000 triangles and about 15ms. A mesh step of 2m would be a one-line change to `LOD_STEPS` and
`BAND_EDGES` if a GPU is found to afford it.

**6. Colour by the same rules, in blocks.** The cover of the ground (wood, farm, meadow, moor, grass, rock)
and its colours come from the same functions as the coarse triangles' (`landcover.ts`, extracted from
`terrain.ts`): the same classifier, the same palette, the same season and snow. The inputs are scored per
10m block, not per triangle, so a tile's colours do not change when its step does; the blocks' ranks are
looked up in the coarse triangles' sorted scores, so the proportions match; the slope that scores them is
taken over 40m each way, or the covers dither at the edges; the random part of the score is shared across
40m. Repainting is sliced by the same budget, nearest tile first. Trees inside the region stand on the
block under them (`Terrain.coverAt`), not on the hidden coarse triangle, so a tree and the ground it stands on
agree.

**7. Data up front, meshes on demand.** The 3MB data file is fetched at start, with the other map data (as one file: 80 separate tile requests failed twice under load in the e2e run).
This is forced, not chosen: features, buildings and trees are placed once at start, and anything in the
region needs the ground to be placed. What streams is the geometry: a tile's mesh is built when the
camera nears it and swapped as it moves (`pending`, `builds`, `tileSteps` in `llandeiloDebug.detail()`).
Fetching a tile on demand is the next step when the region outgrows memory; `DetailGround` already takes
its tiles from a map by key.

**8. Base ground and period changes are separate** ([`src/domain/groundedit.ts`](../../src/domain/groundedit.ts)).
The base ground, Terrain 50 with the LiDAR, is never altered. A period's change is a `GroundEdit`: an id, a
`TimeRange`, an OS-grid area it may touch, a shape and a provenance, so an invented rampart says it is
invented like any other content. Two shapes exist, a `ridge` (a bank, or with a negative height a ditch or
a cutting, along a line) and a `level` (a platform at a set height, for a fort's interior); more join the
`EditShape` union and are laid over by the one function `editDelta`. `Terrain.setGroundEdits(active)`
checks each edit lies inside the region and 300m clear of its rim (`checkEdit`), lays them over the base
for everything that asks the height, and marks only the tiles under the edits' areas stale, which rebuild
under the same budget. Taking the edits off restores the base exactly (tested, e2e). **Nothing feeds it
yet:** wiring the edits to the timeline (`snapshotAt` filtering them by year, and the guess game's
same-scene rule treating a changed ground as a change of scene) is still to do. The Roman forts of issue 3
landed on main ([ADR 0046](0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md))
without using it: their ditches and banks are drawn as ribbons and parts laid on the base ground, so on
the LiDAR they follow the real ridge but do not reshape it.

**What an edit does and does not move.** `Terrain.setGroundEdits` changes the answer to `heightAt`,
`heightMetres`, `surfaceAt` and the drawn detail meshes, and the road and rail ribbons (both corners) and the train's
path, which are laid again on any redrawn tile (decision 2; the e2e edit test lays a 3m ridge across the
town and checks no ribbon sample is under the mesh, seen red with the re-laying off: 341 samples under).
Everything else placed once at start keeps the height it was given: building meshes, tree matrices (and the
cover filter that decides which trees show, which runs only when the environment changes), people,
labels, feature models and river levels. A `level` platform leaves the buildings on it floating. The review found this and the first wording ("laid over the base for
everything that asks the height") read as if it were finished. Making it so for the rest needs `Forest`, the
buildings, the people and the water to subscribe to `Terrain.onDrawnChange` as the ribbons do and re-place
what lies inside the edited areas; that is the first piece of work when an edit is first used. The e2e test checks the
detail mesh and the `heightMetres` answer move by exactly the edit's height, not a placed object.

**9. Rivers.** The water ribbons' levels are the lowest LiDAR ground near the line; the detail mesh is
cut to those levels across the channel and eased back up over a 20m bank (`RiverIndex.channelAt`,
`carveChannel`), as the coarse mesh's carved bank vertices do outside the region. The cut fades to nothing
at the rim.

## Consequences

- The town and forts have real ground: roads and rails follow the mesh drawn (vertex by vertex at the 4m
  step, checked by the e2e ribbon tests between vertices and as tiles change step), buildings sit on it, the Tywi has banks. At
  the overview the region is indistinguishable from before (no seam, measured above). Outside it the
  ground and its land cover are the same except that the coarse mesh gained 450 rim points and lost the
  points within 22m of the rim, so its triangle count went from 153,944 to 154,694 and the percentile
  ranks that decide cover in eras without the woodland map shifted by up to 0.14%: a few hundred of
  the triangles far from the region may change cover (about 0.2%, scattered; found by the review).
  The first version also moved **every tree on the map**, which the review measured (0 of 44,901 trees
  more than 500m outside the region kept their position): a tree's size, spin, offset, shade, conifer flag
  and autumn colours came from `hash2` of its triangle's index, and adding and dropping points renumbers
  the Delaunay triangles. A tree's identity now comes from where its triangle is (`treeSeed` in
  `src/domain/tree.ts`, from the rounded centroid), so an unchanged triangle keeps its tree whatever the
  triangulation does elsewhere, and a later widening of the region will not reshuffle the forest again.
  Measured against main on 2026-10-10 (a build of main's `ce58bbb` beside this branch, year 2020): all
  148,111 coarse triangles more than 500m outside the region have the same centroid in both, so each
  keeps its tree; the 277 triangles outside it that changed all lie within 103m of the region. The
  switch itself re-rolls every tree on the map once, because the traits now come from a different hash
  of a different key, so no tree stands where it did on main; the forest looks the same in kind and
  nothing refers to a single tree. `tests/tree-identity.test.ts` holds this: it triangulates a jittered
  point set with and without the rim (through `nearRim` and `RimProfile`, the code the terrain uses), and
  asserts the same tree, seed, position and traits for every triangle more than 500m outside the
  region, after checking that most of those triangles were renumbered. With the seed taken from the
  triangle's index it fails, with 14,584 trees changed. It tests the identity of a tree, not
  `triangulate` itself, which needs the heightfield and Babylon.
- Cost, measured on the RTX 2000 Ada laptop GPU through WSL, 1920x1080, uncapped, in `?debug`: `node tools/frames.mjs <url> <dir> --perf --uncapped`, the town at 400m from the camera in 2020: idle 110 to 124fps against 139 to 175 before, orbiting 66 to 69 against 68 to 81, the slider scrub 41 to 47 against 58 to 77, with about 290,000 more triangles drawn (13 tiles at 10m, 4 at 4m, 63 at 20m). At the 1903 overview idle was 92 to 129 against 164 to 171. The laptop was shared with other agents' test runs (load average 15 to 18), so a figure moves by a third between runs: read it as about a quarter less when idle and about the same orbiting. With vsync on both hold 60.
  Start-up fetches two more files (the 2.95MB data file and the manifest) and builds and paints 80 meshes: from the page loading to ready took 12.9 to 13.1s against 11.5 to 14.7s before, within the noise of that load; settling all 80 tiles at start was 1.7 to 2.3s of it.
- The detail mesh is flat at 4m: the fort's banks (a metre or so high and a few metres wide) show as
  slight ridges, not as crisp earthworks. A 2m mesh, or a terrain shader, is the way to more.
- The height asked of the ground (`heightAt`, from the 2m data) is not the height of the mesh drawn, which
  is triangulated at 4, 10 or 20m. The review compared them over all 21 tiles at 2m: at a 20m step the
  mean gap is 0.18m, the 99th percentile 1.5m and the worst 7.5m; at 10m the 99th percentile is 0.8m and
  the worst 6.7m; at 4m the 99th percentile is 0.29m. In real metres; drawn heights are 2.4 times larger.
  So buildings and trees placed once on the 2m heights can float or sink a little where the tile is drawn
  coarse, which is at overview distance, where it does not show. The coarse tiles are the ones seen from
  far away, so this is accepted for buildings and trees (road and rail ribbons are the exception: they
  follow the mesh, decision 2); snapping placement to the coarsest step a tile can be drawn at would be
  the fix if it ever shows.
- The DTM keeps some tree clumps and walls. They are what the LiDAR measured; none is removed.
- The vertical datum and accuracy are not stated by the publisher; Terrain 50 is the only check.
- Ground edits are built and tested but empty, and consumers placed at start do not follow them (decision 8).
- Block colours are 10m squares: where two covers meet the edge is a stair step at 4m facets. Smaller
  blocks or per-triangle scoring would smooth it, at four times the repaint.

## Amendment, 2026-10-16: a third area, Dinefwr Castle

- **Decided by.** Dewi agreed the work (GitHub issue 4: "Detailed terrain for the Dinefwr Castle area like the fort
  area's"; agreed 2026-10-16, decision log: "post both", after reviewing the drafts, and the todo item
  "Dinefwr Castle at 2m LiDAR"). The area's centre and size are Claude's, under the proactive mandate
  ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), so Dewi can overrule them.
- **What changed.** One entry in `tools/terrain/lidar-areas.json`: `dinefwr-castle`, centred on Coflein's grid
  reference for Dinefwr Castle (NPRN 425, SN 61150 21731 = E 261150 N 221731), half-size 500m (E 260650 to 261650,
  N 221231 to 222231), and a rerun of `build-lidar.py`. No code changed: this is the "a new area is a line and a
  rerun" this ADR was written to allow. The region is unchanged (the area is 650m or more inside its edges, the
  blend margin being 300m), so no tile had to be downloaded: all 25 source rasters were already on disk.
- **Why Coflein's reference, and why 500m.** Reasons and the 18.5m gap to the keep's centre in the Dinefwr research
  on another branch are in [`docs/data/lidar.md`](../data/lidar.md#the-castle-area-2026-10-16). In short: Coflein's is
  the place reference in this repository (the `dinefwr` place is 5.4m from it), and 500m is the forts' size and
  covers the crag, the escarpment and the first part of the ridge. The size is a judgement, not a measured need.
- **Result.** 29 tiles at 2m instead of 21 (8 new, each 126,002 bytes against 5,202 at 10m); `lidar.bin` 2,952,960
  to 3,919,360 bytes (+966,400; gzipped +565,155), fetched at start with the other map data. The other 72 tiles are
  byte for byte the same. `Terrain.seam()` at the castle view: 450 base and 3,221 detail vertices, largest gap
  0.0000038 world units, none unmatched.
- **Cost, measured** with `node tools/frames.mjs` (WebGL on the RTX 2000 Ada laptop GPU through WSL, 1920x1080,
  `--perf --uncapped`, `?place=dinefwr&radius=40` so the camera is 400m out, 2020, summer noon), three runs of each
  with the data file swapped under the same build, alternating, the laptop shared with other agents (load average 7
  to 10, so a figure moves by a third between runs). Idle 126, 108, 96fps before against 120, 84, 78 after; orbiting
  92.5, 73.5, 59.8 against 50.0, 60.8, 43.0; scrubbing 67.6, 72.8, 51.1 against 94.0, 66.4, 39.9. Read as about a
  quarter less when idle or orbiting at the castle, as for the town ([above](#consequences)), and no difference
  that can be told from the noise when scrubbing. Start-up (`tools/shot.mjs`, page load to ready): 8.5 to 9.6s
  before, 6.9 to 10.3s after, within the noise. The main script chunk is unchanged (same file hash, 544,938 bytes
  gzipped at this commit), because the tiles are data, not code.
- **What the finer ground showed.** Looked at on the GPU at 120m, 250m, 600m and 2km: the crag and its slopes are
  4m facets instead of 10m ones near the camera, and the difference is slight from far off (almost every tile is
  drawn at 20m beyond a kilometre and a half). It also exposed that the castle model stands on one flat floor while
  the ground in its yard rises into a knoll that comes up through it. That was already true at 10m, and is
  more irregular at 4m. It is about how the model is seated (the same family as the buildings sinking on the
  forts' slope, issue 3), not the terrain, and is not changed here; it is on the todo list.
- **Tests.** `tests/lidar.test.ts` now checks the castle area exists, holds the `dinefwr` place, is centred on
  Coflein's reference, and holds the keep's centre and 300m each way (seen failing first at "dinefwr-castle:
  expected undefined to be defined"). The existing tests check the new tiles against Terrain 50, the shared edges,
  the 300m margin to the region's edge and that every tile an area touches is at 2m.

## Alternatives considered

- **LiDAR everywhere.** 48MB for a 5km by 4km region alone; the circle is 32km across.
- **A single regular heightmap mesh, or a terrain shader** (heightmap in a texture, displaced on the GPU).
  Would give smooth transitions and cheap detail, and is on the todo list as a way to smooth scrubbing,
  but replaces the flat-shaded look and the CPU-side height lookups everything uses.
- **Hiding the coarse mesh under the detail with a discard in a material plugin.** Needs the same shader
  twice (GLSL and WGSL, as the halos do) for something geometry does exactly; the Gabriel hole needs
  neither.
- **Blending heights across a band instead of cutting a hole.** Leaves two surfaces drawn in the band, one
  poking through the other wherever they differ.
- **Shared-vertex meshes with smooth normals.** A third of the vertices, but not the faceted look.
- **Fetching tiles lazily now.** The ground must exist before the features are placed (decision 7).
- **A 2m mesh.** See decision 5.
- **Writing a period's earthworks into the tiles.** Loses the base; every later edit would rebuild the
  tiles, and "what is the ground without the Roman fort" could no longer be answered.

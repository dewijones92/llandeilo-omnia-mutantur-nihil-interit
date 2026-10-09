---
title: "ADR 0049: LiDAR terrain in tiles, blended into Terrain 50, with period changes kept apart"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0049: LiDAR terrain in tiles, blended into Terrain 50, with period changes kept apart

- **Status:** Accepted, extends [ADR 0009](0009-terrain-os-terrain50-low-poly.md)
- **Date:** 2026-10-09; amended 2026-10-10 (the review's findings, and the merge with main, which took ADRs
  0041 to 0048: this was 0041 on its branch, became 0048 at the first merge, and 0049 when the GPU kit took 0048)
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
line in `lidar-areas.json` and a rerun.

**2. One ground, one seam.** `Terrain` ([`src/world/terrain.ts`](../../src/world/terrain.ts)) answers
"how high is the ground here" for everything: OS Terrain 50 outside the region, and inside it the LiDAR,
eased in from the rim over 300m (`DetailGround.metresAt`, `rimWeight`), with river channels carved
(`carveChannel`) and the period's ground edits laid over (below). Buildings, trees, features, labels,
roads, people and rivers all ask it (`heightAt`, `surfaceAt`, `inDetail`); the trees that stood on
triangle centroids use it inside the region. No place or era has its own path.

A ribbon laid along a line (a road, a railway section, the train's path, a fort's ditch or road) takes the
ground's height only at its vertices and runs straight between them, so over OS road legs hundreds of
metres long it cut through the 2m ground (found by the review: 10 of 162 road legs in the region had
ground above them, the worst by 3.7m over a 551m leg). `Terrain.lineOnGround` therefore adds a point
every 4m, the finest mesh step, to any line inside the region (`densifyWhere`, in the one polyline
helper of [ADR 0043](0043-one-polyline-helper.md)), and the fort ribbons use the same step. Outside the
region lines are as before. Street lamps are points, each standing on the ground at its own place, so
they need nothing. Between the 4m points the ribbon can still differ from the drawn mesh, which is
triangulated its own way, by the 0.3m or so the check below allows for.

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
`heightMetres`, `surfaceAt` and the drawn detail meshes, and nothing else. Everything placed once at start
keeps the height it was given: building meshes, road and rail ribbons, tree matrices (and the cover filter
that decides which trees show, which runs only when the environment changes), people, labels, feature
models and river levels. A 3m rampart edit under a road leaves the road buried, and a `level` platform
leaves the buildings on it floating. The review found this and the first wording ("laid over the base for
everything that asks the height") read as if it were finished. Making it so needs `Terrain` to publish a
change, and the features layer, `Forest` and the water to subscribe and re-place what lies inside the
edited areas; that is the first piece of work when an edit is first used. The e2e test checks the
detail mesh and the `heightMetres` answer move by exactly the edit's height, not a placed object.

**9. Rivers.** The water ribbons' levels are the lowest LiDAR ground near the line; the detail mesh is
cut to those levels across the channel and eased back up over a 20m bank (`RiverIndex.channelAt`,
`carveChannel`), as the coarse mesh's carved bank vertices do outside the region. The cut fades to nothing
at the rim.

## Consequences

- The town and forts have real ground: roads follow it (vertex by vertex at the 4m step, checked between
  vertices by the e2e road test), buildings sit on it, the Tywi has banks. At
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
  nothing refers to a single tree.
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
  far away, so this is accepted; snapping placement to the coarsest step a tile can be drawn at would be
  the fix if it ever shows.
- The DTM keeps some tree clumps and walls. They are what the LiDAR measured; none is removed.
- The vertical datum and accuracy are not stated by the publisher; Terrain 50 is the only check.
- Ground edits are built and tested but empty, and consumers placed at start do not follow them (decision 8).
- Block colours are 10m squares: where two covers meet the edge is a stair step at 4m facets. Smaller
  blocks or per-triangle scoring would smooth it, at four times the repaint.

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

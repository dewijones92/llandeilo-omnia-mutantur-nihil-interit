---
title: "ADR 0048: LiDAR terrain in tiles, blended into Terrain 50, with period changes kept apart"
kind: adr
status: accepted
updated: 2026-10-09
---

# ADR 0048: LiDAR terrain in tiles, blended into Terrain 50, with period changes kept apart

- **Status:** Accepted, extends [ADR 0009](0009-terrain-os-terrain50-low-poly.md)
- **Date:** 2026-10-09
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
same-scene rule treating a changed ground as a change of scene) belongs with the Roman fort work (issue
3), which is their first user.

**9. Rivers.** The water ribbons' levels are the lowest LiDAR ground near the line; the detail mesh is
cut to those levels across the channel and eased back up over a 20m bank (`RiverIndex.channelAt`,
`carveChannel`), as the coarse mesh's carved bank vertices do outside the region. The cut fades to nothing
at the rim.

## Consequences

- The town and forts have real ground: roads follow it, buildings sit on it, the Tywi has banks. At
  the overview the region is indistinguishable from before (no seam, measured above). Outside it the
  ground and its land cover are the same except that the coarse mesh gained 450 rim points and lost the
  points within 22m of the rim, so its triangle count went from 153,944 to 154,694 and the percentile
  ranks that decide cover in eras without the woodland map shifted by up to 0.14%: a few hundred of
  the triangles far from the region may change cover (about 0.2%, scattered; found by the review).
- Cost, measured on the RTX 2000 Ada laptop GPU through WSL, 1920x1080, uncapped, in `?debug`: `node tools/frames.mjs <url> <dir> --perf --uncapped`, the town at 400m from the camera in 2020: idle 110 to 124fps against 139 to 175 before, orbiting 66 to 69 against 68 to 81, the slider scrub 41 to 47 against 58 to 77, with about 290,000 more triangles drawn (13 tiles at 10m, 4 at 4m, 63 at 20m). At the 1903 overview idle was 92 to 129 against 164 to 171. The laptop was shared with other agents' test runs (load average 15 to 18), so a figure moves by a third between runs: read it as about a quarter less when idle and about the same orbiting. With vsync on both hold 60.
  Start-up fetches two more files (the 2.95MB data file and the manifest) and builds and paints 80 meshes: from the page loading to ready took 12.9 to 13.1s against 11.5 to 14.7s before, within the noise of that load; settling all 80 tiles at start was 1.7 to 2.3s of it.
- The detail mesh is flat at 4m: the fort's banks (a metre or so high and a few metres wide) show as
  slight ridges, not as crisp earthworks. A 2m mesh, or a terrain shader, is the way to more.
- The DTM keeps some tree clumps and walls. They are what the LiDAR measured; none is removed.
- The vertical datum and accuracy are not stated by the publisher; Terrain 50 is the only check.
- Ground edits are built and tested but empty; the data to feed them comes with issue 3.
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

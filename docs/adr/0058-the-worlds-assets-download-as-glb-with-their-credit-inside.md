---
title: "ADR 0058: The world's assets download as .glb, with their credit and licence inside the file"
kind: adr
status: accepted
updated: 2026-10-16
---

# ADR 0058: The world's assets download as .glb, with their credit and licence inside the file

- **Status:** Accepted (Dewi's decision and format; the design Claude's, under the proactive mandate, [ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md))
- **Date:** 2026-10-16
- **Amended:** 2026-10-16, later the same day, on Dewi's decision that the terrain is "2m, as a release asset": decisions 1, 2, 4, 5, 6, 9 and 10 and the Consequences changed; the 4m committed set and its 10MB cap are gone

## Context

GitHub issue #4 asked for the terrain round Dinefwr Castle to be exportable for SketchUp, so that outside
models could be tried on it. Dewi's decisions, 2026-10-16: outside models do not come into the app ("we
build the models ourselves using blender"); instead "we will offer a way to download assets from the
world", and "just offer it as glb - so we dont have to convert - its an open format that can be used in
any programs". The landmark models and the train already are .glb; the terrain is only in the app's own
binary tiles (`public/data/lidar/lidar.bin`, uint16 centimetres), and no file in the repo says, inside
itself, who made it or under what licence.

## Decision

1. **A Downloads tab in the app's side panel** (`src/ui/downloads.ts`, the fourth tab of `InfoPanel`
   beside Almanac, Language and About), reached from a button at the top of About's credits and from the
   tab strip, with arrow-key navigation over all four. It lists every file with its name, what it shows,
   its period, its size, its credit and licence, and a link with the `download` attribute. A landmark
   model is labelled by its parts' tiers (decision 8), the train by its own ⓘ, a terrain tile by neither. All text is in the string table or the content files in English and
   Welsh. The list is built when the tab is first shown, and a failure there shows an error line and logs
   `dewidebug downloads list failed`, so a gap in the data costs the tab, not the app (amended).

2. **One list, no second one.** `src/content/downloads.ts` builds the list from the landmark index
   (`generated/models.ts`), a generated index of the landmarks' part tiers and the train
   (`generated/downloads.ts`), the terrain tool's manifest (`generated/terrain-tiles.ts`), the features (name, dates, provenance) and the asset manifest
   (`src/content/assets.ts`, whose `assetFor(file)` is the one lookup). A file with no manifest record
   throws; a glb in `public/models` that holds geometry and is not listed fails a test, so a new model
   cannot be forgotten. Sizes are in the generated indexes and tests check them against the files (the
   terrain's against a fresh build, as the files themselves are not in the repo).

3. **Each glb carries its credit and licence in its own `asset` block** (`copyright` and
   `extras`, from the manifest, by `tools/downloads/stamp.ts`), and again in its first scene's extras
   (`credit`, `licence`, `licenceUrl`, `sourceUrl`), which is where Blender's importer looks. The geometry, the scene and every part's
   tier and sources are untouched (checked byte for byte for the binary chunk of two files). The LiDAR's
   attribution is the manifest's text, which starts with the exact `LIDAR_CREDIT` sentence.

4. **The detailed terrain is built by a tool, at the full 2m, for release** (`tools/terrain/export-glb.ts`,
   `npm run terrain-glb -- <outdir>`): one .glb per detailed tile (the 29 held at 2m across the town, the
   Roman forts and Dinefwr Castle), from the same `lidar.bin` the app reads, every stored sample kept
   (250 by 250 cells, 125,000 triangles, uint16 indices, about 1.5MB a tile, 43.8MB the set), cut into
   triangles by the same rule as the app (the flatter diagonal; the rule is exported from `tilemesh.ts`
   and `gridMesh` is tested against the app's own `tileGeometry`), with the LiDAR's own heights: no
   blending into Terrain 50, no river channels, no period earthworks. Axes are glTF's, in real metres. Each
   tile's mesh starts at its own south-west corner, and its node's translation is its offset from the
   region's south-west corner (E 260000 N 220500), so every tile opened together lands in place and
   neighbours meet exactly (they share edge vertices; a test compares the edge heights). The British
   National Grid origin of the tile is in the node's extras (`tileOriginBng`, and what it means), in the
   scene's extras (`sceneOriginBng`, the CRS EPSG:27700, the axes) and in the list. The vertical datum note
   is the one `lidar.md` already gives (not stated by the source; agrees with OS Terrain 50 to about 0.2m).
   The build is deterministic (no timestamps), and a test builds it twice and compares hashes.

5. **Published as release assets, not committed (Dewi, 2026-10-16: "2m, as a release asset").** The first
   version committed the 21 tiles at 4m (8.0MB) under a 10MB test; adding Dinefwr Castle's 2m area would
   have made that about 11.0MB, and the choices were to raise the cap, publish the terrain as a release
   asset, or publish 2m as well. Dewi chose the full 2m as a release asset, so the repository does not
   grow: the committed 4m glbs and the cap are removed. At each release the tool's output is attached
   (`gh release create ... <files>`, [`releases.md`](../process/releases.md)); every terrain link in the
   app is `https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/releases/latest/download/lidar-<e>-<n>.glb`.
   The tool also writes the manifest the list is built from, `src/content/generated/terrain-tiles.ts`
   (each tile's asset name, size, triangles, heights, areas and sha256), which is committed, so the list
   shows each tile's size and credit with no file in the repo; a test rebuilds the tiles and checks every
   size and hash against it. Consequence: until a release carries the files, the links 404; the Terrain note
   says the tiles are attached to each release on GitHub, not kept in the app. The models stay committed,
   as before.

6. **Not listed:** a level with no triangles. The vicus has no far model (its houses are all detail), and
   its far glb is an empty model: a few hundred bytes of header, scene and credit, with no geometry.

7. **The stamp is a second pass, not part of the Blender finishing step.** `tools/models/build.ts`,
   `glb.ts` and `sheets.ts` are hashed into every model's `inputHash` (ADR 0053), so editing them would
   have marked every model stale and forced a Blender rebuild of all three. `npm run downloads` stamps the
   landmarks, the train and the terrain afterwards, then runs `npm run models` once more so the models
   index records the new sizes. A model rebuilt by `npm run models` loses its stamp until `npm run
   downloads` is run, and the tests say so.

8. **A landmark model is labelled by its parts, not by its site (review, 2026-10-16).** The feature's
   provenance is how well the *site* is known (Fort 1 and Fort 2 are documented; the vicus is
   reconstructed), while the parts inside the glb are 41 reconstructed, 4 imagined and 2 documented in
   Fort 1 near, 42 / 8 / 0 in Fort 2 near, and 16 of 16 imagined in the vicus. A downloader who sees a green
   "Documented" badge on a model takes its shape as attested, so a landmark row has no site badge: it shows
   the count of its parts in each tier (`LANDMARK_TIERS`, counted from the glb's own part extras by
   `npm run downloads`), and a test compares the row with the file. The train is one reconstructed model
   and keeps its ⓘ. The Models note says a fort's site can be better documented than its drawing.

9. **A model says how to be placed on the terrain, inside the file.** A landmark's origin is its anchor
   and its y is not tied to any ground (the app fits each part when it loads, ADR 0053), while a terrain
   tile's origin is the region's south-west corner (E 260000, N 220500) with absolute heights, so opened
   together a fort would land kilometres away. The stamp adds `placement` to each landmark's asset extras:
   the anchor on the grid, the anchor's place in the terrain scene (`e - 260000, ground, -(n - 220500)`),
   the ground height there (`groundAtAnchorMetres`, the LiDAR's own bilinear height at the anchor from the
   finest tile that holds it, the same data the terrain export uses: 76.1m for Fort 1, 76.77m for Fort 2,
   72.32m for the vicus), and a sentence saying that over sloping ground the parts do not all stand on the
   tiles and each should be dropped onto the ground in use. The first version left y at 0, 76m under the
   tiles' ground. The credit, licence and placement are repeated in the glb's first scene's extras, because
   Blender's importer keeps a scene's extras and ignores the asset block's. It is the second pass's job
   (`modelPlacement` and `stampAsset` in `tools/downloads/stamp.ts`).

10. **The models carry shape and vertex colours, not the app's materials or textures.** Since ADR 0055 a
    glb has no materials and no textures; each primitive has a `COLOR_0` vertex colour (one palette colour per
    face, whose alpha value is an internal code for the surface's grain, not transparency), and each part
    names its surfaces in its extras. The Models note says so, and that a part's sources are ids, which the
    project's research notes explain, not citations. A test checks every model glb for `COLOR_0` and for
    no textures, images or materials, and the note for the words. (The first version said "no colours".)

11. **The OGL's own text is linked from the LiDAR records.** `AssetRecord` has an optional `licenceUrl`
    (the National Archives' Open Government Licence v3.0 page for the two LiDAR records), stamped into the
    asset and scene extras of each tile and linked beside the source page in a row's credit.

## Consequences

- The SketchUp use that issue #4's author described works with a standard format and no conversion:
  Blender, SketchUp, game engines and viewers open the files; the credit and the licence travel with them.
  Dewi's decisions were the scope and the glb format.
- `buildDownloads` throws on a gap (a model with no manifest record, a terrain area with no name). It
  first ran when the app started, so a gap would have stopped the app; it now runs when the tab is first
  shown, inside a `try`, and the tab shows an error line (an end-to-end test takes an area's name out of the
  bundle and checks the app stays ready and the other tabs work). The unit tests still catch every such gap
  before a deploy.
- Adding a model to `MODELLED` (Dinefwr, say) rebuilds into the list after `npm run downloads`, and an area
  to `lidar-areas.json` after `npm run terrain-glb -- <outdir>` (and a release that attaches the new tiles); a model or area with no name fails a test rather than being
  skipped. `TERRAIN_AREA_NAMES` is the one table that needs a line (English and Welsh).
- The licence column shows the manifest's text. For our own models that is "Original work of this
  project", which is not a licence: the repository's `package.json` says MIT and nothing else states a
  reuse licence for the models. That is Dewi's to settle; the code does not invent one.
- The terrain is the 2m the app stores; the survey is 1m, so the Terrain note says the files are still
  coarser than the survey and that a Roman fort's 2 to 3m ditches are a sample or two across. The tiles
  are today's ground only; the page says so.
- Run `npm run downloads` after `npm run models` and after rebuilding the train. Run `npm run terrain-glb --
  <outdir>` after rebuilding the LiDAR tiles or changing an area, commit the manifest it writes, and attach
  the files to the release (`gh release create v<version> ... <outdir>/*.glb`). The tools need `--experimental-transform-types` because the app's `lidar.ts` uses
  parameter properties, which Node's type stripping refuses; the npm script passes it.
- Binary glbs change (a credit and placement block of about 1.7KB each), so a branch that rebuilds
  or edits them will conflict; resolve by taking its geometry and running `npm run downloads`.

## Alternatives considered

- **The full 2m tiles committed.** 43.8MB (22.0MB as a gzipped tar) added to a public repo's history for
  ever. Rejected.
- **The tiles committed at 4m (8.0MB for 21, about 11.0MB for 29) under a size cap.** The first version.
  Halves what issue #4's reply promised, and needed a cap raised or dropped as areas were added; replaced
  by the release assets on Dewi's decision.
- **The full set built at release time into a GitHub release asset and linked.** Chosen (decision 5). Its
  cost is that the links 404 until a release carries the files, and that the files are not in the repo,
  so the manifest's hashes are the check.
- **Putting the stamp into `tools/models/build.ts`'s finishing step.** The natural seam, and the better
  one for future models, but it changes the hash of every model and forces a full Blender rebuild and a
  merge conflict on every binary; the second pass costs one command and a test.
- **A second list of downloads.** Breaks the DRY law; the manifest, the features and the generated indexes
  already hold everything.
- **Other formats (SketchUp .skp, OBJ, GeoTIFF).** Dewi: "just offer it as glb". Glb is open and
  needs no converter on our side.
- **KHR_draco or meshopt compression.** Smaller, but it needs a decoder in every importer, which defeats
  "can be used in any programs".
- **Normals in the terrain files.** Left out: they would add half as much again (a third of the file); a viewer shades the faces flat,
  as the app does.
- **A toolbar button for Downloads.** The row of buttons is already full; the tab is reached from About and
  from the tab strip.

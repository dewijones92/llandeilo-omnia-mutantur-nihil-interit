---
title: "ADR 0058: The world's assets download as .glb, with their credit and licence inside the file"
kind: adr
status: accepted
updated: 2026-10-16
---

# ADR 0058: The world's assets download as .glb, with their credit and licence inside the file

- **Status:** Accepted (Dewi's decision and format; the design Claude's, under the proactive mandate, [ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md))
- **Date:** 2026-10-16

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
   Welsh.

2. **One list, no second one.** `src/content/downloads.ts` builds the list from the landmark index
   (`generated/models.ts`), a generated index of the train and the terrain tiles
   (`generated/downloads.ts`), the features (name, dates, provenance) and the asset manifest
   (`src/content/assets.ts`, whose `assetFor(file)` is the one lookup). A file with no manifest record
   throws; a glb in `public/models` that holds geometry and is not listed fails a test, so a new model
   cannot be forgotten. Sizes are in the generated index and a test checks them against the files.

3. **Each glb carries its credit and licence in its own `asset` block** (`copyright` and
   `extras`, from the manifest, by `tools/downloads/stamp.ts`). The geometry, the scene and every part's
   tier and sources are untouched (checked byte for byte for the binary chunk of two files). The LiDAR's
   attribution is the manifest's text, which starts with the exact `LIDAR_CREDIT` sentence.

4. **The detailed terrain is exported once, by a tool** (`tools/terrain/export-glb.ts`,
   `npm run downloads`): one .glb per detailed tile (the 21 tiles held at 2m), from the same
   `lidar.bin` the app reads, cut into triangles by the same rule as the app (the flatter diagonal; the
   rule is now exported from `tilemesh.ts` and `gridMesh` is tested against the app's own
   `tileGeometry`), with the LiDAR's own heights: no blending into Terrain 50, no river channels, no
   period earthworks. Axes are glTF's, in real metres. Each tile's mesh starts at its own south-west
   corner, and its node's translation is its offset from the region's south-west corner
   (E 260000 N 220500), so every tile opened together lands in place and neighbours meet exactly (they
   share edge vertices; a test compares the edge heights). The British National Grid origin of the tile
   is in the node's extras (`tileOriginBng`, and what it means), in the scene's extras (`sceneOriginBng`,
   the CRS EPSG:27700, the axes) and in the list. The vertical datum note is the one `lidar.md` already
   gives (not stated by the source; agrees with OS Terrain 50 to about 0.2m).

5. **Committed, at 4m.** The step is the app's own near mesh (ADR 0049) and the whole set is 7,990,828
   bytes (21 tiles of about 380,536 bytes, 31,250 triangles each; 3.8MB as a gzipped tar), against
   31,679,364 bytes (16MB compressed) at the full 2m. The rest of `public/` is 19MB, so the committed set
   adds about 40% rather than about 165%, and a test holds it under 10MB. The full-resolution set is one
   command away (`node --experimental-transform-types tools/terrain/export-glb.ts --step 2 --out <dir>`),
   and is **not** published: building it into a GitHub release asset at release time would be the route
   if it is wanted; it was not done because nothing here may publish.

   **Open, and Dewi's (2026-10-16 review):** the Dinefwr Castle 2m area on the castle LiDAR branch
   (`worktree-wf_18a614f9-03d-2`) takes the detailed tiles from 21 to 29 (9 in the new area, one shared with
   the forts), so the 4m set becomes about 11.0MB and the 10MB test fails on merge, on purpose. The choices:
   raise the cap to about 11MB and commit them; or keep the cap and publish the terrain as a GitHub release
   asset instead; or also publish the 2m set (about 31.7MB plus the new tiles) as a release asset beside the
   committed 4m. Issue #4 asked for terrain "in the same format as the high res terrain", and the reply
   promised the detailed tiles, so 4m is a halving of what was offered: the Terrain note now says the
   files are coarser than the survey. `TERRAIN_AREA_NAMES` already holds the castle area's name.

6. **Not listed:** a level with no triangles. The vicus has no far model (its houses are all detail), and
   its far glb is 528 bytes of nothing.

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
   the anchor on the grid, the anchor's place in the terrain scene (`e - 260000, 0, -(n - 220500)`), and
   a sentence saying to drop each part onto the ground in use. It is the second pass's job
   (`modelPlacement` in `tools/downloads/stamp.ts`).

10. **The models carry shape, not colour.** Since ADR 0055 a glb keeps no materials (the app supplies them);
    each part names its surfaces in its extras. The Models note says so, and that a part's sources are ids,
    which the project's research notes explain, not citations.

## Consequences

- The SketchUp use that issue #4's author described works with a standard format and no conversion:
  Blender, SketchUp, game engines and viewers open the files; the credit and the licence travel with them.
  Dewi's decisions were the scope and the glb format.
- `buildDownloads` runs when the app starts (`src/main.ts`) and throws on a gap (a model with no manifest
  record, a terrain area with no name), so such a gap would stop the app, not only the tab. The unit tests
  catch every such gap before a deploy, which is the reason it was left eager.
- Adding a model to `MODELLED` (Dinefwr, say) or an area to `lidar-areas.json` and rebuilding adds it to
  the list after `npm run downloads`; a model or area with no name fails a test rather than being
  skipped. `TERRAIN_AREA_NAMES` is the one table that needs a line (English and Welsh).
- The licence column shows the manifest's text. For our own models that is "Original work of this
  project", which is not a licence: the repository's `package.json` says MIT and nothing else states a
  reuse licence for the models. That is Dewi's to settle; the code does not invent one.
- The terrain at 4m loses what 2m shows (a Roman ditch is 2 to 3m wide), though it is what the app
  draws near. The tiles are today's ground only; the page says so.
- Run `npm run downloads` after `npm run models`, after rebuilding the train, and after rebuilding the
  LiDAR tiles. The tool needs `--experimental-transform-types` because the app's `lidar.ts` uses
  parameter properties, which Node's type stripping refuses; the npm script passes it.
- Binary glbs change in this commit (a credit block of about 490 bytes each), so a branch that rebuilds
  or edits them will conflict; resolve by taking its geometry and running `npm run downloads`.

## Alternatives considered

- **The full 2m tiles committed.** 31.7MB (16MB compressed) added to a public repo's history for ever,
  for a resolution the app does not draw. Kept as an option, not the default.
- **The full set built at release time into a GitHub release asset and linked.** Right if 2m is wanted;
  rejected for now because it needs a published release this work cannot make, and a link to a file that
  does not exist yet.
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

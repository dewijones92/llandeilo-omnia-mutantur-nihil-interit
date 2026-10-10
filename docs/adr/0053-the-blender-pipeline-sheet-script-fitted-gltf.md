---
title: "ADR 0053: The Blender pipeline: a build sheet from the plan, a headless script, glTF fitted to the drawn ground"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0053: The Blender pipeline: a build sheet from the plan, a headless script, glTF fitted to the drawn ground

- **Status:** Accepted. Phase 1, built for the Roman forts. It is the pipeline ADR that
  [ADR 0052](0052-landmarks-are-scripted-blender-models-built-from-their-plans.md) said would follow, and it
  amends [ADR 0047](0047-detailed-monuments-have-a-far-and-a-near-mesh.md): a modelled monument's far and near
  meshes come from Blender above Low graphics.
- **Date:** 2026-10-10
- **Decided by:** Dewi made the decision this carries out (ADR 0052, 2026-10-10: "Make all important as stuff in
  blender maybe? Or?", choosing "Scripted Blender models"). The pipeline's design below is Claude's, under the
  proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), following
  [`design/blender-models.md`](../design/blender-models.md) with the changes that note's "What was built"
  section lists. Dewi can overrule any of it.

## Context

ADR 0052 makes the important landmarks Blender models, built by a script from their typed plans, with the plan
as the one source of facts and every part keeping its ⓘ. The forts' plans
([ADR 0046](0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)) already give
every part an id and a tier, so they are the pilot. The questions left were how facts get from TypeScript to
Blender without a second copy, how a model sits on a ground that changes (the LiDAR tiles of
[ADR 0049](0049-lidar-terrain-tiles-blended-into-terrain-50.md) landed the day before), what is committed, and
how a model is checked against its plan.

## Decision

1. **TypeScript decides, Blender dresses.** `src/domain/buildsheet.ts` (pure, under the coverage floor) turns a
   plan into a JSON build sheet: every standing part with its id, tier, source ids, `detail` flag, kits and
   material, and its shape resolved to metres east and north of the feature's grid reference (EPSG:27700),
   with everything the procedural builder works out at draw time worked out here instead (roof overhangs and
   rises, footings, a raised floor's skirt, a leaf's hinge turned by the plan's angle). It also carries the
   one palette (`src/domain/materials.ts`, which `world/buildings.ts` now reads too), the setting's scale,
   the kits' measurements and a probe point. The Python script holds no history: every number it uses is in
   the sheet, and a kit it does not know stops the build.
2. **Detail that claims something is a kit.** `src/content/kits.ts` is the catalogue: each kit has a name in
   both languages, its own provenance and its measurements, typed per kit (`KitParamNames`), so a missing
   or extra measurement is a compile error. A part asks for kits in its plan (`PartMeta.kits`), and the model
   draws only those. The forts' nine kits are reconstructed or imagined, never documented: the six-post and
   four-post timber towers (post size from Fort 1's post-pipes, the boarded stage from Jay Lane), turf courses
   on the rampart, posts and boards on the breastwork, a planked walkway, ledged gate leaves, a timber frame with
   daub panels, shingle and thatch roofs. What claims nothing (bevelled edges on squared timbers, a small
   seeded variation in colour, the darkening towards a part's foot the procedural builder also gives) needs no
   source, and every part's ⓘ that has kits says "Bevelled edges and shading are rendering, not evidence."
3. **One headless script per landmark.** `npm run models` (`tools/models/build.ts`) writes the sheets to
   `build/models/`, runs `blender -b --factory-startup -P tools/models/build_landmark.py` once per landmark,
   finishes each file and writes the index `src/content/generated/models.ts`. It rebuilds only what is stale
   (`--force` for all). The script refuses any Blender but 4.0 unless told otherwise. It makes one `.blend` per
   landmark (`build/models/roman-forts.blend`): collections `landmark:` › `phase:` › level › part group, the
   same tree as parent empties (glTF has no collections), object names that are part ids (the far copies
   suffixed `@far`), and a `part` custom property on each, so a hand rename cannot lose the link. A hinged
   leaf's origin is on its hinge post, turned as drawn. The near and far levels are separate builds, the far
   with no kits and no bevels, never a decimated near.
4. **Finishing needs no new dependency.** The finisher reads and writes the glb container itself
   (`tools/models/glb.ts`): it writes each part's extras from the sheet (id, tier, sources, detail, kits, how
   it meets the ground, the hinge), checks the probe and that every part is there once, and stamps the scene
   with the feature, level, anchor, setting, Blender version and an input hash. The files carry no normals
   (the app computes flat ones) and are not compressed: the forts come within budget without it, so
   `gltf-transform` and `meshoptimizer` were not installed. A landmark that needs compression asks Dewi for
   those dependencies first.
5. **A model is fitted to the ground the app draws, when it loads.** The sheet holds no ground. Each part says
   how it meets the ground: `follow` (a rampart, a breastwork: each vertex goes onto the drawn surface below
   it) or `rigid` (a tower, a hall: it stands on the surface at its own point, and only its footings, 1.5m
   below, reach down to the surface beneath them). The loader uses the same ground function `buildPlan`
   uses. So a model sits on Terrain 50 or on the LiDAR exactly as its procedural fallback does, and a change to
   the terrain needs no rebuild. Ditches, roads and platforms stay procedural: the app draws them with
   `buildPlan` into the same monument.
6. **One loader, and the procedural model stays as the fallback.** `src/world/landmarks.ts` loads one level,
   checks the probe (10m east and 10m north of the anchor) after Babylon's handedness change and refuses the
   model if it is more than 0.5m out, fits it, computes flat normals and merges every part into one mesh in
   the shared building material, with each hinged leaf a child mesh pivoting on its hinge. `FeatureLayer`
   loads a monument's two levels the first time it is drawn, so start-up is unchanged, and swaps them in
   together. Low graphics, `?models=off`, a missing index entry or a failed load all draw the procedural
   plan. Presence, the level-of-detail rule, clearings, shadows and the key date's parts card are unchanged.
   `?debug` shows `models roman-fort-b=glb:near`.
7. **The files are committed, the `.blend` is not, and staleness is a test.** `public/models/landmarks/*.glb`
   and the index are committed; the sheets, raw exports, previews and `.blend` stay in `build/` (ignored). The
   input hash covers the sheet, the Blender script and the finisher's version, and `npm run check` fails a
   model whose hash differs from what the current plan gives ("run `npm run models`"), without needing Blender.
8. **The model is held to its plan by tests.** `tests/models.test.ts` reads every committed glb in Node and
   fails it if its part ids at either level differ from the plan's standing parts (near all, far without
   `detail`), if any part's tier, sources, kits or detail flag differ from the plan, if it is not anchored
   on the feature's grid reference with the probe in place, if a leaf's origin is not on its hinge, or if it
   is over budget: per level at High, near at most 150,000 triangles, 12 draw calls and 1.5 MB, far 15,000, 3
   and 150 KB (`MODEL_BUDGET`).

## Consequences

- The forts' near models are 61,346 triangles and 1.08 MB (Fort 1), 40,916 and 0.74 MB (Fort 2) and 10,760
  and 0.15 MB (the settlement); the far ones 1,224 and 884 triangles, about 27 KB each, and the settlement has
  no far parts (its houses are all detail). Fort 2's near model draws in 9 calls (one merged mesh and its
  eight gate leaves). A full build takes about 7 seconds. The main bundle did not grow (534,703 bytes gzipped
  against main's 535,339 on the same day).
- Up close the forts gain what the evidence and the analogies allow and no more: posts and boarded stages on
  the towers, turves in courses, the breastwork's posts and boards, timber frames and shingle or thatch roofs,
  planked walkways and gate leaves that can swing. Fort 2's rear gate, unproven, keeps its open top.
- The pipeline is a build step with binary outputs; each landmark adds its files to the history. Rebuilding
  only stale models keeps that down.
- Not built in phase 1: the overwrite guard for hand edits (a hand edit is overwritten by the next build, so
  it must go back into the plan or a kit), committed kit libraries of hand-modelled `.blend` assets, textures
  (vertex colours only), the `?tiers` view, clicking a part in 3D (the loader keeps a triangle-to-part table
  for it), a CI job that rebuilds models, ruins, prisms and bridges in the sheet (it refuses them), and the
  1857 train on this pipeline.

## Alternatives considered

- **A grid of ground heights in the sheet**, as the design note proposed. The app's surface is LiDAR tiles
  blended into a jittered Delaunay mesh, built only in `world/`, so the exporter would need its own copy of
  that surface and every terrain change would make every model stale. Fitting at load time gives the same fit
  as the procedural builder by construction.
- **`gltf-transform` with meshopt compression.** Smaller files, but three new dependencies and a decoder to
  self-host, for files already within budget.
- **Decimating the near model for the far one.** It would merge parts and blur the outlines the evidence
  gives, and the far level must keep the procedural palette and silhouette.
- **Babylon's own LOD and per-node meshes.** Hundreds of draw calls per fort, and the layer's own level and
  shadow handling (ADR 0047) would be bypassed.

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
  section lists. Dewi can overrule any of it. *Amended 2026-10-10 after the second-Opus review; see the
  amendment at the end.*

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
   the kits' measurements and a probe point. The roof and raised-floor proportions the procedural builder and
   the sheet share live once, in `src/domain/proportions.ts`, which both call. The Python script holds no
   history: every measurement of a detail it draws is a kit parameter, and a kit it does not know stops the
   build. What it keeps for itself claims nothing, and is exactly these named constants: `STEP` and `BEVEL`
   (mesh resolution, edge rounding), `GAP` (the visible seam between boards), `FACE_*` and `BACK_*` (the
   shares of a gate leaf's thickness its boards and ledges sit at), `HIDDEN_JOIN` (0.05m, where two timbers
   meet under thatch or a board), `ROLL_SIDES`, `CUT_FACE` (a turf bank's cut-face colour), `EPSILON` and the
   seeded colour variation. Three tests hold it to that: the script reads no measurement a kit lacks, a kit
   holds none the script never reads, and no drawing function contains a bare decimal (a colour passed to
   `shade` or `jitter`, and `0.5` for centring, apart). *Amended 2026-10-10: the first claim was untrue
   (`0.25/n` and `0.3/n` for the same shingle overlap, a daub set-in, the sill's and wall plate's depth, the
   thatch roll's seat and the braces' width were bare numbers); each is now a kit parameter (`overlap`,
   `setIn`, `beam`, `rollSeat`, `brace`) and the test that catches them was seen red against the old script.*
2. **Detail that claims something is a kit.** `src/content/kits.ts` is the catalogue: each kit has a name in
   both languages, its own provenance and its measurements, typed per kit (`KitParamNames`), so a missing
   or extra measurement is a compile error. A part asks for kits in its plan (`PartMeta.kits`), and the model
   draws only those. The forts' ten kits are reconstructed or imagined, never documented, and each card shows
   the sources a kit cites: the six-post and four-post timber towers (the layouts from Fort 1's survey and
   Jay Lane's, where the six-post corner tower is *assumed* from four posts found; the 0.4m post from Fort 1's
   post-pipes, reconstructed), the boarded stage and walled ground storey on them (imagined: Jay Lane's page
   gives no stage, and reads its gatehouses as a guard-room at ground level), turf courses on the rampart
   (Dinefwr's turf rampart is inferred from Fort 1's ditch fill; Jay Lane's page contradicts itself on whether
   its turf revetment was found or only suggested, and the kit says so rather than choosing),
   posts and boards on the breastwork, a planked walkway, ledged gate leaves, a timber frame with daub
   panels, shingle and thatch roofs. What claims nothing (bevelled edges on squared timbers, a small
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
   the shared building material, with each hinged leaf kept as its own child mesh with its origin on its hinge
   post, so a later scene can swing it: nothing in the app swings a leaf yet. `FeatureLayer`
   loads a monument's two levels the first time it is drawn, so start-up is unchanged, and swaps them in
   together. Low graphics, `?models=off`, a missing index entry or a failed load all draw the procedural
   plan. Presence, the level-of-detail rule, clearings and shadows are unchanged. The key date's parts card
   lists a part's kits only while the monument is drawn from its model; otherwise (Low, `?models=off`, before
   the files arrive, a failed load) it says the simplified model is on screen, and it redraws when that
   changes. `?debug` shows `models roman-fort-b=glb:near`.
7. **The files are committed, the `.blend` is not, and staleness is a test.** `public/models/landmarks/*.glb`
   and the index are committed; the sheets, raw exports, previews and `.blend` stay in `build/` (ignored). The
   input hash covers the sheet, the Blender script and the source of the finisher (`build.ts`, `glb.ts`,
   `sheets.ts`), so editing the finisher makes every model stale with no version to remember to bump, and
   `npm run check` fails a model whose hash differs from what the current plan gives ("run `npm run models`"),
   without needing Blender. The Blender version is not in the hash, so that test and CI need no Blender;
   instead each glb records the version that built it (`blenderVersion` in the scene's extras) and
   `npm run models` rebuilds any model built by a different one. A build is reproducible: a second
   `--force` run gave byte-identical glbs and index (2026-10-10). **Dewi, 2026-10-10, asked whether to commit
   the models or build them in CI: "Commit them", with the staleness test.**
8. **The model is held to its plan by tests.** `tests/models.test.ts` reads every committed glb in Node and
   fails it if its part ids at either level differ from the plan's standing parts (near all, far without
   `detail`), if any part's tier, sources, kits or detail flag differ from the plan, if it is not anchored
   on the feature's grid reference with the probe in place, if a leaf's origin is not on its hinge, or if it
   is over budget, if a rigid part's mesh is not where its sheet puts it or not as wide and long as its
   footprint turned by its angle (read from the glb's position accessors, carried through each node's world
   transform), if a wall does not run along its path, as wide as its thickness, from its foot to its top, if
   any node but a hinged leaf or the probe is moved, turned or scaled, if the script has no builder for a
   kit or reads a measurement no kit holds, or if the procedural builder stops taking its roof proportions from
   `proportions.ts`: per level at High, near at most 150,000 triangles, 12 draw calls and 1.5 MB, far 15,000, 3
   and 150 KB (`MODEL_BUDGET`).

## Consequences

- The forts' near models are 69,074 triangles and 1.20 MB (Fort 1), 51,188 and 0.90 MB (Fort 2) and 10,760
  and 0.15 MB (the settlement), after the towers gained their walled ground storey (the first build was
  61,346 and 1.08 MB, 40,916 and 0.74 MB); the far ones 1,224 and 884 triangles, about 27 KB each, and the settlement has
  no far parts (its houses are all detail). Fort 2's near model draws in 9 calls (one merged mesh and its
  eight gate leaves). A full build takes under a minute. The main bundle grew: measured on 2026-10-10 on the
  branch merged with main at a6a8d34, 543,954 bytes gzipped against main's 535,397 (+8,557), probably
  `kits.ts`'s bilingual text in the main chunk. (An earlier version of this ADR said it did not grow: that
  compared two different days' builds and was wrong.)
- Up close the forts gain what the evidence and the analogies allow and no more: posts, with a boarded
  stage and walled ground storey that are labelled a guess, on the towers, turves in courses, the breastwork's
  posts and boards, timber frames and shingle or thatch roofs, planked walkways and gate leaves on hinges.
  Fort 2's rear gate, unproven, keeps its open top.
- The pipeline is a build step with binary outputs; each landmark adds its files to the history. Rebuilding
  only stale models keeps that down.
- The hand-edit overwrite guard the design note proposed is not needed: Dewi chose to edit the models
  through their scripts and plans, not the `.blend` files (decision log, 2026-10-10: "No, scripts are fine").
- Dinefwr Castle is the next landmark after the forts (Dewi, 2026-10-10).
- **Dewi's answers to the note's open questions, 2026-10-10.** Commit the models or build them in CI: "Commit
  them" (point 7). What Low graphics shows: "Today's simple model", so at Low a landmark is drawn from its
  procedural plan, as built (point 6). Clicking a part in 3D to open its ⓘ: "Yes, click parts in 3D": agreed,
  **not built in phase 1**; phase 2 builds it with the textures (todo list), using the loader's
  triangle-to-part table.
- Not built in phase 1: textures (Dewi, 2026-10-10: "Get proper textures", ADR 0052's amendment; the models
  are vertex colours only until they land), committed kit libraries of hand-modelled `.blend` assets, the
  `?tiers` view, clicking a part in 3D (the loader keeps a triangle-to-part table
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

## Amendment, 2026-10-10: the second-Opus review

A review of this branch found, and a direct re-read of the sources confirmed, one content error and several
places where the code said more than it did. Corrected:

- **Jay Lane was credited with details its page does not give** (CRITICAL). The tower kits said the boarded
  stage and the open frame below it follow Jay Lane, and gave the interval towers a 0.3m post on the same
  footing. The page gives post layouts, sizes and "the same scantling" for the interval towers, and for the
  gatehouses reads a guard-room at ground level, the opposite of an open frame. The tower kits now cite it for
  the layouts and sizes only; the stage and the boards are a separate imagined kit, `tower-boarding`, and
  the ground storey is drawn walled in. Recorded in `research/findings.md` and the Jay Lane row of the Roman
  forts note.
- **The parts card listed kits that were not on screen** (IMPORTANT). It now lists them only while the
  monument is drawn from its model, and says the simplified model is on screen otherwise.
- **Roof and footing proportions were a second, unrecorded copy** (IMPORTANT). They are now in
  `src/domain/proportions.ts`, read by `world/buildings.ts` and the sheet. A cone roof follows the tower's
  outline in the script as it does in the fallback (no fort uses one yet, so this is unexercised).
- **The script drew measurements no kit held** (IMPORTANT): a ridge beam, the gable-end infill, the stage
  slab, breastwork posts standing proud, the thatch's eaves and ridge roll, shingle thickness and lap, the
  ledges' set-in and a leaf's ground clearance. They are kit parameters now and in the kits' ⓘ text, and the
  gate leaf's text says three ledges and two braces, as drawn. Point 1 above says what the script still keeps.
- **Staleness covered only the sheet and the script** (SUGGESTION): the hash now includes the finisher's source.
- **Geometry was untested against the sheet** (SUGGESTION): a test now reads each rigid part's position
  bounds from the glb and holds them to the sheet.
- **The leaves do not swing** (SUGGESTION): wording corrected above; nothing in the app swings them yet.

## Amendment, 2026-10-10: the second-Opus re-review

A re-review of the fixes above found, and a re-read of the sources and the code confirmed, four IMPORTANT
points and a number of suggestions. Corrected:

- **The turf kit said Jay Lane "records" turf revetments** (IMPORTANT). Jay Lane's page contradicts itself: its
  summary says excavation "revealed earth ramparts revetted with turf", but its excavation section says no
  trace of a rampart bank was found, "nor were there any postholes for a timber-framed rampart or palisade", and that the rampart "must have been provided with a turf
  revetment", a suggestion backed by the ditch fill. The kit now says so in both languages without choosing,
  names Dinefwr's own turf rampart as an inference from Fort 1's ditch fill, and cites S1 as well as S16 and
  S15. Recorded in `research/findings.md` and the Roman forts note.
- **Gate and interval towers' ⓘ still credited Jay Lane with height and roof** (IMPORTANT). They now credit it
  with post layout and plan size only, and call height and roof a guess, in English and Welsh, matching the
  corrected research row; the corner tower's six posts are "assumed", as its page says.
- **Point 1 claimed every measurement was a kit parameter, and the script still hard-coded six** (IMPORTANT):
  see point 1 above. Seen red: the new test listed all of them (`pyramid: 0.25`, `framed: 0.06`, `0.8`,
  `gable: 0.6`, `0.3`, `leaf: 0.8`, and the turf cut colour) against the old script. Unifying the shingle
  overlap changes both roofs slightly: the towers' courses used to run up under the next by 0.25 of a course
  and the halls' by 0.3 of one (at most 0.09m on a 0.3m course), and both now take the one `overlap` of 0.09m,
  so the halls changed a little too, and every model was rebuilt. Further suggestions done: the test now
  covers every function of the script but a named list (colour helpers and the preview camera) and also
  rejects `.5` and `1 / 3` forms; `MITER_LIMIT`, `OUTLINE_SIDES`, `STEEP` and `TINY` are named, and the roll's
  colours follow `ROLL_SIDES` (seen red: the wider test named `beam: 0.9` and `along_path: 1e-9` on the
  script as it stood); `npm run models` asks Blender for `^Blender \d` only when it can run it, and a machine
  without Blender with nothing stale needs none; Jay Lane's gatehouses are described as the page does
  (three or four, on two rows of five posts, a tower at each end), and the Fort 1 south-west gate's left
  tower is "copied from its twin, whose height and roof are a guess".
- **The bundle claim was wrong, and `design/README.md` still said "Proposed, not built"** (IMPORTANT):
  both corrected.
- **Suggestions done**: the kits heading says "in the close-up model" (the far level draws none of them); a
  card keeps its open parts when a model loads or Low is chosen (e2e: Low mid-session brings the procedural
  forts back and the open part stays open); a kit's sources show on the card; the geometry test carries each
  box through the node's world transform, asserts every node but the hinges and probe is untransformed, and
  now bounds walls and banks too (seen red with every wall shifted 5m east); `post-tower-four` cites the
  "same scantling" line; the duplicated foot shade (`SHADE_BOTTOM`) and default roof material
  (`DEFAULT_ROOF`) are one constant each; the finisher's `sheets.ts` and the Blender version now count towards
  staleness (point 7).

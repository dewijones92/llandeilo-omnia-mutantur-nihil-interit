---
title: Scripted Blender models for the important landmarks
kind: design
status: accepted
updated: 2026-10-10
---

# Scripted Blender models for the important landmarks

**Status: accepted; phase 1 built for the Roman forts (2026-10-10).** Dewi's decision is
[ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md); the pipeline as built is
[ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md), which wins where it and this note
differ. Written by Claude on 2026-10-10 as a design; every choice below marked "proposed" is Claude's, under the
proactive mandate, and none is Dewi's unless it says so. The ADR numbers this note guessed (0049) were taken
by other work: the decision is 0052 and the pipeline 0053.

## What was built, and where it differs from this note (2026-10-10)

Built: the build sheet (`src/domain/buildsheet.ts`), the kit catalogue (`src/content/kits.ts`, ten kits),
kits and hinges on the forts' parts, `npm run models` (`tools/models/build.ts`, `build_landmark.py`,
`glb.ts`), the loader (`src/world/landmarks.ts`) wired into `FeatureLayer`, the parts card's kit list, the
`?debug` models line, `?models=off`, and the tests (`src/domain/buildsheet.test.ts`, `tests/models.test.ts`,
the hinge tests in `tests/forts.test.ts`, two e2e tests). Fort 1, Fort 2 and the settlement have models;
Fort 1's backfilled ditches lie on the ground and stay procedural, as §2 says. The second-Opus review of
2026-10-10 corrected the tower kits (Jay Lane gives no stage or open frame; see ADR 0053's amendment) and
other details recorded there. The hinged leaves are plumbing for a later scene: nothing swings them yet.

Different from the note:

- **No ground in the sheet.** A part says whether it `follow`s the ground or stands `rigid` on it, and the
  loader fits it to the surface the app draws, with the same ground function as `buildPlan` (§1's "Ground"
  and the terrain-fit risk). So the LiDAR, or any later terrain change, needs no rebuild.
- **No `gltf-transform`, `meshoptimizer` or quantisation**, so no new dependency: the finisher edits the glb
  itself, and the files carry no normals (the app computes flat ones). The forts are within budget without
  compression.
- **No textures yet**: vertex colours from the one palette in the shared building material, near and far.
  Dewi has since answered (2026-10-10, "Get proper textures", option B): textures are wanted and are the next
  step for the pipeline, not built in phase 1.
- **No `EXT_mesh_gpu_instancing`**: parts are merged into one mesh per level in the loader, with each gate
  leaf a child mesh on its hinge.
- **Bevels only on squared timbers** (posts, beams, ledges), by edge weight; bevelling everything tripled the
  triangles.
- **Not built yet**: textures, kit libraries of hand-modelled assets, the `?tiers` view, the non-blocking
  CI rebuild job (the overwrite guard for hand edits is moot: Dewi chose scripts over editing the `.blend`), the preview renders beyond `--preview`, ruins, prisms and bridges in the sheet, the 1857
  train on the pipeline.

## Where this comes from

Dewi, 2026-10-10: *"Sorry, was blender skipped or?"*, then *"Make all important as stuff in blender
maybe? Or?"*. The workflow brief that commissioned this note says he then chose **"Scripted Blender
models"**: for the important things, a Blender script turns the sourced plan (sizes, parts, how sure
we are) into a detailed model (bevels, real roof timbers, textures, levels of detail, hinged gates),
exported to the app as glTF that keeps each part's ⓘ. The plan stays the one source of facts; the
model can be rebuilt from the repo and edited by hand in Blender. Scope: the castles, the Roman forts,
the churches and the abbey, the town, the bridge and the trains, "and anything along these lines".
(That choice reached this note through the brief, not from Dewi directly; the decision log gets its
entry when he confirms it.)

**What it changes.** [ADR 0017](../adr/0017-hybrid-modelling.md) keeps architecture procedural and
uses Blender only for props, and [ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)
records that Dewi chose the in-app build for the forts over a Blender source (2026-10-09). If this
design is agreed, a new ADR (proposed number 0049) supersedes ADR 0017's architecture rule for the
landmarks listed in "Order" below. It keeps the part of 0017 that still holds, since a wall's shape is
a historical claim that has to stay reviewable in a diff: the claim stays in the typed plan, and
Blender only dresses it. It also settles [`models.md`](models.md)'s open "A, B or C" question in
favour of **B (detailed landmarks in a low-poly world)** for these landmarks only, with the far level
kept in the valley's flat colours so the overview still looks like one world.

## The one idea

**TypeScript decides, Blender dresses.** Every number that is a claim about the past (a size, a
height, a ruin's surviving height, a gate's position, which ditch is where, a part's tier and sources)
is worked out by the pure domain and content code that already draws the procedural model. It is
written into a **build sheet**, a JSON file. The Blender script reads the sheet and adds only
geometry that either claims nothing (a bevel, a UV layout) or is named in a sourced **detail kit**
the plan asks for (see §3). The Python holds no history. If a fact turns up in Python, that is a
defect, just like a fact copied into a second content file.

```
src/content/*.ts (typed plans, provenance)          src/domain/plan.ts, fort.ts, ruin rules
                 \                                   /
                  tools/models/export-sheets.ts  (Node; pure, run in tests too)
                                 |
                 build/models/<landmark>/<feature>.sheet.json   (gitignored)
                                 |
        blender -b --factory-startup -P tools/models/build_landmark.py -- <sheet> <out>
                                 |
                 build/models/<landmark>.blend   (gitignored, rebuilt in seconds)
                 build/models/<feature>.{near,far}.raw.glb
                                 |
                  tools/models/finish-gltf.ts   (gltf-transform: extras, quantise, meshopt, hash)
                                 |
        public/models/landmarks/<feature>.{near,far}.glb   (committed)
        src/content/generated/models.ts                     (committed: id -> files, hash, counts)
                                 |
              src/world/landmarks.ts  (one loader)  ->  FeatureLayer's Monument meshes
```

## 1. Data flow

### The build sheet (TypeScript, pure)

`src/domain/buildsheet.ts` (pure, so it falls under the coverage floor) turns one `building` feature
into a sheet. `tools/models/export-sheets.ts` writes one per feature. A sheet holds:

- **Identity**: the feature id (`roman-fort-a`), the landmark it belongs to (`roman-forts`), its phase
  label and dates, `condition` (standing or ruin), and the `level` rules (which parts are `detail`).
- **Frame**: `crs: "EPSG:27700"`, `anchor: { e, n }` (the feature's `at`), the plan's `angle`, its
  `setting` (`landscape`, `map` or `true`) and that setting's scale. The geometry stays in **true
  metres**; the app applies the setting's scale when it places the model, the same as `buildPlan`
  does today.
- **Ground**: a grid of heights under the plan's footprint, sampled from the same heightfield the app
  loads, already expressed in the plan's own frame (`terrain / up`, as `buildPlan`'s `terrain()`
  sees it), plus the grid's hash. For a `true` plan (the forts) this is the real ground in real
  metres. For a `landscape` plan, drawn at 2.6 times, it is the ground the enlarged plan stands on,
  scaled back. When the LiDAR terrain lands (issue 2), the sampler reads it and nothing else changes.
- **Parts, resolved**: every part with its `id`, bilingual `name` **left out** (see §2: text stays in
  TypeScript), `tier`, `sources` (source keys), `detail`, its shape fields, and anything the
  procedural builder works out at draw time, worked out here instead: each wall's segments with their
  standing heights from `remains`, `sideRemains` and `ruinHeights` (same seed); battlement spacing;
  arch soffits from `archSoffit`; tower outlines; a gate leaf's **hinge point, axis and drawn angle**.
- **Kits**: the detail kits each part asks for (§3), by id, with their parameters.
- **Palette**: the material colours from the one `MATERIAL` table, so the far level matches the
  procedural colours and Python never holds a second palette.
- **`inputHash`**: a hash of everything above plus the build script's version. This is how staleness
  is caught (§4).

Two prerequisites in the plan model, both TypeScript changes reviewed like content:

- **Every part of a Blender landmark gets `PartMeta`** (id, name, provenance), as the forts' parts
  already have. Today only `src/content/forts.ts` does this; the castles', church's, abbey's and
  bridge's plans in `src/content/buildings.ts` carry one provenance per feature. A test (extending
  `tests/forts.test.ts`'s rules) fails any part of a Blender landmark without its own tier.
- **A hinge on gate and door leaves.** A fort's leaf is now a `hall` part placed half open. It
  becomes a part with `hinge: { at, axis, closed, drawn }` (`PartMeta`), so Blender can put the leaf's
  origin on its hinge post and the app can open or close it later without guessing.

### The Blender build (Python, headless)

`tools/models/build_landmark.py`, run as `blender -b --factory-startup -P … -- <sheet> <out>`:

- **One .blend per landmark** (`build/models/dinefwr.blend`), scene units metric, scale 1.0, with the
  georeference as scene custom properties (`crs`, `anchor_e`, `anchor_n`). Blender X is east, Y is
  north and Z is up, in metres from the anchor. **Grid coordinates never go into vertex positions**
  (float32 at E 262206 keeps only about 1.5cm, and the app's own origin is `WORLD.centre`); they go in
  the scene properties and the glTF extras.
- **Collections**: `landmark:<id>` › `phase:<feature-id>` › `near` and `far`, and inside each level a
  collection per part group (`gate-sw`, `rampart`, `interior`) so the outliner reads like the plan.
  glTF has no collections, so the script also mirrors the tree as **parent empties**
  (`roman-fort-a` › `gate-sw` › `fort1/gate-sw/tower-left`), which do export as nodes.
- **Object names are part ids.** Blender caps names at 63 bytes and adds `.001` to clashes, so a test
  fails a part id longer than 60 characters and the script fails on any renamed object. Each object
  also carries `part_id` as a custom property, so a hand rename cannot break the link.
- **Linked instances for repeats**: merlons, roof trusses, barrack blocks of one size and the vicus's
  repeated house kits share one mesh datablock (Alt+D duplicates). The exporter writes each shared
  mesh once, and with `export_gpu_instances` as `EXT_mesh_gpu_instancing`, which Babylon turns into
  thin instances.
- **Hinge pivots**: a leaf's origin sits on its hinge post, so a rotation about the origin swings
  it. The drawn angle comes from the sheet. Hinged parts are kept as their own objects at both levels.
- **Ground**: the ground grid is built as a hidden helper mesh (`_ground`, not exported) so walls,
  towers and footings are cut to it and a hand editor sees what the model stands on. Each footing goes
  down to the lowest ground under it **less 1.5m**, so a small mismatch with the app's drawn surface
  is hidden in the ground rather than showing as a gap.
- **Two levels, both built, never decimated**: `near` builds every part with its kits, bevels and
  UVs. `far` leaves out `detail` parts and kits and has no bevels, so it is the procedural model's
  silhouette in the same flat palette (vertex colours, no textures). Decimating the near mesh would
  merge parts and blur the outlines the evidence gives, so it is not done.
- **Export**: per phase and level, with `use_active_collection` on that level's collection,
  `export_extras` on, `export_apply` (modifiers baked), `+Y up`, no embedded materials beyond each
  material's **name** and UVs (the app supplies the materials, §3). A Workbench preview render per
  phase (`--preview`, as the train script already does) is written to `build/` for checking.

### Finishing (Node)

`tools/models/finish-gltf.ts` (gltf-transform) opens each raw glb and:

- writes the **extras** from the sheet, not from Blender's custom properties (Blender's ID properties
  cannot hold lists of strings cleanly). Per part node:
  `{ part: "fort1/gate-sw/tower-left", tier: "reconstructed", sources: ["fort:S1","fort:S16"], detail: true, kits: ["timber-tower-six-post"], hinge: {…} }`.
  On the scene: `{ feature, landmark, level, crs: "EPSG:27700", anchor: {e, n}, setting, inputHash, blender: "4.0.2", script: "<version>" }`;
- checks a **probe** empty the script always adds 10m north and 10m east of the anchor
  (`_probe`), so orientation and handedness are tested rather than guessed;
- quantises (`KHR_mesh_quantization`), welds, prunes, and compresses (`EXT_meshopt_compression`);
- writes `public/models/landmarks/<feature>.<level>.glb` and the index
  `src/content/generated/models.ts` (feature id → files, `inputHash`, triangle and draw-call counts,
  bytes), the same way voices have `public/voices/manifest.json`.

## 2. How the app loads them

**One loader, one seam.** A glTF landmark is just another way to fill a `Monument`'s two meshes
(`mesh` for far, `near` for near) in `FeatureLayer`. Presence (the `scaling.y` rise), the LOD rule
(`levelFor`, ADR 0047), clearings, shadows (ADR 0013), the debug overlay and the key date's parts
card all keep working because none of them knows where the mesh came from.

- `src/world/landmarks.ts` exports `loadLandmark(scene, entry, plan, at, ground)`. It loads the glb
  (`ImportMeshAsync`, with the loader's side-effect modules deep-imported per ADR 0004), applies **one
  fixed transform** (glTF to Babylon handedness, the setting's `planWorldScale`, the plan's `angle`,
  translation to the feature's world position and base height), and checks that `_probe` lands where
  the sheet says, logging `dewidebug landmark <id> probe error=<m>` and falling back to procedural
  above 0.5m. It does **not** reuse `models.ts`'s bounding-box guess at "flipped" or "mirrored",
  which suits a train and would be wrong for a castle.
- **Only when its glTF exists**: `FeatureLayer` looks the feature id up in the generated index. Not
  there, or the graphics level is Low, or the load fails: the procedural mesh is used, as today. So a
  landmark without a model, a checkout that has not built them, and a failed fetch all still draw.
- **Lazy, off the critical path**: the procedural meshes are built at start as now. A landmark's far
  glb is fetched once the app is ready, and its near glb when the camera first comes within the hold
  distance of it or a key date's shot is near it. When a glb arrives it replaces that level's mesh and
  the shadows are redrawn once. Nothing is added to the 17s first-ready time.
- **Merging**: parts are merged **by material** into one mesh per material per level, so a near castle
  is a handful of draw calls, not hundreds. Hinged parts stay separate nodes. Instanced kits stay thin
  instances. The loader keeps a triangle-range → part id table from the extras, so a later click on a
  wall can open that wall's ⓘ. (Picking in 3D is not part of this design; the table just makes it
  cheap later.)
- **Ground-hugging parts stay procedural.** Ditches, roads and platform faces have to lie exactly on
  the surface the app draws, a jittered Delaunay mesh that only `world/terrain.ts` builds. So the glb
  holds what stands up (walls, towers, halls, prisms, bridges and their kits), and `buildPlan` still
  draws the ground parts into the same Monument. A re-draped LiDAR ground then moves ditches and roads
  without a Blender rebuild. Each part is in exactly one of the two, and a test says so.
- **The ⓘ is the plan's.** The bilingual names and notes stay in `src/content`. The extras carry only
  ids, tiers, sources and kits, so text exists once. **A test reads every committed glb's JSON chunk
  in Node** (no Babylon) and fails if:
  - the part ids at a level differ from the plan's standing parts at that level (`near` = all,
    `far` = not `detail`);
  - any part's tier or sources differ from the plan's provenance;
  - a kit is not in the kit catalogue, or a part has a kit its plan entry did not ask for;
  - the anchor differs from the feature's `at`, or the probe is missing;
  - `inputHash` differs from the sheet the test builds in-process (the model is stale);
  - the file is over its size or triangle budget (§5).
- **Debugging**: the `?debug` overlay shows each landmark's source and level
  (`dinefwr-castle=glb:near`, `talley-ruin=procedural:far`). `?models=off` forces procedural, which
  makes before and after screenshots cheap. A proposed `?tiers` view tints each glb part by its tier
  from the extras, a way to see at a glance how much of a castle is documented.

## 3. Materials and detail: what the script may add

Three kinds of addition, and a rule for each:

| Kind | Examples | Rule |
|---|---|---|
| **Finish** (claims nothing) | bevels on edges, UVs, slight unevenness on a turf bank, baked ambient occlusion | Allowed anywhere without a source. One standing line in the About tab and on each landmark's ⓘ: "surface finish is rendering, not evidence". |
| **Construction detail** (a claim) | roof trusses, merlon and crenel sizes, arrow loops, window tracery, putlog holes, thatch thickness, slate courses, coursing of rubble or ashlar, gate ironwork, a six-post timber tower | Only through a **kit** in the catalogue, and only on a part whose plan entry names that kit. Every kit has its own provenance: documented (a source for this building), reconstructed (an analogy: which building, which source) or imagined. A part's ⓘ lists its kits with their tiers. |
| **Material and texture** (a claim about what it was made of) | coursed limestone rubble at Carreg Cennen, grey shale with sandstone dressings at Newton House, timber and turf at the forts | The part's `material` is already in the plan with its provenance. The texture is the app's for that material, and its source and licence go in the asset manifest like any asset. A site-specific look (Newton House's dressings) is a kit with a source. |

- **The kit catalogue** lives in `src/content/kits.ts` (id, bilingual name, provenance, parameters
  with their types). The Python has one function per kit id and fails on an id it does not know. A
  test fails on a kit with no provenance or one used by no part. So a new detail cannot reach the
  screen without a stated basis.
- **Detail follows the tier.** A phase whose form is unknown (Carreg Cennen's Welsh castle, the Lord
  Rhys's Dinefwr, the clas church), and a part whose form is a guess (the forts' gate leaves), gets
  finish only, and kits only where an analogy is written down. Richer geometry reads as more certain, so the model must not
  look surer than the note. Documented parts get the most detail.
- **Materials are the app's, not the file's.** The loader maps each material name (`rubble`,
  `timber`, …, the `Material` union) to **one shared set** in `src/world/landmark-materials.ts`.
  Near: textured PBR with the palette colour as a tint. Far: the existing `building-mat` with vertex
  colours. So night lighting, lamps, fog, shadows and the palette stay in one place (the DRY law), a
  glb never brings its own lighting look, and the far level matches the procedural valley.
- **Textures** are shared tiling sets per material, 1K at High and Medium (2K for the two or three
  most-seen stones at High if the budget allows), from CC0 libraries (ambientCG, Poly Haven), stored
  once in `public/textures/` and listed in the asset manifest ([ADR 0026](../adr/0026-open-licences-including-nc.md)).
  WebP rather than KTX2, so no transcoder has to be fetched. Forbidden as before: anything all rights
  reserved.
- **Tests already in place still apply**, and are extended to kits: the forts have no stone, tile or
  limewash; that test reads the forts' kit list as well.

## 4. Reproducibility: what is committed and what is built

**Proposed: commit the `.glb` files and the index, do not commit `.blend` files, and keep Blender out
of CI's blocking path.**

- `npm run models` runs the three steps for every landmark whose `inputHash` changed (or
  `npm run models -- dinefwr` for one). Blender is the apt 4.0.2 already on this machine; the script
  checks `bpy.app.version` and stops on any other version unless told otherwise, and the version goes
  into every glb. Every random choice in Python (surface unevenness only) has a fixed seed.
- **Committed**: `public/models/landmarks/*.glb`, `src/content/generated/models.ts`, the scripts,
  the kit catalogue, and any hand-made kit libraries (below). This follows the repo's practice for
  generated assets (the voices, the terrain, the 1850s train): the Pages deploy then needs no Blender,
  and `npm run dev` on a fresh clone shows the models.
- **Not committed**: `build/models/**` (sheets, `.blend`, raw glbs, previews). A `.blend` is a few MB
  of binary that the script rebuilds in seconds, and committing it would make two sources.
- **Staleness is a test, as for the voices**: `npm run check` builds each sheet in-process and
  compares its hash with the glb's `inputHash`. A changed plan with an old model fails the check with
  "run npm run models". No Blender is needed for the check.
- **CI**: the blocking job never runs Blender. A **non-blocking** job (on the laptop's self-hosted
  runner of [ADR 0048](../adr/0048-gpu-e2e-on-windows-chrome.md), or `ubuntu-24.04`, whose apt
  Blender is also 4.0.2) rebuilds the landmarks whose inputs changed and fails if the script errors
  or the result breaks the glb tests. Blender's output is not promised byte for byte, so it is the
  inputs that are compared, not the bytes.
- **Editing by hand in Blender** (*not wanted: Dewi chose to edit through the scripts and plans, 2026-10-10, so the guard below is not built; the text stays as the design considered it*): open `build/models/<landmark>.blend` and change anything. The next
  `npm run models` will not overwrite a .blend whose content hash differs from what it wrote; it
  stops and says which objects changed. A hand edit is kept in one of two ways: a **change to a fact**
  goes back into the TypeScript plan (that is where facts live), and a **piece of hand modelling**
  (a carved doorway, a truss worth shaping by eye) is saved as an asset in a committed kit library
  `tools/models/library/<kit>.blend`, registered in `kits.ts` with its provenance, and appended by the
  script wherever a plan asks for that kit. Either way the next rebuild reproduces it.

**Sizes (estimates, to be replaced with measurements from the first build)**:

| Item | Each | Count | Total |
|---|---|---|---|
| Near glb (60k to 150k triangles, quantised and meshopt) | 0.4 to 1.5 MB | about 35 phases | 15 to 40 MB |
| Far glb (5k to 15k triangles) | 40 to 150 KB | about 35 | 2 to 5 MB |
| Shared textures (about 13 materials × colour, normal, roughness/AO, 1K WebP) | about 150 KB | about 40 | about 6 MB |
| `.blend` per landmark (not committed) | 2 to 10 MB | about 12 | 0 in git |

The repo's objects are about 60MB today. A full rebuild of everything adds the whole model set to the
history again, so rebuilds go by changed `inputHash` only. **Switch rule**: if `public/models`
history passes about 300MB, move to building models in CI (cached by `inputHash`) and stop
committing them. Git LFS is not proposed: its free bandwidth would be used up by CI checkouts.

## 5. Performance budgets at High

High assumes a powerful desktop GPU (CLAUDE.md). The only frame rates we have are WebGL on the RTX
2000 Ada through WSL (idle 41fps, scrubbing about 15fps). WebGPU numbers come from the GPU runner
(ADR 0048). Budgets, checked by the glb tests (counts and bytes) and the GPU runner (frames):

| Budget | Near | Far |
|---|---|---|
| Triangles per phase | ≤ 150,000 | ≤ 15,000 |
| Draw calls per phase | ≤ 12 (one per material, plus hinged parts and instanced kits) | ≤ 3 |
| File size per phase | ≤ 1.5 MB | ≤ 150 KB |
| Landmarks near at once (worst case: the town, with St Teilo's, the bridge, the Shire Hall and the Provisions Market) | ≤ 600,000 triangles, ≤ 50 draw calls in all | |
| Texture memory, whole app | ≤ 256 MB at High, about half at Medium | |
| First-ready time | no change (nothing on the critical path) | |
| Frame rate | idle at the overview within 10% of procedural; near a landmark within 20%; scrubbing no worse | |

- **Medium**: the same glbs, textures at half size, near swaps in at half the distance.
- **Low**: procedural only, no glbs fetched. This keeps Low the escape hatch, and keeps CI's Low e2e
  runs as they are. So **one e2e opts into High** (`?quality=high&year=…&place=…`), waits for
  `dewidebug landmark … loaded`, checks the overlay says `glb:near`, and screenshots; the GPU runner
  measures frames near the town and Carreg Cennen.
- Shadows are rendered once (ADR 0013) and redrawn when a glb arrives or a level swaps, as now.
- Memory: a landmark's phases far from the slider's year (more than one key date away) give their near
  meshes back and fetch them again when needed.

## 6. Order of landmarks

Proposed. The order follows how much of each is documented: a detailed model of a form nobody knows
would mislead.

| # | Landmark (features) | Why here | Before it can start |
|---|---|---|---|
| 1 | **The Roman forts** (`roman-fort-a`, `roman-fort-b`, the vicus; the backfilled ditches stay procedural) | The pilot: parts already have ids and tiers; true scale; gates for the hinge | The hinge field on leaves; the kit catalogue's first kits (six-post timber tower, breastwork, gate leaf) |
| 2 | **Carreg Cennen** (Welsh castle, inner ward, Giffard's castle, ruin) | Richest record of the castles: ward sizes, curtain thicknesses, tower sizes, the gatehouse between two octagonal towers | Per-part ids and tiers in its plan; the open "which wall holds the gatehouse" stays a reconstructed part |
| 3 | **Dryslwyn** (first ward, two wards, three wards, ruin) | Ward sizes and phase order closed by `research/building-models.md` (2026-10-02) | Per-part tiers; the contested size stays in its ⓘ |
| 4 | **Dinefwr** (the Lord Rhys's castle, stone castle, ruin, summerhouse) | The most famous, but enclosure sizes and the great tower's side are not in the research | Coflein NPRN 425's plan or Cadw's guidebook first, then per-part tiers. Until then its detail stays at finish level |
| 5 | **St Teilo's church** (clas, double-naved, west tower, Scott's) and **Talley Abbey** (four phases) | Scott's church and the c.1600 tower survive; Talley's widths, bays and tower are measured | Per-part tiers; roof truss and window kits need sources (Scott's church is the best-recorded) |
| 6 | **Llandeilo Bridge** (the 1848 arch, the seven-arched bridge, the old abutment) | The 1848 arch is precisely recorded (44.2m span, 12.65m rise). Cheap enough to jump the queue | The width (open in `models.md`); the old bridge stays plain |
| 7 | **The Shire Hall** (1802, its open ground-floor market, streetfront remodelled 1901) and the **Provisions Market** (1838) | In the research (Coflein NPRN 96635, victorian:S41 and S1) but not drawn as plans yet | Research for a plan: sizes, storeys, the 1901 front. These are town buildings, so a `map` setting plan whose OS footprint they replace |
| 8 | **The trains** (the 1850s Llanelly train; the later steam train and the diesel unit) | The 1850s train is already in Blender, but its facts (sizes, colours) live in the Python | Move its dimensions and colours into a typed rolling-stock plan, so it goes through the same sheet, extras and tests; the later two need their research (`research/railway-later.md`) |
| 9 | **Along these lines**: Newton House (three phases), Paxton's Tower, Golden Grove, Aberglasney; the Rebecca-era tollgates and Llandeilo station if researched | Each is a `building` plan already, or a gap the research names | The research gaps in `models.md` (Newton House's size and storeys). Garn Goch is earthwork, ground not building, so it stays procedural |

Each landmark goes through the todo file's path: research gaps closed, per-part tiers added, kits
sourced, built, second-Opus review, screenshots at each phase's years (standing and ruin), released
with before-and-after pictures.

## 7. Risks

| Risk | Mitigation |
|---|---|
| **Detail reads as certainty.** A bevelled, textured castle looks known even where its form is guessed | Detail follows the tier (§3); unknown-form phases get finish only; kits carry their own ⓘ; the `?tiers` view; the release notes say what is reconstructed |
| **Facts creep into Python** and the plan stops being the one source | The sheet carries every claim; kits are named in TypeScript with provenance; the glb test fails a kit the plan did not ask for; review checks the Python for history |
| **A stale model** after a plan changes | `inputHash` test in `npm run check`, as for the voices |
| **Style clash** with the low-poly valley (`models.md` option B) | Far level in the procedural palette and the shared `building-mat`; textures tinted by the palette; screenshots at the overview and near, at several years, before each landmark ships |
| **Orientation, handedness or scale wrong** (the train loader already guesses "flipped" from its bounding box) | A fixed transform and the `_probe` check, in the loader and in the glb test |
| **Terrain fit**: the app's surface is a jittered Delaunay mesh the exporter does not rebuild, and the LiDAR will change it | Ground-hugging parts stay procedural; footings go 1.5m into the ground; the loader logs the largest gap between a footing and the drawn surface, and an e2e fails above a threshold. If gaps show, lift the terrain triangulation into a pure domain function the exporter can call |
| **Blender version drift** (Ubuntu's next apt Blender, or a hand-installed 5.x) | The script stops on an unexpected version; the version is in every glb; the 5.x tarball path in `~/code/tools/` is a deliberate upgrade with a rebuild of everything |
| **Repo growth** from committed binaries | Rebuild only by changed inputs; size tests; the 300MB switch rule (§4) |
| **Babylon fetches decoders from its CDN** (meshopt, KTX2, Draco) | Self-host the meshopt decoder from the `meshoptimizer` npm package and point Babylon's configuration at it; WebP textures need no decoder; no Draco. Check in the pilot that nothing is fetched from a CDN |
| **CI cannot see it**: CI runs Low, and SwiftShader manages about 1fps | Low keeps procedural by design; one High e2e checks the loader; the GPU runner measures frames; screenshots are taken on the laptop's GPU |
| **Hand edits lost** on a rebuild | The overwrite guard; the two homes for an edit (the plan, or a kit library) |
| **Blender's name limit** (63 bytes, `.001` suffixes) | Part ids at most 60 characters by test; `part_id` custom property; the script fails on any renamed object |
| **Effort per landmark**, and research gaps blocking detail | The order above puts the documented ones first; a landmark can ship its far level and finish only, and gain kits later |
| **New dependencies** (`@gltf-transform/core`, `@gltf-transform/extensions`, `meshoptimizer`, dev only, a few MB) | Proposed to Dewi before install, per the working rules; nothing new at runtime except the meshopt decoder (about 20KB) |

## Questions for Dewi

*Answered by Dewi on 2026-10-10, after this note: how real the near level looks (proper textures, option B),
editing the `.blend` by hand (no: scripts are fine), the castle order (Dinefwr next), and then the last three
(committing the models, what Low shows, clicking parts). None is open now.*

- ✅ ~~**How real should the near level look?**~~ Answered: "Get proper textures" (Dewi, 2026-10-10).
  The kind of texture (photographic PBR tinted by the palette, as this note assumes, or painted) is still
  to be settled when textures are built.
- ✅ ~~**Commit the models, or build them in CI?**~~ Answered: "Commit them" (Dewi, 2026-10-10), with the staleness test (§4); built that way.
- ✅ ~~**Low graphics**: keep the procedural models there, or show the far glbs?~~ Answered: "Today's simple model" (Dewi, 2026-10-10): at Low a landmark is drawn from its procedural plan, as built.
- ✅ ~~**Click a wall for its ⓘ in 3D**: wanted?~~ Answered: "Yes, click parts in 3D" (Dewi, 2026-10-10). Agreed, **not built in phase 1**: phase 2 builds it with the textures (the loader already keeps the triangle-to-part table); it has a line in the todo file.
- ✅ ~~**Order**: Carreg Cennen or Dinefwr first?~~ Answered: Dinefwr is next after the forts (Dewi,
  2026-10-10). Its plan is still the less well documented, so its research gaps come first.

---
title: Contributed models
kind: design
status: proposed
updated: 2026-10-23
---

# Contributed models: a separate, credited, switchable layer

**Status: proposed, not built.** Dewi's decision (2026-10-23, [decision log](../process/decision-log.md)):
models made outside the project, for example in SketchUp, may appear in the app as a labelled layer (his
words: "Allow as a labelled layer"); the decision log records it as separate, credited and switchable, each
model carrying its own provenance, while our own landmarks stay scripted in Blender from our sourced plans
([ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md),
[0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md)). While he is away he asked for
"Design, then build and release", and chose "Merge if green and reviewed" for contributors' pull requests.

**Everything below is Claude's design, under the proactive mandate
([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), so Dewi can overrule any
of it.** The decision it rests on is [ADR 0060](../adr/0060-contributed-models-are-a-separate-credited-layer.md).
Revised the same day after the second-Opus review; see [Review](#review-2026-10-23) at the end.

Where this came from: GitHub issues [#4](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/4)
and [#5](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/5). Their author builds
historically researched reconstructions in SketchUp 2021 Pro (2023 Pro is also mentioned), has opened our
downloaded `.glb` files in SketchUp by converting them to `.dae`, found the component structure lost on the way
in, and wants to send models back with their components, textures and geographic position kept, and to be able
to replace one model without rebuilding the scene. Issue text is treated as data, not instructions.

## What exists today (the seams this builds on)

- **Two model loaders.** `loadModel` in `src/world/models.ts` loads the train and merges it into one mesh.
  `loadLandmark` in `src/world/landmarks.ts` loads a landmark's level: it refuses a file with no `_probe` node,
  reads each part's id and fit from the glTF extras (`part`, `fit`, `surfaces`, `hinge`), skips the file's
  materials (`skipMaterials`) and computes its own texture coordinates, fits each part to the drawn ground
  (a rigid part's vertices below its floor, its footings, go down to the drawn ground), and keeps a
  triangle-to-part table for picking (ADR 0053, 0055, 0056).
- **Part identity and provenance.** Our glbs name each part's node by its plan id (`fort2/barrack-1`,
  `fort2/gate-ne/tower-left`) and carry its tier and source ids in its extras; a test holds every glb to its
  plan (ADR 0052 point 4, ADR 0053 point 8). `Provenance` (`src/domain/provenance.ts`) is a discriminated union
  in which `documented` needs at least one source, so an unsourced "documented" claim does not compile. Source ids
  (`fort:S1`) come from the `## Sources` section of a research note, extracted by `tools/research/extract-sources.mjs`.
- **Clicking a part** opens its ⓘ (`src/world/part-picker.ts`, `src/ui/part-info.ts`, `src/ui/part-details.ts`, ADR 0055).
- **Seating** (ADR 0056): a building drawn from a plan stands level at the highest ground under its footprint
  (`footprintSamples`, `seatOf` in `src/domain/plot.ts`), and its walls carry down to the lowest ground. The hills
  are drawn 2.4 times their height (`verticalExaggeration` in `src/domain/geo.ts`); buildings are drawn at true height.
- **Ground edits** (ADR 0056): a feature's terraces are drawn while it is drawn (`editsDrawn`), and other features
  are built once, at start, on the terraces drawn in their first year (`editsBuiltOn`): Fort 1's backfilled ditches
  stand on Fort 2's.
- **Credits and downloads** (ADR 0026 amended, ADR 0058): every asset has a record in `src/content/assets.ts`; the
  About credits and the Downloads tab are built from it. The Downloads test (`tests/downloads.test.ts`) scans
  `public/models/landmarks/` and the train only, and a landmark's tier counts come from the parts' extras
  (`partTiers` in `tools/downloads/stamp.ts`). Our own models are CC BY 4.0, covering only this project's modelling.
- **The terrain tiles' frame** is today's LiDAR region's south-west corner, written into each tile as
  `sceneOriginBng` by `tools/terrain/export-glb.ts` from `tools/terrain/lidar-areas.json` (E 260000 N 220500).
  Separate LiDAR regions for Carreg Cennen and Dryslwyn are planned (decision log, 2026-10-17).
- **The closest precedent is the Photos layer** (ADR 0044): dated, placed content read through the snapshot, a
  toggle in the brand row remembered in `localStorage` with `?photos=1|0`, an ⓘ built from the shared tier badge.

## 1. The contribution format

**Recommendation: one `.glb` (binary glTF 2.0) per contribution, in one named contribution frame, with each part a
named node; a SketchUp `.dae` is accepted and converted by our script.**

- **Format.** glTF 2.0 binary, one file, textures embedded (PNG or JPEG), no Draco or meshopt compression (a decoder
  would be needed, ADR 0058), no animation, cameras or lights.
- **Units and axes.** glTF's own: metres, +Y up, right-handed. In our files x is metres east, y is metres up and z is
  minus the metres north (the placement note ADR 0058 stamps into every model). SketchUp's red axis is east and its
  green axis north by default, and the usual Z-up to Y-up conversion maps green (north) to glTF -Z, our convention;
  **this is expected, not verified**, which is why milestone 1 is a real test export and the placement checks in
  section 6 refuse a model that is turned, mirrored or scaled.
- **The contribution frame: a named constant, not today's tiles.** `CONTRIBUTION_FRAME` in `src/domain/` is
  E 260000 N 220500 on the British National Grid, with heights in metres as the LiDAR gives them (absolute, as on
  the tiles), and grid north. It equals today's tiles' `sceneOriginBng`, so a contributor who builds on the tiles
  where they open is in it; a test holds the tiles' `sceneOriginBng` to it, so a change to `lidar-areas.json` cannot
  silently move every contribution. A tile set from a separate region with another origin (Carreg Cennen,
  Dryslwyn) either keeps this origin or names its own frame, which an entry then carries explicitly (`frame`).
  Grid north and true north differ by more than a degree here (about 1.6° by the standard convergence formula,
  not checked against a tool), so the model lines up with the tiles, not with a geo-located north.
- **Parts and structural nodes.** Exporters add nodes the contributor never made (a scene root, unnamed holders,
  mesh nodes named after definitions or ids). So:
  - the contribution's **root** is the one node named with the contribution's id; anything above it is structural;
  - below the root, a node is a **part** if its name is listed in the entry (exactly, or by a pattern such as
    `barrack-*`); a part's id is the path of part names from the root, joined by `/`, so a group `fort2-example`
    holding an instance `barrack-1` is `fort2-example/barrack-1`, like our `fort2/barrack-1`;
  - any other node is **structural** and transparent: it is skipped in the path, and its geometry belongs to its
    nearest part ancestor;
  - geometry with no part ancestor below the root, a part name that breaks the rule (lower-case letters, digits and
    hyphens), or two parts with one id fails the build. The converter and the test print the tree they found, parts
    and structural nodes marked, so a lost or renamed component shows at once.
  - Which names an exporter writes (instance name or definition name, and what it does to repeated components) is
    **not known yet**; milestone 1 settles it from a real export and the rule above is adjusted then.
  - Repeated components stay repeated, but each instance needs its own name, because each is clickable and has its
    own ⓘ; the entry can give one provenance to a pattern.
- **What SketchUp 2021 and 2023 can export** (searched 2026-10-23; nothing below was tried by us):
  - **No native glTF export found for 2021 or 2023.** SketchUp's help documents a native export to "GLTF Binary
    File (*.glb)" under File > Export > 3D Model, without naming a version
    ([SketchUp help, glTF](https://help.sketchup.com/en/sketchup/working-gltf-files)); press coverage dates glTF and
    USDZ support to the desktop SketchUp 2024 release, without saying whether that is import, export or both
    ([CG Channel, April 2024](https://www.cgchannel.com/2024/04/trimble-releases-sketchup-2024/)), and an earlier
    SketchUp forum thread (its date not checked) says SketchUp had no built-in glTF export and needed a plugin
    ([forum](https://forums.sketchup.com/t/export-to-glb-gltf/122021/4)). Not confirmed from Trimble's release
    notes. Whether the native exporter keeps component names as nodes is not stated on the help page.
  - **COLLADA (.dae) is built in**, with export options including "Preserve Component Hierarchies" (keeps the nesting
    of groups and components; unticked, the hierarchy is flattened), "Export Texture Maps", "Triangulate All Faces",
    "Export Two-Sided Faces" and "Export Edges"
    ([SketchUp help, COLLADA](https://help.sketchup.com/en/sketchup/importing-and-exporting-collada-files)).
  - **A free Khronos glTF exporter extension** (by Centaur, on the Extension Warehouse); a forum post says it was not
    verified past SketchUp 2016 but seemed to work in 2020, and an install guide warns the Warehouse may mark it
    incompatible with the SketchUp version ([forum](https://forums.sketchup.com/t/export-to-glb-gltf/122021/4),
    [HOLOPLOT guide](https://docs.holoplot.com/holoplot-plan/importing-3d-assets-from-sketchup/installing-the-khronos-gltf-exporter-for-sketchup)).
    An MIT fork was tested on 2017 and 2018 ([Yulio](https://github.com/YulioTech/SketchUp-glTF-Exporter-Ruby)).
    Unverified on 2021 and 2023; whether it keeps component names is not stated.
  - **SketchUp 2021 has no glTF import either**, so opening our tiles there goes through a conversion, as the
    contributor already did for a model (issue #5). Whether a tile's position survives that conversion is not
    verified.
  - **Blender's COLLADA importer** is in Blender 4.x (this machine has 4.0.2) but, by secondary sources, was removed
    in Blender 5.0 ([Blender devtalk](https://devtalk.blender.org/t/moving-collada-i-o-to-legacy-status/34621?page=2)).
- **The route for the contributor: send a `.dae`, and we convert it.** From SketchUp 2021 or 2023: File > Export >
  3D Model > COLLADA, with Preserve Component Hierarchies, Export Texture Maps and Triangulate All Faces ticked, and
  Two-Sided Faces and Edges unticked. `npm run contributed -- <file.dae>` (`tools/contributed/`, headless Blender,
  pinned to 4.0 as the landmark script is, refusing any other version unless told) imports the `.dae`, reads its
  declared unit and up axis (SketchUp writes inches and Z-up, as we expect; to be confirmed by milestone 1) rather
  than assuming them, checks the names, and exports the `.glb` that is committed and reviewed. A contributor with a
  working glTF exporter may send the `.glb` directly.
- **What is committed, and rebuilding.** The `.glb` is the contribution of record. The `.dae` is not committed (it
  would double every contribution in the history); its sha256, the converter's version and the Blender version are
  written into the entry and the glb's extras, and the `.dae` stays attached to the pull request. So, unlike our own
  models (ADR 0052 point 6), **a contribution cannot be rebuilt from the repo**; this is accepted, because the
  contributor's file is the source, as a photograph is, and the glb is what is reviewed.
- Rejected: requiring the contributor to run Blender (another tool to learn, and a step our script does the same
  way every time); requiring the Khronos extension (unverified on their version); accepting `.skp` (proprietary;
  our side would need SketchUp); any frame per model (our own glbs' anchor frame has no absolute height, which the
  seating below needs).

## 2. Provenance

**Recommendation: every part's provenance is written in a typed content entry, in our `Provenance` union; a part
nobody can explain is refused, not defaulted; the ⓘ says first that this is a contributor's model, not ours.**

- **Where it lives.** One entry per contribution in `src/content/contributed.ts`, typed by a new `ContributedModel`
  in `src/domain/model.ts`: a branded `ContributionId`, the file, the frame, where and when it is drawn (section 4),
  the features it depicts, its credit and licence (section 3), a provenance for the model as a whole, and a map from
  each part id (or pattern) to its name in English and Welsh, its provenance, whether it stands (section 4) and how
  it meets the ground. Nothing in the glb's extras is trusted: SketchUp cannot write them, and a file is not a
  reviewed source.
- **The three tiers, unchanged.** Documented needs at least one source (compile error otherwise), and, as for all
  our content, the claim is cross-checked against two independent sources in review; reconstructed says what it is
  based on; imagined says what it is grounded in (CLAUDE.md). A barrack drawn from the excavated plan may be
  reconstructed with that source; a roof pitch nobody recorded is imagined, grounded in, say, the comparison the
  contributor used.
- **Sources.** The contributor's sources go in a research note, `docs/research/contributed-<id>.md`, with a
  `## Sources` section that `extract-sources.mjs` turns into ids, and an account of what each part and each material
  is based on. Parts may also cite our ids (`fort:S1`). The note is a draft until independently checked.
- **Textures are claims too** (ADR 0052's amendment): a part's basis covers its materials, and the note says what
  each material stands for.
- **No stated basis: refused.** "Imagined" must still say what it is grounded in, so a part with nothing said about
  it fails the build and the review asks the contributor. A reviewer may write a grounding only when a note supports
  it ("the contributor's design, consistent with the barrack sizes in `fort:S1`"), citing that source. A part is
  never shown as documented without sources, and the review never raises a tier for looks (ADR 0052 point 5).
- **The ⓘ.** The part panel (`part-details.ts`) gains a header before the tier: "Contributed model: made by ⟨credit⟩,
  not by this project; its shapes are theirs, not drawn from our plans", in both languages, then the part's tier,
  basis and sources, then the credit and licence. The hover tip says "contributed", so a part is never taken for ours
  even before a click.
- Rejected: provenance in the glb's extras; one provenance per model only (an excavated wall and a guessed roof would
  read the same); a fourth tier, "contributed" (who made it and how sure it is are separate questions); a default
  "imagined, no basis given" (breaks the rule that imagined says what it is grounded in).

## 3. Credit and licence

**Recommendation: one asset-manifest record per contribution, made from its entry, with the credit the contributor
asks for and the licence they state; our CC BY 4.0 does not cover it.**

- **The record.** `ASSETS` gains one row per contribution, built from `CONTRIBUTED` (as the texture rows are built
  from `SURFACES`): files `^models/contributed/<id>\.glb$`, what it is, the contributor's credit and a link to the
  pull request or issue, and the licence.
- **The licence** is stated by the contributor, who is the author, in the pull request: one of those
  [ADR 0026](../adr/0026-open-licences-including-nc.md) allows. If they state none, the GitHub-issue wording ("Not
  checked: used with credit at Dewi's request") would apply, but **that exception was granted for issues #1 and #3
  only** (ADR 0026, amended 2026-10-09), so until Dewi extends it a contribution with no stated licence waits (open
  question 1).
- **Textures inside the file** need their origin stated: a photograph the contributor took, an open-licence library,
  or SketchUp's own material library, whose redistribution terms are not known to us (open question 2).
- **Where the credit shows.** In the part ⓘ, in the About credits (from the record, through `src/ui/credit.ts`), and
  in the Downloads tab in a "Contributed models" group. That needs work: the Downloads test must scan
  `public/models/contributed/` too, and a contributed row's tier counts come from `CONTRIBUTED` (the entry's part
  provenance), not from part extras the file does not have; `npm run downloads` stamps the credit and licence into
  the file's `asset` block and first scene's extras, touching nothing else (milestone 7).
- **Our licence does not reach it.** Our CC BY 4.0 covers this project's own modelling only (ADR 0058, amended; kept
  by Dewi on 2026-10-23: "Keep CC BY 4.0"). A contribution built on one of our downloaded models also carries our
  credit, as CC BY asks.
- **Personal data.** Only the name the contributor chooses for the credit goes in the repo. Contact details that
  arrive in issue comments are never copied.

## 4. Placement and time

**Recommendation: placed in the contribution frame, each standing part seated by ADR 0056's rule with its footings
carried down, drawn for its own dated range, and drawn instead of our model of the same feature while the layer is
on (open question 3).**

- **Where.** The frame places it on the grid; the entry also gives `at`, a grid reference from Coflein or Cadw for the
  site it shows (CLAUDE.md's placement rule), for its label, a flight and the checks below.
- **Standing parts.** Only a **standing** part is seated: by default each part directly under the root, or a part the
  entry marks `stands` (a building inside a group of buildings). Everything nested in a standing part, roofs,
  wall-walks, upper storeys, moves with it, so nothing is torn apart.
- **On the ground.** The app's ground is not the tiles' ground: hills are drawn 2.4 times as high, and period ground
  edits are laid over it. So each standing part moves from the real ground it was built on to the drawn one:
  - **rigid** (the default: a building, a tower, a gate): the whole part moves by the difference between the highest
    drawn ground and the highest real ground under its footprint (ADR 0056's one rule, on an outline read from the
    part's mesh: its corners, the middles of its sides and its centre, one function shared with `footprintSamples`).
    No corner is buried that the contributor had not buried on the real ground.
  - **footings carried down**, as ours are (`loadLandmark` already sends a rigid part's footing vertices to the drawn
    ground): any vertex of the part at or below the real ground under it is set the same depth below the drawn ground
    under it. A wall the contributor took down to the real ground on the downhill side therefore reaches the drawn
    ground too, stretched with its own geometry; nothing is invented. A part whose walls stop short of the real
    ground (a building on posts, a raised floor) keeps its gap, which is then true to the model. (A vertex below
    ground that is not a footing, a cellar floor, is moved the same way, which keeps its depth; the review looks.)
  - **follow** (an earthwork the entry marks so: a bank, a ditch, a road): each vertex keeps its height above the
    real ground and is set that far above the drawn ground.
  - The loader logs each standing part's move and any remaining gap (`dewidebug contrib seat`). The ⓘ says the hills
    are drawn higher than the buildings, as the vicus's does.
- **When.** A `when` range and dating as a `Feature` has (`datesExact`, `notBefore`, `notAfter`), with a provenance
  for the dates. A contribution that depicts one of our features lies within that feature's years (it may cover one
  phase); one that depicts something we do not draw gives its own dates and their basis (open question 5).
- **Beside our own model of the same place: one at a time.** The entry names the features it depicts (`depicts`).
  Layer off (the default): ours are drawn. Layer on: for the years the contribution is drawn, the depicted features'
  **meshes** are not drawn; their labels, places, flights and key dates stay.
  - **Their ground edits and clearings stay drawn.** Dropping a hidden feature's terraces would also pull the ground
    out from under features built on them at start (`editsBuiltOn`: Fort 1's backfilled ditches stand on Fort 2's
    terraces), leaving those floating or buried. So the swap hides meshes only, and the contribution's standing parts
    are seated on the drawn ground with the terraces in it. A test holds `editsDrawn` unchanged by the layer. If a
    contribution models its own ground (its own platforms), that is a later choice, recorded then.
  - **Depicting must match.** For each depicted feature drawn from a plan, the contribution's footprint (the outline of
    its standing parts' meshes) must lie within 10m of the plan's standing parts' outline at its centroid and overlap
    it by at least half of the smaller area; a model 200m off cannot hide a Coflein-placed fort.
  - **Undeclared overlap fails.** Overlap is by footprints, not clearing radii (`clearingMetres` is 1100m for the
    town): a contribution whose footprint meets the footprint of a plan feature drawn in overlapping years, without
    naming it in `depicts`, fails the build. Generated kinds (the town's map blocks, roundhouses, hall-houses) draw
    footprints only at run time, so a contribution inside one of those areas waits until an e2e check reads the drawn
    footprints (open question 4).
  - Rejected: both drawn at once (z-fighting, two ⓘ at one point); a ghost overlay (a second mode; perhaps a later
    "compare" toggle); ours always wins (the layer would show nothing where contributors work); hiding the depicted
    feature's ground edits too (breaks `editsBuiltOn`); swapping individual parts of our merged models (later, if a
    contribution covers part of a site).

## 5. The layer

**Recommendation: a "Contributed" toggle beside Photos, off by default, remembered like Photos, hidden while there is
nothing to show.**

- **The switch.** A button in the brand row next to Photos, "Contributed" / "Cyfraniadau" (the Welsh is Claude's and
  unchecked, awaiting the parked Welsh check), with a tip saying these are models by other people, credited and
  labelled, not drawn from this project's plans. Remembered in `localStorage` inside a try/catch
  (`src/ui/contrib-pref.ts`, the shape of `photos-pref.ts`); `?contrib=1` or `?contrib=0` sets a link's first state.
  Hidden while `CONTRIBUTED` is empty. ADR 0058 found the row full; if a second toggle wraps it at 1280 pixels wide,
  Photos and Contributed fold into one "Layers" menu (a choice for the build, recorded then).
- **Off by default**, because a contribution is a reconstruction not drawn from our plans and replaces ours when on.
  Photos are on by default at Dewi's choice; he can reverse this the same way.
- **Debug.** `?debug` gains `contrib on|off` and per contribution `<id>=glb|loading|failed|low|out` (`out` = not drawn
  this year) with the features it hides, e.g. `contrib on fort2-example=glb hides roman-fort-b`.
- **Graphics levels.** High: the file's textures. Medium: textures halved on load. Low: not drawn; the button says why
  ("not at Low graphics") and our feature is drawn. `?models=off` hides it too.
- **Loading.** A contributed adapter on `loadLandmark`, so there is one loader that seats, merges and keeps the
  triangle-to-part table. It differs from our landmarks in three places: it skips the `_probe` check (placement is
  checked at build, section 6); it takes part ids, standing and fit from the entry, not from extras; and it **keeps
  the file's texture coordinates and base-colour textures** (our landmarks skip materials and compute their own
  coordinates), putting each texture on the app's building material (`solidMaterial`) so night dimming, fog, shadows
  and lamps treat a contributed part like ours. PBR metal and roughness are dropped, as our material has none.
- **Budgets** (checked by the build test). A committed contribution: at most 150,000 triangles and 16 draw calls
  after merging by material (`MODEL_BUDGET.near`), and **1.5MB including its textures** (`MODEL_BUDGET.near.bytes`),
  textures at most 1024 by 1024, so the repository grows no faster than for our own models. A larger file would be a
  release asset, as the terrain is (ADR 0058), which needs Dewi's word (open question 6). Fetched only when the layer
  is on and its years are first drawn, so start-up is unchanged. One level (no far model). Frame cost with the layer
  on and off is measured on the GPU and recorded in CLAUDE.md's numbers line.
- **The guess game** draws the layer as the visitor left it; the toggle is disabled during a round.

## 6. Intake and review

**Recommendation: a pull request with the file, a typed entry and a research note; a build-time test that refuses
anything malformed; merged under the while-away rule only when CI is green and an independent review finds nothing
CRITICAL or IMPORTANT, and otherwise when Dewi says.**

- **What a pull request adds:** `public/models/contributed/<id>.glb` (or the `.dae` and its textures, which we convert),
  an entry in `src/content/contributed.ts`, `docs/research/contributed-<id>.md`, and in the pull request text the
  licence and each texture's origin. Our side takes the screenshots.
- **The build test** (`tests/contributed.test.ts`, run by `npm run check` and CI), for every entry:
  - the glb parses as glTF 2.0, uses no extension outside a short allow-list, has no animations, cameras or lights;
  - the part tree of section 1: root found, every mesh under a part, names valid and unique, the parts in the file and
    the entry the same set (patterns expanded); the tree is printed;
  - placement: within 500m of `at`, inside the ten-mile circle, inside a 2m LiDAR area; each **standing** part's lowest
    point within 3m of the real ground under it (catches a model built at y = 0, in inches, or turned the wrong way;
    nested parts are not tested, since roofs and wall-walks stand high by design); for `depicts`, the footprint match
    of section 4; no undeclared footprint overlap;
  - the tiles' `sceneOriginBng` equals `CONTRIBUTION_FRAME` (or the entry names the frame it uses);
  - the budgets of section 5; an asset record with an allowed licence; `when` within every depicted feature's years.
  The compiler checks the provenance union, and `tests/content.test.ts` checks every source id exists.
- **Fixtures.** `tests/fixtures/` holds two small fixtures made by our own script and never shown to visitors: a `.dae`
  in inches, Z-up, with exporter-style structural nodes (a scene root, unnamed holders, definition-named meshes), and
  the `.glb` the converter makes of it. Each rule is seen to fail and pass on broken copies before any real
  contribution exists. Milestone 1 replaces the guessed `.dae` with a real SketchUp export.
- **The e2e, before any contribution.** `?contrib-fixture` (with `?debug`) adds the fixture entry from a lazily loaded
  module, and the e2e serves the fixture glb by route from `tests/fixtures/`, so nothing is published under `public/`.
  It checks: the toggle appears, on draws the fixture and hides the depicted feature's meshes but not its terraces,
  a click opens the ⓘ with the "Contributed model" header and credit, off restores ours, Low hides it.
- **The review checklist** (the second Opus): the entry and note against the sources they cite; every documented part
  cross-checked against two independent sources; every imagined part says what it is grounded in; the licence and
  texture origins; the seating log; screenshots at the contribution's years, layer on and off, on the GPU.
- **Merging.** While Dewi is away, a contributor's pull request may be merged when CI is green and the review finds
  nothing CRITICAL or IMPORTANT (his option, "Merge if green and reviewed"); otherwise, and once he is back, he has
  the final say. It ships in the next release, whose notes name it and its maker, so he can veto it there.
- **Updating or replacing a model** is a pull request that changes one glb and its entry; nothing else is rebuilt.

## 7. What gets built, and what the contributor does

### Our side, in order (each a commit with its tests, through the usual review)

1. **A real test export first.** Ask the contributor for a tiny SketchUp 2021 export (two boxes, one inside a named
   group, one a component instance used twice, one textured face) as `.dae`, and run it through Blender 4.0.2. That
   settles which names survive, the unit and axes, and the structural nodes, before anything is built on guesses.
   Asking is an outward message, so it goes through the usual approval. Until it arrives, work on the guessed fixture.
2. **Types and content.** `ContributionId`, `ContributedModel`, `CONTRIBUTION_FRAME`, `CONTRIBUTED` (empty) in
   `WorldContent`; `snapshotAt` lists the contributions drawn at the year. Unit tests for dating, `depicts` and the frame.
3. **The converter**: `npm run contributed -- <file.dae>`, Blender pinned to 4.0, printing the part tree.
4. **The build test and fixtures** of section 6, seen red for each rule; the outline seating function shared with
   `footprintSamples`; asset records made from `CONTRIBUTED`.
5. **The loader adapter** of section 5, with footings carried down.
6. **The layer**: through `FeatureLayer`, hiding depicted meshes but not their ground edits, the toggle and
   `contrib-pref.ts`, `?contrib=`, the debug line, Low and Medium, lazy fetching; and the fixture e2e of section 6.
7. **The ⓘ, picking, credits and downloads**: contributed meshes in `pickables()`, the header and tip, the About
   credits, the Downloads group (the test scanning `models/contributed/`, tier counts from `CONTRIBUTED`, the stamp).
8. **Docs**: the authoring guide `docs/content/contributed-models.md` (the text below, made current), the ADR's status,
   CLAUDE.md's Decisions row, the build log. Steps 2 to 8 ship with the button hidden.
9. **With the first real contribution**: its screenshots, a GPU frame measurement, and a release.

### The contributor's side (draft for a later reply on issue #5)

**Not to be posted until milestones 3 and 4 are built** (the converter and the part list do not exist yet), and then
through the usual approval.

> Here is how to send a model so it can appear in the app's contributed layer.
>
> 1. **Build it on our terrain, in its frame.** The terrain tiles are attached to each release (see the Downloads tab).
>    SketchUp 2021 has no glTF import, so they need the same conversion you used for our fort model; we have not
>    checked that their positions survive it, so please check that neighbouring tiles meet. If you started from one of
>    our models (they are placed round their own point, not on the tiles), move it onto the tiles first: each model's
>    file says where in its placement note (`atInTerrainScene`: metres east, up and minus north from the tiles' corner;
>    for Fort 2 that is 2190 east, 2038 north and 76.77 up, so in SketchUp red +2190, green +2038, blue +76.77; please
>    check against the tiles, as we have not tried it). Keep red east and green north, lined up with the tiles, and do
>    not geo-locate the model to true north. Leave heights as the tiles give them.
> 2. **Name the parts.** Put the whole model in one group with a short name (for example `fort2-yourname`). Make each
>    building its own group or component instance directly inside it, with its own name in lower-case letters, digits
>    and hyphens (`barrack-1`, `barrack-2`, `gate-ne`); things inside a building (`tower-left`, a roof) can be named
>    parts too, and move with it. Repeated components are fine, but give each copy its own name.
> 3. **On slopes**, take walls or a plinth down to the ground, as built: the app draws the hills higher than they are,
>    and carries walls that reach the ground down to its own ground.
> 4. **Export.** File > Export > 3D Model > COLLADA (.dae), with Preserve Component Hierarchies, Export Texture Maps and
>    Triangulate All Faces ticked, and Two-Sided Faces and Edges unticked. Send the .dae with its texture folder; we
>    convert it and send you the list of parts we found, so you can check nothing was lost.
> 5. **Say what it is based on**, for the model and each part or kind of part: what it shows, what it is based on (an
>    excavation plan, a survey, a comparison with another site, or your own judgement and what informed it), and the
>    reports, drawings or pages used. Where nothing records a detail, say what you based your guess on; it will be shown
>    as imagined. Say what each material stands for, and where each texture image came from.
> 6. **Say how to credit you and under what licence** others may reuse it (for example CC BY 4.0, as our models use, or
>    CC BY-NC 4.0). Only the name you give goes in the project. Keep the file small: about 1.5MB with its textures.
> 7. **Open a pull request**, or attach the files to the issue and we will make one. Once its checks pass and an
>    independent review finds nothing serious it may be merged (Dewi has the final say), and it then appears in the
>    next release, credited to you, with the "Contributed" button.

## 8. Risks and open questions for Dewi

**Open questions**

1. **Licence when none is stated.** May a contribution with no stated licence use the GitHub-issue wording, extending
   ADR 0026's 2026-10-09 exception from issues #1 and #3 to #4 and #5? Until then it waits.
2. **SketchUp's own textures.** May textures from SketchUp's built-in material library be published in the public repo?
   Their terms are not known to us; until then they are held back.
3. **Instead of ours, or beside it?** Our 2026-10-23 reply on #4 said contributed models would be shown "alongside our
   own". The design draws a contribution instead of our model of the same feature while the layer is on (never both in
   one place), and ours when it is off. Is that what Dewi means, and is off by default right (Photos went on)?
4. **Generated areas and partial models.** Should contributions inside the town or a roundhouse area wait for a
   run-time footprint check, as designed; and should a model of part of a site (one gatehouse) replace the whole
   feature, or wait for part-level swapping?
5. **Things we do not draw**: allowed with their own dates and provenance, as designed, or only reconstructions of what
   we show?
6. **Size.** Committed contributions are capped at 1.5MB each, like our models. Should larger ones be release assets
   like the terrain, refused, or committed with a higher cap? Binaries in git cannot be removed later.

**Risks**

- **The route is unverified.** No step of the SketchUp export has been tried; milestone 1 exists for this, and the part
  rule, the frame and the guide may change after it.
- **Seating.** A part whose walls stop short of the real ground keeps a gap on the drawn, steeper ground; the footing
  rule fixes the rest.
- **Over-trust.** A textured contributed model may look more authoritative than our plain ones; the header, the tip,
  the tiers, default-off and the review are the defences.
- **Repository size**, bounded by the cap (open question 6).
- **Unreviewed text.** Part names and notes come from outside; they are reviewed text in a typed file, rendered as
  text, never as HTML.

## Review 2026-10-23

The second-Opus review of the first version found 0 CRITICAL and 10 IMPORTANT findings. Each was checked against the
code before acting on it; all ten were accepted, none rejected:

1. Seating every rigid part tore nested parts apart, and the 3m test failed raised parts: now only standing parts are
   seated and tested; nested parts move with them (sections 4, 6).
2. ADR 0056's walls-carried-down half was dropped, though `loadLandmark` already carries our footings down
   (`src/world/landmarks.ts`, the `below` rule): footings now go the same depth below the drawn ground (section 4).
3. A model 200m off could hide a Coflein-placed feature: `depicts` now needs a footprint match, and overlap is by
   footprints, not `clearingMetres` (section 4).
4. Hiding a feature dropped its terraces, which `editsBuiltOn` built others on: the swap now hides meshes only, with a
   test (section 4).
5. The frame was today's region corner from `lidar-areas.json`: now a named constant with a test (section 1).
6. The Downloads claims were wrong (the test scans landmarks and the train only; tier counts come from extras): now a
   milestone with both fixed (sections 3, 7).
7. The unverified step came last and nothing ran in a browser before a real contribution: a real test export is now
   milestone 1, structural nodes are defined, and a fixture e2e is built now (sections 1, 6, 7).
8. 8MB a file and 40MB a layer contradicted ADR 0058's keeping terrain out of history: now 1.5MB a file, and an open
   question (sections 5, 8).
9. "No stated basis, imagined" broke the rule that imagined says what it is grounded in: unexplained parts are refused,
   and the two-source check is on the review list (sections 2, 6).
10. The contributor guide overpromised: merging is conditional with Dewi's final say, the guide waits for milestones 3
    and 4, and it explains the tiles in SketchUp 2021 and moving onto them (section 7).

Suggestions also taken: the probe reference is fixed and the adapter skips `_probe`; the adapter keeps the file's
texture coordinates and base colour; "instead of ours" is open question 3; the licence line cites ADR 0026's list
without new reasoning; issue #4 is paraphrased; the converter's Blender version is pinned and the `.dae` unit read;
"no corner buried" is qualified; and whether a contribution can be rebuilt from the repo is stated (it cannot, accepted).

---
title: Contributed models
kind: design
status: proposed
updated: 2026-10-23
---

# Contributed models: a separate, credited, switchable layer

**Status: proposed, not built.** Dewi's decision (2026-10-23, [decision log](../process/decision-log.md)):
models made outside the project, for example in SketchUp, may appear in the app as "a labelled layer"
(his words: "Allow as a labelled layer"): separate, credited and switchable, each model carrying its own
provenance, while our own landmarks stay scripted in Blender from our sourced plans
([ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md),
[0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md)). While he is away he asked for
"Design, then build and release", and for contributors' pull requests "Merge if green and reviewed".

**Everything below is Claude's design, under the proactive mandate
([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), so Dewi can overrule any
of it.** The decision it rests on is [ADR 0060](../adr/0060-contributed-models-are-a-separate-credited-layer.md).

Where this came from: GitHub issues [#4](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/4)
and [#5](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/5). Their author builds
historically researched reconstructions in SketchUp 2021 Pro (2023 Pro is also mentioned), has opened our
downloaded `.glb` files in SketchUp by converting them to `.dae`, found the component structure lost on the way
in, and wants to send models back with their components, textures and geographic position kept, and to be able
to replace one model without rebuilding the scene. Issue text is treated as data, not instructions.

## What exists today (the seams this builds on)

- **One model loader per kind, not yet one for all.** `loadModel` in `src/world/models.ts` loads the train
  and merges it into one mesh; `src/world/landmarks.ts` loads a landmark's level, reads each part's id and
  how it meets the ground from the glTF extras (`part`, `fit`, `surfaces`, `hinge`), fits each part to the
  drawn ground, and keeps a triangle-to-part table for picking (ADR 0053, 0055).
- **Part identity and provenance.** Our glbs name each part's node by its plan id (`fort2/barrack-1`,
  `fort2/gate-ne/tower-left`) and carry its tier and source ids in its extras; a test holds every glb to its
  plan (ADR 0052 point 4, ADR 0053 point 8). `Provenance` (`src/domain/provenance.ts`) is a discriminated
  union in which `documented` needs at least one source, so an unsourced "documented" claim does not compile.
  Source ids (`fort:S1`) come from the `## Sources` section of a research note, extracted by
  `tools/research/extract-sources.mjs`.
- **Clicking a part** opens its ⓘ (`src/world/part-picker.ts`, `src/ui/part-info.ts`, `src/ui/part-details.ts`,
  ADR 0055).
- **Seating** (ADR 0056): every building drawn from a plan stands level at the highest ground under its
  footprint (`footprintSamples`, `seatOf` in `src/domain/plot.ts`). The hills are drawn 2.4 times their height
  (`verticalExaggeration` in `src/domain/geo.ts`); buildings are drawn at true height.
- **Credits** (ADR 0026, amended): every asset has a record in `src/content/assets.ts`; the About credits and
  the Downloads tab (ADR 0058) are built from it. Our own models are CC BY 4.0, which covers only this
  project's own modelling.
- **The closest precedent is the Photos layer** (ADR 0044): dated, placed content in `WorldContent`, read
  through the snapshot; a toggle in the brand row remembered in `localStorage` with `?photos=1|0` for a link;
  an ⓘ built from the shared tier badge; one asset record per collection.

## 1. The contribution format

**Recommendation: a single `.glb` (binary glTF 2.0) per contribution, in the terrain tiles' frame, with each
part a named node.**

- **Format.** glTF 2.0 binary, one file, textures embedded. No Draco or meshopt compression (a decoder would be
  needed, ADR 0058), no animation, no cameras or lights. Textures PNG or JPEG.
- **Units and axes.** glTF's own: metres, +Y up, right-handed. In our files x is metres east, y is metres up and
  z is minus the metres north (the placement note ADR 0058 stamps into every model). SketchUp's red axis is east
  and its green axis north by default, and the usual Z-up to Y-up conversion maps green (north) to glTF -Z, which
  is our convention; **this mapping is expected, not verified**, and the probe check in section 6 catches it if it
  is wrong.
- **Origin: the terrain tiles' scene.** Contributions are built where our terrain tiles open: origin at the
  region's south-west corner, E 260000 N 220500 on the British National Grid, with heights in the tiles' own
  metres (absolute, as the LiDAR gives them), not at y = 0. That is the frame the contributor already has when
  they open our downloaded tiles together (each tile's node is placed by its offset from that corner, ADR 0058),
  and building on the real ground is what issue #4 describes ("seeing if they fit onto these terrains"). One
  frame for every contribution means no anchor to declare and none to get wrong. Grid north, not true or
  magnetic north: align to the tiles, which are on the grid (the two differ by more than a degree here; the
  figure is from the standard convergence formula, about 1.6°, and not checked against a tool).
- **Part naming: mirror ours.** A part's id is the path of node names from the contribution's root node down to
  it, joined by `/`, so a SketchUp group named `fort2-example` holding a component instance named `barrack-1`
  gives the part `fort2-example/barrack-1`, like our `fort2/barrack-1`. Each name uses lower-case letters, digits
  and hyphens only (a `/` in a name, a Blender `.001` suffix or a duplicate fails the test), so the path is built
  from the tree rather than typed into a name. Repeated components (ten barracks) stay repeated, but each
  instance needs its own name, because each is clickable and has its own ⓘ; the content entry can give one
  provenance to a pattern (`barrack-*`). Geometry must sit under a named part; a part can hold sub-parts.
- **What SketchUp 2021 and 2023 can export** (searched 2026-10-23; nothing below was tried by us):
  - **No native glTF export found for 2021 or 2023.** SketchUp's help documents a native export to "GLTF Binary
    File (*.glb)" under File > Export > 3D Model, without naming a version
    ([SketchUp help, glTF](https://help.sketchup.com/en/sketchup/working-gltf-files)); press coverage dates
    glTF and USDZ support to the desktop SketchUp 2024 release, without saying whether that is import, export or
    both ([CG Channel, April 2024](https://www.cgchannel.com/2024/04/trimble-releases-sketchup-2024/)), and an
    earlier SketchUp forum thread (its date not checked) says SketchUp had no built-in glTF export and needed a plugin
    ([forum](https://forums.sketchup.com/t/export-to-glb-gltf/122021/4)). Not confirmed from Trimble's release
    notes. Whether the native exporter keeps component names as nodes is not stated on the help page.
  - **COLLADA (.dae) is built in** and its export options include "Preserve Component Hierarchies" (keeps the
    nesting of groups and components; unticked, the hierarchy is flattened), "Export Texture Maps", "Triangulate
    All Faces", "Export Two-Sided Faces" and "Export Edges"
    ([SketchUp help, COLLADA](https://help.sketchup.com/en/sketchup/importing-and-exporting-collada-files)).
    Whether the node names it writes come from the instance name or the definition name is not verified.
  - **A free Khronos glTF exporter extension** (by Centaur, on the Extension Warehouse) adds glTF export; a
    forum post says it was not verified past SketchUp 2016 but seemed to work in 2020, and an install guide warns
    the Warehouse may mark it incompatible with the SketchUp version
    ([forum](https://forums.sketchup.com/t/export-to-glb-gltf/122021/4),
    [HOLOPLOT guide](https://docs.holoplot.com/holoplot-plan/importing-3d-assets-from-sketchup/installing-the-khronos-gltf-exporter-for-sketchup)).
    An MIT fork was tested on 2017 and 2018 ([Yulio](https://github.com/YulioTech/SketchUp-glTF-Exporter-Ruby)).
    Unverified on 2021 and 2023, and whether it keeps component names is not stated.
  - **Blender's COLLADA importer** is in Blender 4.x (this machine has 4.0.2) but, by secondary sources, was
    removed in Blender 5.0 ([Blender devtalk](https://devtalk.blender.org/t/moving-collada-i-o-to-legacy-status/34621?page=2)).
- **The simplest working route for the contributor: send a `.dae`, and we convert it.** From SketchUp 2021 or
  2023: File > Export > 3D Model > COLLADA, with Preserve Component Hierarchies, Export Texture Maps and
  Triangulate All Faces ticked, and Two-Sided Faces and Edges unticked. We add `npm run contributed -- <file.dae>`
  (a headless Blender 4.0 script, like `npm run models`), which imports the `.dae`, checks the names, and
  exports the `.glb` that is committed and reviewed. The contributor needs no Blender and no extension. A
  contributor who has a working glTF exporter (the extension, or SketchUp 2024 or later) may send the `.glb`
  directly. Either way the test in section 6 prints the part tree it found, so a lost structure shows at once.
  - Rejected: requiring the contributor to run Blender (another tool to learn, and a step our script does
    deterministically); requiring the Khronos extension (unverified on their version); accepting `.skp`
    (proprietary, and our side would need SketchUp).

## 2. Provenance

**Recommendation: every part's provenance is written in a typed content entry, in our existing `Provenance`
union, and the ⓘ says first that this is a contributor's model, not ours.**

- **Where it lives.** One entry per contribution in `src/content/contributed.ts`, typed by a new
  `ContributedModel` in `src/domain/model.ts`: a branded `ContributionId`, the file, where and when it is drawn
  (section 4), which of our features it depicts, its credit and licence (section 3), a provenance for the model
  as a whole, and a map from each part id (or pattern) to its name in English and Welsh, its provenance and how
  it meets the ground. The glb carries geometry only; nothing in its extras is trusted, because SketchUp cannot
  write them and a contributor's tool chain may drop them. (Ours come from our build sheet; theirs come from a
  reviewed TypeScript file, which the compiler checks.)
- **The three tiers, unchanged.** Documented needs at least one source (a compile error otherwise);
  reconstructed says what it is based on; imagined says what it is grounded in. A contributor's reconstruction of
  a fort is, part by part, the same kind of claim as ours, so the same rules apply: a barrack drawn from the
  excavated plan may be reconstructed with that source; a roof pitch nobody recorded is imagined.
- **Sources.** The contributor's sources go in a research note, `docs/research/contributed-<id>.md`, with a
  `## Sources` section that `extract-sources.mjs` turns into ids (`<prefix>:S1`), and a short account of what
  each part and each material is based on. Parts may also cite our existing ids (`fort:S1`). The note is a draft
  until independently checked, like ours.
- **Textures are claims too** (ADR 0052's amendment). A stone or thatch texture says what a surface was made of,
  so the part's basis covers its materials, and the note says which material stands for what.
- **No stated basis.** A part, or a whole model, sent with nothing to say what it rests on is still shown, as
  **imagined**, with the basis "The contributor's own design; they did not say what it is based on." It is never
  shown as documented without sources, and the review does not promote it. A part the entry does not list fails
  the build, so nothing on screen can lack an ⓘ.
- **The ⓘ.** The part panel (`part-details.ts`) gains a header line before the tier: "Contributed model: made by
  ⟨credit⟩, not by this project; its shapes are theirs, not drawn from our plans", in both languages, then the
  part's tier, basis and sources as for our parts, then the credit and licence. A contributed part is also marked
  in the hover tip ("contributed"), so it is never mistaken for ours even before a click.
- Rejected: provenance in the glb's extras (SketchUp cannot write them, and a file is not a reviewed source);
  one provenance per model only (a model whose walls are excavated and whose roofs are guessed would read as one
  or the other, which the part-by-part model exists to avoid); a fourth tier, "contributed" (who made a model and
  how sure we are of it are different questions: the tier says the second, the header the first).

## 3. Credit and licence

**Recommendation: one asset-manifest record per contribution, made from its entry, with the credit the
contributor asks for and the licence they state; our CC BY 4.0 does not cover it.**

- **The record.** `ASSETS` gains one row per contribution, built from `CONTRIBUTED` (as the texture rows are
  built from `SURFACES`): files `^models/contributed/<id>\.glb$`, what it is, the contributor's credit and a link
  to the pull request or issue, and the licence.
- **The licence.** The contributor is the author and is present, so the pull request states a licence: any
  allowed by [ADR 0026](../adr/0026-open-licences-including-nc.md) (CC0, CC BY, CC BY-SA, CC BY-NC, CC BY-NC-SA),
  never "all rights reserved" and not ND (the app moves parts onto its ground, which is an adaptation). If they
  state none, the record uses the GitHub-issue wording, "Not checked: used with credit at Dewi's request", as the
  material from issues #1 and #3 does. **That exception was granted for issues #1 and #3 only** (ADR 0026,
  amended 2026-10-09), so using it here needs Dewi's word; until then a contribution with no stated licence waits
  (open question 1).
- **Textures inside the file** are part of the contribution and need their origin stated in the pull request: a
  photograph the contributor took, an open-licence library, or SketchUp's own material library, whose terms for
  redistribution in a public repository are not known to us (open question 2).
- **Where the credit shows.** In the part ⓘ (section 2), in the About credits (from the record, through
  `src/ui/credit.ts`, as now), and in the Downloads tab, which lists every geometry glb under `public/models`
  (ADR 0058's test would fail an unlisted one): contributed files are listed in their own "Contributed models"
  group with their credit and licence, and `npm run downloads` stamps the same credit and licence into the file's
  `asset` block and first scene's extras, touching nothing else.
- **Our licence does not reach it.** Our CC BY 4.0 covers this project's own modelling only (ADR 0058, amended;
  kept by Dewi on 2026-10-23: "Keep CC BY 4.0"). A contribution keeps its own licence, and the About text says so.
  A contribution built on top of one of our downloaded models must also carry our credit, as CC BY asks; the
  record's credit then names both.
- **Personal data.** Only the name the contributor chooses for the credit goes in the repo. Contact details
  that arrive in issue comments (for example an email signature) are never copied.

## 4. Placement and time

**Recommendation: placed in the tiles' frame, seated by ADR 0056's rule part by part, drawn for its own dated
range, and drawn instead of our model of the same feature while the layer is on.**

- **Where.** The frame of section 1 places it on the grid; the entry also gives `at`, a grid reference taken
  from Coflein or Cadw for the site it shows (CLAUDE.md's placement rule), used for its label, a flight to it and
  the build check that the model is where it says.
- **On the ground.** The app's ground is not the tiles' ground: hills are drawn 2.4 times as high, and period
  ground edits (the forts' terraces) are laid over it. So each part is moved to the drawn ground as the
  contributor placed it on the real one:
  - **rigid** (the default: a building, a tower, a gate): the whole part moves up or down by the difference
    between the highest drawn ground and the highest real ground under its footprint, so it stands on the drawn
    ground exactly as it stood on the tiles, level, with no corner buried. That is ADR 0056's one rule, applied
    to an outline read from the part's mesh (its plan outline's corners, the middles of its sides and its centre,
    one function shared with `footprintSamples`, not a second copy of the rule).
  - **follow** (an earthwork the entry marks so: a bank, a ditch, a road): each vertex keeps its height above the
    real ground and is set that far above the drawn ground.
  - **What does not fit.** On a slope, a rigid part's downhill side stood on real ground that falls less steeply
    than the drawn ground, so it shows a gap under it of up to 1.4 times the real fall across it. The app does not
    invent walls under someone else's model; the guide asks contributors to carry walls or a plinth below the
    ground on the downhill side (real ground, as built), the loader logs each part's gap
    (`dewidebug contrib seat`), and the review looks at it. The ⓘ says the hills are drawn higher than the
    buildings, as the vicus's ⓘ does.
- **When.** A `when` range and dating, exactly as a `Feature` has (`datesExact`, `notBefore`, `notAfter`), with a
  provenance for the dates. A contribution that depicts one of our features must lie within that feature's years
  (it may cover one phase of it); one that depicts something we do not draw gives its own dates and their basis.
- **Beside our own model of the same place: one at a time, the contribution wins while the layer is on.**
  The entry names the features it depicts (`depicts`). With the layer off (the default), ours are drawn and the
  contribution is not. With it on, for the years the contribution is drawn, the features it depicts are not:
  their meshes, and with them their ground edits and clearings, which already follow the set of features drawn
  (ADR 0056 point 3). Labels, places, flights and key dates stay. A contribution that overlaps a feature of ours
  in place and years without naming it in `depicts` fails the build, so two models never stand in one place.
  - Rejected: both drawn at once (they would z-fight and a click could open either ⓘ); a ghost overlay of one over
    the other (a nice comparison, but a second mode; it could come later as a "compare" toggle); ours always wins
    (then the layer shows nothing where contributors most want to work); swapping individual parts of our model
    (ours are merged meshes, ADR 0055; a later step if a contribution covers only part of a site, open question 4).

## 5. The layer

**Recommendation: a "Contributed" toggle beside Photos, off by default, remembered like Photos, hidden while
there is nothing to show.**

- **The switch.** A button in the brand row next to Photos, labelled "Contributed" / "Cyfraniadau" (the Welsh is
  Claude's and unchecked, like the rest awaiting the parked Welsh check), with a tip saying these are models by
  other people, credited and labelled, and not drawn from this project's plans. Remembered in `localStorage`
  inside a try/catch (`src/ui/contrib-pref.ts`, the shape of `photos-pref.ts`); `?contrib=1` or `?contrib=0` sets
  the first state of a link. The button is not shown while `CONTRIBUTED` is empty, so the layer can be built and
  merged before the first model arrives. ADR 0058 found the row full; if a second toggle makes it wrap at
  1280 pixels wide, Photos and Contributed fold into one "Layers" menu (a choice for the build, recorded then).
- **Off by default.** Photos are on by default (Dewi, 2026-10-10), but photographs are records; a contributed
  model is a reconstruction that has not been through our plans, and turning it on replaces our model of the same
  place. So a visitor asks for it. Dewi can reverse this as he did for Photos.
- **Debug.** `?debug` gains `contrib on|off` and one entry per contribution: `<id>=glb|loading|failed|low|out`
  (`out` = not drawn this year) and the features it is hiding, e.g. `contrib on fort2-example=glb hides roman-fort-b`.
- **Graphics levels.** High: the file's textures up to 2048 pixels. Medium: textures halved on load (at most
  1024). Low: the layer is not drawn and the button says why ("not at Low graphics"), because Low sheds cost and
  draws our procedural plans; our feature is drawn there instead. `?models=off` hides the layer too.
- **Materials.** The loader turns each glTF material into the app's own building material (`solidMaterial`) with
  the file's base-colour texture, so night dimming, fog, shadows and lamps treat a contributed part like ours;
  PBR metal and roughness are dropped, as our building material has none (ADR 0055).
- **Budgets** (per contribution, checked by the build test): at most 150,000 triangles (our near budget,
  `MODEL_BUDGET`), 16 draw calls after the loader merges parts by material, 8MB for the file with its textures,
  textures at most 2048 by 2048 and 16 of them. For the layer: at most 40MB across all contributions, each
  fetched only when the layer is on and its years are first drawn, so start-up is unchanged. One level only (no
  far model); if several contributions make the overview slow, an optional `.far.glb` is the next step. Frame
  cost with the layer on and off is measured on the GPU (`npm run e2e:gpu`) and recorded in CLAUDE.md's numbers
  line, as for every model.
- **The guess game** draws the layer as the visitor left it; the toggle is disabled during a round, so the scene
  cannot change under a guess.

## 6. Intake and review

**Recommendation: a pull request with the file, a typed entry, a research note and screenshots; a build-time
test that refuses anything malformed; merged when CI is green and an independent review finds nothing CRITICAL
or IMPORTANT.**

- **What a pull request adds.**
  - `public/models/contributed/<id>.glb` (or the `.dae` and its textures, which we convert and commit as the
    `.glb`; the `.dae` is not committed);
  - an entry in `src/content/contributed.ts`;
  - `docs/research/contributed-<id>.md`: what it shows, what each part and material is based on, and its sources;
  - the licence statement and texture origins in the pull request text;
  - screenshots are taken by our side at the years it is drawn.
- **The build test** (`tests/contributed.test.ts`, run by `npm run check` and CI), for every entry:
  - the glb parses as glTF 2.0, uses no extension outside a short allow-list (no Draco, meshopt or KTX2), and has
    no animations, cameras or lights;
  - its part tree: every name is lower-case with hyphens, no duplicates or `.001` suffixes, every mesh lies under
    a listed part, and the parts in the file and in the entry are the same set (patterns expanded); the test
    prints the tree it found;
  - placement: the model's plan bounds lie within 500m of the entry's `at`, inside the ten-mile circle, and
    inside a 2m LiDAR area (a contribution outside one waits for its area, as our castles do); each rigid part's
    lowest point is within 3m of the real ground under it, which catches a model built at y = 0, in the wrong
    units or turned the wrong way;
  - the budgets of section 5;
  - an asset record exists and its licence is an allowed one (or the approved exception);
  - `when` lies within the years of every feature in `depicts`, and no undeclared overlap with our features
    (section 4).
  The provenance itself is checked by the compiler (the union) and the integrity tests in `tests/content.test.ts`
  (every source id exists). A tiny fixture glb under `tests/fixtures/` (made by our own script, never shown in the
  app) lets every rule be seen to fail and pass before any real contribution exists.
- **The review path.** CI green, then an independent review (the second Opus), which reads the entry and the note
  against the sources they cite, the tiers against what the sources say, the licence and texture origins, the
  screenshots at the years it is drawn (layer on and off), and the seating gaps from the log. Its CRITICAL and
  IMPORTANT findings are fixed or the pull request waits. While Dewi is away that is enough to merge ("Merge if
  green and reviewed"); a contribution then ships in the next release, whose notes say what it is and who made it,
  so he can veto it there.
- **Updating or replacing a model** is a pull request that changes one glb and its entry; nothing else is rebuilt,
  which is what issue #5 asked for.

## 7. What gets built, and what the contributor does

### Our side, in order (each a commit with its tests, through the usual review)

1. **Types and content.** `ContributionId`, `ContributedModel` (place, dating, `depicts`, credit, licence, model and
   part provenance, fit) in `src/domain/model.ts`; `CONTRIBUTED` in `src/content/contributed.ts` (empty), added to
   `WorldContent`; `snapshotAt` lists the contributions drawn at the year. Unit tests for dating and `depicts`.
2. **The build test and its fixture** (section 6), seen red on a broken fixture for each rule, and the asset
   records made from `CONTRIBUTED`. The outline seating function shared with `footprintSamples`.
3. **The converter**: `npm run contributed -- <file.dae>` (headless Blender 4.0, `tools/contributed/`), which writes
   the glb and prints the part tree.
4. **The loader**: a contributed adapter on the landmark loader in `src/world/landmarks.ts` (part ids from the node
   tree and fit from the entry instead of extras; the file's materials mapped to ours), so there is still one
   loader that seats parts, merges them and keeps the triangle-to-part table.
5. **The layer**: drawn through `FeatureLayer` with the swap of `depicts`, the toggle and `contrib-pref.ts`,
   `?contrib=`, the debug line, Low and Medium behaviour, lazy fetching.
6. **The ⓘ and picking**: contributed meshes in `pickables()`, the "Contributed model" header and tip, the About
   credits and the Downloads group with the stamp.
7. **Docs**: the authoring guide `docs/content/contributed-models.md` (the text below, kept current), the ADR's
   status, CLAUDE.md's Decisions row, the build log.
8. **With the first real contribution**: its e2e (toggle on shows it and hides ours at its years, a click opens its
   ⓘ with the credit, off restores ours, Low hides it), screenshots, a GPU frame measurement, and a release.
   Until then steps 1 to 7 ship dark (the button is hidden while there is nothing to show).

### The contributor's side (draft text for a later reply on issue #5; not posted)

> Here is how to send a model so it can appear in the app's contributed layer.
>
> 1. **Build it on our terrain.** Open the terrain tiles from the Downloads tab (they are attached to each release)
>    and build on them where they land, in metres, without moving them. Keep SketchUp's red axis east and green
>    axis north, lined up with the tiles (they are on the British National Grid, so do not geo-locate the model to
>    true north). Heights stay as the tiles give them.
> 2. **Name the parts.** Put the whole model in one group with a short name (for example `fort2-yourname`). Make
>    each thing someone might click on its own group or component instance with its own name in lower-case
>    letters, digits and hyphens: `barrack-1`, `barrack-2`, `gate-ne`, and inside a gate `tower-left`. Repeated
>    components are fine, but give each copy its own name.
> 3. **On slopes**, carry walls or a plinth down to the ground on the downhill side: the app draws the hills higher
>    than they are and moves each building to stand level on its highest ground, so a building with no wall below
>    its floor can show a gap under its lower side.
> 4. **Export.** From SketchUp 2021 or 2023, File > Export > 3D Model > COLLADA (.dae), with Preserve Component
>    Hierarchies, Export Texture Maps and Triangulate All Faces ticked, and Two-Sided Faces and Edges unticked.
>    Send the .dae with its texture folder; we convert it to .glb and show you the list of parts we found, so you
>    can check nothing was lost. If you have a glTF exporter that works, a .glb is fine too.
> 5. **Say what it is based on.** For the model and for each part (or each kind of part, such as all the barracks):
>    what it shows, what it is based on (an excavation plan, a survey, a comparison with another site, or your own
>    judgement), and the reports, drawings or pages you used. Where nothing records a detail, say so; it will be
>    shown as imagined, which is fine. Say what each material or texture stands for, and where each texture image
>    came from.
> 6. **Say how to credit you and under what licence** others may reuse the model (for example CC BY 4.0, which is
>    what our own models use, or CC BY-NC 4.0). Only the name you give for the credit goes in the project.
> 7. **Open a pull request** with these, or attach them to the issue and we will make the pull request for you. It
>    is merged once the checks pass and an independent review finds nothing serious; it then appears in the next
>    release, credited to you, switched on with the "Contributed" button, in place of our model of the same place
>    for the years it covers.

## 8. Risks and open questions for Dewi

**Open questions**

1. **Licence when none is stated.** May a contribution with no stated licence use the GitHub-issue wording ("Not
   checked: used with credit at Dewi's request"), extending ADR 0026's 2026-10-09 exception from issues #1 and #3
   to #4 and #5? The design asks the contributor for a licence first and waits otherwise.
2. **SketchUp's own textures.** If a model uses textures from SketchUp's built-in material library, may they be
   published in the public repo? Their redistribution terms are not known to us; the design asks for each
   texture's origin and holds back any whose terms are unknown.
3. **Off by default?** Claude chose off (a reconstruction not drawn from our plans, which replaces ours when on).
   Photos went the other way at Dewi's choice.
4. **Partial models.** If a contribution covers only part of a site (one gatehouse of Fort 2), should it replace
   the whole fort while the layer is on, or should we build part-level swapping of our merged models (more work)?
   The design allows whole-feature swaps only.
5. **A contribution of something we do not draw** (a building at a site with no feature of ours): allowed with its
   own dates and provenance, as designed, or only reconstructions of what we already show?

**Risks**

- **The route is unverified.** No step of the SketchUp export has been tried here, and whether names survive the
  `.dae` export is not known; the converter's printed part tree is the first real test, and the guide may need
  changing after it.
- **The seating gap.** Drawn hills are 2.4 times as steep as real ones, so a building fitted to the real slope can
  show a gap on its downhill side; the contributor's walls below ground and the review are the only fix, short of
  drawing contributions on true-height ground.
- **Over-trust.** A carefully textured contributed model may look more authoritative than our plain ones. The
  header line, the tip, the tiers and default-off are the defences; the review must not raise a tier for looks
  (ADR 0052 point 5).
- **Repository size.** Textured models are binaries in the history for ever; the 8MB and 40MB caps bound it, and a
  model over them would have to be a release asset like the terrain (ADR 0058), which is a later change.
- **Unreviewed text.** Part names and notes come from outside; they are reviewed text in a typed file, rendered as
  text, never as HTML.

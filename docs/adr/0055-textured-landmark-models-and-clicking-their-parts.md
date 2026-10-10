---
title: "ADR 0055: Textured landmark models: sourced surfaces, shared photographs, and clicking a part in 3D"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0055: Textured landmark models: sourced surfaces, shared photographs, and clicking a part in 3D

- **Status:** Accepted. Phase 2 of the Blender models, built for the Roman forts. Amends
  [ADR 0053](0053-the-blender-pipeline-sheet-script-fitted-gltf.md): the near level now carries each part's surfaces,
  the finisher drops Blender's materials and writes byte colours, the near draw-call budget is 16, and the turf kit's
  courses are 0.15m. Numbered 0055 because another branch also wants 0054.
- **Date:** 2026-10-10
- **Decided by:** Dewi made the four decisions this carries out, in his words: "Get proper textures" (option B in
  [`design/models.md`](../design/models.md), [ADR 0052](0052-landmarks-are-scripted-blender-models-built-from-their-plans.md)'s
  amendment), "Commit them" (the `.glb` files, with the staleness test), "Today's simple model" (what Low shows) and
  "Yes, click parts in 3D" (hover highlights a part, a click opens its ⓘ). Everything below about how (the surfaces,
  the photographs and their treatment, the file format, the coordinates, the veil, the panel, the budgets) is
  Claude's, under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
  so Dewi can overrule any of it.

## Context

Phase 1 ([ADR 0053](0053-the-blender-pipeline-sheet-script-fitted-gltf.md)) drew the forts from Blender in vertex
colours only. A texture is a claim about what a surface was made of, so each needs research and an open licence
(ADR 0052's amendment, [ADR 0026](0026-open-licences-including-nc.md)); ADR 0046 rules out stone, tile and limewash on
the forts. The near level must stay within the design note's budgets (1.5MB a phase, 256MB of textures app-wide), the
far level must keep the valley's flat palette, and Low draws no model at all. A part has to be clickable without
fighting the map-style camera ([ADR 0050](0050-map-style-camera-controls.md)), the photo pins, the labels, the bubbles,
the train follow or a cutscene.

## Decision

1. **Six surfaces, each with a provenance.** `src/domain/surfaces.ts` names what a face shows: a plan material, or
   `turf-face` (a turf bank's courses) or `shingle` (a shingle roof's courses), which a kit adds. `partSurfaces(part)`
   says which surfaces a part's near model shows, from its material, its roof and its kits; the build sheet carries
   that list, the Blender script refuses to draw any other, the finisher refuses a model that disagrees, and a test
   holds every committed glb to it. The textured six are turf (the walk on top of a bank), turf-face, timber,
   shingle, daub and thatch. Each has an entry in `src/content/surfaces.ts` with a name in both languages and a
   provenance: reconstructed for turf-face, timber and daub, imagined for turf (whether the rampart's walk was grassed is not known), shingle and thatch, never documented
   (a photograph of a modern surface cannot document an ancient one). The research is
   [`research/fort-surfaces.md`](../research/fort-surfaces.md).
2. **The photographs are shared files, tinted to the palette.** Each surface has one CC0 photograph from Poly Haven
   (`Grass Ground`, `Excavated Soil Wall`, `Rough Wood`, `Wood Planks Grey`, `Clay Plaster`, `Thatch Roof Angled`),
   pinned by URL and MD5. `npm run textures` (`tools/textures/build.ts`, `process.py`) downloads them and writes a
   colour map and a normal map per surface at 1024 and 512 pixels, lossy WebP, to `public/textures/landmarks/`,
   committed like the models; a second `--force` run is byte-identical. The colour map is divided by its own mean so
   it averages mid-grey, and the app multiplies it by the face's vertex colour (the one palette) and by two: the model
   keeps the valley's colours, and the photograph adds only its light and dark (`look.detail` sets how much, tuned by
   eye). Shared files rather than textures inside each glb, so three forts carry one timber texture, the glbs stay
   small and a texture can change without a model rebuild. WebP rather than KTX2, so no transcoder is fetched. The
   maps on disk are tied to their settings by `src/content/generated/textures.ts`, which records each map's inputs
   (the photograph's MD5, `look.detail`, the size and `process.py`'s hash), and a test fails if they disagree.
3. **The app owns the materials.** `src/world/landmark-materials.ts` makes one material per textured surface, from
   the building material's own settings (`solidMaterial`), so night dimming, fog, shadows and lamps treat a textured
   part as its fallback. The colour map is read as linear data (it is a detail map, not a colour); Babylon clamps a
   material's diffuse colour before it meets the texture, so the factor of two is in the vertex colour
   (`DETAIL_MEAN`). A map that fails to load is dropped from its material and the diffuse colour set to that same
   mean, so the part keeps its palette colour (Babylon would draw a failed texture black). High uses the 1024 maps, Medium the 512 (`TEXTURE_SIZE`), swapped when the graphics level
   changes; Low draws the procedural plan as before. The far level is unchanged: flat palette, the building material.
4. **The script says which way a texture runs; the app works out the coordinates.** Each near face gets a grain,
   UPRIGHT (up a wall, up a roof's slope) or LENGTHWISE (along a post, a board, a beam: its longest edge), written into
   its colour's alpha as `(code + 1) / 4`. The loader computes each triangle's coordinates in metres of the model's
   own frame (`src/domain/texturing.ts`), and the material repeats the photograph every as many metres as it covers
   (`photo.metres`, from the library), so a 600m rampart and a 0.4m post have the same texel density and nothing
   stretches. Both triangles of a flat quad get the same axes (a test was seen red when the diagonal ran the two ways).
   UVs were first written by Blender, which split every vertex per face and made Fort 1's near file 4.2MB; this keeps
   it at 1.30MB.
5. **The finisher writes surfaces and drops materials.** Blender exports one material per surface, so each part's
   primitives come out per surface; the finisher writes each part's surfaces into its extras in primitive order,
   deletes the materials, and converts the colours from 16-bit to bytes (half the colour data). The loader asks
   Babylon to make no materials (`skipMaterials`), which also stops the default material each load used to leave
   behind. It merges the parts into one mesh per textured surface plus one flat mesh, and each hinged leaf likewise.
6. **Click a part in 3D.** `src/world/part-picker.ts` picks against the model meshes on screen only
   (`FeatureLayer.pickables`), using each mesh's runs of triangles per part with a box round each
   (`src/domain/partpick.ts`): the boxes skip most of the mesh, so a pick on every pointer move (at most one a frame)
   stays cheap, and the ground is marched along the ray so a part behind a hill is not found. Hovering veils the part
   in a pale, slightly warm, translucent overlay that is the same by day and night (a highlight, not a colour that
   could read as a fact; a depth pre-pass means only the nearest of a part's overlapping layers blends, or a boarded
   tower would read as limewash), shows a tip with its name and its feature's, and turns the cursor to a pointer. A click
   (Babylon's tap, which a drag past the threshold never is) opens `src/ui/part-info.ts` beside the cursor: the part's
   name, feature, tier, basis, sources, kits and surfaces, the same body as the key date's parts list
   (`src/ui/part-details.ts`, now shared by both), in English and Welsh. A drag slides the land and opens nothing; a
   press on a pin, label or bubble never reaches the canvas; the train and a conversation are tried first; nothing
   is hovered or opened during a cutscene, a "When are we?" round, or before Begin. Escape or Close shuts the panel, and
   so does a cutscene or round beginning, or scrubbing to a year the part's feature is not drawn in.
7. **Every texture is an asset.** `ASSETS` gets one record per surface, made from `SURFACES`, so the credits page
   lists the photograph, its author, its page and CC0; a test fails a texture with no record or the wrong one. The
   ⓘ of each part lists its surfaces with their tiers and the photograph's credit.

## Consequences

- **Sizes** (2026-10-10): near glbs 1,293,492 bytes (Fort 1), 948,852 (Fort 2) and 140,724 (the settlement), against
  1,201,844, 896,372 and 151,592 before; Fort 1 has 80,834 triangles (69,074 before) and Fort 2 59,028 (51,188),
  because the turf courses halved to 0.15m; the far levels are a little smaller (byte colours). Textures:
  2.50MB to download at High, 0.57MB at Medium; on the GPU 12 maps × 1024² × 4 bytes with mipmaps is about 67MB at
  High and 17MB at Medium, under the 256MB budget. Fort 2's near model draws in 13 calls (five surfaces and eight
  leaves), so the near budget is 16, not 12: the design note's 12 was "one per material, plus hinged parts" and
  assumed fewer of each.
- **The turf kit changed**: courses are 0.15m, Vegetius's half Roman foot, at the top of the range measured in fort
  ramparts (Vindolanda's and Strageath's are thinner), and the faces and steps are soil, the turves laid grass side
  down as at Vindolanda and on the Antonine Wall; only the walk on top is grassed. The first textured build drew every
  step grassed, and at the app's viewing distances 0.15m steps alternating green and brown shimmered; soil faces
  take the colour contrast out, but the steps themselves still alias at 100m and beyond (a fine grid, most visible on
  the shaded side), because the 0.15m course is a sourced figure and is not coarsened to hide it. The faces take their
  own brown (`TURF_FACE`): the first build used the ditches' olive cut earth, which under the soil photograph read as
  a dark hedge, and the surface's detail and relief were lowered with it. The script holds no colour of its own for
  them.
- **What the camera allows**: the closest view is 100m (the camera's lower radius of 10 units), so a 0.5m timber
  texture is about ten pixels across; the photographs read as grain, courses and wear, not as close-up detail.
- **Not built**: roughness maps (the building material has no PBR), textures on the ditches and roads (the app draws
  them on its own ground), the `?tiers` view, a part's ⓘ from the procedural fallback (Low and `?models=off` show the
  parts list on the card instead), and textures for the other landmarks (none is modelled yet).

## Alternatives considered

- **UVs written by Blender.** The task brief asked for UVs from the script; written into the glb they split every
  vertex per face and took Fort 1 to 4.2MB, three times the budget. The script still decides how each face's texture
  runs; only the arithmetic moved to the app.
- **Textures inside each glb, or KTX2.** Duplicated per fort, and a transcoder to self-host; the glbs would also go
  stale on a texture change.
- **A texture array in one material** (one draw call). It needs a custom shader in GLSL and WGSL; 13 draw calls cost
  nothing measurable on the target GPU.
- **Babylon's own picking.** It tests every triangle of every pickable mesh, the terrain's 150,000 among them, on
  every pointer move; the part boxes make it a few hundred triangle tests.
- **An outline (HighlightLayer or `renderOutline`).** A post-process for the whole frame, or cracks on flat-shaded
  geometry; a translucent veil over the part's own triangles is cheap and reads at any distance.

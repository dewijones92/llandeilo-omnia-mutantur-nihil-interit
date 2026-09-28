---
title: Build log
kind: log
status: current
updated: 2026-09-28
---

# Build log

Milestones and what each one taught us. Newest last.

## 2026-09-26

1. **Discussion and CLAUDE.md**, adapted from the Totum repo: kept the twin laws (unified and DRY),
   the testing pyramid and "a visual change isn't verified until it has been looked at"; dropped
   everything Android-specific; added the historical-accuracy law.
2. **Research**: six parallel agents. They exhausted the shared WebSearch quota; later sections
   relied on WebFetch. See [`../research/process.md`](../research/process.md).
3. **Scaffold**: Vite, strict TypeScript 6 (typescript-eslint does not support TypeScript 7 yet),
   Babylon.js 9, ESLint strictTypeChecked, Prettier, knip, Vitest, Playwright, GitHub Actions to Pages.
4. **First render**: the real Tywi valley from OS Terrain 50. ACES tone-mapping greyed the sky, so
   the neutral tone-mapper replaced it; a sky dome would not take vertex colours, so a screen-space
   gradient layer replaced that.
5. **CI failed twice before the first deploy**, both times on checks doing their job: generated
   sources had been reformatted by Prettier (now excluded), and knip flagged exports not yet used.
   A pre-push hook now runs the fast checks locally.
6. **Features**: 40 era features, key dates, moment card, labels and camera flights. A mesh-merge
   crash (mixed vertex attributes) was only caught by looking at the page before deploying.
7. **Scale**: the first close-ups mixed true-size buildings with trees 40–60m tall and landmarks
   ×4.5. Unified to trees at about 20–30m, landmarks ×2.6, true footprints for towns and hillforts.
8. **Citations**: the finalised Victorian note renumbered its sources and dropped list bullets, so
   every Victorian citation failed to compile. That is the compile-time check working; citations
   were re-mapped by title.
9. **First deploy**: https://dewijones92.github.io/llandeilo-omnia-mutantur-nihil-interit/,
   verified by loading it in a browser, not just by the HTTP 200.
10. **Conversations, almanac, language, sound**: six family scenes with voices, 32 almanac
    entries, 12 language periods, procedural Web Audio ambience.
11. **Bundle**: `@babylonjs/core` barrel imports pulled in the whole engine (1.6MB gzipped). All
    Babylon imports now go through `src/world/babylon.ts`, which deep-imports only the modules used
    plus the side-effect modules they need (ray picking, layer and shadow scene components, thin
    instances): 387KB gzipped. A missing side-effect import fails only at runtime, so this was
    verified by screenshot and the full e2e suite on the production build.
12. **Independent Opus review** (code, and history plus visuals). Fixed: Roman forts 0.9km out
    of place, Younger Dryas on uncalibrated dates, the year readout printing raw floats, arrow keys
    snapping back to key dates, a listener leak per provenance badge, whole-terrain recolouring
    on nearly every scrub frame, purity-lint holes, no voice/text or asset-licence checks, and
    bilingual gaps. New e2e tests then found that the full-screen label and bubble layers were
    swallowing mouse input meant for the 3D view (`#app > *` outranked their `pointer-events:
    none`); now fixed and guarded by a test that fails on the old CSS.
13. **Verification review of the fixes** (a second Opus pass). Most fixes held, but six
    regressions had come in with them: disposing one smoke system destroyed the shared smoke
    texture, the render-once shadow map froze the moving train's shadow, the collapsed event card
    only updated on scrub, an automatic panel close stole keyboard focus, and three new content
    sentences were not in the research. All fixed; lessons: a shared resource must survive its
    consumers' disposal, and a "render once" cache needs every moving caster accounted for.

## 2026-09-28

14. **Previous/Next and camera shots**, then two review rounds. The first found snaps pulling the
    camera away and a quick second Next being lost; the second found Next stepping from the wrong
    place after a marker click. Each fix landed with an e2e test seen failing on the old code first.
    A Playwright lesson: at SwiftShader's 1fps, two sequential clicks never overlap an animation, so a
    race test must fire both clicks in one page task.
15. **ADRs and a what-goes-where table**; desktop only; no bundle limit; the dev server always on 5051.
16. **Research verified by a second agent**: the conversations-by-class note had 13 corrections
    (inexact quotes, an overstatement, two unsupported "cross-checked" labels) and stays a draft.
17. **The first Blender model**: the 1850s train, researched first from the 1858 Board of Trade report
    on the engine Victoria (a six-coupled Hackworth of 1841). Two traps: Blender applies scale on the
    object's own axes before rotation (the carriage roofs came out as discs), and glTF's handedness
    conversion is a mirror, so baking it into the vertices turns every face inside out; the model
    looked black until the winding was flipped back. The train is now a feature kind with dates and
    its own provenance, so the 1840s-type engine no longer runs through the 1990s.
18. **Compass and follow**: the compass maths is pure and unit-tested; following lives in the one camera
    seam (Flight), so any other flight ends it.
19. **Atmosphere: time of day, seasons, effects** ([`../design/atmosphere.md`](../design/atmosphere.md)).
    One pure function, `lightingAt(environment, clock)`, turns the era's sky colours and the chosen
    hour and season into every light the renderer reads, from the real solar geometry at 51.88°N;
    `seasonLook` does the same for land and trees, with the winter snow line moved by a climate
    "chill" per period cited to the deep-time note. Lessons: a sun that has just set leaves the
    land black unless the sky itself becomes the fill light (twilight ambient rose to 0.85, plus a
    low afterglow key light from the sun's side); depth of field blurs the background too, so the
    stars were bokeh until the aperture closes as they come out; `DynamicTexture` defaults to clamp
    addressing, so a scrolling star layer smeared its edge column into lines until set to wrap;
    windows at true scale are sub-pixel from the default close-up, so they only read nearer in;
    autumn trees on a green woodland floor glittered at overview scale until the floor under the
    woods turned russet with them. Screenshots were shot from a production build served by
    `vite preview`, because hot reloads from ongoing edits kept restarting dev-server pages
    mid-shot. An independent Opus review then found: a failing e2e expectation (winter 16:30 is
    dusk, not night); the sun disc drawn with the wrong Babylon `Layer` maths (a layer's UVs are
    screen-space, so a scaled layer shows a cut-out of a full-screen texture; the glow is now
    painted into the sky gradient by ray angle); the ripple texture clamping after its first tile
    (the same `DynamicTexture` default as the stars); shadow sampling using a newer light
    direction than the shadow map; three copies of the snow rule; climate keys cited to sources
    that do not cover their dates; smoke staying day-bright at night; and the phone summary
    vanishing after a resize. All fixed. A second review of the fixes found the stars jumping as the camera passed due
    south (a non-whole number of star tiles per turn), 12,500 BC wrongly treated as the coldest
    point when in calendar years it sits inside the milder Late Glacial interstadial (checked
    against a source and written into the research findings, with the existing environment
    keyframes raised as an open question), and muted panel text too faint over the night scene.
    All fixed. Bundle about +10KB (about 436KB gzipped; the size limit has since been removed, ADR 0016). Built in a worktree by a parallel agent and merged into main on 2026-09-28.

20. **Building models from the documented plans** (option A in
   [`../design/models.md`](../design/models.md), "accurate low-poly"). The generic `castle`,
   `church`, `abbey`, `mansion`, `bridge` and `tower` kinds became one `building` kind: a plan
   (`src/content/buildings.ts`, true metres, citing the research) plus a condition. One renderer
   draws every plan, with one builder per part type, and ruins come from each part's `ruin` data
   rather than from code. 26 models, about 27k triangles in all.
2. **Every face was inside out at first.** Square prisms and roofs looked fine, so nothing gave it
   away until round towers showed as crescents from above. Hiding the terrain proved the geometry
   was solid; flipping the winding fixed it. Babylon's front face is the reverse of the right-hand
   rule used in `sculpt.ts`, so check a new primitive from above, not only from the side.
3. **Two terrains.** `ground()` interpolates the 50m OS grid, but the rendered terrain is a Delaunay
   mesh of points about 105m apart, and on a crag they differ by several units. Landmarks now sit
   on the rendered surface (`src/domain/surface.ts`), and `platform` levels a ward to its summit so
   a castle 2.6× larger than life stands on its hill instead of draping down it.
4. **The OS footprint of a landmark is the same building.** A model now hides any OS footprint
   that contains its grid reference or lies under it. That removed the white 120–150m slabs beside
   Newton House and Golden Grove, and the town's copy of St Teilo's.
5. **Scale rule**: `landscape` plans ×2.6 in all axes; `map` plans (the church, the bridges) at true
   footprint with heights × the terrain's 2.4, because they must meet true-size streets and the drawn
   Tywi. Recorded in [`../content/authoring.md`](../content/authoring.md).
6. **Bundle**: 429.9KB → 443.1KB gzipped (the base was already well above the 387KB in CLAUDE.md).
   About 7KB of headroom is left under the 450KB budget.
7. **Independent Opus review**: no CRITICAL, 9 IMPORTANT, all fixed. Square towers ignored the plan's
   rotation, so St Teilo's tower and Newton House's turrets sat askew. A raised part (the Dinefwr
   summerhouse) still reached the ground and filled in the ruined stump. Round towers drew no
   battlements, because every edge was shorter than the merlon spacing. Landscape plans hid real
   neighbouring buildings (six near Talley). Three houses whose form is a guess were labelled
   documented. Two source contradictions were left unsaid (the summerhouse's date; an early
   18th-century rebuild of St Teilo's). The orientation notes were missing. Tests now pin the
   documented dimensions, platform convexity, the surface lookup and the footprint rule.
8. **e2e on a shared machine**: port 4173 was already serving another agent's build, and
   Playwright reuses an existing server locally, so the first run tested someone else's code. Rerun
   against this branch's own preview on a private port: 10 passed. Built in a worktree by a parallel agent and merged into main on 2026-09-28.


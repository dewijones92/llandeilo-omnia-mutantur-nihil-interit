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

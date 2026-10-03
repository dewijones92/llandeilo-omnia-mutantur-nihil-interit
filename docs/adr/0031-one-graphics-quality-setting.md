---
title: "ADR 0031: One graphics quality setting, High by default"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0031: One graphics quality setting, High by default

- **Status:** Accepted
- **Date:** 2026-10-03
- **Number:** written as 0028; renumbered to 0031 the same day because two other branches in flight
  had already taken 0028.

## Context

Dewi asked for the defaults to assume a powerful GPU, with a small High / Medium / Low menu ("dont
put too much effort in to this tho ... concentrate on high mode"). Until now the only switch was
`?fx=low`, a boolean passed to the world that turned depth of field off, while the shadow map size,
MSAA, bloom, sharpening, tree density and pixel-ratio cap were fixed in three different files.

## Decision

- One table, `QUALITY` in `src/domain/quality.ts` (pure TypeScript), holds every level's settings:
  shadow map size and filter, MSAA samples, bloom, depth of field, sharpening, tree density (the
  share of woodland ground triangles that carry a tree) and the pixel-ratio cap. Nothing else in the code decides these.
- `World` takes a `QualitySettings` and `setQuality()` applies a new one live: the shadow map is
  resized (clamped to the GPU's maximum texture size, and set back to render-on-demand, ADR 0013),
  the pipeline's effects toggle, the forest re-filters its trees and the engine's scaling changes.
- High: 8192² shadows with high PCF filtering, 4x MSAA, bloom, depth of field, sharpening, tree
  density 0.9, up to 2x device pixels. Medium: 2048², no bloom or depth of field, density 0.62 (the
  only density before this ADR, so Medium's woods look as they did), up to 1.5x. Low: 1024², low
  filtering, no MSAA or sharpening, density 0.31, 1x. Density changes how thick a wood looks, never
  where woodland is: that still comes from the sourced cover per era.
- The choice comes from `?quality=high|medium|low`, then `?fx=low` (kept as an alias for Low), then
  the viewer's remembered choice (`localStorage`, read and written in try/catch), then High. Only the
  menu writes the remembered choice; a link does not.
- `?debug` reads the state back from the renderer, not from the table: the shadow generator's map
  size and filter, the pipeline's samples and effect flags, the forest's drawn tree count and the
  engine's scaling (`quality low  shadows 1024/low  msaa 1  bloom off ... trees 6365  pixels 1.00`).
  A first version printed the table, so a test of it would have stayed green if nothing were applied;
  the review of 2026-10-03 caught that.

## Consequences

- Raising or lowering a level is a one-line change in one table, and a unit test holds that each
  level only sheds cost going down.
- The pixel-ratio cap moved from `engine.ts` into the quality setting, so High renders more pixels on
  a high-DPI screen than before (1.5x was the old cap).
- 8192² shadows were not measured on a real desktop GPU. Four e2e tests on SwiftShader took the same
  time with 8192 and 4096 (1.2 and 1.3 minutes), so CI is not slowed; on the WSL GPU the suite stays
  green. If scrubbing stutters on a real machine, the shadow re-render (every 150ms while scrubbing)
  is the first suspect, and the table is where to lower it.

## Alternatives considered

- Keeping the boolean and adding more booleans: each new effect would need another parameter.
- A full settings panel with one control per effect: more than Dewi asked for.
- Applying a change only after a reload: simpler, but every setting here can change live.

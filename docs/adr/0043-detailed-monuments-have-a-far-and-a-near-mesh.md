---
title: "ADR 0043: A detailed monument has a far and a near mesh, chosen by the camera's distance"
kind: adr
status: accepted
updated: 2026-10-09
---

# ADR 0043: A detailed monument has a far and a near mesh, chosen by the camera's distance

- **Status:** Accepted
- **Date:** 2026-10-09
- **Decided by:** Claude, under the proactive mandate (ADR 0027), for issue 3 (levels of detail); Dewi can
  overrule it.

## Context

The detailed Roman forts have 66 and 83 parts and about 4,500 and 3,800 triangles in full, of which the
barracks, breastworks, corner towers, gate fittings and the vicus's houses are too small to see from beyond a
couple of kilometres. The overview should stay fast and should not pay for them; the detail should show when
the camera comes in.

## Decision

A part may be marked `detail` (`PartMeta`). `buildPlan` takes a level: `far` leaves the detail parts out,
`near` draws all. A plan with any detail part is built twice, the second mesh instead of the first and not
beside it, and `FeatureLayer` keeps both, drawing one. Which one is a pure rule, `levelFor` in
`src/domain/lod.ts`: `near` inside 200 world units (2 km) of the monument, `far` beyond 230 (a 15% hold, so a
camera on the edge does not swap every frame). The layer checks each frame from the camera's position
(`setViewer`) and redraws the shadows when a monument swaps, since the shadow map is rendered once (ADR 0013).
The debug overlay names each monument's level (`detail roman-fort-a=near`) and each fort's part counts, and the
log says each swap. The key-date shots (160 units) are near, the site framing (420) is far.

What is detail: interiors (headquarters, commander's house, granaries, barracks), the timber breastwork, the
corner and interval towers, gate walkways and leaves, and the vicus's houses. What is not: the rampart, every
ditch, the gate passages and towers and the roads, so the circuit reads from afar.

## Consequences

A far fort is about 3,100 and 2,700 triangles, a near one 4,500 and 3,800; the saving is small now, but the
rule is general: any plan can mark parts as detail, and a later denser model costs nothing at the overview.
Each such plan holds two meshes in memory. Only whole plans swap; a monument's parts do not swap one by one.
Mesh counts are read in the e2e (`plan-standing-near` and `plan-standing-far`, enabled), and the swap is one
rule with a unit test, not renderer logic.

## Alternatives considered

Babylon's own LOD on a mesh (it swaps whole meshes by distance, but the two would not share the shadow,
clearing and presence handling the layer already does); instancing the barracks (the blocks are all
different sizes and heights on a slope, and are merged for the one draw call); a third, billboard level for
the overview (the forts are a few pixels there, and a billboard would draw them larger than true).

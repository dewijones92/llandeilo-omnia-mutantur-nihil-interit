---
title: Atmosphere: time of day, seasons and effects
kind: design
status: built
updated: 2026-09-28
---

# Atmosphere: time of day, seasons and effects

Dewi, 2026-09-28: *"I want this app to look amazing … effect trickery in WebGPU or the game engine …
seasons of year?? time of day???"*. **Built 2026-09-28** (first pass).

## What you can do

- **Time of day**: a slider in the brand card (0:00 to 24:00, keyboard-operable, its track painted
  with that season's sky through the day), a ▶ button that lets the day pass (about a minute for a
  whole day), and `?hour=6.5`. The readout names the phase (dawn, morning, midday, afternoon,
  evening, dusk, night) from where the sun actually is, so a winter 17:00 is night.
- **Season**: four buttons and `?season=spring|summer|autumn|winter`.
- **Default**: a summer evening, 17:30, with the sun low in the west behind the default camera.
- `?fx=low` switches off the costly effects (depth of field) for slow machines.

All of it is atmosphere, not a record: the group's tooltip says so in both languages. Nothing about
a particular day in a particular year is claimed.

## How it works (one seam)

- `src/domain/daylight.ts` is pure. `sunDirection` is the real solar geometry for Llandeilo's
  latitude (51.88°N) with a mid-season declination per season (mid-April, mid-July, mid-October,
  mid-January), in local solar time. `lightingAt(environment, clock)` turns the era's sky and sun
  colours plus the clock into everything the renderer needs: key light (sun, a low twilight
  afterglow from the sun's side, then the moon), ambient, sky gradient, horizon glow, fog and
  morning mist, stars, lit windows, the self-lit level of materials, shadow darkness and a warmth
  value for colour grading. `seasonLook(season, chill)` gives the land and tree tints and the snow
  line, and `snowCover` is the one rule for how much snow lies at a height (terrain and trees both
  use it; the older "cold era" snow rule in the terrain was folded into it).
- `src/domain/climate.ts` + `src/content/climate.ts`: a **chill** value per period, interpolated
  like the environment keyframes and carried on the snapshot (`snapshot.chill`). It lowers the snow
  line in every season (most in summer, so in the Younger Dryas snow lies on Mynydd Du above about
  400–500 m even in summer; the named cwms themselves are outside the 10-mile terrain)
  and frosts the winter grass; it is not shown as data. Each key carries a `reconstructed`
  provenance citing the deep-time research note: the milder Late Glacial interstadial,
  c. 12,700–10,900 BC in calendar years [S10, S8, and a Wikipedia lead recorded in findings], the
  Younger Dryas at c. 10,900–9,700 BC [S8, S1], Holocene warming [S10] and optimum [S41], the
  Medieval Warm Period [S15] and the Little Ice Age [S16]. The magnitudes are ours: the research
  has no Wales-specific data, so they are kept gentle, and keys with no source are neutral (0).
  (Corrected 2026-09-28 after two reviews: the first draft cited the Younger Dryas for 12,500 BC,
  which is inside the interstadial, and the Holocene optimum for 9000 BC; neither is supported.)
- The renderer only reads: `World.applyLighting` (lights, fog, sky, shadows, grading, water
  reflection, dimming every self-lit material by one rule), `World.applyEnvironment(env, look, …)`
  (terrain and trees recoloured only when the season or the era's land cover changes), and
  `FeatureLayer.setLamps` (town windows), `Firelight` and `Smoke.shade`. No era is special-cased.

## Effects

| Effect | How | Cost |
|---|---|---|
| Sun path and shadows | Directional light follows the sun; its direction and the render-once shadow map change together, at most every 90ms while the sun moves, so the shadow lookup never uses a newer light than the map was drawn with | One shadow pass per refresh |
| Sky | Screen-space gradient redrawn only when the light or the view direction changes; a warm glow on the side of the sky the sun is on | 64×128 canvas |
| Stars | A star layer, added over the gradient at night, scrolling with the camera's heading | 1024×512 texture |
| Sun and moon glow | Painted into the sky gradient by the true angle between each pixel's view ray and the sun (or moon): a bright core and a wide aureole, hidden behind the land like the rest of the sky | Part of the gradient repaint |
| Tilt-shift | The pipeline's depth of field, focused on the camera target, with the focal length scaled to the distance so the miniature look holds at every zoom | Several blur passes; off with `?fx=low` |
| Colour grading | Colour curves: warm highlights at golden hour, cool desaturated shadows at night | Negligible (already in the pipeline) |
| Night glow | Lit windows on about 60% of town buildings, fewer in the small hours; a soft firelight pool at open hearths (roundhouses, hall-houses, mansions), floated above the highest ground under it; bloom threshold drops at night | Thin instances |
| Water | A procedural ripple normal map (wrapping, so it covers every river's whole length) flowing downstream, and an emissive tint reflecting the sky | 128×128 texture |
| Morning mist | Fog thickens around dawn, most in autumn | None |

Not done yet (see the backlog): ambient occlusion (SSAO2 would cost bundle budget), light shafts,
real reflections, weather, castles and churches lit at night, sound that follows the clock.

## Verified

By screenshot at several years, hours and seasons (WebGL2 through SwiftShader). **WebGPU and real
frame rates are not verified**: the layer placement and depth of field use only built-in Babylon
shaders, which ship in both GLSL and WGSL, but nobody has looked on a real GPU yet.

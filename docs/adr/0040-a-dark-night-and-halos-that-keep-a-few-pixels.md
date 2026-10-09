---
title: "ADR 0040: A dark night, and halos that face the camera and keep a few pixels"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0040: A dark night, and halos that face the camera and keep a few pixels

- **Status:** Accepted
- **Date:** 2026-10-03
- **Decided by:** Claude, under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
  so Dewi can overrule it.
- **Number:** written as 0037 and renumbered 0040 at merge, since other branches in flight had taken 0037 to 0039, so expect a renumber at
  merge.

## Context

The dated night light ([ADR 0030](0030-night-light-as-dated-content-keys.md)) only showed close up.
At a winter 23:00 the valley was a pale moonlit grey: moonlight 0.62, sky light 0.55 of a mid blue,
an exposure boost of 12% at night, and a night sky top of `#101b36`. The lit windows were small
emissive panes and the street lamps 2.6m boxes, a pixel or less from the overview (3,500 world units
away), so at the site framing the 1903 windows and lamps were a few orange pixels, and the 1942
blackout looked much like any other night. A screenshot of the countryside above the town at 1880,
21:00 measured a mean luminance of 0.31.

## Decision

- **A darker night, in `lightingAt` only where `night` weights it**: moonlight 0.3 (`NIGHT.moon`) in
  a deeper blue, sky light 0.2 (`NIGHT.ambient`) of `#3a4a78` over a near-black ground, a night sky
  of `#050a18` over `#101829` (which is also the fog), the materials' self-glow 0.08 of their day
  value (`NIGHT.selfLit`, was 0.2), and no exposure boost. Every change is multiplied by the night
  factor, so the day is untouched: a unit test pins three daytime lightings exactly, and two more
  in the band where the day is fading but the night has not begun (winter 15:30 and 16:15, values
  taken from main), the overview at
  noon in 1880 and 2000 screenshots identical to the pixel, and at `?place=llandeilo` 0.15% of pixels
  differ, all at the town's moving smoke, people and speech bubble. The same countryside now measures 0.07.
  The values are tuned by eye, not measured from a real night; they are rendering, not history.
- **One `Halos` class for every kind of night light** (`src/world/halos.ts`): soft additive glows at
  each lit house (`Buildings`), each street lamp (`StreetLamps`) and each house with a hearth
  (`Firelight`, now one glow per roundhouse or longhouse, from the positions `buildFeature` records,
  as well as a standing building's hearth). Each fire's smoke source carries its houses' glow
  points, so one rule says which features have a lit hearth for both the smoke and the halos
  (*amended 2026-10-03* after the second-Opus review: a separate `hearthLights` list repeated that
  rule, and `Firelight` keyed its cache on the two agreeing). The owners pass points and a level; the colour and
  level still come from `lampsAt` and the dated keys, so the halos add no era logic and change no
  content. A blacked-out key lights nothing, so the 1942 town is black.
- **Each halo faces the camera and is never smaller than a few pixels.** `HALOS` in
  `src/domain/halo.ts` gives each kind a size close up (`worldSize`), a minimum on screen
  (`minPixels`: windows 4, lamps 7, hearths 8) and a strength; `haloSize` is the rule, max(size,
  pixels × world units per pixel at the distance). The turning and sizing run in the vertex shader,
  through a Babylon material plugin (`FacingHalo`) with GLSL for WebGL2 and WGSL for WebGPU, so
  moving the camera costs no CPU work. The formula is therefore written twice, in the shader and in
  `haloSize` (which the tests hold); this duplication is deliberate, and the shader takes its
  per-pixel factor from the domain's `unitsPerPixel`.
- **Halos on every quality level.** They cost too little to measure (below), so Medium and Low keep
  them; what those levels shed is bloom, which on High spreads the halos' bright cores.

## Consequences

- From the overview a night reads at a glance: the Victorian town orange with gas, 1903's electric
  street lamps white at its centre, the medieval valley a scatter of hearths, the 1942 blackout
  black, and 2000 lit along every road. A visitor sees what lit each era without zooming in.
- Countryside farms get window halos too, from the same window shares as the town; at the overview
  they are what makes the valley look lived in. *Corrected 2026-10-03 (second-Opus review)*: this
  line said the keys already called the farms a guess, which only the 1902 and 1945 keys did. Every
  key that lights a drawn farm now says so in both languages, and a content test holds it.
- An e2e test counts the warm lit pixels over the diorama at the 1880 overview with the halos on and
  off (2.6% against 0.08%), so halos that draw nothing fail it (seen red with the uniform left unbound,
  0.08%), and so do halos drawn as flat squares (seen red at 15%).
- Frame cost, measured on the RTX 2000 Ada laptop GPU through WSL's D3D12 layer at 1920×1080, High,
  1903 overview at 23:00 (5,326 window, 45 street and 3 hearth halos), with vsync off: idle 150 and
  159fps before, 162 and 165 after; orbiting the camera 72 and 105fps before, 92 and 109 after;
  scrubbing too noisy to compare (18 to 55fps either way). The scrub's own `dewidebug apply cost`
  averaged 59ms (features) and 250ms (environment) before, 45ms and 246ms after. With vsync on, both
  hold 60fps idle.
- A first version turned the halos on the CPU every frame the camera moved: 30ms a frame for 5,326
  window halos, which halved the orbit frame rate. Moving the work into the shader is what made the
  cost vanish. The halos' quads are culled by nothing (`alwaysSelectAsActiveMesh`), since their CPU
  bounds mean nothing once the shader moves them.
- The WGSL path has not been run: WebGPU through WSL stalls and CI has no GPU. It mirrors the GLSL
  line by line, using the names Babylon's own WGSL shaders use (`scene.view`, `scene.vEyePosition`,
  `uniforms.*`); a WebGPU check on a real desktop is in the todo file.

## Alternatives considered

- **Bloom or a GlowLayer alone**: both spread light already on screen, and a window under a pixel
  puts almost none there, so neither reads from the overview; a GlowLayer is also another
  full-screen blur pass.
- **Camera-facing quads turned on the CPU**: tried first; too slow, as above.
- **Flat light pools on the ground** (like the hearth's firelight): they flatten to slivers at low
  camera angles and still vanish below a pixel.
- **Sprites** (`SpriteManager`): a fixed world size each, so keeping them a few pixels wide means
  resizing every sprite on the CPU as the camera moves, the cost the shader avoids.
- **Darkening by lowering exposure**: it would dim the lights with the land and change the day's
  tone-mapping balance; darkening the light sources leaves the emissive lights at full strength.

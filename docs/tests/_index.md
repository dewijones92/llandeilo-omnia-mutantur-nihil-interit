---
title: Testing
kind: index
status: current
updated: 2026-09-28
---

# Testing

| Layer | Tool | Covers |
|---|---|---|
| Types | `tsc` (strict) | Provenance cannot be documented without a source; citations must exist; feature kinds are exhaustive |
| Unit | Vitest (`src/**/*.test.ts`) | Timeline mapping, year formatting incl. fractional slider years, heightfield sampling, feature presence windows, half-open era lookup, key-date stepping, snapping and camera shots; sun position (noon due south, east/west, short winter days), day phases, lighting by hour (warm dusk, moonlit night with stars and windows, mist, smooth changes), season looks and the climate snow line, `?hour=`/`?season=` parsing |
| Content integrity | Vitest (`tests/content.test.ts`) | Unique ids; every place, person and source reference resolves; documented items have sources; conversations are imagined; an era for every slider position; key dates far enough apart to scrub; an up-to-date voice clip per line and no orphans; a licence record for every shipped file; a camera shot for every event, inside the disc, naming only real features; a language note for every conversation in an old language; no speech before about AD 500 labelled Welsh; trains cover the railway's life, one at a time;  |
| End to end | Playwright (`e2e/`) | Load and keyboard scrubbing (no snap-back); Welsh switch updating moment, labels and slider label; a conversation from its bubble; almanac, language and sound; the 3D view receiving the mouse through overlays; place flights; provenance popovers with sources and Escape; Previous/Next stepping (including two quick clicks); a snap leaving the camera alone; a minor marker flying to its own event; the desktop banner shown and dismissed off a desktop, absent on one; the compass reading a heading and turning to north; tapping the train to follow it and stopping; time of day and season controls (keyboard, URL, Welsh, the lighting reaching the renderer via the debug overlay) and letting the day pass |
| Coverage | `@vitest/coverage-v8` on every `npm test` | The pure layers, with a CI floor (statements 92, branches 85, functions 100, lines 95; 94.9 / 89.3 / 100 / 97.3 on 2026-09-28) |
| Visual | Screenshots via `tools/shot.mjs` | Overview and close-ups at chosen years, checked by eye before every deploy |
| CI | GitHub Actions | Source sync, format, types, lint, unit, knip, build, e2e, then deploy |

Locally, Playwright uses Chromium 136 because newer Chromium cannot navigate on this WSL machine;
CI uses the bundled browser. Both render with WebGL2 through SwiftShader, so WebGPU is not covered
by automated tests yet.

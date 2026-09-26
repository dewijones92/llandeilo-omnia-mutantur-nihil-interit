---
title: Testing
kind: index
status: current
updated: 2026-09-26
---

# Testing

| Layer | Tool | Covers |
|---|---|---|
| Types | `tsc` (strict) | Provenance cannot be documented without a source; citations must exist; feature kinds are exhaustive |
| Unit | Vitest (`src/**/*.test.ts`) | Timeline mapping (linear and log segments, round trip, clamping), year formatting in both languages, heightfield sampling, feature presence windows |
| End to end | Playwright (`e2e/`) | The valley loads; the slider moves through time by keyboard; the interface switches to Welsh; a conversation opens from its bubble with its lines, provenance and attested-quote note |
| Visual | Screenshots via `tools/shot.mjs` | Overview and close-ups at chosen years, checked by eye before every deploy |
| CI | GitHub Actions | Source sync, format, types, lint, unit, knip, build, e2e, then deploy |

Locally, Playwright uses Chromium 136 because newer Chromium cannot navigate on this WSL machine;
CI uses the bundled browser. Both render with WebGL2 through SwiftShader, so WebGPU is not covered
by automated tests yet.

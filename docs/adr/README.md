---
title: Architecture decision records
kind: index
status: current
updated: 2026-09-28
---

# Architecture decision records

One file per significant technical decision: its context, what was decided, what follows from
it, and what was rejected. Dewi, 2026-09-28: "make sure to document ADRs".

## When to write one

Write an ADR when a choice would be expensive to reverse, or a future reader would ask "why is it
like this?": a library or engine, a data format or pipeline, a layer boundary, a rendering or audio
technique, a build, test or deploy mechanism, or a working process for the repo. Content and
product choices go in the [decision log](../process/decision-log.md) instead; research outcomes in
[`research/findings.md`](../research/findings.md).

## Rules

- Copy [`template.md`](template.md), take the next number, and add a row below in the same commit.
- An accepted ADR is not rewritten. To change a decision, write a new ADR, set the old one's status
  to "Superseded by NNNN", and update CLAUDE.md's Decisions table. A detail that turns out wrong,
  where the decision itself stands, gets a dated "Corrected" note in the ADR rather than a quiet edit.
- Status is one of Proposed, Accepted, Superseded by NNNN, or Rejected. Proposed ADRs need Dewi's
  agreement before code is built on them if the choice is his (see CLAUDE.md).

## Index

| ADR | Decision | Status | Date |
|---|---|---|---|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted | 2026-09-28 |
| [0002](0002-static-site-vite-typescript-pages.md) | A static site: Vite, strict TypeScript, GitHub Pages | Accepted | 2026-09-26 |
| [0003](0003-babylonjs-webgpu-webgl2.md) | Babylon.js, WebGPU first with a WebGL2 fallback | Accepted | 2026-09-26 |
| [0004](0004-babylon-deep-imports-bundle-budget.md) | Deep-import Babylon through one module, with a bundle budget | Accepted; budget superseded by 0016 | 2026-09-26 |
| [0005](0005-pure-domain-and-content-layers.md) | A pure domain and content layer, enforced by lint | Accepted | 2026-09-26 |
| [0006](0006-content-as-typed-typescript.md) | Content is typed TypeScript, not schema-validated JSON | Accepted | 2026-09-26 |
| [0007](0007-provenance-union-and-citation-keys.md) | Provenance as a discriminated union, with citations extracted from research notes | Accepted | 2026-09-26 |
| [0008](0008-piecewise-non-linear-timeline.md) | A piecewise timeline with log segments | Accepted | 2026-09-26 |
| [0009](0009-terrain-os-terrain50-low-poly.md) | Terrain from OS Terrain 50 as an irregular low-poly mesh | Accepted | 2026-09-26 |
| [0010](0010-voices-prebuilt-with-edge-tts.md) | Voices pre-generated at build time with edge-tts | Accepted | 2026-09-26 |
| [0011](0011-procedural-ambient-audio.md) | Procedural ambient sound | Accepted | 2026-09-26 |
| [0012](0012-key-date-shots-as-data.md) | Camera shots for key dates are content data | Accepted | 2026-09-28 |
| [0013](0013-render-once-shadows.md) | Shadows rendered once, refreshed on change | Accepted | 2026-09-26 |
| [0014](0014-parallel-agents-and-second-review.md) | Parallel agents in worktrees, and a second review of every commit | Accepted | 2026-09-28 |
| [0015](0015-desktop-only.md) | Desktop only, with a banner elsewhere | Accepted | 2026-09-28 |
| [0016](0016-no-bundle-size-limit.md) | No bundle size limit | Accepted, supersedes 0004's budget | 2026-09-28 |
| [0017](0017-hybrid-modelling.md) | Procedural architecture, scripted Blender for props | Accepted | 2026-09-28 |

ADRs 0002 to 0013 were written on 2026-09-28 from the decision and build logs, the code and
CLAUDE.md, recording decisions already made; their dates are when each decision was made.

---
title: Architecture decision records
kind: index
status: current
updated: 2026-10-10
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
- Status is one of Proposed, Accepted, Superseded by NNNN, or Rejected. When a later ADR replaces
  only part of one, its status reads "Accepted, <part> superseded" and names the later ADR. Proposed ADRs need Dewi's
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
| [0017](0017-hybrid-modelling.md) | Procedural architecture, scripted Blender for props | Accepted; "architecture stays procedural" superseded by 0052 | 2026-09-28 |
| [0018](0018-backlog-as-a-gated-board.md) | The backlog is a board of task files in the repo, gated by a validator | Superseded by 0022 | 2026-09-29 |
| [0019](0019-suggestions-arrive-as-github-issues.md) | Other people's suggestions arrive as GitHub issues, and become cards | Accepted; forms superseded by 0020, posting rule by 0021, cards by 0022 | 2026-09-29 |
| [0020](0020-plain-github-issues.md) | Suggestions arrive as plain GitHub issues, with no issue forms | Accepted; posting rule superseded by 0021, cards by 0022 | 2026-10-01 |
| [0021](0021-issue-triage-at-session-start.md) | Claude triages GitHub issues at the start of every session, and posts in one approved batch | Accepted, supersedes part of 0019 and 0020; row location and cards superseded by 0022 | 2026-10-01 |
| [0022](0022-one-todo-file.md) | One todo file, no board | Accepted, supersedes 0018 and part of 0019 and 0021; who agrees items amended by 0027 | 2026-10-01 |
| [0023](0023-e2e-own-port-never-reused.md) | Each checkout runs e2e on its own port, and never reuses a server | Accepted | 2026-10-02 |
| [0024](0024-place-names-carry-a-required-date.md) | Every place name carries a required date | Accepted | 2026-10-02 |
| [0025](0025-releases-at-visible-milestones.md) | Releases at visible milestones, with notes kept in the repo | Accepted | 2026-10-02 |
| [0026](0026-open-licences-including-nc.md) | Any open licence, the non-commercial ones included | Accepted; amended 2026-10-09 (the issues' material is credited, not licence-checked) | 2026-10-02 |
| [0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md) | Claude proposes and builds its own ideas, under a proactive mandate | Accepted, amends 0022 | 2026-10-02 |
| [0028](0028-ambient-beds-carry-provenance.md) | Every ambient sound bed carries a provenance, on its own dated track | Accepted, amends 0011 | 2026-10-03 |
| [0029](0029-guess-game-hides-giveaways-by-one-root-class.md) | The guess-the-year game hides giveaways with one root class, and draws its clues from provenance | Accepted; what `datesExact` means amended by 0035 | 2026-10-03 |
| [0030](0030-night-light-as-dated-content-keys.md) | How the night was lit is dated content keys, held not blended | Accepted; the first-key fallback and the two `dated` kinds superseded by 0032 | 2026-10-03 |
| [0031](0031-one-graphics-quality-setting.md) | One graphics quality setting, High by default | Accepted | 2026-10-03 |
| [0032](0032-night-light-before-the-first-key-and-period-dates.md) | No night light before the first key, and keys that only mark a period | Accepted, amends 0030 | 2026-10-03 |
| [0033](0033-railway-drawn-in-dated-sections.md) | The railway is drawn in dated sections of today's track | Accepted; the northing cut and "shown by its presence" superseded by 0034 | 2026-10-03 |
| [0034](0034-exact-dates-draw-nothing-outside-them.md) | Exact dates draw nothing outside them, and the railway's drawn rule is in the domain | Accepted, amends 0033; amended by 0035; amended 2026-10-03 (undated lines drawn as estimates, Dewi's decision) | 2026-10-03 |
| [0035](0035-exact-dates-are-about-dates-not-clues.md) | Exact dates are about the dates, not about how firm a clue is | Accepted, amends 0029 and 0034; amended 2026-10-03 (contested dates may be exact when the ⓘ names both; no exact date for undated track; undated track drawn as labelled estimates, Dewi's decision); amended by 0037 | 2026-10-03 |
| [0036](0036-ci-e2e-in-parallel-shards.md) | CI runs the end-to-end tests in four parallel shards | Accepted; amended 2026-10-09 (six shards; the night tests marked slow; CI tests at Low graphics) | 2026-10-03 |
| [0037](0037-estimates-carry-an-earliest-date.md) | An estimated date can carry the earliest date its sources allow | Accepted, amends 0035 | 2026-10-03 |
| [0038](0038-recorded-burnings-are-dated-features.md) | A recorded burning is a dated feature, and which features smoke is one domain rule | Accepted; amended 2026-10-03 (the 1213 arrival by day) | 2026-10-03 |
| [0039](0039-timeline-markers-fan-into-lanes.md) | Timeline markers keep their dates and fan into lanes when they crowd | Accepted | 2026-10-03 |
| [0040](0040-a-dark-night-and-halos-that-keep-a-few-pixels.md) | A dark night, and halos that face the camera and keep a few pixels | Accepted | 2026-10-03 |
| [0041](0041-cutscenes-as-data-on-one-clock.md) | Cutscenes are data on one pure clock, drawn by one crowd system | Accepted (Claude, under the proactive mandate); amended by 0042 | 2026-10-03 |
| [0042](0042-a-scene-draws-its-own-year.md) | A scene draws the world at its own year, an open ⓘ pauses it, and the interface behind it is inert | Accepted (Claude, under the proactive mandate), amends 0041 | 2026-10-03 |
| [0043](0043-one-polyline-helper.md) | One helper measures lines of grid points and walks along them | Accepted (Claude, under the proactive mandate) | 2026-10-03 |
| [0044](0044-photographs-are-dated-placed-content-with-pins.md) | Photographs are dated, placed content, shown as pins | Accepted | 2026-10-09 |
| [0045](0045-estimated-ends-carry-a-latest-date.md) | An estimated end can carry the latest date its sources allow | Accepted, amends 0035 | 2026-10-09 |
| [0046](0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md) | The Roman forts are drawn true size from typed plans whose parts carry their own tier | Accepted; build route amended by 0052 | 2026-10-09 |
| [0047](0047-detailed-monuments-have-a-far-and-a-near-mesh.md) | A detailed monument has a far and a near mesh, chosen by the camera's distance | Accepted; build route amended by 0052 | 2026-10-09 |
| [0048](0048-gpu-e2e-on-windows-chrome.md) | The GPU tests run on Windows Chrome, against a preview served from WSL | Accepted (Dewi's idea and runner; design Claude, under the proactive mandate) | 2026-10-09 |
| [0049](0049-lidar-terrain-tiles-blended-into-terrain-50.md) | LiDAR terrain in tiles, blended into Terrain 50, with period changes kept apart | Accepted, extends 0009; amended 2026-10-10 (the review: lines on the ground, tree identity, what an edit moves) | 2026-10-09 |
| [0050](0050-map-style-camera-controls.md) | Map-style camera controls: drag slides the land, right-drag turns, the wheel zooms at the cursor | Accepted; amended by 0051 | 2026-10-03 |
| [0051](0051-one-welcome-panel.md) | One welcome panel, with an icon that always reopens it | Accepted, amends 0050 | 2026-10-09 |
| [0052](0052-landmarks-are-scripted-blender-models-built-from-their-plans.md) | Landmarks are scripted Blender models, built from their sourced plans | Accepted (Dewi's decision and scope; the boundary and rules Claude's, under the proactive mandate), supersedes part of 0017 | 2026-10-10 |
| [0053](0053-the-blender-pipeline-sheet-script-fitted-gltf.md) | The Blender pipeline: a build sheet from the plan, a headless script, glTF fitted to the drawn ground | Accepted (carries out Dewi's 0052; the design Claude's, under the proactive mandate), amends 0047 | 2026-10-10 |

ADRs 0002 to 0013 were written on 2026-09-28 from the decision and build logs, the code and
CLAUDE.md, recording decisions already made; their dates are when each decision was made.

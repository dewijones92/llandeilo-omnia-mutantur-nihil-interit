---
title: Research brief, Carreg Cennen Castle for a Blender model
kind: brief
status: frozen
updated: 2026-10-17
---

# Brief: Carreg Cennen Castle, phase by phase, for a Blender model

Given to a research agent (Claude Opus 5.5) on 2026-10-17 by a workflow script, after Dewi's decisions of 2026-10-16/17
that every landmark becomes a scripted Blender model at true size and height, like the Roman forts (ADR 0046), each on
its own 2m LiDAR area and textured with sourced or labelled-analogy surfaces. The task text is summarised closely below.

## What was asked

- Research Carreg Cennen Castle (near Trap) into `docs/research/carreg-cennen.md` as a plan for a true-size scripted
  Blender model. Docs only.
- The repo's laws bind: history first, never from memory, two independent sources per documented claim, contested points
  kept contested, dates with their uncertainty, Welsh names first and spelled right, placement from Coflein or Cadw grid
  references.
- Model the note on `dinefwr-castle.md`: its summary, phases, contested points, a measured plan fitted to the LiDAR, the
  "Plan for the Blender model" part tables (id, shape, dimensions, tier, sources, kits, textures), the tier label
  "documented (one source: Cadw)" where only the Cadw family supports a part, and its checks in `reviews/`.
- Give real dimensions, the anchor grid reference, the phases the app shows (`design/models.md` and the existing feature
  dates and plans in `src/content`), and which tiles a 2m LiDAR area should cover; fetch the Welsh Government LiDAR for
  the site if needed to measure or fit a plan.
- Add the sources through `tools/research/extract-sources.mjs` (a new prefix if needed; never renumber), findings in
  `findings.md`, gaps in `open-questions.md`; `npm run check` must pass. Never touch the main checkout or port 5051;
  never push or post. Commit with the session's trailers.

## What the agent did

- The check ([`../reviews/carreg-cennen-check-1.md`](../reviews/carreg-cennen-check-1.md)) was written by the same agent,
  so it is a re-reading against the downloaded sources, not the independent check the todo path asks for.
- `tools/terrain/lidar-areas.json` was not changed (docs only); the proposed area and the region it needs are in the note.
- The LiDAR tiles were downloaded outside the repository, to `~/code/data/llandeilo/lidar/carreg-cennen/`, not into
  `raw/`, so the build's checksum verification is not disturbed.

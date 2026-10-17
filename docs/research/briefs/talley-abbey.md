---
title: Research brief, Talley Abbey for a Blender model
kind: brief
status: frozen
updated: 2026-10-17
---

# Brief: Talley Abbey (Abaty Talyllychau), phase by phase, for a Blender model

Given to a research agent (Claude Opus 5.5) on 2026-10-17 by a workflow script. The task text is summarised closely
below.

## What was asked

- Research Talley Abbey into `docs/research/talley-abbey.md` as a plan for a true-size scripted Blender model. Docs only.
- The repo's laws bind: history first, never from memory, two independent sources per documented claim, contested points
  kept contested, dates with their uncertainty, Welsh names first and spelled right, placement from Coflein or Cadw grid
  references.
- Model the note on `dinefwr-castle.md`: its summary, phases, contested points, a measured plan fitted to the LiDAR, the
  "Plan for the Blender model" part tables (id, shape, dimensions, tier, sources, kits, textures), the "documented (one
  source)" label where only one family of sources supports a part, and its checks in `reviews/`.
- Dewi's decisions, as the brief gave them (2026-10-16/17): landmarks are scripted Blender models at true size and height
  (like the Roman forts, ADR 0046), each with its own 2m LiDAR area, textured with sourced or labelled-analogy surfaces. So
  the plan must give real dimensions, the anchor grid reference, the phases the app shows (`design/models.md` and the
  existing feature dates in `src/content`), and which tiles a 2m LiDAR area should cover; fetch the Welsh Government
  LiDAR if needed to measure or fit a plan.
- Add the sources through `tools/research/extract-sources.mjs` (a new prefix, no renumbering), findings in `findings.md`,
  gaps in `open-questions.md`; `npm run check` must pass. Never touch the main checkout or port 5051; never push or post;
  commit with the given trailer.

## What the agent did differently

- The check ([`reviews/talley-abbey-check-1.md`](../reviews/talley-abbey-check-1.md)) was written by the same agent, so it
  is a re-reading against the downloaded sources, not an independent check; the note says so and the todo path still owes
  one.
- The LiDAR tiles were downloaded to a scratch folder to measure the site and fit the plan; nothing was added to
  `tools/terrain/lidar-areas.json` or the committed terrain, because the build owns that change (Talley is outside the
  present LiDAR region).

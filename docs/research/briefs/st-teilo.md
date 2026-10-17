---
title: Research brief, St Teilo's church for a Blender model
kind: brief
status: frozen
updated: 2026-10-17
---

# Brief: St Teilo's church, Llandeilo, phase by phase, for a Blender model

Given to a research agent (Claude Opus 5.5) on 2026-10-17 by a workflow script, after Dewi's decisions of 2026-10-16/17
that the landmarks are scripted Blender models at true size and height, each with its own 2m LiDAR area, textured with
sourced or labelled-analogy surfaces. The task text is summarised closely below.

## What was asked

- Research St Teilo's church (the clas church, the medieval church, the c. 1600 west tower, George Gilbert Scott's rebuild
  of 1848-51) into `docs/research/st-teilo.md` as a plan for a true-size scripted Blender model. Docs only.
- The repo's laws bind: history first; never from memory; two independent sources per documented claim; contested points
  stay contested; dates with their uncertainty; Welsh names first and spelled right; placement from Coflein or Cadw grid
  references.
- Model the note on `dinefwr-castle.md`: its summary, phases, contested points, a measured plan fitted to the LiDAR, the
  "Plan for the Blender model" part tables (id, shape, dimensions, tier, sources, kits, textures), and the tier label
  "documented (one source: ...)" when only one family of sources supports a part.
- Give real dimensions, the anchor grid reference, the phases the app shows (`design/models.md`, `src/content`), and
  which tiles a 2m LiDAR area should cover; fetch the Welsh Government LiDAR for the site if needed.
- Add the sources through `tools/research/extract-sources.mjs` (a new prefix, never renumbering), findings in
  `findings.md`, gaps in `open-questions.md`; `npm run check` must pass. Never touch the main checkout or port 5051; never
  push or post.

## What the agent did differently

- The check (`reviews/st-teilo-check-1.md`) was written by the same agent, so it is a re-reading against the downloaded
  sources, not an independent check; the note says so.
- No plan was written in `src/`, for the reason the Dinefwr brief gives: a second plan beside the one in
  `buildings.ts` would be an unrecorded duplicate. The plan is in the note as tables.
- The Lambeth Palace ICBS file and the 1837 tithe map were found but not read (a login; not attempted), and are listed as
  gaps.

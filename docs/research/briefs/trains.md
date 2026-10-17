---
title: Research brief, the trains through Llandeilo for a Blender model
kind: brief
status: frozen
updated: 2026-10-17
---

# Brief: the trains through Llandeilo, period by period, for a Blender model

Given to a research agent (Claude Opus 5.5) on 2026-10-17 by a workflow script. The task text is summarised closely
below.

## What was asked

- Research the locomotives and rolling stock on the lines through Llandeilo (the Llanelly Railway, the Vale of Towy
  Railway and the Central Wales line) by period: which types ran here when, with dimensions and liveries, to replace
  or extend the existing 1857 locomotive model, as a plan for true-size scripted Blender models.
- The repo's CLAUDE.md binds: history first, never from memory, two independent sources per documented claim,
  contested points kept contested, dates with their uncertainty, Welsh names first and spelled right, places from
  Coflein or Cadw grid references.
- Model the note on `dinefwr-castle.md`: summary, phases, contested points, a measured plan fitted to the LiDAR, and a
  "Plan for the Blender model" with part tables (id, shape, dimensions, tier, sources, kits, textures), with the
  one-source tier label where only one family of sources supports a part.
- Dewi's decisions (2026-10-16/17): landmarks are scripted Blender models at true size and height (ADR 0046), each with
  its own 2m LiDAR area, textured with sourced or labelled-analogy surfaces. So: real dimensions, the anchor grid
  reference, the phases the app shows, and which tiles a 2m LiDAR area should cover.
- Docs only: write `docs/research/trains.md` (`status: draft`), add its sources through
  `tools/research/extract-sources.mjs` without renumbering, findings in `findings.md`, gaps in `open-questions.md`;
  `npm run check` must pass. Never touch the main checkout or port 5051; never push or post.

## What the agent did differently

- It builds on two existing notes, [`railway-locomotives.md`](../railway-locomotives.md) (1857-1872) and
  [`railway-later.md`](../railway-later.md) (1873 to today), and cites their sources by key rather than repeating them.
- A check by the same agent ([`../reviews/trains-check-1.md`](../reviews/trains-check-1.md)) re-reads the key claims
  against the downloaded sources; it is not independent, and the todo path still owes an independent one.
- No plan file was written in `src/`: the plan is in the note as tables, as Dinefwr's was.

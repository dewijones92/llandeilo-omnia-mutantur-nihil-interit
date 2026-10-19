---
title: Research brief, Pont Llandeilo for a Blender model
kind: brief
status: frozen
updated: 2026-10-17
---

# Brief: Pont Llandeilo (the old bridge and the 1848 arch) for a Blender model

Given to a research agent (Claude Opus 5.5) on 2026-10-17 by a workflow script. The task text is summarised closely
below; the attribution of the decisions to Dewi is the script's (no decision-log entry for them was found).

## What was asked

- Research Llandeilo bridge over the Tywi (the old multi-arched bridge and the 1848 single arch, 44.2m span) into
  `docs/research/llandeilo-bridge.md` as a plan for a true-size scripted Blender model. Docs only.
- The repo's CLAUDE.md binds: history first, never from memory, two independent sources per documented claim, contested
  points stay contested, dates with their uncertainty, Welsh names first, placement from Coflein or Cadw grid references.
- Model the note on [`dinefwr-castle.md`](../dinefwr-castle.md): its Summary, phases, contested points, measured plan fitted
  to the LiDAR, the "Plan for the Blender model" part tables (id, shape, dimensions, tier, sources, kits, textures), the
  "documented (one source: Cadw)" rule, and the lessons of its four checks.
- The script states Dewi's decisions of 2026-10-16/17: landmarks are scripted Blender models at true size and height (as
  the Roman forts, ADR 0046), each with its own 2m LiDAR area, textured with sourced or labelled-analogy surfaces. So the
  plan gives real dimensions, the anchor grid reference, the phases the app shows (against `docs/design/models.md` and
  `src/content`), and which tiles a 2m LiDAR area should cover; fetch the Welsh Government LiDAR if needed to measure.
- Add the sources through the existing pipeline (a new prefix in `tools/research/extract-sources.mjs`, then
  `node tools/research/extract-sources.mjs`, never renumbering existing sources); findings in `findings.md`; gaps in
  `open-questions.md`; `npm run check` must pass. Never touch the main checkout or port 5051; never push or post.
- Return: branch, worktree, commit, the phases with what is known and inferred, contested points, the anchor, the LiDAR
  area proposed, gaps.

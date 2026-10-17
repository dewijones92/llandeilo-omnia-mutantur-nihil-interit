---
title: Research brief, Dryslwyn Castle for a true-size Blender model
kind: brief
status: frozen
updated: 2026-10-17
---

# Brief: Dryslwyn Castle, phase by phase, for a true-size Blender model

Given to a research agent (Claude Opus 5.5) on 2026-10-17 by a workflow script, after Dewi's decisions of 2026-10-16/17
that landmarks are scripted Blender models at true size and height, like the Roman forts (ADR 0046), each with its own
2m LiDAR area and textured with sourced or labelled-analogy surfaces. The task text is summarised closely below.

## What was asked

- Research Dryslwyn Castle into `docs/research/dryslwyn.md` (frontmatter `status: draft`) as a plan for a true-size
  scripted Blender model, with full citations and what each source says. Docs only.
- The repo's CLAUDE.md binds it: history first, never from memory, two independent sources per documented claim,
  contested points stay contested, dates with their uncertainty, Welsh names first and spelled right, placement from
  Coflein or Cadw grid references.
- Model the note on `dinefwr-castle.md`: its Summary, phases, contested points, the measured plan fitted to the LiDAR,
  the "Plan for the Blender model" part tables (id, shape, dimensions, tier, sources, kits, textures), the tier rule
  "documented (one source: Cadw)" where only one family of sources supports a part, and its checks in `reviews/`.
- The plan must give real dimensions, the anchor grid reference, the phases the app shows (`design/models.md` and
  `src/content`), and which tiles a 2m LiDAR area should cover; fetch the Welsh Government LiDAR (`data/lidar.md`,
  `tools/terrain`) to measure or fit a plan.
- Add the sources through `tools/research/extract-sources.mjs` (a new prefix if needed; never renumber existing
  sources); findings in `findings.md`; gaps in `open-questions.md`; `npm run check` must pass.
- Work in a fresh git worktree (merge `main` first); never touch the main checkout or port 5051; never push or post;
  commit with the session's trailer.

## What the agent did differently

- The check (`reviews/dryslwyn-check-1.md`) was written by the same agent, so it is a re-reading of every quotation and
  measurement against the downloaded sources, not the independent check the todo path asks for; that is still owed.
- No plan was written into `src/`: as for Dinefwr, a second Dryslwyn plan beside the one in `buildings.ts` would be an
  unrecorded duplicate and an unused module fails `knip`. The plan is in the note as tables.
- The tier rule's family is Chris Caple's excavation, not Cadw alone: the Cadw guide's Dryslwyn half, the listing, the
  scheduling report and every plan and section go back to it.

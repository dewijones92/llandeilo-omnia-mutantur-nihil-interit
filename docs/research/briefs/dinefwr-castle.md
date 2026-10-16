---
title: Research brief, Dinefwr Castle for a Blender model
kind: brief
status: frozen
updated: 2026-10-10
---

# Brief: Dinefwr Castle, phase by phase, for a Blender model

Given to a research agent (Claude Opus 5.5) on 2026-10-10 by a workflow script, after Dewi chose Dinefwr Castle as the
next Blender model after the Roman forts (decision log, 2026-10-10). The task text is summarised closely below.

## What was asked

- Research Dinefwr Castle into a typed plan ready for a Blender model. Docs only: no `src` changes except, at most, a
  draft plan file clearly marked draft if it fits the existing plan types (`src/content/buildings.ts`,
  `src/content/forts.ts`; the forts' plan with per-part tiers, ADR 0046, is the model).
- Research first, never from memory, two independent sources per documented claim: Cadw, Coflein (RCAHMW), Archwilio
  (the Heneb HER), the National Trust, the Dictionary of Welsh Biography, peer-reviewed archaeology and Cadw guidebooks;
  Wikipedia only for leads.
- Cover each phase the app shows (`design/models.md`): the castle first recorded in 1151; the Lord Rhys's work after
  1171-72; the 13th/14th-century stone castle with the great round keep; the Tudor residence; the ruin with the
  summerhouse on the keep. For each: the plan (inner and outer wards, curtains, towers, the keep's diameter and height,
  the gatehouse, the ditch and the rock), dimensions where published, the building materials (stone, mortar, render),
  roofs, what is surveyed against inferred, and the contested points, kept contested.
- Place it from Coflein or Cadw grid references, never an approximate latitude and longitude. Find any measured plan or
  elevation published under an open licence or at least citable, and reconstruction drawings, crediting their makers.
- Write `docs/research/dinefwr-castle.md` (frontmatter, `status: draft`, full citations and what each source says), add
  the sources through `tools/research/extract-sources.mjs` without renumbering existing ones, record findings in
  `findings.md` and gaps in `open-questions.md`, and a section "Plan for the Blender model": a part-by-part table per
  phase (id, shape, dimensions, tier, sources, kit needs, textures needed), every unknown marked.
- Then a check: `docs/research/reviews/dinefwr-castle-check-1.md`, every documented claim against a second source.

## What the agent did differently

- The check was written by the same agent (no agent could be started from inside the workflow), so it is a re-reading
  against the downloaded sources, not an independent check; the note says so and the todo path still owes one.
- No draft plan file was written in `src/`: an unused module fails `knip`, and a second Dinefwr plan beside the one in
  `buildings.ts` would be an unrecorded duplicate. The plan is in the note as tables.

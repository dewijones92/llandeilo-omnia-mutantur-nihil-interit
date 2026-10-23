---
title: "ADR 0060: Contributed models are a separate, credited, switchable layer, with provenance part by part"
kind: adr
status: proposed
updated: 2026-10-23
---

# ADR 0060: Contributed models are a separate, credited, switchable layer, with provenance part by part

- **Status:** Proposed. Not built. Partly reverses the decision log's 2026-10-16 row "Models from outside … are
  not brought into the app", for a labelled layer only, as Dewi decided on 2026-10-23. Leaves
  [ADR 0052](0052-landmarks-are-scripted-blender-models-built-from-their-plans.md) and
  [0053](0053-the-blender-pipeline-sheet-script-fitted-gltf.md) standing for our own landmarks.
- **Date:** 2026-10-23; revised the same day after the second-Opus review (see the end)
- **Decided by:** Dewi made the decision: models made outside the project may appear as a labelled layer (his
  words: "Allow as a labelled layer"), recorded in the decision log as separate, credited and switchable, each with
  its own provenance, with our landmarks staying scripted in Blender; and while he is away, "Design, then build and
  release", and "Merge if green and reviewed" for contributors' pull requests ([decision log](../process/decision-log.md),
  2026-10-23). **Everything below about how is Claude's**, under the proactive mandate
  ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), so Dewi can overrule any of it. The
  design, its reasons and its open questions are in [`design/contributed-models.md`](../design/contributed-models.md).
- **Number:** 0060, not 0059: the `dinefwr-castle-model` branch's design names "likely 0059" for the castle's ADR,
  which is not yet written. No branch had an ADR file numbered 0059 or 0060 when this was written (checked with
  `git log --all` on 2026-10-23).

## Context

Issues #4 and #5 come from a contributor who builds researched reconstructions in SketchUp 2021 (2023 is also
mentioned), has opened our downloaded `.glb` files in SketchUp by way of `.dae`, and wants to send models back with
their component structure, textures and position kept, and to replace one model without rebuilding the scene. The
app's law is that every piece of content says how it is known; our models get that from typed plans, part by part.
A model made elsewhere has no plan, so its provenance must come from somewhere reviewable, and it must never be
mistaken for ours. No step of SketchUp's export has been tried here.

## Decision

1. **Format and frame.** One `.glb` (glTF 2.0) per contribution, textures embedded, no compression, in
   `CONTRIBUTION_FRAME`, a named domain constant (E 260000 N 220500, metres, glTF axes, absolute heights as the LiDAR
   gives them, grid north) held by a test to equal the terrain tiles' `sceneOriginBng`; a tile set with another
   origin is named explicitly in the entry. A SketchUp `.dae` exported with "Preserve Component Hierarchies" is
   accepted and converted by our headless Blender script, pinned to 4.0, which reads the file's unit and up axis.
   The `.glb` is the contribution of record; the `.dae` is not committed, its hash is recorded, and it is accepted
   that a contribution cannot be rebuilt from the repo.
2. **Parts.** The root is the node named with the contribution's id. Below it, a node listed in the entry (by name
   or pattern) is a part, with an id that is the path of part names (`<id>/barrack-1`, like our `fort2/barrack-1`);
   every other node is structural and transparent. Every mesh lies under a part. Which names SketchUp's exporter
   writes is settled by a real test export first.
3. **Provenance in a typed entry, not in the file.** `src/content/contributed.ts` holds one `ContributedModel` per
   contribution (new in `src/domain/model.ts`): frame, place, dating, the features it depicts, credit, licence, and
   each part's name, `Provenance` (the existing union), whether it stands, and its fit (`rigid` or `follow`). Sources
   come from a research note per contribution. A part nobody can explain is refused, since imagined must say what it
   is grounded in; documented parts are cross-checked against two independent sources in review. The ⓘ opens with
   "Contributed model: made by ⟨credit⟩, not by this project".
4. **Credit and licence.** One asset record per contribution, made from the entry, with the licence the contributor
   states from [ADR 0026](0026-open-licences-including-nc.md)'s list. Our CC BY 4.0 does not cover it. The
   GitHub-issue wording ("Not checked: used with credit at Dewi's request") is used only if Dewi extends that
   exception to these issues. Listed in About and in a Downloads group (the Downloads test extended to
   `models/contributed/`, tier counts from the entry).
5. **Placement.** Only standing parts (those directly under the root, or marked `stands`) are seated; nested parts
   move with them. A rigid standing part moves by the difference between the highest drawn and the highest real
   ground under its footprint ([ADR 0056](0056-buildings-stand-level-and-the-roman-plots-are-terraced.md)'s rule,
   sharing `footprintSamples`), and any of its vertices at or below the real ground goes the same depth below the
   drawn ground, so its own walls carry down as ours do. A follow part keeps each vertex's height above the ground.
6. **One at a time.** With the layer on, for its years, a contribution is drawn instead of the meshes of the features
   it names in `depicts`; their ground edits and clearings stay, because other features are built on them
   (`editsBuiltOn`). A depicted plan feature's footprint must match the contribution's (centroids within 10m,
   overlapping by at least half); an undeclared footprint overlap with a plan feature fails the build.
7. **The layer.** A "Contributed" toggle beside Photos, off by default, remembered in `localStorage`, `?contrib=1|0`,
   hidden while there are no contributions, not drawn at Low graphics or with `?models=off`, a `?debug` line, loaded
   lazily. Per committed contribution: 150,000 triangles, 16 draw calls, 1.5MB with textures (`MODEL_BUDGET.near`),
   textures at most 1024 pixels.
8. **One loader.** A contributed adapter on `loadLandmark` that skips the `_probe` check (placement is checked at
   build), takes parts and fit from the entry, and keeps the file's texture coordinates and base-colour textures on
   the app's building material.
9. **Intake.** A pull request with the file, the entry and the note; `tests/contributed.test.ts` refuses a file that
   does not parse, has unlisted geometry or bad names, is out of place, units, frame or budget, lacks a record, or
   overlaps undeclared. A fixture `.dae` and `.glb` and a fixture e2e (`?contrib-fixture`, the file served by route)
   are built before any real contribution. Merged while Dewi is away only when CI is green and an independent review
   finds nothing CRITICAL or IMPORTANT; otherwise he has the final say.

## Consequences

- Contributors can add and replace models one file at a time, and every one says who made it and how sure it is.
- The layer can be built, tested in a browser and merged before the first contribution, with the button hidden.
- Our plans remain the only source of our models; nothing in a contributed file changes them.
- A part whose walls stop short of the real ground keeps a gap on the steeper drawn ground.
- Contributions cannot be rebuilt from the repo; the glb is reviewed as the source.
- The 1.5MB cap keeps the repository's growth to that of our own models; anything larger is an open question.
- Unverified until milestone 1: that SketchUp's `.dae` export keeps component names, its units and axes, and which
  structural nodes it writes. The part rule may change after it.

## Alternatives considered

- **Provenance in the glb's extras**, as ours do: SketchUp cannot write them, and a file is not a reviewed source.
- **One provenance per model**: would hide the difference between an excavated wall and a guessed roof.
- **A fourth tier, "contributed"**: who made a model and how sure it is are separate questions.
- **Imagined by default when no basis is given**: breaks the rule that imagined says what it is grounded in.
- **Seating every part**: tears roofs and wall-walks off their buildings.
- **Both models drawn at once, or ours always winning**: z-fighting and two ⓘ at one point, or a layer that shows
  nothing where contributors work.
- **Hiding the depicted feature's terraces with it**: leaves features built on them floating or buried.
- **The tiles' current origin read from `lidar-areas.json`**: a change there would move every contribution silently.
- **An anchor per model** (our glbs' frame): no absolute height, which the seating needs.
- **8MB files committed**: grows the history faster than ADR 0058 allowed for terrain.
- **Requiring Blender or a SketchUp glTF extension from the contributor**, or accepting `.skp`: unverified on their
  version, or proprietary.

## Revised 2026-10-23 after the second-Opus review

The review found 0 CRITICAL and 10 IMPORTANT findings, all checked against the code and accepted; the list is in the
design's "Review" section. The decisions changed were 1 (named frame, unit read, not rebuildable), 2 (structural
nodes, test export first), 3 (unexplained parts refused, two-source check), 4 (Downloads), 5 (standing parts,
footings carried down), 6 (ground edits kept, footprint match), 7 (1.5MB), 8 (probe skipped, file UVs kept) and 9
(fixtures and e2e first, conditional merge).

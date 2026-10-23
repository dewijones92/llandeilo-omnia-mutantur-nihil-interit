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
- **Date:** 2026-10-23
- **Decided by:** Dewi made the decision: models made outside the project may appear "as a labelled layer" (his
  words: "Allow as a labelled layer"), separate, credited and switchable, each with its own provenance, with our
  landmarks staying scripted in Blender; and while he is away, "Design, then build and release" and, for
  contributors' pull requests, "Merge if green and reviewed" ([decision log](../process/decision-log.md),
  2026-10-23). **Everything below about how is Claude's**, under the proactive mandate
  ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), so Dewi can overrule any of it. The
  design and its reasons are in [`design/contributed-models.md`](../design/contributed-models.md).
- **Number:** 0060, not 0059: the `dinefwr-castle-model` branch's design names "likely 0059" for the castle's ADR,
  which is not yet written. No branch had an ADR file numbered 0059 or 0060 when this was written (checked with
  `git log --all` on 2026-10-23).

## Context

Issues #4 and #5 come from a contributor who builds researched reconstructions in SketchUp 2021 (2023 is also
mentioned), has opened our downloaded `.glb` files in SketchUp by way of `.dae`, and wants to send models back with
their component structure, textures and position kept, and to replace one model without rebuilding the scene. The
app's law is that every piece of content says how it is known; our models get that from typed plans, part by part.
A model made elsewhere has no plan, so its provenance must come from somewhere reviewable, and it must never be
mistaken for ours.

## Decision

1. **Format.** One `.glb` (glTF 2.0) per contribution, textures embedded, no compression, in the terrain tiles'
   frame (origin E 260000 N 220500, metres, glTF axes, absolute heights as on the tiles, grid north). A `.dae`
   from SketchUp 2021 or 2023 exported with "Preserve Component Hierarchies" is accepted and converted by our own
   headless Blender script; the `.glb` is what is committed.
2. **Parts.** A part's id is the path of node names from the contribution's root (`<id>/barrack-1`), like our
   `fort2/barrack-1`; names are lower-case with hyphens, unique, and every mesh lies under a listed part.
3. **Provenance in a typed entry, not in the file.** `src/content/contributed.ts` holds one `ContributedModel`
   per contribution (new in `src/domain/model.ts`): place, dating, the features it depicts, credit, licence, and
   each part's name, `Provenance` (the existing union, so documented needs a source) and fit (`rigid` or
   `follow`). Sources come from a research note per contribution. A part with no stated basis is imagined, never
   documented. The ⓘ opens with "Contributed model: made by ⟨credit⟩, not by this project".
4. **Credit and licence.** One asset record per contribution, made from the entry; the licence is the one the
   contributor states, from [ADR 0026](0026-open-licences-including-nc.md)'s list (no ND, nothing all rights
   reserved). Our CC BY 4.0 does not cover it. The GitHub-issue wording ("Not checked: used with credit at Dewi's
   request") is used only if Dewi extends that exception to these issues. Listed in About and Downloads.
5. **Placement.** Each part is moved from the real ground it was built on to the drawn ground: a rigid part by the
   difference of the highest ground under its footprint ([ADR 0056](0056-buildings-stand-level-and-the-roman-plots-are-terraced.md)'s
   one rule, on an outline read from its mesh, sharing `footprintSamples`), a follow part vertex by vertex.
6. **One at a time.** With the layer on, for its years, a contribution is drawn instead of the features it names in
   `depicts`; with it off, ours. An undeclared overlap with one of our features fails the build.
7. **The layer.** A "Contributed" toggle beside Photos, off by default, remembered in `localStorage`, `?contrib=1|0`,
   hidden while there are no contributions, not drawn at Low graphics or with `?models=off`, a `?debug` line, and
   loaded lazily. Budgets per contribution: 150,000 triangles, 16 draw calls, 8MB, textures at most 2048 pixels;
   40MB for the layer.
8. **One loader.** A contributed adapter on the landmark loader (`src/world/landmarks.ts`), mapping the file's
   materials to the app's building material, so seating, merging and picking stay in one place.
9. **Intake.** A pull request with the file, the entry and the note; `tests/contributed.test.ts` refuses a file
   that does not parse, has unnamed or unlisted parts, is out of place, units or budget, lacks a record or overlaps
   undeclared; merged when CI is green and an independent review finds nothing CRITICAL or IMPORTANT.

## Consequences

- Contributors can add and replace models one file at a time, and every one says who made it and how sure it is.
- The layer can be built and merged before the first contribution: the button stays hidden until one exists, and
  the e2e and the release come with the first real model.
- Our plans remain the only source of our models; nothing in a contributed file changes them.
- A building fitted to the real slope can show a gap on its downhill side, because the drawn hills are 2.4 times
  as steep; the guide asks for walls below ground, and the review looks at the logged gaps.
- Binary files grow the repository; the caps bound it.
- Unverified until tried: that SketchUp's `.dae` export keeps component names, and that its axes map as expected.
  The converter's printed part tree and the placement checks are the first test of both.

## Alternatives considered

- **Provenance in the glb's extras**, as ours do: SketchUp cannot write them, and a file is not a reviewed source.
- **One provenance per model**: would hide the difference between an excavated wall and a guessed roof.
- **A fourth tier, "contributed"**: who made a model and how sure it is are separate questions.
- **Both models drawn at once, or ours always winning**: z-fighting and two ⓘ at one point, or a layer that shows
  nothing where contributors work.
- **An anchor per model** (our own glbs' frame): one more thing to declare and get wrong; the tiles' frame is what
  the contributor already builds in.
- **Requiring Blender or a SketchUp glTF extension from the contributor**: unverified on their version, and a step
  our script can do the same way every time.
- **Accepting `.skp`**: proprietary, and our side would need SketchUp.

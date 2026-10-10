---
title: "ADR 0052: Landmarks are scripted Blender models, built from their sourced plans"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0052: Landmarks are scripted Blender models, built from their sourced plans

- **Status:** Accepted. Supersedes [ADR 0017](0017-hybrid-modelling.md)'s "architecture stays procedural"
  (its props route stands, and now covers landmarks too). Amends the 2026-10-09 decision log entry "Detailed in the app" (see Consequences)
  [ADR 0046](0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md) (its "no `.blend`
  exists" and its rejected Blender alternative) and [ADR 0047](0047-detailed-monuments-have-a-far-and-a-near-mesh.md)
  (the far and near meshes now come from Blender). The pipeline itself (formats, loader, build step, budgets) gets its own ADR.
- **Date:** 2026-10-10; amended 2026-10-10 (the look: proper textures, Dewi's answer)
- **Decided by:** Dewi made the decision and chose its scope, in his words quoted below. The named
  examples in point 1 (which castles, Talley Abbey, Newton House, a mill, a chapel), the boundary in point 2,
  the rules in points 3 to 7 and the order in point 8 are Claude's reading and Claude's choices, under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
  so Dewi can overrule them.

## Context

Dewi asked on 2026-10-10: "Sorry, was blender skipped or?", and then "Make all important as stuff in
blender maybe? Or?". Blender 4.0.2 has been installed since 2026-09-26, and `docs/design/models.md` named
scripted Blender as one way to make models. So far every building is built in TypeScript at start-up,
including the Roman forts' typed plans ([ADR 0046](0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)).
[ADR 0017](0017-hybrid-modelling.md), when Claude was left to choose on 2026-09-28, kept architecture procedural so
that each wall's shape stays a reviewable claim that changes by phase, and used Blender only for props (the
1857 locomotive, which the app already loads through `loadModel` in `src/world/models.ts`). That works, but it limits detail: bevels, real roof timbers, textures, hinged gates and good levels of
detail are hard to write as code that runs in the browser.

A day earlier, on 2026-10-09, Dewi had chosen "Detailed in the app" for the Roman fort, over a Blender
source with a low-poly export. Offered roles for Blender on 2026-10-10, he chose **scripted Blender models**. For the important things, a
Blender script turns the sourced plan (sizes, parts, how sure we are) into a detailed model, which the app
loads as glTF, keeping each part's ⓘ. The plan stays the one source of facts. The model can be rebuilt
from the repo and edited by hand in Blender. Asked which things, he chose castles, the Roman forts,
churches and the abbey, the town, the bridge and the trains, "And anything along these lines please".

## Decision

1. **The important things are Blender models.** These are the castles (Dinefwr, Carreg Cennen,
   Dryslwyn), the Roman forts, the churches and Talley Abbey, the town, the bridge, the trains, and
   anything else of that kind that comes later (a mansion such as Newton House, a mill, a chapel). Each
   is built by a script run headless (`blender -b -P`) and exported to glTF.
2. **What counts as important** (Claude's proposal). A named landmark gets its own model. Generic,
   repeated buildings (town houses, roundhouses, farmsteads, hall-houses) get a small kit of Blender-built
   types, which the existing placement code instances. That is how "the town" is covered without
   modelling every house one by one. People, trees, smoke and the ground stay procedural, because there
   are too many of them or because they change with the slider.
3. **The plan is the one source of facts** (DRY). Sizes, parts, placement, dates and each part's tier
   and sources stay in the typed plans under `src/content/`. The Blender script reads an export of them
   and holds no second copy of any measurement. A model that disagrees with its plan is a bug.
4. **Every part keeps its provenance.** A part's id, tier and source ids travel into the glTF (in its
   extras), the ⓘ is built from them, and a test fails if a model's parts and its plan's parts differ in
   id, tier or sources.
5. **Detail added in Blender is history too.** Roof timbers, thatch or shingle, wall finish, textures
   and wear need a source in `docs/research/`, or a label saying they are an analogy, carried in the
   part's tier and its ⓘ. Making a model look better is never a reason to raise its tier.
6. **It can be rebuilt from the repo.** One command rebuilds every model. Editing a model by hand in
   Blender is allowed, but the change has to go back into the script or the plan, or the next build
   will overwrite it. The pipeline ADR settles which outputs are committed.
7. **One loader, with a fallback.** The app loads models through one seam, the same for every landmark:
   `loadModel` in `src/world/models.ts`, extended. Today it merges a model's parts into one mesh, which
   loses the part identity that point 4 needs, so that has to change.
   The procedural mesh stays until that landmark's model exists, so the change can land one landmark at a
   time with nothing missing in between.
8. **Each landmark goes through the usual path**: research first, then an independent check, the build,
   a second-Opus review, and screenshots at the years that show it. The Roman forts come first, since
   their plans are already typed part by part.

## Consequences

- The 2026-10-09 choice of "Detailed in the app" still stands for how much detail the forts get. What it
  turned down was a *low-poly* Blender export; what Dewi chose on 2026-10-10 is a *detailed* one. Only how
  they are built changes: their meshes now come from Blender rather than from code run in the browser.
- **The look is not decided by this ADR.** Whether models stay in the agreed clean low-poly look and flat
  colours (option A in `docs/design/models.md`) or gain textures (options B and C) was left as Dewi's open
  question when this ADR was written. *Answered the same day, see the amendment below.*
- **Point 6 narrows "editable by hand".** Editing in Blender is the way to try a change, not where it
  lives: the script and the plan are the files that are edited for good, so a hand-added detail gets its
  point 5 source in the plan like any other.
- Each landmark's model is a build step and a set of binary files. Their size and frame cost are
  measured against the performance numbers in CLAUDE.md.
- A landmark with a thin record gets a model no more detailed than its sources allow, with the gaps
  labelled. That is the same rule as before, in a tool that makes it easier to break, so point 5 is
  checked in review.
- ADR 0017's reason for keeping architecture procedural still holds, and point 3 is how it is kept: the
  shape stays a reviewable claim in the plan, which changes by phase, and Blender only draws it.
- The 1857 locomotive (`tools/models/llanelly-train.py`, ADR 0017's props route) moves onto the same
  pipeline rather than keeping its own. Until it does it breaks point 3: its script holds its own
  measurements (`GAUGE_HALF`, `WHEEL_R`, `WHEELBASE`). Trains are not landmarks, but they are in Dewi's scope:
  a named type gets its own model, and generic rolling stock gets a kit, as in point 2.

## Amendment, 2026-10-10: proper textures

Asked whether the Blender models should stay in the clean low-poly flat colours or get textures (stone,
timber, thatch), Dewi answered: "Get proper textures". That is option B in `docs/design/models.md`:
realistic, textured models in the low-poly valley. ADR 0017's "models must still be low-poly to match the
agreed look" no longer holds for Blender models.

- **What gets textures** (Claude's reading, under the proactive mandate, so Dewi can overrule it): every
  Blender model, which means the landmarks and the kit of repeated buildings from point 2. The ground,
  the vegetation and the people keep their current look.
- **A texture is a historical claim too** (point 5). A wall's stone, a roof's covering, timber and render
  each need a source in `docs/research/`, or a label in the part's ⓘ saying they are an analogy. A material
  that is not known (Fort 1's rampart facing, a clas church's walls) gets a texture labelled as an analogy,
  never one presented as found. What the research rules out stays out: ADR 0046's "no stone, tile or
  limewash" on the Roman forts means their textures are timber, turf and earth.
- **Every texture is an asset** with a source, an author and an open licence in the asset manifest
  ([ADR 0026](0026-open-licences-including-nc.md)), or is made by the build script, which then records how.
- **The style clash** that option B warned of is a design risk to check by screenshot at the overview and
  close up, at each landmark's years. Lighting and colour grading may be tuned so the textured models sit
  in the valley, with no change to how the valley is drawn.

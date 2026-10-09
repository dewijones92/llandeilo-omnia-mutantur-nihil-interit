---
title: "ADR 0038: A recorded burning is a dated feature, and which features smoke is one domain rule"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0038: A recorded burning is a dated feature, and which features smoke is one domain rule

- **Status:** Accepted (decided by Claude under the proactive mandate, [ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md), so Dewi can overrule it)
- **Date:** 2026-10-03

*Numbering: written as 0037/0038 and renumbered at the merge into main on 2026-10-09, since other branches had taken those numbers.*

## Context

The 1213 key date needs a visible change in the scene: the Brut records that Rhys Gryg burned
Llandeilo as he withdrew (invasions:S1), and the invasions note's card table calls fire "documented"
as an effect, with the look of the town reconstructed. The app had no way to draw a fire for an
event. Smoke came only from hearths: `FeatureLayer.smokeSources` in the renderer decided, kind by kind,
which features smoke, how much and whether they glow at night, so that rule could not be tested
without a browser. Other recorded burnings wait in the research (Glyndŵr's men burned Llandeilo in
July 1403, effects:S11; corn stacks burned on the Dynevor estate in 1843, victorian:S4), so the answer had to
be one model, not code for 1213.

Two facts found while building it:

- The world is 10m to a unit (`WORLD.metresPerUnit`), so a "spread" of 60 is 1.2km of emitter, not a
  town. The first plume was invisible because it was spread that thin.
- Babylon's size gradient overrides a particle system's `minSize` and `maxSize`
  (`thinParticleSystem.function.js`: with gradients, `particle.size` is the gradient factor). So every
  hearth puff has always been 0.6 to 2.4 units, whatever the min and max said.

## Decision

- **A fire a source records is a feature**: `{ type: 'burning', spread, density }` in `FeatureKind`,
  placed, dated and with a provenance like any other, and with `datesExact` so it is drawn for its
  dates and nothing outside them ([ADR 0034](0034-exact-dates-draw-nothing-outside-them.md)). The first
  is `llandeilo-burning-1213`, documented by the Brut, drawn over the church as the heart of the town
  (where in the town it burned is not recorded, and the ⓘ says so).
- **Which features smoke is one pure rule**, `plumeOf(kind)` and `smokingFeatures(present)` in
  `src/domain/smoke.ts`: hearths for roundhouses, longhouses, old towns and standing buildings with a
  hearth, a dark burning plume for a burning, nothing for the rest, and nothing below presence 0.6.
  The renderer only places the plume (a building's hearth offset, the ground height). The tests sample
  the rule through `snapshotAt`, so "Llandeilo smokes at the 1213 step and nowhere else" is a test of
  the picture.
- **The smoke's look is per style** (`hearth`, `steam`, `burning`) in one table in `src/world/smoke.ts`:
  colours, the size gradient, life, rate, particle capacity and how far away it is still drawn. A
  burning is darker, larger, longer-lived and is drawn from up to 9,000 units (the whole map), where a
  hearth is culled beyond 1,600. The hearth and steam numbers that were in force are kept (the size
  gradient 0.6 to 2.4 they actually had; the min and max sizes they never had are gone).
- `fire: true` on a burning lights the existing firelight glow at night, as hearths do.

## Consequences

A recorded burning in another year is now content only: a feature with its dates, place and source.
The 1403 burning of Llandeilo is the obvious next one (its date is "some time in the first half of
July" by the letters, so it needs a date range, not a day). Anything else that should smoke goes into
`plumeOf`, which is exhaustive over feature kinds, so a new kind cannot be forgotten. At night a dark
plume is hard to see and only the glow shows; in daylight the plume is clear from the valley overview.

*Amended 2026-10-03 (review), decided by Claude under the proactive mandate (ADR 0027)*: night was
where every viewer with an untouched clock landed, since the 1213 step set winter and kept the 17:30
hour, so the only scene change for that date could not be seen. The 1213 step now sets a **chosen**
13:00, as the railway step does on its winter date, and its sky note says in both languages that the
hour of the burning is not recorded. A content test holds every key step drawn with a burning to a
chosen hour with the sun up.

## Alternatives considered

- **A per-event effect on `KeyEvent`** (a "fire" flag on the event): it would only show at the key
  step, would duplicate place and date, and would put the renderer's work on the event model.
- **Leaving the rule in the renderer and adding a branch**: the smallest change, but untestable
  without a browser, which ADR 0034 already said to avoid for anything that reads presence.
- **Drawing the burning for the whole of 1213, or with the soft fade**: the fire took a day or two in
  late January; a fade would show smoke over Llandeilo for decades around it.

---
title: "ADR 0030: How the night was lit is dated content keys, held not blended"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0030: How the night was lit is dated content keys, held not blended

- **Status:** Accepted; the first-key fallback and the two `dated` kinds superseded by [0032](0032-night-light-before-the-first-key-and-period-dates.md)
- **Date:** 2026-10-03

## Context

One scalar, `Lighting.lamps` from `lightingAt` (time of day only), lit every window and hearth the
same way in every era: medieval cottages glowed like a 1960s street, and the town was lit in 1942.
How people lit the night changed with technology and money (hearth, rushlight, oil, gas, electric,
the blackout), and some of those changes have documented dates for Llandeilo
([light-after-dark research](../research/light-after-dark.md)).

## Decision

- **`src/content/lamplight.ts`** holds `LampKey`s like the climate keys: a year and how sure that
  date is (`dated: 'on' | 'by'`, where `by` means no later than, so a sample date or the first source
  to mention a light is never shown as its start), what most homes burned, what lit the streets,
  window share, glow, warmth, hearth strength, the almanac's words for it, and a provenance. A key's
  date comes from a source; its levels are reconstructed and say so.
- **Street light is a union, and lit streets carry their area.** `streets` is `none`, `off` (the
  blackout), or `gas | electric | dimmed` with a glow and a `LitArea` outline. The area is content,
  not a renderer guess: the sources say "the town", so lamps are drawn only in Llandeilo north of the
  Tywi, never in Ffairfach. A key cannot light streets without saying where.
- **Keys hold until the next one; they do not interpolate.** Technology arrives on a date, and a
  blend would draw years half lit by gas that no source supports (and would dim the blackout in
  gradually). The climate keys blend because climate drifts; lighting does not.
- **`snapshotAt` resolves the key** (`Snapshot.lamplight`) and puts its almanac entry ("Light after
  dark", with the key's ⓘ) into `Snapshot.almanac`, so what lights the scene is always labelled in
  the UI. The pure `lampsAt(style, level)` combines the key with the time-of-day level into a
  `LampState` (colour, window strength, window share, hearth, street glow and area). The renderer
  reads only that state, with no era checks.
- **Street lamps are placed by the pure `streetLampPoints`**: along today's roads, near the town's
  houses, inside the key's area, because their positions are not recorded. Only the town feature
  most present gets lamps, so the fade between the Victorian and modern towns never draws two sets.
  A content test requires any key with street light to be documented and its area to exclude
  Ffairfach; a snapshot test checks there is none before 1876.

## Consequences

The night now changes with the timeline, the blackout is dark, and the almanac says what lit each
year, with its sources. Adding a key (say, mantles if a source records them) is one content edit.
Window shares are per era, not per class or place: the buildings carry no class, and countryside
farms are drawn with the town's windows, which the 1902 and 1945 keys' notes call a guess.

## Alternatives considered

Interpolating like the climate (rejected above); a feature per street lamp in `features.ts` (one
feature per lamp is data we do not have, and lamps that follow the town need no positions);
special-casing eras in the renderer (forbidden by the unified law).

## Corrected 2026-10-03

- [ADR 0032](0032-night-light-before-the-first-key-and-period-dates.md) replaced two details above: a
  year before the first key has no key and no light entry (not the first key), and `dated` has a
  third kind, `'in'`, for a key that only marks a period.
- `warmth` now colours the windows only. Street lamps take their own colour from `streets.kind` (gas
  and dimmed as flame, electric whiter), carried on `StreetGlow`; with one shared colour, moving 1902's
  homes back to flame light had turned the electric street lamps gas-orange too (second-Opus review).
- A key may give its street lamps their own colour (`streets.warmth`), overriding the kind's default.
  The per-kind colour of 1902 had also turned every street lamp from 1945 to today near-white; the
  1945 key keeps its warm 0.45, a reconstruction, since the post-war lamp type is not researched
  (third review, 2026-10-03).

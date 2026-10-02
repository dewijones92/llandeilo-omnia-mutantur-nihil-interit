---
title: "ADR 0028: How the night was lit is dated content keys, held not blended"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0028: How the night was lit is dated content keys, held not blended

- **Status:** Accepted
- **Date:** 2026-10-03

## Context

One scalar, `Lighting.lamps` from `lightingAt` (time of day only), lit every window and hearth the
same way in every era: medieval cottages glowed like a 1960s street, and the town was lit in 1942.
How people lit the night changed with technology and money (hearth, rushlight, oil, gas, electric,
the blackout), and some of those changes have documented dates for Llandeilo
([light-after-dark research](../research/light-after-dark.md)).

## Decision

- **`src/content/lamplight.ts`** holds `LampKey`s like the climate keys: a year, what most homes
  burned, what lit the streets, window share, glow, warmth, hearth and street strength, and a
  provenance. A key's date comes from a source; its levels are reconstructed and say so.
- **Keys hold until the next one; they do not interpolate.** Technology arrives on a date, and a
  blend would draw years half lit by gas that no source supports (and would dim the blackout in
  gradually). The climate keys blend because climate drifts; lighting does not.
- **`snapshotAt` resolves the key** (`Snapshot.lamplight`), and the pure `lampsAt(style, level)`
  combines it with the time-of-day level into a `LampState` (colour, window strength, window share,
  hearth, street). The renderer reads only that state: building windows, hearth glow and the new
  street lamps take their colour and strength from it, with no era checks.
- **Street lamps are drawn only for town features**, along today's roads where the town's houses
  stand, because their positions are not recorded. A content test requires any key with street
  light to be documented, and a snapshot test checks there is none before 1876.

## Consequences

The night now changes with the timeline, and the blackout is dark. Adding a key (say, mantles if a
source records them) is one content edit. The keys have no ⓘ in the UI yet, like the climate keys;
an almanac entry is the natural place for one. Window shares are per era, not per class: the
buildings carry no class.

## Alternatives considered

Interpolating like the climate (rejected above); a feature per street lamp in `features.ts` (one
feature per lamp is data we do not have, and lamps that follow the town need no positions);
special-casing eras in the renderer (forbidden by the unified law).

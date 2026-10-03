---
title: "ADR 0032: No night light before the first key, and keys that only mark a period"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0032: No night light before the first key, and keys that only mark a period

- **Status:** Accepted, amends [0030](0030-night-light-as-dated-content-keys.md)
- **Date:** 2026-10-03

## Context

Under ADR 0030 a year before the first key fell back to that key, so from 12,500 BC the almanac
said "By 7800 BC ... firelight from the hearth lit every home", with a span that did not cover the
year, and the scene drew hearths and lit doorways in the Late Ice Age, when no house is known in
Wales. The independent check of the light research (2026-10-03) also found that the c. 1200 key's
date had no source: the law-book it quotes is linked to Deheubarth, but no source read dates that
text's manuscripts, so neither "on" nor "by" 1200 is honest.

## Decision

- **Before the first key there is no key.** `lampStyleAt` and `lampAlmanacAt` return `undefined`,
  `Snapshot.lamplight` is `LampKey | undefined`, the almanac has no "Light after dark" entry, and
  `lampsAt(undefined, level)` lights nothing. Nothing is said or drawn where nothing is known.
- **A third `Dated`, `'in'`**: the key's year only marks a period that its words name ("In the
  Middle Ages ..."); no source dates it closer. The content test that makes each key's words open
  with its certainty ("By", "From") now also accepts "In" / "Yn" for these keys.
- **One rule for street lamps.** `hasStreetLamps(streets)` is the type guard every caller uses
  (`lampsAt`, the debug overlay, the content and snapshot tests); `streetGlowOf` is gone.

## Consequences

Before 7800 BC the night is dark apart from the sky, and the almanac is silent on lighting. Adding a
key for an earlier period is one content edit. Code that reads `Snapshot.lamplight` must handle no
key; the compiler enforces it.

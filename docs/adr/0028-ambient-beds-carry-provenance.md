---
title: "ADR 0028: Every ambient sound bed carries a provenance"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0028: Every ambient sound bed carries a provenance

- **Status:** Accepted
- **Date:** 2026-10-03

## Context

The environment keyframes in `src/content/timeline.ts` gave each ambient bed a bare number. Nothing
said why a bed was heard, so unsourced sounds went unnoticed: church bells from AD 800, when the
first bells heard at Llandeilo in any source read are the peal for the first train in January 1857
([event-effects](../research/event-effects.md), [soundscapes](../research/soundscapes.md)); a train
bed on the 1850 key, so its level rose from 1600; and a market at 1250. Everything else on screen
already carries a provenance ([ADR 0007](0007-provenance-union-and-citation-keys.md)), and the climate
keys showed the pattern for keyframes.

## Decision

- A bed level is a `BedLevel`, `{ level, provenance }` (`src/domain/model.ts`), using the one
  `Provenance` union. A bed absent from a key is silent, so a level cannot exist without its reason.
- The reasons are named constants in `src/content/ambience.ts`. Most are *reconstructed* with a
  basis and the sources it rests on; *documented* is used only where a source records the thing that
  makes the sound here (the Tywi, the 1857 bells and train, the Shire Hall market, the Ffairfach
  smithy, the 1950s engines), with a note that the loudness is chosen by ear.
- `environmentAt` returns `beds`: each sounding bed, its level and the provenance of every keyframe
  it is heard from (one or both of the keys either side). The `?debug` overlay prints them.
- Content tests require every bed to have a level in (0, 1] and a provenance whose sources resolve,
  and no bell or train before 1857.

## Consequences

Adding a sound to an era now means saying why. The audio (`src/audio/ambience.ts`) still reads only
the numbers, so it is unchanged. Between two keys a bed fades, so its level in between is an
interpolation, not a claim; the debug overlay shows both keys' provenance there. Bells and the train
now start on a new 1857 key whose look lies on the 1850 to 1950 line, so it changes only the sound.

## Alternatives considered

- One provenance per keyframe: too coarse, since the wind and the bells in one year rest on
  different evidence.
- A provenance per bed for all time: the birds of the Ice Age and of today rest on different sources.
- A medieval handbell for the St Teilo legend: the bells bed is a church peal, and a legend written
  600 years later is not a sound bed. Left for a labelled scene, if ever.

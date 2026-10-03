---
title: "ADR 0028: Every ambient sound bed carries a provenance, on its own dated track"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0028: Every ambient sound bed carries a provenance, on its own dated track

- **Status:** Accepted
- **Date:** 2026-10-03 (revised the same day, before it landed, after the second-Opus review: see
  "Revised" below)

## Context

The environment keyframes in `src/content/timeline.ts` gave each ambient bed a bare number. Nothing
said why a bed was heard, so unsourced sounds went unnoticed: church bells from AD 800, when the
first bells heard at Llandeilo in any source read are the peal for the first train in January 1857
([event-effects](../research/event-effects.md), [soundscapes](../research/soundscapes.md)); a train
bed on the 1850 key, so its level rose from 1600; and a market at 1250. Everything else on screen
already carries a provenance ([ADR 0007](0007-provenance-union-and-citation-keys.md)), and the climate
keys showed the pattern for keyframes.

A second, quieter fault came from the same place: the keys were interpolated linearly, and a bed
missing from one key counted as silence, so every bed *faded in from silence* across the whole gap
before the key that names it. Bells were heard from 1851, the market from about 1276 (before the
1291 fair), chant from the 2nd century, motor traffic from the 1850s.

## Decision

- **Sound has its own dated tracks.** `Soundscape` (`src/domain/model.ts`) gives every bed its own
  list of `BedPoint`s, held in `SOUNDSCAPE` in `src/content/ambience.ts`. The look keys
  (`ENVIRONMENT`) no longer carry sound, so a sound date (20 January 1857) never needs a look key,
  and no look values are copied to make one.
- **A point is heard or silent.** A heard point is `{ year, level, provenance }`, using the one
  `Provenance` union; a silent point ends a bed. A level cannot exist without its reason.
- **No fade-in from silence.** `soundAt` (`src/domain/state.ts`) keeps a bed silent before its first
  point and after a silent point, until the next heard point, where it starts at that point's level
  (the audio smooths the step over about half a second). Between two heard points it interpolates;
  towards a silent point it fades out. So a bed is never heard before the date of the point that
  names it. A gradual start is written as an early heard point at a low level, with its own reason
  (livestock from c. 4000 BC, when the first farmers came).
- **An in-between year never wears the next point's reason.** Each sounding bed reports `since`, the
  reason of the last point that names it, and `towards`, the next point's reason when it differs,
  or `'silence'` when fading out. `?debug` prints e.g. `sound market 0.46 reconstructed, fading to
  documented victorian:S41 victorian:S65` at 1700.
- **Tiers.** Most reasons are *reconstructed*, with a basis and the sources it rests on. *Documented*
  is used only where a source that is not just a lead records the thing making the sound here: the
  bells and the train of 20 January 1857 (a newspaper report, effects:S7) and the Shire Hall market
  (Coflein, victorian:S41). The Tywi, the drovers and the Ffairfach smithy rest on encyclopedia pages
  and are reconstructed, with those pages kept as leads.
- **Tests.** Content tests require every heard point to have a level in (0, 1], sources that resolve,
  a basis, note or grounding in both languages for its tier, and points in date order on the
  timeline; no bed to be heard before the point that names it (scanned across every gap); and no bell
  or train before 1857. Unit tests cover `soundAt` itself.

## Consequences

Adding a sound to an era now means saying why and from when. The audio (`src/audio/ambience.ts`)
still reads only the numbers, now from `snapshot.sound.levels`. Removing the fade-ins changes what is
heard in a few gaps: bells, the train, the market (from 1600), motor traffic (from 1950), chant (from
800), the forge (silent 800 to 1250, from 400 BC before that) and the Ice Age birds and woodland start
on their points rather than rising towards them. Where that leaves a sound starting later than it
surely did (cars before 1950, the fair from 1291), the gap is recorded in
[open questions](../research/open-questions.md) rather than filled without a source.

## Revised

The first version kept sound on the look keys as `{ level, provenance }` and added an 1857 look key
whose values were hand-copied from the 1850 to 1950 line. The review showed that bells and the train
still faded in from 1851 (labelled documented), that in-between years showed the next key's
documented reason as their own, that three "documented" beds rested only on encyclopedia pages, and
that the copied look key would kink silently if either neighbour were retuned. This version replaces
it before it landed on `main`.

## Alternatives considered

- One provenance per keyframe: too coarse, since the wind and the bells in one year rest on
  different evidence.
- A provenance per bed for all time: the birds of the Ice Age and of today rest on different sources.
- Keeping sound on the look keys with a "hold" key before 1857: two fake look keys instead of one.
- One shared list of sound keys, separate from the look: every dated point for one bed would still
  need every other bed's level copied onto it.
- A medieval handbell for the St Teilo legend: the bells bed is a church peal, and a legend written
  600 years later is not a sound bed. Left for a labelled scene, if ever.

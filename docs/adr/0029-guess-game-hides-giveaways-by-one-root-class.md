---
title: "ADR 0029: The guess-the-year game hides giveaways with one root class, and draws its clues from provenance"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0029: The guess-the-year game hides giveaways with one root class, and draws its clues from provenance

- **Status:** Accepted
- **Date:** 2026-10-03
- **Number:** written as 0028 on its branch, renumbered to 0029 because three branches built in
  parallel each took 0028.

## Context

"When are we?" ([ideas board](../design/ideas-2026-10-02-ranked.json)) hides the year and asks the
viewer to read it from the landscape. About a dozen elements give the year away: the year readout,
the era name and colours, the key-date markers and their counter, the slider handle, the moment
card, the almanac and language panels, place labels, conversation bubbles and panel, the follow chip
and `?debug`. Each is owned by a different component. The reveal then has to say how the year could
have been known, without claiming more than the content supports.

## Decision

- **One class on the root hides every giveaway.** Elements that reveal the year carry the marker
  class `reveals-when`; `html.guessing .reveals-when { display: none }` hides them all. No component
  holds game state or knows the game exists. The timeline marks its own parts; `main.ts` marks the
  panels. A new panel that shows the year must add the class.
- **The slider takes the guess.** `TimelineBar.takeGuess(cb)` routes pointer and keys on the track to
  a ghost marker instead of time, and turns key-date stepping off, so nothing the viewer does while
  guessing can move the hidden moment or reveal it.
- **The rules are pure and tested** in `src/domain/guess.ts`: rounds come from key dates with at least
  one feature to date them by (so no deep time yet); scores are distances on the timeline's own `t`;
  clues are on-screen features whose dates cover the year, ranked by how narrowly those dates
  bracket it.
- **Firm means a record and exact dates**, as the idea's pitch says. A feature carries
  `datesExact: true` only where a source gives both ends as attested years (an end at the present
  counts). Only a documented feature with exact dates is a firm clue; a documented feature drawn over
  rounded or inferred years, or a reconstructed one, is probable and its range reads "c."; an
  imagined one is never a clue. Three features are marked exact: the railway (January 1857,
  cross-checked), Llandeilo Bridge (completed 1848, Cadw listing) and Carreg Cennen's ruin (slighted
  1462, Cadw and Coflein).
- **Dates cover the year half-open** (`from <= y < to`, with a range to the present inclusive), so
  where one phase hands over to the next at the true year only the new phase is a clue.
- **A climate clue is always probable** (its type says so), and says it comes from the reconstructed
  model. Whether it shows depends on the season: `climateShows` compares the lowest snow the season
  can put on any slope, then and today, with the highest ground in the terrain, and the clue says
  "you can see it", "switch to winter to see it", or that the scene does not show it.
- **"The scene cannot tell them apart"** is said only when every drawn thing matches: the features on
  screen, the people of each live conversation, and every drawn field of the environment (land,
  mapped woodland, fog, sky colours). The comparison is keyed by the `Environment` type, so a new
  field fails to compile until it is compared.
- **The reveal arrives as a snap does**, through `TimelineBar.snapTo`, and adopts the key date's
  recorded sky.
- **The game panel shares the right-hand slot** with the almanac, language, About and conversation
  panels: while one of those is open the root carries `side-panel-open` and the game panel steps
  aside; in `?debug` the overlay gives the slot to the game panel.

## Consequences

Hiding is one CSS rule and a list of marked elements, checked by one e2e test that opens the almanac
and `?debug` before a round. Most clues are now probable, since most drawn ranges are rounded; a
feature gains `datesExact` only with a source for both ends. Rounds are key dates only, so a regular
player can learn their positions, and two answers (c. 800 BC and AD 74) sit exactly on labelled
ticks under the slider, which stay visible to give the bar a scale. *Decided 2026-10-03 by Claude
under the proactive mandate*: while a round is played the ticks stay but lose their labels
(`.guessing .tl-tick`), so the bar keeps its scale and gives no answer away; jittering the hidden
moment was not chosen because rounds are meant to land on dated key moments. *Corrected 2026-10-03*:
when this was written a tick was only its label, so hiding the labels left no scale at all; each
tick now draws its own mark (`.tl-tick::before`), which stays visible during a round, and the e2e
test checks the mark is there while the label is transparent.

## Alternatives considered

A "hidden" flag in each component (a dozen places to keep in step, and the DRY law); a separate
guess slider (a second time control to keep aligned with the first); showing every on-screen feature
as a clue (fading phases whose dates do not include the year would mislead); calling every
documented feature firm (the first build did; the review showed Roman forts and an unexcavated
hillfort labelled firm beside a "c." answer).

## Corrected 2026-10-03

- The "cannot tell them apart" comparison is no longer keyed by `Environment` alone. It is a record
  over every `Snapshot` field (`SCENE` in `src/domain/guess.ts`): the environment, the climate chill,
  the night-light key, the features on screen and the live conversations are compared, and the year,
  era, sound, almanac, language and nearest event are marked "not seen". A new `Snapshot` field is a
  compile error until it is classified. The night light is compared by what a key draws (homes,
  streets, window share, glow, colour, hearth; `sameLight`, itself a record over `LampKey`), not by
  which key it is, so two keys that draw the same night look the same.
- Four features are now exact: the railway's 1857 and 1858 sections, Llandeilo Bridge and Carreg
  Cennen's ruin. Since [ADR 0034](0034-exact-dates-draw-nothing-outside-them.md) an exact feature is
  never on screen outside its dates.
- `datesExact` no longer implies a record: [ADR 0035](0035-exact-dates-are-about-dates-not-clues.md)
  allows it on reconstructed features, so they are drawn exactly on their dates. A firm clue still
  needs both a documented provenance and exact dates.

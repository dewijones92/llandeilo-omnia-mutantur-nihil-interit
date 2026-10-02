---
title: "ADR 0028: The guess-the-year game hides giveaways with one root class, and draws its clues from provenance"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0028: The guess-the-year game hides giveaways with one root class, and draws its clues from provenance

- **Status:** Accepted
- **Date:** 2026-10-03

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
  clues are on-screen features whose dates contain the year, ranked by how narrowly those dates
  bracket it. Provenance sets the strength: documented is a firm clue, reconstructed a probable one,
  imagined is never a clue. A climate clue comes only from the climate keys, spans the years the
  model keeps the chill past a visible threshold, and always says it comes from the reconstructed
  model.

## Consequences

Hiding is one CSS rule and a list of marked elements, so it is checked by one e2e test. The clue text
states only a feature's own `when` range and its provenance badge; features have no "approximate"
flag, so a documented feature with a rounded end date (Dinefwr Castle to 1600) is still called firm,
and the badge's sources carry the detail. Rounds are key dates only, so a regular player can learn
their positions; jittering the moment is a later option.

## Alternatives considered

A "hidden" flag in each component (a dozen places to keep in step, and the DRY law); a separate
guess slider (a second time control to keep aligned with the first); showing every on-screen feature
as a clue (fading phases whose dates do not include the year would mislead).

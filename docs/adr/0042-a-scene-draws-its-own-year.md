---
title: "ADR 0042: A scene draws the world at its own year, an open ⓘ pauses it, and the interface behind it is inert"
kind: adr
status: accepted
updated: 2026-10-09
---

# ADR 0042: A scene draws the world at its own year, an open ⓘ pauses it, and the interface behind it is inert

- **Status:** Accepted (decided by Claude under the proactive mandate, [ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md), so Dewi can overrule it); amends [0041](0041-cutscenes-as-data-on-one-clock.md)
- **Date:** 2026-10-03

## Context

The second-Opus review of the cutscene branch (2026-10-03) found three faults in how a scene sits on
top of the rest of the app:

- **The later fort stood on the ridge before the army arrived.** A scene overrode only the features it
  builds and left the rest at the timeline's presence. At the AD 74 key date `presenceAt` has the
  smaller fort (`roman-fort-b`, from AD 83, dated "c.") already faded in to 0.93, because the fade is
  measured along the slider, not in years. So for the whole scene a finished second fort stood where
  the column was marching, and the two forts were drawn one over the other once fort A rose. Coflein
  says the later fort lies over part of the earlier one and belongs to a later garrison. No test
  checked what is on screen in a scene frame.
- **Escape on an open ⓘ skipped the scene.** The ⓘ's own Escape handler closed the popover, and the
  app's handler, on the same key, ended the scene. The caption's ⓘ was also replaced every few
  seconds as the captions moved on, under the reader.
- **Tab reached the faded interface**: the moment card, language buttons, almanac and compass were
  `opacity: 0` but still focusable and worked with Enter underneath the scene.

## Decision

- **A scene is set at its key date's year.** `sceneFeatures` in `src/domain/cutscene.ts` is the one
  rule for what the world draws while a scene plays: a feature the scene builds takes the scene's
  presence; every other feature is drawn only if its dates contain the scene's year (`contains`, so
  a phase ending at that year still counts). The slider's soft fade, right for scrubbing, does not
  leak into a scene. `main.ts` sets the year when the scene starts, so no frame draws the old picture.
  It filters the presence once per apply and gives the result to everything the scene draws: the
  features, their smoke and hearth glow, and the forest clearings (review of 2026-10-09: the smoke and
  clearings first read the raw slider presence, which was harmless at AD 74 but would have shown smoke
  from a feature the scene hides).
- **A combined-answer test** (`tests/content.test.ts`, "a cutscene on screen") samples every scene four
  times a second through `snapshotAt`, `frameAt` and `sceneFeatures`: nothing is drawn whose dates do
  not contain the scene's year unless the scene builds it, and nothing stands at a building site
  before its build track starts.
- **An ⓘ showing in the letterbox pauses the scene**: while a popover there is open, focused or
  hovered, the player holds the clock and the narration (and so the caption under the reader), and the
  header says "Paused while the ⓘ is open". It resumes when the ⓘ closes.
- **Escape closes an ⓘ first.** The ⓘ's keydown handler runs in the capture phase and marks the
  Escape it handled with `preventDefault`; the app leaves a handled Escape alone, so closing an ⓘ
  never also skips a scene (or closes a panel).
- **The interface behind a scene is `inert`**: every child of `#app` except the letterbox, and the
  canvas, from the scene's start to its end, the same way the Begin card already holds focus.

## Consequences

- A scene cannot show a feature from outside its year by accident; to show one on purpose (a ruin
  still standing, a building finished early), the scene must name it in a feature track.
- Procedural sound cues are scheduled when they start (ADR 0041), so a long cue (the tramp of feet)
  keeps playing while the scene is paused and ends that much earlier relative to the picture.
- The fade of the later fort at the AD 74 key date itself, outside any scene, is unchanged: it is
  [ADR 0034](0034-exact-dates-draw-nothing-outside-them.md) territory (a "c." date fading in over
  the slider) and is raised with Dewi in the todo file rather than decided here.

## Alternatives considered

- **`show: 'absent'` on a feature track**, naming each feature a scene must hide: the review's first
  suggestion. Every scene would have to list what its year should not contain, and a new feature dated
  near a scene's year would appear in it until someone noticed. The year rule needs no list.
- **Hiding only features whose `from` is later than the year**: it would leave a phase that ended
  before the year still fading out under the scene, the same fault the other way round.
- **Escape only closes an ⓘ, without pausing**: the caption would still replace the open popover a
  few seconds later, so the reader would lose it anyway.

---
title: "ADR 0045: One welcome panel, with an icon that always reopens it"
kind: adr
status: accepted
updated: 2026-10-09
---

# ADR 0045: One welcome panel, with an icon that always reopens it

- **Status:** Accepted, amends [0044](0044-map-style-camera-controls.md) (its hint and Keys panel)
- **Date:** 2026-10-09
- **Number:** written as 0042 on its branch, renumbered to 0045 when `main` (which had taken 0041 to
  0043 for the cutscenes) was merged in.
- **Amended 2026-10-09, merging the cutscenes ([ADR 0041](0041-cutscenes-as-data-on-one-clock.md)):**
  the welcome never opens over a playing scene. One due at start (a `?cutscene=` link) waits and opens
  when the scene ends; a scene that starts while it is open closes it first (before the scene marks the
  interface inert, since closing clears the welcome's own inert marks) and brings it back at the end.
  `?` and the Keys button do nothing during a scene, and the "?" icon fades with the rest of the
  interface (it sits in the top-right corner, clear of the captions in the lower bar). Escape ends the
  scene first, then closes the welcome, then a popover, then a panel. The panel now says that some key
  dates have a scene, played with Watch on the date's card and ended with Skip or Esc. Chosen by Claude
  under the proactive mandate.
- **Decided by:** Dewi asked for the panel and the icon (2026-10-03, see the decision log). The details
  below (when it opens, what it holds, how it closes) were chosen by Claude under the proactive mandate
  ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), so Dewi can overrule them.

## Context

Dewi, 2026-10-03 06:27 UTC, typed in the session, verbatim: "show the controls etfc etc and other info on
app start?  closeable  ... but have a obvious icon to open app info etc again please" (the decision log
records it). The app had two
help surfaces that nobody saw at the right moment: a one-time camera hint that faded after the first
drag, and a Keys panel behind a small button. Neither said what the timeline, the provenance labels or
the ⓘ mean, which is the project's central promise.

## Decision

- **One panel**, "How to explore" / "Sut i grwydro" (`src/ui/welcome.ts`), replaces the Keys panel
  (`shortcuts.ts`) and the camera hint (`camera-hint.ts`), both deleted. Sections: the mouse and key
  controls (the same rows the Keys panel had), the timeline, Previous/Next and key dates, the three
  provenance labels drawn as the real badges, the ⓘ, "When are we?", and the language, Graphics and
  Sound settings. Every string is in `strings.ts` in both languages.
- **When it opens:** once the valley is open, which is right after Begin where the Begin card shows,
  and as soon as the valley is ready where it does not (deep links, `?begin=0`). Not under the Begin
  card (its z-index is 100, the welcome's 90, and `?` is ignored while the card waits). Deep links
  get it too: a shared link is often someone's first visit.
- **Not under automated browsers** (`navigator.webdriver`) unless `?welcome=1`, the same rule as the
  Begin card, so the existing e2e tests are unaffected. `?welcome=0` turns it off. The decision is a
  pure function, `welcomeAtStart` in `src/domain/opening.ts`, which also says why, for the log.
- **"Show this at start"**, ticked by default, is remembered in `localStorage` (read and written in
  try/catch). Unticked, it stays closed even with `?welcome=1`; the icon still opens it.
- **Closing:** the ✕, Escape, `?`, "Start exploring", or a click that both starts and ends on the wash
  outside the panel (so selecting text and releasing outside does not close it). The wash takes the
  click, so closing never moves the camera.
- **The icon:** a round "?" with a caption (the panel's title, EN and CY) and a tooltip, always visible
  in the top right beside the compass. It reopens the panel at the top. `?` and the old Keys button open
  it at its controls section.
- **Modal like the Begin card:** while open, `#app` and the canvas are inert (`setInert` in `dom.ts`,
  shared with the card), focus goes to the title (or the controls heading), returns to what had it,
  and no other key reaches the timeline or panels behind. It therefore comes first in the Escape order.
- **"About this project"** in its footer closes it and opens the About panel.

## Consequences

- One place to explain the app, and one to keep current when a control changes. The Keys button stays
  (it opens the controls section) so no one who knew it loses it.
- The panel is tall: it scrolls inside a viewport-high card (`max-height: calc(100dvh - 48px)`), and
  the foot with the checkbox stays in view.
- The camera ADR's one-time hint is gone; nothing remembers a first drag any more. The remembered
  choice is now the checkbox.
- The "?" icon and compass are both top right. The icon's two-line caption reaches 105px down, so the
  right-hand panels start at `--below-compass` (112px) to clear it; an e2e test checks that `.info`,
  `.convo` and `.guess` never overlap the icon, in English and Welsh (found in review: at 92px the caption
  sat over the About panel's top edge). The labels test also treats the icon as a panel.

## Alternatives considered

- **Keep the Keys panel and add a welcome beside it:** two overlapping help surfaces, twice the text to
  keep right. Rejected.
- **Open only on a first visit (remembered after the first close):** Dewi asked for it at start with a
  way to turn it off, and a first-visit rule would hide it from anyone who clears storage or arrives
  from a second device. A checkbox is explicit.
- **Show it under the Begin card:** the card is the opening; stacking two dialogs hides the motto.

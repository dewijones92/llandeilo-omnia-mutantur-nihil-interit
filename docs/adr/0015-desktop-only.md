---
title: "ADR 0015: Desktop only, with a banner elsewhere"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0015: Desktop only, with a banner elsewhere

- **Status:** Accepted
- **Date:** 2026-09-28

## Context

The first plan was desktop-first with phones that "must work, not shine", plus accessibility for
hover, tap and keyboard focus. Reviews kept raising phone-layout and screen-reader findings, such as
Previous/Next wrapping on a 390px screen and hiding the moment card's ⓘ. Dewi, 2026-09-28: "remove
the requirement to support mobile and accessibility stuff like screenreaders please … if on non
desktop put a removeable banner that says this is best viewed on desktop".

## Decision

The app targets desktop browsers only. Phone, tablet, touch and screen-reader support are not
requirements. `src/ui/desktop-banner.ts` shows a dismissible "best viewed on a desktop computer"
banner when the device has a coarse pointer or a viewport 900px wide or less. Closing it is
remembered in `localStorage`, and any storage failure is caught and logged.

## Consequences

Reviews and screenshots check desktop only, and phone findings are out of scope. Existing
responsive CSS and ARIA attributes stay, since removing them buys nothing, but they are not
maintained as requirements. Keyboard stepping and scrubbing remain as features. A narrow desktop
window also sees the banner, which can be closed.

## Alternatives considered

Keep phones working (a cost with every layout change, for a use Dewi doesn't need); block phones
entirely (unfriendly, when the page mostly works).

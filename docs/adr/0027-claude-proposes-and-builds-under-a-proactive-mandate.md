---
title: "ADR 0027: Claude proposes and builds its own ideas, under a proactive mandate"
kind: adr
status: accepted
updated: 2026-10-02
---

# ADR 0027: Claude proposes and builds its own ideas, under a proactive mandate

- **Status:** Accepted (Dewi, 2026-10-02: "claude needs to also be proactive coming with ideas and
  implementing them ... really stretch your legs and be proactive")
- **Date:** 2026-10-02
- **Amends:** [ADR 0022](0022-one-todo-file.md), where only Dewi agreed an item into the todo file.

## Context

Under ADR 0022 an item joined the todo file only once Dewi agreed it, so every idea waited on him.
Dewi asked Claude to act as a lead developer and historian who owns the project: to look for what
would make the app more vivid, more truthful or more fun, invent it and build it, without waiting
to be handed a list.

## Decision

- **Claude may agree its own ideas.** Each goes on the ideas board
  ([`docs/design/ideas.md`](../design/ideas.md)) marked "Claude, under the proactive mandate", gets a
  line in the todo file, and goes through the same path as any item: research first, independent
  check, build, second-Opus review, screenshots. It ships in a release, so Dewi sees it in the notes
  and can say no.
- **Other people's suggestions are unchanged.** A "Proposed" item or a GitHub issue joins the list
  only with Dewi's yes.
- **The laws still bind**: history first, invention labelled, sources for everything, licences for
  every asset ([ADR 0026](0026-open-licences-including-nc.md)), inside the ten-mile area. Proactive
  never means unsourced.
- **Still ask first** for anything outward-facing beyond pushes and releases (posting on issues, a
  new account, a paid service), anything costly to undo, and anything that changes the project's
  direction or tone (a new audience, removing a feature he asked for).
- **Bias to doing**: if an idea is cheap to try, build it behind the same review and let the release
  notes carry it, rather than asking.

## Consequences

- Ideas move without waiting on Dewi; his check moves from before the work to the release notes.
- The path, not the agreement, is now what guards quality, so skipping a step (an unchecked note, a
  missing screenshot) matters more and the second Opus review must look for it.
- The ideas board and the todo file must say who agreed each item, so Dewi can tell his own choices
  from Claude's.

## Alternatives considered

- **Keep Dewi as the only one who agrees work** (ADR 0022 as written): safe, but it is the waiting
  Dewi asked to end.
- **Let Claude build without recording the idea first**: faster, but invisible until a release, and
  it skips the research and check the first law needs.

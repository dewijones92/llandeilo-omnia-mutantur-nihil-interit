---
title: "ADR 0019: Other people's suggestions arrive as GitHub issues, and become cards"
kind: adr
status: accepted
updated: 2026-09-29
---

# ADR 0019: Other people's suggestions arrive as GitHub issues, and become cards

- **Status:** Accepted (Dewi, 2026-09-29: "A")
- **Date:** 2026-09-29

## Context

Dewi would like other people to add to the backlog. The board ([ADR 0018](0018-backlog-as-a-gated-board.md))
runs only on his laptop, on 127.0.0.1, and changing a card means pushing to the repo. The options
were issues on the public repo (they need a GitHub account), the board hosted on the Pi behind the
Google-gated private area (a second committer and a proxy), or giving people push access.

## Decision

- **Issues are the way in, the board stays the record.** `.github/ISSUE_TEMPLATE/` has three forms:
  a historical correction (asks for a source), an idea, and a bug. Each says the issue is public.
- **Triage turns an issue into a card in Idea**, with the issue's URL in its References (this repo's
  issue links are ordinary web links to the validator). It moves on only when Dewi agrees, as any card.
- **Anything posted on GitHub needs Dewi's yes each time**: commenting on, labelling or closing an
  issue is public. Making the card is a local change and does not.

## Consequences

- Nothing new to run or secure, and a report lands next to the work.
- Everyone who suggests something needs a GitHub account. If family members will not make one,
  revisit the Pi-hosted board (option B) for them.
- The correction form has no label yet: the repo has no `correction` label, and creating one is a
  change on GitHub, so it waits for Dewi. The idea and bug forms use the existing `enhancement` and
  `bug` labels.
- The in-app "Report a correction" link from [`../design/feedback.md`](../design/feedback.md) can now
  open the correction form; it is still a proposal.

## Alternatives considered

- **The board on the Pi, Google-gated**: no GitHub account needed, but its edits must be committed
  and pushed from the Pi while Dewi also pushes from the laptop, and it needs a proxy and sign-in.
- **Push access for contributors**: each would have to clone the repo and run the board.
- **GitHub Projects as the board**: rejected in ADR 0018.

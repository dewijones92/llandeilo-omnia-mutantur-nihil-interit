---
title: "ADR 0020: Suggestions arrive as plain GitHub issues, with no issue forms"
kind: adr
status: accepted, posting rule superseded
updated: 2026-10-01
---

# ADR 0020: Suggestions arrive as plain GitHub issues, with no issue forms

- **Status:** Accepted (Dewi, 2026-10-01: "I want a vanilla github issue thing"). Its "Dewi's yes
  each time" for posts was replaced the same day by one batch per session,
  [ADR 0021](0021-issue-triage-at-session-start.md).
- **Date:** 2026-10-01
- **Supersedes:** the issue-forms part of [ADR 0019](0019-suggestions-arrive-as-github-issues.md).
  The rest of 0019 stands.

## Context

ADR 0019 added three issue forms (correction, idea, bug) in `.github/ISSUE_TEMPLATE/` and turned
blank issues off, so every issue went through a form. Dewi would rather people just open an ordinary
issue and write what they like.

## Decision

- **No issue templates or forms.** `.github/ISSUE_TEMPLATE/` is removed, so GitHub shows its plain
  "new issue" page with blank issues allowed.
- **Everything else in ADR 0019 stays**: issues are the way in and the repo is the record; triage
  puts an issue on the ideas board with a link; it becomes a card only once Dewi agrees it; triage
  copies only the substance, never a contributor's name or anyone's personal details; and commenting
  on, labelling or closing an issue needs Dewi's yes each time.

## Consequences

- People no longer see the forms' warning that an issue is public, or the request to leave out the
  names of living people. Triage still keeps names out of the repo, and asking an author for missing
  details (a year, a place, a source, an asset's licence) is a comment, so it needs Dewi's yes.
- Issues no longer get the `bug` or `enhancement` label on their own; triage can suggest one.
- A pre-filled in-app link ([`../design/feedback.md`](../design/feedback.md), still proposed) can use
  GitHub's plain `?title=…&body=…` parameters instead of form field ids.

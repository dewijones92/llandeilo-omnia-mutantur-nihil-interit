---
title: "ADR 0001: Record architecture decisions"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-09-28

## Context

Decisions were spread over CLAUDE.md, the decision log and commit messages. The reasons, and the
options rejected, were easy to lose. Dewi, 2026-09-28: "make sure to document ADRs, and anything
else".

## Decision

Each significant technical decision gets an ADR in `docs/adr/`, numbered, one file per decision, and
never rewritten after acceptance: only its status changes, or a dated "Corrected" note is added
when a detail proves wrong while the decision stands. A changed mind means a new ADR that supersedes
the old one. CLAUDE.md's Decisions table remains the current summary and links here.

## Consequences

Architecture history survives compaction, new sessions and new contributors. It costs a short file
per decision.

## Alternatives considered

Keep everything in the decision log (rows are too short for context and consequences); commit
messages alone (not browsable, not linked from the docs).

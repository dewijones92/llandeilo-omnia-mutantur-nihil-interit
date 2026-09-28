---
title: "ADR 0014: Parallel agents in worktrees, and a second review of every commit"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0014: Parallel agents in worktrees, and a second review of every commit

- **Status:** Accepted (Dewi wrote "remove" and confirmed on 2026-09-28 that he meant "review")
- **Date:** 2026-09-28

## Context

Dewi asked for sub-agents to speed the work up (all Opus 5.5), and for another Opus to review what
is committed.

## Decision

Independent streams run as background agents in git worktrees under `.claude/worktrees/`, each on
its own dev-server port. Their work is verified and merged into `main` by the lead session. Each
milestone or commit gets an independent Opus review, and its CRITICAL and IMPORTANT findings are
fixed first. Findings are treated as hypotheses and checked.

Corrected 2026-09-28: Dewi asked to be consulted first ("ask me first before you do this, as
sometimes I wanna not use all my tokens"). Parallel agents and worktrees now need his yes each time;
the single review of a commit does not.

## Consequences

Faster, but merges can conflict on shared files (`main.ts`, `content`), so agents are given disjoint
areas. Worktrees are excluded from Prettier and not committed.

## Alternatives considered

One session doing everything in sequence (slower).

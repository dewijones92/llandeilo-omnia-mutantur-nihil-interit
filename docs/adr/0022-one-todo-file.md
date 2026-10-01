---
title: "ADR 0022: One todo file, no board"
kind: adr
status: accepted
updated: 2026-10-01
---

# ADR 0022: One todo file, no board

- **Status:** Accepted (Dewi, 2026-10-01: "we have a todo md?? lets just use that?? and github
  issues???", then "yes please" to removing the board)
- **Date:** 2026-10-01
- **Supersedes:** [ADR 0018](0018-backlog-as-a-gated-board.md) entirely, and the place for issue
  rows in [ADR 0021](0021-issue-triage-at-session-start.md) (the ideas board), which moves to the
  todo file.

## Context

The board pilot (ADR 0018) left two places for work: five task files in `docs/todos/tasks/` and the
rest in `docs/todos/_index.md`, with a third place for issue rows on the ideas board. Dewi found it
confusing and wants two things only: GitHub issues, where other people write, and one todo file,
which Claude keeps in step with them.

## Decision

- **`docs/todos/_index.md` is the one list of work.** The five pilot tasks are back in it as
  ordinary checklist lines, with their acceptance criteria folded in.
- **Issue rows live in its "From GitHub issues" table**, triaged exactly as ADR 0021 says, and move
  into the list once Dewi agrees them.
- **Removed:** the Backlog.md tool and its config, `npm run board`, `npm run todos`, the validator in
  `tools/todos/` and its three test files, the gate in CI and the pre-push hook, the task files, and
  the per-task review records in `docs/reviews/`.
- **The path an item goes through** (agreed, researched, research checked, built, reviewed, looked
  at) is a short checklist at the top of the todo file instead of code.

## Consequences

- One file to read and edit, and nothing extra to run or keep in step with an upstream tool.
- Nothing stops an item being ticked before it has been through its path; that is now down to
  Claude following the checklist, and to the second Opus review noticing when it hasn't.
- The second Opus review still runs on every commit, as CLAUDE.md says; it is just no longer filed
  per task.
- Items have no ids, so commits name the item in words.
- Git history keeps the pilot (commit `2f5d4a1`) if a board is wanted again.

## Alternatives considered

- **Keep the pilot and move everything onto the board**: one place, but more machinery than this
  project needs, and Dewi chose the simpler file.
- **Issues as the backlog (GitHub only)**: every edit public, and ADR 0018's reasons against a board
  as the source of truth still hold.

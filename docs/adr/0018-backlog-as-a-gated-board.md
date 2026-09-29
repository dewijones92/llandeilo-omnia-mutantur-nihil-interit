---
title: "ADR 0018: The backlog is a board of task files in the repo, gated by a validator"
kind: adr
status: accepted
updated: 2026-09-29
---

# ADR 0018: The backlog is a board of task files in the repo, gated by a validator

- **Status:** Accepted, as a pilot (Dewi, 2026-09-29: "yes go ahead with the pilot")
- **Date:** 2026-09-29

## Context

The backlog was one long markdown list (`docs/todos/_index.md`): no ids for commits to cite, status
held only by which heading an item sat under, epics next to one-line fixes, and it had already gone
stale once. Meanwhile every item already follows the same path (agreed, researched, research
checked, built, reviewed, looked at) but that path lived only as prose in CLAUDE.md, which nothing
checks. Dewi wanted a GUI, ideally gated, and asked whether the board or the files should be the
source of truth.

## Decision

- **Tasks are files in the repo, and the board is a view that edits them.** We use
  [Backlog.md](https://github.com/MrLesk/Backlog.md) (MIT), pinned exactly to `1.53.0` in
  `package.json` because it rewrites our files. Its settings are in `backlog.config.yml` at the root;
  tasks are `docs/todos/tasks/t-NNN - <title>.md`, ids `T-NNN`. `npm run board` serves the
  drag-and-drop board on :5052 (the port is in the config). Auto-commit is off and git hooks are
  never bypassed.
- **Columns are the path**: Idea, Agreed, Researching, Research verified, Building, Review, Done.
  **Types** say which gates apply: `content`, `look`, `research`, `code`. Both lists are `COLUMNS` and
  `KINDS` in `rules.ts`; the config must match them, the columns exactly and in order, because each
  gate applies from a column's position.
- **Repo files are linked as GitHub URLs**, written `https://github.com/<owner>/<repo>/blob/main/<path>`
  (an `#anchor` or `?query` may follow; only the host, owner and repo may differ in case), with the
  owner and repo read from `package.json`'s `repository`, because the board only makes `http(s)` links
  clickable. The validator maps them back to repo paths to check the files exist. Any other link to a
  file in this repo (another branch, a permalink, `tree`, `raw`, `http`, `www`, a `..` or an encoded
  `/`) and any bare path is rejected with the URL to use instead. Links to this repo's issues, pull
  requests or Actions are ordinary web links. A missing or non-GitHub `repository` fails the check, so
  link checking cannot quietly switch off.
- **Gates are code**: `tools/todos/rules.ts` holds them, `tools/todos/files.ts` parses the files
  (both tested, and under the coverage floor) and `tools/todos/check.ts` wires them to the disk. It
  runs in `npm run check` and CI on the working tree, and in the pre-push hook on each commit being
  pushed (`--ref <sha>`), so a card committed past a gate it has not met fails the push, the same way a "documented" item with no
  sources fails the build. Gates add up as a card moves right. The rules are in `GATES` in
  `rules.ts`; read them there rather than from a copy in the docs.
- **A review is recorded** in `docs/reviews/T-NNN.md` ([format](../reviews/README.md)); Done needs one
  that says `verdict: passed`.

## Consequences

- Commits can cite `T-NNN`, and moving a card is a one-line diff that the second review sees.
- **The board does not block a drag.** Backlog.md has no pre-move hook (its `onStatusChange` runs
  after the move and cannot refuse it), so the gate fires on push, not on drop. Verified in its
  source on 2026-09-29.
- **The board drops frontmatter keys it does not know** when it saves a task (its serialiser writes a
  fixed list). Verified on 2026-09-29: an added `agreed_on:` key vanished on the next save. So we use
  only its own fields (`type`, `labels`, `references`, `documentation`), and the validator rejects any
  other key before it can be lost.
- **The board can edit References but only displays Documentation** (no add or remove control;
  found by the browser run below). So research notes are linked under References; the research gate
  also reads Documentation, for tasks made with the CLI's `--doc`.
- **Proven end to end in a browser** on 2026-09-29: one card was created on the board and dragged
  from Idea to Done in a throwaway copy of the repo, with the validator run after every step. Each
  gate refused it for the right reason until its evidence existed (16 steps, all as expected), and an
  uncommitted drag failed the working-tree check while the pushed commit passed.
- `backlog.config.yml` belongs to the tool, so Prettier ignores it.
- Only five agreed items moved in the pilot; the rest of the list stays in `_index.md` until the pilot
  is judged. Unagreed ideas stay where they were (`docs/design/ideas.md` and the list's "Proposed"
  section) until Dewi decides whether the Idea column replaces them.
- A link opens the version on `main` on GitHub, not unpushed local edits.
- The pre-push hook checks the commits being pushed, not the working tree, so an uncommitted drag on
  the board cannot block an unrelated push; `npm run check` still sees it. A pushed commit from before
  the board existed (an old tag, a rollback) has no `backlog.config.yml` and is skipped, not failed.
- Research notes are all `draft` today, so no `content` or `research` card can pass Research verified
  until its note has had an independent review and is marked `reviewed`. That is the research law in
  CLAUDE.md, now enforced.

## Alternatives considered

- **GitHub Projects as the source of truth**: a free board UI, but its fields cannot enforce a gate,
  each item's evidence would live in two places, the record leaves git, and on a public repo every
  status change an agent makes is a public post.
- **Forking Backlog.md** to add blocking hooks and keep custom keys: upstream moves fast (100+
  commits in the month to 2026-09-29, about 65k lines), so a fork would drift. If gating at drag time
  turns out to matter, send it upstream as a PR instead.
- **Vibe Kanban** (being shut down, tasks in a database), **VS Code Agent Kanban** (VS Code only,
  ELv2 licence, no gating), **AgentBoard** (one contributor).
- **A hand-written board page**: more to build and maintain than a tool that already exists.

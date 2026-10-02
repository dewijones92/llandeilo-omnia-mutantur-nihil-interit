---
title: "ADR 0025: Releases at visible milestones, with notes kept in the repo"
kind: adr
status: accepted
updated: 2026-10-02
---

# ADR 0025: Releases at visible milestones, with notes kept in the repo

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Every push to `main` deploys, so the live site changes many times a day and nothing marks what a
visitor would notice. Dewi asked for "a 'release' with release notes" at sensible intervals, chose
"each visible milestone" over daily or weekly, and chose that Claude publishes them.

## Decision

At each visible milestone (a set of changes noticeable in the app, landed with CI and the deploy
green), Claude bumps `version` in `package.json`, writes the notes at the top of
`docs/process/releases.md`, commits, tags `v<version>` and publishes a GitHub release whose body is
that same section. Minor versions for new features, patch versions for corrections only. Notes are
written for family and visitors, not developers, and call out corrections to history. They include
screenshots of what changed, at the years that show it (Dewi: "in each release notes include things
like screenshots"), kept in `docs/images/releases/v<version>/`, embedded in the notes and attached to
the GitHub release so they show there too.

## Consequences

The repo holds the notes, so they are reviewed like any other doc and survive without GitHub; the
release page is a copy made from them. The version number has one home. A release costs a version
bump commit and a tag, which is cheap.

## Alternatives considered

A `CHANGELOG.md` at the root (the same idea; `docs/process/` keeps the process records together);
notes written only on GitHub (not in the repo, which is the record); generating notes from commit
messages (written for developers, and too many).

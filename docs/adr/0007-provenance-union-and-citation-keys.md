---
title: "ADR 0007: Provenance as a discriminated union, with citations extracted from research notes"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0007: Provenance as a discriminated union, with citations extracted from research notes

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

The project's first law is history first, invention labelled. A "documented" claim with no source
must be impossible, not just discouraged.

## Decision

`Provenance` is a union of documented (a non-empty array of sources), reconstructed (what it is
based on) and imagined (what it is grounded in). `tools/research/extract-sources.mjs` turns the
numbered sources in `docs/research/*.md` into typed keys in `src/content/generated/sources.ts`, so a
mistyped or missing citation fails to compile.

## Consequences

Renumbering a research note breaks every citation to it (seen 2026-09-26), which is the check
working. A new research note needs its prefix added to the extractor.

## Alternatives considered

Free-text citations (unchecked); a sources field that may be empty (unenforced).

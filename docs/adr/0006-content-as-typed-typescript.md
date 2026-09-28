---
title: "ADR 0006: Content is typed TypeScript, not schema-validated JSON"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0006: Content is typed TypeScript, not schema-validated JSON

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

CLAUDE.md first proposed zod schemas with inferred types. All content is written by us, ahead of
time, in the repo.

## Decision

Content lives in `src/content/*.ts`, typed by `src/domain/model.ts` and `src/domain/provenance.ts`,
so the compiler is the schema. `tests/content.test.ts` checks what types cannot (ids resolve, places
are inside the disc, voices exist, language rules). Runtime data fetched from `public/` (map data)
is checked by guards in `src/platform/assets.ts`.

## Consequences

No schema library in the bundle, and errors appear in the editor. If content ever comes from outside
the repo, it needs a validated boundary.

## Alternatives considered

zod schemas for all content (a second source of truth for data we already type).

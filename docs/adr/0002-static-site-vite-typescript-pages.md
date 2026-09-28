---
title: "ADR 0002: A static site: Vite, strict TypeScript, GitHub Pages"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0002: A static site: Vite, strict TypeScript, GitHub Pages

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

The app is for Dewi and family, needs no server-side state, and should cost nothing to host.

## Decision

A static site built by Vite 8 in strict TypeScript 6, deployed to GitHub Pages by GitHub Actions
after every check passes. TypeScript 6 rather than 7 because typescript-eslint does not support 7
yet.

## Consequences

No backend, so no runtime AI, no accounts and no server logs. Anything interactive that needs
storage (feedback, analytics) needs a third party or GitHub itself; see `docs/design/feedback.md`
and `analytics.md`. Upgrading to TypeScript 7 waits on typescript-eslint.

## Alternatives considered

Cloudflare Pages or Vercel (extra accounts); a server-rendered app (no need for one).

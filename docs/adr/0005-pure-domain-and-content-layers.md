---
title: "ADR 0005: A pure domain and content layer, enforced by lint"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0005: A pure domain and content layer, enforced by lint

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

The history model must be testable without a browser, and the renderer, audio and UI should only
read from it.

## Decision

`src/domain` and `src/content` import nothing from Babylon, Node, the DOM or the outer layers, and
may not use browser globals. `no-restricted-imports` and `no-restricted-globals` in
`eslint.config.js` make a leak a build error.

## Consequences

The domain has fast unit tests with no DOM. The lint is a deny-list, so a new global could slip
through; an allow-list or a DOM-free tsconfig is in the backlog.

## Alternatives considered

Convention only (drifts); a separate package (heavier than needed).

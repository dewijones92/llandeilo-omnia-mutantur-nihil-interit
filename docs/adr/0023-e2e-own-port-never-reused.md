---
title: "ADR 0023: Each checkout runs e2e on its own port, and never reuses a server"
kind: adr
status: accepted
updated: 2026-10-02
---

# ADR 0023: Each checkout runs e2e on its own port, and never reuses a server

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Playwright started `vite preview` on port 4173 and, outside CI, reused any server already on that
port. On 2026-09-28 a run passed against another agent's build that happened to be on 4173, so a
green result said nothing about the code under test.

## Decision

The preview port is derived from a hash of the checkout's directory (the directory of
`playwright.config.ts`), in the range 4200-4999. `E2E_PORT` overrides it. `reuseExistingServer` is
off everywhere, and the preview runs with `--strictPort`, so if the port is taken the run fails at
once instead of testing someone else's server.

## Consequences

Two clones or worktrees can run e2e at the same time. A run always builds and serves what it tests,
which costs a few seconds of preview start-up on every local run. A hash collision between two
checkouts is possible but fails loudly, and `E2E_PORT` settles it.

## Alternatives considered

A random free port (works, but a run's URL changes every time and is harder to reproduce); keeping
4173 with reuse off (two checkouts still collide).

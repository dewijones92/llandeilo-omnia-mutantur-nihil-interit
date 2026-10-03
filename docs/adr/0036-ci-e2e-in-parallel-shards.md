---
title: "ADR 0036: CI runs the end-to-end tests in four parallel shards"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0036: CI runs the end-to-end tests in four parallel shards

- **Status:** Accepted
- **Date:** 2026-10-03

## Context

The GitHub runners have no GPU, so every e2e test renders WebGL on the CPU through SwiftShader, one
worker at a time (two workers starved each other into timeouts on 2026-10-03). On 2026-10-02 the 26
tests took about 20 minutes. After the four features merged on 2026-10-03 (High quality by default,
night light, honest ambience, the guess game), the 31 tests ran about twice as slowly per test: run
37096787012 was cancelled at the job's 45-minute limit with 29 of 31 done, and three of the longest
tests had hit the 3-minute per-test limit. The same tests passed 31 of 31 locally on the GPU.

## Decision

- The `check` job keeps the static checks, unit tests and the build, and uploads the Pages artifact.
- A separate `e2e` job runs `playwright test --shard=N/4` on four runners side by side, each with its
  own build and Chromium, and uploads its screenshots as `e2e-screenshots-N`.
- `deploy` needs both `check` and every `e2e` shard, so nothing deploys unless every test passed.
- In CI only, the per-test limit is 7 minutes (3 locally), for the multi-page tests on the CPU.

## Alternatives considered

- **Raising the job limit only.** One job at 60+ minutes, growing with every test added.
- **Running CI at Medium or Low quality.** Faster, but then CI would not test the default the
  visitors get. Rejected for now; it stays an option if the shards also grow slow.

## Consequences

- Wall time is roughly the slowest shard (about a quarter of the tests) plus setup, and four runners'
  minutes are spent instead of one, which is free for a public repo.
- Why the High-quality scenes are so much slower on SwiftShader is not measured; it is in the todo file.

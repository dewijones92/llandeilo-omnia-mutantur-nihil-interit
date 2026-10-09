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

## Amended 2026-10-09: six shards, and the two night tests marked slow

Run 37974359599 (commit 3e2b935) failed one shard: the whole-valley night halo test took 7.0 minutes
on the CPU renderer and ran out of its 7-minute limit while taking a screenshot, after the same tests
had passed on the two runs before. Adding the cutscene test had moved both heavy night tests into one
shard. The night tests are now marked `test.slow` in CI (three times the limit), and the e2e job runs
six shards instead of four, so no shard carries both and the wall time stays about the same.

## Amended again 2026-10-09: CI tests at Low graphics

Dewi, 2026-10-09: "The ci tests etc should just use low quality graphics option get me?". This reverses
the alternative rejected above ("CI would not test the default"). The e2e job sets `E2E_QUALITY=low`, and
`playwright.config.ts` stores that level in each test's browser the way the app stores a visitor's
choice, so every page starts at Low unless it asks otherwise. The graphics-menu test opts out and still
starts from the default High; a test asserts the stored level reaches the renderer (seen red with the
config line removed: "quality high", expected "quality low"). The run on 2026-10-09 that prompted it:
the cutscene test ran past its 7-minute limit on the CPU renderer at High (run 37977166640). Local runs
on the GPU keep the default unless `E2E_QUALITY` is set.

---
title: "ADR 0024: Every place name carries a required date"
kind: adr
status: accepted
updated: 2026-10-02
---

# ADR 0024: Every place name carries a required date

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Place labels add "(today)" before a place's `namedFrom` year, so the Iron Age does not appear to call
its hillfort by a modern Welsh name. The field was optional, and three places had none, so their
labels showed today's name in every era as if it had always been used.

## Decision

`Place.namedFrom` is required. It holds the earliest record of the name, or, where none has been
found, a late bound that errs towards saying "(today)": the oldest use we can cite, or when the
thing we draw there begins (the bridge: the first bridge drawn, from 1700). The reason for each
value is a one-line comment beside it, and an unresolved one is listed in
`docs/research/open-questions.md`.

## Consequences

A new place cannot be added without answering "since when is this its name?". Some values are
deliberately late (Garn Goch: 1974, the oldest use we hold) and will move earlier as research finds
older records.

## Alternatives considered

A union with an explicit "unknown" (the label would need a third state that says the same thing as
"(today)"); leaving it optional (the omission is silent, which is how three places showed today's name in every era).

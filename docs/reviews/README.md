---
title: Review records
kind: index
status: current
updated: 2026-09-29
---

# Review records

One file per board task, `T-NNN.md`, recording its independent review (the second Opus pass, see
[ADR 0014](../adr/0014-parallel-agents-and-second-review.md)). A task cannot be Done without one
that passed ([ADR 0018](../adr/0018-backlog-as-a-gated-board.md)).

```markdown
---
task: T-003
verdict: passed           # or changes-needed
reviewed: 2026-09-29
years_checked: [1282, 1858]   # the years looked at on screen, for the kinds that need it
---

Findings, each with what was done about it. CRITICAL and IMPORTANT ones are fixed before `passed`.
```

Which kinds need `years_checked`, and how many, is `VISUAL` and `MIN_YEARS_CHECKED` in
[`tools/todos/rules.ts`](../../tools/todos/rules.ts).

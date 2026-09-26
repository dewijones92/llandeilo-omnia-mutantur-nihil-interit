---
title: Llandeilo Through Time — agent entry point
kind: index
updated: 2026-09-26
---

# AGENTS.md

Start here, then read what's relevant.

1. **`CLAUDE.md`**: the binding project context (decisions, the historical-accuracy law, the
   unified + DRY twin laws, types, lint, tests). Read it first.
2. **`docs/brief.md`**: Dewi's original brief, verbatim.
3. **`docs/research/`**: sourced research notes, one file per era or topic. Content cites these
   through `src/content/generated/sources.ts` (regenerate with
   `node tools/research/extract-sources.mjs`; CI fails if it is stale).

Keep docs current as part of "done", and bump `updated` when you touch one.

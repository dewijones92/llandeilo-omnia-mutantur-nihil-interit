---
title: Research brief — conversations by class
kind: brief
status: frozen
updated: 2026-09-28
---

# Brief: conversations by class

Given to a research agent (Claude Opus 5.5) on 2026-09-28, verbatim except that absolute paths are
shortened to repo-relative ones.

> You are a historical researcher (and linguist) for the project at /home/dewi/code/llandeilo-omnia-mutantur-nihil-interit: a 3D timeline of Llandeilo (Carmarthenshire, Wales) and a 10-mile radius. Read CLAUDE.md ("Historical accuracy (the project's first law)": research first, never from memory; every claim needs a source you actually fetched; mark cross-checked vs single-source), docs/design/conversations-by-class.md (the proposal), docs/research/language-by-class.md, docs/research/findings.md and docs/research/process.md, and skim the era notes in docs/research/ for the key dates listed in src/content/events.ts (the magnetic ones).
>
> TASK: research what DIFFERENT CLASSES of people present at each vertical-slice key date would plausibly have been talking about, and in what language, so imagined conversations can be grounded. Key dates: Iron Age at Garn Goch (c. 150 BC); the Roman forts at Dinefwr (c. AD 80); Talley Abbey's founding (c. 1185); the Battle of Llandeilo Fawr (June 1282) and its aftermath (1283-87, Dryslwyn siege 1287); the Rebecca Riots (1843); the railway (1857-60s); today. For each date: which classes were actually present locally (with sources — e.g. was there a garrison at Carreg Cennen in June 1282? who held it? when was Giffard's grant? were there lay brothers at a Premonstratensian house?), what languages each class used, what they were concerned with (harvest, rents, tolls, war news, faith, prices, law), and any ATTESTED phrases or texts from the period that could be quoted (with exact source). A previous review flagged anachronisms in the proposal (an "English garrison at Carreg Cennen" and a "Marcher lord's household" in June 1282; "Welsh lay brothers" at Talley) — resolve them with sources.
>
> Also research the two languages with no pronunciation research yet: ANGLO-NORMAN FRENCH and MIDDLE ENGLISH as spoken by incomers in 13th–14th-century south-west Wales: attested sample phrases (e.g. from contemporary texts or letters), how a modern French/English TTS voice would misrepresent them. And the local dialect features of Carmarthenshire Welsh relevant to 19th-century speech.
>
> Use WebSearch and WebFetch extensively (if WebSearch is exhausted, use WebFetch on known URLs: Coflein, Cadw, the Dictionary of Welsh Biography (biography.wales), National Library of Wales (including newspapers.library.wales), Wikipedia as leads only, academic sources). Do NOT write from memory.
>
> OUTPUT: write ONE markdown file at docs/research/conversations-by-class.md with frontmatter (title, kind: research, status: draft, updated: 2026-09-28), sections: Summary; per key date: Classes present (with evidence), Languages by class, Topics by class (each grounded, with source ids), Attested lines usable as quotes; Anglo-Norman and Middle English (phrases, pronunciation notes for TTS); Carmarthenshire dialect notes; Corrections to docs/design/conversations-by-class.md; Open questions; Sources ([S1] title, author/org, URL, what it says — use the list format `- [S1] ...`, one per bullet, so the project's source extractor can read it). Do not edit any other file; do not run git. Reply with a 10-line summary and the path.

---
title: Research brief - effects per key event
kind: brief
status: frozen
updated: 2026-10-02
---

# Brief: effects per key event

Given to a research agent (Claude Opus 5.5) on 2026-10-02. The task, method and output text is
verbatim except that absolute paths are shortened to repo-relative ones.

> You are a research agent for the repo ("Llandeilo Through Time", a sourced 3D history of Llandeilo, Carmarthenshire and 10 miles around, with a timeline slider of key dates). Read CLAUDE.md (especially "Historical accuracy", the first law), docs/research/process.md, docs/design/timeline-experience.md (look for the "effects per event" idea: forge sparks, siege, bells, weather), and src/content/events.ts (the key dates, each with a provenance and sources).
>
> TASK (agreed by the owner): for EACH key event in src/content/events.ts, research what visible or audible effect the scene could honestly show at that moment, and what the evidence is. Examples of the kind of thing: a siege at Dryslwyn 1287 (trebuchet, mining, the collapse that killed besiegers: what is recorded), the 1282 battle (what is recorded about the fighting, weather, time of year), bells (when did St Teilo's or Talley have bells, is it recorded?), the Rebecca riots at a tollgate (fire, night, crowds in women's clothes: what do the sources say about the Llandeilo-area attacks specifically), the railway opening (bunting, crowds, bands: newspaper accounts?), fairs and markets, fires, floods of the Tywi, hard winters and storms recorded in chronicles or newspapers. Also record the season and time of day of each event where a source gives it (the app has a season and time-of-day system and could set them for a key date). For each event, classify the proposed effect as documented (with source), reconstructed (by analogy, say what from), or not supportable (say so: then the app should show nothing).
>
> METHOD: every claim from a source you actually read; record what each source says; cross-check documented claims against two independent sources where possible, mark cross-checked or single-source; record contradictions side by side; Wikipedia is a lead only; prefer Brut y Tywysogion/Annales Cambriae (translations), the Dictionary of Welsh Biography, Coflein, Cadw, Heneb/Dyfed Archaeological Trust, National Library of Wales incl. Welsh Newspapers Online (for the 1840s-1880s), People's Collection Wales, peer-reviewed work. Do NOT rely on memory. Check existing notes in docs/research/ first (era-medieval-to-1282.md, era-victorian.md, era-iron-age.md, timeline-and-earliest-occupation.md) and reuse what they already source, citing them. Beware: "Llandilo" in 1840s newspapers can be Llandeilo Tal-y-bont in Glamorgan. WebSearch is a SHARED budget with other agents: at most 45 WebSearch calls; prefer WebFetch on known URLs; note any section written without search.
>
> OUTPUT: write two files only (no other edits, no commit):
> 1. docs/research/briefs/event-effects.md: a short brief in the style of the other briefs in that folder.
> 2. docs/research/event-effects.md: frontmatter like the other notes (title, kind: research, status: draft, updated: 2026-10-02); a table with one row per event id (event id, proposed effect, season and time of day if known, tier, sources); then detail per event; an "Open questions" section; and a "Sources" numbered list in exactly the format the other notes use (tools/research/extract-sources.mjs parses it: run `node tools/research/extract-sources.mjs` afterwards and confirm your note parses).
> Plain British English, short sentences, no em dashes. Report back in under 300 words: which events have a documented effect, which have none, and the biggest gaps.

## How it ran

Seven WebSearch calls were used. Most of the work went through direct fetches: Welsh Newspapers
Online search and article pages (by `curl`, since its search page errors on some parameter
spellings), the llandeilo.org transcriptions of Thomas Jenkins's diary, and full-text scans on the
Internet Archive of Brut y Tywysogion (Rolls Series, 1860), the Annales Cestrienses, Annales
Monastici vol. 4 (Wykes and Oseney), Hingeston's *Royal and Historical Letters of Henry IV* (1860)
and the *Liber Landavensis* (1840).

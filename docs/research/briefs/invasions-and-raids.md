---
title: Research brief, invasions, raids and conquests
kind: brief
status: frozen
updated: 2026-10-02
---

# Brief: invasions, raids and conquests that reached the Tywi valley

Given to a research agent (Claude Opus 5.5) on 2026-10-02. The work was agreed by Dewi as "norman,
viking etc invasions". The task text is summarised closely below; the output-format boilerplate is
abbreviated.

## What was asked

Research the invasions, raids and conquests that reached the Tywi valley around Llandeilo, in order:

1. Irish settlement in Dyfed (the Déisi; Ogham stones in Carmarthenshire, and whether any lie inside
   the area), 4th to 6th centuries.
2. Viking and Norse raids on south-west Wales (Annales Cambriae, Brut y Tywysogion, the Anglo-Saxon
   Chronicle): St Davids, the Carmarthen area, Llandeilo itself (any record of the clas being raided,
   or of the Lichfield Gospels' move), Hywel Dda and the Norse; where each raid is recorded, and
   whether any is recorded inside the 10 miles.
3. Anglo-Saxon and Mercian incursions into Ystrad Tywi, if any.
4. The Normans: the Brut's "French" devastation of Ystrad Tywi after 1093, the Norman castles and
   lords of the 1090s to 1110s (Richard fitz Baldwin, Rhyd y Gors, Carmarthen, any castle inside the
   area), the Welsh recovery, Henry I's grants, and Gruffudd ap Rhys's attacks of 1116, with dates and
   exact places.
5. Later: the Angevin campaigns, the 1257 battle of Cymerau (check its location), the Civil War of the
   1640s in Carmarthenshire (Golden Grove, the Vaughans, any action near Llandeilo), the 1797 Fishguard
   invasion as news reaching here, and any others found.

For each: the date, what happened, where exactly (the source's own wording, and a grid reference where
a site is known), whether it is inside the area, sources and their reliability, a tier (documented
here; documented nearby, news here; reconstructed; not supportable), what a key-date card or cutscene
could show, and any contradiction between chronicles. Do not duplicate the key dates already in
`src/content/events.ts`.

## Method and source priority

Every claim from a source actually read. Cross-check chronicle entries across the Brut versions and
Annales Cambriae, and mark each claim cross-checked or single-source. Wikipedia is a lead only. Prefer
the Dictionary of Welsh Biography, Coflein, Archwilio and Heneb, and archive.org editions of the Brut
and Annales Cambriae. Do not rely on memory. At most 25 WebSearch calls (a shared budget); prefer
WebFetch.

## Output

Two files only, no commit: this brief, and the note
[`docs/research/invasions-and-raids.md`](../invasions-and-raids.md) with the standard frontmatter, a
summary table, detail per event, "What a card or cutscene can show", open questions, and a numbered
Sources list in the format `tools/research/extract-sources.mjs` reads.

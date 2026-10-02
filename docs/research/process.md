---
title: Research method
kind: process
status: current
updated: 2026-10-02
---

# How the research is done

## The method

1. **One topic per agent**, run in parallel, each with a written brief (kept in [`briefs/`](briefs/)).
   A brief names the topic, the places in the radius, the source priority, and the output format.
2. **Sources, not memory.** Every claim must come from a source the agent actually read, recorded
   with what the source says. Wikipedia is a lead; its underlying source is what gets cited.
3. **Source priority**: Coflein (RCAHMW), Archwilio / Heneb (Dyfed Archaeological Trust), Cadw,
   the Dictionary of Welsh Biography, the National Library of Wales (incl. Welsh Newspapers Online),
   People's Collection Wales, the National Trust, BGS, Amgueddfa Cymru, peer-reviewed work.
4. **Cross-check** important claims against a second independent source, and mark each claim
   `cross-checked` or `single-source`.
5. **Three honesty labels** on everything: documented, reconstructed (by analogy or typology), or
   a gap. Contradictions between sources are recorded side by side, never silently resolved.
6. **Tangential detail counts**: homes, clothing, food, prices, language, landscape, sounds. A
   scene is only as accurate as its least-researched detail.

## Pitfalls met so far

- **Search quota is shared.** Six parallel agents exhausted the session's WebSearch budget; later
  work fell back to WebFetch on known URLs, which cannot discover new pages. Stagger big passes,
  and note in the doc when a section was written without search.
- **"Llandilo" is two places.** 1840s newspapers use it for Llandeilo Tal-y-bont in Glamorgan as
  well as Llandeilo Fawr. Check which before placing an event on the map.
- **There is more than one Llandeilo with an Ogham stone.** The "Llandeilo" Ogham stone is at
  Llandeilo near Maenclochog in Pembrokeshire, not Llandeilo Fawr; no Ogham stone is recorded inside
  our area (invasions-and-raids, 2026-10-02).
- **Llansadwrn is two places.** The St Fagans Bryn Eryr farmstead comes from Llansadwrn on
  Anglesey, not the one near Llandeilo.
- **Merged passes renumber sources.** The Victorian note was assembled from five sub-passes and
  its source list was renumbered at the end. Citations are re-mapped by title after any renumbering.
- **Popular stories are often wrong or thin**: Carreg Cennen's standing castle is post-1283 English
  work, not the Lord Rhys's; no chronicle names the Welsh leader in 1282; Lady Llanover did not
  invent Welsh costume. Treat the popular version as a claim to check.
- **Blocked sites have workarounds.** Vision of Britain failed on TLS and GENUKI returned 403 to a
  plain fetch; `curl -k` and a browser user agent got through.

## Adding a topic

Write a brief in `briefs/` using the existing ones as a template, run it, save the note as
`research/<topic>.md` with the standard frontmatter and sections, add its prefix to
`tools/research/extract-sources.mjs`, regenerate, and list it in [`README.md`](README.md).

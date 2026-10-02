---
title: Research brief - ripples from afar (distant shocks)
kind: brief
status: frozen
updated: 2026-10-02
---

# Brief: ripples from afar

Given to a research agent (Claude Opus 5.5) on 2026-10-02, for the "Ripples from afar" decision in
`CLAUDE.md` (a global event is only linked to Llandeilo where a source supports the local effect,
otherwise it is marked as the likely regional impact). The owner agreed the topic as "black swan
events such as a volcano erupting thousands of miles away". The task text is summarised, not
verbatim.

> Research distant shocks whose effects reached this valley. For each: (a) the distant event and its
> date, from good sources; (b) the evidence for its effect here (inside about 10 miles of
> Llandeilo), or failing that in Carmarthenshire, south-west Wales or Wales, stated at exactly the
> level the sources support; (c) what the app could show (cold summer, snow, failed harvest, high
> prices, deaths, emigration, a red sunset, dry fog), with a tier (documented / reconstructed /
> regional only / not supportable).
>
> Candidates to test, without assuming any is linked locally: the 536 to 541 dust veil and the
> "Plague of Justinian" (Maelgwn Gwynedd, 547); Samalas 1257; the Great Famine 1315 to 1317; the
> Black Death 1348 to 1349 in Carmarthenshire; Huaynaputina 1600; Little Ice Age frosts (1683 to
> 1684, 1740); Laki 1783; Tambora 1815 and 1816; cholera 1832, 1849, 1866; potato blight 1845 to
> 1847; Krakatoa 1883; the 1918 influenza. The World Wars are a separate item. Find any others.
>
> Method: every claim from a source actually read; cross-check where possible; mark cross-checked or
> single-source; contradictions side by side; Wikipedia only as a lead; no memory. Beware
> "Llandilo" meaning Llandeilo Tal-y-bont. At most 30 WebSearch calls; prefer direct fetches.
>
> Output: this brief and `docs/research/ripples-from-afar.md` (summary table, detail per event,
> open questions, numbered Sources), checked with `tools/research/extract-sources.mjs`. No other
> edits, no commit.

## How it ran

Ten WebSearch calls were used. Most of the evidence came from direct fetches: Welsh Newspapers
Online searches by `curl` (the site ORs bare words, so queries use `AND`; article text is in the
page HTML), the Internet Archive full texts of the *Brut y Tywysogion* (1860), the *Liber
Landavensis* (1840), the Royal Society's Krakatoa report (1888) and the Transactions of the Royal
Historical Society for 1920 (William Rees, "The Black Death in Wales"), the Latin *Annales
Cambriae* on Wikisource, Europe PMC for paper abstracts, and open PDFs of three climate papers.

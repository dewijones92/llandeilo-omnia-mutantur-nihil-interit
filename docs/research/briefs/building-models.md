---
title: Research brief, measured models of the important buildings
kind: brief
status: frozen
updated: 2026-10-02
---

# Brief: measured models of the important buildings, phase by phase

Given to a research agent (Claude Opus 5.5) on 2026-10-02. The work was agreed by Dewi as "accurate
models of the important buildings, phase by phase". The task text is summarised closely below; the
output-format boilerplate is abbreviated.

## What was asked

Close the modelling research gaps listed in
[`../../design/models.md`](../../design/models.md) ("Research gaps hit while modelling") and the
corrections in [`../reviews/era-medieval-to-1282-check-2026-10-02.md`](../reviews/era-medieval-to-1282-check-2026-10-02.md),
in this order:

1. **Dryslwyn**: when the middle and outer wards were built (before or after the 1287 siege, Welsh
   or English work); ward sizes and shapes; the round keep's diameter; the gatehouse's position; the
   borough.
2. **Talley Abbey**: church widths (nave, aisles, transepts, chancel); the eight-bay nave and how
   much of it was built; the crossing tower's footprint and which walls survive; the cloister
   ranges; the parish church in the choir after 1536.
3. **Dinefwr**: enclosure dimensions and which side the great tower stands on.
4. **Carreg Cennen**: which wall holds the gatehouse, the barbican's route, and the corrected tower
   descriptions.
5. **St Teilo's**: the tower's height and the medieval naves' size.
6. **Newton House** and **Llandeilo Bridge** if budget remained.

Every dimension with its source and what the source says, in metres (feet converted, saying so).
Grid references from Coflein or Cadw where they differ from the plan anchors in
`src/content/features.ts`.

## Method and source priority

Every claim from a source actually read. Cross-check important claims against two independent
sources and mark each cross-checked or single-source; contradictions side by side. Wikipedia is a
lead only. Prefer Coflein, Cadw (guidebooks and listing reports), Heneb/Archwilio, the Caple
excavation report, castlewales.com, the Gatehouse Gazetteer and medievalheritage.eu. At most 30
WebSearch calls (a shared budget); prefer fetching known URLs.

## Output

Two files only, no commit: this brief, and the note
[`../building-models.md`](../building-models.md) with the standard frontmatter, a section per
building with a "What a modeller needs" table (element, dimension or form, source, confidence),
open questions, and a numbered Sources list in the format `tools/research/extract-sources.mjs` reads.

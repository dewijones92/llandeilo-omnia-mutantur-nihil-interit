---
title: Research brief, soundscapes per era and licensed recordings
kind: brief
status: frozen
updated: 2026-10-02
---

# Brief: what the valley sounded like, and how to get the sounds legally

Given to a research agent (Claude Opus 5.5) on 2026-10-02. The work was agreed by Dewi ("each point
in time sounds ... a really immersive experience"). The task text is summarised closely below; the
output-format boilerplate is abbreviated.

## What was asked

For each era from the Late Ice Age to today, and by setting (open country, river, woodland,
farmstead or hillfort, castle, church or abbey, town street and market, railway, road):

1. The sound sources that research supports: wildlife present in that era (check the deep-time note
   and its independent check), farming (cattle, sheep, pigs, horses, ploughing, flails, querns),
   crafts (smithing, masonry, timber), religion (handbells, plainchant, church bells: when St Teilo's
   had bells is an open question), market and fair, transport (carts, drovers, coaches, the railway
   from 1857, motor traffic), weather and the Tywi. Each marked documented, reconstructed or unknown,
   with sources.
2. Time of day and season: dawn chorus, night, seasonal work, as research supports.
3. Licensed audio: specific, real candidate recordings for the highest-value sounds, on Freesound,
   Wikimedia Commons, xeno-canto, the British Library and BBC Sound Effects, with URL, title,
   author, licence exactly as stated, duration and why it fits. Do not download.
4. Which sounds are better synthesised in Web Audio than recorded, and how.
5. Spatial mixing: which sounds belong to places on the map, and which are beds.

Inputs to read first: `CLAUDE.md`, `docs/research/process.md`, `docs/design/sound-and-assets.md`,
`docs/design/atmosphere.md`, `src/audio/ambience.ts`, `src/domain/model.ts` (`AmbientBed`) and
`src/content/timeline.ts`.

**Licence rule changed mid-task.** The brief began with CC0, CC-BY, public domain or OGL only. Part
way through, the coordinator passed on Dewi's decision ([ADR 0026](../../adr/0026-open-licences-including-nc.md)):
CC BY-NC, BY-NC-SA and BY-SA are allowed too, and anything "all rights reserved" (BBC RemArc,
commercial libraries) stays out.

## Method

Sources actually read, cross-checked where possible, Wikipedia only as a lead, no reliance on
memory. At most 30 WebSearch calls (a shared budget); prefer direct fetches.

## Output

Two files only, no commit: this brief, and [`docs/research/soundscapes.md`](../soundscapes.md) with
the standard frontmatter, a section per era with a table of sound, setting, tier and sources, a
"Licensed recordings" table, "Synthesise instead", "Open questions", and a numbered Sources list in
the format `tools/research/extract-sources.mjs` reads.

## How it ran

Four WebSearch calls were used. Freesound was read through its public search pages (licence-filtered
searches, then each sound page for title, licence, duration and description) with `curl`. Wikimedia
Commons was read through the MediaWiki API. xeno-canto could not be read at all: its pages sit behind
a JavaScript proof-of-work wall that also refuses headless Chromium, and its v2 API has been
withdrawn. The BBC licence page needed headless Chromium. Dove's Guide (church bells) returned
HTTP 429 every time.

---
title: Research findings and decisions
kind: research
status: current
updated: 2026-09-28
---

# Research findings and decisions

The outcomes of the research, in one place: what we found, what it changed, and what we decided
because of it. The detail and sources are in each note; this is the summary a new reader needs.

## Method decisions

| Decision | Why |
|---|---|
| One research agent per era or topic, each with a written brief (kept in `briefs/`) | Parallel, repeatable, auditable |
| Sources, not memory; Wikipedia only as a lead | The project's first law |
| Every claim marked cross-checked or single-source | Makes weak claims visible |
| Contradictions recorded side by side, never silently resolved | Several turned out to matter |
| Citations are typed keys extracted from the notes (`medieval:S27`) | A citation to a missing source fails the build |
| Independent Opus review of every content claim against the notes | It found real errors (below) |
| Place sites from Coflein or Cadw grid references, not a note's approximate lat/lon | The Roman forts were 0.9km out |

## Headline findings

- **Earliest people**: no dated Palaeolithic or Mesolithic site inside the ten miles. The earliest
  attributed monument, the Garn Goch long cairn, is Neolithic by shape only. Wales was resettled
  from about 14,500 years ago. ([timeline](timeline-and-earliest-occupation.md))
- **Garn Goch** is one of the largest hillforts in Wales and has **never been excavated**, only
  surveyed; its purpose is openly unresolved. A local "rebuilt by the Romans AD 47–78" story is
  single-source and not used. ([iron age](era-iron-age.md))
- **The Dinefwr Roman forts** (two, overlapping) were identified in 2003 and excavated in 2005.
  Sources disagree on their size and dates. ([iron age](era-iron-age.md))
- **The Llandeilo Gospels' "Surexit" note** is the earliest surviving connected text in Welsh,
  recorded at Llandeilo; its exact date is debated. ([language](language-by-class.md))
- **The Battle of Llandeilo Fawr, 1282** is real: 16 or 17 June (sources differ). **No source read so
  far names the Welsh leader**: two secondary analyses say the primary chronicles do not, and Brut y
  Tywysogion has not yet been read directly. Wikipedia's claim that Rhys ap Maredudd led it
  contradicts his own biography. No evidence of a separate "1116 battle" was found.
  ([medieval](era-medieval-to-1282.md))
- **Carreg Cennen as it stands** is probably mostly English work of 1287–1321, not the Lord Rhys's.
- **The Rebecca Riots reached Llandeilo**: the Walk Gate was destroyed in August 1843, and lime
  tolls ran to about 30% of the cost of the lime. "Llandilo" in 1840s newspapers can also mean a
  Glamorgan parish. ([victorian](era-victorian.md))
- **Welsh costume** was everyday wear into the mid-19th century and was revived from the 1880s as
  a symbol. Lady Llanover did not invent it.
- **Welsh speakers in Llandeilo**: 55.1% (2001) and 50.3% (2011). The 2021 ward figure was not
  found.
- **Deep time**: Llandeilo gave its name to an Ordovician stage (now obsolete) and the Llandeilo
  Flags Formation (BGS). The first written record of a trilobite was a find probably made near
  Dinefwr, recorded in 1688, and wolves died out in Wales in 1166; both rest on Wikipedia pages
  only so far (single-source). ([deep time](deep-time-and-natural-history.md))

## Conversations by class (2026-09-28)

From [`conversations-by-class.md`](conversations-by-class.md), a draft. An independent verification
pass on 2026-09-28 confirmed most claims against their sources and corrected 13 (inexact quotes, an
overstatement, two misattributions, two unsupported "cross-checked" labels); the note stays a draft:

- **Carreg Cennen was in Welsh hands in June 1282**, taken on 26 March by Dafydd ap Gruffudd and the
  lords of Is Cennen. The English army occupied the ruins around mid-June and left about fifty foot
  and some workmen. The attested English garrison was at **Dinefwr**, about 35 lances of Somerset and
  Devon knights under Alan Plukenet after the battle. The army itself was mostly Welsh levies.
- **Giffard's grant of Carreg Cennen dates from 1283** (secondary sources; Morris has him in full
  possession in 1284). But he had held Llandovery since 1277, so English-held land nearby did exist
  in June 1282 (corrected by the verification pass). Newton, the English borough beside Dinefwr, is
  first mentioned in 1297.
- **The primary annal gives 16 June 1282** ("XVI Kalendas Julii"); Morris's 17 June looks like a
  counting slip. Since 2026-10-02 the app says "16 June 1282 by the Welsh annals (some histories say
  17 June)".
- **Talley's first canons came from St-Jean, Amiens.** Gerald of Wales mentions its "canons and
  brothers" and servants, writing after 1200 (corrected from "c. 1193–1205"); nothing says where the
  brothers came from or what they spoke.
- **Real 1282 grievances from this valley survive** in Archbishop Peckham's register: English soldiers
  stabling horses in Llangadog church, the burning of Llandingad and Llanwrda churches, and Welsh
  lords denied Welsh law. They are the best grounding yet for what people here were angry about.
- **The Roman forts report was read**: Fort 1 is 3.85ha, probably soon after AD 74; the unit is unknown.
- Attested lines to quote now exist for every key date except the Iron Age, and Carmarthenshire
  dialect features are sourced, from 20th-century recordings only.

## Corrections the review forced

See [`open-questions.md`](open-questions.md) for the full list. The most important:

- Pollen-zone dates in the deep-time note are **uncalibrated**; the Younger Dryas is c. 10,900–9,700 BC
  in calendar years, not 8,800–8,300 BC.
- 12,500 BC is the Late Upper Palaeolithic, not the Mesolithic.
- 12,500 BC also falls inside the **Late Glacial (Bølling–Allerød) interstadial**, a milder spell
  of c. 14,690–12,890 BP, about 12,700–10,900 BC (Wikipedia, "Bølling–Allerød warming", read
  2026-09-28: a lead, not yet a note source; it agrees with the Younger Dryas start of 12,900 BP in
  the deep-time note's S8). The climate "chill" used for seasons treats it as milder than the
  Younger Dryas. (Added 2026-09-28, after a review caught a first draft that treated 12,500 BC as
  the coldest point.)
- St Teilo's west tower dates from about 1600.
- Longhouse evidence is later and from mid Wales; the medieval ones in the app are marked imagined.

## Decisions the research drove

| Decision | Based on |
|---|---|
| The 1282 scene shows villagers hearing news, not a staged battle with named Welsh leaders | No source read so far names the leader |
| Brittonic is voiced as modern Welsh and labelled so | No connected Brittonic sentence reconstruction was found; only fragments and place-name elements |
| Latin read in Church style, with an ⓘ on Roman lines | No Latin TTS voice; Church style fits medieval clergy ([voices](../content/voices.md)) |
| Garn Goch's interior is marked reconstructed; farmsteads imagined | Never excavated |
| Forest cover per era follows the pollen zones, blended to today's OS woodland from the 1850s | No local Tywi pollen core |
| Towns use today's OS building footprints nearest the church; the Victorian town is sized to the documented 1858 count, the Georgian town is a guess below it | 1858 count documented; which buildings stood is not |

## Gaps worth a second pass

The one list is [`open-questions.md`](open-questions.md).

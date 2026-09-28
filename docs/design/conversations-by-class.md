---
title: Conversations by class
kind: design
status: proposed
updated: 2026-09-28
---

# Typical conversations at every key date, by class

Raised by Dewi, 2026-09-28. **Proposed, not built.**

## The idea

At **each key date**, you can hear what different kinds of people were typically talking about, in
the language each of them actually spoke. One short conversation per class present, so the same
moment is heard from the fields, the church, the hall and the garrison.

Today there are six conversations in total, mostly the imagined family. This would grow that to a
small set at every key date.

## What each date would have

For each key date: the **classes present** (from `docs/research/language-by-class.md`), and for each
class one conversation with:

- **who**: role and class (farmer, lord, cleric, soldier, bard, tradesperson, servant, gentry,
  schoolchild…), never a real person given invented words;
- **language as spoken**, with the period form where it is attested, a modern stand-in where it is
  not, and a translation;
- **what they talk about**: grounded in the almanac and research for that date (harvest, rents,
  tolls, the news of the day, the weather, prices, faith, rumours);
- **provenance**: always *imagined*, with what it is grounded in;
- **a voice**, from the one language table in `src/content/languages.ts`.

## Worked outline (1282)

| Class | Language | Talking about | Voice |
|---|---|---|---|
| Welsh farmers | Middle Welsh (modern stand-in) | The ambush, and who to trust | Welsh |
| A poet (bardd teulu) | Middle Welsh, a real attested line | Praise and lament | Welsh |
| Parish clergy | Latin (church) and Welsh | Burials, prayers for the dead | Latin (Diego), Welsh |
| ⚠️ English troops in the valley (needs research: who held Carreg Cennen in June 1282? rebels had seized it, and de Clare's column sacked it that month) | Anglo-Norman French / Middle English (French-speaking garrisons are inferred by analogy, not documented) | Orders, fear of the valley | French / English |

A Marcher lord's household belongs after Giffard's grant of 1283, not June 1282. Other dates follow
the same shape: Roman fort (Brittonic farmers, Latin soldiers), Talley 1185 (Latin canons; whether
there were Welsh lay brothers is not researched), 1843 (Welsh tenants, English agents and magistrates, a
Nonconformist minister), 1860s (children at school, the Welsh Not debate), today (bilingual).

## Rules and cautions

- **Research first**: each date's classes and topics come from the notes, and gaps are researched
  before writing, not guessed.
- **Real attested lines are gold**: use them where they exist (the Surexit memorandum, medieval
  poetry, the 1847 Blue Books' own words), marked as quotes.
- **Anglo-Norman and Middle English** have no research on pronunciation yet; the ⓘ must say the
  voice is a modern approximation. A research pass on both is needed before writing them.
- **Welsh quality**: more Welsh text raises the value of the parked human Welsh check.
- **Scale**: roughly 22 dates × 3–5 classes ≈ 70–110 conversations and a few hundred voice clips
  (~10–20MB). Worth deciding whether that is every date or the vertical-slice eras first.

> Corrected 2026-09-28 after an independent review found anachronisms in the 1282 outline. A
> dedicated research pass (`docs/research/conversations-by-class.md`) is under way.

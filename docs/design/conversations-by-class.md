---
title: Conversations by class
kind: design
status: agreed
updated: 2026-09-28
---

# Typical conversations at every key date, by class

Raised by Dewi, 2026-09-28. **Agreed; research done (draft), not built yet.**

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
Revised 2026-09-28 from [`research/conversations-by-class.md`](../research/conversations-by-class.md)
(draft), which corrected the first outline:

| Class | Language | Talking about | Voice |
|---|---|---|---|
| Welsh farmers | Middle Welsh (modern stand-in) | The ambush, and who to trust | Welsh |
| Parish clergy | Latin (church) and Welsh | The attested sacrilege: Llangadog church used as a stable, Llandingad and Llanwrda churches burned | Latin (Diego), Welsh |
| The English garrison at **Dinefwr** (a royal castle since 1277) | Anglo-Norman French / Middle English | Orders, the woods, the dead William de Valence | French / English |
| A magnate's retinue on campaign | Anglo-Norman French | Plunder, the ambush | French |

Not in June 1282: an English garrison at Carreg Cennen (Welsh-held from 26 March; about fifty foot
were left in its ruins in mid-June), Carreg Cennen already granted to an English lord (Giffard's grant
is 1283; he did hold Llandovery from 1277, so an English lord's men nearby are plausible), and a poet's attested line (none local found; the famous elegy is
December 1282 or later).

Other dates: Roman fort (Brittonic farmers; Latin as the army's language, unit unknown), Talley 1185
(canons from Amiens, probably French-speaking by inference; lay brothers or servants of unknown
origin; Latin liturgy; Welsh tenants), 1843 (Welsh tenants, the English toll farmer, gentry and
magistrates doing business in English, a Nonconformist minister), 1846–60s (the Llandilo workhouse
school, where "the schoolmaster could not explain them in Welsh"), today (bilingual).

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

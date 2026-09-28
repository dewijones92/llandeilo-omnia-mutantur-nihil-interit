---
title: Voices and text-to-speech
kind: guide
status: current
updated: 2026-09-28
---

# Voices and text-to-speech

Every conversation line is voiced by **edge-tts** (Microsoft neural voices), generated ahead of
time by `node tools/voices/build-voices.ts` into `public/voices/`. The voice for each language
lives in one table, `src/content/languages.ts`, which both the app and the tool read. A test fails
if any clip is missing, out of date with its text, or orphaned.

## Which voice speaks which language

| Language in the content | Voice | Honest label (what the ⓘ says) |
|---|---|---|
| Welsh (modern) | `cy-GB-AledNeural` / `cy-GB-NiaNeural` | Close to how people speak; a standard accent, not Carmarthenshire dialect |
| Middle Welsh, Old Welsh | same Welsh voices, reading modern Welsh stand-ins | A modern stand-in for older Welsh |
| Brittonic (Iron Age, Roman) | same Welsh voices, reading modern Welsh | No sentence of Brittonic survives; modern Welsh stands in |
| Latin | `it-IT-DiegoNeural` (male), `it-IT-IsabellaNeural` (female), plain spelling | Church-style pronunciation; right for medieval clergy, wrong for Romans (hard c, w for v) |
| English | `en-GB-RyanNeural` / `en-GB-SoniaNeural` | Modern English |
| Anglo-Norman French, Middle English | French and English voices | Modern-voice approximations (not used in any line yet) |

Children and older people are the same voices with pitch and rate adjusted (`VOICE_TUNING`).

## How the Latin voice was chosen (2026-09-26)

There is **no Latin voice** in edge-tts (checked against its live voice list). Four samples of one
Roman soldier's line (*"Salve, amice. In his castris frigus est; semper pluit in hac Britannia.
Veni, vidi, vici."*) were generated and compared by ear:

1. Diego, plain Latin (Church-style: "VEH-nee VEE-dee VEE-chee")
2. Diego, respelled to force classical sounds ("Uèni, uìdi, uìchi")
3. Giuseppe (multilingual), plain
4. Giuseppe (multilingual), respelled

Dewi chose **1**. Robotic voices (espeak-ng) were ruled out ("i dont want robotic voice").
Paid services (ElevenLabs) were considered overkill for a family project.

## Where it is used

- Iron Age and Roman scenes: Brittonic shown and voiced as modern Welsh.
- Roman fort, c. AD 80: Marcus the soldier speaks Latin (2 lines).
- 1282: the priest says *"Pax vobiscum"*; the bard sings a real Middle Welsh line (Peryf ap
  Cedifor, c. 1170), marked as a genuine quote.
- 1843, 1860s, today: Welsh and English.

## Known mismatches (from the language research)

From [`../research/language-by-class.md`](../research/language-by-class.md), "Pronunciation notes for TTS":

- A modern Welsh voice reading Old or Middle Welsh spelling is a significant approximation.
- Standard Welsh TTS misses local southern (Dyfedeg) features such as *s* → *sh* before front
  vowels and words like *moyn* and *dishgled*.
- A modern French voice would impose modern phonology on Anglo-Norman.

Any new line in an old language must carry a `languageNote` saying which of these applies.

## Privacy

edge-tts sends the text to Microsoft's online service. That is fine for this project's invented
dialogue; never pass it real personal data.

---
title: Independent check of language-by-class.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: language in Llandeilo by era and social class

Reviewed note: [`../language-by-class.md`](../language-by-class.md) (status: draft, updated 2026-09-26, with
S35-S38 and the TTS pronunciation notes corrected on 2026-10-02).
Repo state: `main` at `5aa8465`, level with `origin/main` after `git fetch`. Line numbers for `src/content/`
refer to the **working tree on 2026-10-02**, which had uncommitted edits by another session, so each
correction below also quotes the text it targets.

## Method

- Every cited Wikipedia article was downloaded as raw wikitext (`action=raw`, following redirects such as
  *Laws of Hywel Dda* to *Cyfraith Hywel*, *Welsh dialects* to *Welsh language#Dialects*, *Cymdeithas yr Iaith
  Gymraeg* to *Welsh Language Society*), with references stripped, and searched for each claim. Non-Wikipedia
  pages were downloaded with curl and converted to text; the two Carmarthenshire County Council PDFs (S23,
  S24) were read with pdftotext.
- **S4 (UNC Exploring Celtic Civilizations) is dead**: the site is deactivated. A Wayback Machine capture of
  11 September 2024 was read instead.
- **S3 (Danny Bate) returned HTTP 429 to curl** twice and was read only through a WebFetch summary, so its
  claims are marked partly at best.
- **S7 (Lichfield Cathedral PDF) and the S16 WJEC resource** were not read: the note gives no URL for either,
  and no app content depends on them alone.
- **S9's NLW page** is an archive search-results page with no dates on it; S9's dating claims were checked
  against Wikipedia *Black Book of Carmarthen* and *Hendregadredd Manuscript* instead.
- Independent sources used: the **1901 Census General Report** and the **1911 Census report on the Welsh
  language** (Vision of Britain, `visionofbritain.org.uk/census/EW1901GEN/13` and `/EW1911WEL/4`, read with
  curl and a browser user agent); **Prosiect BRO, *Compendium of Language Statistics based on Census 2021 data***
  (Roberts and Ó Giollagáin, Welsh Government, August 2024,
  `gov.wales/sites/default/files/publications/2024-08/Prosiect BRO Compendium ... data_0.pdf`, Tables
  3.10-3.12); Wikipedia *Lichfield Gospels*, *Welsh Language Act 1967*, *Welsh Language (Wales) Measure 2011*,
  *Tynged yr Iaith*, *S4C*, *Demetae*, *Welsh language*; Wiktionary *moyn* and *shwmae* (raw).
- Three WebSearch calls were used (1891/1901 census figures, Llandeilo 2021, 1911 Carmarthenshire). Each
  search only pointed to a document, which was then read directly.

## Summary

128 claims checked: **81 confirmed, 35 partly, 10 not supported by the cited source, 2 contradicted.**
The note is sound on the big picture, the dialect section and most dates, and its corrected sections (S35-S38,
the TTS notes) check out. The problems that matter:

1. **Llandeilo's 55.1% and 50.3% are the electoral ward, not the town.** S23 gives both a ward table
   (Llandeilo ward: 2,889 people aged 3+, 1,454 Welsh speakers, 50.3%) and a community table (Llandeilo
   community: 53.5% in 2001, **48.7%** in 2011, 851 speakers). The app calls the ward figure "the town" and
   "Llandeilo's 2,889 residents" in three places.
2. **The missing 2021 figure exists.** The Prosiect BRO compendium gives the two Llandeilo LSOAs (W01000676
   Llandeilo 1 and W01000677 Llandeilo 2). Their 2011 figures add up to exactly the ward's 1,454 of 2,889, so
   they cover the same area. In 2021 they held **1,307 Welsh speakers of 2,895 (about 45%)**: 705 of 1,484
   (48%) and 602 of 1,411 (43%). Llandeilo is no longer "about half", and the app's 2000-2026 "today" panel
   stops at 2011.
3. **The 1891 figure is the 1901 figure.** The note's "49.9% (1891), 15.1% monoglot, 34.8% bilingual" comes
   from S20, but the 1901 Census General Report gives exactly those numbers for **1901** and says the Welsh-
   speaking share "declined from 54.0 per cent. in 1891 to 49.9 per cent. in 1901". S18 agrees (45% English-only
   in 1891). The note's "below 50% by 1901" is right; S20 contradicts itself on this (it says both "a little
   over half" in 1901 and "below 50% for the first time" in 1911).
4. **Carmarthenshire did not stay Welsh-speaking "longer than any other historic county".** S26 says it was
   "the most populous of the five historic counties of Wales to remain majority Welsh-speaking throughout the
   20th century". The app's own wording ("longer than most counties") is fine; the note's is not.
5. **1911 Carmarthenshire 84.9% is now confirmed from the primary source**: the 1911 Census Welsh-language
   report, Table VII, gives 849 per 1,000 speaking Welsh (904 in 1901), and Table V gives 205 per 1,000 Welsh
   only (20.5%). The 1901 report gives 90.3% for Carmarthenshire.
6. **"Earliest connected text in Welsh" needs care.** S6 says the Surexit memorandum is "the earliest surviving
   document in the Welsh language", but S5 says "the oldest surviving text entirely in Old Welsh is understood
   to be" the Cadfan Stone at Tywyn (7th century, or 9th by more recent scholarship). The archived S4 says only
   "some of the earliest surviving writing in Welsh". The app says "earliest connected written text" twice.
7. **The language labels drift from the periods in the sources.** The AD 410-799 snapshot labels everyone's
   speech "Old Welsh", but S5 and S20 call c. 550-800 Primitive (or Archaic) Welsh and start Old Welsh at c. 800.
   The 1283-1499 snapshot labels Welsh "Middle Welsh" to 1499, but S20 says Early Modern Welsh "ran from the
   early 15th century". Middle Welsh from 1093 is a political date; S5 puts the change in the early 12th
   century.
8. **The Welsh Not panel is framed as post-1847**, but S18 says the practice was "most common in the early- to
   mid-19th century", with evidence from the 1790s, and was "not a government policy". The app also says "legal
   status for Welsh (1993)", while S20 says Welsh "did not become officially recognised ... until" the 2011
   Measure; the 1993 Act set a principle of equal treatment (S22).
9. **Smaller sourcing errors in the note**: the "similar place ... King James Version" quote is not in S15; S4
   neither dates the Surexit to the early 8th century nor gives a transcription; the Vasconic hypothesis, the
   *Gwener* etymology, the "c. 2000-750 BC" Atlantic Bronze Age dates and Tartessian are not in S1, S32 or S2 as
   read; the 1282-83 Dinefwr repairs are no longer in S13; Garn Goch is 15 ha in S31, not 16.6 ha. S20 says
   Cymdeithas yr Iaith was founded at Pontardawe, S21 says Pontarddulais.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

### A. Claims the app relies on

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | No evidence survives of any pre-Celtic language here | Pre-Celtic | language.ts:40 | C | S1 *Prehistoric Britain*: "No written language of the pre-Roman inhabitants of Britain is known" |
| 2 | Scholars disagree whether Celtic was spoken this early; some argue an Atlantic Bronze Age origin, others later | Celtic debate | language.ts:59-60 | C | S2 (*John T. Koch*): Celtic arose "in a part of Atlantic Europe"; "This idea ... is controversial" |
| 3 | Common Brittonic is the ancestor of Welsh, Cornish and Breton; no sentence survives from here | Brittonic | language.ts:78-79 | C | S32: developed into Old Welsh, Cumbric, Old Cornish, Old Breton; "No documents in the language have been found" (the Bath pendant is from Bath) |
| 4 | Everyone here spoke Common Brittonic from 800 BC | Era table | language.ts:69-82 (`bc(800)`) | P | S32 dates Common Brittonic from "c. 6th century BC"; S1: "by 500 BC most people ... were speaking Common Brythonic", on limited place-name evidence |
| 5 | Roman period: Brittonic took in Latin words that survive in Welsh | Roman; loanwords | language.ts:93 | C | S32: "Latin words were widely borrowed by its speakers in the Romanised towns ... and later from church use" |
| 6 | Latin was the language of the army, administration and inscriptions; Moridunum townsfolk | Roman | language.ts:97-100 | C | S32 ("vied with Latin ... at least in major settlements"); S29 (fort, then vicus became a town) |
| 7 | AD 410-799: Brittonic becomes early Welsh by losing its word endings, labelled "Old Welsh" | Brittonic to Primitive Welsh | language.ts:107-116 | P | Losing endings: *Welsh language* (Janet Davies: "the dropping of final syllables", *bardos* > *bardd*). But S5 and S20 call c. 550-800 "Primitive" or "Archaic Welsh" and start Old Welsh at c. 800; the code `old-welsh` displays "Old Welsh" |
| 8 | AD 410-799: Latin is still the only written language | Era table | language.ts:122 | P | S5: the Cadfan Stone at Tywyn, "the oldest surviving text entirely in Old Welsh", is "thought to date from the 7th century, although more recent scholarship dates it in the 9th century" |
| 9 | Old Welsh from c. 800 | Old Welsh | language.ts:130 | C | S5: "from about 800 AD until the early 12th century"; S20 heading "Old Welsh (800-1150)" |
| 10 | The Llandeilo note is Old Welsh's "earliest connected written text" | Surexit | language.ts:137-138 | P | S6: "the earliest surviving document in the Welsh language". S5 gives the Cadfan Stone as the oldest text entirely in Old Welsh; *Lichfield Gospels*: "some of the earliest known examples of written Old Welsh" |
| 11 | The note opens with the Latin "Surexit" | Surexit | language.ts:144-145 | C | S5 text (Latin words in bold); S6 "it begins with the Latin word Surexit (he arose)" |
| 12 | Middle Welsh from 1093 | Era table | language.ts:152 | P | S5: Old Welsh lasts "until the early 12th century"; S20: Middle Welsh is "the Welsh of the 12th to 14th centuries". 1093 is a political date |
| 13 | Middle Welsh is the language of the court poets and the law of Hywel | Middle Welsh | language.ts:159 | C | S20: "the language of the existing manuscripts of Welsh law"; S8: the Gogynfeirdd wrote in it |
| 14 | A Welsh speaker today can follow much of it | Middle Welsh | language.ts:159 | C | S20: "reasonably intelligible, albeit with some work, to a modern-day Welsh speaker" |
| 15 | The same, as "mostly follow", for a scene whose only real line is court poetry | (languageNote) | conversations.ts:186-187 | P | S20 says "with some work"; S8 says court poetry used language "deliberately antiquarian and obscure" |
| 16 | Latin for church and some law books | Middle Welsh | language.ts:166 | C | S11: "a large number of law manuscripts, written mainly in Welsh but some in Latin"; NLW: "some written in Latin, some in Welsh" |
| 17 | Anglo-Norman French arrives with the conquerors after 1093 | Norman | language.ts:173 | C | S12: "the original invaders spoke Norman French"; Earl of Shrewsbury invaded Deheubarth; *Deheubarth*: "in the possession of the Normans from 1093 to 1155" |
| 18 | After 1283 Welsh stays the language of daily life | After conquest | language.ts:188 | C | S20: in 1536 "the vast majority of those living in Wales did not speak English"; S18 (Johnes): Welsh "remained unchallenged as the majority language ... until the later 19th century" |
| 19 | Marcher lords and officials: French at first, English by the 14th-15th centuries | Norman | language.ts:195 | P | S12: settlements "became English speaking communities" (marked citation needed, no date). S18: by 1536 "English had already replaced French as the language of administration". The 14th-15th century date is not in S12 or S13 |
| 20 | Latin for the written record in church and courts, 1283-1499 | Era table | language.ts:202 | NS | Neither S12 nor S13 discusses record-keeping languages after 1283 |
| 21 | Welsh in 1283-1499 is Middle Welsh | Era table | language.ts:187 (`middle-welsh`) | P | S20: Middle Welsh is 12th-14th centuries and Early Modern Welsh "ran from the early 15th century" |
| 22 | 1500-1699: ordinary people mostly Welsh-speaking only | Early Modern | language.ts:217 | C | S14: Morgan's Bible reached "his largely monoglot fellow countrymen and women"; S20 as row 18 |
| 23 | The 1588 Bible gave Welsh a standard written form | 1588 Bible | language.ts:217 | C | S14: Morgan "moulded the classical language of the poets into the literary Welsh known to us today"; S15: it "established the literary form of the Welsh language". S15 adds that the 1620 revision "became the standard Welsh Bible" |
| 24 | The Acts of Union required English for office; gentry increasingly English after them | Acts of Union | language.ts:224; events.ts:332 | C | S20: monoglot Welsh speakers "could not hold government office"; S20: "many gentry and government officials already spoke English" before the Act |
| 25 | One step in a long split between English-speaking gentry and Welsh-speaking tenants | Acts of Union | events.ts:332 | C | S20: the Act "laid a foundation for the superiority of classes through the use of language" |
| 26 | Farmers and labourers overwhelmingly Welsh: 84.9% of Carmarthenshire in 1911 | 18th-19th c. | language.ts:239 | C | S26; 1911 Census Welsh report Table VII: Carmarthenshire 849 per 1,000 speaking Welsh (904 in 1901) |
| 27 | Gentry, officials and professions used English for law, estates and government | 18th-19th c. | language.ts:246 | C | S17; S20 (Section 20 of the 1536 Act) |
| 28 | Schoolchildren after 1847: schools push English, sometimes with the Welsh Not; how widely is debated | Welsh Not | language.ts:250-254 | P | S18: Welsh Not "most common in the early- to mid-19th century", first evidence "around the 1790s", "gradually became less common in the late 19th century"; "The Welsh Not was not a government policy". The scholarly debate in S18 is mainly whether it caused decline, not only how widely it was used |
| 29 | Carmarthenshire majority Welsh longer than most counties; 82.3% (1931), 75.2% (1951) | 20th c. | language.ts:268 | C | S26 (both figures; "most populous of the five historic counties ... to remain majority Welsh-speaking throughout the 20th century"); S20 also gives 82.3% for 1931 |
| 30 | Wales: steady shift to English, then a political revival from 1962 | 20th c. | language.ts:275 | C | S20 (1891-1981 decline); S21 (Tynged yr Iaith, 13 February 1962, and the Society's founding) |
| 31 | S4C in 1982 | 20th c. | language.ts:275 | C | S20: "launched on 2 November 1982"; S22 |
| 32 | "Legal status for Welsh (1993)" | 20th c. | language.ts:275 | P | S22: the 1993 Act set "the principle of equality of Welsh and English in public services and justice". S20: Welsh "did not become officially recognised as the language of Wales until the passing of the Welsh Language (Wales) Measure 2011" |
| 33 | "About half the town speaks Welsh: 55.1% in 2001, 50.3% in 2011" | 21st c.; census | language.ts:290-291 | P | S23: those are the **ward** figures. Llandeilo **community** (the town): 53.5% (2001), 48.7% (2011). Prosiect BRO: the same area as the ward was about 45% in 2021 |
| 34 | "1,454 of Llandeilo's 2,889 residents aged three and over (50.3%)", down from 55.1% | Census | almanac.ts:325-326 | P | S23 Table 1.4 (ward, DC2206WA): Llandeilo 2,889, 1,454, 50.3%. Correct numbers, but for the ward, not the town |
| 35 | Carmarthenshire fell to 39.9% by 2021, the steepest fall of any county | 21st c. | language.ts:297 | C | S24: 72,838, 39.9%, "the largest percentage point decrease of all local authorities in Wales" (4.0 points); S25: 43.9% to 39.9%, "the largest decline" (S25 says 4.1 points) |
| 36 | "About half of people in Llandeilo speak Welsh (50.3% in 2011)" | Census | conversations.ts:329-330 | P | As row 33: ward figure, and about 45% in 2021, the scene's own era |
| 37 | "Shwmae" is the south Wales greeting | Sample phrases | conversations.ts:329-330 | NS | Not in S23 (the source cited) or any language source. The note itself says "not independently sourced". Wiktionary *shwmae*: an informal form of *siwmae*, no region given |
| 38 | Surexit event: "the earliest surviving connected text in Welsh" | Surexit | events.ts:145-146 | P | As row 10 |
| 39 | Surexit event: written in the 9th century, perhaps copying an older text | Surexit | events.ts:145 | P | S6: "in the mid 9th century". S4 (archived): "dates between the 6th and 9th centuries have been proposed". S5: "thought to have been written in the early 8th century but may be a copy of a text from the 6th or 7th centuries". Already handled in the medieval check |
| 40 | The poem line is real: Peryf ap Cedifor, about 1170 | Middle Welsh | conversations.ts:170-176 | C | S10 quotes "Tra fuam yn saith, trisaith--ni'n beiddai" among poems "attributed to ... Peryf ap Cedifor" for the battle of 1170/1171 |
| 41 | English gloss "thrice seven would not dare face us" | Sample phrases | conversations.ts:172 | C | S10: "not thrice seven would defy us" (a fair paraphrase) |
| 42 | Modern Welsh rendering "Tra buom yn saith, ni feiddiai tri saith ein herbyn" | Sample phrases | conversations.ts:173 | NS | No source gives it. Acceptable as our own rendering, but the note calls it "modern Welsh (close)" as if checked |
| 43 | A Roman fort at Carmarthen around AD 75 | Roman | almanac.ts:156-158 | C | S29: "The initial fort is believed to date from about AD 75" |
| 44 | Only scattered words and short inscriptions survive; no reliable whole-sentence reconstruction | Brittonic phrases | conversations.ts:77-79, 125-127 | C | S32 as row 3 |
| 45 | Romans pronounced Latin differently from church style | TTS notes | conversations.ts:125-126 | P | S3 (via WebFetch summary only): British Latin kept unpalatalised /k/ and /g/ and /w/ for *v* |
| 46 | Tenant farmers spoke Welsh; landlords and agents did business in English; "the Welsh is modern, which is close to how they spoke" | 18th-19th c. | conversations.ts:241-243 | P | First half: S17, S20. "Close to how they spoke" has no source; the note's own Rebecca paragraph treats the language framing as inference |

### B. Language periods, census figures and dated events

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 47 | Primitive Welsh from c. 550 to the mid-8th century | Transition | (row 7) | P | S5 and S20: from c. 550 to "about 800" (Jackson) |
| 48 | Old Welsh c. 800-1150 | Old Welsh | (row 9) | C | S20 heading; S5 "until the early 12th century" |
| 49 | Middle Welsh c. 1100-1400 | Middle Welsh | (row 12) | C | S20 timeline 1100-1400; text "12th to 14th centuries" |
| 50 | By the 6th century Brittonic was diverging into Welsh, Cumbric, Cornish, Breton | Transition | none | C | S32: "By 500-550, Common Brittonic had diverged into" those dialects |
| 51 | 1891: Wales 49.9% Welsh speakers (15.1% monoglot, 34.8% bilingual) | Census | none | X | 1901 Census General Report: those are the **1901** figures; "declined from 54.0 per cent. in 1891 to 49.9 per cent. in 1901". S18 (Johnes 2024): 45% English-only in 1891 |
| 52 | 1901: below 50% | Census | none | C | 1901 Census General Report: 49.9%. S23: "In 1901 half the country's population could speak Welsh". (S20 contradicts itself, see Summary point 3) |
| 53 | 1911: Wales 43.5% (8.5% monoglot, 35% bilingual) | Census | none | C | S20; 1911 report: "43.5 per cent., 35.0 per cent ... and 8.5 per cent" |
| 54 | 1911: Carmarthenshire 84.9%, 20.5% monoglot | Census | language.ts:239 | C | S26; 1911 report Tables VII (849 per 1,000) and V (205 per 1,000) |
| 55 | 1921: Wales 38.7% (6.6% monoglot) | Census | none | C | S20 (single source) |
| 56 | 1931: Wales 36.8% | Census | none | C | S20 |
| 57 | 1961: Wales 26% | Census | none | C | S20 |
| 58 | 1981 and 1991: Wales 18.7% | Census | none | C | S20; S23 ("at 18.7 per cent" in 1991) |
| 59 | 2001: Wales 20.8% | Census | none | P | S20: 20.8%. S23: "20.5 per cent in 2001" |
| 60 | 2011: Wales 19% | Census | none | C | S20; S23 (19.0%); S25 |
| 61 | 2021: Wales 17.8%, 538,300 | Census | none | C | S24; S25; S20 (538,000) |
| 62 | 2001: Carmarthenshire c. 50% | Census | none | C | S23: 50.1%; S26: 50.3% |
| 63 | 2011: Carmarthenshire 43.9%, minority for the first time | Census | none | C | S23: "the first time ever ... to drop below half"; S26 |
| 64 | Llandeilo ward 55.1% (2001), 50.3% (2011), 1,454 of 2,889 | Census | language.ts:290 | C | S23 ward text and Table 1.4; Prosiect BRO LSOAs Llandeilo 1 + 2 in 2011: 785 + 669 = 1,454 of 1,499 + 1,390 = 2,889 |
| 65 | Ammanford ward 62.1% to 49.9%, a fall of 12.2 points | Census | none | C | S23 |
| 66 | Llandeilo's fall (4.8 points) smaller than the county's | Census | none | C | S23: county 50.1% to 43.9% (6.2 points) |
| 67 | Llandeilo notable for absolute numbers; Welsh speakers moving to towns since the 1980s | Census | none | P | S23: towns "continued to be important centres for attracting Welsh speakers", Llandeilo (1,454). The 1980s date was not found |
| 68 | Carmarthenshire stayed majority Welsh longer than any other historic county; the last to become majority non-Welsh | 20th c.; S26 | none | X | S26: "the most populous of the five historic counties of Wales to remain majority Welsh-speaking throughout the 20th century" |
| 69 | 2021 county fall the largest in Wales | Census | language.ts:297 | C | S24, S25 |
| 70 | William Morgan, 1545-1604, of Penmachno, St John's College Cambridge | 1588 Bible | none | C | S14; S15 |
| 71 | Morgan began the work around 1578 | 1588 Bible | none | P | S14: "in about 1578". S15: he began the Old Testament "in the early 1580s" |
| 72 | Built on Salesbury's 1567 New Testament; Old Testament from Hebrew and Greek | 1588 Bible | none | C | S14; S15 |
| 73 | Published in London by the Queen's Printer's deputies | 1588 Bible | none | P | S14: "printed ... by the deputies of Christopher Barker, the Queen's Printer". London is not stated in S14 or S15 |
| 74 | Quote: "a similar place in the Welsh language to that of the venerated King James Version in English" | 1588 Bible | none | NS | Not in S15 (either article). S20 has the comparison in other words: "Like its English counterpart, the King James Version, this proved to have a strong stabilizing effect" |
| 75 | It secured Welsh for worship and everyday communication | 1588 Bible | none | P | S14: "the foundation stone on which modern Welsh literature has been based"; "everyday communication" is not in S14 or S15 |
| 76 | Acts of Union: only 150 words on language; Section 20 | Acts of Union | none | P | In S20, not in the cited S16 Wikipedia article (WJEC not read) |
| 77 | Gentry welcomed the Acts: legal equality, less Marcher power | Acts of Union | none | C | S16: "popular with the Welsh gentry who saw the acts as bringing legal equality"; "reducing the influence of the marcher lords" |
| 78 | Language clause repealed only by the 1993 Act | Acts of Union | none | C | S20; S16 (repeal date 21 December 1993 by the Welsh Language Act 1993) |
| 79 | Blue Books commissioners Lingen, Symons, Vaughan Johnson, non-Welsh-speaking Anglicans | Blue Books | none | C | S17 |
| 80 | Commissioned after unrest including Rebecca and Chartism | Blue Books | none | C | S17 (Chartists, Rebecca, *The Times*, William Williams's motion of March 1846) |
| 81 | Informants were local and mostly Anglican | Blue Books | none | NS | Not in S17. *Welsh language* and S18 mention Welsh-speaking assistants |
| 82 | "Brad y Llyfrau Gleision"; Kenneth O. Morgan's "Glencoe and the Amritsar of Welsh history" | Blue Books | none | C | S17 verbatim |
| 83 | Lasting belief that advancement needed English; a "complex" | Blue Books | none | C | S17: "the Welsh people began to harbour a complex about their image" |
| 84 | Welsh Not: a token passed between children, the holder punished | Welsh Not | none | C | S18 |
| 85 | Evidence from about 1790; most common early-to-mid 19th century; declining after 1850 | Welsh Not | (row 28) | P | S18: first evidence "around the 1790s", most common "early- to mid-19th century", "less common in the late 19th century", evidence "to the start of the 20th century". "After 1850" is not in S18 |
| 86 | Johnes 2024 the first academic study; "little evidence to suggest that the Welsh Not caused the decline of Welsh" | Welsh Not | (row 28) | C | S18 verbatim; "A large majority of children were not attending day school when it was most common" |
| 87 | Tynged yr Iaith, BBC Wales radio lecture, 13 February 1962 | 20th c. | none | C | S21; *Tynged yr Iaith* |
| 88 | Cymdeithas yr Iaith founded 4 August 1962 at Pontarddulais; constitution 18 May 1963 | 20th c. | none | C | S21 verbatim. S20 instead says "at a Plaid Cymru summer school held in Pontardawe": record the contradiction |
| 89 | Welsh Language Act 1967 allowed Welsh in the courts | 20th c. | none | C | *Welsh Language Act 1967*: "allowed the Welsh language to be used in legal proceeding in Wales" |
| 90 | Welsh Language Act 1993: royal assent 21 October 1993; equality principle; Welsh Language Board | 20th c. | none | C | S22 |
| 91 | Welsh Language (Wales) Measure 2011: official status, Commissioner | 20th c. | none | C | S20; *Welsh Language (Wales) Measure 2011* |
| 92 | S4C 2 November 1982 after a hunger-strike threat by Gwynfor Evans | 20th c. | none | C | S20 |
| 93 | Rebecca Riots 1839-1843; first gates at Yr Efail Wen, Carmarthenshire, 1839; poverty, rents, tithes, tolls | Rebecca | none | C | S19 |
| 94 | Merched Beca; ceffyl pren | Rebecca | none | C | S19 |

### C. The rest of the note

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 95 | Surexit transcription | Surexit | none | C | S5 matches the note word for word |
| 96 | Parties: Tudfwlch claimed Telych, held by "Elgu son of Gelli and Elgu's kin" | Surexit | none | P | S5: "Elgu son of Gelli and the tribe of Idwared"; S4: "the people of Idwared". Both say Tudfwlch lost the case ("they disjudge Tudri's son-in-law by law") before Elgu gave the animals |
| 97 | Writing early-to-mid 9th century, perhaps copying a 6th-7th century text | Surexit | (row 39) | P | S6 mid-9th; S5 early 8th; S4 6th-9th for composition |
| 98 | S4 gives a full transcription, an early-8th-century date, "the earliest surviving Welsh-language document" | Sources (S4) | none | NS | Archived S4: translation only; "dates between the 6th and 9th centuries have been proposed"; "some of the earliest surviving writing in Welsh" |
| 99 | Gospels: Peter Lord c. 730; 236 pages (118 leaves); Luke mostly and John wholly missing; binding stripped | Surexit | none | C | S6 |
| 100 | Gelli bought it "for the price of his best horse" | Surexit | none | P | S6: "for the price of a good horse"; *Lichfield Gospels*: "his best horse" |
| 101 | At Llandeilo about 200 years from the early 9th century; at Lichfield by the late 10th | Surexit | none | C | S6 |
| 102 | Gogynfeirdd active c. 1100-1350 | Middle Welsh | none | P | S8: "Poets of the Princes (c. 1100 - c. 1300)" |
| 103 | Meilyr Brydydd, fl. 1100-1137, the earliest | Middle Welsh | none | C | S8 |
| 104 | Black Book of Carmarthen c. 1250, earliest manuscript entirely in Welsh, produced in this region | Middle Welsh | none | P | *Black Book of Carmarthen*: "earliest surviving manuscript written solely in Welsh", "mid-13th century". The name comes from "its association with" Carmarthen Priory; where it was written is not stated |
| 105 | Hendregadredd Manuscript c. 1282-1330 | Middle Welsh | none | P | *Hendregadredd Manuscript* and S8: "between 1282 and 1350" |
| 106 | Peryf's brothers killed with Hywel ab Owain at Pentraeth, c. 1170-71 | Middle Welsh | none | C | S10: "At least three of Hywel's foster-brothers were also killed" |
| 107 | Cyfraith Hywel: over 40 manuscripts, mid-13th to 16th century, three redactions, Welsh and Latin | Law | none | C | NLW: "as many as forty lawbooks dating from before 1536"; S11 Wikipedia (three redactions) |
| 108 | Peniarth 28 is Latin, thought to translate a Welsh original | Law | none | C | S11 Wikipedia (marked citation needed); NLW confirms it is Latin |
| 109 | Blegywryd tied to Deheubarth; its manuscripts claim equality for the king of Dinefwr | Law | none | P | S11 Wikipedia, but the Dinefwr sentence is marked "citation needed" and has no second source |
| 110 | Quote: "the law of Hywel adjudges it to the youngest son as to the eldest" | Law | none | P | Verbatim in S11, but it comes from the Iorwerth text and is about illegitimate sons ("This provision differed the most from canon law"), not a youngest-versus-eldest rule |
| 111 | FitzOsbern overran Gwent; Earl of Shrewsbury invaded Deheubarth; Marches and Pura Wallia | Norman | none | C | S12 |
| 112 | Rhys ap Tewdwr killed 1093; the Lord Rhys 1155-1197 rebuilt Dinefwr | Norman | none | C | S13 (both articles) |
| 113 | Statute of Rhuddlan created Cardiganshire, Carmarthenshire, Pembrokeshire | Norman | none | C | *Deheubarth* (S12) |
| 114 | Dinefwr repaired by the crown in 1282-83 (ditches, tower, bridge, hall, gate) | Norman | none | NS | Not in the current *Dinefwr Castle* article (S13) |
| 115 | Moridunum, "sea fort", named by Ptolemy with Luentinum; Demetae in modern Dyfed | Roman | none | C | S29; S30 (*Demetae*) |
| 116 | Carmarthen fort c. AD 75, possibly replacing Merlin's Hill, garrison to c. 120, then a town | Roman | almanac.ts:157 | C | S29 verbatim |
| 117 | Two Roman forts at Dinefwr, c. AD 74 | Roman | none | C | S27 |
| 118 | Garn Goch 16.6 ha, Iron Age or Late Bronze Age, with use back to the Neolithic | Roman | none | P | S31: "At 15 ha"; "Carmarthenshire's largest Iron Age hillfort"; earlier occupation "possibly into the Neolithic", Bronze Age finds |
| 119 | Seven British Latin sound features (Schrijver via Bate) | Loanwords | none | P | S3 read through a WebFetch summary only (HTTP 429 to curl); the summary lists all seven with the note's examples |
| 120 | *Gwener* from the oblique stem *Vener-* | Loanwords | none | NS | Not in S32 |
| 121 | Bath pendant text; *abonā* 'river', *canto-* 'border'; Tacitus on Gaulish | Brittonic | none | C | S32 |
| 122 | Pytheas's place-names suggest Celtic by the 4th century BC | Pre-Celtic | none | C | S1 *Prehistoric Britain*: "by 500 BC ... on the limited evidence of place-names recorded by Pytheas"; Pytheas c. 325 BC |
| 123 | The Vasconic substratum hypothesis is rejected by most specialists | Pre-Celtic | none | NS | Not in S1's pages as read. *Pictish language* lists a Basque-like pre-Indo-European Pictish only as one hypothesis |
| 124 | *Celtic from the West* volumes 2010-2016; Atlantic Bronze Age c. 2000-750 BC; Tartessian | Celtic debate | none | NS | S2: volumes "(2012-2016)", Beaker spread "~2550 BC". No 2000-750 BC dates and no Tartessian in S2 |
| 125 | Dyfedeg: one of four dialects; from the Demetae; close to Gwenhwyseg; Morris 1910 glossary | Dialect | none | C | S28 |
| 126 | *moyn* and *dishgled* in south Dyfed against northern *isio* and *paned* | Dialect | none | C | S34 (*Welsh language*); S37; S38, now read directly: "South Wales, colloquial ... to want", from *ymofyn* |
| 127 | Southern *s* palatalised next to *i* (*mis* [miːʃ]) | Dialect; TTS | none | C | S35 ("follows /ɪ/ or /iː/"); S36; S34 ("next to a high front vowel like /i/") |
| 128 | Martha Williams of Llansawel, b. 1907, St Fagans, uploaded 17 March 2010 | Dialect | none | C | S33 |

Rows 4, 7, 12 and 21 are judged against the note's sources; the app's era boundaries (800 BC, AD 410, 1093,
1283) are political or era-model dates, so they are partly right rather than wrong.

## Corrections for the note

1. **Census table and 20th-century section:** change "1891 | Wales | 49.9% (15.1% monoglot Welsh, 34.8%
   bilingual)" to "1891 | Wales | 54.0% (aged 2 and over)", and give "1901 | Wales | 49.9% (15.1% Welsh only,
   34.8% both)". Source: 1901 Census General Report (Vision of Britain EW1901GEN/13). Record that S20 puts the
   1901 figures against 1891 and contradicts itself on whether 1901 or 1911 first fell below half.
2. **Add the 2021 Llandeilo figure** (closing the open question): LSOAs Llandeilo 1 and 2, 1,307 of 2,895
   (45.1%; 48% and 43%). Note that their 2011 totals equal the ward's exactly. Add the compendium as a new
   source (suggested S39).
3. **Say "ward" everywhere the 55.1% and 50.3% appear**, and add the community figures from S23 Table 1.6:
   Llandeilo community 57.3% (1991), 53.5% (2001), 48.7% (2011, 851 speakers).
4. **Carmarthenshire's distinction:** replace "remaining majority Welsh-speaking longer than any other historic
   county" and "the last historic county to become majority non-Welsh-speaking" with S26's wording: the most
   populous of the five historic counties that stayed majority Welsh-speaking through the 20th century.
5. **1911 and 1901 county figures:** add the primary source for 84.9% and 20.5% (1911 report, Tables VII and V)
   and the 1901 figure of 90.3%, which supports "likely higher a century earlier".
6. **Periods:** Primitive Welsh c. 550 to c. 800 (not "mid-8th century"); Early Modern Welsh from the early 15th
   century per S20.
7. **Earliest written Welsh:** add S5's Cadfan Stone (Tywyn), "the oldest surviving text entirely in Old Welsh",
   7th or 9th century, as a rival to the Surexit's claim, and use S6's wording "the earliest surviving document
   in the Welsh language".
8. **S4:** the site is deactivated; cite the Wayback capture of 11 September 2024. It gives a translation
   only (adapted by Michael Newton from Evans, Jenkins and Owen, and Davies), dates the composition to "between
   the 6th and 9th centuries", and does not call the note the earliest Welsh document. Move the transcription
   and the early-8th-century date to S5, where they are.
9. **Surexit parties:** "Elgu son of Gelli and the tribe (or people) of Idwared", not "Elgu's kin"; Tudfwlch
   lost the case before Elgu paid.
10. **1588 Bible:** remove the "similar place ... King James Version" quote from S15 or re-cite S20's different
    wording; record S14 (c. 1578) against S15 (early 1580s); drop "London" unless sourced; note that the 1620
    revision became the standard text (S15).
11. **Welsh Not:** "declining after 1850" becomes "less common in the late 19th century, with evidence into the
    early 20th" (S18), and add "never government policy" (S18).
12. **Acts of Union:** cite the "150 words" and Section 20 to S20, not S16.
13. **Blue Books:** drop "mostly Anglican informants" or find a source.
14. **Law:** the inheritance quote is from the Iorwerth text and concerns illegitimate sons; flag the Dinefwr
    equality claim as single-source and "citation needed" in S11.
15. **Middle Welsh:** Gogynfeirdd c. 1100 to c. 1300 (S8); Hendregadredd 1282-1350; the Black Book is
    associated with Carmarthen Priory, which is not the same as being produced there.
16. **Garn Goch:** 15 ha, Iron Age, earlier occupation "possibly into the Neolithic" (S31).
17. **Unsupported details to source or drop:** Vasconic (S1), *Gwener* (S32), "c. 2000-750 BC" and Tartessian
    (S2), the 1282-83 Dinefwr repairs (S13), "shwmae" as the southern greeting.
18. **Contradiction to record:** Cymdeithas yr Iaith founded at Pontarddulais (S21) against Pontardawe (S20).
19. **S38** can now be cited directly (raw Wiktionary read on 2026-10-02), so "a lead only" can be lifted.
20. **S3** should be re-read directly when the site stops rate-limiting.

## Corrections for app content

Line numbers are for the working tree on 2026-10-02.

1. **src/content/language.ts:290-291** (`today`, Llandeilo)
   - Current: "About half the town speaks Welsh: 55.1% in 2001, 50.3% in 2011." /
     "Mae tua hanner y dref yn siarad Cymraeg: 55.1% yn 2001, 50.3% yn 2011."
   - Corrected EN: "Welsh speakers in the Llandeilo ward fell from 55.1% in 2001 to 50.3% in 2011, and to
     about 45% in 2021."
   - Corrected CY: "Gostyngodd siaradwyr Cymraeg yn ward Llandeilo o 55.1% yn 2001 i 50.3% yn 2011, ac i
     tua 45% yn 2021."
   - Sources: `language:S23` plus the Prosiect BRO compendium (new key, suggested `language:S39`).
2. **src/content/almanac.ts:325-326** (`welsh-today`)
   - Current: "In 2011, 1,454 of Llandeilo’s 2,889 residents aged three and over (50.3%) spoke Welsh, down
     from 55.1% in 2001." / "Yn 2011, roedd 1,454 o 2,889 o drigolion Llandeilo dros dair oed (50.3%) yn siarad
     Cymraeg, i lawr o 55.1% yn 2001."
   - Corrected EN: "In 2011, 1,454 of the 2,889 people aged three and over in the Llandeilo ward (50.3%) spoke
     Welsh, down from 55.1% in 2001. By 2021 it was about 45%."
   - Corrected CY: "Yn 2011, roedd 1,454 o'r 2,889 o bobl dros dair oed yn ward Llandeilo (50.3%) yn siarad
     Cymraeg, i lawr o 55.1% yn 2001. Erbyn 2021 roedd tua 45%."
   - Sources: `language:S23`, suggested `language:S39`.
3. **src/content/conversations.ts:329-330** (`today` scene provenance)
   - Current: 'About half of people in Llandeilo speak Welsh (50.3% in 2011), and "shwmae" is the south Wales
     greeting. ...' / "Mae tua hanner pobl Llandeilo yn siarad Cymraeg (50.3% yn 2011), a “shwmae” yw cyfarchiad
     y de. ..."
   - Corrected EN: "Just under half of people in and around Llandeilo speak Welsh (50.3% in 2011, about 45% in
     2021). ..." and drop the "shwmae" clause until a source is found.
   - Corrected CY: "Mae ychydig o dan hanner pobl Llandeilo a'r cyffiniau yn siarad Cymraeg (50.3% yn 2011, tua
     45% yn 2021). ..."
   - Sources: `language:S23`, suggested `language:S39`.
4. **src/content/language.ts:137-138** (`old-welsh`) and **src/content/events.ts:145-146** (`surexit`)
   - Current (language.ts): "Old Welsh. Its earliest connected written text is a note in the gospel book kept
     at Llandeilo." / "Hen Gymraeg. Nodyn yn yr efengyl a gadwyd yn Llandeilo yw ei thestun ysgrifenedig
     cysylltiedig cynharaf."
   - Corrected EN: "Old Welsh. The earliest surviving document in Welsh is a note in the gospel book kept at
     Llandeilo."
   - Corrected CY: "Hen Gymraeg. Nodyn yn yr efengyl a gadwyd yn Llandeilo yw'r ddogfen Gymraeg gynharaf sydd
     wedi goroesi."
   - Current (events.ts): "... is the earliest surviving connected text in Welsh." / "... yw'r testun Cymraeg
     cysylltiedig cynharaf sydd wedi goroesi."
   - Corrected EN: "... is the earliest surviving document in Welsh (an inscribed stone at Tywyn may be older)."
   - Corrected CY: "... yw'r ddogfen Gymraeg gynharaf sydd wedi goroesi (efallai fod carreg arysgrifedig yn
     Nhywyn yn hŷn)."
   - Sources: `language:S6`, `language:S5`.
5. **src/content/language.ts:122-123** (`primitive-welsh`, clergy)
   - Current: "Latin is still the only written language." / "Lladin yw'r unig iaith ysgrifenedig o hyd."
   - Corrected EN: "Latin is still the main written language, though a few short Welsh inscriptions may date
     from now."
   - Corrected CY: "Lladin yw'r brif iaith ysgrifenedig o hyd, er y gall ambell arysgrif Gymraeg fer ddyddio o'r
     cyfnod hwn."
   - Source: `language:S5`.
6. **src/content/language.ts:114** (`primitive-welsh` uses the `old-welsh` code, so the panel shows "Old
   Welsh" for AD 410-799). Structural: either add a `primitive-welsh` language (EN "Primitive Welsh", CY
   "Cymraeg Cynnar") for c. 550-799, or keep `brittonic` until c. 550. Source: `language:S5`, `language:S20`.
   This is a model decision for Dewi, not a text fix.
7. **src/content/language.ts:186-188** (`after-conquest`, `middle-welsh` to 1499). S20 starts Early Modern
   Welsh in the early 15th century. Structural: end this snapshot's Middle Welsh at 1399 and use `welsh` from
   1400, or accept and record the simplification. Source: `language:S20`.
8. **src/content/language.ts:250-254** (`chapel-and-estate`, schoolchildren)
   - Current who: "Schoolchildren after 1847" / "Plant ysgol ar ôl 1847".
   - Corrected who: "Schoolchildren" / "Plant ysgol".
   - Current note: "Schools push English, sometimes with the Welsh Not; how widely it was used is debated." /
     "Mae ysgolion yn gwthio Saesneg, weithiau gyda'r Welsh Not; mae dadl ynghylch pa mor eang y'i defnyddiwyd."
   - Corrected EN: "Day schools teach in English, and some teachers punish Welsh with the Welsh Not, most often
     in the early and mid 1800s. It was never government policy, and whether it caused Welsh to decline is
     doubted."
   - Corrected CY: "Mae ysgolion dyddiol yn dysgu drwy'r Saesneg, ac mae rhai athrawon yn cosbi'r Gymraeg â'r
     Welsh Not, gan amlaf yn gynnar a chanol y 1800au. Nid oedd erioed yn bolisi'r llywodraeth, ac mae amheuaeth
     a achosodd ddirywiad y Gymraeg."
   - Source: `language:S18`.
9. **src/content/language.ts:275-276** (`twentieth-century`, Wales as a whole)
   - Current: "A steady shift to English, then a political revival from 1962, followed by S4C (1982) and legal
     status for Welsh (1993)." / "Symudiad cyson at y Saesneg, yna adfywiad gwleidyddol o 1962, ac yna S4C (1982)
     a statws cyfreithiol i’r Gymraeg (1993)."
   - Corrected EN: "A steady shift to English, then a political revival from 1962, followed by S4C (1982) and
     the Welsh Language Act (1993), which said Welsh and English should be treated equally in public life."
   - Corrected CY: "Symudiad cyson at y Saesneg, yna adfywiad gwleidyddol o 1962, ac yna S4C (1982) a Deddf yr
     Iaith Gymraeg (1993), a ddywedodd y dylid trin y Gymraeg a'r Saesneg yn gyfartal mewn bywyd cyhoeddus."
   - Sources: `language:S20`, `language:S22`. (Official status came with the 2011 Measure, which belongs in
     the `today` snapshot if wanted.)
10. **src/content/conversations.ts:186-187** (`news-of-the-ambush` languageNote)
    - Current: "Middle Welsh, which a Welsh speaker today can mostly follow" / "Cymraeg Canol, y gall siaradwr
      Cymraeg heddiw ei deall gan mwyaf".
    - Corrected EN: "Middle Welsh, which a Welsh speaker today can follow with some effort".
    - Corrected CY: "Cymraeg Canol, y gall siaradwr Cymraeg heddiw ei dilyn gydag ychydig o ymdrech".
    - Source: `language:S20`.
11. **src/content/language.ts:78-79** (`brittonic`, optional)
    - Current: "Common Brittonic, the Celtic ancestor of Welsh, Cornish and Breton. No sentence of it survives
      from here."
    - Corrected EN: "Common Brittonic, the Celtic ancestor of Welsh, Cornish and Breton, probably spoken across
      Britain by about 500 BC. No sentence of it survives from here."
    - Corrected CY: "Y Frythoneg, hynafiad Celtaidd y Gymraeg, y Gernyweg a’r Llydaweg, a siaredid ledled Prydain
      erbyn tua 500 CC yn ôl pob tebyg. Does dim brawddeg ohoni wedi goroesi o’r fan hon."
    - Sources: `language:S32`, `language:S1`.

The Welsh above follows the house pattern of the surrounding strings; it has not had a human Welsh check
(still parked in the decision log).

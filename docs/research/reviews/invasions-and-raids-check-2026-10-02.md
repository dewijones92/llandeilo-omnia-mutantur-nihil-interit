---
title: Independent check of invasions-and-raids.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: invasions, raids and conquests that reached the Tywi valley

Reviewed note: [`../invasions-and-raids.md`](../invasions-and-raids.md) (status: draft, updated
2026-10-02, untracked in the working tree when checked). Repo: `main` at `43d86ea`;
`git rev-list --left-right --count HEAD...origin/main` gave 0/0. Nothing in `src/` uses this note yet
(a search of `src/content/` for 1213, 1257, Cymerau, Bauzan, Trallwng and Ogham found nothing outside
`generated/sources.ts`), so the corrections below are to the note and its "What a card or cutscene can
show" table, before anything is built from it.

## Method

- Every primary and secondary source with full text online was downloaded and searched as raw text,
  not through a summarising fetch: the Rolls Brut [S1], the 1860 Annales Cambriae [S2], Lloyd vols 1
  and 2 [S4][S5] and Asser [S6] as archive.org OCR text; Gough-Cooper's AC B [S3] as both the OCR text
  and the PDF (pp. 82-83, PDF pp. 92-93, read with `pdftotext`, which gives the footnotes); the
  battlefield report [S7] as the PDF from Coflein, read in full.
- The web sources [S8]-[S14] were downloaded with curl and read as text (Wikipedia via `action=raw`).
  S14, which the note had only as a search summary, was opened.
- Independent sources added: **Coflein NPRN 403587** (Coed Llathen) and **NPRN 404717** (Cymerau),
  both RCAHMW Battlefields Inventory, January 2017; **Matthew Paris, *Chronica Majora* vol. 5** (Rolls
  Series, archive.org `matthiparisiensi05pari`, p. 646); Wikipedia *Stephen Bauzan* (a lead only);
  **Heneb (Dyfed Archaeological Trust) Historic Landscape Character Area 253, Dyffryn Cothi**; and
  **GENUKI's extracts from Lloyd's *History of Carmarthenshire*** (Talley).
- Dates were checked by calculation: Easter 1257 (Julian) was 8 April, so Pentecost was 27 May, the
  Wednesday after was 30 May and 2 June was a Saturday, as AC B says. In 1213 the Thursday after the
  octave of St Hilary (13 January) was 24 January.
- Distances were recomputed from the app centre (SN 6290 2225) for every grid reference given.
- Two WebSearch calls were used (Coflein's Cymerau record; Trallwng Elgan).

## Summary

68 claims checked: **53 confirmed, 12 partly, 1 not supported by the cited source, 2
contradicted.** The chronicle work is careful: almost every quotation in the note is exact, the
Latin is translated correctly, and the 1257 sequence in AC B is faithfully reported. The errors that
matter are concentrated in the two events the note proposes for new key dates, 1213 and 1257:

1. **Trallwng Elgan (1213) is located, by the note's own source.** Lloyd vol. 2 [S5], note 147:
   "Trallwng Elgan is a township in the north of the parish of Talley; it belonged to the canons of
   that place". Lloyd's *History of Carmarthenshire* (via GENUKI) has the army encamp "on January 25
   1213 at Trallwng Elgan, a holding of the canons of Talyllychau, which lay a little to the north of
   the abbey". Heneb adds that the grange's "precise location has yet to be firmly established" (perhaps
   Edwinsford or Glanyrannell). Either way it is about 12-15 km north of the centre, so **the 1213 camp
   is inside the area**, not unlocated.
2. **The 1213 army was not "under Fawkes".** The Brut has young Rhys (Rhys Ieuanc) raise the army in
   Brycheiniog, with his brother Owain and "Foulke, the seneschal of Cardiff" joining him; Lloyd adds
   Engelard of Cigogné from Hereford. Fawkes led the centre division; young Rhys led the van and the
   siege.
3. **Dinefwr in 1213 did not simply "surrender before the afternoon".** The garrison held one tower;
   before the afternoon they agreed terms and gave three hostages, to give up the castle "unless they
   should receive support by the evening of next day" [S1].
4. **Stephen Bauzan was killed in 1257.** The note says the sources read "do not say what became of
   him", but Lloyd [S5] says "the expedition, with its leader, was overwhelmed", and Matthew Paris
   lists "dominus Stephanus Baucan, regi carissimus" among those who fell. This answers an open
   question and belongs on the card.
5. **The 1257 dead were not mostly English.** Chapman (quoted in S7) and both Coflein records say the
   force was "an English-led force of knights and predominately Welsh infantry drawn from the Marcher
   lordships", with heavy losses "particularly among the predominantly Welsh infantry". The chronicles'
   "Saxons" and "three thousand" must not become "3,000 English killed".
6. **The camp at Llandeilo is single-source, not cross-checked.** The note's summary says it is
   "cross-checked across Annales Cambriae B and the Brut", but the Brut has Rhys Fychan go to Dinefwr,
   not a camp at Llandeilo, and the note's own detailed section says "AC B alone gives the camp at
   Llandeilo". Lloyd follows AC B, so he is not independent. Label it documented by one primary source.
7. **Battle-site details need Coflein's figures.** Coflein gives the first OS map as **1891**, not 1888
   (S7 says 1888), and says the battle field names are not attested before the early OS editions.
   Coflein's Cymerau record gives Lloyd's confluence as **SN 500 208** (record point SN 5000 2000), not
   the report's SN 501 201, and puts Phillimore's site "two miles south east of Talyllychau", which
   settles the report's south-east/south-west inconsistency. Coflein also quotes Remfry's translation
   "at the wood of Llanarthne (Coed Llathen)", which treats Gough-Cooper's correction and the OS name
   as one place, not two.
8. **Minor:** the summary cites Lloyd vol. 2 [S5] for the raiders' targets; it is vol. 1 [S4]. Lloyd
   does not "identify" Æthelsige; he says "it is not easy to say who the Æthelsige was". The Pipe Roll
   reads "Cat (for Cantre) maur", Lloyd's emendation. The Fishguard article does name a unit from
   outside Pembrokeshire (the Cardiganshire Militia). One Carmarthenshire Ogham stone (Llangeler) is
   north of Carmarthen, not west of it.

No contradiction was found in the negative findings: no Viking raid, no Ogham stone, no Norman castle
of 1093-1116, no Civil War fighting and no Fishguard news inside the area. The Brut's index lists
Llandeilo only for the 1213 burning and Rhys Gryg's death there; AC B names "llanthelou" only in 1257.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

| # | Claim (note section) | Verdict | Evidence |
|---|---|---|---|
| 1 | No Viking raid on Llandeilo is recorded in the Brut, AC or AC B (Summary; s.2) | C | Brut index: Llandeilo appears only as "burnt by Rhys the Hoarse, 276" and "Rhys the Hoarse dies at, 320"; AC B has "llanthelou" once, in 1257. [S1] https://archive.org/details/brutytywysogiono00cara ; [S3] https://archive.org/details/ac-b-first-edition |
| 2 | Raiders "chiefly attracted by the plunder of the monasteries"; places raided "all the sites of important churches" (Summary cites [S5]; s.2 cites [S4]) | P | Quotation exact, but it is in vol. 1 [S4] p. ~330s, not vol. 2. Lloyd frames these as coastal raids ("no part of the coast was wholly secure"), which weakens the inference for an inland church. https://archive.org/details/historyofwalesfr01lloyuoft |
| 3 | 878: brother of Inwar and Healfdene sailed "de Demetica regione, in qua hyemaverat, post multas ibi Christianorum strages factas" | C | Asser ch. 54, exact. https://archive.org/details/asserslifekinga00stevgoog |
| 4 | 982 (Rolls 981): "Godfrey, son of Harold, devastated Dyved and Menevia" | C | Brut, exact. [S1] |
| 5 | 988: Llanbadarn, Menevia, Llanilltud, Llancarfan, Llandudoch devastated | C | Brut "Llanilltud, and Llangarvan, and Llandydoch"; AC 1860 "Gentiles vastaverunt Meneviam, et Llan Patarn, et Llan Iltut, et Llan Carvan, et Llan Dethoch". https://archive.org/details/annalescambri20will |
| 6 | 989: "Maredut redemit captivos a gentilibus nigris, nummo pro unoquoque dato" | C | AC 1860, exact. [S2] |
| 7 | 999: Menevia depopulated, bishop Morgeneu killed | C | Brut. [S1] |
| 8 | 1012: Menevia devastated "by Entris and Ubis"; Lloyd reads Eadric Streona | C | Brut; Lloyd vol. 1: "it is Eadric who in 1012 leads the English attack upon Mynyw". [S1][S4] |
| 9 | 1022: Eilaf, "a Dane in the service of Cnut"; Rhain the Irish pretender defeated at Abergwili | C | Lloyd vol. 1 note 112 and text "his defeat at Abergwili (1022) of the Irish pretender Rhain"; Brut "that battle took place at Aber Gwyli". [S4][S1] |
| 10 | 1042: Hywel beat Danes at Pwll Dyfach "some 5 miles north-west of Carmarthen" | C | Lloyd vol. 2, exact. [S5] https://archive.org/details/historyofwalesfr02lloyuoft |
| 11 | 1044 (Rolls 1042): Hywel ab Edwin with "a fleet of the people of Ireland", killed at Aber Tywi; AC B "accepta classe gentilium intrat hostium tewy" | C | Brut and AC B b1065.1, exact. [S1][S3] |
| 12 | 1047: 140 of Gruffudd's warband killed by treachery of the Ystrad Tywi nobles; he devastates Dyfed and Ystrad Tywi | C | AC B b1068.1 "familia grifini ad modum c.xl dolo optimatum stratewi ceciderunt ... rex Grifinus demeciam et stratewi deuastauit"; Lloyd "slew 140 of their number". [S3][S5] |
| 13 | 1080: "the murder of Abraham by the Norsemen" | C | Lloyd vol. 2, exact. [S5] |
| 14 | c. 1091: "Menevia was demolished by the Pagans of the Isles" | C | Brut, exact. [S1] |
| 15 | Rolls Brut years run behind (Aber Tywi 1044 filed under 1042) | C | Brut heads Aber Tywi "1042"; Lloyd gives 1044. Rhys ap Tewdwr's year not re-checked. [S1][S5] |
| 16 | Carmarthenshire Ogham stones: Castell Dwyran, Eglwys Cymyn, Llandawke, Llangeler, Llanwinio, St Ishmael, Henllan Amgoed | C | BabelStone list with NGRs (CDWYR/1 SN 1440 1819 … LGELR/1 SN 4030 3800). https://www.babelstone.co.uk/Blog/2010/03/ogham-stones-of-wales.html |
| 17 | "All west of Carmarthen" (Summary) / "all far west of the area" (s.1) | P | All are far from the area (nearest Carmarthenshire stone, Llangeler, is 27 km away), but Llangeler (SN 403 380) is north of Carmarthen, not west. Nearest Ogham stone of all is Aberhydfer, about 23.7 km. [S8] |
| 18 | LDEIL/1 is at Llandeilo near Maenclochog, Pembrokeshire | C | BabelStone: "St Teilo's Church, Llandeilo (Llandilo), Maenclochog, Pembrokeshire. NGR SN 0996 2691". [S8] |
| 19 | Nearest to the east: Aberhydfer and Pentre Poeth near Trecastle (now in Llywel church / British Museum) | C | BabelStone ABHYD/1 SN 8590 2780 ("Inside St David's Church, Llywel"); TCSTL/1 SN 8700 2900. [S8] |
| 20 | Lloyd: "few Latin inscriptions ... between the Towy and the Tawe"; Brythonic advance "into the region of Llandovery, Llandeilo and Llanelly" is conjecture; "the ogam stronghold is the region of Dyfed" | C | Lloyd vol. 1, exact; "it is only possible to conjecture". [S4] |
| 21 | Uí Liatháin tribal name; Tewdos ap Rhain claimed by the Déisi of Waterford | C | Lloyd vol. 1, exact. [S4] |
| 22 | *Expulsion of the Déisi*: c. 8th century, later manuscripts; Eochaid son of Artchorp settles in "Demed"; Harleian genealogies agree to Triphun, differ above him | C | Wikipedia lead and body. https://en.wikipedia.org/wiki/The_Expulsion_of_the_D%C3%A9isi |
| 23 | "Some scholars, such as Eoin MacNeill, regard it as late fiction" | P | The article says so, but its next section calls MacNeill one "who treats the literary accounts as largely historical". The source contradicts itself; a lead only. [S9] |
| 24 | Offa 778 and 784: AC B "vastacio britonum dextralium apud offa" / "cum offa in estate"; Lloyd "raids ... made upon Welsh territory" | C | AC B b807.1, b814.1; Lloyd vol. 1. [S3][S4] |
| 25 | 895: AC B "Anaraut cum anglis uenit vastare ceredigeaun et stratewy"; AC 1860 "Strattui", MS C "Anaraud cum Saxonibus vastavit Keredigiaun", margin 894; Rolls Brut 893 without the English | C | All exact. [S3][S2][S1] |
| 26 | Lloyd dates it 895 and says Anarawd "had at any rate English troops at his command" against Cadell | C | Lloyd vol. 1: "in the following year" after the Danes' raid of early 894. [S4] |
| 27 | 983: Ælfhere with Hywel ab Ieuaf against Einon, "repelled with much slaughter"; Brut "Alvryd being their leader" | C | Lloyd vol. 1; Brut 982. [S4][S1] |
| 28 | 992: "Lloyd identifies Æthelsige" | P | Lloyd names him but says "it is not easy to say who the Æthelsige was of the expedition of 992". AC "duce Edelisi Anglico" and Brut quotation exact. [S4][S2][S1] |
| 29 | 1093: AC B "Circiter kalendas Iulii franci primitus demeciam et keredigean tenuerunt ..." | C | AC B b1115.2, exact. [S3] |
| 30 | Rhydygors "a ford on the Towy a mile south of the old Roman fort of Carmarthen" (William fitz Baldwin) | C | Lloyd vol. 2, exact. [S5] |
| 31 | 1094: castles demolished "except two, to wit, Pembroke and Rhyd y Gors"; Dyfed and Ceredigion left a desert | C | Brut (Rolls 1092); AC B b1116.1 "exceptis duobus ... in penbroc et aliud in ritos". [S1][S3] |
| 32 | 1095 (Rolls 1093): French devastate Gower, Cydweli and the Vale of Tywi; AC B "deserte manent"; Lloyd "attacks were directed upon Gower, Kidwelly and Ystrad Tywi" | C | All exact; Lloyd's context (Montgomery's capture) places it in 1095. [S1][S3][S5] |
| 33 | 1096: Rhyd y Gors abandoned on William fitz Baldwin's death, "the last except Pembroke" | C | Brut; Lloyd vol. 2, exact. [S1][S5] |
| 34 | 1102: Henry I gave the Vale of Tywi, Cydweli and Gower to Hywel ap Goronwy | P | The Rolls translation as printed reads "he granted to Howel and Goronwy"; the 1102-03 entries ("Howel, son of Goronwy ... to whom king Henry had deputed the conservancy of the Vale of Tywi and Rhyd y Gors") support the note's reading. [S1] |
| 35 | 1105-06: Richard fitz Baldwin stores Rhyd y Gors; Hywel driven out, then killed; Lloyd "disappear together in the year 1106"; Carmarthen the fortress by 1109 | C | Brut (Rolls 1102, 1103); Lloyd vol. 2, exact. [S1][S5] |
| 36 | Cantref Mawr "enjoyed ... a greater amount of freedom than any other portion of South Wales"; Rhydderch ap Tewdwr and Owain ap Caradog | C | Lloyd vol. 2, exact. [S5] |
| 37 | Pipe Roll 1130: "Homines de Cantre maur debent xl. s. ..." | P | Lloyd prints "Homines de Cat (for Cantre) maur": the Cantref Mawr reading is his emendation. He adds that the bishop of Salisbury was lord of Kidwelly, divided from Cantref Mawr by the Tywi at Abergwili. [S5] |
| 38 | No Norman castle inside the area is recorded 1093-1116 | C | Nothing in S1, S3 or S5 places one there; Llandovery is in Cantref Bychan. Absence of record only. |
| 39 | 1116: Narberth destroyed; Llandovery "only the outworks were taken, the keep remaining intact"; Swansea likewise; Carmarthen kept by chiefs a fortnight each; Owain ap Caradog fell; "the impenetrable woods of the Great Cantref" | C | Lloyd vol. 2, exact; Brut (Rolls 1113) "the outwork of the castle, however, he burned"; many "collected to him from every side" in the Vale of Tywi. [S5][S1] |
| 40 | Carmarthen: Welsh "y rac castell" (outer castle) vs Lloyd "the town" | C | Brut Welsh: "y rac castell eissoes a losges" is the Llandovery passage; Lloyd has "set fire to the town" at Carmarthen. Both readings present as stated. [S1][S5] |
| 41 | 1158-1163: Clifford's booty; five earls and Dinweiler; Llandovery 1162; Pencader 1163 | C | Brut, Lloyd vol. 2, exact ("parted company without having effected anything"; "crossing the defiles of the Gwili"). [S1][S5] |
| 42 | 1213: young Rhys raised "a vast army out of Brecheiniog" and camped at Trallwng Elgan on the Thursday after the octave of St Hilary | C | Brut, exact; by calculation 24 January 1213; Lloyd "Late in the January of 1213". [S1][S5] |
| 43 | 1213: "a royal-backed army under Fawkes, seneschal of Cardiff" (Summary) | P | Brut: young Rhys led; Owain and "Foulke, the seneschal of Cardiff" joined, Fawkes in the centre. Lloyd: Falkes of Bréauté from Glamorgan and Engelard of Cigogné from Hereford "sent ... to their assistance". [S1][S5] |
| 44 | Rhys Gryg "defeated in the field, not far from Llandeilo" | C | Lloyd vol. 2, exact. [S5] |
| 45 | **Trallwng Elgan "is not located in anything read"** (s.5; Open questions) | X | Lloyd vol. 2 note 147: "Trallwng Elgan is a township in the north of the parish of Talley; it belonged to the canons of that place". GENUKI (Lloyd, *History of Carmarthenshire*): "a holding of the canons of Talyllychau, which lay a little to the north of the abbey". Heneb HLCA 253: a Talley grange with a chapel, "precise location has yet to be firmly established", perhaps Edwinsford or Glanyrannell. [S5]; https://www.genuki.org.uk/big/wal/CMN/Talley/Lloyd ; https://heneb.org.uk/hcla/dolaucothi/area-253-dyffryn-cothi/ |
| 46 | "After burning Llandeilo, Rhys the Hoarse retired" | C | Brut, exact; Rhys Gryg had first strengthened Dinefwr. [S1] |
| 47 | Dinefwr attacked with "engines", "ladders", "archers, and crossbowmen, and miners, and horsemen", and "surrendered before the afternoon" | P | Words exact, but the garrison held out in one tower "with missiles and other engines"; before the afternoon they were compelled to agree terms, gave three hostages and were to give up the castle "unless they should receive support by the evening of next day". [S1] |
| 48 | 1257 AC B: night at Carmarthen on the Wednesday after Pentecost; next day "usque ad llanthelou uaur peruenerunt: ibique sine aliquo timore pernoctantes" | C | AC B b1278.7, exact (PDF p. 82). [S3] |
| 49 | Maredudd ap Rhys Gryg and Maredudd ab Owain in the woods "cum magnis clamoribus"; harassment "per totam diem veneris" | C | AC B, exact. [S3] |
| 50 | Saturday "iiii Nonas Iunii" (2 June); Rhys Fychan "ad castrum suum scilicet dinouour ... occulte fugit" | C | AC B, exact; 2 June 1257 was a Saturday (calculated). [S3] |
| 51 | "Versus kardigaun"; "a prima hora diei usque ad meridiem"; losses "apud coeth llatheu"; "ad kemereu" at midday; "plus quam tria milia saxonum"; "pauci uero aut nulli" knights escaped | C | AC B, exact. [S3] |
| 52 | Trinity Sunday at "goeriam": 194 men and six women killed | C | AC B b1278.8 "cc uiri ceciderunt sex viri minus et vi mulieres". "Gower" is the note's gloss. [S3] |
| 53 | **The camp at Llandeilo is "cross-checked across Annales Cambriae B and the Brut"** (Summary) | NS | Brut (Rolls 1256): Rhys Fychan "took his course to Dinevwr"; no camp at Llandeilo. The note's own s. "1257 in detail" says "AC B alone gives the camp at Llandeilo". [S1][S3] |
| 54 | Brut: "in Whitsun week"; "the garrison seized him"; "upwards of two thousand"; "mutual engagement" is Ab Ithel's misreading of Cymerau | C | Brut, exact; Lloyd note 23. [S1][S5] |
| 55 | Lloyd: set out 31 May (Thursday); hills round Dinefwr held; Rhys "suddenly changed sides"; Cymerau "probably" at the Tywi-Cothi confluence, "not now known by that name"; "No such disaster ..."; force "considerable", no number | C | Lloyd vol. 2 pp. 720-721 and note 23, exact. He also calls the Welsh "a still larger force", which the note omits. [S5] |
| 56 | **Bauzan's fate: "the sources actually read do not say what became of him"** (Open questions) | X | Lloyd: "the expedition, with its leader, was overwhelmed" [S5]. Matthew Paris, *Chron. Maj.* v. 646: "Ceciderunt autem in illo cruentissimo conflictu ... dominus Stephanus Baucan, regi carissimus, dominus Robertus Norensis". https://archive.org/details/matthiparisiensi05pari ; Wikipedia *Battle of Cadfan* and *Stephen Bauzan* agree (leads). |
| 57 | The dead were "Saxons"/English; card says "the chronicles say two or three thousand" | P | Numbers right, but Chapman (in S7): heavy losses "particularly among the predominantly Welsh infantry recruited from the Anglo-Norman lordships of the March"; Coflein 403587 and 404717: "an English-led force of knights and predominately Welsh infantry". https://coflein.gov.uk/en/site/403587/ |
| 58 | Chapman: casualty estimates "range between 1000 and 3000"; force size "unknown" | C | S7 p. 6, exact. https://coflein.gov.uk/media/225/516/664710.pdf |
| 59 | Lloyd discounted "versus Kardigaun" as a scribal slip (per Chapman) | C | S7, exact. |
| 60 | Matthew Paris and the Osney and Tewkesbury annals record the defeat (per S7) | C | S7; Matthew Paris read directly: the king's knights were caught "in arcto loco et palustri juxta quoddam castrum eorum, ad quod credebant certum habere refugium" (in a narrow, marshy place near a castle where they expected refuge), "as between two millstones", after a betrayal. New detail, not in the note. |
| 61 | Coed Llathen marked on the first edition OS map of **1888** at SN 579 229 | P | S7/Chapman say 1888; Coflein 403587 says "the 1st edition ordnance survey map of 1891", grid SN 57900 22900. Record both. |
| 62 | Area C SN 57863 23149; Coed Llathen 5.0 km west | C | S7 NGR; 5.0 km recomputed from SN 579 229. |
| 63 | Field names Cae Tranc, Cae Dial, Cae yr ochain; "a reasonable chance that these are the product of memory"; walkover found nothing; metal detecting refused | C | S7, exact. Coflein adds: "None of these names are attested prior to the early editions of the Ordnance Survey". |
| 64 | Lloyd's Cymerau at SN 501 201 "per Coflein", 13.0 km | P | That is S7's figure. Coflein 404717 now gives "SN 500 208 (Lloyd, 720)" in its text and SN 5000 2000 as the record point. All about 13 km away, inside. https://coflein.gov.uk/en/site/404717/ |
| 65 | Lloyd's site: name unknown there; Melville Richards; one confluence where "cymerau" is plural; floodplain | C | S7, exact. S7 also judges it probably wet and marshy then (the hamlet name Llandeilo-yr-ynys) and less likely, which the note omits. |
| 66 | Phillimore's site SN 645 305, 8.2 km north; at least five confluences in 2.2 km; S7 says both "south-east" and "south-west" of Talyllychau | C | S7, exact; 8.2 km recomputed. Coflein 404717 says "two miles south east of Talyllychau", which settles it. S7 also doubts this site because Talley Abbey, 2 km away, is not mentioned in any account (s. 6.3.6), which the note omits. |
| 67 | Conclusions: Coed Llathen around Cadfan "likely" but "still speculative"; Cymerau "remains uncertain" | C | S7 non-technical summary and 6.3.1, exact; Coflein 404717: "The location of Cymerau is unknown". |
| 68 | Gough-Cooper note 381: "recte llanarthneu (DPNW, s.n. Llanarthne)"; single-source; not in the battlefield report | P | Footnote confirmed from the PDF text (the OCR text drops the initial "ll"). Not in S7, but Coflein 403587 quotes Remfry's translation "at the wood of Llanarthne (Coed Llathen)", equating the two names. The note's inference that the fight would then be "about 6 miles west" (Llanarthne is about 9.7 km) is its own, not a source's. |

Not separately itemised and all confirmed: Civil War details from the DWB (Carbery's command of the
"Royalist Association of the three western counties", Tenby 30 August 1643, Pill 23 February 1644, Sir
Henry Vaughan "retired to Carmarthen" and was taken at Naseby, Jeremy Taylor "took refuge at Golden
Grove"); BCW's "Major-General Stradling surrendered Carmarthen to Laugharne on 12 October" 1645;
Fishguard 22-24 February 1797 and the Bank Restriction Act of 27 February; no Carmarthenshire unit at
Fishguard in the Jemima Fawr post; and the approximate distances (Llandovery about 11 miles, Pencader
about 14, Rhyd y Gors about 13-14, Abergwili about 12, Golden Grove about 2.5-2.7). Two of these
need wording changes, counted above under the Summary's point 8 and below:

- The Fishguard article does mention troops from outside Pembrokeshire: Cawdor brought "the
  Cardiganshire Militia" [S12]. The local verdict (not supportable) is unchanged.
- BCW says Gerard had "captured the whole of Carmarthenshire" by the end of June 1644 [S11]. The note's
  "no fighting inside the area is recorded" still holds (no place in the area is named), but the
  county was overrun that summer, which a card could say as news.

## Corrections needed

Changes that would alter app content if the note's card table were built as written:

1. **1213, the camp**: replace "Trallwng Elgan is not located" with "Trallwng Elgan, a grange of Talley's
   canons in the north of Talley parish (Lloyd), exact site not established (Heneb; perhaps Edwinsford
   or Glanyrannell)". Mark the 1213 camp **inside the area, approximate**, and drop it from the open
   questions. Date: Thursday 24 January 1213 by the Brut's reckoning; Lloyd's *History of
   Carmarthenshire* gives 25 January.
2. **1213, the army**: "a royal-backed army led by young Rhys (Rhys Ieuanc), with Fawkes of Bréauté,
   seneschal of Cardiff, and Owain ap Gruffudd; Lloyd adds Engelard of Cigogné".
3. **1213, Dinefwr**: "the garrison held out in one tower, and before the afternoon agreed to give the
   castle up, with three hostages, unless relieved by the next evening". Keep the ladders, engines,
   archers, crossbowmen, miners and horsemen.
4. **1257, Bauzan**: add "Stephen Bauzan, the royal commander, was killed (Lloyd; Matthew Paris)" and
   close the open question.
5. **1257, who died**: the card must say the chronicles report two or three thousand dead of an
   English-led army **largely made up of Welsh infantry from the Marcher lordships** (Chapman, Coflein),
   not three thousand English. "Saxons" is the annalist's word and should be shown as a quotation.
6. **1257, the camp at Llandeilo**: change "cross-checked across Annales Cambriae B and the Brut" to
   "documented in Annales Cambriae B alone (Lloyd follows it); the Brut has the army go to Dinefwr".
7. **1257, sites**: take grid references from Coflein (403587 Coed Llathen SN 5790 2290; 404717 Cymerau,
   Lloyd's confluence SN 500 208) per the standing rule; note the OS date as 1888 (Chapman) or 1891
   (Coflein); add that the field names are not attested before the OS; give Phillimore's site as south-
   east of Talley (Coflein); add the report's doubts on both Cymerau sites (marshy floodplain; no
   mention of nearby Talley Abbey).
8. **1257, Llanarthne reading**: say that Coflein, quoting Remfry, treats "the wood of Llanarthne" and
   Coed Llathen as the same name; the "6 miles west" alternative is the note's own inference and should
   be labelled so or dropped.
9. **Matthew Paris** is now read: add his "narrow, marshy place near a castle" and the betrayal, as an
   independent English account (it fits Dinefwr but does not name it).

Corrections to the note only:

10. Summary: cite [S4], not [S5], for "chiefly attracted by the plunder of the monasteries", and add
    Lloyd's coastal framing.
11. s.1: "far from the area" rather than "all west of Carmarthen" (Llangeler is north of it); add
    that the MacNeill attribution is contradicted within the Wikipedia article itself.
12. s.3: Lloyd names Æthelsige but says he cannot identify him.
13. s.4: the Pipe Roll's "Cantre maur" is Lloyd's emendation of "Cat maur"; the printed Rolls
    translation of the 1102 grant reads "Howel and Goronwy".
14. s.5: the Fishguard article names the Cardiganshire Militia; add BCW's June 1644 Royalist overrunning
    of Carmarthenshire.
15. Sources: S14 has now been opened (Wikipedia *Battle of Cadfan*): it says Bauzan was "Killed in
    action" and that the army was "made up mainly of soldiers from England" with "some Welsh soldiers",
    which conflicts with Chapman on the infantry; record the conflict and prefer Chapman and Coflein.

## For the owner's decision

- **New key dates.** With the corrections, 1213 (Llandeilo burned, Dinefwr taken, the camp near Talley)
  and 1257 (the camp at Llandeilo, the Welsh victory) are both documented inside the area. Whether
  either becomes a key date, and how much of the 1257 rout the app shows, is a content choice.
- **Cymerau markers.** Coflein records two candidate sites and the report rejects neither outright. Show
  both, neither, or a single "somewhere between Llandeilo and the sea, or north towards Talley" label.
- **Status.** With corrections 1-9 applied the note could move from `draft`; Jones's translations of
  the Peniarth 20 and Red Book Bruts and J. Beverley Smith's *Llywelyn ap Gruffudd* are still unread.

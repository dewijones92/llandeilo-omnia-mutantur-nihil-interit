---
title: Independent check of timeline-and-earliest-occupation.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: earliest occupation and key dates timeline

Reviewed note: [`../timeline-and-earliest-occupation.md`](../timeline-and-earliest-occupation.md) (status: draft,
updated 2026-09-26). Repo state: `main` at `97cfad9`, level with `origin/main`. Line numbers in `src/content/`
refer to the **working tree on 2026-10-02**, which had uncommitted edits by another session, so each correction
also quotes the text it targets.

## Method

- Every cited URL that resolves was downloaded and read as raw text (curl, Wikipedia's plain-text API, then a
  keyword search of the text), so wording could be checked exactly. Sources without a URL were located where
  possible: DWB articles via Wikipedia's external links (S28 is at `biography.wales/article/arc_s-RHYS-APT-1093`,
  S33 at `s-GRUF-APR-1090`, S44 at `s-RHYS-APT-1449`, S49 at `s-VAUG-GEL-1500`), S10 at
  `https://ancientmonuments.uk/129708-garn-goch-camps-llangadog`, S20 at
  `https://www.llandeilo.org/concise_history.html`, S23 at `https://www.llandeilofawr.org.uk/gospels.htm`, S36 at
  `https://cadw.gov.wales/more-about-carreg-cennen`, S7 by its renamed title (*List of prehistoric scheduled
  monuments in Carmarthenshire*, wikitext read so the table rows were visible).
- Nine timeline sources are the same pages as medieval sources already checked today in
  [`era-medieval-to-1282-check-2026-10-02.md`](era-medieval-to-1282-check-2026-10-02.md): timeline S13 = medieval
  S22, S30 = S27, S31 = S28, S32 = S29, S35 = S23, S37 = S25, S38 = S18, S39 = S17, S45 = S13. Their verdicts
  are reused, not repeated, except where this note claims something different.
- Independent sources read: Coflein NPRN 103970 (Carreg Cennen), 92750 (Talley), 100682 (Dryslwyn), 17603
  (Newton House); Wikipedia *Bølling–Allerød Interstadial*, *Older Dryas*, *Red Lady of Paviland*; and, for the
  Late Glacial question, **Walker, Coope, Sheldrick, Turney, Lowe, Blockley and Harkness (2003), "Devensian
  Lateglacial environmental changes in Britain: a multi-proxy environmental record from Llanilid, South Wales,
  UK", *Quaternary Science Reviews* 22, 475-520**, abstract read at `https://eprints.gla.ac.uk/746/`.
- **Not read:** S24 (the UNC course site now redirects to the UNC web host's home page; WebFetch and curl both
  failed). S11, S21, S43, S48, S50, S56, S57 and S58 give no URL and are not used by the app; they were not
  pursued. Three WebSearch calls were used.

## Summary

109 claims checked: **63 confirmed, 28 partly, 7 not supported by the cited source, 10 contradicted**, and
1 that could not be read (S24). The note is reliable on the castles, houses and modern dates, but its deep-time
section and several of its source summaries are wrong, and some errors have reached the app:

1. **The early environment keyframes are a leftover of uncalibrated dates.** Before commit `60951a3`
   (2026-09-26) the keyframes sat on the deep-time note's Godwin pollen zones: 12,500 BC (zone Ia, Oldest Dryas,
   "c.13,000-10,500 BC"), 10,300 BC (Bølling), 8,800 BC and 8,300 BC (Younger Dryas). That commit moved the last
   three onto calendar years (11,500, 10,900, 9,700 BC) but left the 12,500 BC frame as "barest, coldest tundra".
   The deep-time note's own source for the zones (Wikipedia *Pollen zone*, deeptime:S10) says the table's dates
   "are best viewed as being based on uncalibrated C-14 dates", giving the example of an Older Dryas start of
   10,000 BC that calibrates to about 12,000 BC. In calendar years 12,500 BC (about 14,450 cal BP) falls in the
   early Late Glacial Interstadial (Bølling-Allerød, 14,690 to c. 12,890 BP). At Llanilid in South Wales that is
   the **warmest** part of the interstadial, with mean July temperatures "around 20°C" and juniper scrub, before
   two cooling steps (the second around 13,100 cal BP, about 11,150 BC) cut back juniper and then birch woodland.
   **Verdict: the 12,500 BC keyframe is contradicted; the 11,500 BC keyframe (birch, milder) is consistent; the
   10,900 BC keyframe is broadly right but early for Wales**, where Llanilid dates the Younger Dryas to c.
   12,600-11,400 cal BP (about 10,650-9,450 BC), with "scrub tundra with Betula, Salix" rather than bare ground.
2. **"Wales was free of ice by about 18,000 years ago"** (app, `events.ts:27`) is contradicted by S1, which says
   that around 18,000 years ago "the ice sheets began a slow retreat". S1 says only that "we believe" people had
   returned by about 14,500 years ago.
3. **S1's dates are not reliably calendar years.** S1 (2007) gives the Paviland burial as "around 26,000 years
   ago", which is the 1989/1995 radiocarbon age (26,350 ± 550 BP); it was recalibrated to about 33,000 years in
   2009 and about 34,000 in 2010 (Wikipedia *Red Lady of Paviland*). So S1's 14,500 and 12,500 figures may also be
   radiocarbon ages. The app's 12,500 BC "people return" date assumes they are calendar years.
4. **The key-dates row "c. 14,500-12,500 BP: recolonisation by Mesolithic hunter-gatherers" is wrong**: by S1
   that span is the Late Upper Palaeolithic (the Mesolithic starts c. 11,500 years ago).
5. **The 1531 execution is not apocryphal.** The note calls it "likely apocryphal", but S44 (DWB, already cited
   by the note) says Sir Rhys ap Gruffydd "in 1531, forfeited them and his life for alleged conspiracy", and S26
   and S46 agree. Only the claim that the lands then passed to the Vaughans of Golden Grove is unsupported.
6. **Several source summaries are wrong.** S30 (Wikipedia, battle) names Rhys ap Maredudd as the Welsh leader
   and gives no 6 July date, while the note says it "states the Welsh commander is unnamed". S36 (Cadw) does not
   mention 1403. S26 and S27 say nothing about 1287 or "for centuries". The 1287-1321 masonry dates are Coflein
   103970's, not S36's or S37's. "Bishop-Abbot" is in S9 (Wikipedia *Llandeilo*), not S23. S3 says nothing
   about the Mesolithic.
7. **Two "negative findings" are contradicted.** Coflein 103970 says "In 1403 Carreg Cennen was taken by Owain
   Glyndwr", against S37's "failed to take the castle" (the app already shows this split). S9 reports "a royalist
   skirmish ... in the town in April 1648", against the note's "no direct fighting is documented ... at
   Llandeilo itself".
8. **Three open questions can be closed or narrowed.** Talley entered state care in 1933 (Coflein 92750). Newton
   House's turrets and R. K. Penson's 1856-57 recasing are both corroborated by Coflein 17603. The S14 "aggregator"
   claim about the Carreg Cennen cave is in S37 and Coflein 103970.
9. **Golden Grove's earlier mansions are drawn on the wrong spot**: S53 says the present house was built
   "700 yards (640 m) to the south-west above the original", but `features.ts:568` places them at the present
   house.
10. **Grid references:** Garn Goch, the Roman forts and St Teilo's match Coflein exactly; Dinefwr (5m), Dryslwyn
    (7m), Newton House (3m), Carreg Cennen (14m) and the bridge (12m, Cadw listing 20900) are within 15m. Talley
    is about 87m from Coflein's point (already open from the medieval review). The note's own "derived"
    lat/lon values for the S7 monuments are 0.5-1.4km out from S7's own coordinates and should not be used.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted, **U** could
not be read.

| # | Claim | Where in note | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | Oldest human evidence in Wales: Pontnewydd, c. 230,000 years | Earliest occupation; Key dates | none | C | S1: "an early form of Neanderthal, that lived around 230,000 years ago" |
| 2 | Wales ice-free by c. 18,000 BP | Earliest occupation | events.ts:27-28 `people-return` | X | S1: "Around 18,000 years ago the ice sheets began a slow retreat" |
| 3 | People returned by c. 14,500 BP | Earliest occupation; Conclusion | events.ts:20, 27-28 | P | S1: "We believe they had returned by around 14,500 years ago" (a belief, not a dated find) |
| 4 | Earliest firmly dated evidence c. 12,500 BP at Paviland and Hoyle's Mouth | Earliest occupation | none | C | S1: "the earliest evidence from Wales dates to around 12,500 years ago at caves such as Paviland and Hoyles Mouth" |
| 5 | Palaeolithic ends c. 11,500 BP | Earliest occupation | timeline.ts ERAS (late-ice-age to 9501 BC) | C | S1: "about 11,500 years ago ... the end of the Early Stone Age" |
| 6 | S1's BP figures are calendar years (implicit throughout) | Earliest occupation; Key dates | events.ts:20 (bc 12500) | P | S1 states no basis. Its Paviland "around 26,000 years ago" is the radiocarbon age 26,350 ± 550 BP, recalibrated to c. 33,000-34,000 (Wikipedia *Red Lady of Paviland*) |
| 7 | c. 14,500-12,500 BP: recolonisation by Mesolithic hunter-gatherers | Key dates row 3 | none | X | S1: the Mesolithic starts c. 11,500 years ago, so this span is Late Upper Palaeolithic |
| 8 | Only five Palaeolithic sites are known in Wales, all on Carboniferous limestone | Earliest occupation | none | X | S3 is a map of five sites (Cefn, Coygan, Kendrick's, Paviland, Pontnewydd). S1 names Cae Gwyn, Ffynnon Beuno and Hoyle's Mouth as well |
| 9 | None of those sites is within 10 miles of Llandeilo | Earliest occupation | events.ts:27 | C | S3 map list; S1 |
| 10 | No dated Mesolithic site in the radius (cited to S3) | Earliest occupation; Key dates | events.ts:32 cites S3 | NS | S3 covers the Palaeolithic only. The app sentence ("No dated site ... yet shows exactly when they first reached") is fine for the Palaeolithic |
| 11 | Coygan handaxes 64,000-38,000 BCE | Earliest occupation; Key dates; S2 | none | P | S2: "between 64,000 and 38,000 years BCE". S1: "between 60,000 and 40,000 years ago". Years ago and BCE differ by c. 2,000 years; S1 is the better source |
| 12 | Garn Goch long cairn, 55m, "its appearance suggests a Neolithic date", undated | Earliest occupation; Key dates | events.ts:62-77 `garn-goch-cairn` | C | S5 (Coflein 100866) verbatim; NPRN 409533 |
| 13 | No excavation, radiocarbon date or artefact assemblage for the cairn | Earliest occupation | events.ts:72 | C | S5. The only artefact is a possibly wheel-turned sherd from the saddle west of the fort |
| 14 | S4 describes a Neolithic long cairn, possible burnt mound and Bronze Age barrow | S4 entry | events.ts:75 cites S4 | P | S4: "a possible Neolithic site", "a round barrow and a possible burnt mound", "Bronze Age finds". It does not say long cairn |
| 15 | Garn Goch is c. 4.3 miles from Llandeilo | Earliest occupation | none | P | 6.53km (4.06 miles) from St Teilo's, computed from Coflein grid references SN6912024320 and SN6293022236 |
| 16 | Waun Pwtlyn: once a long barrow or chambered tomb, now a natural feature aligned with the Tywi glacier, still scheduled | Earliest occupation; Open Q3 | none | C | S6 (Coflein 304635) verbatim |
| 17 | Waun Pwtlyn reclassified as an esker | Earliest occupation | none | NS | S6: "a natural feature, with bedrock visible on its summit". No landform type is named |
| 18 | Waun Pwtlyn c. 5.6 miles away | Earliest occupation | none | C | 8.8km (5.5 miles), from S6's SN7088026000 |
| 19 | Ffairfach and Bryngwyn stones, burnt mounds and round cairns are scheduled and dated only "Prehistoric" | Earliest occupation; Key dates | events.ts:81-91 `bronze-cairns` | C | S7 table: each row's period is "Prehistoric" |
| 20 | The round cairns are Bronze Age by typology | Key dates | events.ts:85 ("Bronze Age in type") | P | S7's rows say only "Prehistoric"; its introduction says the county's burial cairns are "mainly from the Bronze Age". Enough for the app's "in type" |
| 21 | Tair Carn Isaf is in Llangadog; Trichrug in Dyffryn Cennen | Key dates | none | X | S7: Tair Carn Isaf, Dyffryn Cennen; Trichrug round cairns, Llangadog |
| 22 | Tair Carn Uchaf and Isaf lie south-east of Llandeilo | (S7) | events.ts:85 | C | S7 SN693173 and SN683167, both south-east of SN629222 |
| 23 | Derived lat/lon for the S7 monuments | Key dates | none | X | S7 gives its own: Ffairfach 51.876, -3.997 (note 51.875, -3.985); Bryngwyn 51.8847, -3.9329 (note 51.882, -3.921); Waun Pwtlyn 51.9177, -3.8788 (note 51.915, -3.865) |
| 24 | Cave beneath Carreg Cennen with prehistoric human remains; possibly an Iron Age hillfort (S14, unidentified) | Earliest occupation; Open Q23 | none | C | In S37 ("Human remains found in a cave ... The site may have also been an Iron Age hillfort"); Coflein 103970 ("Ancient human remains have been found in the stalagmite accretions"); S36 ("might well have been an Iron Age hillfort") |
| 25 | Garn Goch hillfort c. 800 BC - AD 74 | Key dates; Slider 1 | events.ts:94-105; features.ts Garn Goch from bc(800) | P | S10: "probably dating to the Iron Age period (c. 800 BC - AD 74, the Roman conquest of Wales)". The span is the conventional period, not a date for the fort. S5: "a Late Bronze Age or Iron Age date is most likely" |
| 26 | One of the largest hillforts in Wales | Key dates | events.ts:100; places.ts garn-goch | C | S5: 16.6ha with annexe, among the largest in Wales. Sizes differ: S10 "about 11ha", S4 "15 ha" |
| 27 | Grongar Hill: name from an Iron Age hillfort, "gron gaer"; SN573215; no excavation found | Key dates; S12 | features.ts:176-184 `grongar` | C | S12 verbatim. App at (257300, 221500) is SN573215 exactly |
| 28 | No evidence for a prehistoric fort at Dryslwyn | Key dates | none | C | S13: "no evidence has been found to support this theory" |
| 29 | Two superimposed forts: earlier 3.7ha, garrison over 1,000, AD 70s; later 1.5ha, multivallate | Key dates; S15 | events.ts:107-119; features.ts:206-232 | C | S15 (Coflein 402271) verbatim, including "an earlier date cannot be ruled out" |
| 30 | The later fort was in use into the early 2nd century | Key dates | features.ts:224 (to ad 125) | C | S15 |
| 31 | Both forts were abandoned in the early 2nd century | (app only) | events.ts:112-113; features.ts:210 (fort A to ad 95) | P | S8: the forts "were abandoned early in the 2nd Century AD". S15: "the military context ... may suggest a date of between 78 and 83 for the abandonment of the early site" |
| 32 | Forts discovered March 2003 by fieldwalking and metal-detecting | Key dates; S15 | places.ts:42-50; events.ts:448-458 | P | S15: "identified during March 2003 in an area that had previously surrended Roman material during fieldwalking and metal detecting". S8: "discovered during a ground radar survey". Already in open-questions |
| 33 | Forts excavated 2003/2006 | Key dates | events.ts:451 ("excavated in 2005") | P | S8: "Further investigation in 2005". 2006 is the date of Pannett's evaluation report (S15) |
| 34 | Roman coin hoard found c. 1800 near the fort | Key dates; S16 | none | C | S16 (Coflein 419158): Fenton, "writing in ca 1800", "coins lately found", "some of Domitian"; c. 150m south-west of the forts |
| 35 | Probable Roman temple: foundations c. 1770 in Llandyfeisant churchyard; lost altar | Key dates; S17 | none | C | S17 (Coflein 114230) verbatim |
| 36 | Possible Roman fort near Rhosmaen (James 1992; Sambrook and Page 1995) | Key dates; S18 | none | C | S18 verbatim ("is to be expected ... a possible site in the vicinity of Rhosmaen has been proposed") |
| 37 | St Teilo traditionally founded a monastery "almost certainly" Llandeilo Fawr; the long life is a 12th-century Llandaff text | Key dates; S19 | events.ts:121-138 `st-teilo` | C | S19 (DWB): 9th-century marginalia show him "venerated ... as the founder of a monastery which was almost certainly Llan-deilo-fawr"; Liber Landavensis "about three hundred years later". S18: "supposed to have been established in the 6th century" |
| 38 | The Gospels date to the 8th century; Peter Lord's c. 730 | Key dates; S22, S23 | events.ts:140-152 `surexit` | C | S22: "an 8th-century Insular Gospel Book", style range 698-800. S23 gospels.htm: "Peter Lord dates the book at 730" |
| 39 | Llandeilo the seat of a "Bishop-Abbot" by the early 9th century (S23) | Key dates; S23 | none | NS | Not on S23's gospels or history pages. The phrase is in S9 (Wikipedia *Llandeilo*). See also the medieval review, claim 2 |
| 40 | Gelli bought the book "for the price of a good horse"; Tutfwlch's dispute over Tir Telych; mid-9th century | Key dates; S23 | events.ts:144 | C | S23 gospels.htm verbatim ("Tyr Telych"; "in the mid 9th century") |
| 41 | How the book left Llandeilo is unknown; at Lichfield since the late 10th century | Key dates; S23 | events.ts:144 | C | S23: "Exactly how it came to leave Llandeilo Fawr is not known"; S22 |
| 42 | The Surexit is the earliest surviving Welsh-language document (S24) | Key dates; S24 | events.ts:151 cites S24 | U | S24's site redirects to the UNC web host. Confirmed independently by S23 ("the earliest surviving document in the Welsh language") |
| 43 | Two 10th-11th-century knotwork cross-heads (one found under the chancel in the 1850s, one by 1893); a Latin stone of 1697 lost by 1893 | Key dates; S25 | events.ts:388-399 `church-rebuilt` | C | S25 (Coflein 100867) verbatim |
| 44 | St Teilo's west tower kept in the 1848-51 rebuild | (S25) | events.ts:392 | C | S25: rebuilt 1848-51 by G. G. Scott; "The tower is thought to date to around 1600" |
| 45 | Dinefwr: Rhodri Mawr and Hywel Dda tradition, "no archaeological remains have been dated from this period" | Summary; Key dates; Open Q4 | none | C | S26 verbatim |
| 46 | Cadell ap Rhodri c. 900 founded the House of Dinefwr association (S26) | Key dates | none | NS | S26 does not mention Cadell |
| 47 | Hywel Dda's base traditionally at Dinefwr | Key dates | places.ts:33 ("seat of the princes of Deheubarth") | C | S26: "the chief seat of Rhodri's grandson Hywel Dda"; "the chief seat of the Dinefwr dynasty" |
| 48 | Rhys ap Tewdwr king of Deheubarth 1078-1093 (S28) | Key dates; S28 | none | P | S28 (DWB): "In 1075 he took possession of Deheubarth". S29: c. 1040-1093 |
| 49 | Killed near Brecon in 1093 resisting the Normans | Key dates | events.ts:154-165 `rhys-ap-tewdwr` | C | S28: "killed in uncertain circumstances near Aberhonddu (Brecon)"; S29 |
| 50 | Brut y Tywysogion: "with him fell the kingdom of the Britons" (S28) | Key dates; S28 | events.ts:158 | P | In S29 ("The Brut y Tywysogion adds 'and with him fell the kingdom of the Britons'"), not in S28 |
| 51 | 1116: Gruffudd ap Rhys's rising ravaged south-west Wales, failed to take the new castles, ended in accommodation; no Llandeilo battle | Key dates; Open Q2 | none | P | S33 (DWB): "the open rebellion of 1116", then "an accommodation with Henry and was given land in the commote of Caeo"; no battle named. Ravaging and the castles are not in S33 |
| 52 | Lord Rhys sole ruler of Deheubarth from 1155 | Key dates | none | C | S34 |
| 53 | After 1163 the Lord Rhys founds the first archaeologically evidenced castle at Dinefwr | Summary; Key dates; Slider 6; Open Q4 | events.ts:167-178 (`ad(1163)`, "After regaining Cantref Mawr"); features.ts:296-308 `dinefwr-rhys` | X | S27: "thought to have been founded in the later twelfth century". S34 places "a castle in the new style was begun" after Rhys "co-operated loyally with Henry" (after 1171-72 per the medieval review). medieval:S12 records a castle at Dinefwr in 1151, built by Maredudd and Rhys. No source gives 1163 |
| 54 | The 1176 Cardigan eisteddfod was held under his patronage | Key dates | none | C | S34: "the renowned 'eisteddfod' of 1176 was held under his auspices" |
| 55 | Talley founded c. 1185-89 for Premonstratensian canons, the only such house in Wales, "his special and unique foundation" | Key dates; Open Q8 | events.ts:180-192; places.ts:78-88 | C | S34 verbatim; S38 "in or about 1185"; S39 "1180s ... the first and only abbey in Wales for the Premonstratensians"; Coflein 92750 "1184-9" |
| 56 | Talley's church was never finished (app: only the east end) | (S39) | events.ts:186-187 | P | S39: "never fully completed". Coflein 92750: completed in a reduced form "probably in the earlier thirteenth century". See medieval review claim 74 |
| 57 | Early 13th century: round tower and walls at Dinefwr under Rhys Gryg | Key dates | none | P | S26: "the earliest parts of the present castle are thought to derive from this period"; no tower named. S27: remains of the "thirteenth and earlier fourteenth century" |
| 58 | Dryslwyn founded in the 1220s by a Welsh prince | Key dates; Slider 9 | events.ts:194-207; places.ts:66-75 | C | S13: "built in about the 1220s by one of the princes of ... Deheubarth". Coflein 100682: "founded by a local Welsh prince in the second quarter of the thirteenth century" |
| 59 | Coflein leaves Dryslwyn's founder unnamed; only tourism sources say Rhys Gryg | Key dates; Open Q6 | events.ts:200 | P | Coflein 100682 confirms "a local Welsh prince". S13 (Wikipedia) also says "perhaps Rhys Gryg", so the attribution is not only from tourism sources |
| 60 | Llywelyn the Great held Dinefwr until his death in 1240 | Key dates | none | C | S26 (uncited in Wikipedia, as the note says) |
| 61 | 1248: first documented mention of Carreg Cennen; Matilda de Braose; her son took it before handover | Key dates | places.ts:56 (namedFrom 1248) | C | S37 verbatim |
| 62 | 1277: local Welsh lords sided with Edward; Dinefwr and Carreg Cennen passed to the English | Key dates | events.ts:209-223 `english-1277` | C | S37 ("the castle was handed over to the English"); S26 ("helped Edward capture Dinefwr in 1277") |
| 63 | Battle of Llandeilo Fawr, 16 or 17 June 1282 | Summary; Key dates; Open Q1 | events.ts:225-245 | C | S30 "17th of June"; S31 and S32 16 June (medieval review claim 111) |
| 64 | S30 "states the Welsh commander is unnamed in the sources" and gives de Clare's removal as 6 July | S30 entry; Key dates | events.ts:237 cites S30 | X | S30: "a South Welsh army led by Rhys ap Maredudd"; it gives no date for Clare's removal. 6 July is in S31 (medieval review claim 117). S30 also says Clare "captured" and "sacked" Carreg Cennen, which the app rightly no longer says |
| 65 | 1283: Carreg Cennen granted to John Giffard, a commander at Cilmeri | Key dates | features.ts:375-389 | C | S37 verbatim |
| 66 | Carreg Cennen's standing masonry 1287-1321, "Coflein dating" (cited to S36, S37) | Summary; Key dates; Open Q5 | events.ts:262-276 `carreg-cennen-giffard` | P | The dates are Coflein 103970's ("probable that construction of the castle took place between 1287 and 1321"). S37 says only that Giffard "was probably responsible"; S36 says "most likely John Giffard" |
| 67 | Popular "Lord Rhys built it" vs English masonry | Summary; Open Q5 | events.ts:271 | C | S36: "The earliest castle was probably the work of ... the Lord Rhys. But the imposing ruins we see today bear all the hallmarks of a later Marcher Lord" |
| 68 | Dryslwyn siege 1287: 11,000+ men, trebuchet, mine collapse, fell by 5 September | Key dates; Slider 11 | events.ts:247-259 | C | S13 ("three-week siege", 11,000, trebuchet, mine collapse); S35 (medieval review claims 50-54) |
| 69 | 1287: Dinefwr falls to English control, "for centuries" (S26, S27) | Key dates | events.ts:217 (Cadw 1287) | NS | Neither S26 nor S27 gives 1287 or "for centuries". The 1287 date is Cadw's (medieval:S9), which the app quotes without citing |
| 70 | Statute of Rhuddlan: S40 says it created Carmarthenshire, S41 that it covered only the north | Key dates; Open Q10 | none | C | S40: "reorganized by the Statute of Rhuddlan in 1284 into Carmarthenshire". S41: South Wales governed via the honours of Carmarthen and Cardigan from 1240, which "became counties" |
| 71 | Dinefwr burnt 1316 (Llywelyn Bren) | Key dates | none | C | S26 |
| 72 | July 1403: Glyndŵr with 800 men failed to take Carreg Cennen after a months-long siege; Scudamore held it (S36, S37; "cross-checked") | Key dates; Slider 13 | events.ts:278-290 `glyndwr` | P | S37 confirms. S36 does not mention 1403. Coflein 103970 contradicts: "In 1403 Carreg Cennen was taken by Owain Glyndwr". Not cross-checked |
| 73 | 1403: Dinefwr besieged unsuccessfully | Key dates | events.ts:282 | C | S26 |
| 74 | Summer 1403: Dryslwyn seized by Glyndŵr | Key dates; Open Q7 | none | C | S13 |
| 75 | 1440: Gruffudd ap Nicolas leased the Dinefwr lordship for 60 years | Key dates | none | C | S44 verbatim |
| 76 | Rhys ap Thomas knighted at Bosworth, 22 August 1485; chief Crown officer in south Wales; seat at Carew | Key dates; Slider 15 | events.ts:306-318 `bosworth` | C | S44 verbatim |
| 77 | 1461-62: captured by Sir Roger Vaughan after Mortimer's Cross; slighted by c. 500 men over four months with picks and crowbars | Key dates; Slider 14 | events.ts:292-304; features.ts:405-413 | P | S36: "After its capture by Sir Roger Vaughan in 1462 a force of 500 men took four laborious months to dismantle the castle with picks and crowbars". S37: Mortimer's Cross (1461) forced the surrender; Vaughan is not in S37 |
| 78 | Carreg Cennen had no Civil War role (S51) | Summary; Open Q12 | features.ts:413 cites S51 | C | Neither S36 nor S37 records any Civil War action |
| 79 | 1531 execution of Rhys ap Gruffydd of Dinefwr is "likely apocryphal" | Summary; Key dates; Open Q11 | none | X | S44 (DWB): "Sir Rhys ap Gruffydd, who, in 1531, forfeited them and his life for alleged conspiracy". S26: "executed for treason and the castle was confiscated by the crown". S46: "seized by Henry VIII in 1531" |
| 80 | The lands then passed to the Vaughans of Golden Grove (S50) | Key dates; Open Q11 | none | NS | S49 (DWB Vaughan family) does not say so; it records Walter Vaughan's marriage to Katherine, daughter of Gruffydd ap Rhys of Dinefwr. S46 says the family "had to buy back their property from the Crown" |
| 81 | Acts of Union applied English law and administration to Wales | Key dates; Slider 16 | events.ts:320-331 `acts-of-union` | C | S42. The office-holding clause the app adds is in language:S16, also cited |
| 82 | 1541: William ap Thomas first High Sheriff; Aberglasney chapel at Llangathen | Key dates | none | C | S47: "High Sheriff of Carmarthenshire in 1541-2 and added the Aberglasney chapel to Llangathen Church" |
| 83 | c. 1560: first Golden Grove mansion, later burnt | Key dates | features.ts:567-578 | C | S53 |
| 84 | A 15th-century poem describes "nine green gardens" | S47 entry | none | P | S47: "a poem dating from medieval times" |
| 85 | c. 1600: Bishop Rudd rebuilds Aberglasney and, with Sir Rice Rudd, makes the Cloister Garden | Key dates | features.ts:540-549 (from ad 1600) | C | S47 (Rudd consecrated bishop 1594, bought the estate in Elizabeth I's reign). Demolition of an older house is not on the page |
| 86 | 6 May 1634: John Vaughan, 1st Earl of Carbery, died, buried at Llandeilo Fawr | Key dates | none | C | S49: "He died 6 May 1634, and was buried at Llandeilo-fawr" |
| 87 | Civil War: Richard Vaughan led the Royalist Association; Sir Henry Vaughan of Derwydd raised a Royalist regiment locally | Key dates | none | P | S49 confirms the Royalist Association. It says Carbery "appointed his uncle, Sir Henry Vaughan of Derwydd ... commander of the Royalist forces in Pembrokeshire", not that he raised a local regiment |
| 88 | No direct Civil War fighting documented at Llandeilo itself | Key dates | none | X | S9: "A royalist skirmish took place in the town in April 1648, defeating elements of the New Model Army" (Wikipedia, single source) |
| 89 | Newton House ordered 1659, built 1660 by Edward Rice | Key dates; Slider 17 | events.ts:333-345; features.ts:499-511 | C | S45 "built in 1660 by Edward Rice"; S46 ordered 1659, completed 1660. Coflein 17603: "built between 1660 and 1670" |
| 90 | 1710: Aberglasney sold to Robert Dyer | Key dates | none | C | S47 (Wentworth as seller not seen on the page) |
| 91 | 1754: second Golden Grove mansion, Doric portico | Key dates | features.ts:574 | C | S53 |
| 92 | Newton House turrets and battlements 1760s-80s, single-sourced to Wikipedia | Key dates; Open Q13 | features.ts:513-525 ("a single source") | P | S46: "added between 1760 and 1780". Now corroborated: Coflein 17603, "an engraving of 1773 shows small corner turrets and battlements" |
| 93 | Capability Brown visited and advised, 1775 | Key dates | none | C | S45 verbatim; S46 |
| 94 | 1804: Golden Grove bequeathed to John Frederick Campbell | Key dates | none | C | S53 |
| 95 | Paxton's Tower c. 1806-09; Nelson motive "hedged by the source itself"; 36ft, triangular, hexagonal prospect room | Key dates; S52 | events.ts:347-358; features.ts:580-590 | P | Dates and form confirmed. S52 opens "a Neo-Gothic folly erected in honour of Lord Nelson" and records marble tablets dedicating it to Nelson; only the trigger ("may have been inspired ... by Nelson's death") is hedged. The app's "reputedly" is cautious but fine |
| 96 | Chapels: Soar Baptist 1808, Wesleyan 1809/1849, Calvinistic Methodist 1779/1851 | Key dates; S20 | almanac.ts:270-276 cites S20 | P | S20 (concise_history.html): Calvinistic Methodist 1779, rebuilt 1851; Wesleyan 1809, rebuilt 1849; "A Baptist chapel ... in 1829". Soar 1808 and Old Bethel 1727/1773 were not found |
| 97 | 1827-34: present Golden Grove by Sir Jeffry Wyatville | Key dates | features.ts:553-564 | C | S53 |
| 98 | The earlier Golden Grove mansions stood where the present house is | (app only) | features.ts:568 | X | S53: Cawdor "demolished the existing building and built the current house ... 700 yards (640 m) to the south-west above the original" |
| 99 | Llandeilo Bridge: designed 1843 by William Williams, begun 1844, finished 1848 by Edward Haycock; replaced a seven-arch bridge; largest single arch in Wales | Key dates; Slider 20 | events.ts:374-386; features.ts:592-632; places.ts:106-116 | C | S54 verbatim, with span 44.2m, rise 12.65m, height 14.3m, length 110.64m, listed 14/03/1966 |
| 100 | Newton House Gothic recasing c. 1856 by R. K. Penson, single-sourced | Key dates; Open Q13 | features.ts:527-538 | P | S45 "in the 1850s"; S46 "around 1856 ... R. K. Penson". Now corroborated: Coflein 17603, "between 1856 and 1857 ... designed by RK Penson of Oswestry" |
| 101 | Railway: Llanelly Railway to Llandeilo January 1857; Vale of Towy to Llandovery 1 April 1858; Carmarthen branch 1864-65 | Key dates; S55 | events.ts:401-414; almanac.ts:262-268 | P | S55: January 1857, "opening in 1858", 1864-65. "1 April" is not in S55 (victorian sources are also cited for it) |
| 102 | 1858: "a church, four chapels, 11 streets, 73 shops, 23 public houses and 290 houses" | Key dates | events.ts:405; features.ts:650-663 | C | S20 concise_history.html verbatim |
| 103 | 1932: Carreg Cennen into Office of Works guardianship | Key dates | events.ts:416-428 | C | S37 |
| 104 | 1935, WWII, 2003, 2011, 2015 at Golden Grove; Aberglasney requisitioned 1939-45 | Key dates | none | C | S53 ("almost £1 million"); S47 |
| 105 | Coleg Sir Gâr at Golden Grove from 1952; Golden Grove listed 8 July 1966 | Key dates; Open Q14 | none | NS | S53 gives neither date (only "Grade II*" and "until 2003") |
| 106 | 1960s Cleo Laine at Newton House; Morris family acquire Carreg Cennen through a deeds error | Key dates | none | C | S45; S37 |
| 107 | 1974: Newton House sold and fell into disrepair | Key dates | none | P | S46 "In 1974"; S45 "by the mid-1970s" |
| 108 | 1987 park, 1990 Newton House to the National Trust | Key dates; Slider 24 | events.ts:430-445 | C | S45 verbatim |
| 109 | 1994 Aberglasney Restoration Trust formed; 1995 purchase with Frank Cabot's money; opened 4 July 1999; 2013; 2016 | Key dates; Slider 25 | none | P | S47 confirms 1995, Cabot, 4 July 1999, 2013 and 2016. A 1994 formation date is not on the page |

Count: C 63, P 28, NS 7, X 10, U 1 (109 rows).

### Grid references in the app

| Site | App (E, N) | Authority | Offset |
|---|---|---|---|
| Garn Goch | 269120, 224320 | Coflein 100866 SN6912024320 | 0m |
| Roman fort A | 262187, 222534 | Coflein 402271 SN6218722534 | 0m |
| St Teilo's | 262930, 222236 | Coflein 100867 SN6293022236 | 0m |
| Newton House | 261432, 222534 | Coflein 17603 SN6143222531 | 3m |
| Dinefwr Castle | 261155, 221729 | Coflein 425 SN6115021731 | 5m |
| Dryslwyn | 255390, 220294 | Coflein 100682 SN5538720288 | 7m |
| Llandeilo Bridge | 262757, 222001 | Cadw listing 20900, E 262754 N 221989 | 12m |
| Carreg Cennen | 266801, 219083 | Coflein 103970 SN6678919075 | 14m |
| Talley Abbey | 263199, 232800 | Coflein 92750 SN6328132772 (the tower) | 87m |
| Grongar Hill | 257300, 221500 | S12 (Wikipedia) SN573215; no Coflein record read | 0m from S12 |

### The early environment keyframes (`src/content/timeline.ts`)

| Keyframe | Drawn as | Calendar position | Evidence | Verdict |
|---|---|---|---|---|
| 12,500 BC | Barest, coldest: forest 0.02, moor 0.95, fog 0.75, wind 1, no birds | c. 14,450 cal BP: early Late Glacial Interstadial | Bølling-Allerød 14,690 to c. 12,890 BP (Wikipedia *Bølling-Allerød Interstadial*, matching the findings note). Llanilid: July maximum "around 20°C during the early Interstadial", then juniper reduced by the first cooling. The frame was set on 2026-09-26 or earlier on uncalibrated zone Ia (deeptime:S10 says the zone dates are uncalibrated) and not moved when the others were | X |
| 11,500 BC | Milder: forest 0.16, birds 0.3 | c. 13,450 cal BP: Allerød (13,900-12,900 BP) | Llanilid: Betula woodland present until "a significant contraction" at the abrupt cooling around 13,100 cal BP | C |
| 10,900 BC | Cold again: forest 0.03, fog 0.8 | c. 12,850 cal BP: Younger Dryas onset by the Greenland chronology | deeptime:S8: 12,900-11,700 BP. Llanilid dates the stadial locally to c. 12,600-11,400 cal BP and describes "a scrub tundra with Betula, Salix and a range of open-habitat taxa", not bare ground. Wales was already cooling from c. 13,100 cal BP | P |
| 9,700 BC to 9,000 BC | Forest 0.08 rising to 0.5 | 11,650 to 10,950 cal BP | Llanilid: Holocene onset c. 11,400 cal BP with "an abrupt temperature rise of the order of 9°C" and "rapid expansion of Betula woodland" | C |

## Corrections needed in the note

1. **Earliest occupation, paragraph 1:** "became ice-free by around 18,000 years before present" becomes "the
   ice sheets began a slow retreat around 18,000 years ago" (S1). "People are recorded returning ... by about
   14,500 BP" becomes "S1 believes people had returned by about 14,500 years ago". Add that S1 does not say
   whether its dates are calendar or radiocarbon years, and that its Paviland "26,000 years" is the radiocarbon
   age 26,350 BP, now recalibrated to c. 33,000-34,000 (Wikipedia *Red Lady of Paviland*, a lead; the dating
   papers are Jacobi and Higham, not yet read). Treat 14,500 and 12,500 as possibly uncalibrated.
2. **Earliest occupation, "only five Palaeolithic sites":** S3 is a distribution map of five sites; S1 names Cae
   Gwyn, Ffynnon Beuno and Hoyle's Mouth as well. Say "S3 maps five known Palaeolithic sites", not "only five are
   known". Drop S3 as a source for the Mesolithic gap: it covers the Palaeolithic only.
3. **Key dates, row 3:** "c. 14,500-12,500 BP: post-glacial recolonisation by Mesolithic hunter-gatherers"
   becomes "Late Upper Palaeolithic hunters return to Wales" (S1: the Mesolithic begins c. 11,500 years ago).
4. **Coygan (summary, earliest occupation, key dates, S2):** record the contradiction: S2 "64,000 and 38,000
   years BCE", S1 "between 60,000 and 40,000 years ago". Prefer S1's wording.
5. **Garn Goch:** the distance is about 4.1 miles. S4 mentions "a possible Neolithic site", not a long cairn.
   Record the size split (S5 16.6ha with annexe, S10 c. 11ha, S4 15ha) and that S10 places Y Gaer Fach "a short
   distance to the east" while S5 puts it "some 180m to the west". S10's "c. 800 BC - AD 74" is the conventional
   bracket of the Iron Age period, not a date for the fort; say so in the row.
6. **Waun Pwtlyn:** drop "esker". S6 says "a natural feature, with bedrock visible on its summit", 42m by 27m.
7. **S7 rows:** replace the derived lat/lon with S7's own coordinates and grid references, and correct the
   communities (Tair Carn Isaf: Dyffryn Cennen; Trichrug round cairns: Llangadog). Give the cairns' period as
   S7 does ("Prehistoric"), with the Bronze Age attribution as typology from S7's introduction.
8. **Open question 23 (S14):** close it. The cave remains and possible hillfort are in S37, Coflein 103970 and
   S36. S14 can be retired in favour of those.
9. **Roman forts:** add S15's suggestion that the larger fort was abandoned c. AD 78-83, against S8's "both ...
   abandoned early in the 2nd Century". "Excavated 2003/2006" becomes "identified 2003; investigated 2005 (S8);
   evaluation report 2006 (Pannett, via S15)".
10. **Bishop-Abbot row and S23 entry:** the phrase is in S9, not S23 (see also the medieval review, which finds
    no specialist source for it).
11. **Cadell ap Rhodri row:** S26 does not mention Cadell. Mark it unsourced.
12. **Rhys ap Tewdwr:** S28 gives 1075 for his taking Deheubarth; 1078 is from elsewhere. The Brut quotation is
    in S29, not S28.
13. **1116 row:** S33 does not say the rising ravaged south-west Wales or failed to take castles. Keep only what
    S33 says: "the open rebellion of 1116", accommodation with Henry I and land in Caeo.
14. **"After 1163" (summary, key dates, slider 6, open question 4):** no source gives 1163. Replace with: a
    castle is first recorded at Dinefwr in 1151 (medieval:S12); the Lord Rhys later began "a castle in the new
    style" (S34), after his settlement with Henry II; Coflein dates the foundation to "the later twelfth
    century" (S27). Open question 4's "only documented fortification is post-1163" is wrong for the same reason.
15. **Dinefwr 1287 row:** neither S26 nor S27 supports it; cite Cadw (medieval:S9). Drop "for centuries".
16. **S30 entry and the 1282 row:** S30 names Rhys ap Maredudd as the Welsh leader and gives no date for Clare's
    removal. Move "6 July 1282" to S31, and record S30 as the source that names a leader (contradicted elsewhere;
    medieval review claim 118).
17. **Carreg Cennen 1287-1321:** cite Coflein 103970, the actual source of the dates, and add it to the source
    list.
18. **1403 Carreg Cennen row:** not cross-checked. S36 does not mention 1403, and Coflein 103970 says "In 1403
    Carreg Cennen was taken by Owain Glyndwr". Record the contradiction with S37.
19. **1461-62 row:** Cadw (S36) gives the capture by Sir Roger Vaughan as 1462; S37 gives the Mortimer's Cross
    surrender (1461) without naming Vaughan. Keep both, attributed.
20. **1531 row and open question 11:** the execution is documented. S44: Sir Rhys ap Gruffydd "in 1531,
    forfeited them and his life for alleged conspiracy"; S26 and S46 agree. Only the claim that the lands went to
    the Vaughans of Golden Grove (S50) is unsupported. Rewrite the row as documented, and narrow the open question
    to the land transfer.
21. **Civil War row:** "no direct fighting is documented ... at Llandeilo itself" is contradicted by S9's April
    1648 royalist skirmish in the town (single source, needs a primary check). Sir Henry Vaughan of Derwydd
    commanded the Royalist forces in Pembrokeshire (S49); "raised a Royalist regiment locally" is not in S49.
22. **Talley guardianship (open question 9):** close it. Coflein 92750: "further clearance and consolidation
    followed from 1933 when the remains were taken into state care". Add Coflein 92750's 1184-9 foundation and
    1536 dissolution.
23. **Newton House (open question 13):** add Coflein 17603 as a source. It corroborates the turrets ("an
    engraving of 1773 shows small corner turrets and battlements") and Penson ("between 1856 and 1857 ... designed
    by RK Penson of Oswestry"), gives the house as "built between 1660 and 1670", and Brown's work as 1775-78.
    Neither detail is single-source any more. Note S45's "by the mid-1970s" against S46's 1974.
24. **Golden Grove:** add S53's statement that the present house stands 640m south-west of the original. The 1952
    and 8 July 1966 dates are not in S53; mark them unsourced.
25. **Chapels (S20):** S20 gives a Baptist chapel of 1829; "Soar Baptist 1808" and "Old Bethel 1727/1773" were
    not found on the pages read. Give the page URL (`concise_history.html`).
26. **Paxton's Tower:** S52 states the Nelson dedication plainly and records marble tablets to him; only what
    inspired it is hedged.
27. **Smaller fixes:** S47 says the "nine green gardens" poem is "medieval", not 15th-century; S55 says 1858, not
    1 April 1858; a 1994 trust formation date is not on S47's page. S24 is no longer online; record that, and lean
    on S23 for "earliest surviving document in the Welsh language".
28. **Sources to add:** Coflein 103970, 92750, 100682 and 17603; Walker et al. 2003 (Llanilid) for the Late
    Glacial sequence (better placed in the deep-time note, which owns the environment keyframes).

## Corrections needed in app content

Each correction quotes the current text. Where a new source is named it must first be added to a research note
and the sources regenerated (`node tools/research/extract-sources.mjs`).

1. **`src/content/events.ts:27-28` (`people-return`).** Source: timeline:S1.
   - Current (en): "Wales was free of ice by about 18,000 years ago and people were back by about 14,500 years ago."
   - Corrected (en): "The ice began to retreat from Wales about 18,000 years ago, and archaeologists believe people were back by about 14,500 years ago."
   - Current (cy): "Roedd Cymru'n rhydd o iâ tua 18,000 o flynyddoedd yn ôl, ac roedd pobl yn ôl tua 14,500 o flynyddoedd yn ôl."
   - Corrected (cy): "Dechreuodd yr iâ gilio o Gymru tua 18,000 o flynyddoedd yn ôl, a chred archaeolegwyr fod pobl yn ôl erbyn tua 14,500 o flynyddoedd yn ôl."
   - The rest of both sentences stays. The event's `bc(12500)` assumes S1's 14,500 is calendar years; leave it, but
     record the doubt in the note (correction 1 above).

2. **`src/content/timeline.ts:99-110` (ENVIRONMENT keyframe at `bc(12500)`).** Source: Walker et al. 2003
   (Llanilid), to be added. Current: `forest: 0.02, moor: 0.95, fog: 0.75, ambient: { wind: 1, river: 0.55 }`.
   Corrected (suggested): open grassland with juniper scrub and no tree birch yet, under warm summers:
   `forest: 0.05, moor: 0.9, fog: 0.6, ambient: { wind: 0.8, river: 0.55, birds: 0.2 }`, with sky colours between
   the current 12,500 and 11,500 BC values. Optional: add a frame at about `bc(11100)` with forest near 0.08 for
   the birch contraction around 13,100 cal BP. No text changes. The same evidence suggests `climate.ts:70-71`
   (chill 0.5 at 12,500 BC, 0.55 at 11,000 BC) should be milder at 12,500 BC and colder by 11,000 BC; that file
   cites the deep-time note, so treat it as a follow-up for that note's owner.

3. **`src/content/events.ts:112-113` (`roman-forts`), last sentence.** Sources: timeline:S15, timeline:S8.
   - Current (en): "Both were abandoned in the early 2nd century."
   - Corrected (en): "The smaller fort was still in use in the early 2nd century; sources differ on whether the larger was given up about AD 78–83 or at the same time."
   - Current (cy): "Cawsant eu gadael yn gynnar yn yr 2il ganrif."
   - Corrected (cy): "Roedd y gaer lai yn dal i gael ei defnyddio yn gynnar yn yr 2il ganrif; mae ffynonellau'n anghytuno a roddwyd y gaer fwyaf heibio tua 78–83 OC neu ar yr un pryd."
   - Consequential: `features.ts:210` (`roman-fort-a`, `to: ad(95)`) and `features.ts:223` (`roman-fort-b`,
     `from: ad(90)`) sit later than Coflein's suggested 78-83. The basis text already says the date is approximate;
     add "Coflein suggests AD 78–83, without direct evidence." / "Mae Coflein yn awgrymu 78–83 OC, heb dystiolaeth
     uniongyrchol."

4. **`src/content/events.ts:172-173` (`dinefwr-castle`).** Sources: medieval:S12, timeline:S34, timeline:S27.
   (Same finding as medieval review claim 28.)
   - Current (en): "After regaining Cantref Mawr, Rhys ap Gruffudd, the Lord Rhys, built “a castle in the new style” there."
   - Corrected (en): "Later, at peace with Henry II, Rhys ap Gruffudd, the Lord Rhys, began “a castle in the new style” there."
   - Current (cy): "Ar ôl adennill y Cantref Mawr, cododd Rhys ap Gruffudd, yr Arglwydd Rhys, “gastell yn y dull newydd” yno."
   - Corrected (cy): "Yn ddiweddarach, mewn heddwch â Harri II, dechreuodd Rhys ap Gruffudd, yr Arglwydd Rhys, “gastell yn y dull newydd” yno."
   - The event's `ad(1163)` has no source; consider about `ad(1172)` with `approximate: true`.

5. **`src/content/features.ts:303-304` (`dinefwr-rhys` basis), first sentence.** Sources: medieval:S12,
   timeline:S34, timeline:S27.
   - Current (en): "The Lord Rhys founded the first castle here with archaeological evidence after 1163, “a castle in the new style”."
   - Corrected (en): "A castle is first recorded here in 1151; the Lord Rhys later began “a castle in the new style”."
   - Current (cy): "Sefydlodd yr Arglwydd Rhys y castell cyntaf yma y mae tystiolaeth archaeolegol iddo ar ôl 1163, “castell yn y dull newydd”."
   - Corrected (cy): "Cofnodir castell yma gyntaf yn 1151; yn ddiweddarach dechreuodd yr Arglwydd Rhys “gastell yn y dull newydd”."

6. **`src/content/events.ts:186-187` (`talley`).** Sources: medieval:S19, Coflein 92750 (medieval note).
   (Same finding as medieval review claim 74; repeated because the event also cites timeline:S38 and S39.)
   - Current (en): "Its builders planned a great church 73m long, but only the eastern end was ever finished."
   - Corrected (en): "Its builders planned a great church 73m long, but finished it in a shorter form; the west end of the nave never rose far above its foundations."
   - Current (cy): "Cynlluniwyd eglwys fawr 73m o hyd, ond dim ond y pen dwyreiniol a orffennwyd."
   - Corrected (cy): "Cynlluniwyd eglwys fawr 73m o hyd, ond fe'i gorffennwyd ar ffurf fyrrach; ni chododd pen gorllewinol corff yr eglwys fawr uwchlaw ei sylfeini."

7. **`src/content/events.ts:222` (`english-1277` provenance).** The summary quotes Cadw's 1287 date, but the
   cited S26 and S37 do not give it. Change `documented('timeline:S26', 'timeline:S37')` to
   `documented('timeline:S26', 'timeline:S37', 'medieval:S9')`. No text change.

8. **`src/content/events.ts:289` (`glyndwr` provenance).** timeline:S36 (Cadw) does not mention 1403. Remove
   `'timeline:S36'`; Coflein 103970 ("taken by Owain Glyndwr"), which the summary quotes, should be cited instead
   once it is a source key (it is medieval:S56 in the medieval note). No text change.

9. **`src/content/events.ts:151` (`surexit` provenance).** timeline:S24 can no longer be read. Replace it with
   timeline:S23 (llandeilofawr.org.uk: "the earliest surviving document in the Welsh language"). No text change.

10. **`src/content/features.ts:331-332` (`dinefwr-ruin`).** "The great round tower survives as a two-storey
    stump" is cited to timeline:S45 and S46, which do not say it. Replace those keys with `timeline:S27` (Coflein
    425: "now a two storey stump"). No text change.

11. **`src/content/features.ts:520-521` (`newton-house-turrets` basis).** Source: timeline:S46 plus Coflein 17603
    (to be added).
    - Current (en): "Turrets and battlements were added in 1760–80 (a single source). Their form is not described, so the square corner turrets are a guess;"
    - Corrected (en): "Turrets and battlements were added in 1760–80, and an engraving of 1773 shows small corner turrets. Their exact form is not described, so the square corner turrets are a guess;"
    - Current (cy): "Ychwanegwyd tyredau a bylchfuriau yn 1760–80 (un ffynhonnell). Ni ddisgrifir eu ffurf, felly dyfalu yw'r tyredau sgwâr ar y corneli;"
    - Corrected (cy): "Ychwanegwyd tyredau a bylchfuriau yn 1760–80, ac mae engrafiad o 1773 yn dangos tyredau bach ar y corneli. Ni ddisgrifir eu hunion ffurf, felly dyfalu yw'r tyredau sgwâr ar y corneli;"
    - Also cite Coflein 17603 on `newton-house` (`features.ts:506-508`), whose "built in 1660–70" matches Coflein
      but not the cited S46 (1659-60).

12. **`src/content/features.ts:568` and `574-575` (`golden-grove-earlier`).** Source: timeline:S53.
    - Position: `at: { e: 259711, n: 219855 }` is the present house. S53 puts the original 640m north-east of it,
      roughly `{ e: 260160, n: 220310 }`. S53 gives only "south-west", so confirm against a Coflein or Cadw
      record for the old mansion before moving it.
    - Add to the basis (en): "They stood about 640m north-east of the present house; the exact site is approximate."
    - Add to the basis (cy): "Roeddent tua 640m i'r gogledd-ddwyrain o'r tŷ presennol; bras yw'r union safle."

13. **`src/content/features.ts:673`, `700`, `751` (`modern-town`, `countryside-today`, `roads`).** These cite
    timeline:S9 (Wikipedia *Llandeilo*) for "Buildings from OS Open Map Local" and "Roads from OS Open Map Local".
    S9 says nothing about OS data. There is no research source key for the OS datasets (they are only in
    `assets.ts`), so this needs a structural fix: a source entry for OS Open Map Local that provenance can cite.
    No text change.

14. **`src/content/conversations.ts:323-325` (optional; imagined dialogue).** Roman coins were found at Dinefwr
    around 1800 (S16) and a Roman temple was recorded in 1770 (S17), so "nobody knew" overstates it even for a
    child. Source: timeline:S15.
    - Current (en): "And the Roman forts! Nobody knew about them until 2003."
    - Corrected (en): "And the Roman forts! Nobody knew where they were until 2003."
    - Current (cy): "A'r caerau Rhufeinig! Doedd neb yn gwybod amdanyn nhw tan 2003."
    - Corrected (cy): "A'r caerau Rhufeinig! Doedd neb yn gwybod ble roedden nhw tan 2003." (lines 323 and 325)

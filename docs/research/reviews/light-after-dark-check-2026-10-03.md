---
title: Independent check of light-after-dark.md
kind: review
status: current
updated: 2026-10-03
---

# Independent check: Light after dark, how Llandeilo lit the night

Reviewed note: [`../light-after-dark.md`](../light-after-dark.md) (status: draft, updated 2026-10-03).
App content checked: `src/content/lamplight.ts` at `main` `d40eec0` (local `main` was 15 commits
ahead of `origin/main`; the file is identical in the working tree). Line numbers below refer to that
file.

## Method

- Every cited URL (S1 to S19) was downloaded with `curl` and read as raw text, then searched for
  the quoted words, so wording could be checked exactly. Each Welsh Newspapers Online page's paper and
  date were read from the page itself. S3, S5, S7, S10, S11 and S12, which the note read only from
  search-result text, were read on the full page.
- **"Llandilo" was checked item by item.** Every newspaper source is Llandeilo Fawr: S1 sits among
  Llandybie and Llanfihangel Aberbythych items; S2 says "Llandilo Fawr"; S3 names Ffairfach Gate; S4
  meets at the Shire Hall with a Llanegwad case below it; S5 and S7 are the Urban District Council
  (its chairman J. W. Nicholas also chairs the Llandilo UDC in the Carmarthen Journal of 13 June
  1902); S8, S9 and S11 are "Llandilo Notes" in Carmarthen papers and name Trallwm and Rhosmaen.
- The cross-note sources the app cites were also read: [music:S3] (Aneurin Owen's *Ancient Laws and
  Institutes of Wales*, 1841, Internet Archive text layer), [medieval:S41] (Wikipedia, *Cyfraith
  Hywel*), [hunters:S36] (the Howick report PDF) and [victorian:S2] (Wikipedia, *Ffairfach*).
- Welsh Newspapers Online was searched directly (its search page, fetched with `curl`) for 1864 to
  1866 and for 1902. Its search treats every word as OR, so phrase searches are not possible there.
  Eight new 1902 items were found and read; they are listed under "New sources" below.
- Four WebSearch calls were used (dim-out date and curtains; Hansard on the dim-out; the end of the
  blackout, twice). Pages they pointed to were then read directly: Hansard written answers of 28
  September 1944, Commons debates of 8 December 1944 and 15 March 1945, Wikipedia *Blackout
  (wartime)*, Scarborough Maritime Heritage Centre, Leeds Beckett University's blog, and Saddleworth
  Independent. Welsh Wikipedia's *Cyfraith Hywel* was read for the Welsh officer name.

## Summary

46 claims checked: **31 confirmed, 13 partly, 0 not supported by the cited source, 2 contradicted.**

The newspaper core of the note is sound: every quotation from S1 to S12 is on the page as quoted,
under the right paper and date, and is about Llandeilo Fawr. The 1864 gas works, the 1876 "as
heretofore" lamps and the September 1902 electric street light all stand. The national wartime dates
stand too. The problems are in how the app words some keys, and in the later war years:

1. **"Blackout curtains stayed" in the dim-out is contradicted.** From 17 September 1944 Morrison
   "allowed half-lighting for houses" (Hansard, 8 December 1944), and a local history of Scarborough
   says householders "could take down their blackout curtains and shutters and use their ordinary
   curtains". Homes still had to be screened (Morrison would not end "blacking-out of private homes",
   S17), but not with blackout material.
2. **"By 8 May 1945 the blackout was over everywhere" is contradicted.** Restrictions "mostly
   remained in place until 2 May 1945, and, even then, some coastal areas remained subject to the
   rules well into peacetime" (Leeds Beckett University). S18 is a statement of intent, and its own
   question speaks of districts "in which they are still in force", so lifting was already uneven.
3. **The dim-out has an exact date.** Hansard's written answer of 28 September 1944 (Morrison):
   circulars of 9 September gave "particulars of the relaxations due to come into force on 17th
   September", except in listed areas. The app's comment "the sources give the month only" is out of
   date.
4. **Gas works "built in 1864" overstates S1 and S2**, which show the works begun (foundation stone
   August 1864) and "in course of erection" in October 1864. Completion is not found.
5. **Two wordings carry over errors already corrected elsewhere or narrow the source**: Garn Goch
   "unexcavated" (the 2026-10-02 Iron Age check corrected this to "no excavation is recorded"), and
   White's "went to bed with the daylight", which he says of "the long days" only.
6. **The Dimetian Code passage is real** (Owen 1841: the candle-bearer sits "before" the king, and
   his protection runs "from the time of lighting the first candle, in the palace, until the last
   shall be extinguished"), but the "early 13th century" manuscript date in the app belongs to the
   earliest Welsh law manuscripts in general (Latin), not to the Deheubarth text.
7. **New evidence answers two open questions in part.** On 10 October 1902 the Urban Council
   resolved "that the town lamps be lighted from half an hour after sunset till 11 o'clock every night
   throughout the year"; in April 1902 the gas lamplighter was kept on "to the end of the season",
   which supports seasonal gas lighting before electricity. The same April meeting ordered "16 new
   lamp posts". In December 1902 there was "no light whatever" from the Trallwm turn to Station Road
   (S11), so not every street was lit.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

| # | Claim | Used in src/ | Verdict | Evidence |
|---|---|---|---|---|
| 1 | Llandilo Gas Company accepted G. Bower's tender, "£96 for plant and street mains"; buildings and tanks let to Morgan and Howell, masons; foundation stone laid August 1864 | lamplight.ts:145 (S1) | C | S1, *The Welshman* 19 Aug 1864 (a Friday), https://newspapers.library.wales/view/4352711/4352716/24/ : quoted words present; "The foundation stone was laid last Thursday, hy Mast. Oswald Lewis". £96 is as the OCR prints it; it is low for a gas plant and may be an OCR loss, so treat the figure as unverified |
| 2 | Gas works "in course of erection" at Llandilo Fawr and Rhayader, October 1864, contractor Geo. Bower | lamplight.ts:145 (S2) | C | S2, *North Wales Chronicle* 29 Oct 1864, https://newspapers.library.wales/view/4447307/4447311/34/ verbatim. Also reprinted at /view/4353026/4353031/15/ |
| 3 | Gas Company allowed to lay a main under the turnpike road "from Ffairfach Gate to Llandilo Bridge" | none (note) | C | S3, *The Welshman* 1 Jul 1864, https://newspapers.library.wales/view/4352648/4352652/15/ , full page read: on depositing £10 and paying one shilling a year |
| 4 | The c. 1860 Ffairfach gas works date in [victorian:S2] is contradicted by the 1864 newspapers | none | C | https://en.wikipedia.org/wiki/Ffairfach : "A gas works were erected about 1860". S1 (tenders let in August 1864) and S2 are primary. The S3 main from Ffairfach Gate fits a works at Ffairfach |
| 5 | The gas works were "built in 1864" | lamplight.ts:138-139, 145-146 | P | S1 and S2 show building begun and under way in 1864, not finished. No report of completion or first lighting was found |
| 6 | Local Board, Sept 1876: Gas Company to manage "the lighting and repair of town lamps during the winter as heretofore", 18d per thousand feet beyond the current price | lamplight.ts:138, 145 (S4) | C | S4, *The Welshman* 29 Sep 1876, https://newspapers.library.wales/view/4355793/4355798/18/ verbatim; under the LLANDILO heading, meeting at the Shire Hall |
| 7 | "As heretofore" means the lamps were lit before 1876, so 1876 is a latest date | lamplight.ts:130, 145 | C | S4 wording; sound inference, and the app's `dated: 'by'` matches |
| 8 | First gas lighting of the streets (1864 to 1876) is not found | lamplight.ts:138, 145 | C | Confirmed as a gap: this check's own searches of 1864 to 1866 found nothing either. The 1864 tender already included "street mains" (S1), so street lighting was planned from the start |
| 9 | Gas street lamps lit "in winter" | lamplight.ts:138 | C | S4 "during the winter". Supported further by *The Cambrian* 4 Apr 1902 (below): the lamplighter continued "to the end of the season" |
| 10 | Public meeting, June 1899, resolved "to have the town lit by electric light", cost estimated at £1,500 | lamplight.ts:166 (S5) | C | S5, *South Wales Echo* 26 Jun 1899, https://newspapers.library.wales/view/4233580/4233583/95/ , full page: meeting at the Town Hall, convened by the chairman J. W. Nicholas "at the request of the Urban District Council" |
| 11 | Shareholder's letter: the Gas Company "originally invested their money for the sole purpose of lighting the town" | none | C | S6, *The Cambrian* 14 Jul 1899, https://newspapers.library.wales/view/3342899/3342906/98/ ; letter from Lewis Bishop dated 11 July 1899 |
| 12 | UDC accepted Mr Bertram "Thorn"'s tender of £2,415 4s, June 1900, subject to a loan | none | C | S7, *Weekly Mail* 16 Jun 1900, https://newspapers.library.wales/view/3374186/3374191/90/ verbatim |
| 13 | The contractor was Bertram Thomas | none | C | *Carmarthen Journal* 10 Oct 1902, https://newspapers.library.wales/view/3677405/3677410/35/ ("the contractor (Mr Bertram Thomas)"); *The Cambrian* 7 Feb 1902, https://newspapers.library.wales/view/3346188/3346195/73/ |
| 14 | 5 Sept 1902: streets "now that they are electrically lit than when they were gas lit" | lamplight.ts:161, 168 (S8) | C | S8, *Carmarthen Weekly Reporter* 5 Sep 1902, https://newspapers.library.wales/view/3645955/3645956/21/ verbatim |
| 15 | Streets "left in darkness" one Saturday night when the electric light failed | none | C | S9, *Carmarthen Weekly Reporter* 3 Oct 1902, https://newspapers.library.wales/view/3645987/3645988/2/ verbatim. The Saturday is 27 September 1902 |
| 16 | "the Urban Council has just installed their own electric light" | lamplight.ts:161, 166 (S10) | C | S10, *Carmarthen Journal* 21 Nov 1902, https://newspapers.library.wales/view/3677459/3677464/43/ , full page read |
| 17 | Electric street light by September 1902, the council's own | lamplight.ts:152-170 | C | S8 and S10 (two papers); S5 and S7 for the council's scheme. The app's `ad(1902.67)` (about 2 September) with `dated: 'by'` fits |
| 18 | Every street in the town lit (the lamps are drawn throughout the outline) | lamplight.ts:155 | P | S11 (5 Dec 1902): from "the turn from Trallwni to the Station Road there is no litfht whatever". *Carmarthen Journal* 10 Oct 1902: "several pillars and brackets had not been completed". The app says lamp positions are not recorded, which is honest; the drawing overstates coverage a little |
| 19 | Gas kept alongside electricity in public buildings, October 1902 | none (note) | P | *Carmarthen Journal* 31 Oct 1902, https://newspapers.library.wales/view/3677432/3677437/36/ : "The Institution was almost in darkness on Monday, but luckily the gas had been left intact" confirmed. The 10 October Reading Room item was not opened |
| 20 | Homes mixed electric light, gas and oil from 1902 | lamplight.ts:161, 168 | P | Electricity was sold to consumers: *The Cambrian* 16 May 1902, https://newspapers.library.wales/view/3346314/3346321/91/ ("the charge for electric light at Llandilo be 6d. per unit"), and a collector was appointed "at a salary of 1s for each meter per quarter" (*Carmarthen Journal* 10 Oct 1902). No source counts homes; the app already says the share is guessed |
| 21 | Paraffin lamps on sale in Carmarthen by March 1864 | lamplight.ts:116, 122 (S12) | C | S12, *The Welshman* 4 Mar 1864, https://newspapers.library.wales/view/4352495/4352499/13/ : J. H. Smith and Co., 19 Queen Street, Carmarthen; "NEW LAMPS for burning Petroline, Paraffin, and Cazeline Oils" verbatim |
| 22 | Llandeilo station still had "antiquated oil lamps", December 1902 | lamplight.ts:122 (S11) | C | S11, *Carmarthen Weekly Reporter* 5 Dec 1902, https://newspapers.library.wales/view/3646059/3646061/16/ verbatim |
| 23 | Oil lamps in Llandeilo homes from 1864 | lamplight.ts:109 | P | Not evidenced locally; the app labels it reconstructed and says how many homes is not known. Correctly framed |
| 24 | Cilewent: long-house from Llansanffraid Cwmteuddwr near Rhayader, built 1470, rebuilt in stone 1734, furnished period 1750 | lamplight.ts:100 (S13) | C | S13, https://museum.wales/collections/historic-buildings/5/Cilewent-Farmhouse/ : "first built in 1470", stone "when the house was enlarged in 1734", "Furnished Period 1750" |
| 25 | "In the evening, lighting was provided by a rushlight holder ... Reeds were dipped in fat" | lamplight.ts:94, 100 | C | S13 verbatim |
| 26 | App: "rushes peeled, dipped in fat and held in an iron holder, as at Cilewent" | lamplight.ts:100-101 | P | Cilewent says "Reeds were dipped in fat" and held "between the two iron pieces"; the peeling is White's (S14), not Cilewent's. A merge of two sources under one "as at" |
| 27 | White: "five and a half hours of comfortable light for [a] farthing"; the very poor "buy a halfpenny candle every evening" | none (note) | C | S14, Gutenberg ebook 20934 (vol. 2), Letter XXVI, 1 Nov 1775: verbatim; also "the use of rushes instead of candles" |
| 28 | App: "Working people went to bed with the daylight" | lamplight.ts:94-95, 100-101 | P | White: "working people burn no candles in the long days, because they rise and go to bed by daylight. Little farmers use rushes much in the short days, both morning and evening". He limits it to summer, and says rushes were used in winter |
| 29 | Dimetian Code: the candle-bearer sits before the king | lamplight.ts:72, 78 (music:S3) | C | Owen 1841, Dimetian Code, Book I: "the foot-holder is to sit under the king's feet, and the candle-hearer [sic, OCR] before him" (Internet Archive text, https://archive.org/details/bub_gb_4_qi_6p1ZucC ) |
| 30 | His protection runs "from the time of lighting the first candle, in the palace, until the last shall be extinguished" | lamplight.ts:78 | C | Same edition: "The protection of the candle-bearer is, from the time of lighting the first candle, in the palace, until the last shall be extinguished" |
| 31 | Welsh name of the officer is *canhwyllydd* | lamplight.ts:73, 79 | C | Welsh Wikipedia *Cyfraith Hywel* lists "Canhwyllydd" among the court officers, https://cy.wikipedia.org/wiki/Cyfraith_Hywel |
| 32 | "the law-book of Deheubarth, in manuscripts from the early 13th century" | lamplight.ts:78-79 | P | [medieval:S41] https://en.wikipedia.org/wiki/Cyfraith_Hywel : the Blegywryd redaction "is associated with Deheubarth"; but "The earliest surviving manuscripts, however, are in Latin, date from the early 13th century" is said of Welsh law as a whole. The source does not date the Deheubarth text's own manuscripts, and does not say the Dimetian Code is the Blegywryd redaction |
| 33 | Key year "By about 1200" | lamplight.ts:63, 72-73 | P | Follows from #32: the evidence is 13th-century or later manuscripts, so "by about 1200" is earlier than the source allows. Owen's introduction notes the Dimetian Code mentions alterations by Rhys ap Gruffudd "about 1180", which is a lead, not a manuscript date |
| 34 | Howick hut c. 7800 BC, with hearths | lamplight.ts:55 (hunters:S36) | C | Howick report PDF: "a sequence of hearths"; "primary construction of the site dates to c. 7800 BC (Cal.)". Howick is in Northumberland, which the app does not say |
| 35 | Garn Goch "is unexcavated" | lamplight.ts:55-56; note line 24-25 | P | [era-iron-age](../era-iron-age.md) line 15, corrected by the 2026-10-02 check: "no excavation of it is recorded" (antiquarian accounts of 1893 and 1909-10 exist, unread). The app repeats the pre-correction wording |
| 36 | Blackout introduced 1 September 1939 | lamplight.ts:174-191 (S15, S19) | C | S15 IWM verbatim; S19 verbatim; Wikipedia *Blackout (wartime)* agrees, but it cites S19 (the .htm page) for this, so it is not independent of S19 |
| 37 | "every street lamp out after dark" from 1939 until the dim-out | lamplight.ts:183-184, 190 | P | True at the start. Wikipedia: street lights "were switched off, or dimmed and shielded to deflect light downward"; IWM (S15): "later a more realistic approach was adopted, with limited use of illuminated signs and 'glimmer' or 'star' lighting"; Scarborough: "Starlighting in the streets had been used since 1943". Whether Llandeilo used star lighting is not known |
| 38 | Blackout in force until a "dim-out" in September 1944 | lamplight.ts:196-217 | C | S15 verbatim; S19; Leicester Special Collections quoting IWM |
| 39 | The dim-out began on 17 September 1944 | lamplight.ts:196-197 (comment says month only) | C | Hansard written answers, 28 Sep 1944, vol 403 cc438-9W, https://api.parliament.uk/historic-hansard/written_answers/1944/sep/28/lighting-restrictions : "relaxations due to come into force on 17th September", some areas excepted. Scarborough Maritime Heritage Centre, https://www.scarboroughsmaritimeheritage.org.uk/article.php?article=673 : "partially lifted on September 17th 1944" |
| 40 | Dim-out: "though blackout curtains stayed" | lamplight.ts:206-207 | X | Hansard 8 Dec 1944, vol 406 cc1013-20, https://api.parliament.uk/historic-hansard/commons/1944/dec/08/black-out-regulations , Morrison: "We have allowed half-lighting for houses, and removed the requirement that the full black-out shall be restored on the alert." Scarborough: "House holders could take down their blackout curtains and shutters and use their ordinary curtains." Screening was still required (S17), but not blackout curtains |
| 41 | Dim-out street lighting "the equivalent of moonlight"; councils eased street lighting that winter | lamplight.ts:213 (S17, S19) | C | S19 verbatim; Hansard 8 Dec 1944: "half-lighting or moon-lighting for the streets". The level was each council's choice: Hansard 28 Sep 1944 (Leicester "preferred the lower of the new standards") and 15 Mar 1945, https://api.parliament.uk/historic-hansard/commons/1945/mar/15/street-lighting ("I have no power to require any minimum standard"). So Llandeilo's dim lamps are rightly called guessed |
| 42 | S19: a full blackout still had to be imposed when an alert sounded | none (note) | P | True of the higher street-lighting standard (Hansard 28 Sep 1944). For houses, Morrison says on 8 Dec 1944 the requirement to restore full blackout on the alert was removed |
| 43 | 12 April 1945: intention "to remove the black-out restrictions in all districts at a date not later than the end of the war in Europe" | lamplight.ts:236 (S18) | C | S18 verbatim. The question asked about districts "in which they are still in force", so some had already been freed |
| 44 | "By 8 May 1945 the blackout was over everywhere, and the streets were lit again" | lamplight.ts:229-230, 236-237 | X | Leeds Beckett University blog, https://www.leedsbeckett.ac.uk/blogs/lbu-together/2020/05/coming-out-of-the-blackout/ : "The restrictions mostly remained in place until 2 May 1945, and, even then, some coastal areas remained subject to the rules well into peacetime." Llandeilo is inland, so a latest date of 8 May for the town is still reasonable; "everywhere" is not. "The streets were lit again" is national permission, not a Llandeilo record |
| 45 | Full street lighting April 1945; Big Ben lit 30 April 1945 | lamplight.ts:236 (S19) | C | S19 verbatim; Saddleworth Independent agrees. S19's "5 years and 123 days" is wrong arithmetic (1 Sep 1939 to 30 Apr 1945 is 5 years and 241 days), and Wikipedia copies it, a small mark against S19's care |
| (lit area) | Lamps only north of the Tywi, outline as drawn | lamplight.ts:6-25 | P | Reconstruction, honestly labelled. Checks: the church (262930, 222236) is inside; the bridge (`LLANDEILO_BRIDGE_AT`, 262757, 222001) is about 10m outside the south edge. A June 1902 council minute (below) proposed lighting "Llandilo Bridge by electric light" jointly with Llandyfeisant Parish Council and the UDC, outcome not found. S11 shows the Trallwm to Station Road stretch unlit in Dec 1902. *The Cambrian* 4 Apr 1902 ordered "16 new lamp posts" and names "the bottom lamp in Rhosmaen-street" (CJ 10 Oct 1902) |

Tally: confirmed #1-4, 6-17, 21, 22, 24, 25, 27, 29-31, 34, 36, 38, 39, 41, 43, 45 (31); partly
#5, 18-20, 23, 26, 28, 32, 33, 35, 37, 42 and the lit-area row (13); contradicted #40, 44 (2).

## New sources found (not in the note)

- *The Cambrian*, 4 April 1902, "Llandilo" (UDC) – https://newspapers.library.wales/view/3346260/3346267/79/ – the lamplighting contract "terminated on the 31st ult. ... in anticipation of the electric light"; "Mr. Davies continue to light the town lamps ... to the end of the season". The same page's UDC report (article /77/ on that page) adds that the engineer "visited the various lamps in the town"; "16 new lamp posts be supplied by the contractor". Primary.
- *The Carmarthen Journal*, 13 June 1902, "Llandilo" – https://newspapers.library.wales/view/3677261/3677269/60/ – a council (its name is lost in the OCR join; not the UDC, which it writes to) resolved to ask "the Llandyfeisant Parish Council, and ... the Llandilo Urban District Council" to join it "in lighting Llandilo Bridge by electric light". Primary.
- *The Carmarthen Journal*, 10 October 1902, "Llandilo" (UDC) – https://newspapers.library.wales/view/3677405/3677410/35/ – contractor Mr Bertram Thomas; "several pillars and brackets had not been completed"; a meter collector appointed; "the town lamps be lighted from half an hour after sunset till 11 o'clock every night throughout the year", and a finger-post on "the bottom lamp in Rhosmaen-street". Primary.
- *The Carmarthen Journal*, 31 October 1902, "Llandilo Notes" – https://newspapers.library.wales/view/3677432/3677437/36/ – the Institution's gas "left intact". Primary.
- *The Cambrian*, 16 May 1902 – https://newspapers.library.wales/view/3346314/3346321/91/ – suggested charge of 6d a unit, "equal to about 3s. per 1,000 for gas". Primary.
- Hansard written answers, 28 September 1944 (dim-out from 17 September 1944); Commons, 8 December 1944 (half-lighting for houses and streets); Commons, 15 March 1945 (no national minimum of street lighting). Primary.
- Leeds Beckett University, "Coming out of the blackout" (2020): restrictions mostly to 2 May 1945, some coastal areas later. Secondary, academic blog.
- Scarborough Maritime Heritage Centre, article 673: 17 September 1944; ordinary curtains; star lighting from 1943. Secondary, local.

## Corrections for the note (`docs/research/light-after-dark.md`)

1. Line 24-25 (Summary, hearth): "Garn Goch is unexcavated" should read "no excavation of Garn Goch
   is recorded", matching the corrected Iron Age note.
2. Lines 43-49 (gas works): keep, but say the works were **begun** in 1864 and completion is not
   found; flag the £96 figure as printed by the OCR and unconfirmed.
3. Lines 57-58 (winter only): add *The Cambrian* 4 Apr 1902 ("to the end of the season") as support
   for seasonal gas lighting before 1902, and *Carmarthen Journal* 10 Oct 1902 for the electric era:
   lamps lit "from half an hour after sunset till 11 o'clock every night throughout the year". Move
   the open question at line 126 to "partly answered".
4. Lines 59-69 (electric light): add the 16 new lamp posts (April 1902), the unfinished pillars and
   brackets (October 1902), the Trallwm to Station Road gap (S11), and the June 1902 bridge-lighting
   proposal. Cite the Carmarthen Journal 10 Oct 1902 for "Bertram Thomas" instead of "not listed
   below".
5. Lines 70-74: the 31 October Institution item is confirmed; list it as a source.
6. Lines 75-80 (blackout): note that street lamps were "switched off, or dimmed and shielded", and
   that some towns used "star" lighting later (S15, Scarborough 1943). Note that Wikipedia cites S19,
   so it does not count as a second source.
7. Lines 81-91 (dim-out): give the date as **17 September 1944** (Hansard written answer, 28 Sep
   1944). Add that houses were allowed "half-lighting" and ordinary curtains, that the street-lighting
   standard was each council's choice, and that S19's "full Blackout ... if an alert was sounded" was
   removed for houses by December 1944.
8. Lines 86-89 (end of the blackout): add Leeds Beckett (mostly lifted by 2 May 1945; some coastal
   areas later). Say the lifting was not uniform. Note S19's "123 days" arithmetic error.
9. Line 102 (table, c. 1200 key): the early-13th-century manuscript date is for Welsh law
   manuscripts in general (Latin), per [medieval:S41]; the Deheubarth text's own manuscripts are not
   dated by any source read.
10. Line 103 / Summary line 31-38: Cilewent says "reeds dipped in fat"; the peeling is White's. And
    White's "go to bed by daylight" is for "the long days"; in the short days little farmers used
    rushes "both morning and evening".
11. Line 108 (dim-out row): "Curtained, faint" is fine; change "From Sept 1944" to "On 17 Sept 1944".
12. Line 109 (last row): "Documented as a latest date" stands for Llandeilo (inland), but not "in all
    districts".

## Corrections for app content (`src/content/lamplight.ts`)

| File:line | Current | Corrected English | Corrected Welsh | Source key |
|---|---|---|---|---|
| lamplight.ts:55 | "...roundhouses are drawn with a central hearth by analogy, since Garn Goch is unexcavated." | "The hut at Howick (Northumberland), c. 7800 BC, had hearths; roundhouses are drawn with a central hearth by analogy, since no excavation of Garn Goch is recorded." | (line 56) "Roedd aelwydydd yn y cwt yn Howick (Northumberland), tua 7800 CC; mae'r tai crwn yn cael aelwyd ganolog trwy gymhariaeth, gan nad oes cofnod o gloddio yng Ngarn Goch." | hunters:S36; Iron Age check 2026-10-02 |
| lamplight.ts:72 | "By about 1200 a Welsh court's law-book seats a candle-bearer before the king." | "In the 13th century a Welsh court's law-book seats a candle-bearer before the king." (and move the key from `ad(1200)` to a 13th-century year, or keep 1200 and drop "By") | (line 73) "Yn y 13eg ganrif mae llyfr cyfraith llys Cymreig yn gosod canhwyllydd o flaen y brenin." | music:S3, medieval:S41 |
| lamplight.ts:78 | "the law-book of Deheubarth, in manuscripts from the early 13th century, seats..." | "a law-book linked to Deheubarth (the earliest manuscripts of Welsh law are from the early 13th century) seats..." | (line 79) "mae llyfr cyfraith sy'n gysylltiedig â Deheubarth (daw'r llawysgrifau cynharaf o gyfraith Cymru o ddechrau'r 13eg ganrif) yn gosod..." | medieval:S41 |
| lamplight.ts:94 | "Working people went to bed with the daylight." | "In summer, working people rose and went to bed with the daylight." | (line 95) "Yn yr haf, codai gweithwyr ac âi i'r gwely gyda golau dydd." | light:S14 |
| lamplight.ts:100 | "Rushlights: rushes peeled, dipped in fat and held in an iron holder, as at Cilewent farmhouse..." ... "says working people burned no candles in the long days and went to bed by daylight." | "Rushlights: rushes dipped in fat and held in an iron holder, as at Cilewent farmhouse... Gilbert White (Hampshire, 1775) describes peeling the rushes, and says working people burned no candles in the long days, rising and going to bed by daylight, while small farmers used rushes on winter mornings and evenings." | (line 101) "Canhwyllau brwyn: brwyn wedi'u trochi mewn saim a'u dal mewn daliwr haearn, fel yn ffermdy Cilewent... Mae Gilbert White (Hampshire, 1775) yn disgrifio pilio'r brwyn, ac yn dweud nad oedd gweithwyr yn llosgi canhwyllau yn y dyddiau hir, gan godi a mynd i'r gwely gyda golau dydd, tra oedd ffermwyr bach yn defnyddio brwyn ar foreau a nosweithiau'r gaeaf." | light:S13, light:S14 |
| lamplight.ts:138 | "fed from the gas works built in 1864" | "fed from the gas works begun in 1864" | (line 139) "o'r gwaith nwy y dechreuwyd ei godi yn 1864" | light:S1, light:S2 |
| lamplight.ts:145 | "The works and street mains were built in 1864 (S1, S2)" | "The works and street mains were begun in 1864 (S1, S2); when they were finished is not known" | (line 146) "Dechreuwyd codi'r gwaith nwy a'r prif bibellau stryd yn 1864 (S1, S2); nid yw'n hysbys pryd y'u gorffennwyd" | light:S1, light:S2 |
| lamplight.ts:183 | "every window covered and every street lamp out after dark." | "every window covered and the street lamps put out after dark." | (line 184) "pob ffenestr wedi'i gorchuddio a lampau'r stryd wedi'u diffodd wedi iddi nosi." | light:S15 (the scene can stay dark: whether Llandeilo used star lighting is not known; say so in the note, line 190: "Later in the war some towns allowed faint 'star' lighting; whether Llandeilo did is not known." / "Yn ddiweddarach yn y rhyfel caniataodd rhai trefi olau 'seren' gwan; nid yw'n hysbys a wnaeth Llandeilo hynny.") |
| lamplight.ts:196-197, 206 | comment "the sources give the month only"; text "From September 1944, the dim-out: a little light allowed at home and in the streets, though blackout curtains stayed." | year 17 September 1944 (`dated: 'on'`); "From 17 September 1944, the dim-out: homes could use ordinary curtains and show a little light, and councils could light the streets to about moonlight." | (line 207) "O 17 Medi 1944, y pylu: câi cartrefi ddefnyddio llenni cyffredin a dangos ychydig o olau, a châi cynghorau oleuo'r strydoedd i lefel golau lleuad, fwy neu lai." | light:S16, light:S17, light:S19, plus new: Hansard WA 28 Sep 1944 and HC 8 Dec 1944 (add to the note as sources) |
| lamplight.ts:213 | "some domestic lighting was allowed, but homes were still blacked out in February 1945" | "homes were allowed half-lighting behind ordinary curtains, though in February 1945 the Home Secretary still would not end the blacking-out of homes; each council chose its own street-lighting standard" | (line 214) "caniatawyd hanner golau i gartrefi y tu ôl i lenni cyffredin, er na fyddai'r Ysgrifennydd Cartref ym mis Chwefror 1945 yn rhoi terfyn ar dywyllu cartrefi o hyd; dewisai pob cyngor ei safon ei hun ar gyfer goleuo'r strydoedd" | light:S16, light:S17, Hansard 8 Dec 1944 and 15 Mar 1945 |
| lamplight.ts:229 | "By 8 May 1945 the blackout was over everywhere, and the streets were lit again." | "By 8 May 1945 the blackout had been lifted across most of Britain, Llandeilo included, and street lamps could be lit again; some coastal areas waited longer." | (line 230) "Erbyn 8 Mai 1945 roedd y blacowt wedi'i godi ar draws y rhan fwyaf o Brydain, gan gynnwys Llandeilo, a gellid cynnau lampau'r stryd eto; bu'n rhaid i rai ardaloedd arfordirol aros yn hwy." | light:S18, light:S19, plus new: Leeds Beckett (add to the note) |
| lamplight.ts:236 | "the Home Secretary meant to lift the blackout in all districts no later than ... 8 May 1945 (S18)" | add: "Most restrictions had gone by 2 May; some coastal areas kept them into peacetime." | (line 237) add: "Roedd y rhan fwyaf o'r cyfyngiadau wedi mynd erbyn 2 Mai; cadwodd rhai ardaloedd arfordirol nhw i mewn i amser heddwch." | new: Leeds Beckett |

Minor, no text change needed: `ad(1939.67)` maps to about 2 September 1939 if the year fraction is
read as days over 365 (1 September is 1939.666). The key's text, not the fraction, carries the date,
so this only matters if the fraction is ever shown or compared to the day.

Not corrections, but worth modelling or saying later: from October 1902 the town lamps were lit from
half an hour after sunset until 11pm (CJ 10 Oct 1902), so a scene at midnight in 1902 to 1939 should
show the street lamps out; before 1902 the gas lamps were seasonal.

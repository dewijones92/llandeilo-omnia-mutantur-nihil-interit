---
title: Independent check of ripples-from-afar.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: Ripples from afar

Reviewed note: [`../ripples-from-afar.md`](../ripples-from-afar.md) (status: draft, written 2026-10-02,
untracked in the working tree at the time of this check; `main` at `43d86ea`). Nothing from the note
is in `src/content/` yet (a search for its sources and events in `src/content/*.ts` found none), so
every correction below is to the note, before it becomes app content.

## Method

- Every cited Welsh Newspapers Online page (S16 to S34, S36 to S40, S43) was downloaded and its OCR
  read as raw text with a keyword-in-context search, and the issue date was read from the page
  header. The *Cambrian* grain tables (S21 to S23, all eight issues) were read row by row.
- Full texts were downloaded and searched for S5 (Liber Landavensis, archive.org), S6 (Brut y
  Tywysogion, archive.org), S9 (Rees 1920, archive.org), S11 (Andrews, Project Gutenberg), S12
  (Thordarson and Self, PDF), S35 (Royal Society Krakatoa report, archive.org), S3 (Büntgen, PDF) and
  S10 (White et al., preprint PDF, 6 pages served). S1, S2, S14, S8, S41 and S42 were read from their
  pages. Abstracts for S4, S7 and S15 were read through the Europe PMC API.
- **Not re-read:** S13 (the note itself says title only), and the cross-note citations
  `effects:S18` and `victorian:S54`. `victorian:S54` is Wikipedia's "Cholera outbreaks and
  pandemics" page, so the Ystalyfera figure rests on Wikipedia alone.
- Distances were recomputed as great-circle figures from Llandeilo (51.884 N, 3.993 W).
- Second sources looked for: two WebSearch calls (Black Death at Llanllwch; 1849 cholera at
  Llandeilo) and one Welsh Newspapers search (which returns OR matches only and found nothing
  new). The Wikipedia *Llanllwch* article's wikitext was read for its citation.

## Summary

78 claims checked: **67 confirmed, 9 partly, 1 not supported, 1 contradicted.** The note is
unusually accurate: every quotation tested against the newspaper OCR, the Rees paper, the Brut and
the Liber Landavensis is there as quoted, every date matches the issue header, and every grain price
matches the table. The problems are of attribution and framing, not invention:

1. **Ystalyfera is about 12 miles from Llandeilo, not 20** (19 km by great circle). It is just
   outside the 10-mile circle, and its only source is Wikipedia (`victorian:S54`).
2. **"A very cold and wet summer" is not a Swansea description of 1816.** In S19 it is Burnet's
   description of 1692, quoted by the *Cambrian*, which itself says only that there is "a remarkable
   coincidence between the present season and that of 1692". The Summary and the table present it as
   the paper's own observation. S16 has a better witness in the paper's own words: "It has now
   rained, more or less every day, for nearly seventy successive days".
3. **The 1816 "contradiction" is framed across two crops.** Hay ruined (27 July, S16) against corn
   "of every appearance of abundance" (31 August, S18) is not a contradiction. The real tension is
   about hay: "in a very wretched state" on 27 July, then "mostly secured in a good state,
   considering the late unfavourable weather" on 31 August.
4. **Llanllwch: "all died" is contested.** Rees (S9) says the dozen *gabularii* "all died". J. E.
   Lloyd's *History of Carmarthenshire* (1935), as cited by Wikipedia, says eleven of the twelve died,
   in 1349 to 1350. Per the project rule, show both.
5. **The Yellow Plague is in the annals, not only in the legend.** S1, which the note read, carries
   the later-text additions to 547 (marked ‡ on the page as not in the Harleian MS): "Thus they say
   'The long sleep of Maelgwn in the court of Rhos'. Then was the yellow plague." So the name *Y Fad
   Felen* at 547 has an annal witness (B/C texts) as well as the Book of Llandaff. The 447 "Days as
   dark as night" entry is also a ‡ later-text addition, not part of the A text.
6. **1918 details:** the soldier home on leave who died of influenza is in S39 only; S38 has a
   different soldier on leave whose child had died. The Cwmdu death is a December funeral (*Carmarthen
   Journal*, 20 December), so it falls outside the October to November window the table gives.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

| # | Claim (note section) | Verdict | Evidence |
|---|---|---|---|
| 1 | Altai and Alpine tree rings show cooling after eruptions in 536, 540 and 547; LALIA 536 to about 660 (536 to 541) | C | S3 abstract: "unprecedented, long-lasting and spatially synchronized cooling following a cluster of large volcanic eruptions in 536, 540 and 547 AD"; "the interval from 536 to about 660 AD as the Late Antique Little Ice Age". https://www.blogs.uni-mainz.de/fb09climatology/files/2012/03/Buentgen_2016_NatureGeo.pdf |
| 2 | Annales Cambriae [537]: Camlann "et mortalitas" in Britain and Ireland (536 to 541) | C | S2: "[537] Gueith cam lann inqua arthur et medraut corruerunt . et mortalitas ... inbrittannia et in hibernia fuit"; S1: "537 The battle of Camlann ... and there was plague in Britain and Ireland". https://la.wikisource.org/wiki/Annales_Cambriae_A |
| 3 | The years are Phillimore's putative AD dates | C | S2 editorial note: "The third column shows the putative A.D. dates as suggested by Phillimore et al." |
| 4 | 447 "Days as dark as night" (536 to 541) | P | In S1, but enclosed in ‡, which the page defines as "entries which are not found in the Harleian MS, but which appear in a later version". Not in S2 (A text). https://sourcebooks.fordham.edu/source/annalescambriae.asp |
| 5 | Ancient DNA gives the Justinianic Plague in the British Isles; the abstract does not name the site or Wales (547) | C | S4 abstract: "genetic evidence for the presence of the Justinianic Plague in the British Isles, previously only hypothesized from ambiguous documentary accounts"; "Britain" appears only in the list of countries screened. https://doi.org/10.1073/pnas.1820447116 |
| 6 | [547] "Mortalitas magna inqua pausat mailcun rex genedotae" (547) | C | S2 verbatim; S1: "547 The great death [plague] in which Maelgwn, king of Gwynedd died" |
| 7 | The annals give only a "mortality" at 547; the Yellow Plague comes through the Teilo legend (Summary, 547) | P | S1 at 547 adds (later text, ‡): "Thus they say 'The long sleep of Maelgwn in the court of Rhos'. Then was the yellow plague." The annal tradition names it too |
| 8 | Liber Landavensis: Teilo could not stay at Llandaff for "the pestilence which nearly destroyed the whole nation ... the Yellow Pestilence ... a column of a watery cloud ... like a shower going through the bottom of vallies" (547) | C | S5 English text verbatim. https://archive.org/details/liberlandavensi00reesgoog |
| 9 | "It seized Maelgwn, King of North Wales" (547) | C | S5: "For it seized Maelgwn, King of North Wales, and destroyed his country" |
| 10 | Teilo and Samson planted groves "from Dôl as far as Cai" (547) | C | S5: "a great grove of fruit-bearing trees, to the extent of three miles, that is, from Dôl as far as Cai" |
| 11 | He returned when it "should depart and vanish from the whole island of Britain" (547) | C | S5: "ordered that the aforesaid pestilence, which was called the Yellow, should depart and vanish from the whole island of Britain" |
| 12 | Editor's notes: Maelgwn died in the church of Llanrhos; a Triad's "Yellow Plague of Rhôs"; Latin "pestis flava" (547; S5) | C | S5 notes: "(Y Fâd Felen,) in the church of Llanrhos, Carnarvonshire"; "The second Pestilence was the Yellow Plague of Rhôs"; Latin "venit flava pestis per majorem Britanniam" |
| 13 | Samalas: eruption ca. 1257 or 1258, largest stratospheric sulfur release of 7,000 years, May to October 1257 (1257) | C | S7 abstract, all three phrases. https://doi.org/10.1073/pnas.1307520110 |
| 14 | Brut 1257 and 1258 entries are war and oaths only (1257) | C | S6: 1257 Llywelyn subdues Cemaes, campaigns in Dyfed; 1258 "a body of the nobles of Wales made an oath of fidelity". The 1259 entry was not located by its year label in the OCR. https://archive.org/details/brutytywysogiono00cara |
| 15 | Brut 959: a great snow in March (1257, Others) | C | S6: "959. And, a year after that, a great snow happened in the month of March" |
| 16 | Brut 988: a great mortality through famine (Others) | C | S6: "And a great mortality took place among the men through famine" |
| 17 | Brut 993: a great famine in the territory of Maredudd (Others) | C | S6: "993. ... a great famine happened in the territory of Maredudd" |
| 18 | Brut 1252: drought, then floods that broke bridges and mills (1257) | C | S6: "the heat of the sun was so great ... no fruit grew"; "the rivers flooded so that the bridges and the mills and the houses adjoining the rivers were broken" |
| 19 | Brut 1197: "a dreadful season of mortality over all the isle of Britain and the borders of France", same year as the lament for the Lord Rhys, without saying he died of it (Others) | C | S6: "1197. The ensuing year there was a dreadful season of mortality over all the isle of Britain and the borders of France, so that innumerable of the common people died"; the next sentence begins the lament (Atropos) |
| 20 | English crop yields 40, 60 and 10 per cent below normal in 1315 to 1317; nothing Welsh in the summary (1315) | C | S8: "composite crop yields were about 40, 60 and ten per cent below their normal levels"; "Wales" appears only in the title. https://www.medievalists.net/2012/11/market-failure-during-the-great-famine-in-england-and-wales-1315-7/ |
| 21 | Rees: "contemporary chronicles throw no light" (1349) | P | S9 continues "with the exception of Geoffrey le Baker's reference to the spread of the disease to Wales by the year 1349". The quotation is cut before its qualification. https://archive.org/details/royal-historical-society-london-england-transactions_1920_3 |
| 22 | Llanllwch: the dozen *gabularii* "all died" (1349; table) | P | S9 confirms: "held 'at will' by a dozen gabularii, who all died". But J. E. Lloyd, *A History of Carmarthenshire* (1935), as cited by Wikipedia *Llanllwch*, says "Eleven of the twelve gafol-men died from the Black Death" (1349 to 1350). Contested. https://en.wikipedia.org/wiki/Llanllwch |
| 23 | The two officials of the Staple at Carmarthen died "about the end of March" (1349) | C | S9 verbatim |
| 24 | By 1353 land "lay waste and unmeasured for lack of buyers" (1349) | C | S9 (OCR hyphenated "un- measured") |
| 25 | Borough mill tolls and fisheries "seriously diminished and the fairs could not be held" (1349) | C | S9: "Miscellaneous revenues of the borough of Carmarthen, such as the mill-tolls and fisheries, were seriously diminished and the fairs could not be held" |
| 26 | "Serious ravages throughout the commotes of Ystrad Towy and Cardigan"; only "very general statements" possible (1349) | C | S9 verbatim |
| 27 | Officers unobtainable; advowry tenants "either died or fled"; 97 of 104 *gabularii* withdrew before midsummer in south Cardiganshire (1349) | C | S9 verbatim |
| 28 | A milder Second Pestilence 1361 to 1362, another in 1369 (1349) | C | S9: "The winter of 1361-62, however, saw another, though a milder, outbreak referred to as the Second Pestilence"; "until the summer of 1369" |
| 29 | No Llandeilo, Dinefwr, Talley or Dryslwyn entry in Rees (1349) | C | Keyword search of S9 for the four names in the Black Death pages: none |
| 30 | Huaynaputina preprint: "possible trigger"; Ireland's winter pastures; nothing British (1600) | C | S10: title verbatim; "In areas where cattle were kept on winter pastures, such as parts of Ireland"; no Britain, England, Wales or Scotland in the 6 pages served. https://doi.org/10.5194/cp-2021-82 |
| 31 | Andrews: Thames frost fairs; nothing Welsh on 1683-84 or 1739-40 (frosts) | C | S11: the only Welsh entries are the Prince of Wales and "Wales, slight frost of, 1763". https://www.gutenberg.org/ebooks/55375 |
| 32 | 1762 to 1763 frost "felt but slightly" in Cornwall, Wales and Ireland (frosts) | C | S11: "in Cornwall, Wales, and Ireland, this frost was felt but slightly"; index "Wales, slight frost of, 1763" |
| 33 | Laki: 122 Mt SO2 and a sulfuric aerosol veil over the Northern Hemisphere (1783) | C | S12 abstract: "emitted 122 megatons (Mt) SO2 ... maintained a sulfuric aerosol veil that hung over the Northern Hemisphere for >5 months". https://website.whoi.edu/gfd/wp-content/uploads/sites/14/2018/10/Thordarson_and_Self_2003_49078.pdf |
| 34 | Haze in Great Britain from 16 June to Michaelmas (1783) | C | S12: "According to Thoroddsen [1914] some sources indicate that the haze first appeared in Great Britain on 16 June; 'it remained for 2-3 months, and did not disappear until Michaelmass'" |
| 35 | Selborne: wheat "as if scorched with frost", "Sun was seen red through the haze" (1783) | C | S12 verbatim, citing White |
| 36 | Norfolk: "sun ... scarcely visible even at midday", "caused the corn to wither" (1783) | C | S12, citing Bryant 1783; S12 places Bryant's withering of corn in Norfolk |
| 37 | July 1783 second warmest in England after 1995 (1783) | C | S12 verbatim |
| 38 | Severe winter of 1783 to 1784 in Europe and North America (1783) | C | S12 abstract: "one of the most severe winters on record in Europe and North America" |
| 39 | No Welsh observation in S12 (1783) | C | No "Wales" or "Welsh" in the paper's text |
| 40 | Carmarthen, 1795: the brass Winchester measure dragged to the Dark Gate and destroyed (1795) | C | S14: "At Carmarthen, a large mob led by small farmers dragged the brass Winchester measure from the market place to the Dark Gate and destroyed it" (in the 1795 section). https://www.genuki.org.uk/big/wal/CornRiots |
| 41 | Carmarthen, about 1800-01: wheat 20s a Winchester bushel, barley 11s to 14s, soldiers called out against colliers (1795) | C | S14 verbatim, in the 1800 to 1801 section |
| 42 | Tambora, April 1815, led to the "Year Without a Summer" of 1816 (1815) | C | S15 abstract verbatim. https://doi.org/10.1002/wcc.407 |
| 43 | *Cambrian* 27 July 1816: rivers overflowing in Glamorgan and Carmarthenshire, hay "in a very wretched state"; "no confidence in fine and flattering mornings" (1815) | C | S16, header "Cambrian 27th July 1816". It adds "It has now rained, more or less every day, for nearly seventy successive days", which the note does not use. https://newspapers.library.wales/view/3323815/3323818/10/ |
| 44 | *North Wales Gazette* 1 August 1816 carries the same report (1815) | C | S17: "severe losses having been sustained [in Glamorgan]shire and Carmarthenshire, by the rivers overflowing" |
| 45 | *Cambrian* 31 August 1816: South Wales crops "wear every appearance of abundance"; hay "mostly secured in a good state" (1815) | C | S18 verbatim; the paragraph is the paper's own (it names South Wales; the following Manchester item is the one credited to the *Staffordshire Advertiser*). https://newspapers.library.wales/view/3323840/3323843/10/ |
| 46 | "A very cold and wet summer" noted in Swansea (Summary; table: "the cold summer is region") | NS | S19: the paper writes only "There is a remarkable coincidence between the present season and that of 1692", then quotes Burnet's *History of his own time* on 1692: "a very cold and wet summer; great deluges of rain continued till the very time of reaping". The quoted words describe 1692 England. The detail section words this correctly. https://newspapers.library.wales/view/3323860/3323864/14/ |
| 47 | Sunspots in the same column (1815) | C | S19: "Some spots on the sun's disc have re-appeared" |
| 48 | A contradiction: cold, wet, hay ruined [S16][S19] against an abundant harvest [S18] (1815) | P | Both sides are in the sources, but they are different crops. The like-for-like tension is hay: "very wretched" (S16, 27 July) against "mostly secured in a good state, considering the late unfavourable weather" (S18, 31 August) |
| 49 | A riot "as related, in Carmarthenshire" denied, "infernal machinations of scoundrels", in a London paper reprinted (1815) | P | S20 confirms both quotations ("there has not been riotous proceedings, as related, in Carmarthenshire"). That it is a London paper is inferred ("Here, as in London"), not stated. https://newspapers.library.wales/view/3873255/3873257/4/ |
| 50 | Carmarthen wheat 97s 8d, 90s 8d, 112s 0d, 93s 2d, 94s 10d (2, 9, 23, 30 Nov, 14 Dec 1816) (1815) | C | S21, all five tables read: Carmarthen row 97 8 / 90 8 / 112 0 / 93 2 / 94 10. The unit ("per quarter") is not printed in the OCR'd header; it is the usual unit of these returns. https://newspapers.library.wales/view/3323895/3323899/14/ |
| 51 | Carmarthen wheat 92s 4d, 8 November 1817 (1815) | C | S22: "Carmarthen- 92 4". https://newspapers.library.wales/view/3324000/3324004/15/ |
| 52 | Carmarthen wheat 69s 6d (22 Jan 1820) and 55s 10d (14 Oct 1820) (1815) | C | S23: "Carmarthen. 69 6" and "Carmarthen 55 10". https://newspapers.library.wales/view/3324550/3324554/18/ |
| 53 | *Welshman* 21 Dec 1849, "Llandilo": subscription to fit up a "receptacle" for destitute cholera patients; few cases; balance spent on clothing for the poor; Lord Dynevor and Col. Rice Trevor £10 each (1849) | C | S24, header "The Welshman 21st December 1849": "LLANDILO.—During the late epidemic a considerable sum of money was subscribed ... erecting a receptacle"; "to apply the proceeds in [the purchase] of clothing and other necessaries for the des[titute] p[oor] of the town"; "£10 each ... Lord Dynevor and Col. Rice Trevor, M.P." https://newspapers.library.wales/view/4347024/4347026/11/ |
| 54 | The gap-filled reading "[only a] few cases ... in the [town and neighbour]hood" (1849) | P | The OCR reads "...few cases of cholera having occurred in the ￼ d were ￼ malh hood". "few" and "-hood" are legible; "town and neighbour" is a reasonable guess but not legible. The note already says this; the paragraph also says "a large balance therefore remains in hand" |
| 55 | Pensarn inquest, 1849: doctor said cholera, jury found "cramp, cholic, and diarrhoea" (1849) | C | S25: "Pensarn, near this town, upon the body of [a woman] who it was supposed had died from Asiatic Cholera ... Died from cramp, cholic, and diarrhoea." Header 27 July 1849 |
| 56 | A rumoured cholera death on a vessel from Tenby; inquest at the Town Hall (6 July 1849) | C | S26: "a death had resulted from Cholera ... on board the Phœnix while on her passage from Tenby to this port. An inquest was held ... at the Town Hall" |
| 57 | 1832: a Newcastle surgeon from a family near Llandeilo died at Llanstephan of fatigue from cholera nursing, to be buried in Llandilo Church; where he nursed is not stated (1832) | C | S27, *Cambrian* 17 Nov 1832: "surgeon, of Newcastle-upon-Tyne, eldest son of the late Dr. Parr, M.D., of Pentre Parr, near Llandilo ... fell a sacrifice to fatigue occasioned by attendance on the cholera patients ... to be deposited ... in Llandilo Church" |
| 58 | *Welshman* 5 Sept 1845: county potatoes promise an abundant yield, unlike southern and western England (1845) | C | S28 verbatim |
| 59 | *Pembrokeshire Herald* 9 Oct 1846: "In the neighbourhood of Carmarthen, all the potatoes ... exhibited signs of the attack within the space of a few days, if not a few hours" (1845) | C | S29 verbatim |
| 60 | ...after "a Carmarthen gardener replanted" (1845) | P | S29: the replanted rows were "in the garden of Mr. Thomas Evans, gas-fitter, in Friar's Park, Carmarthen", so a gas-fitter's garden, not a gardener |
| 61 | *Pembrokeshire Herald* 2 July 1847: "several Irish paupers were encamped in different parts of the county" (1845) | C | S30 verbatim (Quarter Sessions, "IRISH POOR"); the report gives no reason |
| 62 | Thomas Jenkins, 8 January 1848: "I was taken very ill with the influenza", two days after his wife died (1848) | C | S42: "Jany 6 ... my dear Ann left me ... Jany 8 I was taken very ill with the influenza", following entries headed 1847. https://llandeilo.org/tj_crickets.html |
| 63 | *Welshman* 27 Oct 1865: Carmarthen and Cardigan without precautions; plague "very close upon us"; spread "in railway trucks, and in the clothes of farmers and drovers" (1865) | C | S31 verbatim (OCR "raihvav t,„") |
| 64 | August 1866: Pembrokeshire justices licensing cattle fairs under cattle-plague orders (1865) | C | S32: "CATTLE PLAGUE. COUNTY OF PEMBROKE ... have granted their licences for the holding of a FAIR for the sale of Cattle" (18 August 1866) |
| 65 | *Cambrian* 21 Dec 1883: afterglows of "English and Welsh skies during the last couple of months"; "a peculiar condition of the atmosphere"; the morning's foreglow (1883) | C | S33 verbatim. https://newspapers.library.wales/view/3337060/3337065/37/ |
| 66 | *Wrexham Advertiser* 14 Dec 1883: the sun over the Berwyn "went down in a great sea of brilliant blood colour ... the afterglow lasting two hours" (1883) | C | S34 verbatim ("on Tuesday night") |
| 67 | Royal Society report lists glows at Beaumaris in late November; Welsh entries few (1883) | C | S35: "Nov. 28. Glows seen. Beaumaris, N. Wales ('Daily Chronicle,' December 6)". Beaumaris is the only Welsh place found in the index |
| 68 | *Amman Valley Chronicle* 31 Oct 1918: "heavy toll on Llandilo and district", many in bed, several deaths, places of worship sparsely attended, day and Sunday schools closed (1918) | C | S37 verbatim. https://newspapers.library.wales/view/4014130/4014133/24/ |
| 69 | *Carmarthen Weekly Reporter* 1 Nov 1918: "The town and locality is in the grip"; all schools closed; Sunday schools closed at the Medical Officer's request (1918) | C | S36 verbatim. https://newspapers.library.wales/view/3716485/3716488/28/ |
| 70 | Two of the three doctors ill, leaving one elderly doctor (1918) | C | S36: "both Drs Lloyd and Phillips are among its victims, so that only Dr Davies is left ... at his advanced age" |
| 71 | Deaths at Trap and Ffairfach, one a former Llandilo Bridge Mart secretary who "probably contracted the complaint by visiting sufferers" (1918) | C | S36 verbatim (Trap spelled "Trapp") |
| 72 | *Cambria Daily Leader* 14 Nov 1918: an influenza death in Rhosmaen Street (1918) | C | S40: "Rhosmaen-street, Llandilo, from influenza" |
| 73 | *Carmarthen Journal* 15 Nov 1918: at Ammanford "All the schools in the area had been closed" (1918) | C | S43: Medical Officer's report to the Urban Council meeting held "on Wednesday night in last week": "All the schools in the area had been closed, a very large number of children being sufferers" |
| 74 | 21 and 23 Nov 1918: schools "have again re-opened", epidemic abating (1918) | C | S38: "The Elementary Schools and County School have again re-opened. This is a good sign that the influenza epidemic is abating"; S39: "This indicates that influenza is abating locally" |
| 75 | "A soldier home on leave from France died of it" [S38][S39] (1918) | P | Only S39: "who came home on leave a short time ago, after serving four years in France, has succumbed to influenza". S38's soldier on leave is a father whose child had died |
| 76 | A December death at Cwmdu, "influenza followed by pneumonia" (1918) | C | S43 (20 Dec 1918, "CWMDU, LLANDILO"): "influenza followed by pneumonia being the cause of death". It is a December funeral, outside the table's "Oct to Nov 1918" |
| 77 | Hansard 20 June 1986: 21-day ban on moving and slaughtering sheep in designated areas of south-west Cumbria and parts of north Wales; nothing for Carmarthenshire (1986) | C | S41: "prohibit for the next 21 days the movement and slaughter of sheep within the two areas designated in South West Cumbria and parts of North Wales". https://api.parliament.uk/historic-hansard/lords/1986/jun/20/chernobyl-accident-movement-of-sheep |
| 78 | Ystalyfera "about 20 miles away" (table; 1866) | X | Ystalyfera (about 51.77 N, 3.78 W) is 19 km, about 12 miles, from Llandeilo by great circle. Source for the outbreak is Wikipedia only (`victorian:S54`) |

Distances in the table were also recomputed and match: Laki 1,586 km, Chernobyl 2,332 km,
Huaynaputina 9,959 km, Krakatoa 11,866 km, Samalas 12,798 km, Tambora 12,886 km, Carmarthen 22 km
(14 miles). They are folded into claim 78's method rather than counted separately.

## Corrections needed

None of these has reached `src/content/` yet. Each is to the note, before anything is built from it.

1. **Ystalyfera distance** (Summary table row "Cholera (fourth pandemic)" and "1832, 1849 and 1866").
   - Current: "about 20 miles away".
   - Corrected: "about 12 miles (19 km) away, just outside the circle".
   - Also mark the outbreak single-source (Wikipedia); a primary report from the 1866 Welsh papers is
     needed before it carries a number such as 119 deaths.
2. **The 1816 "cold and wet summer"** (Summary bullet 2; Summary table row "Tambora"; detail
   "1815 to 1817").
   - Current: 'a "very cold and wet summer" noted in Swansea'; '"very cold and wet summer" (Swansea
     paper)'; "the cold summer is region".
   - Corrected: the *Cambrian* (27 July 1816) says "It has now rained, more or less every day, for
     nearly seventy successive days" [S16]; on 28 September it likens "the present season" to 1692,
     quoting Burnet's "a very cold and wet summer" about that year [S19]. Wet is documented in the
     paper's own words; cold is only by the paper's comparison.
3. **The 1816 contradiction** (detail "A contradiction, kept side by side").
   - Current: cold, wet, ruined hay against "an abundant corn harvest".
   - Corrected: hay "in a very wretched state" (27 July) [S16] against hay "mostly secured in a good
     state, considering the late unfavourable weather" (31 August) [S18]; corn crops then looked
     abundant [S18] while Carmarthen wheat stayed above 90s through late 1816 and 1817 [S21][S22].
4. **Llanllwch** (Summary table row "Black Death"; detail "1349").
   - Current: "Llanllwch tenants all died".
   - Corrected: "all twelve died (Rees 1920), or eleven of twelve in 1349-50 (Lloyd 1935, as cited
     by Wikipedia)". Read Lloyd directly before treating the second figure as checked.
5. **The Yellow Plague at 547** (Summary bullet 2; table row "Plague"; detail "547").
   - Current: the annals record only a "great mortality"; the Teilo legend is the Yellow Plague's
     only thread.
   - Corrected: add that the later texts of the annals (shown ‡ in S1) add at 547 "The long sleep of
     Maelgwn in the court of Rhos. Then was the yellow plague." The local thread is still only the
     Teilo legend; the name now has an annal witness as well as the Book of Llandaff. The open
     question about the B and C texts is partly answered.
6. **447 "Days as dark as night"** (detail "536 to 541"): say it is a later-text addition, not in
   the Harleian A text.
7. **1918** (Summary table row; detail "Autumn 1918").
   - The soldier's death cites [S38][S39]; cite [S39] only.
   - The table's "Oct to Nov 1918" and "deaths in town, Ffairfach, Trap, Cwmdu": say the Cwmdu death
     was in December.
8. **Rees quotation** (detail "1349"): give the rest of the sentence, "with the exception of Geoffrey
   le Baker's reference to the spread of the disease to Wales by the year 1349".
9. **1846 potatoes** (detail "1845 to 1847"): "a Carmarthen gardener" should be "a gas-fitter's
   garden in Friar's Park, Carmarthen" [S29].
10. **1816 riot** [S20]: "a London paper" is inferred from the text, not stated in it; say so.

## For the owner's decision

- **The 1849 cholera house stays single-source.** One Welsh Newspapers search and one web search
  found no second report. It is the strongest "here" evidence for the 19th century, so a second
  witness (the *Carmarthen Journal*, the Llandilo Fawr Union minutes) is worth finding before it
  becomes a scene rather than a card.
- **Ystalyfera at 12 miles** is just outside the circle. Whether the 1866 cholera appears as a
  ripple card ("nearest recorded outbreak") is a content choice.
- **Status of the note:** with corrections 1 to 5 applied, the note could move from `draft`. Its
  quotations and dates held up throughout.

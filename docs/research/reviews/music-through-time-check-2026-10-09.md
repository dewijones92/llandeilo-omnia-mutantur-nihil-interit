---
title: Independent check of music-through-time.md
kind: review
status: current
updated: 2026-10-09
---

# Independent check: Music in and around Llandeilo

Reviewed note: [`../music-through-time.md`](../music-through-time.md) (status: draft, updated 2026-10-02, last
changed in commit `6d1a2d6`). Repo state: `ac914c6` (v0.5.0), working tree clean. The note and `src/content`
were unchanged during the check.

## Method

- Every source reachable by command line was downloaded and read as raw text, not through a summarising
  fetch: S1, S3, S8, S19 from the Internet Archive text layers (OCR, so numbers and spellings were read
  in context); S4 from Project Gutenberg; S9 and S17 from the PDFs; the DWB, Coflein, Museum Wales, Dig It!,
  ScARF, Nation.Cymru, NLW, People's Collection and choir pages as HTML text; S25 and S26 from the Welsh
  Newspapers Online page text.
- **Every recording in the playable table** (19 Commons files, including the two Robin Huw Bowen tracks named
  in the heading but not linked) was checked through the MediaWiki API: licence, performer, album, year,
  categories, and for Handel, Madge Breese and Calon Lân the raw wikitext. The four Internet Archive items
  were checked through the archive.org metadata API.
- S27 (Welsh Newspapers phrase searches) was re-run, sorted by date ascending, and the earliest hits were
  opened.
- Four web searches were used (Rutland tour dates, US term for 1947-56 recordings, Crugybar tune, one
  retry). Nominatim and grid-reference arithmetic were used for distances.
- **Not done:** hymnary.org (S29) is still a proof-of-work wall, so it was not bypassed. effects:S7, effects:S10
  and victorian:S32 were not re-fetched (already checked by their own reviews, 2026-10-02 and 2026-10-03).
  The Brut's 1176 name dispute (Cibon / Eilon) was not settled: the BBC blog behind S2 was not read and no
  modern edition was available. The Rutland tour's year could not be confirmed. No audio was listened to.

## Summary

91 claims checked: **69 confirmed, 15 partly, 3 not supported, 4 contradicted.** Four more rows (marked U) are
inferences or unmeasurable and are not counted, and the items under "Not re-checked" are not counted either.

**Licences: no problem with the recordings as stated.** All 19 Commons files exist and carry the licence the
note gives (15 CC BY-SA 3.0 Sain files with VRT ticket 2017050910011681 confirmed on the Calon Lân page,
Salve Regina CC BY-SA 3.0, Rorate Caeli CC BY-SA 4.0, Carnyx CC BY-SA 3.0, Madge Breese public domain,
Handel public domain). The four Internet Archive licence fields are as stated and, as the note says, are
the uploaders' claims. **Two licence points the note does not make** (see L1 and L2 under Licences): the 1953
Handel recording is public domain in the EU template only, and the 1944 Thomas L. Thomas recording has the
same US problem. No music asset is in the app yet, so nothing shipped is affected.

**The only app content citing the note is `lamplight.ts:93` (`music:S3`), and it is right** on the candle-bearer
and the protection wording (both quoted exactly in S3). One sentence in its basis needs a correction (below).

The corrections that matter, in order:

1. **Contradicted: the chief of song does not sing to the queen.** S3 (Dimetian Code, Book I, "Of the chief of
   song", 5) gives the queen's-chamber songs to the **bard of the household**, "three elaborate songs, in a
   moderate voice, so as not to disturb the hall".
2. **Contradicted: ballad singers at fairs are not Tudor or Stuart.** S23 is about the 18th century, and says
   printing restrictions relaxed only "at the end of the seventeenth century".
3. **Contradicted: S27's "1890s to 1910s".** The same searches return Llandilo Choral Society in *The Welshman*
   of 18 July 1856, the Llandilo brass band in *The Welshman* of 9 June 1865, and the Llandilo Volunteer Band
   from 1881. Open question 8 is partly answered.
4. **Not supported: "the one Premonstratensian habit that is attested [S10]"** (row 23; row 22 is partly). S10 describes the Order today
   (the Use was "effectively abandoned" at the post-conciliar reforms). Nothing read dates a Marian anthem to
   Talley or to the Middle Ages.
5. **Not supported: S19 "a blind harper at an inn".** It was at **Abergwili** (the bishop's house), at dinner
   and tea. The note's own S20 line has Abergwili right.
6. **Partly: "Christmas 1176" from the Brut.** S1 never says Christmas. Only S2 (Wikipedia, citing
   the BBC blog) does.
7. **Contradicted: S30 "Carmarthen 1914".** The list has no 1914 Eisteddfod; Carmarthen is 1911.
8. **Not supported: "the brief placed Lewys Glyn Cothi at Pumsaint".** The frozen brief does not say so.

## Claims checked

Verdicts: **C** confirmed, **P** partly, **NS** not supported by the cited source, **X** contradicted.

### Iron Age and Roman

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Llyn Cerrig Bach trumpet: "Irish" type, curved horn "with a narrow mouth and a flaring bell", riveted tube section, 150 BCE-50 CE [S35] | C | S35: "Portion of trumpet of 'Irish' type"; "An Iron Age musical instrument, 150 BCE-50 CE ... riveted bronze cylinder section"; "a narrow mouth and a flaring bell"; category "Votive deposit". https://museum.wales/collections/online/object/8b9be422-c1c7-3133-88b2-4e99a55e0a37/Iron-Age-copper-alloy-trumpet/ |
| 2 | "deposited with over 150 metal objects in a lake" | P | Not in S35, which says "wet meadow which formed the margin of Llyn Cerrig Bach", found 1942-43. Wikipedia, Llyn Cerrig Bach: "over 150 Iron Age metal objects ... placed in the lake", 181 recorded. Cite that, and say the margin of the lake |
| 3 | Anglesey is "100+ miles away" | P | 97 miles straight-line from Llandeilo (Valley to Llandeilo). "About 100 miles" |
| 4 | Deskford carnyx: sheet bronze and brass, c. AD 80-200, found c. 1816, replica 1992 by John Purser and John Creed [S34] | C | S34: "found ... around 1816"; "crafted from sheet bronze and brass"; "c.80-200 AD"; "In 1992, a replica was made by musicologist Dr John Purser and metalsmith John Creed". https://www.digitscotland.com/unearthing-scotlands-musical-past-through-archaeology/ |
| 5 | Carnyx "warriors, ceremony (the source's interpretation)" | C | S34: "an Iron Age war trumpet"; "ended its life as a sacrificial offering" |
| 6 | Lyre bridge, burnt wooden, notches, c. 300 BC, "most likely a lyre", High Pasture Cave [S33][S34] | C | S34: "wooden bridge, with notches where strings would've been placed ... most likely a lyre"; "approximately 300 BC". S33: "the earliest evidence for a stringed instrument in Western Europe". The note's "S34 quotes S33's author" is right: S34 names Steven Birch |
| 7 | Carnyx.ogg: "Kabuto 7", own work, 2012-05-06, CC BY-SA 3.0, instrument unstated [S39] | C | Commons API: Artist "Kabuto 7", date 2012-05-06, CC BY-SA 3.0, "Own work". The description says "Sound of the carnyx" but not whether original, replica or synthesis |

### Early medieval and the princes of Deheubarth

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 8 | 1176 festival at Aberteifi: "two sorts of contention", bards and poets / "harpers, fiddlers, pipers, and various performers of instrumental music"; two chairs; proclaimed a year ahead [S1] | C | Williams ab Ithel's translation, p. 229 (text layer l. 15862-15911): "appointed two sorts of contention ; one between the bards and poets, and the other between the harpers, fiddlers, pipers, and various performers of instrumental music ... two chairs ... proclaimed a year before it was held". https://archive.org/details/brutytywysogiono00cara |
| 9 | "son to Cibon the fiddler"; "mab i Cibon Grythwr" in brackets as a variant-manuscript insertion; *crythwr* rendered "fiddler" [S1] | C | Welsh text: "[mab i Cibon Grythwr]" with note "E."; the Preface says bracketed words are "additional facts ... enclosed within brackets" from the other copies, and manuscript E is the Guttyn Owain copy. English: "son to Cibon the fiddler" |
| 10 | "Christmas 1176" | P | S1 does not say Christmas (the passage is under the year 1176 only). S2: "held at Cardigan Castle over Christmas of 1176", citing the BBC blog "The first eisteddfod - Christmas 1176". The same label sits in `era-medieval-to-1282.md` line 52 as "Cross-checked (Brut ...)": that cross-check does not cover the date of year |
| 11 | S2: "the son of Eilon the Crythwr", citing a BBC blog; Turvey's Puy conjecture | C | Wikipedia 1176 Cardigan eisteddfod; refs 1-5 are Phil Carradice, BBC News, 22 Dec 2010. Hywel Teifi Edwards: "It's conjecture". https://en.wikipedia.org/wiki/1176_Cardigan_eisteddfod |
| 12 | Cardigan is "about 35 miles away" | P | 31.6 miles straight-line (Nominatim coordinates). "About 30 miles" |
| 13 | Bard of the household: "a harp from the king, and a gold ring from the queen"; "never to part with the harp"; before battle the "Monarchy of Britain" [S3] | C | Dimetian Code, Book I, xviii: "he is to have a harp from the king, and a gold ring from the queen; and he is never to part with the harp"; "if there be preparation for battle, let him recite the song called the 'Monarchy of Britain' before them". https://archive.org/details/bub_gb_4_qi_6p1ZucC |
| 14 | Chief of song: "a bard who shall have gained a chair"; "not of the number of the officers of the palace"; "two songs ... one of God, and another of kings" at the hall entrance; the household bard "the third song" | C | Dimetian Code, Book I, xxv, 3, 4 and 8, word for word |
| 15 | The chief of song "sings to the queen 'in a moderate voice, so as not to disturb the hall'" | X | xxv, 5: "When the queen shall will to hear a song in her chamber, let the **bard of the household** sing to her three elaborate songs, in a moderate voice, so as not to disturb the hall." The Welsh text agrees ("canet y bard [teulu] idi tri diamnaer o gerd") |
| 16 | "Three legal harps": king's and chief of song's at six score pence each, key twelve pence; an uchelwr's at three score | C | Dimetian Code, Book II (text layer l. 35056): "the harp of the king; and the harp of the chief of song ... six score pence; and the tuning key of each, twelve pence; and the harp of an uchelwr ... three score pence". Worth adding: the Venedotian Code gives different figures (a *gwrda*'s harp, keys 24 pence), l. 9617 |
| 17 | "a harp to one, a crowd to another, and pipes to a third"; minstrels "who have left off the hair-strung harp"; youths "learning the harp" (Anomalous Laws) | C | Anomalous Laws, text layer l. 62441-62485 (translation column), word for word |
| 18 | Gerald: harps in each house for guests; "the harp, the pipe, and the crwth"; singing "in many different parts" [S4] | C | Description of Wales, I.xii-xiii: "each house has its young women and harps allotted"; "They make use of three instruments, the harp, the pipe, and the crwth or crowd"; "not ... in unison ... but in many different parts". https://www.gutenberg.org/cache/epub/1092/pg1092.txt |
| 19 | Harp "with 'rapid' fingers, 'they always begin from B flat'" as a description of Welsh households | P | The words are there, but the paragraph is introduced "I shall briefly repeat what is set forth in our Irish Topography on the subject of the musical instruments of the three nations". It is Gerald's general claim for Ireland, Scotland and Wales, not a Welsh observation. The B flat also appears in his Welsh part-singing paragraph, so the claim stands for Wales |
| 20 | Caution: the laws are prescriptive, in manuscripts later than Hywel Dda, an 1841 edition and translation [S3] | C | Preface: the base manuscript of the Dimetian Code (Titus D. ix) is "the most ancient and complete exemplar", "written about the close of the thirteenth or early part of the fourteenth century". See note correction 17 |
| 21 | Rhys was lord of Dinefwr, so "the same court culture was at home in this valley" | U | Inference, labelled as regional in the note. S3's introduction adds that the Dimetian Code records alterations by "Rys, son of Grufudd, Prince of that district, about 1180" |

### Talley Abbey

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 22 | Office and Mass sung in "a variant on the 'Gregorian' chant of the Roman Rite", each hour ending "with an anthem sung in honour of the Blessed Virgin Mary" [S10] | P | The quotes are exact, but S10 is the Order's present practice ("Our canonry sings ..."; "The Premonstratensian Use ... was effectively abandoned at the time of the post-conciliar reforms"). It says nothing about Talley or the Middle Ages. https://www.norbertines.org.uk/the-order/liturgy |
| 23 | The Marian anthem is "the one Premonstratensian habit that is attested [S10]" for the honest reconstruction | NS | Same source, same reason. S9 (King) has no word on Marian anthems |
| 24 | 1130 statute: "missal, gospel-book, epistle-book, collectar, gradual, antiphoner, hymnal, psalter, lectionary and calendar" [S9] | C | King: "a statute of 1130 insisted upon uniformity in the books ... The books were said to include missal, gospel-book, epistle-book, collectar, gradual, antiphoner, hymnal, psalter, lectionary and calendar" |
| 25 | English visitation reports: chant *secundum formam nostre religionis* | C | S9: "frequent injunctions in the visitation reports of the English houses that the chant must be secundum formam nostre religionis" |
| 26 | Mid-13th-century psalmody: "viva voce ... sed non cum protractione dictionum", pause to take breath | C | S9, Usus I: "Psalmodia viva voce cantatur, sed non cum protractione dictionum. Ad nostrum talis fit pausatio ut sufficienter possit spiritus resumi" |
| 27 | "impossible to determine the content of these early rites, prayers and chants"; "quid sit cantus Premonstratensis nescimus" | C | S9, both word for word (the second from an inquiry in "the first quarter of the 17th century") |
| 28 | Talley: Premonstratensian, founded c. 1185 | C | Wikipedia, Talley Abbey: "founded by Rhys ap Gruffydd in or about 1185". The 1536 end date was not verified here (the medieval note carries it) |

### Later medieval

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 29 | Gruffudd ap Nicolas: approver of Dynevor 1425, farmer of the lordship 1439 [S5] | C | DWB: "king's approver for the lordship and new town of Dynevor in 1425 ... farmer of the lordship of Dynevor in 1439". https://biography.wales/article/s-GRUF-APN-1425.html |
| 30 | Praised by Dafydd ab Edmwnd, Hywel ap Dafydd ap Ieuan ap Rhys, Rhys Llwyd ap Rhys ap Rhicert, Gwilym ap Ieuan Hen and Lewys Glyn Cothi | C | DWB, word for word |
| 31 | The mid-15th-century Carmarthen eisteddfod: judge, chair to Dafydd ab Edmwnd, "revised the bardic metres and regulated the bardic fraternity"; "three months at his cost at Dynevor" or a fortnight at Carmarthen; "reports vary between 1451 and 1453" | C | DWB, all word for word. DWB prefaces the metres claim with "It is pretty certain also" |
| 32 | Owain "heir of Bryn y Beirdd" | C | DWB: "Owen heir of Bryn y Beirdd, and Lewis Glyn Cothi's companion in hiding" |
| 33 | Lewys Glyn Cothi: "perhaps at Pwllcynbyd in the parish of Llanybydder"; "sang much to the gentry of Carmarthenshire, south Cardiganshire, and Radnorshire" [S6] | C | DWB, word for word. https://biography.wales/article/s-LEWI-GLY-1447.html |
| 34 | S6 "names Gruffudd ap Nicolas and Jasper Tudor among his patrons" | P | S6 names **Owen ap Gruffudd ap Nicholas** (outlaw with him), calls Jasper Tudor "his hero", and says he sang to Yorkist "patrons". Gruffudd himself is named as a subject of Lewys's praise only in S5 |
| 35 | Pwllcynbyd "about 15 miles away, outside the circle" | U | Pwllcynbyd was not found on a gazetteer. Llanybydder village is 14.7 miles from Llandeilo, but the parish is larger, so the farm could be nearer than 15. Keep it as inference |
| 36 | "The brief placed Lewys Glyn Cothi at Pumsaint" | NS | The frozen brief (`briefs/music-through-time.md`) never mentions Pumsaint. It says only "Lewys Glyn Cothi, the Rhys family". If the claim came from another conversation, it is not in the repo record |
| 37 | Cwrt Bryn-y-Beirdd, Dyffryn Cennen, SN 6633 1809, "16th century or earlier", "3 tre-foiled lancets" [S7] | C | Coflein NPRN 103976, word for word; "Dyffryn Cennen" is in an image caption. https://coflein.gov.uk/en/site/103976 |
| 38 | About 3.5 miles south-east of Llandeilo | C | 3.3 miles, bearing south-east (grid arithmetic) |
| 39 | Edward Jones 1794: "Court Brynn y Beirdd, the Court-hill of the Bards, near Llandeilo-vawr" | C | Text layer: "Court Brynn y Beirdd, the Court-hill of the Bards, near Llandeilo-yawr, Carmarthenshire" (OCR y for v). Archive metadata confirms the 1794 edition |
| 40 | Jones: an eisteddfod at Carmarthen "about the year 1460" (OCR garbled) | C | The text layer is too damaged to quote; the note already says so |
| 41 | The vicar in 1865 put the Carmarthen eisteddfod "in the reign of Edward IV, patronized by Gruffydd ap Nicholas, an ancestor of the present Lord Dynevor" [S26] | C | Welshman, 2 June 1865, the vicar's opening address, word for word. Edward IV's reign begins in 1461, as the note says |

### Robert ap Huw

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 42 | About 71 pages; composers "from c.1340 to c.1485"; "over 300 pieces" catalogued in 16th-century manuscripts; part copied from Wiliam Penllyn [S11] | C | Dooley page, word for word. http://pauldooley.com/aphuw_pages/manuscript.html |
| 43 | c. 1613; BL Add. MS 14905; 31 compositions plus the "twenty-four measures" [S12] | C | Wikipedia: "Around 1613 ... include 31 in tablature notation ... supplemented by ... 'twenty-four measures'". Same page says the pieces "date from between 1340 and 1500" |
| 44 | Summary: the manuscript "is the only surviving source of the old harp music" | P | Wikipedia's own lead says "the main extant source" and its body "the only reliable source". Dooley says only "the oldest collection of harp music in existence". "Only" is S12's, and S12 is a lead. Write "the main surviving source" |
| 45 | Played with "horsehair or low-tensioned gut strings", bray pins (*gwrachïod*), Pythagorean tuning; tunings *is gywair*, *cras gywair*, *go gywair* [S16] | C | Taylor, word for word. https://www.billtaylor.eu/index.asp?pageid=74247 |
| 46 | Taylor: "some of the patterns remain slightly ambiguous"; "several mistakes"; "replica instruments ... authentic fingernail technique" | C | Taylor, word for word |
| 47 | Greenhill 1995: "no set of precise definitions for all its symbols ... has yet been proposed"; chords "organised on some system alien to the tonic-dominant principle" [S17] | C | Preface and synopsis text, word for word. https://www.cl.cam.ac.uk/archive/rja14/musicfiles/manuscripts/aphuw/aphuw-s.pdf |
| 48 | Paul Dooley recorded pieces in Greenhill's arrangements [S17] | C | Index page: "Paul Dooley made a recording of some of Peter's arrangements" (not in the PDF itself) |
| 49 | Bibliography: Dolmetsch 1937, Dart 1968, Whittaker 1974, Ellis 1977 and 1980, Greenhill 1976 and a five-volume dissertation 1995-2000, *Welsh Music History* 3 (1999) with Harper, Greenhill, Taylor, Whittaker and Evans, Harper 2007 [S14] | C | Lindahl bibliography, each entry. http://www.pbm.com/~lindahl/ap_huw/biblio.html |
| 50 | "Interpreting the manuscript is quite difficult" [S14] | C | It is on Lindahl's introduction page (`intro.html`), not the bibliography URL cited |
| 51 | Bragod and Bill Taylor lead the revival [S12] | C | Wikipedia, word for word |
| 52 | Dart (1968, vol. 21): Crossref says March 1968; Wikipedia says 1963 | C | Crossref: Galpin Society Journal 21, issued 1968-03, p. 52. Wikipedia's citation reads "Dart, Thurston (1963)", as the note says |
| 53 | IMSLP: complete facsimile, scanned by Greg Lindahl, 121 pages, "Public Domain", "Manuscript, 1567" [S15] | C | IMSLP page, each item. Public Domain is IMSLP's tag; the note's plan to use "our own reading of the facsimile" avoids relying on it |
| 54 | "Bill Taylor's, Paul Dooley's and Bragod's recordings are commercial [S14]" | P | S14 lists Taylor (*Two Worlds of the Welsh Harp*, Dorian, 1999) and Dooley (a CD "See pauldooley.com"). It lists no Bragod recording, only Bragod's website |
| 55 | New: Taylor dates *Welsh Music History* vol. 3 to 1995; S14 says 1999 | U | A source contradiction the note does not record. Volume 3 appeared in 1999 per S14's bibliography, so Taylor's page is probably wrong, but only S14's date was confirmed |

### Tudor and Stuart

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 56 | Prys, *Salmau Cân* (1621), published with the Book of Common Prayer, "in a metre better adapted for setting to music", "the first Welsh book in which music was printed" [S18] | C | DWB, word for word (the last phrase is DWB quoting another source). https://biography.wales/article/s-PRYS-EDM-1544.html |
| 57 | A *baledwr* sang new ballads "during a fair, market or gwylmabsant festival" to named tunes; listed under Tudor and Stuart [S23] | X | The sentence is right, but S23 is "the rise of the baled in the eighteenth century": printing restrictions "relaxed at the end of the seventeenth century", "by the dawn of the eighteenth century it was possible to establish printing presses in Wales". Move the row to Georgian. https://nation.cymru/feature/yr-hen-iaith-part-sixty-eight-singing-and-selling-the-rise-of-the-baled-in-the-eighteenth-century/ |
| 58 | Welsh Ballads Online: about 4,000 digitised ballads, mainly 18th and 19th century [S24] | C | NLW page, word for word. https://www.library.wales/ballads |

### Georgian

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 59 | Tregib 1791: "a very fine treble harp from Golden Grove ... the most charming instrument that ever was played upon" [S19][S20] | C | S20 (Freeman) quotes it in full with pp. 355-356. S19's OCR agrees ("they had borrowed a very fine treble harp from Golden Grove ... I was quite in raptures"). The Tregib dinner followed an invitation left at the Llandilo inn |
| 60 | S19 source note: "a blind harper at an inn earlier in the tour" | NS | S19 p. 317-318: "At Aberguilly [Abergwili], for the first time since I have been in Wales, I heard the Welsh harp ... He played, during dinner, in the hall ... into the drawing room at tea". Not an inn |
| 61 | Rutland, the Bear Inn, 1797: blind harper to "a Mr Hughes near Llandeilo", "played uncommonly well, and with more expression than I ever heard given to the harp" [S20] | C | Freeman's extract, word for word (Rutland, 1805, p. 106). The 1797 date is Freeman's heading: the tour's year could not be confirmed independently |
| 62 | Reed at Llansawel 1798: "a variety of movements with variations", "great adroitness" | C | Freeman, word for word |
| 63 | "old Llandebie Harper" Morris, Fenton's guide, 1809 | C | Freeman: "With the old Llandebie [Llandybie] Harper Morris for our Guide we set off for Derwydd" |
| 64 | Lord Dynevor, "Dynevor-Castle, Caermarthenshire", in the subscription list of Jones's *Relicks*; "Ar hyd y Nos" named as a tune | C | Text layer (columns merged by OCR): "Lord Dynevor, Dynevor- Caſile, Caermarthenſhire"; "Pennill, to the tune of Ar hyd y Nós". Wikipedia: the tune is first recorded in Jones's 1784 edition |
| 65 | Dafydd Jones of Caeo (1711-1777): *Aleluia* hymn 1747, *Salmau Dafydd* 1753, *Difyrrwch i'r Pererinion* 1763, 1764, 1770, buried at Crug-y-bar [S21] | C | DWB, each item. https://biography.wales/article/s-JONE-DAF-1711.html |
| 66 | Caeo and Crug-y-bar "about 10 miles north-north-east, at the circle's edge" | P | Crugybar 9.7 miles, but Caeo village 11.1 miles: outside the circle. Bearing is NNE |
| 67 | Thomas Lewis (1759-1842): Esgair-nant 1806; hymn first in *Hymnau ar Amryw Destunau* (Carmarthen, 1823); buried at Talley [S22] | C | DWB, each item |
| 68 | Freeman headed Tregib "1795"; the visit was on the 1791 tour; the book is 1795 | C | S20 heading "Tregib near Llandeilo, 1795", citing "A Tour to Milford Haven, in the Year 1791, (London, 1795)" |
| 69 | Distances: Llansawel "about 8 miles north", Llandybie "about 5 miles south" | U | Not re-measured; Llandybie by grid arithmetic is about 4 miles |

### Victorian

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 70 | Harmonic Society: first public meeting "in the Shire Hall on the 13th inst."; patrons D. Pugh MP, J. L. Thomas, R. Smith, D. Prothero; "Dr. Wastfield has been appointed conductor" [S25] | C | *The Welshman*, 20 November 1857: "LLANDILO HARMONIC SOCIETY.-The first public meeting of this society was held in the Shire Hall on the 13th inst ... the patronage of D. Pugh, Esq., M.P., J. L. Thomas, Esq., R. Smith, Esq., and D. Prothero, Esq. ... Dr. Wastfield has been appointed conductor, and Mr. G. Hughes ... secretary" |
| 71 | The Allhallowtide fair was a hiring fair | C | Same page: Thursday the 12th, "farm servants of both sexes in quest of engagements" |
| 72 | 1865 Eisteddfod: the vicar presiding, Aberdare committee, marquee "at the back of the Castle Inn", seating about 5,000, about 2,000 present in the morning, seats collapsing "all morning" to laughter [S26] | C | Welshman, 2 June 1865, each item; "Monday" is 29 May 1865 |
| 73 | Excursion trains on the Carmarthen line "for the first time" | P | S26: "The Llanelly Railway Company ran passenger trains on this occasion for the first time over the Carmarthen and Llandilo line". The newspaper's claim, about the company's passenger service, not about excursions |
| 74 | Choirs and results: "Manheim" (nine choirs), "Yr Haf" (Llandilo Church choir "by far the best"), "Nashville" and "St. Barnabas" (Nazareth, Aberdare), "Worthy is the Lamb" (Aberdare beat St David's, Carmarthen), "Unrhyw Glee", "Manchester" (prize shared by Llanelly and Llandilo Church), fife band, evening concert | C | S26 and its continuation, each item. The "Worthy is the Lamb" choirs were Cwmbach (Aberdare) and St David's, Carmarthen, so no Llandilo choir sang it, which weakens "documented local link" in the licence table |
| 75 | "Manheim", "Nashville", "St. Barnabas" and "Manchester" "are tune names in the report" | P | S26 calls "Manchester" "the anthem Manchester"; the others are "the tune" |
| 76 | Crugybar "first published in 1883, appearing in Moliant Seion" [S29] | P | A search summary of hymnary.org gives "Welsh hymn melody, 1883", public domain. "Moliant Seion" could not be confirmed (the only "Moliant Seion" hit is an unrelated 1859 anthem collection) |
| 77 | S28: Mansel Thomas's orchestral arrangement of "Crugybar", [1930x1986] | C | NLW Archives P2/6, "Manuscript orchestral score ... of an arrangement of the Welsh hymn-tune 'Crugybar'"; creation [1930x1986] |
| 78 | S27: the bands and choirs are "documented by name in newspapers from the 1890s to 1910s" | X | Facet counts for "Llandilo Brass Band" include 1858, 1863 and 1865. Opened: *The Welshman*, 9 June 1865: "marched, headed by the Llandilo brass band". Llandilo Choral Society: *The Welshman*, 18 July 1856, "singing in very good style, a favourite glee". Llandilo Volunteer Band: *South Wales Daily News*, 20 October 1881. Town Band 1901 and Male Voice 1889 are the earliest of those two. A second Llandilo Eisteddfod appears in the *Aberystwith Observer*, 26 September 1885 |

### 20th century to today

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 79 | National Eisteddfod: Ammanford 1922; Bro Dinefwr (Llandeilo) 1996 [S30] | C | The list shows both. It also shows Ammanford and District **1970**, which the note omits. https://eisteddfod.wales/about/eisteddfod-locations |
| 80 | S30 summary: "Carmarthen 1914" | X | The list reads "1914 First World War - No Eisteddfod"; Carmarthen is **1911** (and Bro Myrddin 1974) |
| 81 | 1996 photograph: stage, Gorsedd, floral dance; Creative Archive Licence (non-commercial) [S31] | C | PCW item 2058666, description and "License information: Creative Archive Licence" |
| 82 | St Teilo Singers, 1989, Elwyn Jones (1925-2011); renamed Cantorion Llandeilo Singers in 2014 [S32] | C | Choir's page, word for word |
| 83 | "Ffair Llandeilo" by Hergest, 2010 Sain compilation; Côr Telynau Tywi, Sain, 1996 [S36] | C | Commons: "From the 2010 album Y Lyfr Coch (Casgliad)"; "From the 1996 album Cor Telynau Tywi". Several Côr Telynau Tywi tracks are on Commons under CC BY-SA 3.0 |

### Playable pieces and licences

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 84 | Sain files: CC BY-SA 3.0, VRT ticket 2017050910011681 [S36] | C | Calon Lân wikitext: `{{PermissionTicket|id=2017050910011681}}`, `{{cc-by-sa-3.0|Sain (Recordiau) Cyf.}}`. All 15 Sain files checked carry "Items with VRTS permission confirmed" |
| 85 | "about 3,600 files" in the Sain category [S36] | P | The category holds 3,306 files and 318 subcategories (3,624 entries) |
| 86 | Each Sain row: performer, album and year (Bowen 1999 and 2015, Elinor Bennett 1991, Cass Meurig 2003, Treforus cymanfa 1989 on a 1999 album, Calon Lân 2013, Whitland 2006, Trefor 1997, Catrin Finch 2003, Hergest 2010, Ar Dymor Gaeaf 2008) | C | Commons API, each file |
| 87 | Madge Breese, Gramophone Company, 11 March 1899, NLW; PD-US-record-expired, PD-old-100 [S37] | C | Wikitext: "The recording: {{PD-US-record-expired}} For the composition: {{PD-old-100}}", date 1899-03-11 |
| 88 | Scherchen *Messiah* 1953, public domain (PD-EU-audio) [S38] | P | The tag is exactly that and nothing else. It is the EU/UK term only. See L1 |
| 89 | Rorate Caeli: "Inritter", own work, 2018, CC BY-SA 4.0 | C | Commons: Inritter, 2018-11-29, CC BY-SA 4.0 |
| 90 | Salve Regina: Les Petits Chanteurs de Passy, 2012, CC BY-SA 3.0 | C | Commons: 2012-01-14, CC BY-SA 3.0 (also multi-licensed, GFDL 1.2); VRT confirmed |
| 91 | Zonophone Twin items: c. 1908, "Welsh Quartette", uploader's public-domain claim | C | archive.org metadata: both items "Zonophone 'The Twin' label", c. 1908, licenseurl `licenses/publicdomain`, same uploader |
| 92 | *Jesus, Lover of My Soul*, "Aberystwyth", Glyndwr Mountain Ash Welsh Male Choir, Victor 72813-B, 11 February 1920, CC BY-NC 4.0 (uploader's claim) | C | archive.org metadata, each item |
| 93 | *Welsh Traditional Songs*, Thomas L. Thomas, Edward Vito, 1944, CC BY-NC-SA 3.0, "doubtful" | C | archive.org metadata. The doubt is right, with a second reason: see L2 |
| 94 | Edward Jones 1794: no licence field read | C | archive.org metadata has no licenseurl or rights |
| 95 | Rachie, composer "not checked" | C | Now answered: Wikipedia, "Rachie": music by Caradog Roberts (1878-1935), composed during the First World War. Life plus 70 years has run (1935 + 70) |

## Not re-checked (not counted above)

- Railway-opening bands and the Cawdor Arms ball (effects:S7) and the 1850 reopening (effects:S10): checked in
  their own reviews; the soundscapes check of 2026-10-03 re-read the S7 wording.
- *Four-part congregational singing in chapels* (victorian:S32): not re-fetched.
- "Bells and chant at St Teilo's clas church", "Roman military music" and "nothing found at Garn Goch": absence
  claims; no counter-evidence was looked for.
- The sentence "Correction to the medieval note. `medieval:S16` and `medieval:S44` cite Wikipedia ...": the
  medieval note does cite Wikipedia for both (lines 52 and 664-741), but replacing them was not done.
- Calon Lân's tune is by John Hughes (Wikipedia); his dates were not read. Cwm Rhondda, Dafydd y Garreg Wen,
  Clychau Aberdyfi, the plygain carol and the Aberystwyth, Bryn Calfaria and Caersalem tunes were not
  settled. "Ffair Llandeilo" has no source for its writer.
- Cass Meurig's track (whether it is crwth): not checked.

## Corrections

### For `docs/research/music-through-time.md`

1. **Line 82 (Early medieval table, chief of song).** Remove "sings to the queen 'in a moderate voice, so as not to
   disturb the hall'" from the pencerdd row. Add a row: the **bard of the household** sings to the queen in her
   chamber "three elaborate songs, in a moderate voice" [S3, Book I, xxv, 5].
2. **Lines 86 and 52 (and `era-medieval-to-1282.md` line 52).** "Christmas 1176" is S2 only. Say "Christmas
   1176 (S2, citing the BBC)" or drop it, and do not mark it cross-checked against the Brut.
3. **Line 85.** Add that the "B flat" and "rapid" passage is Gerald repeating his Irish Topography on "the three
   nations".
4. **Lines 106 and 115, and the Talley paragraph.** Say S10 is the Order's *current* practice. Delete "the one
   Premonstratensian habit that is attested" and the matching row 264 ("the one Premonstratensian habit
   attested [S10]"); if a Marian anthem is kept, label it "modern Norbertine practice, not shown for Talley".
5. **Line 123 (Lewys Glyn Cothi)** and **line 128.** S6 names Owain ap Gruffudd ap Nicolas and Jasper Tudor
   ("his hero"), not Gruffudd as a patron. Drop "the brief placed Lewys Glyn Cothi at Pumsaint": the brief does
   not say so.
6. **Line 67.** "Over 150 metal objects in a lake" needs a second source: add Wikipedia, Llyn
   Cerrig Bach, and say "the margin of the lake".
7. **Lines 175, 178-179.** Move the ballad row, and the S23 and S24 citations, to Georgian. The Tudor and Stuart
   section then has only Prys; say so.
8. **Line 188 and S19 source line (325).** Change "a blind harper at an inn earlier in the tour" to "a blind
   harper at the bishop's house, Abergwili, at dinner and tea".
9. **Line 213 and S27 (333), and open question 8.** Replace "1890s to 1910s" with the earliest dated hits: Llandilo
   Choral Society, *The Welshman* 18 July 1856; Llandilo brass band, 9 June 1865 (hits for 1858 and 1863 not
   opened); Llandilo Volunteer Band, 1881; Male Voice, 1889; Town Band, 1901. A second Llandilo Eisteddfod
   (1885) is a lead.
10. **Line 209.** Add that the 1865 meeting ran into the Tuesday at the Town Hall, that it closed with "Hen Wlad fy
    Nhadau", and that the vicar dated the Cardigan gatherings "1177". Change the excursion trains to "the first
    passenger trains the Llanelly Railway Company ran over the Carmarthen and Llandilo line".
11. **Line 219.** "Manchester" is called an anthem in the report, not a tune.
12. **Line 223 and S29.** Keep 1883 (search summary of hymnary.org), drop "appearing in Moliant Seion" until it is
    read.
13. **Line 336 (S30).** "Carmarthen 1914" should be "Carmarthen 1911 (1914: no Eisteddfod)". Add Ammanford and
    District 1970.
14. **Line 342 (S36).** "About 3,300 files (3,624 including 318 subcategories)".
15. **Lines 54-61 (summary).** "The only surviving source of the old harp music" becomes "the main surviving
    source" (S12's own lead). Add S14's note that part of the manuscript is by Lewis Morris, not Robert ap Huw.
16. **Line 270.** Replace "Bragod's recordings are commercial [S14]" with "Bill Taylor's and Paul Dooley's".
17. **Caution paragraph (line 98).** Add that S3's own preface dates the Dimetian base manuscript (BM Titus D. ix)
    to "about the close of the thirteenth or early part of the fourteenth century", and that the text records
    alterations by Rhys ap Gruffudd about 1180.
18. **Handel row (255) and Thomas L. Thomas row (268).** Add the US term: see L1 and L2.

### For app content

- **`src/content/lamplight.ts:93`** (and the English basis, line 88, and Welsh, line 89): "no source read dates this
  text’s own manuscripts" is not right. S3's preface dates the Dimetian base manuscript to the close of the 13th
  or early 14th century (and records Rhys's alterations about 1180). Suggested: "Aneurin Owen dates the
  manuscript he printed as the Dimetian text to about the close of the 13th century or early in the 14th; the
  text itself records changes made by Rhys ap Gruffudd about 1180." The key year 1200 and the 13th-century
  wording of the key's text are unaffected. `docs/research/light-after-dark.md` line 33 and its 2026-10-03
  review (row 32) say the same thing and want the same edit.
- No other `src/` content cites the note's key prefix (`grep "music:" src` finds only line 93).
- `docs/research/README.md` line 35 still reads "not yet checked": change to "checked 2026-10-09" with a link
  here.

### Licences

L1. **Handel, Scherchen 1953 (S38).** Commons carries only `{{PD-EU-audio}}`. A 1953 recording is out of term in
   the EU and UK, but in the US a recording first published 1947-1956 is protected for 110 years from
   publication (secondary sources; I could not read the statute), that is to 2063. The site is served from
   GitHub Pages in the US and the repo is public, so ADR 0026's one line (nothing "all rights reserved") is at
   risk. Prefer our own rendering of the Amen chorus (Handel's composition is public domain), or a recording
   from before 1923.
L2. **Thomas L. Thomas 1944 ("Welsh Traditional Songs" row).** The note is right that an uploader cannot
   licence it; the US term (95 years from publication for a 1944 recording, to 2039) is a second reason.
   Keep it out.
L3. The other recordings are fine as stated: the Sain, Passy, Inritter and Kabuto files carry the licences the
   note gives, Madge Breese (1899) and the Zonophone items (c. 1908) are pre-1923 and US public domain, and the
   1920 Victor transfer is a pre-1923 recording with an NC licence on the transfer. Attribution wording for the
   credits manifest: Sain files are "Sain (Recordiau) Cyf., CC BY-SA 3.0, via Wikimedia Commons"; share-alike
   applies to adaptations of the recordings, not to the app's own code.
L4. **Composition rights.** Settled: Rachie (Caradog Roberts, d. 1935, public domain in the UK and EU; the US
    status of a 1910s tune is also public domain by publication date, but was not read). Still open: Calon Lân,
    Cwm Rhondda, the 1865 hymn tunes, "Ffair Llandeilo". Do not ship any of them until the writers are named.

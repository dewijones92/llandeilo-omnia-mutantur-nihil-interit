---
title: Independent check of anglo-norman-and-middle-english.md
kind: review
status: current
updated: 2026-10-02
---

# Independent check: Anglo-Norman French and Middle English for 1282 and 1185

Reviewed note: [`../anglo-norman-and-middle-english.md`](../anglo-norman-and-middle-english.md) (status: draft,
written 2026-10-02, untracked in the working tree). Repo state: `main` at `ca50331`, level with `origin/main`
after `git fetch`.

## Method

- Every Internet Archive edition the note cites was downloaded as its full OCR text with curl and searched
  directly: S1 Morris, *Welsh Wars*; S2 Morris, EHR 1899; S3 Welsh Rolls calendar; S4 Robert of Gloucester
  vols 1 and 2; S5 Madden's Laȝamon vols 1 and 2; S6 Wells, *Owl and Nightingale*; S7 Wright, *Political
  Songs*; S8 Langtoft vols 1 and 2; S9 Menger; S13 Wright and Wright; S16 *Kirby's Quest*. Each quoted line
  was read in its page context, including variant notes and the editors' translations.
- Web sources were downloaded with curl and read as raw text: the AND entries *arblaster*, *garnisun*,
  *centener* and bibliography T (S14, S15); Rothwell 1976 on the AND site (S11); the Ingham handout (S12)
  and the Bibbesworth extract (S10), both with pdftotext; Fordham's *French of England* introduction (S18);
  the raw wikitext of "Picard language" (S17); Monastic Wales site 51 and VCH Notts vol. 2 pp. 129-138
  (`classes:S13`, `classes:S15`).
- Extra source: the Peckham phrases (`classes:S4`) were re-read in C. T. Martin's *Registrum Epistolarum
  Johannis Peckham* vol. 2, Internet Archive `registrumepistol0000char`.
- The edge-tts claim (S19) was checked in the installed package (`edge_tts/communicate.py`, version 7.2.8).
- Two WebSearch calls (for an independent description of Old Picard) and one WebFetch (a Persée review of
  Gossen) were used; neither yielded a usable second source.
- Kirby's Quest name counts were recomputed from the OCR with `grep -o -w`.
- **Not re-checked**: the earlier note's Wikipedia sources for Anglo-Norman trilled *r* and *oi* read as
  "wa" (`classes:S39`, `classes:S37`); the "169/5" class mark of the 1327 roll (the OCR title page is
  garbled); kn-/wr- (the note itself says this was not checked in Wright).

## Summary

79 claims judged (one table row each): **65 confirmed, 12 partly, 0 not supported, 2 contradicted**, plus 3
not re-checked (listed above). Every quoted line in the note was found in its cited edition, and the wording is accurate apart from
small, fixable transcription points. The real problems are of interpretation:

1. **Anglo-Norman final -e (contradicted).** The note says final *-e* was sounded [ə] in 1282 and puts this
   in the draft ⓘ text. Menger, already one of the note's sources, says the opposite for Anglo-Norman:
   post-tonic *e* after vowels fell "in the course of the twelfth century", and after consonants its loss
   "becomes frequent only toward the end of the thirteenth century" (S9, pp. 63-64). The note's source for
   the sounded *-e* is Wikipedia on continental Old French.
2. **Rothwell's date for Bibbesworth (contradicted).** The note says Rothwell put the treatise in "the later
   years of the thirteenth century". Rothwell says "By the middle of the thirteenth century ... Walter of
   Bibbesworth had written his *Tretiz*" and footnotes the date as "about 1250". The note's own source list
   says S11 was read through a summarising fetch, which is the likely cause. The contradictions table is
   therefore wrong: Rothwell sides with the 1250x1260 date, not with Menger.
3. **Rothwell's quoted sentence** is accurate but is about England "at the opening of the thirteenth
   century" (c. 1200), not the later 13th century.
4. **South-western voicing applies to native words only.** Wright says it is "almost exclusively confined to
   native words" (S13, § 236), so French loans such as *sire*, *feste* or *fol* must not be respelt *zire*,
   *veste*, *vol*. The note does not say this. Wright also calls the voicing "obsolescent" in south
   Pembrokeshire, not alive.
5. **Two small date and page slips in Morris**: "retenti ad vadia regis" is on p. 208 (not 207), and the
   Newcastle Emlyn siege ran from December 1287 to January 1288 (the castle fell by 20 January 1288).

No attested phrase is misattributed. Three need correcting when quoted: Lestrange's *seignur* is the editor's
abbreviation *seignr* (twice) expanded silently; Laȝamon's *Leoue freond* is *Leofue freond* in Madden; and
*par le men ascient* means "to my knowledge", not "I swear", while *jure par dampnedeu* is narration, not
speech.

## Claims checked

| # | Claim in the note | Verdict | Evidence |
|---|---|---|---|
| 1 | Valence's opening: *"Gillame de Valence seynur de Pembrok a soun cher amy mester Henri de Bray seneschal de Bergeveny saluz e amour."* [S2, pp. 506-507] | Confirmed | S2 p. 506, word for word. https://archive.org/details/sim_english-historical-review_1899-07_14_55 |
| 2 | *"Sachez ke jo ay este a Lampadirvawr e ay veu le ouerayne"* | Confirmed | S2 p. 506: "Sachez ke jo ay este a Lampadirvawr e ay veu le ouerayne, e pur la graund multitude des overours" |
| 3 | *"les deners le Roy ke la sunt sunt ja tot fayliz"*, "the king's money that is there is already all spent" | Confirmed | S2 p. 507: "ke ilia les deners le Roy ke la sunt sunt ja tot fayliz". The money ran out "because of the great multitude of workmen" (the clause before), which the extract leaves out but does not misstate |
| 4 | *"jo vous pri e le vous maund de part le Roy"* | Confirmed | S2 p. 507: "pur quey jo vous pri e le vous maund de part le Roy" |
| 5 | *"saunz nul delay"*; *"pur le pru le Roy"* | Confirmed | S2 p. 507: "saunz nul delay si cum vous volez sauver le ouerayne le Roy"; "pur le pru le Roy graundment a fere" |
| 6 | Closing *"Saluz ke de vous"* (OCR, sense uncertain) | Confirmed | S2 p. 507: "Saluz ke de vous." The note flags the doubt correctly |
| 7 | *"ne pount pas estre"* in Valence, so *ne ... pas* is period | Confirmed | S2 p. 507: "ne pount pas estre si aloynez" |
| 8 | Lestrange's opening: *"A son trenoble seignur Edward ... seignur de Yrlaund, e Duc de Guyene, Rog[er] le Estraunge si li plest saluz honurs et reverences"* | Partly | S2 p. 507 prints "seignr Edward" and "seignr de Yrlaund" (abbreviated) and "'t Duc" (OCR). The note expands *seignr* without brackets and turns "'t" into *e*; both should be bracketed as editorial, as *Rog[er]* already is |
| 9 | *"Sachez, sire, ke vos bones gens ... se combatirent av Leweln le finz Griffin en le paes de Buelt"* | Confirmed | S2 p. 507. The ellipsis covers "les queus vus auez assingne de vestre entendant a moy" (whom you assigned to me). *Leweln le finz Griffin* is literally "Llywelyn the son of Griffin"; the translation normalises it |
| 10 | *"issi ke Leweln le finz Griffin est mort et se gent desconfit et tote la flour de se gent morz"* | Confirmed | S2 p. 507, word for word |
| 11 | *"sicum le port[our] de ceste lettre vus dirra, et le creez de ceo ke il vus dirra de par moi"*; OCR has "port®" and "pchein" | Confirmed | S2 p. 507: "sicum le port® de ceste lettre vus dirra, et le creez de ceo ke il vus dirra de par moi"; "le vendredy pchein apres la feste seint Nhoilas" |
| 12 | The Lestrange letter is the official despatch on 11 December 1282 | Confirmed | S2 p. 506: "the official despatch of Roger l'Estrange announcing the battle of Orewin bridge and Llewelyn's death, 11 Dec. 1282". Morris adds "One doubts if he was actually present at the battle" |
| 13 | AND lists the two letters as "Two Docs Wales", 1278 and 1282 [S15] | Confirmed | https://anglo-norman.net/bibliography/T: "Two Docs Wales ... J. E. Morris ... 1278 and 1282". (The AND entry itself misprints the EHR volume as 19 and one letter number as 1337; S2 has vol. 14 and "1994 and 1837". Not the note's error) |
| 14 | Valence was the father of the young William de Valence killed in June 1282 | Confirmed | S1 p. 166: "Young de Valence, Pembroke's son, was killed, with other knights" |
| 15 | Langtoft: *"Grevouse est la guère, e dure l'endurer; / Quant [aillours] est l'esté, en Gales est yver."* | Confirmed | S8 vol. 2 p. 176: "Grevouse est la guère, e dure l'endurer; / Quant [aillours] est l'esté en Gales est yver." Wright's translation (p. 177): "Grievous is the war, and hard the suffering; When elsewhere it is summer, it is winter in Wales." https://archive.org/details/chronicleofpierr02pete |
| 16 | Langtoft: *"Courent sur les genz, ardent en passaunt, / Abbatent ses chasteus"*, of the Welsh in 1282 | Confirmed | S8 vol. 2 p. 176, under "Anno Domini M. ducentesimo octogesimo secundo"; translation p. 177 "They invade his people, burn in passing, Cast down his castles" |
| 17 | Langtoft: *"si nos Englays eusent eu espye / Entre les Galais"* | Confirmed | S8 vol. 2 p. 178. Context: the drowning of knights on the boat bridge (Roger de Clifford, Lucas de Tannye), i.e. the Menai disaster of late 1282 |
| 18 | Langtoft names "Baskles e Gascons"; Gascons came only in winter 1282-3 | Confirmed | S8 vol. 2 p. 180 (under 1283): "saunz noumbre de Baskles e Gascons"; S1 p. 35: "a large corps of 1,500 in the winter of 1282-3" |
| 19 | Langtoft was a canon of Bridlington | Confirmed | S8 vol. 1 preface quotes Robert of Brunne: "Pers of Langtoft, a chanon / Of the hous of Br[y]dlyngtoun". ("Before 1307" not checked) |
| 20 | Boeve: *"Beau sire emperur"*, *"Fol, kar vus teisez!"* | Confirmed | S9 p. 161 (Boeve ll. 297, 302): "Beau sire emperur," dist Boefs; "Lui emperur respondi : 'Fol, kar yus teisez !'" (OCR "yus") |
| 21 | Boeve: *"Dount venez vus, beau fiz, si fortement hastaunt?"* | Confirmed | S9 p. 162, l. 317, said by Sabot to Boeve |
| 22 | *"par le men ascient"* "to my knowledge, I swear"; *"jure par dampnedeu"* "swears by the Lord God" | Partly | S9 p. 162 l. 320 "jammes ne garira par le men ascient" (he will never recover, to my knowledge): *ascient* is knowledge or opinion, so "I swear" is an addition. p. 161 l. 307 "e jure par dampnedeu e le seint espirist" is narration, not dialogue |
| 23 | Boeve dated first half of the 13th century by Menger [S9, p. 26] | Confirmed | S9 pp. 25-26: "must have been the first half of the thirteenth century" |
| 24 | 1292 petition: *"E pout adunke aver change sy yl vousit, e ne fit nent"* [S12] | Confirmed | Ingham handout ex. (12): "E pout adunke aver change sy yl vousit, e ne fit nent  Petitions 1292 p. 53", gloss "And could then have changed if he wanted, and did nothing". https://www.elsj.org/before2020/meeting/81st/81s10ingham.pdf |
| 25 | Peckham: *"Sire, sachez ke ..."*, *"Madame, je vus mercy mut des lettres"*, *"Madame, Dieu vous eyt en sa garde"* | Confirmed | Re-read today in Martin, *Registrum* vol. 2 (archive.org `registrumepistol0000char`): "Sire, sachez ke ceus ke furent a la mort"; to Queen Eleanor "Madame, je vus mercy mut des lettres consolatoires"; "Madame, Dieu vous eyt en sa garde" |
| 26 | AND: *arblaster* (forms *arbelastier*, *arblastier*), *garnisun* "garrison, body of soldiers stationed in a castle", *centener* with *vinteners* in 1336 | Confirmed | https://anglo-norman.net/entry/arblaster, /entry/garnisun, /entry/centener: all forms, sense and the 1336 citation "les milleners, centeners & vinteners" as stated |
| 27 | Morris uses centenar and vintenar [S1, pp. 88, 92] | Confirmed | S1 p. 88 crossbowmen's "vintenars 6d."; pp. 92-93 "a centenar or constable", "vintenars or twentieth men" |
| 28 | Robert of Gloucester, vol. 2 lines 7537-7547 (pp. 543-544), text as restored | Confirmed | S4 vol. 2 pp. 543-544, lines 7537-7547, every word matches (OCR thorn and yogh aside). https://archive.org/details/metricalchronic02robe |
| 29 | Translation of the French and English passage | Confirmed | Matches the Middle English line by line |
| 30 | Robert of Gloucester c. 1300, Gloucestershire dialect, Cotton MS "nearly contemporary", writer saw the Evesham darkness | Confirmed | S4 vol. 1 pp. xi-xii: "if we place the date of the Chronicle about the year 1300", "the Cottonian MS. must be nearly contemporary", "the dialect of Gloucestershire" |
| 31 | *"Louerd king washayl"*, king answers *"Drink hail"*, vol. 1 lines 2514-2519, p. 179; OCR "lo sede", variants *heo*, *sche* | Confirmed | S4 vol. 1 p. 179 ll. 2514, 2519; variants "heo B a; sche β" |
| 32 | The wassail greeting is "cross-checked" with Laȝamon | Partly | Both texts confirm the formula, but both tell the same legend (Rowena and Vortigern), so Laȝamon is not independent evidence that people said it in 1282 |
| 33 | Evesham: *"Vr soules he sede abbe god • vor vr bodies beþ hore"*; *"Sir henri he sede to is sone • þis haþ imad þi prute"*, ll. 11,701-11,703, p. 763 | Confirmed | S4 vol. 2 p. 763, word for word. The note rightly says these are Robert's words for Simon |
| 34 | *"An vewe dropes of reine • þer velle grete inou"*, from line 11,746 | Confirmed | S4 vol. 1 p. xi: "Only a few drops of rain fell (11746-9): An vewe dropes of reine • þer velle grete inou" |
| 35 | Laȝamon: *"Lauerd king wæs hæil, for þine kime ich æm uæin"*, vv. 14,295 on, p. 174 | Confirmed | S5 vol. 2 p. 174 (Calig. A. ix): "Lauerd king waes haeil, for þine kime ich aem uaein"; Madden: "Lord king, wassail! for thy coming I am glad" |
| 36 | Laȝamon: *"Leoue freond wæs hail ... þe oþer seið drinc hail"* | Partly | S5 vol. 2 p. 175 (not 174): "Leofue freond wæs hail, þe oðer saið drinc hail". The note drops the *f* of *Leofue*. Madden: "Dear friend, wassail! ... Drinchail!" |
| 37 | Laȝamon a priest at Ernleȝe (Lower Arley); Madden argued c. 1205 | Confirmed | S5 vol. 1 preface: "Ernley ... Lower Arley, otherwise Arley Regis"; "this will correspond extremely well with the date of 1205" |
| 38 | Owl and Nightingale ll. 1-4 and 19 as quoted; "uor" | Confirmed | S6, Cotton MS: "Ich was in one sumere dale, / in one suþe diȝele hale, / iherde ich holde grete tale / an hule and one niȝtingale"; l. 19 "Ho was þe gladur uor þe rise" |
| 39 | Wells accepted "about 1220" but noted the debate; "middle Southern dialect" | Confirmed | S6 Introduction: Morsbach "placed The Owl among the important bases for study of the middle Southern dialect, and accepted the date 'about 1220'"; Wells concludes "about 1216-1225" |
| 40 | Song after Lewes: *"Sitteth alle stille ant herkneth to me"*, *"bi mi leauté"*, *"Let him habbe, ase he brew, bale to dryng"* [S7, pp. 69-70] | Confirmed | S7 p. 69 (OCR "rue", "leaute*"); Wright: "Sit all still and listen to me ... by my loyalty ... let him have, as he brews, evil to drink" |
| 41 | The song is "a soldiers' and partisans' song", copied in the Ludlow MS Harley 2253 "(West Midland, c. 1340)" | Partly | Wright calls it a song of "the adherents of Simon de Montfort" (nothing about soldiers) and dates the MS "of the reign of Edw. II". "Ludlow" and "c. 1340" are not in S7 and need their own source |
| 42 | Thirty-five lances "under Alan Plukenet to hold Dynevor" [S1, p. 166] | Confirmed | S1 p. 166: "two bodies of about thirty-five lances each ... the other remaining under Alan Plukenet to hold Dynevor". https://archive.org/details/welshwarsofedwar00morr |
| 43 | "Plukenet's corps was already composed of Somerset and Devon tenants" [S1, p. 167] | Confirmed | S1 p. 167, word for word |
| 44 | Troop leaders "tenants-in-chief from the south-west counties of England" [S1, p. 163] | Confirmed | S1 p. 163: "All the troop-leaders were tenants-in-chief from the south-west counties of England" |
| 45 | Crossbowmen and English foot "were clearly in permanent pay in the castles" [S1, p. 165] | Confirmed | S1 p. 165, word for word |
| 46 | 1277: "masons and carpenters from Wiltshire, Somerset, and Dorset were similarly sent to Carmarthen and Dynevor" [S1, p. 139] | Confirmed | S1 p. 139, word for word, in the account of the 1277 campaign |
| 47 | September 1282: "the 700 Kidwelly men and seventy English" joined an attack, paid at different rates [S1, p. 170] | Confirmed | S1 p. 170: "joined for one day to make an attack on Gruffudd ap Maredudd ... The Welsh foot received [OCR] each ... and the English the usual [OCR]" |
| 48 | Troop leaders' names [S1, p. 163]; Robert de Mohun in June; "a Grenville, a Raleigh, a Marmion" [S1, p. 168] | Confirmed | S1 pp. 163-164 table and text; p. 168 "there came a Grenville, a Raleigh, a Marmion" |
| 49 | Stephen de Frankton "a centenar of Shropshire infantry from l'Estrange's own estate of Ellesmere, Frankton being a village in the neighbourhood" [S2, p. 506; S1, p. 184] | Confirmed | S2 p. 506 word for word; S1 p. 184 "reappears in 1287 as a centenar of Shropshire infantry" |
| 50 | Latin pay-roll: English foot at Carmarthen in 1287 "retenti ad vadia regis" [S1, p. 207] | Partly | S1 p. 208 (not 207): "thirty English foot of the permanent paid garrison retenti ad vadia regis", 2 August 1287 |
| 51 | £10 "ad opus peditum ex Cardigan qui permanserunt in obsessione novi castri sine vadiis" at "the 1287 siege of Newcastle Emlyn" [S1, pp. 216-217] | Partly | Quotation confirmed, pp. 216-217. But the siege ran from December 1287 into January 1288: "On January 1, 1288 [OCR '1388'], they were already blockading Emlyn" and "by January 20 the castle fell" |
| 52 | Welsh Rolls: Tibetot appointed "captain in West Wales", 1282 [S3, pp. 212-213] | Confirmed | S3, membrane 10: "Robert Tibotot, whom the king has appointed captain in West Wales", then superseded by Gloucester. https://archive.org/details/cu31924026113880 |
| 53 | Menger: "French never became the language of the populace"; Bibbesworth's treatise "points toward English and not French as the mother tongue of the English aristocracy of the time" [S9, pp. 1-2] | Confirmed | S9 pp. 1-2, word for word. https://archive.org/details/anglonormandiale00menguoft |
| 54 | Rothwell: "French was a language needing to be learned by very many Englishmen, not a vernacular in almost universal use in England at the opening of the thirteenth century" | Confirmed | Word for word. https://anglo-norman.net/the-role-of-french-in-thirteenth-century-england/ |
| 55 | Menger and Rothwell both read Bibbesworth as showing English was the gentry's first language "by the later 13th century" | Partly | Rothwell does read it so ("her native tongue"; "a noble lady of English speech who knows some French"), but for c. 1250: his patroness "would have been born some time during the early decades of the thirteenth century" |
| 56 | Rothwell dates Bibbesworth to "the later years of the thirteenth century" (summary, date paragraph, contradictions table, S11 entry) | Contradicted | Rothwell: "By the middle of the thirteenth century ... Walter of Bibbesworth had written his Tretiz de Langage", note 20: "for the date of the Tretiz (about 1250)". Only Menger says "toward the end of the thirteenth century" |
| 57 | Bibbesworth (Dalby): "the proper way to speak and answer that every gentleman needs to know"; "not [be] made fun of by others" | Confirmed | S10, Preface (CUL Gg.1.1) word for word; the second line is in the treatise's opening verses ("To be better taught in speech and not made fun of by others"), not the preface or dedication. https://prospectbooks.co.uk/wp-content/uploads/2021/09/extract-Treatise-W-Bibbesworth.pdf |
| 58 | Ingham: the "second, acquired language" view an "internet myth"; French at school "until c. mid-C14 as a vehicle language"; households "at least until c. 1400"; Bibbesworth "teaches lexis, not syntax"; "1250x1260" quoted | Confirmed | S12 p. 1, all wording as quoted |
| 59 | Word order: continental OV 36% c. 1275, 18% c. 1300; English c. 3% OV 1250-1350 (Pintzuk and Taylor) | Confirmed | S12 Table 1: "GCRF VI (c.1275): 36.0%", "GCRF VII (c.1300): 18.3%"; "c. 3% in ME2 (1250-1350)" |
| 60 | Anglo-Norman spelling: *ke*, *ki*; *u* for *o*/*ou*; *ai*/*ei* to *e*; *-om -um -oms* for *-ons*; yogh for *z* [S18] | Confirmed | Fordham: "u for SMF o or ou (tut for tour) or k for the [k] sound spelt qu in SMF (ki for qui)"; "reduction of dipthongs ai and ei to e (faire/fere ...)"; "-om -um- oun and -oms, -omes, -ums, -umes for SMF ons". https://frenchofengland.ace.fordham.edu/introduction-to-the-language/ |
| 61 | *aun* from "the second part of the thirteenth century", earliest dated example 1266; its origin "has not been definitely established" [S9, pp. 47-48] | Confirmed | S9 pp. 47-48, both quotations word for word |
| 62 | *ei, ai, e* "the real Anglo-Norman products", *oi* "an imitation of continental usage" [S9, p. 50] | Confirmed | S9 p. 50, word for word |
| 63 | "The letters write *seyt*, *seyent*, *esteyt*" | Partly | *seyt* and *seyent* are in Valence's letter (S2 p. 507); *esteyt* is not in either letter |
| 64 | "the reduction of cases" [S9, p. 2]; "the early adoption of the accusative for the nominative" [S9, p. 114] | Confirmed | S9 p. 2 and p. 114, word for word |
| 65 | Anglo-Norman final *-e* was sounded [ə] in 1282, and the draft ⓘ says so | Contradicted | Menger § 18 (S9 pp. 63-64): loss of post-tonic *e* after vowels "we may place it in the course of the twelfth century"; after consonants it "becomes frequent only toward the end of the thirteenth century", first after *r* (*sir*), then *l* (*nul* for *nule*), then *m*, *n* (*dam*, *un*). The note's source for [ə] (`classes:S39`) is Wikipedia on continental Old French |
| 66 | "Final t lost ... the most frequent of all the phenomena" [S9, p. 97]; final *s* "apparently, was not stable" [S9, p. 114] | Partly | Final *t*: confirmed word for word, p. 97. Final *s*: the words are on p. 114, but Menger is discussing flexional *-s* in particular words (*nefs*, *sacs*, *colps*) after *p, b, v, c*, not final *s* in general |
| 67 | *ch* was [tʃ]; Menger confirms k, ch and ts were all used [S9, p. 98] | Confirmed | S9 pp. 98-99: "The three sounds, k, ch, and ts were all known to Anglo-Norman writers"; "ch early became the popular way of denoting the sound tsh" |
| 68 | Wright § 23: long *i* as in *machine*, long *u* (*ou*) as in Fr. *sou*, long *a* as in *father*, close *e* as in NHG *reh*; rounded vowels *horte*, *huden*, *fur* | Confirmed | S13 § 23 (pp. 11-12), word for word. https://archive.org/details/in.ernet.dli.2015.213674 |
| 69 | Wright § 24: *ȝ/gh* finally and before *t* "a voiceless guttural or palatal spirant like the ch in NHG. noch beside ich"; initial *h* pronounced | Confirmed | S13 § 24 (p. 14), word for word |
| 70 | Wright § 141: final *-e* lost earliest in the north, "latest of all in the southern dialects", ceasing "in all forms in the second half of the fourteenth century" | Confirmed | S13 § 141, word for word. Nuance: loss began earlier in short-stem words and in nouns and verbs than adjectives, so "sounded in 1282" holds for most but not all forms |
| 71 | Wright § 236: initial f, s, þ voiced to v, z, ð in the south-west, "still alive" in Glo., Wil., Som., Dev. and in s. Pem.; spell a Somerset soldier's "for" as *vor* | Partly | Voicing confirmed word for word. But Wright says it is "almost exclusively confined to native words", and "obsolescent in s. Pem.", "still in general use in ... parts of Glo., west Brks., Wil., Som., and Dev." |
| 72 | edge-tts escapes its input, so phoneme tags cannot be passed [S19] | Confirmed | `communicate.py` line 350: `escape(remove_incompatible_characters(text))`; `version.py`: 7.2.8 |
| 73 | Robert of Gloucester's glossary gives *Walssemen*, *Walische*; texts have *knitt*, *ibrott*, *islawe*, *me telþ* | Confirmed | S4 vol. 2 glossary: "Walische. Welsh", "Walssemen. Welshmen. 9433"; all other forms found in the text |
| 74 | 1327 roll name counts (*Johanne* 2,438 ... *Simone* 78) | Confirmed | Recomputed from the S16 OCR: identical, including *Richardo* 749 + *Ricardo* 41 (about 790) and *Radulpho* 128 + *Radulfo* 8 |
| 75 | Editor's favourite names; Courtenay at Crewkerne, William de Montague, John de Mohun, John de Beauchamp [S16, pp. xxxi-xxxii] | Confirmed | S16 pp. xxxi-xxxii: "Hugh le Honylikkere ... Thomas le Otemangere ... Hugh le Blodleter ... Adam Puddyng ... William le Rat"; "Hugh de Courtenay ... at Crewkerne"; Montague, Mohun, Beauchamp holdings listed |
| 76 | Surnames *Geoffrey Arbalister* (1198), *Peter le Arblaster* (1278) [S14] | Confirmed | AND *arblaster* sense 2: "( 1198 ) Geoffrey Arbalister ( 1278 ) Peter le Arblaster" |
| 77 | Talley founded "as a dependency of Amiens, St Jean" and "from the monastery of St. John's, Amiens" | Confirmed | Re-fetched: Monastic Wales site 51, "a dependency of Amiens, St Jean"; VCH Notts vol. 2, "founded from the monastery of St. John's, Amiens" |
| 78 | "Old Picard" kept *k*/*g* where central Old French had [tʃ]/[dʒ]: *keval*, *gambe*, *kief*, *cachier* [S17] | Partly | Wikipedia says this of "Picard" against "Old French", not specifically of Old Picard, and it remains the only source: two searches found no scholarly text (Gossen's grammar was not reachable). The same article's *cherf* / *cerf* point (Picard *ch* where central French has *c* before *e*, *i*) is in the note's source list but missing from its guidance |
| 79 | Menger: "graphic signs of Central French and of South Norman by the side of those of Picard and North Norman" [S9, p. 98] | Confirmed | S9 p. 98, quoting Meyer-Lübke |

## Corrections the note needs

1. **Anglo-Norman final -e (§ 4, first bullet, and the draft ⓘ).** Replace "Final -e was sounded [ə]" with
   Menger's account: post-tonic *e* after a vowel had been silent since the 12th century (*veue*, *aloynez*
   style forms), and after a consonant it was being lost in the later 13th century, first after *r*, then *l*,
   then *m*, *n* [S9, pp. 63-64]. Record it as a contradiction with `classes:S39`, side by side. Change the ⓘ
   to say final *-e* was "sometimes still heard" rather than "sounded", or drop that clause.
2. **Rothwell's date (summary point 2's sources, "Bibbesworth's date", contradictions table, S11).** Rothwell
   gives "about 1250" (note 20) and "by the middle of the thirteenth century". Move him to the
   1250x1260 side of the table. Mark S11 as read in full on 2026-10-02 rather than "summarised quotations".
3. **Rothwell's quoted sentence** is about c. 1200 ("at the opening of the thirteenth century"). Say so where it
   is used, and soften "Two scholars ... by the later 13th century" to "Menger (for the late 13th century) and
   Rothwell (for c. 1250)".
4. **South-western v/z (§ 3 and § 4).** Add Wright's limit: the voicing is "almost exclusively confined to
   native words" [S13, § 236], so do not voice French loans (*sire*, *feste*, *fol*, *faire* as a French word)
   in a Somerset soldier's speech. Change "still alive ... in s. Pem." to "obsolescent in south
   Pembrokeshire" in § 3 and in the open questions.
5. **Final -e in Middle English (§ 4).** Add Wright's nuance that the loss started earlier in short-stem words
   and in nouns and verbs [S13, § 141]. The conclusion for 1282 still stands.
6. **Lestrange's opening.** Print it as the edition has it, with expansions bracketed:
   *"A son trenoble seign[u]r Edward ... seign[u]r de Yrlaund, ['t, probably e] Duc de Guyene"*.
7. **Laȝamon.** *Leoue* should be *Leofue*; that line is on p. 175, not 174.
8. **Boeve.** Translate *par le men ascient* as "to my knowledge" (no oath), and mark *jure par dampnedeu*
   as narration ("[he] swears by the Lord God"), not a spoken line.
9. **Morris page and date.** "retenti ad vadia regis" is p. 208. The Newcastle Emlyn siege is "1287-8" (it fell
   by 20 January 1288).
10. **The 1264 song.** Drop "soldiers'" (Wright: "the adherents of Simon de Montfort"), and either cite a
    source for "Ludlow" and "c. 1340" or use Wright's "of the reign of Edw. II".
11. **"esteyt".** Remove it from "The letters write ...", or cite where it occurs.
12. **Final s (§ 4).** Say Menger's "not stable" refers to flexional *-s* after *p, b, v, c* in certain words, not
    to final *s* in general.
13. **The wassail cross-check.** Note that Robert of Gloucester and Laȝamon tell the same Rowena legend, so the
    second text confirms the literary formula, not independent everyday use.
14. **Bibbesworth's "made fun of" line** is from the treatise's opening verses, not its preface.
15. **Picard (Talley section).** Call the forms "Picard" as the source does, keep them single-source, and add
    the *cherf*/*cerf* point: Picard writes *ch* where central French has *c* [ts] before *e* and *i*, so a
    Picard canon's *ch* is not always a central-French *ch*.

Nothing in the note was found to be misattributed. Its transcription of every attested Anglo-Norman and
Middle English line is accurate enough to quote once corrections 6 to 8 are made.

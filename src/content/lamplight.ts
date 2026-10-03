import type { NonEmptyArray } from '../domain/assert.ts';
import type { LampKey, LitArea } from '../domain/lamplight.ts';
import { ad, bc } from '../domain/time.ts';
import { src } from './ids.ts';

// The sources speak of lighting "the town"; whether Ffairfach, south of the bridge, was lit is not
// known, so lamps are drawn only north of the Tywi. The south and east edges follow OS Open Rivers.
export const TOWN_NORTH_OF_TYWI: LitArea = {
  id: 'town-north-of-tywi',
  label: { en: 'Llandeilo north of the Tywi', cy: 'Llandeilo i’r gogledd o’r Tywi' },
  outline: [
    { e: 261700, n: 221760 },
    { e: 262690, n: 222030 },
    { e: 263240, n: 221870 },
    { e: 263570, n: 222050 },
    { e: 263590, n: 222120 },
    { e: 263380, n: 222540 },
    { e: 263460, n: 222900 },
    { e: 263600, n: 223180 },
    { e: 263870, n: 223090 },
    { e: 264200, n: 223220 },
    { e: 264200, n: 223800 },
    { e: 261700, n: 223800 },
  ],
};

const FARMS_DRAWN = {
  en: ' Farms across the valley are drawn with the same windows as the town, which is a guess',
  cy: ' Mae ffermydd ar draws y dyffryn yn cael yr un ffenestri â’r dref, sy’n ddyfaliad',
};
const FARMS_GUESS = { en: `${FARMS_DRAWN.en}.`, cy: `${FARMS_DRAWN.cy}.` };
const FARMS = {
  en: `${FARMS_DRAWN.en}: when farms got mains electricity is not known.`,
  cy: `${FARMS_DRAWN.cy}: nid yw’n hysbys pryd y cafodd ffermydd drydan o’r prif gyflenwad.`,
};
const WHERE = {
  en: ' Street lamps are drawn only in the town north of the Tywi; whether Ffairfach was lit is not known.',
  cy: ' Dim ond yn y dref i’r gogledd o’r Tywi y dangosir lampau stryd; nid yw’n hysbys a oleuwyd Ffairfach.',
};

// Research: docs/research/light-after-dark.md, independently checked 2026-10-03. Each key holds
// until the next (ADR 0030); before the first there is no key and no light (ADR 0032).
// Window shares, glow and colour are reconstructed in every key; no source counts lit windows.
export const LAMPLIGHT: NonEmptyArray<LampKey> = [
  {
    year: bc(7800),
    dated: 'by',
    homes: 'hearth',
    streets: { kind: 'none' },
    warmth: 1,
    windows: 0.25,
    glow: 0.45,
    hearth: 1,
    text: {
      en: 'By 7800 BC people in Britain built huts with hearths, like one at Howick in Northumberland, so firelight lit the night. No house this old is known in Wales.',
      cy: 'Erbyn 7800 CC roedd pobl ym Mhrydain yn codi cytiau ag aelwydydd, fel un yn Howick yn Northumberland, felly golau tân oedd yn goleuo’r nos. Nid oes tŷ mor hen â hyn yn hysbys yng Nghymru.',
    },
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'The hut at Howick, in Northumberland, c. 7800 BC, had hearths: a far analogy, since no house of this age is known in Wales. Roundhouses are drawn with a central hearth by analogy, since no excavation of Garn Goch is recorded. How bright a doorway looked is guessed. Before 7800 BC the app says nothing of how the night was lit.',
        cy: 'Roedd aelwydydd yn y cwt yn Howick, yn Northumberland, tua 7800 CC: cymhariaeth bell, gan nad oes tŷ o’r oes hon yn hysbys yng Nghymru. Mae’r tai crwn yn cael aelwyd ganolog trwy gymhariaeth, gan nad oes cofnod o gloddio yng Ngarn Goch. Dyfalu yw pa mor ddisglair oedd drws. Cyn 7800 CC nid yw’r ap yn dweud dim am sut y goleuwyd y nos.',
      },
      sources: [src('hunters:S36'), src('hunters:S20')],
    },
  },
  {
    // Changes nothing in the scene (the levels match the hearth key); it gives the almanac the court's
    // candles. 1200 only marks the Middle Ages: no source read dates the Deheubarth law-book itself.
    year: ad(1200),
    dated: 'in',
    homes: 'hearth',
    streets: { kind: 'none' },
    warmth: 1,
    windows: 0.25,
    glow: 0.45,
    hearth: 1,
    text: {
      en: 'In the Middle Ages a Welsh law-book linked to Deheubarth seats a candle-bearer before the king. What lit ordinary homes is not recorded: firelight at least, perhaps rushlights.',
      cy: 'Yn yr Oesoedd Canol mae llyfr cyfraith Cymreig sy’n gysylltiedig â Deheubarth yn gosod canhwyllydd o flaen y brenin. Nid oes cofnod o beth oedd yn goleuo cartrefi cyffredin: golau tân o leiaf, canhwyllau brwyn efallai.',
    },
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'A Welsh court burned candles: the Dimetian Code, as Aneurin Owen named the law-book associated with Deheubarth, seats a candle-bearer before the king and protects him "from the time of lighting the first candle, in the palace, until the last shall be extinguished". The earliest manuscripts of Welsh law, in Latin, are from the early 13th century; no source read dates this text’s own manuscripts, so the year 1200 here only marks the Middle Ages. A law-book says what a court should have, not what Dinefwr lit, so no candlelight is drawn at Dinefwr. Nothing read describes how ordinary homes were lit; they are drawn with firelight.',
        cy: 'Roedd llys Cymreig yn llosgi canhwyllau: mae’r Cod Dyfedaidd (Dimetian Code), fel y galwodd Aneurin Owen y llyfr cyfraith sy’n gysylltiedig â Deheubarth, yn gosod canhwyllydd o flaen y brenin, a’i nawdd yn para o gynnau’r gannwyll gyntaf yn y llys hyd nes diffodd yr olaf. Daw’r llawysgrifau cynharaf o gyfraith Cymru, yn Lladin, o ddechrau’r 13eg ganrif; nid oes ffynhonnell a ddarllenwyd yn dyddio llawysgrifau’r testun hwn ei hun, felly dim ond nodi’r Oesoedd Canol y mae’r flwyddyn 1200 yma. Dweud beth ddylai fod gan lys y mae llyfr cyfraith, nid beth a oleuwyd yn Ninefwr, felly ni ddangosir golau cannwyll yn Ninefwr. Nid oes dim a ddarllenwyd yn disgrifio sut y goleuwyd cartrefi cyffredin; fe’u dangosir â golau tân.',
      },
      sources: [src('music:S3'), src('medieval:S41')],
    },
  },
  {
    year: ad(1750),
    dated: 'by',
    homes: 'rushlight',
    streets: { kind: 'none' },
    warmth: 1,
    windows: 0.3,
    glow: 0.55,
    hearth: 1,
    text: {
      en: 'By 1750 farmhouses like Cilewent, in mid Wales, burned rushlights: rushes dipped in fat. In the long summer days, working people rose and went to bed with the daylight.',
      cy: 'Erbyn 1750 roedd ffermdai fel Cilewent, yng nghanolbarth Cymru, yn llosgi canhwyllau brwyn: brwyn wedi’u trochi mewn saim. Yn nyddiau hir yr haf, codai gweithwyr ac âi i’r gwely gyda golau dydd.',
    },
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'Rushlights: rushes dipped in fat and held in an iron holder, as at Cilewent farmhouse (furnished as in 1750, now at St Fagans). 1750 is the date Cilewent is furnished to, not when rushlights began; when they were first burned here is not known. Gilbert White (Hampshire, 1775) describes peeling the rushes, and says working people burned no candles in the long days, rising and going to bed by daylight, while small farmers used rushes on winter mornings and evenings. Both come from outside this valley, and the share of lit windows is guessed.',
        cy: 'Canhwyllau brwyn: brwyn wedi’u trochi mewn saim a’u dal mewn daliwr haearn, fel yn ffermdy Cilewent (wedi’i ddodrefnu fel yn 1750, yn Sain Ffagan heddiw). 1750 yw’r flwyddyn y dodrefnwyd Cilewent iddi, nid pryd y dechreuwyd defnyddio canhwyllau brwyn; nid yw’n hysbys pryd y’u llosgwyd gyntaf yma. Mae Gilbert White (Hampshire, 1775) yn disgrifio pilio’r brwyn, ac yn dweud nad oedd gweithwyr yn llosgi canhwyllau yn y dyddiau hir, gan godi a mynd i’r gwely gyda golau dydd, tra oedd ffermwyr bach yn defnyddio brwyn ar foreau a nosweithiau’r gaeaf. Daw’r ddwy ffynhonnell o’r tu allan i’r dyffryn hwn, a dyfalu yw faint o ffenestri oedd wedi’u goleuo.',
      },
      sources: [src('light:S13'), src('light:S14')],
    },
  },
  {
    year: ad(1864),
    dated: 'by',
    homes: 'oil-lamp',
    streets: { kind: 'none' },
    warmth: 0.9,
    windows: 0.45,
    glow: 0.7,
    hearth: 1,
    text: {
      en: 'By 1864 paraffin lamps were on sale in Carmarthen: a brighter light for those who could pay.',
      cy: 'Erbyn 1864 roedd lampau paraffin ar werth yng Nghaerfyrddin: golau mwy disglair i’r rhai a allai dalu.',
    },
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'Paraffin lamps were on sale in Carmarthen by 1864, and Llandeilo station still had oil lamps in 1902. How many homes here had them, and from when, is not known; the warmer, brighter windows are guessed.',
        cy: 'Roedd lampau paraffin ar werth yng Nghaerfyrddin erbyn 1864, ac roedd lampau olew o hyd yng ngorsaf Llandeilo yn 1902. Nid yw’n hysbys faint o gartrefi yma oedd â nhw, nac ers pryd; dyfalu yw’r ffenestri cynhesach, mwy disglair.',
      },
      sources: [src('light:S12'), src('light:S11')],
    },
  },
  {
    year: ad(1876),
    dated: 'by',
    homes: 'oil-lamp',
    streets: { kind: 'gas', glow: 0.7, area: TOWN_NORTH_OF_TYWI },
    warmth: 0.85,
    windows: 0.5,
    glow: 0.75,
    hearth: 1,
    text: {
      en: 'By 1876 gas lamps lit Llandeilo’s streets in winter, from the gas works begun in 1864. When they were first lit is not known.',
      cy: 'Erbyn 1876 roedd lampau nwy yn goleuo strydoedd Llandeilo yn y gaeaf, o’r gwaith nwy y dechreuwyd ei godi yn 1864. Nid yw’n hysbys pryd y’u cyneuwyd gyntaf.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S4'), src('light:S8'), src('light:S1'), src('light:S2'), src('light:S21')],
      note: {
        en: `Gas street lamps, lit by the Llandilo Gas Company. The works and street mains were begun in 1864 (S1, S2); when they were finished is not known. In 1902 the streets are remembered as having been "gas lit" (S8). When they were first lit is not known: 1876 is the first year a source (S4 alone) says the town lamps were lit "as heretofore", so it is a latest date, not the start. S4 has them lit "during the winter", and in 1902 the lamplighter worked "to the end of the season" (S21), so they seem to have been dark in summer; the scene does not model seasons. Where the lamps stood is not recorded: they are drawn along today’s streets.${WHERE.en}`,
        cy: `Lampau stryd nwy, wedi’u cynnau gan Gwmni Nwy Llandeilo. Dechreuwyd codi’r gwaith nwy a’r prif bibellau stryd yn 1864 (S1, S2); nid yw’n hysbys pryd y’u gorffennwyd. Yn 1902 cofir bod y strydoedd “dan olau nwy” (S8). Nid yw’n hysbys pryd y’u goleuwyd gyntaf: 1876 yw’r flwyddyn gyntaf y mae ffynhonnell (S4 yn unig) yn dweud bod lampau’r dref yn cael eu cynnau “fel o’r blaen”, felly dyddiad hwyraf ydyw, nid y dechrau. Yn ôl S4 fe’u cyneuwyd “yn ystod y gaeaf”, ac yn 1902 gweithiai’r goleuwr lampau “hyd ddiwedd y tymor” (S21), felly mae’n debyg eu bod yn dywyll yn yr haf; nid yw’r olygfa’n dangos tymhorau. Nid yw’n hysbys ble safai’r lampau: fe’u dangosir ar hyd strydoedd heddiw.${WHERE.cy}`,
      },
    },
  },
  {
    // About 1 September 1902: a columnist on 5 September describes the streets as already electrically lit.
    year: ad(1902.67),
    dated: 'by',
    homes: 'oil-lamp',
    streets: { kind: 'electric', glow: 0.9, area: TOWN_NORTH_OF_TYWI },
    warmth: 0.85,
    windows: 0.5,
    glow: 0.75,
    hearth: 1,
    text: {
      en: 'By September 1902 the town’s streets were lit by electricity, the council’s own, and by October many of the town’s tradespeople were having it installed. How homes were lit is not recorded.',
      cy: 'Erbyn Medi 1902 roedd strydoedd y dref dan olau trydan, eiddo’r cyngor ei hun, ac erbyn Hydref roedd llawer o fasnachwyr y dref yn ei osod. Nid oes cofnod o sut y goleuwyd cartrefi.',
    },
    provenance: {
      kind: 'documented',
      sources: [
        src('light:S8'),
        src('light:S10'),
        src('light:S5'),
        src('light:S20'),
        src('light:S31'),
        src('light:S11'),
      ],
      note: {
        en: `Electric street light, the Urban District Council’s own, by September 1902: a columnist mocked those who saw "no difference in the streets now that they are electrically lit than when they were gas lit". The exact day is not known. From October 1902 the town lamps were to be lit from half an hour after sunset till 11 o’clock every night of the year (S20); the scene does not yet put them out at 11. Not every spot was lit: in December 1902 there was "no light whatever" at the turn from Trallwm to Station Road (S11). The council sold electricity by the meter (S20), and in October a columnist was glad that “so many of the tradespeople of the town are having the light installed” (S31), so shops, and perhaps the homes above them, were getting it. No source read says how homes were lit, so they are drawn with flame light as before, which is a guess, as is the share of lit windows.${FARMS_GUESS.en}${WHERE.en}`,
        cy: `Golau stryd trydan, eiddo Cyngor Dosbarth Trefol Llandeilo ei hun, erbyn Medi 1902: gwawdiodd colofnydd y rhai na welai ddim gwahaniaeth rhwng y strydoedd dan olau trydan a’r strydoedd dan olau nwy. Nid yw’r union ddiwrnod yn hysbys. O fis Hydref 1902 roedd lampau’r dref i’w cynnau o hanner awr wedi machlud yr haul hyd 11 o’r gloch bob nos drwy’r flwyddyn (S20); nid yw’r olygfa eto’n eu diffodd am 11. Nid oedd pob man wedi’i oleuo: ym mis Rhagfyr 1902 nid oedd “dim golau o gwbl” ar y tro o’r Trallwm i Station Road (S11). Gwerthai’r cyngor drydan wrth y mesurydd (S20), ac ym mis Hydref roedd colofnydd yn falch bod “cymaint o fasnachwyr y dref” yn gosod y golau (S31), felly roedd siopau, ac efallai’r cartrefi uwch eu pennau, yn ei gael. Nid oes ffynhonnell a ddarllenwyd yn dweud sut y goleuwyd cartrefi, felly fe’u dangosir â golau fflam fel o’r blaen, sy’n ddyfaliad, fel cyfran y ffenestri golau.${FARMS_GUESS.cy}${WHERE.cy}`,
      },
    },
  },
  {
    year: ad(1939.67),
    dated: 'on',
    homes: 'blacked-out',
    streets: { kind: 'off' },
    warmth: 0.5,
    windows: 0,
    glow: 0,
    hearth: 0,
    text: {
      en: 'From 1 September 1939, the blackout: every window covered and the street lamps put out after dark.',
      cy: 'O 1 Medi 1939, y blacowt: pob ffenestr wedi’i gorchuddio a lampau’r stryd wedi’u diffodd wedi iddi nosi.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S15'), src('light:S19')],
      note: {
        en: 'The blackout, from 1 September 1939: windows covered and street lamps out after dark, across Britain. The Imperial War Museums and a home-front history site give the same date. Later in the war some towns allowed faint "star" lighting; whether Llandeilo did is not known, so its streets stay dark here. No local account of Llandeilo’s blackout has been read.',
        cy: 'Y blacowt, o 1 Medi 1939: ffenestri wedi’u gorchuddio a lampau stryd wedi’u diffodd wedi iddi nosi, ledled Prydain. Mae’r Amgueddfeydd Rhyfel Imperialaidd a gwefan hanes y ffrynt cartref yn rhoi’r un dyddiad. Yn ddiweddarach yn y rhyfel caniataodd rhai trefi olau “seren” gwan; nid yw’n hysbys a wnaeth Llandeilo hynny, felly mae ei strydoedd yn aros yn dywyll yma. Nid oes hanes lleol o’r blacowt yn Llandeilo wedi’i ddarllen.',
      },
    },
  },
  {
    // 17 September 1944, the day the relaxations came into force outside listed areas (Hansard written answer, 28 September 1944).
    year: ad(1944.71),
    dated: 'on',
    homes: 'curtained',
    streets: { kind: 'dimmed', glow: 0.25, area: TOWN_NORTH_OF_TYWI },
    warmth: 0.5,
    windows: 0.5,
    glow: 0.12,
    hearth: 0,
    text: {
      en: 'From 17 September 1944, the dim-out, except in some listed, mostly coastal, areas: homes could use ordinary curtains and show a little light, and councils could light the streets to about moonlight.',
      cy: 'O 17 Medi 1944, y pylu, ac eithrio rhai ardaloedd rhestredig, ar yr arfordir gan mwyaf: câi cartrefi ddefnyddio llenni cyffredin a dangos ychydig o olau, a châi cynghorau oleuo’r strydoedd i lefel golau lleuad, fwy neu lai.',
    },
    provenance: {
      kind: 'documented',
      sources: [
        src('light:S26'),
        src('light:S27'),
        src('light:S28'),
        src('light:S30'),
        src('light:S15'),
        src('light:S17'),
        src('light:S19'),
      ],
      note: {
        en: `The dim-out, from 17 September 1944: the relaxations began that day except in areas listed in the order, which no source read names; the exceptions found are coastal. Whether Llandeilo, an inland town, was one is not known. Homes were allowed half-lighting behind ordinary curtains, though in February 1945 the Home Secretary still would not end the blacking-out of homes; each council chose its own street-lighting standard. How much light Llandeilo showed is guessed: faint windows and dim street lamps, whose warm colour is a guess too.${WHERE.en}`,
        cy: `Y pylu, o 17 Medi 1944: dechreuodd y llacio y diwrnod hwnnw ac eithrio mewn ardaloedd a restrwyd yn y gorchymyn, nad oes ffynhonnell a ddarllenwyd yn eu henwi; ar yr arfordir y mae’r eithriadau a gafwyd. Nid yw’n hysbys a oedd Llandeilo, tref fewndirol, yn un ohonynt. Caniatawyd hanner golau i gartrefi y tu ôl i lenni cyffredin, er na fyddai’r Ysgrifennydd Cartref ym mis Chwefror 1945 yn rhoi terfyn ar dywyllu cartrefi o hyd; dewisai pob cyngor ei safon ei hun ar gyfer goleuo’r strydoedd. Dyfalu yw faint o olau a ddangosai Llandeilo: ffenestri gwan a lampau stryd pŵl, ac mae eu lliw cynnes yn ddyfaliad hefyd.${WHERE.cy}`,
      },
    },
  },
  {
    // 8 May 1945, VE Day: the latest date the Home Secretary gave for lifting the blackout everywhere.
    year: ad(1945.35),
    dated: 'by',
    homes: 'mixed',
    // What lamps lit the streets after the war is not researched; this warm colour is a guess.
    streets: { kind: 'electric', glow: 0.9, area: TOWN_NORTH_OF_TYWI, warmth: 0.45 },
    warmth: 0.45,
    windows: 0.6,
    glow: 0.95,
    hearth: 0.6,
    text: {
      en: 'By 8 May 1945 the blackout had been lifted across most of Britain, though some coastal areas waited longer. When Llandeilo’s lamps came back on is not known.',
      cy: 'Erbyn 8 Mai 1945 roedd y blacowt wedi’i godi ar draws y rhan fwyaf o Brydain, er i rai ardaloedd arfordirol aros yn hwy. Nid yw’n hysbys pryd y daeth lampau Llandeilo ymlaen eto.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S18'), src('light:S19'), src('light:S29')],
      note: {
        en: `On 12 April 1945 the Home Secretary meant to lift the blackout in all districts no later than the end of the war in Europe, 8 May 1945 (S18); a home-front history site says full street lighting came in April 1945 (S19). Most restrictions had gone by 2 May; some coastal areas kept them into peacetime (S29). When Llandeilo’s lamps came back on is not known, so this is a latest date for an inland town. Homes are drawn with a mix of electric and flame light: when Llandeilo’s homes got electricity is not known, so the share and the brightness of windows and streets are guessed. What kind of lamps lit the streets after the war is not researched either, so their warm colour is a guess.${FARMS.en}${WHERE.en}`,
        cy: `Ar 12 Ebrill 1945 bwriadai’r Ysgrifennydd Cartref godi’r blacowt ym mhob ardal heb fod yn hwyrach na diwedd y rhyfel yn Ewrop, 8 Mai 1945 (S18); mae gwefan hanes y ffrynt cartref yn dweud i oleuadau stryd llawn ddod ym mis Ebrill 1945 (S19). Roedd y rhan fwyaf o’r cyfyngiadau wedi mynd erbyn 2 Mai; cadwodd rhai ardaloedd arfordirol nhw i mewn i amser heddwch (S29). Nid yw’n hysbys pryd y daeth lampau Llandeilo yn ôl, felly dyddiad hwyraf yw hwn ar gyfer tref fewndirol. Mae cartrefi’n cael cymysgedd o olau trydan a golau fflam: nid yw’n hysbys pryd y cafodd cartrefi Llandeilo drydan, felly dyfalu yw’r gyfran a disgleirdeb y ffenestri a’r strydoedd. Nid oes ymchwil ychwaith i ba fath o lampau a oleuai’r strydoedd ar ôl y rhyfel, felly dyfalu yw eu lliw cynnes.${FARMS.cy}${WHERE.cy}`,
      },
    },
  },
];

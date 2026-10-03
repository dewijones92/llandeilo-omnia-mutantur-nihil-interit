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

const FARMS = {
  en: ' Farms across the valley are drawn with the same windows as the town, which is a guess: when farms got mains electricity is not known.',
  cy: ' Mae ffermydd ar draws y dyffryn yn cael yr un ffenestri â’r dref, sy’n ddyfaliad: nid yw’n hysbys pryd y cafodd ffermydd drydan o’r prif gyflenwad.',
};
const WHERE = {
  en: ' Street lamps are drawn only in the town north of the Tywi; whether Ffairfach was lit is not known.',
  cy: ' Dim ond yn y dref i’r gogledd o’r Tywi y dangosir lampau stryd; nid yw’n hysbys a oleuwyd Ffairfach.',
};

// Research: docs/research/light-after-dark.md. Each key holds until the next (ADR 0030).
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
      en: 'By 7800 BC, and long before, firelight from the hearth lit every home after dark.',
      cy: 'Erbyn 7800 CC, a ymhell cyn hynny, golau tân yr aelwyd oedd yn goleuo pob cartref wedi iddi nosi.',
    },
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'Firelight from the hearth was the light of every early home. The hut at Howick, c. 7800 BC, had hearths; roundhouses are drawn with a central hearth by analogy, since Garn Goch is unexcavated. How bright a doorway looked is guessed.',
        cy: 'Golau tân yr aelwyd oedd golau pob cartref cynnar. Roedd aelwydydd yn y cwt yn Howick, tua 7800 CC; mae’r tai crwn yn cael aelwyd ganolog trwy gymhariaeth, gan nad yw Garn Goch wedi’i chloddio. Dyfalu yw pa mor ddisglair oedd drws.',
      },
      sources: [src('hunters:S36')],
    },
  },
  {
    // Changes nothing in the scene (the levels match the hearth key); it gives the almanac the court's candles.
    year: ad(1200),
    dated: 'by',
    homes: 'hearth',
    streets: { kind: 'none' },
    warmth: 1,
    windows: 0.25,
    glow: 0.45,
    hearth: 1,
    text: {
      en: 'By about 1200 a Welsh court’s law-book seats a candle-bearer before the king. Ordinary homes still had firelight alone.',
      cy: 'Erbyn tua 1200 mae llyfr cyfraith llys Cymreig yn gosod canhwyllydd o flaen y brenin. Golau tân yn unig oedd gan gartrefi cyffredin o hyd.',
    },
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'A Welsh court burned candles: the law-book of Deheubarth, in manuscripts from the early 13th century, seats a candle-bearer before the king and protects him "from the time of lighting the first candle, in the palace, until the last shall be extinguished". A law-book says what a court should have, not what Dinefwr lit, so no candlelight is drawn at Dinefwr. Ordinary homes had firelight; nothing read describes them.',
        cy: 'Roedd llys Cymreig yn llosgi canhwyllau: mae llyfr cyfraith Deheubarth, mewn llawysgrifau o ddechrau’r 13eg ganrif, yn gosod canhwyllydd o flaen y brenin, a’i nawdd yn para o gynnau’r gannwyll gyntaf yn y llys hyd nes diffodd yr olaf. Dweud beth ddylai fod gan lys y mae llyfr cyfraith, nid beth a oleuwyd yn Ninefwr, felly ni ddangosir golau cannwyll yn Ninefwr. Golau tân oedd gan gartrefi cyffredin; nid oes dim a ddarllenwyd yn eu disgrifio.',
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
      en: 'By 1750, and long before, farmhouses and cottages burned rushlights: peeled rushes dipped in fat. Working people went to bed with the daylight.',
      cy: 'Erbyn 1750, a ymhell cyn hynny, roedd ffermdai a bythynnod yn llosgi canhwyllau brwyn: brwyn wedi’u pilio a’u trochi mewn saim. Âi gweithwyr i’r gwely gyda golau dydd.',
    },
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'Rushlights: rushes peeled, dipped in fat and held in an iron holder, as at Cilewent farmhouse (furnished as in 1750, now at St Fagans). 1750 is the date Cilewent is furnished to, not when rushlights began: they were used long before, and the key only marks a date they are recorded. Gilbert White (Hampshire, 1775) says working people burned no candles in the long days and went to bed by daylight. Both come from outside this valley, and the share of lit windows is guessed.',
        cy: 'Canhwyllau brwyn: brwyn wedi’u pilio, eu trochi mewn saim a’u dal mewn daliwr haearn, fel yn ffermdy Cilewent (wedi’i ddodrefnu fel yn 1750, yn Sain Ffagan heddiw). 1750 yw’r flwyddyn y dodrefnwyd Cilewent iddi, nid pryd y dechreuwyd defnyddio canhwyllau brwyn: roedden nhw’n cael eu defnyddio ymhell cyn hynny, a dim ond dyddiad pan gânt eu cofnodi y mae’r allwedd yn ei nodi. Mae Gilbert White (Hampshire, 1775) yn dweud nad oedd gweithwyr yn llosgi canhwyllau yn y dyddiau hir, ac mai gyda golau dydd yr aent i’r gwely. Daw’r ddwy ffynhonnell o’r tu allan i’r dyffryn hwn, a dyfalu yw faint o ffenestri oedd wedi’u goleuo.',
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
      en: 'By 1876 gas lamps lit Llandeilo’s streets in winter, fed from the gas works built in 1864. When they were first lit is not known.',
      cy: 'Erbyn 1876 roedd lampau nwy yn goleuo strydoedd Llandeilo yn y gaeaf, o’r gwaith nwy a godwyd yn 1864. Nid yw’n hysbys pryd y’u cyneuwyd gyntaf.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S4'), src('light:S8'), src('light:S1'), src('light:S2')],
      note: {
        en: `Gas street lamps, lit by the Llandilo Gas Company. The works and street mains were built in 1864 (S1, S2), and in 1902 the streets are remembered as having been "gas lit" (S8). When they were first lit is not known: 1876 is the first year a source (S4 alone) says the town lamps were lit "as heretofore", so it is a latest date, not the start. Where the lamps stood is not recorded: they are drawn along today’s streets.${WHERE.en}`,
        cy: `Lampau stryd nwy, wedi’u cynnau gan Gwmni Nwy Llandeilo. Codwyd y gwaith nwy a’r prif bibellau stryd yn 1864 (S1, S2), ac yn 1902 cofir bod y strydoedd “dan olau nwy” (S8). Nid yw’n hysbys pryd y’u goleuwyd gyntaf: 1876 yw’r flwyddyn gyntaf y mae ffynhonnell (S4 yn unig) yn dweud bod lampau’r dref yn cael eu cynnau “fel o’r blaen”, felly dyddiad hwyraf ydyw, nid y dechrau. Nid yw’n hysbys ble safai’r lampau: fe’u dangosir ar hyd strydoedd heddiw.${WHERE.cy}`,
      },
    },
  },
  {
    // About 1 September 1902: a columnist on 5 September describes the streets as already electrically lit.
    year: ad(1902.67),
    dated: 'by',
    homes: 'mixed',
    streets: { kind: 'electric', glow: 0.9, area: TOWN_NORTH_OF_TYWI },
    warmth: 0.7,
    windows: 0.55,
    glow: 0.85,
    hearth: 1,
    text: {
      en: 'By September 1902 the town’s streets were lit by electricity, the council’s own. Homes mixed electric light, gas and oil.',
      cy: 'Erbyn Medi 1902 roedd strydoedd y dref dan olau trydan, eiddo’r cyngor ei hun. Roedd cartrefi’n cymysgu golau trydan, nwy ac olew.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S8'), src('light:S10'), src('light:S5')],
      note: {
        en: `Electric street light, the Urban District Council’s own, by September 1902: a columnist mocked those who saw "no difference in the streets now that they are electrically lit than when they were gas lit". The exact day is not known. Homes mixed electric light, gas and oil; the share is guessed.${FARMS.en}${WHERE.en}`,
        cy: `Golau stryd trydan, eiddo Cyngor Dosbarth Trefol Llandeilo ei hun, erbyn Medi 1902: gwawdiodd colofnydd y rhai na welai ddim gwahaniaeth rhwng y strydoedd dan olau trydan a’r strydoedd dan olau nwy. Nid yw’r union ddiwrnod yn hysbys. Roedd cartrefi’n cymysgu golau trydan, nwy ac olew; dyfalu yw’r gyfran.${FARMS.cy}${WHERE.cy}`,
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
      en: 'From 1 September 1939, the blackout: every window covered and every street lamp out after dark.',
      cy: 'O 1 Medi 1939, y blacowt: pob ffenestr wedi’i gorchuddio a phob lamp stryd wedi’i diffodd wedi iddi nosi.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S15'), src('light:S19')],
      note: {
        en: 'The blackout, from 1 September 1939: windows covered and street lamps out after dark, across Britain. The Imperial War Museums and a home-front history site give the same date. No local account of Llandeilo’s blackout has been read.',
        cy: 'Y blacowt, o 1 Medi 1939: ffenestri wedi’u gorchuddio a lampau stryd wedi’u diffodd wedi iddi nosi, ledled Prydain. Mae’r Amgueddfeydd Rhyfel Imperialaidd a gwefan hanes y ffrynt cartref yn rhoi’r un dyddiad. Nid oes hanes lleol o’r blacowt yn Llandeilo wedi’i ddarllen.',
      },
    },
  },
  {
    // September 1944; the sources give the month only.
    year: ad(1944.71),
    dated: 'on',
    homes: 'curtained',
    streets: { kind: 'dimmed', glow: 0.25, area: TOWN_NORTH_OF_TYWI },
    warmth: 0.5,
    windows: 0.5,
    glow: 0.12,
    hearth: 0,
    text: {
      en: 'From September 1944, the dim-out: a little light allowed at home and in the streets, though blackout curtains stayed.',
      cy: 'O fis Medi 1944, y pylu: caniatawyd ychydig o olau yn y cartref ac ar y strydoedd, er i’r llenni blacowt aros.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S15'), src('light:S16'), src('light:S17'), src('light:S19')],
      note: {
        en: `The dim-out, from September 1944: some domestic lighting was allowed, but homes were still blacked out in February 1945, and street lighting was eased that winter. How much light Llandeilo showed is guessed: faint windows and dim street lamps.${WHERE.en}`,
        cy: `Y pylu, o fis Medi 1944: caniatawyd rhywfaint o olau yn y cartref, ond roedd cartrefi’n dal i dywyllu eu ffenestri ym mis Chwefror 1945, a llaciwyd y rheolau ar oleuadau stryd y gaeaf hwnnw. Dyfalu yw faint o olau a ddangosai Llandeilo: ffenestri gwan a lampau stryd pŵl.${WHERE.cy}`,
      },
    },
  },
  {
    // 8 May 1945, VE Day: the latest date the Home Secretary gave for lifting the blackout everywhere.
    year: ad(1945.35),
    dated: 'by',
    homes: 'mixed',
    streets: { kind: 'electric', glow: 0.9, area: TOWN_NORTH_OF_TYWI },
    warmth: 0.45,
    windows: 0.6,
    glow: 0.95,
    hearth: 0.6,
    text: {
      en: 'By 8 May 1945 the blackout was over everywhere, and the streets were lit again.',
      cy: 'Erbyn 8 Mai 1945 roedd y blacowt ar ben ym mhob man, a’r strydoedd wedi’u goleuo eto.',
    },
    provenance: {
      kind: 'documented',
      sources: [src('light:S18'), src('light:S19')],
      note: {
        en: `On 12 April 1945 the Home Secretary meant to lift the blackout in all districts no later than the end of the war in Europe, 8 May 1945 (S18); a home-front history site says full street lighting came in April 1945 (S19). When Llandeilo’s lamps came back on is not known, so the key is a latest date. Window and street brightness after that are guessed.${FARMS.en}${WHERE.en}`,
        cy: `Ar 12 Ebrill 1945 bwriadai’r Ysgrifennydd Cartref godi’r blacowt ym mhob ardal heb fod yn hwyrach na diwedd y rhyfel yn Ewrop, 8 Mai 1945 (S18); mae gwefan hanes y ffrynt cartref yn dweud i oleuadau stryd llawn ddod ym mis Ebrill 1945 (S19). Nid yw’n hysbys pryd y daeth lampau Llandeilo yn ôl, felly dyddiad hwyraf yw’r allwedd. Dyfalu yw disgleirdeb y ffenestri a’r strydoedd wedi hynny.${FARMS.cy}${WHERE.cy}`,
      },
    },
  },
];

import type { NonEmptyArray } from '../domain/assert.ts';
import type { LampKey } from '../domain/lamplight.ts';
import { ad, bc } from '../domain/time.ts';
import { src } from './ids.ts';

// Research: docs/research/light-after-dark.md. Each key holds until the next (ADR 0028).
// Window shares, glow and colour are reconstructed in every key; no source counts lit windows.
export const LAMPLIGHT: NonEmptyArray<LampKey> = [
  {
    year: bc(7800),
    homes: 'hearth',
    street: 'none',
    warmth: 1,
    windows: 0.25,
    glow: 0.45,
    hearth: 1,
    streetGlow: 0,
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
    year: ad(1200),
    homes: 'hearth',
    street: 'none',
    warmth: 1,
    windows: 0.25,
    glow: 0.45,
    hearth: 1,
    streetGlow: 0,
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'A Welsh court burned candles: the law-book of Deheubarth, in manuscripts from the early 13th century, seats a candle-bearer before the king and protects him "from the time of lighting the first candle, in the palace, until the last shall be extinguished". A law-book says what a court should have, not what Dinefwr lit. Ordinary homes had firelight; nothing read describes them.',
        cy: 'Roedd llys Cymreig yn llosgi canhwyllau: mae llyfr cyfraith Deheubarth, mewn llawysgrifau o ddechrau’r 13eg ganrif, yn gosod canhwyllydd o flaen y brenin, a’i nawdd yn para o gynnau’r gannwyll gyntaf yn y llys hyd nes diffodd yr olaf. Dweud beth ddylai fod gan lys y mae llyfr cyfraith, nid beth a oleuwyd yn Ninefwr. Golau tân oedd gan gartrefi cyffredin; nid oes dim a ddarllenwyd yn eu disgrifio.',
      },
      sources: [src('music:S3'), src('medieval:S41')],
    },
  },
  {
    year: ad(1750),
    homes: 'rushlight',
    street: 'none',
    warmth: 1,
    windows: 0.3,
    glow: 0.55,
    hearth: 1,
    streetGlow: 0,
    provenance: {
      kind: 'reconstructed',
      basis: {
        en: 'Rushlights: rushes peeled, dipped in fat and held in an iron holder, as at Cilewent farmhouse (furnished as in 1750, now at St Fagans). Gilbert White (Hampshire, 1775) says working people burned no candles in the long days and went to bed by daylight. Both come from outside this valley, and the share of lit windows is guessed.',
        cy: 'Canhwyllau brwyn: brwyn wedi’u pilio, eu trochi mewn saim a’u dal mewn daliwr haearn, fel yn ffermdy Cilewent (wedi’i ddodrefnu fel yn 1750, yn Sain Ffagan heddiw). Mae Gilbert White (Hampshire, 1775) yn dweud nad oedd gweithwyr yn llosgi canhwyllau yn y dyddiau hir, ac mai gyda golau dydd yr aent i’r gwely. Daw’r ddwy ffynhonnell o’r tu allan i’r dyffryn hwn, a dyfalu yw faint o ffenestri oedd wedi’u goleuo.',
      },
      sources: [src('light:S13'), src('light:S14')],
    },
  },
  {
    year: ad(1864),
    homes: 'oil-lamp',
    street: 'none',
    warmth: 0.9,
    windows: 0.45,
    glow: 0.7,
    hearth: 1,
    streetGlow: 0,
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
    homes: 'oil-lamp',
    street: 'gas',
    warmth: 0.85,
    windows: 0.5,
    glow: 0.75,
    hearth: 1,
    streetGlow: 0.7,
    provenance: {
      kind: 'documented',
      sources: [src('light:S4'), src('light:S1'), src('light:S2')],
      note: {
        en: 'Gas street lamps, lit by the Llandilo Gas Company. The works and street mains were built in 1864; when the streets were first lit is not known, so the lamps are drawn from 1876, the first year a source says the town lamps were lit "as heretofore". Where the lamps stood is not recorded: they are drawn along today’s streets.',
        cy: 'Lampau stryd nwy, wedi’u cynnau gan Gwmni Nwy Llandeilo. Codwyd y gwaith nwy a’r prif bibellau stryd yn 1864; nid yw’n hysbys pryd y goleuwyd y strydoedd gyntaf, felly dangosir y lampau o 1876, y flwyddyn gyntaf y mae ffynhonnell yn dweud bod lampau’r dref yn cael eu cynnau “fel o’r blaen”. Nid yw’n hysbys ble safai’r lampau: fe’u dangosir ar hyd strydoedd heddiw.',
      },
    },
  },
  {
    // About 1 September 1902: a columnist on 5 September describes the streets as already electrically lit.
    year: ad(1902.67),
    homes: 'mixed',
    street: 'electric',
    warmth: 0.7,
    windows: 0.55,
    glow: 0.85,
    hearth: 1,
    streetGlow: 0.9,
    provenance: {
      kind: 'documented',
      sources: [src('light:S8'), src('light:S10'), src('light:S5')],
      note: {
        en: 'Electric street light, the Urban District Council’s own, by September 1902: a columnist mocked those who saw "no difference in the streets now that they are electrically lit than when they were gas lit". The exact day is not known. Homes mixed electric light, gas and oil; the share is guessed.',
        cy: 'Golau stryd trydan, eiddo Cyngor Dosbarth Trefol Llandeilo ei hun, erbyn Medi 1902: gwawdiodd colofnydd y rhai na welai ddim gwahaniaeth rhwng y strydoedd dan olau trydan a’r strydoedd dan olau nwy. Nid yw’r union ddiwrnod yn hysbys. Roedd cartrefi’n cymysgu golau trydan, nwy ac olew; dyfalu yw’r gyfran.',
      },
    },
  },
  {
    year: ad(1939.67),
    homes: 'blacked-out',
    street: 'off',
    warmth: 0.5,
    windows: 0,
    glow: 0,
    hearth: 0,
    streetGlow: 0,
    provenance: {
      kind: 'documented',
      sources: [src('light:S15')],
      note: {
        en: 'The blackout, from 1 September 1939: windows covered and street lamps out after dark, across Britain. No local account of Llandeilo’s blackout has been read.',
        cy: 'Y blacowt, o 1 Medi 1939: ffenestri wedi’u gorchuddio a lampau stryd wedi’u diffodd wedi iddi nosi, ledled Prydain. Nid oes hanes lleol o’r blacowt yn Llandeilo wedi’i ddarllen.',
      },
    },
  },
  {
    // September 1944; IWM gives the month only.
    year: ad(1944.71),
    homes: 'curtained',
    street: 'dimmed',
    warmth: 0.5,
    windows: 0.5,
    glow: 0.12,
    hearth: 0,
    streetGlow: 0.25,
    provenance: {
      kind: 'documented',
      sources: [src('light:S15'), src('light:S16'), src('light:S17')],
      note: {
        en: 'The dim-out, from September 1944: some domestic lighting was allowed, but homes were still blacked out in February 1945, and street lighting was eased that winter. How much light Llandeilo showed is guessed: faint windows and dim street lamps.',
        cy: 'Y pylu, o fis Medi 1944: caniatawyd rhywfaint o olau yn y cartref, ond roedd cartrefi’n dal i dywyllu eu ffenestri ym mis Chwefror 1945, a llaciwyd y rheolau ar oleuadau stryd y gaeaf hwnnw. Dyfalu yw faint o olau a ddangosai Llandeilo: ffenestri gwan a lampau stryd pŵl.',
      },
    },
  },
  {
    // 8 May 1945, VE Day: the latest date the Home Secretary gave for lifting the blackout everywhere.
    year: ad(1945.35),
    homes: 'mixed',
    street: 'electric',
    warmth: 0.45,
    windows: 0.6,
    glow: 0.95,
    hearth: 0.6,
    streetGlow: 0.9,
    provenance: {
      kind: 'documented',
      sources: [src('light:S18')],
      note: {
        en: 'The blackout lifted in all districts no later than the end of the war in Europe, 8 May 1945. Window and street brightness after that are guessed.',
        cy: 'Codwyd y blacowt ym mhob ardal heb fod yn hwyrach na diwedd y rhyfel yn Ewrop, 8 Mai 1945. Dyfalu yw disgleirdeb y ffenestri a’r strydoedd wedi hynny.',
      },
    },
  },
];

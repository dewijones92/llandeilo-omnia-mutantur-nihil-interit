import type { LanguageCode, LanguageSnapshot, LanguageUse } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { ad, bc, range, type Year } from '../domain/time.ts';
import { src, type SourceKey } from './ids.ts';

const use = (whoEn: string, whoCy: string, language: LanguageCode, en: string, cy: string): LanguageUse => ({
  who: { en: whoEn, cy: whoCy },
  language,
  note: { en, cy },
});

const doc = (...k: [SourceKey, ...SourceKey[]]): Provenance => ({
  kind: 'documented',
  sources: [src(k[0]), ...k.slice(1).map(src)],
});

const snap = (
  id: string,
  from: Year,
  to: Year,
  uses: readonly LanguageUse[],
  provenance: Provenance,
): LanguageSnapshot => ({
  id,
  when: range(from, to),
  uses,
  provenance,
});

export const LANGUAGE: readonly LanguageSnapshot[] = [
  snap(
    'pre-celtic',
    bc(12500),
    bc(2001),
    [
      use(
        'Everyone',
        'Pawb',
        'unknown',
        'Nobody knows what language the first people here spoke. None of it survives.',
        "Does neb yn gwybod pa iaith roedd y bobl gyntaf yma'n ei siarad. Does dim ohoni wedi goroesi.",
      ),
    ],
    {
      kind: 'reconstructed',
      basis: { en: 'Genuinely unknown.', cy: 'Anhysbys go iawn.' },
      sources: [src('language:S1')],
    },
  ),
  snap(
    'early-celtic',
    bc(2000),
    bc(801),
    [
      use(
        'Everyone',
        'Pawb',
        'unknown',
        'Scholars disagree whether a Celtic language was spoken in Wales this early. Some argue it spread from the Atlantic west in the Bronze Age; others place it later.',
        'Mae ysgolheigion yn anghytuno a oedd iaith Geltaidd yn cael ei siarad yng Nghymru mor gynnar â hyn.',
      ),
    ],
    {
      kind: 'reconstructed',
      basis: { en: 'A live scholarly debate.', cy: 'Dadl ysgolheigaidd fyw.' },
      sources: [src('language:S2')],
    },
  ),
  snap(
    'brittonic',
    bc(800),
    ad(74),
    [
      use(
        'Everyone, of every rank',
        'Pawb, o bob gradd',
        'brittonic',
        'Common Brittonic, the Celtic ancestor of Welsh, Cornish and Breton. No sentence of it survives from here.',
        'Y Frythoneg, hynafiad Celtaidd y Gymraeg, y Gernyweg a’r Llydaweg. Does dim brawddeg ohoni wedi goroesi o’r fan hon.',
      ),
    ],
    doc('language:S32', 'language:S30'),
  ),
  snap(
    'roman',
    ad(75),
    ad(409),
    [
      use(
        'Farmers and most people',
        'Ffermwyr a’r rhan fwyaf o bobl',
        'brittonic',
        'Brittonic, picking up Latin words that still live in Welsh.',
        "Brythoneg, yn codi geiriau Lladin sy'n dal yn fyw yn y Gymraeg.",
      ),
      use(
        'Soldiers, officials, townsfolk of Moridunum',
        'Milwyr, swyddogion, trigolion Moridunum',
        'latin',
        'Latin, the language of the army, the administration and inscriptions.',
        "Lladin, iaith y fyddin, y weinyddiaeth a'r arysgrifau.",
      ),
    ],
    doc('language:S29', 'language:S30', 'language:S3'),
  ),
  snap(
    'primitive-welsh',
    ad(410),
    ad(799),
    [
      use(
        'Everyone',
        'Pawb',
        'old-welsh',
        'Brittonic changes into early Welsh, losing its word endings.',
        "Mae'r Frythoneg yn newid yn Gymraeg gynnar, gan golli terfyniadau ei geiriau.",
      ),
      use(
        'Clergy',
        'Clerigwyr',
        'latin',
        'Latin is still the only written language.',
        "Lladin yw'r unig iaith ysgrifenedig o hyd.",
      ),
    ],
    doc('language:S5', 'language:S20'),
  ),
  snap(
    'old-welsh',
    ad(800),
    ad(1092),
    [
      use(
        'Everyone',
        'Pawb',
        'old-welsh',
        'Old Welsh. Its earliest connected written text is a note in the gospel book kept at Llandeilo.',
        'Hen Gymraeg. Nodyn yn yr efengyl a gadwyd yn Llandeilo yw ei thestun ysgrifenedig cysylltiedig cynharaf.',
      ),
      use(
        'The clas clergy',
        'Clerigwyr y clas',
        'latin',
        'Latin for scripture and record, even opening the Welsh note with “Surexit”.',
        'Lladin ar gyfer yr ysgrythur a chofnodion, hyd yn oed yn agor y nodyn Cymraeg â “Surexit”.',
      ),
    ],
    doc('language:S5', 'language:S6', 'language:S4'),
  ),
  snap(
    'middle-welsh',
    ad(1093),
    ad(1282),
    [
      use(
        'Princes, poets, farmers, the unfree',
        'Tywysogion, beirdd, ffermwyr, taeogion',
        'middle-welsh',
        'Middle Welsh, the language of the court poets and the law of Hywel. A Welsh speaker today can follow much of it.',
        'Cymraeg Canol, iaith beirdd y llys a chyfraith Hywel. Gall siaradwr Cymraeg heddiw ddilyn llawer ohoni.',
      ),
      use(
        'Clergy and lawyers',
        'Clerigwyr a chyfreithwyr',
        'latin',
        'Latin for church and some law books.',
        'Lladin ar gyfer yr eglwys a rhai llyfrau cyfraith.',
      ),
      use(
        'Norman lords and incomers',
        'Arglwyddi Normanaidd a newydd-ddyfodiaid',
        'anglo-norman',
        'Anglo-Norman French arrives with the conquerors after 1093.',
        "Daw Ffrangeg Eingl-Normanaidd gyda'r concwerwyr ar ôl 1093.",
      ),
    ],
    doc('language:S8', 'language:S10', 'language:S11', 'language:S12'),
  ),
  snap(
    'after-conquest',
    ad(1283),
    ad(1499),
    [
      use(
        'The Welsh population and lower clergy',
        "Y boblogaeth Gymreig a'r clerigwyr is",
        'middle-welsh',
        'Welsh stays the language of daily life.',
        'Y Gymraeg yw iaith bywyd bob dydd o hyd.',
      ),
      use(
        'Marcher lords and royal officials',
        "Arglwyddi'r Mers a swyddogion y brenin",
        'anglo-norman',
        'French at first, shifting to English by the 14th and 15th centuries.',
        "Ffrangeg i ddechrau, gan symud i'r Saesneg erbyn y 14eg a'r 15fed ganrif.",
      ),
      use(
        'Church and courts',
        'Yr eglwys a’r llysoedd',
        'latin',
        'Latin for the written record.',
        'Lladin ar gyfer y cofnod ysgrifenedig.',
      ),
    ],
    doc('language:S12', 'language:S13'),
  ),
  snap(
    'early-modern',
    ad(1500),
    ad(1699),
    [
      use(
        'Ordinary people',
        'Pobl gyffredin',
        'welsh',
        'Mostly Welsh-speaking only. The 1588 Welsh Bible gives the language a standard written form.',
        "Cymraeg yn unig gan mwyaf. Mae Beibl Cymraeg 1588 yn rhoi ffurf ysgrifenedig safonol i'r iaith.",
      ),
      use(
        'The gentry',
        'Y boneddigion',
        'english',
        'Increasingly English after the Acts of Union, which required English for office.',
        'Yn fwyfwy Saesneg ar ôl y Deddfau Uno, a oedd yn mynnu Saesneg ar gyfer swyddi.',
      ),
    ],
    doc('language:S14', 'language:S16', 'language:S20'),
  ),
  snap(
    'chapel-and-estate',
    ad(1700),
    ad(1900),
    [
      use(
        'Farmers, labourers, chapel congregations',
        'Ffermwyr, llafurwyr, cynulleidfaoedd capel',
        'welsh',
        'Overwhelmingly Welsh: 84.9% of Carmarthenshire still spoke it in 1911.',
        "Cymraeg yn llethol: roedd 84.9% o Sir Gâr yn dal i'w siarad yn 1911.",
      ),
      use(
        'Gentry, officials, the professions',
        'Boneddigion, swyddogion, y proffesiynau',
        'english',
        'English for law, estates and government.',
        "Saesneg ar gyfer y gyfraith, ystadau a'r llywodraeth.",
      ),
      use(
        'Schoolchildren after 1847',
        'Plant ysgol ar ôl 1847',
        'english',
        'Schools push English, sometimes with the Welsh Not; how widely it was used is debated.',
        "Mae ysgolion yn gwthio Saesneg, weithiau gyda'r Welsh Not; mae dadl ynghylch pa mor eang y'i defnyddiwyd.",
      ),
    ],
    doc('language:S17', 'language:S18', 'language:S26'),
  ),
  snap(
    'twentieth-century',
    ad(1901),
    ad(1999),
    [
      use(
        'Carmarthenshire',
        'Sir Gâr',
        'welsh',
        'Still majority Welsh-speaking for longer than most counties: 82.3% in 1931, 75.2% in 1951.',
        "Yn dal i siarad Cymraeg gan fwyafrif am hirach na'r rhan fwyaf o siroedd: 82.3% yn 1931, 75.2% yn 1951.",
      ),
      use(
        'Wales as a whole',
        'Cymru gyfan',
        'english',
        'A steady shift to English, then a political revival from 1962, followed by S4C (1982) and legal status for Welsh (1993).',
        'Symudiad cyson at y Saesneg, yna adfywiad gwleidyddol o 1962, ac yna S4C (1982) a statws cyfreithiol i’r Gymraeg (1993).',
      ),
    ],
    doc('language:S26', 'language:S20', 'language:S21'),
  ),
  snap(
    'today',
    ad(2000),
    ad(2026),
    [
      use(
        'Llandeilo',
        'Llandeilo',
        'welsh',
        'About half the town speaks Welsh: 55.1% in 2001, 50.3% in 2011.',
        'Mae tua hanner y dref yn siarad Cymraeg: 55.1% yn 2001, 50.3% yn 2011.',
      ),
      use(
        'Carmarthenshire',
        'Sir Gâr',
        'english',
        'Welsh speakers fell to 39.9% by 2021, the steepest fall of any Welsh county.',
        'Gostyngodd siaradwyr Cymraeg i 39.9% erbyn 2021, y cwymp mwyaf o unrhyw sir yng Nghymru.',
      ),
    ],
    doc('language:S23', 'language:S24', 'language:S25'),
  ),
];

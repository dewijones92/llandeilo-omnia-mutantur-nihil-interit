import type { Feature, FeatureKind, GridRef, PlaceId } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { ad, bc, range, type Year } from '../domain/time.ts';
import {
  ABERGLASNEY,
  CARREG_CENNEN,
  CARREG_CENNEN_INNER,
  CARREG_CENNEN_WELSH,
  CLAS_CHURCH,
  DINEFWR,
  DINEFWR_RHYS,
  DINEFWR_SUMMERHOUSE,
  DRYSLWYN,
  GOLDEN_GROVE,
  GOLDEN_GROVE_EARLIER,
  LLANDEILO_BRIDGE,
  MEDIEVAL_CHURCH,
  NEWTON_HOUSE_1660,
  NEWTON_HOUSE_GOTHIC,
  NEWTON_HOUSE_TURRETS,
  OLD_BRIDGE,
  PAXTONS_TOWER,
  SCOTT_CHURCH,
  TALLEY,
  TOWER_CHURCH,
} from './buildings.ts';
import { featureId, placeId, src, type SourceKey } from './ids.ts';

const documented = (keys: readonly [SourceKey, ...SourceKey[]], en?: string, cy?: string): Provenance => ({
  kind: 'documented',
  sources: [src(keys[0]), ...keys.slice(1).map(src)],
  ...(en && cy ? { note: { en, cy } } : {}),
});

const reconstructed = (en: string, cy: string, keys: readonly SourceKey[]): Provenance => ({
  kind: 'reconstructed',
  basis: { en, cy },
  sources: keys.map(src),
});

const imagined = (en: string, cy: string, keys: readonly SourceKey[]): Provenance => ({
  kind: 'imagined',
  groundedIn: { en, cy },
  sources: keys.map(src),
});

interface Spec {
  readonly id: string;
  readonly kind: FeatureKind;
  readonly at: GridRef;
  readonly from: Year;
  readonly to: Year;
  readonly label: { readonly en: string; readonly cy: string };
  readonly provenance: Provenance;
  readonly place?: string;
}

const feature = (s: Spec): Feature => {
  const base = {
    id: featureId(s.id),
    kind: s.kind,
    at: s.at,
    when: range(s.from, s.to),
    provenance: s.provenance,
    label: s.label,
  };
  const place: PlaceId | undefined = s.place ? placeId(s.place) : undefined;
  return place ? { ...base, place } : base;
};

const NOW = ad(2026);
const GARN_GOCH = { e: 269120, n: 224320 };
const LLANDEILO_CHURCH = { e: 262930, n: 222236 };
const DINEFWR_CASTLE = { e: 261155, n: 221729 };
const CARREG_CENNEN_CASTLE = { e: 266801, n: 219083 };
const DRYSLWYN_CASTLE = { e: 255390, n: 220294 };
const TALLEY_ABBEY = { e: 263199, n: 232800 };
const NEWTON_HOUSE = { e: 261432, n: 222534 };
const LLANDEILO_BRIDGE_AT = { e: 262757, n: 222001 };

const FARMSTEAD_BASIS = {
  en: 'Enclosed farmsteads were the commonest kind of Iron Age settlement in Wales. These spots are illustrative, not known sites.',
  cy: "Ffermydd caeedig oedd y math mwyaf cyffredin o anheddiad yn Oes yr Haearn yng Nghymru. Mae'r mannau hyn yn enghreifftiau, nid safleoedd hysbys.",
};

const LONGHOUSE_BASIS = {
  en: 'Longhouses, with people at one end and cattle at the other, were once common in mid and south Wales, but the known examples are later: almost no ordinary medieval house survives. Their form and places here are illustrative.',
  cy: "Roedd tai hir, gyda phobl un pen a gwartheg y pen arall, yn gyffredin yng nghanolbarth a de Cymru, ond mae'r enghreifftiau hysbys yn ddiweddarach: does bron dim tŷ canoloesol cyffredin wedi goroesi. Enghreifftiau yw eu ffurf a'u lleoliadau yma.",
};

export const FEATURES: readonly Feature[] = [
  feature({
    id: 'garn-goch-fawr',
    kind: {
      type: 'hillfort',
      length: 720,
      width: 230,
      angle: Math.PI / 4.4,
      rings: 2,
      stone: true,
      ruined: false,
    },
    at: GARN_GOCH,
    from: bc(800),
    to: ad(74),
    label: { en: 'Y Gaer Fawr, Garn Goch', cy: 'Y Gaer Fawr, Garn Goch' },
    provenance: documented(
      ['ironage:S1', 'ironage:S7'],
      'Surveyed, never excavated. The ramparts are drawn as a simplified oval.',
      "Wedi'i harolygu, erioed wedi'i chloddio. Mae'r rhagfuriau wedi'u darlunio fel hirgrwn syml.",
    ),
    place: 'garn-goch',
  }),
  feature({
    id: 'garn-goch-fawr-ruin',
    kind: {
      type: 'hillfort',
      length: 720,
      width: 230,
      angle: Math.PI / 4.4,
      rings: 2,
      stone: true,
      ruined: true,
    },
    at: GARN_GOCH,
    from: ad(74),
    to: NOW,
    label: {
      en: 'Y Gaer Fawr ramparts, now rubble banks',
      cy: 'Rhagfuriau Y Gaer Fawr, yn gloddiau rwbel bellach',
    },
    provenance: documented(['ironage:S1', 'ironage:S4']),
    place: 'garn-goch',
  }),
  feature({
    id: 'garn-goch-fach',
    kind: { type: 'hillfort', length: 168, width: 115, angle: 0, rings: 1, stone: true, ruined: true },
    at: { e: 268546, n: 224271 },
    from: bc(700),
    to: NOW,
    label: { en: 'Y Gaer Fach, left unfinished', cy: 'Y Gaer Fach, heb ei gorffen' },
    provenance: documented(['ironage:S2']),
    place: 'garn-goch',
  }),
  feature({
    id: 'garn-goch-roundhouses',
    kind: { type: 'roundhouses', count: 9, spread: 60 },
    at: GARN_GOCH,
    from: bc(700),
    to: ad(74),
    label: { en: 'Roundhouses inside Y Gaer Fawr', cy: 'Tai crwn o fewn Y Gaer Fawr' },
    provenance: reconstructed(
      'A rock-cut roundhouse platform is recorded inside the fort. How many houses stood here is unknown, and the houses follow excavated examples at Castell Henllys.',
      "Mae llwyfan tŷ crwn wedi'i dorri yn y graig wedi'i gofnodi y tu mewn i'r gaer. Does neb yn gwybod faint o dai oedd yma; mae'r tai'n dilyn enghreifftiau Castell Henllys.",
      ['ironage:S1', 'ironage:S30', 'ironage:S31'],
    ),
    place: 'garn-goch',
  }),
  feature({
    id: 'fan-camp',
    kind: { type: 'hillfort', length: 170, width: 120, angle: 0.3, rings: 2, stone: false, ruined: false },
    at: { e: 267400, n: 231400 },
    from: bc(800),
    to: ad(74),
    label: { en: 'Fan Camp hillfort, Llansadwrn', cy: 'Bryngaer Fan, Llansadwrn' },
    provenance: documented(
      ['ironage:S19'],
      'Classified Iron Age by its form; never excavated.',
      "Wedi'i dosbarthu fel Oes yr Haearn yn ôl ei ffurf; erioed wedi'i chloddio.",
    ),
  }),
  feature({
    id: 'grongar',
    kind: { type: 'hillfort', length: 130, width: 110, angle: 0, rings: 1, stone: false, ruined: true },
    at: { e: 257300, n: 221500 },
    from: bc(600),
    to: NOW,
    label: { en: 'Grongar Hill, the “round fort”', cy: 'Bryn Grongaer, y “gaer gron”' },
    provenance: reconstructed(
      'Known mainly from its name, Welsh for round fort, and a thin record. Size and date are guesses.',
      "Yn hysbys yn bennaf o'i enw a chofnod tenau. Dyfaliadau yw'r maint a'r dyddiad.",
      ['ironage:S18', 'timeline:S12'],
    ),
  }),
  ...(
    [
      { e: 259800, n: 224800 },
      { e: 265400, n: 219700 },
      { e: 262200, n: 227900 },
      { e: 256600, n: 217900 },
      { e: 270800, n: 228600 },
      { e: 257800, n: 229400 },
    ] as const
  ).map((at, i) =>
    feature({
      id: `iron-farmstead-${i}`,
      kind: { type: 'roundhouses', count: 3, spread: 45 },
      at,
      from: bc(700 - i * 40),
      to: ad(300),
      label: { en: 'An enclosed farmstead', cy: 'Fferm gaeedig' },
      provenance: imagined(FARMSTEAD_BASIS.en, FARMSTEAD_BASIS.cy, ['ironage:S27', 'ironage:S28']),
    }),
  ),
  feature({
    id: 'roman-fort-a',
    kind: { type: 'roman-fort', width: 200, length: 230, angle: 0.12 },
    at: { e: 262187, n: 222534 },
    from: ad(74),
    to: ad(95),
    label: { en: 'The larger Roman fort', cy: 'Y gaer Rufeinig fwyaf' },
    provenance: documented(
      ['timeline:S15', 'ironage:S14', 'ironage:S15'],
      'Built in the AD 70s (Coflein); sources disagree on its size (8 or 12 acres) and founding date. When it gave way to the smaller fort is not known, so its end date here is approximate. The internal layout is a standard Roman plan.',
      "Codwyd yn yr 70au OC (Coflein); mae ffynonellau'n anghytuno ar ei maint a'i dyddiad sefydlu. Ni wyddys pryd y daeth y gaer lai yn ei lle, felly bras yw'r dyddiad gorffen. Cynllun Rhufeinig safonol yw'r trefniant mewnol.",
    ),
    place: 'roman-forts',
  }),
  feature({
    id: 'roman-fort-b',
    kind: { type: 'roman-fort', width: 100, length: 150, angle: 0.12 },
    at: { e: 262215, n: 222505 },
    from: ad(90),
    to: ad(125),
    label: { en: 'The smaller Roman fort', cy: 'Y gaer Rufeinig lai' },
    provenance: documented(
      ['timeline:S15', 'ironage:S14', 'ironage:S15'],
      'About 150m by 100m, in use into the early 2nd century (Coflein). When it was built is disputed, so its start date here is approximate.',
      "Tua 150m wrth 100m, yn cael ei defnyddio hyd ddechrau'r 2il ganrif (Coflein). Mae dadl ynghylch pryd y'i codwyd, felly bras yw'r dyddiad dechrau yma.",
    ),
    place: 'roman-forts',
  }),
  feature({
    id: 'clas-church',
    kind: { type: 'building', plan: CLAS_CHURCH, condition: 'standing' },
    at: LLANDEILO_CHURCH,
    from: ad(550),
    to: ad(1300),
    label: { en: 'The clas church of St Teilo', cy: 'Eglwys clas Teilo Sant' },
    provenance: reconstructed(
      'A clas church stood here by the 9th century. Its form is unknown; it was probably timber at first, so it is drawn as a small timber church with a thatched roof, at true size on the line of today’s church.',
      "Roedd eglwys clas yma erbyn y 9fed ganrif. Ni wyddys ei ffurf; pren oedd hi ar y dechrau, mae'n debyg, felly fe'i darlunnir fel eglwys bren fach â tho gwellt, yn ei maint go iawn ar linell yr eglwys heddiw.",
      ['medieval:S1', 'medieval:S2', 'medieval:S3'],
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'medieval-church',
    kind: { type: 'building', plan: MEDIEVAL_CHURCH, condition: 'standing' },
    at: LLANDEILO_CHURCH,
    from: ad(1300),
    to: ad(1600),
    label: { en: 'Medieval St Teilo’s', cy: 'Eglwys Teilo Sant ganoloesol' },
    provenance: reconstructed(
      'Coflein records a medieval church with a double nave: two naves side by side. Their size is not recorded, so they are drawn within the outline of today’s church. When it was first built in stone is not known.',
      "Mae Coflein yn cofnodi eglwys ganoloesol â chorff dwbl: dau gorff ochr yn ochr. Ni chofnodwyd eu maint, felly fe'u darlunnir o fewn amlinell yr eglwys heddiw. Ni wyddys pryd y'i codwyd mewn carreg gyntaf.",
      ['victorian:S23', 'medieval:S3'],
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'tower-church',
    kind: { type: 'building', plan: TOWER_CHURCH, condition: 'standing' },
    at: LLANDEILO_CHURCH,
    from: ad(1600),
    to: ad(1848),
    label: {
      en: 'St Teilo’s, with its new west tower',
      cy: 'Eglwys Teilo Sant, gyda’i thŵr gorllewinol newydd',
    },
    provenance: reconstructed(
      'The double-naved church with a west tower thought to date from about 1600, the battlemented tower that still stands. The naves’ size is not recorded. One source says the church was substantially rebuilt in the early 18th century; the more detailed Coflein record describes only the 1848 rebuild, so that claim is treated as doubtful and no 18th-century change is shown.',
      "Yr eglwys â chorff dwbl a thŵr gorllewinol o tua 1600 mae'n debyg, y tŵr â bylchfuriau sy'n dal i sefyll. Ni chofnodwyd maint y cyrff. Mae un ffynhonnell yn dweud i'r eglwys gael ei hailadeiladu'n sylweddol yn gynnar yn y 18fed ganrif; dim ond ailadeiladu 1848 y mae cofnod manylach Coflein yn ei ddisgrifio, felly ystyrir yr honiad hwnnw'n amheus ac ni ddangosir newid yn y 18fed ganrif.",
      ['victorian:S23', 'medieval:S3'],
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'scott-church',
    kind: { type: 'building', plan: SCOTT_CHURCH, condition: 'standing' },
    at: LLANDEILO_CHURCH,
    from: ad(1848),
    to: NOW,
    label: {
      en: 'St Teilo’s, rebuilt by George Gilbert Scott',
      cy: 'Eglwys Teilo Sant, wedi’i hailadeiladu gan George Gilbert Scott',
    },
    provenance: documented(
      ['victorian:S23'],
      'Scott’s church as Coflein describes it: nave and chancel, a south transept, a north aisle, a north porch and a vestry, keeping the west tower of about 1600. The outline and line come from its OS footprint and it is drawn at true size among the town’s buildings; heights are approximate.',
      "Eglwys Scott fel y mae Coflein yn ei disgrifio: corff a changell, croesfa ddeheuol, eil ogleddol, porth gogleddol a festri, gan gadw tŵr gorllewinol tua 1600. Daw'r amlinell a'r llinell o'i hôl ar fapiau'r Arolwg Ordnans, ac fe'i darlunnir yn ei maint go iawn ymysg adeiladau'r dref; bras yw'r uchderau.",
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'dinefwr-rhys',
    kind: { type: 'building', plan: DINEFWR_RHYS, condition: 'standing' },
    at: DINEFWR_CASTLE,
    from: ad(1163),
    to: ad(1220),
    label: { en: 'Dinefwr, the Lord Rhys’s castle', cy: 'Dinefwr, castell yr Arglwydd Rhys' },
    provenance: reconstructed(
      'The Lord Rhys founded the first castle here with archaeological evidence after 1163, “a castle in the new style”. Its form is not known: it is drawn on the later plan, two enclosures cut off by rock-cut ditches, with lower walls, a hall and a timber fence, and no great tower. The masonry that survives is later, so the end date is approximate.',
      "Sefydlodd yr Arglwydd Rhys y castell cyntaf yma y mae tystiolaeth archaeolegol iddo ar ôl 1163, “castell yn y dull newydd”. Ni wyddys ei ffurf: fe'i darlunnir ar y cynllun diweddarach, dau glos wedi'u torri i ffwrdd gan ffosydd yn y graig, gyda muriau is, neuadd a ffens bren, a dim tŵr mawr. Mae'r gwaith maen sydd wedi goroesi yn ddiweddarach, felly bras yw'r dyddiad gorffen.",
      ['timeline:S26', 'timeline:S27', 'timeline:S34', 'medieval:S12'],
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'dinefwr-castle',
    kind: { type: 'building', plan: DINEFWR, condition: 'standing' },
    at: DINEFWR_CASTLE,
    from: ad(1220),
    to: ad(1600),
    label: { en: 'Dinefwr Castle', cy: 'Castell Dinefwr' },
    provenance: documented(
      ['timeline:S26', 'timeline:S27', 'medieval:S9', 'medieval:S11', 'medieval:S12'],
      'Modelled from the descriptions: two enclosures cut off by rock-cut ditches, a high inner curtain reached through a lower walled barbican, a great round tower about 12m across, a smaller round tower at the north angle and towered lodgings on the north-east curtain. The enclosures’ size, the heights and where the great tower stands are approximate. The masonry is of the early 13th and 14th centuries, so the start date is approximate. It was still a residence under Sir Rhys ap Thomas (d. 1525) and ruinous by 1660; the end date is approximate. The layout is set on the ridge as the OS terrain shows it, with the inner ward above the cliff; where the barbican and outer enclosure lie is approximate.',
      "Wedi'i fodelu o'r disgrifiadau: dau glos wedi'u torri i ffwrdd gan ffosydd yn y graig, llenfur mewnol uchel a gyrhaeddir drwy farbican isel â muriau, tŵr crwn mawr tua 12m ar draws, tŵr crwn llai ar yr ongl ogleddol a llety â thyrau ar y llenfur gogledd-ddwyreiniol. Bras yw maint y closydd, yr uchderau a lleoliad y tŵr mawr. Mae'r gwaith maen o ddechrau'r 13eg a'r 14eg ganrif, felly bras yw'r dyddiad dechrau. Roedd yn dal yn gartref dan Syr Rhys ap Thomas (m. 1525) ac yn adfail erbyn 1660; bras yw'r dyddiad gorffen. Mae'r cynllun wedi'i osod ar y grib fel y dengys tir yr Arolwg Ordnans, gyda'r ward fewnol uwchben y clogwyn; bras yw lleoliad y barbican a'r clos allanol.",
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'dinefwr-ruin',
    kind: { type: 'building', plan: DINEFWR, condition: 'ruin' },
    at: DINEFWR_CASTLE,
    from: ad(1600),
    to: NOW,
    label: { en: 'Dinefwr Castle, a ruin', cy: 'Castell Dinefwr, yn adfail' },
    provenance: documented(
      ['timeline:S45', 'timeline:S46', 'medieval:S13', 'medieval:S12'],
      'The great round tower survives as a two-storey stump. How high the other walls stand is approximate.',
      "Mae'r tŵr crwn mawr wedi goroesi fel bonyn deulawr. Bras yw uchder y muriau eraill.",
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'dinefwr-summerhouse',
    kind: { type: 'building', plan: DINEFWR_SUMMERHOUSE, condition: 'standing' },
    at: DINEFWR_CASTLE,
    from: ad(1660),
    to: NOW,
    label: {
      en: 'The summerhouse on Dinefwr’s great tower',
      cy: 'Y tŷ haf ar dŵr mawr Dinefwr',
    },
    provenance: reconstructed(
      'The top of the great tower was replaced by a summerhouse, whose remains still sit on the stump. Its date is disputed: one source gives 1660 and says it burned in the 18th century, others call it 17th/18th or 18th/19th century. It is shown from 1660, and its form is approximate.',
      "Rhoddwyd tŷ haf yn lle pen y tŵr mawr, ac mae ei weddillion yn dal ar y bonyn. Mae dadl am ei ddyddiad: mae un ffynhonnell yn rhoi 1660 ac yn dweud iddo losgi yn y 18fed ganrif, mae eraill yn ei alw'n 17eg/18fed neu'n 18fed/19eg ganrif. Fe'i dangosir o 1660, a bras yw ei ffurf.",
      ['medieval:S11', 'medieval:S12', 'medieval:S13', 'victorian:S25'],
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'carreg-cennen-welsh',
    kind: { type: 'building', plan: CARREG_CENNEN_WELSH, condition: 'standing' },
    at: CARREG_CENNEN_CASTLE,
    from: ad(1175),
    to: ad(1287),
    label: {
      en: 'The first, Welsh castle at Carreg Cennen',
      cy: 'Y castell Cymreig cyntaf yng Ngharreg Cennen',
    },
    provenance: reconstructed(
      'Probably built in the later 12th century. Nothing of it survives above ground, so its form is a guess: a plain walled enclosure with a hall on the crag top.',
      "Wedi'i godi yn niwedd y 12fed ganrif mae'n debyg. Does dim ohono wedi goroesi uwchben y ddaear, felly dyfalu yw ei ffurf: clos plaen â mur a neuadd ar ben y graig.",
      ['medieval:S24', 'medieval:S25'],
    ),
    place: 'carreg-cennen',
  }),
  feature({
    id: 'carreg-cennen-inner',
    kind: { type: 'building', plan: CARREG_CENNEN_INNER, condition: 'standing' },
    at: CARREG_CENNEN_CASTLE,
    from: ad(1287),
    to: ad(1300),
    label: {
      en: 'Carreg Cennen: Giffard’s inner ward and gatehouse',
      cy: 'Carreg Cennen: ward fewnol a phorthdy Giffard',
    },
    provenance: documented(
      ['medieval:S24', 'medieval:S25', 'medieval:S26', 'timeline:S37'],
      'John Giffard built the inner ward and gatehouse first. Modelled from the measured description: an upper ward about 32m by 28m, curtains up to 2.8m thick on the east and north and thinner above the cliffs to the south and west, a round north-west tower 8m across, a north-east tower about 9m square, the south-east Chapel Tower and a gatehouse between two octagonal towers. Heights, the gatehouse’s side and the hall range’s place are approximate, and so is the date the outer ward began. The masonry is dated 1287–1321 by Coflein, although the castle was granted to Giffard in 1283. The layout is approximate, with the outer ward on the gentler north and east slopes.',
      "Adeiladodd John Giffard y ward fewnol a'r porthdy yn gyntaf. Wedi'i fodelu o'r disgrifiad mesuredig: ward uchaf tua 32m wrth 28m, llenfuriau hyd at 2.8m o drwch ar y dwyrain a'r gogledd ac yn deneuach uwchben y clogwyni i'r de a'r gorllewin, tŵr crwn gogledd-orllewinol 8m ar draws, tŵr gogledd-ddwyreiniol tua 9m sgwâr, Tŵr y Capel yn y de-ddwyrain a phorthdy rhwng dau dŵr wythonglog. Bras yw'r uchderau, ochr y porthdy a lleoliad y neuadd, a'r dyddiad y dechreuwyd y ward allanol hefyd. Mae Coflein yn dyddio'r gwaith maen i 1287–1321, er i'r castell gael ei roi i Giffard yn 1283. Bras yw'r cynllun, gyda'r ward allanol ar lethrau mwynach y gogledd a'r dwyrain.",
    ),
    place: 'carreg-cennen',
  }),
  feature({
    id: 'carreg-cennen-giffard',
    kind: { type: 'building', plan: CARREG_CENNEN, condition: 'standing' },
    at: CARREG_CENNEN_CASTLE,
    from: ad(1300),
    to: ad(1462),
    label: {
      en: 'Carreg Cennen, rebuilt by John Giffard',
      cy: 'Carreg Cennen, wedi’i ailadeiladu gan John Giffard',
    },
    provenance: documented(
      ['timeline:S36', 'timeline:S37', 'medieval:S26', 'medieval:S24'],
      'Then came the barbican and the outer ward, about 60m by 60m with walls about 1.7m thick, probably early 14th century, holding half-timbered stables, a forge, stores and a lime kiln. The layout, heights and the barbican’s route are approximate.',
      "Yna daeth y barbican a'r ward allanol, tua 60m wrth 60m â muriau tua 1.7m o drwch, o ddechrau'r 14eg ganrif mae'n debyg, gyda stablau ffrâm bren, gefail, storfeydd ac odyn galch. Bras yw'r cynllun, yr uchderau a llwybr y barbican.",
    ),
    place: 'carreg-cennen',
  }),
  feature({
    id: 'carreg-cennen-ruin',
    kind: { type: 'building', plan: CARREG_CENNEN, condition: 'ruin' },
    at: CARREG_CENNEN_CASTLE,
    from: ad(1462),
    to: NOW,
    label: { en: 'Carreg Cennen, slighted and ruined', cy: 'Carreg Cennen, wedi’i chwalu' },
    provenance: documented(
      ['timeline:S36', 'timeline:S51', 'medieval:S24'],
      'Slighted in 1462 by about 500 men over four months, and never refortified. Which walls stand, and how high, is approximate; the Earl Cawdor’s Victorian repairs are not shown.',
      "Fe'i chwalwyd yn 1462 gan tua 500 o ddynion dros bedwar mis, ac ni chafodd ei ailgadarnhau. Bras yw pa furiau sy'n sefyll, a pha mor uchel; ni ddangosir atgyweiriadau Fictoraidd Iarll Cawdor.",
    ),
    place: 'carreg-cennen',
  }),
  feature({
    id: 'dryslwyn-castle',
    kind: { type: 'building', plan: DRYSLWYN, condition: 'standing' },
    at: DRYSLWYN_CASTLE,
    from: ad(1225),
    to: ad(1430),
    label: { en: 'Dryslwyn Castle', cy: 'Castell Dryslwyn' },
    provenance: documented(
      ['medieval:S21', 'medieval:S22', 'timeline:S13'],
      'Three wards on a polygonal plan that follows the hilltop, unique among native Welsh castles: a round keep with a flared base, a curtain, a great hall with its kitchen, a small room that may have been a prison, and a gatehouse. The wards are laid along the ridge as the OS terrain shows it; their size, and when each was added, are not in our research. Built in the 1220s; when it fell out of use is not in our research yet, so the end date is approximate.',
      "Tair ward ar gynllun amlochrog sy'n dilyn pen y bryn, yn unigryw ymysg cestyll brodorol Cymru: gorthwr crwn â gwaelod ar ledu, llenfur, neuadd fawr a'i chegin, ystafell fach a allai fod yn garchar, a phorthdy. Mae'r wardiau wedi'u gosod ar hyd y grib fel y dengys tir yr Arolwg Ordnans; nid yw eu maint, na phryd yr ychwanegwyd pob un, yn ein hymchwil. Codwyd yn yr 1220au; nid yw pryd y peidiodd â chael ei ddefnyddio yn ein hymchwil eto, felly bras yw'r dyddiad gorffen.",
    ),
    place: 'dryslwyn',
  }),
  feature({
    id: 'dryslwyn-ruin',
    kind: { type: 'building', plan: DRYSLWYN, condition: 'ruin' },
    at: DRYSLWYN_CASTLE,
    from: ad(1430),
    to: NOW,
    label: { en: 'Dryslwyn Castle, a ruin', cy: 'Castell Dryslwyn, yn adfail' },
    provenance: reconstructed(
      'A fragmentary ruin today. How high each part stands is approximate, and the date it was abandoned has not been researched.',
      'Adfail darniog heddiw. Bras yw uchder pob rhan, ac nid ymchwiliwyd i ddyddiad ei adael.',
      ['medieval:S21', 'medieval:S22'],
    ),
    place: 'dryslwyn',
  }),
  feature({
    id: 'talley-abbey',
    kind: { type: 'building', plan: TALLEY, condition: 'standing' },
    at: TALLEY_ABBEY,
    from: ad(1185),
    to: ad(1537),
    label: { en: 'Talley Abbey', cy: 'Abaty Talyllychau' },
    provenance: documented(
      ['medieval:S17', 'medieval:S18', 'medieval:S19'],
      'Modelled from the plan: a cruciform church designed about 73m long, with a crossing tower about 29m high on four pillars, transepts each opening into three chapels, and a chancel with three tall pointed windows. Only the east end was finished; the nave stops at its footings, and whether any of its bays stood is not in our research. The cloister was about 23m square, with ranges to the east, south and west. Widths and heights of the ranges are approximate. It was dissolved in the 1530s; the exact year is not in our research. The church is drawn east–west with the cloister to the south, the usual arrangement; its exact line, the widths and the crossing tower’s roof are approximate.',
      "Wedi'i fodelu o'r cynllun: eglwys ar ffurf croes a gynlluniwyd tua 73m o hyd, gyda thŵr croesi tua 29m o uchder ar bedair colofn, croesfeydd sy'n agor i dri chapel yr un, a changell â thair ffenestr bigfain uchel. Dim ond y pen dwyreiniol a orffennwyd; mae'r corff yn gorffen wrth ei sylfeini, ac nid yw a safodd unrhyw rai o'i gilfachau yn ein hymchwil. Roedd y clawstr tua 23m sgwâr, gydag adeiladau i'r dwyrain, y de a'r gorllewin. Bras yw lled ac uchder yr adeiladau hynny. Fe'i diddymwyd yn yr 1530au; nid yw'r union flwyddyn yn ein hymchwil. Mae'r eglwys wedi'i darlunio o'r dwyrain i'r gorllewin â'r clawstr i'r de, y trefniant arferol; bras yw ei hunion linell, y lledau a tho'r tŵr croesi.",
    ),
    place: 'talley',
  }),
  feature({
    id: 'talley-ruin',
    kind: { type: 'building', plan: TALLEY, condition: 'ruin' },
    at: TALLEY_ABBEY,
    from: ad(1537),
    to: NOW,
    label: {
      en: 'Talley Abbey, quarried for the village',
      cy: 'Abaty Talyllychau, wedi’i chwarela ar gyfer y pentref',
    },
    provenance: documented(
      ['medieval:S18', 'medieval:S19', 'timeline:S38'],
      'Two walls of the crossing tower survive to about 26m; much of the rest was quarried to build the village. Which two walls, and the height of the low walls, are approximate.',
      "Mae dau fur o'r tŵr croesi wedi goroesi i tua 26m; chwarelwyd llawer o'r gweddill i godi'r pentref. Bras yw pa ddau fur, ac uchder y muriau isel.",
    ),
    place: 'talley',
  }),
  ...(
    [
      { e: 262700, n: 222700, count: 9, spread: 260 },
      { e: 264200, n: 225300, count: 3, spread: 140 },
      { e: 259300, n: 220600, count: 3, spread: 140 },
      { e: 266000, n: 222800, count: 3, spread: 140 },
      { e: 258200, n: 226200, count: 3, spread: 140 },
      { e: 268500, n: 226700, count: 3, spread: 140 },
    ] as const
  ).map((p, i) =>
    feature({
      id: `longhouses-${i}`,
      kind: { type: 'hall-houses', count: p.count, spread: p.spread },
      at: { e: p.e, n: p.n },
      from: ad(1050 + i * 30),
      to: ad(1720),
      label: { en: 'Longhouses', cy: 'Tai hir' },
      provenance: imagined(LONGHOUSE_BASIS.en, LONGHOUSE_BASIS.cy, []),
    }),
  ),
  feature({
    id: 'newton-house',
    kind: { type: 'building', plan: NEWTON_HOUSE_1660, condition: 'standing' },
    at: NEWTON_HOUSE,
    from: ad(1660),
    to: ad(1770),
    label: { en: 'Newton House', cy: 'Plas Dinefwr' },
    provenance: reconstructed(
      'Newton House was built in 1660–70. Its size and form before the later changes are not in our research, so it is drawn as a plain three-storey house with a hipped roof, lined up with the OS outline of the house and its ranges.',
      "Codwyd Plas Dinefwr yn 1660–70. Nid yw ei faint na'i ffurf cyn y newidiadau diweddarach yn ein hymchwil, felly fe'i darlunnir fel tŷ tri llawr plaen â tho ar oledd ar bob ochr, yn unol ag amlinell yr Arolwg Ordnans o'r tŷ a'i adeiladau.",
      ['timeline:S46', 'victorian:S25', 'victorian:S26'],
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'newton-house-turrets',
    kind: { type: 'building', plan: NEWTON_HOUSE_TURRETS, condition: 'standing' },
    at: NEWTON_HOUSE,
    from: ad(1770),
    to: ad(1856),
    label: { en: 'Newton House, with turrets', cy: 'Plas Dinefwr, gyda thyredau' },
    provenance: reconstructed(
      'Turrets and battlements were added in 1760–80 (a single source). Their form is not described, so the square corner turrets are a guess; the house’s size and line are as in the earlier phase.',
      "Ychwanegwyd tyredau a bylchfuriau yn 1760–80 (un ffynhonnell). Ni ddisgrifir eu ffurf, felly dyfalu yw'r tyredau sgwâr ar y corneli; mae maint a llinell y tŷ fel yn y cyfnod cynt.",
      ['timeline:S46'],
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'newton-house-gothic',
    kind: { type: 'building', plan: NEWTON_HOUSE_GOTHIC, condition: 'standing' },
    at: NEWTON_HOUSE,
    from: ad(1856),
    to: NOW,
    label: { en: 'Newton House, recased in Gothic', cy: 'Plas Dinefwr, â gwisg Gothig' },
    provenance: documented(
      ['victorian:S25', 'victorian:S26', 'victorian:S27', 'timeline:S46'],
      'R. K. Penson’s Gothic recasing of 1856–57: diagonal corner turrets with machicolations and battlements, a large porch, a pierced parapet and a Gothic stone verandah on the west front, in grey shale with pale sandstone dressings. The size and the porch’s side are approximate; the flying buttresses and pinnacles are not shown. Its line follows the OS outline of the house and its ranges.',
      "Gwisg Othig R. K. Penson o 1856–57: tyredau croeslin ar y corneli â pheiriannau tyllog a bylchfuriau, porth mawr, parapet tyllog a feranda garreg Othig ar y ffrynt gorllewinol, mewn siâl llwyd â cherrig nadd tywodfaen golau. Bras yw'r maint ac ochr y porth; ni ddangosir y bwtresi hedfan na'r pinaclau. Mae ei linell yn dilyn amlinell yr Arolwg Ordnans o'r tŷ a'i adeiladau.",
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'aberglasney',
    kind: { type: 'building', plan: ABERGLASNEY, condition: 'standing' },
    at: { e: 258145, n: 222133 },
    from: ad(1600),
    to: NOW,
    label: { en: 'Aberglasney', cy: 'Aberglasne' },
    provenance: documented(
      ['timeline:S47', 'timeline:S48', 'victorian:S34'],
      'The outline follows its OS footprint; the height and roof are approximate.',
      "Mae'r amlinell yn dilyn ôl yr Arolwg Ordnans; bras yw'r uchder a'r to.",
    ),
  }),
  feature({
    id: 'golden-grove',
    kind: { type: 'building', plan: GOLDEN_GROVE, condition: 'standing' },
    at: { e: 259711, n: 219855 },
    from: ad(1830),
    to: NOW,
    label: { en: 'Golden Grove, seat of the Earls Cawdor', cy: 'Gelli Aur, sedd Ieirll Cawdor' },
    provenance: documented(
      ['timeline:S53', 'victorian:S35'],
      'Sir Jeffry Wyatville’s house of 1827–34, in Llangyndeyrn limestone, the local “black marble”, with a service wing. Its turrets and size are approximate. Its line follows the OS outline of the house and its ranges.',
      "Tŷ Syr Jeffry Wyatville o 1827–34, o galchfaen Llangyndeyrn, y “marmor du” lleol, gydag adain gwasanaeth. Bras yw ei dyredau a'i faint. Mae ei linell yn dilyn amlinell yr Arolwg Ordnans o'r tŷ a'i adeiladau.",
    ),
  }),
  feature({
    id: 'golden-grove-earlier',
    kind: { type: 'building', plan: GOLDEN_GROVE_EARLIER, condition: 'standing' },
    at: { e: 259711, n: 219855 },
    from: ad(1560),
    to: ad(1830),
    label: { en: 'The earlier Golden Grove mansions', cy: 'Plastai cynharach y Gelli Aur' },
    provenance: reconstructed(
      'The first mansion of about 1560 burned; a second, neoclassical house with a Doric portico followed in 1754. No plan or size of either is in our research, so one plain house stands in for both.',
      "Llosgodd y plasty cyntaf o tua 1560; codwyd ail dŷ, neoglasurol â phortico Dorig, yn 1754. Nid oes cynllun na maint y naill na'r llall yn ein hymchwil, felly mae un tŷ plaen yn cynrychioli'r ddau.",
      ['timeline:S53'],
    ),
  }),
  feature({
    id: 'paxtons-tower',
    kind: { type: 'building', plan: PAXTONS_TOWER, condition: 'standing' },
    at: { e: 254094, n: 219151 },
    from: ad(1806),
    to: NOW,
    label: { en: 'Paxton’s Tower', cy: 'Tŵr Paxton' },
    provenance: documented(
      ['timeline:S52', 'victorian:S45', 'victorian:S46'],
      'Triangular in plan with corner turrets, 36 feet high, with a hexagonal prospect room at the top. Its orientation is approximate.',
      'Trionglog ei gynllun â thyredau ar y corneli, 36 troedfedd o uchder, gydag ystafell olygfa chweonglog ar y brig. Bras yw ei gyfeiriad.',
    ),
  }),
  feature({
    id: 'old-bridge',
    kind: { type: 'building', plan: OLD_BRIDGE, condition: 'standing' },
    at: LLANDEILO_BRIDGE_AT,
    from: ad(1700),
    to: ad(1848),
    label: { en: 'The seven-arched bridge', cy: 'Y bont saith bwa' },
    provenance: reconstructed(
      'A seven-arched bridge stood here before 1848, and one abutment still survives on the north bank, downstream of today’s bridge. When it was built, the size of its arches and its exact line are not in our research.',
      "Roedd pont saith bwa yma cyn 1848, ac mae un ategwaith wedi goroesi ar y lan ogleddol, i lawr yr afon o'r bont heddiw. Nid yw pryd y codwyd hi, maint ei bwâu na'i hunion linell yn ein hymchwil.",
      ['victorian:S21', 'timeline:S54'],
    ),
    place: 'bridge',
  }),
  feature({
    id: 'old-bridge-abutment',
    kind: { type: 'building', plan: OLD_BRIDGE, condition: 'ruin' },
    at: LLANDEILO_BRIDGE_AT,
    from: ad(1848),
    to: NOW,
    label: { en: 'Abutment of the old bridge', cy: 'Ategwaith yr hen bont' },
    provenance: documented(
      ['victorian:S21', 'victorian:S22'],
      'One abutment of the seven-arched bridge still stands on the north bank, downstream. Its size here is approximate.',
      "Mae un ategwaith o'r bont saith bwa yn dal i sefyll ar y lan ogleddol, i lawr yr afon. Bras yw ei faint yma.",
    ),
    place: 'bridge',
  }),
  feature({
    id: 'bridge',
    kind: { type: 'building', plan: LLANDEILO_BRIDGE, condition: 'standing' },
    at: LLANDEILO_BRIDGE_AT,
    from: ad(1848),
    to: NOW,
    label: { en: 'Llandeilo Bridge', cy: 'Pont Llandeilo' },
    provenance: documented(
      ['timeline:S54', 'victorian:S21', 'victorian:S22'],
      'Modelled from the Cadw listing: one elliptical arch spanning 44.2m with a rise of 12.65m, 14.3m high and 110.64m long with its abutments, and a flood arch through the south abutment. Drawn at true size across the Tywi, on the line of the road in OS data; its width and the flood arch’s size are approximate.',
      "Wedi'i fodelu o restriad Cadw: un bwa eliptig yn rhychwantu 44.2m ag esgyniad o 12.65m, 14.3m o uchder a 110.64m o hyd gyda'i ategweithiau, a bwa llifogydd drwy'r ategwaith deheuol. Wedi'i darlunio yn ei maint go iawn ar draws Tywi, ar linell y ffordd yn nata'r Arolwg Ordnans; bras yw ei lled a maint y bwa llifogydd.",
    ),
    place: 'bridge',
  }),
  feature({
    id: 'georgian-town',
    kind: { type: 'town', nearest: 250, radius: 700, style: 'georgian' },
    at: LLANDEILO_CHURCH,
    from: ad(1720),
    to: ad(1840),
    label: { en: 'Llandeilo, a Georgian market town', cy: 'Llandeilo, tref farchnad Sioraidd' },
    provenance: reconstructed(
      'The size is a guess below the 1858 count. Buildings use today’s OS footprints nearest the church, so the layout is approximate.',
      "Dyfaliad yw'r maint, yn llai na chyfrif 1858. Mae'r adeiladau'n defnyddio amlinellau adeiladau'r Arolwg Ordnans heddiw agosaf at yr eglwys.",
      ['victorian:S39'],
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'victorian-town',
    kind: { type: 'town', nearest: 386, radius: 900, style: 'victorian' },
    at: LLANDEILO_CHURCH,
    from: ad(1840),
    to: ad(1905),
    label: {
      en: 'Llandeilo in 1858: 290 houses, 73 shops, 23 pubs',
      cy: 'Llandeilo yn 1858: 290 o dai, 73 siop, 23 tafarn',
    },
    provenance: reconstructed(
      'The 1858 count is documented. Buildings use today’s OS footprints nearest the church, so which buildings stood then is approximate.',
      "Mae cyfrif 1858 wedi'i gofnodi. Mae'r adeiladau'n defnyddio amlinellau adeiladau'r Arolwg Ordnans heddiw agosaf at yr eglwys.",
      ['timeline:S55', 'timeline:S20'],
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'modern-town',
    kind: { type: 'town', nearest: 100000, radius: 1300, style: 'modern' },
    at: LLANDEILO_CHURCH,
    from: ad(1905),
    to: NOW,
    label: { en: 'Llandeilo today', cy: 'Llandeilo heddiw' },
    provenance: documented(
      ['timeline:S9'],
      'Buildings from OS Open Map Local.',
      'Adeiladau o OS Open Map Local.',
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'countryside-historic',
    kind: { type: 'countryside', share: 0.3 },
    at: LLANDEILO_CHURCH,
    from: ad(1650),
    to: ad(1950),
    label: { en: 'Farms and cottages', cy: 'Ffermydd a bythynnod' },
    provenance: reconstructed(
      'Many of today’s farms stand on older sites. A share of today’s rural buildings stands in for them.',
      "Mae llawer o ffermydd heddiw ar safleoedd hŷn. Mae cyfran o adeiladau gwledig heddiw yn cynrychioli'r rheini.",
      ['victorian:S39'],
    ),
  }),
  feature({
    id: 'countryside-today',
    kind: { type: 'countryside', share: 1 },
    at: LLANDEILO_CHURCH,
    from: ad(1950),
    to: NOW,
    label: { en: 'Villages and farms today', cy: 'Pentrefi a ffermydd heddiw' },
    provenance: documented(
      ['timeline:S9'],
      'Buildings from OS Open Map Local.',
      'Adeiladau o OS Open Map Local.',
    ),
  }),
  feature({
    id: 'railway',
    kind: { type: 'railway' },
    at: { e: 263266, n: 222361 },
    from: ad(1857),
    to: NOW,
    label: { en: 'The railway through Llandeilo', cy: 'Y rheilffordd drwy Landeilo' },
    provenance: documented(
      ['victorian:S29', 'victorian:S28'],
      'Drawn on today’s track. The 1864 line to Carmarthen, since closed, is not shown.',
      "Wedi'i darlunio ar y trac heddiw. Nid yw lein 1864 i Gaerfyrddin, sydd wedi cau, yn cael ei dangos.",
    ),
  }),
  feature({
    id: 'train-llanelly',
    kind: { type: 'train', stock: 'llanelly-1850s' },
    at: { e: 263266, n: 222361 },
    from: ad(1857),
    to: ad(1888),
    label: { en: 'A Llanelly Railway train', cy: 'Trên Rheilffordd Llanelli' },
    provenance: reconstructed(
      'The engine follows the one Llanelly Railway engine described in detail, a six-coupled Hackworth engine of 1841 (Board of Trade report, 1858). Which engine hauled Llandeilo’s trains is not known; the colours, tender and carriages are guesses. The company ran the line until the Great Western took it over in 1889.',
      "Mae'r injan yn dilyn yr unig injan o Reilffordd Llanelli sydd wedi'i disgrifio'n fanwl, injan chwe olwyn gyplysedig gan Hackworth o 1841 (adroddiad y Bwrdd Masnach, 1858). Nid yw'n hysbys pa injan oedd yn tynnu trenau Llandeilo; dyfalu yw'r lliwiau, y tendr a'r cerbydau. Y cwmni oedd yn rhedeg y lein nes i'r Great Western ei chymryd drosodd yn 1889.",
      ['railway:S1', 'railway:S2', 'victorian:S29'],
    ),
  }),
  feature({
    id: 'train-later',
    kind: { type: 'train', stock: 'generic' },
    at: { e: 263266, n: 222361 },
    from: ad(1889),
    to: NOW,
    label: { en: 'A later train', cy: 'Trên diweddarach' },
    provenance: imagined(
      'A placeholder. The engines and carriages that ran here after the Great Western took over in 1889 have not been researched yet.',
      "Dalfan. Nid oes ymchwil eto i'r injans a'r cerbydau a oedd yn rhedeg yma ar ôl i'r Great Western gymryd drosodd yn 1889.",
      ['victorian:S29'],
    ),
  }),
  feature({
    id: 'roads',
    kind: { type: 'roads' },
    at: LLANDEILO_CHURCH,
    from: ad(1930),
    to: NOW,
    label: { en: 'Main roads', cy: 'Prif ffyrdd' },
    provenance: documented(['timeline:S9'], 'Roads from OS Open Map Local.', 'Ffyrdd o OS Open Map Local.'),
  }),
];

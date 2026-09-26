import type { Feature, FeatureKind, GridRef, PlaceId } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { ad, bc, range, type Year } from '../domain/time.ts';
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
const LLANDEILO_CHURCH = { e: 262976, n: 222347 };

const FARMSTEAD_BASIS = {
  en: 'Enclosed farmsteads were the commonest kind of Iron Age settlement in Wales. These spots are illustrative, not known sites.',
  cy: "Ffermydd caeedig oedd y math mwyaf cyffredin o anheddiad yn Oes yr Haearn yng Nghymru. Mae'r mannau hyn yn enghreifftiau, nid safleoedd hysbys.",
};

const LONGHOUSE_BASIS = {
  en: 'Longhouses, with people at one end and cattle at the other, are the best-attested rural home in medieval south and mid Wales. Their exact places here are illustrative.',
  cy: "Tai hir, gyda phobl un pen a gwartheg y pen arall, yw'r cartref gwledig sydd wedi'i gofnodi orau yn ne a chanolbarth Cymru yn yr Oesoedd Canol. Enghreifftiau yw eu lleoliadau yma.",
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
    kind: { type: 'roundhouses', count: 9, spread: 170 },
    at: { e: 269000, n: 224250 },
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
    at: { e: 263063, n: 222478 },
    from: ad(74),
    to: ad(100),
    label: { en: 'The larger Roman fort', cy: 'Y gaer Rufeinig fwyaf' },
    provenance: documented(
      ['timeline:S15', 'ironage:S14', 'ironage:S15'],
      'Sources disagree on its size (8 or 12 acres) and founding date. Its internal layout is a standard Roman plan.',
      "Mae ffynonellau'n anghytuno ar ei maint a'i dyddiad sefydlu. Cynllun Rhufeinig safonol yw'r trefniant mewnol.",
    ),
    place: 'roman-forts',
  }),
  feature({
    id: 'roman-fort-b',
    kind: { type: 'roman-fort', width: 100, length: 150, angle: 0.12 },
    at: { e: 263090, n: 222450 },
    from: ad(100),
    to: ad(125),
    label: { en: 'The smaller Roman fort', cy: 'Y gaer Rufeinig lai' },
    provenance: documented(
      ['ironage:S14', 'ironage:S15'],
      'About 150m by 100m. The order and dates of the two forts are disputed.',
      "Tua 150m wrth 100m. Mae trefn a dyddiadau'r ddwy gaer yn destun dadl.",
    ),
    place: 'roman-forts',
  }),
  feature({
    id: 'clas-church',
    kind: { type: 'church', length: 14, tower: false, angle: 0.05 },
    at: LLANDEILO_CHURCH,
    from: ad(550),
    to: ad(1300),
    label: { en: 'The clas church of St Teilo', cy: 'Eglwys clas Teilo Sant' },
    provenance: reconstructed(
      'A clas church stood here by the 9th century. Its form is unknown; it was probably timber at first.',
      "Roedd eglwys clas yma erbyn y 9fed ganrif. Ni wyddys ei ffurf; pren oedd hi ar y dechrau, mae'n debyg.",
      ['medieval:S1', 'medieval:S2', 'medieval:S3'],
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'medieval-church',
    kind: { type: 'church', length: 26, tower: true, angle: 0.05 },
    at: LLANDEILO_CHURCH,
    from: ad(1300),
    to: ad(1848),
    label: {
      en: 'Medieval St Teilo’s, with its west tower',
      cy: 'Eglwys Teilo Sant ganoloesol, gyda’i thŵr gorllewinol',
    },
    provenance: reconstructed(
      'A medieval double-nave church with a west tower thought to date from about 1600. Its earlier form is not known.',
      "Eglwys ganoloesol â dau gorff a thŵr gorllewinol o tua 1600 mae'n debyg. Ni wyddys ei ffurf gynharach.",
      ['victorian:S23', 'medieval:S3'],
    ),
    place: 'llandeilo',
  }),
  feature({
    id: 'scott-church',
    kind: { type: 'church', length: 34, tower: true, angle: 0.05 },
    at: LLANDEILO_CHURCH,
    from: ad(1848),
    to: NOW,
    label: {
      en: 'St Teilo’s, rebuilt by George Gilbert Scott',
      cy: 'Eglwys Teilo Sant, wedi’i hailadeiladu gan George Gilbert Scott',
    },
    provenance: documented(['victorian:S23']),
    place: 'llandeilo',
  }),
  feature({
    id: 'dinefwr-castle',
    kind: { type: 'castle', towers: 5, radius: 42, ruined: false, keep: true },
    at: { e: 261155, n: 221729 },
    from: ad(1163),
    to: ad(1660),
    label: { en: 'Dinefwr Castle', cy: 'Castell Dinefwr' },
    provenance: documented(
      ['timeline:S26', 'timeline:S27', 'medieval:S9', 'medieval:S12'],
      'The great round tower and two wards are documented; the layout here is simplified.',
      "Mae'r tŵr crwn mawr a'r ddwy ward wedi'u cofnodi; mae'r cynllun yma wedi'i symleiddio.",
    ),
    place: 'dinefwr',
  }),
  feature({
    id: 'dinefwr-ruin',
    kind: { type: 'castle', towers: 5, radius: 42, ruined: true, keep: true },
    at: { e: 261155, n: 221729 },
    from: ad(1660),
    to: NOW,
    label: { en: 'Dinefwr Castle, a ruin', cy: 'Castell Dinefwr, yn adfail' },
    provenance: documented(['timeline:S45', 'timeline:S46', 'medieval:S13']),
    place: 'dinefwr',
  }),
  feature({
    id: 'carreg-cennen-welsh',
    kind: { type: 'castle', towers: 3, radius: 24, ruined: false, keep: false },
    at: { e: 266801, n: 219083 },
    from: ad(1175),
    to: ad(1287),
    label: {
      en: 'The first, Welsh castle at Carreg Cennen',
      cy: 'Y castell Cymreig cyntaf yng Ngharreg Cennen',
    },
    provenance: reconstructed(
      'Probably built in the later 12th century. Nothing of it survives above ground, so its form here is a guess.',
      "Wedi'i godi yn niwedd y 12fed ganrif mae'n debyg. Does dim ohono wedi goroesi uwchben y ddaear.",
      ['medieval:S24', 'medieval:S25'],
    ),
    place: 'carreg-cennen',
  }),
  feature({
    id: 'carreg-cennen-giffard',
    kind: { type: 'castle', towers: 6, radius: 34, ruined: false, keep: false },
    at: { e: 266801, n: 219083 },
    from: ad(1287),
    to: ad(1462),
    label: {
      en: 'Carreg Cennen, rebuilt by John Giffard',
      cy: 'Carreg Cennen, wedi’i ailadeiladu gan John Giffard',
    },
    provenance: documented(['timeline:S36', 'timeline:S37', 'medieval:S26']),
    place: 'carreg-cennen',
  }),
  feature({
    id: 'carreg-cennen-ruin',
    kind: { type: 'castle', towers: 6, radius: 34, ruined: true, keep: false },
    at: { e: 266801, n: 219083 },
    from: ad(1462),
    to: NOW,
    label: { en: 'Carreg Cennen, slighted and ruined', cy: 'Carreg Cennen, wedi’i chwalu' },
    provenance: documented(['timeline:S36', 'timeline:S51']),
    place: 'carreg-cennen',
  }),
  feature({
    id: 'dryslwyn-castle',
    kind: { type: 'castle', towers: 5, radius: 40, ruined: false, keep: true },
    at: { e: 255390, n: 220294 },
    from: ad(1225),
    to: ad(1430),
    label: { en: 'Dryslwyn Castle', cy: 'Castell Dryslwyn' },
    provenance: documented(
      ['medieval:S21', 'medieval:S22', 'timeline:S13'],
      'Built in the 1220s. When it fell out of use is not in our research yet, so the end date here is approximate.',
      "Codwyd yn yr 1220au. Nid yw pryd y peidiodd â chael ei ddefnyddio yn ein hymchwil eto, felly bras yw'r dyddiad gorffen yma.",
    ),
    place: 'dryslwyn',
  }),
  feature({
    id: 'dryslwyn-ruin',
    kind: { type: 'castle', towers: 5, radius: 40, ruined: true, keep: true },
    at: { e: 255390, n: 220294 },
    from: ad(1430),
    to: NOW,
    label: { en: 'Dryslwyn Castle, a ruin', cy: 'Castell Dryslwyn, yn adfail' },
    provenance: reconstructed(
      'A ruin today; the date it was abandoned has not been researched.',
      'Adfail heddiw; nid ymchwiliwyd i ddyddiad ei adael.',
      ['medieval:S21'],
    ),
    place: 'dryslwyn',
  }),
  feature({
    id: 'talley-abbey',
    kind: { type: 'abbey', ruined: false, angle: 0.02 },
    at: { e: 263277, n: 232822 },
    from: ad(1185),
    to: ad(1537),
    label: { en: 'Talley Abbey', cy: 'Abaty Talyllychau' },
    provenance: documented(
      ['medieval:S17', 'medieval:S18', 'medieval:S19'],
      'Only the east end, crossing tower and transepts were finished; the nave stops at its footings.',
      "Dim ond y pen dwyreiniol, y tŵr croesi a'r croesfeydd a orffennwyd; mae'r corff yn gorffen wrth ei sylfeini.",
    ),
    place: 'talley',
  }),
  feature({
    id: 'talley-ruin',
    kind: { type: 'abbey', ruined: true, angle: 0.02 },
    at: { e: 263277, n: 232822 },
    from: ad(1537),
    to: NOW,
    label: {
      en: 'Talley Abbey, quarried for the village',
      cy: 'Abaty Talyllychau, wedi’i chwarela ar gyfer y pentref',
    },
    provenance: documented(['medieval:S18', 'timeline:S38']),
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
      provenance: imagined(LONGHOUSE_BASIS.en, LONGHOUSE_BASIS.cy, ['medieval:S51']),
    }),
  ),
  feature({
    id: 'newton-house',
    kind: { type: 'mansion', width: 30, depth: 20, angle: 0.3, turrets: false },
    at: { e: 261432, n: 222534 },
    from: ad(1660),
    to: ad(1770),
    label: { en: 'Newton House', cy: 'Plas Dinefwr' },
    provenance: documented(['timeline:S46', 'victorian:S25']),
    place: 'dinefwr',
  }),
  feature({
    id: 'newton-house-turrets',
    kind: { type: 'mansion', width: 30, depth: 20, angle: 0.3, turrets: true },
    at: { e: 261432, n: 222534 },
    from: ad(1770),
    to: NOW,
    label: {
      en: 'Newton House, with turrets and later a Gothic front',
      cy: 'Plas Dinefwr, gyda thyredau ac yn ddiweddarach wyneb Gothig',
    },
    provenance: documented(['victorian:S25', 'victorian:S27', 'timeline:S46']),
    place: 'dinefwr',
  }),
  feature({
    id: 'aberglasney',
    kind: { type: 'mansion', width: 24, depth: 18, angle: 0.1, turrets: false },
    at: { e: 258135, n: 222137 },
    from: ad(1600),
    to: NOW,
    label: { en: 'Aberglasney', cy: 'Aberglasne' },
    provenance: documented(['timeline:S47', 'timeline:S48', 'victorian:S34']),
  }),
  feature({
    id: 'golden-grove',
    kind: { type: 'mansion', width: 34, depth: 22, angle: -0.2, turrets: true },
    at: { e: 259711, n: 219855 },
    from: ad(1830),
    to: NOW,
    label: { en: 'Golden Grove, seat of the Earls Cawdor', cy: 'Gelli Aur, sedd Ieirll Cawdor' },
    provenance: documented(['timeline:S53', 'victorian:S35']),
  }),
  feature({
    id: 'golden-grove-earlier',
    kind: { type: 'mansion', width: 26, depth: 18, angle: -0.2, turrets: false },
    at: { e: 259711, n: 219855 },
    from: ad(1560),
    to: ad(1830),
    label: { en: 'The earlier Golden Grove mansions', cy: 'Plastai cynharach y Gelli Aur' },
    provenance: documented(['timeline:S53']),
  }),
  feature({
    id: 'paxtons-tower',
    kind: { type: 'tower', height: 36 * 0.3048 * 2.4 },
    at: { e: 254094, n: 219151 },
    from: ad(1806),
    to: NOW,
    label: { en: 'Paxton’s Tower', cy: 'Tŵr Paxton' },
    provenance: documented(['timeline:S52', 'victorian:S45', 'victorian:S46']),
  }),
  feature({
    id: 'old-bridge',
    kind: { type: 'bridge', span: 110, angle: 0.55, arches: 7 },
    at: { e: 262757, n: 222001 },
    from: ad(1700),
    to: ad(1848),
    label: { en: 'The seven-arched bridge', cy: 'Y bont saith bwa' },
    provenance: reconstructed(
      'A seven-arched bridge stood here before 1848, and one abutment still survives. When it was built is not in our research.',
      'Roedd pont saith bwa yma cyn 1848, ac mae un ategwaith wedi goroesi. Nid yw pryd y codwyd hi yn ein hymchwil.',
      ['victorian:S21', 'timeline:S54'],
    ),
    place: 'bridge',
  }),
  feature({
    id: 'bridge',
    kind: { type: 'bridge', span: 110, angle: 0.55, arches: 1 },
    at: { e: 262757, n: 222001 },
    from: ad(1848),
    to: NOW,
    label: { en: 'Llandeilo Bridge', cy: 'Pont Llandeilo' },
    provenance: documented(['timeline:S54', 'victorian:S22']),
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
      "Dyfaliad yw'r maint, yn llai na chyfrif 1858. Mae'r adeiladau'n defnyddio olion traed yr AO heddiw agosaf at yr eglwys.",
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
      "Mae cyfrif 1858 wedi'i gofnodi. Mae'r adeiladau'n defnyddio olion traed yr AO heddiw agosaf at yr eglwys.",
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
    kind: { type: 'railway', trains: 1 },
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
    id: 'roads',
    kind: { type: 'roads' },
    at: LLANDEILO_CHURCH,
    from: ad(1930),
    to: NOW,
    label: { en: 'Main roads', cy: 'Prif ffyrdd' },
    provenance: documented(['timeline:S9'], 'Roads from OS Open Map Local.', 'Ffyrdd o OS Open Map Local.'),
  }),
];

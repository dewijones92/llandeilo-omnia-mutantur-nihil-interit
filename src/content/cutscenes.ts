import type { NonEmptyArray } from '../domain/assert.ts';
import {
  cutsceneId,
  sec,
  type ActorKind,
  type ActorsTrack,
  type CameraKey,
  type Cutscene,
  type Route,
  type Track,
} from '../domain/cutscene.ts';
import { WORLD } from '../domain/geo.ts';
import type { GridRef } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { FEATURES } from './features.ts';
import { eventId, featureId } from './ids.ts';
import { documented, imagined, reconstructed } from './provenance.ts';

// The fort's east gate as the diorama draws it (landmarks are drawn larger than life), so the
// column walks in at the gate the viewer sees.
function drawnEastGate(id: string): GridRef {
  const fort = FEATURES.find((f) => f.id === featureId(id));
  if (fort?.kind.type !== 'roman-fort') throw new Error(`No Roman fort ${id}`);
  const half = (fort.kind.width * WORLD.landmarkScale) / 2;
  return {
    e: fort.at.e + half * Math.cos(fort.kind.angle),
    n: fort.at.n + half * Math.sin(fort.kind.angle),
  };
}

// Down the Tywi from the north-east along the line of the later Roman road: Coflein's recorded
// segments S of Llanwrda, SW of Llanwrda, Ashfield Row and Manordeilo, the parchmark entering
// Llandeilo, then the fort.
export const TYWI_ROAD_FROM_LLANDOVERY: Route = {
  id: 'tywi-road-from-llandovery',
  label: { en: 'Down the Tywi from Llandovery', cy: 'I lawr y Tywi o Lanymddyfri' },
  points: [
    { e: 271540, n: 231500 },
    { e: 270880, n: 230860 },
    { e: 270580, n: 230560 },
    { e: 269210, n: 229680 },
    { e: 269510, n: 229050 },
    { e: 269290, n: 228750 },
    { e: 265720, n: 225170 },
    { e: 265240, n: 224900 },
    { e: 262700, n: 222900 },
    drawnEastGate('roman-fort-a'),
  ],
  provenance: reconstructed(
    'No source says which way the army came. The north-east is the likelier direction, inferred from the forts at Llandovery and here and the marching camps east of Llandovery facing south-west. The line follows the later Roman road where Coflein records it, joined by straight lines between the recorded stretches; on the day there was no finished road.',
    'Does dim ffynhonnell yn dweud o ba ffordd y daeth y fyddin. Y gogledd-ddwyrain yw’r cyfeiriad mwyaf tebygol, wedi’i gasglu o’r caerau yn Llanymddyfri ac yma a’r gwersylloedd ymdeithio i’r dwyrain o Lanymddyfri sy’n wynebu’r de-orllewin. Mae’r llinell yn dilyn y ffordd Rufeinig ddiweddarach lle mae Coflein yn ei chofnodi, gyda llinellau syth rhwng y darnau a gofnodwyd; ar y diwrnod nid oedd ffordd orffenedig.',
    [
      'roman:S1',
      'roman:S14',
      'roman:S29',
      'roman:S17',
      'roman:S19',
      'roman:S20',
      'roman:S21',
      'roman:S22',
      'roman:S18',
    ],
  ),
};

const ORDER_OF_MARCH = reconstructed(
  'Josephus describes a Roman army’s order of march in Judaea in AD 67: scouts, horse, surveyors and road-makers, standards with trumpeters behind, the main body “six men in depth” (drawn here six abreast, though it could mean six ranks deep), baggage, rearguard. It is borrowed here by analogy and scaled down; how big the army that came here was is not known.',
  'Mae Josephus yn disgrifio trefn ymdeithio byddin Rufeinig yn Jwdea yn 67 OC: sgowtiaid, gwŷr meirch, mesurwyr a gwneuthurwyr ffyrdd, y baneri a’r utgornwyr y tu ôl iddynt, y prif gorff “chwe dyn o ddyfnder” (wedi’i ddangos yma chwech ochr yn ochr, er y gallai olygu chwe rheng o ddyfnder), y pwn, y gwarchodlu ôl. Fe’i benthycir yma drwy gydweddiad, yn llai; ni wyddom pa mor fawr oedd y fyddin a ddaeth yma.',
  ['roman:S45'],
);

const AUXILIARY_KIT = reconstructed(
  'No unit is named at Dinefwr and no military equipment was found, so the kit is borrowed from auxiliaries elsewhere: mail, flat oval shields and plain spears, with no uniform beyond the belt. Helmets of the period were not researched, so a plain cap stands in. A legionary detachment is possible but not proven, so none is drawn.',
  'Does dim uned wedi’i henwi yn Ninefwr ac ni chafwyd hyd i offer milwrol, felly benthycir y cyfarpar gan filwyr cynorthwyol mewn mannau eraill: llurig gadwyn, tarianau hirgrwn gwastad a gwaywffyn plaen, heb wisg unffurf heblaw’r gwregys. Nid ymchwiliwyd i helmedau’r cyfnod, felly mae cap plaen yn sefyll yn eu lle. Mae mintai o lengfilwyr yn bosibl ond heb ei phrofi, felly ni ddangosir un.',
  ['roman:S1', 'roman:S2', 'roman:S56', 'roman:S50'],
);

const HORSEMEN = reconstructed(
  'Horsemen are possible with the column but not implied by the evidence: the barley in the fort’s ditch fits a cavalry unit or a large infantry or mixed one.',
  'Mae gwŷr meirch yn bosibl gyda’r golofn ond nid yw’r dystiolaeth yn eu hawgrymu: mae’r haidd yn ffos y gaer yn gweddu i uned o wŷr meirch neu i uned fawr o wŷr traed neu un gymysg.',
  ['roman:S1', 'roman:S45'],
);

const STANDARDS = reconstructed(
  'Standards carried together, trumpeters behind them (Josephus). No eagle, which would mean a legion, and no legion is known here.',
  'Baneri wedi’u cario gyda’i gilydd, utgornwyr y tu ôl iddynt (Josephus). Dim eryr, a fyddai’n golygu lleng, ac ni wyddom am leng yma.',
  ['roman:S45', 'roman:S53'],
);

const BAGGAGE = reconstructed(
  'Servants leading the soldiers’ baggage on mules and other beasts of burden come behind the main body (Josephus).',
  'Daw gweision yn arwain pwn y milwyr ar fulod ac anifeiliaid pwn eraill y tu ôl i’r prif gorff (Josephus).',
  ['roman:S45', 'roman:S49'],
);

const WATCHERS = imagined(
  'Small farming communities lived in enclosed farmsteads around the valley. What anyone did or felt when the army came is not recorded, so these watchers are imagined.',
  'Roedd cymunedau ffermio bach yn byw mewn ffermydd caeedig o amgylch y dyffryn. Does dim cofnod o’r hyn a wnaeth neu a deimlodd neb pan ddaeth y fyddin, felly dychmygol yw’r gwylwyr hyn.',
  ['ironage:S27', 'ironage:S28', 'roman:S1'],
);

interface Part {
  readonly actor: ActorKind;
  readonly count: number;
  readonly abreast: number;
  readonly rank: number;
  readonly file: number;
  readonly provenance: Provenance;
}

// Kept as one list so every stretch of the march shows the same column in the same order.
const COLUMN: readonly Part[] = [
  { actor: 'scout', count: 18, abreast: 3, rank: 22, file: 14, provenance: ORDER_OF_MARCH },
  { actor: 'rider', count: 24, abreast: 3, rank: 26, file: 16, provenance: HORSEMEN },
  { actor: 'pioneer', count: 24, abreast: 4, rank: 14, file: 10, provenance: ORDER_OF_MARCH },
  { actor: 'standard', count: 4, abreast: 2, rank: 14, file: 12, provenance: STANDARDS },
  { actor: 'trumpeter', count: 4, abreast: 2, rank: 14, file: 12, provenance: STANDARDS },
  { actor: 'auxiliary', count: 480, abreast: 6, rank: 12, file: 9, provenance: AUXILIARY_KIT },
  { actor: 'mule', count: 60, abreast: 2, rank: 20, file: 12, provenance: BAGGAGE },
  { actor: 'rider', count: 18, abreast: 3, rank: 26, file: 16, provenance: HORSEMEN },
];

const GAP = 40;
// Metres a second along the route. Figures are drawn many times life size so they read from the
// air, so they walk proportionally faster than real men would.
const PACE = 9;

// The column on one stretch of its march: its front rank `lead` metres along the route at `from`.
function march(lead: number, from: number, to: number): ActorsTrack[] {
  const tracks: ActorsTrack[] = [];
  let head = lead;
  for (const p of COLUMN) {
    const track: ActorsTrack = {
      kind: 'actors',
      actor: p.actor,
      count: p.count,
      abreast: p.abreast,
      spacing: { rank: p.rank, file: p.file },
      route: TYWI_ROAD_FROM_LLANDOVERY,
      head: { from: head, to: head + PACE * (to - from) },
      from: sec(from),
      to: sec(to),
      provenance: p.provenance,
    };
    tracks.push(track);
    // Servants walk beside the mules, outside their files.
    if (p.actor === 'mule')
      tracks.push({
        ...track,
        actor: 'servant',
        count: Math.ceil(p.count / 4),
        abreast: 2,
        spacing: { rank: p.rank * 4, file: p.file * 2.6 },
      });
    head -= Math.ceil(p.count / p.abreast) * p.rank + GAP;
  }
  return tracks;
}

const key = (
  at: number,
  e: number,
  n: number,
  distance: number,
  heading: number,
  pitch: number,
  arrive: CameraKey['arrive'],
): CameraKey => ({ at: sec(at), target: { e, n }, distance, heading, pitch, arrive });

// Six shots: the valley from above the fort; the column from the side; alongside its head near
// Manordeilo; its main body coming on; over the shoulders of people watching from the hillside; the
// arrival on the Dinefwr ridge.
const CAMERA: NonEmptyArray<CameraKey> = [
  key(0, 266700, 226150, 2400, 50, 15, 'cut'),
  key(10.4, 266620, 226070, 1600, 44, 12, 'in-out'),
  key(10.4, 266283, 225735, 1500, 320, 16, 'cut'),
  key(18.8, 266227, 225678, 1100, 326, 13, 'out'),
  key(18.8, 265552, 225076, 430, 318, 12, 'cut'),
  key(30, 265825, 225275, 380, 324, 11, 'linear'),
  key(30, 265817, 225268, 520, 58, 16, 'cut'),
  key(41.4, 265747, 225197, 420, 62, 13, 'out'),
  // From behind the watchers on the hillside, over their heads to the road below.
  key(41.4, 265290, 225197, 125, 150, 16, 'cut'),
  key(60.1, 265292, 225193, 105, 154, 17, 'out'),
  key(60.1, 262420, 222640, 1500, 238, 26, 'cut'),
  key(79, 262330, 222600, 950, 252, 18, 'in-out'),
];

const SHOTS = [
  { from: 0, to: 10.4, lead: 7800 },
  { from: 10.4, to: 18.8, lead: 8600 },
  { from: 18.8, to: 30, lead: 9300 },
  { from: 30, to: 41.4, lead: 9700 },
  { from: 41.4, to: 60.1, lead: 11030 },
  { from: 60.1, to: 79, lead: 13230 },
] as const;

const TRACKS: readonly Track[] = [
  ...SHOTS.flatMap((s) => march(s.lead, s.from, s.to)),
  {
    kind: 'actors',
    actor: 'farmer',
    count: 5,
    abreast: 5,
    spacing: { rank: 6, file: 7 },
    route: {
      id: 'watchers',
      label: { en: 'On the hillside above the road', cy: 'Ar lethr y bryn uwchben y ffordd' },
      points: [
        { e: 265270, n: 225232 },
        { e: 265310, n: 225162 },
      ],
      provenance: WATCHERS,
    },
    head: { from: 40, to: 40 },
    from: sec(41.4),
    to: sec(60.1),
    faces: { e: 265400, n: 225000 },
    provenance: WATCHERS,
  },
  {
    kind: 'feature',
    feature: featureId('roman-fort-a'),
    show: 'build',
    from: sec(62),
    to: sec(72),
  },
  {
    kind: 'sound',
    sound: 'cornu',
    from: sec(19),
    to: sec(22.2),
    provenance: reconstructed(
      'Vegetius says the cornu sounded when the standards moved; a reconstruction of the Pompeii cornua found a few loud notes, poor for melody, so this is a rough call, not a tune.',
      'Dywed Vegetius fod y cornu’n seinio pan symudai’r baneri; canfu ail-greu o gyrn Pompeii ychydig nodau uchel, gwael am alaw, felly galwad arw yw hon, nid tôn.',
      ['roman:S53', 'roman:S54'],
    ),
  },
  {
    kind: 'sound',
    sound: 'tramp',
    from: sec(18.8),
    to: sec(79),
    provenance: reconstructed(
      'Josephus says the army marched without noise, in hobnailed shoes: so no singing, only the tramp of feet and the clink of kit.',
      'Dywed Josephus fod y fyddin yn ymdeithio heb sŵn, mewn esgidiau hoelion: felly dim canu, dim ond sŵn traed a thincian offer.',
      ['roman:S50', 'roman:S51'],
    ),
  },
  {
    kind: 'sound',
    sound: 'hooves',
    from: sec(19.2),
    to: sec(28),
    provenance: HORSEMEN,
  },
  {
    kind: 'sound',
    sound: 'mules',
    from: sec(50),
    to: sec(59),
    provenance: BAGGAGE,
  },
  {
    kind: 'sound',
    sound: 'cornu',
    from: sec(61),
    to: sec(64),
    provenance: reconstructed(
      'Josephus says nothing in camp was done without a trumpet signal. The call here, as the column reaches the ridge, is a rough few notes like the Pompeii cornua.',
      'Dywed Josephus na wneid dim yn y gwersyll heb arwydd utgorn. Ychydig nodau garw fel cyrn Pompeii yw’r alwad yma, wrth i’r golofn gyrraedd y grib.',
      ['roman:S48', 'roman:S54'],
    ),
  },
  {
    kind: 'sound',
    sound: 'axes',
    from: sec(62.5),
    to: sec(72),
    provenance: reconstructed(
      'The fort was built of timber and earth, and Josephus’s road-makers cut down woods as they went, so trees are felled.',
      'Codwyd y gaer o bren a phridd, ac roedd gwneuthurwyr ffyrdd Josephus yn torri coedwigoedd wrth fynd, felly mae coed yn cael eu cwympo.',
      ['roman:S1', 'roman:S45'],
    ),
  },
  ...captions(),
];

function captions(): Track[] {
  const cap = (from: number, to: number, en: string, cy: string, provenance: Provenance): Track => ({
    kind: 'caption',
    text: { en, cy },
    from: sec(from),
    to: sec(to),
    provenance,
  });
  return [
    cap(
      0.6,
      10.4,
      'The Tywi valley, about AD 74 to 77. No one recorded the day, or the hour, that the Roman army came.',
      'Dyffryn Tywi, tua 74 i 77 OC. Ni chofnododd neb y dydd, na’r awr, y daeth y fyddin Rufeinig.',
      documented(
        ['roman:S1', 'roman:S2', 'roman:S3'],
        'The fort is dated perhaps soon after AD 74, an earlier date not ruled out; Tacitus records the conquest of the Silures to the east and never names the people of this valley.',
        'Dyddir y gaer efallai yn fuan ar ôl 74 OC, heb ddiystyru dyddiad cynharach; mae Tacitus yn cofnodi concwest y Silwriaid i’r dwyrain a byth yn enwi pobl y dyffryn hwn.',
      ),
    ),
    cap(
      10.6,
      18.6,
      'They most likely marched down the valley from Llandovery. No record says which way they came.',
      'Mae’n debyg iddyn nhw ymdeithio i lawr y dyffryn o Lanymddyfri. Does dim cofnod yn dweud o ba ffordd y daethon nhw.',
      TYWI_ROAD_FROM_LLANDOVERY.provenance,
    ),
    cap(
      18.8,
      27.6,
      'Scouts go first, then horsemen and men to clear the way. That order is Josephus’s, for an army in Judaea.',
      'Sgowtiaid sy’n mynd gyntaf, yna gwŷr meirch a dynion i glirio’r ffordd. Trefn Josephus yw honno, i fyddin yn Jwdea.',
      ORDER_OF_MARCH,
    ),
    cap(
      27.8,
      34.5,
      'The fort held more than a thousand men from several units. Which units is unknown.',
      'Roedd y gaer yn dal mwy na mil o ddynion o sawl uned. Ni wyddom pa unedau.',
      documented(['roman:S2', 'roman:S1']),
    ),
    cap(
      34.7,
      41.4,
      'They marched without noise, Josephus says: no songs, only boots, kit and trumpets.',
      'Roedden nhw’n ymdeithio heb sŵn, medd Josephus: dim canu, dim ond esgidiau, offer ac utgyrn.',
      reconstructed(
        'Josephus, of a Roman army in AD 67, borrowed here by analogy.',
        'Josephus, am fyddin Rufeinig yn 67 OC, wedi’i fenthyg yma drwy gydweddiad.',
        ['roman:S50', 'roman:S53'],
      ),
    ),
    cap(
      41.6,
      51.3,
      'The people here, the Demetae to a Greek geographer, left no account. Whether they fought, fled or watched is unknown.',
      'Ni adawodd pobl y fro, y Demetae i ddaearyddwr Groegaidd, unrhyw hanes. Ni wyddom ai ymladd, ffoi neu wylio a wnaethon nhw.',
      documented(
        ['roman:S9', 'roman:S3', 'roman:S1'],
        'The name Demetae comes from Ptolemy. No source records resistance or welcome here; the size of the forts suggests the district was not taken for granted.',
        'Daw’r enw Demetae o Ptolemy. Does dim ffynhonnell yn cofnodi gwrthwynebiad na chroeso yma; mae maint y caerau’n awgrymu nad oedd yr ardal yn cael ei chymryd yn ganiataol.',
      ),
    ),
    cap(
      51.5,
      60.1,
      'Behind come the baggage mules, led by servants. Each soldier also carried tools and three days’ food.',
      'Y tu ôl daw’r mulod pwn, dan arweiniad gweision. Roedd pob milwr hefyd yn cario offer a bwyd am dri diwrnod.',
      reconstructed(
        'Josephus, of a Roman army in AD 67, borrowed here by analogy.',
        'Josephus, am fyddin Rufeinig yn 67 OC, wedi’i fenthyg yma drwy gydweddiad.',
        ['roman:S45', 'roman:S50'],
      ),
    ),
    cap(
      60.3,
      67.7,
      'On the ridge in what is now Dinefwr Park they built a fort of timber and earth, one of the largest in Wales.',
      'Ar y grib yn yr hyn sydd bellach yn Barc Dinefwr, codon nhw gaer o bren a phridd, un o’r mwyaf yng Nghymru.',
      documented(
        ['roman:S1', 'roman:S2'],
        'About 3.8 hectares inside its defences. How long it took to build is not recorded; here it rises in seconds.',
        'Tua 3.8 hectar o fewn ei hamddiffynfeydd. Does dim cofnod o ba mor hir y cymerodd i’w chodi; yma mae’n codi mewn eiliadau.',
      ),
    ),
    cap(
      67.9,
      78.6,
      'Perhaps soon after AD 74, though an earlier date is not ruled out: Romans may have been at Llandovery in the 50s.',
      'Efallai yn fuan ar ôl 74 OC, er na ellir diystyru dyddiad cynharach: efallai fod Rhufeiniaid yn Llanymddyfri yn y 50au.',
      documented(
        ['roman:S1', 'roman:S2', 'roman:S64', 'roman:S14'],
        'Contested: Coflein dates the Llandovery fort to the 70s, Heneb to probably the 50s, so this may not be the first Roman arrival in the valley.',
        'Mae dadl: mae Coflein yn dyddio caer Llanymddyfri i’r 70au, Heneb i’r 50au mae’n debyg, felly efallai nad hwn oedd y tro cyntaf i’r Rhufeiniaid gyrraedd y dyffryn.',
      ),
    ),
  ];
}

export const CUTSCENES: readonly Cutscene[] = [
  {
    id: cutsceneId('roman-arrival'),
    event: eventId('roman-forts'),
    title: { en: 'The Roman army arrives', cy: 'Y fyddin Rufeinig yn cyrraedd' },
    duration: sec(79),
    camera: CAMERA,
    tracks: TRACKS,
    provenance: reconstructed(
      'Documented: the forts, their size, their date range and the garrison estimate. Reconstructed: the route (from forts, road and marching camps), the order of march, kit and trumpets (Josephus, Vegetius and finds elsewhere). Imagined: the watching farmers, every face, the dust and weather, and the time of day, which no source records. Hours of marching and weeks of building are compressed into a minute.',
      'Wedi’i gofnodi: y caerau, eu maint, eu hystod dyddiadau ac amcangyfrif y garsiwn. Wedi’i ail-greu: y llwybr (o’r caerau, y ffordd a’r gwersylloedd ymdeithio), trefn yr ymdaith, y cyfarpar a’r utgyrn (Josephus, Vegetius a darganfyddiadau mewn mannau eraill). Dychmygol: y ffermwyr sy’n gwylio, pob wyneb, y llwch a’r tywydd, ac adeg y dydd, nad yw unrhyw ffynhonnell yn ei chofnodi. Cywasgir oriau o ymdeithio ac wythnosau o adeiladu i funud.',
      ['roman:S1', 'roman:S2', 'roman:S14', 'roman:S29', 'roman:S45', 'roman:S50', 'roman:S53', 'roman:S56'],
    ),
  },
];

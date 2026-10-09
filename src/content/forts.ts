import type { Bilingual } from '../domain/i18n.ts';
import {
  cornerAt,
  FORT_SIDES,
  gateFrame,
  ringRuns,
  roadside,
  type FortShape,
  type FortSide,
  type Gap,
  type Run,
} from '../domain/fort.ts';
import type { GridRef } from '../domain/model.ts';
import type { Part, PartShape, Plan, Pt } from '../domain/plan.ts';
import { rotate } from '../domain/plan.ts';
import type { Provenance } from '../domain/provenance.ts';
import type { SourceKey } from './ids.ts';
import { documented, imagined, reconstructed } from './provenance.ts';

// Everything here is in metres, in each plan's own frame: x along the long axis towards the front gate
// (north-east), y across it towards the left (north-west). Fort 1's shape is the area inside its inner
// ditches (fort:S1); the rampart stood just inside them.

export const FORT_1_AT: GridRef = { e: 262206, n: 222470 };
export const FORT_2_AT: GridRef = { e: 262190, n: 222538 };
// Bearings east of north, read from the outlines in Hughes's Fig 1; the HER says the two alignments differ
// slightly (47835) and does not say which way, so the two readings are the ends of the 48 to 53 degrees range.
export const FORT_1_BEARING = 48;
export const FORT_2_BEARING = 53;
const planAngle = (bearing: number): number => 90 - bearing;

export const FORT_1_SHAPE: FortShape = { halfLength: 120, halfWidth: 80, corner: 12 };
export const FORT_2_SHAPE: FortShape = { halfLength: 70, halfWidth: 55, corner: 10 };

const RAMPART_OFFSET = -3.5;
const PASSAGE = 3.6;
const TOWER = 4;
const WALL_GAP = PASSAGE + 2 * TOWER;
const DITCH_GAP = 6;
const ROAD = 5;

const DITCHES = [
  { offset: 0.85, width: 1.7, depth: 1.1 },
  { offset: 3.9, width: 1.4, depth: 0.8 },
  { offset: 6.6, width: 1.0, depth: 0.5 },
] as const;

// Fort 1's two-ditch sides take the two profiles Trench 1 measured on the south-west side; a side with three also
// has the middle one, which no trench measured.
const profileOf = (count: number, ring: number): (typeof DITCHES)[number] =>
  DITCHES[count === 2 && ring === 1 ? 2 : ring] ?? DITCHES[0];

const SIDE_EN: Readonly<Record<FortSide, string>> = {
  ne: 'north-east',
  nw: 'north-west',
  sw: 'south-west',
  se: 'south-east',
};
// The corner after a side, walked anticlockwise from the front: north, west, south, east.
const CORNER_EN: Readonly<Record<FortSide, string>> = {
  ne: 'north corner',
  nw: 'west corner',
  sw: 'south corner',
  se: 'east corner',
};
const CORNER_CY: Readonly<Record<FortSide, string>> = {
  ne: 'cornel ogleddol',
  nw: 'cornel orllewinol',
  sw: 'cornel ddeheuol',
  se: 'cornel ddwyreiniol',
};
const SIDE_CY: Readonly<Record<FortSide, string>> = {
  ne: 'gogledd-ddwyrain',
  nw: 'gogledd-orllewin',
  sw: 'de-orllewin',
  se: 'de-ddwyrain',
};

const ANALOGY: readonly SourceKey[] = ['fort:S1', 'fort:S16', 'fort:S14'];
const CREDIT =
  'Compared with Neil Ludlow’s reconstruction drawing for Cambria Archaeology (Heneb, Tywi Time Line, 2011), a reference and not evidence.';
const CREDIT_CY =
  'Cymharwyd â lluniad ail-greu Neil Ludlow ar gyfer Cambria Archaeology (Heneb, Tywi Time Line, 2011), sy’n gyfeiriad ac nid yn dystiolaeth.';

const REAR_GATE_UNPROVEN =
  'Fort 2’s rear gate is not demonstrated: the outer defences are unbroken there and only the inner ditch has a gap. It is drawn smaller, without roofs, as a possibility.';
const REAR_GATE_UNPROVEN_CY =
  'Ni ddangoswyd porth cefn Caer 2: mae’r amddiffynfeydd allanol yn ddi-dor yno ac nid oes ond bwlch yn y ffos fewnol. Fe’i tynnir yn llai, heb doeau, fel posibilrwydd.';

function part(shape: PartShape, id: string, name: Bilingual, provenance: Provenance, detail = false): Part {
  return { ...shape, id, name, provenance, ...(detail ? { detail: true as const } : {}) };
}

const turn = (v: Pt, quarter: number): Pt => rotate(v, 90 * quarter);
const add = (a: Pt, b: Pt, k = 1): Pt => [a[0] + b[0] * k, a[1] + b[1] * k];

export interface GateSpec {
  readonly id: string;
  readonly side: FortSide;
  readonly u: number;
  readonly evidenced: boolean;
  readonly towers: Provenance | { readonly left: Provenance; readonly right: Provenance };
  readonly rest: Provenance;
  readonly name: Bilingual;
  readonly size?: number;
}

function gateParts(shape: FortShape, p: string, g: GateSpec): Part[] {
  const frame = gateFrame(shape, g.side, g.u);
  const centre = add(frame.at, frame.out, RAMPART_OFFSET);
  const tan = turn(frame.out, 1);
  const size = g.size ?? TOWER;
  const id = `${p}/gate-${g.id}`;
  const named = (en: string, cy: string): Bilingual => ({
    en: `${g.name.en}: ${en}`,
    cy: `${g.name.cy}: ${cy}`,
  });
  const towers = [1, -1].map((k) =>
    part(
      {
        type: 'tower',
        at: add(centre, tan, k * (PASSAGE / 2 + size / 2)),
        shape: 'square',
        size,
        height: g.evidenced ? 7 : 5.4,
        top: g.evidenced ? 'pyramid' : 'plain',
        material: 'timber',
        roofMaterial: 'timber',
      },
      `${id}/tower-${k > 0 ? 'left' : 'right'}`,
      named(`${k > 0 ? 'left' : 'right'} timber tower`, `tŵr pren ${k > 0 ? 'chwith' : 'dde'}`),
      'left' in g.towers ? (k > 0 ? g.towers.left : g.towers.right) : g.towers,
    ),
  );
  const deck = part(
    {
      type: 'hall',
      at: centre,
      length: PASSAGE,
      width: size,
      angle: frame.angle,
      height: 0.7,
      base: 4.2,
      roof: 'none',
      material: 'timber',
    },
    `${id}/walkway`,
    named('timber walkway over the passage', 'llwybr pren dros y fynedfa'),
    g.rest,
    true,
  );
  const leaves = [1, -1].map((k) => {
    const hinge = add(centre, tan, (k * PASSAGE) / 2);
    const closed = turn(tan, k > 0 ? 2 : 0);
    const swung = add([Math.cos(1.13) * closed[0], Math.cos(1.13) * closed[1]], frame.out, -Math.sin(1.13));
    const at = add(hinge, swung, PASSAGE / 4);
    return part(
      {
        type: 'hall',
        at,
        length: PASSAGE / 2,
        width: 0.25,
        angle: (Math.atan2(swung[1], swung[0]) * 180) / Math.PI,
        height: 3.4,
        roof: 'none',
        material: 'timber',
      },
      `${id}/leaf-${k > 0 ? 'left' : 'right'}`,
      named(
        `${k > 0 ? 'left' : 'right'} gate leaf, drawn ajar`,
        `drws ${k > 0 ? 'chwith' : 'dde'}’r porth, ar agor`,
      ),
      imagined(
        `No gate fittings are evidenced at Dinefwr. Two leaves, drawn half open on their hinge posts, stand for a gate that could close; their size and number are a guess.${g.evidenced ? '' : ` ${REAR_GATE_UNPROVEN}`}`,
        `Ni cheir tystiolaeth o ddrysau porth yn Ninefwr. Mae dau ddrws, hanner agored ar eu pyst colfach, yn sefyll dros borth a allai gau; dyfaliad yw eu maint a’u nifer.${g.evidenced ? '' : ` ${REAR_GATE_UNPROVEN_CY}`}`,
        ['fort:S1', 'fort:S16'],
      ),
      true,
    );
  });
  const passage = part(
    {
      type: 'road',
      path: [add(centre, frame.out, -5), add(centre, frame.out, 12)],
      width: PASSAGE,
      material: 'rubble',
    },
    `${id}/passage`,
    named(
      'passage through the rampart and across the ditches',
      'y fynedfa drwy’r rhagfur ac ar draws y ffosydd',
    ),
    g.evidenced
      ? documented(
          ['fort:S1'],
          `The survey identifies a gateway on this side (${g.name.en}), where the ditches break for a causeway. Its width, 3.6m, is analogy.`,
          `Mae’r arolwg yn adnabod porth ar yr ochr hon (${g.name.cy}), lle mae’r ffosydd yn torri am gob. Dyfaliad ar sail cymariaethau yw ei led, 3.6m.`,
        )
      : reconstructed(REAR_GATE_UNPROVEN, REAR_GATE_UNPROVEN_CY, ['fort:S1']),
  );
  return [passage, ...towers, deck, ...leaves];
}

export interface Ditching {
  readonly counts: Readonly<Record<FortSide, number>>;
  readonly provenance: (side: FortSide, ring: number) => Provenance;
  readonly gaps: (ring: number) => readonly Gap[];
  readonly links?: readonly Part[];
}

const wallGaps = (gates: readonly GateSpec[]): Gap[] =>
  gates.map((g) => ({ side: g.side, u: g.u, width: WALL_GAP }));

// A side cut by gates is several pieces; the name says which, so a list of parts tells them apart.
function pieceOf(runs: readonly Run[], i: number): Bilingual {
  const run = runs[i];
  const same = runs.flatMap((r, k) => (r.side === run?.side ? [k] : []));
  if (same.length < 2) return { en: '', cy: '' };
  const n = `${String(same.indexOf(i) + 1)} of ${String(same.length)}`;
  return { en: `, piece ${n}`, cy: `, darn ${n.replace(' of ', ' o ')}` };
}

function circuit(shape: FortShape, p: string, gates: readonly GateSpec[], ditching: Ditching): Part[] {
  const parts: Part[] = [];
  const rampart = ringRuns(shape, RAMPART_OFFSET, () => true, wallGaps(gates));
  const turf = reconstructed(
    'Both forts are described as timber and earth. A turf rampart is inferred from the clay fill of Fort 1’s inner ditch, read as the turf bank pushed back in when the fort was given up; no bank survives at either. Its 4m base (Trawscoed’s is given as about 4.1m, a lead only), 2m top and 3m height are analogy (an earth fort at Jay Lane, estimated at no more than 3m to the wall-walk), and so is where it stood just inside the inner ditch.',
    'Disgrifir y ddwy gaer fel rhai o bren a phridd. Casglwyd bod rhagfur tyweirch o glai llenwad ffos fewnol Caer 1, a ddarllenir fel y glannau tyweirch a wthiwyd yn ôl pan adawyd y gaer; ni oroesodd yr un glan yn yr un o’r ddwy. Dyfaliad ar sail cymariaethau yw’r sylfaen 4m (rhoddir tua 4.1m ar gyfer Trawsgoed, cyfeiriad yn unig), y brig 2m a’r uchder 3m (caer bridd yn Jay Lane, amcangyfrif o ddim mwy na 3m hyd at y llwybr), a hefyd ei fod o fewn y ffos fewnol.',
    ['fort:S1', 'fort:S16', 'fort:S15'],
  );
  const breast = reconstructed(
    'A timber breastwork on the rampart is analogy (Jay Lane’s is estimated at about 1.7m above the walk); nothing of it is evidenced at Dinefwr.',
    'Dyfaliad ar sail cymariaethau yw parapet pren ar y rhagfur (amcangyfrifir bod un Jay Lane tua 1.7m uwchben y llwybr); ni cheir tystiolaeth ohono yn Ninefwr.',
    ['fort:S16'],
  );
  rampart.forEach((run, i) => {
    const n = `${SIDE_EN[run.side]} ${String(i + 1)}`;
    parts.push(
      part(
        {
          type: 'wall',
          path: run.path,
          height: 3,
          thickness: 4,
          taper: 0.5,
          top: 'plain',
          material: 'turf',
        },
        `${p}/rampart-${run.side}-${String(i)}`,
        { en: `Turf rampart, ${n}`, cy: `Rhagfur tyweirch, ${SIDE_CY[run.side]} ${String(i + 1)}` },
        turf,
      ),
      part(
        {
          type: 'wall',
          path: run.path,
          height: 1.7,
          base: 3,
          thickness: 0.5,
          top: 'plain',
          material: 'timber',
        },
        `${p}/breastwork-${run.side}-${String(i)}`,
        { en: `Timber breastwork, ${n}`, cy: `Parapet pren, ${SIDE_CY[run.side]} ${String(i + 1)}` },
        breast,
        true,
      ),
    );
  });
  DITCHES.forEach((d, ring) => {
    const runs: Run[] = ringRuns(shape, d.offset, (s) => ditching.counts[s] > ring, ditching.gaps(ring));
    runs.forEach((run, i) => {
      const profile = profileOf(ditching.counts[run.side], ring);
      parts.push(
        part(
          { type: 'ditch', path: run.path, width: profile.width, depth: profile.depth },
          `${p}/ditch-${String(ring + 1)}-${run.side}-${String(i)}`,
          {
            en: `Ditch ${String(ring + 1)} of ${String(ditching.counts[run.side])}, ${SIDE_EN[run.side]}${pieceOf(runs, i).en}`,
            cy: `Ffos ${String(ring + 1)} o ${String(ditching.counts[run.side])}, ${SIDE_CY[run.side]}${pieceOf(runs, i).cy}`,
          },
          ditching.provenance(run.side, ring),
        ),
      );
    });
  });
  parts.push(...(ditching.links ?? []));
  return parts;
}

function cornerTowers(shape: FortShape, p: string): Part[] {
  return FORT_SIDES.map((s) =>
    part(
      {
        type: 'tower',
        at: cornerAt(shape, RAMPART_OFFSET, s),
        shape: 'square',
        size: 4,
        height: 6,
        top: 'pyramid',
        material: 'timber',
        roofMaterial: 'timber',
      },
      `${p}/corner-tower-${s}`,
      { en: `Corner tower, ${CORNER_EN[s]}`, cy: `Tŵr cornel, ${CORNER_CY[s]}` },
      reconstructed(
        'No corner tower is evidenced at either fort. One is drawn at each rounded corner by analogy: a corner tower at Jay Lane, a 1st-century earth fort in Herefordshire, thought to have stood on six posts (four were found), was about 4.6m by 2.4m.',
        'Ni cheir tystiolaeth o dŵr cornel yn yr un gaer. Tynnir un ar bob cornel gron ar sail cymariaethau: roedd tŵr cornel yn Jay Lane, caer bridd o’r 1af ganrif yn Swydd Henffordd, y credir iddo sefyll ar chwe phostyn (canfuwyd pedwar), tua 4.6m wrth 2.4m.',
        ['fort:S16'],
      ),
      true,
    ),
  );
}

interface Block {
  readonly kind: 'principia' | 'praetorium' | 'granary' | 'barrack';
  readonly at: Pt;
  readonly along: number;
  readonly across: number;
}

const KIND: Readonly<
  Record<Block['kind'], { readonly name: Bilingual; readonly height: number; readonly base?: number }>
> = {
  principia: { name: { en: 'Headquarters (principia)', cy: 'Pencadlys (principia)' }, height: 4.8 },
  praetorium: {
    name: { en: 'Commander’s house (praetorium)', cy: 'Tŷ’r cadlywydd (praetorium)' },
    height: 3.6,
  },
  granary: { name: { en: 'Granary (horreum)', cy: 'Ysgubor rawn (horreum)' }, height: 3.6, base: 0.9 },
  barrack: { name: { en: 'Barrack block', cy: 'Bloc barics' }, height: 3 },
};

function interior(p: string, blocks: readonly Block[], known: Provenance, fort: 1 | 2): Part[] {
  const counts: Record<string, number> = {};
  return blocks.map((b) => {
    counts[b.kind] = (counts[b.kind] ?? 0) + 1;
    const k = KIND[b.kind];
    const n = counts[b.kind] ?? 1;
    const base = b.kind === 'granary' ? { base: k.base ?? 0 } : {};
    return part(
      {
        type: 'hall',
        at: b.at,
        length: b.along,
        width: b.across,
        angle: 90,
        height: k.height,
        roof: 'gable',
        pitch: 0.3,
        roofMaterial: 'timber',
        material: 'daub',
        ...base,
      },
      `${p}/${b.kind}-${String(n)}`,
      { en: `${k.name.en} ${String(n)}`, cy: `${k.name.cy} ${String(n)}` },
      b.kind === 'barrack' ? barrackBasis(fort) : known,
      true,
    );
  });
}

function barrackBasis(fort: 1 | 2): Provenance {
  return fort === 2
    ? reconstructed(
        'No barrack has been recovered at Fort 2. Six blocks suit the small infantry unit the report suggests (Trawscoed, a Welsh auxiliary fort, had six), each about 38m by 8.5m: analogy, not evidence. The walls are wattle and daub, since daub with wattle impressions was found on the site; the roof’s material is not known, so timber shingle is a choice.',
        'Ni chafwyd barics yng Nghaer 2. Mae chwe bloc yn gweddu i’r uned fach o filwyr traed a awgrymir gan yr adroddiad (roedd chwech yn Nhrawsgoed, caer gynorthwyol yng Nghymru), tua 38m wrth 8.5m: dyfaliad ar sail cymariaethau, nid tystiolaeth. Plethwaith a chlai yw’r muriau, gan i glai ag olion plethwaith gael ei ganfod ar y safle; ni wyddys deunydd y to, felly dewis yw’r ystyllod pren.',
        ANALOGY,
      )
    : reconstructed(
        'Fort 1’s interior is not known. One barrack-like timber foundation of the earliest phase was found in Trench 3 and the survey shows rows of anomalies, but no plan. These blocks follow the standard plan of an auxiliary fort, each about 50m by 8.5m: analogy, not evidence. Wattle and daub walls are evidenced on the site; the roof’s material is not, so timber shingle is a choice.',
        'Ni wyddys cynllun mewnol Caer 1. Cafwyd un sylfaen bren debyg i farics o’r cyfnod cynharaf yn Ffos Brawf 3 ac mae’r arolwg yn dangos rhesi o anomaleddau, ond dim cynllun. Mae’r blociau hyn yn dilyn cynllun safonol caer gynorthwyol, tua 50m wrth 8.5m: dyfaliad ar sail cymariaethau, nid tystiolaeth. Ceir tystiolaeth o furiau plethwaith a chlai ar y safle, ond nid o ddeunydd y to, felly dewis yw’r ystyllod pren.',
        ANALOGY,
      );
}

const rows = (xs: readonly number[], y: number, along: number): Block[] =>
  xs.flatMap((x): Block[] => [
    { kind: 'barrack', at: [x, y], along, across: 8.5 },
    { kind: 'barrack', at: [x, -y], along, across: 8.5 },
  ]);

const crossing = (id: string, name: Bilingual, path: readonly Pt[], p: Provenance, width = ROAD): Part =>
  part({ type: 'road', path, width, material: 'rubble' }, id, name, p);

const standard = reconstructed(
  'The standard plan of an auxiliary fort puts the headquarters at the middle, the commander’s house beside it and the granaries on the other side. This is analogy, not evidence: the report only predicts a headquarters near the middle of Fort 2, and Fort 1’s plan is unknown. Buildings are timber framed with wattle and daub; no stone is evidenced and none is drawn.',
  'Yn ôl cynllun safonol caer gynorthwyol, mae’r pencadlys yn y canol, tŷ’r cadlywydd wrth ei ochr a’r ysguboriau ar yr ochr arall. Dyfaliad ar sail cymariaethau yw hyn, nid tystiolaeth: dim ond rhagfynegi pencadlys ger canol Caer 2 a wna’r adroddiad, ac ni wyddys cynllun Caer 1. Mae’r adeiladau o ffrâm bren â phlethwaith a chlai; ni cheir tystiolaeth o garreg ac ni thynnir yr un.',
  ANALOGY,
);

const roads = (basis: Provenance, paths: readonly (readonly [string, Bilingual, readonly Pt[]])[]): Part[] =>
  paths.map(([id, name, path]) => crossing(id, name, path, basis));

const gateNote = (en: string, cy: string): Provenance =>
  reconstructed(en, cy, ['fort:S1', 'fort:S16', 'fort:S14']);

const sameDitch = (en: string, cy: string): Provenance => documented(['fort:S1'], en, cy);

const evidencedTowers = (en: string, cy: string): Provenance => documented(['fort:S1', 'fort:S16'], en, cy);

// Fort 1 ---------------------------------------------------------------------------------------------

const FORT_1_GATES: readonly GateSpec[] = [
  {
    id: 'sw',
    side: 'sw',
    u: 0,
    evidenced: true,
    name: { en: 'South-west gate', cy: 'Porth de-orllewin' },
    towers: {
      right: evidencedTowers(
        'The south-west gateway is evidenced: four square post-pits, up to 1.2m across, probably belong to a large six-post gate tower (Trench 1). This is the tower on the north side, the one found, the right-hand one looking out; its height and roof are analogy (timber gate towers on posts at Jay Lane).',
        'Ceir tystiolaeth o’r fynedfa de-orllewinol: mae pedwar pwll postyn sgwâr, hyd at 1.2m ar eu traws, yn ôl pob tebyg yn perthyn i dŵr porth mawr chwe postyn (Ffos Brawf 1). Hwn yw’r tŵr ar yr ochr ogleddol, yr un a ganfuwyd, yr un ar y dde wrth edrych allan; dyfaliad ar sail cymariaethau yw ei uchder a’i do (tyrau porth pren ar byst yn Jay Lane).',
      ),
      left: gateNote(
        'This tower is the twin of the one found on the north side of the south-west gateway, across the passage. Nothing of it was found; it is drawn by analogy, as is its height and roof.',
        'Efaill yw’r tŵr hwn i’r un a ganfuwyd ar ochr ogleddol y fynedfa de-orllewinol, ar draws y fynedfa. Ni chanfuwyd dim ohono; fe’i tynnir ar sail cymariaethau, fel ei uchder a’i do.',
      ),
    },
    rest: gateNote(
      'The walkway over the passage and its width are analogy; the gateway itself is evidenced, but where it stood along its side is not recorded, so it is drawn at the middle.',
      'Dyfaliad ar sail cymariaethau yw’r llwybr dros y fynedfa a’i led; ceir tystiolaeth o’r fynedfa ei hun, ond ni chofnodwyd lle y safai ar hyd ei hochr, felly fe’i tynnir yn y canol.',
    ),
  },
  {
    id: 'se',
    side: 'se',
    u: 18,
    evidenced: true,
    name: { en: 'South-east gate', cy: 'Porth de-ddwyrain' },
    towers: gateNote(
      'A gateway is evidenced in the south-east side by survey, but no tower is: the towers are drawn like the south-west gate’s, by analogy, and where it stood along the side is not recorded.',
      'Ceir tystiolaeth o fynedfa yn yr ochr dde-ddwyreiniol o’r arolwg, ond nid o dŵr: tynnir y tyrau fel rhai’r porth de-orllewinol, ar sail cymariaethau, ac ni chofnodwyd lle y safai ar hyd yr ochr.',
    ),
    rest: gateNote(
      'The walkway over the passage is analogy.',
      'Dyfaliad ar sail cymariaethau yw’r llwybr dros y fynedfa.',
    ),
  },
];

const onGround = (at: GridRef, bearing: number, p: Pt): GridRef => {
  const [x, y] = rotate(p, planAngle(bearing));
  return { e: at.e + x, n: at.n + y };
};

const FORT_1_SE_GATE_U = FORT_1_GATES.find((g) => g.id === 'se')?.u ?? 0;

/** Where the arriving column ends: outside Fort 1's evidenced south-east gate, coming round the east corner. */
const ARRIVAL_PLAN: readonly Pt[] = [
  [200, -130],
  [FORT_1_SE_GATE_U, -105],
  [FORT_1_SE_GATE_U, -FORT_1_SHAPE.halfWidth - 10],
];
export const FORT_1_ARRIVAL: readonly GridRef[] = ARRIVAL_PLAN.map((p) =>
  onGround(FORT_1_AT, FORT_1_BEARING, p),
);

const FORT_1_DITCHING: Ditching = {
  counts: { se: 3, sw: 2, ne: 3, nw: 2 },
  gaps: () => FORT_1_GATES.map((g) => ({ side: g.side, u: g.u, width: DITCH_GAP })),
  provenance: (s, ring) => {
    if (s === 'sw')
      return sameDitch(
        ring === 0
          ? 'Trench 1 cut the north side of the south-west gateway and showed two V-shaped ditches on this side. The inner one was 1.7m wide and 1.1m deep and ended in a square butt where the gate causeway was.'
          : 'Trench 1 cut the north side of the south-west gateway and showed two V-shaped ditches on this side. The outer one was 1.0m wide and 0.5m deep.',
        ring === 0
          ? 'Torrodd ochr ogleddol y fynedfa de-orllewinol gan Ffos Brawf 1, a dangosodd ddwy ffos siâp V ar yr ochr hon. Roedd y fewnol 1.7m o led ac 1.1m o ddyfnder ac yn dod i ben mewn pen sgwâr lle roedd cob y porth.'
          : 'Torrodd ochr ogleddol y fynedfa de-orllewinol gan Ffos Brawf 1, a dangosodd ddwy ffos siâp V ar yr ochr hon. Roedd yr allanol 1.0m o led a 0.5m o ddyfnder.',
      );
    if (s === 'se')
      return sameDitch(
        `Three ditches are seen on this side, by survey. Their profiles were not measured here: they are drawn like the south-west side’s, where Trench 1 measured the inner at 1.7m by 1.1m and the outer at 1.0m by 0.5m.${ring === 1 ? ' The middle ditch’s profile was not recorded anywhere and is drawn between the two.' : ''}`,
        `Gwelir tair ffos ar yr ochr hon, o’r arolwg. Ni fesurwyd eu proffiliau yma: fe’u tynnir fel rhai’r ochr dde-orllewinol, lle mesurodd Ffos Brawf 1 y fewnol yn 1.7m wrth 1.1m a’r allanol yn 1.0m wrth 0.5m.${ring === 1 ? ' Ni chofnodwyd proffil y ffos ganol yn unman ac fe’i tynnir rhwng y ddwy.' : ''}`,
      );
    return reconstructed(
      'This side lies under Fort 2 or is unsurveyed. The survey shows at least three ditches at the eastern corner, so the north-east side is drawn with three and the north-west with two, as the nearest sides measured.',
      'Mae’r ochr hon o dan Gaer 2 neu heb ei harolygu. Mae’r arolwg yn dangos o leiaf dair ffos ar y gornel ddwyreiniol, felly tynnir tair ar yr ochr ogledd-ddwyreiniol a dwy ar yr ochr ogledd-orllewinol, fel yr ochrau agosaf a fesurwyd.',
      ['fort:S1'],
    );
  },
};

function fort1Parts(): Part[] {
  const p = 'fort1';
  const intervalAt: Pt = [FORT_1_SHAPE.halfLength + RAMPART_OFFSET, -50];
  const interval = part(
    {
      type: 'tower',
      at: intervalAt,
      shape: 'square',
      size: 3,
      height: 6,
      top: 'pyramid',
      material: 'timber',
      roofMaterial: 'timber',
    },
    `${p}/interval-tower-ne`,
    { en: 'Interval tower, north-east rampart', cy: 'Tŵr rhyngol, rhagfur gogledd-ddwyreiniol' },
    documented(
      ['fort:S1'],
      'A four-post structure, probably an interval tower, was found on the north-east inner rampart near the eastern corner (survey). Its 3m size and its height and roof are analogy (four-post interval towers about 2.4 to 3m square at Jay Lane).',
      'Cafwyd adeilad pedwar postyn, tŵr rhyngol yn ôl pob tebyg, ar y rhagfur mewnol gogledd-ddwyreiniol ger y gornel ddwyreiniol (arolwg). Dyfaliad ar sail cymariaethau yw ei faint 3m, ei uchder a’i do (tyrau rhyngol pedwar postyn tua 2.4 i 3m sgwâr yn Jay Lane).',
    ),
    true,
  );
  const between = (a: number, b: number, n: number): number[] =>
    Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
  const blocks: Block[] = [
    { kind: 'principia', at: [-4, 0], along: 36, across: 24 },
    { kind: 'praetorium', at: [-4, 44], along: 26, across: 18 },
    { kind: 'granary', at: [-4, -42], along: 18, across: 9 },
    { kind: 'granary', at: [-4, -62], along: 18, across: 9 },
    ...rows(between(40, 91, 4), 31, 50),
    ...rows(between(-35, -86, 4), 31, 50),
  ];
  const via = reconstructed(
    'Fort 1’s roads are not known. These two join its evidenced gateways to the middle, by the standard plan.',
    'Ni wyddys ffyrdd Caer 1. Mae’r ddwy hyn yn cysylltu ei phyrth y ceir tystiolaeth ohonynt â’r canol, yn ôl y cynllun safonol.',
    ['fort:S1', 'fort:S18'],
  );
  return [
    ...circuit(FORT_1_SHAPE, p, FORT_1_GATES, FORT_1_DITCHING),
    ...FORT_1_GATES.flatMap((g) => gateParts(FORT_1_SHAPE, p, g)),
    ...cornerTowers(FORT_1_SHAPE, p),
    interval,
    ...roads(via, [
      [
        `${p}/road-from-south-east-gate`,
        { en: 'Road from the south-east gate', cy: 'Ffordd o’r porth de-ddwyreiniol' },
        [
          [18, -FORT_1_SHAPE.halfWidth - 2],
          [18, 0],
        ],
      ],
      [
        `${p}/road-from-south-west-gate`,
        { en: 'Road from the south-west gate', cy: 'Ffordd o’r porth de-orllewinol' },
        [
          [-FORT_1_SHAPE.halfLength - 2, 0],
          [-20, 0],
        ],
      ],
    ]),
    ...interior(p, blocks, standard, 1),
  ];
}

export const FORT_1: Plan = { setting: 'true', angle: planAngle(FORT_1_BEARING), parts: fort1Parts() };

/** Fort 1's ditches alone, backfilled and levelled: what lay under Fort 2 once the larger fort was given up. */
export const FORT_1_LEVELLED: Plan = {
  setting: 'true',
  angle: planAngle(FORT_1_BEARING),
  parts: ringParts(),
};

function ringParts(): Part[] {
  const p = 'fort1-levelled';
  const parts: Part[] = [];
  DITCHES.forEach((d, ring) => {
    const runs = ringRuns(
      FORT_1_SHAPE,
      d.offset,
      (s) => FORT_1_DITCHING.counts[s] > ring,
      FORT_1_DITCHING.gaps(ring),
    );
    runs.forEach((run, i) => {
      parts.push(
        part(
          { type: 'ditch', path: run.path, width: d.width, fill: 'daub' },
          `${p}/ditch-${String(ring + 1)}-${run.side}-${String(i)}`,
          {
            en: `Backfilled ditch ${String(ring + 1)}, ${SIDE_EN[run.side]}${pieceOf(runs, i).en}`,
            cy: `Ffos ${String(ring + 1)} wedi’i llenwi, ${SIDE_CY[run.side]}${pieceOf(runs, i).cy}`,
          },
          reconstructed(
            'The inner ditch’s thick clay fill reads as the turf rampart deliberately pushed back in when the fort was decommissioned (Trench 1), and a Fort 1 ditch lies under the levelling laid for Fort 2 (Trench 2). The excavator also suggests that part of Fort 1’s northern and eastern defences stayed in use as an annex to Fort 2 (Trench 3), so some of these ditches may have stayed open; which is not known, and all are drawn backfilled. A buried ditch shows on the ground at most as a soil mark, so the pale line is a picture of where it lay, not something a Roman would have seen.',
            'Mae clai trwchus llenwad y ffos fewnol yn ymddangos fel y rhagfur tyweirch a wthiwyd yn ôl yn fwriadol pan ddatgomisiynwyd y gaer (Ffos Brawf 1), ac mae ffos o Gaer 1 o dan y lefelu a wnaed ar gyfer Caer 2 (Ffos Brawf 2). Mae’r cloddiwr hefyd yn awgrymu bod rhan o amddiffynfeydd gogleddol a dwyreiniol Caer 1 wedi parhau i gael eu defnyddio fel atodiad i Gaer 2 (Ffos Brawf 3), felly mae’n bosibl bod rhai o’r ffosydd hyn wedi aros ar agor; ni wyddys pa rai, a thynnir pob un wedi’i llenwi. Ni fyddai ffos gladdedig yn dangos ar y ddaear ond fel marc pridd, felly llun o ble y gorweddai yw’r llinell welw, nid rhywbeth y byddai Rhufeiniwr wedi’i weld.',
            ['fort:S1'],
          ),
        ),
      );
    });
  });
  return parts;
}

// Fort 2 ---------------------------------------------------------------------------------------------

const VIA_PRINCIPALIS = 10.5;

const FORT_2_GATES: readonly GateSpec[] = [
  {
    id: 'ne',
    side: 'ne',
    u: 0,
    evidenced: true,
    name: {
      en: 'Front gate (porta praetoria), north-east',
      cy: 'Porth blaen (porta praetoria), gogledd-ddwyrain',
    },
    towers: gateNote(
      'The front gate “can be clearly identified” in the survey, and the road leaves it to the north-east. No tower is recorded: these are drawn by analogy, as timber gate towers on posts.',
      'Gellir “adnabod yn glir” y porth blaen yn yr arolwg, ac mae’r ffordd yn gadael ohono i’r gogledd-ddwyrain. Ni chofnodwyd tŵr: tynnir y rhain ar sail cymariaethau, fel tyrau porth pren ar byst.',
    ),
    rest: gateNote(
      'The walkway over the passage is analogy.',
      'Dyfaliad ar sail cymariaethau yw’r llwybr dros y fynedfa.',
    ),
  },
  {
    id: 'nw',
    side: 'nw',
    u: VIA_PRINCIPALIS,
    evidenced: true,
    name: {
      en: 'Left gate (porta principalis sinistra), north-west',
      cy: 'Porth chwith (porta principalis sinistra), gogledd-orllewin',
    },
    towers: gateNote(
      'The left gate “can be clearly identified” in the survey. Its position along the side follows the via principalis; no tower is recorded, so these are drawn by analogy.',
      'Gellir “adnabod yn glir” y porth chwith yn yr arolwg. Mae ei safle ar hyd yr ochr yn dilyn y via principalis; ni chofnodwyd tŵr, felly tynnir y rhain ar sail cymariaethau.',
    ),
    rest: gateNote(
      'The walkway over the passage is analogy.',
      'Dyfaliad ar sail cymariaethau yw’r llwybr dros y fynedfa.',
    ),
  },
  {
    id: 'se',
    side: 'se',
    u: VIA_PRINCIPALIS,
    evidenced: true,
    name: {
      en: 'Right gate (porta principalis dextra), south-east',
      cy: 'Porth dde (porta principalis dextra), de-ddwyrain',
    },
    towers: gateNote(
      'The right gate is evidenced: the outer two ditches join at the entrance, a “parrot’s beak” arrangement, and a road leaves it across the old north-east end of Fort 1. No tower is recorded, so these are drawn by analogy.',
      'Ceir tystiolaeth o’r porth dde: mae’r ddwy ffos allanol yn ymuno wrth y fynedfa, trefniant “pig parot”, ac mae ffordd yn gadael ohono ar draws hen ben gogledd-ddwyreiniol Caer 1. Ni chofnodwyd tŵr, felly tynnir y rhain ar sail cymariaethau.',
    ),
    rest: gateNote(
      'The walkway over the passage is analogy.',
      'Dyfaliad ar sail cymariaethau yw’r llwybr dros y fynedfa.',
    ),
  },
  {
    id: 'sw',
    side: 'sw',
    u: 0,
    evidenced: false,
    size: 3,
    name: {
      en: 'Rear gate (porta decumana), south-west: unproven',
      cy: 'Porth cefn (porta decumana), de-orllewin: heb ei brofi',
    },
    towers: reconstructed(REAR_GATE_UNPROVEN, REAR_GATE_UNPROVEN_CY, ['fort:S1']),
    rest: reconstructed(REAR_GATE_UNPROVEN, REAR_GATE_UNPROVEN_CY, ['fort:S1']),
  },
];

const FORT_2_DITCHING: Ditching = (() => {
  const hw = FORT_2_SHAPE.halfWidth;
  const [, middle, outer] = DITCHES;
  const link = (k: 1 | -1): Part =>
    part(
      {
        type: 'ditch',
        path: [
          [VIA_PRINCIPALIS + (k * DITCH_GAP) / 2, -(hw + middle.offset)],
          [VIA_PRINCIPALIS + (k * DITCH_GAP) / 2, -(hw + outer.offset)],
        ],
        width: 1,
        depth: 0.5,
      },
      `fort2/ditch-beak-${k > 0 ? 'left' : 'right'}`,
      {
        en: `Outer ditches joined at the right gate, ${k > 0 ? 'left' : 'right'} of the causeway`,
        cy: `Ffosydd allanol wedi’u huno wrth y porth dde, ${k > 0 ? 'chwith' : 'dde'} i’r cob`,
      },
      reconstructed(
        'The report says the outer two ditches “joined at the entrance” (a “parrot’s beak”). Its plan was not seen, so the join is drawn as a short link across the two ditches’ ends on each side of the causeway.',
        'Mae’r adroddiad yn dweud bod y ddwy ffos allanol “wedi’u huno wrth y fynedfa” (“pig parot”). Ni welwyd ei gynllun, felly tynnir yr uniad fel cyswllt byr ar draws pennau’r ddwy ffos ar bob ochr i’r cob.',
        ['fort:S1'],
      ),
    );
  return {
    counts: { se: 3, ne: 3, nw: 3, sw: 3 },
    gaps: (ring) =>
      FORT_2_GATES.filter((g) => g.id !== 'sw' || ring === 0).map((g) => ({
        side: g.side,
        u: g.u,
        width: DITCH_GAP,
      })),
    links: [link(1), link(-1)],
    provenance: (s) =>
      s === 'se'
        ? sameDitch(
            'At least three ditches are seen on the south-east side (survey), with a slightly wider berm between the second and third; the wider berm is not drawn, both berms being the same width. Their profiles at Fort 2 were not measured; they are drawn like Fort 1’s.',
            'Gwelir o leiaf tair ffos ar yr ochr dde-ddwyreiniol (arolwg), â berm ychydig yn lletach rhwng yr ail a’r drydedd; ni thynnir y berm lletach, gan fod y ddau berm yr un lled. Ni fesurwyd eu proffiliau yng Nghaer 2; fe’u tynnir fel rhai Caer 1.',
          )
        : reconstructed(
            s === 'sw'
              ? 'On the rear side the outer defences are unbroken and only the inner ditch has a gap. The ditches are drawn like the south-east side’s, three of them.'
              : 'The defences on this side are “less clearly defined” in the survey. The ditches are drawn like the south-east side’s, three of them.',
            s === 'sw'
              ? 'Ar yr ochr gefn mae’r amddiffynfeydd allanol yn ddi-dor ac nid oes ond bwlch yn y ffos fewnol. Tynnir y ffosydd fel rhai’r ochr dde-ddwyreiniol, tair ohonynt.'
              : 'Mae’r amddiffynfeydd ar yr ochr hon yn “llai clir” yn yr arolwg. Tynnir y ffosydd fel rhai’r ochr dde-ddwyreiniol, tair ohonynt.',
            ['fort:S1'],
          ),
  };
})();

function fort2Parts(): Part[] {
  const p = 'fort2';
  const sh = FORT_2_SHAPE;
  const across = (x: number): Pt[] => [
    [x, -(sh.halfWidth + RAMPART_OFFSET - 9)],
    [x, sh.halfWidth + RAMPART_OFFSET - 9],
  ];
  const surveyed = documented(
    ['fort:S1'],
    'The survey shows the via principalis, the road across the fort between the side gates, and the front part of the via praetoria; a possible road surface was found in Trench 2 (two stone-filled drainage gullies 4m apart).',
    'Mae’r arolwg yn dangos y via principalis, y ffordd ar draws y gaer rhwng y pyrth ochr, a rhan flaen y via praetoria; cafwyd arwyneb ffordd posibl yn Ffos Brawf 2 (dwy ffos ddraenio llawn cerrig 4m ar wahân).',
  );
  const guessed = reconstructed(
    'Part of the intervallum road round the inside of the rampart is visible and a second cross road “can just about be identified” (possibly the via quintana). The rest, and the rear road to an unproven gate, follow the standard plan.',
    'Mae rhan o’r ffordd intervallum o amgylch tu mewn y rhagfur i’w gweld a gellir “prin adnabod” ail ffordd groes (y via quintana, o bosibl). Mae’r gweddill, a’r ffordd gefn i borth heb ei brofi, yn dilyn y cynllun safonol.',
    ['fort:S1', 'fort:S18'],
  );
  const ring = ringRuns(sh, -9, () => true, []).flatMap((r) => r.path);
  const blocks: Block[] = [
    { kind: 'principia', at: [-6, 0], along: 26, across: 18 },
    { kind: 'praetorium', at: [-6, 33], along: 20, across: 14 },
    { kind: 'granary', at: [-6, -27], along: 10, across: 8 },
    { kind: 'granary', at: [-6, -38], along: 10, across: 8 },
    ...rows([28, 45], 24, 38),
    ...rows([-38], 24, 38),
  ];
  const principia = reconstructed(
    'The report predicts the headquarters near the middle of the fort between the via principalis and the via quintana, and two square post-pits, perhaps a colonnade fronting it, were found in Trench 2. Its size and look follow the standard plan of an auxiliary fort; no stone is drawn.',
    'Mae’r adroddiad yn rhagfynegi’r pencadlys ger canol y gaer rhwng y via principalis a’r via quintana, a chafwyd dau bwll postyn sgwâr, colonâd o bosibl o’i flaen, yn Ffos Brawf 2. Mae ei faint a’i olwg yn dilyn cynllun safonol caer gynorthwyol; ni thynnir carreg.',
    ['fort:S1', 'fort:S18'],
  );
  const interiorParts = interior(p, blocks, standard, 2).map((b) =>
    b.id === `${p}/principia-1` ? { ...b, provenance: principia } : b,
  );
  return [
    ...circuit(sh, p, FORT_2_GATES, FORT_2_DITCHING),
    ...FORT_2_GATES.flatMap((g) => gateParts(sh, p, g)),
    ...cornerTowers(sh, p),
    crossing(
      `${p}/via-principalis`,
      { en: 'Via principalis', cy: 'Via principalis' },
      [
        [VIA_PRINCIPALIS, -sh.halfWidth - 2],
        [VIA_PRINCIPALIS, sh.halfWidth + 2],
      ],
      surveyed,
      6,
    ),
    crossing(
      `${p}/via-praetoria`,
      { en: 'Via praetoria, from the front gate', cy: 'Via praetoria, o’r porth blaen' },
      [
        [sh.halfLength + 2, 0],
        [VIA_PRINCIPALIS, 0],
      ],
      surveyed,
      6,
    ),
    ...roads(guessed, [
      [`${p}/via-quintana`, { en: 'Via quintana (possible)', cy: 'Via quintana (posibl)' }, across(-22)],
      [
        `${p}/via-decumana`,
        { en: 'Rear road, to the unproven gate', cy: 'Ffordd gefn, i’r porth heb ei brofi' },
        [
          [-sh.halfLength - 2, 0],
          [-22, 0],
        ],
      ],
      [
        `${p}/intervallum`,
        { en: 'Intervallum road', cy: 'Ffordd intervallum' },
        [...ring, ring[0] ?? [0, 0]],
      ],
    ]),
    ...interiorParts,
  ];
}

export const FORT_2: Plan = { setting: 'true', angle: planAngle(FORT_2_BEARING), parts: fort2Parts() };

// The vicus -------------------------------------------------------------------------------------------

const GATE_2: Pt = rotate([FORT_2_SHAPE.halfLength, 0], planAngle(FORT_2_BEARING));
export const VICUS_AT: GridRef = { e: 262299, n: 222622 };
const FORT_2_FROM_VICUS: Pt = [FORT_2_AT.e - VICUS_AT.e, FORT_2_AT.n - VICUS_AT.n];
const inVicus = (p: Pt): Pt => rotate([p[0], p[1]], -planAngle(FORT_2_BEARING));
const GATE_IN_VICUS: Pt = inVicus([FORT_2_FROM_VICUS[0] + GATE_2[0], FORT_2_FROM_VICUS[1] + GATE_2[1]]);
const fromGate = (x: number, y: number): Pt => [GATE_IN_VICUS[0] + x, GATE_IN_VICUS[1] + y];
const SPLIT = 60;
const BRANCH = (-12 * Math.PI) / 180;

const VICUS_ROADS: readonly (readonly Pt[])[] = [
  [fromGate(14, 0), fromGate(SPLIT + 60, 0)],
  [fromGate(SPLIT, 0), fromGate(SPLIT + 150 * Math.cos(BRANCH), 150 * Math.sin(BRANCH))],
];

function vicusParts(): Part[] {
  const p = 'vicus';
  const surveyed = documented(
    ['fort:S1'],
    'A road runs north-east from Fort 2’s front gate and appears to branch in two about 60m out: the northern branch meets the gate at right angles and fades after about 60m more; the southern branch approaches at a slight angle. Their lines are read from the survey plot and are good to about 10m.',
    'Mae ffordd yn rhedeg i’r gogledd-ddwyrain o borth blaen Caer 2 ac yn ymddangos yn fforchio’n ddwy tua 60m allan: mae’r gangen ogleddol yn cyfarfod â’r porth ar ongl sgwâr ac yn pylu ar ôl tua 60m eto; mae’r gangen ddeheuol yn nesáu ar ongl fach. Darllenir eu llinellau o gynllun yr arolwg ac maent yn gywir i tua 10m.',
  );
  const roadParts = VICUS_ROADS.map((path, i) =>
    crossing(
      `${p}/road-${i === 0 ? 'north' : 'south'}`,
      {
        en: `Road, ${i === 0 ? 'northern' : 'southern'} branch`,
        cy: `Ffordd, cangen ${i === 0 ? 'ogleddol' : 'ddeheuol'}`,
      },
      path,
      surveyed,
    ),
  );
  const sites = roadside({ roads: VICUS_ROADS, count: 16, seed: 3, nearest: 8, farthest: 26 });
  const houses = sites.map((s, i) =>
    part(
      {
        type: 'hall',
        at: s.at,
        length: s.length,
        width: s.width,
        angle: s.angle,
        height: 2.6,
        roof: 'gable',
        pitch: 0.5,
        roofMaterial: 'thatch',
        material: 'daub',
      },
      `${p}/house-${String(i + 1)}`,
      { en: `Timber house ${String(i + 1)}`, cy: `Tŷ pren ${String(i + 1)}` },
      imagined(
        'The survey shows activity either side of the roads where they meet, and excavation found narrow gullies, pits, a hearth and daub from small timber buildings, but no building’s outline: how many there were, their shapes and where they stood are not known. These are drawn small, irregular and turned every way, which is how the plot reads (a tidy street plan has no support), with their short ends to the road as at Cefn Caer. The thatch is a choice.',
        'Mae’r arolwg yn dangos gweithgarwch bob ochr i’r ffyrdd lle maent yn cwrdd, a chafwyd gwteri cul, pyllau, aelwyd a chlai o adeiladau pren bach wrth gloddio, ond dim amlinelliad adeilad: ni wyddys faint oedd, eu siapiau na lle y safent. Tynnir hwy’n fach, yn afreolaidd ac wedi’u troi bob ffordd, fel y darllenir y cynllun (nid oes cefnogaeth i gynllun stryd twt), â’u pennau byr at y ffordd fel yng Nghefn Caer. Dewis yw’r gwellt.',
        ['fort:S1', 'fort:S14'],
      ),
      true,
    ),
  );
  return [...roadParts, ...houses];
}

export const ROMAN_VICUS: Plan = { setting: 'true', angle: planAngle(FORT_2_BEARING), parts: vicusParts() };

// What each feature's ⓘ says --------------------------------------------------------------------------

const FEATURE_SOURCES: readonly [SourceKey, ...SourceKey[]] = [
  'fort:S1',
  'fort:S2',
  'fort:S23',
  'fort:S3',
  'fort:S4',
  'fort:S24',
];

const ANALOGY_ONLY =
  'Everything else (heights, the other towers, the interior’s barracks, headquarters and granaries, every roof) is analogy from Flavian timber forts, and each part says which.';
const ANALOGY_ONLY_CY =
  'Dyfaliad ar sail cymariaethau â chaerau pren Flafiaidd yw popeth arall (uchderau, y tyrau eraill, barics, pencadlys ac ysguboriau’r tu mewn, pob to), ac mae pob rhan yn dweud pa un.';

export const FORT_PROVENANCE = {
  fort1: documented(
    FEATURE_SOURCES,
    `Found by magnetometer survey in 2003 and 2005 and sampled by excavation: 240m by 160m inside its inner ditches (3.84ha), on the ridge, its long axis about ${String(FORT_1_BEARING)}° east of north, centred about E 262206 N 222470 (the Heneb record gives SN 6218 2245, about 30m away). Built “perhaps soon after AD 74”, an earlier date not being ruled out, and perhaps given up between AD 78 and 83, which the report calls speculative. Documented: three ditches on the south-east side and two on the south-west, V-shaped; gateways in the south-east and south-west sides, with a six-post tower at the south-west one; a four-post interval tower near the eastern corner; timber buildings and no stone. The turf rampart is inferred from the ditch fill. ${ANALOGY_ONLY} ${CREDIT}`,
    `Fe’i canfuwyd gan arolwg magnetomedr yn 2003 a 2005 ac fe’i profwyd drwy gloddio: 240m wrth 160m o fewn ei ffosydd mewnol (3.84ha), ar y grib, ei hechel hir tua ${String(FORT_1_BEARING)}° i’r dwyrain o’r gogledd, wedi’i chanoli tua E 262206 N 222470 (mae cofnod Heneb yn rhoi SN 6218 2245, tua 30m i ffwrdd). Fe’i hadeiladwyd “efallai’n fuan ar ôl 74 OC”, heb ddiystyru dyddiad cynharach, ac efallai iddi gael ei gadael rhwng 78 ac 83 OC, y mae’r adroddiad yn ei alw’n ddyfaliad. Dogfennwyd: tair ffos ar yr ochr dde-ddwyreiniol a dwy ar yr ochr dde-orllewinol, siâp V; pyrth yn yr ochrau de-ddwyreiniol a de-orllewinol, â thŵr chwe postyn yn yr un de-orllewinol; tŵr rhyngol pedwar postyn ger y gornel ddwyreiniol; adeiladau pren a dim carreg. Casglwyd y rhagfur tyweirch o lenwad y ffos. ${ANALOGY_ONLY_CY} ${CREDIT_CY}`,
  ),
  fort2: documented(
    FEATURE_SOURCES,
    `About 140m by 110m inside (1.54ha), on the northern part of Fort 1, its long axis about ${String(FORT_2_BEARING)}° east of north (the Heneb record says the two alignments differ slightly). Later than Fort 1: a Fort 1 ditch lies under the levelling for it. It has no direct date: Coflein puts it later in the Flavian period, and the Heneb record’s “possibly around 82 AD” is an unproven 2013 summary, so it is drawn from AD 83, once Fort 1 is gone, because a Fort 1 ditch lies under Fort 2’s levelling and the two did not stand together; the commenter’s “around AD 90–100” probably comes from llandeilo.org’s caption of Neil Ludlow’s painting, which shows the fort “around 100AD”: a date for the scene, not a founding date. It was abandoned by AD 140, and it has been suggested that south-west Wales was bereft of troops by the mid-120s, so it is drawn to about 125 and fades out by 140. Three of its four gates are evidenced (front, left, right); the rear is not demonstrated and is drawn as unproven. Timber buildings and no stone. ${ANALOGY_ONLY} ${CREDIT}`,
    `Tua 140m wrth 110m o fewn (1.54ha), ar ran ogleddol Caer 1, ei hechel hir tua ${String(FORT_2_BEARING)}° i’r dwyrain o’r gogledd (mae cofnod Heneb yn dweud bod y ddau aliniad ychydig yn wahanol). Yn ddiweddarach na Chaer 1: mae ffos o Gaer 1 o dan y lefelu ar ei chyfer. Nid oes dyddiad uniongyrchol iddi: mae Coflein yn ei gosod yn ddiweddarach yn y cyfnod Flafiaidd, ac mae “possibly around 82 AD” cofnod Heneb yn grynodeb heb ei brofi o 2013, felly fe’i tynnir o 83 OC, wedi i Gaer 1 fynd, gan fod ffos o Gaer 1 o dan y lefelu ar gyfer Caer 2 ac na safai’r ddwy gyda’i gilydd; mae “tua 90–100 OC” y sylwebydd yn tarddu, mae’n debyg, o gapsiwn llandeilo.org i baentiad Neil Ludlow, sy’n dangos y gaer “around 100AD”: dyddiad i’r olygfa, nid dyddiad sefydlu. Fe’i gadawyd erbyn 140 OC, ac awgrymwyd bod de-orllewin Cymru heb filwyr erbyn canol y 120au, felly fe’i tynnir hyd tua 125 ac mae’n pylu erbyn 140. Ceir tystiolaeth o dri o’i phedwar porth (blaen, chwith, de); ni ddangoswyd y cefn ac fe’i tynnir fel un heb ei brofi. Adeiladau pren a dim carreg. ${ANALOGY_ONLY_CY} ${CREDIT_CY}`,
  ),
  levelled: reconstructed(
    'Where Fort 1’s ditches lay once the larger fort was given up: backfilled, with Fort 2 laid partly over them. The excavator suggests part of Fort 1’s northern and eastern defences stayed in use as an annex to Fort 2; which stretches is not known, so all are drawn backfilled and this is a simplification. See each part for what is documented.',
    'Lle gorweddai ffosydd Caer 1 unwaith y rhoddwyd y gaer fwy i fyny: wedi’u llenwi, â Chaer 2 wedi’i gosod yn rhannol drostynt. Mae’r cloddiwr yn awgrymu bod rhan o amddiffynfeydd gogleddol a dwyreiniol Caer 1 wedi parhau i gael eu defnyddio fel atodiad i Gaer 2; ni wyddys pa ddarnau, felly tynnir pob un wedi’i llenwi ac mae hyn yn symleiddio. Gweler pob rhan i weld beth sydd wedi’i ddogfennu.',
    ['fort:S1', 'fort:S2'],
  ),
  vicus: reconstructed(
    'The survey and Trenches 4 and 5 show a small roadside settlement north-east of Fort 2 where its roads meet, dated by pottery to about AD 70 to 135. Documented: the roads, the place and the dates, and small timber buildings, a hearth, pits and drains. It is drawn from AD 83, with Fort 2, because its roads are laid out from Fort 2’s front gate; pottery of about AD 70 to 90 shows activity here earlier, which is not drawn as streets. How it was laid out is not known: the survey plot shows scattered, uneven anomalies, not a street grid (“shambolic” is a fair reading of an under-resolved plot, not a finding), so the houses are drawn irregular and each is marked imagined. No tile roofs are drawn: Roman tile fragments were found here, but not what they roofed; and no stone building is evidenced. ' +
      CREDIT,
    'Mae’r arolwg a Ffosydd Prawf 4 a 5 yn dangos anheddiad bach glan ffordd i’r gogledd-ddwyrain o Gaer 2 lle mae ei ffyrdd yn cwrdd, wedi’i ddyddio gan grochenwaith i tua 70 i 135 OC. Dogfennwyd: y ffyrdd, y lle a’r dyddiadau, ac adeiladau pren bach, aelwyd, pyllau a gwteri. Fe’i tynnir o 83 OC, gyda Chaer 2, gan fod ei ffyrdd wedi’u gosod o borth blaen Caer 2; mae crochenwaith o tua 70 i 90 OC yn dangos gweithgarwch yma’n gynharach, na thynnir fel strydoedd. Ni wyddys sut y’i trefnwyd: mae cynllun yr arolwg yn dangos anomaleddau gwasgaredig, anwastad, nid grid o strydoedd (darlleniad teg o gynllun heb ei ddatrys yn llawn yw “anniben”, nid canfyddiad), felly tynnir y tai’n afreolaidd a nodir bod pob un wedi’i ddychmygu. Ni thynnir toeau teils: cafwyd darnau teilsen Rufeinig yma, ond nid beth roeddent yn ei doi; ac ni cheir tystiolaeth o adeilad carreg. ' +
      CREDIT_CY,
    ['fort:S1', 'fort:S4', 'fort:S24', 'fort:S14'],
  ),
};

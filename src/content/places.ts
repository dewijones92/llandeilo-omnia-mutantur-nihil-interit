import type { Place } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { ad } from '../domain/time.ts';
import { placeId, src } from './ids.ts';

const cite = (...keys: Parameters<typeof src>[0][]): Provenance => {
  const [first, ...rest] = keys;
  if (!first) throw new Error('A documented place needs a source');
  return { kind: 'documented', sources: [src(first), ...rest.map(src)] };
};

export const PLACES: readonly Place[] = [
  {
    id: placeId('llandeilo'),
    namedFrom: ad(550),
    name: 'Llandeilo',
    other: 'Llandeilo Fawr, Llandilo',
    at: { e: 262930, n: 222236 },
    description: {
      en: 'A market town on a bluff above the Tywi, named after St Teilo.',
      cy: 'Tref farchnad ar glogwyn uwchben y Tywi, wedi’i henwi ar ôl Teilo Sant.',
    },
    provenance: cite('timeline:S9', 'victorian:S39'),
    visitable: true,
  },
  {
    id: placeId('dinefwr'),
    namedFrom: ad(1151),
    name: 'Dinefwr',
    other: 'Dynevor',
    at: { e: 261155, n: 221729 },
    description: {
      en: 'Castle and park on a ridge above the Tywi: seat of the princes of Deheubarth, later of the Rice family at Newton House.',
      cy: 'Castell a pharc ar grib uwchben y Tywi: sedd tywysogion Deheubarth, ac yn ddiweddarach teulu Rice ym Mhlas Dinefwr.',
    },
    provenance: cite('timeline:S26', 'timeline:S45'),
    visitable: true,
  },
  {
    id: placeId('roman-forts'),
    name: 'Caerau Rhufeinig Dinefwr',
    other: 'Dinefwr Roman forts',
    at: { e: 262187, n: 222534 },
    description: {
      en: 'Two overlapping Roman forts, identified by survey in 2003.',
      cy: 'Dwy gaer Rufeinig yn gorgyffwrdd, a ddarganfuwyd gan arolwg yn 2003.',
    },
    provenance: cite('timeline:S15'),
    visitable: false,
  },
  {
    id: placeId('carreg-cennen'),
    namedFrom: ad(1248),
    name: 'Carreg Cennen',
    at: { e: 266801, n: 219083 },
    description: {
      en: 'A castle on a limestone crag above the Afon Cennen.',
      cy: 'Castell ar graig galchfaen uwchben Afon Cennen.',
    },
    provenance: cite('timeline:S36', 'timeline:S37'),
    visitable: true,
  },
  {
    id: placeId('dryslwyn'),
    namedFrom: ad(1220),
    name: 'Dryslwyn',
    at: { e: 255390, n: 220294 },
    description: {
      en: 'The only native Welsh castle with three wards, on an isolated hill in the Tywi valley.',
      cy: 'Castell Cymreig brodorol â thair ward ar fryn unig yn Nyffryn Tywi.',
    },
    provenance: cite('timeline:S13', 'medieval:S22'),
    visitable: true,
  },
  {
    id: placeId('talley'),
    namedFrom: ad(1185),
    name: 'Talyllychau',
    other: 'Talley',
    at: { e: 263199, n: 232800 },
    description: {
      en: 'The only Premonstratensian abbey in Wales, at the head of two lakes.',
      cy: 'Yr unig abaty Premonstratensaidd yng Nghymru, ym mhen dau lyn.',
    },
    provenance: cite('timeline:S38', 'medieval:S18'),
    visitable: true,
  },
  {
    id: placeId('garn-goch'),
    name: 'Garn Goch',
    other: 'Y Gaer Fawr and Y Gaer Fach',
    at: { e: 269120, n: 224320 },
    description: {
      en: 'One of the largest Iron Age hillforts in Wales, on a sandstone ridge above Bethlehem.',
      cy: 'Un o fryngaerau mwyaf Oes yr Haearn yng Nghymru, ar grib o dywodfaen uwchben Bethlehem.',
    },
    provenance: cite('ironage:S1', 'ironage:S2'),
    visitable: true,
  },
  {
    id: placeId('bridge'),
    name: 'Pont Llandeilo',
    other: 'Llandeilo Bridge',
    at: { e: 262757, n: 222001 },
    description: {
      en: 'A single stone arch of 44.2m over the Tywi, completed in 1848.',
      cy: 'Un bwa carreg 44.2m dros y Tywi, a gwblhawyd yn 1848.',
    },
    provenance: cite('timeline:S54', 'victorian:S22'),
    visitable: false,
  },
];

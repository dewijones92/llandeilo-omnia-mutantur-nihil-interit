import type { Part, Plan, Pt } from '../domain/plan.ts';

const landscape = (parts: readonly Part[], extra: Omit<Plan, 'setting' | 'parts'> = {}): Plan => ({
  setting: 'landscape',
  parts,
  ...extra,
});

const map = (parts: readonly Part[], extra: Omit<Plan, 'setting' | 'parts'> = {}): Plan => ({
  setting: 'map',
  parts,
  ...extra,
});

const CC_INNER_CORNERS: readonly Pt[] = [
  [-31, -24],
  [1, -24],
  [1, 4],
  [-31, 4],
];

const CC_CRAG: Part = {
  type: 'platform',
  face: 'rock',
  outline: [
    [-31, -24],
    [29, -24],
    [29, 36],
    [-31, 36],
  ],
};

const CC_INNER_CRAG: Part = { type: 'platform', outline: CC_INNER_CORNERS, face: 'rock' };

const CC_INNER: readonly Part[] = [
  {
    type: 'wall',
    path: [
      [1, -24],
      [1, 4],
      [-31, 4],
    ],
    height: 10,
    thickness: 2.8,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.7 },
  },
  {
    type: 'wall',
    path: [
      [-31, 4],
      [-31, -24],
      [1, -24],
    ],
    height: 10,
    thickness: 1.6,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.5 },
  },
  {
    type: 'tower',
    at: [-31, 4],
    shape: 'round',
    size: 8,
    height: 15,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.5 },
  },
  {
    type: 'tower',
    at: [1, 4],
    shape: 'square',
    size: 9,
    height: 16,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.75 },
  },
  {
    type: 'tower',
    at: [1, -24],
    shape: 'square',
    size: 7,
    height: 14,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.6 },
  },
  {
    type: 'tower',
    at: [-19, 6],
    shape: 'octagonal',
    size: 6.5,
    height: 14,
    top: 'machicolated',
    material: 'rubble',
    ruin: { stands: 0.7 },
  },
  {
    type: 'tower',
    at: [-11, 6],
    shape: 'octagonal',
    size: 6.5,
    height: 14,
    top: 'machicolated',
    material: 'rubble',
    ruin: { stands: 0.7 },
  },
  {
    type: 'hall',
    at: [-15, 5],
    length: 5,
    width: 9,
    angle: 0,
    height: 12,
    roof: 'battlements',
    openings: [{ side: 'n', count: 1, tall: true }],
    material: 'rubble',
    ruin: { stands: 0.6 },
  },
  {
    type: 'hall',
    at: [-4.5, -10],
    length: 26,
    width: 7.5,
    angle: 90,
    height: 9,
    roof: 'gable',
    openings: [{ side: 'n', count: 5, rows: 2 }],
    material: 'rubble',
    ruin: { stands: 0.45 },
  },
];

const CC_OUTER: readonly Part[] = [
  {
    type: 'wall',
    path: [
      [1, -24],
      [29, -24],
      [29, 36],
      [-31, 36],
      [-31, 4],
    ],
    height: 5.5,
    thickness: 1.7,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.3 },
  },
  {
    type: 'wall',
    path: [
      [-18.5, 9],
      [-18.5, 23],
    ],
    height: 4.5,
    thickness: 1.2,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.4 },
  },
  {
    type: 'wall',
    path: [
      [-11.5, 9],
      [-11.5, 23],
    ],
    height: 4.5,
    thickness: 1.2,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.4 },
  },
  {
    type: 'hall',
    at: [-15, 24],
    length: 9,
    width: 4,
    angle: 0,
    height: 6,
    roof: 'battlements',
    openings: [{ side: 'n', count: 1, tall: true }],
    material: 'rubble',
    ruin: { stands: 0.4 },
  },
  {
    type: 'hall',
    at: [22, 8],
    length: 24,
    width: 6,
    angle: 90,
    height: 4.5,
    roof: 'gable',
    material: 'daub',
  },
  {
    type: 'hall',
    at: [8, 30],
    length: 16,
    width: 6,
    angle: 0,
    height: 4,
    roof: 'gable',
    material: 'daub',
  },
  {
    type: 'tower',
    at: [-23, 29],
    shape: 'round',
    size: 4.5,
    height: 3.5,
    top: 'plain',
    material: 'rubble',
    ruin: { stands: 0.6 },
  },
];

export const CARREG_CENNEN_WELSH = landscape(
  [
    CC_INNER_CRAG,
    {
      type: 'wall',
      path: CC_INNER_CORNERS,
      closed: true,
      height: 6,
      thickness: 1.5,
      top: 'plain',
      material: 'rubble',
    },
    {
      type: 'hall',
      at: [-8, -10],
      length: 16,
      width: 7,
      angle: 90,
      height: 5,
      roof: 'gable',
      roofMaterial: 'thatch',
      material: 'rubble',
    },
  ],
  { hearth: [-8, -10] },
);

export const CARREG_CENNEN_INNER = landscape([CC_INNER_CRAG, ...CC_INNER], { hearth: [-4.5, -10] });

export const CARREG_CENNEN = landscape([CC_CRAG, ...CC_INNER, ...CC_OUTER], { hearth: [-4.5, -10] });

const DINEFWR_INNER_CORNERS: readonly Pt[] = [
  [-18, -12],
  [14, -16],
  [22, 2],
  [8, 14],
  [-4, 18],
  [-16, 12],
];

const DINEFWR_DITCHES: readonly Part[] = [
  {
    type: 'platform',
    face: 'rock',
    outline: [
      [-18, -12],
      [14, -16],
      [22, 2],
      [22, 51],
      [-7, 61],
      [-28, 40],
    ],
  },
  {
    type: 'ditch',
    path: [
      [-26, 18],
      [-6, 25],
      [14, 21],
      [29, 7],
    ],
    width: 6,
  },
  {
    type: 'ditch',
    path: [
      [-35, 36],
      [-9, 66],
      [27, 56],
      [34, 38],
    ],
    width: 7,
  },
];

const DINEFWR_OUTER_LINE: readonly Pt[] = [
  [-16, 12],
  [-28, 40],
  [-7, 61],
  [22, 51],
  [22, 2],
];

export const DINEFWR_RHYS = landscape(
  [
    ...DINEFWR_DITCHES,
    {
      type: 'wall',
      path: DINEFWR_INNER_CORNERS,
      closed: true,
      height: 6,
      thickness: 1.8,
      top: 'plain',
      material: 'rubble',
    },
    {
      type: 'wall',
      path: DINEFWR_OUTER_LINE,
      height: 3.5,
      thickness: 0.6,
      top: 'plain',
      material: 'timber',
    },
    {
      type: 'hall',
      at: [11, 5],
      length: 14,
      width: 7,
      angle: 139,
      height: 5,
      roof: 'gable',
      roofMaterial: 'thatch',
      material: 'rubble',
    },
  ],
  { hearth: [11, 5] },
);

export const DINEFWR_GREAT_TOWER: Pt = [20, -3];
export const DINEFWR_GREAT_TOWER_HEIGHT = 15;
export const DINEFWR_STUMP = 8;

export const DINEFWR = landscape(
  [
    ...DINEFWR_DITCHES,
    {
      type: 'wall',
      path: DINEFWR_INNER_CORNERS,
      closed: true,
      height: 9,
      thickness: 2.4,
      top: 'battlements',
      material: 'rubble',
      ruin: { stands: 0.55 },
    },
    {
      type: 'wall',
      path: DINEFWR_OUTER_LINE,
      height: 5,
      thickness: 1.6,
      top: 'battlements',
      material: 'rubble',
      ruin: { stands: 0.25 },
    },
    {
      type: 'tower',
      at: DINEFWR_GREAT_TOWER,
      shape: 'round',
      size: 12,
      height: DINEFWR_GREAT_TOWER_HEIGHT,
      top: 'battlements',
      material: 'rubble',
      ruin: { stands: DINEFWR_STUMP / DINEFWR_GREAT_TOWER_HEIGHT },
    },
    {
      type: 'tower',
      at: [-4, 18],
      shape: 'round',
      size: 6,
      height: 11,
      top: 'battlements',
      material: 'rubble',
      ruin: { stands: 0.5 },
    },
    {
      type: 'hall',
      at: [11, 5],
      length: 16,
      width: 7,
      angle: 139,
      height: 9,
      roof: 'gable',
      openings: [{ side: 's', count: 4, rows: 2 }],
      material: 'rubble',
      ruin: { stands: 0.4 },
    },
    {
      type: 'tower',
      at: [16, 10],
      shape: 'square',
      size: 5.5,
      angle: 49,
      height: 12,
      top: 'battlements',
      material: 'rubble',
      ruin: { stands: 0.5 },
    },
    {
      type: 'wall',
      path: [
        [-14, 15],
        [-17, 29],
      ],
      height: 5,
      thickness: 1.3,
      top: 'battlements',
      material: 'rubble',
      ruin: { stands: 0.45 },
    },
    {
      type: 'wall',
      path: [
        [-6, 17],
        [-9, 31],
      ],
      height: 5,
      thickness: 1.3,
      top: 'battlements',
      material: 'rubble',
      ruin: { stands: 0.45 },
    },
    {
      type: 'hall',
      at: [-10, 16],
      length: 8,
      width: 6,
      angle: 10,
      height: 10,
      roof: 'battlements',
      openings: [{ side: 'n', count: 1, tall: true }],
      material: 'rubble',
      ruin: { stands: 0.5 },
    },
  ],
  { hearth: [11, 5] },
);

export const DINEFWR_SUMMERHOUSE = landscape([
  {
    type: 'tower',
    at: DINEFWR_GREAT_TOWER,
    shape: 'round',
    size: 10.5,
    base: DINEFWR_STUMP - 0.8,
    height: 4.5,
    top: 'plain',
    material: 'rubble',
  },
]);

// Phases from building-models.md: inner ward 1220s; middle ward mid-13th century; outer ward,
// apartment block and chapel tower late 13th century, all Welsh work before the 1287 siege.
// The plan turns 40° anticlockwise, so plan +x points north-east and a plan bearing of 28° (the outer
// ward) points north-north-east.
const DRYSLWYN_INNER: readonly Part[] = [
  {
    type: 'platform',
    face: 'turf',
    outline: [
      [-24, -10],
      [-6, -17],
      [14, -12],
      [14, 10],
      [-8, 16],
      [-22, 8],
    ],
  },
  {
    type: 'wall',
    path: [
      [-24, -10],
      [-6, -17],
      [14, -12],
      [14, 10],
      [-8, 16],
      [-22, 8],
    ],
    closed: true,
    height: 8,
    thickness: 2,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.12 },
  },
  {
    type: 'tower',
    at: [12, -10],
    shape: 'round',
    size: 12,
    height: 14,
    batter: true,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.3 },
  },
  {
    type: 'hall',
    at: [-13, -11.5],
    length: 16,
    width: 7,
    angle: -21,
    height: 7,
    roof: 'gable',
    openings: [{ side: 'n', count: 4 }],
    material: 'rubble',
    ruin: { stands: 0.35 },
  },
];

const DRYSLWYN_MIDDLE: readonly Part[] = [
  {
    type: 'hall',
    at: [-5, -7],
    length: 7,
    width: 6,
    angle: 69,
    height: 6,
    roof: 'gable',
    material: 'rubble',
    ruin: { stands: 0.25 },
  },
  {
    type: 'wall',
    path: [
      [14, -12],
      [30, -18],
      [50, -16],
      [64, -8],
      [64, 12],
      [46, 17],
      [26, 16],
      [14, 10],
    ],
    height: 6,
    thickness: 1.6,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.15 },
  },
];

const DRYSLWYN_OUTER: readonly Part[] = [
  {
    type: 'hall',
    at: [-20, -14.5],
    length: 14,
    width: 6,
    angle: -21,
    height: 8,
    roof: 'gable',
    openings: [{ side: 's', count: 3, rows: 2 }],
    material: 'rubble',
    ruin: { stands: 0.55 },
  },
  {
    type: 'tower',
    at: [-1, -16],
    shape: 'square',
    size: 7,
    angle: -21,
    height: 10,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.25 },
  },
  {
    type: 'wall',
    path: [
      [64, -8],
      [112, 14],
      [107, 41],
      [64, 12],
    ],
    height: 5,
    thickness: 1.8,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.12 },
  },
  {
    type: 'tower',
    at: [110, 27],
    shape: 'square',
    size: 8,
    angle: 28,
    height: 9,
    top: 'battlements',
    material: 'rubble',
    ruin: { stands: 0.2 },
  },
  {
    type: 'ditch',
    path: [
      [117, 12],
      [111, 46],
    ],
    width: 4,
  },
];

const DRYSLWYN_ANGLE = 40;

export const DRYSLWYN_FIRST = landscape(DRYSLWYN_INNER, { angle: DRYSLWYN_ANGLE, hearth: [-13, -11.5] });

export const DRYSLWYN_TWO_WARDS = landscape([...DRYSLWYN_INNER, ...DRYSLWYN_MIDDLE], {
  angle: DRYSLWYN_ANGLE,
  hearth: [-13, -11.5],
});

export const DRYSLWYN = landscape([...DRYSLWYN_INNER, ...DRYSLWYN_MIDDLE, ...DRYSLWYN_OUTER], {
  angle: DRYSLWYN_ANGLE,
  hearth: [-13, -11.5],
});

// Talley from building-models.md (measured from the Cadw-derived plans): the plan's origin is the
// crossing tower, which is Coflein's grid reference. East is +x, north is +y.
const TALLEY_CHAPELS = (y: number): Part => ({
  type: 'hall',
  at: [8.3, y],
  length: 5,
  width: 4,
  angle: 0,
  height: 6.5,
  roof: 'gable',
  pitch: 0.6,
  material: 'rubble',
  ruin: { stands: 0.2 },
});

const TALLEY_RANGE = (at: Pt, length: number, width: number, angle: number, height: number): Part => ({
  type: 'hall',
  at,
  length,
  width,
  angle,
  height,
  roof: 'gable',
  openings: [
    { side: 'n', count: Math.round(length / 5), rows: 2 },
    { side: 's', count: Math.round(length / 5), rows: 2 },
  ],
  material: 'rubble',
  ruin: { stands: 0.1 },
});

export const TALLEY_TOWER_HEIGHT = 29;

// The choir and presbytery: the part kept as the parish church after 1536.
const TALLEY_EAST: readonly Part[] = [
  {
    type: 'hall',
    at: [12.7, 0],
    length: 15.8,
    width: 11.7,
    angle: 0,
    height: 13,
    roof: 'gable',
    pitch: 0.55,
    openings: [
      { side: 'e', count: 3, tall: true },
      { side: 'n', count: 2, tall: true },
      { side: 's', count: 2, tall: true },
    ],
    material: 'rubble',
    ruin: { stands: 0.3 },
  },
  {
    type: 'tower',
    at: [0, 0],
    shape: 'square',
    size: 12,
    height: TALLEY_TOWER_HEIGHT,
    top: 'pyramid',
    material: 'rubble',
    ruin: { stands: 26 / TALLEY_TOWER_HEIGHT, sides: ['n', 'e'] },
  },
];

const TALLEY_REST: readonly Part[] = [
  ...[12.1, -12.1].map((y): Part => ({
    type: 'hall',
    at: [0, y],
    length: 12.2,
    width: 11.6,
    angle: 90,
    height: 12,
    roof: 'gable',
    pitch: 0.55,
    openings: [{ side: y > 0 ? 'e' : 'w', count: 1, tall: true }],
    material: 'rubble',
    ruin: { stands: 0.22 },
  })),
  ...[8, 12.1, 16.2, -8, -12.1, -16.2].map(TALLEY_CHAPELS),
  // The four built bays of the nave, its north wall on the arcade line, and the south aisle.
  {
    type: 'hall',
    at: [-17.25, 0],
    length: 22.5,
    width: 11,
    angle: 0,
    height: 12,
    roof: 'gable',
    pitch: 0.55,
    openings: [
      { side: 'n', count: 4 },
      { side: 'w', count: 1, tall: true },
    ],
    material: 'rubble',
    ruin: { stands: 0.12 },
  },
  {
    type: 'hall',
    at: [-17.25, -8.2],
    length: 22.5,
    width: 5.4,
    angle: 0,
    height: 6,
    roof: 'gable',
    pitch: 0.3,
    openings: [{ side: 's', count: 4 }],
    material: 'rubble',
    ruin: { stands: 0.15 },
  },
  // The four western bays were never built above their footings.
  {
    type: 'wall',
    path: [
      [-28.5, 10.75],
      [-51.5, 10.75],
      [-51.5, -10.75],
      [-28.5, -10.75],
    ],
    height: 0.8,
    thickness: 1.5,
    top: 'plain',
    material: 'rubble',
    ruin: { stands: 0.8 },
  },
  ...[-4.85, 4.85].map((y): Part => ({
    type: 'wall',
    path: [
      [-28.5, y],
      [-51.5, y],
    ],
    height: 0.6,
    thickness: 1.4,
    top: 'plain',
    material: 'rubble',
    ruin: { stands: 0.8 },
  })),
  // The planned north aisle beside the built nave stayed at its footings too.
  {
    type: 'wall',
    path: [
      [-6, 10.75],
      [-28.5, 10.75],
    ],
    height: 0.8,
    thickness: 1.5,
    top: 'plain',
    material: 'rubble',
    ruin: { stands: 0.8 },
  },
  {
    type: 'wall',
    path: [
      [-28.5, -33.6],
      [-6.7, -33.6],
      [-6.7, -10.8],
      [-28.5, -10.8],
    ],
    closed: true,
    height: 3,
    thickness: 0.8,
    top: 'plain',
    material: 'rubble',
    ruin: { stands: 0.2 },
  },
  // The east range starts at the south transept's end; the west range's existence is uncertain.
  TALLEY_RANGE([-3.45, -29.6], 22.8, 6.5, 90, 8),
  TALLEY_RANGE([-17.6, -37.6], 21.8, 8, 0, 8),
  TALLEY_RANGE([-32.5, -26.5], 29, 8, 90, 7),
];

const TALLEY_HEARTH: Pt = [-17.6, -37.6];

export const TALLEY = landscape([...TALLEY_EAST, ...TALLEY_REST], { hearth: TALLEY_HEARTH });

export const TALLEY_PARISH = landscape(TALLEY_EAST);

export const TALLEY_ABANDONED = landscape(TALLEY_REST);

const TEILO_TOWER: Part = {
  type: 'tower',
  at: [-17.35, 0.5],
  shape: 'square',
  size: 7.5,
  height: 18,
  top: 'battlements',
  material: 'rubble',
};

const DOUBLE_NAVE: readonly Part[] = [0.5, 8.5].map((y): Part => ({
  type: 'hall',
  at: [1.5, y],
  length: 31,
  width: 8,
  angle: 0,
  height: 6.5,
  roof: 'gable',
  pitch: 0.55,
  openings: [{ side: y > 1 ? 'n' : 's', count: 4 }],
  material: 'rubble',
}));

const TEILO_AXIS = 19.3;

export const CLAS_CHURCH = map(
  [
    {
      type: 'hall',
      at: [0, 0],
      length: 12,
      width: 6,
      angle: 0,
      height: 3.5,
      roof: 'gable',
      pitch: 0.6,
      roofMaterial: 'thatch',
      material: 'timber',
    },
  ],
  { angle: TEILO_AXIS },
);

export const MEDIEVAL_CHURCH = map(DOUBLE_NAVE, { angle: TEILO_AXIS });

export const TOWER_CHURCH = map([TEILO_TOWER, ...DOUBLE_NAVE], { angle: TEILO_AXIS });

export const SCOTT_CHURCH = map(
  [
    TEILO_TOWER,
    {
      type: 'hall',
      at: [-0.5, 0.5],
      length: 27,
      width: 8.5,
      angle: 0,
      height: 8,
      roof: 'gable',
      pitch: 0.6,
      openings: [{ side: 's', count: 5, tall: true }],
      material: 'rubble',
    },
    {
      type: 'hall',
      at: [17, 0.5],
      length: 8,
      width: 7,
      angle: 0,
      height: 7,
      roof: 'gable',
      pitch: 0.6,
      openings: [{ side: 'e', count: 1, tall: true }],
      material: 'rubble',
    },
    {
      type: 'hall',
      at: [-2, 7.9],
      length: 24,
      width: 5.5,
      angle: 0,
      height: 5,
      roof: 'gable',
      pitch: 0.4,
      openings: [{ side: 'n', count: 6 }],
      material: 'rubble',
    },
    {
      type: 'hall',
      at: [5.5, -6.95],
      length: 7.5,
      width: 7,
      angle: 90,
      height: 7.5,
      roof: 'gable',
      pitch: 0.6,
      openings: [{ side: 'w', count: 1, tall: true }],
      material: 'rubble',
    },
    {
      type: 'hall',
      at: [-10, 11.6],
      length: 2.5,
      width: 3.5,
      angle: 90,
      height: 4,
      roof: 'gable',
      material: 'rubble',
    },
    {
      type: 'hall',
      at: [15.5, 6],
      length: 5,
      width: 4.5,
      angle: 0,
      height: 4.5,
      roof: 'gable',
      material: 'rubble',
    },
  ],
  { angle: TEILO_AXIS },
);

const BRIDGE_AXIS = 72.4;

export const LLANDEILO_BRIDGE = map(
  [
    {
      type: 'bridge',
      from: [-81.3, 0],
      to: [29.3, 0],
      width: 8,
      height: 13.2,
      arches: [
        { at: 55.3, span: 44.2, rise: 12.65 },
        { at: 16, span: 7, rise: 4 },
      ],
      material: 'limestone',
    },
  ],
  { angle: BRIDGE_AXIS },
);

const OLD_BRIDGE_LINE = 25;

export const OLD_BRIDGE = map(
  [
    {
      type: 'bridge',
      from: [-80, OLD_BRIDGE_LINE],
      to: [26, OLD_BRIDGE_LINE],
      width: 5,
      height: 7,
      arches: Array.from({ length: 7 }, (_, k) => ({ at: 12.5 + k * 13.5, span: 10, rise: 4.5 })),
      material: 'rubble',
      ruin: 'gone',
    },
    {
      type: 'hall',
      at: [21, OLD_BRIDGE_LINE],
      length: 8,
      width: 6,
      angle: 0,
      height: 5,
      roof: 'none',
      material: 'rubble',
      ruin: { stands: 0.8 },
    },
  ],
  { angle: BRIDGE_AXIS },
);

const NEWTON_AXIS = 12.6;
const NEWTON_BLOCK = { type: 'hall', at: [0, 0], length: 30, width: 20, angle: 0, height: 12 } as const;
const NEWTON_WINDOWS = [
  { side: 'n', count: 7, rows: 3 },
  { side: 's', count: 7, rows: 3 },
  { side: 'e', count: 4, rows: 3 },
  { side: 'w', count: 4, rows: 3 },
] as const;

const corners = (length: number, width: number): readonly Pt[] => [
  [-length / 2, -width / 2],
  [length / 2, -width / 2],
  [length / 2, width / 2],
  [-length / 2, width / 2],
];

export const NEWTON_HOUSE_1660 = landscape(
  [{ ...NEWTON_BLOCK, roof: 'hip', pitch: 0.35, openings: NEWTON_WINDOWS, material: 'render' }],
  { angle: NEWTON_AXIS, hearth: [0, 0] },
);

export const NEWTON_HOUSE_TURRETS = landscape(
  [
    { ...NEWTON_BLOCK, roof: 'battlements', openings: NEWTON_WINDOWS, material: 'render' },
    ...corners(30, 20).map((at): Part => ({
      type: 'tower',
      at,
      shape: 'square',
      size: 5,
      height: 15,
      top: 'battlements',
      material: 'render',
    })),
  ],
  { angle: NEWTON_AXIS, hearth: [0, 0] },
);

export const NEWTON_HOUSE_GOTHIC = landscape(
  [
    {
      ...NEWTON_BLOCK,
      roof: 'parapet',
      roofMaterial: 'freestone',
      openings: NEWTON_WINDOWS,
      material: 'shale',
    },
    ...corners(30, 20).map((at): Part => ({
      type: 'tower',
      at,
      shape: 'octagonal',
      size: 5.5,
      height: 16,
      top: 'machicolated',
      material: 'shale',
    })),
    {
      type: 'hall',
      at: [0, 12],
      length: 5,
      width: 6,
      angle: 90,
      height: 6,
      roof: 'battlements',
      roofMaterial: 'freestone',
      openings: [{ side: 'e', count: 1, tall: true }],
      material: 'freestone',
    },
    {
      type: 'hall',
      at: [-16.5, 0],
      length: 16,
      width: 3,
      angle: 90,
      height: 4,
      roof: 'parapet',
      openings: [{ side: 'n', count: 5, tall: true }],
      material: 'freestone',
    },
  ],
  { angle: NEWTON_AXIS, hearth: [0, 0] },
);

const GOLDEN_GROVE_AXIS = 18.8;

export const GOLDEN_GROVE_EARLIER = landscape(
  [
    {
      type: 'hall',
      at: [0, 0],
      length: 26,
      width: 18,
      angle: 0,
      height: 10,
      roof: 'hip',
      pitch: 0.35,
      openings: [
        { side: 'n', count: 6, rows: 2 },
        { side: 's', count: 6, rows: 2 },
      ],
      material: 'rubble',
    },
  ],
  { angle: GOLDEN_GROVE_AXIS, hearth: [0, 0] },
);

export const GOLDEN_GROVE = landscape(
  [
    {
      type: 'hall',
      at: [0, 0],
      length: 34,
      width: 22,
      angle: 0,
      height: 14,
      roof: 'battlements',
      openings: [
        { side: 'n', count: 8, rows: 3 },
        { side: 's', count: 8, rows: 3 },
        { side: 'e', count: 5, rows: 3 },
        { side: 'w', count: 5, rows: 3 },
      ],
      material: 'black-limestone',
    },
    ...corners(34, 22).map((at): Part => ({
      type: 'tower',
      at,
      shape: 'round',
      size: 5,
      height: 17,
      top: 'cone',
      material: 'black-limestone',
    })),
    {
      type: 'hall',
      at: [-6, -19],
      length: 30,
      width: 9,
      angle: 0,
      height: 9,
      roof: 'gable',
      openings: [{ side: 's', count: 7, rows: 2 }],
      material: 'black-limestone',
    },
  ],
  { angle: GOLDEN_GROVE_AXIS, hearth: [0, 0] },
);

export const ABERGLASNEY = landscape(
  [
    {
      type: 'hall',
      at: [0, 0],
      length: 30.5,
      width: 24,
      angle: -61.8,
      height: 12,
      roof: 'hip',
      pitch: 0.35,
      openings: [
        { side: 'n', count: 7, rows: 3 },
        { side: 's', count: 7, rows: 3 },
      ],
      material: 'render',
    },
  ],
  { hearth: [0, 0] },
);

const PAXTON_CORNERS: readonly Pt[] = [
  [-5.85, -3.37],
  [5.85, -3.37],
  [0, 6.75],
];

export const PAXTONS_TOWER = landscape(
  [
    { type: 'prism', outline: PAXTON_CORNERS, height: 8.5, top: 'battlements', material: 'rubble' },
    ...PAXTON_CORNERS.map((at): Part => ({
      type: 'tower',
      at,
      shape: 'round',
      size: 3,
      height: 11,
      top: 'battlements',
      material: 'rubble',
    })),
    {
      type: 'tower',
      at: [0, 0],
      shape: 'hexagonal',
      size: 5.5,
      height: 10.5,
      top: 'battlements',
      material: 'rubble',
    },
  ],
  { angle: 58.6 },
);

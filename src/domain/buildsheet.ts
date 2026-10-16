import { toHex } from './colour.ts';
import { MATERIAL_COLOUR, SETTING_SCALE, TURF_FACE } from './materials.ts';
import { hallRoofSpec, RAISED_DROP, towerRoofSpec, type RoofSpec } from './proportions.ts';
import { partSurfaces, type SurfaceId } from './surfaces.ts';
import type { GridRef } from './model.ts';
import {
  rotate,
  type Condition,
  type KitId,
  type Material,
  type Part,
  type Plan,
  type Pt,
  type Setting,
  type Tier,
} from './plan.ts';

/**
 * The build sheet: everything a Blender script needs to model one plan, worked out here so the script
 * holds no history (ADR 0053). Points are metres east and north of the feature's grid reference, heights
 * metres up from its own ground; the app scales them by the plan's setting when it places the model.
 */
export const SHEET_FORMAT = 1;

/** Metres a standing part's walls go below the ground it stands on, so a slope never shows a gap. */
export const FOOT = 1.5;
/** Metres a wall set on another (a breastwork on its rampart) reaches down into it. */
export const SEATED = 0.3;
/** Where the probe stands, metres east and north of the anchor, so orientation is checked rather than assumed. */
export const PROBE: EN = [10, 10];

export type EN = readonly [number, number];

/** How a part meets the ground: `follow` puts every vertex on the ground below it (a bank), `rigid` stands the part on the ground at one point (a tower). */
export type Fit = { readonly kind: 'follow' } | { readonly kind: 'rigid'; readonly at: EN };

export type SheetRoof = RoofSpec;

export type SheetShape =
  | {
      readonly type: 'wall';
      readonly path: readonly EN[];
      readonly closed: boolean;
      readonly bottom: number;
      readonly top: number;
      readonly thickness: number;
      readonly taper: number;
      readonly battlements: boolean;
    }
  | {
      readonly type: 'tower';
      readonly at: EN;
      readonly outline: 'round' | 'square' | 'hexagonal' | 'octagonal';
      readonly size: number;
      readonly bottom: number;
      readonly top: number;
      /** Degrees anticlockwise from east, of the tower's own x axis. */
      readonly turn: number;
      readonly roof: SheetRoof | null;
    }
  | {
      readonly type: 'hall';
      readonly at: EN;
      readonly length: number;
      readonly width: number;
      readonly turn: number;
      readonly bottom: number;
      readonly top: number;
      readonly roof: SheetRoof | null;
    };

export interface SheetPart {
  readonly id: string;
  readonly tier: Tier;
  readonly sources: readonly string[];
  readonly detail: boolean;
  readonly kits: readonly KitId[];
  readonly material: Material;
  /** The surfaces its near model shows (ADR 0055): the script draws every face as one of these. */
  readonly surfaces: readonly SurfaceId[];
  readonly fit: Fit;
  readonly shape: SheetShape;
  /** A leaf's hinge post and the directions it points closed and as drawn, degrees anticlockwise from east. */
  readonly hinge?: { readonly at: EN; readonly closed: number; readonly drawn: number };
}

export interface BuildSheet {
  readonly format: typeof SHEET_FORMAT;
  readonly feature: string;
  readonly landmark: string;
  readonly condition: Condition;
  readonly crs: 'EPSG:27700';
  readonly anchor: GridRef;
  readonly setting: Setting;
  readonly scale: { readonly across: number; readonly up: number };
  /** Each material's colour, from the one palette: keys are `Material`s, and `turf-face` for a turf bank's cut earth. */
  readonly palette: Readonly<Record<string, string>>;
  /** Each kit's measurements, for the kits the parts ask for: keys are `KitId`s. */
  readonly kits: Readonly<Record<string, Readonly<Record<string, number>>>>;
  readonly levels: { readonly near: readonly string[]; readonly far: readonly string[] };
  /** Parts that lie on the ground (ditches, roads, platforms): the app draws these itself, on the surface it draws. */
  readonly procedural: readonly string[];
  readonly probe: EN;
  readonly parts: readonly SheetPart[];
}

export interface SheetInput {
  readonly feature: string;
  readonly landmark: string;
  readonly at: GridRef;
  readonly plan: Plan;
  readonly condition: Condition;
  readonly kitParams: (id: KitId) => Readonly<Record<string, number>>;
}

const GROUND_TYPES: readonly Part['type'][] = ['ditch', 'road', 'platform'];

/** Whether the app draws this part on its own surface rather than taking it from a model. */
export function liesOnGround(part: Part): boolean {
  return GROUND_TYPES.includes(part.type);
}

export function buildSheet(input: SheetInput): BuildSheet {
  const { plan, condition } = input;
  if (condition !== 'standing') throw new Error(`${input.feature}: a ruin cannot be modelled yet`);
  const angle = plan.angle ?? 0;
  const en = (p: Pt): EN => rotate(p, angle);
  const standing = plan.parts.filter((p) => !liesOnGround(p));
  const parts = standing.map((p) => sheetPart(input.feature, p, en, angle));
  const kitIds = [...new Set(parts.flatMap((p) => p.kits))].sort();
  const palette = {
    ...Object.fromEntries(Object.entries(MATERIAL_COLOUR).map(([m, c]) => [m, toHex(c)])),
    'turf-face': toHex(TURF_FACE),
  };
  return {
    format: SHEET_FORMAT,
    feature: input.feature,
    landmark: input.landmark,
    condition,
    crs: 'EPSG:27700',
    anchor: input.at,
    setting: plan.setting,
    scale: SETTING_SCALE[plan.setting],
    palette,
    kits: Object.fromEntries(kitIds.map((k) => [k, input.kitParams(k)])),
    levels: { near: parts.map((p) => p.id), far: parts.filter((p) => !p.detail).map((p) => p.id) },
    procedural: plan.parts.filter(liesOnGround).map((p) => idOf(input.feature, p)),
    probe: PROBE,
    parts,
  };
}

function idOf(feature: string, p: Part): string {
  if (!p.id) throw new Error(`${feature}: every modelled part needs an id`);
  return p.id;
}

function sheetPart(feature: string, p: Part, en: (q: Pt) => EN, angle: number): SheetPart {
  const id = idOf(feature, p);
  if (!p.provenance) throw new Error(`${id}: every modelled part needs its own provenance`);
  const base = {
    id,
    tier: p.provenance.kind,
    sources: [...p.provenance.sources],
    detail: p.detail === true,
    kits: [...(p.kits ?? [])],
  };
  const hinge = p.hinge
    ? { hinge: { at: en(p.hinge.at), closed: p.hinge.closed + angle, drawn: p.hinge.drawn + angle } }
    : {};
  const raised = (b: number | undefined): number => b ?? 0;
  const bottomOf = (b: number | undefined): number => (raised(b) > 0 ? raised(b) - RAISED_DROP : -FOOT);
  switch (p.type) {
    case 'wall':
      return {
        ...base,
        ...hinge,
        material: p.material,
        surfaces: partSurfaces(p),
        fit: { kind: 'follow' },
        shape: {
          type: 'wall',
          path: p.path.map(en),
          closed: p.closed ?? false,
          bottom: raised(p.base) > 0 ? raised(p.base) - SEATED : -FOOT,
          top: raised(p.base) + p.height,
          thickness: p.thickness,
          taper: p.taper ?? 1,
          battlements: p.top === 'battlements',
        },
      };
    case 'tower': {
      const at = en(p.at);
      const top = raised(p.base) + p.height;
      const roof = towerRoofSpec(p);
      return {
        ...base,
        ...hinge,
        material: p.material,
        surfaces: partSurfaces(p),
        fit: { kind: 'rigid', at },
        shape: {
          type: 'tower',
          at,
          outline: p.shape,
          size: p.size,
          bottom: bottomOf(p.base),
          top,
          turn: (p.angle ?? 0) + angle,
          roof,
        },
      };
    }
    case 'hall': {
      const at = en(p.at);
      const roof = hallRoofSpec(p);
      return {
        ...base,
        ...hinge,
        material: p.material,
        surfaces: partSurfaces(p),
        fit: { kind: 'rigid', at },
        shape: {
          type: 'hall',
          at,
          length: p.length,
          width: p.width,
          turn: p.angle + angle,
          bottom: bottomOf(p.base),
          top: raised(p.base) + p.height,
          roof,
        },
      };
    }
    case 'prism':
    case 'bridge':
    case 'ditch':
    case 'road':
    case 'platform':
      throw new Error(`${id}: a ${p.type} cannot be modelled yet`);
  }
}

/** The files a feature's model is published as, one per level. */
export function modelFile(feature: string, level: 'near' | 'far'): string {
  return `models/landmarks/${feature}.${level}.glb`;
}

/** What the generated index says about one model level: the app loads `file`, the tests hold it to its budget. */
export interface ModelLevel {
  readonly file: string;
  readonly bytes: number;
  readonly triangles: number;
  readonly drawCalls: number;
  readonly parts: number;
}

export interface LandmarkModel {
  readonly feature: string;
  readonly landmark: string;
  readonly inputHash: string;
  readonly near: ModelLevel;
  readonly far: ModelLevel;
}

/** Budgets per level at High (ADR 0053): triangles, draw calls and bytes. */
export const MODEL_BUDGET = {
  near: { triangles: 150_000, drawCalls: 16, bytes: 1_500_000 },
  far: { triangles: 15_000, drawCalls: 3, bytes: 150_000 },
} as const;

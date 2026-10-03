export const QUALITIES = ['high', 'medium', 'low'] as const;
export type Quality = (typeof QUALITIES)[number];
export const SHADOW_FILTERS = ['high', 'medium', 'low'] as const;
export type ShadowFilter = (typeof SHADOW_FILTERS)[number];

export interface QualitySettings {
  readonly quality: Quality;
  readonly shadowMapSize: number;
  readonly shadowFilter: ShadowFilter;
  readonly msaa: number;
  readonly bloom: boolean;
  readonly depthOfField: boolean;
  readonly sharpen: boolean;
  // Share (0-1) of woodland ground triangles that carry a tree. 0.62 was the only density before 2026-10-03.
  readonly treeDensity: number;
  readonly maxPixelRatio: number;
}

export const DEFAULT_QUALITY: Quality = 'high';

// High assumes a powerful desktop GPU (Dewi: "assume ... beefy gpus"); Medium and Low only shed cost.
export const QUALITY: Readonly<Record<Quality, QualitySettings>> = {
  high: {
    quality: 'high',
    shadowMapSize: 8192,
    shadowFilter: 'high',
    msaa: 4,
    bloom: true,
    depthOfField: true,
    sharpen: true,
    treeDensity: 0.9,
    maxPixelRatio: 2,
  },
  medium: {
    quality: 'medium',
    shadowMapSize: 2048,
    shadowFilter: 'medium',
    msaa: 4,
    bloom: false,
    depthOfField: false,
    sharpen: true,
    treeDensity: 0.62,
    maxPixelRatio: 1.5,
  },
  low: {
    quality: 'low',
    shadowMapSize: 1024,
    shadowFilter: 'low',
    msaa: 1,
    bloom: false,
    depthOfField: false,
    sharpen: false,
    treeDensity: 0.31,
    maxPixelRatio: 1,
  },
};

export function isQuality(value: string): value is Quality {
  return QUALITIES.some((q) => q === value);
}

export type QualitySource = 'url' | 'fx' | 'stored' | 'default';

export interface QualityInputs {
  readonly param: string | null;
  readonly fx: string | null;
  readonly stored: string | null;
}

// A link's ?quality= wins, then the old ?fx=low switch, then the viewer's remembered choice.
export function chooseQuality({ param, fx, stored }: QualityInputs): {
  readonly quality: Quality;
  readonly source: QualitySource;
} {
  if (param !== null && isQuality(param)) return { quality: param, source: 'url' };
  if (fx === 'low') return { quality: 'low', source: 'fx' };
  if (stored !== null && isQuality(stored)) return { quality: stored, source: 'stored' };
  return { quality: DEFAULT_QUALITY, source: 'default' };
}

export const MAX_TREE_DENSITY = Math.max(...QUALITIES.map((q) => QUALITY[q].treeDensity));

// What the renderer is actually doing, read back from it rather than from the table above.
export interface GraphicsState {
  readonly quality: Quality;
  readonly shadowMapSize: number;
  readonly shadowFilter: ShadowFilter | 'other';
  readonly msaa: number;
  readonly bloom: boolean;
  readonly depthOfField: boolean;
  readonly sharpen: boolean;
  readonly treesDrawn: number;
  readonly pixelRatio: number;
}

export function describeGraphics(g: GraphicsState): string {
  const onOff = (b: boolean): string => (b ? 'on' : 'off');
  return `quality ${g.quality}  shadows ${String(g.shadowMapSize)}/${g.shadowFilter}  msaa ${String(g.msaa)}  bloom ${onOff(g.bloom)}  dof ${onOff(g.depthOfField)}  sharpen ${onOff(g.sharpen)}  trees ${String(g.treesDrawn)}  pixels ${g.pixelRatio.toFixed(2)}`;
}

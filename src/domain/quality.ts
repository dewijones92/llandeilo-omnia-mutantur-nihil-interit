export const QUALITIES = ['high', 'medium', 'low'] as const;
export type Quality = (typeof QUALITIES)[number];
export type ShadowFilter = 'high' | 'medium' | 'low';

export interface QualitySettings {
  readonly quality: Quality;
  readonly shadowMapSize: number;
  readonly shadowFilter: ShadowFilter;
  readonly msaa: number;
  readonly bloom: boolean;
  readonly depthOfField: boolean;
  readonly sharpen: boolean;
  // Share (0-1) of the possible trees that are drawn.
  readonly trees: number;
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
    trees: 1,
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
    trees: 1,
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
    trees: 0.5,
    maxPixelRatio: 1,
  },
};

export function isQuality(value: string): value is Quality {
  return value === 'high' || value === 'medium' || value === 'low';
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

export function describeQuality(s: QualitySettings): string {
  const onOff = (b: boolean): string => (b ? 'on' : 'off');
  return `quality ${s.quality}  shadows ${String(s.shadowMapSize)}/${s.shadowFilter}  msaa ${String(s.msaa)}  bloom ${onOff(s.bloom)}  dof ${onOff(s.depthOfField)}  sharpen ${onOff(s.sharpen)}  trees ${s.trees.toFixed(2)}  pixels<=${String(s.maxPixelRatio)}`;
}

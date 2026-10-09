import { assertNever } from './assert.ts';
import type { FeatureKind } from './model.ts';
import type { FeaturePresence } from './state.ts';

export type SmokeStyle = 'hearth' | 'steam' | 'burning' | 'dust';

/** What smoke a feature makes: the renderer only places it. `fire` also lights its glow at night. */
export interface Plume {
  readonly style: SmokeStyle;
  readonly fire: boolean;
  readonly spread: number;
  readonly density: number;
}

/** A feature smokes once it is at least this present, so a fading feature stops smoking first. */
export const SMOKE_PRESENCE = 0.6;

export function plumeOf(kind: FeatureKind): Plume | undefined {
  switch (kind.type) {
    case 'roundhouses':
    case 'hall-houses':
      return {
        style: 'hearth',
        fire: true,
        spread: (kind.spread / 10) * 0.5 + 1,
        density: Math.min(1.5, kind.count / 4),
      };
    case 'town':
      return kind.style === 'modern' ? undefined : { style: 'hearth', fire: false, spread: 18, density: 1.8 };
    case 'building':
      return kind.condition === 'standing' && kind.plan.hearth
        ? { style: 'hearth', fire: true, spread: 1.5, density: 0.5 }
        : undefined;
    case 'burning':
      return { style: 'burning', fire: true, spread: kind.spread, density: kind.density };
    case 'hillfort':
    case 'roman-fort':
    case 'countryside':
    case 'railway':
    case 'train':
    case 'roads':
      return undefined;
    default:
      return assertNever(kind, 'feature kind');
  }
}

export interface Smoking {
  readonly feature: FeaturePresence['feature'];
  readonly plume: Plume;
}

export function smokingFeatures(present: readonly FeaturePresence[]): Smoking[] {
  return present.flatMap((p) => {
    if (p.presence < SMOKE_PRESENCE) return [];
    const plume = plumeOf(p.feature.kind);
    return plume ? [{ feature: p.feature, plume }] : [];
  });
}

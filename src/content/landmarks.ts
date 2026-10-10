import { buildSheet, type BuildSheet } from '../domain/buildsheet.ts';
import type { Feature } from '../domain/model.ts';
import { kitParams } from './kits.ts';

/**
 * The features drawn from Blender models (ADR 0053), each with the landmark its .blend groups it under.
 * Fort 1's backfilled ditches are not here: they lie on the ground, which the app draws itself.
 */
export const MODELLED: readonly { readonly feature: string; readonly landmark: string }[] = [
  { feature: 'roman-fort-a', landmark: 'roman-forts' },
  { feature: 'roman-fort-b', landmark: 'roman-forts' },
  { feature: 'roman-vicus', landmark: 'roman-forts' },
];

/** One build sheet per modelled feature, from the plans in the content. */
export function modelSheets(features: readonly Feature[]): BuildSheet[] {
  return MODELLED.map(({ feature, landmark }) => {
    const f = features.find((x) => x.id === feature);
    if (!f) throw new Error(`no feature ${feature} to model`);
    if (f.kind.type !== 'building') throw new Error(`${feature} has no plan to model`);
    return buildSheet({
      feature,
      landmark,
      at: f.at,
      plan: f.kind.plan,
      condition: f.kind.condition,
      kitParams,
    });
  });
}

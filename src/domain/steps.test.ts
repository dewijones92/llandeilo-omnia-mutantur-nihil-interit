import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import type { EventId, Feature, FeatureId, KeyEvent, Place, PlaceId } from './model.ts';
import { keySteps, nearestStep, shotFor, stepAt, stepFrom } from './steps.ts';
import { ad, range } from './time.ts';
import { createTimeline } from './timeline.ts';

const tl = createTimeline([
  { t: 0, year: ad(1000), scale: 'linear' },
  { t: 1, year: ad(2000), scale: 'linear' },
]);

const ev = (id: string, y: number, magnetic = true, extra: Partial<KeyEvent> = {}): KeyEvent => ({
  id: mint<EventId>(id),
  when: range(ad(y), ad(y)),
  approximate: false,
  title: { en: id, cy: id },
  summary: { en: '', cy: '' },
  magnetic,
  provenance: { kind: 'reconstructed', basis: { en: '', cy: '' }, sources: [] },
  ...extra,
});

describe('key steps', () => {
  const steps = keySteps(tl, [ev('c', 1500), ev('a', 1100), ev('minor', 1300, false), ev('b', 1200)]);

  it('orders magnetic events by time and skips minor ones', () => {
    expect(steps.map((s) => s.event.id)).toEqual(['a', 'b', 'c']);
    expect(steps.map((s) => s.index)).toEqual([0, 1, 2]);
  });

  it('steps forward and back from anywhere, including from a key date itself', () => {
    expect(stepFrom(steps, 0, 1)?.event.id).toBe('a');
    expect(stepFrom(steps, 0.1, 1)?.event.id).toBe('b');
    expect(stepFrom(steps, 0.1, -1)).toBeUndefined();
    expect(stepFrom(steps, 0.25, -1)?.event.id).toBe('b');
    expect(stepFrom(steps, 0.5, 1)).toBeUndefined();
  });

  it('knows when the slider sits on a key date', () => {
    expect(stepAt(steps, 0.2)?.event.id).toBe('b');
    expect(stepAt(steps, 0.25)).toBeUndefined();
  });

  it('snaps to the nearest key date within the radius, and to none beyond it', () => {
    expect(nearestStep(steps, 0.21, 0.02)?.event.id).toBe('b');
    expect(nearestStep(steps, 0.16, 0.05)?.event.id).toBe('b');
    expect(nearestStep(steps, 0.25, 0.02)).toBeUndefined();
    expect(nearestStep(steps, 0.16, 0.1)?.event.id).toBe('b');
    expect(nearestStep(steps, 0.14, 0.1)?.event.id).toBe('a');
  });
});

describe('shotFor', () => {
  const place: Place = {
    id: mint<PlaceId>('p'),
    name: 'P',
    namedFrom: ad(1000),
    at: { e: 1, n: 2 },
    description: { en: '', cy: '' },
    provenance: { kind: 'reconstructed', basis: { en: '', cy: '' }, sources: [] },
    visitable: true,
  };
  const places = new Map([[place.id, place]]);
  const feature: Feature = {
    id: mint<FeatureId>('f'),
    kind: { type: 'railway', section: { within: [{ maxN: 0 }] } },
    at: { e: 5, n: 6 },
    when: range(ad(1100), ad(1900)),
    provenance: { kind: 'reconstructed', basis: { en: '', cy: '' }, sources: [] },
    label: { en: 'F', cy: 'F' },
  };
  const features = new Map([[feature.id, feature]]);

  it('frames the event place by default', () => {
    expect(shotFor(ev('x', 1100, true, { place: place.id }), places, features)).toEqual({
      at: { e: 1, n: 2 },
      framing: 'site',
    });
  });

  it('prefers a named feature and framing', () => {
    expect(
      shotFor(
        ev('x', 1100, true, { place: place.id, shot: { framing: 'close', feature: feature.id } }),
        places,
        features,
      ),
    ).toEqual({
      at: { e: 5, n: 6 },
      framing: 'close',
    });
  });

  it('shows the whole valley when there is no place or the shot asks for it', () => {
    expect(shotFor(ev('x', 1100), places, features)).toBeUndefined();
    expect(
      shotFor(ev('x', 1100, true, { place: place.id, shot: { framing: 'valley' } }), places, features),
    ).toBeUndefined();
  });
});

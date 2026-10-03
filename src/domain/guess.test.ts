import { describe, expect, it } from 'vitest';
import { mint } from './brand.ts';
import type { ClimateKey } from './climate.ts';
import type {
  Conversation,
  ConversationId,
  EnvironmentKey,
  EventId,
  Feature,
  FeatureId,
  KeyEvent,
  PlaceId,
} from './model.ts';
import type { LampKey } from './lamplight.ts';
import type { Provenance, SourceId } from './provenance.ts';
import { snapshotAt, type WorldContent } from './state.ts';
import { keySteps } from './steps.ts';
import { ad, range } from './time.ts';
import { createTimeline, tAt } from './timeline.ts';
import {
  MAX_POINTS,
  climateShows,
  clueStrength,
  clues,
  pickRound,
  playableSteps,
  sceneMatches,
  scoreGuess,
  type Clue,
} from './guess.ts';

const source = mint<SourceId>('test:S1');
const DOCUMENTED: Provenance = { kind: 'documented', sources: [source] };
const RECONSTRUCTED: Provenance = {
  kind: 'reconstructed',
  basis: { en: 'by analogy', cy: 'drwy gymharu' },
  sources: [],
};
const IMAGINED: Provenance = {
  kind: 'imagined',
  groundedIn: { en: 'a guess', cy: 'dyfaliad' },
  sources: [],
};
const COLD: Provenance = {
  kind: 'reconstructed',
  basis: { en: 'a cold spell', cy: 'cyfnod oer' },
  sources: [],
};
const MILD: Provenance = { kind: 'reconstructed', basis: { en: 'no shift', cy: 'dim newid' }, sources: [] };

const feature = (id: string, from: number, to: number, provenance: Provenance): Feature => ({
  id: mint<FeatureId>(id),
  kind: { type: 'railway', section: { side: 'south', ofN: 0 } },
  at: { e: 0, n: 0 },
  when: range(ad(from), ad(to)),
  provenance,
  label: { en: id, cy: id },
});

const event = (id: string, y: number): KeyEvent => ({
  id: mint<EventId>(id),
  when: range(ad(y), ad(y)),
  approximate: false,
  title: { en: id, cy: id },
  summary: { en: id, cy: id },
  magnetic: true,
  provenance: DOCUMENTED,
});

const climate: readonly ClimateKey[] = [
  { year: ad(1000), chill: 0, provenance: MILD },
  { year: ad(1500), chill: 0.5, provenance: COLD },
  { year: ad(1800), chill: 0.5, provenance: COLD },
  { year: ad(1900), chill: 0, provenance: MILD },
  { year: ad(2000), chill: 0, provenance: MILD },
];

const LAND: EnvironmentKey = {
  year: ad(1000),
  forest: 0.5,
  farmland: 0.3,
  moor: 0.2,
  skyTop: '#000000',
  skyHorizon: '#000000',
  sun: '#ffffff',
  fog: 0.1,
  mappedWoodland: 0,
};

const SILENT: WorldContent['soundscape'] = {
  wind: [],
  river: [],
  birds: [],
  forest: [],
  livestock: [],
  forge: [],
  bells: [],
  market: [],
  train: [],
  railcar: [],
  traffic: [],
  chant: [],
};

const FIRELIGHT: LampKey = {
  year: ad(1000),
  dated: 'by',
  homes: 'hearth',
  streets: { kind: 'none' },
  warmth: 1,
  windows: 0.2,
  glow: 0.4,
  hearth: 1,
  text: { en: 'fire', cy: 'tân' },
  provenance: { kind: 'reconstructed', basis: { en: 'test', cy: 'prawf' }, sources: [] },
};

const world = (
  features: readonly Feature[],
  events: readonly KeyEvent[] = [],
  more: Partial<Pick<WorldContent, 'environment' | 'conversations' | 'lamplight'>> = {},
): WorldContent => ({
  timeline: createTimeline([
    { t: 0, year: ad(1000), scale: 'linear' },
    { t: 1, year: ad(2000), scale: 'linear' },
  ]),
  eras: [],
  environment: more.environment ?? [LAND],
  soundscape: SILENT,
  lamplight: more.lamplight ?? [FIRELIGHT],
  climate,
  places: [],
  events,
  features,
  people: [],
  conversations: more.conversations ?? [],
  almanac: [],
  language: [],
  sources: [],
});

const at = (w: WorldContent, y: number): number => tAt(w.timeline, ad(y));
const ids = (list: readonly Clue[]): string[] =>
  list.map((c) => (c.kind === 'feature' ? c.feature.id : 'climate'));

describe('clueStrength', () => {
  it('makes only a documented feature with exact dates firm, and never an imagined one a clue', () => {
    expect(clueStrength(DOCUMENTED, true)).toBe('firm');
    expect(clueStrength(DOCUMENTED, false)).toBe('probable');
    expect(clueStrength(RECONSTRUCTED, true)).toBe('probable');
    expect(clueStrength(IMAGINED, true)).toBeUndefined();
  });
});

describe('clues', () => {
  const w = world([
    feature('wide-ruin', 1100, 2000, DOCUMENTED),
    feature('narrow-castle', 1400, 1450, RECONSTRUCTED),
    feature('middling-abbey', 1300, 1600, DOCUMENTED),
    feature('invented-farm', 1420, 1430, IMAGINED),
    feature('gone-already', 1100, 1200, DOCUMENTED),
  ]);

  it('ranks what is on screen by how tightly its time range brackets the true year', () => {
    const list = clues(w, snapshotAt(w, at(w, 1425)));
    expect(ids(list)).toEqual(['narrow-castle', 'middling-abbey', 'climate', 'wide-ruin']);
  });

  it('never offers an imagined feature, however tight its dates', () => {
    const list = clues(w, snapshotAt(w, at(w, 1425)));
    expect(ids(list)).not.toContain('invented-farm');
  });

  it('leaves out a feature still fading in or out, whose dates do not include the true year', () => {
    const edge = world([
      feature('next-phase', 1430, 1500, DOCUMENTED),
      feature('this-phase', 1300, 1429, DOCUMENTED),
    ]);
    const snap = snapshotAt(edge, at(edge, 1427));
    expect(snap.features.find((f) => f.feature.id === 'next-phase')?.presence).toBeGreaterThan(0.5);
    expect(ids(clues(edge, snap).filter((c) => c.kind === 'feature'))).toEqual(['this-phase']);
  });

  it('calls a documented feature firm only when its dates are marked exact, and probable otherwise', () => {
    const mixed = world([
      feature('rounded', 1300, 1400, DOCUMENTED),
      { ...feature('dated', 1300, 1400, DOCUMENTED), datesExact: true },
    ]);
    const list = clues(mixed, snapshotAt(mixed, at(mixed, 1350)));
    expect(list.flatMap((c) => (c.kind === 'feature' ? [[c.feature.id, c.strength]] : []))).toEqual([
      ['dated', 'firm'],
      ['rounded', 'probable'],
    ]);
  });

  it('offers only the phase that begins at the true year when two phases meet there', () => {
    const meet = world([
      feature('fort', 1200, 1400, DOCUMENTED),
      feature('fort-ruin', 1400, 1900, DOCUMENTED),
    ]);
    const snap = snapshotAt(meet, at(meet, 1400));
    expect(snap.features.map((f) => f.feature.id)).toEqual(['fort', 'fort-ruin']);
    expect(ids(clues(meet, snap).filter((c) => c.kind === 'feature'))).toEqual(['fort-ruin']);
  });

  it('puts the firm clue first when two bracket the year equally tightly', () => {
    const tie = world([
      feature('rebuilt', 1300, 1400, RECONSTRUCTED),
      { ...feature('recorded', 1300, 1400, DOCUMENTED), datesExact: true },
    ]);
    const list = clues(tie, snapshotAt(tie, at(tie, 1350))).filter((c) => c.kind === 'feature');
    expect(ids(list)).toEqual(['recorded', 'rebuilt']);
  });

  it('carries the strength and the range the feature is drawn for', () => {
    const [first] = clues(w, snapshotAt(w, at(w, 1425)));
    expect(first?.strength).toBe('probable');
    expect(first?.when).toEqual(range(ad(1400), ad(1450)));
  });

  it('adds a probable climate clue from the model while the climate is clearly colder', () => {
    const list = clues(w, snapshotAt(w, at(w, 1700)));
    const cold = list.find((c) => c.kind === 'climate');
    expect(cold).toMatchObject({ kind: 'climate', colder: true, strength: 'probable' });
    // The model ramps 0 → 0.5 over 1000-1500 and back over 1800-1900, so 0.2 is passed at 1200 and 1860.
    expect(cold?.when.from).toBeCloseTo(1200);
    expect(cold?.when.to).toBeCloseTo(1860);
    expect(cold?.provenance).toBe(COLD);
    expect(clues(w, snapshotAt(w, at(w, 1100))).some((c) => c.kind === 'climate')).toBe(false);
  });
});

describe('playableSteps and pickRound', () => {
  const w = world(
    [feature('castle', 1200, 1400, DOCUMENTED), feature('farm', 1700, 1800, IMAGINED)],
    [event('with-castle', 1300), event('only-imagined', 1750), event('empty', 1050)],
  );
  const steps = keySteps(w.timeline, w.events);

  it('keeps only moments with at least one feature to read the date from', () => {
    expect(playableSteps(w, steps).map((s) => s.event.id)).toEqual(['with-castle']);
  });

  it('never repeats a round in one game, and runs dry when all are played', () => {
    const playable = steps;
    const first = pickRound(playable, () => 0, new Set());
    expect(first).toBeDefined();
    const second = pickRound(playable, () => 0, new Set([first?.index ?? -1]));
    expect(second?.index).not.toBe(first?.index);
    expect(pickRound(playable, () => 0.999, new Set(steps.map((s) => s.index)))).toBeUndefined();
  });
});

describe('scoreGuess', () => {
  it('scores on the timeline’s own scale: spot on is full marks, far off is nothing', () => {
    expect(scoreGuess(0.5, 0.5)).toBe(MAX_POINTS);
    expect(scoreGuess(0.503, 0.5)).toBe(MAX_POINTS);
    expect(scoreGuess(0.9, 0.5)).toBe(0);
    const near = scoreGuess(0.55, 0.5);
    const far = scoreGuess(0.65, 0.5);
    expect(near).toBeGreaterThan(far);
    expect(far).toBeGreaterThan(0);
    expect(scoreGuess(0.45, 0.5)).toBe(near);
  });
});

describe('sceneMatches', () => {
  const w = world([feature('castle', 1200, 1400, DOCUMENTED), feature('railway', 1857, 2000, DOCUMENTED)]);

  it('says two moments look the same when the same things are drawn in the same land', () => {
    expect(sceneMatches(snapshotAt(w, at(w, 1250)), snapshotAt(w, at(w, 1350)))).toBe(true);
  });

  it('tells them apart when only the people drawn differ', () => {
    const talk: Conversation = {
      id: mint<ConversationId>('market-talk'),
      when: range(ad(1300), ad(1400)),
      place: mint<PlaceId>('town'),
      at: { e: 0, n: 0 },
      setIn: { en: 'a market', cy: 'marchnad' },
      title: { en: 'talk', cy: 'sgwrs' },
      people: [],
      lines: [],
      provenance: IMAGINED,
    };
    const peopled = world([], [], { conversations: [talk] });
    expect(sceneMatches(snapshotAt(peopled, at(peopled, 1250)), snapshotAt(peopled, at(peopled, 1350)))).toBe(
      false,
    );
  });

  it('tells them apart when only the mapped woodland differs', () => {
    const wooded = world([], [], {
      environment: [LAND, { ...LAND, year: ad(2000), mappedWoodland: 1 }],
    });
    expect(sceneMatches(snapshotAt(wooded, at(wooded, 1250)), snapshotAt(wooded, at(wooded, 1350)))).toBe(
      false,
    );
  });

  it('tells them apart when only the night light differs: gas street lamps against none', () => {
    const gaslit: LampKey = {
      ...FIRELIGHT,
      year: ad(1300),
      streets: {
        kind: 'gas',
        glow: 0.7,
        area: {
          id: 'test-town',
          label: { en: 'town', cy: 'tref' },
          outline: [
            { e: 0, n: 0 },
            { e: 1, n: 0 },
            { e: 1, n: 1 },
          ],
        },
      },
    };
    const lit = world([feature('castle', 1200, 1400, DOCUMENTED)], [], { lamplight: [FIRELIGHT, gaslit] });
    expect(sceneMatches(snapshotAt(lit, at(lit, 1250)), snapshotAt(lit, at(lit, 1350)))).toBe(false);
  });

  it('tells them apart when a feature differs, or the climate does', () => {
    expect(sceneMatches(snapshotAt(w, at(w, 1250)), snapshotAt(w, at(w, 1900)))).toBe(false);
    expect(sceneMatches(snapshotAt(w, at(w, 1100)), snapshotAt(w, at(w, 1650)))).toBe(false);
  });
});

describe('climateShows', () => {
  // OS Terrain 50's highest point in the circle (public/data/terrain.json maxHeight).
  const HIGHEST_M = 675.4;

  it('says a colder climate shows in the snow only in a season whose snow reaches the hills', () => {
    expect(climateShows('summer', 0.45, HIGHEST_M)).toBe(false);
    expect(climateShows('autumn', 0.45, HIGHEST_M)).toBe(true);
    expect(climateShows('winter', 0.45, HIGHEST_M)).toBe(true);
    expect(climateShows('winter', 0.45, 100)).toBe(false);
  });

  it('says a warmer climate shows in less snow only where today’s snow reaches the hills', () => {
    expect(climateShows('winter', -0.3, HIGHEST_M)).toBe(true);
    expect(climateShows('summer', -0.3, HIGHEST_M)).toBe(false);
  });
});

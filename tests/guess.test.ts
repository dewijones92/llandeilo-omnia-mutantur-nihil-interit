import { describe, expect, it } from 'vitest';
import { WORLD_CONTENT } from '../src/content/world.ts';
import { ROUNDS, clueStrength, clues, playableSteps, type Clue } from '../src/domain/guess.ts';
import { snapshotAt } from '../src/domain/state.ts';
import { keySteps } from '../src/domain/steps.ts';
import { bc } from '../src/domain/time.ts';

describe('When are we? on the real content', () => {
  const steps = keySteps(WORLD_CONTENT.timeline, WORLD_CONTENT.events);
  const playable = playableSteps(WORLD_CONTENT, steps);

  it('has enough moments for a full game, none of them in deep time', () => {
    expect(playable.length).toBeGreaterThanOrEqual(ROUNDS);
    for (const s of playable) expect(s.event.when.from).toBeGreaterThanOrEqual(bc(800));
  });

  it('only ever states what a clue’s own dates and provenance support', () => {
    for (const s of playable) {
      const snap = snapshotAt(WORLD_CONTENT, s.t);
      for (const c of clues(WORLD_CONTENT, snap)) {
        expect(c.provenance.kind).not.toBe('imagined');
        const exact = c.kind === 'feature' && c.feature.datesExact === true;
        expect(c.strength).toBe(c.provenance.kind === 'documented' && exact ? 'firm' : 'probable');
        expect(Math.round(c.when.from)).toBeLessThanOrEqual(Math.round(snap.year));
        expect(Math.round(c.when.to)).toBeGreaterThanOrEqual(Math.round(snap.year));
      }
    }
  });

  it('gives the railway as a firm clue on the day it opened', () => {
    const railway = playable.find((s) => s.event.id === 'railway');
    expect(railway).toBeDefined();
    const list = railway ? clues(WORLD_CONTENT, snapshotAt(WORLD_CONTENT, railway.t)) : [];
    expect(list.find((c) => c.kind === 'feature' && c.feature.id === 'railway')?.strength).toBe('firm');
  });

  it('calls a reconstructed feature with exact dates only a probable clue: exact dates are not a record', () => {
    const exactReconstructed = WORLD_CONTENT.features.filter(
      (f) => f.datesExact && f.provenance.kind === 'reconstructed',
    );
    expect(exactReconstructed.map((f) => f.id)).toContain('railway-llanelly-1840');
    for (const f of exactReconstructed) expect(clueStrength(f.provenance, true), f.id).toBe('probable');
  });

  it('calls a documented feature with approximate dates only a probable clue', () => {
    const at = (id: string) => {
      const step = playable.find((s) => s.event.id === id);
      return step ? clues(WORLD_CONTENT, snapshotAt(WORLD_CONTENT, step.t)) : [];
    };
    const strength = (list: readonly Clue[], id: string) =>
      list.find((c) => c.kind === 'feature' && c.feature.id === id)?.strength;
    expect(strength(at('roman-forts'), 'roman-fort-a')).toBe('probable');
    expect(strength(at('garn-goch-fort'), 'fan-camp')).toBe('probable');
    expect(strength(at('dryslwyn-siege'), 'dinefwr-castle')).toBe('probable');
  });
});

import { describe, expect, it } from 'vitest';
import { PROVENANCE_KINDS } from './provenance.ts';

describe('PROVENANCE_KINDS', () => {
  it('lists the three tiers, most certain first', () => {
    expect(PROVENANCE_KINDS).toEqual(['documented', 'reconstructed', 'imagined']);
  });
});

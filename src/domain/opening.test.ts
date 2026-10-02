import { describe, expect, it } from 'vitest';
import { showsBegin } from './opening.ts';

describe('the Begin card', () => {
  const params = (q: string) => new URLSearchParams(q);

  it('shows on a plain visit, and with only a language', () => {
    expect(showsBegin(params(''), false)).toBe(true);
    expect(showsBegin(params('lang=cy'), false)).toBe(true);
  });

  it('is skipped by deep links and the debug view', () => {
    for (const q of ['year=1282', 't=0.5', 'place=garn-goch', 'debug'])
      expect(showsBegin(params(q), false)).toBe(false);
  });

  it('is skipped in automated browsers unless asked for, and ?begin=0 turns it off', () => {
    expect(showsBegin(params(''), true)).toBe(false);
    expect(showsBegin(params('begin=1&year=1282'), true)).toBe(true);
    expect(showsBegin(params('begin=0'), false)).toBe(false);
  });
});

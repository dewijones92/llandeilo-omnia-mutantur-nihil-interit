import { describe, expect, it } from 'vitest';
import { showsBegin, welcomeAtStart } from './opening.ts';

describe('the Begin card', () => {
  const params = (q: string) => new URLSearchParams(q);

  it('shows on a plain visit, and with only a language', () => {
    expect(showsBegin(params(''), false)).toBe(true);
    expect(showsBegin(params('lang=cy'), false)).toBe(true);
  });

  it('is skipped by deep links and the debug view', () => {
    for (const q of ['year=1282', 't=0.5', 'place=garn-goch', 'debug', 'cutscene=roman-arrival'])
      expect(showsBegin(params(q), false)).toBe(false);
  });

  it('is skipped in automated browsers unless asked for, and ?begin=0 turns it off', () => {
    expect(showsBegin(params(''), true)).toBe(false);
    expect(showsBegin(params('begin=1&year=1282'), true)).toBe(true);
    expect(showsBegin(params('begin=0'), false)).toBe(false);
  });
});

describe('the welcome panel at start', () => {
  const params = (q: string) => new URLSearchParams(q);
  const shows = (q: string, automated: boolean, stored: string | null): boolean =>
    welcomeAtStart(params(q), automated, stored).show;

  it('shows on every visit, deep links included, until it is turned off', () => {
    for (const q of ['', 'lang=cy', 'year=1282', 'place=garn-goch', 'debug', 'begin=0'])
      expect(shows(q, false, null), q).toBe(true);
    expect(shows('', false, '1')).toBe(true);
  });

  it('stays closed once its "Show this at start" box is unticked, even when asked for', () => {
    expect(shows('', false, '0')).toBe(false);
    expect(shows('welcome=1', true, '0')).toBe(false);
  });

  it('is skipped in automated browsers unless ?welcome=1 asks for it, and ?welcome=0 turns it off', () => {
    expect(shows('', true, null)).toBe(false);
    expect(shows('welcome=1&begin=1', true, null)).toBe(true);
    expect(shows('welcome=0', false, null)).toBe(false);
  });

  it('says why, for the log', () => {
    expect(welcomeAtStart(params(''), true, null).why).toBe('automated browser');
    expect(welcomeAtStart(params(''), false, '0').why).toBe('turned off by the viewer');
  });
});

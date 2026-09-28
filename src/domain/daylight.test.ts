import { describe, expect, it } from 'vitest';
import { hex } from './colour.ts';
import {
  DEFAULT_CLOCK,
  lightingAt,
  parseClock,
  phaseOf,
  SEASONS,
  seasonKey,
  seasonLook,
  snowCover,
  sunDirection,
  sunElevation,
  wrapHour,
  type Season,
} from './daylight.ts';

const ENV = { skyTop: hex('#8bb0d6'), skyHorizon: hex('#eeede6'), sun: hex('#fbe9c8'), fog: 0.4 };
const at = (hour: number, season: Season = 'summer') => ({ hour, season });

describe('sun position', () => {
  it('stands due south at noon, higher in summer than in winter', () => {
    const summer = sunDirection(at(12));
    expect(summer.x).toBeCloseTo(0, 6);
    expect(summer.z).toBeLessThan(0);
    expect(sunElevation(at(12))).toBeCloseTo(90 - 51.88 + 21.5, 1);
    expect(sunElevation(at(12, 'winter'))).toBeCloseTo(90 - 51.88 - 21.2, 1);
  });

  it('rises in the east and sets in the west', () => {
    expect(sunDirection(at(7)).x).toBeGreaterThan(0.5);
    expect(sunDirection(at(19)).x).toBeLessThan(-0.5);
  });

  it('is a unit vector at every hour and season', () => {
    for (const season of SEASONS)
      for (let h = 0; h < 24; h += 1.5) {
        const d = sunDirection(at(h, season));
        expect(Math.hypot(d.x, d.y, d.z)).toBeCloseTo(1, 9);
      }
  });

  it('is down at midnight, and winter days are shorter than summer days', () => {
    expect(sunElevation(at(0))).toBeLessThan(0);
    expect(sunElevation(at(16.5, 'winter'))).toBeLessThan(0);
    expect(sunElevation(at(16.5, 'summer'))).toBeGreaterThan(20);
  });
});

describe('phaseOf', () => {
  it('names the time of day from where the sun is', () => {
    expect(phaseOf(at(1))).toBe('night');
    expect(phaseOf(at(4.2))).toBe('dawn');
    expect(phaseOf(at(9))).toBe('morning');
    expect(phaseOf(at(12))).toBe('midday');
    expect(phaseOf(at(15))).toBe('afternoon');
    expect(phaseOf(at(18))).toBe('evening');
    expect(phaseOf(at(20.3))).toBe('dusk');
    expect(phaseOf(at(18, 'winter'))).toBe('night');
  });
});

describe('lightingAt', () => {
  it('uses the era sky and sun colours by day', () => {
    const l = lightingAt(ENV, at(12));
    expect(l.moon).toBe(false);
    expect(l.skyTop.b).toBeCloseTo(ENV.skyTop.b, 1);
    expect(l.light.r).toBeCloseTo(ENV.sun.r, 1);
    expect(l.stars).toBe(0);
    expect(l.lamps).toBe(0);
  });

  it('turns warm and low at sunset, with a glow on the horizon', () => {
    const noon = lightingAt(ENV, at(12));
    const dusk = lightingAt(ENV, at(20.2));
    expect(dusk.light.b / dusk.light.r).toBeLessThan(noon.light.b / noon.light.r);
    expect(dusk.glowStrength).toBeGreaterThan(noon.glowStrength);
    expect(dusk.warmth).toBeGreaterThan(noon.warmth);
  });

  it('is lit by a dim blue moon at night, with stars and lit windows', () => {
    const l = lightingAt(ENV, at(23));
    expect(l.moon).toBe(true);
    expect(l.direction.y).toBeGreaterThan(0.4);
    expect(l.light.b).toBeGreaterThan(l.light.r);
    expect(l.lightIntensity).toBeLessThan(lightingAt(ENV, at(12)).lightIntensity / 2);
    expect(l.stars).toBeGreaterThan(0.9);
    expect(l.lamps).toBeGreaterThan(0.5);
    expect(l.skyTop.b).toBeLessThan(0.3);
  });

  it('dims most windows in the small hours', () => {
    expect(lightingAt(ENV, at(3)).lamps).toBeLessThan(lightingAt(ENV, at(23)).lamps);
  });

  it('keeps the key light above the ground at every hour', () => {
    for (const season of SEASONS)
      for (let h = 0; h < 24; h += 0.25)
        expect(lightingAt(ENV, at(h, season)).direction.y).toBeGreaterThan(-0.05);
  });

  it('thickens the fog with morning mist', () => {
    expect(lightingAt(ENV, at(6.5, 'autumn')).fogDensity).toBeGreaterThan(
      lightingAt(ENV, at(14, 'autumn')).fogDensity,
    );
  });

  it('changes smoothly as the hour moves', () => {
    for (let h = 0; h < 24; h += 0.05) {
      const a = lightingAt(ENV, at(h));
      const b = lightingAt(ENV, at(h + 0.05));
      expect(Math.abs(a.skyHorizon.r - b.skyHorizon.r)).toBeLessThan(0.06);
      expect(Math.abs(a.night - b.night)).toBeLessThan(0.1);
    }
  });
});

describe('seasonLook', () => {
  it('snows lower in winter, and lower still in a colder climate', () => {
    expect(seasonLook('winter', 0).snowLine).toBeLessThan(seasonLook('spring', 0).snowLine);
    expect(seasonLook('winter', 0.45).snowLine).toBeLessThan(seasonLook('winter', 0).snowLine);
    expect(seasonLook('winter', -0.3).snowLine).toBeGreaterThan(seasonLook('winter', 0).snowLine);
  });

  it('puts snow above the snow line only, more of it on north faces, and none on a summer summit today', () => {
    const winter = seasonLook('winter', 0.45);
    expect(snowCover(winter, winter.snowLine + 200, 0, 0.5)).toBeCloseTo(winter.snow, 6);
    expect(snowCover(winter, winter.snowLine - 200, 0, 0.5)).toBe(0);
    expect(snowCover(winter, winter.snowLine, 1, 0.5)).toBeGreaterThan(
      snowCover(winter, winter.snowLine, -1, 0.5),
    );
    expect(snowCover(seasonLook('summer', 0), 675, 1, 1)).toBe(0);
    expect(snowCover(seasonLook('summer', 1), 600, 0.5, 0.5)).toBeGreaterThan(0);
  });

  it('turns leaves in autumn, bares them in winter and brings blossom in spring', () => {
    expect(seasonLook('autumn', 0).turned).toBeGreaterThan(0.5);
    expect(seasonLook('winter', 0).bare).toBeGreaterThan(0.5);
    expect(seasonLook('spring', 0).blossom).toBeGreaterThan(0);
    expect(seasonLook('summer', 0).bare).toBe(0);
  });
});

describe('parseClock', () => {
  it('reads ?hour= and ?season=, wrapping hours and ignoring nonsense', () => {
    expect(parseClock('6.5', 'winter')).toEqual({ hour: 6.5, season: 'winter' });
    expect(parseClock('25', null)).toEqual({ hour: 1, season: DEFAULT_CLOCK.season });
    expect(parseClock('dusk', 'monsoon')).toEqual(DEFAULT_CLOCK);
    expect(parseClock('', null)).toEqual(DEFAULT_CLOCK);
    expect(wrapHour(-1)).toBe(23);
  });
});

describe('seasonKey', () => {
  it('changes when the land would look different, and only then', () => {
    const winter = seasonLook('winter', 0);
    expect(seasonKey(winter)).toBe(seasonKey(seasonLook('winter', 0)));
    expect(seasonKey(winter)).not.toBe(seasonKey(seasonLook('summer', 0)));
    expect(seasonKey(winter)).not.toBe(seasonKey(seasonLook('winter', 0.45)));
    expect(seasonKey({ ...winter, snowLine: 605 })).toBe(seasonKey({ ...winter, snowLine: 600 }));
    expect(seasonKey({ ...winter, snowLine: 650 })).not.toBe(seasonKey({ ...winter, snowLine: 600 }));
  });
});

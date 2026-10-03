import { describe, expect, it } from 'vitest';
import { hex } from './colour.ts';
import {
  DEFAULT_CLOCK,
  lightingAt,
  lowestSnowM,
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

  it('makes a winter 23:00 properly dark: a faint moon, little sky light and a near-black sky', () => {
    const l = lightingAt(ENV, at(23, 'winter'));
    const lum = (c: { r: number; g: number; b: number }): number =>
      0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
    expect(l.lightIntensity).toBeLessThanOrEqual(0.35);
    expect(l.ambientIntensity).toBeLessThanOrEqual(0.25);
    expect(lum(l.ambient) * l.ambientIntensity).toBeLessThan(0.06);
    expect(lum(l.skyTop)).toBeLessThan(0.04);
    expect(lum(l.fog)).toBeLessThan(0.1);
    expect(l.selfLit).toBeLessThanOrEqual(0.1);
  });

  it('leaves the day exactly as it was: the night work only touches the night', () => {
    const r = (_k: string, v: unknown): unknown => (typeof v === 'number' ? Number(v.toFixed(4)) : v);
    const day = (hour: number, season: Season): string =>
      JSON.stringify(lightingAt(ENV, at(hour, season)), r);
    expect(day(12, 'summer')).toMatchInlineSnapshot(
      `"{"sun":{"x":0,"y":0.8627,"z":-0.5057},"direction":{"x":0,"y":0.8627,"z":-0.5057},"moon":false,"elevation":59.62,"light":{"r":0.9843,"g":0.9137,"b":0.7843},"lightIntensity":2.067,"ambient":{"r":0.7498,"g":0.8296,"b":0.9116},"ambientGround":{"r":0.4196,"g":0.4,"b":0.349},"ambientIntensity":0.42,"skyTop":{"r":0.5451,"g":0.6902,"b":0.8392},"skyHorizon":{"r":0.9333,"g":0.9294,"b":0.902},"glow":{"r":1,"g":0.9412,"b":0.8235},"glowStrength":0.12,"fog":{"r":0.9333,"g":0.9294,"b":0.902},"fogDensity":0.0001,"stars":0,"night":0,"lamps":0,"selfLit":1,"shadowDarkness":0.28,"exposure":1,"warmth":0}"`,
    );
    expect(day(12, 'winter')).toMatchInlineSnapshot(
      `"{"sun":{"x":0,"y":0.291,"z":-0.9567},"direction":{"x":0,"y":0.291,"z":-0.9567},"moon":false,"elevation":16.92,"light":{"r":0.9933,"g":0.8461,"b":0.6491},"lightIntensity":1.6204,"ambient":{"r":0.7927,"g":0.8207,"b":0.8504},"ambientGround":{"r":0.4196,"g":0.4,"b":0.349},"ambientIntensity":0.42,"skyTop":{"r":0.535,"g":0.6759,"b":0.8299},"skyHorizon":{"r":0.9526,"g":0.8773,"b":0.7708},"glow":{"r":1,"g":0.9412,"b":0.8235},"glowStrength":0.6733,"fog":{"r":0.9526,"g":0.8773,"b":0.7708},"fogDensity":0.0001,"stars":0,"night":0,"lamps":0,"selfLit":1,"shadowDarkness":0.3538,"exposure":1,"warmth":0.4918}"`,
    );
    expect(day(9, 'spring')).toMatchInlineSnapshot(
      `"{"sun":{"x":0.6976,"y":0.5591,"z":-0.448},"direction":{"x":0.6976,"y":0.5591,"z":-0.448},"moon":false,"elevation":33.996,"light":{"r":0.9843,"g":0.9137,"b":0.7843},"lightIntensity":2.0544,"ambient":{"r":0.752,"g":0.8291,"b":0.9084},"ambientGround":{"r":0.4196,"g":0.4,"b":0.349},"ambientIntensity":0.42,"skyTop":{"r":0.5446,"g":0.6895,"b":0.8387},"skyHorizon":{"r":0.9343,"g":0.9267,"b":0.8952},"glow":{"r":1,"g":0.9412,"b":0.8235},"glowStrength":0.1486,"fog":{"r":0.9343,"g":0.9267,"b":0.8952},"fogDensity":0.0001,"stars":0,"night":0,"lamps":0,"selfLit":1,"shadowDarkness":0.2838,"exposure":1,"warmth":0.0254}"`,
    );
    // Golden hour and just after sunset, where day is below 1 but night is still 0 (values from main).
    expect(day(15.5, 'winter')).toMatchInlineSnapshot(
      `"{"sun":{"x":-0.7397,"y":0.0659,"z":-0.6697},"direction":{"x":-0.7395,"y":0.07,"z":-0.6696},"moon":false,"elevation":3.7765,"light":{"r":1,"g":0.6514,"b":0.3852},"lightIntensity":1.226,"ambient":{"r":0.8163,"g":0.8069,"b":0.8084},"ambientGround":{"r":0.4196,"g":0.4,"b":0.349},"ambientIntensity":0.6329,"skyTop":{"r":0.5168,"g":0.6516,"b":0.812},"skyHorizon":{"r":0.9632,"g":0.8347,"b":0.6805},"glow":{"r":1,"g":0.7073,"b":0.4792},"glowStrength":0.9585,"fog":{"r":0.9632,"g":0.8347,"b":0.6805},"fogDensity":0.0001,"stars":0,"night":0,"lamps":0.6121,"selfLit":0.6038,"shadowDarkness":0.3997,"exposure":1,"warmth":0.8145}"`,
    );
    expect(day(16.25, 'winter')).toMatchInlineSnapshot(
      `"{"sun":{"x":-0.8362,"y":-0.0299,"z":-0.5476},"direction":{"x":-0.8345,"y":0.07,"z":-0.5465},"moon":false,"elevation":-1.716,"light":{"r":1,"g":0.6234,"b":0.3607},"lightIntensity":0.4947,"ambient":{"r":0.7526,"g":0.6647,"b":0.7539},"ambientGround":{"r":0.4196,"g":0.4,"b":0.349},"ambientIntensity":0.8244,"skyTop":{"r":0.3098,"g":0.3843,"b":0.6},"skyHorizon":{"r":0.9363,"g":0.6615,"b":0.542},"glow":{"r":1,"g":0.6588,"b":0.4078},"glowStrength":0.7571,"fog":{"r":0.9363,"g":0.6615,"b":0.542},"fogDensity":0.0001,"stars":0,"night":0,"lamps":1,"selfLit":0.2476,"shadowDarkness":0.3549,"exposure":1,"warmth":0.7996}"`,
    );
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

  it('reports the lowest height any slope can hold snow, so nothing falls below it', () => {
    const autumn = seasonLook('autumn', 0.45);
    const lowest = lowestSnowM(autumn);
    expect(snowCover(autumn, lowest, 1, 0)).toBe(0);
    expect(snowCover(autumn, lowest + 1, 1, 0)).toBeGreaterThan(0);
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

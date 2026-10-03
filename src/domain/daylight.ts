import { clamp, lerp, smoothstep } from './assert.ts';
import { hex, mix, type Rgb } from './colour.ts';

export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const;
export type Season = (typeof SEASONS)[number];

export function isSeason(value: string): value is Season {
  return SEASONS.some((s) => s === value);
}

export interface Clock {
  readonly hour: number;
  readonly season: Season;
}

export const DEFAULT_CLOCK: Clock = { hour: 17.5, season: 'summer' };

export function wrapHour(hour: number): number {
  return ((hour % 24) + 24) % 24;
}

export function parseClock(hour: string | null, season: string | null): Clock {
  const h = hour === null || hour.trim() === '' ? Number.NaN : Number(hour);
  return {
    hour: Number.isFinite(h) ? wrapHour(h) : DEFAULT_CLOCK.hour,
    season: season !== null && isSeason(season) ? season : DEFAULT_CLOCK.season,
  };
}

export const LATITUDE_DEG = 51.88;

const DECLINATION_DEG: Readonly<Record<Season, number>> = {
  spring: 9.4,
  summer: 21.5,
  autumn: -8.9,
  winter: -21.2,
};

export interface Direction {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

const RAD = Math.PI / 180;

export function sunDirection(clock: Clock): Direction {
  const lat = LATITUDE_DEG * RAD;
  const dec = DECLINATION_DEG[clock.season] * RAD;
  const ha = (wrapHour(clock.hour) - 12) * 15 * RAD;
  return {
    x: -Math.cos(dec) * Math.sin(ha),
    y: Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(ha) * Math.cos(lat),
    z: Math.sin(dec) * Math.cos(lat) - Math.cos(dec) * Math.cos(ha) * Math.sin(lat),
  };
}

export function sunElevation(clock: Clock): number {
  return Math.asin(clamp(sunDirection(clock).y, -1, 1)) / RAD;
}

export type DayPhase = 'night' | 'dawn' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'dusk';

export function phaseOf(clock: Clock): DayPhase {
  const el = sunElevation(clock);
  const h = wrapHour(clock.hour);
  if (el < -6) return 'night';
  if (el < 6) return h < 12 ? 'dawn' : 'dusk';
  if (h >= 11 && h < 13) return 'midday';
  if (h < 12) return 'morning';
  return h >= 17 ? 'evening' : 'afternoon';
}

export interface LightInput {
  readonly skyTop: Rgb;
  readonly skyHorizon: Rgb;
  readonly sun: Rgb;
  readonly fog: number;
}

export interface Lighting {
  readonly sun: Direction;
  readonly direction: Direction;
  readonly moon: boolean;
  readonly elevation: number;
  readonly light: Rgb;
  readonly lightIntensity: number;
  readonly ambient: Rgb;
  readonly ambientGround: Rgb;
  readonly ambientIntensity: number;
  readonly skyTop: Rgb;
  readonly skyHorizon: Rgb;
  readonly glow: Rgb;
  readonly glowStrength: number;
  readonly fog: Rgb;
  readonly fogDensity: number;
  readonly stars: number;
  readonly night: number;
  readonly lamps: number;
  readonly selfLit: number;
  readonly shadowDarkness: number;
  readonly exposure: number;
  readonly warmth: number;
}

const SKY = {
  goldenTop: hex('#7f9fcb'),
  goldenHorizon: hex('#f8d2a2'),
  duskTop: hex('#4f6299'),
  duskHorizon: hex('#ee9f80'),
  nightTop: hex('#101b36'),
  nightHorizon: hex('#34476f'),
  sunLow: hex('#ff9650'),
  sunMid: hex('#ffcb8c'),
  moon: hex('#a8bde6'),
  glowLow: hex('#ffa868'),
  glowHigh: hex('#fff0d2'),
  ambientGolden: hex('#f2c9a0'),
  ambientDusk: hex('#b98fb0'),
  ambientNight: hex('#5a6fa3'),
  groundDay: hex('#6b6659'),
  groundNight: hex('#1f2538'),
} as const;

const MIST: Readonly<Record<Season, number>> = { spring: 0.6, summer: 0.35, autumn: 1, winter: 0.8 };

function moonDirection(sun: Direction): Direction {
  const x = -sun.x * 0.7;
  const z = -sun.z * 0.7;
  const y = Math.max(0.55, -sun.y);
  const l = Math.hypot(x, y, z) || 1;
  return { x: x / l, y: y / l, z: z / l };
}

function lifted(d: Direction, minY: number): Direction {
  if (d.y >= minY) return d;
  const flat = Math.hypot(d.x, d.z) || 1;
  const k = Math.sqrt(1 - minY * minY) / flat;
  return { x: d.x * k, y: minY, z: d.z * k };
}

function bell(x: number, from: number, peak: number, to: number): number {
  return x <= peak ? smoothstep(from, peak, x) : 1 - smoothstep(peak, to, x);
}

export function lightingAt(env: LightInput, clock: Clock): Lighting {
  const sun = sunDirection(clock);
  const s = sun.y;
  const hour = wrapHour(clock.hour);
  const day = smoothstep(-0.07, 0.2, s);
  const golden = (1 - smoothstep(0.05, 0.62, s)) * smoothstep(-0.1, 0.02, s);
  const twilight = smoothstep(-0.22, -0.06, s) * (1 - smoothstep(-0.02, 0.08, s));
  const night = 1 - smoothstep(-0.2, -0.05, s);
  const sunUp = s > -0.1;

  let light = mix(SKY.glowLow, SKY.sunLow, smoothstep(-0.06, 0, s));
  light = mix(light, SKY.sunMid, smoothstep(0, 0.18, s));
  light = mix(light, env.sun, smoothstep(0.12, 0.5, s));
  const afterglow = 0.5 * smoothstep(-0.1, -0.02, s) * (1 - smoothstep(0.02, 0.1, s));
  const lightIntensity = sunUp
    ? 1.95 * smoothstep(-0.04, 0.12, s) * (0.72 + 0.34 * smoothstep(0.1, 0.6, s)) + afterglow
    : 0.62 * smoothstep(-0.1, -0.2, s);

  const dayAmbient = mix(env.skyTop, { r: 1, g: 1, b: 1 }, 0.45);
  let ambient = mix(dayAmbient, SKY.ambientGolden, golden * 0.35);
  ambient = mix(ambient, SKY.ambientDusk, twilight * 0.6);
  ambient = mix(ambient, SKY.ambientNight, night);

  let top = mix(env.skyTop, SKY.goldenTop, golden * 0.35);
  top = mix(top, SKY.duskTop, twilight);
  top = mix(top, SKY.nightTop, night);
  let horizon = mix(env.skyHorizon, SKY.goldenHorizon, golden * 0.8);
  horizon = mix(horizon, SKY.duskHorizon, twilight * 0.85);
  horizon = mix(horizon, SKY.nightHorizon, night);

  const mist = bell(hour, 3.5, 6.5, 10.5) * MIST[clock.season];
  const asleep = clamp(smoothstep(22.5, 24, hour) + (1 - smoothstep(4.5, 6, hour)), 0, 1);

  return {
    sun,
    direction: sunUp ? lifted(sun, 0.07) : moonDirection(sun),
    moon: !sunUp,
    elevation: Math.asin(clamp(s, -1, 1)) / RAD,
    light: sunUp ? light : SKY.moon,
    lightIntensity,
    ambient,
    ambientGround: mix(SKY.groundDay, SKY.groundNight, night),
    ambientIntensity: lerp(lerp(0.85, 0.55, night), 0.42, day),
    skyTop: top,
    skyHorizon: horizon,
    glow: mix(SKY.glowLow, SKY.glowHigh, smoothstep(0, 0.25, s)),
    glowStrength: Math.max(golden * 0.9, twilight * 0.75) + day * 0.12,
    fog: horizon,
    fogDensity: (0.00004 + env.fog * 0.00016) * (1 + mist * 1.4),
    stars: smoothstep(0.35, 1, night),
    night,
    lamps: smoothstep(0.15, 0.75, 1 - day) * (1 - 0.65 * asleep),
    selfLit: lerp(0.2, 1, day),
    shadowDarkness: sunUp ? lerp(0.28, 0.4, golden) : 0.22,
    exposure: 1 + night * 0.12,
    warmth: golden * 0.8 + twilight * 0.3 - night * 0.7,
  };
}

export interface SeasonLook {
  readonly season: Season;
  readonly grass: Rgb;
  readonly grassAmount: number;
  readonly woodFloor: Rgb;
  readonly woodFloorAmount: number;
  readonly moor: Rgb;
  readonly moorAmount: number;
  readonly fields: Rgb;
  readonly fieldShare: number;
  readonly turned: number;
  readonly bare: number;
  readonly blossom: number;
  readonly snowLine: number;
  readonly snow: number;
}

interface SeasonBase {
  readonly grass: string;
  readonly grassAmount: number;
  readonly woodFloor: string;
  readonly woodFloorAmount: number;
  readonly moor: string;
  readonly moorAmount: number;
  readonly fields: string;
  readonly fieldShare: number;
  readonly turned: number;
  readonly bare: number;
  readonly blossom: number;
  readonly snowLine: number;
  readonly snow: number;
}

const SEASON_BASE: Readonly<Record<Season, SeasonBase>> = {
  spring: {
    grass: '#98c264',
    grassAmount: 0.32,
    woodFloor: '#7ea851',
    woodFloorAmount: 0.3,
    moor: '#a7a47a',
    moorAmount: 0.2,
    fields: '#b3cf78',
    fieldShare: 0.3,
    turned: 0,
    bare: 0,
    blossom: 0.1,
    snowLine: 640,
    snow: 0.55,
  },
  summer: {
    grass: '#a9b26c',
    grassAmount: 0.08,
    woodFloor: '#56793f',
    woodFloorAmount: 0.15,
    moor: '#a58a9c',
    moorAmount: 0.22,
    fields: '#cdc27c',
    fieldShare: 0.18,
    turned: 0,
    bare: 0,
    blossom: 0,
    snowLine: 1400,
    snow: 0.4,
  },
  autumn: {
    grass: '#ada062',
    grassAmount: 0.28,
    woodFloor: '#7d5a30',
    woodFloorAmount: 0.62,
    moor: '#96694a',
    moorAmount: 0.34,
    fields: '#8b7052',
    fieldShare: 0.3,
    turned: 0.78,
    bare: 0.08,
    blossom: 0,
    snowLine: 900,
    snow: 0.45,
  },
  winter: {
    grass: '#b1b6a5',
    grassAmount: 0.5,
    woodFloor: '#7d7467',
    woodFloorAmount: 0.5,
    moor: '#9b8f7f',
    moorAmount: 0.4,
    fields: '#8f7d66',
    fieldShare: 0.25,
    turned: 0.05,
    bare: 0.9,
    blossom: 0,
    snowLine: 470,
    snow: 0.92,
  },
};

const CHILL_SNOW_M: Readonly<Record<Season, number>> = { spring: 400, summer: 900, autumn: 600, winter: 260 };

export function seasonLook(season: Season, chill: number): SeasonLook {
  const b = SEASON_BASE[season];
  const c = clamp(chill, -1, 1);
  const coldTint = season === 'winter' ? Math.max(0, c) * 0.2 : 0;
  return {
    season,
    grass: mix(hex(b.grass), hex('#dde2de'), coldTint),
    grassAmount: clamp(b.grassAmount + coldTint, 0, 1),
    woodFloor: hex(b.woodFloor),
    woodFloorAmount: b.woodFloorAmount,
    moor: mix(hex(b.moor), hex('#dde2de'), coldTint),
    moorAmount: clamp(b.moorAmount + coldTint, 0, 1),
    fields: hex(b.fields),
    fieldShare: b.fieldShare,
    turned: b.turned,
    bare: b.bare,
    blossom: b.blossom,
    snowLine: b.snowLine - c * CHILL_SNOW_M[season],
    snow: b.snow + (0.9 - b.snow) * smoothstep(0.6, 1, c),
  };
}

// Metres: north-facing slopes hold snow lower, a per-vertex jitter breaks the line up, and the
// cover fades in over a band below and above it.
const SNOW_NORTH_M = 70;
const SNOW_JITTER_M = 90;
const SNOW_FADE_BELOW_M = 90;
const SNOW_FADE_ABOVE_M = 60;

export function snowCover(look: SeasonLook, heightM: number, north: number, jitter: number): number {
  const line = look.snowLine - north * SNOW_NORTH_M + (jitter - 0.5) * SNOW_JITTER_M;
  return smoothstep(line - SNOW_FADE_BELOW_M, line + SNOW_FADE_ABOVE_M, heightM) * look.snow;
}

// Below this height snowCover is zero on every slope (north is -1..1, jitter 0..1).
export function lowestSnowM(look: SeasonLook): number {
  return look.snowLine - SNOW_NORTH_M - SNOW_JITTER_M / 2 - SNOW_FADE_BELOW_M;
}

export function seasonKey(look: SeasonLook): string {
  return `${look.season}:${Math.round(Math.min(look.snowLine, 900) / 25)}:${Math.round(look.grassAmount * 50)}`;
}

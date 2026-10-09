import { clamp, lerp, smoothstep, type NonEmptyArray } from './assert.ts';
import { mint, mintNumber, type Brand } from './brand.ts';
import type { Bilingual } from './i18n.ts';
import type { EventId, Feature, FeatureId, GridRef } from './model.ts';
import { hash2 } from './noise.ts';
import { bearing, pointAlong, polylineLength } from './polyline.ts';
import type { Provenance } from './provenance.ts';
import type { FeaturePresence } from './state.ts';
import { contains, type Year } from './time.ts';

export type CutsceneId = Brand<string, 'CutsceneId'>;
export type Seconds = Brand<number, 'Seconds'>;

export const cutsceneId = (v: string): CutsceneId => mint<CutsceneId>(v);

export function sec(value: number): Seconds {
  if (!Number.isFinite(value) || value < 0) throw new Error(`Invalid scene time ${String(value)}`);
  return mintNumber<Seconds>(value);
}

export type Ease = 'linear' | 'in-out' | 'out';

// A camera key is where the camera is AT `at`. `arrive` says how it got there from the key before:
// eased, or a cut (the camera holds the previous key, then jumps).
export interface CameraKey {
  readonly at: Seconds;
  readonly target: GridRef;
  /** Metres from the target to the camera. */
  readonly distance: number;
  /** Compass bearing the camera looks along, degrees clockwise from north. */
  readonly heading: number;
  /** Degrees the camera looks down from the horizontal. */
  readonly pitch: number;
  readonly arrive: 'cut' | Ease;
}

export type CameraPose = Pick<CameraKey, 'target' | 'distance' | 'heading' | 'pitch'>;

export type ActorKind =
  'scout' | 'rider' | 'pioneer' | 'standard' | 'trumpeter' | 'auxiliary' | 'mule' | 'servant' | 'farmer';

export interface Route {
  readonly id: string;
  readonly label: Bilingual;
  readonly points: NonEmptyArray<GridRef>;
  readonly provenance: Provenance;
}

// Procedural one-shot or looped cues, played by the one audio mixer.
export type CueSound = 'cornu' | 'tramp' | 'hooves' | 'mules' | 'axes';

export interface ActorsTrack {
  readonly kind: 'actors';
  readonly actor: ActorKind;
  readonly count: number;
  readonly abreast: number;
  /** Metres between ranks and between files. */
  readonly spacing: { readonly rank: number; readonly file: number };
  readonly route: Route;
  /** Metres along the route of the front rank, at `from` and at `to`. Equal means standing. */
  readonly head: { readonly from: number; readonly to: number };
  readonly from: Seconds;
  readonly to: Seconds;
  /** A standing group faces this point; a moving one faces along the route. */
  readonly faces?: GridRef;
  readonly provenance: Provenance;
}

export interface SoundTrack {
  readonly kind: 'sound';
  readonly sound: CueSound;
  readonly from: Seconds;
  readonly to: Seconds;
  readonly provenance: Provenance;
}

export interface CaptionTrack {
  readonly kind: 'caption';
  readonly text: Bilingual;
  readonly from: Seconds;
  readonly to: Seconds;
  readonly provenance: Provenance;
}

export interface FeatureTrack {
  readonly kind: 'feature';
  readonly feature: FeatureId;
  readonly show: 'build';
  readonly from: Seconds;
  readonly to: Seconds;
}

export type Track = ActorsTrack | SoundTrack | CaptionTrack | FeatureTrack;

export interface Cutscene {
  readonly id: CutsceneId;
  /** The key date the scene belongs to, and where it leaves the viewer. */
  readonly event: EventId;
  readonly title: Bilingual;
  readonly duration: Seconds;
  readonly camera: NonEmptyArray<CameraKey>;
  readonly tracks: readonly Track[];
  readonly provenance: Provenance;
}

export interface Placement {
  readonly at: GridRef;
  /** Degrees clockwise from north. */
  readonly heading: number;
  readonly walking: boolean;
  /** 0..1, fixed per member, so gaits are not in step. */
  readonly phase: number;
}

export interface ActorGroup {
  readonly track: number;
  readonly actor: ActorKind;
  readonly members: readonly Placement[];
}

export interface Frame {
  readonly s: number;
  readonly camera: CameraPose;
  readonly caption: CaptionTrack | undefined;
  readonly actors: readonly ActorGroup[];
  /** Presence (0..1) of each feature the scene builds; features it does not name are untouched. */
  readonly features: ReadonlyMap<FeatureId, number>;
}

function ease(kind: Ease, f: number): number {
  switch (kind) {
    case 'linear':
      return f;
    case 'out':
      return 1 - (1 - f) * (1 - f) * (1 - f);
    case 'in-out':
      return f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
  }
}

function turn(a: number, b: number, f: number): number {
  const d = ((((b - a) % 360) + 540) % 360) - 180;
  return (((a + d * f) % 360) + 360) % 360;
}

export function cameraAt(keys: NonEmptyArray<CameraKey>, s: number): CameraPose {
  let k0 = keys[0];
  let k1: CameraKey | undefined;
  for (const k of keys) {
    if (k.at <= s) k0 = k;
    else {
      k1 = k;
      break;
    }
  }
  if (!k1 || k1.arrive === 'cut' || k1.at <= k0.at) {
    return { target: k0.target, distance: k0.distance, heading: k0.heading, pitch: k0.pitch };
  }
  const f = ease(k1.arrive, clamp((s - k0.at) / (k1.at - k0.at), 0, 1));
  return {
    target: { e: lerp(k0.target.e, k1.target.e, f), n: lerp(k0.target.n, k1.target.n, f) },
    // Geometric, so a zoom from far to near moves at an even pace on screen.
    distance: Math.exp(lerp(Math.log(k0.distance), Math.log(k1.distance), f)),
    heading: turn(k0.heading, k1.heading, f),
    pitch: lerp(k0.pitch, k1.pitch, f),
  };
}

function inWindow(track: { readonly from: Seconds; readonly to: Seconds }, s: number): boolean {
  return s >= track.from && s <= track.to;
}

// Members whose place along the route is before its start have not arrived yet, and those past its
// end have gone in (through a gate, round a bend), so neither is drawn.
export function placements(track: ActorsTrack, s: number): Placement[] {
  if (!inWindow(track, s)) return [];
  const span = track.to - track.from;
  const f = span > 0 ? (s - track.from) / span : 1;
  const head = lerp(track.head.from, track.head.to, f);
  const walking = track.head.from !== track.head.to;
  const length = polylineLength(track.route.points);
  const out: Placement[] = [];
  for (let i = 0; i < track.count; i++) {
    const rank = Math.floor(i / track.abreast);
    const file = i % track.abreast;
    const jitterAlong = (hash2(i, 1, track.count) - 0.5) * 0.3 * track.spacing.rank;
    const along = head - rank * track.spacing.rank + jitterAlong;
    if (along < 0 || along > length) continue;
    const p = pointAlong(track.route.points, along);
    const side = (file - (track.abreast - 1) / 2) * track.spacing.file;
    const jitterSide = (hash2(i, 2, track.count) - 0.5) * 0.25 * track.spacing.file;
    const rad = (p.heading * Math.PI) / 180;
    // The right-hand normal of a bearing (east = +e, north = +n).
    const offset = side + jitterSide;
    const at = { e: p.at.e + Math.cos(rad) * offset, n: p.at.n - Math.sin(rad) * offset };
    const heading = !walking && track.faces ? bearing(at, track.faces) : p.heading;
    out.push({ at, heading, walking, phase: hash2(i, 3, track.count) });
  }
  return out;
}

function buildPresence(track: FeatureTrack, s: number): number {
  return smoothstep(track.from, track.to, s);
}

export function frameAt(scene: Cutscene, s: number): Frame {
  const at = clamp(s, 0, scene.duration);
  const actors: ActorGroup[] = [];
  const features = new Map<FeatureId, number>();
  let caption: CaptionTrack | undefined;
  scene.tracks.forEach((track, index) => {
    switch (track.kind) {
      case 'actors': {
        const members = placements(track, at);
        if (members.length) actors.push({ track: index, actor: track.actor, members });
        return;
      }
      case 'caption':
        if (inWindow(track, at) && at < track.to) caption = track;
        return;
      case 'feature':
        features.set(track.feature, buildPresence(track, at));
        return;
      case 'sound':
        return;
    }
  });
  return { s: at, camera: cameraAt(scene.camera, at), caption, actors, features };
}

/**
 * What the world draws while a scene plays (ADR 0042). A scene is set at its key date's year, not at
 * a blur of the slider, so a feature it does not build is drawn only if its dates contain that year:
 * nothing fades in early or lingers. Each feature the scene builds takes the scene's presence.
 */
export function sceneFeatures(
  present: readonly FeaturePresence[],
  built: ReadonlyMap<FeatureId, number>,
  year: Year,
  lookup: (id: FeatureId) => Feature | undefined,
): FeaturePresence[] {
  const out: FeaturePresence[] = [];
  for (const p of present) {
    const over = built.get(p.feature.id);
    if (over !== undefined) out.push({ feature: p.feature, presence: over });
    else if (contains(p.feature.when, year)) out.push(p);
  }
  for (const [id, presence] of built) {
    const feature = lookup(id);
    if (feature && !present.some((p) => p.feature.id === id)) out.push({ feature, presence });
  }
  return out;
}

/** Sound cues that start after `a` and at or before `b`, so each fires once as the clock passes it. */
export function cuesBetween(scene: Cutscene, a: number, b: number): SoundTrack[] {
  return scene.tracks.filter((t): t is SoundTrack => t.kind === 'sound' && t.from > a && t.from <= b);
}

export interface Clock {
  readonly s: number;
  readonly ended: boolean;
}

export const START: Clock = { s: 0, ended: false };

/** Moves a scene's clock on by `dt` seconds; it stops, ended, at the scene's duration. */
export function advance(clock: Clock, dt: number, duration: Seconds): Clock {
  if (clock.ended) return clock;
  const s = clock.s + Math.max(0, dt);
  return s >= duration ? { s: duration, ended: true } : { s, ended: false };
}

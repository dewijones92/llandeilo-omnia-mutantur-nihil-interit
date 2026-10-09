import { InputManager, Vector3, type ArcRotateCamera, type Scene } from './babylon.ts';
import { clamp } from '../domain/assert.ts';
import {
  clampToDisc,
  glide,
  isDrag,
  panShift,
  pointUnder,
  rayGround,
  slideDirection,
  wheelLog,
  zoomAbout,
  type GroundAt,
  type Ray,
  type Vec3,
} from '../domain/camera-moves.ts';
import { WORLD } from '../domain/geo.ts';
import type { Flight } from './flight.ts';

// Map-style controls (ADR 0045): left-drag slides the land, right-drag (or Ctrl+drag) turns and tilts,
// the wheel zooms at the cursor, double-click flies there, and keys slide, turn and tilt.

const MAP_RADIUS = WORLD.radiusMetres / WORLD.metresPerUnit;
// How far along a cursor ray to look for the ground, in world units (the map is about 3,200 across).
const REACH = 9000;
const MARCH_STEP = 3;
const GLIDE_TAU_MS = 160;
const ZOOM_TAU_MS = 90;
const SETTLE_TAU_MS = 300;
// A drag let go of later than this after its last move stops dead instead of gliding.
const FLING_WINDOW_MS = 80;
const MAX_ZOOM_LOG = 2;
const MAX_KEY_DT_MS = 250;
const SLIDE_PER_RADIUS = 0.9;
const MIN_SLIDE_RADIUS = 80;
const FAST = 3;
const TURN_RATE = 1.4;
const TILT_RATE = 0.8;

export type CameraMove = 'pan' | 'turn' | 'zoom';

export interface ControlHooks {
  onMove(move: CameraMove): void;
  onDoubleClick(at: Vector3, x: number, y: number): void;
}

interface Drag {
  readonly kind: 'pan' | 'turn';
  readonly id: number;
  /** What holds the pointer: the canvas, or the button over it that the press began on. */
  readonly holder: Element;
  readonly startX: number;
  readonly startY: number;
  readonly grab: Vec3;
  /** A left-drag that began on the sky has no land to hold, so it turns the view instead. */
  readonly onSky: boolean;
  /** The cursor has been pulled above the horizon mid-slide, so the land waits for it. */
  held: boolean;
  lastX: number;
  lastY: number;
  lastAt: number;
  moving: boolean;
}

const KEYS = {
  forward: ['KeyW', 'ArrowUp'],
  back: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  turnLeft: ['KeyQ'],
  turnRight: ['KeyE'],
  tiltUp: ['KeyR'],
  tiltDown: ['KeyF'],
} as const;
const CAMERA_KEYS = new Set<string>(Object.values(KEYS).flat());

export class MapControls {
  private enabled = true;
  private drag: Drag | undefined;
  private velocity = { x: 0, z: 0 };
  private zoomLog = 0;
  private zoomAt: Vec3 | undefined;
  private settling = false;
  private fast = false;
  private readonly held = new Set<string>();
  private readonly releasing = new Set<string>();

  constructor(
    private readonly camera: ArcRotateCamera,
    private readonly scene: Scene,
    private readonly canvas: HTMLCanvasElement,
    private readonly ground: GroundAt,
    private readonly flight: Flight,
    private readonly hooks: ControlHooks,
  ) {
    canvas.addEventListener('pointerdown', (e) => {
      this.down(e, canvas);
    });
    canvas.addEventListener('pointermove', (e) => {
      this.move(e);
    });
    canvas.addEventListener('pointerup', (e) => {
      this.up(e);
    });
    canvas.addEventListener('pointercancel', (e) => {
      this.up(e);
    });
    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.wheel(e);
      },
      { passive: false },
    );
    canvas.addEventListener('dblclick', (e) => {
      this.doubleClick(e);
    });
    canvas.addEventListener('keydown', (e) => {
      this.key(e, true);
    });
    canvas.addEventListener('keyup', (e) => {
      this.key(e, false);
    });
    canvas.addEventListener('blur', () => {
      this.held.clear();
      this.releasing.clear();
    });
  }

  /** A cutscene holds the camera: while off, nothing the viewer does moves it, and anything under way stops. */
  setEnabled(on: boolean, why: string): void {
    if (on === this.enabled) return;
    this.enabled = on;
    const d = this.drag;
    if (!on) {
      this.drag = undefined;
      if (d?.holder.hasPointerCapture(d.id)) d.holder.releasePointerCapture(d.id);
      this.velocity = { x: 0, z: 0 };
      this.zoomLog = 0;
      this.zoomAt = undefined;
      this.settling = false;
      this.held.clear();
      this.releasing.clear();
      const c = this.camera;
      c.inertialAlphaOffset = 0;
      c.inertialBetaOffset = 0;
      c.inertialRadiusOffset = 0;
    }
    console.info(
      `dewidebug camera controls enabled=${String(on)} why=${why} droppedDrag=${String(!on && d !== undefined)}`,
    );
  }

  /**
   * A layer of buttons over the 3D view (photo pins, place labels, speech bubbles) passes its presses
   * here. One that moves past the drag threshold slides or turns the land and its click is dropped;
   * one that does not stays the button's own click. The wheel over them zooms as it does over the land.
   */
  passThrough(layer: HTMLElement, name: string): void {
    let dragged = false;
    layer.addEventListener('pointerdown', (e) => {
      const button = e.target instanceof Element ? e.target.closest('button') : null;
      if (button) this.down(e, button);
    });
    layer.addEventListener('pointermove', (e) => {
      this.move(e);
    });
    const end = (e: PointerEvent): void => {
      if (!this.up(e)) return;
      dragged = true;
      // The click, if any, follows this pointerup before any timer runs.
      setTimeout(() => {
        dragged = false;
      }, 0);
    };
    layer.addEventListener('pointerup', end);
    layer.addEventListener('pointercancel', end);
    layer.addEventListener(
      'click',
      (e) => {
        if (!dragged) return;
        dragged = false;
        e.stopPropagation();
        e.preventDefault();
        console.info(`dewidebug camera drag began on the ${name}; its click is dropped`);
      },
      true,
    );
    layer.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    layer.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.wheel(e);
      },
      { passive: false },
    );
  }

  tick(dtMs: number): void {
    if (!this.enabled) return;
    this.keys(Math.min(dtMs, MAX_KEY_DT_MS));
    if (this.flight.flying) {
      this.velocity = { x: 0, z: 0 };
      this.zoomLog = 0;
    }
    if (this.flight.following) this.velocity = { x: 0, z: 0 };
    this.glide(dtMs);
    this.zoom(dtMs);
    this.settle(dtMs);
  }

  private at(e: MouseEvent): { x: number; y: number } {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  private ray(x: number, y: number): Ray {
    return this.scene.createPickingRay(x, y, null, this.camera);
  }

  /** The ground under a screen point, or the level of the target past the map; nothing in the sky. */
  private pointAt(x: number, y: number): { point: Vec3; on: 'ground' | 'plane' } | undefined {
    return pointUnder(this.ray(x, y), this.ground, this.camera.target.y, REACH, MARCH_STEP);
  }

  private setTarget(x: number, y: number, z: number): void {
    const p = clampToDisc({ x, z }, MAP_RADIUS);
    this.camera.target.copyFromFloats(p.x, y, p.z);
  }

  private down(e: PointerEvent, holder: Element): void {
    if (!this.enabled || this.drag) return;
    const turnButton = e.button === 2 || e.button === 1 || (e.button === 0 && e.ctrlKey);
    if (e.button !== 0 && !turnButton) return;
    const { x, y } = this.at(e);
    this.velocity = { x: 0, z: 0 };
    const under = turnButton ? undefined : this.pointAt(x, y);
    const onSky = !turnButton && under === undefined;
    const turn = turnButton || onSky;
    this.drag = {
      kind: turn ? 'turn' : 'pan',
      id: e.pointerId,
      holder,
      startX: x,
      startY: y,
      grab: under?.point ?? this.camera.target.clone(),
      onSky,
      held: false,
      lastX: x,
      lastY: y,
      lastAt: e.timeStamp,
      moving: false,
    };
    holder.setPointerCapture(e.pointerId);
  }

  private move(e: PointerEvent): void {
    const d = this.drag;
    if (d?.id !== e.pointerId) return;
    const { x, y } = this.at(e);
    if (!d.moving) {
      if (!isDrag(x - d.startX, y - d.startY, InputManager.DragMovementThreshold)) return;
      d.moving = true;
      console.info(
        `dewidebug camera drag start kind=${d.kind} button=${e.button} onSky=${String(d.onSky)} grab=${d.grab.x.toFixed(0)},${d.grab.z.toFixed(0)} flying=${String(this.flight.flying)} following=${String(this.flight.following)}`,
      );
      this.flight.interrupt(d.kind);
      this.hooks.onMove(d.kind);
    }
    if (d.kind === 'turn') {
      this.camera.inertialAlphaOffset -= (x - d.lastX) / this.camera.angularSensibilityX;
      this.camera.inertialBetaOffset -= (y - d.lastY) / this.camera.angularSensibilityY;
    } else {
      const t = this.camera.target;
      const shift = panShift(d.grab, this.ray(x, y), REACH);
      if (!shift) {
        if (!d.held)
          console.info(
            `dewidebug camera slide held: cursor ${x.toFixed(0)},${y.toFixed(0)} is above the horizon or out of reach`,
          );
        d.held = true;
        this.velocity = { x: 0, z: 0 };
        d.lastX = x;
        d.lastY = y;
        return;
      }
      if (d.held) console.info(`dewidebug camera slide resumed at ${x.toFixed(0)},${y.toFixed(0)}`);
      d.held = false;
      const before = { x: t.x, z: t.z };
      this.setTarget(t.x + shift.x, t.y, t.z + shift.z);
      const dt = e.timeStamp - d.lastAt;
      if (dt > 0) {
        const vx = (t.x - before.x) / dt;
        const vz = (t.z - before.z) / dt;
        this.velocity = { x: this.velocity.x * 0.4 + vx * 0.6, z: this.velocity.z * 0.4 + vz * 0.6 };
      }
      this.settling = true;
    }
    d.lastX = x;
    d.lastY = y;
    d.lastAt = e.timeStamp;
  }

  /** Whether the press that ended was a drag. */
  private up(e: PointerEvent): boolean {
    const d = this.drag;
    if (d?.id !== e.pointerId) return false;
    this.drag = undefined;
    if (d.holder.hasPointerCapture(e.pointerId)) d.holder.releasePointerCapture(e.pointerId);
    if (!d.moving) return false;
    const still = e.timeStamp - d.lastAt;
    if (d.kind !== 'pan' || still > FLING_WINDOW_MS) this.velocity = { x: 0, z: 0 };
    console.info(
      `dewidebug camera drag end kind=${d.kind} on=${d.holder === this.canvas ? 'canvas' : d.holder.className} target=${this.camera.target.x.toFixed(0)},${this.camera.target.z.toFixed(0)} stillFor=${still.toFixed(0)}ms glide=${Math.hypot(this.velocity.x, this.velocity.z).toFixed(3)}`,
    );
    return true;
  }

  private wheel(e: WheelEvent): void {
    if (!this.enabled) return;
    const log = wheelLog(e.deltaY, e.deltaMode);
    if (log === 0) return;
    const { x, y } = this.at(e);
    const under = this.pointAt(x, y);
    const point = under?.point ?? this.camera.target;
    if (this.zoomLog === 0)
      console.info(
        `dewidebug camera zoom ${log < 0 ? 'in' : 'out'} at=${point.x.toFixed(0)},${point.z.toFixed(0)} on=${under?.on ?? 'sky, so the centre'} r=${this.camera.radius.toFixed(0)} following=${String(this.flight.following)}`,
      );
    this.zoomAt = under?.point;
    this.zoomLog = clamp(this.zoomLog + log, -MAX_ZOOM_LOG, MAX_ZOOM_LOG);
    this.flight.interrupt('zoom');
    this.hooks.onMove('zoom');
  }

  private doubleClick(e: MouseEvent): void {
    if (!this.enabled || e.button !== 0) return;
    const { x, y } = this.at(e);
    const hit = rayGround(this.ray(x, y), this.ground, REACH, MARCH_STEP);
    if (!hit) {
      console.info(`dewidebug camera double-click at ${x.toFixed(0)},${y.toFixed(0)} missed the ground`);
      return;
    }
    console.info(`dewidebug camera double-click ground=${hit.x.toFixed(0)},${hit.z.toFixed(0)}`);
    this.hooks.onDoubleClick(new Vector3(hit.x, hit.y, hit.z), x, y);
  }

  private key(e: KeyboardEvent, down: boolean): void {
    this.fast = e.shiftKey;
    if (!CAMERA_KEYS.has(e.code)) return;
    if (!this.enabled) {
      if (down) console.info(`dewidebug camera key ${e.code} ignored: controls off`);
      return;
    }
    if (down) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      e.preventDefault();
      if (!this.held.has(e.code))
        console.info(`dewidebug camera key down ${e.code} fast=${String(this.fast)}`);
      this.held.add(e.code);
      this.releasing.delete(e.code);
    } else if (this.held.has(e.code)) {
      // Let go before the next frame still moves for that frame, so a quick tap is never lost.
      this.releasing.add(e.code);
    }
  }

  private axis(plus: readonly string[], minus: readonly string[]): number {
    const on = (codes: readonly string[]): number => (codes.some((c) => this.held.has(c)) ? 1 : 0);
    return on(plus) - on(minus);
  }

  private keys(dtMs: number): void {
    if (this.held.size === 0) return;
    const s = dtMs / 1000;
    const c = this.camera;
    const forward = this.axis(KEYS.forward, KEYS.back);
    const right = this.axis(KEYS.right, KEYS.left);
    const turn = this.axis(KEYS.turnLeft, KEYS.turnRight);
    const tilt = this.axis(KEYS.tiltUp, KEYS.tiltDown);
    if (forward !== 0 || right !== 0) {
      const dir = slideDirection(c.alpha, forward, right);
      const step = Math.max(c.radius, MIN_SLIDE_RADIUS) * SLIDE_PER_RADIUS * (this.fast ? FAST : 1) * s;
      this.flight.interrupt('pan');
      this.setTarget(c.target.x + dir.x * step, c.target.y, c.target.z + dir.z * step);
      this.settling = true;
      this.hooks.onMove('pan');
    }
    if (turn !== 0) {
      this.flight.interrupt('turn');
      c.alpha += turn * TURN_RATE * s;
      this.hooks.onMove('turn');
    }
    if (tilt !== 0) {
      this.flight.interrupt('turn');
      c.beta = clamp(c.beta + tilt * TILT_RATE * s, c.lowerBetaLimit ?? 0, c.upperBetaLimit ?? Math.PI);
      this.hooks.onMove('turn');
    }
    for (const code of this.releasing) this.held.delete(code);
    this.releasing.clear();
  }

  private glide(dtMs: number): void {
    const v = this.velocity;
    if ((v.x === 0 && v.z === 0) || this.drag?.moving) return;
    const gx = glide(v.x, dtMs, GLIDE_TAU_MS);
    const gz = glide(v.z, dtMs, GLIDE_TAU_MS);
    const t = this.camera.target;
    this.setTarget(t.x + gx.moved, t.y, t.z + gz.moved);
    this.velocity =
      Math.hypot(gx.velocity, gz.velocity) < 1e-4 ? { x: 0, z: 0 } : { x: gx.velocity, z: gz.velocity };
  }

  private zoom(dtMs: number): void {
    if (this.zoomLog === 0) return;
    const c = this.camera;
    let step = this.zoomLog * (1 - Math.exp(-dtMs / ZOOM_TAU_MS));
    if (Math.abs(this.zoomLog - step) < 1e-3) step = this.zoomLog;
    this.zoomLog -= step;
    const radius = clamp(c.radius * Math.exp(step), c.lowerRadiusLimit ?? 0, c.upperRadiusLimit ?? Infinity);
    const k = radius / c.radius;
    if (k === 1) {
      this.zoomLog = 0;
      console.info(`dewidebug camera zoom stopped at the radius limit r=${radius.toFixed(0)}`);
      return;
    }
    c.radius = radius;
    if (this.flight.following) {
      this.flight.scaleFollow(k);
      return;
    }
    const next = zoomAbout(c.target, this.zoomAt ?? c.target, k);
    this.setTarget(next.x, next.y, next.z);
    this.settling = true;
  }

  /** After a move, the target eases down (or up) onto the ground, so the camera turns about the land. */
  private settle(dtMs: number): void {
    if (!this.settling || this.drag?.moving || this.flight.flying || this.flight.following) return;
    const t = this.camera.target;
    const diff = this.ground(t.x, t.z) - t.y;
    if (Math.abs(diff) < 0.05) {
      this.settling = false;
      return;
    }
    t.y += diff * (1 - Math.exp(-dtMs / SETTLE_TAU_MS));
  }
}

import {
  Color4,
  Constants,
  DynamicTexture,
  Layer,
  Vector3,
  type ArcRotateCamera,
  type Scene,
} from './babylon.ts';
import { smoothstep } from '../domain/assert.ts';
import { mix, toHex, type Rgb } from '../domain/colour.ts';
import type { Lighting } from '../domain/daylight.ts';
import { rng } from '../domain/noise.ts';

const GRADIENT_W = 64;
const GRADIENT_H = 128;
const STARS_W = 1024;
const STARS_H = 512;
const GREY: Rgb = { r: 0.82, g: 0.84, b: 0.86 };
const MOON: Rgb = { r: 0.85, g: 0.9, b: 1 };
const CORE = 0.035;
const AUREOLE = 0.25;

interface View {
  readonly forward: Vector3;
  readonly right: Vector3;
  readonly up: Vector3;
  readonly tanX: number;
  readonly tanY: number;
  readonly azimuth: number;
}

export class Sky {
  private readonly gradient: DynamicTexture;
  private readonly stars: Layer;
  private readonly starTexture: DynamicTexture;
  private readonly pixels: ImageData;
  private light: Lighting | undefined;
  private last = '';

  constructor(
    private readonly scene: Scene,
    private readonly camera: ArcRotateCamera,
  ) {
    this.gradient = new DynamicTexture(
      'sky-gradient',
      { width: GRADIENT_W, height: GRADIENT_H },
      scene,
      false,
    );
    this.gradient.wrapU = DynamicTexture.CLAMP_ADDRESSMODE;
    this.gradient.wrapV = DynamicTexture.CLAMP_ADDRESSMODE;
    const layer = new Layer('sky', null, scene, true);
    layer.texture = this.gradient;
    this.pixels = this.gradient.getContext().getImageData(0, 0, GRADIENT_W, GRADIENT_H);
    scene.onBeforeCameraRenderObservable.add(() => {
      this.update();
    });

    this.starTexture = new DynamicTexture('sky-stars', { width: STARS_W, height: STARS_H }, scene, true);
    this.starTexture.hasAlpha = true;
    this.starTexture.wrapU = DynamicTexture.WRAP_ADDRESSMODE;
    this.starTexture.wrapV = DynamicTexture.CLAMP_ADDRESSMODE;
    drawStars(this.starTexture);
    this.stars = new Layer('stars', null, scene, true, new Color4(1, 1, 1, 0));
    this.stars.texture = this.starTexture;
    this.stars.alphaBlendingMode = Constants.ALPHA_ADD;
    this.stars.isEnabled = false;
  }

  apply(light: Lighting): void {
    this.light = light;
  }

  update(): void {
    const light = this.light;
    if (!light) return;
    const view = this.view();
    const f = view.forward;
    const body = light.moon ? light.direction : light.sun;
    const key = `${toHex(light.skyTop)}${toHex(light.skyHorizon)}${toHex(light.glow)}${toHex(light.light)}${light.glowStrength.toFixed(2)}${light.night.toFixed(2)}|${Math.round(f.x * 120)},${Math.round(f.y * 120)},${Math.round(f.z * 120)}|${Math.round(view.tanX * 100)}|${Math.round(body.x * 120)},${Math.round(body.y * 120)},${Math.round(body.z * 120)}`;
    if (key !== this.last) {
      this.last = key;
      this.paint(light, view);
    }
    this.stars.isEnabled = light.stars > 0.01;
    if (this.stars.isEnabled) {
      this.stars.color.a = light.stars * 0.95;
      const tiles = Math.max(1, Math.round(Math.PI / Math.atan(view.tanX)));
      this.starTexture.uOffset = (view.azimuth / (Math.PI * 2)) * tiles;
      this.starTexture.vOffset = (this.camera.beta - 1) * 0.25;
    }
  }

  private view(): View {
    const forward = this.camera.target.subtract(this.camera.position).normalize();
    const right = Vector3.Cross(Vector3.Up(), forward).normalize();
    const up = Vector3.Cross(forward, right);
    const tanY = Math.tan(this.camera.fov / 2);
    return {
      forward,
      right,
      up,
      tanX: tanY * this.scene.getEngine().getAspectRatio(this.camera),
      tanY,
      azimuth: Math.atan2(forward.x, forward.z),
    };
  }

  private paint(light: Lighting, view: View): void {
    const img = this.pixels;
    const sunAz = Math.atan2(light.sun.x, light.sun.z);
    const low = mix(light.skyHorizon, GREY, 0.5);
    const mid = mix(light.skyTop, light.skyHorizon, 0.75);
    const body = light.moon ? light.direction : light.sun;
    const halo = light.moon ? MOON : mix(light.light, { r: 1, g: 1, b: 1 }, 0.35);
    const seen = light.moon ? light.night : smoothstep(-0.03, 0.05, body.y);
    const core = (light.moon ? 0.5 : 0.9) * seen;
    const aureole = (light.moon ? 0.1 : 0.3) * seen;
    const { forward: f, right: r, up: u } = view;
    for (let row = 0; row < GRADIENT_H; row++) {
      const up = row / (GRADIENT_H - 1);
      const base =
        up < 0.2
          ? mix(low, light.skyHorizon, up / 0.2)
          : up < 0.45
            ? mix(light.skyHorizon, mid, (up - 0.2) / 0.25)
            : mix(mid, light.skyTop, (up - 0.45) / 0.55);
      const band = Math.exp(-((up - 0.24) ** 2) / (2 * 0.16 ** 2));
      const ny = (up * 2 - 1) * view.tanY;
      for (let col = 0; col < GRADIENT_W; col++) {
        const nx = ((col / (GRADIENT_W - 1)) * 2 - 1) * view.tanX;
        const rx = f.x + nx * r.x + ny * u.x;
        const ry = f.y + nx * r.y + ny * u.y;
        const rz = f.z + nx * r.z + ny * u.z;
        const len = Math.hypot(rx, ry, rz) || 1;
        const cos = (rx * body.x + ry * body.y + rz * body.z) / len;
        const angle = Math.acos(Math.min(1, Math.max(-1, cos)));
        const az = Math.atan2(rx, rz);
        const d = Math.atan2(Math.sin(az - sunAz), Math.cos(az - sunAz));
        const g = Math.min(
          0.85,
          light.glowStrength * band * (0.25 + 0.75 * Math.exp(-(d * d) / (2 * 0.55 ** 2))),
        );
        const h =
          core * Math.exp(-(angle * angle) / (2 * CORE * CORE)) +
          aureole * Math.exp(-(angle * angle) / (2 * AUREOLE * AUREOLE));
        const o = (row * GRADIENT_W + col) * 4;
        img.data[o] = channel(base.r + (light.glow.r - base.r) * g + halo.r * h);
        img.data[o + 1] = channel(base.g + (light.glow.g - base.g) * g + halo.g * h);
        img.data[o + 2] = channel(base.b + (light.glow.b - base.b) * g + halo.b * h);
        img.data[o + 3] = 255;
      }
    }
    this.gradient.getContext().putImageData(img, 0, 0);
    this.gradient.update(false);
  }
}

function channel(v: number): number {
  return Math.round(Math.min(1, Math.max(0, v)) * 255);
}

function drawStars(texture: DynamicTexture): void {
  const ctx = texture.getContext();
  ctx.clearRect(0, 0, STARS_W, STARS_H);
  const random = rng(1843);
  for (let i = 0; i < 900; i++) {
    const x = random() * STARS_W;
    const up = Math.pow(random(), 0.7);
    const y = STARS_H * (1 - up);
    const fade = smoothstep(0.25, 0.7, up);
    const bright = Math.pow(random(), 3);
    const alpha = (0.25 + bright * 0.75) * fade;
    if (alpha < 0.03) continue;
    const r = 0.6 + bright * 1.1;
    ctx.fillStyle = `rgba(255,${Math.round(244 + random() * 11)},${Math.round(225 + random() * 30)},${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  texture.update(true);
}

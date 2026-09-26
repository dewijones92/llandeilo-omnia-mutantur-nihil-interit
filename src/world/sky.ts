import { DynamicTexture, Layer, type Scene } from './babylon.ts';
import { toHex, mix, type Rgb } from '../domain/colour.ts';

export class Sky {
  private readonly texture: DynamicTexture;
  private last = '';

  constructor(scene: Scene) {
    this.texture = new DynamicTexture('sky-gradient', { width: 8, height: 256 }, scene, false);
    const layer = new Layer('sky', null, scene, true);
    layer.texture = this.texture;
  }

  apply(top: Rgb, horizon: Rgb): void {
    const key = `${toHex(top)}${toHex(horizon)}`;
    if (key === this.last) return;
    this.last = key;
    const ctx = this.texture.getContext();
    const g = ctx.createLinearGradient(0, 256, 0, 0);
    g.addColorStop(0, toHex(top));
    g.addColorStop(0.55, toHex(mix(top, horizon, 0.75)));
    g.addColorStop(0.8, toHex(horizon));
    g.addColorStop(1, toHex(mix(horizon, { r: 0.82, g: 0.84, b: 0.86 }, 0.5)));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 256);
    this.texture.update(false);
  }
}

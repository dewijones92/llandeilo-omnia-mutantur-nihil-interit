import { Engine, WebGPUEngine, type AbstractEngine } from './babylon.ts';

export type Backend = 'webgpu' | 'webgl2';

export interface CreatedEngine {
  readonly engine: AbstractEngine;
  readonly backend: Backend;
  // The adapter the engine got, as the browser names it (vendor and architecture or renderer).
  readonly gpu: string;
}

const describe = (info: { vendor: string; renderer: string }): string => `${info.vendor} ${info.renderer}`;

export async function createEngine(canvas: HTMLCanvasElement, forceWebGL: boolean): Promise<CreatedEngine> {
  if (!forceWebGL && (await WebGPUEngine.IsSupportedAsync)) {
    try {
      const engine = new WebGPUEngine(canvas, { antialias: true, stencil: true, adaptToDeviceRatio: true });
      await engine.initAsync();
      const gpu = describe(engine.getInfo());
      console.info(`dewidebug engine backend=webgpu gpu=${gpu}`);
      return { engine, backend: 'webgpu', gpu };
    } catch (err) {
      console.warn('dewidebug engine webgpu init failed, falling back to webgl2', err);
    }
  } else {
    console.info(`dewidebug engine webgpu skipped forceWebGL=${forceWebGL}`);
  }
  const engine = new Engine(canvas, true, { stencil: true }, true);
  const gpu = describe(engine.getInfo());
  console.info(`dewidebug engine backend=webgl2 version=${engine.webGLVersion} gpu=${gpu}`);
  return { engine, backend: 'webgl2', gpu };
}

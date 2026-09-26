import { Engine, WebGPUEngine, type AbstractEngine } from '@babylonjs/core';

export type Backend = 'webgpu' | 'webgl2';

export interface CreatedEngine {
  readonly engine: AbstractEngine;
  readonly backend: Backend;
}

export async function createEngine(canvas: HTMLCanvasElement, forceWebGL: boolean): Promise<CreatedEngine> {
  if (!forceWebGL && (await WebGPUEngine.IsSupportedAsync)) {
    try {
      const engine = new WebGPUEngine(canvas, { antialias: true, stencil: true, adaptToDeviceRatio: true });
      await engine.initAsync();
      console.info('dewidebug engine backend=webgpu');
      return { engine, backend: 'webgpu' };
    } catch (err) {
      console.warn('dewidebug engine webgpu init failed, falling back to webgl2', err);
    }
  } else {
    console.info(`dewidebug engine webgpu skipped forceWebGL=${forceWebGL}`);
  }
  const engine = new Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true }, true);
  console.info(`dewidebug engine backend=webgl2 version=${engine.webGLVersion}`);
  return { engine, backend: 'webgl2' };
}

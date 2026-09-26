import {
  ArcRotateCamera,
  Color3,
  Color4,
  DefaultRenderingPipeline,
  DirectionalLight,
  HemisphericLight,
  ImageProcessingConfiguration,
  Scene,
  ShadowGenerator,
  Vector2,
  Vector3,
  type AbstractEngine,
  type Mesh,
} from '@babylonjs/core';
import type { Rgb } from '../domain/colour.ts';
import type { Heightfield } from '../domain/heightfield.ts';
import type { Environment } from '../domain/state.ts';
import type { RiverLine } from '../platform/assets.ts';
import { Sky } from './sky.ts';
import { Terrain } from './terrain.ts';
import { Forest } from './trees.ts';
import { buildRivers } from './water.ts';

function c3(c: Rgb): Color3 {
  return new Color3(c.r, c.g, c.b);
}

export class World {
  readonly scene: Scene;
  readonly camera: ArcRotateCamera;
  readonly terrain: Terrain;
  readonly shadows: ShadowGenerator;
  private readonly sun: DirectionalLight;
  private readonly hemi: HemisphericLight;
  private readonly sky: Sky;
  private readonly forest: Forest;
  readonly pipeline: DefaultRenderingPipeline;

  constructor(
    engine: AbstractEngine,
    heightfield: Heightfield,
    rivers: readonly RiverLine[],
    woodland: Uint8Array,
  ) {
    const scene = new Scene(engine);
    this.scene = scene;
    scene.clearColor = new Color4(0.93, 0.95, 0.97, 1);
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.00009;
    scene.fogColor = new Color3(0.86, 0.9, 0.94);

    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2 - 0.35,
      0.96,
      3500,
      new Vector3(0, 30, 0),
      scene,
    );
    camera.targetScreenOffset = new Vector2(0, 160);
    camera.lowerRadiusLimit = 90;
    camera.upperRadiusLimit = 5200;
    camera.lowerBetaLimit = 0.15;
    camera.upperBetaLimit = 1.38;
    camera.wheelDeltaPercentage = 0.02;
    camera.pinchDeltaPercentage = 0.004;
    camera.panningSensibility = 6;
    camera.inertia = 0.88;
    camera.minZ = 2;
    camera.maxZ = 30000;
    camera.attachControl(true);
    this.camera = camera;

    this.hemi = new HemisphericLight('hemi', new Vector3(0.2, 1, 0.1), scene);
    this.hemi.intensity = 0.5;
    this.hemi.groundColor = new Color3(0.42, 0.4, 0.36);

    this.sun = new DirectionalLight('sun', new Vector3(0.62, -0.42, 0.46).normalize(), scene);
    this.sun.position = new Vector3(-3100, 2100, -2300);
    this.sun.intensity = 1.75;
    this.sun.shadowMinZ = 10;
    this.sun.shadowMaxZ = 9000;

    this.shadows = new ShadowGenerator(4096, this.sun);
    this.shadows.usePercentageCloserFiltering = true;
    this.shadows.filteringQuality = ShadowGenerator.QUALITY_MEDIUM;
    this.shadows.bias = 0.0008;
    this.shadows.normalBias = 0.6;
    this.shadows.darkness = 0.28;

    this.sky = new Sky(scene);
    this.terrain = new Terrain(scene, heightfield, rivers, woodland);
    this.shadows.addShadowCaster(this.terrain.mesh);
    const water = buildRivers(scene, this.terrain.rivers);
    water.receiveShadows = true;
    this.forest = new Forest(scene, this.terrain);
    for (const m of this.forest.meshes) this.shadows.addShadowCaster(m);

    const pipeline = new DefaultRenderingPipeline('post', true, scene, [camera]);
    pipeline.samples = 4;
    pipeline.fxaaEnabled = false;
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.82;
    pipeline.bloomWeight = 0.18;
    pipeline.bloomKernel = 48;
    pipeline.imageProcessingEnabled = true;
    pipeline.imageProcessing.toneMappingEnabled = true;
    pipeline.imageProcessing.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_KHR_PBR_NEUTRAL;
    pipeline.imageProcessing.exposure = 1.0;
    pipeline.imageProcessing.contrast = 1.08;
    pipeline.imageProcessing.vignetteEnabled = true;
    pipeline.imageProcessing.vignetteWeight = 1.1;
    pipeline.imageProcessing.vignetteColor = new Color4(0.15, 0.13, 0.12, 0);
    pipeline.sharpenEnabled = true;
    pipeline.sharpen.edgeAmount = 0.18;
    this.pipeline = pipeline;
  }

  addCaster(mesh: Mesh): void {
    this.shadows.addShadowCaster(mesh);
  }

  applyEnvironment(env: Environment): void {
    if (this.terrain.applyEnvironment(env)) this.forest.update();
    this.sky.apply(env.skyTop, env.skyHorizon);
    const horizon = c3(env.skyHorizon);
    this.scene.fogColor = horizon;
    this.scene.fogDensity = 0.00004 + env.fog * 0.00016;
    this.scene.clearColor = new Color4(horizon.r, horizon.g, horizon.b, 1);
    this.sun.diffuse = c3(env.sun);
    this.hemi.diffuse = c3(env.skyTop)
      .scale(0.55)
      .add(new Color3(0.45, 0.45, 0.45));
  }
}

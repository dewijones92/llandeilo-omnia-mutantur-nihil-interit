import {
  ArcRotateCamera,
  Color3,
  Color4,
  ColorCurves,
  DefaultRenderingPipeline,
  DepthOfFieldEffectBlurLevel,
  DirectionalLight,
  HemisphericLight,
  ImageProcessingConfiguration,
  Scene,
  ShadowGenerator,
  StandardMaterial,
  Vector3,
  type AbstractEngine,
  type Material,
  type Mesh,
} from './babylon.ts';
import { lerp } from '../domain/assert.ts';
import type { Direction, Lighting, SeasonLook } from '../domain/daylight.ts';
import type { Heightfield } from '../domain/heightfield.ts';
import type { Environment } from '../domain/state.ts';
import type { RiverLine } from '../platform/assets.ts';
import { Sky } from './sky.ts';
import { Terrain, type Clearing } from './terrain.ts';
import { Forest } from './trees.ts';
import { Water } from './water.ts';

const SHADOW_INTERVAL_MS = 90;
const TILT_SHIFT = 0.026;

export class World {
  readonly scene: Scene;
  readonly camera: ArcRotateCamera;
  readonly terrain: Terrain;
  readonly shadows: ShadowGenerator;
  private readonly sun: DirectionalLight;
  private readonly hemi: HemisphericLight;
  private readonly sky: Sky;
  private readonly forest: Forest;
  private readonly water: Water;
  private readonly curves = new ColorCurves();
  private readonly lamps = new Set<Material>();
  private readonly baseEmissive = new WeakMap<StandardMaterial, Color3>();
  private lightKey = '';
  private pendingDirection: Direction | undefined;
  private shadowDue = false;
  private shadowAt = 0;
  readonly pipeline: DefaultRenderingPipeline;

  constructor(
    engine: AbstractEngine,
    heightfield: Heightfield,
    rivers: readonly RiverLine[],
    woodland: Uint8Array,
    private readonly effects: boolean,
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
      new Vector3(-150, 30, -420),
      scene,
    );
    camera.lowerRadiusLimit = 25;
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
    this.hemi.intensity = 0.42;
    this.hemi.groundColor = new Color3(0.42, 0.4, 0.36);

    this.sun = new DirectionalLight('sun', new Vector3(0.62, -0.42, 0.46).normalize(), scene);
    this.sun.position = new Vector3(-3100, 2100, -2300);
    this.sun.intensity = 1.95;
    this.sun.shadowMinZ = 10;
    this.sun.shadowMaxZ = 9000;

    this.shadows = new ShadowGenerator(4096, this.sun);
    this.shadows.usePercentageCloserFiltering = true;
    this.shadows.filteringQuality = ShadowGenerator.QUALITY_MEDIUM;
    this.shadows.bias = 0.0008;
    this.shadows.normalBias = 0.6;
    this.shadows.darkness = 0.28;
    const shadowMap = this.shadows.getShadowMap();
    if (shadowMap) shadowMap.refreshRate = 0;

    this.sky = new Sky(scene, camera);
    this.terrain = new Terrain(scene, heightfield, rivers, woodland);
    this.shadows.addShadowCaster(this.terrain.mesh);
    this.water = new Water(scene, this.terrain.rivers);
    this.lamps.add(this.water.material);
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
    pipeline.depthOfFieldEnabled = effects;
    pipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Medium;
    pipeline.depthOfField.lensSize = 50;
    pipeline.depthOfField.fStop = 1.4;
    console.info(`dewidebug world effects=${effects ? 'full' : 'low'}`);
    pipeline.imageProcessing.colorCurvesEnabled = true;
    pipeline.imageProcessing.colorCurves = this.curves;
    this.pipeline = pipeline;
  }

  addLamp(material: Material): void {
    this.lamps.add(material);
  }

  addCaster(mesh: Mesh): void {
    this.shadows.addShadowCaster(mesh);
    this.refreshShadows();
  }

  refreshShadows(): void {
    this.shadows.getShadowMap()?.resetRefreshCounter();
  }

  applyEnvironment(env: Environment, look: SeasonLook, clearings: readonly Clearing[]): void {
    if (this.terrain.applyEnvironment(env, look, clearings)) {
      this.forest.update(look);
      this.refreshShadows();
    }
  }

  applyLighting(l: Lighting): void {
    const d = l.direction;
    const key = `${Math.round(d.x * 400)},${Math.round(d.y * 400)},${Math.round(d.z * 400)}`;
    if (key !== this.lightKey) {
      this.lightKey = key;
      this.pendingDirection = d;
      this.shadowDue = true;
    }
    this.sun.diffuse.set(l.light.r, l.light.g, l.light.b);
    this.sun.specular.set(l.light.r, l.light.g, l.light.b);
    this.sun.intensity = l.lightIntensity;
    this.hemi.diffuse.set(l.ambient.r, l.ambient.g, l.ambient.b);
    this.hemi.groundColor.set(l.ambientGround.r, l.ambientGround.g, l.ambientGround.b);
    this.hemi.intensity = l.ambientIntensity;
    this.shadows.darkness = l.shadowDarkness;
    this.scene.fogColor.set(l.fog.r, l.fog.g, l.fog.b);
    this.scene.fogDensity = l.fogDensity;
    this.scene.clearColor.set(l.fog.r, l.fog.g, l.fog.b, 1);
    this.sky.apply(l);
    this.water.reflect(l.skyTop, l.skyHorizon, l.selfLit);
    this.dimSelfLit(l.selfLit);
    const ip = this.pipeline.imageProcessing;
    ip.exposure = l.exposure;
    this.pipeline.depthOfField.fStop = lerp(1.4, 9, l.stars);
    this.pipeline.bloomThreshold = lerp(0.82, 0.55, l.night);
    this.pipeline.bloomWeight = lerp(0.18, 0.4, l.night);
    const warm = Math.max(0, l.warmth);
    const cool = Math.max(0, -l.warmth);
    this.curves.globalSaturation = lerp(6, -30, cool);
    this.curves.highlightsHue = 36;
    this.curves.highlightsDensity = warm * 40;
    this.curves.shadowsHue = 222;
    this.curves.shadowsDensity = 10 + cool * 45 + warm * 12;
  }

  tick(dt: number): void {
    this.water.tick(dt);
    const now = performance.now();
    const d = this.pendingDirection;
    if (this.shadowDue && d && now - this.shadowAt > SHADOW_INTERVAL_MS) {
      this.shadowDue = false;
      this.shadowAt = now;
      this.sun.direction.set(-d.x, -d.y, -d.z);
      this.sun.position.set(d.x * 4500, d.y * 4500, d.z * 4500);
      this.refreshShadows();
    }
    if (this.effects) {
      const focus = Math.max(40, this.camera.radius) * 1000;
      this.pipeline.depthOfField.focusDistance = focus;
      this.pipeline.depthOfField.focalLength = focus * TILT_SHIFT;
    }
  }

  private dimSelfLit(level: number): void {
    for (const m of this.scene.materials) {
      if (!(m instanceof StandardMaterial) || this.lamps.has(m)) continue;
      let base = this.baseEmissive.get(m);
      if (!base) {
        base = m.emissiveColor.clone();
        this.baseEmissive.set(m, base);
      }
      base.scaleToRef(level, m.emissiveColor);
    }
  }
}

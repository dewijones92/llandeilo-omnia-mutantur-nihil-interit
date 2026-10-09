import {
  Color3,
  Constants,
  DynamicTexture,
  Matrix,
  MaterialPluginBase,
  Mesh,
  ShaderLanguage,
  StandardMaterial,
  VertexData,
  type AbstractEngine,
  type Scene,
  type SubMesh,
  type UniformBuffer,
} from './babylon.ts';
import type { Rgb } from '../domain/colour.ts';
import { unitsPerPixel, type HaloKind, type HaloSpec } from '../domain/halo.ts';

/** A halo's centre and its own brightness (0..1), so lit houses are not all alike. */
export interface HaloPoint {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly weight: number;
}

/**
 * Soft additive glows that face the camera and never shrink below a few pixels, so lit windows, street
 * lamps and hearths read from the overview (ADR 0040). One class for every kind of night light: the
 * owners (houses, street lamps, firelight) give it points and a level, nothing here knows the era.
 * The facing and sizing happen in the vertex shader, so moving the camera costs no CPU work.
 */
export class Halos {
  readonly material: StandardMaterial;
  private readonly mesh: Mesh;
  private readonly glow: DynamicTexture;
  private points: readonly HaloPoint[] = [];
  private colour: Rgb = { r: 0, g: 0, b: 0 };
  private level = 0;
  private shown = false;

  constructor(
    scene: Scene,
    private readonly kind: HaloKind,
    private readonly spec: HaloSpec,
  ) {
    this.material = new StandardMaterial(`halo-${kind}-mat`, scene);
    this.material.disableLighting = true;
    this.material.diffuseColor = Color3.Black();
    this.material.specularColor = Color3.Black();
    // Babylon adds an emissive texture to the emissive colour, so the colour stays black (or every
    // quad would be a flat square) and the tint rides on the per-halo colour instead.
    this.material.emissiveColor = Color3.Black();
    this.glow = glowTexture(scene, kind);
    this.material.emissiveTexture = this.glow;
    this.material.alpha = 0.99;
    this.material.alphaMode = Constants.ALPHA_ADD;
    this.material.disableDepthWrite = true;
    this.material.backFaceCulling = false;
    // Additive light must not be tinted towards the fog colour; the dark night fog would grey it.
    this.material.fogEnabled = false;
    new FacingHalo(this.material, spec);
    this.mesh = quad(scene, `halos-${kind}`);
    this.mesh.material = this.material;
    this.mesh.isPickable = false;
    this.mesh.isVisible = false;
    // The quads are moved in the shader, so their bounds on the CPU mean nothing: never cull them.
    this.mesh.alwaysSelectAsActiveMesh = true;
    this.mesh.doNotSyncBoundingInfo = true;
    this.mesh.thinInstanceCount = 0;
  }

  setPoints(points: readonly HaloPoint[]): void {
    this.points = points;
    const matrices = new Float32Array(Math.max(1, points.length) * 16);
    const at = new Matrix();
    points.forEach((p, i) => {
      Matrix.TranslationToRef(p.x, p.y, p.z, at);
      at.copyToArray(matrices, i * 16);
    });
    this.mesh.thinInstanceSetBuffer('matrix', matrices, 16, true);
    this.mesh.thinInstanceCount = points.length;
    this.tint();
    console.info(`dewidebug halos ${this.kind} points=${String(points.length)}`);
    this.show();
  }

  /** `level` is the light's own level from lampsAt (0 dark, about 1 fully lit). */
  setLight(colour: Rgb, level: number): void {
    this.glow.level = level * this.spec.strength;
    const c = this.colour;
    if (colour.r !== c.r || colour.g !== c.g || colour.b !== c.b) {
      this.colour = colour;
      this.tint();
    }
    this.level = level;
    this.show();
  }

  private show(): void {
    const shown = this.level > 0.02 && this.points.length > 0;
    if (shown !== this.shown) {
      this.shown = shown;
      console.info(
        `dewidebug halos ${this.kind} ${shown ? 'on' : 'off'} level=${this.level.toFixed(2)} points=${String(this.points.length)}`,
      );
    }
    this.mesh.isVisible = shown;
  }

  private tint(): void {
    const { r, g, b } = this.colour;
    const colours = new Float32Array(Math.max(1, this.points.length) * 4);
    this.points.forEach((p, i) => {
      colours.set([r * p.weight, g * p.weight, b * p.weight, 1], i * 4);
    });
    this.mesh.thinInstanceSetBuffer('color', colours, 4, true);
  }
}

// Turns each quad to face the camera and sizes it as `haloSize` in src/domain/halo.ts does:
// max(worldSize, minPixels * world units per pixel at its distance). The formula is written twice
// (here for the GPU, there for the tests) on purpose; the per-pixel factor comes from the domain.
class FacingHalo extends MaterialPluginBase {
  constructor(
    material: StandardMaterial,
    private readonly spec: HaloSpec,
  ) {
    super(material, 'FacingHalo', 200);
    // hardBindForSubMesh, which sets the per-frame uniform, only runs for plugins that ask for it.
    this.registerForExtraEvents = true;
    this._enable(true);
  }

  override getClassName(): string {
    return 'FacingHalo';
  }

  // Both GLSL (WebGL2) and WGSL (WebGPU) code is given below.
  override isCompatible(): boolean {
    return true;
  }

  override getUniforms(): { externalUniforms: string[] } {
    return { externalUniforms: ['haloSpec'] };
  }

  override hardBindForSubMesh(
    _ubo: UniformBuffer,
    scene: Scene,
    engine: AbstractEngine,
    subMesh: SubMesh,
  ): void {
    const camera = scene.activeCamera;
    const effect = subMesh.effect;
    if (!camera || !effect) return;
    const height = engine.getRenderHeight() * engine.getHardwareScalingLevel();
    effect.setFloat4(
      'haloSpec',
      this.spec.worldSize,
      this.spec.minPixels,
      unitsPerPixel(1, camera.fov, height),
      0,
    );
  }

  override getCustomCode(shaderType: string, language: ShaderLanguage): Record<string, string> | null {
    if (shaderType !== 'vertex') return null;
    // Pulled half its size towards the eye, so the lower half is not buried in the ground or a wall.
    if (language === ShaderLanguage.WGSL)
      return {
        CUSTOM_VERTEX_DEFINITIONS: 'uniform haloSpec: vec4f;',
        CUSTOM_VERTEX_UPDATE_WORLDPOS: `
{
  let haloCentre = (finalWorld * vec4f(0.0, 0.0, 0.0, 1.0)).xyz;
  let haloRight = vec3f(scene.view[0][0], scene.view[1][0], scene.view[2][0]);
  let haloUp = vec3f(scene.view[0][1], scene.view[1][1], scene.view[2][1]);
  let haloToEye = scene.vEyePosition.xyz - haloCentre;
  let haloDistance = max(length(haloToEye), 0.001);
  let haloSize = max(uniforms.haloSpec.x, uniforms.haloSpec.y * haloDistance * uniforms.haloSpec.z);
  worldPos = vec4f(haloCentre + (haloRight * positionUpdated.x + haloUp * positionUpdated.y) * haloSize + haloToEye / haloDistance * haloSize * 0.5, 1.0);
}`,
      };
    return {
      CUSTOM_VERTEX_DEFINITIONS: 'uniform vec4 haloSpec;',
      CUSTOM_VERTEX_UPDATE_WORLDPOS: `
{
  vec3 haloCentre = (finalWorld * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 haloRight = vec3(view[0][0], view[1][0], view[2][0]);
  vec3 haloUp = vec3(view[0][1], view[1][1], view[2][1]);
  vec3 haloToEye = vEyePosition.xyz - haloCentre;
  float haloDistance = max(length(haloToEye), 0.001);
  float haloSize = max(haloSpec.x, haloSpec.y * haloDistance * haloSpec.z);
  worldPos = vec4(haloCentre + (haloRight * positionUpdated.x + haloUp * positionUpdated.y) * haloSize + haloToEye / haloDistance * haloSize * 0.5, 1.0);
}`,
    };
  }
}

function quad(scene: Scene, name: string): Mesh {
  const mesh = new Mesh(name, scene);
  const data = new VertexData();
  data.positions = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0];
  data.uvs = [0, 0, 1, 0, 1, 1, 0, 1];
  data.normals = [0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1];
  data.indices = [0, 1, 2, 0, 2, 3];
  data.applyToMesh(mesh);
  return mesh;
}

// A bright core and a long soft tail: the core blooms on High, the tail is the haze around a light.
function glowTexture(scene: Scene, kind: HaloKind): DynamicTexture {
  const t = new DynamicTexture(`halo-${kind}-glow`, { width: 64, height: 64 }, scene, true);
  const ctx = t.getContext();
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgb(255,255,255)');
  g.addColorStop(0.15, 'rgb(230,230,230)');
  g.addColorStop(0.35, 'rgb(100,100,100)');
  g.addColorStop(0.6, 'rgb(26,26,26)');
  g.addColorStop(1, 'rgb(0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  t.update(false);
  return t;
}

import { Color3, Texture, type Scene, type StandardMaterial } from './babylon.ts';
import { SURFACES } from '../content/surfaces.ts';
import { DETAIL_MEAN } from '../domain/texturing.ts';
import { textureFile, type TexturedSurface, type TextureSize } from '../domain/surfaces.ts';
import { solidMaterial } from './meshkit.ts';

const ANISOTROPY = 8;

/**
 * One material per textured surface, shared by every landmark model (ADR 0055): the photograph as a detail map on
 * the palette's colour, and its relief as a normal map. Night dimming, fog, shadows and lamps treat these as they
 * treat the building material, so a model never brings its own lighting.
 */
export class LandmarkMaterials {
  private readonly made = new Map<TexturedSurface, StandardMaterial>();

  constructor(
    private readonly scene: Scene,
    private readonly base: string,
    private size: TextureSize,
  ) {}

  get(surface: TexturedSurface): StandardMaterial {
    const have = this.made.get(surface);
    if (have) return have;
    // The building material's own settings, so a textured part is lit as its procedural fallback is.
    const mat = solidMaterial(this.scene, `landmark-${surface}-mat`);
    this.made.set(surface, mat);
    this.load(surface, mat);
    console.info(`dewidebug landmark material ${surface} made at ${String(this.size)}px`);
    return mat;
  }

  /** Swaps every made material's maps for the size a graphics level asks for (High full, Medium half). */
  setSize(size: TextureSize): void {
    if (size === this.size) return;
    this.size = size;
    for (const [surface, mat] of this.made) this.load(surface, mat);
    console.info(`dewidebug landmark materials now ${String(size)}px for ${String(this.made.size)} surfaces`);
  }

  /** The texture edge in pixels the materials use now, for the debug overlay. */
  get textureSize(): TextureSize {
    return this.size;
  }

  private load(surface: TexturedSurface, mat: StandardMaterial): void {
    const s = SURFACES[surface];
    const repeat = 1 / s.photo.metres;
    const map = (kind: 'color' | 'normal'): Texture => {
      const url = `${this.base}${textureFile(surface, kind, this.size)}`;
      const t: Texture = new Texture(
        url,
        this.scene,
        false,
        true,
        Texture.TRILINEAR_SAMPLINGMODE,
        null,
        (message) => {
          console.warn(`dewidebug landmark texture ${url} failed: ${message ?? 'no message'}`);
          this.dropFailed(surface, mat, kind, t);
        },
      );
      // The colour map is a detail map around mid-grey, not a colour, so it is read as it is stored.
      if (kind === 'color') t.gammaSpace = false;
      t.uScale = repeat;
      t.vScale = repeat;
      t.anisotropicFilteringLevel = ANISOTROPY;
      return t;
    };
    const old = [mat.diffuseTexture, mat.bumpTexture];
    mat.diffuseColor = Color3.White();
    mat.diffuseTexture = map('color');
    const bump = map('normal');
    bump.level = s.look.relief;
    mat.bumpTexture = bump;
    for (const t of old) t?.dispose();
  }

  /**
   * A map that did not load is taken off its material, because Babylon draws a failed texture black. Without
   * the colour map the vertex colours, which were lifted to meet it, meet a diffuse colour of the same mean
   * instead, so the part shows its flat palette colour rather than a silhouette.
   */
  private dropFailed(
    surface: TexturedSurface,
    mat: StandardMaterial,
    kind: 'color' | 'normal',
    t: Texture,
  ): void {
    if (kind === 'color' && mat.diffuseTexture === t) {
      mat.diffuseTexture = null;
      mat.diffuseColor = new Color3(DETAIL_MEAN, DETAIL_MEAN, DETAIL_MEAN);
    } else if (kind === 'normal' && mat.bumpTexture === t) mat.bumpTexture = null;
    else return;
    t.dispose();
    console.warn(`dewidebug landmark ${surface} drawn without its ${kind} map`);
  }
}

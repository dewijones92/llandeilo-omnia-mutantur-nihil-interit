import type { Bilingual } from '../domain/i18n.ts';
import type { Provenance } from '../domain/provenance.ts';
import type { TexturedSurface } from '../domain/surfaces.ts';
import { imagined, reconstructed } from './provenance.ts';

/** A file at the texture library, pinned by its checksum so a rebuild cannot silently take a changed photograph. */
interface Download {
  readonly url: string;
  readonly md5: string;
}

/**
 * What a textured surface on a Blender model shows (ADR 0055): what it was made of and how that is known, and
 * the photograph standing in for its look. The photograph is never evidence; the provenance is the claim.
 */
export interface Surface {
  readonly name: Bilingual;
  readonly provenance: Provenance;
  readonly photo: {
    readonly title: string;
    readonly author: string;
    readonly page: string;
    readonly color: Download;
    readonly normal: Download;
    /** Metres of real surface the photograph covers, from the library: the texture repeats every this many metres. */
    readonly metres: number;
  };
  /** How strongly the photograph's own light and dark show through the app's colour for the material (0 to 1), and the relief's strength. Tuned by eye. */
  readonly look: { readonly detail: number; readonly relief: number };
}

const POLY_HAVEN = 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k';
const ph = (id: string, map: 'diff' | 'nor_gl', md5: string): Download => ({
  url: `${POLY_HAVEN}/${id}/${id}_${map}_2k.jpg`,
  md5,
});

export const SURFACES: Readonly<Record<TexturedSurface, Surface>> = {
  turf: {
    name: { en: 'Turf: the grassed walk on top', cy: 'Tyweirch: y llwybr glaswelltog ar y brig' },
    provenance: imagined(
      'The walk along the top of the rampart, drawn grassed. Dinefwr’s rampart is turf by inference (the clay fill of Fort 1’s inner ditch). Whether the top was grassed, trodden bare or surfaced is not known, so the grass is a guess. The texture is a modern photograph of turf, tinted to the app’s turf colour.',
      'Y llwybr ar hyd brig y rhagfur, wedi’i dynnu’n laswelltog. Tyweirch yw rhagfur Dinefwr trwy gasgliad (llenwad clai ffos fewnol Caer 1). Ni wyddys a oedd y brig yn laswelltog, wedi’i sathru’n foel neu wedi’i wynebu, felly dyfaliad yw’r glaswellt. Ffotograff modern o dyweirch yw’r gwead, wedi’i liwio â lliw tyweirch yr ap.',
      ['fort:S1'],
    ),
    photo: {
      title: 'Grass Ground',
      author: 'Charlotte Baglioni',
      page: 'https://polyhaven.com/a/grass_ground',
      color: ph('grass_ground', 'diff', 'fd97f2402677e6686b2d9159fc3a4256'),
      normal: ph('grass_ground', 'nor_gl', 'c8b2dd95f09868c4aacb91f62c673344'),
      metres: 2.51,
    },
    look: { detail: 0.85, relief: 0.6 },
  },
  'turf-face': {
    name: { en: 'Turf: the faces of the courses', cy: 'Tyweirch: wynebau’r haenau' },
    provenance: reconstructed(
      'The faces and set-back steps of the courses of turves, drawn as the turves’ soil: turves were often laid grass side down (on the Antonine Wall and at Vindolanda; the 1899 survey of the Wall is cited through the 2022 paper), and how soon a face grew over is not known. Turf blocks measured in Roman fort ramparts are 0.03 to 0.15m high; Vegetius gives half a Roman foot, about 0.15m, for the bank of a marching camp, which the courses are drawn at. The texture is a modern photograph of an excavated soil face, standing in for the turves.',
      'Wynebau a grisiau haenau’r tyweirch, wedi’u tynnu fel pridd y tyweirch: gosodid tyweirch yn aml â’r glaswellt i lawr (ar Fur Antoninus ac yn Vindolanda; dyfynnir arolwg 1899 o’r Mur drwy bapur 2022), ac ni wyddys pa mor fuan y tyfodd glaswellt dros wyneb. Mae blociau tyweirch a fesurwyd yn rhagfuriau caerau Rhufeinig rhwng 0.03 a 0.15m o uchder; mae Vegetius yn rhoi hanner troedfedd Rufeinig, tua 0.15m, ar gyfer clawdd gwersyll gorymdeithio, a dyna uchder yr haenau a dynnir. Ffotograff modern o wyneb pridd wedi’i gloddio yw’r gwead, yn sefyll yn lle’r tyweirch.',
      ['fort:S1', 'surfaces:S1', 'surfaces:S2'],
    ),
    photo: {
      title: 'Excavated Soil Wall',
      author: 'Amal Kumar',
      page: 'https://polyhaven.com/a/excavated_soil_wall',
      color: ph('excavated_soil_wall', 'diff', '101206598b1560b20d7926c61a8cbd5f'),
      normal: ph('excavated_soil_wall', 'nor_gl', '4317ca90d956a836e51f2f5ea51a05a5'),
      metres: 2,
    },
    look: { detail: 0.5, relief: 0.35 },
  },
  timber: {
    name: { en: 'Timber', cy: 'Pren' },
    provenance: reconstructed(
      'Squared timber, probably oak. No timber survives at Dinefwr: the posts are known from their pipes and pits. Oak is an analogy: the Vindolanda timbers dated by tree-rings are oak (the method samples oak, and oak is only part of the wood found there), and a modern rebuild of an Iron Age house at Castell Henllys used oak. Neither is evidence for Dinefwr. The texture is a modern photograph of weathered timber, tinted to the app’s timber colour.',
      'Pren sgwâr, derw yn ôl pob tebyg. Nid oes pren wedi goroesi yn Ninefwr: o’u pibellau a’u pyllau y gwyddys am y pyst. Cymhariaeth yw derw: derw yw’r coed yn Vindolanda a ddyddiwyd o’u cylchoedd blynyddol (mae’r dull yn samplu derw, a dim ond rhan o’r pren a gafwyd yno yw derw), a defnyddiodd ailgodiad modern o dŷ Oes yr Haearn yng Nghastell Henllys dderw. Nid yw’r naill na’r llall yn dystiolaeth ar gyfer Dinefwr. Ffotograff modern o bren wedi hindreulio yw’r gwead, wedi’i liwio â lliw pren yr ap.',
      ['fort:S1', 'surfaces:S4', 'ironage:S29'],
    ),
    photo: {
      title: 'Rough Wood',
      author: 'Rob Tuytel',
      page: 'https://polyhaven.com/a/rough_wood',
      color: ph('rough_wood', 'diff', 'f5f9c55696f047ceaa49dc97c5aa5526'),
      normal: ph('rough_wood', 'nor_gl', '62594f2d00eb246581b9d4fde30209f1'),
      metres: 0.5,
    },
    look: { detail: 0.75, relief: 0.7 },
  },
  shingle: {
    name: { en: 'Timber shingles', cy: 'Ystyllod pren' },
    provenance: imagined(
      'What roofed the forts is not known; shingle is a choice. If shingles, oak: Pliny calls oak the best wood for them, and says Rome was roofed with shingles for 470 years. The texture is a modern photograph of weathered boards, whose joints, run up the slope, stand for the gaps between shingles.',
      'Ni wyddys beth oedd ar doeau’r caerau; dewis yw ystyllod. Os ystyllod, derw: dywed Pliny mai derw yw’r pren gorau ar eu cyfer, a bod Rhufain wedi’i thoi ag ystyllod am 470 mlynedd. Ffotograff modern o estyll wedi hindreulio yw’r gwead, a’u huniadau, sy’n rhedeg i fyny’r llethr, yn sefyll dros y bylchau rhwng yr ystyllod.',
      ['fort:S1', 'surfaces:S3'],
    ),
    photo: {
      title: 'Wood Planks Grey',
      author: 'Rob Tuytel',
      page: 'https://polyhaven.com/a/wood_planks_grey',
      color: ph('wood_planks_grey', 'diff', '91ca23c2f5584014f465a3a50ada472f'),
      normal: ph('wood_planks_grey', 'nor_gl', 'b46a35ec45e38dee2aeeb9330adb270b'),
      metres: 1.5,
    },
    look: { detail: 0.75, relief: 0.6 },
  },
  daub: {
    name: { en: 'Daub', cy: 'Clai’r muriau' },
    provenance: reconstructed(
      'Clay daub on wattle, bare. Daub with wattle impressions was found on the site; what was in it is not recorded there (clay, straw and dung at the Castell Henllys rebuilds), and no limewash or render is evidenced, so it is drawn as bare clay. The texture is a modern photograph of rough clay plaster, tinted to the app’s daub colour.',
      'Clai ar blethwaith, yn noeth. Cafwyd clai ag olion plethwaith ar y safle; ni chofnodwyd yno beth oedd ynddo (clai, gwellt a thail yn y tai a ailgodwyd yng Nghastell Henllys), ac nid oes tystiolaeth o wyngalch na rendr, felly fe’i tynnir fel clai noeth. Ffotograff modern o blastr clai garw yw’r gwead, wedi’i liwio â lliw clai’r ap.',
      ['fort:S1', 'ironage:S30'],
    ),
    photo: {
      title: 'Clay Plaster',
      author: 'Amal Kumar',
      page: 'https://polyhaven.com/a/clay_plaster',
      color: ph('clay_plaster', 'diff', '8e16660ba21ffad2e5fb93282b28015b'),
      normal: ph('clay_plaster', 'nor_gl', 'f4f2819724ee89c7aaa189d11fd7cb88'),
      metres: 2,
    },
    look: { detail: 1, relief: 0.6 },
  },
  thatch: {
    name: { en: 'Thatch', cy: 'To gwellt' },
    provenance: imagined(
      'What roofed the settlement is not known; thatch is a choice, of reed or straw: Welsh reconstructions use both (reed at Castell Henllys, straw at Bryn Eryr). No Roman-period thatch from Britain was found in this research. The texture is a modern photograph of reed thatch, tinted to the app’s thatch colour.',
      'Ni wyddys beth oedd ar doeau’r anheddiad; dewis yw to gwellt, o gyrs neu wellt: defnyddia ailgreadau yng Nghymru y ddau (cyrs yng Nghastell Henllys, gwellt ym Mryn Eryr). Ni chafwyd to gwellt o’r cyfnod Rhufeinig ym Mhrydain yn yr ymchwil hon. Ffotograff modern o do cyrs yw’r gwead, wedi’i liwio â lliw to gwellt yr ap.',
      ['fort:S1', 'ironage:S30', 'ironage:S32'],
    ),
    photo: {
      title: 'Thatch Roof Angled',
      author: 'Rob Tuytel and Dimitrios Savva',
      page: 'https://polyhaven.com/a/thatch_roof_angled',
      color: ph('thatch_roof_angled', 'diff', 'd043c7e632bb9560138ccb13a036a02f'),
      normal: ph('thatch_roof_angled', 'nor_gl', 'cda9c9e08f034d725194a7bf49f791be'),
      metres: 0.54,
    },
    look: { detail: 0.8, relief: 0.7 },
  },
};

/** Where every surface photograph comes from, and its licence, in full and short. */
export const SURFACE_LIBRARY = 'Poly Haven';
export const SURFACE_LICENCE = 'CC0 1.0 (public domain dedication), as stated by Poly Haven';
export const SURFACE_LICENCE_SHORT = 'CC0';

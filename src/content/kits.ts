import type { Bilingual } from '../domain/i18n.ts';
import type { KitId, KitParams } from '../domain/plan.ts';
import type { Provenance } from '../domain/provenance.ts';
import { imagined, reconstructed } from './provenance.ts';

/**
 * A construction detail a Blender model draws on a part that asks for it (ADR 0053): what it is, how it is
 * known, and its measurements. The Blender script has one builder per id and takes every number from here.
 */
export interface Kit<K extends KitId> {
  readonly name: Bilingual;
  readonly provenance: Provenance;
  readonly params: KitParams<K>;
}

export type KitCatalogue = { readonly [K in KitId]: Kit<K> };

export const KITS: KitCatalogue = {
  'post-tower-six': {
    name: { en: 'Six-post timber tower', cy: 'Tŵr pren chwe phostyn' },
    provenance: reconstructed(
      'Drawn as six squared posts about 0.4m across, in two rows of three, standing to the top, with a boarded fighting stage on them under the roof and the frame open below. The post size is from the post-pipes of Fort 1’s south-west gate, which suggest timbers up to 0.4m across (Trench 1); which way the rows ran is not known. The boarded stage and the open frame follow timber towers on posts at Jay Lane, an analogy: no tower stands anywhere to show its upper parts.',
      'Fe’i tynnir fel chwe phostyn sgwâr tua 0.4m ar eu traws, mewn dwy res o dri, yn codi i’r brig, â llwyfan ymladd o estyll arnynt o dan y to a’r ffrâm yn agored oddi tano. Daw maint y pyst o bibellau pyst porth de-orllewin Caer 1, sy’n awgrymu coed hyd at 0.4m ar eu traws (Ffos Brawf 1); ni wyddys pa ffordd yr âi’r rhesi. Mae’r llwyfan o estyll a’r ffrâm agored yn dilyn tyrau pren ar byst yn Jay Lane, sef cymhariaeth: nid oes tŵr yn sefyll yn unman i ddangos ei rannau uchaf.',
      ['fort:S1', 'fort:S16'],
    ),
    params: { post: 0.4, stage: 2.4, board: 0.3 },
  },
  'post-tower-four': {
    name: { en: 'Four-post timber tower', cy: 'Tŵr pren pedwar postyn' },
    provenance: reconstructed(
      'Drawn as four squared posts, one at each corner, with a boarded stage on them under the roof and the frame open below. Four posts are what the survey shows for Fort 1’s interval tower; their size, about 0.3m, and the boarded stage are analogy (four-post interval towers at Jay Lane).',
      'Fe’i tynnir fel pedwar postyn sgwâr, un ar bob cornel, â llwyfan o estyll arnynt o dan y to a’r ffrâm yn agored oddi tano. Pedwar postyn yw’r hyn a ddengys yr arolwg ar gyfer tŵr rhyngol Caer 1; dyfaliad ar sail cymariaethau yw eu maint, tua 0.3m, a’r llwyfan o estyll (tyrau rhyngol pedwar postyn yn Jay Lane).',
      ['fort:S1', 'fort:S16'],
    ),
    params: { post: 0.3, stage: 2.2, board: 0.3 },
  },
  'turf-courses': {
    name: { en: 'Faces of laid turves', cy: 'Wynebau o dyweirch wedi’u gosod' },
    provenance: reconstructed(
      'The bank’s faces are drawn as turves laid in courses about 0.3m deep, each a little set back, grass on top. Turf revetments are recorded at Jay Lane, and a clay-and-turf one is given for Trawscoed (a lead only); nothing of the bank survives at Dinefwr, and the course depth is a guess.',
      'Tynnir wynebau’r clawdd fel tyweirch wedi’u gosod mewn haenau tua 0.3m o ddyfnder, pob un ychydig yn ôl, a glaswellt ar ei ben. Cofnodir wynebau tyweirch yn Jay Lane, a rhoddir un o glai a thyweirch ar gyfer Trawsgoed (cyfeiriad yn unig); ni oroesodd dim o’r clawdd yn Ninefwr, a dyfaliad yw dyfnder yr haenau.',
      ['fort:S16', 'fort:S15'],
    ),
    params: { course: 0.3 },
  },
  'post-and-board-breastwork': {
    name: { en: 'Posts and boards', cy: 'Pyst ac estyll' },
    provenance: imagined(
      'Drawn as upright posts about 2m apart with horizontal boards between them. The breastwork itself is analogy, and nothing records its form; posts and boards are one way it could have been made.',
      'Fe’i tynnir fel pyst unionsyth tua 2m ar wahân ag estyll llorweddol rhyngddynt. Dyfaliad ar sail cymariaethau yw’r parapet ei hun, ac nid oes dim yn cofnodi ei ffurf; mae pyst ac estyll yn un ffordd y gallai fod wedi’i wneud.',
      ['fort:S16'],
    ),
    params: { post: 0.2, spacing: 2, board: 0.35 },
  },
  'plank-deck': {
    name: { en: 'Planked deck on beams', cy: 'Llawr o estyll ar drawstiau' },
    provenance: imagined(
      'Drawn as planks laid across two beams, with a boarded side to each edge. How the walkway over a gate was built is not recorded; this is one plain way.',
      'Fe’i tynnir fel estyll wedi’u gosod ar draws dau drawst, ag ochr o estyll ar bob ymyl. Ni chofnodwyd sut y codwyd y llwybr dros borth; dyma un ffordd syml.',
      ['fort:S16'],
    ),
    params: { plank: 0.3, beam: 0.3 },
  },
  'ledged-leaf': {
    name: { en: 'Ledged and braced boards', cy: 'Estyll â chledrau a bres' },
    provenance: imagined(
      'Drawn as upright planks held by three ledges and a brace, turning on the post at its edge. No gate fittings are evidenced at Dinefwr; this is a guess at how a timber gate leaf was made.',
      'Fe’i tynnir fel estyll unionsyth wedi’u dal gan dri chledr a bres, yn troi ar y postyn wrth ei ymyl. Ni cheir tystiolaeth o ddrysau porth yn Ninefwr; dyfaliad yw hwn o sut y gwnaed drws porth pren.',
      ['fort:S1'],
    ),
    params: { plank: 0.3, ledge: 0.18 },
  },
  'timber-frame': {
    name: { en: 'Timber frame with daub panels', cy: 'Ffrâm bren â phaneli clai' },
    provenance: reconstructed(
      'Walls are drawn as squared posts about 3m apart on a sill beam, under a wall plate, with the panels between filled with daub. Daub with wattle impressions was found on the site, so the walls were wattle and daub on a timber frame; the frame’s layout and sizes are a reconstruction.',
      'Tynnir y muriau fel pyst sgwâr tua 3m ar wahân ar drawst sil, o dan blât wal, â’r paneli rhyngddynt wedi’u llenwi â chlai. Cafwyd clai ag olion plethwaith ar y safle, felly plethwaith a chlai ar ffrâm bren oedd y muriau; ail-greu yw cynllun a maint y ffrâm.',
      ['fort:S1'],
    ),
    params: { post: 0.25, spacing: 3, sill: 0.3, plate: 0.25 },
  },
  'shingle-roof': {
    name: { en: 'Timber shingles', cy: 'Ystyllod pren' },
    provenance: imagined(
      'Drawn as rows of timber shingles about 0.3m to a course. What roofed the forts’ buildings is not known; shingle is a choice, and so is the course.',
      'Fe’i tynnir fel rhesi o ystyllod pren tua 0.3m i bob rhes. Ni wyddys beth oedd ar doeau adeiladau’r caerau; dewis yw ystyllod, a’r rhesi hefyd.',
      ['fort:S1'],
    ),
    params: { course: 0.3 },
  },
  'thatch-roof': {
    name: { en: 'Thick thatch', cy: 'To gwellt trwchus' },
    provenance: imagined(
      'Drawn as thatch about 0.4m thick with rounded eaves and ridge. What roofed the settlement’s buildings is not known.',
      'Fe’i tynnir fel to gwellt tua 0.4m o drwch â bargod a chrib crwn. Ni wyddys beth oedd ar doeau adeiladau’r anheddiad.',
      ['fort:S1', 'fort:S14'],
    ),
    params: { thickness: 0.4 },
  },
};

/** A kit's name and provenance, for code that has only the id (the part's ⓘ). */
export function kitInfo(id: KitId): { readonly name: Bilingual; readonly provenance: Provenance } {
  const k = KITS[id];
  return { name: k.name, provenance: k.provenance };
}

/** A kit's measurements, for the build sheet. */
export function kitParams(id: KitId): Readonly<Record<string, number>> {
  return KITS[id].params;
}

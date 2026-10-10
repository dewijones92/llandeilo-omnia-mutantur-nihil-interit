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
      'Drawn as six squared posts in two rows of three, each about 0.4m across, which is the most the post-pipes of Fort 1’s south-west gateway allow (Trench 1; which way the rows ran is not known). Six posts are also what Jay Lane, an earth fort in Herefordshire, is assumed to have had for its corner tower (four posts were found; its page says “assumed”), with gatehouses (three or four were excavated) said to have stood on two rows of five posts with a tower about 9.5ft (2.9m) square at each end, and four-post interval towers; its page gives the layouts and plan sizes only. Nothing else about the tower is evidenced: what stands on and around the posts is a separate kit, and a guess.',
      'Fe’i tynnir fel chwe phostyn sgwâr mewn dwy res o dri, pob un tua 0.4m ar ei draws, sef y mwyaf y mae pibellau pyst porth de-orllewin Caer 1 yn ei ganiatáu (Ffos Brawf 1; ni wyddys pa ffordd yr âi’r rhesi). Tybir bod chwe phostyn gan dŵr cornel Jay Lane hefyd, caer bridd yn Swydd Henffordd (canfuwyd pedwar postyn; dywed ei thudalen “assumed”), â phyrth (cloddiwyd tri neu bedwar) y dywedir iddynt sefyll ar ddwy res o bump o byst, â thŵr tua 9.5 troedfedd (2.9m) sgwâr ar bob pen, a thyrau rhyngol pedwar postyn; dim ond y cynlluniau a’r meintiau a roddir ar ei thudalen. Ni cheir tystiolaeth o ddim arall am y tŵr: cit ar wahân, a dyfaliad, yw’r hyn sy’n sefyll ar y pyst ac o’u cwmpas.',
      ['fort:S1', 'fort:S16'],
    ),
    params: { post: 0.4 },
  },
  'post-tower-four': {
    name: { en: 'Four-post timber tower', cy: 'Tŵr pren pedwar postyn' },
    provenance: reconstructed(
      'Drawn as four squared posts, one at each corner, about 0.4m across. Four posts are what the survey shows for Fort 1’s interval tower (“probably”, S1), and what Jay Lane’s interval towers had, about 2.4 to 3m square. The 0.4m is the upper limit from Fort 1’s gate post-pipes, applied here as an analogy: Jay Lane’s page gives no post size, only that the best-preserved interval tower’s posts were “of the same scantling (cross-section)” as the gateway timbers. Nothing else about the tower is evidenced: what stands on and around the posts is a separate kit, and a guess.',
      'Fe’i tynnir fel pedwar postyn sgwâr, un ar bob cornel, tua 0.4m ar eu traws. Pedwar postyn yw’r hyn a ddengys yr arolwg ar gyfer tŵr rhyngol Caer 1 (“yn ôl pob tebyg”, S1), a’r hyn oedd gan dyrau rhyngol Jay Lane, tua 2.4 i 3m sgwâr. Terfyn uchaf pibellau pyst porth Caer 1 yw’r 0.4m, a gymhwysir yma fel cymhariaeth: nid yw tudalen Jay Lane yn rhoi maint postyn, dim ond bod pyst y tŵr rhyngol a gadwyd orau “of the same scantling (cross-section)” â choed y porth. Ni cheir tystiolaeth o ddim arall am y tŵr: cit ar wahân, a dyfaliad, yw’r hyn sy’n sefyll ar y pyst ac o’u cwmpas.',
      ['fort:S1', 'fort:S16'],
    ),
    params: { post: 0.4 },
  },
  'tower-boarding': {
    name: { en: 'Boarded stage and ground storey', cy: 'Llwyfan o estyll a llawr gwaelod' },
    provenance: imagined(
      'Drawn with a boarded fighting stage near the top, under the roof, on a floor slab about 0.15m thick, and with the ground storey boarded in. Of the one analogy we hold, Jay Lane’s page says only that its gate towers would have given a guard-room at ground level, which is why the lower storey is walled in rather than left open; it says nothing about a stage, boarding or a roof, and nothing about what the other towers had. The stage’s height, the boards and a walled ground storey for every tower are guesses. No tower stands anywhere to show its upper parts.',
      'Fe’i tynnir â llwyfan ymladd o estyll ger y brig, o dan y to, ar slab llawr tua 0.15m o drwch, a’r llawr gwaelod wedi’i gau ag estyll. O’r unig gymhariaeth sydd gennym, dim ond dweud y byddai ei dyrau porth wedi rhoi ystafell warchod ar lefel y ddaear a wna tudalen Jay Lane, a dyna pam y cauwyd y llawr isaf yn hytrach na’i adael yn agored; nid yw’n dweud dim am lwyfan, estyll na tho, na dim am yr hyn oedd gan y tyrau eraill. Dyfaliadau yw uchder y llwyfan, yr estyll a llawr gwaelod caeedig i bob tŵr. Nid oes tŵr yn sefyll yn unman i ddangos ei rannau uchaf.',
      ['fort:S16'],
    ),
    params: { stage: 2.4, board: 0.3, floor: 0.15, skin: 0.06 },
  },
  'turf-courses': {
    name: { en: 'Faces of laid turves', cy: 'Wynebau o dyweirch wedi’u gosod' },
    provenance: reconstructed(
      'The bank’s faces are drawn as turves laid in courses about 0.3m deep, each a little set back, grass on top. Dinefwr’s own turf rampart is an inference from the clay fill of Fort 1’s inner ditch, read as the bank pushed back in; no bank survives there. Jay Lane’s page (S16) contradicts itself on its turf: its summary says excavation “revealed earth ramparts revetted with turf”, but its excavation section says no trace of a rampart bank was found, nor any postholes for a timber-framed rampart or palisade, and that the rampart “must have been provided with a turf revetment”, a suggestion; we take it as a suggestion and do not pick between them. A clay-and-turf revetment is given for Trawscoed (a lead only). The course depth is a guess.',
      'Tynnir wynebau’r clawdd fel tyweirch wedi’u gosod mewn haenau tua 0.3m o ddyfnder, pob un ychydig yn ôl, a glaswellt ar ei ben. Casgliad o glai llenwad ffos fewnol Caer 1 yw rhagfur tyweirch Dinefwr ei hun, a ddarllenir fel y glan a wthiwyd yn ôl; ni oroesodd dim o’r clawdd yno. Mae tudalen Jay Lane (S16) yn gwrth-ddweud ei hun am ei thyweirch: dywed ei chrynodeb fod cloddio wedi “datgelu rhagfuriau pridd wedi’u wynebu â thyweirch”, ond dywed ei hadran gloddio na cheid ôl glan rhagfur, ac na cheid tyllau postyn ar gyfer rhagfur neu balisâd â ffrâm bren, a bod “rhaid bod y rhagfur wedi cael wyneb tyweirch”, sef awgrym; fe’i cymerwn fel awgrym heb ddewis rhwng y ddau. Rhoddir wyneb o glai a thyweirch ar gyfer Trawsgoed (cyfeiriad yn unig). Dyfaliad yw dyfnder yr haenau.',
      ['fort:S1', 'fort:S16', 'fort:S15'],
    ),
    params: { course: 0.3 },
  },
  'post-and-board-breastwork': {
    name: { en: 'Posts and boards', cy: 'Pyst ac estyll' },
    provenance: imagined(
      'Drawn as upright posts about 2m apart, 0.12m taller than the boards, with horizontal boards about 0.08m thick between them. The breastwork itself is analogy, and nothing records its form; posts and boards are one way it could have been made.',
      'Fe’i tynnir fel pyst unionsyth tua 2m ar wahân, 0.12m yn uwch na’r estyll, ag estyll llorweddol tua 0.08m o drwch rhyngddynt. Dyfaliad ar sail cymariaethau yw’r parapet ei hun, ac nid oes dim yn cofnodi ei ffurf; mae pyst ac estyll yn un ffordd y gallai fod wedi’i wneud.',
      ['fort:S16'],
    ),
    params: { post: 0.2, spacing: 2, board: 0.35, proud: 0.12, skin: 0.08 },
  },
  'plank-deck': {
    name: { en: 'Planked deck on beams', cy: 'Llawr o estyll ar drawstiau' },
    provenance: imagined(
      'Drawn as planks about 0.08m thick laid across two beams that reach 0.8m past the ends, with a boarded rail about 0.08m wide along each edge. How the walkway over a gate was built is not recorded; this is one plain way.',
      'Fe’i tynnir fel estyll tua 0.08m o drwch wedi’u gosod ar draws dau drawst sy’n ymestyn 0.8m heibio’r pennau, â rheilen o estyll tua 0.08m o led ar hyd pob ymyl. Ni chofnodwyd sut y codwyd y llwybr dros borth; dyma un ffordd syml.',
      ['fort:S16'],
    ),
    params: { plank: 0.3, beam: 0.3, thickness: 0.08, rail: 0.08, overhang: 0.8 },
  },
  'ledged-leaf': {
    name: { en: 'Ledged and braced boards', cy: 'Estyll â chledrau a bres' },
    provenance: imagined(
      'Drawn as upright planks held by three ledges, the highest and lowest set 0.35m in from the ends, and two diagonal braces about 0.14m wide between them, turning on the post at its edge, with a 0.05m gap above the ground. No gate fittings are evidenced at Dinefwr; this is a guess at how a timber gate leaf was made.',
      'Fe’i tynnir fel estyll unionsyth wedi’u dal gan dri chledr, yr uchaf a’r isaf 0.35m i mewn o’r pennau, a dau fres croeslin tua 0.14m o led rhyngddynt, yn troi ar y postyn wrth ei ymyl, â bwlch o 0.05m uwchben y ddaear. Ni cheir tystiolaeth o ddrysau porth yn Ninefwr; dyfaliad yw hwn o sut y gwnaed drws porth pren.',
      ['fort:S1'],
    ),
    params: { plank: 0.3, ledge: 0.18, brace: 0.14, inset: 0.35, clearance: 0.05 },
  },
  'timber-frame': {
    name: { en: 'Timber frame with daub panels', cy: 'Ffrâm bren â phaneli clai' },
    provenance: reconstructed(
      'Walls are drawn as squared posts about 3m apart on a sill beam, under a wall plate (each about 0.2m across the wall), with the panels between filled with daub set 0.03m in from the line of the walls. Daub with wattle impressions was found on the site, so the walls were wattle and daub on a timber frame; the frame’s layout and sizes are a reconstruction.',
      'Tynnir y muriau fel pyst sgwâr tua 3m ar wahân ar drawst sil, o dan blât wal (pob un tua 0.2m ar draws y wal), â’r paneli rhyngddynt wedi’u llenwi â chlai sydd 0.03m i mewn o linell y muriau. Cafwyd clai ag olion plethwaith ar y safle, felly plethwaith a chlai ar ffrâm bren oedd y muriau; ail-greu yw cynllun a maint y ffrâm.',
      ['fort:S1'],
    ),
    params: { post: 0.25, spacing: 3, sill: 0.3, plate: 0.25, beam: 0.2, setIn: 0.03 },
  },
  'shingle-roof': {
    name: { en: 'Timber shingles', cy: 'Ystyllod pren' },
    provenance: imagined(
      'Drawn as rows of timber shingles about 0.3m to a course and 0.05m thick, each course lapping 0.04m over the one below and running 0.09m up under the next, with a ridge beam about 0.22m wide and 0.18m deep along the top, and the gable ends filled in with the walls’ own finish. What roofed the forts’ buildings is not known; shingle, the courses and the ridge beam are all choices.',
      'Fe’i tynnir fel rhesi o ystyllod pren tua 0.3m i bob rhes a 0.05m o drwch, pob rhes yn gorgyffwrdd 0.04m â’r un islaw ac yn rhedeg 0.09m i fyny o dan y nesaf, â thrawst crib tua 0.22m o led a 0.18m o ddyfnder ar hyd y brig, a’r talcenni wedi’u llenwi â gorffeniad y muriau eu hunain. Ni wyddys beth oedd ar doeau adeiladau’r caerau; dewisiadau yw ystyllod, y rhesi a’r trawst crib.',
      ['fort:S1'],
    ),
    params: {
      course: 0.3,
      thickness: 0.05,
      lip: 0.04,
      overlap: 0.09,
      ridge: 0.22,
      ridgeDepth: 0.18,
      gable: 0.1,
    },
  },
  'thatch-roof': {
    name: { en: 'Thick thatch', cy: 'To gwellt trwchus' },
    provenance: imagined(
      'Drawn as thatch about 0.4m thick, hanging 0.1m below the eaves, with a rounded ridge roll about 0.56m across, its centre 0.24m above the thatch’s top face, and the gable ends filled in with the walls’ own finish. What roofed the settlement’s buildings is not known.',
      'Fe’i tynnir fel to gwellt tua 0.4m o drwch, yn crogi 0.1m o dan y bargod, â chrib gron tua 0.56m ar ei thraws, ei chanol 0.24m uwchben wyneb uchaf y to, a’r talcenni wedi’u llenwi â gorffeniad y muriau eu hunain. Ni wyddys beth oedd ar doeau adeiladau’r anheddiad.',
      ['fort:S1', 'fort:S14'],
    ),
    params: { thickness: 0.4, eaves: 0.1, roll: 0.28, rollSeat: 0.24, gable: 0.1 },
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

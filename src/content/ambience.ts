import type { BedPoint, Soundscape } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { ad, bc, type Year } from '../domain/time.ts';
import { END_OF_STEAM } from './features.ts';
import { src } from './ids.ts';

// Why each ambient sound bed is heard, and when. The research is docs/research/soundscapes.md and
// event-effects.md. Sound itself almost never survives, so a bed is at best documented in a source
// that records the thing making it here (the bells and the train of 1857, the Shire Hall market),
// and its loudness is always chosen by ear.

const heard = (year: Year, level: number, provenance: Provenance): BedPoint => ({
  kind: 'heard',
  year,
  level,
  provenance,
});
const silent = (year: Year): BedPoint => ({ kind: 'silent', year });

export const WIND: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Wind in every era, stronger in the open cold phases and softer under closed woodland.',
    cy: 'Gwynt ym mhob oes, yn gryfach yn y cyfnodau oer agored ac yn dawelach dan goetir trwchus.',
  },
  sources: [src('deeptime:S8'), src('deeptime:S10')],
};

export const MELTWATER: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'A loud meltwater river in the cold of the Late Ice Age, inferred from the glaciers and frozen ground of the last cold snap in Britain. The cited page does not describe any river here.',
    cy: 'Afon ddŵr tawdd swnllyd yn oerfel diwedd Oes yr Iâ, wedi’i chasglu o rewlifoedd a thir rhewedig y cyfnod oer olaf ym Mhrydain. Nid yw’r dudalen a nodir yn disgrifio unrhyw afon yma.',
  },
  sources: [src('deeptime:S8')],
};

export const TYWI: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The Tywi, flowing past on its wide floodplain since the ice melted. The cited page is a lead, not a record of its sound; how loud it is was chosen by ear.',
    cy: "Afon Tywi, yn llifo heibio ar ei gorlifdir llydan ers i'r iâ doddi. Trywydd yw'r dudalen a nodir, nid cofnod o'i sŵn; dewiswyd pa mor uchel yw hi â'r glust.",
  },
  sources: [src('deeptime:S40')],
};

export const ICE_AGE_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'A few open-country birds: black grouse, golden eagle and chough are known from Ice Age bones in Welsh caves (the golden eagle’s from about 20,000 years ago, well before this period), none inside the 10 miles.',
    cy: 'Ychydig o adar tir agored: mae’r rugiar ddu, yr eryr euraid a’r frân goesgoch yn hysbys o esgyrn Oes yr Iâ mewn ogofâu yng Nghymru (esgyrn yr eryr euraid o tua 20,000 o flynyddoedd yn ôl, ymhell cyn y cyfnod hwn), ond dim un o fewn y 10 milltir.',
  },
  sources: [src('sound:S1')],
};

export const WILDWOOD_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Birds much like today’s: many of the 43 species among the Middle Stone Age bones at Port Eynon on Gower are ones a birdwatcher might expect there now. Cranes were common on the Severn estuary wetlands.',
    cy: 'Adar tebyg iawn i rai heddiw: mae llawer o’r 43 rhywogaeth ymhlith esgyrn Oes Ganol y Cerrig ym Mhorth Einon ar Benrhyn Gŵyr yn rhai y gallai gwyliwr adar ddisgwyl eu gweld yno heddiw. Roedd garanod yn gyffredin ar wlyptiroedd aber Hafren.',
  },
  sources: [src('sound:S1')],
};

export const MEDIEVAL_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The birds of medieval Welsh poetry and law: skylark, thrush, cuckoo, the owl at night, crane and bittern. Recorded for Wales, not for this valley.',
    cy: "Adar barddoniaeth a chyfraith Cymru'r Oesoedd Canol: yr ehedydd, y fronfraith, y gog, y dylluan liw nos, y garan a'r aderyn bwn. Wedi'u cofnodi i Gymru, nid i'r dyffryn hwn.",
  },
  sources: [src('sound:S1'), src('sound:S4'), src('sound:S5'), src('sound:S9'), src('sound:S8')],
};

export const FARMLAND_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Farmland and hay-meadow birds. In Pembrokeshire next door the corncrake was common in 1603 and still numerous in 1894.',
    cy: 'Adar tir fferm a dolydd gwair. Yn Sir Benfro gerllaw roedd rhegen yr ŷd yn gyffredin yn 1603 ac yn dal yn niferus yn 1894.',
  },
  sources: [src('sound:S10')],
};

export const MODERN_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Today’s valley birds. The red kite, down to fewer than ten pairs in mid Wales by the 1930s, is common again.',
    cy: "Adar y dyffryn heddiw. Mae'r barcud coch, a oedd i lawr i lai na deg pâr yng nghanolbarth Cymru erbyn y 1930au, yn gyffredin eto.",
  },
  sources: [src('deeptime:S44'), src('deeptime:S45')],
};

export const WOODLAND: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Leaves and branches in the wind, following how much of the valley was wooded at the time.',
    cy: "Dail a changhennau yn y gwynt, yn dilyn faint o'r dyffryn oedd dan goed ar y pryd.",
  },
  sources: [src('deeptime:S10')],
};

export const FIRST_FARMERS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Farm animals came to Britain by boat with the first farmers around 4000 BC. The cited page does not say which; cattle, sheep and pigs are assumed.',
    cy: 'Daeth anifeiliaid fferm i Brydain mewn cychod gyda’r ffermwyr cyntaf tua 4000 CC. Nid yw’r dudalen a nodir yn dweud pa rai; tybir mai gwartheg, defaid a moch oedden nhw.',
  },
  sources: [src('deeptime:S33')],
};

export const FARMSTEAD: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Cattle, sheep and dogs around every farmstead, by analogy with Iron Age Britain. Nothing is recorded for this valley.',
    cy: "Gwartheg, defaid a chŵn o gwmpas pob fferm, ar sail Prydain yn Oes yr Haearn. Does dim wedi'i gofnodi ar gyfer y dyffryn hwn.",
  },
  sources: [src('ironage:S49')],
};

export const GERALD_HERDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Herds and dairy everywhere, and ploughing with teams of four oxen, as Gerald of Wales described the whole country after his journey of 1188. Not recorded for this valley.',
    cy: 'Gyrroedd a llaeth ym mhobman, ac aredig â gwedd o bedwar ych, fel y disgrifiodd Gerallt Gymro’r wlad gyfan ar ôl ei daith yn 1188. Heb ei gofnodi ar gyfer y dyffryn hwn.',
  },
  sources: [src('sound:S3'), src('sound:S2')],
};

export const DROVERS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Drovers’ herds on the roads and a cattle fair at Ffairfach on 22 November. Both rest on encyclopedia pages, leads that name no Llandeilo drove route.',
    cy: "Gyrroedd y porthmyn ar y ffyrdd a ffair wartheg yn Ffair-fach ar 22 Tachwedd. Mae'r ddau'n dibynnu ar dudalennau gwyddoniadur, trywyddau nad ydynt yn enwi llwybr porthmyn o Landeilo.",
  },
  sources: [src('victorian:S37'), src('victorian:S2')],
};

export const MODERN_FARMS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'A farming valley: cattle and sheep on the pasture.',
    cy: 'Dyffryn amaethyddol: gwartheg a defaid ar y borfa.',
  },
  sources: [],
};

export const FARM_SMITH: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Smithing at the farmsteads, by analogy with Iron Age Britain. Nothing is recorded for this valley.',
    cy: "Gwaith gof yn y ffermydd, ar sail Prydain yn Oes yr Haearn. Does dim wedi'i gofnodi ar gyfer y dyffryn hwn.",
  },
  sources: [src('ironage:S49')],
};

export const CASTLE_WORKS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Smiths and masons: the castles here were built, rebuilt and besieged in the 13th century. The sound of the work is not recorded.',
    cy: 'Gofaint a seiri maen: codwyd, ailgodwyd a gwarchaewyd y cestyll yma yn y 13eg ganrif. Ni chofnodwyd sŵn y gwaith.',
  },
  sources: [src('medieval:S23')],
};

export const VILLAGE_SMITHY: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'A village smithy, by analogy. Little has been researched for this period.',
    cy: 'Gefail pentref, ar sail cymhariaeth. Ychydig o ymchwil sydd wedi bod i’r cyfnod hwn.',
  },
  sources: [],
};

export const FFAIRFACH_SMITHY: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'A smithy at Ffairfach: the Torbay Inn is said to have doubled as a blacksmith’s in the early 1800s. One encyclopedia page says so, and the same page is wrong on the railway dates.',
    cy: "Gefail yn Ffair-fach: dywedir bod Tafarn Torbay hefyd yn efail gof ar ddechrau'r 1800au. Un dudalen gwyddoniadur sy'n dweud hynny, ac mae'r un dudalen yn anghywir am ddyddiadau'r rheilffordd.",
  },
  sources: [src('victorian:S2')],
};

export const FAIRS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Fairs and markets in a small market town. Edward I granted the Bishop of St Davids a fair here in 1290 and again in 1291, held around St Barnabas’s day (11 June), and a Saturday market is recorded by 1326. When this became St Teilo’s Fair in the churchyard is not known.',
    cy: 'Ffeiriau a marchnadoedd mewn tref farchnad fechan. Rhoddodd Edward I ffair yma i Esgob Tyddewi yn 1290 ac eto yn 1291, a gynhelid o gwmpas gŵyl Sant Barnabas (11 Mehefin), ac mae marchnad ddydd Sadwrn wedi’i chofnodi erbyn 1326. Ni wyddys pryd y daeth hon yn Ffair Teilo yn y fynwent.',
  },
  sources: [src('sound:S20')],
};

export const MARKET_TOWN: Provenance = {
  kind: 'documented',
  sources: [src('victorian:S41'), src('victorian:S65')],
  note: {
    en: 'The market in the Shire Hall (built 1802) and a town of 73 shops in 1858 are recorded; the sound of the crowd is not.',
    cy: "Mae'r farchnad yn Neuadd y Sir (codwyd 1802) a thref o 73 o siopau yn 1858 wedi'u cofnodi; nid felly sŵn y dorf.",
  },
};

export const FIRST_PEAL: Provenance = {
  kind: 'documented',
  sources: [src('effects:S7')],
  note: {
    en: 'Bells pealed for the first train on 20 January 1857: the first bells heard at Llandeilo in any source read. No medieval bell is recorded here.',
    cy: "Canwyd clychau i groesawu'r trên cyntaf ar 20 Ionawr 1857: y clychau cyntaf a glywyd yn Llandeilo mewn unrhyw ffynhonnell a ddarllenwyd. Ni chofnodwyd unrhyw gloch ganoloesol yma.",
  },
};

export const BELLS_SINCE: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Bells pealed in the town for the first train in 1857; the report does not say whose, and St Teilo’s is the likely tower. That bells still ring here is assumed, not checked: the bell-ringers’ register could not be read.',
    cy: "Canwyd clychau yn y dref i groesawu'r trên cyntaf yn 1857; nid yw'r adroddiad yn dweud pa rai, ac Eglwys Teilo yw'r tŵr tebygol. Tybir bod clychau'n dal i ganu yma, heb ei wirio: ni ellid darllen cofrestr y clychwyr.",
  },
  sources: [src('effects:S7')],
};

export const FIRST_TRAIN: Provenance = {
  kind: 'documented',
  sources: [src('effects:S7'), src('victorian:S29'), src('victorian:S28')],
  note: {
    en: 'The railway reached Llandeilo on 20 January 1857, the train drawn by two engines. Which engines they were is not recorded; their sound is reconstructed.',
    cy: 'Cyrhaeddodd y rheilffordd Landeilo ar 20 Ionawr 1857, a dwy injan yn tynnu’r trên. Ni chofnodwyd pa injans oedden nhw; ail-grëwyd eu sŵn.',
  },
};

export const GWR_TANKS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Steam trains of the mid 20th century, as photographed on these trains in 1958 to 1960: among them engines whose numbers place them in the Great Western 57xx pannier-tank class. Steam passenger trains ended on 13 June 1964 (one source), and the steam sound ends with them, as the drawn train does. Steam freight engines worked from Llandovery shed until 10 August 1964, and one source says steam on the Llanelly lines ended in 1963. Both photograph pages are by one local historian.',
    cy: 'Trenau stêm canol yr 20fed ganrif, fel y tynnwyd eu lluniau ar y trenau hyn yn 1958 i 1960: yn eu plith injans y mae eu rhifau’n eu gosod yn nosbarth tanciau pannier 57xx y Great Western. Daeth trenau teithwyr stêm i ben ar 13 Mehefin 1964 (un ffynhonnell), a daw sŵn y stêm i ben gyda nhw, fel y trên a ddangosir. Gweithiai injans nwyddau stêm o sied Llanymddyfri hyd 10 Awst 1964, ac mae un ffynhonnell yn dweud i stêm ar leiniau Llanelli ddod i ben yn 1963. Mae’r ddwy dudalen luniau gan yr un hanesydd lleol.',
  },
  sources: [
    src('railwaylater:S2'),
    src('railwaylater:S3'),
    src('railwaylater:S49'),
    src('railwaylater:S1'),
    src('railwaylater:S4'),
    src('railwaylater:S11'),
  ],
};

export const DIESEL_UNITS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Diesel units took over the passenger trains when steam ended on 13 June 1964: two-car diesel rail cars, or three-car Swindon sets (the sources disagree), then Class 153 cars, converted in 1991–92 and seen here by 1994, single or in pairs, and in pairs today. Their engines and horns are synthesised, not recorded here. The Class 153 page is a lead only.',
    cy: 'Cymerodd unedau disel y trenau teithwyr drosodd pan ddaeth stêm i ben ar 13 Mehefin 1964: ceir rheilffordd disel dau gerbyd, neu setiau tri cherbyd o Swindon (mae’r ffynonellau’n anghytuno), yna ceir Dosbarth 153, wedi’u haddasu yn 1991–92 ac i’w gweld yma erbyn 1994, yn sengl neu’n barau, ac yn barau heddiw. Mae sŵn eu peiriannau a’u cyrn wedi’i greu, nid wedi’i recordio yma. Arweiniad yn unig yw’r dudalen am Ddosbarth 153.',
  },
  sources: [
    src('railwaylater:S2'),
    src('railwaylater:S52'),
    src('railwaylater:S1'),
    src('railwaylater:S35'),
    src('railwaylater:S27'),
    src('railwaylater:S39'),
  ],
};

export const MOTOR_TRAFFIC: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Motor traffic through the town. The history of the roads has not been researched.',
    cy: "Traffig modur drwy'r dref. Nid oes ymchwil eto i hanes y ffyrdd.",
  },
  sources: [],
};

export const CLAS_SINGING: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Singing at the clas, the church community of St Teilo here by the 9th century. None of its music survives.',
    cy: "Canu yn y clas, cymuned eglwysig Teilo a oedd yma erbyn y 9fed ganrif. Nid oes dim o'i cherddoriaeth wedi goroesi.",
  },
  sources: [src('medieval:S1')],
};

// A track starts where its first point says, with no fade-in from silence (ADR 0028): bells and the
// train on 20 January 1857, the market at 1600, motor traffic at 1950. A silent point ends a bed.
export const SOUNDSCAPE: Soundscape = {
  wind: [
    heard(bc(12500), 0.8, WIND),
    heard(bc(11500), 0.8, WIND),
    heard(bc(10900), 1, WIND),
    heard(bc(9700), 0.9, WIND),
    heard(bc(9000), 0.55, WIND),
    heard(bc(7000), 0.4, WIND),
    heard(bc(5000), 0.3, WIND),
    heard(bc(3500), 0.3, WIND),
    heard(bc(2000), 0.45, WIND),
    heard(bc(400), 0.55, WIND),
    heard(ad(120), 0.5, WIND),
    heard(ad(800), 0.55, WIND),
    heard(ad(1250), 0.45, WIND),
    heard(ad(1600), 0.45, WIND),
    heard(ad(1850), 0.4, WIND),
    heard(ad(1950), 0.35, WIND),
    heard(ad(2026), 0.35, WIND),
  ],
  river: [
    heard(bc(12500), 0.55, MELTWATER),
    heard(bc(11500), 0.55, MELTWATER),
    heard(bc(10900), 0.5, MELTWATER),
    heard(bc(9700), 0.5, MELTWATER),
    heard(bc(9000), 0.5, TYWI),
  ],
  birds: [
    heard(bc(12500), 0.2, ICE_AGE_BIRDS),
    heard(bc(11500), 0.3, ICE_AGE_BIRDS),
    silent(bc(10900)),
    heard(bc(9700), 0.2, ICE_AGE_BIRDS),
    heard(bc(9000), 0.6, WILDWOOD_BIRDS),
    heard(bc(7000), 0.85, WILDWOOD_BIRDS),
    heard(bc(5000), 1, WILDWOOD_BIRDS),
    heard(bc(3500), 0.9, WILDWOOD_BIRDS),
    heard(bc(2000), 0.8, WILDWOOD_BIRDS),
    heard(bc(400), 0.7, WILDWOOD_BIRDS),
    heard(ad(120), 0.6, WILDWOOD_BIRDS),
    heard(ad(800), 0.6, WILDWOOD_BIRDS),
    heard(ad(1250), 0.6, MEDIEVAL_BIRDS),
    heard(ad(1600), 0.6, FARMLAND_BIRDS),
    heard(ad(1850), 0.5, FARMLAND_BIRDS),
    heard(ad(1950), 0.55, MODERN_BIRDS),
    heard(ad(2026), 0.6, MODERN_BIRDS),
  ],
  forest: [
    heard(bc(9000), 0.6, WOODLAND),
    heard(bc(7000), 0.85, WOODLAND),
    heard(bc(5000), 1, WOODLAND),
    heard(bc(3500), 0.85, WOODLAND),
    heard(bc(2000), 0.6, WOODLAND),
    heard(bc(400), 0.45, WOODLAND),
    heard(ad(120), 0.4, WOODLAND),
    heard(ad(800), 0.35, WOODLAND),
    heard(ad(1250), 0.3, WOODLAND),
    heard(ad(1600), 0.25, WOODLAND),
    heard(ad(1850), 0.2, WOODLAND),
    heard(ad(1950), 0.2, WOODLAND),
    heard(ad(2026), 0.25, WOODLAND),
  ],
  livestock: [
    heard(bc(4000), 0.05, FIRST_FARMERS),
    heard(bc(3500), 0.1, FIRST_FARMERS),
    heard(bc(2000), 0.25, FIRST_FARMERS),
    heard(bc(400), 0.4, FARMSTEAD),
    heard(ad(120), 0.45, FARMSTEAD),
    heard(ad(800), 0.5, FARMSTEAD),
    heard(ad(1250), 0.55, GERALD_HERDS),
    heard(ad(1600), 0.6, GERALD_HERDS),
    heard(ad(1850), 0.6, DROVERS),
    heard(ad(1950), 0.5, MODERN_FARMS),
    heard(ad(2026), 0.45, MODERN_FARMS),
  ],
  forge: [
    heard(bc(400), 0.15, FARM_SMITH),
    heard(ad(120), 0.2, FARM_SMITH),
    silent(ad(800)),
    heard(ad(1250), 0.35, CASTLE_WORKS),
    heard(ad(1600), 0.3, VILLAGE_SMITHY),
    heard(ad(1850), 0.4, FFAIRFACH_SMITHY),
    silent(ad(1950)),
  ],
  bells: [
    heard(ad(1857), 0.5, FIRST_PEAL),
    heard(ad(1950), 0.35, BELLS_SINCE),
    heard(ad(2026), 0.25, BELLS_SINCE),
  ],
  market: [heard(ad(1600), 0.4, FAIRS), heard(ad(1850), 0.55, MARKET_TOWN), silent(ad(1950))],
  // Steam stops at the instant the drawn train turns diesel: a heard point and a silent one at the
  // same year are a cut, not a fade.
  train: [
    heard(ad(1857), 0.5, FIRST_TRAIN),
    heard(ad(1950), 0.3, GWR_TANKS),
    heard(END_OF_STEAM, 0.3, GWR_TANKS),
    silent(END_OF_STEAM),
  ],
  railcar: [heard(END_OF_STEAM, 0.3, DIESEL_UNITS), heard(ad(2026), 0.3, DIESEL_UNITS)],
  traffic: [heard(ad(1950), 0.3, MOTOR_TRAFFIC), heard(ad(2026), 0.45, MOTOR_TRAFFIC)],
  chant: [heard(ad(800), 0.25, CLAS_SINGING), silent(ad(1250))],
};

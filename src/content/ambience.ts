import type { BedLevel } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { src } from './ids.ts';

// Why each ambient sound bed is heard. The research is docs/research/soundscapes.md and
// event-effects.md. Sound itself almost never survives, so a bed is at best documented in its
// source (the river, the train, the bells) and its loudness is always chosen by ear.

export const bed = (level: number, provenance: Provenance): BedLevel => ({ level, provenance });

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
    en: 'A loud, braided meltwater river in the cold of the Late Ice Age.',
    cy: 'Afon ddŵr tawdd swnllyd, aml-sianel, yn oerfel diwedd Oes yr Iâ.',
  },
  sources: [src('deeptime:S8')],
};

export const TYWI: Provenance = {
  kind: 'documented',
  sources: [src('deeptime:S40')],
  note: {
    en: 'The Tywi and its wide floodplain are documented; how loud the river sounds is chosen by ear.',
    cy: "Mae afon Tywi a'i gorlifdir llydan wedi'u cofnodi; dewiswyd pa mor uchel yw sŵn yr afon â'r glust.",
  },
};

export const ICE_AGE_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'A few open-country birds: black grouse, golden eagle and chough are known from Late Ice Age bones in Welsh caves, none inside the 10 miles.',
    cy: "Ychydig o adar tir agored: mae'r rugiar ddu, yr eryr euraid a'r frân goesgoch yn hysbys o esgyrn diwedd Oes yr Iâ mewn ogofâu yng Nghymru, ond dim un o fewn y 10 milltir.",
  },
  sources: [src('sound:S1')],
};

export const WILDWOOD_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Woodland birds much like today’s, as the 43 species among the bones at Port Eynon on Gower show; cranes were common on the wetlands.',
    cy: 'Adar coetir tebyg iawn i rai heddiw, fel y dengys y 43 rhywogaeth ymhlith yr esgyrn ym Mhorth Einon ar Benrhyn Gŵyr; roedd garanod yn gyffredin ar y gwlyptiroedd.',
  },
  sources: [src('sound:S1')],
};

export const MEDIEVAL_BIRDS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The birds of medieval Welsh poetry and law: skylark, thrush, cuckoo, the owl at night, crane and bittern. Recorded for Wales, not for this valley.',
    cy: "Adar barddoniaeth a chyfraith Cymru'r Oesoedd Canol: yr ehedydd, y fronfraith, y gog, y dylluan liw nos, y garan a'r aderyn bwn. Wedi'u cofnodi i Gymru, nid i'r dyffryn hwn.",
  },
  sources: [src('sound:S1'), src('sound:S4'), src('sound:S5'), src('sound:S9')],
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
    en: 'Cattle, sheep and pigs came to Britain with the first farmers around 4000 BC.',
    cy: "Daeth gwartheg, defaid a moch i Brydain gyda'r ffermwyr cyntaf tua 4000 CC.",
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
    en: 'Herds and dairy everywhere, and ploughing with teams of four oxen, as Gerald of Wales described the whole country in 1188. Not recorded for this valley.',
    cy: "Gyrroedd a llaeth ym mhobman, ac aredig â gwedd o bedwar ych, fel y disgrifiodd Gerallt Gymro'r wlad gyfan yn 1188. Heb ei gofnodi ar gyfer y dyffryn hwn.",
  },
  sources: [src('sound:S3')],
};

export const DROVERS: Provenance = {
  kind: 'documented',
  sources: [src('victorian:S37'), src('victorian:S2')],
  note: {
    en: 'Drovers’ herds on the roads and the Ffairfach cattle fair of 22 November are recorded.',
    cy: "Mae gyrroedd y porthmyn ar y ffyrdd a ffair wartheg Ffair-fach ar 22 Tachwedd wedi'u cofnodi.",
  },
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
  kind: 'documented',
  sources: [src('victorian:S2')],
  note: {
    en: 'The Torbay Inn at Ffairfach doubled as a blacksmith’s in the early 1800s (one source).',
    cy: "Roedd Tafarn Torbay yn Ffair-fach hefyd yn efail gof ar ddechrau'r 1800au (un ffynhonnell).",
  },
};

export const FAIRS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'Fairs and markets in a small market town. St Teilo’s Fair in the churchyard is said to date from 1291, which no source read here confirms.',
    cy: "Ffeiriau a marchnadoedd mewn tref farchnad fechan. Dywedir bod Ffair Teilo yn y fynwent yn dyddio o 1291, ond nid yw'r un ffynhonnell a ddarllenwyd yma yn cadarnhau hynny.",
  },
  sources: [],
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
    en: 'St Teilo’s had bells by 1857. That they still ring is assumed, not checked: the bell-ringers’ register could not be read.',
    cy: 'Roedd clychau yn Eglwys Teilo erbyn 1857. Tybir eu bod yn dal i ganu, heb ei wirio: ni ellid darllen cofrestr y clychwyr.',
  },
  sources: [src('effects:S7')],
};

export const FIRST_TRAIN: Provenance = {
  kind: 'documented',
  sources: [src('effects:S7'), src('railway:S1')],
  note: {
    en: 'The railway reached Llandeilo on 20 January 1857. The engines’ type is recorded; their sound is reconstructed.',
    cy: 'Cyrhaeddodd y rheilffordd Landeilo ar 20 Ionawr 1857. Cofnodwyd math yr injans; ail-grëwyd eu sŵn.',
  },
};

export const PANNIER_TANKS: Provenance = {
  kind: 'documented',
  sources: [src('railwaylater:S2')],
  note: {
    en: 'Great Western pannier tank engines worked the local trains in 1958 to 1960.',
    cy: "Injans tanc pannier y Great Western oedd yn tynnu'r trenau lleol yn 1958 i 1960.",
  },
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

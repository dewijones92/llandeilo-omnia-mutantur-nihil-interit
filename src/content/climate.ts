import type { ClimateKey } from '../domain/climate.ts';
import type { Provenance } from '../domain/provenance.ts';
import { ad, bc } from '../domain/time.ts';
import { src } from './ids.ts';

const INTERSTADIAL: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The Late Glacial interstadial, c.12,700–10,900 BC in calendar years. At Llanilid in south Wales its early part was the warmest, with July temperatures around 20°C and juniper scrub, before cooling steps, the second about 11,150 BC, cut back the juniper and then the birch.',
    cy: 'Cyfnod mwyn diwedd Oes yr Iâ, tua 12,700–10,900 CC mewn blynyddoedd calendr. Yn Llanilid yn ne Cymru, ei ran gynnar oedd y gynhesaf, gyda thymheredd mis Gorffennaf tua 20°C a phrysgwydd meryw, cyn i gamau oeri, yr ail tua 11,150 CC, gwtogi’r ferywen ac yna’r fedwen.',
  },
  sources: [src('deeptime:S47'), src('deeptime:S48'), src('deeptime:S10'), src('deeptime:S8')],
};

const YOUNGER_DRYAS: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The Younger Dryas (Loch Lomond Stadial), c.10,900–9,700 BC: 2–6°C colder, glaciers back in the high cwms.',
    cy: 'Y Dryas Diweddar (Stadial Loch Lomond), tua 10,900–9,700 CC: 2–6°C yn oerach, rhewlifoedd yn ôl yn y cymoedd uchel.',
  },
  sources: [src('deeptime:S8'), src('deeptime:S1')],
};

const HOLOCENE_WARMING: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'After c.9700 BC the climate warmed within decades, and woodland slowly closed in.',
    cy: 'Ar ôl tua 9700 CC cynhesodd yr hinsawdd o fewn degawdau, a chaeodd y coetir yn araf dros y tir.',
  },
  sources: [src('deeptime:S10'), src('deeptime:S8')],
};

const HOLOCENE_OPTIMUM: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The Holocene warm period, c.7550–3550 BC, peaking c.6000 BC. No Welsh data, so kept gentle.',
    cy: 'Cyfnod cynnes yr Holosen, tua 7550–3550 CC, ar ei anterth tua 6000 CC. Dim data o Gymru, felly yn ysgafn.',
  },
  sources: [src('deeptime:S41')],
};

const MEDIEVAL_WARM: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The Medieval Warm Period, c.950–1250, in western Europe. No Welsh data, so kept gentle.',
    cy: 'Cyfnod Cynnes yr Oesoedd Canol, tua 950–1250, yng ngorllewin Ewrop. Dim data o Gymru, felly yn ysgafn.',
  },
  sources: [src('deeptime:S15')],
};

const LITTLE_ICE_AGE: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'The Little Ice Age, 16th to 19th centuries. No Welsh data, so kept gentle.',
    cy: 'Oes yr Iâ Fach, yr 16eg i’r 19eg ganrif. Dim data o Gymru, felly yn ysgafn.',
  },
  sources: [src('deeptime:S16')],
};

const NEUTRAL: Provenance = {
  kind: 'reconstructed',
  basis: {
    en: 'No shift in climate is modelled for this time.',
    cy: 'Dim newid yn yr hinsawdd wedi’i fodelu ar gyfer yr adeg hon.',
  },
  sources: [],
};

export const CLIMATE: readonly ClimateKey[] = [
  { year: bc(12500), chill: 0.25, provenance: INTERSTADIAL },
  { year: bc(11000), chill: 0.7, provenance: INTERSTADIAL },
  { year: bc(10900), chill: 1, provenance: YOUNGER_DRYAS },
  { year: bc(9700), chill: 0.9, provenance: YOUNGER_DRYAS },
  { year: bc(9000), chill: 0.2, provenance: HOLOCENE_WARMING },
  { year: bc(6000), chill: -0.35, provenance: HOLOCENE_OPTIMUM },
  { year: bc(3550), chill: -0.1, provenance: HOLOCENE_OPTIMUM },
  { year: ad(800), chill: 0, provenance: NEUTRAL },
  { year: ad(1000), chill: -0.3, provenance: MEDIEVAL_WARM },
  { year: ad(1250), chill: -0.25, provenance: MEDIEVAL_WARM },
  { year: ad(1400), chill: 0.05, provenance: NEUTRAL },
  { year: ad(1550), chill: 0.45, provenance: LITTLE_ICE_AGE },
  { year: ad(1820), chill: 0.45, provenance: LITTLE_ICE_AGE },
  { year: ad(1900), chill: 0.15, provenance: LITTLE_ICE_AGE },
  { year: ad(1990), chill: 0, provenance: NEUTRAL },
  { year: ad(2026), chill: 0, provenance: NEUTRAL },
];

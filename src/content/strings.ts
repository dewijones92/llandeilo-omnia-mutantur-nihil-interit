import type { Bilingual } from '../domain/i18n.ts';

export const STRINGS = {
  title: { en: 'Llandeilo', cy: 'Llandeilo' },
  subtitle: {
    en: 'Ten miles around, through all of time',
    cy: "Deg milltir o'i chwmpas, drwy'r holl oesoedd",
  },
  loading: { en: 'Raising the Tywi valley…', cy: 'Codi Dyffryn Tywi…' },
  loadingFailed: {
    en: 'Something went wrong loading the valley.',
    cy: "Aeth rhywbeth o'i le wrth lwytho'r dyffryn.",
  },
  timeline: { en: 'Timeline', cy: 'Llinell amser' },
  sliderHint: {
    en: 'Drag through time. Let go near a marked date to jump to it.',
    cy: 'Llusgwch drwy amser. Gollyngwch ger dyddiad i neidio ato.',
  },
  documented: { en: 'Documented', cy: 'Wedi’i gofnodi' },
  reconstructed: { en: 'Reconstructed', cy: 'Wedi’i ail-greu' },
  imagined: { en: 'Imagined', cy: 'Dychmygol' },
  documentedHelp: {
    en: 'Recorded in historical or archaeological sources.',
    cy: 'Wedi’i gofnodi mewn ffynonellau hanesyddol neu archaeolegol.',
  },
  reconstructedHelp: {
    en: 'Inferred from archaeology or comparison with similar places. Not directly recorded here.',
    cy: 'Wedi’i gasglu o archaeoleg neu gymharu â llefydd tebyg. Heb ei gofnodi’n uniongyrchol yma.',
  },
  imaginedHelp: {
    en: 'Invented to fill a gap in the record. Not factual, but grounded in what we know.',
    cy: 'Wedi’i ddyfeisio i lenwi bwlch yn y cofnod. Nid yw’n ffeithiol, ond mae’n seiliedig ar yr hyn a wyddom.',
  },
  basedOn: { en: 'Based on', cy: 'Yn seiliedig ar' },
  sources: { en: 'Sources', cy: 'Ffynonellau' },
  soundOn: { en: 'Sound on', cy: 'Sain ymlaen' },
  soundOff: { en: 'Sound off', cy: 'Sain i ffwrdd' },
  about: { en: 'About', cy: 'Ynghylch' },
  almanac: { en: 'Almanac', cy: 'Almanac' },
  language: { en: 'Language', cy: 'Iaith' },
  nothingRecorded: {
    en: 'Nothing recorded for this moment yet.',
    cy: 'Dim wedi’i gofnodi ar gyfer yr adeg hon eto.',
  },
  close: { en: 'Close', cy: 'Cau' },
  play: { en: 'Play', cy: 'Chwarae' },
  flyTo: { en: 'Visit', cy: 'Ymweld' },
  todayName: { en: 'today', cy: 'heddiw' },
  playAll: { en: 'Play conversation', cy: 'Chwarae’r sgwrs' },
  conversation: { en: 'Conversation', cy: 'Sgwrs' },
  imaginedBecause: { en: 'Imagined. Based on', cy: 'Dychmygol. Yn seiliedig ar' },
  keyDates: { en: 'key dates', cy: 'dyddiad allweddol' },
  featuresCount: { en: 'places and buildings through time', cy: 'lle ac adeilad drwy amser' },
  sourcesCount: { en: 'research sources', cy: 'ffynhonnell ymchwil' },
  voicesCredit: {
    en: 'Voices are Microsoft neural text-to-speech (via edge-tts). A modern voice reading an old language is an approximation.',
    cy: 'Lleisiau testun-i-leferydd niwral Microsoft (drwy edge-tts). Brasamcan yw llais modern yn darllen hen iaith.',
  },
  soundCredit: {
    en: 'Ambient sound is generated in your browser, reconstructed from what the research says happened in each era.',
    cy: "Mae'r sain gefndir yn cael ei chreu yn eich porwr, wedi'i hail-greu o'r hyn y mae'r ymchwil yn ei ddweud am bob oes.",
  },
  researchLink: {
    en: 'Read the research, sources and method',
    cy: "Darllen yr ymchwil, y ffynonellau a'r dull",
  },
  family: { en: 'the family', cy: 'y teulu' },
  aboutLanguage: { en: 'About the language:', cy: 'Am yr iaith:' },
  overview: { en: 'Whole valley', cy: 'Y dyffryn cyfan' },
  aboutBody: {
    en: 'A diorama of the real landscape within ten miles of Llandeilo, built from Ordnance Survey height data (hills are exaggerated 2.4 times so they read at this scale). Move the slider to travel through time. Every item is labelled: documented, reconstructed, or imagined. Hover or tap a label to see why, and the sources.',
    cy: "Diorama o'r tirwedd go iawn o fewn deg milltir i Landeilo, wedi'i adeiladu o ddata uchder yr Arolwg Ordnans (mae'r bryniau wedi'u gorliwio 2.4 gwaith er mwyn eu gweld ar y raddfa hon). Symudwch y llithrydd i deithio drwy amser. Mae label ar bopeth: wedi'i gofnodi, wedi'i ail-greu, neu ddychmygol. Hofran neu dapio label i weld pam, a'r ffynonellau.",
  },
  credits: { en: 'Credits and licences', cy: 'Cydnabyddiaeth a thrwyddedau' },
} as const satisfies Record<string, Bilingual>;

export type StringKey = keyof typeof STRINGS;

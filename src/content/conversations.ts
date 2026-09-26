import type { Conversation, Line, LanguageCode, PersonId } from '../domain/model.ts';
import { ad, bc, range } from '../domain/time.ts';
import { conversationId, personId, placeId, src, type SourceKey } from './ids.ts';

const line = (
  speaker: string,
  language: LanguageCode,
  spoken: string,
  en: string,
  cy: string,
  quote?: { en: string; cy: string },
): Line => ({
  speaker: personId(speaker),
  language,
  spoken,
  translation: { en, cy },
  ...(quote ? { quote } : {}),
});

const imagined = (en: string, cy: string, keys: readonly SourceKey[]): Conversation['provenance'] => ({
  kind: 'imagined',
  groundedIn: { en, cy },
  sources: keys.map(src),
});

const people = (...ids: string[]): readonly PersonId[] => ids.map(personId);

const STAND_IN_WELSH = (period: string, periodCy: string): { en: string; cy: string } => ({
  en: `They spoke ${period}. It is shown here in modern Welsh as a stand-in, with a modern Welsh voice.`,
  cy: `Roedden nhw'n siarad ${periodCy}. Mae'n cael ei ddangos yma mewn Cymraeg modern yn ei le, gyda llais Cymraeg modern.`,
});

export const CONVERSATIONS: readonly Conversation[] = [
  {
    id: conversationId('spelt-harvest'),
    when: range(bc(400), bc(60)),
    place: placeId('garn-goch'),
    at: { e: 269060, n: 224250 },
    setIn: { en: 'Harvest, about 150 BC', cy: 'Cynhaeaf, tua 150 CC' },
    title: { en: 'Bringing in the spelt', cy: "Casglu'r sbelt" },
    people: people('bran', 'ellyw'),
    lines: [
      line(
        'ellyw',
        'welsh',
        "Mae'r sbelt yn barod, Nhad. Fe gawn ni ei falu ar y maen newydd.",
        'The spelt is ready, Father. We can grind it on the new quernstone.',
        "Mae'r sbelt yn barod, Nhad. Fe gawn ni ei falu ar y maen newydd.",
      ),
      line(
        'bran',
        'welsh',
        "Da iawn. Ond cadw'r gwartheg o'r cae nes bydd y cyfan i mewn.",
        "Good. But keep the cattle out of the field until it's all in.",
        "Da iawn. Ond cadw'r gwartheg o'r cae nes bydd y cyfan i mewn.",
      ),
      line(
        'ellyw',
        'welsh',
        'Pryd fyddan nhw’n gorffen y gaer fach, dwedwch?',
        'When will they finish the little fort, do you think?',
        'Pryd fyddan nhw’n gorffen y gaer fach, dwedwch?',
      ),
      line(
        'bran',
        'welsh',
        'Pwy a ŵyr. Dechrau sy’n hawdd; gorffen sy’n anodd.',
        'Who knows. Starting is easy; finishing is hard.',
        'Pwy a ŵyr. Dechrau sy’n hawdd; gorffen sy’n anodd.',
      ),
    ],
    provenance: imagined(
      'Spelt and cattle were staples of Iron Age Wales, rotary querns were in use from about 400 BC, and Y Gaer Fach next door was left unfinished part way through a rebuild. The people and their words are invented.',
      "Roedd sbelt a gwartheg yn hanfodol yng Nghymru Oes yr Haearn, roedd breuanau cylchdro yn cael eu defnyddio o tua 400 CC, a gadawyd Y Gaer Fach drws nesaf heb ei gorffen. Mae'r bobl a'u geiriau wedi'u dyfeisio.",
      ['ironage:S27', 'ironage:S38', 'ironage:S2'],
    ),
    languageNote: {
      en: 'Nobody knows exactly how their language, Brittonic, sounded: no sentence of it survives. It is shown in modern Welsh, its descendant.',
      cy: "Does neb yn gwybod yn union sut roedd eu hiaith, y Frythoneg, yn swnio: does dim brawddeg ohoni wedi goroesi. Mae'n cael ei dangos mewn Cymraeg modern, ei disgynnydd.",
    },
  },
  {
    id: conversationId('at-the-fort'),
    when: range(ad(76), ad(125)),
    place: placeId('roman-forts'),
    at: { e: 262280, n: 222450 },
    setIn: { en: 'Outside the Roman fort, about AD 80', cy: 'Y tu allan i’r gaer Rufeinig, tua 80 OC' },
    title: { en: 'Selling grain to the garrison', cy: "Gwerthu grawn i'r garsiwn" },
    people: people('marcus', 'ceri'),
    lines: [
      line(
        'marcus',
        'latin',
        'Salve! Quanti frumentum vendis?',
        'Hello! How much for the grain?',
        'Helo! Faint am y grawn?',
      ),
      line(
        'ceri',
        'welsh',
        "Mwy nag y buoch chi'n ei gynnig ddoe.",
        'More than you offered yesterday.',
        "Mwy nag y buoch chi'n ei gynnig ddoe.",
      ),
      line(
        'marcus',
        'latin',
        'Hic semper pluit. Quomodo vivitis?',
        'It always rains here. How do you live?',
        "Mae hi'n bwrw glaw o hyd yma. Sut ydych chi'n byw?",
      ),
      line(
        'ceri',
        'welsh',
        "Yn sych, o dan do gwellt da. Dewch â'r arian.",
        'Dry, under a good thatched roof. Bring the money.',
        "Yn sych, o dan do gwellt da. Dewch â'r arian.",
      ),
    ],
    provenance: imagined(
      'Two Roman forts stood here, with a civilian settlement by one gate. The Demetae minted no coins of their own. The scene and words are invented.',
      "Roedd dwy gaer Rufeinig yma, gydag anheddiad sifil wrth un porth. Nid oedd y Demetae yn bathu eu harian eu hunain. Mae'r olygfa a'r geiriau wedi'u dyfeisio.",
      ['ironage:S14', 'ironage:S15', 'ironage:S40'],
    ),
    languageNote: {
      en: 'The soldier speaks Latin, read by a modern Italian voice in church-style pronunciation (Romans said it differently). The woman speaks Brittonic, shown in modern Welsh because none of it survives.',
      cy: "Mae'r milwr yn siarad Lladin, wedi'i darllen gan lais Eidaleg modern yn null yr eglwys (roedd y Rhufeiniaid yn ei dweud yn wahanol). Mae'r wraig yn siarad Brythoneg, wedi'i dangos mewn Cymraeg modern.",
    },
  },
  {
    id: conversationId('news-of-the-ambush'),
    when: range(ad(1276), ad(1290)),
    place: placeId('llandeilo'),
    at: { e: 262930, n: 222420 },
    setIn: { en: 'Llandeilo Fawr, June 1282', cy: 'Llandeilo Fawr, Mehefin 1282' },
    title: { en: 'News of the ambush', cy: 'Newyddion am y rhagod' },
    people: people('ieuan', 'gwenllian', 'priest', 'bard'),
    lines: [
      line(
        'ieuan',
        'middle-welsh',
        "Mam! Mae'r Saeson wedi'u dal ger y dref. Maen nhw'n dweud bod arglwydd wedi'i ladd.",
        'Mam! The English were caught near the town. They say a lord was killed.',
        "Mam! Mae'r Saeson wedi'u dal ger y dref. Maen nhw'n dweud bod arglwydd wedi'i ladd.",
      ),
      line(
        'gwenllian',
        'middle-welsh',
        'Tawel, fachgen. Pwy ddywedodd? Welaist ti fe dy hun?',
        'Quiet, boy. Who told you? Did you see it yourself?',
        'Tawel, fachgen. Pwy ddywedodd? Welaist ti fe dy hun?',
      ),
      line(
        'ieuan',
        'middle-welsh',
        'Naddo. Dim ond y mwg dros Garreg Cennen.',
        'No. Only the smoke over Carreg Cennen.',
        'Naddo. Dim ond y mwg dros Garreg Cennen.',
      ),
      line(
        'gwenllian',
        'middle-welsh',
        'Yna paid â gweiddi enwau. Does neb yn gwybod pwy arweiniodd y dynion.',
        "Then don't go shouting names. Nobody knows who led the men.",
        'Yna paid â gweiddi enwau. Does neb yn gwybod pwy arweiniodd y dynion.',
      ),
      line('priest', 'latin', 'Pax vobiscum.', 'Peace be with you.', 'Tangnefedd i chi.'),
      line(
        'bard',
        'middle-welsh',
        "Tra fuam yn saith, trisaith ni'n beiddai.",
        'While we were seven, thrice seven would not dare face us.',
        'Tra buom yn saith, ni feiddiai tri saith ein herbyn.',
        {
          en: 'A real line: Peryf ap Cedifor’s elegy of about 1170, sung here by an invented poet.',
          cy: 'Llinell go iawn: marwnad Peryf ap Cedifor o tua 1170, yn cael ei chanu yma gan fardd dychmygol.',
        },
      ),
    ],
    provenance: imagined(
      'In June 1282 an English force returning from sacking Carreg Cennen was ambushed near Llandeilo and William de Valence the younger was killed. No chronicle names the Welsh leader. The family, priest and poet are invented; only the poem line is real.',
      "Ym mis Mehefin 1282 ymosodwyd ar lu Seisnig ger Llandeilo ar ei ffordd yn ôl o ysbeilio Carreg Cennen. Nid yw'r un cronicl yn enwi arweinydd y Cymry. Mae'r teulu, yr offeiriad a'r bardd wedi'u dyfeisio; dim ond llinell y gerdd sy'n go iawn.",
      ['medieval:S27', 'medieval:S28', 'medieval:S29', 'language:S10'],
    ),
    languageNote: STAND_IN_WELSH(
      'Middle Welsh, which a Welsh speaker today can mostly follow',
      'Cymraeg Canol, y gall siaradwr Cymraeg heddiw ei deall gan mwyaf',
    ),
  },
  {
    id: conversationId('three-tollgates'),
    when: range(ad(1839), ad(1848)),
    place: placeId('llandeilo'),
    at: { e: 262700, n: 222150 },
    setIn: { en: 'The Carmarthen road, August 1843', cy: 'Ffordd Caerfyrddin, Awst 1843' },
    title: { en: 'Three tollgates', cy: 'Tair gât dyrpeg' },
    people: people('dafydd', 'mari', 'agent'),
    lines: [
      line(
        'dafydd',
        'welsh',
        "Tair gât dyrpeg rhwng fan hyn a'r odynau calch. Tair!",
        'Three turnpike gates between here and the lime kilns. Three!',
        "Tair gât dyrpeg rhwng fan hyn a'r odynau calch. Tair!",
      ),
      line(
        'mari',
        'welsh',
        "A'r tollau'n bwyta bron traean o bris y calch, medden nhw.",
        'And the tolls eating nearly a third of the price of the lime, they say.',
        "A'r tollau'n bwyta bron traean o bris y calch, medden nhw.",
      ),
      line(
        'dafydd',
        'welsh',
        "Glywaist ti'r newyddion? Mae Beca wedi bod wrth y Walk Gate.",
        'Have you heard? Rebecca has been at the Walk Gate.',
        "Glywaist ti'r newyddion? Mae Beca wedi bod wrth y Walk Gate.",
      ),
      line(
        'mari',
        'welsh',
        "Taw! Mae'r dragwniaid yn y Cawdor Arms.",
        'Hush! The dragoons are at the Cawdor Arms.',
        "Taw! Mae'r dragwniaid yn y Cawdor Arms.",
      ),
      line(
        'agent',
        'english',
        'Good day to you both. The rent is due at Michaelmas, as ever.',
        'Good day to you both. The rent is due at Michaelmas, as ever.',
        "Dydd da i chi'ch dau. Mae'r rhent yn ddyledus ar Ŵyl Fihangel, fel arfer.",
      ),
      line('dafydd', 'welsh', 'Fel arfer.', 'As ever.', 'Fel arfer.'),
    ],
    provenance: imagined(
      'Llandeilo lime farmers crossed three turnpike trusts, with tolls reported at 30% of the cost of the lime; the Walk Gate on the Carmarthen road was destroyed in August 1843; dragoons were billeted at the Cawdor Arms during the unrest (exactly when they arrived is not known). The couple, the agent and their words are invented.',
      "Croesai ffermwyr calch Llandeilo dair ymddiriedolaeth dyrpeg, gyda'r tollau'n 30% o gost y calch; dinistriwyd Gât y Walk yn Awst 1843; lletywyd dragwniaid yn y Cawdor Arms yn ystod yr helynt (ni wyddys pryd yn union y cyrhaeddon nhw). Mae'r cwpl, yr asiant a'u geiriau wedi'u dyfeisio.",
      ['victorian:S7', 'victorian:S8', 'victorian:S9', 'victorian:S16'],
    ),
    languageNote: {
      en: 'Tenant farmers spoke Welsh; landlords and their agents did business in English. The Welsh is modern, which is close to how they spoke.',
      cy: "Roedd tenantiaid yn siarad Cymraeg; roedd landlordiaid a'u hasiantiaid yn gwneud busnes yn Saesneg. Cymraeg modern sydd yma, sy'n agos at sut roedden nhw'n siarad.",
    },
  },
  {
    id: conversationId('first-trains'),
    when: range(ad(1857), ad(1880)),
    place: placeId('llandeilo'),
    at: { e: 263240, n: 222330 },
    setIn: { en: 'Llandeilo station, 1860s', cy: 'Gorsaf Llandeilo, yr 1860au' },
    title: { en: 'The train from Llanelli', cy: 'Y trên o Lanelli' },
    people: people('elen', 'mari-elder'),
    lines: [
      line(
        'elen',
        'welsh',
        "Mam-gu, edrychwch! Mae'r trên yn dod o Lanelli.",
        'Grandma, look! The train is coming from Llanelli.',
        "Mam-gu, edrychwch! Mae'r trên yn dod o Lanelli.",
      ),
      line(
        'mari-elder',
        'welsh',
        'Pan o’n i’n ferch, ceffyl a chert oedd y cyfan.',
        'When I was a girl, it was all horse and cart.',
        'Pan o’n i’n ferch, ceffyl a chert oedd y cyfan.',
      ),
      line(
        'elen',
        'welsh',
        "Yn yr ysgol maen nhw'n dweud bod rhaid siarad Saesneg.",
        'At school they say we have to speak English.',
        "Yn yr ysgol maen nhw'n dweud bod rhaid siarad Saesneg.",
      ),
      line(
        'mari-elder',
        'welsh',
        "Siarad di Saesneg yn yr ysgol, 'merch i. Gartref, Cymraeg.",
        'Speak English at school, my girl. At home, Welsh.',
        "Siarad di Saesneg yn yr ysgol, 'merch i. Gartref, Cymraeg.",
      ),
    ],
    provenance: imagined(
      'The Llanelly Railway reached Llandeilo in 1857. Victorian schools pressed children towards English; some Welsh schools used the Welsh Not, though no case is recorded at Llandeilo and how widely it was used is debated. The family and their words are invented.',
      "Cyrhaeddodd Rheilffordd Llanelli Landeilo yn 1857. Roedd ysgolion Fictoraidd yn gwthio plant tuag at Saesneg; roedd rhai ysgolion Cymreig yn defnyddio'r Welsh Not, er nad oes achos wedi'i gofnodi yn Llandeilo ac mae dadl ynghylch pa mor eang y'i defnyddiwyd. Mae'r teulu a'u geiriau wedi'u dyfeisio.",
      ['victorian:S29', 'victorian:S18', 'victorian:S49'],
    ),
  },
  {
    id: conversationId('history-project'),
    when: range(ad(2000), ad(2026)),
    place: placeId('llandeilo'),
    at: { e: 262790, n: 222060 },
    setIn: { en: 'Llandeilo Bridge, today', cy: 'Pont Llandeilo, heddiw' },
    title: { en: 'A history project', cy: 'Prosiect hanes' },
    people: people('nia', 'osian'),
    lines: [
      line(
        'nia',
        'welsh',
        "Shwmae, bach! Ble ti'n mynd?",
        'Hiya, love! Where are you off to?',
        "Shwmae, bach! Ble ti'n mynd?",
      ),
      line(
        'osian',
        'welsh',
        "Lan i Ddinefwr. Mae prosiect hanes 'da fi.",
        "Up to Dinefwr. I've got a history project.",
        "Lan i Ddinefwr. Mae prosiect hanes 'da fi.",
      ),
      line(
        'nia',
        'welsh',
        "Cer i weld y gwartheg gwynion. A'r castell.",
        'Go and see the white cattle. And the castle.',
        "Cer i weld y gwartheg gwynion. A'r castell.",
      ),
      line(
        'osian',
        'welsh',
        "A'r caerau Rhufeinig! Doedd neb yn gwybod amdanyn nhw tan 2003.",
        'And the Roman forts! Nobody knew about them until 2003.',
        "A'r caerau Rhufeinig! Doedd neb yn gwybod amdanyn nhw tan 2003.",
      ),
    ],
    provenance: imagined(
      'About half of people in Llandeilo speak Welsh (50.3% in 2011), and "shwmae" is the south Wales greeting. Dinefwr keeps White Park cattle, and its Roman forts were found in 2003. The family is invented.',
      "Mae tua hanner pobl Llandeilo yn siarad Cymraeg (50.3% yn 2011), a “shwmae” yw cyfarchiad y de. Mae gwartheg gwynion yn Ninefwr, a darganfuwyd y caerau Rhufeinig yn 2003. Mae'r teulu wedi'i ddyfeisio.",
      ['language:S23', 'deeptime:S35', 'timeline:S15'],
    ),
  },
];

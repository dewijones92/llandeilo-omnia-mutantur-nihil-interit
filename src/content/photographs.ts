import type { GridRef } from '../domain/model.ts';
import type { Provenance } from '../domain/provenance.ts';
import { src } from './ids.ts';

export type PhotoPlacement =
  | {
      readonly kind: 'placed';
      readonly at: GridRef;
      readonly accuracyM: number;
      readonly basis: 'documented' | 'reconstructed';
      readonly note: string;
    }
  | { readonly kind: 'unplaced'; readonly reason: string };

export interface Photograph {
  readonly id: string;
  readonly file: string;
  readonly title: string;
  readonly dated: string;
  readonly from: number;
  readonly to: number;
  readonly dateNote: string;
  readonly creator: string;
  readonly credit: string;
  readonly catalogueId: string;
  readonly catalogueUrl: string;
  readonly shows: string;
  readonly where: string;
  readonly status: 'ok' | 'miscaptioned';
  readonly placement: PhotoPlacement;
}

export const PHOTOGRAPH_PROVENANCE: Provenance = {
  kind: 'documented',
  sources: [src('harries:S4'), src('harries:S5')],
};

export const HARRIES_PHOTOGRAPHS: readonly Photograph[] = [
  {
    id: 'harries-2281901',
    file: 'photos/harries/2281901.jpg',
    title: 'A photograph of St Teilo Church in the snow, Llandeilo, c. 1910',
    dated: 'after 1918 (caption c. 1910)',
    from: 1918,
    to: 1930,
    dateNote:
      'Corrected 2026-10-09 (independent check): the caption says c. 1910, but a cinema poster in the picture reads “Charles Chaplin in Shoulder Arms”, a film released on 20 October 1918, so the photograph is no earlier than late 1918. The women’s cloche hats point to the 1920s; the upper limit of 1930 is a judgement from the hats, not a source.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2281901',
    catalogueId: 'PCW 2281901',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2281901',
    shows:
      'A snow-covered road beside the churchyard wall, two men in long dark coats and caps (uniforms) standing in front of a large tree, the church tower behind, three people at the gate. A cinema poster on the right reads “Charles Chaplin in Shoulder Arms” (a film of October 1918); the women wear cloche hats. (Corrected 2026-10-09 (independent check): the poster and hats were not read before.)',
    where: "Beside St Teilo's church, Llandeilo",
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262927, n: 222238 },
      accuracyM: 40,
      basis: 'documented',
      note: 'The caption names the church; placed at the church (262927,222238). The title omits Harries but the item is credited and tagged to him.',
    },
  },
  {
    id: 'harries-2281916',
    file: 'photos/harries/2281916.jpg',
    title:
      'A photograph taken on Rhosmaen Street looking towards Bridge Street, Llandeilo, by D C Harries, c. 1900',
    dated: 'c. 1903-10 (caption c. 1900)',
    from: 1903,
    to: 1910,
    dateNote:
      'Corrected 2026-10-09 (independent check): the caption says c. 1900, but posters in the picture advertise Tariff Reform meetings with Henry Longstaff. The Tariff Reform League was formed in 1903, and Longstaff is reported as secretary of the South Wales Tariff Reform Federation in 1908 to 1910, so the picture is from 1903 to about 1910. The horse chestnut is in flower, so it was taken in May.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2281916',
    catalogueId: 'PCW 2281916',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2281916',
    shows:
      'A narrow street opening out beside a large spreading tree, shops on the left (a "hairdressing saloon" board), boys standing in the road. Posters by the shop advertise Tariff Reform meetings with Henry Longstaff, a parish-church organ recital and Taliaris grazing to let; the horse chestnut is in flower. (Corrected 2026-10-09 (independent check): the posters were not read before.)',
    where: 'Rhosmaen Street, looking south towards Bridge Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262912, n: 222305 },
      accuracyM: 40,
      basis: 'reconstructed',
      note: 'The caption names both streets; placed where OSM has Rhosmaen Street end and Bridge Street begin (262908,222293). The camera position along the street is not known.',
    },
  },
  {
    id: 'harries-2281931',
    file: 'photos/harries/2281931.jpg',
    title:
      'A photograph taken on Rhosmaen Street, Llandeilo, showing the crossing from New Road to Crescent Road, by D C Harries, c. 1920',
    dated: 'after 1924 (caption c. 1920)',
    from: 1924,
    to: 1935,
    dateNote:
      'Corrected 2026-10-09 (independent check): the caption says c. 1920, but a petrol sign reads “R.O.P. Motor Spirit”, and Russian Oil Products was set up in 1924 (Grace’s Guide gives 1925), so the picture is no earlier than 1924. The upper limit of 1935 is a judgement from the cars and pumps, not a source.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2281931',
    catalogueId: 'PCW 2281931',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2281931',
    shows:
      'A wide, empty road with a white centre line, a house with a bay window and ivy on the left, a garage with petrol pumps and a CENTRAL sign on the right. A COUNTY GARAGE sign and an R.O.P. Motor Spirit sign (Russian Oil Products, from 1924). (Corrected 2026-10-09 (independent check): the signs were not read before.)',
    where: 'Rhosmaen Street at the crossing from New Road to Crescent Road',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 263042, n: 222555 },
      accuracyM: 30,
      basis: 'documented',
      note: 'The caption names the crossing; placed at the OSM junction of Rhosmaen Street, New Road and Crescent Road (263042,222555), which the 1905-revised 25-inch map shows as the same junction.',
    },
  },
  {
    id: 'harries-2281961',
    file: 'photos/harries/2281961.jpg',
    title:
      'A photograph of a funeral at Llandeilo, taken opposite Salem Methodist Chapel on New Road, c. 1910',
    dated: 'c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries (item text: "possibly")',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2281961',
    catalogueId: 'PCW 2281961',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2281961',
    shows:
      'A horse-drawn hearse and a crowd of men in dark coats at a funeral, outside a brick building with a shop window.',
    where: 'New Road, opposite Salem Methodist Chapel (the building is no. 15 New Road today)',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262910, n: 222540 },
      accuracyM: 40,
      basis: 'reconstructed',
      note: 'Placed on New Road opposite the OSM position of Salem chapel (262915,222567). The item text says only "possibly taken by D C Harries", though the item is tagged and credited to him.',
    },
  },
  {
    id: 'harries-2282051',
    file: 'photos/harries/2282051.jpg',
    title: 'A photograph of a farmhouse near Llandeilo, by D C Harries, c. 1910',
    dated: 'c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282051',
    catalogueId: 'PCW 2282051',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282051',
    shows: 'A whitewashed farmhouse with outbuildings beside a stream and a plank bridge, a hill behind.',
    where: 'A farmhouse "near Llandeilo"; not named',
    status: 'ok',
    placement: {
      kind: 'unplaced',
      reason: 'The caption names no farm or road, so there is nothing to place it by.',
    },
  },
  {
    id: 'harries-2282066',
    file: 'photos/harries/2282066.jpg',
    title: 'A photograph of St Teilo Church in the snow, Llandeilo, by D C Harries, c. 1910',
    dated: 'c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282066',
    catalogueId: 'PCW 2282066',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282066',
    shows:
      'The church and its tower under snow, with the churchyard gates, a lamp over them, and the graveyard wall in the foreground. (Corrected 2026-10-09 (independent check): it said “lychgate”, but the gates are iron between capped piers and nothing is roofed.)',
    where: "St Teilo's church, Llandeilo",
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262927, n: 222238 },
      accuracyM: 25,
      basis: 'documented',
      note: 'The caption names the church; placed at the OS Open Map Local centroid of the Church of St Teilo (262927,222238).',
    },
  },
  {
    id: 'harries-2282081',
    file: 'photos/harries/2282081.jpg',
    title: 'A photograph of Salem Methodist Chapel on New Road, Llandeilo, by D C Harries, c. 1910',
    dated: 'c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282081',
    catalogueId: 'PCW 2282081',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282081',
    shows:
      'A very large group of men in dark suits and hats (some in straw boaters) seated and standing on the steps in front of a stone chapel with round-arched windows and a gabled porch inscribed “Welsh Calvinistic Methodist 1874”. (Corrected 2026-10-09 (independent check): it said Gothic windows and a pointed porch.)',
    where: 'Salem Methodist (Calvinistic Methodist) Chapel, New Road',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262915, n: 222567 },
      accuracyM: 25,
      basis: 'documented',
      note: 'The caption names the chapel; placed at the OSM building "Salem Calvinist Methodist Chapel" (262915,222567).',
    },
  },
  {
    id: 'harries-2282096',
    file: 'photos/harries/2282096.jpg',
    title: 'A photograph of Llandilo Railway Station, Llandeilo, by D C Harries, c. 1910',
    dated: 'caption c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (caption c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282096',
    catalogueId: 'PCW 2282096',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282096',
    shows:
      'NOT a station. Rows of loaded coal wagons lettered "PANTYFFYNNON BEST ANTHRACITE COAL" beside a large timber-and-iron screening plant still under construction.',
    where: 'Unknown colliery (the wagons name Pantyffynnon); the caption says "Llandilo Railway Station"',
    status: 'miscaptioned',
    placement: {
      kind: 'unplaced',
      reason:
        'The caption does not match the image: it shows a colliery plant, not Llandeilo station. It is not placed and should not be shown as the station.',
    },
  },
  {
    id: 'harries-2282111',
    file: 'photos/harries/2282111.jpg',
    title: 'A photograph of Llandilo Railway Station during the First World War, by D C Harries, c. 1918',
    dated: '1914-1918',
    from: 1914,
    to: 1918,
    dateNote:
      'Corrected 2026-10-09 (independent check): the National Library of Wales holds the same photograph (People’s Collection Wales item 408896) dated 1914-1918, with the creator given as “Unknown”; the print’s own note reads “(World War One)”. People’s Collection Wales credits Harries for its copy and the NLW does not, so the attribution rests on that one record.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282111',
    catalogueId: 'PCW 2282111',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282111',
    shows:
      'A dense crowd of men, women and children on a platform beside a train; the station nameboard reads LLANDILO; a later note on the print reads “(World War One)”. The NLW holds the same photograph, creator unknown, as civilians waiting for a troop train. (Corrected 2026-10-09 (independent check): it said “coach board”.)',
    where: 'Llandeilo railway station, platform',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 263340, n: 222580 },
      accuracyM: 60,
      basis: 'documented',
      note: "The caption names the station; placed at Coflein's grid reference for Llandeilo Railway Station (NPRN 80442, SN 6334 2258). OS Open Map Local's station symbol is at 263357,222603. The platform position is not determined.",
    },
  },
  {
    id: 'harries-2282126',
    file: 'photos/harries/2282126.jpg',
    title: 'A photograph of Llandilo Railway Station, Llandeilo, by D C Harries, c. 1910',
    dated: 'c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282126',
    catalogueId: 'PCW 2282126',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282126',
    shows:
      'A long view down an empty platform: a canopy, station buildings with a nameboard reading LLANDILO, lamp posts, benches, a water tower at the right, several tracks; the print is fogged at the edges.',
    where: 'Llandeilo railway station',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 263340, n: 222580 },
      accuracyM: 60,
      basis: 'documented',
      note: "The caption names the station; placed at Coflein's grid reference (263340,222580). The 1905-revised 25-inch map marks the station on the same spot.",
    },
  },
  {
    id: 'harries-2282141',
    file: 'photos/harries/2282141.jpg',
    title: 'A photograph of an accident on Llandeilo Bridge involving a bus, by D C Harries, c. 1928',
    dated: 'c. 1928',
    from: 1926,
    to: 1930,
    dateNote:
      'The date is the uploader’s caption (c. 1928), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282141',
    catalogueId: 'PCW 2282141',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282141',
    shows:
      'A single-decker bus has gone through the parapet of a stone bridge and hangs over the edge; two men stand below beside the tall masonry, a corrugated shed to the right. The bus is lettered AMMANFORD, which ties it to the Llandeilo to Ammanford bus accident the NLW describes. (Corrected 2026-10-09 (independent check): the lettering was not read before.)',
    where: 'Llandeilo Bridge (the Tywi bridge)',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262757, n: 222001 },
      accuracyM: 60,
      basis: 'documented',
      note: "The caption names the bridge; placed at Coflein's reference for Llandeilo Bridge (SN 62757 22001). The view is from the bank below one approach, so the camera was probably a few tens of metres from this point.",
    },
  },
  {
    id: 'harries-2282156',
    file: 'photos/harries/2282156.jpg',
    title: 'A photograph of an accident on Llandeilo Bridge involving a bus, by D C Harries, c. 1928',
    dated: 'c. 1928',
    from: 1926,
    to: 1930,
    dateNote:
      'The date is the uploader’s caption (c. 1928), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282156',
    catalogueId: 'PCW 2282156',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282156',
    shows:
      'The same accident from further back: the bus sits on the parapet above the arch, a crowd of onlookers along the top of the wall, a hillside seen through the arch. The bus is lettered AMMANFORD.',
    where: 'Llandeilo Bridge',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262757, n: 222001 },
      accuracyM: 60,
      basis: 'documented',
      note: 'As 2282141.',
    },
  },
  {
    id: 'harries-2282171',
    file: 'photos/harries/2282171.jpg',
    title: 'A photograph of an accident on Llandeilo Bridge involving a bus, by D C Harries, c. 1928',
    dated: 'c. 1928',
    from: 1926,
    to: 1930,
    dateNote:
      'The date is the uploader’s caption (c. 1928), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282171',
    catalogueId: 'PCW 2282171',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282171',
    shows:
      'The same accident, a low view along the bridge wall with the bus perched high on the parapet and men standing by a shed.',
    where: 'Llandeilo Bridge',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262757, n: 222001 },
      accuracyM: 60,
      basis: 'documented',
      note: 'As 2282141.',
    },
  },
  {
    id: 'harries-2282186',
    file: 'photos/harries/2282186.jpg',
    title: 'A photograph of Llandilo Post Office on Rhosmaen Street, Llandeilo, by D C Harries, c. 1910',
    dated: 'c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282186',
    catalogueId: 'PCW 2282186',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282186',
    shows:
      'A three-storey corner building in banded brick with chequered-brick gables, inscribed LLANDILO POST OFFICE and 1897, with a family standing at the door. (Corrected 2026-10-09 (independent check): it said “fretted gables”.) The same building is on a postcard dated by its inscription "1897" and lettered "Llandilo Post Office".',
    where: 'The Post Office, Rhosmaen Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262968, n: 222446 },
      accuracyM: 25,
      basis: 'documented',
      note: "Corrected 2026-10-09 (independent check): it was placed at today's post office (263006,222471), on the other side of the street. The 1905-revised 25-inch map labels “P.O.” at the south-west corner of Rhosmaen Street and a lane, at about 262968,222446. The building is inscribed 1897 and is a corner building, and photo 2282411 shows it across the street from Harries's sign.",
    },
  },
  {
    id: 'harries-2282201',
    file: 'photos/harries/2282201.jpg',
    title:
      'A photograph of R. Griffiths Motor Garage on Bridge Street, with a charabanc outside, Llandeilo, gan D C Harries, c. 1920',
    dated: 'c. 1920',
    from: 1915,
    to: 1925,
    dateNote:
      'The date is the uploader’s caption (c. 1920), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282201',
    catalogueId: 'PCW 2282201',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282201',
    shows:
      'A charabanc full of men in hats, parked in the arched entrance of a garage labelled R. GRIFFITHS.',
    where: 'R. Griffiths Motor Garage, Bridge Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262846, n: 222154 },
      accuracyM: 100,
      basis: 'reconstructed',
      note: "The caption names Bridge Street only; placed at the middle of the OSM Bridge Street way. The garage's plot is not found in any source read.",
    },
  },
  {
    id: 'harries-2282216',
    file: 'photos/harries/2282216.jpg',
    title: 'A photograph of R. Griffiths Motor Garage on Bridge Street, Llandeilo, by D C Harries, c. 1920',
    dated: 'c. 1920',
    from: 1915,
    to: 1925,
    dateNote:
      'The date is the uploader’s caption (c. 1920), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282216',
    catalogueId: 'PCW 2282216',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282216',
    shows:
      'The front of the same garage, "MOTOR GARAGE" over the doorway, five people and a car standing in the entrance.',
    where: 'R. Griffiths Motor Garage, Bridge Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262846, n: 222154 },
      accuracyM: 100,
      basis: 'reconstructed',
      note: 'As 2282201.',
    },
  },
  {
    id: 'harries-2282231',
    file: 'photos/harries/2282231.jpg',
    title: 'A photograph of Central Garages, Llandeilo on Crescent Road, by D C Harries, c. 1920',
    dated: 'c. 1920',
    from: 1915,
    to: 1925,
    dateNote:
      'The date is the uploader’s caption (c. 1920), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282231',
    catalogueId: 'PCW 2282231',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282231',
    shows:
      'A long, low garage with GARAGE and CENTRAL GARAGES LLANDILO LTD on its front, a row of early cars and a group of men outside, a terrace behind.',
    where: 'Central Garages, Crescent Road',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 263055, n: 222545 },
      accuracyM: 80,
      basis: 'reconstructed',
      note: 'The caption names Crescent Road; photo 2281931 shows a CENTRAL garage at the Rhosmaen Street / Crescent Road junction, so it is placed near the top of Crescent Road (OSM 263041,222553). Not confirmed against a source.',
    },
  },
  {
    id: 'harries-2282246',
    file: 'photos/harries/2282246.jpg',
    title:
      'A photograph of Crescent Road showing the Civic Hall and Capel Newydd, Llandeilo, by D C Harries, c. 1910-20',
    dated: 'c. 1910-20',
    from: 1910,
    to: 1920,
    dateNote:
      'The date is the uploader’s caption (c. 1910-20), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282246',
    catalogueId: 'PCW 2282246',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282246',
    shows:
      'Mounted soldiers in uniform drawn up along the kerb, an officer facing them, in front of a rendered hall with an inscribed pediment (the Drill Hall on the 1905-revised map, today’s Civic Hall), with Capel Newydd’s Gothic front behind. (Corrected 2026-10-09 (independent check): it said a chapel gable and mounted men.)',
    where: 'Crescent Road, between the Civic Hall and Capel Newydd',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 263145, n: 222440 },
      accuracyM: 30,
      basis: 'documented',
      note: 'The caption names both buildings (the hall is the Drill Hall on the 1905-revised map); placed between OSM Capel Newydd (263146,222424) and the Victoria Jubilee Civic Hall (263143,222454).',
    },
  },
  {
    id: 'harries-2282261',
    file: 'photos/harries/2282261.jpg',
    title: 'A photograph of the White Hart Inn on Carmarthen Road in Llandeilo, by D C Harries, c. 1900',
    dated: 'c. 1900 (clothes look 1920s)',
    from: 1895,
    to: 1930,
    dateNote:
      'Corrected 2026-10-09 (independent check): the caption says c. 1900, but a woman’s knee-length drop-waist dress and bobbed hair, and a man’s wide trousers, look like the mid to late 1920s. The range is widened to run from the caption’s date to 1930; which is right is not settled. Claude under the proactive mandate (ADR 0027).',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282261',
    catalogueId: 'PCW 2282261',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282261',
    shows:
      'A long two-storey inn with a sign reading WHITE HART INN, men and a motorcycle outside, outbuildings to the right.',
    where: 'White Hart Inn, Carmarthen Road',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262351, n: 223015 },
      accuracyM: 30,
      basis: 'documented',
      note: 'The caption names the inn; the OSM pub is at 262351,223015 and the 1905-revised 25-inch map marks "White Hart (P.H.)" at about 262353,223003.',
    },
  },
  {
    id: 'harries-2282276',
    file: 'photos/harries/2282276.jpg',
    title:
      'A photograph of Rhosmaen Street, showing the Cawdor Hotel and many shops, by D C Harries, c. 1900',
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282276',
    catalogueId: 'PCW 2282276',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282276',
    shows:
      'A street climbing between shops with awnings on the right and a tall building with an ivy-covered round bay on the left; people stand in the road.',
    where: 'Rhosmaen Street, with the Cawdor Hotel',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262925, n: 222375 },
      accuracyM: 60,
      basis: 'reconstructed',
      note: 'The caption names the Cawdor Hotel; placed beside its Cadw position (262922,222364), looking up the street. The camera position is not known.',
    },
  },
  {
    id: 'harries-2282291',
    file: 'photos/harries/2282291.jpg',
    title: 'A photograph of Abbeyfield on George Street, Llandeilo, by D C Harries, c. 1900',
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282291',
    catalogueId: 'PCW 2282291',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282291',
    shows:
      'A two-storey rendered building with attic dormers, pedimented windows, a round-arched doorway and two children at the door. (Corrected 2026-10-09 (independent check): it said three storeys and one child.)',
    where: 'Abbeyfield (Abbeyfield House, no. 1 George Street, formerly the George Hotel)',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262773, n: 222288 },
      accuracyM: 30,
      basis: 'documented',
      note: 'The caption names Abbeyfield; the Cadw listing for "No. 1 George Street, also known as Abbeyfield House" gives 262773,222288 (via British Listed Buildings).',
    },
  },
  {
    id: 'harries-2282306',
    file: 'photos/harries/2282306.jpg',
    title: 'A photograph of New Road showing the Victoria Hotel, Llandeilo, by D C Harries, c. 1900',
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282306',
    catalogueId: 'PCW 2282306',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282306',
    shows:
      'A rough road with a horse and cart and a few people, a row of white terraced houses and a hillside beyond, a stone building at the right.',
    where: 'New Road, by the Victoria Hotel',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262690, n: 222475 },
      accuracyM: 60,
      basis: 'reconstructed',
      note: 'The caption names the hotel. OSM has no building of that name, but a substation named for it at 262681,222484 and the pub "Yr Hen Vic" at 262708,222475; the 1905-revised map has "Victoria Inn" at about 262646,222457. Placed between them.',
    },
  },
  {
    id: 'harries-2282321',
    file: 'photos/harries/2282321.jpg',
    title:
      'A photograph of the Llandilo Butter and Cheese Factory in Ffairfach, Llandeilo, by D C Harries, c. 1910-20',
    dated: 'c. 1910-20',
    from: 1910,
    to: 1920,
    dateNote:
      'The date is the uploader’s caption (c. 1910-20), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282321',
    catalogueId: 'PCW 2282321',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282321',
    shows:
      'A long stone building with chimneys and several doors, three people in white overalls and a cart at the doorway.',
    where: 'The Llandilo Butter and Cheese Factory, Ffairfach',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262800, n: 221550 },
      accuracyM: 500,
      basis: 'reconstructed',
      note: "The caption says only Ffairfach. Placed at Ffairfach beside Llandilo Bridge station on the 1905-revised map; the factory's site was not found. A lead the first pass missed: Coflein NPRN 300568, the CWS creamery on Heol Cennen, Ffairfach (SN 62877 21121), about 430 m south, but nothing read shows it is this building.",
    },
  },
  {
    id: 'harries-2282336',
    file: 'photos/harries/2282336.jpg',
    title: 'A photograph inside the Market Hall in Llandeilo, Carmarthen Street, by D C Harries, c. 1900',
    dated: 'c. 1900 (clothes look 1920s)',
    from: 1895,
    to: 1930,
    dateNote:
      'Corrected 2026-10-09 (independent check): the caption says c. 1900, but many women in the crowd wear cloche hats, which were popular from about 1922 to 1933. The range is widened to run from the caption’s date to 1930; which is right is not settled. Claude under the proactive mandate (ADR 0027).',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282336',
    catalogueId: 'PCW 2282336',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282336',
    shows:
      'The interior of a large market hall under an iron roof hung with bunting, packed with people seated at long tables.',
    where: 'The Market Hall (Provisions Market), Carmarthen Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262760, n: 222450 },
      accuracyM: 60,
      basis: 'documented',
      note: 'The caption names the market hall; Coflein\'s reference for the Provisions Market is SN 62760 22450. Coflein says the market was moved from King Street to this site on a date it does not give, and the 1905-revised map labels a "Market" about 70m to the west-north-west, so which site stood in c. 1900 is not settled.',
    },
  },
  {
    id: 'harries-2282351',
    file: 'photos/harries/2282351.jpg',
    title:
      "A photograph of the Farmer's Co-operative Society on Station Road, Llandeilo, by D C Harries, c. 1900",
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282351',
    catalogueId: 'PCW 2282351',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282351',
    shows:
      'A new two-storey stone building lettered FARMERS CO-OPERATIVE SOCIETY with two carriage doors, a horse and cart in each.',
    where: "Farmers' Co-operative Society, Station Road",
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 263160, n: 222850 },
      accuracyM: 120,
      basis: 'reconstructed',
      note: 'On the 1905-revised 25-inch map "Station Road" is the road north from Railway Terrace (today\'s Rhosmaen Street north of the town). Placed on it; the building\'s plot is not found.',
    },
  },
  {
    id: 'harries-2282366',
    file: 'photos/harries/2282366.jpg',
    title: 'A photograph of D Hughes Family Butchers on Rhosmaen Street, Llandeilo, by D C Harries, c. 1900',
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282366',
    catalogueId: 'PCW 2282366',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282366',
    shows:
      'A prize bull, with show cards pinned to it, held by a man in a white coat outside the shop front of D. HUGHES, FAMILY BUTCHER.',
    where: 'D. Hughes, family butchers, Rhosmaen Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262975, n: 222440 },
      accuracyM: 150,
      basis: 'reconstructed',
      note: "The caption names Rhosmaen Street only; placed in the old town stretch. The shop's plot is not found.",
    },
  },
  {
    id: 'harries-2282381',
    file: 'photos/harries/2282381.jpg',
    title: 'A photograph of a street, possibly Llandeilo, by D C Harries, c. 1910',
    dated: 'c. 1910',
    from: 1905,
    to: 1915,
    dateNote:
      'The date is the uploader’s caption (c. 1910), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282381',
    catalogueId: 'PCW 2282381',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282381',
    shows:
      'A narrow street with a shop hung with boots (FOOTWEAR SPECIALISTS), an early car, terrace houses and a bare tree.',
    where: 'A street "possibly Llandeilo"',
    status: 'ok',
    placement: { kind: 'unplaced', reason: 'The caption itself doubts that it is Llandeilo.' },
  },
  {
    id: 'harries-2282396',
    file: 'photos/harries/2282396.jpg',
    title:
      'A photograph of King Street, Llandeilo showing J. Thomas Stores in Whitecliffe House, by D C Harries, c. 1900',
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282396',
    catalogueId: 'PCW 2282396',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282396',
    shows:
      'An open, unpaved space with a gabled shop (J. THOMAS STORES), a horse and cart at the left, a cycle leaning at the door.',
    where: 'King Street, J. Thomas Stores in Whitecliffe House',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262863, n: 222303 },
      accuracyM: 80,
      basis: 'reconstructed',
      note: 'The caption names King Street only; placed at the middle of OSM King Street. Whitecliffe House is not located in any source read.',
    },
  },
  {
    id: 'harries-2282411',
    file: 'photos/harries/2282411.jpg',
    title: "A photograph of Rhosmaen Street, Llandeilo, showing D C Harries' Studio, c. 1900",
    dated: 'c. 1900 (not before 1897)',
    from: 1897,
    to: 1905,
    dateNote:
      'Corrected 2026-10-09 (independent check): the caption says c. 1900, but the Post Office inscribed 1897 stands on the right of the picture, so it is no earlier than 1897.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282411',
    catalogueId: 'PCW 2282411',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282411',
    shows:
      'A street receding, a hanging sign reading D. C. HARRIES on the building at the left, a man and a dog in the road, shops and a rendered terrace beyond; the banded-brick Post Office of 1897 stands across the street on the right. (Corrected 2026-10-09 (independent check): the Post Office was not noticed before.)',
    where: "Rhosmaen Street, at D C Harries' studio",
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262960, n: 222400 },
      accuracyM: 100,
      basis: 'reconstructed',
      note: 'The caption and the sign in the photograph show the studio is on Rhosmaen Street (the NLW also gives his address as Rhosmaen Street). Corrected 2026-10-09 (independent check): the photograph shows the studio across the street from the 1897 Post Office, so it stood on the east side of Rhosmaen Street, opposite the Post Office (about 262968,222446); the exact plot is still not found, so the point and the ±100 m stay.',
    },
  },
  {
    id: 'harries-2282426',
    file: 'photos/harries/2282426.jpg',
    title: 'A photograph looking up towards Rhosmaen Street, Llandeilo, by D C Harries, c. 1900',
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282426',
    catalogueId: 'PCW 2282426',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282426',
    shows:
      'A street decorated with leafy arches, the nearest carrying a painted band quoting Two Gentlemen of Verona ("She is my own, and I as rich in having such a jewel as twenty seas, if their sand were pearl, the waters nectar, and the rocks pure gold") and two shields lettered A and R (the left is a monogram that may not be a plain A); a second arch further down. (Corrected 2026-10-09 (independent check): the quotation said “sands”; the arch reads “sand”.)',
    where: 'A street leading up towards Rhosmaen Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262917, n: 222326 },
      accuracyM: 60,
      basis: 'reconstructed',
      note: 'The caption says "looking up towards Rhosmaen Street"; placed at the foot of Rhosmaen Street where it meets Carmarthen Street and King Street (OSM 262917,222326). The arches look like a wedding or welcome decoration; the occasion is not stated.',
    },
  },
  {
    id: 'harries-2282441',
    file: 'photos/harries/2282441.jpg',
    title: 'A photograph of the Cawdor Hotel on Rhosmaen Street, Llandeilo, by D C Harries c. 1900',
    dated: 'c. 1900',
    from: 1895,
    to: 1905,
    dateNote:
      'The date is the uploader’s caption (c. 1900), not Harries’s own; no detail in the picture dates it more closely.',
    creator: 'D C Harries',
    credit:
      'D C Harries. Llandeilo Fawr Town Council collection (Hengwrt), via People’s Collection Wales, item 2282441',
    catalogueId: 'PCW 2282441',
    catalogueUrl: 'https://www.peoplescollection.wales/items/2282441',
    shows:
      'An ivy-covered three-storey hotel with a pillared porch, a bay window, railings and an ornate lamp bracket, two men standing in front; an ornate hanging sign is cut off at the top.',
    where: 'The Cawdor Arms Hotel, Rhosmaen Street',
    status: 'ok',
    placement: {
      kind: 'placed',
      at: { e: 262922, n: 222364 },
      accuracyM: 25,
      basis: 'documented',
      note: 'The caption names the hotel; the Cadw listing for The Cawdor Arms Hotel gives 262922,222364 (via British Listed Buildings).',
    },
  },
];

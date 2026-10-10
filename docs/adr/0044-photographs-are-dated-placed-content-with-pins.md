---
title: "ADR 0044: Photographs are dated, placed content, shown as pins"
kind: adr
status: accepted
updated: 2026-10-10
---

# ADR 0044: Photographs are dated, placed content, shown as pins

- **Status:** Accepted; default amended 2026-10-10 by Dewi (on by default, see the amendment at the end)
- **Date:** 2026-10-09
- **Decided by:** Dewi agreed issue #1 and that the photographs are shown in the app pinned where each
  was taken, with a credit and an ⓘ, and that their licences are not checked (decision log,
  2026-10-09; [ADR 0026](0026-open-licences-including-nc.md), amended). The choices below are Claude's,
  under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)),
  so Dewi can overrule them.
- **Number:** written as 0041 and renumbered 0044 at the second merge of main on 2026-10-09, since
  the cutscene branch had taken 0041 to 0043.

## Context

Issue #1 asked for D. C. Harries's photographs of Llandeilo, placed on the map. 31 are gathered
([`research/dc-harries-photographs.md`](../research/dc-harries-photographs.md)), 28 placed on the OS
grid, each with a catalogue credit. The project has one model for dated content (a time range, a place,
a provenance) and one rule for who reads it (the snapshot), and forbids a special case per era or per
kind of thing without a recorded reason.

## Decision

- **A photograph is content like the rest.** `Photograph` is in `src/domain/model.ts`: a branded
  `PhotoId`, a `when: TimeRange` (what its date allows; "c. 1900" is 1895 to 1905), a placement (a grid
  reference, an accuracy in metres and whether the point is documented or reconstructed, or the reason it
  is not placed), a `Provenance`, and the catalogue's own title, credit and link. It sits in
  `WorldContent` beside the places and conversations, and `snapshotAt` lists the photographs pinned at the
  year, so the 3D layer reads one answer.
- **When a pin shows** (`src/domain/photos.ts`): from the start of the photograph's date range until
  `PHOTO_LINGER_YEARS` (25) after its end. Never before: a photograph cannot show a street that does not
  yet stand. The 25 years are ours, not a source's: a street changed slowly, so a photograph of 1900 is
  still a fair view of the town in 1920. A photograph that is not placed, or whose caption is wrong
  (`miscaptioned`), has no pin.
- **Where it stands** (`pinAnchors`): the photograph's point, and photographs sharing a point (three of the
  bus accident, two of the station, two of St Teilo's) fan 15 m round it in id order, so each pin can be
  reached. A pin does not move with the year or with other photographs.
- **Pins are page elements projected from the scene**, like place labels and conversation bubbles
  (`src/ui/photo-pins.ts`, projecting through `src/ui/screen-space.ts`, the one projection and overlap test
  the labels, the bubbles and the pins share): a camera glyph in sepia, a button with an accessible name, keyboard reachable.
  A pin that would overlap an earlier pin, or a panel, waits until the camera is nearer, as labels do.
  They carry `reveals-when`, so the guess game hides them ([ADR 0029](0029-guess-game-hides-giveaways-by-one-root-class.md))
  and `Snapshot.photographs` is "not seen" there.
- **A Photos toggle** in the first brand block, off by default and remembered in `localStorage` inside a
  try/catch (the Graphics setting's pattern, `src/ui/photos-pref.ts`); `?photos=1` or `?photos=0` sets the
  first state of a link. Off by default, so no existing view changes until a visitor asks.
- **The photo opens in a side panel** (`src/ui/photo-panel.ts`) in the slot the conversation and info
  panels use, wide enough for the picture: the catalogue's title, the picture, its credit with a link to the
  catalogue page, the ⓘ, then the date, what it shows and where. Escape closes it after any open popover;
  it closes when Photos is switched off or the slider leaves the photograph's pin window (its years plus
  `PHOTO_LINGER_YEARS`, not its years alone); it shares the
  right-hand slot, so the other panels close it and it closes them.
- **The ⓘ is the existing tier badge** (`infoBadge`, extracted from `provenanceBadge`): the photograph's tier
  (`photoTier`: the placement's, but reconstructed where the date itself is disputed, `dateDisputed`) and its
  meaning, then how sure the date is (the range and a note of what
  the date rests on, including where the independent check overturned the caption), how sure the placement
  is (accuracy and note), the sources, and the English-only notice below.
- **Language.** The panel's labels, the toggle, the pin names, the dates ("tua 1900") and the ⓘ headings
  follow the Cymraeg/English toggle. The catalogue's words (title, what it shows, credit) and our notes on
  each photograph are English only, marked `lang="en"`, and the ⓘ says so. Translating them is a Welsh
  check that is parked with the rest ([`todos`](../todos/_index.md)).
- **Credits.** The asset manifest keeps one record for `photos/harries/*.jpg` (source and a licence line that
  says PCW's Creative Archive Licence is stated on each item page and was not checked per item, [ADR 0026](0026-open-licences-including-nc.md);
  the instruction to credit without checking is in the decision log, not on the public page). A doubt about who took a
  photograph ("possibly", or the NLW's "Unknown") is written into the credit itself, which is what
  visitors read; the About tab
  lists each photograph's credit and catalogue link under it, from the same content.

## Corrections after the first review (2026-10-09)

- Two photographs captioned c. 1900 (2282261, 2282336) showed a motorcycle, a knee-length dress, cloche hats
  and electric lamps. A pin may never show a scene before it can exist, so their ranges now start at 1920 and
  1922 (they had been widened to start at 1895); the date is marked disputed and the caption stays in `dated`.
- A plain "c." date takes plus or minus five years everywhere; the three bus-accident photographs had
  1926 to 1930 for "c. 1928" and now run 1923 to 1933.

## Not built

- **"Then and now" flight.** The brief allowed it only where the record gives the camera's direction.
  None of the 31 records one (the placement notes can say where the camera probably stood, not which way it
  faced), so no flight to a viewpoint was built.
- **Unplaced photographs** (three) have no pin and so no way in; a gallery or list would carry them.

## Consequences

- A new kind of dated content reads through the snapshot, so a second photographer's set (the
  other-photographers leads in the research note) is more entries, not new code.
- The pin's collision rule means the overview shows few pins and a close view shows all; the camera, not a
  count badge, reveals the rest.
- The 25-year linger is a convention in one constant with a test; changing it is one line.

## Amended 2026-10-10: the photo layer is on by default

Dewi, 2026-10-10, chose "On by default" when asked. This reverses the "off by default" choice in the
decisions above (the toggle bullet's "Off by default, so no existing view changes until a visitor asks").
The rest stands: Photos is still a toggle, remembered in `localStorage`, and `?photos=1` or `?photos=0`
still sets the first state of a link over what the browser remembers. `initialPhotos` in
`src/ui/photos-pref.ts` now returns `stored ?? true`, so a first visit shows the pins and a visitor who
switched Photos off stays off. The welcome panel says so, in English and Welsh. A new e2e test checks
that pins never sit under the panels, the timeline, the compass or a label at 1900, 1925 and 1950; the older
label tests run at years with no pins, so they do not cover pins. Because a place label is how a visitor flies to
a place, **labels win a clash with a pin**: the labels are placed first and the pins avoid them (Claude, under the
proactive mandate, so Dewi can overrule). Pins also avoid conversation bubbles, though none of the pinned years
has one, so that is not tested. See the [build log](../process/build-log.md), 2026-10-10.

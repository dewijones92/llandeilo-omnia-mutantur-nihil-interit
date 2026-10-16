---
title: Backlog
kind: index
status: current
updated: 2026-10-16
---

# Backlog

## How this list works

The one list of work ([ADR 0022](../adr/0022-one-todo-file.md)). Unagreed ideas live on the ideas
board, [`../design/ideas.md`](../design/ideas.md), and in "From GitHub issues" below; the "Proposed"
section is under discussion. Dewi agrees an item, or Claude for its own ideas under the proactive
mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md));
someone else's suggestion still needs Dewi's yes. Tick items off in the same commit that does
them. (Corrected 2026-09-28: this file had gone stale, still listing the review and the extra e2e
tests as not done.)

An item is ticked only once it has been through its path, in order:

1. **Agreed** by Dewi, or by Claude for its own ideas under the proactive mandate
   ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)).
2. **Researched**, for content and research items: a note in `docs/research/` with its sources.
3. **Research checked** by an independent pass against those sources, before building on it.
4. **Built**, with a test that was seen to fail first where it fixes a bug.
5. **Reviewed** by the second Opus pass, its CRITICAL and IMPORTANT findings fixed. A fix to a
   finding counts as reviewed once a later second-Opus pass has read it and raised no new CRITICAL or
   IMPORTANT finding on it (added 2026-10-03, so that items in the same state are ticked alike).
6. **Looked at**, for anything visible: screenshots at two or more years on the timeline.

Items ticked on 2026-10-02 were reviewed three times by a second Opus, every IMPORTANT finding fixed.
Red runs (each failing at the assertion it names): the tick-label overlap test (on a deliberately
cramped anchor), the Roman forts' "(today)" on the moment card, the labels-under-panels test
("Garn Goch (today)"), the keys panel (no dialog), the arrows stepping from a focused button, the
3D view keeping its arrows (it logged a step), the compass overlap, and the `clas-church` tier test.
The About text and the voice note are text checks in unit and e2e tests that were not run red.
Screenshots: the keys panel at 1282 and 1880, the voice note at 2020, the moment card at AD 74, the
rivers at night in 1880 and 1282. The first draft of this paragraph claimed more than that; the
third review caught it.

## From GitHub issues

Suggestions from other people, triaged at the start of each session
([ADR 0021](../adr/0021-issue-triage-at-session-start.md)). One row per issue. The summary is ours,
never the author's words or name. "Seen" is the issue's `updatedAt` when the row was written; a
different value means it has changed and is triaged again. A row stays here for good, so the issue
is not triaged as new: once Dewi agrees it, its status becomes "✅ agreed" and a line in the list
below links the issue.

| Issue | Seen | Idea (our summary) | Status | Notes |
|---|---|---|---|---|
| [#1](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/1) | 2026-10-09T22:41:53Z | Gather a local studio photographer's photos of Llandeilo's streets and station from about 1900, and place each on the map | ✅ agreed 2026-10-09 | The glass negatives are at the National Library of Wales, copies on People's Collection Wales; the photographer died in 1940, so UK copyright has probably expired, to be checked per image. Shown in the app with its credit, pinned with credit and an ⓘ; otherwise a modelling reference only |
| [#2](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/2) | 2026-10-10T01:59:41Z | Detailed real-scale terrain for the town and the Roman fort area from LiDAR, tiled with levels of detail, the base ground kept apart from changes by period | ✅ agreed 2026-10-09 | The agreed close-up LiDAR terrain (CLAUDE.md, Terrain) was never built; Welsh Government 1m LiDAR covers the area, licence to confirm per file |
| [#3](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/3) | 2026-10-16T16:28:48Z | A modular, editable reconstruction of the Roman fort and its civilian settlement on that terrain, ready for animation later | ✅ agreed 2026-10-09 | Research first: published plans and surveys, documented kept apart from reconstruction; a linked reconstruction drawing states no licence; it is used with a credit to its maker (Dewi, 2026-10-09: credit, no licence check), and the second fort's date and the settlement survey still need their sources. Built detailed in the app (Dewi, 2026-10-09). Researched 2026-10-09 ([note](../research/roman-forts-and-vicus.md)): the survey is Stratascan's magnetometry in the Hughes report, not in the linked PDF; "AD 90-100" has no source. 2026-10-12 comment with a screenshot: some of Fort 1's barracks sink below today's ground on the slope (each building is seated at one point with a level floor, on the modern LiDAR surface); answered 2026-10-16: research levelling and terraces, then draw platforms (reconstructed) or seat each building, so nothing is buried |
| [#4](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/4) | 2026-10-16T16:28:51Z | Detailed terrain for the Dinefwr Castle area like the fort area's, and the terrain exportable for SketchUp so outside models can be tried on it | ✅ agreed 2026-10-16 | The castle hill is inside the LiDAR region but only at 10m; it gets a 2m area. Outside models are not brought into the app: our models stay scripted in Blender from sourced plans (Dewi, 2026-10-16). Instead the app gets a way to download the world's assets (our models and the detailed terrain) as .glb, each with its credit and licence; the terrain needs a one-off .glb export, the models already are .glb. Answered 2026-10-16, label enhancement |

## Done: the vertical slice (2026-09-26)

- [x] Real terrain, rivers, buildings, railway, roads and woodland from OS OpenData
- [x] ~30 key dates, ~40 features through time, moment card, place labels and flights
- [x] Six conversations of the imagined family, 28 voices (Welsh, English, Latin via Diego)
- [x] Almanac (32 entries), language by class (12 periods), About and credits
- [x] Procedural ambient sound, hearth smoke
- [x] Three independent Opus reviews; every CRITICAL and IMPORTANT finding fixed
- [x] Bundle 1.6MB → 387KB gzipped (the CI budget added then was removed on 2026-09-28, ADR 0016)
- [x] 24 unit and integrity tests, 9 e2e tests in CI, deploy to GitHub Pages
- [x] Knowledge base in `docs/`, README with screenshots

## Next: verify on real hardware

- [ ] Check WebGPU on a real desktop GPU (everything automated uses WebGL2 via SwiftShader)
      *2026-10-09: automated by the GPU kit (`npm run e2e:gpu`, ADR 0048): WebGPU on the NVIDIA GPU in
      Windows Chrome, no WebGPU errors, every e2e spec green at High. Awaiting review, so not ticked*
- [ ] Open it in desktop Firefox and Safari: every automated check runs in Chromium, and WebGPU support differs
- [ ] Record performance numbers in CLAUDE.md: first load, scrub frame rate, terrain recolour time
- [ ] Listen to the ambient sound and voices on real speakers; tune levels
- [ ] Watch the smoke and the train move at a real frame rate

## Content and research

- [ ] Second research pass on the gaps in [`open-questions.md`](../research/open-questions.md):
      the primary Roman forts report, Brut y Tywysogion on 1282, Gerald of Wales on clothing,
      Victorian wages and prices, Dryslwyn after 1287, a sourced 1588 Bible passage
- [x] Talley Abbey: placed on Coflein NPRN 92750's grid reference (SN 63281 32772, on the surviving
      tower, now the model's origin), cited in the research notes, and checked by screenshot (2026-10-02)
- [x] 1282 moment card: "16 June 1282 by the Welsh annals (some histories say 17 June)", citing the
      Annales and Pilling (classes S2, S8); its Welsh had also dropped the commander's dismissal (2026-10-02)
- [ ] Roman forts: use the primary report's 3.85ha and 1.54ha to revisit the "8 vs 12 acres" contradiction
- [ ] Earliest environment keyframes (12,500–10,900 BC): check they use calendar, not uncalibrated pollen, dates
- [ ] Railway loose ends: Victoria's weight (18 vs 14 tons), the unconfirmed "Victor" of 1864, the 1858 Beyer Peacock engines
- [ ] Railway lines' own dates: whether Pantyffynnon to Duffryn opened in 1840 or May 1841, when the
      Amman valley branch closed or was lifted, and the 1841 line east of Garnant's own course
      ([ADR 0034](../adr/0034-exact-dates-draw-nothing-outside-them.md), [open questions](../research/open-questions.md)).
      *Done in part 2026-10-03, by Dewi's decision to draw the undated lines as labelled estimates*:
      the line near Pontyberem is the Burry Port and Gwendraeth Valley Railway to Cwmmawr, drawn from
      c. 1870 (never before 23 June 1869) except the stretch beside the Hirwaun Isaf incline, drawn
      across June 1886; the track past the 1907 join at Gwaun-cae-Gurwen is the colliery line, drawn
      from 6 May 1841; the Cross Hands stub, 35m of narrow-gauge track no source names, is drawn
      `imagined` from c. 1950. All are labelled educated guesses with their sources, and none is drawn
      before the earliest date its sources allow (ADR 0037), seen red first. The second-Opus review
      ran, and its findings are fixed. Still to do: where the incline's foot was, and what the stub is
- [ ] Independent verification of every research note, as conversations-by-class had (it found 13 corrections).
      Done 2026-10-02: era-medieval-to-1282, event-effects, railway-later, anglo-norman-and-middle-english
      (reports in `docs/research/reviews/`), corrections applied to content and notes. Still to do:
      deep-time, railway-locomotives (era-iron-age, era-victorian and timeline-and-earliest-occupation were
      checked on 2026-10-02 too; their corrections are the next batch),
      language-by-class. building-models was checked the same day (74 claims, 57 confirmed); its
      corrections are used in the rebuilt Talley and Dryslwyn models
- [x] Every English/Welsh text pair audited for dropped facts: 16 meaning gaps and 7 small ones fixed,
      all in the same direction (the Welsh had lost caveats and numbers) (2026-10-02)
- [ ] Check every place against its Coflein grid reference (only some were verified)
- [ ] Human check of the Welsh text (parked); include the welcome panel's text and the camera rows, whose Shift line was
      reworded on 2026-10-03 after a review read the first wording as "keep on sliding faster"
      New terms need it first: "tyllau taflu" (machicolations), "bwtresi hedfan" (flying buttresses),
      and the strings added on 2026-10-02: the About panel's scale sentence, the "About the voice"
      Dyfedeg note, the keys panel (`keys…`, `click…` in `src/content/strings.ts`), and "yr annalau
      Cymreig" (is "annalau" the usual word?)
- [x] See the building provenance-tier test fail once: with `clas-church` set to documented it failed
      at its assertion, naming `clas-church` (2026-10-02)
- [ ] Mark research notes `reviewed` once each has had an independent pass against its sources
- [ ] Remaining eras filled in: Roman in depth, early medieval, Tudor and Stuart, Georgian, modern
- [ ] More conversations per era, and the family at more key dates
- [ ] **Wild animals through time** (Dewi, 2026-09-28): which wild animals roamed the valley in each
      era, arriving and dying out (wolf, bear, lynx, beaver, boar, red kite and pine marten returning),
      shown in the scene and the almanac, each with a sourced date range and its "here or only in Wales"
      status ([`deep-time-and-natural-history.md`](../research/deep-time-and-natural-history.md))
- [ ] **What people did for a living, by class, in each era** (Dewi, 2026-09-28): farming, crafts,
      trades, service, clergy, soldiering, industry (lime burning, woollen mills, the railway), grouped
      by class, in the almanac and grounding the conversations; research first
- [ ] **Other everyday texture** (Dewi, 2026-09-28, "other interesting stuff"): e.g. what they ate
      and paid for it, games and pastimes, fairs and markets, how news travelled, crime and punishment,
      childhood, medicine. Each a research item before it is content
- [ ] 1403 Glyndŵr, 1287 Dryslwyn siege, 1843 Walk Gate as scenes (research is ready)

## Look and feel

**Dewi, 2026-09-28: "I want this app to look amazing"**, with effect trickery from WebGPU or the
engine, and time of day and seasons. Agreed as a goal; the items below serve it.

- [x] Time of day: the real sun path for Llandeilo's latitude, dawn and dusk colour, a twilight
      afterglow, moonlit night with stars and lit windows, morning mist; a slider, a "let the day
      pass" button and `?hour=` (2026-09-28, see [`../design/atmosphere.md`](../design/atmosphere.md))
- [x] Seasons: spring blossom and fresh green, summer hay, autumn leaves and bracken, winter bare
      trees and a snow line that drops in colder periods (Younger Dryas, Little Ice Age); four
      buttons and `?season=` (2026-09-28)
- [ ] Weather: rain, mist in the valley, low cloud on the Black Mountain (morning mist only so far)
- [x] Engine effects, first pass: depth-of-field tilt-shift, colour grading by light (warm
      highlights at golden hour, cool shadows at night), night bloom on windows, flowing ripples
      and sky reflection on the rivers, a sun and moon glow in the sky, smoke that darkens at night,
      `?fx=low` to switch the costly ones off
- [ ] Engine effects, still to do: ambient occlusion (no size limit now, ADR 0016; judge its cost on a real GPU), volumetric light shafts, real water reflections, colour grading per era, wind in the trees
- [x] Firelight at night for roundhouses, hall-houses and mansions, and lit town windows (2026-09-28)
- [ ] Castles, churches and the abbey lit at night (candles, torches), and a train headlamp
- [ ] **A night that reads as night** (Claude, under the proactive mandate, 2026-10-03): a winter 23:00
  is still a pale moonlit grey, so the dated night light (ADR 0030) only shows zoomed in: at the
  site framing the 1903 windows and lamps are a few orange pixels. Darker nights, window glow and lamp
  halos (bloom) strong enough to read from the overview, and the 1942 blackout as a black town.
  *Built 2026-10-03 on `feat/darker-night`* ([ADR 0040](../adr/0040-a-dark-night-and-halos-that-keep-a-few-pixels.md)):
  a darker night (day unchanged), halos a few pixels wide at every lit house, street lamp and hearth,
  turned in the vertex shader; red-first unit and e2e tests; looked at in 1282, 1880, 1903, 1942 and
  2000 at the overview and the site, and at noon. *Second-Opus review 2026-10-03*: its two IMPORTANT
  findings fixed (farm windows labelled a guess in every key that lights them; an e2e that counts the
  halos' pixels) and both suggestions applied. Awaiting review of the fixes, so not ticked
- [ ] Check the night halos on WebGPU on a real desktop: their WGSL vertex code (ADR 0040) has never
      run, because WebGPU through WSL stalls and CI has no GPU
      *2026-10-09: they now run on WebGPU in the GPU kit's 1903 night frame test with no WebGPU errors,
      and its screenshot shows them lit; not yet compared with the WebGL halos up close*
- [ ] Sound follows the clock: birds at dawn, owls and quiet at night
- [ ] Conversations and speech bubbles follow the clock: nobody chatting outdoors at 3am
- [x] Rivers stay vivid blue at night while the land goes dark: already fixed when re-shot on
      2026-10-02 (1880 summer 23:00, 1282 winter 02:00 and 1880 noon): the rivers go dark navy with
      the land. No change was needed
- [ ] Re-check autumn trees at overview distance by screenshot (the "glitter" fix was never re-shot)
- [ ] **Map-style camera** (Dewi, 2026-10-03: "make the camera easier to move around"; he chose
      map-style): drag slides the land, right-drag turns, the wheel zooms at the cursor, W A S D / Q E /
      R F, double-click flies there, a one-time hint, the Keys panel in both languages (both since
      replaced by the welcome panel, [ADR 0051](../adr/0051-one-welcome-panel.md))
      ([ADR 0050](../adr/0050-map-style-camera-controls.md)). Built 2026-10-03 with red-first tests and
      looked at (overview, dragged, turned, zoomed, 1860). Second-Opus review 2026-10-03: the sky no
      longer throws the camera (wheel zooms at the centre, a sky drag turns, a slide waits above the
      horizon), tests for a drag ending a follow and a flight and for the hint after Begin, and the
      Welsh for Shift reworded (in the parked human Welsh check); awaiting Dewi
- [ ] **Welcome panel** (Dewi, 2026-10-03: controls and info at start,
      closeable, an obvious icon to reopen): "How to explore" opens after Begin (or at once without it),
      replaces the Keys panel and the camera hint, explains the controls, timeline, provenance labels, ⓘ,
      "When are we?" and the settings, with "Show this at start" and a round "?" icon
      ([ADR 0051](../adr/0051-one-welcome-panel.md)). Built 2026-10-09 with tests seen red by mutation
      and looked at in English and Welsh; awaiting Dewi. The Welsh text is in the parked human check
- [ ] **Camera and welcome merged with the cutscenes** (Claude, under the proactive mandate, 2026-10-09):
      the map-style controls are off while a scene plays and back after Skip, Escape or its end; the
      welcome waits for a scene, says how to Watch one, and the "?" icon fades with the interface
      ([ADR 0050](../adr/0050-map-style-camera-controls.md), [ADR 0051](../adr/0051-one-welcome-panel.md)).
      Built with e2e seen red against the plain merge; awaiting the second-Opus review and Dewi. The new
      Welsh sentence is in the parked human check
- [ ] **Camera and welcome merged with the photo layer** (Claude, under the proactive mandate, 2026-10-10):
      a press on a pin, a place label or a bubble that moves slides the land and opens nothing, the wheel
      over them zooms, a click still opens them; the welcome describes Photos; the photo panel is in the
      Escape order ([ADR 0050](../adr/0050-map-style-camera-controls.md),
      [ADR 0051](../adr/0051-one-welcome-panel.md)). Built with e2e seen red three ways; awaiting the
      second-Opus review and Dewi. The new Welsh sentence is in the parked human check

- [ ] Garn Goch ramparts: follow the real contour and the scree at the south-west gate
- [ ] Buildings with period styles (today `town.style` only decides which towns get chimney smoke)
- [ ] Contact shadows under people and buildings
- [ ] A low-sun, warmer light option; haze towards the rim
- [x] Better castle models from their documented plans (Dinefwr's great round tower, Carreg Cennen's gatehouse):
      landmark models built phase by phase from the research, 2026-09-28 ([`design/models.md`](../design/models.md))
- [ ] Close the modelling research gaps listed in [`design/models.md`](../design/models.md) (Coflein plans, Cadw guidebooks)
- [x] Decide option B or C for the landmark models (realistic textures), or keep option A: **option B**, proper textures on the Blender models (Dewi, 2026-10-10)
- [x] The photo layer on by default (Dewi, 2026-10-10), with the e2e checks that pins never cover labels, panels or the timeline (2026-10-10, [ADR 0044](../adr/0044-photographs-are-dated-placed-content-with-pins.md) amended). The new Welsh welcome sentence (on to begin with, press Lluniau to switch it off) is in the parked human Welsh check
- [ ] Landmarks as scripted Blender models ([ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md), Dewi 2026-10-10): the pipeline ADR, then the Roman forts first, then Dinefwr Castle (Dewi's pick, 2026-10-10; researched 2026-10-10 in [`research/dinefwr-castle.md`](../research/dinefwr-castle.md) with a part-by-part plan per phase, checked by the same agent, reviewed by a second Opus with its findings fixed, then independently checked by a second Opus on 2026-10-10 ([check 2](../research/reviews/dinefwr-castle-check-2.md)) with its six important findings verified and fixed; the fixes themselves are not yet re-read by a third reader, and every "one source: Cadw" label waits on the Cadw guidebook), then the other castles, churches and Talley Abbey, the town's buildings, the bridge and the trains
- [ ] Roman forts and Garn Goch as plans too (they still use the older builders)
- [x] The About panel says hills are exaggerated 2.4×, which models are drawn 2.6× larger and which
      keep their true footprint, with both numbers read from `WORLD` so they cannot drift (2026-10-02)
- [ ] The closed 1864 railway to Carmarthen

## Quality (from the reviews, deferred)

- [ ] Find out why the e2e tests run about twice as slowly on CI's CPU renderer since the 2026-10-03
  merges (High quality by default is the first suspect): time one test at High and at Low on SwiftShader
- [ ] Local e2e on the GPU: with two workers about one page load in 30 never becomes ready (seen four
      times on 2026-10-03, each passing alone); find the cause rather than living with a flake
- [x] Timeline tick labels overlap at both ends: already gone when re-measured on 2026-10-02 (the
      anchors had changed since; no overlap at 1024-1920px in either language). The e2e test that
      fails when two labels overlap was seen to fail on a cramped anchor, then pass
- [x] e2e: each checkout gets its own preview port, derived from its path, and never reuses a server
      (2026-10-02, [ADR 0023](../adr/0023-e2e-own-port-never-reused.md); `E2E_PORT` overrides it)
- [ ] The train is rigid: carriages cut across curves instead of following the track; judge its speed on a real GPU
- [ ] Purity lint as an allow-list rather than a deny-list (or a separate tsconfig without DOM for domain/content)
- [x] Place labels: `namedFrom` is now required ([ADR 0024](../adr/0024-place-names-carry-a-required-date.md));
      the Roman forts (2003), the bridge (1700, when the first drawn bridge appears) and Garn Goch
      (1974, the oldest use we hold; see open questions) say "(today)" before then (2026-10-02).
      The forts and the bridge have no map label, so the rule now lives in one domain function
      (`namedLater`) used by both the labels and the moment card, which never applied it before
- [ ] Performance: move land-cover classification to the GPU. Measured 2026-10-02 on a real GPU:
      scrubbing was 2fps because every slider step recoloured 153,944 triangles on the CPU, rebuilt
      the forest's instance buffers and re-rendered the shadow map; throttling that heavy pass to every
      150ms brought it to about 15fps, and a shader would remove it
- [x] Keyboard help: `?` or the Keys button shows the shortcuts and the click controls; Escape closes it (2026-10-02)
- [x] Place labels no longer sit under the panels, the compass or the timeline: they avoid every
      on-screen panel, using their measured size (found by screenshot, 2026-10-02)
- [x] The compass no longer covers the conversation, info and debug panels (found by screenshot, 2026-10-02)
- [x] Place labels overlap each other on the overview ("Llandeilo" and "Dinefwr" at c. AD 74, seen
      2026-10-02): now placed in priority order (the current moment's place first, then names in use
      at that date, then content order); a label that would overlap an earlier one waits until
      the camera separates them (e2e test seen failing first)
- [ ] Performance: the glTF loader fetches Babylon's PBR material code (~57KB gzipped) though models get our own material; skip it if first load feels slow
- [x] Modern Welsh voices: every conversation with a modern Welsh line shows an "About the voice" note:
      a standard voice, not southern speech (s next to i as "sh", *moyn*). Research checked on
      2026-10-02: the first wording had the rule backwards. Four sources were added (language S35-S38),
      three read directly; they support "southern", not Llandeilo specifically

## Proposed (under discussion)

- [ ] In-app feedback: a Feedback button and a "Report a correction" link in every ⓘ, opening a
      pre-filled GitHub issue ([`design/feedback.md`](../design/feedback.md); plain issues, ADR 0019 and 0020);
      a relay only if family members lack GitHub accounts
- [ ] Analytics: cookieless usage counts and custom events, plus anonymous load-error reporting
      ([`design/analytics.md`](../design/analytics.md))
- [x] Train steam trailing from the chimney, and train sound that grows as the camera nears (2026-09-28)
- [x] Previous / Next through key dates, with the camera flying to each (2026-09-28)
- [x] Desktop only, with a dismissible banner on phones and tablets (2026-09-28, [ADR 0015](../adr/0015-desktop-only.md))
- [x] A researched 1850s train built in Blender, dated 1857–1888 with its own ⓘ; a placeholder after
      the Great Western took over (2026-09-28, [ADR 0017](../adr/0017-hybrid-modelling.md))
- [x] Compass showing the heading; click to face north (Dewi, 2026-09-28)
- [x] Tap the train to follow it with the camera; Stop, a flight or Whole valley ends it (Dewi, 2026-09-28)
- [ ] More things to follow: animals, carts, drovers, boats, once they exist

## Agreed 2026-10-16 (Dewi, from issues #3 and #4)

- [ ] **The fort's buildings sit on their ground, not under it** ([#3](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/3)): research whether the barracks stood on levelled terraces (the excavator's levelling for Fort 2; the outer ditch "cut from a higher level"; what the magnetometry shows), then draw terraced platforms as period ground edits (reconstructed, ADR 0049) or seat each building on the ground, with an e2e that no building's footprint is buried by more than its footing.
- [ ] **Dinefwr Castle at 2m LiDAR** ([#4](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/4)): a `dinefwr-castle` area in `tools/terrain/lidar-areas.json` round Coflein's SN 61150 21731, rebuilt; needed by the Dinefwr Blender model too.
      **Built 2026-10-16, not ticked** (Claude, under the proactive mandate; [ADR 0049](../adr/0049-lidar-terrain-tiles-blended-into-terrain-50.md)
      amended, [`data/lidar.md`](../data/lidar.md#the-castle-area-2026-10-16)): path steps 1, 4 and 6 are done (a 1km area centred on
      Coflein's reference, 29 tiles at 2m, `lidar.bin` 3.92MB; the area test seen failing first; looked at on the GPU at 120m, 250m, 600m and
      2km, in 2020 and 1282, `docs/images/lidar/*castle*`). Not done: step 5, the second Opus pass. Open for Dewi: whether Coflein's
      reference or the keep's centre in the Dinefwr research (18.5m east, 7m south) should centre the area, and whether 500m is the
      right half-size; neither changes the tiles' content, only how many are at 2m.
- [ ] **The castle's yard floor and the ground under it** (Claude, under the proactive mandate, found 2026-10-16 while looking at the 2m castle area): the Dinefwr castle model stands on one flat floor, and a knoll of the real ground comes up through the courtyard (it did at 10m, more irregularly at 4m). Seat the plan on its ground, or lay a `level` ground edit for the platform ([ADR 0049](../adr/0049-lidar-terrain-tiles-blended-into-terrain-50.md), decision 8); the same family as the forts' buildings in the item above. Not built.
- [ ] **Download the world's assets** ([#4](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/4)): a Downloads section in the app listing our models and the detailed terrain tiles as .glb (Dewi, 2026-10-16: "just offer it as glb"), each with its credit and licence from the asset manifest; the terrain tiles exported to .glb once by a tool, in real metres with their British National Grid origin.

## Agreed 2026-10-09 (Dewi, before the second weekend run)

The three issues come first (Dewi: "If possible please prioritise them"), and their material is credited
rather than licence-checked (Dewi: "ignore licensing problems, just credit the person").

- [x] **LiDAR terrain for the town and the Roman fort area** (shipped in v0.8.0, 2026-10-10; release link commented on the issue, left open) ([#2](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/2)): Welsh Government 1m LiDAR, tiled, levels of detail, base ground separate from period changes, sources and licences recorded.
      **Built 2026-10-09, not ticked** (Claude, under the proactive mandate; [ADR 0049](../adr/0049-lidar-terrain-tiles-blended-into-terrain-50.md),
      [`data/lidar.md`](../data/lidar.md)): the path's steps 1, 2, 4 and 6 are done (agreed; the data and its licence statements
      researched from the publisher's own pages; built, with unit, data and e2e tests each seen red first; looked at on the GPU in
      screenshots at 1282 and 2020), and step 5, a second-Opus review, was run and its findings fixed on 2026-10-10 (roads
      and rails sinking between their vertices, every tree reshuffled, the seam check proving heights only, the credit and
      the data note; the fixes themselves are not re-reviewed); step 3, an independent check of the research, is not done.
      Left over: the ground edits are built and tested but nothing feeds them (the Roman forts landed without using them), and
      objects placed at start do not follow an edit yet (ADR 0049, decision 8); the mesh stops at 4m although the data is 2m;
      WebGPU is untested
- [ ] **The Roman forts and their civilian settlement, detailed in the app** ([#3](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/3)): research first; modular parts, gates that can open, levels of detail; Dewi chose "Detailed in the app" over the low-poly look for the fort.
      2026-10-09: researched and independently checked (`research/roman-forts-and-vicus.md`, draft; check
      [2026-10-09](../research/reviews/roman-forts-and-vicus-check-2026-10-09.md), corrections applied; Claude under
      the proactive mandate, [ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)).
      2026-10-09: **built** ([ADRs 0045, 0046 and 0047](../adr/README.md)): Fort 1, Fort 2, Fort 1's backfilled
      ditches and the vicus as plans of 66, 83, 15 and 18 parts, each part with its own tier, at true size and
      height, with a far and a near mesh, shown on the first Roman key date's card part by part; the placeholder
      boxes (wrong place, angle and roofs) are gone. Seen: screenshots at AD 74, 80, 110 and 140, near and far;
      unit, content and e2e tests. 2026-10-09 (review of the build, ADR 0045 and 0046 amended): Fort 2 starts at 83 so
      the forts never overlap, the settlement is an estimate, ditch profiles are by side, the annex is said, the
      arrival cutscene ends at Fort 1's south-east gate, and the card lists what the slider's year draws. Still to do
      before it is ticked: checking the forts' registration against the LiDAR's saddle and two knolls (issue 2 has landed and the forts stand on it: looked at on the GPU at AD 80, 110 and 140 on 2026-10-10, their ditch and road ribbons and the settlement's roads follow the ground, [`docs/images/lidar/`](../images/lidar/); whether the Coflein-based placement matches the saddle is not judged). Not built (the issue's own later phases): a
      Blender project, animation, walkable interiors, characters
- [ ] **Scripted Blender models for the important landmarks** (Dewi, 2026-10-10: "Make all important as stuff in blender maybe? Or?", [ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md); the pipeline Claude's, under the proactive mandate, [ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md), [`design/blender-models.md`](../design/blender-models.md)).
      **Phase 1 built 2026-10-10, not ticked**: the build sheet, the kit catalogue (ten kits), `npm run models`, the loader, and the Roman
      forts (Fort 1, Fort 2, the settlement) drawn from glb above Low, each part's ⓘ listing its kits while it is drawn from
      the model; unit, content and e2e tests each seen red; looked at on the GPU at AD 80, 84 and 110. The second-Opus review ran
      on 2026-10-10 and its findings were fixed ([ADR 0053](../adr/0053-the-blender-pipeline-sheet-script-fitted-gltf.md)'s
      amendment; the tower kits no longer credit Jay Lane with a stage). Dewi's answers, 2026-10-10: proper textures, edit through
      scripts not the `.blend`, Dinefwr next; and on the note's last questions: commit the glbs ("Commit them"), Low shows
      "Today's simple model" (both built), and "Yes, click parts in 3D" (agreed, not built). A second-Opus re-review of
      the fixes ran the same day and its findings were fixed (ADR 0053's second amendment). Still to do before it is
      ticked: the textures, and clicking a part in 3D (below). The models were run on WebGPU on 2026-10-10 (`npm run e2e:gpu`, Windows Chrome, High: 8 GPU tests and 72 e2e passed, the fort model test among them). Next:
      Dinefwr (once its plan is researched), then Carreg Cennen, Dryslwyn, St Teilo's and Talley, the bridge, the Shire Hall and
      the Provisions Market, the trains (the 1857 train onto this pipeline), then Newton House, Paxton's Tower, Golden Grove and
      Aberglasney. Not built yet: kit libraries, textures, `?tiers`, a CI rebuild job
- [ ] **Click a part of a modelled landmark in 3D to open its ⓘ** (Dewi, 2026-10-10: "Yes, click parts in 3D", answering the Blender note's open question). **Agreed, not built**: phase 2 builds it together with the textures, from the loader's triangle-to-part table (each part's extras already carry its tier, sources and kits). Pressing a part must not fight the map-style camera's drag or a press on a photo pin or label.
- [ ] **D. C. Harries photographs** ([#1](https://github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit/issues/1)): research, with each photo credited to Harries and its holder (no licence check, Dewi 2026-10-09), then a photo layer pinned to where each was taken, with credit and ⓘ.
      **Agreed ✓. Researched ✓ 2026-10-09** ([`research/dc-harries-photographs.md`](../research/dc-harries-photographs.md)):
      31 photographs found and downloaded (`public/photos/harries/`, data and credits in
      `src/content/photographs.ts`), all on People's Collection Wales from the Llandeilo Fawr Town Council
      collection; 28 placed on the OS grid (15 documented, 13 reconstructed), 3 not.
      **Research checked ✓ 2026-10-09** ([independent check](../research/reviews/dc-harries-photographs-check-2026-10-09.md)),
      every correction applied the same day, marked "Corrected 2026-10-09 (independent check)": five dates
      the pictures contradict, the Post Office's point, six wrong descriptions, the 1905 map, the NLW's second
      fonds. **Built ✓ 2026-10-09** ([ADR 0044](../adr/0044-photographs-are-dated-placed-content-with-pins.md)):
      the Photos toggle, camera pins, the photo panel with credit and ⓘ, the About credits, in both languages;
      unit, content and e2e tests (red runs in the [build log](../process/build-log.md)). **Looked at ✓**
      (`docs/images/photo-layer/`). **Still to do: the second-Opus review** before it ships in a release.
      Owner's decisions: the credit wording, whether the layer should be on by default, whether to keep the c. 1900 captions of 2282261 and 2282336 (their ranges
      start at 1920 and 1922 for now, because a motorcycle, a knee-length dress, cloche hats and electric lamps are 1920s), and whether to gather
      other photographers' c. 1900 station and street views. Not built: a "Then and now" flight (no record
      of a camera direction), a way in for the three unplaced photographs, Welsh for the catalogue's words
- [ ] **Photo layer follow-ups** (Claude, proactive, ADR 0027; not started): a count of the photographs
      available at the year on the Photos button so the layer is found; a camera-direction field and "Then and
      now" flight once any record gives one; the other-photographers' views listed in the research note
      (needs an owner decision); the three unplaced photographs in a list
- [ ] Conversations by class in the three slice eras; in-world music and the hunter-gatherer scenes (after their research checks); a GPU terrain shader for smooth scrubbing; the later trains and the Dinefwr, Carreg Cennen and bridge models (Dewi picked all four on 2026-10-09)

## Agreed for the weekend run (Dewi, 2026-10-02)

Moved here from "Proposed" when Dewi agreed them. Each goes through the full path above.

- [ ] Conversations by class at every key date ([`design/conversations-by-class.md`](../design/conversations-by-class.md))
- [ ] Accurate models of the important buildings, phase by phase ([`design/models.md`](../design/models.md)).
      2026-10-02: researched and checked (`research/building-models.md`); Talley and Dryslwyn rebuilt
      in phases. Still to do from the same research: Dinefwr (keep in the south-east angle, ward 34-38m,
      north-west tower only from the later 13th century), Carreg Cennen (gatehouse centred on the north
      wall, barbican route, second cross wall), the bridge (a stone bridge by 1577)
- [ ] Effects per event: forge sparks, siege, bells, weather ([`design/timeline-experience.md`](../design/timeline-experience.md)).
      2026-10-03: a recorded fire is now a dated `burning` feature drawn as a dark plume (first at
      1213, [ADR 0038](../adr/0038-recorded-burnings-are-dated-features.md)); the 1403 burning of
      Llandeilo could use it next
- [ ] The later trains (the Great Western from 1873, the LNWR and LMS through trains, British Rail,
      today's Heart of Wales line): researched and checked 2026-10-02 (`research/railway-later.md`); models
      still to build. Since 2026-10-03 the drawn train is a steam placeholder to 13 June 1964 and a
      placeholder two-car diesel unit, with no steam, after it

## Agreed 2026-10-02 (Dewi, during the weekend run)

- [ ] **An immersive sound at every point in time**: what each era and place sounded like (fields,
      forge, church, market, river, railway, roads), mixed by where the camera is and the time of day,
      every sound sourced or labelled reconstructed, audio under any open licence, NC and SA included, never all-rights-reserved
      ([ADR 0026](../adr/0026-open-licences-including-nc.md); corrected 2026-10-02, this line said
      CC0/CC-BY/public domain only)
      (Dewi: "each point in time sounds effects ... really immersive experience"). Supersedes the
      Proposed "Immersive sound and assets" item ([`design/sound-and-assets.md`](../design/sound-and-assets.md))
- [ ] **Black-swan events from afar, as they reached the valley**: distant shocks (volcanic
      eruptions thousands of miles away, pandemics, famines, wars) shown only where a source records
      their effect here or in this part of Wales, with the distant cause as context (Dewi: "black swan
      events such as a volcano erupting thousands of miles away"). Brings the later-phase "Ripples from
      afar" forward. **Part done 2026-10-03** (branch `feat/battles-and-black-swans`): the two
      events the checked note records here, the 1849 cholera (a minor marker, card and almanac only:
      one partly illegible report) and the 1918 influenza (a key step, autumn from the record), each
      with content tests and an e2e flow seen red first; screenshots at 1849 and 1918. The almanac's
      stale "no case in Llandeilo" is corrected. First second-Opus review done 2026-10-03 and its
      findings fixed (markers fanned into lanes so 1849 can be clicked, [ADR 0039](../adr/0039-timeline-markers-fan-into-lanes.md);
      the cholera almanac line split into dated entries). **Still to
      do**: the regional-only ripples (Black Death, 1816, potato blight, cattle plague, Krakatoa) as
      cards that say where the effect is recorded, and a second witness for 1849
- [ ] **Music through time and place**: what was played and sung in and around Llandeilo in each era
      and by each class (harp and crwth, plainchant at Talley, the bards, ballads, hymns and chapel
      singing, eisteddfodau, brass bands), heard in the scene and explained in the almanac, from
      sources and licensed recordings or performed from period notation (Dewi: "music through time and
      places"). The app stays inside the agreed ten miles or so around Llandeilo. Dewi chose
      in-world music where the research puts it, plus a light labelled score that can be turned off.
      Research checked 2026-10-09 and the corrections applied ([review](../research/reviews/music-through-time-check-2026-10-09.md));
      two recordings are US-licence flagged and no music asset ships yet
- [x] **A Begin screen**: a title card with the Ovid motto; its click turns the sound on (browsers
      need one) and can start the opening flight (Dewi chose this, 2026-10-02). Done 2026-10-03: the
      loading card becomes the Begin card once the valley is ready, veiled over the scene, with the
      motto, its English or Welsh meaning, the source (Metamorphoses XV) and a language switch.
      Begin turns the sound on. Deep links (`?year=`, `?t=`, `?place=`), `?debug` and automated
      browsers skip it; `?begin=1` forces it, `?begin=0` hides it. e2e test seen red first; screenshots
      at 1282 (English) and 1880 (Welsh). The opening flight waits for its own item. Motto checked
      in two texts ([findings](../research/findings.md)); its Welsh waits for the parked human check.
      Second-Opus review 2026-10-03: the card was still see-through (labels showed through the
      motto) and keys reached the app behind it; both fixed, each with an e2e assertion seen red
      first (a solid card background; the year and the keys panel unchanged after ArrowRight and ?),
      screenshots retaken at 1282 and 1880. A second review the same day found Tab still reached the
      app behind the card (36 presses, then arrows moved the year): the app and the canvas are now
      `inert` while the card waits, and the e2e test tabs 40 times, then presses ArrowRight, seen red
      first ("Tab 4 reached the app behind the card"). The second-Opus review of those fixes
      (2026-10-03) raised nothing CRITICAL or IMPORTANT on them, so step 5 stands (one suggestion: the
      testing map now says what the Tab test checks)
- [ ] **Quality up for powerful GPUs** (Dewi: "assume ... beefy gpus"): raise the defaults (shadow
      resolution, post-processing, vegetation density, particles, reflections). A small High / Medium
      / Low menu (Dewi: "dont put too much effort in to this tho ... concentrate on high mode",
      High the default), mapping onto one quality setting that replaces `?fx=low`. **Part done
      2026-10-03** ([ADR 0031](../adr/0031-one-graphics-quality-setting.md)): the menu and the one
      setting; High raises shadows to 8192² with high filtering, the pixel cap to 2x and tree density
      from 0.62 to 0.9; Medium keeps the old density and drops bloom and depth of field; Low draws
      0.31. Post-processing at High is what it was before (bloom, depth of field and sharpening were
      already on). Remembered per browser; `?fx=low` is an alias for Low. e2e test seen red first,
      reading the renderer's live state (red with the forest or the bloom apply line removed);
      screenshots at 1282 High and Medium, 1843 High and Low. Second-Opus review 2026-10-03 done,
      its findings fixed. **Still to do**: particles and reflections, and a measurement on a real
      desktop GPU
- [ ] **Cutscenes at key dates** (Dewi: "romans marching in to llandeilo -- with a cutscene ... i am a
      massive fan of cutscenes"): short, skippable cinematic sequences (camera moves, figures moving on
      sourced routes, sound, music, narration and captions) built from one data-driven cutscene model,
      not code per era, every element labelled by provenance, with a narrator in the UI language
      (Dewi's choice) and captions always on. First: the Roman army arriving at
      Dinefwr, c. AD 74. Builds on the agreed "people arriving from afar" journeys, the guided tour and
      the opening cinematic flight. **2026-10-03: the engine and the Roman arrival are built** on branch
      `feat/cutscene-roman-arrival` ([ADR 0041](../adr/0041-cutscenes-as-data-on-one-clock.md)): researched
      and checked (roman-arrival and its 2026-10-02 check), built with unit tests and an e2e flow seen red
      first, screenshots looked at across the scene in English and Welsh. Second-Opus review 2026-10-03
      done; its CRITICAL (the later fort standing on the ridge through the scene) and IMPORTANT (Escape on
      an ⓘ skipped the scene) findings fixed with tests seen red first, and its suggestions applied
      ([ADR 0042](../adr/0042-a-scene-draws-its-own-year.md), [ADR 0043](../adr/0043-one-polyline-helper.md)).
      **Not ticked**: the fixes have not had their own second-Opus pass, and the other scenes (Dryslwyn
      1287, the Walk Gate 1843, the first train 1857, the 1848 flood) are not started
- [ ] **For Dewi: the later Roman fort shows at the AD 74 key date.** `roman-fort-b` (c. AD 83) fades
      in over the slider before its date, so at the AD 74 key date it is drawn at 0.93 beside fort A,
      though Coflein puts it later and over part of the first. On main since before the cutscene; inside
      a scene it is now hidden ([ADR 0042](../adr/0042-a-scene-draws-its-own-year.md)). Whether "c."
      dates should fade in before their year at a key date, or stop at the nearest key date, changes
      [ADR 0034](../adr/0034-exact-dates-draw-nothing-outside-them.md) and is his call. Found by the
      second-Opus review, 2026-10-03
- [ ] **Invasions and raids that reached the valley** (Dewi: "norman, viking etc etc etc invasions"):
      Irish settlement in Dyfed, Viking raids, the Normans after 1093, the English conquest of 1277-83,
      Glyndŵr in 1403, the Civil War, each as key dates (and cutscenes where the research supports one),
      shown only as far as the sources put them in this valley; a raid recorded only on the coast is
      shown as news reaching here, not invented here. **Part done 2026-10-03** (branch
      `feat/battles-and-black-swans`): the two invasions the checked note puts inside the area, 1213
      (Llandeilo burned, Dinefwr besieged, with smoke over the town, [ADR 0038](../adr/0038-recorded-burnings-are-dated-features.md))
      and 1257 (Coed Llathen and Cymerau, at the recorded midday), with content and snapshot tests and an
      e2e flow seen red first; screenshots at 1213 and 1257. First second-Opus review done 2026-10-03 and
      its findings fixed (1213 arrives at a chosen 13:00 so the smoke shows; the 1257 ⓘ names the
      Llanarthne reading).
      **Still to do**: news cards for raids recorded only nearby (St Davids, Aber Tywi 1044, 1116,
      Carmarthen 1645), and Dewi's choice of Cymerau markers (none shown meanwhile)
- [ ] **Early people hunting and gathering** (Dewi: "early people hunting stuff"): Late Upper
      Palaeolithic and Mesolithic hunter-gatherers in the valley, what they hunted, fished and gathered
      in each environment, with the animals of "animals through time", as scenes and cutscenes at the
      level the finds support (here, nearby, or Wales-wide analogy). Research checked 2026-10-09 and the
      corrections applied ([review](../research/reviews/hunter-gatherers-check-2026-10-09.md)); the
      Waun Fignen Felen key date and almanac entry moved. Still to do: the scenes themselves, and a
      decision on Heneb's HER terms ([open questions](../research/open-questions.md))

## Claude's own ideas, building first (proactive mandate, 2026-10-02)

From the ranked ideas board ([`../design/ideas.md`](../design/ideas.md); full notes in
[`../design/ideas-2026-10-02-ranked.json`](../design/ideas-2026-10-02-ranked.json)). Same path as any item.

- [ ] **Honest ambience, step one**: every ambient sound bed carries provenance; the medieval church
      bells at AD 800 and 1250 go, since no source records a medieval bell here (event-effects).
      Done 2026-10-03: every bed has its own dated track of points in `src/content/ambience.ts`, each
      heard point with a provenance, and no bed fades in from silence, so none is heard before the
      date of the point that names it (bells and the train from 20 January 1857; the bells at 800,
      1250, 1600 and 1850, the train at 1850 and the market at 1250 had no source either); `?debug`
      lists each sounding bed with its reason, and what it is fading towards
      ([ADR 0028](../adr/0028-ambient-beds-carry-provenance.md)). Reviewed once by the second Opus:
      one CRITICAL (bells still faded in from 1851) and six IMPORTANT findings, all fixed. Red runs:
      the bells-and-train and no-fade-in content tests, the two `soundAt` unit tests, and the
      debug-overlay e2e test. Screenshots at AD 800, 1282, 1700, 1855, 1900 and 2026. The gaps it
      left are in [open questions](../research/open-questions.md). *Unticked 2026-10-03*: the tick
      skipped step 3, since `soundscapes.md`, which the beds cite most, had not been checked. That check
      ran on 2026-10-03 ([review](../research/reviews/soundscapes-check-2026-10-03.md)) and its
      corrections are applied (bed reasons and sources, a 1290-91 fair source); steam now ends on
      13 June 1964 and a reconstructed diesel-unit bed runs to today, seen red first. Still to do:
      the second-Opus review of those changes (step 5). *2026-10-03*: Dewi decided the market starts in the Middle Ages ("yes ok"); it now starts with the fair granted on 20 May 1290, seen red first
- [ ] **Honest ambience, step two**: sound shaped by distance and space
- [ ] **Contested points, shown as contested**: one register of every source disagreement, a
      `Contested<T>` type with exactly one preferred reading, a witnesses card, and a ⇄ switch only
      where the readings draw differently (Dryslwyn's middle ward, St Teilo's tower, 1403)
- [ ] **When are we?** a guess-the-year game: hidden clues, read the landscape, a reveal that explains
      which features gave it away and how firmly, by provenance. Built 2026-10-03
      ([ADR 0029](../adr/0029-guess-game-hides-giveaways-by-one-root-class.md)): `src/domain/guess.ts`
      (clue ranking seen red, then green), `src/ui/guess.ts`, one e2e flow (seen red with the hiding
      rule removed), screenshots at 800 BC, 1287 and 1987. Second-Opus review run 2026-10-03: firm
      now needs exact dates, phases meeting at the year no longer both count, the same-scene check
      covers people, woodland and sky, the climate clue's snow claim follows the season, and the
      game panel steps aside for the almanac, each seen red first; screenshots at 1287 and 1485
      (summer and winter). The open finding (two answers, c. 800 BC and AD 74, sit on labelled ticks)
      was decided under the proactive mandate: tick labels are hidden during a round
      ([ADR 0029](../adr/0029-guess-game-hides-giveaways-by-one-root-class.md),
      [decision log](../process/decision-log.md)). *Unticked 2026-10-03*: it had been ticked before
      that fix was screenshotted or reviewed, and the review found the shipped fix hid the whole scale
      (a tick was only its label). Each tick now draws a mark that stays visible, the e2e test checks
      the mark while the label is transparent (seen red first), and a round was screenshotted. The
      second-Opus review of that fix (2026-10-03) found ADR 0029 still describing the old same-scene
      guard, and that the night light was compared by key identity; both fixed (the light now compares
      what a key draws, seen red first). Still to do: the second-Opus review of those fixes (step 5)
- [ ] **Light after dark**: hearth, rushlight, candle, gas, electric light and the blackout, as content
      keys like the climate, each sourced. *Built 2026-10-03, merged to main, not yet ticked*:
      research in [light-after-dark](../research/light-after-dark.md), keys in `src/content/lamplight.ts`
      ([ADR 0030](../adr/0030-night-light-as-dated-content-keys.md)), windows, hearths and new street
      lamps read the resolved state, unit and e2e tests seen red. Second Opus review done the same day
      and its findings fixed: street lamps only in the town north of the Tywi, each key says how sure
      its date is ("by" or "on"), a second source for the blackout and the 1945 lifting, and a "Light
      after dark" almanac entry with the ⓘ. Step 3 done 2026-10-03: the independent check
      ([review](../research/reviews/light-after-dark-check-2026-10-03.md)) found two contradicted and
      thirteen partly supported claims; its corrections are applied to the note and the keys (the
      dim-out from 17 September 1944 with ordinary curtains, the 1945 lifting
      not "everywhere", the court's candles "in the Middle Ages", no light before 7800 BC,
      [ADR 0032](../adr/0032-night-light-before-the-first-key-and-period-dates.md)); screenshots of
      the night at 1903 and 1950. Homes on flame light in 1902 came from the second-Opus review, not
      the check. The second-Opus review of the fixes (2026-10-03) found the 1902 text claiming homes
      kept to gas, the electric street lamps drawn gas-orange, the S21/S22 links swapped and the
      dim-out given for Llandeilo without its listed-areas caveat; all fixed (the street colour test
      seen red first), with the Carmarthen Journal's tradespeople item added as light:S31. Still to do:
      the second-Opus review of those fixes (step 5)
- [ ] **When did we find out?** a discovery rail and a "found" line on every ⓘ (the forts in 2003,
      Lhuyd's trilobite in 1698, the Gospels' history)

## Agreed ideas (Dewi, 2026-09-28: "add all of them to todo list")

Each needs its research or design first, like everything else. The ideas board keeps their history.

**Getting around**
- [ ] Guided tour: a play button that steps the key dates with camera, sound and narration
- [ ] Shareable links that keep the year, the place and the camera view
- [ ] "What was here?": click any spot for its history across time
- [ ] A place's own timeline: step through one site's phases (Dinefwr: Welsh castle, 1282 works, ruin, folly, Newton House)
- [ ] Compare two years: side by side, or a before/after wipe
- [ ] Street level: walk a town at eye height

**People and daily life**
- [ ] A day in the life: follow the family from dawn to dusk at a key date (needs time of day)
- [ ] Follow the family: jump only to their scenes, with a family-tree panel; click a person to jump to their era
- [ ] Welsh narration with English subtitles

**History and evidence**
- [ ] Place names through time (Dynevor → Dinefwr, Llandilo → Llandeilo, Talley/Talyllychau), dated and sourced
- [ ] "How do we know?": every ⓘ quotes the primary text as well as citing it
- [ ] Sources page listing every source and what it supports
- [ ] Evidence map: colour everything on screen by provenance tier
- [ ] Newspaper clippings at key dates from Welsh Newspapers Online (check the page-image licence first)
- [ ] Historic maps draped on the terrain at Victorian dates: tithe maps, first-edition OS (check licences)
- [ ] Search box over the knowledge base (a static index, no AI at runtime)
- [ ] Research coverage report: which content cites which notes, and which notes are still drafts
- [ ] A human expert pass: a local history society or Dyfed Archaeological Trust, and a Welsh speaker (outward-facing, so Dewi decides who and when)

**Fun**
- [ ] Games: "spot the invented" (guess documented vs imagined, then reveal) and mini-quizzes ("how many shops in 1858?") with answers linked to sources
- [ ] Postcard and poster export: the current view with year, caption and credits, and a high-resolution render

**Quality**
- [ ] Visual regression tests: baseline screenshots of key years compared on every push

**More (Dewi, 2026-09-28)**
- [ ] Animals through time, from before there were any: Ordovician seas, ice-age herds, the wildwood's aurochs, elk, boar, wolves, bears and beavers, farmed animals, deer parks, red kites, salmon, drovers' herds; roaming, grazing, hunted, farmed and disappearing, each only where the research supports it
- [ ] People arriving from afar, as journeys along the real roads and river: Roman soldiers, English armies in 1282, the canons coming to Talley, merchants and pilgrims, drovers leaving, railway navvies, evacuees, visitors today
- [ ] A way to support the project: a GitHub Sponsors link in About and the README, no tracking. Waiting on Dewi setting up his Sponsors page
- [ ] The Tywi's wandering course: where the river ran in each era, from LiDAR old channels (research the dates)
- [ ] "Nothing perishes" ghosts: faint outlines of vanished buildings and the medieval town over today
- [ ] Drovers' roads: cattle herds driven along documented routes, followable with the camera
- [ ] A Rebecca night: a set-piece of one attested 1843 attack, labelled as far as the sources go
- [ ] Travel time from Llandeilo by era (foot, coach, train, car), shown as rings
- [ ] Population sparkline along the timeline, with honest uncertainty bands
- [ ] Sky events: comets, eclipses and storms the chronicles record, only where a source exists
- [ ] An opening cinematic flight from deep time to today, under the Ovid motto
- [ ] Real Carmarthenshire voices: St Fagans oral-history clips (check reuse terms)
- [ ] The 1698 trilobite (Lhuyd's letter; corrected from 1688) as an easter egg, cross-checked
      (`deeptime:S18`, `deeptime:S43`)

## Later phases (agreed)

- [ ] Deep time before people: geology, the Ordovician Llandeilo stage, ice ages ([research](../research/deep-time-and-natural-history.md))
- [ ] Natural-history layer through every era (animals arriving and dying out, forest, climate)
- [ ] **Key dates before, during and after the last Ice Age**, with the animals of each (Dewi,
      2026-09-28): e.g. the warm interglacial before it, the ice over the Tywi valley and the Black
      Mountain, the tundra as it melted, and the post-glacial wildwood. Each with its animals (the
      deep-time note lists mammoth, reindeer, hyena, aurochs, elk, wild boar, bear, lynx, wolf, and
      when each died out) and shown in the scene. Needs research: what is attested inside the ten
      miles versus Wales generally, and calibrated dates ([research](../research/deep-time-and-natural-history.md))
- [x] ~~Ripples from afar~~: brought forward on 2026-10-02 as "Black-swan events from afar" above
- [ ] **The big national and world events, as they touched the valley** (Dewi, 2026-09-28): the
      two World Wars (who from here served and died, the war memorials, evacuees, land girls, Home
      Guard, rationing, the war-work at local sites), the Civil War, the Black Death, the Reformation
      and Dissolution (Talley), the Napoleonic Wars, the Chartists, the Depression, the 1918 flu,
      and today's events. Each researched for its local effect first, with the national story as
      context, and dated key dates on the slider
- [ ] LiDAR close-up terrain at the places you fly into

## 💡 Ideas

See [`../design/ideas.md`](../design/ideas.md) for our own ideas; suggestions from other people are in
"From GitHub issues" above.

---
title: Backlog
kind: index
status: current
updated: 2026-10-02
---

# Backlog

## How this list works

The one list of work ([ADR 0022](../adr/0022-one-todo-file.md)). Unagreed ideas live on the ideas
board, [`../design/ideas.md`](../design/ideas.md), and in "From GitHub issues" below; the "Proposed"
section is under discussion. Only Dewi agrees an item. Tick items off in the same commit that does
them. (Corrected 2026-09-28: this file had gone stale, still listing the review and the extra e2e
tests as not done.)

An item is ticked only once it has been through its path, in order:

1. **Agreed** by Dewi.
2. **Researched**, for content and research items: a note in `docs/research/` with its sources.
3. **Research checked** by an independent pass against those sources, before building on it.
4. **Built**, with a test that was seen to fail first where it fixes a bug.
5. **Reviewed** by the second Opus pass, its CRITICAL and IMPORTANT findings fixed.
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
- [ ] Open it in desktop Firefox and Safari: every automated check runs in Chromium, and WebGPU support differs
- [ ] Record performance numbers in CLAUDE.md: first load, scrub frame rate, terrain recolour time
- [ ] Listen to the ambient sound and voices on real speakers; tune levels
- [ ] Watch the smoke and the train move at a real frame rate

## Content and research

- [ ] Second research pass on the gaps in [`open-questions.md`](../research/open-questions.md):
      the primary Roman forts report, Brut y Tywysogion on 1282, Gerald of Wales on clothing,
      Victorian wages and prices, Dryslwyn after 1287, a sourced 1588 Bible passage
- [ ] Talley Abbey: replace Wikipedia coordinates with a Coflein or Cadw grid reference, cited in the
      research note ([`era-medieval-to-1282.md`](../research/era-medieval-to-1282.md)), and check its
      position by screenshot
- [x] 1282 moment card: "16 June 1282 by the Welsh annals (some histories say 17 June)", citing the
      Annales and Pilling (classes S2, S8); its Welsh had also dropped the commander's dismissal (2026-10-02)
- [ ] Roman forts: use the primary report's 3.85ha and 1.54ha to revisit the "8 vs 12 acres" contradiction
- [ ] Earliest environment keyframes (12,500–10,900 BC): check they use calendar, not uncalibrated pollen, dates
- [ ] Railway loose ends: Victoria's weight (18 vs 14 tons), the unconfirmed "Victor" of 1864, the 1858 Beyer Peacock engines
- [ ] Independent verification of every research note, as conversations-by-class had (it found 13 corrections)
- [ ] Check every place against its Coflein grid reference (only some were verified)
- [ ] Human check of the Welsh text (parked)
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
- [ ] Sound follows the clock: birds at dawn, owls and quiet at night
- [ ] Conversations and speech bubbles follow the clock: nobody chatting outdoors at 3am
- [x] Rivers stay vivid blue at night while the land goes dark: already fixed when re-shot on
      2026-10-02 (1880 summer 23:00, 1282 winter 02:00 and 1880 noon): the rivers go dark navy with
      the land. No change was needed
- [ ] Re-check autumn trees at overview distance by screenshot (the "glitter" fix was never re-shot)

- [ ] Garn Goch ramparts: follow the real contour and the scree at the south-west gate
- [ ] Buildings with period styles (today `town.style` only decides which towns get chimney smoke)
- [ ] Contact shadows under people and buildings
- [ ] A low-sun, warmer light option; haze towards the rim
- [x] Better castle models from their documented plans (Dinefwr's great round tower, Carreg Cennen's gatehouse):
      landmark models built phase by phase from the research, 2026-09-28 ([`design/models.md`](../design/models.md))
- [ ] Close the modelling research gaps listed in [`design/models.md`](../design/models.md) (Coflein plans, Cadw guidebooks)
- [ ] Decide option B or C for the landmark models (realistic textures), or keep option A
- [ ] Roman forts and Garn Goch as plans too (they still use the older builders)
- [x] The About panel says hills are exaggerated 2.4×, which models are drawn 2.6× larger and which
      keep their true footprint, with both numbers read from `WORLD` so they cannot drift (2026-10-02)
- [ ] The closed 1864 railway to Carmarthen

## Quality (from the reviews, deferred)

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
- [ ] Performance: move land-cover classification to the GPU if recolouring is slow on real hardware
- [x] Keyboard help: `?` or the Keys button shows the shortcuts and the click controls; Escape closes it (2026-10-02)
- [x] Place labels no longer sit under the panels, the compass or the timeline: they avoid every
      on-screen panel, using their measured size (found by screenshot, 2026-10-02)
- [x] The compass no longer covers the conversation, info and debug panels (found by screenshot, 2026-10-02)
- [ ] Place labels overlap each other on the overview ("Llandeilo" and "Dinefwr" at c. AD 74, seen
      2026-10-02): labels avoid panels but not one another
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
- [ ] Immersive sound and assets: real recordings, spatial sound, generated or openly licensed
      assets ([`design/sound-and-assets.md`](../design/sound-and-assets.md))
- [x] Train steam trailing from the chimney, and train sound that grows as the camera nears (2026-09-28)
- [x] Previous / Next through key dates, with the camera flying to each (2026-09-28)
- [x] Desktop only, with a dismissible banner on phones and tablets (2026-09-28, [ADR 0015](../adr/0015-desktop-only.md))
- [x] A researched 1850s train built in Blender, dated 1857–1888 with its own ⓘ; a placeholder after
      the Great Western took over (2026-09-28, [ADR 0017](../adr/0017-hybrid-modelling.md))
- [x] Compass showing the heading; click to face north (Dewi, 2026-09-28)
- [x] Tap the train to follow it with the camera; Stop, a flight or Whole valley ends it (Dewi, 2026-09-28)
- [ ] More things to follow: animals, carts, drovers, boats, once they exist

## Agreed for the weekend run (Dewi, 2026-10-02)

Moved here from "Proposed" when Dewi agreed them. Each goes through the full path above.

- [ ] Conversations by class at every key date ([`design/conversations-by-class.md`](../design/conversations-by-class.md))
- [ ] Accurate models of the important buildings, phase by phase ([`design/models.md`](../design/models.md))
- [ ] Effects per event: forge sparks, siege, bells, weather ([`design/timeline-experience.md`](../design/timeline-experience.md))
- [ ] Research the later trains (Great Western from 1889, British Rail, today's Heart of Wales line)

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
- [ ] The 1688 trilobite as an easter egg (single-source so far)

## Later phases (agreed)

- [ ] Deep time before people: geology, the Ordovician Llandeilo stage, ice ages ([research](../research/deep-time-and-natural-history.md))
- [ ] Natural-history layer through every era (animals arriving and dying out, forest, climate)
- [ ] **Key dates before, during and after the last Ice Age**, with the animals of each (Dewi,
      2026-09-28): e.g. the warm interglacial before it, the ice over the Tywi valley and the Black
      Mountain, the tundra as it melted, and the post-glacial wildwood. Each with its animals (the
      deep-time note lists mammoth, reindeer, hyena, aurochs, elk, wild boar, bear, lynx, wolf, and
      when each died out) and shown in the scene. Needs research: what is attested inside the ten
      miles versus Wales generally, and calibrated dates ([research](../research/deep-time-and-natural-history.md))
- [ ] Ripples from afar: distant events that reached the valley, only where a source shows the local effect
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

---
title: Backlog
kind: index
status: current
updated: 2026-09-28
---

# Backlog

The one list of what is left, what is planned, and what is only an idea. Items marked 💡 are ideas
nobody has agreed to yet; everything else is agreed scope. Tick items off in the same commit that
does them. (Corrected 2026-09-28: this file had gone stale, still listing the review and the extra
e2e tests as not done.)

## Done: the vertical slice (2026-09-26)

- [x] Real terrain, rivers, buildings, railway, roads and woodland from OS OpenData
- [x] ~30 key dates, ~40 features through time, moment card, place labels and flights
- [x] Six conversations of the imagined family, 28 voices (Welsh, English, Latin via Diego)
- [x] Almanac (32 entries), language by class (12 periods), About and credits
- [x] Procedural ambient sound, hearth smoke
- [x] Three independent Opus reviews; every CRITICAL and IMPORTANT finding fixed
- [x] Bundle 1.6MB → 387KB gzipped, with a CI budget
- [x] 24 unit and integrity tests, 9 e2e tests in CI, deploy to GitHub Pages
- [x] Knowledge base in `docs/`, README with screenshots

## Next: verify on real hardware

- [ ] Check WebGPU on a real desktop GPU (everything automated uses WebGL2 via SwiftShader)
- [ ] Record performance numbers in CLAUDE.md: first load, scrub frame rate, terrain recolour time
- [ ] Listen to the ambient sound and voices on real speakers; tune levels
- [ ] Watch the smoke and the train move at a real frame rate

## Content and research

- [ ] Second research pass on the gaps in [`open-questions.md`](../research/open-questions.md):
      the primary Roman forts report, Brut y Tywysogion on 1282, Gerald of Wales on clothing,
      Victorian wages and prices, Dryslwyn after 1287, a sourced 1588 Bible passage
- [ ] Talley Abbey: replace Wikipedia coordinates with a Coflein or Cadw grid reference
- [ ] Check every place against its Coflein grid reference (only some were verified)
- [ ] Human check of the Welsh text (parked)
- [ ] Mark research notes `reviewed` once each has had an independent pass against its sources
- [ ] Remaining eras filled in: Roman in depth, early medieval, Tudor and Stuart, Georgian, modern
- [ ] More conversations per era, and the family at more key dates
- [ ] 1403 Glyndŵr, 1287 Dryslwyn siege, 1843 Walk Gate as scenes (research is ready)

## Look and feel

- [ ] Garn Goch ramparts: follow the real contour and the scree at the south-west gate
- [ ] Buildings with period styles (the `town.style` field is not yet read by the renderer)
- [ ] Contact shadows under people and buildings
- [ ] A low-sun, warmer light option; haze towards the rim
- [ ] Better castle models from their documented plans (Dinefwr's great round tower, Carreg Cennen's gatehouse)
- [ ] The closed 1864 railway to Carmarthen

## Quality and accessibility (from the reviews, deferred)

- [ ] Purity lint as an allow-list rather than a deny-list (or a separate tsconfig without DOM for domain/content)
- [ ] Place labels: "(today)" for the Roman forts too; review each place's `namedFrom`
- [ ] Focus management for the info panel (move focus in and restore it on close)
- [ ] Performance: move land-cover classification to the GPU if recolouring is slow on real hardware
- [ ] Remove or implement the unused `town.style` field

## Proposed (under discussion)

- [ ] In-app feedback: a Feedback button and a "Report a correction" link in every ⓘ, opening a
      pre-filled GitHub issue, plus issue templates ([`design/feedback.md`](../design/feedback.md));
      a relay only if family members lack GitHub accounts
- [ ] Analytics: cookieless usage counts and custom events, plus anonymous load-error reporting
      ([`design/analytics.md`](../design/analytics.md))
- [ ] Immersive sound and assets: real recordings, spatial sound, generated or openly licensed
      assets ([`design/sound-and-assets.md`](../design/sound-and-assets.md))
- [ ] Conversations by class at every key date ([`design/conversations-by-class.md`](../design/conversations-by-class.md))
- [ ] Accurate models of the important buildings, phase by phase ([`design/models.md`](../design/models.md))
- [ ] Effects per event: train smoke and sound first ([`design/timeline-experience.md`](../design/timeline-experience.md))
- [x] Previous / Next through key dates, with the camera flying to each (2026-09-28)

## Later phases (agreed)

- [ ] Deep time before people: geology, the Ordovician Llandeilo stage, ice ages ([research](../research/deep-time-and-natural-history.md))
- [ ] Natural-history layer through every era (animals arriving and dying out, forest, climate)
- [ ] Ripples from afar: distant events that reached the valley, only where a source shows the local effect
- [ ] LiDAR close-up terrain at the places you fly into

## 💡 Ideas (not agreed)

The living ideas board, with status per idea, is [`../design/ideas.md`](../design/ideas.md). New
design proposals from 2026-09-28: previous/next and camera shots per key date, effects per event,
conversations by class at every key date, realistic landmark models ([`../design/`](../design/README.md)).


- 💡 A guided tour: "play history" that moves the slider through the key dates with narration
- 💡 Shareable links that keep the camera view, not just the year and place
- 💡 Seasons and day/night, with weather per era (the Little Ice Age, the Medieval Warm Period)
- 💡 "What was here?" click anywhere on the map for the almanac of that spot
- 💡 Compare two years side by side, or a before/after wipe
- 💡 A family-tree panel for the imagined bloodline
- 💡 Sources page: every source, with what it supports in the app
- 💡 Welsh-language narration throughout, with English subtitles
- 💡 A print or poster mode: a high-resolution render of a chosen year

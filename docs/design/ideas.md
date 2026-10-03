---
title: Ideas board
kind: design
status: living
updated: 2026-10-03
---

# Ideas board

Somewhere to bounce ideas around before they become decisions. Each idea has a status:
💭 raised · 🗣️ discussing · 🅿️ parked · ✅ agreed (then moved to CLAUDE.md and the backlog) · ❌ dropped.
Add freely; nothing here is a commitment.

## From Dewi (2026-09-28)

| Idea | Status | Notes |
|---|---|---|
| Previous / Next buttons through key dates | ✅ built 2026-09-28 | See [`timeline-experience.md`](timeline-experience.md); PageUp/PageDown already do it by keyboard |
| Camera moves to the action at each key date | ✅ built 2026-09-28 | Per-date "shot" |
| Sound and visual effects per event (train sound, train smoke…) | 🟡 train done; more to come | Must be labelled reconstructed |
| Typical conversations per class at every key date, in the right language | ✅ agreed, research under way | See [`conversations-by-class.md`](conversations-by-class.md) |
| Immersive sound and other assets, generated or found online | 🗣️ discussing | See [`sound-and-assets.md`](sound-and-assets.md) |
| In-app feedback and corrections, into GitHub issues | 🟡 plain GitHub issues, triaged into the todo file ([ADR 0019](../adr/0019-suggestions-arrive-as-github-issues.md), forms removed by [ADR 0020](../adr/0020-plain-github-issues.md)); the in-app button still 🗣️ discussing | See [`feedback.md`](feedback.md); recommend a pre-filled issue link first |
| Claude looks after the issues: reads new ones, checks them against the research and licence rules, replies with questions, adds them to the todo file | ✅ agreed and set up 2026-10-01 | At the start of every session; replies, labels and closes go to Dewi as one batch for one yes ([ADR 0021](../adr/0021-issue-triage-at-session-start.md)); issue rows live in the todo file ([ADR 0022](../adr/0022-one-todo-file.md)) |
| Analytics or usage tracking | 🗣️ discussing | See [`analytics.md`](analytics.md); recommend cookieless (no banner) |
| Realistic models of important buildings through time | ✅ agreed as option A (accurate low-poly), being built | See [`models.md`](models.md) |
| Time of day and seasons, "look amazing" | ✅ agreed | Built 2026-09-28: see [`atmosphere.md`](atmosphere.md) |
| Animals through time, from before there were any: roaming, grazing, hunted, farmed, dying out | ✅ agreed 2026-09-28 (Dewi's), in the backlog | Needs the deep-time arrivals/extinctions table turned into content; one animal model per kind, not per era |
| People travelling in from afar (Romans, armies, canons, drovers, navvies, evacuees) | ✅ agreed 2026-09-28 (Dewi's), in the backlog | Journeys along the real roads and river; each group only where a source puts them here |
| A donation link in the app and on the README | ✅ agreed 2026-09-28 (Dewi's), in the backlog | Dewi to choose the platform; no tracking |

## From Claude (for discussion)

| Idea | Status | Notes |
|---|---|---|
| Guided tour: a play button that steps the key dates with camera, sound and narration | ✅ agreed 2026-09-28, in the backlog | Builds on Next/Previous and the camera shots |
| "A day in 1282": morning to night at one key date, with activity changing | ✅ agreed 2026-09-28, in the backlog | Day/night lighting is built (2026-09-28); activity by hour is not |
| Seasons and weather per era (Little Ice Age snow, harvest) | ✅ agreed, in the backlog under Look and feel | Seasons built 2026-09-28 with a climate "chill" per period; weather not yet |
| Follow the family: a mode that jumps only to the family's scenes | ✅ agreed 2026-09-28, in the backlog | Plus a family-tree panel |
| "What was here?": click any spot for its history across time | ✅ agreed 2026-09-28, in the backlog | Needs per-place data beyond the key sites |
| Before/after wipe between two years | ✅ agreed 2026-09-28, in the backlog | Good for the castles |
| Sources page listing every source and what it supports | ✅ agreed 2026-09-28, in the backlog | Easy win for the "history first" promise |
| Welsh narration with English subtitles | ✅ agreed 2026-09-28, in the backlog | Voices exist |
| Shareable links that keep the camera view, not just the year and place | ✅ agreed 2026-09-28, in the backlog | |
| Compare two years side by side | ✅ agreed 2026-09-28, in the backlog | Or a before/after wipe |
| Place names through time (Dynevor → Dinefwr, Llandilo → Llandeilo), dated and sourced | ✅ agreed 2026-09-28, in the backlog | Mostly research; fits "Welsh names first" |
| A place's own timeline: step through one site's phases | ✅ agreed 2026-09-28, in the backlog | Builds on per-phase models |
| "Spot the invented" game: guess documented vs imagined, then reveal | ✅ agreed 2026-09-28, in the backlog | Teaches the ⓘ model |
| A day in the life: follow the family from dawn to dusk | ✅ agreed 2026-09-28, in the backlog | Needs time of day |
| "How do we know?": each ⓘ quotes the primary text, not just the citation | ✅ agreed 2026-09-28, in the backlog | e.g. the 1858 report for the train |
| Family tree of the imagined bloodline; click a person to jump to their era | ✅ agreed 2026-09-28, in the backlog | |
| Street level: walk a town at eye height | ✅ agreed 2026-09-28, in the backlog | |
| Postcard export: the current view with year, caption and credits | ✅ agreed 2026-09-28, in the backlog | |
| Newspaper clippings at key dates (Welsh Newspapers Online) | ✅ agreed 2026-09-28, in the backlog | Check the page-image licence |
| Search box over the knowledge base (static index, no AI) | ✅ agreed 2026-09-28, in the backlog | |
| Evidence map: colour everything on screen by provenance tier | ✅ agreed 2026-09-28, in the backlog | Data already exists |
| Mini-quizzes: "how many shops in 1858?" | ✅ agreed 2026-09-28, in the backlog | Fun for family; answers link to sources |
| Poster mode: a high-resolution render of a chosen year | ✅ agreed 2026-09-28, in the backlog | |
| The Tywi's wandering course: show old river channels per era (LiDAR palaeochannels) | ✅ agreed 2026-09-28, in the backlog | Research the channel dates |
| "Nothing perishes" ghosts: faint outlines of vanished buildings over today | ✅ agreed 2026-09-28, in the backlog | The motto, made visible |
| Drovers' roads: animated cattle droves along documented routes, followable | ✅ agreed 2026-09-28, in the backlog | Uses follow |
| A Rebecca night: a set-piece of one attested 1843 attack | ✅ agreed 2026-09-28, in the backlog | Research exists in the Victorian note |
| Travel time from Llandeilo by era (foot, coach, train, car), as rings | ✅ agreed 2026-09-28, in the backlog | |
| Population sparkline along the timeline, with uncertainty bands | ✅ agreed 2026-09-28, in the backlog | |
| Sky events: comets, eclipses and storms recorded in the chronicles | ✅ agreed 2026-09-28, in the backlog | Only where a source exists |
| An opening cinematic flight from deep time to today, under the motto | ✅ agreed 2026-09-28, in the backlog | |
| Real Carmarthenshire voices: St Fagans oral-history clips | ✅ agreed 2026-09-28, in the backlog | Check reuse terms |
| The 1698 trilobite (Lhuyd's letter; corrected from 1688) as an easter egg | ✅ agreed 2026-09-28, in the backlog | Cross-checked 2026-10-02 (`deeptime:S18`, `deeptime:S43`) |

## From Claude, under the proactive mandate (2026-10-02)

Generated by six lenses (historian, game designer, family visitor, sound and atmosphere, graphics, educator), each critiqued adversarially against the accuracy law and the backlog, then ranked by a judge. The full pitches, research and build notes are in [`ideas-2026-10-02-ranked.json`](ideas-2026-10-02-ranked.json); the five marked "building first" are in the todo file.

| Idea | Status | Pitch |
|---|---|---|
| **Contested points, shown as contested** (historian / game-designer / educator, score 9, medium) | ✅ agreed by Claude (proactive), building first | Every place where the sources disagree goes into one register, sorted three ways. A live pair is two sourced readings that draw differently, such as Dryslwyn's middle ward (about 55×30m from the Cadw plan against 70×30m in medievalheritage), St Teilo's tower (15th century or c. 1600), Talley's founding year (1184, 1185 or 1189), Dinefwr under English control from 1277 or 1287, Carreg Cennen taken or held in 1403,… |
| **Honest ambience** (sound-atmosphere, score 8.5, small) | ✅ agreed by Claude (proactive); step one built 2026-10-03, step two (distance and space) not started | Step one fixes something the app gets wrong today. src/content/timeline.ts gives church bells at AD 800 (0.1), AD 1250 (0.4) and later keys, but event-effects.md says no medieval bell is recorded for St Teilo's or Talley in any source read. The first bells heard in a source are the 'merry pealing' for the first train in January 1857. So every ambient bed gets a provenance, the medieval bells go (or become a… |
| **When are we? A guess-the-year game read from the landscape** (game-designer, score 8.5, small) | ✅ agreed by Claude (proactive); built 2026-10-03 ([ADR 0029](../adr/0029-guess-game-hides-giveaways-by-one-root-class.md)), reviewed by a second Opus; one choice (tick labels during a round) waits on Dewi | Press 'When are we?' and the app drops you at a hidden moment, drawn only from periods with content (no deep time yet). Everything that gives the year away is hidden: the handle, the moment card, the almanac, the language panel, place labels, era names and colours on the timeline, conversation bubbles and ?debug. You orbit and fly, read the land (forest cover, fields, roundhouses or castles, the railway) and drag… |
| **Light after dark** (sound-atmosphere, score 8, small) | ✅ agreed by Claude (proactive), building first | Night light changes with its technology and with who could afford it, from one table of dated lighting keys rather than per-era code. Hearth glow at roundhouse doors. A medieval town mostly dark, with torchlight at Dinefwr labelled reconstructed. Candle-bright gentry windows against dim rushlight and tallow cottages, sourced from St Fagans or Amgueddfa Cymru where possible. Street gas lamps only from a documented… |
| **When did we find out? A discovery rail, a 'found' line on every ⓘ, and a 'known by' marker** (educator, score 8, medium) | ✅ agreed by Claude (proactive), building first | A thin second rail under the timeline marks when evidence came to light, as dated stages of a kind (record, survey, aerial, excavation, chance find), each with who made it, never only a single 'found' date. The Gelli note in the Gospels (9th century). Lhuyd's trilobite letter (written 1698, published 1699). Roman coins recorded by Fenton near Dinefwr c. 1800. A Latin stone seen in 1697 and lost by 1893 (recorder… |
| **The diorama's cut edge shows the real rocks** (tech-showpiece, score 7.5, medium) | 💭 raised by Claude (proactive) | The plinth's five invented colour bands (buildPlinth in src/world/terrain.ts) are the one part of every frame with no ⓘ. They become the bedrock mapped at the ten-mile rim, read from the BGS Geology 625k map (OGL), with superficial deposits on top where BGS maps them. Each segment's ⓘ gives the unit and its BGS Lexicon code, and an age only where a cited source states one. The 2026-10-02 check found the Ma… |
| **Lime** (historian / sound-atmosphere / tech-showpiece, score 7.5, medium) | 💭 raised by Claude (proactive) | Slice one: kilns as dated features placed from Coflein grid references. R. K. Penson's Cilyrychen kilns at Llandybie are built from August 1856, the first lit on 18 May 1857, six by 1858 and nine by 1900. They smoke by day and show a red glow at the draw-holes after dark (reconstructed by analogy), with a kiln sound bed. Pistyll and any earlier kilns appear only once Coflein dates them, and Carreg Cennen's… |
| **The real night sky** (tech-showpiece / family-visitor, score 7, medium) | 💭 raised by Claude (proactive) | The 900 random stars (rng(1843) in src/world/sky.ts) and the moon placed opposite the sun give way to real stars for Llandeilo's latitude, precessed to the slider's year with proper motion. The pole star changes, with Vega near the pole around 12,000 BC, and a 'Look up' view shows it. Outside the range where the models hold (about ±100,000 years), the ⓘ says star positions are unknown. A generic season and hour… |
| **What was it worth? Law values, local prices and a day's wage, each tagged by scope** (historian / family-visitor, score 7, medium) | 💭 raised by Claude (proactive) | One valuation model, read by the almanac's money topic and by the ⓘ of matching items. The scope is a type: 'here', 'deheubarth' or 'wales'. In 1843 you hold a day's pay as the Times reporter recorded it for Llandilo: 7s a week from gentlemen farmers, 8-9d a day with food or 10d-1s without from small farmers (single source). You can spend it on coal at 1s 8d a pony-cart at the pit plus 9d to town. In the medieval… |
| **The Llandeilo Gospels** (educator / family-visitor / game-designer, score 7, medium) | 💭 raised by Claude (proactive) | From the early-to-mid 9th century the gospel book sits at Teilo's clas church. Click it to open a reader. The Surexit memorandum, dated 830-50 by Jenkins and Owen with minority readings in the ⓘ, appears as a parallel text: the manuscript's words, an English rendering, and a cited modern Welsh one, with Latin legal words set apart from the Old Welsh. Tudfwlch loses his claim to Tir Telych against Elgu son of… |
| **Letters from the siege** (game-designer, score 6.5, medium) | 💭 raised by Claude (proactive) | The design for the agreed 1403 Glyndŵr scene, with no invented dialogue. Beat 1, Monday 2 July: Faireford's letter (French, with Hingeston's translation) reports the siege of Dinefwr by Rhys ap Gruffudd, Henry Dwnn and others. The hour is not recorded. Beat 2, the night of 3 July, the only documented hour: Owain at Llandovery (an arrow off the map), 300 men left round Llandovery castle, and Owain lodging at… |
| **How we found out** (historian / game-designer, score 6.5, medium) | 💭 raised by Claude (proactive) | A 'How we know' Watch button on the existing 2003 roman-forts-found key date, not the AD 74 date that the Roman-arrival cutscene uses. Today's parkland. Roman finds from fieldwalking and metal detecting, documented, with the people imagined. The 1979 aerial photographs, conditional on a source saying what they showed. The March 2003 magnetometer survey, with an outline traced from the published plan in Hughes… |
| **Names in the land** (historian / educator, score 6, medium) | 💭 raised by Claude (proactive) | A Names lens for a curated set of the valley's minor names, each researched first: pandy, efail, odyn, melin, hafod and hendre, caer and castell, llys, llan, rhyd, pont and ffair. Each name's ⓘ gives the name itself (documented, '(today)' under ADR 0024 unless an earlier form is found), the element's meaning from two published glossaries, and what it may preserve, marked reconstructed, with caveats: names move,… |
| **The finds cabinet** (game-designer, score 6, large) | 💭 raised by Claude (proactive) | Real finds glint at no finer precision than the source gives, as a soft circle, with nothing the PAS or HER withholds. A find glints in its own period only where a source places it there, and in the year it was found. The Tacitus milestone (RIB 2262) glints only in 1697, as a farmhouse cornerstone near Dynevor, because where it stood in Roman times is unknown. Lhuyd's trilobite glints in 1698 over a soft area… |
| **Peel back to the evidence** (educator, score 5.5, large) | 💭 raised by Claude (proactive) | Refines the agreed Evidence map down to each model part. Every Part in a plan carries a sourced evidence class: standing, excavated, surveyed, conjectured or not known. A fader dissolves the model: standing masonry stays solid, excavated footings become outlines, conjectured walls go wireframe, and 'not known' parts vanish with a label. It starts at Talley and Dryslwyn, the sites that already have plans. Garn… |
| **Walls rising** (tech-showpiece, score 5.5, large) | 💭 raised by Claude (proactive) | Where a documented construction window falls between two phases, only the parts that differ between the plans rise, and retained parts stand throughout: St Teilo's c. 1600 tower during Scott's rebuild of 1848-51 (the architect itself contested), and Newton House's recasing in 1856-57. The bridge shows its timber centring from February 1846 (part lost in the flood of 22 October 1846), the keystone on 25 November… |
| **The Tywi in spate** (sound-atmosphere, score 5, large) | 💭 raised by Claude (proactive) | The river's level becomes a value. A seasonal curve reconstructed from modern gauge records makes the river higher, browner and louder in winter, and narrower and quieter in summer. On documented flood moments the water spreads over the dolydd, drawn from an NRW flood zone (OGL, confirmed), with an ⓘ saying the extent is today's flood zone because the sources give none. The first is 30 January 1848, ready for the… |
| **Open the ground** (family-visitor, score 4.5, large) | 💭 raised by Claude (proactive) | At a site whose excavation report we have read, a 'Dig' panel shows a section with dated layers, each cited to the page and linked to its Feature. Finds are pinned where they were found. Nothing is drawn yet, because no section has been read: the forts' layers wait for the 2005 report's sections and Dryslwyn's for Caple 2007. Garn Goch shows an empty section captioned 'no excavation is recorded', its ramparts… |
| **Whose land is this? Lordships, granges and estates** (family-visitor, score 4.5, large) | 💭 raised by Claude (proactive) | A tint by who held power, at the coarse level the sources support. Medieval commotes, lordships and Talley's granges are soft-edged and reconstructed, with Dinefwr returning 'contested' between 1277 and 1287 with both claims. Field-level estates and tenants appear only from openly licensed 1840s tithe maps. Clicking a zone shows the holder and dues, with languages read from the existing language-by-class periods. |

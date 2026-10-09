---
title: Decision log
kind: log
status: current
updated: 2026-10-09
---

# Decision log

How the decisions in `CLAUDE.md` were reached. The Decisions table there is the current state;
this is the history behind it. Technical decisions also have an ADR in [`../adr/`](../adr/README.md)
with the full context and consequences.

## 2026-09-26: first discussion with Dewi

| Question | Options considered | Chosen | Why |
|---|---|---|---|
| Web app? | Web, native | Web, static site | Shareable by URL, no install |
| Look | 3D low-poly diorama; 2D painted parallax; map plus scenes | 3D diorama | Dewi's pick |
| Fidelity | Clean low-poly; rich stylised; high-poly now | Clean low-poly | Dewi's pick; fast to fill every era, upgradeable |
| Engine | three.js; Babylon.js; raw WebGPU; Unity/Godot export | Babylon.js (WebGPU, WebGL2 fallback) | Dewi's pick over three.js; raw WebGPU means rebuilding an engine; exports are heavy on the web |
| Audience | Me and family; kids/schools; public | Dewi and family, no young kids | History told honestly, grim parts included |
| Language | Bilingual with Welsh dialogue; English with Welsh names; English only | Bilingual, dialogue in the era's language | Llandeilo is a Welsh-speaking area |
| ⓘ labelling | 2 tiers; 3 tiers | 3 tiers: documented / reconstructed / imagined | Honest about archaeological reconstruction |
| Exploring, slider, conversations | One or the other | Both, for each | Dewi: "both??" |
| Voices | edge-tts; Piper; ElevenLabs; espeak | edge-tts, no robotic voices | Natural sound, free |
| Latin voice | Italian voice plain; respelled for classical; multilingual voices | Diego, plain (Church Latin) | Chosen by ear from four samples |
| Hosting | Cloudflare Pages; Vercel; GitHub Pages | GitHub Pages via Actions | No extra accounts |
| Terrain | OS Terrain 50; LiDAR; both | Both (LiDAR for close-ups later) | 50m is plenty for the overview |
| Timeline scale | Linear; non-linear | Non-linear | Recorded history would otherwise be a sliver |
| Content | Pre-written; live AI | Pre-written, no runtime AI | Checkable, citable, free to run |
| v1 scope | Vertical slice; thin sweep | Vertical slice: Iron Age, Medieval to 1282, Victorian | A thin sweep would look empty everywhere |
| Later phases | | Deep time before humans; natural history; ripples from afar | Dewi's additions |
| Repo name | Latin phrase options | `llandeilo-omnia-mutantur-nihil-interit` | "Everything changes, nothing perishes" (Ovid) |
| Repo purpose | Code only; code plus knowledge base | Knowledge base too | Dewi: the repo "shouldn't just be a place for source code" |

## 2026-09-26: made while building (creative freedom)

| Decision | Why |
|---|---|
| Irregular Delaunay triangulation for the terrain | The classic low-poly art look, and it follows carved river channels |
| Real OS building footprints for towns, sized to documented counts | Real streets, with honesty about which buildings stood when |
| Today's OS woodland blended in from the 1850s | The present-day landscape is real rather than generated |
| Settlements clear woodland around them | Historically right, and it makes hillforts visible |
| Sources extracted into typed citation keys | A missing or mistyped source is a compile error |
| Procedural ambient audio (planned) | No licence risk, and it can follow the era continuously |

## 2026-09-28

| Decision | Why |
|---|---|
| Record research outcomes in `docs/research/findings.md` and voice choices in `docs/content/voices.md`, summarised in CLAUDE.md | Dewi: "if in doubt document it in this repo" |
| Keep edge-tts for Latin (Diego, plain) as already shipped | Confirmed with Dewi; see `docs/content/voices.md` |
| Rewrite the backlog as the one list of agreed work plus unagreed 💡 ideas; correct the stale zod claim in CLAUDE.md | Dewi asked for a backlog; both files had drifted from the code |
| A second Opus reviews every commit (code, content and docs) | Dewi, 2026-09-28; he wrote "remove" and confirmed later that day he meant "review" |
| Discussion-phase ideas go in `docs/design/` as proposed, no code | Dewi: "we are still in discussion phase, dont code anything until i say" |
| Record technical decisions as ADRs in `docs/adr/`, backfilled for the existing architecture; a "what goes where" table in CLAUDE.md | Dewi: "make sure to document ADRs, and anything else"; [ADR 0001](../adr/0001-record-architecture-decisions.md) |
| Desktop only: drop phone and screen-reader requirements; a dismissible "best viewed on desktop" banner elsewhere | Dewi: "remove the requirement to support mobile and accessibility stuff like screenreaders"; [ADR 0015](../adr/0015-desktop-only.md) |
| A snap of the slider moves only the slider, not the camera | Review of the Previous/Next commit: a third of the slider snaps, so drags kept pulling the camera away; see `design/timeline-experience.md` |
| Remove the 450KB bundle limit; CI only reports the size | Dewi: "did I say the app is meant to be under half a MB??? if so please remove this limit". He never had; [ADR 0016](../adr/0016-no-bundle-size-limit.md) |
| Ask before fanning out parallel agents or worktrees; the single commit review stays automatic | Dewi: "ask me first before you do this, as sometimes I wanna not use all my tokens" |
| Allow short, useful code comments in this repo (a why, a gotcha, a convention, a tuned number), never narration | Dewi: "yes override the rule for this repo" |
| Confirmed as Dewi's: animals from before people, people arriving from afar, a donation link; the donation platform left to Claude, who picked GitHub Sponsors (no new account, no tracking) | Dewi: "all good, up to u" |
| Keep 12,500 BC without summer snow (it falls in the milder Late Glacial interstadial in calendar years) | Dewi: "ok" |

## 2026-09-29: the backlog as a gated board

| Decision | Why |
|---|---|
| Keep the backlog as task files in the repo, with a board GUI that edits them, rather than making a board (GitHub Projects) the source of truth | Dewi asked "would it make sense to have the kanban board as the source of truth?"; a board's fields cannot enforce gates, the evidence would live in two places, and on a public repo every status change is public. [ADR 0018](../adr/0018-backlog-as-a-gated-board.md) |
| Use Backlog.md, not a fork of it | Dewi: "does it have what we need?" It has all but the gating, which is ours to write anyway; upstream moves too fast to keep a fork in step |
| Gate on push and in CI, not at drag time | The tool has no hook that can refuse a move; a blocking hook goes upstream as a PR only if push-time gating proves too late |
| Pilot with five agreed items first; unagreed ideas stay on the ideas board for now | Dewi: "yes go ahead with the pilot"; where ideas live is for a later discussion |
| Link repo files from a task as GitHub URLs so the board can open them | Dewi chose option A: the board only links `http(s)` references |
| Other people add through GitHub issues (three forms), triaged onto the ideas board and made cards once agreed; the repo stays the record | Dewi: "i'd quite like other people to add to it", then chose option A over a Pi-hosted board or push access. [ADR 0019](../adr/0019-suggestions-arrive-as-github-issues.md) |

## 2026-10-01: plain GitHub issues, triaged each session

| Decision | Why |
|---|---|
| Remove the three issue forms; people open ordinary GitHub issues, still triaged onto the ideas board | Dewi: "remove the issue tempalte stuff we did the other day please? I want a vanilla github issue thing". [ADR 0020](../adr/0020-plain-github-issues.md) |
| Claude triages open issues at the start of every session and shows every reply, label and close as one batch for one yes, rather than asking per post | Dewi: "start every session perhaps", chose "c" (Claude does it all), then "yes" to the batch, since every public post must be shown to him first under the account's organisation rule; "now". [ADR 0021](../adr/0021-issue-triage-at-session-start.md) |
| Drop the board pilot: one todo file (`docs/todos/_index.md`) plus GitHub issues, with issue rows in the todo file | Dewi: "we have a todo md?? lets just use that?? and github issues???", then "yes please". [ADR 0022](../adr/0022-one-todo-file.md) |

## 2026-10-02: a multi-day autonomous run

| Decision | Why |
|---|---|
| Work the agreed backlog unattended in this order: quality fixes and content corrections, then look and feel, then the bigger agreed features | Dewi: "i wanna leave you for days", then picked "fixes first, then build" |
| Independent research checks may run as subagents, one at a time, on top of the standing commit review; no parallel fan-out and no worktrees | Dewi picked "yes, one at a time" |
| No self-imposed usage stop: keep going until the plan-limit tripwire stops the run | Dewi picked "run to the tripwire" |
| Until he says otherwise, Claude may spin up other agents without asking first (this lifts the 2026-09-28 "ask before fanning out" rule for now) | Dewi: "actaully, until i say otherwise, you are permitted to spin up other agents :)" |
| Agreed four proposed items for the weekend: effects per event, conversations by class at every key date, accurate building models phase by phase, and research into the later trains | Dewi, asked before going away, picked all four |
| Leave the other project's Android emulator running, though it slows e2e | Dewi picked "leave it running" |
| Release at each visible milestone with release notes; Claude publishes them | Dewi: "at sensible intervals I want there to be a 'release' with release notes", then picked "each visible milestone" and "publish them myself"; then "include things like screenshots" and "at the top I want a url to the app". [ADR 0025](../adr/0025-releases-at-visible-milestones.md) |
| Agreed: immersive sound at every point in time; black-swan events from afar shown by their local effect; music through time and place. All within the ten miles around Llandeilo | Dewi: "each point in time sounds effects etc ... realy immersive experience", "black swan events such as a volcano erupting thoasauns of miles away", "music throught time and places ... but our app is just about the area we agreed (10 or so miles around llandeio)" |
| Agreed: cutscenes at key dates, the first being the Roman army marching in, c. AD 74 | Dewi: "also things like romans maching in to llandeoo -- with a cutscene etc etc i am a massive fan of cutscenes" |
| Agreed: invasions and raids (Normans, Vikings and others) as key dates and cutscenes, as far as the sources put them in the valley | Dewi: "also things like e.g. norman, viking etc etc etc invasions" |
| Agreed: early people hunting and gathering, as scenes and cutscenes | Dewi: "also thing like early people hunting stuff???" |
| Claude is to be proactive: invent ideas and build them, through the same path and review, logged on the ideas board and shipped in releases so Dewi can veto them | Dewi: "claude needs to also be proactive coming with ideas and implementing them etc ... really stretch your legs and be proactive" |
| Gather assets freely under any open licence, NC and SA included; still no all-rights-reserved material, since the repo and site are public | Dewi: "feel free to gather assets from the internet etc etc... dont worry about licensing". Claude kept the one line that protects the public site. [ADR 0026](../adr/0026-open-licences-including-nc.md) |
| Music: in-world where the research puts it, plus a light labelled score that can be turned off. Cutscenes: a narrator in the UI language, captions always on. A Begin screen whose click turns sound on. Assume a powerful GPU; high quality by default | Dewi's answers, 2026-10-02 ("In-world, plus a light score", "Narrator, English or Welsh", "A 'Begin' screen turns sound on", "just assume ... that user has beefy gpus") |
| The language panel shows Late Brittonic ("already changing into early Welsh") for 410-549 and Primitive Welsh (Cymraeg Cyntefig) for 550-799, where it had "Old Welsh" from 410 | The language check: the sources put Primitive Welsh at c. 550-800; the review caught the first fix starting it at 410. A content call made by the accuracy law, listed so Dewi can overrule it |
| "When are we?": the tick labels under the slider are hidden during a round (the ticks stay), since two answers sat on labelled ticks | A game-design call left open by the build's review; decided by Claude under the proactive mandate (ADR 0029) |
| Conversations by class: build the three vertical-slice eras first (Iron Age, 1282, Victorian), not all 22 key dates at once | Claude's default for the open scale question in `design/conversations-by-class.md` (70-110 conversations); matches the v1 scope, so the method is proven before it is multiplied |
| Calls the checks left "for the owner", settled by the accuracy law rather than taste: Dinefwr drops 1163, which no source gives (the timeline check): the castle phase starts at its first record in 1151 and the key date moves to c. 1172, when DWB says "a castle in the new style" was begun; St Teilo's tower stays contested in the text and drawn from c.1600; the Surexit stays c.830 (the specialist reading); the Talley and Dryslwyn models are rebuilt to the research, not only re-labelled | CLAUDE.md: contested points stay contested, never pick silently; models need sources as much as dates. Listed here so Dewi can overrule any of them |
| Items that need Dewi (real hardware, the Welsh and expert checks, Sponsors, models option B or C, anything "Proposed") wait for him; new GitHub issues are triaged but nothing is posted until he says yes | The existing rules: only Dewi agrees work or approves a public post |

## 2026-10-03

| Decision | Why |
|---|---|
| The tick labels' fix gets real tick marks: each tick now has a short drawn mark that stays visible during a round, so the bar keeps a scale; before, a tick was only its label, so hiding the labels left no scale at all | The second-Opus review found the shipped CSS did not match the 2026-10-02 row or ADR 0029; making the code match was the smaller, structurally right change |
| After steam ended (13 June 1964) the trains are heard as a reconstructed, synthesised diesel unit, not silence, and from the second-Opus review of the fixes the drawn train is a placeholder diesel unit with no steam | A train is drawn to today and the line still runs; a labelled reconstruction (railway-later's diesel-unit sources, Class 153 as a lead) is more honest than silence or faint steam, and the picture must agree with the sound. Chosen by Claude under the proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)); *corrected 2026-10-03*: this row said "with the coordinator's brief", a term defined nowhere |
| Homes are drawn with flame light at the 1902 electric key, and the text says home lighting is not recorded, while by October 1902 many tradespeople were having electric light installed (light:S31) | No source names a Llandeilo home with any light in 1902; the council sold electricity by the meter (light:S20). *Corrected 2026-10-03*: this row credited the change to the light-after-dark check, which rated the old "mixed" claim "partly" and asked for no change; it came from the second-Opus review. A first rewording ("homes kept to gas, oil and candles, as far as the sources show") was caught by the second-Opus review of the fixes |
| ~~The market sound bed still starts at 1600, though a fair (1290-91) and a Saturday market (by 1326) are now documented~~ | Starting it in the Middle Ages is a content choice left for Dewi (soundscapes check); recorded in open questions. *Superseded 2026-10-03 by Dewi's decision below* |
| A feature with exact dates is never drawn outside them; "c." dates keep the soft fade | The fix for the second-Opus review's CRITICAL finding (the 1858 line drawn in 1857), chosen by Claude under the proactive mandate. [ADR 0034](../adr/0034-exact-dates-draw-nothing-outside-them.md) |
| The railway south of Llandeilo is drawn in the stretches its sources date: Duffryn (Ammanford) to Llandeilo from January 1857; the older Llanelly lines south of Duffryn and up the Amman valley from April 1840, as reconstructed; the undated short lines near Pontyberem and Cross Hands not at all | The accuracy law: no exact date for track the sources date differently, and no invented date for track not researched. Chosen by Claude under the proactive mandate (ADR 0034), so Dewi can overrule the undrawn lines. *Corrected 2026-10-03 (third review)*: the 1840 lines were in fact drawn from about 1831 until they were given exact dates ([ADR 0035](../adr/0035-exact-dates-are-about-dates-not-clues.md)), and they now stop at Garnant. *Amended 2026-10-03 (fourth review), decided by Claude under the proactive mandate (ADR 0027)*: one exception to "no exact date for track the sources date differently": a stretch whose opening date is contested may carry exact dates, drawn from the earlier sourced date, when its ⓘ names both dates, as Pantyffynnon to Duffryn (1840 or May 1841) does. That differs from the undrawn western lines because a contested date is a choice between two sourced dates, while an undated line has no date at all (ADR 0035) |
| East of Garnant, today's track is drawn from 4 November 1907, as the line built then to avoid the 1841 incline, with no track there from 1840 to 1907; ~~the colliery lines past Gwaun-cae-Gurwen's level crossing are drawn with it, undated~~ | Its sources (victorian:S29, S74) put today's course in 1907; the 1841 course is not mapped here, and an empty stretch is more honest than drawing the 1907 line 66 years early. Decided by Claude under the proactive mandate (ADR 0027) for the third review's finding. *Corrected 2026-10-03 (fourth review)*: the row said "from 1841 to 1907", but the first half mile east of Garnant, to Cwmamman, opened on 10 April 1840. *Superseded the same day, decided by Claude under the proactive mandate (ADR 0027)*: the colliery track had been given 1907, a date no source gives it. The section now ends where the 1907 line joined the old course, placed 1 mile 22 chains (victorian:S74's length) along today's track from the cut at Garnant, and the track beyond it is not drawn, like the Cross Hands stubs (ADR 0035) |
| Street lamps after 1945 keep the warm colour they had before the 1902 fix, labelled a guess, rather than the near-white the 1902 rule gave them by accident | The post-war lamp type (sodium, then LED, in many towns) is not researched for Llandeilo; neither colour is sourced, and the change had been a side effect nobody chose. Decided by Claude under the proactive mandate (ADR 0027) for the third review's finding |
| The dim-out stays dated 17 September 1944, with a caveat in both languages that listed, mostly coastal, areas were left out and that whether inland Llandeilo was one is not known | Chosen by Claude under the proactive mandate for the second-Opus review's finding; the Schedule of areas was not found |
| Steam sound still ends with the passenger trains on 13 June 1964, though steam freight engines worked from Llandovery shed to 10 August 1964; the reason says so | So the sound agrees with the drawn train, which is a passenger train; the dissent (and one source's 1963) is in the ⓘ rather than hidden |
| **Dewi's decision**: the market sound starts in the Middle Ages. *How, chosen by Claude*: with the fair Edward I granted on 20 May 1290 (reconstructed: a grant does not show the fair was held), documented from 1326, when a Saturday market and the bishop's fair are recorded (sound:S20), carrying on through "Market town c. 1600" (the same gazetteer) to the Shire Hall market; the sound is reconstructed throughout, and kept quiet for a small medieval town | Dewi, asked "a fair is documented here from 1290 and a Saturday market by 1326, but the market sound still starts at 1600. Start it in the Middle Ages?", answered: "yes ok". The start dates, the continuation past 1600 and the levels (0.15, 0.2, 0.3) were set by Claude, and the levels are not yet checked by ear. *Corrected 2026-10-03 (review of the estimates)*: this row first put Claude's choices inside Dewi's decision |
| **Dewi's decision**: the undated railway lines are drawn with estimated dates, labelled as educated guesses with sources. *How, chosen by Claude*: the Burry Port and Gwendraeth Valley line from c. 1870 and never before its opening to Pontyberem on 23 June 1869, except the stretch beside the Hirwaun Isaf incline, across June 1886; the colliery track past the 1907 join from 6 May 1841, the earliest the sources allow; the 35m narrow-gauge stub near Cross Hands, which no source names, `imagined`, from c. 1950 and never before 1948 ([ADR 0037](../adr/0037-estimates-carry-an-earliest-date.md)) | Dewi: "put draw and give estimgate for dates but please label them as educated gueessess with sources?". This reverses the "no invented date for track not researched" rule of ADR 0034 and 0035 for these lines; each has no exact dates, and its ⓘ says "an educated guess", why that date, and the sources. *Corrected 2026-10-03 (review of the estimates)*: this row first put Claude's dates inside Dewi's decision, left the Cross Hands stub undrawn though Dewi said "draw", drew the whole Gwendraeth stretch from c. 1870 on a map that covers only its upper part, and let both estimates fade in years before any railway could have been there |
| Four key dates added from the checked notes: 1213 (Llandeilo burned, Dinefwr besieged), 1257 (Coed Llathen and Cymerau), 1849 (cholera) and 1918 (influenza); no others from that note yet, since it finds no Viking raid, Norman castle or Civil War fighting inside the area, and nothing of Fishguard's news here (the regional devastations of 895 and 1095 are unlocated) | Dewi agreed invasions as key dates and black-swan events shown by their local effect on 2026-10-02 (rows above), as far as the sources put them here; which dates, and how each is shown, was decided by Claude under the proactive mandate (ADR 0027), so Dewi can overrule it |
| 1849 is a minor marker with a card and an almanac note, not a key step and not a scene | Its one source is a partly illegible report (ripples:S24), and the ripples check asks for a second witness before it becomes a scene; it also sits a year from the 1848 bridge step, too close to snap to. Decided by Claude under the proactive mandate (ADR 0027) |
| No battle site is marked for 1257, and its key step frames the whole valley | Every proposed site (Coed Llathen near Broad Oak; Cymerau at the Tywi–Cothi confluence or near Talley) is inside the area and none is proven; the invasions check leaves the markers to Dewi, so none is shown until he chooses. Decided by Claude under the proactive mandate (ADR 0027) as the default meanwhile |
| The 1257 dead are “two or three thousand” of an English-led army with mostly Welsh foot soldiers, and “Saxons” appears only as the annalist's word | The invasions check: Chapman and Coflein over Wikipedia; never “3,000 English killed” |
| The 1257 ⓘ names both readings of the wood: Coed Llathen near Broad Oak, and the manuscript name read as Llanarthne, which Coflein treats as the same place | The invasions note: “Contested; both readings must stay visible”. Decided by Claude under the proactive mandate (ADR 0027) for the review's finding |
| The 1213 step sets a chosen 13:00, with the note saying the hour of the burning is not recorded | With the kept 17:30 a winter arrival was night and the plume, the date's only scene change, could not be seen; the railway step's chosen hour is the precedent ([ADR 0038](../adr/0038-recorded-burnings-are-dated-features.md), amended). Decided by Claude under the proactive mandate (ADR 0027) for the review's finding |
| Timeline markers keep their x at their date and fan into lanes above and below the line where they crowd | Nine markers' centres were covered by neighbours, 1849 and the 1848 church among them; nudging sideways would draw dates in the wrong place ([ADR 0039](../adr/0039-timeline-markers-fan-into-lanes.md)). Decided by Claude under the proactive mandate (ADR 0027) for the review's finding |
| The Victorian cholera almanac line is three entries: no case found before 1849 (a gap), the 1849 cases (documented, one report), no case found after 1849 (a gap, with Ystalyfera 1866 in the ⓘ) | One entry for the whole era showed 1849 in 1840 and labelled an unsearched absence “documented”. Decided by Claude under the proactive mandate (ADR 0027) for the review's finding |
| Llandeilo's 1213 burning is drawn as a dark plume over the church, only at that step | The Brut records the burning, not where in the town or how it looked; the ⓘ says so ([ADR 0038](../adr/0038-recorded-burnings-are-dated-features.md)). Decided by Claude under the proactive mandate (ADR 0027) |
| 1918 shows its recorded season (autumn) and no other scene change; the Armistice is not mentioned | Nothing in the existing model draws shut schools or empty chapels, and the ripples note's line on the Armistice cites no source. Decided by Claude under the proactive mandate (ADR 0027) |
| A winter night is dark: moonlight 0.3, sky light 0.2, a near-black sky and no night exposure boost, changed only where the night factor weights it, so the day is exactly as it was | The dated night light only showed close up because the land around it was nearly as bright. Values tuned by eye, not from a measured night. Decided by Claude under the proactive mandate ([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), so Dewi can overrule it ([ADR 0040](../adr/0040-a-dark-night-and-halos-that-keep-a-few-pixels.md)) |
| Lit houses, street lamps and hearths get halos a few pixels wide at any distance, on every graphics level, and farms in the countryside glow from the same window shares as the town | So what lit each era reads from the overview; the halos cost too little to drop on Medium or Low. Decided by Claude under the proactive mandate (ADR 0027), so Dewi can overrule it (ADR 0040). *Corrected 2026-10-03 (second-Opus review)*: this row said the farms' shares were "already labelled a guess in the 1902 and 1945 keys"; that was true only from September 1902, so the 1880 overview, where the farms' halos are most of what you see, showed them under a 'Documented' gas-lamp key that never called them a guess. Fixed by the next row |
| Every night-light key that lights a drawn farm says, in both languages, that the farms' lit windows are a guess: the 1200 (from 1650, when farms are first drawn), 1750, 1864, 1876 and 1944 keys join 1902 and 1945, and the 1876 key also says its homes' oil lamps and share of lit windows are guessed. A content test fails any key that lights farms without saying so | The halos made an invented detail the most visible thing at the overview, so it must carry its label wherever it shows. Only words were added: no date, level or colour changed. Decided by Claude under the proactive mandate (ADR 0027), so Dewi can overrule it |
| A roundhouse or longhouse group glows at every house, not once at the group's centre | One glow per group of nine longhouses read as one light; a glow per house matches what is drawn. Decided by Claude under the proactive mandate (ADR 0027) |

## 2026-10-09

| Decision | Why |
|---|---|
| Issues #1 (Harries photographs), #2 (LiDAR terrain) and #3 (Roman fort and settlement) are triaged, answered on GitHub with the enhancement label, and all three agreed as work | Dewi, 2026-10-09: "Yes, post all three", and chose all three issues as work for the weekend |
| The Roman fort is built detailed in the app, even where it stands out from the low-poly valley | Dewi, 2026-10-09, choosing "Detailed in the app" over a Blender source with a low-poly export and over the app look only |
| Harries photographs are shown in the app, pinned to where each was taken with credit and an ⓘ ~~where the licence allows; a photo with an unclear licence is a modelling reference only~~ | Dewi, 2026-10-09: "Show in the app". *Corrected 2026-10-09*: the struck licence condition was Claude's wording, not Dewi's, and his later answer below (credit, no licence check) supersedes it |
| When an issue's work ships in a release, Claude comments on the issue with the release link and leaves it open | Dewi, 2026-10-09: "Yes, comment with the link" |
| Also queued for the weekend: conversations by class, in-world music and the hunter-gatherer scenes, a GPU terrain shader, the later trains and the landmark models | Dewi, 2026-10-09, picking all four from a list |
| For the issues' material (the Harries photographs, the fort's reconstruction drawings and surveys), licences are not checked; the maker is credited in the asset manifest and the ⓘ | Dewi, 2026-10-09: "Regarding the GitHub issues, ignore licensing problems, just credit the person please" |
| The three issues are done first, before the rest of the weekend's work | Dewi, 2026-10-09: "If possible please prioritise them" |
| Anything Claude posts on Dewi's behalf (issue comments, release notes) ends with "Sent by Claude"; the three replies of 2026-10-09 were edited to add it | Dewi, 2026-10-09: "can you say that you know sent by Claude at the end please?" |
| The photo layer is a Photos toggle (off by default, remembered, `?photos=1` for a link) over camera pins, each opening the photograph in a side panel with credit, catalogue link and an ⓘ ([ADR 0041](../adr/0041-photographs-are-dated-placed-content-with-pins.md)) | Dewi agreed pinning each photograph where it was taken with a credit and an ⓘ. Off by default so no existing view changes; Dewi may want it on. Decided by Claude under the proactive mandate (ADR 0027) |
| A pin shows from its photograph's date range until 25 years after it ends, never before | A photograph cannot show a street before its date, and a street changed slowly. The 25 years are Claude's convention, one constant. Decided by Claude under the proactive mandate (ADR 0027) |
| 2282261 and 2282336 keep their c. 1900 caption but their range is widened to 1895 to 1930, because the dress in them looks 1920s (the independent check's open question) | The check called them doubtful, not contradicted, so no date was invented; the ⓘ says the range is widened and why. Decided by Claude under the proactive mandate (ADR 0027), for Dewi to settle |
| The catalogue's words and our notes on the photographs are shown in English only, labelled as such, in the Welsh interface | A human Welsh check is already parked, and a machine translation of research notes would put unreviewed Welsh in front of visitors. Decided by Claude under the proactive mandate (ADR 0027) |
| No "Then and now" flight | The brief allowed it only if the record gives the camera's direction; none of the 31 does. Decided by Claude under the proactive mandate (ADR 0027) |

---
title: Decision log
kind: log
status: current
updated: 2026-10-01
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

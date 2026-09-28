---
title: Decision log
kind: log
status: current
updated: 2026-09-28
---

# Decision log

How the decisions in `CLAUDE.md` were reached. The Decisions table there is the current state;
this is the history behind it.

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
| A second Opus reviews every commit (code, content and docs) | Dewi, 2026-09-28; wording "remove" read as "review", confirmation asked |
| Discussion-phase ideas go in `docs/design/` as proposed, no code | Dewi: "we are still in discussion phase, dont code anything until i say" |

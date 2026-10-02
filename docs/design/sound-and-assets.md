---
title: Immersive sound and other assets
kind: design
status: proposed
updated: 2026-10-02
---

# Immersive sound and other assets: generate, synthesise, or find

Raised by Dewi, 2026-09-28. **Proposed.** How to get richer sound, models, textures and images,
and the rules any asset must pass before it ships.

## Three routes

| Route | What it is good for | Today | Licence position |
|---|---|---|---|
| **1. Claude generates it** | Procedural sound (Web Audio), scripted 3D models (Blender, installed), voices (edge-tts), terrain from OS data | All current ambient sound, all models, all 28 voices | Our own work; edge-tts audio is generated from our text |
| **2. A generative service makes it** | Realistic sound effects, 3D models, textures, concept images | Not used | Varies by service and plan; must allow reuse, and the output is labelled |
| **3. Find it on the internet** | Real recordings (steam trains, church bells, rivers, birds), scanned castles, photographic textures | Not used | Any open licence, NC and SA included, never all-rights-reserved ([ADR 0026](../adr/0026-open-licences-including-nc.md)), recorded in the asset manifest. *Corrected 2026-10-02: this cell said "only CC0, CC-BY, public domain or OGL"* |

## Candidates to check (licences to verify before use)

These are leads from memory, not verified. Each must be checked against its current licence terms
before anything is downloaded.

- **Sound**: Freesound (per-file licence; NC is allowed since ADR 0026, *corrected 2026-10-02* from "avoid NC"), Wikimedia Commons audio, the BBC Sound
  Effects archive (its licence is not CC; check whether it allows this use), public-domain
  archive recordings (e.g. steam locomotives).
- **3D**: Sketchfab downloadable models with CC-BY or CC0 (some Welsh castles may have scans),
  Poly Pizza, Kenney and Quaternius (CC0 low-poly packs).
- **Textures and skies**: Poly Haven (CC0 textures and HDRIs), ambientCG (CC0).
- **Images**: People's Collection Wales, the National Library of Wales and Wikimedia Commons
  (licence varies per item).
- **Generative (paid or free tiers)**: sound-effect generators, text-to-3D services. Check terms,
  and whether output may be published openly.

## What "immersive sound" could mean here

- **Real recordings layered under the procedural beds**: a real river, real rain, real rooks,
  cattle, a real steam engine for the railway years.
- **Spatial sound**: sounds placed in the world, so the train, the forge and the church bells get
  louder as the camera flies near them (Web Audio `PannerNode`), rather than one flat mix.
- **Per-event sound** tied to key dates (see [`timeline-experience.md`](timeline-experience.md)).
- **Weather and time of day**: rain in wet eras, dawn chorus, night sounds.

## Rules every asset must pass

1. **Licence first**: any open licence, NC and SA included, and nothing "all rights reserved" or
   "found online" without one ([ADR 0026](../adr/0026-open-licences-including-nc.md); *corrected
   2026-10-02*: this rule said "CC0, CC-BY, public domain or OGL" only).
   Its source, author, licence and URL go in `src/content/assets.ts`; the build fails without it,
   and the credits page is generated from it.
2. **Honesty label**: an asset that stands for the past is *reconstructed* (a modern recording of a
   steam engine is not the 1857 engine), and the ⓘ says what it is.
3. **Accuracy**: an effect or model needs research behind it like any content (the right kind of
   locomotive for the line, a bell rather than a carillon, Old Red Sandstone not limestone).
4. **Weight**: keep downloads small (compressed audio, glTF with mesh compression); load an era's
   assets when that era is near, not all at once.
5. **Generated media is labelled as generated** in the credits.

## Open questions

- 💭 Is a paid generative service acceptable, or free sources only?
- 💭 Real recordings where available, procedural as the fallback?
- 💭 Which first: spatial sound, real recordings, or per-event effects?

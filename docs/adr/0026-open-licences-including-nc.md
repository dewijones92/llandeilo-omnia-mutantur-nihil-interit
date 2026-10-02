---
title: "ADR 0026: Any open licence, the non-commercial ones included"
kind: adr
status: accepted
updated: 2026-10-02
---

# ADR 0026: Any open licence, the non-commercial ones included

- **Status:** Accepted
- **Date:** 2026-10-02

## Context

Assets were limited to CC0, CC-BY, public domain and the OGL. That ruled out most real recordings
(much of xeno-canto's birdsong and many Freesound and Wikimedia items are NC or SA), which the agreed
immersive sound and music need. Dewi: "feel free to gather assets from the internet ... dont worry
about licensing".

## Decision

Any open licence is allowed, CC-BY-SA, CC-BY-NC and CC-BY-NC-SA included: the project is
non-commercial (no ads, no sales). Claude gathers assets without asking and records each one's
source, author and licence in the asset manifest, as before; the build still fails without a record,
and the credits page still lists them. Nothing "all rights reserved" is used, since the repo and the
site are public. No-derivatives (ND) licences are left out too: trimming, looping or filtering a
recording, as the sound engine does, is an adaptation.

## Consequences

Far more real sound and imagery becomes usable. Share-alike assets keep their licence when shown
(the credits say so). If a donation link (the agreed GitHub Sponsors idea) goes live, NC assets
should be reviewed, since some read "non-commercial" strictly.

## Alternatives considered

Ignoring licences entirely (risks a takedown of the public repo and site); keeping the narrow list
(starves the sound and music work).

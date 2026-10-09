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

## Amended 2026-10-09: the GitHub issues' material is credited, not licence-checked

Dewi, 2026-10-09: "Regarding the GitHub issues, ignore licensing problems, just credit the person
please." So for the material behind issues #1 (the D. C. Harries photographs) and #3 (the reconstruction
drawings and surveys of the Roman forts), the "nothing all rights reserved" line above does not apply:
each item is used with a credit to its maker and holder. Its asset-manifest record (`src/content/assets.ts`)
still names the source and URL, and its `licence` field reads "Not checked: used with credit at Dewi's
request (2026-10-09)", so the credits page says plainly that no licence was confirmed. The takedown
risk this ADR names is his to accept, and he has. All other assets keep the rule above.

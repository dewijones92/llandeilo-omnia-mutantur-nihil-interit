---
title: What the Roman forts' surfaces were, for the textured models
kind: research
status: draft
updated: 2026-10-10
---

# What the Roman forts' surfaces were, for the textured models

Research for phase 2 of the Blender models ([ADR 0055](../adr/0055-textured-landmark-models-and-clicking-their-parts.md)):
Dewi chose "Get proper textures" on 2026-10-10 ([ADR 0052](../adr/0052-landmarks-are-scripted-blender-models-built-from-their-plans.md)'s
amendment), and a texture is a claim about what a surface was made of. This note says, surface by surface, what
the forts and their settlement were built of, how that is known, and what the photograph standing in for it
actually shows. It extends [`roman-forts-and-vicus.md`](roman-forts-and-vicus.md) (cited as `fort:`), which
holds the site's own evidence, and borrows from [`era-iron-age.md`](era-iron-age.md) (cited as `ironage:`) for
the Welsh reconstructions. Written by Claude on 2026-10-10 under the proactive mandate
([ADR 0027](../adr/0027-claude-proposes-and-builds-under-a-proactive-mandate.md)), from sources fetched that day;
not yet independently checked.

**What stays ruled out** ([ADR 0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md)):
no stone, tile or limewash on the forts. Every texture below is timber, turf, earth, clay or thatch.

**What a texture here is.** Each is a modern photograph of a similar material, made tileable by its library,
tinted to the app's own colour for that material (`src/domain/materials.ts`) so the model keeps the valley's
palette. The photograph is never evidence: it stands in for the surface's look, and the surface's tier says how
well the material itself is known.

## Summary

| Surface | What it was | Tier | Evidence | Photograph standing in |
|---|---|---|---|---|
| Turf (the walk along the rampart's top) | Grass on the top of the bank | reconstructed | Dinefwr's turf rampart is inferred from the clay fill of Fort 1's inner ditch [fort:S1]; whether the top was grassed, trodden bare or surfaced is not known | A modern patch of dry grass and turf on soil |
| Turf face (the faces and steps of the courses) | The soil of the turf blocks, in courses | reconstructed | As above; turf ramparts were built of courses of turf blocks [S1][S2], often laid grass side down, so a new face shows soil with dark lines of grass between courses [S1][S5] | A modern excavated soil face |
| Timber (posts, beams, boards, planks, gate leaves) | Squared timber, probably oak | reconstructed | No timber survives at Dinefwr; post-pipes and post-pits show where timbers stood [fort:S1]. Vindolanda's excavated timbers are oak [S4], and so were the trees felled for a Castell Henllys rebuild [ironage:S29]; neither is evidence for Dinefwr | Weathered, cracked timber |
| Shingle (the forts' roofs) | Split timber shingles | imagined | No roof material is evidenced at Dinefwr [fort:S1]; shingle is the kit's choice. If shingles, oak: Pliny calls oak the best wood for them, and says Rome was roofed with shingles for 470 years [S3] | Weathered grey boards, their joints standing for the gaps between shingles in a course |
| Daub (the barracks' and houses' walls) | Clay daub on wattle, unrendered | documented (daub); reconstructed (its make-up and finish) | Daub with wattle impressions was found on the site [fort:S1]; daub of clay, straw and dung at Castell Henllys [ironage:S30]; no limewash evidenced (ADR 0046) | A modern, rough, cracked clay plaster |
| Thatch (the settlement's roofs) | Reed or straw thatch | imagined | What roofed the settlement is not known [fort:S1]; reed at Castell Henllys [ironage:S30], straw at Bryn Eryr [ironage:S32] | A modern angled reed thatch |

## Turf: courses, their depth, and which way up

- **Vegetius**, writing in the late 4th or early 5th century about camps, says a turf is cut "qui herbarum
  radicibus continet terram" (which holds the earth together with the grass's roots), half a foot high, a foot
  wide and a foot and a half long [S2] (Book III, chapter 8, read directly). Romankiewicz and others convert
  that to 0.44 by 0.30 by 0.15m [S1].
- **Measured turf blocks in fort ramparts** are thinner than Vegetius's: 0.30 by 0.30 by 0.08m at Plantation
  Place in London; 0.30-0.40 by 0.25-0.30 by 0.10-0.15m at Strasbourg; 0.46 by 0.30 by 0.03-0.08m in Strageath's
  Flavian rampart; at Vindolanda a median length of 0.26-0.31m and height of 0.06-0.08m. At Laurieston on the
  Antonine Wall, four courses each 0.08-0.14m high, and "lifts" of 0.12-0.15m [S1] (read in full).
- **Grass side down** was recorded at Croy and Balmuildy Road on the Antonine Wall and at Vindolanda; at
  Laurieston the blocks were laid neither always grass-down nor always grass-up [S1]. The Glasgow
  Archaeological Society's 1899 report argued from the dark lines in its sections that turves were laid with
  the grass below [S5] (a period interpretation, read through a search summary of the scan, not directly).
- **What changed in the app.** The `turf-courses` kit drew courses 0.3m deep, "a guess". It now draws them
  0.15m deep, Vegetius's half foot, at the top of the measured range (Vindolanda's and Strageath's are about
  half that), and the kit says so. The faces and the set-back steps are textured as soil, the turves laid
  grass side down; only the walk along the top is grassed, and that is a guess too. Whether a face grew over,
  and how soon, is not known, and the kit's ⓘ says so. (A first build drew every step grassed; at the
  distances the app is seen from, 0.15m steps alternating green and brown also shimmered.)
- **Not settled:** whether Dinefwr's rampart was all turf, turf-faced earth, or clay and turf like Trawscoed's
  (a lead only [fort:S15]). The rampart's own tier (reconstructed) already carries that.

## Timber

- Nothing of the forts' timbers survives; the posts are known from their pipes and pits [fort:S1].
- Oak: Historic England's tree-ring report on Vindolanda is titled for, and dates, its oak timbers: 53 samples,
  felled locally from mature woodland [S4] (title and summary through a search result: the report page refused a
  direct read). A summary of Vindolanda's wood finds gives oak as the most frequent species, about 40% (a
  secondary blog, a lead only, not cited in the app). One Castell Henllys roundhouse rebuild used about 34 oak trees
  [ironage:S29] (the figures are that source's, as the Iron Age note's correction says). Two independent lines for oak as the usual building timber; neither is Dinefwr's own.
- So the timber texture is labelled an analogy: squared timber, probably oak, from what other sites used. The
  photograph is a weathered, split-grain timber, which a post a few years in the Welsh weather would be; fresh-cut
  oak is paler, and the app's timber colour (unchanged) carries the colour.

## Shingle

- Pliny the Elder: "Scandula e robore aptissima, mox e glandiferis aliis fagoque" (oak makes the best shingle,
  then other acorn-bearing trees and beech), and, citing Cornelius Nepos, Rome was roofed with shingle for 470
  years, until the war with Pyrrhus [S3] (Book XVI, 36, read directly).
- No shingle is evidenced at Dinefwr or, from what was read here, at any Roman fort in Wales. The roof material is
  imagined in the plan already ([fort:S1], "the roof's material is not known, so timber shingle is a choice"), and
  the texture changes nothing about that. Tile fragments were found at the site but not what they roofed
  [fort:S1]; tile stays undrawn (ADR 0046).
- The photograph is of weathered grey boards. The geometry draws the courses; the boards' joints, run up the
  slope, read as the gaps between the shingles of a course.

## Daub

- Daub with wattle impressions was found at Dinefwr [fort:S1]: documented. What was in it is not recorded there;
  daub of clay, straw and dung is what the Castell Henllys rebuilds use [ironage:S30].
- No limewash or render is evidenced (ADR 0046), so the daub is drawn as bare clay. The photograph is a modern
  clay plaster, rough and cracked.

## Thatch

- The settlement's roofs are not known [fort:S1]; the plan's thatch is imagined. Welsh reconstructions use reed
  (Castell Henllys [ironage:S30]) and straw (Bryn Eryr at St Fagans, home-grown spelt [ironage:S32]); either is
  an analogy, and so is the photograph, a modern angled reed thatch.
- A search for Roman-period thatch evidence in Britain (2026-10-10) found only general and teaching pages, no
  excavated find; recorded as a gap.

## Gaps and open questions

- The timber species at Dinefwr, and whether any timbers were sawn or hewn.
- How long a turf face stayed bare, and whether faces were grassed on purpose.
- Any Roman-period find of shingle or thatch in Wales.
- The 2022 Laurieston paper's full survey of grass-down laying across sites; the 1899 report read directly.

## Sources

- [S1] T. Romankiewicz, B. Russell, G. Bailey, T. Gardner, J. R. Snyder and C. T. S. Beckett, "'Another wall of turf': geoarchaeological analysis of the Antonine Wall at 72 Grahamsdyke Street, Laurieston, Falkirk", *Proceedings of the Society of Antiquaries of Scotland* 151 (2022), 103-141. https://doi.org/10.9750/PSAS.151.1353 : read in full (PDF): turf block sizes in fort ramparts (Plantation Place, Strasbourg, Strageath, Vindolanda, Laurieston), Vegetius's sizes converted, grass-down laying recorded at Croy, Balmuildy Road and Vindolanda and not consistently at Laurieston.
- [S2] Vegetius, *Epitoma rei militaris*, Book III, chapter 8, Latin text at The Latin Library. https://www.thelatinlibrary.com/vegetius3.html : read directly: a turf is cut holding the earth with the grass's roots, half a foot high, a foot wide, a foot and a half long, and the turves are ranged to make the bank.
- [S3] Pliny the Elder, *Naturalis Historia*, Book XVI, 36, Latin text at LacusCurtius. https://penelope.uchicago.edu/Thayer/L/Roman/Texts/Pliny_the_Elder/16*.html : read directly: oak makes the best shingle; Rome was shingled for 470 years until the war with Pyrrhus (citing Cornelius Nepos).
- [S4] Historic England Research Report 84/1993, "Tree-ring analysis of oak timbers from the 1991 excavations at Vindolanda, Northumberland". https://historicengland.org.uk/research/results/reports/84-1993 : title and summary through a search result (the page refused a direct read): 53 samples, a chronology to AD 103, local timber felled from mature woodland.
- [S5] Glasgow Archaeological Society, *The Antonine Wall Report* (1899), scan at Heidelberg University Library. https://digi.ub.uni-heidelberg.de/diglit/antonine_wall1899/0143 : through a search summary only: the dark line in its sections, read as turves laid grass side down. A period interpretation.

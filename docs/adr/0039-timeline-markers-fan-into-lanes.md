---
title: "ADR 0039: Timeline markers keep their dates and fan into lanes when they crowd"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0039: Timeline markers keep their dates and fan into lanes when they crowd

- **Status:** Accepted (decided by Claude under the proactive mandate, [ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md), so Dewi can overrule it)
- **Date:** 2026-10-03

*Numbering: written as 0037/0038 and renumbered at the merge into main on 2026-10-09, since other branches had taken those numbers.*

## Context

Every key date and minor event has a marker on the timeline at its date, all on one line and drawn in
array order, so a later marker covers an earlier one. The review of the battles branch found that the
1849 cholera dot sat 0.9px from the 1848 bridge diamond and church dot and hid "St Teilo's is
rebuilt". Checking every marker's centre with `elementFromPoint` at 1440×860 found nine covered, most
of them older than the branch: Dinefwr (c. 1172), 1213, 1277, 1282, 1287, Rebecca (1843), the bridge
and the church (1848), and 1849. Carreg Cennen's 1287 grant sat exactly on the 1287 siege. The
non-linear scale packs the medieval and Victorian key dates into a few pixels, and more content will
only add to it. An e2e test that clicked with `dispatchEvent` skipped hit-testing and could not see it.

## Decision

- **A marker's x is always its date.** Markers whose dates fall too close are fanned into **lanes**:
  the line, one above, one below, two above, two below (`LANES` in `src/domain/marker-lanes.ts`).
- **One pure rule places them**, `markerLanes(markers, reach, step, margin)`: key steps first (so they
  keep the line when they can), then by date; each takes the first lane where its centre is at least
  the margin (2px) outside every placed marker's shape and that marker's centre outside its own. A dot
  reaches its radius; a diamond (a square turned 45°) reaches its half-diagonal along the axes. If no
  lane is clear it takes the clearest, and the renderer logs it as crowded.
- **The timeline measures, the rule decides.** `TimelineBar` reads the track width and each shape's
  reach from the drawn markers (so the sizes live only in the stylesheet), places markers 12px apart
  per lane, and pads the rail by only as much as the outer lanes need. It re-lays out on resize, on a
  language change, and when the markers reappear after a guess (they measure 0 while hidden).
- **Tested both ways**: unit tests of the rule (the Victorian cluster cleared, a crowd reported), and an
  e2e test that every marker's centre is its own button at 1440×860 and at 1280×720, with the 1849
  marker clicked by a real mouse click.

## Consequences

Close dates stay at their true x and can all be clicked. Some key-step diamonds now sit off the line
(Talley, Dryslwyn, the 1287 siege, the bridge at 1440 wide), which reads as a small stack; that is the
cost. At 1440 wide the Victorian stack needs two lanes above, so the rail grows by 9px. If content ever
crowds more than five lanes into one spot, the crowded marker is logged (`dewidebug timeline lanes
... crowded=[...]`) and the e2e test fails, which is the signal to rethink (a cluster marker, say).

## Alternatives considered

- **Nudging crowded markers sideways**: simple, but it draws a date in the wrong place; 8px is about
  nine years around 1849 on this scale.
- **Folding 1849 into the almanac with no marker**: fixes the one reported case and none of the eight
  others, and loses the card.
- **A cluster marker that opens a list**: scales best, but is a new control for a problem five lanes
  solve today.

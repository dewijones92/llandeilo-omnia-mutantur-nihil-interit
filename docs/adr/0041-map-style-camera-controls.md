---
title: "ADR 0041: Map-style camera controls"
kind: adr
status: accepted
updated: 2026-10-03
---

# ADR 0041: Map-style camera controls

- **Status:** Accepted
- **Date:** 2026-10-03
- **Number:** written as 0037 on its branch, renumbered to 0041 when `main` (which had taken 0037 to
  0040) was merged in.
- **Amended 2026-10-09 by [0042](0042-one-welcome-panel.md):** the one-time hint and the Keys panel
  described below are replaced by the welcome panel, which lists the same controls.

## Context

Dewi, 2026-10-03: "make the camera easier to move around please. I find myself just orbiting around
a certain point, but i wanna easily shift left/right/up/down easily. maybe its just user error or?"

It was not user error. The camera was Babylon's `ArcRotateCamera` with its stock inputs: left-drag
orbited about the target, panning was on the right button with a screen-plane pan that also moved the
target up and down, the wheel zoomed towards the screen centre, and the arrow keys (with the 3D view
focused) turned the camera. Nothing on screen said any of that, so the obvious gesture, a left-drag,
only ever turned the view about one point. Asked to choose, Dewi picked map-style controls, as in
Google Maps and Google Earth.

## Decision

The camera stays an `ArcRotateCamera`; its stock inputs are no longer attached. `MapControls`
(`src/world/controls.ts`) owns the input, and the maths is pure TypeScript in
`src/domain/camera-moves.ts`, unit tested.

Dewi's choices:

- **Left-drag slides the land.** The ground point under the cursor when the button goes down stays
  under the cursor while it is held. The target moves over the ground, never up through it: the drag
  holds to the level plane through the grabbed point (`panShift`), and the target is clamped to the
  map disc (`clampToDisc`, the ten-mile circle). After the drag the target eases onto the ground height
  under it (`World` exposes `ground(x, z)`), so the next turn pivots on the land.
- **Right-drag, or Ctrl+left-drag, turns and tilts** (orbit), with the same sensitivity and inertia
  Babylon's own pointer input used, so the feel of turning is unchanged. The radius and tilt limits stay.
- **The wheel zooms towards the point under the cursor**, not the screen centre: scaling the distance by
  `k` about that point (`zoomAbout`) moves the eye along its line to the point, so the point stays put.
- **Keys, with the 3D view focused:** W A S D and the arrow keys slide, Q and E turn, R and F tilt.
  Elsewhere the arrow keys keep stepping key dates (`ownsArrows` in `src/main.ts` is unchanged).
- **Double-click flies to the spot**, through the existing `Flight`.

Decided by Claude under the proactive mandate ([ADR 0027](0027-claude-proposes-and-builds-under-a-proactive-mandate.md)):

- A press counts as a drag once it passes Babylon's own tap threshold (`InputManager.DragMovementThreshold`,
  10px on either axis), read from Babylon rather than copied, so a click on a person, a bubble or the
  train is still a click and a drag is never also a click.
- The ground under the cursor is found by marching the cursor's ray over the heightfield and bisecting
  (`rayGround`), not by picking meshes: it is cheap on every wheel event and never lands on a tree.
- A released drag glides to a stop (exponential decay, the same distance at any frame rate, `glide`);
  a drag held still before release stops dead.
- A slide (drag, keys, double-click) ends a flight and a train follow; turning and zooming end a flight
  but keep a follow, so you can still circle a followed train and zoom on it. Before this, a drag
  during a flight was overridden by the flight rather than ending it.
- **The sky is not a place** (added after the second-Opus review, 2026-10-03). At the steepest tilt the
  top of the view is sky, and the first build treated a cursor ray that missed the ground as a point
  9,000 units along it: one wheel notch there moved the target about 1,500 units (15 km), and a drag on
  the sky threw the camera across the map, backwards. Now a ray that misses the ground uses the level of
  the target only where it meets that plane in front of the eye and within reach (`pointUnder`,
  `hitPlane`); otherwise there is no point. The wheel then zooms about the screen centre; a left-drag
  that starts on the sky turns the view instead (there is no land to hold, and turning is what Google
  Earth does there); and a slide whose cursor is pulled above the horizon holds the land still until the
  cursor comes back down, with no glide (`panShift` gives nothing). A slide held just below the horizon
  still moves far for a few pixels, as on any tilted map; the map disc bounds it.
- A slide or a zoom shows the Whole valley button, as a flight does, so there is always a way back.
- Shift makes the keys slide three times faster; a key tapped between two frames still moves for one
  frame, so a quick tap is never lost at a low frame rate.
- Double-clicking a person or a train leaves it to their own click (conversation, follow); the flight
  goes in to half the distance, no closer than 40 units, keeping the current tilt and heading.
- A one-time hint, "Drag to move, right-drag to turn, scroll to zoom", sits at the top centre once the
  valley opens (after Begin, where the Begin card shows), and goes for good after the first drag
  (`localStorage`, read and written in try/catch). It ignores the pointer, so the 3D view under it
  still takes the drag it describes. The Keys panel lists the new keys and mouse controls in both
  languages.

## Consequences

- Left-drag no longer turns the view. The compass test, which turned the view with a left-drag, now
  uses a right-drag.
- Every decision point logs a `dewidebug camera` line (drag start and end with kind, grab point and glide,
  zoom bursts with the point and whether it hit the ground, double-clicks, interrupted flights, keys).
- Touch and pinch are not handled: the app is desktop only ([ADR 0015](0015-desktop-only.md)).
- Turning still uses Babylon's inertia (`inertialAlphaOffset`), so a Babylon upgrade that changes that
  path changes the feel of turning; the e2e tests read alpha back from the camera and would notice it
  stopping, not a change of feel.

## Alternatives considered

- **Babylon's own panning** (`mapPanning`, `panningSensibility`, `zoomToMouseLocation`): pans by a fixed
  rate in the camera's axes, so the land slides under the cursor at the wrong speed (by depth), and its
  zoom-to-cursor does not keep the target on the ground or in the disc.
- **Left-drag keeps orbiting, with a visible pan mode or on-screen arrows**: Dewi chose map-style.
- **Picking the terrain mesh for the grab point**: correct to the triangle but costly on every wheel
  event, and it lands on trees and buildings.

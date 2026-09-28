---
title: "ADR 0009: Terrain from OS Terrain 50 as an irregular low-poly mesh"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0009: Terrain from OS Terrain 50 as an irregular low-poly mesh

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

The Tywi valley's shape is the one constant across every era. The look is clean low-poly.

## Decision

OS Terrain 50 (Open Government Licence), processed with GDAL by `tools/terrain/build-terrain.sh`, is
sampled and triangulated with Delaunator into an irregular mesh that follows carved river channels.
Rivers, buildings, railways, roads and woodland come from OS Open Rivers and Open Map Local via
`tools/geo/build-osdata.py`. Welsh Government LiDAR for close-ups is a later phase.

## Consequences

50m is plenty for the overview; close-ups will look soft until LiDAR lands. Today's landscape stands
in for earlier ones except where content changes it.

## Alternatives considered

A regular grid (the look Dewi did not want); LiDAR everywhere (far too large).

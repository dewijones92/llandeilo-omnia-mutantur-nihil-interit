---
title: Design guides
kind: index
status: proposed
updated: 2026-10-23
---

# Design guides

Ideas and guides for how the app should feel, gathered in discussion with Dewi. **Status: proposed.**
Nothing here is built or agreed yet unless a section says so; decisions move to `CLAUDE.md`'s
Decisions table once agreed, and work items to [`../todos/_index.md`](../todos/_index.md).

| Guide | About |
|---|---|
| [`timeline-experience.md`](timeline-experience.md) | Previous/next through key dates, the camera going to the action, sound and visual effects per event |
| [`conversations-by-class.md`](conversations-by-class.md) | Typical conversations at every key date, one per class of people, in the language each class spoke |
| [`models.md`](models.md) | Realistic models for the important buildings and castles, phase by phase through time |
| [`blender-models.md`](blender-models.md) | **Accepted; phases 1 and 2 built for the Roman forts** (2026-10-10; phase 2, textures and clicking a part, is ADR 0055). Scripted Blender models for the important landmarks: typed plan → build sheet → headless Blender → glTF with each part's tier in its extras, loaded by one loader |
| [`contributed-models.md`](contributed-models.md) | **Proposed, not built** (2026-10-23, [ADR 0060](../adr/0060-contributed-models-are-a-separate-credited-layer.md)). Models made outside the project (e.g. in SketchUp) as a separate, credited, switchable layer: the format, provenance part by part, credit and licence, placement and seating, the toggle, intake and review |
| [`sound-and-assets.md`](sound-and-assets.md) | Immersive sound and other assets: generate, use a generative service, or find openly licensed ones |
| [`feedback.md`](feedback.md) | Visitor feedback and corrections, ideally as GitHub issues: options and a recommendation |
| [`analytics.md`](analytics.md) | Privacy-friendly analytics and error reporting: options and a recommendation |
| [`cutscenes.md`](cutscenes.md) | **Agreed; the engine and the Roman arrival built** (2026-10-03, [ADR 0041](../adr/0041-cutscenes-as-data-on-one-clock.md)). Short cinematic scenes at key dates from one data-driven model |
| [`atmosphere.md`](atmosphere.md) | **Built.** Time of day, seasons, climate by period, and the engine effects |
| [`ideas.md`](ideas.md) | A running ideas board: raised, discussed, parked or agreed |

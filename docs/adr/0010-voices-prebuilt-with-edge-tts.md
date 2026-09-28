---
title: "ADR 0010: Voices pre-generated at build time with edge-tts"
kind: adr
status: accepted
updated: 2026-09-28
---

# ADR 0010: Voices pre-generated at build time with edge-tts

- **Status:** Accepted
- **Date:** 2026-09-26

## Context

Conversations are voiced, with no robotic TTS and no runtime cost. Latin needed a voice.

## Decision

`tools/voices/build-voices.ts` generates an MP3 per line with edge-tts and keeps a manifest of
hashes of voice, pitch, rate and text, so only changed lines are regenerated and orphans are
deleted. Latin uses `it-IT-DiegoNeural` reading plain Latin. Details in `docs/content/voices.md`.

## Consequences

MP3s are committed to the repo. Invented dialogue text is sent to Microsoft's service at build time,
which is fine for our own text but never for personal data.

## Alternatives considered

Runtime TTS (cost, latency, a key in a public repo); Piper or espeak (less natural); ElevenLabs
(paid).

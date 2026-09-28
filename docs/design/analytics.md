---
title: Analytics
kind: design
status: proposed
updated: 2026-09-28
---

# Analytics: knowing whether anyone uses it, and how

Raised by Dewi, 2026-09-28. **Proposed.** Details below are from memory and must be checked before
choosing (terms, free tiers and cookie behaviour change).

## What we would want to know

- Visits, and from roughly where (country or region, not individuals).
- Which years and places people look at most, and which key dates they step through.
- Whether people open the ⓘ popovers, conversations, almanac and language panels.
- Whether it loads well: load time, WebGPU or WebGL2, errors.

## Options

| Option | Cookies (so a consent banner) | Cost | Notes |
|---|---|---|---|
| **None** | No | Free | Simplest; we learn only from feedback |
| **GoatCounter** 💡 | No | Free for non-commercial use (to check) | Tiny script, privacy-friendly, supports custom events |
| **Cloudflare Web Analytics** | No | Free (to check) | Page views only unless the site is behind Cloudflare |
| **Plausible** | No | Paid (or self-hosted) | Custom events, clean dashboard |
| **Umami** | No | Self-hosted (a server to run) | Full control |
| Google Analytics | Yes | Free | Needs a consent banner under UK rules; heavy; not recommended here |

## Recommendation

**A cookieless, privacy-friendly counter (GoatCounter first to check)**, so there is no consent
banner, plus a few **custom events** (key date reached, panel opened, ⓘ opened, WebGPU or WebGL2).
Record no personal data, no IP addresses, and say so on the About panel.

Separately, the app could keep its own **anonymous error reporting** (load failures, WebGPU init
failures) through the same events, which would answer the open "does it work on real GPUs"
question.

## Open questions

- 💭 Any analytics at all, or feedback only?
- 💭 Is a third-party script acceptable on the page (it is loaded from outside the repo)?

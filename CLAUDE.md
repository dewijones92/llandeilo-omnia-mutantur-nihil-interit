# Llandeilo Through Time (working title)

Repo: `llandeilo-omnia-mutantur-nihil-interit`, meaning *"everything changes, nothing perishes"*
(Ovid, *Metamorphoses* XV).

A web app for exploring **Llandeilo and a 10-mile radius around it** across the whole of human
history. A timeline slider at the bottom runs from the earliest evidence of people living here to
today. Key dates are marked on it. As the slider moves, the scene changes to match that time:
the landscape, buildings, people, their conversations and events.

**The core promise: history first, invention always labelled.** Content is as factual as the
sources allow. Where there are gaps (dialogue, faces, everyday detail), we fill them in, and every
invented piece carries a visible ⓘ marker. Hover it (or tap it) to see what is invented and what
it is based on.

**The original brief** is kept verbatim in `docs/brief.md`. Decisions below supersede it where
they conflict.

**Living docs:** `AGENTS.md` → `docs/` (frontmatter'd markdown: features, backlog, tests,
sources). Keeping them current is part of "done". Bump each doc's `updated`.
**A doc's `status` is a claim, and a stale claim is worse than none.** When you touch an area,
re-read its status against the code (and a content item's research status against its sources)
and correct it. If you find a status was wrong, say so in the doc rather than quietly fixing it,
so the next reader knows the map was unreliable there.

## Decisions

> ✅ = agreed with Dewi (2026-09-26). ⚠️ = proposed, so confirm before building on it.

| Decision | Choice | Why |
|---|---|---|
| Platform ✅ | Web app, static site, **desktop-first** (phones must work, not shine) | Dewi will mainly use it on desktop, which gives us graphics headroom |
| Stack ⚠️ | Vite + TypeScript (strict) | Fast dev loop; strict types make bad content data fail at compile time |
| Rendering ⚠️ | three.js (WebGPURenderer, WebGL2 fallback) | Largest ecosystem; WebGPU where available without writing an engine |
| Look ✅ | **Clean low-poly** 3D diorama of the real valley that you can orbit around | Charming, fast, and quick to fill every era; fidelity can be raised per era later |
| Exploring ✅ | Both: the whole 10-mile circle as one diorama, **and** a camera flight into individual places (Dinefwr, Carreg Cennen, Talley, Dryslwyn…) | Overview plus depth |
| Slider ✅ | Both: smooth morphing while dragging, **and** magnetic key dates that snap with a short "moment" | Continuous feel without losing the landmarks |
| Conversations ✅ | Both: short snippets appear automatically while scrubbing, **and** you can click a person for the full conversation with voice | The world feels alive, with depth on demand |
| Voices ✅ | `edge-tts` neural voices (Welsh, English, Italian, French); **no robotic TTS** | Natural sound. **Latin = `it-IT-DiegoNeural` reading plain Latin** (Church Latin pronunciation), chosen by ear 2026-09-26 over a classical respelling. Fits medieval clergy; Roman-era lines carry an ⓘ saying Romans pronounced it differently |
| Ambient sound ✅ | A sound bed per era, crossfaded as you scrub; CC0/CC-BY audio with tracked credits | Atmosphere |
| Language layer ✅ | Show how spoken language changed over time and **by class** (e.g. Welsh farmers vs Norman lords vs Latin clergy), with unknowns shown as unknown | Dewi's request, and a natural fit for the ⓘ model |
| Almanac layer ⚠️ | Panel for the current time: food, clothing, homes, religion, money, health, travel, population | "Not just language": more ways into daily life |
| Family bloodline ✅ | One imagined family recurring in every era, always ⓘ | Makes it personal |
| Terrain ⚠️ | Real elevation data (Welsh Government LiDAR / OS Terrain 50) | The Tywi valley's shape is the one constant across every era |
| Timeline scale ⚠️ | Non-linear (deep time compressed, recent centuries spread) | A linear 12,000-year slider puts everything since the Romans in the last sliver |
| Content ⚠️ | Data files in the repo, written ahead of time | Reviewable, citable, testable; no runtime AI cost or invented "facts" |
| v1 scope ✅ | **Vertical slice**: about 3 eras done properly end to end before filling in the rest | A thin sweep of 12,000 years would look empty everywhere |
| Hosting ✅ | **GitHub Pages**, deployed by GitHub Actions from the **public** GitHub repo | Free, no extra accounts |
| Offline ✅ | Not needed (no PWA) | |
| Audience ✅ | Dewi and family, **no young kids** | Tell history honestly, including the grim parts |
| Language ✅ | Bilingual: Welsh/English UI toggle; dialogue in the era's language with translation | Llandeilo is a Welsh-speaking area. A human Welsh check is 🅿️ parked |
| ⓘ model ✅ | 3 tiers: documented / reconstructed / imagined | Honest about the large middle ground of archaeological reconstruction |

## Historical accuracy (the project's first law)

- **Every piece of content has a provenance**, one of:
  - **Documented**: attested by a primary or reputable secondary source. Must cite ≥1 source.
  - **Reconstructed**: inferred from archaeology or analogy (for example, what a roundhouse
    looked like). Must say what it is based on.
  - **Imagined**: invented to fill a gap (dialogue, named ordinary people). Gets the ⓘ marker.
    Must say what it is grounded in.
- **Make it unrepresentable to get wrong.** Provenance is a discriminated union in the content
  schema. A "documented" item without sources fails the build, not a review.
- **Cross-check every documented claim against two independent sources.** Wikipedia is a place to
  find leads, not a citation on its own. Prefer: Dyfed Archaeological Trust HER (Archwilio),
  Coflein (RCAHMW), Cadw, the Dictionary of Welsh Biography, the National Library of Wales,
  People's Collection Wales, and peer-reviewed archaeology.
- **Dates carry their uncertainty.** Use ranges and "c." rather than false precision. Show the
  uncertainty in the UI rather than hiding it.
- **Never put invented words in a real person's mouth as if quoted.** A documented figure may
  appear in an imagined scene, but the ⓘ must say the dialogue is invented.
- **Voices are labelled too.** A modern voice reading an old language is an approximation, and the
  ⓘ says so (e.g. "modern Welsh voice; medieval pronunciation differed").
- **Welsh place names first**, with historic English forms noted (Dinefwr, not only "Dynevor").
  Spell them correctly; check Welsh orthography rather than guessing.
- **When unsure, say so in the content.** "We don't know" is a valid, and interesting, answer.

## Quality bar

### Unified and DRY, as far as is sensible (the twin laws)

- **Unified: one seam per capability.** Before building anything, ask "what is the one model this
  belongs to?" and build that, with specifics in small adapters behind it. So: one timeline entity
  model (everything on screen has a time range, a place and a provenance), one provenance type,
  one place registry, one scene/era state that the renderer, audio, almanac and UI all read, one
  audio mixer, one i18n string table. **Don't special-case eras in the renderer.** A feature built
  twice, once per era or once per place, is a design failure even if the copies share no lines.
- **DRY: one fact, one place.** Each event, place, person and source lives in exactly one content
  file, and everything else refers to it by id. Versions only in `package.json`. Colours, spacing
  and type only in theme tokens. Lint, TS and formatter config only at the repo root. UI text only
  in the string table, never hard-coded in components.
- **"As far as is sensible."** Unify and factor wherever it makes the code simpler to change. Don't
  build an abstraction that is harder to follow than the duplication it removes. When a
  duplication or a split seam is deliberate, record it here with its reason. Unrecorded
  duplication is a defect.
- **If a seam genuinely can't be unified** (it really must differ per era or per place), stop and
  surface the reason to Dewi for a decision. Don't quietly build two paths.
- **Found one place with a rule? Go and count the others.** When fixing or changing a rule, search
  for every other place that answers the same question. Copies drift, and usually some are wrong.

### Layers

- **The domain and content layer is pure TypeScript**, with no three.js, DOM or Web Audio imports.
  A lint rule (`no-restricted-imports` or a boundaries plugin) makes a leak a build error. The
  history model is then testable without a browser, and the renderer, audio and UI only *read*
  the current era state from it. Dependencies point inward.
- Small, focused modules (SOLID).

### Types: as strong as TypeScript allows

- `tsconfig` is `strict` plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noImplicitOverride`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`,
  `verbatimModuleSyntax`.
- **No escape hatches:** no `any` (use `unknown` and narrow), no non-null `!`, no `as` casts
  except at a validated boundary, no `@ts-ignore` (use `@ts-expect-error` with a reason, if ever).
- **Illegal states unrepresentable:** discriminated unions over boolean flags, and exhaustive
  `switch` ending in `assertNever`.
- **Branded types for domain values** (`Year`, `PlaceId`, `EventId`, `PersonId`, `LangCode`) so an
  id or a year can't be passed where another is expected.
- **Validate at the boundary, trust inside.** Content files are parsed with a schema library (zod
  or similar), and the TypeScript types are **inferred from the schema**, so the schema is the one
  source of truth for both.

### Linting and formatting

- ESLint (flat config) with `typescript-eslint` `strictTypeChecked` + `stylisticTypeChecked`;
  Prettier owns formatting (no style rules in ESLint).
- **Zero warnings:** `--max-warnings 0`. A warning is either fixed or its rule is turned off here,
  with a reason.
- Dead code and unused dependencies are checked (e.g. `knip`) ⚠️.
- **Shift left:** a sub-second pre-push hook runs the cheap checks (format, lint on changed files,
  content validation). CI runs everything: typecheck, lint, content validation, tests, build.
- CI stays green. Any red check blocks the deploy.

### Tests and verification

- **Testing pyramid**: many fast unit tests (schema, timeline maths, content validation), fewer
  integration tests, a few Playwright e2e tests of the real flows (scrub the slider, snap to a
  key date, open an ⓘ, fly into a place, switch language). A bug fix lands with a test that was
  **seen to fail first**.
- **Test the combined answer, not just the parts.** When several components answer one question
  (e.g. "what is on screen, and heard, in 1282?"), test that answer end to end as well as each part.
  Green unit tests can sit on top of a bug that only the whole picture shows.
- **Every flow that matters has an e2e test that runs in CI on every push**, not only locally.
- **A visual change isn't verified until the screen has been LOOKED AT.** Take a Playwright
  screenshot of the changed scene at more than one point on the timeline, on desktop (and check
  phone width still works), before calling it done. Green tests don't prove a scene looks right.
- **Text wraps; nothing truncates.** No ellipsis on speech bubbles, captions or ⓘ popovers.
- **Performance budget**: slider scrubbing stays smooth (60fps target on an ordinary desktop), and
  first load is small enough to feel quick. Measure before optimising, and record numbers here.
- **Accessible**: the ⓘ works on hover, tap and keyboard focus. The slider is keyboard-operable.
  Text meets contrast on a light theme.

### Assets and licences

- **Only use assets we're allowed to use:** CC0, CC-BY, public domain, or the Open Government
  Licence (e.g. Welsh Government LiDAR). No "found it online" images, models, textures, sounds or
  data.
- **Every asset records its source, author and licence** in one place (the asset manifest, per the
  DRY law). An in-app credits page is generated from that manifest. An asset with no licence
  record fails the build.

### Debugging

- A **`?debug` overlay** shows the current year, the era state, FPS, what's loaded, and each
  visible item's id and provenance. It's the first tool for "why does 1282 look wrong?", and
  makes screenshots self-explanatory. (Logging conventions are in Dewi's global CLAUDE.md.)

## Tools on this machine

- **GDAL 3.8.4** (`/usr/bin/gdalinfo` etc., apt `gdal-bin`): LiDAR/DEM → terrain heightmaps.
- **edge-tts** (`~/.local/bin/edge-tts`): neural voices. It sends text to Microsoft's online
  service, which is fine for our invented dialogue.
- **ffmpeg** (`/usr/bin/ffmpeg`): audio conversion and trimming.
- **Blender 4.0.2** (`/usr/bin/blender`, apt, installed by Dewi 2026-09-26). Run headless with
  `blender -b -P script.py` to build or tweak models, export glTF, and render preview PNGs. If a
  4.0 limitation bites, the official 5.x tarball in `~/code/tools/` is the upgrade path (no sudo).
- Node 24 (nvm), `gh` (logged in as `dewijones92`), Playwright for screenshots and e2e tests.

## Repo and deploy

- Remote: `github.com/dewijones92/llandeilo-omnia-mutantur-nihil-interit` (**public**, created
  2026-09-26). Local clone: `~/code/llandeilo-historical-game`. Default branch `main`.
- Every push to `main` will deploy to GitHub Pages via Actions (workflow not written yet).
- Public repo: never commit secrets, credentials or personal data.

## Build & test

Not scaffolded yet. Fill this in once the stack is agreed.

## Working agreements

- **Nothing gets built until Dewi explicitly says go** (2026-09-26). Discussion and plan pages are fine.
- Commit as you go: small, coherent commits at each green state.
- **Own the repo.** Take the structurally right option. Surface only decisions that are genuinely
  Dewi's: content or tone choices, trade-offs with no clear default, and anything published.
- Anything that goes public (creating the GitHub repo, deploying) is confirmed with Dewi first.

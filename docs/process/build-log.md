---
title: Build log
kind: log
status: current
updated: 2026-10-03
---

# Build log

Milestones and what each one taught us. Newest last.

## 2026-09-26

1. **Discussion and CLAUDE.md**, adapted from the Totum repo: kept the twin laws (unified and DRY),
   the testing pyramid and "a visual change isn't verified until it has been looked at"; dropped
   everything Android-specific; added the historical-accuracy law.
2. **Research**: six parallel agents. They exhausted the shared WebSearch quota; later sections
   relied on WebFetch. See [`../research/process.md`](../research/process.md).
3. **Scaffold**: Vite, strict TypeScript 6 (typescript-eslint does not support TypeScript 7 yet),
   Babylon.js 9, ESLint strictTypeChecked, Prettier, knip, Vitest, Playwright, GitHub Actions to Pages.
4. **First render**: the real Tywi valley from OS Terrain 50. ACES tone-mapping greyed the sky, so
   the neutral tone-mapper replaced it; a sky dome would not take vertex colours, so a screen-space
   gradient layer replaced that.
5. **CI failed twice before the first deploy**, both times on checks doing their job: generated
   sources had been reformatted by Prettier (now excluded), and knip flagged exports not yet used.
   A pre-push hook now runs the fast checks locally.
6. **Features**: 40 era features, key dates, moment card, labels and camera flights. A mesh-merge
   crash (mixed vertex attributes) was only caught by looking at the page before deploying.
7. **Scale**: the first close-ups mixed true-size buildings with trees 40–60m tall and landmarks
   ×4.5. Unified to trees at about 20–30m, landmarks ×2.6, true footprints for towns and hillforts.
8. **Citations**: the finalised Victorian note renumbered its sources and dropped list bullets, so
   every Victorian citation failed to compile. That is the compile-time check working; citations
   were re-mapped by title.
9. **First deploy**: https://dewijones92.github.io/llandeilo-omnia-mutantur-nihil-interit/,
   verified by loading it in a browser, not just by the HTTP 200.
10. **Conversations, almanac, language, sound**: six family scenes with voices, 32 almanac
    entries, 12 language periods, procedural Web Audio ambience.
11. **Bundle**: `@babylonjs/core` barrel imports pulled in the whole engine (1.6MB gzipped). All
    Babylon imports now go through `src/world/babylon.ts`, which deep-imports only the modules used
    plus the side-effect modules they need (ray picking, layer and shadow scene components, thin
    instances): 387KB gzipped. A missing side-effect import fails only at runtime, so this was
    verified by screenshot and the full e2e suite on the production build.
12. **Independent Opus review** (code, and history plus visuals). Fixed: Roman forts 0.9km out
    of place, Younger Dryas on uncalibrated dates, the year readout printing raw floats, arrow keys
    snapping back to key dates, a listener leak per provenance badge, whole-terrain recolouring
    on nearly every scrub frame, purity-lint holes, no voice/text or asset-licence checks, and
    bilingual gaps. New e2e tests then found that the full-screen label and bubble layers were
    swallowing mouse input meant for the 3D view (`#app > *` outranked their `pointer-events:
    none`); now fixed and guarded by a test that fails on the old CSS.
13. **Verification review of the fixes** (a second Opus pass). Most fixes held, but six
    regressions had come in with them: disposing one smoke system destroyed the shared smoke
    texture, the render-once shadow map froze the moving train's shadow, the collapsed event card
    only updated on scrub, an automatic panel close stole keyboard focus, and three new content
    sentences were not in the research. All fixed; lessons: a shared resource must survive its
    consumers' disposal, and a "render once" cache needs every moving caster accounted for.

## 2026-09-28

14. **Previous/Next and camera shots**, then two review rounds. The first found snaps pulling the
    camera away and a quick second Next being lost; the second found Next stepping from the wrong
    place after a marker click. Each fix landed with an e2e test seen failing on the old code first.
    A Playwright lesson: at SwiftShader's 1fps, two sequential clicks never overlap an animation, so a
    race test must fire both clicks in one page task.
15. **ADRs and a what-goes-where table**; desktop only; no bundle limit; the dev server always on 5051.
16. **Research verified by a second agent**: the conversations-by-class note had 13 corrections
    (inexact quotes, an overstatement, two unsupported "cross-checked" labels) and stays a draft.
17. **The first Blender model**: the 1850s train, researched first from the 1858 Board of Trade report
    on the engine Victoria (a six-coupled Hackworth of 1841). Two traps: Blender applies scale on the
    object's own axes before rotation (the carriage roofs came out as discs), and glTF's handedness
    conversion is a mirror, so baking it into the vertices turns every face inside out; the model
    looked black until the winding was flipped back. The train is now a feature kind with dates and
    its own provenance, so the 1840s-type engine no longer runs through the 1990s.
18. **Compass and follow**: the compass maths is pure and unit-tested; following lives in the one camera
    seam (Flight), so any other flight ends it.
19. **Atmosphere: time of day, seasons, effects** ([`../design/atmosphere.md`](../design/atmosphere.md)).
    One pure function, `lightingAt(environment, clock)`, turns the era's sky colours and the chosen
    hour and season into every light the renderer reads, from the real solar geometry at 51.88°N;
    `seasonLook` does the same for land and trees, with the winter snow line moved by a climate
    "chill" per period cited to the deep-time note. Lessons: a sun that has just set leaves the
    land black unless the sky itself becomes the fill light (twilight ambient rose to 0.85, plus a
    low afterglow key light from the sun's side); depth of field blurs the background too, so the
    stars were bokeh until the aperture closes as they come out; `DynamicTexture` defaults to clamp
    addressing, so a scrolling star layer smeared its edge column into lines until set to wrap;
    windows at true scale are sub-pixel from the default close-up, so they only read nearer in;
    autumn trees on a green woodland floor glittered at overview scale until the floor under the
    woods turned russet with them. Screenshots were shot from a production build served by
    `vite preview`, because hot reloads from ongoing edits kept restarting dev-server pages
    mid-shot. An independent Opus review then found: a failing e2e expectation (winter 16:30 is
    dusk, not night); the sun disc drawn with the wrong Babylon `Layer` maths (a layer's UVs are
    screen-space, so a scaled layer shows a cut-out of a full-screen texture; the glow is now
    painted into the sky gradient by ray angle); the ripple texture clamping after its first tile
    (the same `DynamicTexture` default as the stars); shadow sampling using a newer light
    direction than the shadow map; three copies of the snow rule; climate keys cited to sources
    that do not cover their dates; smoke staying day-bright at night; and the phone summary
    vanishing after a resize. All fixed. A second review of the fixes found the stars jumping as the camera passed due
    south (a non-whole number of star tiles per turn), 12,500 BC wrongly treated as the coldest
    point when in calendar years it sits inside the milder Late Glacial interstadial (checked
    against a source and written into the research findings, with the existing environment
    keyframes raised as an open question), and muted panel text too faint over the night scene.
    All fixed. Bundle about +10KB (about 436KB gzipped; the size limit has since been removed, ADR 0016). Built in a worktree by a parallel agent and merged into main on 2026-09-28.

20. **Building models from the documented plans** (option A in
   [`../design/models.md`](../design/models.md), "accurate low-poly"). The generic `castle`,
   `church`, `abbey`, `mansion`, `bridge` and `tower` kinds became one `building` kind: a plan
   (`src/content/buildings.ts`, true metres, citing the research) plus a condition. One renderer
   draws every plan, with one builder per part type, and ruins come from each part's `ruin` data
   rather than from code. 26 models, about 27k triangles in all.
2. **Every face was inside out at first.** Square prisms and roofs looked fine, so nothing gave it
   away until round towers showed as crescents from above. Hiding the terrain proved the geometry
   was solid; flipping the winding fixed it. Babylon's front face is the reverse of the right-hand
   rule used in `sculpt.ts`, so check a new primitive from above, not only from the side.
3. **Two terrains.** `ground()` interpolates the 50m OS grid, but the rendered terrain is a Delaunay
   mesh of points about 105m apart, and on a crag they differ by several units. Landmarks now sit
   on the rendered surface (`src/domain/surface.ts`), and `platform` levels a ward to its summit so
   a castle 2.6× larger than life stands on its hill instead of draping down it.
4. **The OS footprint of a landmark is the same building.** A model now hides any OS footprint
   that contains its grid reference or lies under it. That removed the white 120–150m slabs beside
   Newton House and Golden Grove, and the town's copy of St Teilo's.
5. **Scale rule**: `landscape` plans ×2.6 in all axes; `map` plans (the church, the bridges) at true
   footprint with heights × the terrain's 2.4, because they must meet true-size streets and the drawn
   Tywi. Recorded in [`../content/authoring.md`](../content/authoring.md).
6. **Bundle**: 429.9KB → 443.1KB gzipped (the base was already well above the 387KB in CLAUDE.md).
   About 7KB of headroom is left under the 450KB budget.
7. **Independent Opus review**: no CRITICAL, 9 IMPORTANT, all fixed. Square towers ignored the plan's
   rotation, so St Teilo's tower and Newton House's turrets sat askew. A raised part (the Dinefwr
   summerhouse) still reached the ground and filled in the ruined stump. Round towers drew no
   battlements, because every edge was shorter than the merlon spacing. Landscape plans hid real
   neighbouring buildings (six near Talley). Three houses whose form is a guess were labelled
   documented. Two source contradictions were left unsaid (the summerhouse's date; an early
   18th-century rebuild of St Teilo's). The orientation notes were missing. Tests now pin the
   documented dimensions, platform convexity, the surface lookup and the footprint rule.
8. **e2e on a shared machine**: port 4173 was already serving another agent's build, and
   Playwright reuses an existing server locally, so the first run tested someone else's code. Rerun
   against this branch's own preview on a private port: 10 passed. Built in a worktree by a parallel agent and merged into main on 2026-09-28.

## 2026-09-29

1. **The backlog became a board** (pilot, [ADR 0018](../adr/0018-backlog-as-a-gated-board.md)):
   Backlog.md task files in `docs/todos/tasks/`, `npm run board` on :5052, and gates in
   `tools/todos/rules.ts` run by `npm run check`, pre-push and CI. Five agreed items moved across.
2. **Proved against the real tool, not its docs.** A summary of Backlog.md claimed it blocks Done
   while checklist items are open; its source does not. A card pushed past each gate made the check
   fail for the right reason. An invented `agreed_on:` key survived a save that changed nothing but
   vanished on a save that did, which is why the validator rejects unknown keys. Removing each gate
   in turn made its unit test fail.
3. **`npx backlog` is a different package** (`backlog@1.4.56`); use the repo's own install
   (`npm run board`, or `npx --no-install backlog`).
4. **The validator reads the files itself** with `yaml`. The CLI's `task list --json` (one call, 0.37s)
   leaves out `documentation`, `dependencies` and the raw frontmatter keys, and `task view --json`
   takes 0.37s per task, about 37s for 100: too slow for the pre-push hook.
5. **The board only links `http(s)` references**, so a repo path shows as plain text. Links are now
   GitHub URLs that the validator maps back to repo paths (Dewi chose this over an upstream PR).
6. **Independent Opus review**: no CRITICAL, 3 IMPORTANT, all fixed. The gates were keyed to the
   config's column order, so swapping two columns silently moved the research gate (the columns are
   now pinned, in order); the file parsing had no tests and two gate behaviours none either (moved into
   `files.ts` and tested); an unagreed idea had been
   copied onto the board while still on the ideas board (moved back). Also taken: the tool's own
   checklist pattern, distinct whole years only, `..` paths rejected, malformed fields and YAML reported
   rather than skipped or thrown, `.locks/` ignored, Node ≥22.18 for running `.ts`.
7. **Verification review of the fixes**: the gate fixes held; 2 IMPORTANT in the new links, both
   fixed. The link base was a plain text prefix, so a missing or `git+….git` `repository.url` turned
   every link into an unchecked "web" link, and so did any other spelling of a link into this repo
   (another branch, a permalink, `http`, `www`, `raw`), while an `#anchor` could never pass. Links are
   now parsed as URLs, must be written as the one canonical URL, and a bad `repository` fails the
   check. `new URL()` resolves `../` and `%2e%2e` by itself, which is why the link is compared as
   written. Seven changes the reviewer could make without a test failing are now pinned; every rule
   was then broken once on purpose and a test failed each time (one check turned out redundant with
   the canonical comparison and was removed).
8. **The pre-push hook checks the pushed commits** (`check.ts --ref <sha>`, reading the files through
   `git show`), so an uncommitted drag on the board no longer blocks an unrelated push. An integration
   test builds a real git repo and shows the commit passing while the working tree fails.
9. **The whole lifecycle, driven through the board in a browser** (Playwright, a throwaway copy of the
   repo on its own port): create a `content` card, drag it column by column to Done, link its note,
   tick its criteria, record its review, running the validator after every step. 16 steps, all as
   expected. It found two things no unit test could. The board **cannot add Documentation** (it only
   displays it), so the research gate now reads References too and the notes moved there. And the board
   writes a long URL as a folded YAML value (`- >-` then the URL on the next line), which only a real
   YAML parser reads correctly, so the validator must never read these files with a regex.
10. **Third review round** (the changes after the browser run): no CRITICAL, 2 IMPORTANT, both fixed.
    Every URL into this repo was read as a file link, so a card citing one of its own issues or pull
    requests would have blocked every push; only file routes (`blob`, `tree`, `raw`) map to paths now.
    And the pre-push check failed any pushed commit from before the board existed; it now skips a
    commit with no `backlog.config.yml`. Also taken: case-exact routes and paths, encoded `/` rejected,
    a trailing-dot host recognised, the hook reading its push list before anything else runs, and
    commit-mode tests for a note reviewed on disk but not in the commit and for an uncommitted linked
    file. Each fix was broken once on purpose and a test failed each time.

## 2026-10-01

1. **The board pilot ended after two days** ([ADR 0022](../adr/0022-one-todo-file.md)). Five task files,
   the rest of the list in `_index.md` and issue rows on the ideas board made three places to look,
   and Dewi found it confusing. The lesson: a second home for the same kind of thing costs more in
   "where does this go?" than its gating saves, unless everything moves at once. The validator and
   its tests are in git history at `2f5d4a1`.
2. **Issue forms removed** for plain GitHub issues ([ADR 0020](../adr/0020-plain-github-issues.md)), and
   **session-start issue triage** set up ([ADR 0021](../adr/0021-issue-triage-at-session-start.md)). Two
   second-Opus reviews of the triage rule found real holes: a stranger's text could reach the public
   repo unseen, every subagent reading CLAUDE.md would also triage, and a date compared with a
   timestamp made our own replies re-trigger triage for ever.

## 2026-10-02

1. **A todo item can be already done by something else.** "Timeline tick labels overlap" named
   "8,300 BC", an anchor that no longer exists; re-measured at 1024-1920px in both languages, nothing
   overlapped. The overlap test was still worth adding, and a deliberately cramped anchor (10,000 BC
   at t=0.03) proved it fails at its assertion. Its first red run failed in the wrong place: a
   `getByRole('button', { name: 'English' })` also matched two timeline markers ("…to the English"),
   so language buttons need `exact: true`.
2. **e2e no longer reuses a server.** The preview port is derived from the checkout's path, so two
   clones cannot collide, and `reuseExistingServer` is off, so a run only ever tests the build it
   started ([ADR 0023](../adr/0023-e2e-own-port-never-reused.md)).
3. **The scale factors in the About text come from `WORLD`**: the landmark scale moved from the
   renderer (`MONUMENT_SCALE`, now removed) into `src/domain/geo.ts` beside the hill exaggeration.
   The review caught the first wording, "castles, abbeys and forts", as wrong: hillforts are drawn at
   true footprint, so the text now names what is enlarged and what is not.
4. **`Place.namedFrom` is required** ([ADR 0024](../adr/0024-place-names-carry-a-required-date.md)).
   The first draft gave Garn Goch AD 800 as a lower bound, which the review rightly called backwards:
   a lower bound on a name's first use, applied as "named from", shows the name as in use for 1,200
   years with no record. When unsure, the bound must err towards "(today)", so it is 1974, the
   oldest use we can cite.
5. **SwiftShader e2e is slow when the machine is shared**: with another project's emulator on ten
   cores, a page took over 150s to become ready once. A timeout at `data-ready` is load, not a failure
   of the test's own step.
6. **A rule that lives in one view misses the others.** "(today)" for the Roman forts did nothing on
   the map, because only visitable places get a label; their name appears on the moment card, which
   had its own copy of the place name and no rule. One domain function, `namedLater`, now answers
   it for both. The e2e test written against the labels failed for exactly this reason.
7. **Labels hid under the compass.** A screenshot showed "Garn Goch (today)" half under it: labels
   only dodged speech bubbles, and estimated their width from the name alone, missing the note.
   They now avoid every on-screen panel, using their measured size.
8. **The compass sat on top of every right-hand panel.** The conversation, info and debug panels
   were all at `top: 16px; right: 16px`, the compass's own corner, so it covered the conversation's
   close button. Found by a screenshot taken for a different change. They now share one
   `--below-compass` token.
9. **A test that watches the screen can pass while the bug happens.** The test for "arrows in the
   3D view do not step the timeline" first watched the key-date counter and passed on the buggy
   build: at SwiftShader's 1fps the counter had not redrawn two seconds after a step. A probe showed
   the step in the log (`dewidebug timeline step … to=dryslwyn-siege`), so the test now asserts on
   that logged decision and fails on the old build. Two quick key presses even left the counter
   unchanged on the buggy build.
10. **Three second-Opus reviews of one batch.** The first caught three accuracy errors (hillforts
   enlarged, the bridge's date, Garn Goch's bound). The second caught the keys help promising more
   than the code did, the dialect rule written backwards, and ticks claiming steps that had not
   happened. The third caught the fix for the keys (arrows now double-fired with the 3D camera) and
   the paragraph above overclaiming in the todo file. Each review found something in the previous
   fixes.
11. **Independent checks of four research notes, the medieval note first.** 127 of its claims were
    re-read against their sources: 91 confirmed, 8 contradicted. The worst was in the app's own 1282
    card: the English force did not sack Carreg Cennen, it re-occupied the bare walls the Welsh had
    burnt, and the ambushed men were a plundering party from an army that was mostly Welsh levies. Also
    corrected in content: the 1287 "tunnel collapse" was a mined wall falling on the men inspecting the
    mine; "The castles held" in 1403 took one side of a contradiction; Gerald of Wales's oats quote was
    cited to two Wikipedia pages that do not contain it, and is now cited to his own text.
12. **The Welsh had been quietly losing facts.** An audit of every English/Welsh pair found 16 places
    where the Welsh dropped a fact, a number or a caveat ("reported", "probably", "in calendar
    years"), and none where it added one. Translation drift only ever went one way: towards less
    hedging. All 23 fixed (24 edits); the human Welsh check is still parked.
13. **Talley and Dryslwyn rebuilt from checked research.** Talley's plan now has its origin on the
    crossing tower, so the Coflein grid reference places it exactly, and it is drawn as built (about
    49m with a four-bay nave and one aisle), not as designed. After 1536 it splits into a roofed east
    end serving the parish and an abandoned rest, until 1773. Dryslwyn grows in three phases that each
    contain the last, so a unit test can hold the order. The slider cross-fades features over about
    20 years in this part of the timeline, so a phase is half-visible ten years before its date: that
    is the morphing working, not two castles at once.
14. **CI ran out of time.** With 24 e2e tests the GitHub job passed its 25-minute limit and the deploy
    of 97cfad9 was cancelled; the limit is now 45 minutes (5aa8465). The real cost is one SwiftShader
    page load per test.
15. **The first real-GPU numbers found a bug SwiftShader hid.** At about 1fps everywhere, nothing
    looked slower than anything else. On the NVIDIA GPU (through WSL's D3D12 layer) the app idles at
    41fps but scrubbed at 2fps: each slider step recoloured all 153,944 terrain triangles, rebuilt the
    forest buffers and re-rendered the 4096² shadow map, and back-to-back steps queued GPU work until
    each took about a second. Throttling that heavy pass to every 150ms (with a final pass when the
    slider stops) gave about 15fps. Per-stage timings are now logged every two seconds
    (`dewidebug apply cost`).
16. **Four lenses and two refuters each.** Batch 4 was reviewed by a workflow: accuracy, Welsh,
    code and docs, every CRITICAL or IMPORTANT finding attacked by two independent refuters. 18
    survived and 2 were refuted. The critical one: the "From the record" sky caption stayed on screen
    after leaving its key date, so 1857's weather could sit over AD 600. Recorded skies now carry
    their own sources, say when an hour was chosen rather than recorded, and clear on any scrub.
17. **One page cited twice passed for two sources** on 17 items (a Wikipedia, Cadw or Coflein page
    filed under two notes' keys). A content test now rejects it.
18. **e2e on the GPU:** 26 tests in 2.7 minutes, against 9-12 on SwiftShader.
19. **Two GPU browsers at once can hang one.** A screenshot script and the e2e run shared the D3D12
    GPU path; one e2e page never became ready in 150s, then passed five times out of five alone. Take
    screenshots before or after an e2e run, not during.

## 2026-10-03

1. **"When are we?", a guess-the-year game** ([ADR 0028](../adr/0028-guess-game-hides-giveaways-by-one-root-class.md)).
   Five rounds from the 19 key dates that have something drawn to date them by; the viewer drags a
   ghost marker on the timeline, and the reveal sweeps from the guess to the answer and lists the
   clues with their ⓘ and a "Show me" flight. Two things the first draft got wrong, both caught before
   any UI existed: probing the real content showed features fading in or out offered as clues whose
   dates did not include the year (Carreg Cennen's 1287 inner ward at 1282), and a unit fixture
   showed the climate clue naming its period by its keys' years rather than the years the model
   keeps the chill visible, so it could fall outside the year (it now reads c. 1456 to 1887 for the
   Little Ice Age, and AD 933 to 1275 for the warm period).
   Playwright treats a zero-width element as hidden, so the ghost is checked by its flag.

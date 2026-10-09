---
title: Build log
kind: log
status: current
updated: 2026-10-10
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
20. **Two e2e workers broke CI.** On GitHub's 4-core runner SwiftShader renders on the CPU, so two
    workers starved each other: three slow tests hit the 3-minute timeout and the run still took 22.6
    minutes. CI is back to one worker; local runs on the GPU keep two.

## 2026-10-03

1. **Honest ambience, step one.** The sound beds had no provenance, and that hid three errors: church
   bells from AD 800 (the first bells in any source are the peal for the first train, 20 January
   1857), a train bed on the 1850 key (so its level climbed from 1600; only the need for a visible
   train kept it silent), and a market at 1250, before the fair said to date from 1291. Every bed now
   has its own dated track of points in `src/content/ambience.ts`, each heard point with a
   provenance, and `?debug` lists every sounding bed with its reason
   ([ADR 0028](../adr/0028-ambient-beds-carry-provenance.md)). The debug overlay then grew taller
   than the space above the timeline and covered Previous and Next; it is now capped like the other
   side panels, with the sound lines above the long feature list.
2. **A fix that only moved the bug.** The first version put the 1857 bells on a new look key and
   claimed "no bell before 1857", but linear interpolation faded every bed in from silence across
   the gap before its key: bells from 1851, labelled documented, and the content test that was meant
   to catch it stopped scanning at 1850. The second-Opus review found it. Lessons: a test of "nothing
   before date X" must scan right up to X, fractions included; a key list shared by look and sound
   makes every sound date cost a hand-copied look key; and an in-between year must not wear the next
   key's reason as its own (`since` and `towards` now). Red runs: the two content tests (bells heard
   from 1851; 200 fade-in samples across the beds), the two `soundAt` unit tests, and the overlay
   e2e test (the river still "documented" at 1282).
3. **"When are we?", a guess-the-year game** ([ADR 0029](../adr/0029-guess-game-hides-giveaways-by-one-root-class.md)).
   Five rounds from the 19 key dates that have something drawn to date them by; the viewer drags a
   ghost marker on the timeline, and the reveal sweeps from the guess to the answer and lists the
   clues with their ⓘ and a "Show me" flight. Two things the first draft got wrong, both caught before
   any UI existed: probing the real content showed features fading in or out offered as clues whose
   dates did not include the year (Carreg Cennen's 1287 inner ward at 1282), and a unit fixture
   showed the climate clue naming its period by its keys' years rather than the years the model
   keeps the chill visible, so it could fall outside the year (it now reads c. 1456 to 1887 for the
   Little Ice Age, and AD 933 to 1275 for the warm period).
   Playwright treats a zero-width element as hidden, so the ghost is checked by its flag.
4. **The game's review: firm had meant "documented", not "documented with exact dates".** The
   second-Opus pass found every documented feature called a firm clue with bare dates, beside a
   "c. 800 BC" answer: the Roman forts, an unexcavated hillfort, Dinefwr's rounded 1220 to 1600.
   Features now carry `datesExact` (three do), and the rest read "c." as probable clues. The same
   pass found four more things the tests had not asked: an inclusive range made a hillfort and its own
   ruin both clues at AD 74; "the scene cannot tell them apart" ignored the people and the mapped
   woodland; the climate clue claimed snow that summer never draws (the summer snow line is 995m at
   the Little Ice Age peak, the highest ground 675m); and the almanac opened underneath the game
   panel. Each was fixed behind a test seen red first. The tick labels under the slider at 800 BC
   and AD 74 still give two answers away; that choice is left to Dewi.
5. **Light after dark: the night is lit by the light of its time.** One time-of-day scalar used to
   light every window and hearth the same in every era, so the town glowed in 1942. Now dated keys
   in `src/content/lamplight.ts` (hearth, the medieval court's candles, rushlight from 1750, oil from
   1864, gas street lamps from 1876, electric street light from September 1902, the blackout from
   1 September 1939, the dim-out from September 1944, light again by 8 May 1945) resolve into the
   snapshot, and windows, hearth glow and new street lamps read the result
   ([ADR 0030](../adr/0030-night-light-as-dated-content-keys.md)). The keys hold rather than blend.
6. **Welsh Newspapers Online answered what the notes could not.** The Llandilo Gas Company's works were
   being built in 1864 (not "c. 1860", a single Wikipedia page), the Local Board had the town lamps lit
   "as heretofore" in 1876, and a 1902 columnist mocked those who saw no difference "now that they are
   electrically lit than when they were gas lit". The first gas lighting of the streets was not found,
   so lamps start in 1876 and the gap is in open-questions. The searches also turned up Llandovery's
   1863 gas lighting and Llandilo-Talybont's electric company, both easy to misfile as Llandeilo.
7. **Street lamps follow today's roads where the town's houses stand.** Placed within the town
   feature's radius, the first draft strung lamps out along empty roads into the fields; a screenshot
   showed it. They now go only on road within about 40m of one of the town's own houses.
8. **The e2e test reads the lamp state through `?debug`** at 1880 (gas) and 1942 (blackout). Its red
   run used the old code, exported from HEAD into a scratch folder with the new test copied in, so the
   worktree was never rolled back; it failed at the first `light homes` assertion.
9. **The second Opus review of Light after dark found the dates and places claimed more than the
   sources do, and the fixes are in the schema.** Lamps were drawn in Ffairfach from 1905 because the
   modern town reaches 1300m from the church, while the sources speak of lighting "the town"; lit
   streets now carry a `LitArea` (Llandeilo north of the Tywi) and a content test keeps Ffairfach
   out, so 145 modern lamps became 87 and the 9 on the road south of the bridge went in every era.
   "1876", "1750" and "8 May 1945" were shown as starts though they are latest or sample dates; each
   key now carries `dated: 'on' | 'by'`, and a test makes the almanac's words open with "By" or
   "From" to match. The blackout and the 1945 lifting each had one source; a home-front history site
   is now the second, and its weakness is noted. The keys were only in `?debug`, so the almanac now
   shows "Light after dark" with the active key's ⓘ. Lamps were also drawn twice while the Victorian
   and modern towns crossfaded; only the town most present gets them now. The ADR is renumbered
   0030: two sibling branches also use 0028 and a third moved to 0031.
10. **A Begin card and a Graphics menu.** The loading card now carries the Ovid motto and, once the
   valley is ready, becomes a Begin card veiled over the scene; Begin is the click browsers need
   before they play sound, so it turns the sound on. Links into a year or place skip it, and so do
   automated browsers (`navigator.webdriver`), so the existing e2e tests and screenshots needed no
   edits; `?begin=1` brings it back for a test. The graphics level is one table in
   `src/domain/quality.ts` ([ADR 0031](../adr/0031-one-graphics-quality-setting.md)), applied live,
   with `?fx=low` kept as an alias. The motto was checked in two texts of Metamorphoses XV, both
   line 165 ([findings](../research/findings.md); *corrected the same day*: this entry first said
   the Latin Library numbers it 164). First draft of the card left place labels and a speech bubble
   showing through the motto; the text now sits on its own panel. 8192² shadows cost nothing
   measurable on SwiftShader (four e2e tests: 1.2 minutes at 8192, 1.3 at 4096), and are unmeasured
   on a real desktop GPU.
11. **The second-Opus review of that work found the fix had not fixed it.** The card's own panel was
   86% opaque and its backdrop blur did not reach the labels (probably because its parent's own
   backdrop-filter made the parent the backdrop root; not proven), so "News of the ambush" and
   "Garn Goch (today)" still read through the motto in the screenshots said to show the fix. The card is solid now, and the e2e test checks
   its computed background. Two more lessons: the debug quality line printed the *table*, so the
   Low test would have stayed green with every apply line deleted; it now reads the renderer back
   (shadow map, pipeline flags, the forest's drawn count), and the test went red with the forest or
   the bloom line removed. And keys pressed with the Begin card up stepped the timeline behind it.
   High's trees went from 0.62 to 0.9 of woodland triangles (34,056 drawn at 1282, against 23,449
   at Medium); the ADR was renumbered 0031 because two other branches had already taken 0028.
12. **Two independent research checks and a second-Opus review, applied in one pass.** The light
   check found the app saying more than its sources: blackout curtains staying in the dim-out
   (Hansard: half-lighting from 17 September 1944; a Scarborough history: ordinary curtains), and the blackout "over everywhere" by 8 May 1945 (some coastal areas waited). The c. 1200
   key had no datable source, so a third `dated` kind, `'in'`, marks a period, and before the first
   key (7800 BC) there is now no key at all, rather than the first key stretched back to 12,500 BC
   ([ADR 0032](../adr/0032-night-light-before-the-first-key-and-period-dates.md)). The soundscapes
   check found no licence problems but eight claims that went past their sources (and one optional
   citation); all are corrected, and a 1290-91 fair is now documented (the market bed's start waits on Dewi). The review
   found: homes "mixed electric light, gas and oil" in 1902, which no source shows (homes went back
   to flame light; *corrected 2026-10-03*: this item first credited that to the light check, which had
   rated the claim "partly" and asked for no change); the Begin card's `aria-modal` did nothing for Tab (the app and canvas are now `inert`);
   the "ticks stay" of ADR 0029 was untrue, since a tick was only its label (each tick now draws a
   mark); the same-scene check ignored the night light, and its compile-time guard had gone dead when
   `ambient` left `Environment` (the comparison is now a record over every `Snapshot` field, so a
   new field is a compile error until it is compared or called unseen); the street-lamp rule was
   written four times (now one type guard); the lamp minimum-gap and carry had no test that could
   fail (now two, each seen red by deleting the line); the 1857 railway drew the 1858 Vale of Towy
   line and ran the train on it (dated sections, [ADR 0033](../adr/0033-railway-drawn-in-dated-sections.md);
   *corrected 2026-10-03*: that fix did not work on screen, see item 13);
   and steam played faintly until 2025 (it ends on 13 June 1964, and a reconstructed diesel-unit
   bed runs to today). Lesson: the merged items had been ticked ahead of their own path; a tick is a
   claim, and two were unticked rather than defended.
13. **The first railway fix tested content dates, not what is drawn.** The second-Opus review of
   item 12's fixes found the 1858 Vale of Towy line still drawn in the 1857 scene: every feature
   faded in over about 17 years before its `from`, the renderer drew a section above presence 0.5,
   and the new test filtered features by `contains(when, year)`, which the renderer never asks. So the
   line showed from about 1849.7 and a silent train ran from 1853.7, under a green test and an ADR
   that called it fixed. Now a feature with exact dates is never present outside them, and what of the
   railway is drawn is one pure rule (`drawnRailway`) that the renderer calls and the tests sample
   through `snapshotAt`; the three railway tests went red on the old presence rule at their named
   assertions ([ADR 0034](../adr/0034-exact-dates-draw-nothing-outside-them.md)). Lesson: test the
   picture through the renderer's own rule; a test of the data beside it can pass while the screen
   is wrong. The same review found the southern section still claiming January 1857 for track its own
   source dates to 1840 (it is now three dated stretches as grid boxes; the undated western lines are
   not drawn), the electric street lamps of 1902 drawn gas-orange because windows and lamps shared
   one colour (each street kind now has its own), the 1902 text saying homes "kept to gas", which no
   source shows (a re-read of the Carmarthen Journal of 10 October 1902 found tradespeople having the
   electric light installed, now light:S31), two source links swapped, a steam train still puffing
   in 2000 under a diesel sound (a placeholder diesel unit now runs after 13 June 1964), and docs
   crediting a change to the wrong review. Sampling the trains every quarter year, rather than every
   whole year, also found the Llanelly train ending in 1872 and the next starting in 1873. Seen red
   first: the three railway tests, the dated-stretch content test (with the old section's extent),
   the 2000 steam test, the 1903 street colour test and the same-night guess test. Screenshots at
   1857 (no line north-east of the town) and 1858.5 (the Vale of Towy line drawn).
14. **The fixes' own review: a reconstructed feature could not be drawn on its date.** The third
   review (2026-10-03) found the Llanelly Railway's 1840 lines drawn from about 1831: `datesExact` was
   both "draw nothing outside these dates" (ADR 0034) and "a firm clue" (ADR 0029), and a test allowed
   it only on documented features, so a section reconstructed for its course faded in for nine years
   while its ⓘ said April 1840. The two meanings are now separate
   ([ADR 0035](../adr/0035-exact-dates-are-about-dates-not-clues.md)). It also found that east of
   Garnant today's track is the Great Western's line of 4 November 1907, not the 1841 incline line
   (victorian:S29, and Mowat's 1957 *Railway Magazine* article, now victorian:S74, read from the
   Wayback copy because the live page answers 403); that stretch is its own section from 1907, with
   nothing drawn there from 1840 to 1907 (*corrected 2026-10-03, fourth review*: this said 1841). Coflein's unexplained "Ammanford Railway Station" turned out
   to be Cross Inn, 4m from the Amman valley branch. The 1902 street-colour fix had also turned every
   street lamp since 1945 near-white; a key can now give its lamps their own colour, and the 1945 key
   keeps its old warm one, labelled a guess. Smaller: the end of steam was four literals with gaps of
   a few days between train phases (one constant now, phases share boundaries, and at a boundary the
   phase starting there is drawn, as the sound already did); the guess game's "looks the same" counted
   a train the renderer does not draw (it now asks `drawnRailway`); and the year label rounded, so
   `?year=1858.5` read 1859 (it now floors, with a float allowance, so 1856.9999999 still reads 1857).
   Seen red first: the 1840 and 1907 drawn-railway tests, the steam handover test (and its exact
   boundary, red only without the new tie-break), the shared-boundary train tests, the 1945 street
   colour test, the two same-scene tests and the year-label tests. Lesson: a flag that means two
   things will be set for one of them and break the other. Screenshots at 1835 and 1845 (Llandeilo at
   radius 900, and the whole valley): the line is too thin to see at valley scale, so the renderer's
   own `dewidebug rail drawn` line is the evidence: nothing in 1835, `railway-llanelly-1840` alone in
   1845, every section with a steam train in 1910.
15. **The fourth review: one year for every reader, and no date for undated track.** A slider position
   turned into a year could come back a hair short of a key date (549.9999999999998 for the AD 550
   key), and only the year label and the guess game's clues allowed for it, each in its own way. So at
   the St Teilo key the header read AD 550 while the Language tab showed Late Brittonic, which ends in
   549. `yearAt`, the one place a slider position becomes a year, now settles a value within
   `YEAR_EPSILON` of a whole year onto it, and the label, the snapshot (era, language, almanac,
   conversations, sound, night light) and the guess game all read that one year; the guess game's own
   nudge is gone. Settling rather than adding the epsilon was chosen after a probe: adding it would
   have dropped the Iron Age almanac at the AD 74 key, the three-tollgates conversation at the 1848 key
   and three entries at the end of the slider, all of whose ranges end on those years. Exact days named
   by a source are now written with `onDay(year, month, day)` (leap years counted): 10 April 1840 and
   4 November 1907 had been a day or two early, and 1 April 1858 a day late; 13 June 1964 and the
   blackout keys moved by under a day. The 1907 line east of Garnant had drawn the colliery track past
   Gwaun-cae-Gurwen's level crossing from 1907, a date no source gives it. It now ends where the line
   joined the old course, placed from Mowat's length for it (1 mile 22 chains along today's track from
   the cut at Garnant), and the track beyond is undrawn, like the Cross Hands stubs; Pantyffynnon to
   Duffryn keeps exact dates though contested, because its ⓘ names both (ADR 0035, amended). Notes: the
   1907 ⓘ now says the first half mile east of Garnant opened in April 1840; Mowat and the Llanelly
   Railway page are recorded as disagreeing (1907 or 1933 for the Cawdor branch, June or May 1926, the
   halts) instead of "agreeing on every date"; Cwmamman's place on the old course is marked an
   inference; and Garnant station's grid reference is recorded as disagreeing with the coordinate used.
   Coflein has no Garnant station record; its Gwaun-cae-Gurwen viaducts record, dated just before the
   First World War, sits on the track about 65m east of the placed join and is kept as a lead
   (victorian:S76). Street warmth is now range-checked and shown in `?debug`. Seen red first: the
   per-key-step test (at `st-teilo`, on `language`), the three opening-day tests, the dated-stretch,
   exactly-once and 1907-length content tests, and the night-light range test (with a street warmth of
   4.5). Lesson: a float allowance belongs where the value is made, not where it is read; two readers
   had patched it and four had not. Evidence: the renderer's `dewidebug rail` line shows the 1907 section
   cut at E269996 and absent in October 1907, drawn in 1910.
16. **CI ran out of time, not tests.** The push of the fourth review's fixes was cancelled at the job's
   45-minute limit with 29 of 31 e2e tests done: since the merges, each test takes about twice as long
   on the runners' CPU renderer (the 1-minute tests of 2026-10-02 took 2), and three multi-page tests
   passed the 3-minute per-test limit. All 31 had passed locally on the GPU. The e2e tests now run in
   four parallel shards and the deploy waits for all of them; CI's per-test limit is 7 minutes
   ([ADR 0036](../adr/0036-ci-e2e-in-parallel-shards.md)). Lesson: the job time is a budget that every
   merged feature spends, so watch the trend, not just the colour.
17. **Two decisions from Dewi, built the same day.** The market sound now starts in the Middle Ages
   ("yes ok"): with the fair granted on 20 May 1290, reconstructed, then documented from the record of
   1326, then the gazetteer's "Market town c. 1600". The first medieval day a bed named exposed that
   `onDay` refused every day before 1753; it now reads earlier days in the Julian calendar and refuses
   only 1752. And the undated railway lines are drawn as labelled estimates ("put draw and give
   estimgate for dates but please label them as educated gueessess with sources?"): the line near
   Pontyberem is the Burry Port and Gwendraeth Valley Railway (c. 1870), the track past the 1907 join
   is Gwaun-cae-Gurwen's colliery line (c. 1841). The research turned on old maps: the National Library
   of Scotland's georeferenced six-inch mosaic, with today's track drawn over it, matched both lines
   to the railways on the 1896 and 1905 maps, and its IIIF images of the 1877 and 1878–79 surveys dated
   them, the second contradicting the "1886" both Coflein and Wikipedia give for Cwmmawr. The NLS sheet
   index (a WFS layer on geoserver.nls.uk) names the sheet and survey years for any grid point. The
   "Cross Hands" stub turned out to be 35m of narrow-gauge track, by OS's own attribute, that no source
   names, so it is the one stretch left undrawn. Seen red first: the market test (at the start date),
   the Julian `onDay` test, the every-stretch-in-one-section test, the educated-guess label test and
   the "c." fade test. Dead end: the Welsh Newspapers search returned nothing useful for "Cwmmawr" in
   1884 to 1887 (it errors on some queries and matches farm names on others).

18. **The review of the estimates.** The second-Opus review of entry 17 found three things worth
   keeping. A "c." date fades in over about 17 years before it, so the colliery line guessed "c. 1841"
   was half drawn by 1830, a decade before any railway reached the Amman valley, and the new test had
   locked that in. The fix is `notBefore`, the earliest date a source allows, before which an estimate
   never starts to fade in (ADR 0037); the colliery line now switches on at 6 May 1841. Second, the
   1878–79 map that "decided" the Gwendraeth line's date covers only its upper part: the sheet's south
   edge sits at the Hirwaun Isaf incline's head, and the page the note quoted also said a tramroad ran
   on the towpath above that incline by 1865. So the line is now three stretches, with the one beside
   the incline drawn across June 1886. The incline's foot is mapped by no source, so it is placed from
   the canal's 85ft rise at 1 in 10¼; the georeferenced 1905 map shows no incline label to check it by.
   Third, the Cross Hands stub was left undrawn against Dewi's "draw", and Claude's dates sat inside the
   decision log's "Dewi's decision" cells. The stub is now drawn `imagined` from c. 1950: the six-inch
   sheets of 1905 and of 1913 with 1948 additions, read through NLS's IIIF images, show old coal
   workings at Pen-y-graig and no track. Lessons: check that a map actually covers the stretch it is
   cited for; and a fade is a claim about dates, so it must not cross a documented one. Gotcha: NLS's
   IIIF server refuses any request over about 512 by 512 output pixels ("pixel area exceeds the maximum
   threshold"), so a sheet is read by stitching 512px regions, scaled down from larger ones. Seen red
   first: the two `presenceAt` earliest-date tests, the snapshot test (the colliery line fully present
   just before 6 May 1841), the every-stretch test (the stub undrawn), the label test (no earliest
   dates) and the stub test.

19. **Battles and black swans** (branch `feat/battles-and-black-swans`): three key dates and a
   minor marker (1849) from the checked invasions and ripples notes (*corrected 2026-10-09*: this
   entry said four key dates; 1849 is a marker, not a key step). **1213**, Llandeilo burned by Rhys Gryg and Dinefwr besieged,
   with winter from the record and a dark plume over the town drawn only at that step; **1257**, Coed
   Llathen and Cymerau, at the recorded midday of 2 June in summer, with the camp at Llandeilo said to
   be in one chronicle, Bauzan's death, mostly Welsh foot soldiers and no site marked; **1849**, cholera
   in Llandeilo, a card and an almanac note but no scene, since one partly illegible report is all there
   is; **1918**, influenza, cross-checked in four papers, in autumn. The almanac's "no case in Llandeilo
   itself has been found" for the whole Victorian era was stale since the ripples note read the 1849
   report; it is corrected, with a content test that went red on it. Three lessons. The
   world is 10m to a unit, so the first "spread 60" was 1.2km of emitter and invisible; and Babylon's
   size gradient overrides a particle system's min and max size, so every hearth puff has always been
   0.6 to 2.4 units whatever those said. Which features smoke is now one domain rule, tested through
   `snapshotAt` ([ADR 0038](../adr/0038-recorded-burnings-are-dated-features.md)). And the
   first long 1257 and 1918 cards ran up over the sky panel's record caption at 1600×900, found only by
   looking; both cards were cut to about 60 words, with the detail moved into the ⓘ.

20. **The battles branch's first review: markers you could not click, and smoke you could not see.**
   The 1849 cholera dot sat under nothing but on top of the 1848 church dot, 0.9px away, and the e2e
   test clicked it with `dispatchEvent`, which skips hit-testing. A test that asks `elementFromPoint`
   for each marker's own centre found nine covered at 1440×860, seven of them older than the branch
   (Carreg Cennen's 1287 grant sat exactly on the siege). Markers now keep their x and fan into lanes
   ([ADR 0039](../adr/0039-timeline-markers-fan-into-lanes.md)); the cholera test clicks with a real
   mouse. The 1213 plume was drawn but invisible: the step set winter and kept the default 17:30, which
   in January is night, and only a hand-set midday screenshot had shown it. It now sets a chosen 13:00
   ([ADR 0038](../adr/0038-recorded-burnings-are-dated-features.md), amended); the lesson is to look at
   the screen a viewer actually lands on, not one set up by hand. Also: the 1257 ⓘ names the Llanarthne
   reading, and the Victorian cholera almanac line is split so it neither shows 1849 in 1840 nor calls
   an unsearched absence documented. Seen red first: four marker-lane unit tests, three content tests
   (1213 by day, Llanarthne, the split), and three e2e assertions (13:00 at 1213, the real click, every
   marker's centre).

21. **A night that reads as night** (Claude, under the proactive mandate; [ADR 0040](../adr/0040-a-dark-night-and-halos-that-keep-a-few-pixels.md)).
   A winter 23:00 was a pale grey: the countryside above the town measured a mean luminance of 0.31 at
   1880, 21:00, and the dated night light was a few orange pixels at the site framing. The moon,
   sky light, night sky and self-glow are now darkened only where `night` weights them (0.07 there
   now), and every lit house, street lamp and hearth gets a soft halo that faces the camera and never
   shrinks below a few pixels, so the overview shows gas-lit 1880 orange, electric 1903 white at the
   centre, the medieval hearths, a black 1942 and a lit 2000. The first halos were turned on the CPU
   each frame the camera moved: 30ms a frame for 5,326 window halos, halving the orbit frame rate
   (88 to 41fps); the turning and sizing now run in the vertex shader through a material plugin, and
   the cost is lost in the noise. Two traps on the way: Babylon adds an emissive texture to the
   emissive colour, so a tinted emissive colour drew every halo as a flat square (the tint now rides
   on the per-halo colour), and a plugin's `hardBindForSubMesh` runs only when it sets
   `registerForExtraEvents`, so the halos' size uniform stayed at zero and they vanished without an
   error. Seen red first: the darkness unit test (moonlight 0.62 against at most 0.35), the halo
   sizing test (a halo that did not grow with distance), and the night e2e on the old build (luminance
   0.307 against under 0.12). Daytime is unchanged: three lightings pinned exactly in a unit test, and
   noon at the overview identical to the pixel. `tools/frames.mjs` takes the screenshots and measures
   idle, orbit and scrub frames on the GPU. Lesson: a light the size of a pixel is not shown by
   making it brighter; it needs a size on screen of its own.

22. **The second-Opus review of the dark night** (Claude, under the proactive mandate). Two IMPORTANT
   findings, both confirmed. First, the farm halos are most of what the 1880 overview shows, but the
   1876 gas key is 'Documented' and never said its lit windows, or the farms, were a guess; the
   decision log and ADR 0040 claimed the keys already did. A content test now fails any key that
   lights a drawn farm without saying so in both languages: red for 1200, 1750, 1864, 1876 and 1944
   (the review named three of them), green after one sentence each, with no date or level changed.
   Second, the halo e2e only read `isVisible` and instance counts, so neither of the two failures this
   feature had already hit (an unbound size uniform, halos drawn as flat squares) could turn it red.
   A new e2e counts warm lit pixels over the 1880 overview with the halos on and off: 2.6% against
   0.08%, red at 0.08% with `registerForExtraEvents` removed and red at 15% with a tinted emissive
   colour. Two suggestions applied: each fire's smoke source now carries its houses' glow points, so
   one rule decides both smoke and halos, and two lightings in the fading-day band are pinned from main
   (red when `selfLit` loses its night weighting). Lesson: a test that reads flags back from the
   renderer proves the code ran, not that anything reached the screen; count the pixels.
23. **The first cutscene: the Roman army arrives** (branch `feat/cutscene-roman-arrival`). One data model
   and one pure clock ([ADR 0041](../adr/0041-cutscenes-as-data-on-one-clock.md)): six shots over 79
   seconds, about 650 thin-instanced figures in nine draw calls, dust from the smoke layer, procedural
   cornu calls, tramping feet, hooves, mules and axes through the one mixer, and narration in both
   languages from edge-tts, with a content test that every caption is up for as long as its narration
   runs. **Watch** on the AD 74 moment card plays it; Skip or Escape lands on the key date. Lessons:
   (1) **never run `vite` (dev) in a worktree whose `node_modules` is a symlink to the main clone**: its
   dependency optimiser rewrote the main clone's `node_modules/.vite/deps` ("Re-optimizing dependencies
   because vite config has changed"), under the always-on dev server on :5051. The main server still
   served its modules afterwards, but a reload there may re-optimise once. Worktrees should look at
   their work with `vite build` and `vite preview`, which leave that cache alone. (2) **The letterbox
   hides part of the frame**: the first watchers' shot put them below the bottom bar, so camera keys are
   checked by screenshot, not by geometry alone. (3) The over-the-shoulder shot's depth of field falls on
   the column, not the watchers in front, because focus follows the camera's distance with a floor of
   400m; it reads as intended, but a scene cannot yet choose its focus. Bundle: the main chunk is 477,928
   bytes gzipped after this branch.
24. **The cutscene review: the later fort stood on the ridge all along.** The second-Opus review found
   that a scene overrode only the features it builds, so the smaller fort, whose "c. AD 83" fade starts
   well before AD 74 on the slider, stood finished on the Dinefwr ridge while the column marched up to
   it, and the two forts were drawn one over the other once fort A rose. Every unit test passed because
   none looked at what a scene frame draws. Now `sceneFeatures` draws the world at the scene's year, and
   a content test samples every frame of every scene through the same functions the renderer uses
   ([ADR 0042](../adr/0042-a-scene-draws-its-own-year.md)); it failed first with `roman-fort-b@0s=0.93`,
   the number the reviewer measured. The same pass: an open ⓘ pauses the scene and Escape closes it
   without skipping; the interface behind is inert; one polyline helper replaces six copies
   ([ADR 0043](../adr/0043-one-polyline-helper.md)); the garrison caption is hedged. Looking at the
   paused popover found one more fault the review had not: the letterbox's caption badge holder had
   `white-space: nowrap`, which the popover inherited, so its text ran off the box and off the screen at
   1440px; an e2e check now fails if any of its text spills. Lessons: (1) **a scene shows a moment, the
   slider shows a blur**: anything that sits on top of the timeline at one year must not inherit the
   slider's fades. (2) **`vite build` and `vite preview` both need `PAGES_BASE`** in every shell: a build
   made without it serves its assets at `/assets/`, which 404 under the test base, and the e2e reports
   it as the page never becoming ready, which looks exactly like the known GPU load hang. Three runs
   went to it before the console showed the 404s. (3) Under SwiftShader a scene opened part-way with
   `?cutsceneAt=` runs on to its end while the page loads, so a screenshot of a moment needs the GPU.
   (4) Merging main (the dark night, the battles) meant one real conflict: both sides had rewritten the
   smoke layer, so `dust` became a fourth `SmokeStyle` in the dark night's look table, with a `lift`
   field for where a plume starts. Main had also taken ADRs 0037 to 0040, so the cutscene ADRs became
   0041 to 0043; a branch's ADR numbers are only provisional until it merges.
25. **The second cutscene review: claims in the docs that the code did not keep.** Five findings, none
   of them a visible fault. (1) The narrator comment and decision log said no Roman-era character uses the
   narrator's voice; Nia, the Welsh narrator, also reads the woman at the fort (Welsh has two voices), so
   the claim was corrected and the overlap recorded in `docs/content/voices.md`. (2) The timeline lock's
   "a press ends the scene" path was dead, since the timeline is inert behind the scene; `lock` is now a
   plain guard and the design note says Skip and Escape end a scene. (3) Smoke, hearth glow and forest
   clearings read the slider's presence rather than the scene's; they now share the one filtered list
   (no behaviour change at AD 74, so no test could fail first; the e2e covers the wiring). (4) The train
   still had its own walk along a line, though ADR 0043 said every copy was gone; `segmentAt` is now
   shared (a unit test failed first on the missing function, then on the edge cases). (5) The bundle is
   490,121 bytes gzipped, recorded in CLAUDE.md. Lesson: **an ADR that says "every copy now uses it" is a
   claim to grep for, not to write from memory.**

## 2026-10-09

1. **The music and hunter-gatherer checks applied** (Claude under the proactive mandate, ADR 0027). Two
   independent checks (91 and 70 claims) found 10 contradicted or unsupported claims and 35 partly
   supported ones; every correction is in the notes marked "Corrected 2026-10-09 (independent check)", and
   the two checks sit in `docs/research/reviews/`. App changes: the Waun Fignen Felen burning moved from 6000
   BC to about 7000 BC ("about 9,000 years ago", EN and CY) with the pollen study and Coflein cited and an ⓘ
   that says the date is our calibration of a BP figure whose scale is assumed; the almanac fire now runs
   about 7000 to 4500 BC; the lamplight 1200 entry's basis now says S3 dates its manuscript to about 1300.
   A content test failed first on the year and the sources. The key date is not magnetic, so the
   magnetic-spacing test and the key-date e2e flows were unaffected. Lessons: (1) **a correction can be
   wrong itself**: the 2026-10-03 light check said no source dated the Deheubarth law-book's manuscripts,
   and S3's own preface does; "no source read" is a claim about the reader, so grep the preface before
   writing it. (2) **a check that recomputes a figure is worth more than one that re-reads the prose**: the
   IntCal20 calibrations all held, and the open question was the scale, not the arithmetic.

2. **The review of those corrections, applied** (Claude under the proactive mandate, ADR 0027). A review of
   the two applied checks found that corrections had reached the body of a note but not its source entries
   (S26 still said "first excursion trains", S29 still said *Moliant Seion*, S35 still carried the general
   fishing-area reading), that the burning event cited the same Coflein record under two keys
   (`deeptime:S12` and `hunters:S17`; the event now keeps `hunters:S19` and `hunters:S17`, and a content test
   asserts the duplicate is gone, seen red first), that two sibling notes still gave the old 8000-year date
   or the open BP question (`soundscapes.md`, `deep-time-and-natural-history.md`), and that the check's own
   US term for the 1944 recording was wrong (100 years to 2044 under the Music Modernization Act, not 95
   years to 2039; secondary sources). The Rachie composer claim got a source (S41, added at the end).
   Lessons: (1) **a correction has to be carried to every place the claim lives, source entries included**:
   grep the claim's key phrase across the whole of `docs/research/` after applying it. (2) **a check can
   mis-state a statute**, so a licence flag is a lead until the statute is read.

3. **CI timed out again, on one shard.** The push of the cutscene merge (run 37974359599) failed one
   e2e shard: the whole-valley night halo test took 7.0 minutes on CI's CPU renderer and ran past its
   7-minute limit while taking a screenshot. It had passed on the two runs before; the new cutscene test
   had shifted the split so both heavy night tests landed in one shard. The night tests are now marked
   `test.slow` in CI and the e2e job runs six shards ([ADR 0036](../adr/0036-ci-e2e-in-parallel-shards.md),
   amended). Lesson: a per-test limit is a budget too, and the heaviest test sets it.

4. **CI tests at Low graphics** (Dewi's call). The six-shard run still lost one shard, this time the
   cutscene test, at 7 minutes on the CPU renderer at High (run 37977166640). CI now stores Low in every
   test's browser (`E2E_QUALITY=low`); the graphics-menu test starts from the default High, and a new
   test checks the stored level reaches the renderer, seen red without the config line.


5. **The Harries photographs: the independent check's corrections applied first** (commits 0cf7411 and 392ccaa). Five captions
   were contradicted by the pictures themselves (a *Shoulder Arms* poster, Tariff Reform posters, an
   R.O.P. petrol sign, and two doubtful 1920s dresses), the Post Office was on the wrong side of the
   street, six descriptions of what a photograph shows were wrong, and "the 1890s map" was the 1905
   revision. Lesson: the first research pass wrote "looked at" for each image and still read none of the
   lettering; the check read every poster and sign. Each change is marked "Corrected 2026-10-09
   (independent check)". Four prints that still showed the mount were re-cropped from the PCW originals by
   finding the contiguous low-saturation block (the cream mount is the only strongly orange region).
6. **The photo layer** ([ADR 0044](../adr/0044-photographs-are-dated-placed-content-with-pins.md)): `Photograph`
   moved into the domain model beside the places (a `TimeRange`, a placement, a provenance), `snapshotAt`
   lists the pinned ones, `src/domain/photos.ts` holds the window and the fan-out of shared points, and the
   UI is a pin layer, a panel and a remembered toggle. `provenanceBadge` was split so the photo's ⓘ reuses
   the same badge (`infoBadge`) instead of a second popover.
7. **Red runs, each at the assertion it names.** Unit: a stub of `src/domain/photos.ts` returning
   nothing failed the window, the unplaced-never-pinned and the pin-position tests. E2E: with the pins
   and the photo panel taken out of `reveals-when`, the guess game's giveaway list failed at `.pins`
   ("Expected: hidden, Received: visible"); with the toggle ignored and the panel left out of the Escape
   chain, the toggle test failed at 0 pins expected and 6 received, and the Escape and slider tests failed
   at the panel still visible. The Welsh, About-credits and click-through e2e and the Welsh date label
   were written after the code and were not run red.
8. **A test trap, not a bug:** the ⓘ popover stays open while the mouse hovers its badge, so "Escape
   closed it" needs the mouse moved away first, as the existing provenance test does.
9. **Looked at:** pins in Llandeilo at 1900 and an open photograph with its ⓘ, in English and Welsh,
   on the NVIDIA GPU (`docs/images/photo-layer/`, made by `tools/photo-shots.mjs`). The first look found
   the credit below the fold and the ⓘ clipped by the panel's bottom edge; the credit moved under the
   picture and the popover opens upwards.
10. **The photo layer's review (ten findings, all fixed or answered).** (1) Two photographs captioned c. 1900
   showed a motorcycle at the door, a knee-length dress, cloche hats and electric lamps, yet their pin began in
   1895, so a 1920s scene appeared in the 1890s; the check had called them "doubtful" without reading the
   motorcycle. Their ranges now start at 1920 and 1922. (2) Six "Corrected" markers had landed one entry too
   early when the inline notes became comments, so the entries really corrected carried none and the log
   overclaimed; a content test now pins each marker to its entry, and failed first with one marker moved back.
   (3) A doubt about the photographer ("possibly", the NLW's "Unknown") sat only inside the ⓘ; it is in the
   credit now, with a test. (4) The market hall's crowd was said to be seated; it stands. (5) "c. 1928" had
   1926 to 1930 against the note's plus or minus five years; a test now holds every plain "c." date to it.
   (6) The licence line put "at Dewi's request" on the public About tab. (7) The projection and the overlap test
   were a third copy; `src/ui/screen-space.ts` is now the one. (8) The pin's collision box stopped 8 px short of
   its stem; the pin and the box now read the same two constants. (9) The ⓘ's tier ignored a disputed date; it
   is now `photoTier`. (10) The ADR said the panel closes when the slider leaves the photo's years; it closes
   when the slider leaves the pin window. Tests were red first: the unit tier tests (missing function), the
   range, caveat, licence, disputed-date and shows tests at their assertions, and the marker test at the
   count. The e2e for the 1920s photograph failed first at "Expected: hidden, Received: visible" with its range put back to 1895. Looked at: the pins at 1925 (their stems now inside the collision boxes) and the White Hart panel reading Reconstructed (`docs/images/photo-layer/disputed-1925-en.jpg`). Lesson: **a research check that says "doubtful" is a lead, so look at the picture before leaving a
   range that contradicts it.**

11. **The always-on dev server was watching the agents' worktrees.** Every build in `.claude/worktrees/`
   reloaded the :5051 tab (the log showed a reload per worktree build) and left Vite's dependency cache
   stale, so the page stopped loading with "504 Outdated Optimize Dep". `vite.config.ts` now ignores
   `.claude/`, `dist/` and test output, and scans only `index.html` for dependencies.
12. **Research stage for the Roman forts and vicus** (issue 3; Claude under the proactive mandate, ADR 0027):
   `research/roman-forts-and-vicus.md`, reference images in `research/refs/roman-forts/`. The commenter's
   Heneb "Tywi Time Line" PDF held no survey and no "AD 90-100"; the survey is Stratascan's magnetometry in
   the primary report's Fig 2. The only grid reference is Coflein's single point, so the forts were
   georeferenced from the report's Fig 1 and came out about 50m east of it. Lesson: a source a commenter
   cites may not contain the claim; read the whole file (every page image, not just the text) before
   deciding the claim is unsupported. The independent check the same day applied corrections: the Fig 1
   georeference was 45m east and 50m north out, so the "forts disagree with Coflein" finding was false; and
   Archwilio and llandeilo.org, called unreachable, were reachable at other addresses (the HER gives each fort
   a grid reference; llandeilo.org's caption explains "AD 90-100"). Lesson: when a page 404s, try the sibling
   address and the Wayback copy before listing it as a gap, and re-measure a derived number against a second
   anchor before reporting a conflict with a documented one.

13. **The Roman forts and their vicus, built detailed** (issue 3; Claude under the proactive mandate, ADRs
   [0045](../adr/0045-estimated-ends-carry-a-latest-date.md),
   [0046](../adr/0046-the-roman-forts-are-true-size-typed-plans-with-parts-that-carry-their-tier.md),
   [0047](../adr/0047-detailed-monuments-have-a-far-and-a-near-mesh.md)). From the checked note: Fort 1, Fort 2,
   Fort 1's backfilled ditches and the settlement are four `building` features with plans of 66, 83, 15 and 18
   parts, each with its own id, name, provenance and level of detail; the `roman-fort` feature kind and its own
   renderer are gone. **The placeholders were wrong and are corrected**: `roman-fort-a` sat on Fort 2's
   centre (Coflein's point), `roman-fort-b` 28m east and 29m south of it, both at 0.12 radians (7 degrees),
   with tiled roofs and a limewashed headquarters, at 2.6 times life size; Fort 1 is now centred about E 262206
   N 222470 and Fort 2 about E 262190 N 222538, long axes at bearings 48 and 53, in true size and height.
   Built in this order, red first where a bug could show: the latest-date rule (ADR 0045) and the fort-ring
   geometry in unit tests; the plan model's new parts; a screenshot of the first build; then the content
   tests. What the pictures taught, each cheaper to find by looking than by test:
   - **The content tests passed while the feature was wrong.** `notAfter` was in the type and the unit
     test and not in the content builder `feature()`, which copied only `notBefore`, so Fort 1 showed at
     1.00 in AD 80 instead of 0.65. The new content test (`tests/forts.test.ts`, read through `snapshotAt`)
     was red at the named dates (Fort 1 at AD 80 was 0.996, Fort 2 at AD 132 was 0.81) until the builder
     passed it on. Lesson: test what the snapshot says, not what the data says.
   - **Vertical exaggeration made a fort a farm.** On the `map` setting a 3m barrack drew 7m tall and the
     headquarters read as a barn. A new `true` setting (across 1, up 1) fixed it; the screenshot with
     `up: 1` against `up: 2.4` is the evidence for ADR 0046.
   - **Depth of field blurred the whole screen at a close radius.** Its focus was clamped to 40 units while
     the camera's lower limit was 25, so a fort at radius 14 was soft everywhere; both limits now follow the
     detail (10 units).
   - **The vicus parallel check was wrong, not the vicus.** A test that no two houses share an angle failed
     on four pairs of a random scatter, which is what random angles do; the real property is the spread of
     angles and of nearest-neighbour distances, which is what the test now holds.
   - **Latent trap found, not hit.** A `map` plan hides the OS building footprints under its parts for
     every year, so a Roman barrack over a modern farm would have removed the farm for ever. No footprint
     lies within 250m of either fort (checked from `buildings.bin`), and `true` plans hide none; a test
     reads the data and fails if one ever does.
   Not drawn, each "perhaps" or contested in the note: the annex, the practice camps, the possible
   bathhouse, Fort 1's kiln and its third possible ditch, the vicus's funnel ditches and enclosure, the
   cremations in Fort 2's interior, the Llandyfeisant building. Fort 1's north-east and north-west gates were
   not found and are not drawn. The About text no longer says the forts are drawn larger than life
   (a content test holds it). Registration on the LiDAR terrain waits for issue 2 (not in this branch).
   Looked at (GPU, `tools/shot.mjs`, `docs/images/roman-forts/`): AD 74, 80, 110 and 140 at radius 45 (near)
   and 160 (the key-date framing), and the card's part list. A card line "Ditch 1 of 2, south-west" appeared
   twice on the first look at the list, one per piece of a side cut by a gate; a content test now holds every
   part's name to be its own, in both languages.

14. **The review of the forts build, and the merge with main** (Claude under the proactive mandate). Eleven
   commits of main had landed, among them the Roman arrival cutscene, whose `drawnEastGate('roman-fort-a')` read
   the `roman-fort` kind this branch deleted: it merged with no conflict and would have thrown at load. Lessons
   and fixes, in the order they bit:
   - **Auto-merged is not compatible.** `tsc` caught the deleted kind in `cutscenes.ts` and its test; the real
     fix was not a patch but moving the army's road to end outside Fort 1's evidenced south-east gate at true
     scale, with a test that it goes round the fort and ends within 2m of the gate's line, and the last shot's
     lead computed from the road's length so the head arrives. The cutscene's own content test then caught the
     settlement standing at AD 70, before any fort ("nothing drawn whose dates do not contain the scene's
     year"): the second symptom of the settlement's exact dates.
   - **A fade window is not a stratigraphy.** Fort 2 started at about 82 with a fade-in from 78, so in AD 79 to
     82 both forts stood at near full height on one ground, and my own test asserted it. The soft handover was
     wrong, not the numbers: the evidence rules out coexistence. Fort 2, the levelled ditches and the settlement
     now start at 83 (the latest end of Fort 1), and a test steps the whole timeline in quarter years and fails
     on any pair drawn together above 0.01. Red first at the old dates, seen on all of them.
   - **A trench belongs to one side.** The measured outer ditch (1.0m by 0.5m) sat on the unexcavated
     south-east side while the south-west side, where Trench 1 actually cut, drew the middle profile; the old
     test only looked at the south-east side so it could not see it. Profiles are now chosen by side, with a
     test on the south-west side and on the "not measured here" wording on the south-east.
   - **The card named the key date's year, not the slider's.** At AD 110 it listed Fort 1, which is gone, and
     never Fort 2. `listedAt` takes the snapshot's presences; the card rebuilds when the set changes and keeps
     an open list open. The unit test was red (no such function); the e2e at AD 110 checks the three headings
     and the rear gate's "not demonstrated" entry.
   - **Duplicates after a merge.** `tiers.ts` was byte-for-byte main's `provenance.ts`; and ADR 0043 had said
     every `densify` copy was gone while `terrain.ts` and my `buildings.ts` each still had one. One `densify`
     now lives in `domain/polyline.ts` with a test. ADRs 0041 to 0043 were also main's, and main then took 0044 for
     the photographs, so this branch's are 0045 to 0047.
   - **Contested points stay contested.** The annex (the excavator's suggestion, Trench 3) is now said on the
     backfilled ditches and kept drawn as a stated simplification; the tile finds, the Jay Lane tower and the
     unwritten wider berm are worded as the sources are.
   Looked at (GPU, `tools/shot.mjs`, `docs/images/roman-forts/`): AD 74, 80, 84, 110 and 140 at radii 45 and 160
   (80 is Fort 1 alone, 84 is Fort 2 over the pale backfilled ditches with the settlement), and the card's parts
   list at AD 110 (`parts-panel-110.jpg`). Found, not fixed: every source title in the credits shows its markdown
   asterisks (176 titles), so the Hughes report reads "*The Llandeilo Roman Forts...*".
   Not done: a visual comparison against the Ludlow drawing's compass orientation (still open in the note).


2026-10-10, second-Opus findings on the Roman forts merge, fixed and verified:
   - **The grain sellers stood inside Fort 1.** "Outside the Roman fort" was placed at E 262280 N 222450, 41.6m
     across and 64.4m down Fort 1's plan, inside its rampart. Moved to E 262286 N 222408, outside the south-east
     gate. A new test checks that every conversation at the forts lies outside each fort, and the levelled
     ditches, drawn at any time in its dates; red on the old position for Fort 1 and its levelled ditches.
   - **Fort 2's ⓘ** no longer cites a GitHub commenter ("a later date of AD 90 to 100 seen online"), hedges the
     order ("the excavator reads Fort 2 as the later") with AD 83 as a choice, says the annex may have kept
     part of Fort 1 in use, and says the levelling evidence once.
   - **Backfilled ditches** are drawn with `profileOf`, so ring 2 of a two-ditch side is 1.0m, not 1.4m; the test
     was red at the named assertion.
   - Also: ADR 0047 (not 0043) for detail parts in the authoring guide; `geo.ts` no longer says the forts are
     drawn larger than life.

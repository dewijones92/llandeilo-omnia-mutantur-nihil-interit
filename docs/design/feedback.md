---
title: Feedback from visitors
kind: design
status: proposed
updated: 2026-10-01
---

# Feedback: letting people send corrections and ideas

Raised by Dewi, 2026-09-28. **Proposed.** People should be able to leave feedback and
constructive criticism from inside the app, ideally ending up as GitHub issues.

**Update 2026-10-01:** issues are triaged into the todo file at the start of each session, and join
its list once Dewi agrees them ([ADR 0021](../adr/0021-issue-triage-at-session-start.md),
[ADR 0022](../adr/0022-one-todo-file.md)). The issue forms built on 2026-09-29
were removed in favour of plain issues ([ADR 0020](../adr/0020-plain-github-issues.md)). The in-app
button and the pre-filled link are still proposed.

## The constraint

The site is static (GitHub Pages). It cannot hold a GitHub token safely: anything in the page is
public, so a token there could be used by anyone to write to the repo. So the choice is between
**sending people to GitHub** and **adding a small relay** that holds the token.

## Options

| Option | How it works | Needs a GitHub account? | Cost and upkeep | Spam risk |
|---|---|---|---|---|
| **A. Pre-filled "new issue" link** 💡 | A Feedback button opens `github.com/<repo>/issues/new?title=…&body=…`, pre-filled with the year, place, item id and page link. | Yes | None; nothing to run | Low (GitHub's own controls) |
| B. Relay function | The app posts a form to a small serverless function (e.g. Cloudflare Workers, free tier) that holds a token and creates the issue. Needs a bot check (e.g. Cloudflare Turnstile) and rate limits. | No | A second service and a secret to manage | Real; needs protection |
| C. Form service | A third-party form (Tally, Google Forms, Formspree) collects feedback; issues are made by hand or by an automation. | No | A third-party account; data leaves GitHub | Moderate |
| D. Comments on GitHub Discussions (giscus) | An embedded discussion thread per page or era. | Yes | Low | Low |

## Recommendation

**Start with A**, because it needs no backend, no secrets and no new account, and every report
lands exactly where the work is tracked. The most useful form of it is a **"Report a correction"
link inside every ⓘ popover**, pre-filled with that item's id, year, text and sources, since
"this date is wrong" is the feedback this project most needs.

**Add B later only if** the people you want feedback from (family) do not have GitHub accounts.
That is the deciding question.

## Details for A

- No issue forms (removed 2026-10-01, ADR 0020), so the link pre-fills the plain `title=` and
  `body=` parameters. The body should carry: the item id and provenance, the year, the place, a page
  URL with `?year=` and `?place=` built from the current view, the app version (commit), and the
  language.
- Keep the URL under GitHub's length limit by linking rather than pasting long text.
- Privacy: the issue is public; the pre-filled body should say so, since there is no form to.

---
title: Feedback from visitors
kind: design
status: proposed
updated: 2026-09-29
---

# Feedback: letting people send corrections and ideas

Raised by Dewi, 2026-09-28. **Proposed.** People should be able to leave feedback and
constructive criticism from inside the app, ideally ending up as GitHub issues.

**Update 2026-09-29:** the issue templates below exist (correction, idea, bug), and issues are
triaged into board cards ([ADR 0019](../adr/0019-suggestions-arrive-as-github-issues.md)). The
in-app button and the pre-filled link are still proposed.

## The constraint

The site is static (GitHub Pages). It cannot hold a GitHub token safely: anything in the page is
public, so a token there could be used by anyone to write to the repo. So the choice is between
**sending people to GitHub** and **adding a small relay** that holds the token.

## Options

| Option | How it works | Needs a GitHub account? | Cost and upkeep | Spam risk |
|---|---|---|---|---|
| **A. Pre-filled "new issue" link** 💡 | A Feedback button opens `github.com/<repo>/issues/new?template=correction.yml&title=…`, pre-filled with the year, place, item id and page link. Issue templates in `.github/ISSUE_TEMPLATE/` shape it (correction / idea / bug). | Yes | None; nothing to run | Low (GitHub's own controls) |
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

- Issue templates (built 2026-09-29): *Historical correction* (what is wrong, where, a source if
  they have one), *Idea* (labelled `enhancement`), *Bug* (labelled `bug`). The correction form has
  no label until a `correction` label exists.
- The pre-filled body includes: the item id and provenance, the year, the place, the page URL with
  `?year=` and `?place=`, the app version (commit), and the language.
- Keep the URL under GitHub's length limit by linking rather than pasting long text.
- Privacy: the issue is public; the form should say so.

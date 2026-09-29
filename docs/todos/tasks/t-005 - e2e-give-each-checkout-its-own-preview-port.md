---
id: T-005
title: 'e2e: give each checkout its own preview port'
status: Agreed
assignee: []
created_date: '2026-09-29 12:38'
labels:
  - agreed
dependencies: []
type: code
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Locally Playwright reuses whatever server is on 4173, so a run can silently test another agent's build (seen 2026-09-28).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Each checkout's e2e run uses its own preview port
- [ ] #2 A run never tests a server it did not start
<!-- AC:END -->

---
title: Release notes
kind: log
status: current
updated: 2026-10-02
---

# Release notes

What changed in the app, for family and visitors, newest first. Each section is also published as a
GitHub release, tagged with the version in `package.json` ([ADR 0025](../adr/0025-releases-at-visible-milestones.md)).
Corrections to history are called out: when we get something wrong, we say so.

## v0.2.0 (2026-10-02): checked history, rebuilt abbey and castle, and a keys panel

**History corrected.** Every research note behind the app's three main eras was re-read against its
sources by an independent check, and what was wrong is now fixed in the app:

- **1282, the Battle of Llandeilo Fawr:** the date is 16 June by the Welsh annals (some histories say
  17 June). The English force had not sacked Carreg Cennen: the army re-occupied walls the Welsh had
  already burnt, and the ambushed men were a plundering party from an army mostly of Welsh levies.
- **1287, the siege of Dryslwyn:** a mined wall fell on the men inspecting the mine; it was not a
  tunnel collapse. The castle had fallen by 5 September.
- **1403, Glyndŵr:** Owain himself lodged a night in Llandeilo, and a letter of mid-July says the
  rebels had burned Llandeilo and Newtown. Dinefwr seems to have held; whether Carreg Cennen fell is
  disputed, and the app now says so.
- **Dinefwr:** no source gives 1163 for the Lord Rhys's castle, so that key date is now c. 1172, when
  "a castle in the new style" was begun.
- **Gerald of Wales** on what the Welsh ate is now quoted from his own words.
- **The Welsh text had quietly lost facts.** Sixteen places dropped a number, a date or a "probably"
  that the English kept; all are restored.

**Rebuilt from the evidence.**

- **Talley Abbey** stands on its real spot (Coflein's grid reference) and is drawn as it was built,
  about 49m long rather than the 73m planned, with only four bays of nave. After 1536 its east end
  serves as the parish church until 1773, while the rest decays.
- **Dryslwyn Castle** grows ward by ward: the first ward of the 1220s, the middle ward in the
  mid-13th century, then the outer ward and gatehouse before the siege of 1287.

**Easier to use.**

- Press **?** or **Keys** for every shortcut and control.
- Arrow keys step between key dates from almost anywhere.
- Place names no longer hide under panels or sit on each other, and the place a key date is about
  wins.
- A name that is anachronistic says "(today)", now on the key-date card too (the Roman forts' name is
  modern).
- The About panel says exactly what is drawn larger than life.
- Welsh conversations say that the voice has a standard accent, not the local southern speech.


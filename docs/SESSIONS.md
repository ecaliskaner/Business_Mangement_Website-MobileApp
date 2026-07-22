# Running multiple sessions on this project

## Short answer

**Yes, it works — but not during a refactor, and only with file ownership
discipline.**

Phase 0a (the module split) must run **alone**. It moves every function in the
codebase to a new file; any parallel session is guaranteed to conflict.

After 0a lands, parallel sessions become genuinely safe, because modules create
clean ownership boundaries. That is one of the main reasons 0a is first.

---

## Two isolation options

### Option A — git worktrees (recommended for true parallelism)

Each session gets its own directory and branch, so there is no shared working
tree at all:

```bash
git worktree add ../Bug-phase1 -b phase1
git worktree add ../Bug-phase3 -b phase3
```

Collisions become ordinary merge conflicts at PR time instead of silent
mid-edit clobbering. Costs a little disk, removes the entire class of problem.

### Option B — same folder, ownership registry

Workable, needs discipline. Rules below are mandatory.

---

## Rules for same-folder parallel work

**1. One session per module.** Claim files in the registry below before
starting. Never edit a file another session owns — hand off through the
registry instead.

**1a. `src/app.js` is now small (277 lines) and rarely needs editing.** Every
handler lives with the view that owns it. You only touch `app.js` if you add a
*new* handler function — and then only to add one name to `CLICK_CHAIN` or
`SUBMIT_CHAIN`. Keep that edit to a single line so it merges trivially.

> Chain order is significant: it reproduces the original single delegator,
> including blocks that deliberately fall through. Add your handler at the
> position matching where its behaviour should run, not blindly at the end.

**2. `index.html` is the main contention point.** Every view has a `<section>`
in it. Protocol: a session may edit **only its own `<section id="...">`**.
Nobody touches the shell, nav, `<head>`, or script tags without announcing it —
those are shared-lock edits, do them alone.

**3. Run servers on different ports.** `server.js` defaults to 4173; two
sessions both running `npm start` will fight over it.
```bash
PORT=4174 npm start
```

**4. State files are not shared.** `server.js` writes `data/state.json` **and**
`state.js` on every save. `data/state.json` is gitignored; `state.js` is not
(fixed in 0a). Two sessions writing state will clobber each other — treat both
as session-local scratch, never commit them.

**5. Separate branches, rebase before merge.** One session on `main` while
another commits is how work gets lost.

**6. Announce cross-cutting changes.** Anything touching `src/core/` or
`src/data/catalog.js` affects everyone — do it alone or announce it first.

---

## File ownership registry

Update this table when you claim or release files.

| Area | Files | Owner | Status |
|---|---|---|---|
| Core / bootstrap | `src/app.js`, `src/core/auth.js` | — | released — 4-4/5-2/5-3/5-4 landed on `phase-5a`. `demoClicks` sits first in CLICK_CHAIN; G+H one-liners merge below it |
| Demo controls | `src/ui/demo.js` | — | released — greenfield; notif centre, reset, tour, role-switch handler. Bell now routes here, not `modal.js` |
| Catalog data | `src/data/catalog.js` | — | free — 1-1/1-3/1-4/1-5/1-7 landed on `phase-1a` |
| Seed + history | `src/data/seed.js`, `src/data/history.js` | — | free — 0b on `phase-0b`, 1-2/1-6 on `phase-1b`; `recommendationStats()` extended additively (`stage` field) |
| Compliance standards | `src/data/compliance.js` | — | free (new in 1c; readiness thresholds are calibrated to the history seed) |
| Billing | `src/data/billing.js` | — | free (new in 4a; deterministic invoice/irsaliye numbering + pricing) |
| Charts / export | `src/ui/charts.js`, `src/ui/export.js` | — | free — 0c landed; API stable (see `demo/charts.html`), covered every Phase 1c/2a chart unchanged |
| Modal / calendar | `src/ui/modal.js`, `calendar.js` | — | free |
| Signature | `src/ui/signature.js` | — | free — 1-1/1-3/1-4/1-5/1-7 landed on `phase-1a` |
| Dashboard | `src/views/dashboard.js` | — | free |
| Sites | `src/views/sites.js` | — | free |
| Work orders | `src/views/work.js` | Session G | released — landed on `phase-3a` |
| Team | `src/views/team.js` | — | released — 4-2 productivity panel landed (Session J, Wave 4 finisher) |
| Insights | `src/views/insights.js` | — | free — 0b-2 on `phase-0b`, 2-1/2-2/2-3 on `phase-2a` |
| Reports | `src/views/reports.js`, `src/views/reportBodies.js` | — | free — 1-8/2-4/5-1 landed on `phase-1c` |
| Company detail | `src/views/companyDetail.js` | — | free — 1-1/1-3/1-4/1-5/1-7 on `phase-1a`, 1-2/1-6 on `phase-1b` |
| Mobile | `src/views/mobile.js` | Session G | released — landed on `phase-3a` |
| Inventory | `src/views/inventory.js` | — | free |
| Finance | `src/views/finance.js` | — | released — 4-2 windshield-cost panel landed (Session J, Wave 4 finisher) |

---

## Good parallel splits

These pairs touch nearly disjoint files:

- **Phase 1 (companyDetail + mobile)** ‖ **Phase 3 (team + new live map)**
- **Phase 2 (insights + reports)** ‖ **Phase 4 (finance + inventory)**
- **0b history engine** ‖ **0c charts/export** — both greenfield files

## Bad parallel splits

- Anything ‖ a `src/core/` change
- Two sessions both adding `<section>`s to `index.html`
- Anything ‖ Phase 0a

**`styles.css` is shared.** It is one 43 KB file with no module system. Rule:
**append only**, inside your own banner comment:

```css
/* ===== Phase 1: equipment placement forms ===== */
```

Never reformat or reorder existing rules — that turns a clean append into a
whole-file conflict.

---

## Ready-to-use session prompts

**Wave 1 (A/B/C below) landed on `main` in merge commits `72d0334`/`a65cbb9`.**
Kept for reference; skip to **Wave 2** for the next runnable prompts.

### Session A — history engine (task 0b)

> Read `docs/PLAN.md`, `docs/TASKS.md` and `docs/SESSIONS.md` first.
>
> You own task **0b-1 and 0b-2**. Claim them in `docs/TASKS.md` and claim
> `src/data/history.js` in the ownership registry in `docs/SESSIONS.md`.
>
> Build a **seeded, deterministic 12-month visit history generator** in
> `src/data/history.js` covering all 6 sites: station readings, pest counts per
> device, chemicals used, recommendations raised and closed, technician
> timings. Seasonality must be realistic — flying pests peak Jun–Aug, so the
> seasonal contract frequencies already in the data mean something on screen.
> Identical output on every run; no demo-day surprises.
>
> Then wire it into `src/views/insights.js` so the trend chart reads real
> history instead of the hardcoded 8-element array.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. Run `python scripts/checkimports.py` and
> verify in the browser before committing. Work on branch `phase-0b`.

### Session B — charts and export (task 0c)

> Read `docs/PLAN.md`, `docs/TASKS.md` and `docs/SESSIONS.md` first.
>
> You own tasks **0c-1 and 0c-2**. Claim them in `docs/TASKS.md` and claim
> `src/ui/charts.js` and `src/ui/export.js` in the registry.
>
> Build a hand-rolled **SVG chart module** (line, bar, stacked bar, donut) with
> no external dependencies — the demo must survive bad conference wifi, which
> is why `html5-qrcode` was vendored. Then build CSV export (blob download) and
> a print-to-PDF stylesheet.
>
> `styles.css` is shared: **append only**, inside your own banner comment.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. Run `python scripts/checkimports.py` and
> verify in the browser before committing. Work on branch `phase-0c`.

### Session C — Repellent Stage 1, history-independent parts

> Read `docs/PLAN.md`, `docs/TASKS.md`, `docs/SESSIONS.md`, and the
> requirements in `Repellent Online sistem yol haritası.docx` (extract its text
> from `word/document.xml`; the encoding is mangled but readable).
>
> You own tasks **1-1, 1-3, 1-4, 1-5, 1-7**. Claim them in `docs/TASKS.md` and
> claim `src/views/companyDetail.js`, `src/views/mobile.js`,
> `src/data/catalog.js` and `src/ui/signature.js` in the registry.
>
> Build: per-equipment-type placement forms (fly units need tube length, unit
> power, UV tube type, purchase date, tube-change date; moth and beetle traps
> need trap type, purchase date, pheromone-change period); multi-pest
> multi-count entry per device; MSDS / label / ministry-permit attachments per
> chemical; the dosage and water auto-calculator; and dual digital signature
> wired into visit completion.
>
> Skip 1-2 and 1-6 — they need the history engine from Session A.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. If you add a handler, add it to the chain in
> `src/app.js` in **one line** at the position matching where it should run.
> Run `python scripts/checkimports.py` and verify in the browser before
> committing. Work on branch `phase-1a`.

## Wave 2 — ready now (history engine + charts are on `main`)

The three sessions below touch disjoint files. All branch from `main` at
`00201cc` or later. One coupling to know about: Session F **consumes**
`recommendationStats()` from `src/data/history.js` while Session D may
**extend** the recommendation objects for 1-6 — D must keep changes additive
(new fields only, never rename or remove).

### Session D — closed-loop lifecycle (tasks 1-2, 1-6)

> Read `docs/PLAN.md`, `docs/TASKS.md`, `docs/SESSIONS.md`, and the
> requirements in `Repellent Online sistem yol haritası.docx` (extract its text
> from `word/document.xml`; the encoding is mangled but readable).
>
> You own tasks **1-2 and 1-6**. Claim them in `docs/TASKS.md` and claim
> `src/views/companyDetail.js` and `src/data/history.js` in the registry.
>
> Build: **equipment replacement preserving history** (new barcode, same point
> number — the station keeps its reading history across the swap; use
> `visitsForSite()` from `src/data/history.js`), and the **closed-loop
> recommendation workflow** (tech raises finding with photo → customer responds
> with photo → tech approves closure; three roles, visible status at each
> step). Recommendations already exist in `history.js` with
> raised/closed dates — extend them additively, never rename fields.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. If you add a handler, add it to the chain in
> `src/app.js` in **one line** at the position matching where it should run.
> `styles.css` is append-only inside your own banner comment. Run
> `python scripts/checkimports.py` and verify in the browser before
> committing. Work on branch `phase-1b` in a **git worktree**
> (`git worktree add ../Bug-phase1b -b phase-1b`), and use the
> `pestops-4174` launch config so ports don't clash.

### Session E — report suite (tasks 1-8, 2-4, 5-1)

> Read `docs/PLAN.md`, `docs/TASKS.md`, `docs/SESSIONS.md`, and
> `docs/COMPETITOR.md` — Insectram ships ~10 report types; this session is how
> we match them.
>
> You own tasks **1-8, 2-4 and 5-1**. Claim them in `docs/TASKS.md` and claim
> `src/views/reports.js` and `src/ui/export.js` in the registry.
>
> Build **five distinct printable report bodies** (visit report, trend report,
> comparison report, non-conformity report, audit package) on top of the
> existing export API: `printElement()` for print-to-PDF and `downloadCSV()`
> from `src/ui/export.js`, charts from `src/ui/charts.js` (see
> `demo/charts.html` for the API — pure functions, options in, SVG string
> out). Real data comes from `src/data/history.js` (`getVisits()`,
> `monthlyPestTotals()`, `recommendationStats()`, `chemicalStats()`). Add the
> **3rd Eye audit section** and **compliance badges**
> (BRCGS/SALSA/ISO22000/FSSC22000/RedTractor/AIB) on the reports view.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. Handler additions go into the chain in
> `src/app.js` in one line. `styles.css` is append-only inside your own banner
> comment; print styles live under the existing `ct-printing` block pattern.
> Run `python scripts/checkimports.py` and verify in the browser before
> committing. Work on branch `phase-1c` in a **git worktree**
> (`git worktree add ../Bug-phase1c -b phase-1c`), and use the
> `pestops-4175` launch config so ports don't clash.

### Session F — analytics upgrade (tasks 2-1, 2-2, 2-3)

> Read `docs/PLAN.md`, `docs/TASKS.md` and `docs/SESSIONS.md` first.
>
> You own tasks **2-1, 2-2 and 2-3**. Claim them in `docs/TASKS.md` and claim
> `src/views/insights.js` and `src/ui/charts.js` in the registry.
>
> First, **replace the hand-made span-bar trend chart** in
> `src/views/insights.js` with the SVG chart library (`lineChart`, `barChart`,
> `stackedBarChart`, `donutChart` from `src/ui/charts.js` — see
> `demo/charts.html`). Then build: **multi-location / city / region
> comparison** (compare sites side by side), **multi-select chart filters with
> per-chart SVG/PNG download** (`downloadChartSVG` / `downloadChartPNG` from
> `src/ui/export.js` — consume only, Session E owns edits to that file), and
> **recommendation statistics** (raised / actioned / approved; hygiene vs
> isolation split) from `recommendationStats()` in `src/data/history.js` —
> consume only, Session D owns edits to that file.
>
> You may edit **only the `<section id="insights">` block** of `index.html`.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. Handler additions go into the chain in
> `src/app.js` in one line. `styles.css` is append-only inside your own banner
> comment. Run `python scripts/checkimports.py` and verify in the browser
> before committing. Work on branch `phase-2a` in a **git worktree**
> (`git worktree add ../Bug-phase2a -b phase-2a`), and use the
> `pestops-4176` launch config so ports don't clash.

## Wave 3 — ready now (all of Phase 0–2 is on `main` at `2afdc54`)

Three sessions, disjoint file ownership. All branch from `main` and run in git
worktrees on their own ports.

**File map (no overlap):**
- **G** owns `views/team.js`, `views/mobile.js`, `views/work.js` — field realism.
- **H** owns `views/finance.js` — business layer.
- **I** owns `src/app.js`, `src/core/auth.js` — shell + demo polish.

**The one shared edge — `src/app.js`.** G and H each add new event handlers, so
each needs to register them in `CLICK_CHAIN` / `SUBMIT_CHAIN`. Session I *owns*
`app.js` and will be restructuring the shell. Rule for this wave: **G and H
touch `app.js` only to add their handler names — one line per handler, nothing
else.** I keeps its own additions grouped so those one-liners merge cleanly.
Everything else stays in each session's own view module.

`4-2` (travel-vs-on-site efficiency) is intentionally **not** in this wave: it
spans `team.js` (G) and `finance.js` (H). It becomes a clean one-session task
in Wave 4 once both have landed.

### Session G — field realism (tasks 2-5, 3-1 … 3-6)

> Read `docs/PLAN.md`, `docs/TASKS.md`, `docs/SESSIONS.md` and
> `docs/COMPETITOR.md` first. Phase 3 is the "and more" that beats Insectram —
> it turns the existing first-QR lock into an audit story they don't tell.
>
> You own tasks **2-5, 3-1, 3-2, 3-3, 3-4, 3-5, 3-6**. Claim them in
> `docs/TASKS.md` and claim `src/views/team.js`, `src/views/mobile.js` and
> `src/views/work.js` in the ownership registry.
>
> Build: a **live technician map with simulated GPS movement** (technicians
> drift along a route on a timer); **geofence enter/exit events** firing
> visibly as a tech crosses a site boundary; **offline sync simulation** — a
> toggle that queues records with a live count badge, and a reconnect that
> visibly drains the queue (keep the queue self-contained in `mobile.js`; do
> **not** modify `core/state.js` — a simulated in-memory queue is the demo we
> want); **NFC scan alongside QR** on the mobile flow (Insectram parity);
> **route optimization before/after** (show the naive route, then the optimized
> one with time saved); **audit warnings** on the work view (GPS-arrival but no
> QR, QR scanned outside the geofence, suspiciously short visit); and
> **technician credential cards** on the team view — *placeholder documents and
> a KVKK privacy notice only, never real personal data*.
>
> The seeded history in `src/data/history.js` gives you real visits, GPS-style
> timings and per-tech stats (`technicianStats()`, `getVisits()`) — drive the
> map and audit warnings off that, not fresh random data.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. Add handlers to the chains in `src/app.js`
> **one line each** at the position matching where they should run — nothing
> else in that file (Session I owns it this wave). `styles.css` is append-only
> inside your own banner comment. Run `python scripts/checkimports.py` and
> verify in the browser before committing. Work on branch `phase-3a` in a git
> worktree (`git worktree add ../Bug-phase3a -b phase-3a`); use the
> `pestops-4174` launch config.

### Session H — business layer (tasks 4-1, 4-3)

> Read `docs/PLAN.md`, `docs/TASKS.md` and `docs/SESSIONS.md` first.
>
> You own tasks **4-1 and 4-3**. Claim them in `docs/TASKS.md` and claim
> `src/views/finance.js` in the ownership registry.
>
> Build: **auto-irsaliye (delivery note) generation** — produce a numbered,
> printable irsaliye from a completed visit's chemical usage; and **invoice
> generation from completed visits** — turn one or more completed visits into a
> line-itemed invoice with the margin-per-visit figures we already compute.
> Some invoice scaffolding already exists in `finance.js` — extend it, don't
> replace it.
>
> Use the real data: completed visits and chemical applications come from
> `src/data/history.js` (`getVisits()`, `chemicalStats()`); print with
> `printElement()` and export rows with `downloadCSV()` from `src/ui/export.js`
> (consume only — do not edit that file). Numbering must be deterministic so a
> re-run of the demo shows the same document numbers.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. If you add a handler, register it in the
> `src/app.js` chain **one line only** (Session I owns that file this wave).
> `styles.css` is append-only inside your own banner comment; reuse the
> existing `ct-printing` print pattern. Run `python scripts/checkimports.py`
> and verify in the browser before committing. Work on branch `phase-4a` in a
> git worktree (`git worktree add ../Bug-phase4a -b phase-4a`); use the
> `pestops-4175` launch config.

### Session I — demo polish (tasks 4-4, 5-2, 5-3, 5-4)

> Read `docs/PLAN.md`, `docs/TASKS.md` and `docs/SESSIONS.md` first. This
> session makes the demo smooth to *present* — it owns the shell.
>
> You own tasks **4-4, 5-2, 5-3, 5-4**. Claim them in `docs/TASKS.md` and claim
> `src/app.js` and `src/core/auth.js` in the ownership registry.
>
> Build: a **notification centre** with a simulated "report emailed to
> customer" event (the notification model already exists via
> `window.__ACTIVE_NOTIFS__` — extend it); **one-click demo reset** that clears
> `localStorage` *and* the server state (`data/state.json` + `state.js`) and
> reloads to a pristine seed — see the reset note in `docs/TASKS.md`, all three
> must be cleared or the app restores half-finished work orders; **guided tour
> mode** that walks the pitch narrative step by step (first-QR lock → audit
> warnings → reports → compliance); and **fast role switching** so the presenter
> flips admin ↔ technician ↔ client with no re-login (`core/auth.js` already
> holds the three demo accounts).
>
> You are the shell owner this wave: Sessions G and H will each add a few
> one-line handler registrations to `CLICK_CHAIN` / `SUBMIT_CHAIN`. Keep your
> own `app.js` changes grouped and avoid reordering the existing chain, so
> those one-liners stay trivial to merge.
>
> Constraints: this is a **pitch demo** — no backend, simulation is fine, but
> every feature must visibly work. `styles.css` is append-only inside your own
> banner comment. Run `python scripts/checkimports.py` and verify in the
> browser before committing. Work on branch `phase-5a` in a git worktree
> (`git worktree add ../Bug-phase5a -b phase-5a`); use the `pestops-4176`
> launch config.

## Wave 4 — ready now (all of Phase 0–5 is on `main` at `6e4b199`)

One session, not three. Every roadmap feature except `4-2` has landed, and
what remains — the last feature plus a whole-app polish/QA pass — does not
parallelise: `4-2` spans `team.js` + `finance.js`, and the dry-run needs the
whole app in one head. Run it **alone** (no other session active), on
`main` directly or a single `phase-6` worktree.

### Session J — finisher: last feature + pitch-ready polish

> Read `docs/PLAN.md`, `docs/TASKS.md`, `docs/SESSIONS.md` and
> `docs/COMPETITOR.md` first. The build is feature-complete except one task;
> your job is to land it and make the whole thing presentable end to end.
>
> **1. Task 4-2 — travel-vs-on-site time & technician efficiency.** Own
> `views/team.js` and `views/finance.js` (both free now). Drive it off the real
> data already in `src/data/history.js`: `technicianStats()` gives per-tech
> `avgOnSiteMin` / `avgTravelMin` / visit counts; surface a productivity view on
> the team side (travel vs on-site split, utilisation) and roll the cost angle
> into `finance.js` next to the margin figures. No new data layer — consume
> `history.js` and `charts.js` as-is.
>
> **2. Polish pass (things surfaced during integration):**
> - `modal('notifications')` in `src/ui/modal.js` is dead after 4-4 rerouted the
>   bell to `openNotificationCenter()` — remove it, or point it at the new
>   centre. Confirm nothing else calls it first.
> - Sweep the async field callbacks in `views/mobile.js` for the same
>   null-`ui.mobJob` pattern already guarded in `startFirstScan()` /
>   `proceedGpsArrival()` (fixed in `6e4b199`) — the chemical-save and
>   station-status paths run after camera/GPS latency too.
> - Run `python scripts/checkimports.py`; the ~16 flags are all known false
>   positives (comments, `$('#modal')` selectors, `ui/` import paths). If you
>   want it quiet, teach the script to strip `//` comments and string literals —
>   optional, not required.
>
> **3. Full pitch dry-run.** Walk the guided tour (🎬 Tur) end to end as each
> role via the presenter bar, exercise one-click reset between runs, and confirm
> the narrative holds: first-QR lock → GPS/geofence audit trail → live map →
> reports → compliance badges → invoicing. Fix whatever reads rough. Reset demo
> state before finishing (`rm -f data/state.json state.js` + `localStorage`).
>
> Constraints: **pitch demo** — no backend, simulation is fine, every feature
> visibly works. `styles.css` append-only under a banner. Handlers into the
> `src/app.js` chain one line each. Verify in the browser before committing.
> Run alone; work on `main` or a single `phase-6` worktree.

### After Wave 4

The roadmap is complete. Anything beyond this is stretch: real backend
persistence, the reports the `.docx` lists but we scoped out (see the
`docs/PLAN.md` phase-1 note), or Insectram-parity items we chose not to build
(NFC is done; automatic report *email delivery* is simulated, not real).

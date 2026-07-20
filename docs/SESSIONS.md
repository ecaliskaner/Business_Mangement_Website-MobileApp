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
| Core / bootstrap | `src/core/**`, `src/app.js` | — | free |
| Catalog data | `src/data/catalog.js` | Session C | released — 1-1/1-3/1-4/1-5/1-7 landed on `phase-1a` |
| Seed + history | `src/data/seed.js`, `src/data/history.js` | Session D | released — 1-2/1-6 landed on `phase-1b`; `recommendationStats()` extended additively |
| Charts / export | `src/ui/charts.js`, `src/ui/export.js` | — | free (0c landed; API stable — see `demo/charts.html`) |
| Modal / calendar | `src/ui/modal.js`, `calendar.js` | — | free |
| Signature | `src/ui/signature.js` | Session C | released — 1-1/1-3/1-4/1-5/1-7 landed on `phase-1a` |
| Dashboard | `src/views/dashboard.js` | — | free |
| Sites | `src/views/sites.js` | — | free |
| Work orders | `src/views/work.js` | — | free |
| Team | `src/views/team.js` | — | free |
| Insights | `src/views/insights.js` | Session A | released — 0b-2 landed on `phase-0b` |
| Reports | `src/views/reports.js` | — | free |
| Company detail | `src/views/companyDetail.js` | Session D | released — 1-2/1-6 landed on `phase-1b` |
| Mobile | `src/views/mobile.js` | Session C | released — 1-1/1-3/1-4/1-5/1-7 landed on `phase-1a` |
| Inventory | `src/views/inventory.js` | — | free |
| Finance | `src/views/finance.js` | — | free |

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

### Wave 3 (after Wave 2 lands)

Phase 3 field realism (3-1…3-6, team + mobile + work), Phase 4 business layer
(4-1…4-4, finance), Phase 5 hardening (5-2 demo reset, 5-3 guided tour, 5-4
fast role switching). 3-x and 4-x are a good parallel pair; 5-3 guided tour
should run **alone** — it touches the shell.

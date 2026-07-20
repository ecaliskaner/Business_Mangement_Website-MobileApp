# Task board

Status: `todo` · `wip` · `done` · `blocked`
Claim a task by putting your session name in Owner, and claim its files in
`docs/SESSIONS.md` at the same time.

> **Exclusive** tasks must run with no other session active.

---

## Phase 0 — Foundations

| ID | Task | Status | Owner | Files | Notes |
|---|---|---|---|---|---|
| 0a-1 | Extract data modules (`catalog.js`, `seed.js`) | **done** | — | `src/data/**` | Verified: 12 chemicals, 8 visit types, 10 equipment types, 6 sites intact |
| 0a-2 | Extract core (`dom`, `state`, `auth`) | **done** | — | `src/core/**` | `router` deferred to 0a-3 — `setView` calls every renderer |
| 0a-3 | Extract view renderers + router | **done** | — | `src/views/**`, `src/core/router.js` | 45 functions into 15 modules; imports derived from a dependency graph |
| 0a-3a | Move `activeSiteId` / `mobJob` etc. to a `ui` holder | **done** | — | `src/core/session.js` | 7 mutables, 95 refs rewritten. 0a-3 is unblocked |
| 0a-4 | Extract UI (`modal`, `calendar`, `signature`) | **done** | — | `src/ui/**` | Done as part of 0a-3 |
| 0a-5 | Decompose `bind()` into per-view handlers | **done** | — | `src/views/**`, `src/app.js` | 33 handlers into owning modules; app.js 1,327 → 277 lines. Parallel work now unblocked |
| 0a-6 | Gitignore `state.js`; vendor `html5-qrcode` | **done** | — | `.gitignore`, `vendor/` | html5-qrcode 2.3.8 vendored (367 KB). Zero external requests remain |
| 0a-7 | Fix cache-first service worker | **done** | — | `service-worker.js`, `server.js` | Was serving stale modules indefinitely; now network-first. See note below |
| 0b-1 | Seeded 12-month history generator | **done** | Session A (`phase-0b`) | `src/data/history.js` | 6 sites × 12 months (Ağu 2025 – Tem 2026). Seeded PRNG, identical every run |
| 0b-2 | Wire history into insights + company detail | **done** | Session A (`phase-0b`) | `src/views/insights.js` | Trend chart, risk ranking, per-site 6-month chart, recommendation + chemical stats |
| 0c-1 | SVG chart lib (line/bar/stacked/donut) | **done** | Session B | `src/ui/charts.js` | Pure builders (opts → SVG string) + `mountChart`. Gallery: `demo/charts.html` |
| 0c-2 | CSV export + print-to-PDF stylesheet | **done** | Session B | `src/ui/export.js`, `styles.css` | CSV is `;`-delimited + BOM for TR Excel. Also SVG/PNG chart download and `printElement()` |

## Phase 1 — Repellent Stage 1

| ID | Task | Status | Owner | Files | Notes |
|---|---|---|---|---|---|
| 1-1 | Per-equipment-type placement forms | **done** | Session C (`phase-1a`) | `views/companyDetail.js`, `data/catalog.js` | Schemas in `catalog.js`; legacy station types alias onto them |
| 1-2 | Equipment replacement preserving history | **done** | Session D (`phase-1b`) | `views/companyDetail.js`, `data/history.js` | Point code is the permanent identity; barcode + generation move on. `readingsForPoint()` spans devices |
| 1-3 | Multi-pest multi-count per device | **done** | Session C (`phase-1a`) | `views/mobile.js` | Species list narrowed per device type; legacy `pestType` slugs normalised |
| 1-4 | Chemical MSDS / label / permit attachments | **done** | Session C (`phase-1a`) | `data/catalog.js`, `views/companyDetail.js` | Surfaced in company chemicals tab, not `inventory.js` — avoids registry contention |
| 1-5 | Dosage + water auto-calculator | **done** | Session C (`phase-1a`) | `views/mobile.js` | Structured `chemicalDosing`; basis is m² / m³ / station count per product |
| 1-6 | Closed-loop recommendation workflow | **done** | Session D (`phase-1b`) | `views/companyDetail.js`, `data/history.js` | `stage` field added alongside `status`; reject sends it back to the customer |
| 1-7 | Dual digital signature on visit close | **done** | Session C (`phase-1a`) | `ui/signature.js`, `views/mobile.js` | Both signatures + customer name required to close; pads reset between jobs |
| 1-8 | Five printable report types | todo | — | `views/reports.js`, `ui/export.js` | Currently 3 bodies reused across 6 cards |

## Phase 2 — Customer portal

| ID | Task | Status | Owner | Files | Notes |
|---|---|---|---|---|---|
| 2-1 | Multi-location / city / region comparison | todo | — | `views/insights.js` | Needs 0b-1 |
| 2-2 | Multi-select chart filters + per-chart download | todo | — | `views/insights.js`, `ui/charts.js` | |
| 2-3 | Recommendation statistics | todo | — | `views/insights.js` | raised / actioned / approved; hygiene vs isolation |
| 2-4 | 3rd Eye audit section | todo | — | `views/reports.js` | |
| 2-5 | Technician credential cards | todo | — | `views/team.js` | **Placeholder docs + KVKK notice only** |

## Phase 3 — Field realism

| ID | Task | Status | Owner | Files | Notes |
|---|---|---|---|---|---|
| 3-1 | Live technician map, simulated GPS | todo | — | `views/team.js` | |
| 3-2 | Geofence enter/exit events | todo | — | `views/team.js`, `views/mobile.js` | |
| 3-3 | Offline sync simulation | todo | — | `core/state.js`, `views/mobile.js` | Queue badge → visible drain |
| 3-4 | NFC scan alongside QR | todo | — | `views/mobile.js` | Insectram parity |
| 3-5 | Route optimization before/after | todo | — | `views/team.js` | |
| 3-6 | Audit warnings | todo | — | `views/work.js` | GPS-no-QR, QR outside fence, short visit |

## Phase 4 — Business layer

| ID | Task | Status | Owner | Files | Notes |
|---|---|---|---|---|---|
| 4-1 | Auto-irsaliye generation | todo | — | `views/finance.js` | |
| 4-2 | Travel vs on-site time, efficiency | todo | — | `views/team.js`, `views/finance.js` | |
| 4-3 | Invoice from completed visits | todo | — | `views/finance.js` | Partially exists |
| 4-4 | Notification centre + "report emailed" | todo | — | `src/app.js` | |

## Phase 5 — Hardening

| ID | Task | Status | Owner | Files | Notes |
|---|---|---|---|---|---|
| 5-1 | Compliance badges | todo | — | `views/reports.js` | BRCGS/SALSA/ISO22000/FSSC22000/RedTractor/AIB |
| 5-2 | One-click demo reset | todo | — | `src/app.js` | |
| 5-3 | Guided tour mode | todo | — | `src/app.js` | Walks the pitch narrative |
| 5-4 | Fast role switching | todo | — | `core/auth.js` | No re-login during demo |

---

## Notes for future sessions

**Caching bit us once — don't lose an hour to it again.** `server.js` used to
send `Cache-Control: immutable` on JS, and `service-worker.js` was cache-first
for every GET. Together they served a stale module that looked exactly like a
code bug: the file on disk was correct, `curl` returned the correct bytes, and
the browser still ran the old version. Both are fixed (server sends `no-cache`
for source; SW is network-first), but if you ever see an edit "not take
effect", verify with:

```js
await import('./src/app.js?p='+Date.now())   // surfaces the real module error
await fetch('./src/core/dom.js',{cache:'reload'})  // forces past a pinned entry
```

**`node --check` is not enough.** It validates syntax per file but will not
catch a missing `export` — that only fails at import time. Always verify a
refactor by loading the page and probing with the dynamic import above.

**Browser-console `import()` runs in an isolated module map.** Dynamically
importing a module from the devtools/automation context gives you a *different
instance* than the page's `<script type="module">` graph — mutations made by
the app are invisible in it. Do not use it to assert on shared state like
`ui`; it will read stale defaults and look like a bug. Assert on observable
DOM instead (e.g. switch site, count the rendered station rows).

**Check imports statically after any refactor.** The browser test only covers
paths you actually click; `bind()` has many branches it will not reach. Run:

```bash
python scripts/checkimports.py
```

It flags any module referencing an exported symbol it never imports. Four known
false positives are expected (a comment in `core/session.js`, object keys named
`state:` in `data/seed.js`, comment mentions of `save` in `data/catalog.js` and
`state` in `ui/signature.js`) — anything beyond those is real.

**Run `git status` after you commit — it must come back clean.** Session A
wired `insights.js` to `#trendCaption` but the matching one-line `index.html`
change never made it into the commit; the feature silently half-worked until
the merge (fixed in `00201cc`). In a shared folder your uncommitted file hides
among other sessions' dirt. Worktrees (now mandated in the Wave 2 prompts)
make a leftover file impossible to miss.

**Browser tabs from before the cache fix are still poisoned.** The `no-cache`
header only helps requests made *after* it shipped; a tab (or automation
profile) that loaded the app in the `immutable` era holds year-valid HTTP cache
entries and will resurrect the old monolithic module graph — symptom: only ~6
JS files in the network log instead of 25. Recover with an explicit refresh of
every app URL via `fetch(url, {cache:'reload'})` plus SW unregister + cache
delete, then reload. Checking `performance.getEntriesByType('resource')` length
is the fastest way to confirm which graph actually loaded.

**Charts and export are available (0c).** Tasks 0b-2, 1-8, 2-2 consume these.

```js
import { lineChart, barChart, stackedBarChart, donutChart, mountChart } from '../ui/charts.js';
import { downloadCSV, downloadChartPNG, printElement } from '../ui/export.js';

mountChart('#trendChart', lineChart({
  labels: ['Oca','Şub','Mar'],
  series: [{ name: 'Kemirgen', values: [13,11,15] }]   // bare arrays also work
}));
downloadCSV('istasyonlar.csv', rows, [{ key:'code', label:'İstasyon' }]);
printElement('#reportBody', { title: 'Servis_Raporu' });  // browser "Save as PDF"
```

The chart builders are pure — options in, SVG markup string out — so the same
call serves the screen, the print layout and the PNG/SVG download. Sizing is
`viewBox`-driven; do **not** set a pixel width, `.ct-svg` handles responsiveness.

`demo/charts.html` is a live gallery of all four types plus both export paths.
It's a verification harness, not part of the app — delete it freely if it ever
gets in the way.

A bare `window.print()` (the existing report and QR-sticker buttons) now prints
the open modal, or the active view, without app chrome — the print stylesheet
handles that with no JS. Use `printElement()` when you need to print one
specific node instead.

**`recommendationStats()` gained fields; the original five are unchanged (1-6).**
`total / open / resolved / hygiene / isolation` keep their exact meaning —
`resolved` still counts only fully closed findings. The closed-loop detail lives
in a new `stage` field on each recommendation
(`raised` → `customer_actioned` → `approved`, plus `rejected`), exposed as the
additive counts `raised / awaitingApproval / approved / rejected / actioned /
withPhotoEvidence`. The invariants worth knowing:
`resolved === approved`, and `open === raised + awaitingApproval + rejected`
(an item the customer has actioned is **not** closed until a technician
approves it).

**A generator bug was fixed in `history.js`, so the seeded numbers moved.**
`readStation()` called `pick()` twice — once for `pestCode`, once for
`pestName` — so a reading's code and species name described *different*
species (e.g. code `ARI` labelled "Diğer Uçan"). It now draws once. This
consumes one fewer random number per catch, which shifts the whole seeded
stream: totals, trends and recommendation counts all differ from before the
fix. Output is still identical run-to-run; only the pre-fix values are gone.

**The technician role cannot reach the facility page.** `applyRoleAccess()`
restricts `tech` to `work` and `mobileSim`, so the closed loop's approval step
is performed from the `admin` role — which matches the roadmap's own wording
("Aksiyon alınanların kaçı **Repellent tarafından** onaylandı"). If a future
session wants the field technician approving from their own login, that is a
nav-access change in `core/roles.js`.

**`setView()` does not populate the facility page** — it only toggles which
section is visible. `applyRoleAccess()` used to send the `client` role there
with `setView('companyDetail')`, so customers landed on a blank screen; it now
calls `showCompanyDetail('s1')`. This adds a `roles.js → companyDetail.js`
import cycle (companyDetail → router → roles). ESM resolves it because the
calls happen at runtime, not module-eval — but it is worth knowing before
adding another edge to that cycle.

**Reset demo state properly** — it lives in three places:
```bash
rm -f data/state.json state.js     # server-side
```
plus `localStorage.clear()` in the page. Clearing only one leaves the app
restoring half-finished work orders, which makes flow tests lie.


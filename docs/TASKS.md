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
| 0b-1 | Seeded 12-month history generator | todo | — | `src/data/history.js` | Greenfield — parallel-safe |
| 0b-2 | Wire history into insights + company detail | todo | — | `src/views/insights.js` | After 0b-1 |
| 0c-1 | SVG chart lib (line/bar/stacked/donut) | todo | — | `src/ui/charts.js` | Greenfield — parallel-safe |
| 0c-2 | CSV export + print-to-PDF stylesheet | todo | — | `src/ui/export.js`, `styles.css` | |

## Phase 1 — Repellent Stage 1

| ID | Task | Status | Owner | Files | Notes |
|---|---|---|---|---|---|
| 1-1 | Per-equipment-type placement forms | todo | — | `views/companyDetail.js`, `data/catalog.js` | Fly / moth / beetle schemas differ |
| 1-2 | Equipment replacement preserving history | todo | — | `views/companyDetail.js`, `data/history.js` | New barcode, same point number |
| 1-3 | Multi-pest multi-count per device | todo | — | `views/mobile.js` | `findings[]` partially exists |
| 1-4 | Chemical MSDS / label / permit attachments | todo | — | `data/catalog.js`, `views/inventory.js` | |
| 1-5 | Dosage + water auto-calculator | todo | — | `views/mobile.js` | Source data already in `chemicalDatabase` |
| 1-6 | Closed-loop recommendation workflow | todo | — | `views/companyDetail.js` | 3 roles: tech photo → customer photo → tech approval |
| 1-7 | Dual digital signature on visit close | todo | — | `ui/signature.js`, `views/mobile.js` | Pads exist, not wired |
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

It flags any module referencing an exported symbol it never imports. Two known
false positives are expected (a comment in `core/session.js`, object keys named
`state:` in `data/seed.js`) — anything beyond those is real.

**Reset demo state properly** — it lives in three places:
```bash
rm -f data/state.json state.js     # server-side
```
plus `localStorage.clear()` in the page. Clearing only one leaves the app
restoring half-finished work orders, which makes flow tests lie.


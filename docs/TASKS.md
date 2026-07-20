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
| 0a-3 | Extract view renderers + router | todo | — | `src/views/**`, `src/core/router.js` | **Exclusive**. Needs shared UI cursors (below) |
| 0a-3a | Move `activeSiteId` / `mobJob` etc. to a `ui` holder | todo | — | `src/core/session.js` | **Blocks 0a-3.** 7 module-level mutables that `applyRoleAccess` writes; imported `let` bindings are read-only, so they need an object holder |
| 0a-4 | Extract UI (`modal`, `calendar`, `signature`) | todo | — | `src/ui/**` | **Exclusive**, after 0a-2 |
| 0a-5 | Decompose `bind()` into per-view handlers | todo | — | `src/views/**`, `src/app.js` | **Exclusive**, after 0a-3. 1,274 lines — highest-risk step |
| 0a-6 | Gitignore `state.js` ✅; vendor `html5-qrcode` | partial | — | `.gitignore`, `vendor/` | Gitignore done. CDN vendoring still open — needs approval to download the library |
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


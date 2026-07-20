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
| Catalog data | `src/data/catalog.js` | — | free |
| Seed + history | `src/data/seed.js`, `src/data/history.js` | — | free |
| Charts / export | `src/ui/charts.js`, `src/ui/export.js` | — | free |
| Modal / calendar / signature | `src/ui/modal.js`, `calendar.js`, `signature.js` | — | free |
| Dashboard | `src/views/dashboard.js` | — | free |
| Sites | `src/views/sites.js` | — | free |
| Work orders | `src/views/work.js` | — | free |
| Team | `src/views/team.js` | — | free |
| Insights | `src/views/insights.js` | — | free |
| Reports | `src/views/reports.js` | — | free |
| Company detail | `src/views/companyDetail.js` | — | free |
| Mobile | `src/views/mobile.js` | — | free |
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

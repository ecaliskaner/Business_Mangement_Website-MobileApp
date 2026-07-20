# PestOps MVP

Pitch-ready static MVP for a digital pest control and field operation platform.

## How to run

Run the static server:

```bash
npm start
```

Then open the local URL printed in the terminal.

> **The server is now required.** The app loads as ES modules, and browsers
> block module imports over `file://`. Opening `index.html` directly will show
> a blank page. Use `npm start`.

To run a second instance alongside the first (see `docs/SESSIONS.md`):

```bash
PORT=4174 npm start
```

## Project structure

```
src/
  app.js            event delegator + bootstrap
  core/
    dom.js          $, $$, toast
    state.js        load / save / derived stats
    session.js      shared UI cursors (active site, mobile job, ...)
    auth.js         demo user directory
    roles.js        role-based access gating
    router.js       view routing + top-level render
  data/
    seed.js         sites, stations, work orders, technicians
    catalog.js      pest taxonomy, visit types, equipment, chemicals
  views/            dashboard, sites, work, team, insights, reports,
                    inventory, finance, companyDetail, mobile
  ui/               modal, calendar, signature
scripts/
  checkimports.py   static check for missing cross-module imports
docs/
  PLAN.md           phased build plan
  TASKS.md          task board
  SESSIONS.md       running multiple sessions in parallel
  COMPETITOR.md     Insectram feature baseline
```

`state.js` and `data/state.json` are generated at runtime and gitignored —
treat them as session-local scratch.

## Demo flow

1. Start on **Dashboard** and show the operational KPIs.
2. Open **Kat Planı** and click station dots.
3. Mark a station as clean or activity to show live status changes.
4. Open **Mobil Simülasyon**.
5. Click **Müşteriye Vardım**.
6. Explain that GPS confirms arrival, but the job has not truly started yet.
7. Click **İlk QR Tara** to create the real work-start timestamp.
8. Click **Tesis planını görüntüle** to show in-app map viewing.
9. Click **Offline kullanım için indir** to show that map download is optional.
10. Click **Formu Kaydet**.
11. Return to **Dashboard**, **Personel**, and **Müşteri Paneli** to show updated audit and report state.

## Scope

This is a frontend MVP/prototype with mock data and a lightweight static deploy scaffold. It demonstrates the core product logic:

- Admin dashboard
- Interactive floor plan
- Station status colors
- Technician live monitoring
- Mobile technician flow
- GPS arrival versus first-QR real start
- Optional offline facility map download
- Customer-facing report summary

For production, the next step is adding a real backend, PostgreSQL/PostGIS schema, authentication, offline mobile sync, and file storage according to `Dijital_Pest_Control_Platformu_Teknik_Dokum.md`.

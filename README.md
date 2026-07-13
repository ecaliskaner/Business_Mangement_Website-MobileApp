# PestOps MVP

Pitch-ready static MVP for a digital pest control and field operation platform.

## How to run

Open `index.html` directly in a browser.

No install, build step, or backend is required.

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

This is a frontend MVP/prototype with mock data. It demonstrates the core product logic:

- Admin dashboard
- Interactive floor plan
- Station status colors
- Technician live monitoring
- Mobile technician flow
- GPS arrival versus first-QR real start
- Optional offline facility map download
- Customer-facing report summary

For production, the next step is adding a real backend, PostgreSQL/PostGIS schema, authentication, offline mobile sync, and file storage according to `Dijital_Pest_Control_Platformu_Teknik_Dokum.md`.

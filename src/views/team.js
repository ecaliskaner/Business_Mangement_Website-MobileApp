// Team / field view. Extracted from app.js (Phase 0a-3), extended in Phase 3a
// (Session G) with a live simulated-GPS map, geofence enter/exit events, route
// optimization before/after, and technician credential cards.
//
// All motion is a deterministic in-browser simulation — no real geolocation,
// no backend. The map coordinate space is the abstract "İstanbul saha bölgesi"
// canvas, so positions are plain percentages of that canvas, not real geo.

import { $, $$ } from '../core/dom.js';
import { state } from '../core/state.js';
import { save } from '../core/state.js';
import { techData, techSites, initial } from '../data/seed.js';
import { technicianStats } from '../data/history.js';
import { stackedBarChart, mountChart } from '../ui/charts.js';

// ---- map geography (abstract canvas %, not real coordinates) ----

const DEPOT = { x: 24, y: 58, name: 'Repellent Merkez' };

// Each of the six seeded sites gets a fixed pin and a circular geofence on the
// canvas. Radius is in the same %-of-canvas units the positions use.
const SITE_PINS = {
  s1: { x: 84, y: 30, r: 9 },
  s2: { x: 15, y: 24, r: 9 },
  s3: { x: 67, y: 56, r: 9 },
  s4: { x: 39, y: 41, r: 8 },
  s5: { x: 88, y: 66, r: 8 },
  s6: { x: 31, y: 20, r: 8 }
};

const siteById = (id) => initial.sites.find((s) => s.id === id);

// The stops each technician drifts between during the day. Every tech starts
// and ends at the depot and passes through their own sites, so their route
// actually crosses those geofences on the map.
const TECH_ROUTES = {
  'Ayşe Demir': ['depot', 's1', 's3', 'depot'],
  'Mert Kaya':  ['depot', 's2', 's6', 'depot'],
  'Ece Yılmaz': ['depot', 's6', 's3', 's1', 'depot'],
  'Can Öztürk': ['depot', 's4', 's5', 'depot']
};

const waypointPos = (key) => (key === 'depot' ? DEPOT : SITE_PINS[key]);
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// ---- live simulation state (module-local; never persisted) ----

let simTimer = null;
const motion = {};            // tech -> { x, y, leg, t }
const insideFence = {};       // tech -> Set of siteIds currently inside
let geofenceEvents = [];      // most-recent-first feed
let routeOptimized = false;   // route panel before/after toggle

// Seed each tech at the depot with a route cursor.
function initMotion() {
  Object.keys(TECH_ROUTES).forEach((tech) => {
    if (motion[tech]) return;
    motion[tech] = { x: DEPOT.x, y: DEPOT.y, leg: 0, t: 0 };
    insideFence[tech] = new Set();
  });
}

// Advance every technician one step along their route and detect fence
// crossings. Returns true if any geofence event fired this tick.
function tickSimulation() {
  let fired = false;
  const STEP = 0.06; // fraction of the current leg per tick

  Object.entries(TECH_ROUTES).forEach(([tech, route]) => {
    const m = motion[tech];
    const fromKey = route[m.leg];
    const toKey = route[(m.leg + 1) % route.length];
    const from = waypointPos(fromKey);
    const to = waypointPos(toKey);

    m.t += STEP;
    if (m.t >= 1) {
      m.t = 0;
      m.leg = (m.leg + 1) % route.length;
    }
    m.x = from.x + (to.x - from.x) * m.t;
    m.y = from.y + (to.y - from.y) * m.t;

    // Geofence membership check against every site.
    Object.entries(SITE_PINS).forEach(([siteId, pin]) => {
      const within = dist(m, pin) <= pin.r;
      const was = insideFence[tech].has(siteId);
      if (within && !was) {
        insideFence[tech].add(siteId);
        pushGeofenceEvent(tech, siteId, 'enter');
        fired = true;
      } else if (!within && was) {
        insideFence[tech].delete(siteId);
        pushGeofenceEvent(tech, siteId, 'exit');
        fired = true;
      }
    });
  });

  positionPeople();
  if (fired) renderGeofenceFeed();
  return fired;
}

function pushGeofenceEvent(tech, siteId, kind) {
  const site = siteById(siteId);
  const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  geofenceEvents.unshift({
    tech,
    siteId,
    kind,
    siteName: site ? site.name : siteId,
    company: site ? site.company : '',
    time: now
  });
  if (geofenceEvents.length > 18) geofenceEvents.pop();
}

// Move the four existing .map-person buttons to their simulated positions.
function positionPeople() {
  Object.entries(motion).forEach(([tech, m]) => {
    const el = document.querySelector(`.map-person[data-tech="${CSS.escape(tech)}"]`);
    if (el) {
      el.style.left = `${m.x}%`;
      el.style.top = `${m.y}%`;
    }
  });
}

// Draw the geofence rings and site pins into the map canvas once. Idempotent.
function ensureFenceLayer() {
  const canvas = $('.map-canvas');
  if (!canvas || canvas.querySelector('.geofence-layer')) return;

  const layer = document.createElement('div');
  layer.className = 'geofence-layer';
  layer.innerHTML = Object.entries(SITE_PINS).map(([id, pin]) => {
    const site = siteById(id);
    const label = site ? site.company : id;
    return `
      <div class="geofence-ring" data-fence="${id}" style="left:${pin.x}%; top:${pin.y}%; width:${pin.r * 2}%; padding-bottom:${pin.r * 2}%;"></div>
      <div class="geofence-pin" style="left:${pin.x}%; top:${pin.y}%;">📍<span>${label}</span></div>`;
  }).join('') + `
    <div class="geofence-depot" style="left:${DEPOT.x}%; top:${DEPOT.y}%;">🏢<span>${DEPOT.name}</span></div>
    <svg class="route-overlay" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>`;
  // Insert as the first child so people/labels stay on top.
  canvas.insertBefore(layer, canvas.firstChild);
}

function renderGeofenceFeed() {
  const feed = $('#geofenceFeed');
  if (!feed) return;
  if (!geofenceEvents.length) {
    feed.innerHTML = '<p class="geo-empty">Teknisyenler harita üzerinde hareket ettikçe geofence giriş/çıkış olayları burada belirir.</p>';
    return;
  }
  feed.innerHTML = geofenceEvents.map((ev) => {
    const enter = ev.kind === 'enter';
    return `
      <div class="geo-event ${enter ? 'enter' : 'exit'}">
        <span class="geo-dot">${enter ? '↴' : '↳'}</span>
        <div class="geo-body">
          <b>${ev.tech} · ${enter ? 'GİRİŞ' : 'ÇIKIŞ'}</b>
          <small>${ev.company} — ${ev.siteName}</small>
        </div>
        <time>${ev.time}</time>
      </div>`;
  }).join('');
}

// Start / stop the live simulation. Idempotent start guards against stacking
// intervals across re-renders.
export function startFieldSimulation() {
  initMotion();
  ensureFenceLayer();
  positionPeople();
  renderGeofenceFeed();
  if (simTimer) return;
  simTimer = setInterval(tickSimulation, 1100);
}

export function stopFieldSimulation() {
  if (simTimer) { clearInterval(simTimer); simTimer = null; }
}

// ---- route optimization (task 3-5) ----

// Nearest-neighbour ordering of the day's stops starting from the depot. Pure
// and deterministic — the same six sites always optimise the same way.
function optimizeRoute(stopIds) {
  const remaining = [...stopIds];
  const order = [];
  let cur = DEPOT;
  while (remaining.length) {
    let bestI = 0;
    let bestD = Infinity;
    remaining.forEach((id, i) => {
      const d = dist(cur, SITE_PINS[id]);
      if (d < bestD) { bestD = d; bestI = i; }
    });
    const [next] = remaining.splice(bestI, 1);
    order.push(next);
    cur = SITE_PINS[next];
  }
  return order;
}

// Total travel distance for an ordered stop list, depot → … → depot.
function routeDistance(order) {
  let total = 0;
  let cur = DEPOT;
  order.forEach((id) => { total += dist(cur, SITE_PINS[id]); cur = SITE_PINS[id]; });
  total += dist(cur, DEPOT);
  return total;
}

// Canvas distance units → minutes. Calibrated so a full naive tour reads like a
// believable metropolitan field day (~a couple of hours of driving).
const MIN_PER_UNIT = 1.6;
const routeMinutes = (order) => Math.round(routeDistance(order) * MIN_PER_UNIT);

// The day's stops, in the order they appear in the seed data (the "naive" plan).
const DAY_STOPS = ['s1', 's2', 's3', 's4', 's5', 's6'];

function renderRouteOptimization() {
  const panel = $('#routeOptBody');
  if (!panel) return;

  const naive = DAY_STOPS;
  const optimized = optimizeRoute(DAY_STOPS);
  const naiveMin = routeMinutes(naive);
  const optMin = routeMinutes(optimized);
  const saved = naiveMin - optMin;
  const savedPct = Math.round((saved / naiveMin) * 100);

  const shown = routeOptimized ? optimized : naive;
  const label = (id) => (siteById(id) || {}).company || id;

  const chips = ['depot', ...shown, 'depot'].map((id, i) => {
    const name = id === 'depot' ? 'Merkez' : label(id);
    return `<span class="route-chip ${id === 'depot' ? 'depot' : ''}">${i}. ${name}</span>`;
  }).join('<span class="route-arrow">→</span>');

  panel.innerHTML = `
    <div class="route-compare">
      <div class="route-metric ${routeOptimized ? '' : 'active'}">
        <span>Mevcut sıralama</span><strong>${naiveMin} dk</strong>
      </div>
      <div class="route-metric ${routeOptimized ? 'active' : ''}">
        <span>Optimize sıralama</span><strong>${optMin} dk</strong>
      </div>
      <div class="route-metric saved">
        <span>Kazanç</span><strong>${saved} dk · %${savedPct}</strong>
      </div>
    </div>
    <p class="route-mode">${routeOptimized ? '✓ Optimize edilmiş en yakın-komşu rotası' : 'Sözleşme/giriş sırasına göre ham rota'}</p>
    <div class="route-chips">${chips}</div>`;

  drawRouteOverlay(routeOptimized ? optimized : naive);

  const btn = $('#btnRouteOptimize');
  if (btn) btn.textContent = routeOptimized ? '↺ Ham rotayı göster' : '⚡ Rotayı optimize et';
}

// Draw the current stop order as a polyline over the map canvas.
function drawRouteOverlay(order) {
  const svg = $('.route-overlay');
  if (!svg) return;
  const pts = ['depot', ...order, 'depot'].map((id) => waypointPos(id)).map((p) => `${p.x},${p.y}`).join(' ');
  svg.innerHTML = `
    <polyline points="${pts}" fill="none" stroke="${routeOptimized ? '#138b67' : '#c2673a'}"
      stroke-width="0.7" stroke-dasharray="${routeOptimized ? '0' : '1.6 1.2'}"
      stroke-linejoin="round" vector-effect="non-scaling-stroke" opacity="0.9"/>`;
}

// ---- technician credential cards (task 2-5) ----
//
// KVKK: these are placeholder compliance documents only. No real personal data
// (no TC kimlik, real SGK numbers, or genuine health records) is present or
// simulated — identifiers are masked and the cards carry a visible KVKK notice.

const CREDENTIALS = {
  'Ayşe Demir':  { cert: 'ENH-2024-0143', certExp: '14 Mar 2027', sgk: true, health: '09 Şub 2027', permit: 'Biyosidal Uyg. — Halk Sağlığı' },
  'Mert Kaya':   { cert: 'ENH-2023-0288', certExp: '02 Kas 2026', sgk: true, health: '21 Eki 2026', permit: 'Biyosidal Uyg. — Halk Sağlığı' },
  'Ece Yılmaz':  { cert: 'ENH-2024-0091', certExp: '30 Haz 2027', sgk: true, health: '18 Nis 2027', permit: 'Biyosidal Uyg. + Fümigasyon' },
  'Can Öztürk':  { cert: 'ENH-2022-0455', certExp: '12 Ara 2026', sgk: true, health: '05 Ağu 2026', permit: 'Biyosidal Uyg. — Halk Sağlığı' }
};

function credentialDoc(icon, title, meta, ok) {
  return `
    <div class="cred-doc">
      <span class="cred-doc-icon">${icon}</span>
      <div class="cred-doc-body"><b>${title}</b><small>${meta}</small></div>
      <span class="cred-doc-status ${ok ? 'ok' : 'warn'}">${ok ? 'Geçerli' : 'Yakında'}</span>
    </div>`;
}

function renderCredentials(tech) {
  const host = $('#techCredentials');
  if (!host) return;
  const c = CREDENTIALS[tech] || CREDENTIALS['Ayşe Demir'];
  const initials = (techData[tech] || ['--'])[0];

  host.innerHTML = `
    <div class="cred-head">
      <span class="tech-avatar" style="background:${(techData[tech] || [])[5] || '#eee'}">${initials}</span>
      <div><b>${tech}</b><span>Belgeler müşteri portalında görüntülenebilir</span></div>
    </div>
    <div class="cred-docs">
      ${credentialDoc('🧾', 'SGK Kaydı', 'SGK No: •••• •••• •• · Aktif sigortalı', c.sgk)}
      ${credentialDoc('🦺', 'İş Güvenliği Belgesi', `Sertifika: ${c.cert} · Geçerlilik: ${c.certExp}`, true)}
      ${credentialDoc('📋', 'Uygulama İzin Belgesi', c.permit, true)}
      ${credentialDoc('🩺', 'Sağlık Raporu (Portör)', `Sonraki kontrol: ${c.health}`, true)}
    </div>
    <p class="cred-kvkk">🔒 <b>KVKK bildirimi:</b> Bu kartlar demo amaçlı yer tutucu belgelerdir. Gerçek kimlik,
    SGK veya sağlık verisi içermez; kişisel tanımlayıcılar maskelenmiştir. Canlı sistemde belgeler yalnızca
    ilgili müşteriye ve yalnızca hizmet süresince gösterilir.</p>`;
}

// ---- productivity: travel vs on-site time & efficiency (task 4-2) ----
//
// Reads the seeded 12-month history through technicianStats() — real per-tech
// visit counts and on-site / travel minute totals — and turns them into the
// utilisation story: how much of each technician's working time is billable
// time on the customer's site versus unbillable "windshield" travel. The cost
// side of the same numbers lives in views/finance.js next to the margins.

const firstName = (name) => name.split(' ')[0];
const hours = (min) => Math.round(min / 60);
// Share of working time spent on-site rather than driving. Higher is better.
const utilisation = (t) => Math.round((t.onSiteMin / (t.onSiteMin + t.travelMin)) * 100);
const utilClass = (u) => (u >= 70 ? 'ok' : u >= 60 ? 'mid' : 'low');

function renderProductivity() {
  const body = $('#teamProductivityBody');
  if (!body) return;

  const stats = technicianStats();
  const totalOn = stats.reduce((s, t) => s + t.onSiteMin, 0);
  const totalTravel = stats.reduce((s, t) => s + t.travelMin, 0);
  const totalVisits = stats.reduce((s, t) => s + t.visits, 0);
  const teamUtil = totalOn + totalTravel ? Math.round((totalOn / (totalOn + totalTravel)) * 100) : 0;

  const pill = $('#teamUtilPill');
  if (pill) {
    pill.textContent = `Ekip verimliliği %${teamUtil}`;
    pill.className = `status-chip ${teamUtil >= 70 ? 'healthy' : teamUtil >= 60 ? 'warning' : 'blue'}`;
  }

  const rows = stats.map((t) => {
    const u = utilisation(t);
    const sel = t.tech === state.selectedTech ? ' selected' : '';
    return `
      <div class="prod-row${sel}" data-tech="${t.tech}">
        <div class="prod-row-head">
          <span class="tech-avatar" style="background:${(techData[t.tech] || [])[5] || '#eee'}">${(techData[t.tech] || ['--'])[0]}</span>
          <div class="prod-row-id"><b>${t.tech}</b><small>${t.visits} ziyaret · ort. saha ${t.avgOnSiteMin} dk · ort. yol ${t.avgTravelMin} dk</small></div>
          <span class="prod-util ${utilClass(u)}">%${u}</span>
        </div>
        <div class="prod-bar" title="Saha ${hours(t.onSiteMin)} sa · Yol ${hours(t.travelMin)} sa">
          <span class="prod-bar-on" style="width:${u}%"></span>
          <span class="prod-bar-travel" style="width:${100 - u}%"></span>
        </div>
      </div>`;
  }).join('');

  body.innerHTML = `
    <div class="prod-summary">
      <div class="prod-stat"><span>Ekip verimliliği</span><strong class="${teamUtil >= 70 ? 'good' : teamUtil >= 60 ? 'mid' : 'bad'}">%${teamUtil}</strong><small>saha / toplam mesai</small></div>
      <div class="prod-stat"><span>Toplam saha süresi</span><strong>${hours(totalOn)} sa</strong><small>faturalanabilir</small></div>
      <div class="prod-stat"><span>Toplam yol süresi</span><strong>${hours(totalTravel)} sa</strong><small>windshield / gayri-faturalı</small></div>
      <div class="prod-stat"><span>Toplam ziyaret</span><strong>${totalVisits}</strong><small>12 ay</small></div>
    </div>
    <div class="prod-chart-wrap"><div id="teamProductivityChart" class="prod-chart"></div></div>
    <div class="prod-legend"><span><i class="on"></i> Saha (faturalanabilir)</span><span><i class="travel"></i> Yol (windshield)</span></div>
    <div class="prod-rows">${rows}</div>`;

  mountChart('#teamProductivityChart', stackedBarChart({
    labels: stats.map((t) => firstName(t.tech)),
    series: [
      { name: 'Saha', values: stats.map((t) => hours(t.onSiteMin)), color: '#10b981' },
      { name: 'Yol', values: stats.map((t) => hours(t.travelMin)), color: '#f59e0b' }
    ],
    height: 220,
    legend: false,
    format: (n) => `${n} sa`
  }));
}

// ---- main view rendering ----

export function renderTeam(){
  const d=techData[state.selectedTech];
  const stats = technicianStats().find((t) => t.tech === state.selectedTech);
  const statLine = stats
    ? `${stats.visits} ziyaret · saha ort. ${stats.avgOnSiteMin} dk · yol ort. ${stats.avgTravelMin} dk`
    : '—';

  $('#techDetail').innerHTML=`
    <div class="tech-summary">
      <span class="tech-avatar" style="background:${d[5]}">${d[0]}</span>
      <div><b>${state.selectedTech}</b><span>${d[1]} · ${d[2]}</span></div>
    </div>
    <div class="tech-rows">
      <div><span>Mevcut durum</span><b>${d[1]}</b></div>
      <div><span>Servis doğrulaması</span><b>${d[3]}</b></div>
      <div><span>Son konum sinyali</span><b>${d[4]}</b></div>
      <div><span>12 aylık saha özeti</span><b>${statLine}</b></div>
    </div>
    <button class="secondary-btn map-access" data-action="facilityMap">⌖ Tesis planını görüntüle</button>
    <p class="map-hint">Plan uygulama içinde çevrimiçi görüntülenir; teknisyen isterse offline kullanım için ayrıca indirebilir.</p>
  `;
  $('#roster').innerHTML=Object.entries(techData).map(([n,x])=>`
    <div class="roster-item" data-tech="${n}" style="cursor:pointer; background:${state.selectedTech===n?'#f0f4f8':''}">
      <span class="tech-avatar" style="background:${x[5]}">${x[0]}</span>
      <div><b>${n}</b><span>${x[1]} · ${x[2]}</span></div>
    </div>
  `).join('');

  renderCredentials(state.selectedTech);
  renderRouteOptimization();
  renderProductivity();
  startFieldSimulation();
}


export function teamRosterClicks(e) {
    const tech=e.target.closest('[data-tech]');
    if(tech){
      state.selectedTech=tech.dataset.tech;
      save();
      $$('.map-person').forEach(x=>x.classList.toggle('active',x.dataset.tech===tech.dataset.tech));
      renderTeam();
      return true;
    }

    // Route optimization before/after toggle (task 3-5).
    if (e.target.id === 'btnRouteOptimize') {
      routeOptimized = !routeOptimized;
      renderRouteOptimization();
      return true;
    }

    // Clicking a live map person selects that technician.
    const person = e.target.closest('.map-person[data-tech]');
    if (person) {
      state.selectedTech = person.dataset.tech;
      save();
      renderTeam();
      return true;
    }

  return false;
}

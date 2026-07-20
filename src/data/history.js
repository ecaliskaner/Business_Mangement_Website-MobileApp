// Seeded 12-month visit history (Phase 0b-1).
//
// Every value below is derived from a fixed seed, so the generator produces
// byte-identical output every time — no demo-day surprises, and screenshots
// taken today still match the app next week.

import { initial } from './seed.js';
import { chemicalDatabase, pestDatabase } from './catalog.js';

const SEED = 0x1adb69;
const MONTH_SHORT = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

// Window ends on the month the seed data calls "now" (July 2026).
const WINDOW_END = { year: 2026, month: 6 };
const WINDOW_MONTHS = 12;
const LAST_DAY = 12;

const TECHS = ['Ayşe Demir', 'Mert Kaya', 'Ece Yılmaz', 'Can Öztürk'];
const PRIMARY_TECH = { s1: 'Ayşe Demir', s2: 'Mert Kaya', s3: 'Ece Yılmaz', s4: 'Can Öztürk', s5: 'Mert Kaya', s6: 'Ece Yılmaz' };

// Relative pest pressure by calendar month (0 = January). Flying peaks Jun–Aug;
// rodents move indoors as it cools, so they peak Oct–Dec.
const SEASON = {
  flying:   [0.15, 0.15, 0.25, 0.45, 0.70, 0.95, 1.00, 0.95, 0.70, 0.45, 0.25, 0.15],
  crawling: [0.30, 0.30, 0.40, 0.55, 0.70, 0.85, 1.00, 1.00, 0.80, 0.60, 0.40, 0.30],
  rodent:   [0.80, 0.70, 0.55, 0.45, 0.40, 0.35, 0.35, 0.45, 0.65, 0.90, 1.00, 0.95],
  stored:   [0.40, 0.40, 0.50, 0.60, 0.75, 0.90, 1.00, 0.95, 0.85, 0.60, 0.50, 0.40]
};

// How many pests a single device of each kind catches at full seasonal pressure.
const CATCH_SCALE = { flying: 28, crawling: 7, rodent: 3 };

const STATION_CATEGORY = {
  rodent: 'rodent',
  rodent_bait: 'rodent',
  catch_alive_trap: 'rodent',
  crawler: 'crawling',
  insect_detector: 'crawling',
  sp_insect_trap: 'crawling',
  flying: 'flying',
  flying_insect_trap: 'flying',
  insect_light_trap: 'flying',
  sp_moth_trap: 'flying'
};

const CHEMICALS_BY_CATEGORY = {
  rodent: ['ch3', 'ch4'],
  crawling: ['ch2', 'ch7', 'ch1', 'ch11'],
  flying: ['ch5', 'ch8', 'ch6', 'ch12']
};

const RECOMMENDATIONS = [
  { category: 'Hijyen', desc: 'Atık toplama alanı çevresinde organik artık birikimi tespit edildi; günlük temizlik frekansı artırılmalı.' },
  { category: 'Hijyen', desc: 'Üretim hattı altındaki drenaj kanallarında biyofilm oluşumu var, basınçlı yıkama önerilir.' },
  { category: 'Hijyen', desc: 'Personel yemekhanesinde açıkta bekleyen gıda artıkları uçan haşere çekiyor.' },
  { category: 'Yalıtım', desc: 'Sevkiyat rampası kapı fırçaları yıpranmış, kemirgen geçişine açık boşluk mevcut.' },
  { category: 'Yalıtım', desc: 'Kablo geçiş delikleri sıvamasız; çelik yün ve mastik ile kapatılmalı.' },
  { category: 'Yalıtım', desc: 'Depo penceresi sineklikleri yırtık, uçan haşere girişi engellenmeli.' },
  { category: 'BRCGS', desc: 'Dış çevre kapı eşiği contası yenilenmeli — BRCGS madde 4.14 uygunsuzluğu.' },
  { category: 'BRCGS', desc: 'İstasyon kroki haritası güncel değil; yeni eklenen noktalar işlenmeli.' },
  { category: 'AIB', desc: 'Sevkiyat rampası A-2 kapısına hava perdesi veya PVC şerit bariyer takılmalı.' },
  { category: 'AIB', desc: 'Hammadde paletleri duvara 45 cm’den yakın istiflenmiş; denetim koridoru açılmalı.' }
];

const VISIT_TYPE_WEIGHTS = [
  ['RZ', 68], ['IZ', 12], ['TZ', 9], ['ES', 5], ['AC', 3], ['3G', 2], ['DZ', 1]
];

// ---------- deterministic randomness ----------

function hash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seedStr) {
  let a = (hash(seedStr) ^ SEED) >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (r, arr) => arr[Math.floor(r() * arr.length) % arr.length];

function weightedPick(r, pairs) {
  const total = pairs.reduce((s, p) => s + p[1], 0);
  let n = r() * total;
  for (const [value, weight] of pairs) {
    n -= weight;
    if (n <= 0) return value;
  }
  return pairs[0][0];
}

// ---------- calendar ----------

export function monthWindow() {
  const out = [];
  let y = WINDOW_END.year;
  let m = WINDOW_END.month - (WINDOW_MONTHS - 1);
  while (m < 0) { m += 12; y -= 1; }
  for (let i = 0; i < WINDOW_MONTHS; i++) {
    out.push({ year: y, month: m, label: MONTH_SHORT[m], key: `${y}-${String(m + 1).padStart(2, '0')}` });
    m += 1;
    if (m > 11) { m = 0; y += 1; }
  }
  return out;
}

const formatDate = (y, m, d) => `${String(d).padStart(2, '0')} ${MONTH_SHORT[m]} ${y}`;
const clock = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

// ---------- generation ----------

// Sites with a worse score carry more pest pressure; this keeps generated
// history consistent with the scores already shown elsewhere in the demo.
const pressureOf = (site) => Math.max(0.15, Math.min(1, (100 - site.score) / 45));

function visitsInMonth(site, month, r) {
  const scope = site.serviceScope;
  let n = 2;
  if (scope && scope.flyingPest) {
    const high = month >= 3 && month <= 9; // Nisan–Ekim
    n = high ? scope.flyingPest.frequency : Math.max(2, Math.round(scope.flyingPest.frequency / 2));
  }
  if (site.score < 70) n += 1;
  if (r() < 0.15) n -= 1;
  return Math.max(1, Math.min(5, n));
}

function readStation(station, month, pressure, r) {
  const category = STATION_CATEGORY[station.type] || 'crawling';
  const season = SEASON[category][month];
  const expected = CATCH_SCALE[category] * season * pressure;

  let count = 0;
  // Below expected ~1 catch, most inspections come back clean.
  if (r() < Math.min(0.92, expected / (expected + 1.4))) {
    count = Math.max(1, Math.round(expected * (0.45 + r() * 1.35)));
  }

  let status = count > 0 ? 'activity' : 'clean';
  const fault = r();
  if (count === 0 && fault < 0.03) status = 'damaged';
  else if (count === 0 && fault < 0.045) status = 'missing';
  else if (count === 0 && fault < 0.075) status = 'bait_changed';

  const species = pestDatabase[category === 'crawling' ? 'crawling' : category] || pestDatabase.crawling;
  const live = species.filter((s) => s.code !== '0');

  return {
    code: station.code,
    type: station.type,
    category,
    status,
    pestCount: count,
    pestCode: count > 0 ? pick(r, live).code : '0',
    pestName: count > 0 ? pick(r, live).name : 'Aktivite Yok'
  };
}

function buildChemicalUse(site, readings, dateStr, tech, r) {
  const hot = [...new Set(readings.filter((x) => x.pestCount > 0).map((x) => x.category))];
  if (!hot.length && r() > 0.25) return [];
  const categories = hot.length ? hot : ['crawling'];
  return categories.slice(0, 2).map((cat) => {
    const id = pick(r, CHEMICALS_BY_CATEGORY[cat]);
    const chem = chemicalDatabase.find((c) => c.id === id);
    const qty = chem.unit === 'gr' ? 20 + Math.round(r() * 60) : 120 + Math.round(r() * 380);
    return {
      chemicalId: id,
      name: chem.name,
      quantity: qty,
      unit: chem.unit,
      area: `${100 + Math.round(r() * 500)} m²`,
      date: dateStr,
      tech,
      cost: Math.round(qty * chem.unitCost)
    };
  });
}

function generate() {
  const months = monthWindow();
  const visits = [];
  const recommendations = [];
  let visitSeq = 0;
  let recSeq = 0;

  for (const site of initial.sites) {
    const pressure = pressureOf(site);
    const stations = site.stations || [];
    const openRecs = [];

    months.forEach((mo, monthIndex) => {
      const monthRng = rng(`${site.id}|${mo.key}`);
      const count = visitsInMonth(site, mo.month, monthRng);
      const spacing = Math.floor(26 / count);

      for (let v = 0; v < count; v++) {
        const r = rng(`${site.id}|${mo.key}|${v}`);
        const day = Math.min(28, 2 + v * spacing + Math.floor(r() * Math.max(1, spacing - 1)));
        // The seed data's "today" is 12 Tem 2026 — never generate a visit past it.
        if (monthIndex === WINDOW_MONTHS - 1 && day > LAST_DAY) continue;
        const dateStr = formatDate(mo.year, mo.month, day);
        const tech = r() < 0.78 ? PRIMARY_TECH[site.id] || TECHS[0] : pick(r, TECHS);

        const readings = stations.map((st) => readStation(st, mo.month, pressure, r));
        const totalPests = readings.reduce((s, x) => s + x.pestCount, 0);

        const travelMin = 18 + Math.floor(r() * 42);
        const onSiteMin = 45 + stations.length * 6 + Math.floor(r() * 40) + Math.round(totalPests * 0.8);
        const startMin = 8 * 60 + Math.floor(r() * 7) * 30;

        const chemicals = buildChemicalUse(site, readings, dateStr, tech, r);

        const visit = {
          id: `VH-${String(++visitSeq).padStart(4, '0')}`,
          siteId: site.id,
          company: site.company,
          siteName: site.name,
          city: site.city,
          monthKey: mo.key,
          monthIndex,
          calendarMonth: mo.month,
          year: mo.year,
          date: dateStr,
          day,
          visitType: weightedPick(r, VISIT_TYPE_WEIGHTS),
          tech,
          arrival: clock(startMin),
          departure: clock(startMin + onSiteMin),
          travelMin,
          onSiteMin,
          readings,
          totals: {
            all: totalPests,
            rodent: readings.filter((x) => x.category === 'rodent').reduce((s, x) => s + x.pestCount, 0),
            flying: readings.filter((x) => x.category === 'flying').reduce((s, x) => s + x.pestCount, 0),
            crawler: readings.filter((x) => x.category === 'crawling').reduce((s, x) => s + x.pestCount, 0)
          },
          chemicals,
          recommendationsRaised: [],
          recommendationsClosed: []
        };

        // A bad reading day is what actually triggers a written recommendation.
        const raiseChance = 0.08 + Math.min(0.42, totalPests / 60);
        if (r() < raiseChance) {
          const template = pick(r, RECOMMENDATIONS);
          const rec = {
            id: `RH-${String(++recSeq).padStart(4, '0')}`,
            siteId: site.id,
            category: template.category,
            desc: template.desc,
            date: dateStr,
            raisedMonth: monthIndex,
            tech,
            status: 'open',
            closedDate: null,
            closedMonth: null
          };
          recommendations.push(rec);
          openRecs.push(rec);
          visit.recommendationsRaised.push(rec.id);
        }

        // Older open items get closed off as the technician re-inspects.
        for (let i = openRecs.length - 1; i >= 0; i--) {
          const rec = openRecs[i];
          if (monthIndex - rec.raisedMonth < 1) continue;
          if (r() < 0.35) {
            rec.status = 'resolved';
            rec.closedDate = dateStr;
            rec.closedMonth = monthIndex;
            visit.recommendationsClosed.push(rec.id);
            openRecs.splice(i, 1);
          }
        }

        visits.push(visit);
      }
    });
  }

  return { months, visits, recommendations };
}

let cache = null;
const history = () => (cache || (cache = generate()));

// ---------- public API ----------

export const getMonths = () => history().months;
export const getVisits = () => history().visits;
export const getRecommendations = () => history().recommendations;
export const visitsForSite = (siteId) => history().visits.filter((v) => v.siteId === siteId);

/** 12-month pest totals. Pass a siteId to scope to one site. */
export function monthlyPestTotals(siteId) {
  const { months, visits } = history();
  const scoped = siteId ? visits.filter((v) => v.siteId === siteId) : visits;
  const series = { all: [], rodent: [], flying: [], crawler: [] };
  months.forEach((_, i) => {
    const inMonth = scoped.filter((v) => v.monthIndex === i);
    for (const key of Object.keys(series)) {
      series[key].push(inMonth.reduce((s, v) => s + v.totals[key], 0));
    }
  });
  return { labels: months.map((m) => m.label), ...series };
}

export function recommendationStats(siteId) {
  const recs = history().recommendations.filter((r) => !siteId || r.siteId === siteId);
  return {
    total: recs.length,
    open: recs.filter((r) => r.status === 'open').length,
    resolved: recs.filter((r) => r.status === 'resolved').length,
    hygiene: recs.filter((r) => r.category === 'Hijyen').length,
    isolation: recs.filter((r) => r.category !== 'Hijyen').length
  };
}

export function chemicalStats(siteId) {
  const uses = history().visits
    .filter((v) => !siteId || v.siteId === siteId)
    .flatMap((v) => v.chemicals);
  return {
    applications: uses.length,
    totalQuantity: uses.reduce((s, c) => s + c.quantity, 0),
    totalCost: uses.reduce((s, c) => s + c.cost, 0),
    distinctProducts: new Set(uses.map((c) => c.chemicalId)).size,
    lastDate: uses.length ? uses[uses.length - 1].date : '—'
  };
}

export function technicianStats(siteId) {
  const visits = history().visits.filter((v) => !siteId || v.siteId === siteId);
  const byTech = {};
  for (const v of visits) {
    const t = (byTech[v.tech] ||= { tech: v.tech, visits: 0, onSiteMin: 0, travelMin: 0 });
    t.visits++;
    t.onSiteMin += v.onSiteMin;
    t.travelMin += v.travelMin;
  }
  return Object.values(byTech)
    .map((t) => ({ ...t, avgOnSiteMin: Math.round(t.onSiteMin / t.visits), avgTravelMin: Math.round(t.travelMin / t.visits) }))
    .sort((a, b) => b.visits - a.visits);
}

/** Per-site totals over the window, worst first — drives the risk ranking. */
export function siteRanking() {
  return initial.sites
    .map((site) => {
      const visits = visitsForSite(site.id);
      const total = visits.reduce((s, v) => s + v.totals.all, 0);
      const recent = visits.filter((v) => v.monthIndex >= 9).reduce((s, v) => s + v.totals.all, 0);
      const prior = visits.filter((v) => v.monthIndex >= 6 && v.monthIndex < 9).reduce((s, v) => s + v.totals.all, 0);
      return {
        id: site.id,
        name: site.name,
        company: site.company,
        city: site.city,
        score: site.score,
        visits: visits.length,
        totalPests: total,
        recentPests: recent,
        trend: prior === 0 ? 0 : Math.round(((recent - prior) / prior) * 100),
        openRecommendations: recommendationStats(site.id).open
      };
    })
    .sort((a, b) => b.recentPests - a.recentPests);
}

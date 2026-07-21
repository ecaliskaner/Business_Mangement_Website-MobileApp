// Deterministic billing: turns completed visits into delivery notes (irsaliye)
// and consolidated invoices (Phase 4-1 / 4-3).
//
// Pure computation only — no DOM, no state mutation. Every number is derived
// from the seeded history and the seed contracts, so a demo re-run produces
// the same document numbers, totals and margins every time. finance.js renders
// what this module computes.

import { getVisits } from './history.js';
import { initial } from './seed.js';
import { visitTypes } from './catalog.js';

// Technician hourly rates (₺/saat). Falls back to a portfolio average for any
// name not in the table so a rename never zeroes out a labour cost.
const TECH_RATES = initial.techRates || {};
const AVG_RATE = Object.values(TECH_RATES).length
  ? Math.round(Object.values(TECH_RATES).reduce((a, b) => a + b, 0) / Object.values(TECH_RATES).length)
  : 160;
const rate = (tech) => TECH_RATES[tech] || AVG_RATE;

// Visit types the monthly contract already covers. Emergency call-outs (AC) and
// extra services (ES) are billed on top at their own fixed price.
const COVERED = new Set(['RZ', 'IZ', 'TZ', '3G', 'DZ', 'ILK']);
const visitTypeName = (code) => (visitTypes.find((v) => v.code === code) || {}).name || code;

const MONTH_SHORT = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
const monthLabel = (key) => {
  const [y, m] = key.split('-');
  return `${MONTH_SHORT[Number(m) - 1]} ${y}`;
};

/* ---------------------------------------------------------- deterministic ids */

function hash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const siteSeq = (siteId) => String(siteId).replace(/\D/g, '').padStart(2, '0');
const visitSeq = (visitId) => String(visitId).replace(/\D/g, '');

// Delivery note number, one per visit: IRS-2026-000046. Stable because visit
// ids are generated deterministically by the history engine.
export const irsaliyeNo = (visit) => `IRS-${visit.year}-${visitSeq(visit.id).padStart(6, '0')}`;

// Consolidated invoice number, one per site per month: FTR-202607-01. The two
// hand-seeded invoices use the legacy INV-1001 series, so this prefix cannot
// collide with them.
export const invoiceNo = (siteId, monthKey) => `FTR-${monthKey.replace('-', '')}-${siteSeq(siteId)}`;

// A 10-digit tax number for demo sites that lack a real contract — deterministic
// so it prints the same every time, and never a real number.
const syntheticTaxNo = (siteId) => String(1000000000 + (hash('vkn' + siteId) % 8999999999));

/* ------------------------------------------------------------------ pricing */

// Sites without a seeded contract get a synthetic one scaled by station count,
// so every location in the demo is billable. Flagged so the UI can label it.
export function contractFor(site) {
  if (site.contract) return site.contract;
  const stations = (site.stations || []).length || 6;
  const monthlyPrice = 2500 + stations * 350;
  return {
    synthetic: true,
    taxOffice: `${site.city} VD`,
    taxNo: syntheticTaxNo(site.id),
    annualPrice: monthlyPrice * 12,
    monthlyPrice,
    extraVisitPrice: Math.round(monthlyPrice * 0.19),
    emergencyCallPrice: Math.round(monthlyPrice * 0.38),
    period: '01.01.2026 - 31.12.2026'
  };
}

const siteById = (id) => initial.sites.find((s) => s.id === id);

/**
 * Cost, revenue and margin for a single completed visit.
 *
 * `share` is the visit's slice of the monthly contract fee, so a month of
 * routine visits sums back to roughly one monthly contract price; emergency
 * and extra visits bill their own fixed fee on top.
 */
export function visitBilling(visit, share) {
  const chemicalCost = visit.chemicals.reduce((s, c) => s + (c.cost || 0), 0);
  // Labour = on-site time at full rate + travel at 60% (windshield time is real
  // cost but not fully billable productivity).
  const laborCost = Math.round(((visit.onSiteMin + visit.travelMin * 0.6) / 60) * rate(visit.tech));
  const cost = laborCost + chemicalCost;

  const contract = contractFor(siteById(visit.siteId));
  let revenue, billType;
  if (visit.visitType === 'AC') {
    revenue = contract.emergencyCallPrice; billType = 'Acil Çağrı';
  } else if (visit.visitType === 'ES') {
    revenue = contract.extraVisitPrice; billType = 'Ek Servis';
  } else {
    revenue = Math.round(share); billType = 'Sözleşme Kapsamı';
  }

  const margin = revenue > 0 ? Math.round(((revenue - cost) / revenue) * 1000) / 10 : 0;
  return { chemicalCost, laborCost, cost, revenue, margin, billType };
}

/* ------------------------------------------------------------------ grouping */

/** Completed visits grouped by site + month — the unit an invoice is cut from. */
export function billableGroups() {
  const groups = new Map();
  for (const visit of getVisits()) {
    const gkey = `${visit.siteId}|${visit.monthKey}`;
    if (!groups.has(gkey)) {
      groups.set(gkey, { siteId: visit.siteId, company: visit.company, siteName: visit.siteName,
        city: visit.city, monthKey: visit.monthKey, monthLabel: monthLabel(visit.monthKey), visits: [] });
    }
    groups.get(gkey).visits.push(visit);
  }
  return [...groups.values()].map(summariseGroup)
    .sort((a, b) => (b.monthKey.localeCompare(a.monthKey)) || a.siteId.localeCompare(b.siteId));
}

function summariseGroup(group) {
  const covered = group.visits.filter((v) => COVERED.has(v.visitType)).length;
  const contract = contractFor(siteById(group.siteId));
  const share = contract.monthlyPrice / Math.max(1, covered);

  const lines = group.visits.map((visit) => {
    const b = visitBilling(visit, share);
    return { visit, ...b };
  });

  const revenue = lines.reduce((s, l) => s + l.revenue, 0);
  const cost = lines.reduce((s, l) => s + l.cost, 0);
  const chemicalCost = lines.reduce((s, l) => s + l.chemicalCost, 0);
  const laborCost = lines.reduce((s, l) => s + l.laborCost, 0);
  const chemApps = group.visits.reduce((s, v) => s + v.chemicals.length, 0);

  return {
    ...group, lines, contract,
    invoiceNo: invoiceNo(group.siteId, group.monthKey),
    visitCount: group.visits.length,
    chemApps,
    revenue, cost, chemicalCost, laborCost,
    margin: revenue > 0 ? Math.round(((revenue - cost) / revenue) * 1000) / 10 : 0,
    // Last visit of the month is the invoice/delivery date.
    date: group.visits[group.visits.length - 1].date
  };
}

export function groupFor(siteId, monthKey) {
  return billableGroups().find((g) => g.siteId === siteId && g.monthKey === monthKey) || null;
}

/* -------------------------------------------------------- invoice assembly */

/**
 * Build a full invoice object from a site+month group. Shape is a superset of
 * the hand-seeded invoices in seed.js, so renderFinance() and the profitability
 * bars accept it unchanged; the extra fields drive the printable document.
 */
export function invoiceFromGroup(group) {
  const site = siteById(group.siteId);
  const contract = group.contract;
  const kdvRate = 0.20; // KDV (Turkish VAT)
  const subtotal = group.revenue;
  const kdv = Math.round(subtotal * kdvRate);

  const lineItems = group.lines.map((l) => ({
    visitId: l.visit.id,
    date: l.visit.date,
    visitType: l.visit.visitType,
    visitTypeName: visitTypeName(l.visit.visitType),
    tech: l.visit.tech,
    billType: l.billType,
    chemicals: l.visit.chemicals.length,
    irsaliyeNo: l.visit.chemicals.length ? irsaliyeNo(l.visit) : null,
    laborCost: l.laborCost,
    chemicalCost: l.chemicalCost,
    cost: l.cost,
    amount: l.revenue,
    margin: l.margin
  }));

  return {
    id: group.invoiceNo,
    siteId: group.siteId,
    company: group.company,
    name: group.siteName,
    city: group.city,
    monthKey: group.monthKey,
    monthLabel: group.monthLabel,
    date: group.date,
    // renderFinance fields:
    amount: subtotal,
    laborCost: group.laborCost,
    chemicalCost: group.chemicalCost,
    margin: group.margin,
    duration: `${group.visits.reduce((s, v) => s + v.onSiteMin, 0)} dk`,
    status: 'draft',
    description: `${group.monthLabel} · ${group.visitCount} ziyaret konsolide faturası`,
    // extra billing detail:
    generated: true,
    synthetic: !!contract.synthetic,
    contract,
    subtotal,
    kdvRate,
    kdv,
    total: subtotal + kdv,
    visitIds: group.visits.map((v) => v.id),
    irsaliyeRefs: lineItems.filter((l) => l.irsaliyeNo).map((l) => l.irsaliyeNo),
    lineItems
  };
}

/** Delivery-note (irsaliye) view-model for a single visit's chemical usage. */
export function irsaliyeFromVisit(visit) {
  const site = siteById(visit.siteId);
  const contract = contractFor(site);
  return {
    no: irsaliyeNo(visit),
    date: visit.date,
    visitId: visit.id,
    tech: visit.tech,
    company: visit.company,
    siteName: visit.siteName,
    city: visit.city,
    taxOffice: contract.taxOffice,
    taxNo: contract.taxNo,
    synthetic: !!contract.synthetic,
    lines: visit.chemicals.map((c, i) => ({
      no: i + 1,
      name: c.name,
      quantity: c.quantity,
      unit: c.unit,
      area: c.area,
      chemicalId: c.chemicalId
    })),
    hasChemicals: visit.chemicals.length > 0
  };
}

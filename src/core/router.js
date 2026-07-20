// View routing and the top-level render pass.
// Extracted from app.js (Phase 0a-3).

import { $, $$ } from '../core/dom.js';
import { save, state } from '../core/state.js';
import { names } from '../data/catalog.js';
import { applyRoleAccess } from '../core/roles.js';
import { renderDashboard } from '../views/dashboard.js';
import { renderSites } from '../views/sites.js';
import { renderWork } from '../views/work.js';
import { renderTeam } from '../views/team.js';
import { renderAiPredictions, renderInsights } from '../views/insights.js';
import { renderReports } from '../views/reports.js';
import { renderMobileRoute } from '../views/mobile.js';
import { renderInventory } from '../views/inventory.js';
import { renderFinance } from '../views/finance.js';

export function setView(view){
  state.view=view;
  save();
  $$('.view').forEach(x=>x.classList.toggle('active',x.id===view));
  $$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
  $('#pageCrumb').textContent=names[view] || "Genel bakış";
  window.scrollTo({top:0,behavior:'smooth'});
  
  if (view === 'sites') {
    renderSites();
  } else if (view === 'work') {
    renderWork();
  } else if (view === 'mobileSim') {
    renderMobileRoute();
  } else if (view === 'inventory') {
    renderInventory();
  } else if (view === 'finance') {
    renderFinance();
  }
}

export function render(){
  renderDashboard();
  renderSites();
  renderWork();
  renderTeam();
  renderInsights();
  renderReports();
  renderAiPredictions();
  renderInventory();
  renderFinance();
  setView(state.view);
  applyRoleAccess();
}

// Company Detail Page & Tabs Management

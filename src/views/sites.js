// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { recalculateSiteStats, state } from '../core/state.js';
import { stateLabel } from '../data/catalog.js';

export function renderSites(){
  const query=$('#siteSearch')?.value.toLocaleLowerCase('tr')||'';
  const filter=$('[data-site-filter].active')?.dataset.siteFilter||'all';
  
  state.sites.forEach(recalculateSiteStats);
  
  // Calculate dynamic filter counts
  const totalCount = state.sites.length;
  const riskCount = state.sites.filter(s => s.state === 'risk').length;
  const watchCount = state.sites.filter(s => s.state === 'watch').length;
  const healthyCount = state.sites.filter(s => s.state === 'healthy').length;
  
  // Update button counters in DOM dynamically
  const allBtn = $('[data-site-filter="all"] b');
  if (allBtn) allBtn.textContent = totalCount;
  const riskBtn = $('[data-site-filter="risk"] b');
  if (riskBtn) riskBtn.textContent = riskCount;
  const watchBtn = $('[data-site-filter="watch"] b');
  if (watchBtn) watchBtn.textContent = watchCount;
  const healthyBtn = $('[data-site-filter="healthy"] b');
  if (healthyBtn) healthyBtn.textContent = healthyCount;
  
  const sites=state.sites.filter(s=>(filter==='all'||s.state===filter)&&(`${s.company} ${s.name}`.toLocaleLowerCase('tr').includes(query)));
  
  $('#siteTable').innerHTML=sites.map(s=>`
    <tr>
      <td>
        <div class="site-cell" data-site-id="${s.id}" style="cursor:pointer;">
          <span class="site-logo" style="background:${s.color}">${s.company.slice(0,2).toUpperCase()}</span>
          <span class="site-name"><b>${s.name}</b><span>${s.company} · ${s.city}</span></span>
        </div>
      </td>
      <td><span class="status-chip ${s.state==='healthy'?'healthy':s.state==='risk'?'critical':'warning'}">${stateLabel[s.state]}</span></td>
      <td><span class="score ${s.state}"><i></i>${s.score}/100</span></td>
      <td>${s.last}</td>
      <td>${s.issues?`<b>${s.issues} açık</b>`:'—'}</td>
      <td>${s.next}</td>
      <td><button class="row-action" data-site-id="${s.id}">•••</button></td>
    </tr>
  `).join('')||'<tr><td colspan="7">Aramanızla eşleşen tesis bulunamadı.</td></tr>';
}

// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { state } from '../core/state.js';
import { techData } from '../data/seed.js';

export function renderTeam(){
  const d=techData[state.selectedTech];
  $('#techDetail').innerHTML=`
    <div class="tech-summary">
      <span class="tech-avatar" style="background:${d[5]}">${d[0]}</span>
      <div><b>${state.selectedTech}</b><span>${d[1]} · ${d[2]}</span></div>
    </div>
    <div class="tech-rows">
      <div><span>Mevcut durum</span><b>${d[1]}</b></div>
      <div><span>Servis doğrulaması</span><b>${d[3]}</b></div>
      <div><span>Son konum sinyali</span><b>${d[4]}</b></div>
      <div><span>Bugünkü rota</span><b>3 / 4 tamamlandı</b></div>
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
}

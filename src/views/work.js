// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { state } from '../core/state.js';
import { chemicalDatabase, visitTypes } from '../data/catalog.js';

export function renderWork(filter='all'){
  let sourceList = state.work;
  if (state.currentUser && state.currentUser.role === 'tech') {
    sourceList = sourceList.filter(w => w.tech === state.currentUser.name);
  }
  
  // Calculate dynamic stats based on sourceList
  const allCount = sourceList.filter(w => !w.completed).length;
  const criticalCount = sourceList.filter(w => !w.completed && w.priority === 'critical').length;
  const scheduledCount = sourceList.filter(w => !w.completed && (w.due.includes('Bugün') || w.due.includes('13 Tem') || w.due.includes('Tem'))).length;
  const completedCount = sourceList.filter(w => w.completed).length;
  const siteAlerts = state.sites.filter(s => s.issues > 0).length;

  if ($('#workStatAll')) $('#workStatAll').textContent = allCount;
  if ($('#workStatCritical')) $('#workStatCritical').textContent = criticalCount;
  if ($('#workStatScheduled')) $('#workStatScheduled').textContent = scheduledCount;
  if ($('#workStatCompleted')) $('#workStatCompleted').textContent = completedCount;
  if ($('#sidebarWorkCount')) $('#sidebarWorkCount').textContent = allCount;
  if ($('#siteAlertCount')) $('#siteAlertCount').textContent = siteAlerts;

  const list=sourceList.filter(w=> {
    if (w.completed) return filter === 'completed';
    if (filter === 'completed') return false;
    return filter==='all'||(filter==='critical'?w.priority==='critical':filter==='scheduled'?w.type==='Planlı servis':false);
  });
  
  $('#workListTitle').textContent={all:'Açık iş emirleri',critical:'Kritik öncelikli işler',scheduled:'Bugün planlanan servisler',completed:'Tamamlanan işler'}[filter];
  
  $('#workList').innerHTML=list.map(w=>`
    <div class="work-item" data-work="${w.id}">
      <span class="work-priority ${w.priority}"></span>
      <div class="work-main"><b>${w.title}</b><p>${w.site} · ${w.id}</p></div>
      <div class="work-meta">
        <span class="status-chip ${w.completed?'healthy':w.priority}">${w.completed?'Tamamlandı':w.type}</span>
        ${w.visitType ? `<span class="visit-type-chip" style="display:inline-block; font-size:9px; padding:2px 6px; border-radius:4px; font-weight:700; background:#f0f4ff; color:#4361a8; border:1px solid #d8e2f8; margin-left:6px;">${(visitTypes.find(v=>v.code===w.visitType)||{}).name || w.visitType}</span>` : ''}
        <small>${w.due}</small>
      </div>
    </div>
  `).join('') || `<p class="empty">${filter==='completed'?'Henüz tamamlanan bir iş emri bulunmuyor.':'Bu görünümde açık iş emri bulunmuyor.'}</p>`;
  
  renderTask();
}

export function renderTask(){
  const w=state.work.find(x=>x.id===state.selectedWork)||state.work[0];
  if (!w) {
    $('#taskDetail').innerHTML = '<p class="empty">Seçili iş emri bulunmuyor.</p>';
    return;
  }
  
  const site = state.sites.find(s => s.id === w.siteId) || state.sites[0];
  const visitChems = (site.chemicalsUsed || []).filter(cu => cu.workOrderId === w.id);
  
  const chemsListHtml = visitChems.map((cu, idx) => {
    const chem = chemicalDatabase.find(c => c.id === cu.chemicalId);
    const chemName = chem ? chem.name : 'Kimyasal';
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--soft); border:1px solid var(--line); border-radius:6px; padding:6px 10px; margin-bottom:6px; font-size:12px;">
        <div>
          <b>${chemName}</b><br>
          <small class="text-muted">Miktar: ${cu.quantity} · Alan: ${cu.area} ${cu.notes ? `· ${cu.notes}` : ''}</small>
        </div>
        ${w.completed ? '' : `<button class="text-btn delete-task-chem-btn" data-chem-index="${idx}" style="color:var(--red); font-size:16px; font-weight:700; border:none; background:none; cursor:pointer;">×</button>`}
      </div>
    `;
  }).join('') || '<p class="text-muted" style="font-size:11px; margin-bottom:12px;">Bu ziyarette henüz kullanılan kimyasal girilmedi.</p>';

  const chemFormHtml = w.completed ? '' : `
    <form id="taskChemicalForm" style="border:1px solid var(--line); border-radius:8px; padding:12px; margin-bottom:14px; background:#fafafa;">
      <p style="font-size:10px; font-weight:700; color:var(--muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">💊 Kullanılan Kimyasal Ekle</p>
      <div style="display:grid; gap:8px;">
        <select required id="taskChemSelect" class="form-select" style="height:32px; font-size:12px; padding:0 6px;">
          <option value="">-- Kimyasal Seçin --</option>
          ${chemicalDatabase.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
          <input required type="text" id="taskChemQty" placeholder="Miktar (Örn: 100 ml)" class="form-input" style="height:32px; font-size:12px;">
          <input required type="text" id="taskChemArea" placeholder="Alan (Örn: 200 m²)" class="form-input" style="height:32px; font-size:12px;">
        </div>
        <input type="text" id="taskChemNotes" placeholder="Açıklama / Notlar" class="form-input" style="height:32px; font-size:12px;">
        <button type="submit" class="secondary-btn" style="height:32px; justify-content:center; padding:0; width:100%;">Kimyasal Ekle</button>
      </div>
    </form>
  `;

  const compBtn = w.completed ? 
    `<button class="secondary-btn" disabled style="width:100%;">✓ Servis Tamamlandı</button>` : 
    `<button class="primary-btn" id="completeWork">✓ Tamamlandı olarak işaretle</button>`;
    
  $('#taskDetail').innerHTML=`
    <span class="status-chip ${w.completed?'healthy':w.priority}">${w.completed?'Tamamlandı':w.type}</span>
    <h2>${w.title}</h2>
    <p>${w.description}</p>
    <div class="detail-list" style="margin-bottom:14px;">
      <div><span>Tesis</span><b>${w.site.split(' · ')[1]}</b></div>
      <div><span>Ziyaret Türü</span><b>${(visitTypes.find(v=>v.code===w.visitType)||{}).name || 'Belirtilmedi'}</b></div>
      <div><span>Atanan teknisyen</span><b>${w.tech}</b></div>
      <div><span>Hedef zaman</span><b>${w.due}</b></div>
      <div><span>İş emri</span><b>${w.id}</b></div>
    </div>
    
    <div style="margin-bottom:14px;">
      <p class="overline">KULLANILAN KİMYASALLAR / MALZEMELER</p>
      <div style="margin-top:6px;">
        ${chemsListHtml}
      </div>
    </div>
    
    ${chemFormHtml}
    
    <div style="display:grid; gap:8px;">
      ${compBtn}
      <button class="secondary-btn" data-site-id="${w.siteId}">⌖ Tesis Kat Planını Aç</button>
    </div>
  `;
}

// Facility detail page: profile, tabs, floor plan, stations.
// Extracted from app.js (Phase 0a-3).

import { $, $$ } from '../core/dom.js';
import { recalculateSiteStats, state } from '../core/state.js';
import { ui } from '../core/session.js';
import { chemicalDatabase, equipmentStatusCodes, equipmentTypes, pestDatabase, stateLabel } from '../data/catalog.js';
import { setView } from '../core/router.js';
import { renderClientAnalytics } from '../views/insights.js';

export function showCompanyDetail(siteId) {
  ui.activeSiteId = siteId;
  ui.activeStationCode = null;
  const site = state.sites.find(s => s.id === siteId);
  if (!site) return;
  
  recalculateSiteStats(site);
  
  // Page headers
  $('#compParentCompany').textContent = site.company.toUpperCase();
  $('#compHeaderName').textContent = site.name;
  $('#compHeaderMeta').textContent = `${site.city} · Son Servis: ${site.last} · Sıradaki: ${site.next}`;
  
  // Left Sidebar Profile Card
  const avatar = $('#compAvatarLogo');
  if (avatar) avatar.textContent = site.company.slice(0, 2).toUpperCase();
  
  $('#compProfileName').textContent = site.company;
  
  const sectorBadge = $('#compSectorBadge');
  if (sectorBadge) {
    sectorBadge.textContent = site.sector || "Genel Hizmet";
    sectorBadge.className = `status-chip ${site.state === 'healthy' ? 'healthy' : site.state === 'risk' ? 'critical' : 'warning'}`;
  }
  
  $('#compHealthScore').textContent = site.score;
  $('#compHealthStateText').textContent = stateLabel[site.state];
  
  const scoreGauge = $('#compScoreGauge');
  if (scoreGauge) {
    scoreGauge.style.borderLeft = `5px solid ${site.state === 'healthy' ? 'var(--green)' : site.state === 'risk' ? 'var(--red)' : 'var(--amber)'}`;
  }
  
  // Tab 1: Overview stats
  const total = site.stations.length;
  const checked = site.stations.filter(s => s.checked).length;
  
  $('#compOverviewTotalStations').textContent = total;
  $('#compOverviewCheckedStations').textContent = `${checked}/${total}`;
  $('#compOverviewActiveIssues').textContent = site.issues;
  
  // Calculate and display control rate dynamically
  const rate = total > 0 ? Math.round((checked / total) * 100) : 0;
  const ratePercentEl = $('#compControlRatePercent');
  const rateBarEl = $('#compControlRateBar');
  if (ratePercentEl) ratePercentEl.textContent = `${rate}%`;
  if (rateBarEl) rateBarEl.style.width = `${rate}%`;

  $('#compContactName').textContent = site.contact ? site.contact.name : "Temsilci Yok";
  $('#compContactPhone').textContent = site.contact ? site.contact.phone : "—";
  $('#compContactEmail').textContent = site.contact ? site.contact.email : "—";

  // Contract Details
  const contractPeriodEl = $('#compContractPeriod');
  const serviceFrequencyEl = $('#compServiceFrequency');
  const addressEl = $('#compAddress');
  if (contractPeriodEl) contractPeriodEl.textContent = (site.contract && site.contract.period) || (site.id === 's1' ? '01.01.2026 - 31.12.2026' : (site.id === 's2' ? '15.02.2026 - 15.02.2027' : '01.03.2026 - 01.03.2027'));
  if (serviceFrequencyEl) serviceFrequencyEl.textContent = site.serviceFrequency || (site.id === 's1' ? '15 Günde Bir (Ayda 2 Servis)' : (site.id === 's3' ? 'Haftalık (Ayda 4 Servis)' : 'Aylık Periyodik Koruma'));
  if (addressEl) addressEl.textContent = site.address || (site.id === 's1' ? 'Gebze Organize Sanayi Bölgesi, Kocaeli' : (site.id === 's2' ? 'Hadımköy Nakliyeciler Sitesi, İstanbul' : 'Ataşehir Sağlık Kampüsü, İstanbul'));
  
  // Tab 2: Map Stats
  const checkedClean = site.stations.filter(s => s.checked && s.status === 'clean').length;
  const checkedActivity = site.stations.filter(s => s.checked && s.status === 'activity').length;
  const damaged = site.stations.filter(s => s.checked && (s.status === 'damaged' || s.status === 'missing')).length;
  const unchecked = site.stations.filter(s => !s.checked).length;
  
  const totalLabel = document.querySelector('#paneCompMap #facilityTotalStations');
  const cleanLabel = document.querySelector('#paneCompMap #facilityCheckedClean');
  const actLabel = document.querySelector('#paneCompMap #facilityCheckedActivity');
  const dmgLabel = document.querySelector('#paneCompMap #facilityDamaged');
  const unLabel = document.querySelector('#paneCompMap #facilityUnchecked');
  
  if (totalLabel) totalLabel.textContent = total;
  if (cleanLabel) cleanLabel.textContent = checkedClean;
  if (actLabel) actLabel.textContent = checkedActivity;
  if (dmgLabel) dmgLabel.textContent = damaged;
  if (unLabel) unLabel.textContent = unchecked;
  
  // Render nodes
  renderStationMarkers(site.stations);
  
  // Render applied methods
  renderCompanyMethods(site);
  
  // Render files table
  renderCompanyFiles(site);

  // Render stations tracking table
  renderCompanyStationsTable(site);

  // Render recommendations table
  renderCompanyRecommendations(site);

  // Render chemical usage tab
  renderChemicalUsage(site);
  
  // Render service scope in overview
  renderServiceScope(site);
  
  // Reset form panel
  $('#stationDetailsEmpty').classList.remove('hidden');
  $('#stationDetailsContent').classList.add('hidden');
  
  // Reset active filter button styling
  $$('[data-station-filter]').forEach(x => x.classList.toggle('active', x.dataset.stationFilter === 'all'));
  
  switchCompanyTab('overview');
  setView('companyDetail');
}

export function switchCompanyTab(tabId) {
  $$('.comp-nav-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.compTab === tabId);
  });
  
  const tabPanes = {
    overview: 'paneCompOverview',
    map: 'paneCompMap',
    methods: 'paneCompMethods',
    files: 'paneCompFiles',
    recommendations: 'paneCompRecommendations',
    chemicals: 'paneCompChemicals',
    analytics: 'paneCompAnalytics'
  };
  
  Object.entries(tabPanes).forEach(([t, id]) => {
    const pane = $(`#${id}`);
    if (pane) pane.classList.toggle('hidden', t !== tabId);
  });

  if (tabId === 'analytics') {
    renderClientAnalytics();
  }
}

export function renderCompanyMethods(site) {
  const container = $('#compMethodsContainer');
  if (!container) return;
  if (!site.methods) site.methods = [];
  
  container.innerHTML = site.methods.map(m => `
    <div class="method-card">
      <div class="method-info">
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
      </div>
      <span class="method-status-badge ${m.active ? 'active' : 'inactive'}">
        ${m.active ? 'Aktif Uygulama' : 'Aktif Değil'}
      </span>
    </div>
  `).join('') || '<p class="empty">Bu tesis için kayıtlı mücadele yöntemi bulunmuyor.</p>';
}

export function renderCompanyFiles(site) {
  const tbody = $('#compFilesTableBody');
  if (!tbody) return;
  if (!site.files) site.files = [];
  
  const filesCountLabel = $('#compFilesCount');
  if (filesCountLabel) filesCountLabel.textContent = site.files.length;
  
  tbody.innerHTML = site.files.map((f, index) => {
    const category = f.category || (f.name.includes('Sozlesme') || f.name.includes('Protokol') ? 'Sözleşme' : (f.name.includes('Risk') ? 'Risk Analizi' : 'SDS'));
    
    let badgeClass = 'secondary';
    if (category === 'Sözleşme') badgeClass = 'blue';
    else if (category === 'SDS') badgeClass = 'warning';
    else if (category === 'Risk Analizi') badgeClass = 'violet';
    else if (category === 'Biyosidal İzin') badgeClass = 'healthy';
    else if (category === 'Servis') badgeClass = 'green';
    
    return `
      <tr>
        <td><b>${f.name}</b></td>
        <td><span class="status-chip ${badgeClass}" style="font-size:9px; font-weight:700;">${category}</span></td>
        <td>${f.size}</td>
        <td>${f.date}</td>
        <td>
          <button class="text-btn download-file-btn" data-file-index="${index}" style="padding:0; font-size:11px;">İndir ↓</button>
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="5" class="empty" style="text-align:center;">Henüz yüklenmiş belge bulunmuyor.</td></tr>';
}

export function renderCompanyRecommendations(site) {
  const tbody = $('#compRecommendationsTableBody');
  if (!tbody) return;
  if (!site.recommendations) site.recommendations = [];
  
  const countLabel = $('#compRecsCount');
  if (countLabel) countLabel.textContent = site.recommendations.filter(r => r.status === 'open').length;
  
  tbody.innerHTML = site.recommendations.map((r, index) => {
    const isClosed = r.status === 'resolved';
    const statusText = isClosed ? 'Giderildi' : 'Açık Bulgu';
    const badgeClass = isClosed ? 'healthy' : 'critical';
    
    return `
      <tr>
        <td><b>${r.desc}</b></td>
        <td><span class="status-chip secondary" style="font-size:9px; font-weight:700;">${r.category}</span></td>
        <td>${r.assignee}</td>
        <td><small class="text-muted">${r.date}</small></td>
        <td><small>${r.due}</small></td>
        <td><span class="status-chip ${badgeClass}">${statusText}</span></td>
        <td>
          <button class="text-btn toggle-rec-btn" data-rec-index="${index}" style="padding:0; font-size:11px; font-weight:700; color:${isClosed ? 'var(--blue)' : 'var(--green)'}">
            ${isClosed ? 'Aç Geri ↺' : 'Giderildi Yap ✓'}
          </button>
        </td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="7" class="empty" style="text-align:center;">Henüz açılmış bir öneri kaydı bulunmuyor.</td></tr>';
}

export function getStationArea(x, y) {
  const px = (x / 100) * 800;
  const py = (y / 100) * 500;
  if (px >= 20 && px < 300 && py >= 20 && py < 220) return "Hammadde Deposu";
  if (px >= 300 && px < 550 && py >= 20 && py < 140) return "Ofisler & Laboratuvar";
  if (px >= 550 && px <= 780 && py >= 20 && py < 220) return "Sosyal Tesisler";
  if (px >= 20 && px < 470 && py >= 220 && py <= 480) return "Ana Üretim Hattı";
  if (px >= 470 && px <= 780 && py >= 220 && py <= 480) return "Ambalaj & Sevkiyat";
  return "Dış Çevre / Genel";
}

export function renderCompanyStationsTable(site) {
  const container = $('#compStationsTableBody');
  if (!container) return;
  
  const typeLabels = {};
  Object.entries(equipmentTypes).forEach(([key, val]) => { typeLabels[key] = val.name; });
  
  const statusLabels = {};
  Object.entries(equipmentStatusCodes).forEach(([key, val]) => { statusLabels[key] = val.name; });

  const baitLabels = {
    intact: 'Sağlam (Tüketilmedi)',
    consumed: 'Tüketildi',
    replaced: 'Yem Yenilendi',
    missing: 'Yem Eksik',
    missing_bait: 'Yem Yok / Eksik'
  };

  const pestLabels = {
    none: 'Yok',
    mouse: 'Fare',
    rat: 'Sıçan',
    cockroach: 'Hamamböceği',
    fly: 'Sinek',
    other: 'Diğer'
  };
  // Pre-populate pestLabels from pestDatabase
  Object.values(pestDatabase).forEach(category => {
    category.forEach(p => {
      pestLabels[p.code] = p.name;
    });
  });

  container.innerHTML = site.stations.map(s => {
    const planted = s.plantedDate || "15.01.2025";
    const lastCheck = s.checked ? (s.lastControl || "12 Tem 2026") : "—";
    const inspector = s.checked ? (s.controlledBy || "Ayşe Demir") : "—";
    const area = getStationArea(s.x, s.y);
    const typeLabel = typeLabels[s.type] || s.type;
    const statusText = statusLabels[s.status] || s.status;
    
    let statusClass = 'warning';
    if (s.checked) {
      if (s.status === 'clean') statusClass = 'healthy';
      else if (s.status === 'activity') statusClass = 'critical';
      else statusClass = 'warning';
    }

    let hasPests = s.pestCount > 0;
    let findings = '—';
    if (s.checked) {
      if (s.findings && s.findings.length > 0) {
        findings = s.findings.map(f => {
          const name = pestLabels[f.pestCode] || f.pestCode;
          if (f.count > 0) hasPests = true;
          return `${name} (${f.count} Adet)`;
        }).join(', ');
      } else {
        const name = pestLabels[s.pestType] || s.pestType;
        const countDesc = s.pestCount > 0 ? ` (${s.pestCount} Adet)` : '';
        findings = s.pestType !== 'none' ? `${name}${countDesc}` : 'Yok';
      }
    }
    const baitText = s.checked ? (baitLabels[s.baitStatus] || s.baitStatus) : '—';
    
    return `
      <tr onclick="showStationDetail('${s.code}'); switchCompanyTab('map');" style="cursor:pointer;">
        <td><strong>${s.code}</strong></td>
        <td>${typeLabel}</td>
        <td><span style="color:#55616b; font-size:11px; font-weight:600;">📍 ${area}</span></td>
        <td><small class="text-muted">${planted}</small></td>
        <td><small>${lastCheck}</small></td>
        <td><b>${inspector}</b></td>
        <td><small>${baitText}</small></td>
        <td><span class="${hasPests ? 'attention' : ''}">${findings}</span></td>
        <td><span class="status-chip ${statusClass}">${statusText}</span></td>
      </tr>
    `;
  }).join('');
}

export function renderStationMarkers(stations, filterType = 'all') {
  const container = $('#stationMarkersLayer');
  if (!container) return;
  container.innerHTML = '';
  
  const isHeatmap = $('#heatmapToggleBtn') ? $('#heatmapToggleBtn').checked : false;
  
  stations.forEach(s => {
    if (filterType !== 'all' && s.type !== filterType) return;
    
    const marker = document.createElement('div');
    marker.className = `station-marker ${s.checked ? s.status : 'unchecked'}`;
    if (s.code === ui.activeStationCode) marker.classList.add('selected');
    
    marker.style.left = `${s.x}%`;
    marker.style.top = `${s.y}%`;
    marker.textContent = s.code;
    marker.title = `${s.code} (${s.type.toUpperCase()}) - ${s.checked ? 'Kontrol Edildi' : 'Bekliyor'}`;
    marker.dataset.stationCode = s.code;
    
    // Heat map density visualization
    if (isHeatmap) {
      marker.classList.add('heatmap-mode');
      if (s.status === 'activity') {
        const radius = s.pestCount > 10 ? 45 : (s.pestCount > 5 ? 32 : 24);
        const color = s.pestCount > 10 ? 'rgba(215, 68, 62, 0.8)' : 'rgba(217, 119, 6, 0.7)';
        marker.style.boxShadow = `0 0 ${radius}px ${radius/2}px ${color}`;
        marker.style.border = '2px solid white';
      } else if (s.status === 'clean') {
        marker.style.boxShadow = '0 0 16px 8px rgba(21, 149, 106, 0.45)';
      } else if (s.status === 'damaged' || s.status === 'missing') {
        marker.style.boxShadow = '0 0 16px 8px rgba(119, 129, 139, 0.45)';
      }
    }
    
    container.appendChild(marker);
  });
}

export function showStationDetail(code) {
  ui.activeStationCode = code;
  const site = state.sites.find(s => s.id === ui.activeSiteId);
  if (!site) return;
  const s = site.stations.find(st => st.code === code);
  if (!s) return;
  
  $$('.station-marker').forEach(m => m.classList.toggle('selected', m.dataset.stationCode === code));
  
  $('#stationDetailsEmpty').classList.add('hidden');
  $('#stationDetailsContent').classList.remove('hidden');
  
  $('#detStationCode').textContent = s.code;
  
  const statusLabels = { clean: 'Temiz', activity: 'Aktivite Var', damaged: 'Hasarlı', missing: 'Eksik', unchecked: 'Kontrol Edilmedi' };
  const badgeClass = s.checked ? (s.status === 'clean' ? 'healthy' : (s.status === 'activity' ? 'critical' : 'warning')) : 'warning';
  
  $('#detStationStatus').className = `status-chip ${badgeClass}`;
  $('#detStationStatus').textContent = s.checked ? statusLabels[s.status] : 'Kontrol Edilmedi';
  
  const typeNames = { rodent: 'Kemirgen Yem İstasyonu', crawler: 'Yürüyen Haşere Monitörü', flying: 'Uçan Haşere Cihazı', insect_light_trap: 'UV Işıklı Cihaz (ILT)' };
  $('#detStationType').textContent = typeNames[s.type] || s.type;
  
  $('#inpBaitStatus').value = s.baitStatus || 'intact';
  $('#inpPestType').value = s.pestType || 'none';
  $('#inpPestCount').value = s.pestCount || 0;
  $('#inpStatus').value = s.checked ? s.status : 'clean';
  $('#inpNotes').value = s.notes || '';
}

// Mobile App Workflow

export function renderChemicalUsage(site) {
  const tbody = $('#compChemicalsTableBody');
  if (!tbody) return;
  if (!site.chemicalsUsed) site.chemicalsUsed = [];
  
  const countLabel = $('#compChemicalsCount');
  if (countLabel) countLabel.textContent = site.chemicalsUsed.length;
  
  tbody.innerHTML = site.chemicalsUsed.map((cu, index) => {
    const chem = chemicalDatabase.find(c => c.id === cu.chemicalId);
    const chemName = chem ? chem.name : 'Bilinmeyen Kimyasal';
    const chemIngredient = chem ? chem.activeIngredient : '—';
    const chemCategory = chem ? chem.category : '—';
    const chemDosage = chem ? chem.dosagePerM2 : '—';
    
    return `
      <tr>
        <td><b>${chemName}</b><br><small class="text-muted">${chemIngredient}</small></td>
        <td><span class="status-chip secondary" style="font-size:9px; font-weight:700;">${chemCategory}</span></td>
        <td>${cu.quantity}</td>
        <td>${cu.area}</td>
        <td><small class="text-muted">${chemDosage}</small></td>
        <td>${cu.tech}</td>
        <td><small>${cu.date}</small></td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="7" class="empty" style="text-align:center;">Henüz kimyasal kullanım kaydı bulunmuyor.</td></tr>';
}

export function renderServiceScope(site) {
  const container = $('#compServiceScopeContainer');
  if (!container) return;
  if (!site.serviceScope) {
    container.innerHTML = '<p class="text-muted" style="font-size:12px;">Bu tesis için hizmet kapsamı henüz tanımlanmadı.</p>';
    return;
  }
  const scope = site.serviceScope;
  const rows = [
    ['Dış Alan Kemirgen Kontrolü', scope.outdoorRodent],
    ['İç Alan Kemirgen Kontrolü', scope.indoorRodent],
    ['Yürüyen Haşere Kontrolü', scope.crawlingPest],
    ['Uçan Haşere Kontrolü', scope.flyingPest],
    ['Depo Zararlıları Kontrolü', scope.storagePest]
  ];
  container.innerHTML = `
    <div class="table-panel" style="border:1px solid var(--line); border-radius:8px; overflow:auto;">
      <table>
        <thead><tr><th>Hizmet Türü</th><th>Sıklık</th><th>Not</th></tr></thead>
        <tbody>
          ${rows.map(([label, data]) => {
            if (!data) return '';
            return `<tr><td><b>${label}</b></td><td>Ayda ${data.frequency} ziyaret</td><td><small class="text-muted">${data.seasonNote || '—'}</small></td></tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
  
  // Render contract pricing if available
  const pricing = $('#compPricingContainer');
  if (pricing && site.contract) {
    const c = site.contract;
    pricing.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; margin-top:12px;">
        <div class="metric-card" style="padding:10px; min-height:auto; display:flex; align-items:center; justify-content:center; box-shadow:none; border:1px solid var(--line); background:var(--soft);">
          <div style="text-align:center;"><span>Yıllık Bedel</span><strong style="font-size:15px; color:var(--green); margin:0;">₺${c.annualPrice?.toLocaleString('tr-TR') || '—'}</strong></div>
        </div>
        <div class="metric-card" style="padding:10px; min-height:auto; display:flex; align-items:center; justify-content:center; box-shadow:none; border:1px solid var(--line); background:var(--soft);">
          <div style="text-align:center;"><span>Aylık Bedel</span><strong style="font-size:15px; margin:0;">₺${c.monthlyPrice?.toLocaleString('tr-TR') || '—'}</strong></div>
        </div>
        <div class="metric-card" style="padding:10px; min-height:auto; display:flex; align-items:center; justify-content:center; box-shadow:none; border:1px solid var(--line); background:var(--soft);">
          <div style="text-align:center;"><span>Ek Servis</span><strong style="font-size:15px; margin:0;">₺${c.extraVisitPrice?.toLocaleString('tr-TR') || '—'}</strong></div>
        </div>
        <div class="metric-card" style="padding:10px; min-height:auto; display:flex; align-items:center; justify-content:center; box-shadow:none; border:1px solid var(--line); background:var(--soft);">
          <div style="text-align:center;"><span>Acil Çağrı</span><strong style="font-size:15px; color:var(--red); margin:0;">₺${c.emergencyCallPrice?.toLocaleString('tr-TR') || '—'}</strong></div>
        </div>
      </div>
      <div style="margin-top:10px; display:flex; gap:16px; font-size:11px; color:var(--muted); justify-content:center;">
        <span><b>Vergi Dairesi:</b> ${c.taxOffice || '—'}</span>
        <span><b>Vergi No:</b> ${c.taxNo || '—'}</span>
      </div>
    `;
  }
}

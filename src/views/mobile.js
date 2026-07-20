// Mobile technician simulator: route, job detail, QR, inspection.
// Extracted from app.js (Phase 0a-3).

import { $, $$, toast } from '../core/dom.js';
import { state } from '../core/state.js';
import { ui } from '../core/session.js';
import { chemicalDatabase } from '../data/catalog.js';
import { initSignaturePads } from '../ui/signature.js';

export function renderMobileRoute() {
  const container = $('#mobileWorkOrdersList');
  if (!container) return;
  
  let list = state.work;
  if (state.currentUser && state.currentUser.role === 'tech') {
    list = list.filter(w => w.tech === state.currentUser.name);
  }
  
  container.innerHTML = list.map(w => {
    const site = state.sites.find(s => s.id === w.siteId) || state.sites[0];
    const statusText = w.completed ? 'Tamamlandı' : (w.status === 'started_by_first_qr' ? 'Çalışma Başladı' : (w.status === 'arrived_gps' ? 'Tesise Varış' : 'Planlandı'));
    const badgeClass = w.completed ? 'success' : (w.status === 'started_by_first_qr' ? 'info' : 'warning');
    
    return `
      <div class="mob-order-item" data-mob-work-id="${w.id}">
        <div class="mob-order-header">
          <span class="status-chip ${badgeClass}">${statusText}</span>
          <small>${w.due}</small>
        </div>
        <h4>${site.company}</h4>
        <p>${site.name}</p>
        <p style="margin-top:4px; font-size:9px; color:#78828d">Teknisyen: ${w.tech}</p>
      </div>
    `;
  }).join('');
}

export function showMobileJobDetail(work) {
  ui.mobJob = work;
  ui.mobArrived = work.status === 'arrived_gps' || work.status === 'started_by_first_qr' || work.completed;
  ui.mobQrStarted = work.status === 'started_by_first_qr' || work.completed;
  
  const site = state.sites.find(s => s.id === work.siteId) || state.sites[0];
  
  // Reset download state for this job unless downloaded earlier
  if (site.downloaded) ui.mobOfflineReady = true;
  else ui.mobOfflineReady = false;
  
  $('#mobJobCompany').textContent = site.company.toUpperCase();
  $('#mobJobSiteName').textContent = site.name;
  $('#mobJobTime').textContent = `Ziyaret: ${work.due} · Teknisyen: ${work.tech}`;
  
  const statusText = work.completed ? 'Tamamlandı' : (work.status === 'started_by_first_qr' ? 'Çalışma Başladı' : (work.status === 'arrived_gps' ? 'Tesise Varış' : 'Planlandı'));
  const badgeClass = work.completed ? 'success' : (work.status === 'started_by_first_qr' ? 'info' : 'warning');
  
  $('#mobJobStatusBadge').className = `status-chip ${badgeClass}`;
  $('#mobJobStatusBadge').textContent = statusText;
  
  // Refresh steps
  // 1. GPS Arrival
  const btnGps = $('#btnMobArrived');
  const indGps = $('#indicatorGpsVerified');
  if (ui.mobArrived) {
    btnGps.classList.add('hidden');
    indGps.classList.remove('hidden');
    if ($('#gpsCoordsText')) {
      $('#gpsCoordsText').textContent = "(GPS Konumu Kayıtlı)";
    }
  } else {
    btnGps.classList.remove('hidden');
    indGps.classList.add('hidden');
    if ($('#gpsCoordsText')) {
      $('#gpsCoordsText').textContent = "";
    }
  }
  
  // 2. QR Start
  const cardQr = $('#cardQrStart');
  const btnQr = $('#btnMobScanFirstQr');
  const indQr = $('#indicatorQrVerified');
  cardQr.classList.toggle('disabled', !ui.mobArrived);
  btnQr.disabled = !ui.mobArrived;
  if (ui.mobQrStarted) {
    btnQr.classList.add('hidden');
    indQr.classList.remove('hidden');
  } else {
    btnQr.classList.remove('hidden');
    indQr.classList.add('hidden');
  }
  
  // 3. Offline Map
  const cardMap = $('#cardOfflineMap');
  const btnViewPlan = $('#btnMobViewPlan');
  const btnDownload = $('#btnMobDownloadOffline');
  const indOffline = $('#indicatorOfflineReady');
  cardMap.classList.toggle('disabled', !ui.mobQrStarted);
  btnViewPlan.disabled = !ui.mobQrStarted;
  btnDownload.disabled = !ui.mobQrStarted;
  if (ui.mobOfflineReady) {
    btnDownload.classList.add('hidden');
    indOffline.classList.remove('hidden');
  } else {
    btnDownload.classList.remove('hidden');
    indOffline.classList.add('hidden');
  }
  $('#mobDownloadProgress').classList.add('hidden');
  
  // 4. Stations List
  const cardStations = $('#cardStationsList');
  cardStations.classList.toggle('disabled', !ui.mobQrStarted);
  
  // 4b. Chemical Usage
  const cardChem = $('#cardMobChemicalUsage');
  if (cardChem) {
    cardChem.classList.toggle('disabled', !ui.mobQrStarted);
  }
  renderMobChemicalsList(site);
  
  const checked = site.stations.filter(s => s.checked).length;
  const isComplete = ui.mobQrStarted && checked === site.stations.length;
  const cardSig = $('#cardSignature');
  if (cardSig) {
    cardSig.classList.toggle('disabled', !isComplete);
  }
  
  renderMobileMiniGrid(site);
  updateSimStepsHighlight();
  
  // Initialize signature canvases if unlocked
  if (isComplete && !work.completed) {
    initSignaturePads();
  }
  
  $('#pageMobileRoute').classList.add('hidden');
  $('#pageMobileJobDetail').classList.remove('hidden');
}

export function updateSimStepsHighlight() {
  $$('.sim-steps-list li').forEach(x => x.classList.remove('active-step'));
  if (!ui.mobArrived) {
    $('#step1').classList.add('active-step');
    $('#step2').classList.add('active-step');
  } else if (!ui.mobQrStarted) {
    $('#step3').classList.add('active-step');
  } else {
    const site = state.sites.find(s => s.id === ui.mobJob.siteId);
    const checkedCount = site ? site.stations.filter(s => s.checked).length : 0;
    const totalCount = site ? site.stations.length : 8;
    if (checkedCount < totalCount) {
      $('#step4').classList.add('active-step');
    } else {
      $('#step5').classList.add('active-step');
    }
  }
}

export function renderMobileMiniGrid(site) {
  const grid = $('#mobStationsMiniGrid');
  if (!grid) return;
  
  const total = site.stations.length;
  const checked = site.stations.filter(s => s.checked).length;
  $('#mobCheckedCount').textContent = `${checked}/${total}`;
  
  grid.innerHTML = site.stations.map(s => {
    let btnClass = 'unchecked';
    if (s.checked) {
      btnClass = s.status === 'clean' ? 'checked-clean' : (s.status === 'activity' ? 'checked-activity' : s.status);
    }
    return `<button class="mob-station-mini-btn ${btnClass}" data-mob-station-code="${s.code}">${s.code}</button>`;
  }).join('');
  
  const isComplete = ui.mobQrStarted && checked === total;
  const cardSig = $('#cardSignature');
  if (cardSig) {
    cardSig.classList.toggle('disabled', !isComplete);
    if (isComplete && !ui.mobJob.completed) {
      initSignaturePads();
    }
  }
  
  // Enable complete form button when all stations checked
  $('#btnMobSaveForm').disabled = !isComplete || ui.mobJob.completed;
}

export function showMobileMap() {
  $('#pageMobileJobDetail').classList.add('hidden');
  $('#pageMobileMap').classList.remove('hidden');
  
  const site = state.sites.find(s => s.id === ui.mobJob.siteId) || state.sites[0];
  const mobileWrapper = $('#mobileBlueprintWrapper');
  const desktopSvg = $('#blueprintWrapper svg').cloneNode(true);
  
  mobileWrapper.innerHTML = '';
  mobileWrapper.appendChild(desktopSvg);
  
  // Render marker layer
  const markerLayer = document.createElement('div');
  markerLayer.className = 'station-markers-layer';
  mobileWrapper.appendChild(markerLayer);
  
  site.stations.forEach(s => {
    const dot = document.createElement('div');
    dot.className = `station-marker ${s.checked ? s.status : 'unchecked'}`;
    dot.style.left = `${s.x}%`;
    dot.style.top = `${s.y}%`;
    dot.textContent = s.code;
    dot.dataset.stationCode = s.code;
    dot.style.pointerEvents = 'auto';
    markerLayer.appendChild(dot);
  });
  
  addTelemetryLog("Kat planı mobil ekranda yüklendi.");
}

export function showMobileInspect(stationCode) {
  ui.activeMobileStationCode = stationCode;
  const site = state.sites.find(s => s.id === ui.mobJob.siteId) || state.sites[0];
  const s = site.stations.find(st => st.code === stationCode);
  if (!s) return;
  
  $('#mobInspectTitle').textContent = `${s.code} Kontrolü`;
  
  $('#mobInpBaitStatus').value = s.baitStatus || 'intact';
  $('#mobInpPestType').value = s.pestType || 'none';
  $('#mobInpPestCount').value = s.pestCount || 0;
  $('#mobInpStatus').value = s.checked ? s.status : 'clean';
  $('#mobInpNotes').value = s.notes || '';
  
  $('#pageMobileMap').classList.add('hidden');
  $('#pageMobileJobDetail').classList.add('hidden');
  $('#pageMobileInspect').classList.remove('hidden');
}

export function openMobileScanner(title, instructions, stations, onScanComplete) {
  $('#pageMobileJobDetail').classList.add('hidden');
  $('#pageMobileScanAnimation').classList.remove('hidden');
  
  $('#mobScanTitle').textContent = title;
  $('#scanInstructions').textContent = instructions;
  
  const selector = $('#simScanSelector');
  selector.innerHTML = stations.map(s => `<option value="${s.code}">${s.code} - ${s.type.toUpperCase()}</option>`).join('');
  
  const trigger = $('#btnSimulateScanTrigger');
  const newTrigger = trigger.cloneNode(true);
  trigger.parentNode.replaceChild(newTrigger, trigger);
  
  const stopScannerAndComplete = (code) => {
    if (window.activeHtml5QrCode && window.activeHtml5QrCode.isScanning) {
      window.activeHtml5QrCode.stop().then(() => {
        $('#pageMobileScanAnimation').classList.add('hidden');
        onScanComplete(code);
      }).catch(err => {
        console.error(err);
        $('#pageMobileScanAnimation').classList.add('hidden');
        onScanComplete(code);
      });
    } else {
      $('#pageMobileScanAnimation').classList.add('hidden');
      onScanComplete(code);
    }
  };

  newTrigger.addEventListener('click', () => {
    stopScannerAndComplete(selector.value);
  });

  // Start Real Camera Scanner if html5-qrcode is loaded
  if (typeof Html5Qrcode !== 'undefined') {
    const readerEl = $('#qr-reader');
    if (readerEl) readerEl.innerHTML = `<div class="scanner-laser" style="z-index:2;"></div><span style="font-size:12px; color:#666; text-align:center; padding:10px; z-index:1;">Kamera başlatılıyor...</span>`;
    
    // Clear any previous scanner
    if (window.activeHtml5QrCode) {
      try {
        if (window.activeHtml5QrCode.isScanning) {
          window.activeHtml5QrCode.stop();
        }
      } catch(e){}
    }
    
    setTimeout(() => {
      const html5QrCode = new Html5Qrcode("qr-reader");
      window.activeHtml5QrCode = html5QrCode;
      
      const qrConfig = { fps: 10, qrbox: { width: 160, height: 160 } };
      
      html5QrCode.start(
        { facingMode: "environment" },
        qrConfig,
        (decodedText) => {
          addTelemetryLog(`GERÇEK QR BARKOD OKUNDU: "${decodedText}"`);
          
          let matched = null;
          stations.forEach(st => {
            if (decodedText.toUpperCase().includes(st.code.toUpperCase())) {
              matched = st.code;
            }
          });
          
          const codeToUse = matched || decodedText || stations[0].code;
          toast(`QR Eşleşti: ${codeToUse}`);
          stopScannerAndComplete(codeToUse);
        },
        (errorMessage) => {
          // Ignore scanning error
        }
      ).catch(err => {
        console.warn("Camera start failed:", err);
        addTelemetryLog("UYARI: Kamera bulunamadı veya izni verilmedi. Manuel seçim devrede.");
        if (readerEl) readerEl.innerHTML = `<span style="font-size:11px; color:#a3a3a3; text-align:center; padding:10px;">Kamera açılamadı. Lütfen HTTPS bağlantısını kontrol edin veya simülatörü kullanın.</span>`;
      });
    }, 400);
  } else {
    addTelemetryLog("Sistem Uyarısı: QR Kütüphanesi yüklenemedi. Simülatör devrede.");
  }
}

export function addTelemetryLog(text) {
  const container = $('#telemetryLogs');
  if (!container) return;
  const timestamp = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const log = document.createElement('div');
  log.className = 'log-line';
  log.innerHTML = `<span style="color:#2ecc71">[${timestamp}]</span> ${text}`;
  container.appendChild(log);
  container.scrollTop = container.scrollHeight;
}

export function updatePhoneTime() {
  const el = $('#phoneTime');
  if (el) el.textContent = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updatePhoneTime, 10000);
updatePhoneTime();

export function renderMobChemicalsList(site) {
  const container = $('#mobChemicalList');
  if (!container) return;
  if (!ui.mobJob) return;
  
  const visitChems = (site.chemicalsUsed || []).filter(cu => cu.workOrderId === ui.mobJob.id);
  
  container.innerHTML = visitChems.map((cu, index) => {
    const chem = chemicalDatabase.find(c => c.id === cu.chemicalId);
    const chemName = chem ? chem.name : 'Kimyasal';
    return `
      <div style="background:var(--soft); border:1px solid var(--line); border-radius:6px; padding:8px; display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <div>
          <b>${chemName}</b><br>
          <small class="text-muted">Miktar: ${cu.quantity} · Alan: ${cu.area}</small>
        </div>
        ${ui.mobJob.completed ? '' : `<button type="button" class="text-btn delete-mob-chem-btn" data-chem-index="${index}" style="color:var(--red); font-size:16px; font-weight:700; border:none; background:none; cursor:pointer;">×</button>`}
      </div>
    `;
  }).join('') || '<div class="text-muted" style="text-align:center; padding:10px; font-size:10px; background:var(--soft); border-radius:6px;">Ziyarette henüz kullanılan kimyasal girilmedi.</div>';
}

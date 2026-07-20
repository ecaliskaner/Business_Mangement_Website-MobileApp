// Mobile technician simulator: route, job detail, QR, inspection.
// Extracted from app.js (Phase 0a-3).

import { $, $$, toast } from '../core/dom.js';
import { state } from '../core/state.js';
import { ui } from '../core/session.js';
import { chemicalDatabase } from '../data/catalog.js';
import { initSignaturePads } from '../ui/signature.js';
import { render } from '../core/router.js';
import { recalculateSiteStats, save } from '../core/state.js';
import { pestDatabase, visitTypes } from '../data/catalog.js';
import { deductStock, renderInventory } from '../views/inventory.js';

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


export function mobileClicks(e) {
    const mobWork = e.target.closest('[data-mob-work-id]');
    if (mobWork) {
      const w = state.work.find(x => x.id === mobWork.dataset.mobWorkId);
      if (w) showMobileJobDetail(w);
    }
    
    if (e.target.id === 'btnMobileBackToRoute') {
      $('#pageMobileJobDetail').classList.add('hidden');
      $('#pageMobileRoute').classList.remove('hidden');
      renderMobileRoute();
    }
    
    if (e.target.id === 'btnMobArrived') {
      const btnGps = $('#btnMobArrived');
      addTelemetryLog("Konum doğrulanıyor... (GPS enlem/boylam geofence karşılaştırması)");
      btnGps.textContent = "⌛ GPS Aranıyor...";
      btnGps.disabled = true;
      
      // The browser fires neither callback while a geolocation permission
      // prompt is pending, and its own `timeout` does not run in that state.
      // Without a watchdog the button sits disabled on "GPS Aranıyor..."
      // forever — which bricks the headline step of the demo whenever the
      // venue blocks location. Guarantee a fallback, and make the handler
      // idempotent so a late real fix-up cannot double-apply.
      let gpsSettled = false;
      const GPS_FALLBACK_MS = 2500;

      const proceedGpsArrival = (lat, lon) => {
        if (gpsSettled) return true;
        gpsSettled = true;
        clearTimeout(gpsWatchdog);
        ui.mobArrived = true;
        ui.mobJob.status = 'arrived_gps';
        save();
        btnGps.classList.add('hidden');
        $('#indicatorGpsVerified').classList.remove('hidden');
        if ($('#gpsCoordsText')) {
          $('#gpsCoordsText').textContent = `(Enlem: ${lat.toFixed(5)}, Boylam: ${lon.toFixed(5)})`;
        }
        $('#cardQrStart').classList.remove('disabled');
        $('#btnMobScanFirstQr').disabled = false;
        
        addTelemetryLog(`BAŞARILI: Teknisyen konumu geofence sınırları içerisinde doğrulandı! (${lat.toFixed(4)}, ${lon.toFixed(4)})`);
        toast("GPS Konumu doğrulandı. İlk QR okutarak mesaiyi başlatın.");
        updateSimStepsHighlight();
      };

      const gpsWatchdog = setTimeout(() => {
        addTelemetryLog("UYARI: GPS yanıt vermedi. Simüle edilmiş koordinatlar kullanılıyor.");
        proceedGpsArrival(41.0082, 28.9784);
      }, GPS_FALLBACK_MS);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            proceedGpsArrival(pos.coords.latitude, pos.coords.longitude);
          },
          (err) => {
            addTelemetryLog("UYARI: Gerçek GPS alınamadı. Simüle edilmiş koordinatlar kullanılıyor.");
            proceedGpsArrival(41.0082, 28.9784);
          },
          { enableHighAccuracy: true, timeout: GPS_FALLBACK_MS }
        );
      } else {
        addTelemetryLog("UYARI: Tarayıcıda GPS servisi bulunamadı. Simüle koordinat kullanılıyor.");
        proceedGpsArrival(41.0082, 28.9784);
      }
    }
    
    if (e.target.id === 'btnMobScanFirstQr') {
      const site = state.sites.find(s => s.id === ui.mobJob.siteId) || state.sites[0];
      addTelemetryLog("Kamera açılıyor... Giriş QR Kodu taraması bekleniyor.");
      openMobileScanner(
        "Giriş QR Kodu Tara",
        "Tesis giriş kapısındaki kontrol ünitesinde yer alan QR barkodunu okutun.",
        site.stations,
        (scannedCode) => {
          ui.mobQrStarted = true;
          ui.mobJob.status = 'started_by_first_qr';
          ui.mobJob.realWorkStartedAt = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
          ui.mobJob.startedTimestamp = Date.now();
          save();
          showMobileJobDetail(ui.mobJob);
          addTelemetryLog(`İLK QR OKUTULDU: ${scannedCode} barkodu ile gerçek mesai başlangıcı tescil edildi!`);
          toast("Mesai gerçek anlamda başladı! İstasyonlar kontrol edilebilir.");
        }
      );
    }
    
    if (e.target.id === 'btnCancelScan') {
      if (window.activeHtml5QrCode && window.activeHtml5QrCode.isScanning) {
        window.activeHtml5QrCode.stop().catch(err => console.error(err));
      }
      $('#pageMobileScanAnimation').classList.add('hidden');
      $('#pageMobileJobDetail').classList.remove('hidden');
    }
    
    if (e.target.id === 'btnMobViewPlan') {
      showMobileMap();
    }
    
    if (e.target.id === 'btnMobileBackToJob') {
      $('#pageMobileMap').classList.add('hidden');
      $('#pageMobileJobDetail').classList.remove('hidden');
    }
    
    if (e.target.id === 'btnMobDownloadOffline') {
      const btnDownload = $('#btnMobDownloadOffline');
      const bar = $('#mobDownloadProgress');
      const fill = $('.download-progress-fill');
      bar.classList.remove('hidden');
      btnDownload.disabled = true;
      
      addTelemetryLog("Tesis kat planı verileri yerel SQLite veritabanına indiriliyor...");
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        fill.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            ui.mobOfflineReady = true;
            const site = state.sites.find(s => s.id === ui.mobJob.siteId);
            if (site) site.downloaded = true;
            save();
            bar.classList.add('hidden');
            btnDownload.classList.add('hidden');
            $('#indicatorOfflineReady').classList.remove('hidden');
            addTelemetryLog("BAŞARILI: Tesis kat planı offline kullanım için önbelleğe alındı.");
            toast("Kroki çevrimdışı kullanıma hazır.");
            updateSimStepsHighlight();
          }, 200);
        }
      }, 120);
    }
    
    const mobSt = e.target.closest('[data-mob-station-code]');
    if (mobSt) {
      showMobileInspect(mobSt.dataset.mobStationCode);
    }
    
    if (e.target.id === 'btnMobileBackToMap') {
      $('#pageMobileInspect').classList.add('hidden');
      showMobileMap();
    }
    
    if (e.target.id === 'btnMobSaveInspection') {
      const site = state.sites.find(s => s.id === ui.mobJob.siteId) || state.sites[0];
      const s = site.stations.find(st => st.code === ui.activeMobileStationCode);
      if (s) {
        s.checked = true;
        s.baitStatus = $('#mobInpBaitStatus').value;
        s.pestType = $('#mobInpPestType').value;
        s.pestCount = parseInt($('#mobInpPestCount').value) || 0;
        s.status = $('#mobInpStatus').value;
        s.notes = $('#mobInpNotes').value;
        
        const localPestLabels = { none: 'Yok', mouse: 'Fare', rat: 'Sıçan', cockroach: 'Hamamböceği', fly: 'Sinek', other: 'Diğer' };
        Object.values(pestDatabase).forEach(category => {
          category.forEach(p => {
            localPestLabels[p.code] = p.name;
          });
        });
        
        if (s.pestType !== 'none' && s.pestCount > 0) {
          const pestName = localPestLabels[s.pestType] || s.pestType;
          s.findings = [{
            pestCode: s.pestType,
            pestName: pestName,
            count: s.pestCount
          }];
        } else {
          s.findings = [];
        }
        
        s.controlledBy = ui.mobJob.tech;
        s.lastControl = "Bugün, " + new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
        
        if (s.pestType !== 'none') {
          s.status = 'activity';
        } else if (s.status === 'activity') {
          s.status = 'clean';
        }
        
        recalculateSiteStats(site);
        save();
        
        addTelemetryLog(`İSTASYON DENETLENDİ: ${s.code} (Durum: ${s.status === 'clean' ? 'Temiz' : (s.status === 'activity' ? 'Aktivite' : 'Hasarlı')})`);
        toast(`${s.code} kontrolü kaydedildi.`);
        
        $('#pageMobileInspect').classList.add('hidden');
        showMobileJobDetail(ui.mobJob);
      }
    }
    
    if (e.target.id === 'btnMobSaveForm') {
      ui.mobJob.completed = true;
      ui.mobJob.status = 'completed';
      state.completed++;
      
      const canvasCust = $('#sigCanvasCustomer');
      const canvasTech = $('#sigCanvasTech');
      if (canvasCust && canvasTech) {
        ui.mobJob.customerSignature = canvasCust.toDataURL();
        ui.mobJob.techSignature = canvasTech.toDataURL();
      }
      
      const site = state.sites.find(s => s.id === ui.mobJob.siteId) || state.sites[0];
      site.last = `Bugün · ${ui.mobJob.tech}`;
      
      // Calculate visit duration (simulated for quick demo clicks)
      const durationMs = ui.mobJob.startedTimestamp ? (Date.now() - ui.mobJob.startedTimestamp) : 0;
      let durationMin = Math.round(durationMs / 60000);
      if (durationMin < 5) durationMin = 45; // simulate realistic duration for demo
      ui.mobJob.duration = `${durationMin} dk`;
      
      // Calculate costs
      const techRate = state.techRates[ui.mobJob.tech] || 150;
      const laborCost = Math.round((durationMin / 60) * techRate);
      
      let chemicalCost = 0;
      const siteChems = site.chemicalsUsed || [];
      siteChems.forEach(cu => {
        if (cu.workOrderId === ui.mobJob.id) {
          const chem = chemicalDatabase.find(c => c.id === cu.chemicalId);
          if (chem) {
            const qty = parseFloat(cu.quantity.replace(/[^\d\.]/g, '')) || 0;
            chemicalCost += Math.round(qty * chem.unitCost);
          }
        }
      });
      if (chemicalCost === 0) chemicalCost = 150; // demo baseline if none used
      
      const billingAmount = site.contract ? site.contract.monthlyPrice : 3500;
      const profit = billingAmount - (laborCost + chemicalCost);
      const margin = Math.round((profit / billingAmount) * 100);
      
      // Auto-generate invoice draft
      const newInvoice = {
        id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        siteId: site.id,
        company: site.company,
        name: site.name,
        date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }),
        amount: billingAmount,
        laborCost: laborCost,
        chemicalCost: chemicalCost,
        margin: margin,
        duration: `${durationMin} dk`,
        status: 'draft',
        description: `${ui.mobJob.visitType ? (visitTypes.find(v=>v.code===ui.mobJob.visitType)||{}).name : 'Rutin'} Servis Faturası`
      };
      
      if (!state.invoices) state.invoices = [];
      state.invoices.unshift(newInvoice);
      
      recalculateSiteStats(site);
      save();
      
      addTelemetryLog(`İŞ BİTTİ: Rapor sunucuya başarıyla senkronize edildi.`);
      toast("İş emri tamamlandı. Raporlar senkronize edildi!");
      
      render();
      
      $('#pageMobileJobDetail').classList.add('hidden');
      $('#pageMobileRoute').classList.remove('hidden');
      renderMobileRoute();
    }

    // Tab navigation clicks in company profile
  return false;
}

export function mobileChemDeleteClicks(e) {
    const deleteMobChemBtn = e.target.closest('.delete-mob-chem-btn');
    if (deleteMobChemBtn) {
      if (!ui.mobJob) return true;
      const site = state.sites.find(s => s.id === ui.mobJob.siteId);
      if (!site) return true;
      
      const idx = parseInt(deleteMobChemBtn.dataset.chemIndex);
      const visitChems = site.chemicalsUsed.filter(cu => cu.workOrderId === ui.mobJob.id);
      const targetChemUse = visitChems[idx];
      
      if (targetChemUse) {
        // Restore stock
        const numVal = parseFloat(targetChemUse.quantity.replace(/[^\d\.]/g, '')) || 0;
        const invItem = state.inventory.find(i => i.chemicalId === targetChemUse.chemicalId);
        if (invItem && numVal > 0) {
          invItem.qty = Math.round((invItem.qty + numVal) * 10) / 10;
        }
        
        // Remove from list
        const mainIdx = site.chemicalsUsed.indexOf(targetChemUse);
        if (mainIdx > -1) {
          site.chemicalsUsed.splice(mainIdx, 1);
        }
        
        save();
        renderMobChemicalsList(site);
        renderInventory();
        toast('Kimyasal kullanımı silindi ve stok iade edildi.');
      }
      return true;
    }

    // Delete desktop task chemical usage
  return false;
}

export function mobChemicalSubmit(e) {
    if (e.target.id === 'mobChemicalForm') {
      e.preventDefault();
      if (!ui.mobJob) return true;
      
      const site = state.sites.find(s => s.id === ui.mobJob.siteId);
      if (!site) return true;
      
      const inpChemSelect = $('#mobChemSelect');
      const inpChemQty = $('#mobChemQty');
      const inpChemArea = $('#mobChemArea');
      const inpChemNotes = $('#mobChemNotes');
      if (!inpChemSelect || !inpChemQty || !inpChemArea || !inpChemNotes) return true;
      
      const chemicalId = inpChemSelect.value;
      const quantity = inpChemQty.value.trim();
      const area = inpChemArea.value.trim();
      const notes = inpChemNotes.value.trim();
      
      if (!chemicalId || !quantity || !area) return true;
      
      const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
      const newChemUse = {
        id: `cu${Date.now()}`,
        workOrderId: ui.mobJob.id,
        chemicalId: chemicalId,
        date: dateStr,
        quantity: quantity,
        area: area,
        tech: ui.mobJob.tech,
        notes: notes || 'Saha uygulaması'
      };
      
      if (!site.chemicalsUsed) site.chemicalsUsed = [];
      site.chemicalsUsed.unshift(newChemUse);
      
      // Auto-deduct stock
      deductStock(chemicalId, quantity);
      
      save();
      renderMobChemicalsList(site);
      
      inpChemSelect.value = '';
      inpChemQty.value = '';
      inpChemArea.value = '';
      inpChemNotes.value = '';
      toast('Kimyasal başarıyla eklendi.');
    }
  return false;
}

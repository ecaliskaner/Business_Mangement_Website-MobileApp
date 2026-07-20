// Ladybug Operations — application shell.
//
// Holds the global event delegator and bootstrap. Views live in ./views,
// shared widgets in ./ui, cross-cutting concerns in ./core.
// Decomposing bind() per-view is task 0a-5 in docs/TASKS.md.

import { $, $$, toast } from './core/dom.js';
import { recalculateSiteStats, save, state } from './core/state.js';
import { users } from './core/auth.js';
import { ui } from './core/session.js';
import { techSites } from './data/seed.js';
import { chemicalDatabase, pestDatabase, visitTypes } from './data/catalog.js';
import { checkSession, logout } from './core/roles.js';
import { render, setView } from './core/router.js';
import { renderDashboard } from './views/dashboard.js';
import { renderSites } from './views/sites.js';
import { renderTask, renderWork } from './views/work.js';
import { renderTeam } from './views/team.js';
import { renderClientAnalytics, renderInsights } from './views/insights.js';
import { openReportModal } from './views/reports.js';
import { getStationArea, renderChemicalUsage, renderCompanyFiles, renderCompanyRecommendations, renderStationMarkers, showCompanyDetail, showStationDetail, switchCompanyTab } from './views/companyDetail.js';
import { addTelemetryLog, openMobileScanner, renderMobChemicalsList, renderMobileRoute, showMobileInspect, showMobileJobDetail, showMobileMap, updateSimStepsHighlight } from './views/mobile.js';
import { deductStock, renderInventory } from './views/inventory.js';
import { renderFinance } from './views/finance.js';
import { modal, printQrCodeSticker } from './ui/modal.js';
import { renderCalendarGrid } from './ui/calendar.js';

// Clean stale data from previous versions
localStorage.removeItem("ladybug-product-demo"); localStorage.removeItem("insectram-product-demo"); localStorage.removeItem("insectram-ops");

function bind(){
  document.addEventListener('click',e=>{
    if (e.target.id === 'btnLogOut') {
      logout();
      return;
    }
    
    const quickLogin = e.target.closest('.quick-login-btn');
    if (quickLogin) {
      const roleKey = quickLogin.dataset.loginAs;
      let email = 'admin@ladybug.com';
      if (roleKey === 'tech') email = 'ayse@ladybug.com';
      if (roleKey === 'client') email = 'acme@client.com';
      
      state.currentUser = users[email];
      localStorage.setItem("ladybug-user", JSON.stringify(state.currentUser));
      checkSession();
      render();
      toast(`Hoş geldiniz, ${state.currentUser.name}!`);
      return;
    }

    // data-action click event bindings
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      
      if (action === 'search') {
        modal('search');
        return;
      }
      if (action === 'notifications') {
        modal('notifications');
        return;
      }
      if (action === 'workspace') {
        toast("Aktif Çalışma Alanı: Apex Operations (12 Müşteri, 34 Tesis)");
        return;
      }
      if (action === 'portfolio') {
        toast("Sistem genelinde ortalama tesis güvenlik skoru: %87 (İyi)");
        return;
      }
      if (action === 'filters') {
        toast("Gelişmiş filtreleme seçenekleri: Şehir, Sektör ve Risk seviyesi filtreleri uygulandı.");
        return;
      }
      if (action === 'sort') {
        state.workSortAsc = !state.workSortAsc;
        save();
        // Toggle sort order of work list
        state.work.sort((a, b) => {
          const priorityWeight = { critical: 3, high: 2, normal: 1 };
          const wa = priorityWeight[a.priority] || 0;
          const wb = priorityWeight[b.priority] || 0;
          return state.workSortAsc ? (wa - wb) : (wb - wa);
        });
        renderWork();
        toast(`İş emirleri öncelik sırasına göre ${state.workSortAsc ? 'artan' : 'azalan'} sıralandı.`);
        return;
      }
      if (action === 'route') {
        toast("Yapay zeka rota optimizasyon algoritması çalıştırılıyor...");
        setTimeout(() => {
          toast("Saha teknisyenleri için en verimli 4 rota optimize edildi ve güncellendi!");
        }, 1200);
        return;
      }
      if (action === 'facilityMap') {
        const siteId = techSites[state.selectedTech] || 's1';
        showCompanyDetail(siteId);
        // Switch to map tab
        setTimeout(() => {
          const mapTab = $('[data-comp-tab="map"]');
          if (mapTab) mapTab.click();
        }, 100);
        return;
      }
    }

    // Clicking Search Results row
    const searchSiteRow = e.target.closest('.search-site-row');
    if (searchSiteRow) {
      const siteId = searchSiteRow.dataset.siteId;
      showCompanyDetail(siteId);
      $('#modal').classList.add('hidden');
      return;
    }
    const searchWorkRow = e.target.closest('.search-work-row');
    if (searchWorkRow) {
      const workId = searchWorkRow.dataset.workId;
      state.selectedWork = workId;
      save();
      setView('work');
      $('#modal').classList.add('hidden');
      return;
    }

    // Clicking Notification row
    const notifRow = e.target.closest('.notification-row');
    if (notifRow) {
      const idx = parseInt(notifRow.dataset.notifIdx);
      if (window.__ACTIVE_NOTIFS__ && window.__ACTIVE_NOTIFS__[idx]) {
        window.__ACTIVE_NOTIFS__[idx].action();
      }
      $('#modal').classList.add('hidden');
      return;
    }

    const nav=e.target.closest('[data-view]');
    if(nav) {
      setView(nav.dataset.view);
      $('.sidebar').classList.remove('open');
    }
    
    if ($('.sidebar').classList.contains('open') && !e.target.closest('.sidebar') && !e.target.closest('#mobileMenu')) {
      $('.sidebar').classList.remove('open');
    }

    const target=e.target.closest('[data-view-target]');
    if(target) {
      setView(target.dataset.viewTarget);
      $('.sidebar').classList.remove('open');
    }
    
    const wf=e.target.closest('[data-work-filter]');
    if(wf){
      $$('.work-stat').forEach(x=>x.classList.toggle('active',x===wf));
      renderWork(wf.dataset.workFilter);
    }
    
    const work=e.target.closest('[data-work]');
    if(work){
      state.selectedWork=work.dataset.work;
      save();
      renderTask();
    }
    
    const tech=e.target.closest('[data-tech]');
    if(tech){
      state.selectedTech=tech.dataset.tech;
      save();
      $$('.map-person').forEach(x=>x.classList.toggle('active',x===tech));
      renderTeam();
    }
    
    // Clicking site / company cell or dot links to company detail profile
    const siteClick = e.target.closest('[data-site-id]');
    if (siteClick) {
      showCompanyDetail(siteClick.dataset.siteId);
      return;
    }
    
    // Clicking works on dashboard redirects to work orders view
    const workClick = e.target.closest('[data-work-id]');
    if (workClick) {
      state.selectedWork = workClick.dataset.workId;
      save();
      setView('work');
      renderWork();
      return;
    }
    
    if(e.target.closest('#newWorkOrder')||e.target.closest('#newWorkOrderSecondary')) modal('work');
    if(e.target.closest('#addSite')) modal('site');
    if(e.target.closest('#btnEditSiteContract')) {
      if (ui.activeSiteId) {
        modal('editSite', ui.activeSiteId);
      } else {
        toast("Hata: Aktif seçili tesis bulunamadı.");
      }
    }
    if(e.target.closest('#createReport')) modal('report');
    
    if(e.target.closest('.modal-close')||e.target.id==='modal') $('#modal').classList.add('hidden');
    
    if(e.target.closest('#optionalDownload')){
      toast('Tesis planı offline kullanım için indirildi.');
    }
    
    if(e.target.closest('#completeWork')){
      const w = state.work.find(x => x.id === state.selectedWork);
      if (w) {
        state.completed++;
        w.completed = true;
        
        const site = state.sites.find(s => s.id === w.siteId) || state.sites[0];
        site.last = `Bugün · ${w.tech}`;
        
        // Calculate costs on PC
        const techRate = state.techRates[w.tech] || 150;
        const laborCost = Math.round((60 / 60) * techRate); // assume 60 mins default
        
        let chemicalCost = 0;
        const siteChems = site.chemicalsUsed || [];
        siteChems.forEach(cu => {
          if (cu.workOrderId === w.id) {
            const chem = chemicalDatabase.find(c => c.id === cu.chemicalId);
            if (chem) {
              const qty = parseFloat(cu.quantity.replace(/[^\d\.]/g, '')) || 0;
              chemicalCost += Math.round(qty * chem.unitCost);
            }
          }
        });
        if (chemicalCost === 0) chemicalCost = 150; // default baseline
        
        const billingAmount = site.contract ? site.contract.monthlyPrice : 3500;
        const profit = billingAmount - (laborCost + chemicalCost);
        const margin = Math.round((profit / billingAmount) * 100);
        
        // Generate invoice draft
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
          duration: '60 dk',
          status: 'draft',
          description: `${w.visitType ? (visitTypes.find(v=>v.code===w.visitType)||{}).name : 'Rutin'} Servis Faturası`
        };
        
        if (!state.invoices) state.invoices = [];
        state.invoices.unshift(newInvoice);
        
        recalculateSiteStats(site);
        save();
        render();
        toast('İş emri tamamlandı; fatura taslağı oluşturuldu.');
      }
    }
    
    // Back button in company profile
    if (e.target.id === 'backToSitesFromCompBtn') {
      setView('sites');
    }

    // Toggle calendar and list views
    if (e.target.id === 'btnWorkShowList') {
      $('#workListWrapper').classList.remove('hidden');
      $('#workCalendarContainer').classList.add('hidden');
      $('#btnWorkShowList').classList.add('active');
      $('#btnWorkShowCalendar').classList.remove('active');
      return;
    }
    if (e.target.id === 'btnWorkShowCalendar') {
      $('#workListWrapper').classList.add('hidden');
      $('#workCalendarContainer').classList.remove('hidden');
      $('#btnWorkShowList').classList.remove('active');
      $('#btnWorkShowCalendar').classList.add('active');
      renderCalendarGrid();
      return;
    }

    // Heatmap mode toggler
    const heatToggle = e.target.closest('#heatmapToggleBtn');
    if (heatToggle) {
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (site) {
        renderStationMarkers(site.stations, $$('[data-station-filter].active')[0]?.dataset.stationFilter || 'all');
      }
    }

    // Print QR code sticker label
    if (e.target.id === 'printStationQrBtn') {
      printQrCodeSticker(ui.activeStationCode);
      return;
    }

    // Toggle recommendation compliance status
    const toggleRecBtn = e.target.closest('.toggle-rec-btn');
    if (toggleRecBtn) {
      const idx = parseInt(toggleRecBtn.dataset.recIndex);
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (site && site.recommendations && site.recommendations[idx]) {
        const r = site.recommendations[idx];
        r.status = r.status === 'open' ? 'resolved' : 'open';
        save();
        renderCompanyRecommendations(site);
        toast(`Öneri durumu güncellendi: ${r.status === 'resolved' ? 'Giderildi' : 'Açık Bulgu'}`);
      }
      return;
    }
    
    const report=e.target.closest('[data-report]');
    if(report) {
      const rId = report.dataset.reportId || 'r1';
      openReportModal(rId);
      return;
    }
    if(e.target.id==='mobileMenu') $('.sidebar').classList.toggle('open');
    
    // Station marker dot clicked in facility plan
    const marker = e.target.closest('[data-station-code]');
    if (marker) {
      const stationCode = marker.dataset.stationCode;
      const isMobile = e.target.closest('#mobileBlueprintWrapper');
      if (isMobile) {
        showMobileInspect(stationCode);
      } else {
        showStationDetail(stationCode);
      }
    }
    
    // Station filters click in facility plan
    const sf = e.target.closest('[data-station-filter]');
    if (sf) {
      $$('[data-station-filter]').forEach(x => x.classList.toggle('active', x === sf));
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (site) {
        // Clear active room rect highlights when clicking manual filters
        $$('.blueprint-room').forEach(r => r.classList.remove('active'));
        renderStationMarkers(site.stations, sf.dataset.stationFilter);
      }
    }

    // Blueprint room SVG click filter
    const roomClick = e.target.closest('.blueprint-room');
    if (roomClick) {
      const roomName = roomClick.dataset.room;
      const alreadyActive = roomClick.classList.contains('active');
      
      // Clear active classes from other rooms and manual filters
      $$('.blueprint-room').forEach(r => r.classList.remove('active'));
      $$('[data-station-filter]').forEach(x => x.classList.toggle('active', x.dataset.stationFilter === 'all'));
      
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (!site) return;
      
      if (alreadyActive) {
        renderStationMarkers(site.stations, 'all');
        toast("Tüm istasyonlar listeleniyor.");
      } else {
        roomClick.classList.add('active');
        const filtered = site.stations.filter(s => getStationArea(s.x, s.y) === roomName);
        renderStationMarkers(filtered, 'all');
        toast(`"${roomName}" bölgesindeki istasyonlar filtrelendi (${filtered.length} adet).`);
      }
      return;
    }
    
    // ==========================================
    // MOBILE APP CLICK EVENTS
    // ==========================================
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
        if (gpsSettled) return;
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
    const compTab = e.target.closest('[data-comp-tab]');
    if (compTab) {
      switchCompanyTab(compTab.dataset.compTab);
      return;
    }

    // Download Client Analytics Chart
    if (e.target.id === 'btnDownloadChart') {
      const canvas = $('#analyticsCanvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `${ui.activeSiteId}_trend_analizi.png`;
        link.href = canvas.toDataURL();
        link.click();
        toast('Grafik PNG olarak indirildi.');
      }
      return;
    }

    // Analytics filter chip clicks
    const analyticsFilter = e.target.closest('[data-analytics-filter]');
    if (analyticsFilter) {
      $$('[data-analytics-filter]').forEach(b => b.classList.toggle('active', b === analyticsFilter));
      renderClientAnalytics();
      return;
    }

    // Invoice status actions
    const sendInvoiceBtn = e.target.closest('.send-invoice-btn');
    if (sendInvoiceBtn) {
      const invId = sendInvoiceBtn.dataset.invoiceId;
      const inv = state.invoices.find(i => i.id === invId);
      if (inv) {
        inv.status = 'sent';
        save();
        renderFinance();
        toast(`Fatura ${invId} müşteriye başarıyla gönderildi.`);
      }
      return;
    }

    const payInvoiceBtn = e.target.closest('.pay-invoice-btn');
    if (payInvoiceBtn) {
      const invId = payInvoiceBtn.dataset.invoiceId;
      const inv = state.invoices.find(i => i.id === invId);
      if (inv) {
        inv.status = 'paid';
        save();
        renderFinance();
        toast(`Fatura ${invId} ödendi olarak işaretlendi.`);
      }
      return;
    }

    // Delete mobile chemical usage
    const deleteMobChemBtn = e.target.closest('.delete-mob-chem-btn');
    if (deleteMobChemBtn) {
      if (!ui.mobJob) return;
      const site = state.sites.find(s => s.id === ui.mobJob.siteId);
      if (!site) return;
      
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
      return;
    }

    // Delete desktop task chemical usage
    const deleteTaskChemBtn = e.target.closest('.delete-task-chem-btn');
    if (deleteTaskChemBtn) {
      const w = state.work.find(x => x.id === state.selectedWork) || state.work[0];
      if (!w) return;
      
      const site = state.sites.find(s => s.id === w.siteId);
      if (!site) return;
      
      const idx = parseInt(deleteTaskChemBtn.dataset.chemIndex);
      const visitChems = site.chemicalsUsed.filter(cu => cu.workOrderId === w.id);
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
        renderTask();
        renderInventory();
        toast('Kimyasal kullanımı silindi ve stok iade edildi.');
      }
      return;
    }

    // Invoice status filters
    const invFilter = e.target.closest('[data-invoice-filter]');
    if (invFilter) {
      $$('[data-invoice-filter]').forEach(b => b.classList.toggle('active', b === invFilter));
      renderFinance();
      return;
    }

    // File download trigger toast
    const downloadBtn = e.target.closest('.download-file-btn');
    if (downloadBtn) {
      const idx = parseInt(downloadBtn.dataset.fileIndex);
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (site && site.files && site.files[idx]) {
        toast(`${site.files[idx].name} indirmesi başlatıldı...`);
      }
      return;
    }
  });

  $('#siteSearch')?.addEventListener('input',renderSites);
  $$('[data-site-filter]').forEach(b=>b.addEventListener('click',()=>{
    $$('[data-site-filter]').forEach(x=>x.classList.toggle('active',x===b));
    renderSites();
  }));
  
  $('#trendFilter')?.addEventListener('change',renderInsights);
  
  document.addEventListener('submit',e=>{
    if (e.target.id === 'loginForm') {
      e.preventDefault();
      const email = $('#inpLoginEmail').value.trim();
      const password = $('#inpLoginPassword').value.trim();
      
      const user = users[email];
      if (user && password === '123') {
        state.currentUser = user;
        localStorage.setItem("ladybug-user", JSON.stringify(state.currentUser));
        checkSession();
        render();
        toast(`Başarıyla giriş yapıldı. Hoş geldiniz, ${user.name}!`);
      } else {
        toast('Hata: Geçersiz e-posta veya şifre (Şifre: 123)');
      }
      return;
    }
    
    if(e.target.id==='createWork'){
      e.preventDefault();
      const f = new FormData(e.target);
      const title = f.get('title') || 'Planlı saha kontrolü';
      const siteVal = f.get('site');
      const priority = f.get('priority') || 'Normal';
      const techVal = f.get('tech') || 'Ayşe Demir';
      const dateVal = f.get('dueDate');
      
      // Find site
      const siteObj = state.sites.find(s => s.name === siteVal) || state.sites[0];
      
      let formattedDue = 'Bugün, 18:00';
      if (dateVal) {
        const dt = new Date(dateVal);
        const day = dt.getDate();
        const monthStr = dt.toLocaleDateString('tr-TR', { month: 'short' });
        const timeStr = dt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        formattedDue = `${day} ${monthStr}, ${timeStr}`;
      }
      
      const visitType = f.get('visitType') || 'RZ';
      const newWo = {
        id: `WO-${Math.floor(2000 + Math.random() * 1000)}`,
        siteId: siteObj.id,
        title: title,
        site: `${siteObj.company} · ${siteObj.name}`,
        priority: priority === 'Kritik' ? 'critical' : (priority === 'Yüksek' ? 'high' : 'normal'),
        type: 'Planlı servis',
        visitType: visitType,
        due: formattedDue,
        tech: techVal,
        description: 'Periyodik istasyon kontrolü ve genel pest control denetimi.'
      };
      
      state.work.push(newWo);
      save();
      $('#modal').classList.add('hidden');
      renderWork();
      renderDashboard();
      toast(`İş emri oluşturuldu ve ${techVal} teknisyenine atandı.`);
    }
    
    // Tesis & Sözleşme Düzenleme Formu
    if(e.target.id==='editSiteForm'){
      e.preventDefault();
      const siteId = e.target.dataset.siteId;
      const s = state.sites.find(site => site.id === siteId);
      if(!s) return;
      
      const f = new FormData(e.target);
      s.contact = {
        name: f.get('contactName'),
        phone: f.get('contactPhone'),
        email: f.get('contactEmail')
      };
      s.address = f.get('address');
      s.serviceFrequency = f.get('serviceFrequency');
      
      const annualPrice = parseFloat(f.get('annualPrice')) || 0;
      const monthlyPrice = parseFloat(f.get('monthlyPrice')) || 0;
      const extraVisitPrice = parseFloat(f.get('extraVisitPrice')) || 0;
      const emergencyCallPrice = parseFloat(f.get('emergencyCallPrice')) || 0;
      
      s.contract = {
        period: f.get('contractPeriod'),
        taxOffice: f.get('taxOffice'),
        taxNo: f.get('taxNo'),
        annualPrice: annualPrice,
        monthlyPrice: monthlyPrice,
        extraVisitPrice: extraVisitPrice,
        emergencyCallPrice: emergencyCallPrice
      };
      
      s.serviceScope = {
        outdoorRodent: { frequency: parseFloat(f.get('freqOutdoorRodent')) || 0, unit: 'ay' },
        indoorRodent: { frequency: parseFloat(f.get('freqIndoorRodent')) || 0, unit: 'ay' },
        crawlingPest: { frequency: parseFloat(f.get('freqCrawlingPest')) || 0, unit: 'ay' },
        flyingPest: { frequency: parseFloat(f.get('freqFlyingPest')) || 0, unit: 'ay' },
        storagePest: { frequency: parseFloat(f.get('freqStoragePest')) || 0, unit: 'ay' }
      };
      
      save();
      $('#modal').classList.add('hidden');
      
      showCompanyDetail(s.id);
      renderSites();
      toast('Tesis ve sözleşme detayları başarıyla güncellendi.');
    }

    if(e.target.id==='createSite'){
      e.preventDefault();
      const f=new FormData(e.target);
      
      const company = f.get('company');
      const siteName = f.get('siteName');
      const city = f.get('city');
      const contactName = f.get('contactName');
      const contactPhone = f.get('contactPhone');
      const contactEmail = f.get('contactEmail');
      const contractPeriod = f.get('contractPeriod');
      const serviceFrequency = f.get('serviceFrequency');
      const address = f.get('address');
      const taxOffice = f.get('taxOffice');
      const taxNo = f.get('taxNo');
      
      const annualPrice = parseFloat(f.get('annualPrice')) || 0;
      const monthlyPrice = parseFloat(f.get('monthlyPrice')) || 0;
      const extraVisitPrice = parseFloat(f.get('extraVisitPrice')) || 0;
      const emergencyCallPrice = parseFloat(f.get('emergencyCallPrice')) || 0;
      
      const freqOutdoorRodent = parseFloat(f.get('freqOutdoorRodent')) || 0;
      const freqIndoorRodent = parseFloat(f.get('freqIndoorRodent')) || 0;
      const freqCrawlingPest = parseFloat(f.get('freqCrawlingPest')) || 0;
      const freqFlyingPest = parseFloat(f.get('freqFlyingPest')) || 0;
      const freqStoragePest = parseFloat(f.get('freqStoragePest')) || 0;
      
      const newSite = {
        id:Date.now()+'',
        company: company,
        name: siteName,
        city: city,
        score: 100,
        state: 'healthy',
        issues: 0,
        last: 'Henüz servis yok',
        next: 'Planlanacak',
        color: '#d8e9e4',
        sector: "Üretim / Gıda Sanayii",
        address: address,
        serviceFrequency: serviceFrequency,
        contact: { name: contactName, phone: contactPhone, email: contactEmail },
        contract: {
          period: contractPeriod,
          taxOffice: taxOffice,
          taxNo: taxNo,
          annualPrice: annualPrice,
          monthlyPrice: monthlyPrice,
          extraVisitPrice: extraVisitPrice,
          emergencyCallPrice: emergencyCallPrice
        },
        serviceScope: {
          outdoorRodent: { frequency: freqOutdoorRodent, unit: 'ay' },
          indoorRodent: { frequency: freqIndoorRodent, unit: 'ay' },
          crawlingPest: { frequency: freqCrawlingPest, unit: 'ay' },
          flyingPest: { frequency: freqFlyingPest, unit: 'ay' },
          storagePest: { frequency: freqStoragePest, unit: 'ay' }
        },
        chemicalsUsed: [],
        methods: [
          { name: "Kemirgen İstasyon Kontrolü", desc: "Kilitli dış çevre yemleme istasyonları.", active: true },
          { name: "Yürüyen Haşere İzleme", desc: "Yapışkan pheromone monitörleri.", active: true }
        ],
        files: [],
        stations: [
          { code:"R-01", type:"rodent_bait", x:20, y:20, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
          { code:"R-02", type:"rodent_bait", x:80, y:20, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
          { code:"BD-01", type:"insect_detector", x:20, y:80, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
          { code:"BD-02", type:"insect_detector", x:80, y:80, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
        ]
      };
      state.sites.push(newSite);
      save();
      $('#modal').classList.add('hidden');
      renderSites();
      toast('Yeni Tesis ve Hizmet Sözleşmesi başarıyla portföye eklendi.');
    }
    
    if(e.target.id==='generateReport'){
      e.preventDefault();
      $('#modal').classList.add('hidden');
      toast('Rapor oluşturuldu. Paylaşım bağlantısı müşteri portalına eklendi.');
    }
    
    // Admin floor plan inspection form save
    if (e.target.id === 'adminInspectionForm') {
      e.preventDefault();
      if (!ui.activeSiteId || !ui.activeStationCode) return;
      
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (!site) return;
      const s = site.stations.find(st => st.code === ui.activeStationCode);
      if (!s) return;
      
      const f = new FormData(e.target);
      s.checked = true;
      s.baitStatus = f.get('baitStatus');
      s.pestType = f.get('pestType');
      s.pestCount = parseInt(f.get('pestCount')) || 0;
      s.status = f.get('status');
      s.notes = f.get('notes');
      
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
      
      s.controlledBy = "Seda Kaya (Yönetici)";
      s.lastControl = "Bugün, " + new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
      
      if (s.pestType !== 'none') {
        s.status = 'activity';
      } else if (s.status === 'activity') {
        s.status = 'clean';
      }
      
      recalculateSiteStats(site);
      save();
      showCompanyDetail(ui.activeSiteId);
      toast(`İstasyon ${s.code} denetimi başarıyla kaydedildi.`);
    }

    // Company profile file upload form submit
    if (e.target.id === 'companyFileUploadForm') {
      e.preventDefault();
      if (!ui.activeSiteId) return;
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (!site) return;
      
      const inpName = $('#inpUploadFileName');
      const inpFile = $('#inpUploadFile');
      const inpCat = $('#inpUploadFileCategory');
      if (!inpName || !inpFile) return;
      
      const fileName = inpName.value.trim();
      if (!fileName) return;
      
      const ext = inpFile.files[0] ? inpFile.files[0].name.split('.').pop() : 'pdf';
      const rawSize = inpFile.files[0] ? inpFile.files[0].size : 1250000;
      const sizeStr = rawSize > 1024*1024 ? `${(rawSize/(1024*1024)).toFixed(1)} MB` : `${Math.round(rawSize/1024)} KB`;
      const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
      const category = inpCat ? inpCat.value : 'SDS';
      
      if (!site.files) site.files = [];
      site.files.unshift({
        name: `${fileName}.${ext}`,
        type: ext,
        size: sizeStr,
        date: dateStr,
        category: category
      });
      
      save();
      renderCompanyFiles(site);
      
      inpName.value = '';
      inpFile.value = '';
      toast('Belge başarıyla yüklendi ve site profiline eklendi.');
    }

    // Company profile recommendation form submit
    if (e.target.id === 'companyRecommendationForm') {
      e.preventDefault();
      if (!ui.activeSiteId) return;
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (!site) return;
      
      const inpDesc = $('#inpRecDesc');
      const inpCat = $('#inpRecCategory');
      const inpAss = $('#inpRecAssignee');
      const inpDue = $('#inpRecDueDate');
      if (!inpDesc || !inpCat || !inpAss || !inpDue) return;
      
      const desc = inpDesc.value.trim();
      const category = inpCat.value;
      const assignee = inpAss.value.trim();
      const dueDateVal = inpDue.value;
      
      if (!desc || !assignee || !dueDateVal) return;
      
      const dMatch = dueDateVal.split('-');
      const formattedDue = dMatch.length === 3 ? `${dMatch[2]} Tem 2026` : '20 Tem 2026';
      
      const newRec = {
        id: `r${Date.now()}`,
        desc: desc,
        category: category,
        assignee: assignee,
        date: "Bugün",
        due: formattedDue,
        status: 'open'
      };
      
      if (!site.recommendations) site.recommendations = [];
      site.recommendations.unshift(newRec);
      save();
      renderCompanyRecommendations(site);
      
      inpDesc.value = '';
      inpAss.value = '';
      inpDue.value = '';
      toast('Standart Önleme Önerisi başarıyla kaydedildi.');
    }

    // Company profile chemical form submit
    if (e.target.id === 'companyChemicalForm') {
      e.preventDefault();
      if (!ui.activeSiteId) return;
      const site = state.sites.find(s => s.id === ui.activeSiteId);
      if (!site) return;
      
      const inpChemSelect = $('#inpChemicalSelect');
      const inpChemQty = $('#inpChemicalQty');
      const inpChemArea = $('#inpChemicalArea');
      const inpChemNotes = $('#inpChemicalNotes');
      if (!inpChemSelect || !inpChemQty || !inpChemArea || !inpChemNotes) return;
      
      const chemicalId = inpChemSelect.value;
      const quantity = inpChemQty.value.trim();
      const area = inpChemArea.value.trim();
      const notes = inpChemNotes.value.trim();
      
      if (!chemicalId || !quantity || !area) return;
      
      const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
      const newChemUse = {
        id: `cu${Date.now()}`,
        chemicalId: chemicalId,
        date: dateStr,
        quantity: quantity,
        area: area,
        tech: state.currentUser ? state.currentUser.name : "Operatör",
        notes: notes
      };
      
      if (!site.chemicalsUsed) site.chemicalsUsed = [];
      site.chemicalsUsed.unshift(newChemUse);
      
      // Auto-deduct stock from inventory
      deductStock(chemicalId, quantity);
      
      save();
      renderChemicalUsage(site);
      
      inpChemSelect.value = '';
      inpChemQty.value = '';
      inpChemArea.value = '';
      inpChemNotes.value = '';
    }

    // Stock Refill Form submit
    if (e.target.id === 'invRefillForm') {
      e.preventDefault();
      const f = new FormData(e.target);
      const chemicalId = f.get('chemicalId');
      const quantity = parseFloat(f.get('quantity')) || 0;
      const lotNo = f.get('lotNo').trim();
      const notes = f.get('notes').trim() || 'Depo stok girişi';
      
      if (!chemicalId || quantity <= 0 || !lotNo) return;
      
      if (!state.inventory) state.inventory = [];
      if (!state.inventoryTransactions) state.inventoryTransactions = [];
      
      const item = state.inventory.find(i => i.chemicalId === chemicalId);
      if (item) {
        item.qty = Math.round((item.qty + quantity) * 10) / 10;
        item.lotNo = lotNo;
      } else {
        const chemInfo = chemicalDatabase.find(c => c.id === chemicalId);
        state.inventory.push({
          id: `stock${Date.now()}`,
          chemicalId: chemicalId,
          name: chemInfo ? chemInfo.name : 'Yeni Kimyasal',
          lotNo: lotNo,
          qty: quantity,
          unit: chemInfo ? chemInfo.unit : 'kg',
          minQty: 5.0,
          unitCost: chemInfo ? chemInfo.unitCost : 100
        });
      }
      
      const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
      state.inventoryTransactions.unshift({
        id: `tx${Date.now()}`,
        chemicalId: chemicalId,
        type: 'refill',
        qty: quantity,
        unit: (chemicalDatabase.find(c => c.id === chemicalId) || {}).unit || 'lt',
        date: dateStr,
        notes: notes
      });
      
      save();
      renderInventory();
      
      e.target.reset();
      toast('Stok girişi başarıyla tamamlandı.');
    }

    // Desktop Task Chemical Form submit
    if (e.target.id === 'taskChemicalForm') {
      e.preventDefault();
      const w = state.work.find(x => x.id === state.selectedWork) || state.work[0];
      if (!w) return;
      
      const site = state.sites.find(s => s.id === w.siteId);
      if (!site) return;
      
      const inpChemSelect = $('#taskChemSelect');
      const inpChemQty = $('#taskChemQty');
      const inpChemArea = $('#taskChemArea');
      const inpChemNotes = $('#taskChemNotes');
      if (!inpChemSelect || !inpChemQty || !inpChemArea || !inpChemNotes) return;
      
      const chemicalId = inpChemSelect.value;
      const quantity = inpChemQty.value.trim();
      const area = inpChemArea.value.trim();
      const notes = inpChemNotes.value.trim();
      
      if (!chemicalId || !quantity || !area) return;
      
      const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
      const newChemUse = {
        id: `cu${Date.now()}`,
        workOrderId: w.id,
        chemicalId: chemicalId,
        date: dateStr,
        quantity: quantity,
        area: area,
        tech: w.tech,
        notes: notes || 'Ziyaret uygulaması'
      };
      
      if (!site.chemicalsUsed) site.chemicalsUsed = [];
      site.chemicalsUsed.unshift(newChemUse);
      
      // Auto-deduct stock
      deductStock(chemicalId, quantity);
      
      save();
      renderTask();
      
      inpChemSelect.value = '';
      inpChemQty.value = '';
      inpChemArea.value = '';
      inpChemNotes.value = '';
      toast('Kimyasal başarıyla eklendi.');
    }

    // Mobile Chemical Form submit
    if (e.target.id === 'mobChemicalForm') {
      e.preventDefault();
      if (!ui.mobJob) return;
      
      const site = state.sites.find(s => s.id === ui.mobJob.siteId);
      if (!site) return;
      
      const inpChemSelect = $('#mobChemSelect');
      const inpChemQty = $('#mobChemQty');
      const inpChemArea = $('#mobChemArea');
      const inpChemNotes = $('#mobChemNotes');
      if (!inpChemSelect || !inpChemQty || !inpChemArea || !inpChemNotes) return;
      
      const chemicalId = inpChemSelect.value;
      const quantity = inpChemQty.value.trim();
      const area = inpChemArea.value.trim();
      const notes = inpChemNotes.value.trim();
      
      if (!chemicalId || !quantity || !area) return;
      
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
  });
}

// Inline onclick handlers in generated markup need global scope.
Object.assign(window, { showStationDetail, switchCompanyTab });

bind();
checkSession();
render();

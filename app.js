// Clean stale data from previous versions
localStorage.removeItem("ladybug-product-demo"); localStorage.removeItem("insectram-product-demo"); localStorage.removeItem("insectram-ops");
const initial = {
  view: "dashboard", selectedWork: "WO-2048", selectedTech: "Ayşe Demir", completed: 27,
  sites: [
    { 
      id:"s1", company:"Acme Foods", name:"Gebze Üretim Tesisi", city:"Kocaeli", score:62, state:"risk", issues:3, last:"12 Tem · Ayşe Demir", next:"Bugün, 14:30", color:"#e8d8c7",
      sector: "Gıda Üretimi & Depolama",
      contact: { name: "Ahmet Yılmaz", phone: "+90 532 123 4567", email: "ahmet@acmefoods.com" },
      methods: [
        { name: "Kemirgen İstasyon Kontrolü", desc: "Tesis dış çevresinde kilitli yem istasyonları ile kemirgen mücadelesi.", active: true },
        { name: "Yürüyen Haşere İzleme", desc: "Hammadde depolarında yapışkan pheromone tuzakları.", active: true },
        { name: "Uçan Haşere UV Işıklı Cihazlar", desc: "Ambalaj hattında yapışkan bantlı UV cihaz denetimi.", active: true },
        { name: "Rezidüel Bariyer İlaçlaması", desc: "Kritik giriş kapılarında kalıcı sıvı ilaç uygulaması.", active: false }
      ],
      files: [
        { name: "Hizmet_Sozlesmesi_2026.pdf", type: "pdf", size: "1.2 MB", date: "02 Ocak 2026" },
        { name: "Tesis_Risk_Analizi_Raporu.pdf", type: "pdf", size: "3.4 MB", date: "15 Ocak 2026" },
        { name: "Biyosidal_Urun_Izin_Belgeleri.pdf", type: "pdf", size: "850 KB", date: "12 Şubat 2026" }
      ],
      stations: [
        { code:"R-01", type:"rodent", x:15, y:22, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"R-02", type:"rodent", x:45, y:28, checked:true, status:"clean", baitStatus:"replaced", pestType:"none", pestCount:0, notes:"" },
        { code:"R-03", type:"rodent", x:75, y:24, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-01", type:"crawler", x:20, y:72, checked:true, status:"activity", baitStatus:"consumed", pestType:"cockroach", pestCount:4, notes:"Hammadde deposu girişinde yoğunlaşma var." },
        { code:"C-02", type:"crawler", x:50, y:78, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"F-01", type:"flying", x:80, y:68, checked:true, status:"activity", baitStatus:"intact", pestType:"fly", pestCount:12, notes:"Atık alanı yakınındaki cihaz kontrol edilmeli." },
        { code:"ILT-01", type:"insect_light_trap", x:35, y:48, checked:true, status:"damaged", baitStatus:"missing", pestType:"none", pestCount:0, notes:"UV ampulü patlak, yenilenmesi gerek." },
        { code:"ILT-02", type:"insect_light_trap", x:65, y:52, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
      ]
    },
    { 
      id:"s2", company:"Kuzey Lojistik", name:"Hadımköy Dağıtım Merkezi", city:"İstanbul", score:68, state:"risk", issues:2, last:"11 Tem · Mert Kaya", next:"Bugün, 16:00", color:"#d8e9e4",
      sector: "Lojistik & Depolama",
      contact: { name: "Banu Gök", phone: "+90 541 456 7890", email: "bgok@kuzeylojistik.com.tr" },
      methods: [
        { name: "Kemirgen İstasyon Kontrolü", desc: "Tesis dış çevresinde kilitli yem istasyonları ile kemirgen mücadelesi.", active: true },
        { name: "Yürüyen Haşere İzleme", desc: "Depo içlerinde yapışkan pheromone tuzakları.", active: true },
        { name: "Uçan Haşere UV Işıklı Cihazlar", desc: "Kabul bölümünde UV cihaz denetimi.", active: false }
      ],
      files: [
        { name: "Lojistik_Servis_Sozlesmesi.pdf", type: "pdf", size: "980 KB", date: "10 Ocak 2026" },
        { name: "Hadimkoy_Kroki_Haritasi.pdf", type: "pdf", size: "2.1 MB", date: "11 Ocak 2026" }
      ],
      stations: [
        { code:"R-01", type:"rodent", x:12, y:18, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"R-02", type:"rodent", x:38, y:22, checked:true, status:"clean", baitStatus:"replaced", pestType:"none", pestCount:0, notes:"" },
        { code:"R-03", type:"rodent", x:62, y:19, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"R-04", type:"rodent", x:88, y:25, checked:true, status:"activity", baitStatus:"consumed", pestType:"mouse", pestCount:1, notes:"A-3 kapısı dış çevresinde kemirilme var." },
        { code:"C-01", type:"crawler", x:22, y:58, checked:true, status:"activity", baitStatus:"consumed", pestType:"cockroach", pestCount:2, notes:"Yükleme rampasında yürüye haşere var." },
        { code:"C-02", type:"crawler", x:72, y:62, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"F-01", type:"flying", x:50, y:82, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
      ]
    },
    { 
      id:"s3", company:"Aster Hospital", name:"Ataşehir Kampüsü", city:"İstanbul", score:74, state:"watch", issues:1, last:"12 Tem · Ece Yılmaz", next:"14 Tem, 09:00", color:"#e8e0f5",
      sector: "Sağlık & Hastane",
      contact: { name: "Dr. Selim Tekin", phone: "+90 533 987 6543", email: "selim.tekin@asterhospital.com" },
      methods: [
        { name: "Kemirgen Kokusuz Jel Uygulaması", desc: "Kritik mutfak ve sterilizasyon alanlarında jel ilaçlama.", active: true },
        { name: "Yürüyen Haşere İzleme", desc: "Koridor ve sosyal alanlarda yapışkan tuzaklar.", active: true },
        { name: "UV Cihaz Denetimi", desc: "Yemekhane bölümünde UV ışıklı tuzaklar.", active: true }
      ],
      files: [
        { name: "Hastane_Hijyen_Sertifikasi.pdf", type: "pdf", size: "1.5 MB", date: "05 Şubat 2026" },
        { name: "Biyosidal_Urun_Bildirim_Formu.pdf", type: "pdf", size: "430 KB", date: "20 Şubat 2026" }
      ],
      stations: [
        { code:"R-01", type:"rodent", x:18, y:32, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"R-02", type:"rodent", x:48, y:38, checked:true, status:"clean", baitStatus:"replaced", pestType:"none", pestCount:0, notes:"" },
        { code:"R-03", type:"rodent", x:78, y:34, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-01", type:"crawler", x:32, y:72, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-02", type:"crawler", x:62, y:78, checked:true, status:"activity", baitStatus:"intact", pestType:"other", pestCount:1, notes:"Gümüşcün böceği görüldü, ilaçlama yapıldı." },
        { code:"ILT-01", type:"insect_light_trap", x:52, y:18, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
      ]
    },
    { 
      id:"s4", company:"Bora Retail", name:"Levent Merkez Mağaza", city:"İstanbul", score:81, state:"watch", issues:0, last:"10 Tem · Can Öztürk", next:"15 Tem, 11:00", color:"#f4e6bf",
      sector: "Perakende & Mağazacılık",
      contact: { name: "Mustafa Çelik", phone: "+90 535 765 4321", email: "mustafa.celik@boraretail.com" },
      methods: [
        { name: "Yürüyen Haşere İzleme", desc: "Raf ve reyon altlarında yapışkan tuzaklar.", active: true },
        { name: "Uçan Haşere UV Işıklı Cihazlar", desc: "Depo girişinde UV sinek tuzağı.", active: true }
      ],
      files: [
        { name: "Bora_Merkez_Sozlesme.pdf", type: "pdf", size: "750 KB", date: "15 Aralık 2025" }
      ],
      stations: [
        { code:"R-01", type:"rodent", x:22, y:22, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"R-02", type:"rodent", x:78, y:24, checked:true, status:"clean", baitStatus:"replaced", pestType:"none", pestCount:0, notes:"" },
        { code:"C-01", type:"crawler", x:28, y:68, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-02", type:"crawler", x:72, y:72, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"F-01", type:"flying", x:50, y:48, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
      ]
    },
    { 
      id:"s5", company:"Novatek", name:"Çayırova Ar-Ge Merkezi", city:"Kocaeli", score:91, state:"healthy", issues:0, last:"12 Tem · Mert Kaya", next:"18 Tem, 10:30", color:"#d7e9f4",
      sector: "Ar-Ge & Laboratuvar",
      contact: { name: "Eren Demir", phone: "+90 530 234 5678", email: "eren.demir@novatek.io" },
      methods: [
        { name: "Kemirgen İstasyon Kontrolü", desc: "Tesis dış çevresinde kilitli yem istasyonları.", active: true },
        { name: "Yürüyen Haşere İzleme", desc: "Laboratuvar girişlerinde yapışkan tuzaklar.", active: true }
      ],
      files: [
        { name: "Novatek_Hizmet_Protokolu.pdf", type: "pdf", size: "1.1 MB", date: "10 Ocak 2026" }
      ],
      stations: [
        { code:"R-01", type:"rodent", x:20, y:24, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"R-02", type:"rodent", x:50, y:22, checked:true, status:"clean", baitStatus:"replaced", pestType:"none", pestCount:0, notes:"" },
        { code:"R-03", type:"rodent", x:80, y:26, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-01", type:"crawler", x:30, y:72, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-02", type:"crawler", x:70, y:74, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"ILT-01", type:"insect_light_trap", x:50, y:48, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
      ]
    },
    { 
      id:"s6", company:"Orion Hotels", name:"Taksim Otel", city:"İstanbul", score:88, state:"healthy", issues:0, last:"11 Tem · Ece Yılmaz", next:"19 Tem, 13:30", color:"#f0dbe2",
      sector: "Turizm & Otelcilik",
      contact: { name: "Selin Şen", phone: "+90 542 345 6789", email: "selin.sen@orionhotels.com" },
      methods: [
        { name: "Jel İlaçlama Uygulaması", desc: "Mutfak ve depo alanlarında yürüyen haşere jeli.", active: true },
        { name: "Fly Trap Cihaz Denetimi", desc: "Lobi ve restaurant alanlarında dekoratif UV cihazları.", active: true },
        { name: "Kemirgen İstasyon Kontrolü", desc: "Kazan dairesi ve dış çevre kontrol noktaları.", active: true }
      ],
      files: [
        { name: "Orion_Taksim_Servis_Sozlesmesi.pdf", type: "pdf", size: "1.4 MB", date: "28 Aralık 2025" }
      ],
      stations: [
        { code:"R-01", type:"rodent", x:18, y:26, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"R-02", type:"rodent", x:48, y:22, checked:true, status:"clean", baitStatus:"replaced", pestType:"none", pestCount:0, notes:"" },
        { code:"R-03", type:"rodent", x:78, y:28, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-01", type:"crawler", x:32, y:68, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"C-02", type:"crawler", x:68, y:72, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
        { code:"ILT-01", type:"insect_light_trap", x:50, y:48, checked:true, status:"clean", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
      ]
    }
  ],
  work: [
    {id:"WO-2048", siteId:"s1", title:"Kemirgen aktivitesi — acil inceleme", site:"Acme Foods · Gebze Üretim Tesisi", priority:"critical", type:"Kritik bulgu", due:"Bugün, 14:30", tech:"Ayşe Demir", description:"R-12 yem istasyonunda yüksek kemirgen aktivitesi tespit edildi. Alanın incelenmesi ve aksiyon planının kayıt altına alınması gerekiyor."},
    {id:"WO-2047", siteId:"s2", title:"Yükleme alanı istasyon kontrolü", site:"Kuzey Lojistik · Hadımköy DM", priority:"critical", type:"Kritik bulgu", due:"Bugün, 16:00", tech:"Mert Kaya", description:"Yükleme rampası çevresindeki üç istasyon için kontrol ve yenileme servisi planlandı."},
    {id:"WO-2045", siteId:"s3", title:"Periyodik saha servisi", site:"Aster Hospital · Ataşehir Kampüsü", priority:"high", type:"Planlı servis", due:"14 Tem, 09:00", tech:"Ece Yılmaz", description:"Aylık sözleşme kapsamındaki rutin saha servisi ve dijital istasyon denetimi."},
    {id:"WO-2042", siteId:"s4", title:"Müşteri talebi — uçan haşere", site:"Bora Retail · Levent Merkez", priority:"high", type:"Müşteri talebi", due:"15 Tem, 11:00", tech:"Can Öztürk", description:"Müşteri tarafından bildirilen uçan haşere aktivitesinin yerinde kontrolü."}
  ]
};
let state = load();
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const names = { dashboard:"Genel bakış", sites:"Tesisler", work:"İş emirleri", team:"Ekip & rota", insights:"Analizler", reports:"Raporlar", companyDetail:"Tesis Detayı & Profil", mobileSim:"Mobil Uygulama" };
const stateLabel = {risk:"Riskli",watch:"İzlenmeli",healthy:"Sağlıklı"};

const users = {
  'admin@ladybug.com': { email: 'admin@ladybug.com', name: 'Seda Kaya', role: 'admin', title: 'Operasyon Yöneticisi (Boss)', avatar: 'SK' },
  'admin@insectram.com': { email: 'admin@ladybug.com', name: 'Seda Kaya', role: 'admin', title: 'Operasyon Yöneticisi (Boss)', avatar: 'SK' },
  'ayse@ladybug.com': { email: 'ayse@ladybug.com', name: 'Ayşe Demir', role: 'tech', title: 'Baş Teknisyen', avatar: 'AD' },
  'ayse@insectram.com': { email: 'ayse@ladybug.com', name: 'Ayşe Demir', role: 'tech', title: 'Baş Teknisyen', avatar: 'AD' },
  'acme@client.com': { email: 'acme@client.com', name: 'Ahmet Çelik', role: 'client', title: 'Acme Gıda Yetkilisi', avatar: 'AC' }
};

function applyRoleAccess() {
  if (!state.currentUser) return;
  
  const role = state.currentUser.role;
  const appShell = $('.app-shell');
  const viewLogin = $('#viewLogin');
  
  if (appShell) appShell.classList.remove('hidden');
  if (viewLogin) viewLogin.classList.add('hidden');
  
  const footerBlock = $('#sidebarUserProfileBlock');
  if (footerBlock) {
    footerBlock.innerHTML = `
      <div class="avatar" style="background:${role === 'tech' ? '#f4c7a9' : (role === 'client' ? '#d6e7f9' : '#efe5d8')}; color:#18181b; font-weight:700; width:30px; height:30px; border-radius:50%; display:grid; place-items:center; font-size:10px;">${state.currentUser.avatar}</div>
      <div style="flex:1; text-align:left; min-width:0; overflow:hidden;">
        <b style="font-size:12px; display:block; color:#fff; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${state.currentUser.name}</b>
        <small style="font-size:10px; color:#aeb8c1; display:block; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${state.currentUser.title}</small>
      </div>
      <button class="secondary-btn" id="btnLogOut" style="height:26px; padding:0 8px; font-size:9px; border-color:rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:#fff; font-weight:700; border-radius:6px; cursor:pointer;">Çıkış</button>
    `;
  }

  if (role === 'admin') {
    $$('.sidebar .nav button').forEach(b => b.classList.remove('hidden'));
    $$('.sidebar .nav-label').forEach(l => l.classList.remove('hidden'));
    $('#addSite')?.classList.remove('hidden');
    $('#newWorkOrder')?.classList.remove('hidden');
    $('#newWorkOrderSecondary')?.classList.remove('hidden');
    $('#backToSitesFromCompBtn')?.classList.remove('hidden');
    $('#companyFileUploadForm')?.classList.remove('hidden');
    $('#companyRecommendationForm')?.classList.remove('hidden');
    $('#adminInspectionForm')?.classList.remove('hidden');
    $('#printStationQrBtn')?.classList.remove('hidden');
  } 
  else if (role === 'tech') {
    $$('.sidebar .nav button').forEach(b => {
      const view = b.dataset.view;
      b.classList.toggle('hidden', view !== 'work' && view !== 'mobileSim');
    });
    $$('.sidebar .nav-label').forEach(l => l.classList.add('hidden'));
    
    $('#addSite')?.classList.add('hidden');
    $('#newWorkOrder')?.classList.add('hidden');
    $('#newWorkOrderSecondary')?.classList.add('hidden');
    $('#backToSitesFromCompBtn')?.classList.add('hidden');
    $('#companyFileUploadForm')?.classList.add('hidden');
    $('#companyRecommendationForm')?.classList.add('hidden');
    $('#adminInspectionForm')?.classList.remove('hidden');
    $('#printStationQrBtn')?.classList.add('hidden');
    
    if (state.view !== 'work' && state.view !== 'mobileSim') {
      setView('work');
    }
  } 
  else if (role === 'client') {
    $$('.sidebar .nav button').forEach(b => b.classList.add('hidden'));
    $$('.sidebar .nav-label').forEach(l => l.classList.add('hidden'));
    
    $('#addSite')?.classList.add('hidden');
    $('#newWorkOrder')?.classList.add('hidden');
    $('#newWorkOrderSecondary')?.classList.add('hidden');
    
    activeSiteId = 's1'; 
    setView('companyDetail');
    
    $('#backToSitesFromCompBtn')?.classList.add('hidden');
    $('#companyFileUploadForm')?.classList.add('hidden');
    $('#companyRecommendationForm')?.classList.add('hidden');
    $('#adminInspectionForm')?.classList.add('hidden');
    $('#printStationQrBtn')?.classList.add('hidden');
  }
}

function checkSession() {
  const savedUser = localStorage.getItem("ladybug-user");
  const appShell = $('.app-shell');
  const viewLogin = $('#viewLogin');
  
  if (savedUser) {
    state.currentUser = JSON.parse(savedUser);
    if (appShell) appShell.classList.remove('hidden');
    if (viewLogin) viewLogin.classList.add('hidden');
    applyRoleAccess();
  } else {
    state.currentUser = null;
    if (appShell) appShell.classList.add('hidden');
    if (viewLogin) viewLogin.classList.remove('hidden');
  }
}

function logout() {
  state.currentUser = null;
  localStorage.removeItem("ladybug-user");
  checkSession();
  toast("Oturum kapatıldı.");
}

let activeSiteId = null;
let activeStationCode = null;

// Mobile app workflow states
let mobJob = null;
let mobArrived = false;
let mobQrStarted = false;
let mobOfflineReady = false;
let activeMobileStationCode = null;

function load(){
  try {
    const saved = JSON.parse(localStorage.getItem("ladybug-ops"));
    if (!saved) return structuredClone(initial);
    // Detect stale data missing new fields and reset
    if (saved.sites && saved.sites[0] && !saved.sites[0].methods) {
      localStorage.removeItem("ladybug-ops");
      return structuredClone(initial);
    }
    // Initialize recommendations array for all sites if missing
    saved.sites.forEach((s, idx) => {
      if (!s.recommendations) {
        s.recommendations = [
          { id: "r1", desc: `${s.name} dış çevre kapı eşiğindeki conta yıpranmış, kemirgen geçişini önlemek için yenilenmeli.`, category: "BRCGS", assignee: "Tesis Bakım Departmanı", date: "10 Haz 2026", due: "25 Tem 2026", status: "open" },
          { id: "r2", desc: "Üretim holü sevkiyat rampası A-2 kapısına hava perdesi veya pvc şerit bariyer takılmalı.", category: "AIB", assignee: "Operasyon Yöneticisi", date: "05 Tem 2026", due: "10 Ağu 2026", status: "open" }
        ];
      }
    });
    return {...structuredClone(initial),...saved};
  } catch { return structuredClone(initial); }
}
function save(){localStorage.setItem("ladybug-ops",JSON.stringify(state))}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.remove("hidden");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add("hidden"),3000)}

function setView(view){
  state.view=view;
  save();
  $$('.view').forEach(x=>x.classList.toggle('active',x.id===view));
  $$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
  $('#pageCrumb').textContent=names[view] || "Genel bakış";
  window.scrollTo({top:0,behavior:'smooth'});
  
  if (view === 'mobileSim') {
    renderMobileRoute();
  }
}

function recalculateSiteStats(site) {
  if (!site.stations) site.stations = [];
  const total = site.stations.length;
  if (total === 0) return;
  const checked = site.stations.filter(s => s.checked).length;
  const activityCount = site.stations.filter(s => s.checked && s.status === 'activity').reduce((sum, s) => sum + (s.pestCount || 0), 0);
  const damagedCount = site.stations.filter(s => s.checked && (s.status === 'damaged' || s.status === 'missing')).length;
  
  site.issues = site.stations.filter(s => s.status === 'activity' || s.status === 'damaged' || s.status === 'missing').length;
  
  // Base score 100, drops by pest activity and physical damage
  let score = 100 - (activityCount * 8) - (damagedCount * 15);
  site.score = Math.max(10, Math.min(100, score));
  
  if (site.score >= 85) site.state = 'healthy';
  else if (site.score >= 70) site.state = 'watch';
  else site.state = 'risk';
}

function riskRows(){
  return state.work.filter(w => !w.completed).slice(0,3).map(w=>`
    <div class="risk-item" data-work-id="${w.id}" style="cursor:pointer;">
      <span class="risk-bar ${w.priority}"></span>
      <div><b>${w.title}</b><small>${w.site}</small></div>
      <p class="risk-desc">${w.description.slice(0,67)}…</p>
      <div><span class="status-chip ${w.priority}">${w.type}</span><small>${w.due}</small></div>
    </div>
  `).join('');
}

function renderDashboard(){ 
  // Recalculate all sites stats to ensure dashboard represents fresh data
  state.sites.forEach(recalculateSiteStats);
  
  $('#riskList').innerHTML=riskRows(); 
  $('#criticalMetric').textContent=state.sites.reduce((n,s)=>n+s.issues,0);
  $('#completedMetric').textContent=state.completed; 
  $('#workCompleted').textContent=state.completed; 
  
  $('#activityFeed').innerHTML=[
    ['done','✓','Servis raporu onaylandı','Novatek · Çayırova Ar-Ge Merkezi','10:42', 's5'],
    ['alert','!','Kritik aktivite kaydedildi','Acme Foods · R-12 istasyonu','10:18', 's1'],
    ['','⌖','Teknisyen tesise ulaştı','Ayşe Demir · Gebze Üretim Tesisi','10:05', 's1'],
    ['','↗','Müşteri raporu paylaşıldı','Orion Hotels · Taksim Otel','09:48', 's6']
  ].map(x=>`
    <div class="activity-item" data-site-id="${x[5]}" style="cursor:pointer;">
      <span class="feed-icon ${x[0]}">${x[1]}</span>
      <div><b>${x[2]}</b><p>${x[3]}</p></div>
      <time>${x[4]}</time>
    </div>
  `).join(''); 
  
  $('#scheduleList').innerHTML=[
    ['14:30','Acme Foods','Gebze Üretim Tesisi','AD', 's1'],
    ['16:00','Kuzey Lojistik','Hadımköy DM','MK', 's2'],
    ['17:15','Orion Hotels','Taksim Otel','EY', 's6']
  ].map(x=>`
    <div class="schedule-item" data-site-id="${x[4]}" style="cursor:pointer;">
      <span class="schedule-time">${x[0]}</span>
      <div><b>${x[1]}</b><p>${x[2]}</p></div>
      <span class="schedule-avatar">${x[3]}</span>
    </div>
  `).join('');

  // Update Portfolio donut score dynamically
  const avgScore = Math.round(state.sites.reduce((sum, s) => sum + s.score, 0) / state.sites.length);
  const healthyCount = state.sites.filter(s => s.state === 'healthy').length;
  const watchCount = state.sites.filter(s => s.state === 'watch').length;
  const riskCount = state.sites.filter(s => s.state === 'risk').length;

  const scoreEl = $('#portfolioScore');
  if (scoreEl) scoreEl.textContent = avgScore;
  
  const donut = $('.donut');
  if (donut) {
    const totalSites = state.sites.length;
    const hDeg = Math.round((healthyCount / totalSites) * 360);
    const wDeg = Math.round(((healthyCount + watchCount) / totalSites) * 360);
    donut.style.background = `conic-gradient(var(--green) 0deg ${hDeg}deg, #f0bd4a ${hDeg}deg ${wDeg}deg, #e05a54 ${wDeg}deg 360deg)`;
  }

  const legend = $('.score-legend');
  if (legend) {
    legend.innerHTML = `
      <p><i class="legend-dot good"></i><b>${healthyCount}</b> Sağlıklı</p>
      <p><i class="legend-dot watch"></i><b>${watchCount}</b> İzlenmeli</p>
      <p><i class="legend-dot risk"></i><b>${riskCount}</b> Riskli</p>
    `;
  }
}

function renderSites(){
  const query=$('#siteSearch')?.value.toLocaleLowerCase('tr')||'';
  const filter=$('.filter-btn.active')?.dataset.siteFilter||'all';
  
  state.sites.forEach(recalculateSiteStats);
  
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

function renderWork(filter='all'){
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
        <small>${w.due}</small>
      </div>
    </div>
  `).join('') || `<p class="empty">${filter==='completed'?'Henüz tamamlanan bir iş emri bulunmuyor.':'Bu görünümde açık iş emri bulunmuyor.'}</p>`;
  
  renderTask();
}

function renderTask(){
  const w=state.work.find(x=>x.id===state.selectedWork)||state.work[0];
  if (!w) {
    $('#taskDetail').innerHTML = '<p class="empty">Seçili iş emri bulunmuyor.</p>';
    return;
  }
  
  const compBtn = w.completed ? 
    `<button class="secondary-btn" disabled style="width:100%;">✓ Servis Tamamlandı</button>` : 
    `<button class="primary-btn" id="completeWork">✓ Tamamlandı olarak işaretle</button>`;
    
  $('#taskDetail').innerHTML=`
    <span class="status-chip ${w.completed?'healthy':w.priority}">${w.completed?'Tamamlandı':w.type}</span>
    <h2>${w.title}</h2>
    <p>${w.description}</p>
    <div class="detail-list">
      <div><span>Tesis</span><b>${w.site.split(' · ')[1]}</b></div>
      <div><span>Atanan teknisyen</span><b>${w.tech}</b></div>
      <div><span>Hedef zaman</span><b>${w.due}</b></div>
      <div><span>İş emri</span><b>${w.id}</b></div>
    </div>
    <div style="display:grid; gap:8px;">
      ${compBtn}
      <button class="secondary-btn" data-site-id="${w.siteId}">⌖ Tesis Kat Planını Aç</button>
    </div>
  `;
}

const techData={"Ayşe Demir":['AD','Müşteride','Gebze Üretim Tesisi','İlk QR 10:11','2 dk önce','#efe5d8'],"Mert Kaya":['MK','Yolda','Hadımköy Dağıtım Merkezi','Son QR 09:42','4 dk önce','#dce9f7'],"Ece Yılmaz":['EY','Müşteride','Taksim Otel','İlk QR 09:36','1 dk önce','#e8dff4'],"Can Öztürk":['CÖ','Rotada','Levent Merkez Mağaza','Son QR 08:58','6 dk önce','#f1e4d5']};
const techSites = {"Ayşe Demir":"s1","Mert Kaya":"s2","Ece Yılmaz":"s6","Can Öztürk":"s4"};

function renderTeam(){
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

function renderInsights(){
  const d={all:[34,29,31,24,27,19,22,16],rodent:[13,11,15,9,10,8,7,6],flying:[12,10,9,8,11,7,9,5],crawler:[9,8,7,7,6,4,6,5]}[$('#trendFilter').value];
  const max=Math.max(...d);
  $('#trendChart').innerHTML=d.map((n,i)=>`<span class="chart-bar" data-value="${n}" data-label="H${i+1}" style="height:${n/max*210}px"></span>`).join('');
  $('#ranking').innerHTML=state.sites.slice(0,5).map((s,i)=>`
    <div class="rank-row" data-site-id="${s.id}" style="cursor:pointer;">
      <span>0${i+1}</span>
      <div><b>${s.name}</b><small>${s.company} · ${s.issues} açık bulgu</small></div>
      <strong class="rank-score">${s.score}</strong>
    </div>
  `).join('');
}

function renderReports(){
  const reports=[
    ['▤','Aylık BRCGS Müşteri Servis Raporu','Servis özeti, istasyon bulguları ve dijital imza.','12 Tem 2026', 'r1'],
    ['↗','Hadımköy DM Servis Özeti Raporu','Tüm istasyonlar için detaylı aktivite logu.','11 Tem 2026', 'r2'],
    ['✓','AIB Hastane Hijyen Uyum Sertifikası','Mutfak, sterilizasyon ve UV cihaz kayıtları.','10 Tem 2026', 'r3'],
    ['⌖','Tesis Aktivite Haritası Raporu','İstasyon bazında aktivite ve trend analizi.','7 Tem 2026', 'r1'],
    ['!','Düzeltici Faaliyet Takip Raporu','Açık bulgular, sorumlular ve hedef tarihler.','5 Tem 2026', 'r2'],
    ['◉','Sözleşme SLA Performans Özeti','Zamanında servis ve müşteri memnuniyeti analizi.','1 Tem 2026', 'r3']
  ];
  $('#reportGrid').innerHTML=reports.map(x=>`<article class="report-card"><span class="report-icon">${x[0]}</span><h2>${x[1]}</h2><p>${x[2]}</p><footer><span>Son oluşturulma: ${x[3]}</span><button class="text-btn" data-report="${x[1]}" data-report-id="${x[4]}">Aç →</button></footer></article>`).join('');
}

function render(){
  renderDashboard();
  renderSites();
  renderWork();
  renderTeam();
  renderInsights();
  renderReports();
  renderAiPredictions();
  setView(state.view);
  applyRoleAccess();
}

// Company Detail Page & Tabs Management
function showCompanyDetail(siteId) {
  activeSiteId = siteId;
  activeStationCode = null;
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
  if (contractPeriodEl) contractPeriodEl.textContent = site.id === 's1' ? '01.01.2026 - 31.12.2026' : (site.id === 's2' ? '15.02.2026 - 15.02.2027' : '01.03.2026 - 01.03.2027');
  if (serviceFrequencyEl) serviceFrequencyEl.textContent = site.id === 's1' ? '15 Günde Bir (Ayda 2 Servis)' : (site.id === 's3' ? 'Haftalık (Ayda 4 Servis)' : 'Aylık Periyodik Koruma');
  if (addressEl) addressEl.textContent = site.id === 's1' ? 'Gebze Organize Sanayi Bölgesi, Kocaeli' : (site.id === 's2' ? 'Hadımköy Nakliyeciler Sitesi, İstanbul' : 'Ataşehir Sağlık Kampüsü, İstanbul');
  
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
  
  // Reset form panel
  $('#stationDetailsEmpty').classList.remove('hidden');
  $('#stationDetailsContent').classList.add('hidden');
  
  // Reset active filter button styling
  $$('[data-station-filter]').forEach(x => x.classList.toggle('active', x.dataset.stationFilter === 'all'));
  
  switchCompanyTab('overview');
  setView('companyDetail');
}

function switchCompanyTab(tabId) {
  $$('.comp-nav-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.compTab === tabId);
  });
  
  const tabPanes = {
    overview: 'paneCompOverview',
    map: 'paneCompMap',
    methods: 'paneCompMethods',
    files: 'paneCompFiles',
    recommendations: 'paneCompRecommendations'
  };
  
  Object.entries(tabPanes).forEach(([t, id]) => {
    const pane = $(`#${id}`);
    if (pane) pane.classList.toggle('hidden', t !== tabId);
  });
}

function renderCompanyMethods(site) {
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

function renderCompanyFiles(site) {
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

function renderCompanyRecommendations(site) {
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

function getStationArea(x, y) {
  const px = (x / 100) * 800;
  const py = (y / 100) * 500;
  if (px >= 20 && px < 300 && py >= 20 && py < 220) return "Hammadde Deposu";
  if (px >= 300 && px < 550 && py >= 20 && py < 140) return "Ofisler & Laboratuvar";
  if (px >= 550 && px <= 780 && py >= 20 && py < 220) return "Sosyal Tesisler";
  if (px >= 20 && px < 470 && py >= 220 && py <= 480) return "Ana Üretim Hattı";
  if (px >= 470 && px <= 780 && py >= 220 && py <= 480) return "Ambalaj & Sevkiyat";
  return "Dış Çevre / Genel";
}

function renderCompanyStationsTable(site) {
  const container = $('#compStationsTableBody');
  if (!container) return;
  
  const typeLabels = {
    rodent: 'Kemirgen Yem İstasyonu',
    crawler: 'Yürüyen Haşere Monitörü',
    flying: 'Uçan Haşere Cihazı',
    insect_light_trap: 'UV Işıklı Cihaz (ILT)'
  };
  
  const statusLabels = {
    clean: 'Temiz & Sağlam',
    activity: 'Aktivite Var',
    damaged: 'Hasarlı',
    missing: 'Eksik',
    unchecked: 'Kontrol Bekliyor'
  };

  const baitLabels = {
    intact: 'Sağlam (Tüketilmedi)',
    consumed: 'Tüketildi',
    replaced: 'Yem Yenilendi',
    missing: 'Yem Eksik'
  };

  const pestLabels = {
    none: 'Yok',
    mouse: 'Fare',
    rat: 'Sıçan',
    cockroach: 'Hamamböceği',
    fly: 'Sinek',
    other: 'Diğer'
  };

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

    const pestCountDesc = s.pestCount > 0 ? ` (${s.pestCount} Adet)` : '';
    const findings = s.checked ? `${pestLabels[s.pestType] || s.pestType}${pestCountDesc}` : '—';
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
        <td><span class="${s.pestCount > 0 ? 'attention' : ''}">${findings}</span></td>
        <td><span class="status-chip ${statusClass}">${statusText}</span></td>
      </tr>
    `;
  }).join('');
}

function renderStationMarkers(stations, filterType = 'all') {
  const container = $('#stationMarkersLayer');
  if (!container) return;
  container.innerHTML = '';
  
  const isHeatmap = $('#heatmapToggleBtn') ? $('#heatmapToggleBtn').checked : false;
  
  stations.forEach(s => {
    if (filterType !== 'all' && s.type !== filterType) return;
    
    const marker = document.createElement('div');
    marker.className = `station-marker ${s.checked ? s.status : 'unchecked'}`;
    if (s.code === activeStationCode) marker.classList.add('selected');
    
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

function showStationDetail(code) {
  activeStationCode = code;
  const site = state.sites.find(s => s.id === activeSiteId);
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
function renderMobileRoute() {
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

function showMobileJobDetail(work) {
  mobJob = work;
  mobArrived = work.status === 'arrived_gps' || work.status === 'started_by_first_qr' || work.completed;
  mobQrStarted = work.status === 'started_by_first_qr' || work.completed;
  
  const site = state.sites.find(s => s.id === work.siteId) || state.sites[0];
  
  // Reset download state for this job unless downloaded earlier
  if (site.downloaded) mobOfflineReady = true;
  else mobOfflineReady = false;
  
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
  if (mobArrived) {
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
  cardQr.classList.toggle('disabled', !mobArrived);
  btnQr.disabled = !mobArrived;
  if (mobQrStarted) {
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
  cardMap.classList.toggle('disabled', !mobQrStarted);
  btnViewPlan.disabled = !mobQrStarted;
  btnDownload.disabled = !mobQrStarted;
  if (mobOfflineReady) {
    btnDownload.classList.add('hidden');
    indOffline.classList.remove('hidden');
  } else {
    btnDownload.classList.remove('hidden');
    indOffline.classList.add('hidden');
  }
  $('#mobDownloadProgress').classList.add('hidden');
  
  // 4. Stations List
  const cardStations = $('#cardStationsList');
  cardStations.classList.toggle('disabled', !mobQrStarted);
  
  renderMobileMiniGrid(site);
  updateSimStepsHighlight();
  
  $('#pageMobileRoute').classList.add('hidden');
  $('#pageMobileJobDetail').classList.remove('hidden');
}

function updateSimStepsHighlight() {
  $$('.sim-steps-list li').forEach(x => x.classList.remove('active-step'));
  if (!mobArrived) {
    $('#step1').classList.add('active-step');
    $('#step2').classList.add('active-step');
  } else if (!mobQrStarted) {
    $('#step3').classList.add('active-step');
  } else {
    const site = state.sites.find(s => s.id === mobJob.siteId);
    const checkedCount = site ? site.stations.filter(s => s.checked).length : 0;
    const totalCount = site ? site.stations.length : 8;
    if (checkedCount < totalCount) {
      $('#step4').classList.add('active-step');
    } else {
      $('#step5').classList.add('active-step');
    }
  }
}

function renderMobileMiniGrid(site) {
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
  
  // Enable complete form button when started and at least 1 checked
  $('#btnMobSaveForm').disabled = !mobQrStarted || checked === 0 || mobJob.completed;
}

function showMobileMap() {
  $('#pageMobileJobDetail').classList.add('hidden');
  $('#pageMobileMap').classList.remove('hidden');
  
  const site = state.sites.find(s => s.id === mobJob.siteId) || state.sites[0];
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

function showMobileInspect(stationCode) {
  activeMobileStationCode = stationCode;
  const site = state.sites.find(s => s.id === mobJob.siteId) || state.sites[0];
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

function openMobileScanner(title, instructions, stations, onScanComplete) {
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

function addTelemetryLog(text) {
  const container = $('#telemetryLogs');
  if (!container) return;
  const timestamp = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const log = document.createElement('div');
  log.className = 'log-line';
  log.innerHTML = `<span style="color:#2ecc71">[${timestamp}]</span> ${text}`;
  container.appendChild(log);
  container.scrollTop = container.scrollHeight;
}

function updatePhoneTime() {
  const el = $('#phoneTime');
  if (el) el.textContent = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updatePhoneTime, 10000);
updatePhoneTime();

function renderAiPredictions() {
  const grid = $('#aiRiskEngineGrid');
  if (!grid) return;
  
  const predictions = [
    { area: "Hammadde Deposu", risk: "84%", trend: "Yüksek Artış", badge: "critical", desc: "Mevsimsel sıcaklık artışı ve nem oranına bağlı olarak kemirgen geçiş riski yüksek." },
    { area: "Ana Üretim Hattı", risk: "12%", trend: "Kararlı Düşüş", badge: "healthy", desc: "Periyodik temizlik ve kalıcı jel bariyerleri sayesinde risk düzeyi minimal seviyede." },
    { area: "Ambalaj & Sevkiyat", risk: "48%", trend: "Yükselme Eğilimi", badge: "warning", desc: "Rampa kapılarının açık kalma süresinin uzaması uçan haşere riskini artırıyor." },
    { area: "Sosyal Tesisler & Ofisler", risk: "28%", trend: "Kararlı", badge: "secondary", desc: "Mutfak drenaj kanalları çevresinde yürüyen haşere aktivite riski izleniyor." }
  ];

  grid.innerHTML = predictions.map(p => `
    <div class="panel" style="padding:15px; border:1px solid var(--line); box-shadow:none; background:var(--soft);">
      <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:8px;">
        <h3 style="margin:0; font-size:13px; font-weight:700;">📍 ${p.area}</h3>
        <span class="status-chip ${p.badge}" style="font-size:9px; font-weight:700; padding:2px 6px;">${p.trend}</span>
      </div>
      <div style="display:flex; align-items:baseline; gap:6px; margin:10px 0;">
        <strong style="font-size:24px; font-weight:800; color:${p.badge === 'critical' ? 'var(--red)' : p.badge === 'warning' ? 'var(--amber)' : p.badge === 'healthy' ? 'var(--green)' : 'var(--muted)'};">${p.risk}</strong>
        <span style="font-size:10px; color:var(--muted)">Risk Oranı</span>
      </div>
      <p style="margin:0; font-size:11px; line-height:1.45; color:var(--muted);">${p.desc}</p>
    </div>
  `).join('');
}

function renderCalendarGrid() {
  const grid = $('#calendarGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const paddingDays = 2; 
  const totalDays = 31;
  
  for (let i = 0; i < paddingDays; i++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell empty-cell';
    cell.style.background = '#fafbfc';
    cell.style.border = '1px dashed var(--line)';
    cell.style.borderRadius = '6px';
    grid.appendChild(cell);
  }
  
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    cell.style.border = '1px solid var(--line)';
    cell.style.borderRadius = '6px';
    cell.style.padding = '8px';
    cell.style.background = '#fff';
    cell.style.display = 'flex';
    cell.style.flexDirection = 'column';
    cell.style.gap = '4px';
    cell.style.minHeight = '85px';
    cell.style.cursor = 'pointer';
    
    if (day === 13) {
      cell.style.border = '2px solid var(--blue)';
      cell.style.background = 'var(--blue-soft)';
    }
    
    const numLabel = document.createElement('span');
    numLabel.textContent = day;
    numLabel.style.fontWeight = '700';
    numLabel.style.fontSize = '12px';
    numLabel.style.color = day === 13 ? 'var(--blue)' : 'var(--ink)';
    cell.appendChild(numLabel);
    
    const dayJobs = state.work.filter(w => {
      if (day === 13 && w.due.includes('Bugün')) return true;
      const dateMatch = w.due.match(/^(\d+)\s+Tem/);
      if (dateMatch && parseInt(dateMatch[1]) === day) return true;
      return false;
    });
    
    dayJobs.forEach(job => {
      const badge = document.createElement('div');
      badge.className = `status-chip ${job.priority === 'critical' ? 'critical' : 'warning'}`;
      badge.style.fontSize = '9px';
      badge.style.padding = '2px 4px';
      badge.style.borderRadius = '3px';
      badge.style.overflow = 'hidden';
      badge.style.textOverflow = 'ellipsis';
      badge.style.whiteSpace = 'nowrap';
      badge.style.fontWeight = '700';
      badge.textContent = `${job.site.split(' · ')[0]} (${job.id})`;
      badge.title = job.title;
      cell.appendChild(badge);
    });
    
    cell.addEventListener('click', () => {
      openQuickScheduleModal(day);
    });
    
    grid.appendChild(cell);
  }
}

function openQuickScheduleModal(day) {
  const content = $('#modalContent');
  const modal = $('#modal');
  if (!content || !modal) return;
  
  const sitesOptions = state.sites.map(s => `<option value="${s.id}">${s.company} - ${s.name}</option>`).join('');
  
  content.innerHTML = `
    <h2>Yeni İş Emri Planla</h2>
    <p class="text-muted">Seçilen Tarih: <b>${day} Temmuz 2026</b></p>
    <form class="form-grid" id="quickScheduleForm">
      <label class="form-label">
        Tesis & Müşteri Seçin
        <select name="siteId" id="inpSchedSiteId" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">${sitesOptions}</select>
      </label>
      <label class="form-label">
        İş Emri Başlığı
        <input required type="text" name="title" id="inpSchedTitle" placeholder="Örn: Haşere İnceleme / Jel İlaçlama" class="form-input">
      </label>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <label class="form-label">
          Ziyaret Saati
          <input required type="time" name="dueTime" id="inpSchedTime" value="09:00" class="form-input" style="height:37px; border:1px solid var(--line); border-radius:7px; padding:0 8px; font-size:12px;">
        </label>
        <label class="form-label">
          Öncelik Seviyesi
          <select name="priority" id="inpSchedPriority" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">
            <option value="normal">Normal Öncelik</option>
            <option value="high">Yüksek Öncelik</option>
            <option value="critical">Acil / Kritik</option>
          </select>
        </label>
      </div>
      <label class="form-label">
        Görevlendirilecek Teknisyen
        <select name="tech" id="inpSchedTech" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">
          <option value="Ayşe Demir">Ayşe Demir (Baş Teknisyen)</option>
          <option value="Mert Kaya">Mert Kaya (Teknisyen)</option>
          <option value="Ece Yılmaz">Ece Yılmaz (Dezenfeksiyon Uzmanı)</option>
          <option value="Can Öztürk">Can Öztürk (Saha Ekibi)</option>
        </select>
      </label>
      <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:10px;">📅 Randevu Oluştur</button>
    </form>
  `;
  
  modal.classList.remove('hidden');
  
  const form = $('#quickScheduleForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedSite = state.sites.find(s => s.id === $('#inpSchedSiteId').value);
    const title = $('#inpSchedTitle').value;
    const priority = $('#inpSchedPriority').value;
    const dueTime = $('#inpSchedTime').value;
    const assignedTech = $('#inpSchedTech').value;
    
    const newWo = {
      id: `WO-${Math.floor(2000 + Math.random() * 1000)}`,
      siteId: selectedSite.id,
      title: title,
      site: `${selectedSite.company} · ${selectedSite.name}`,
      priority: priority,
      type: 'Planlı servis',
      due: `${day} Tem, ${dueTime}`,
      tech: assignedTech,
      description: 'Sözleşme kapsamında periyodik saha denetimi.'
    };
    
    state.work.push(newWo);
    save();
    modal.classList.add('hidden');
    renderWork();
    renderCalendarGrid();
    renderDashboard();
    toast(`İş emri ${day} Temmuz için başarıyla oluşturuldu ve ${assignedTech} personeline atandı.`);
  });
}

function printQrCodeSticker(code) {
  const content = $('#modalContent');
  const modal = $('#modal');
  if (!content || !modal) return;
  
  const site = state.sites.find(s => s.id === activeSiteId);
  if (!site) return;
  const s = site.stations.find(st => st.code === code);
  if (!s) return;
  
  const typeNames = { rodent: 'Kemirgen İstasyonu', crawler: 'Yürüyen Haşere Monitörü', flying: 'Uçan Haşere Cihazı', insect_light_trap: 'UV Işıklı Cihaz' };
  
  content.innerHTML = `
    <div style="text-align:center; padding:10px;">
      <h2 style="font-size:18px; margin-bottom:4px;">QR Kod Etiket Baskı Önizleme</h2>
      <p class="text-muted" style="font-size:11px; margin-bottom:20px;">Termal rulo etiket yazıcıları için uygundur.</p>
      
      <div id="qrPrintArea" style="width:220px; margin:0 auto; padding:15px; border:3px double #000; border-radius:8px; text-align:center; background:#fff; color:#000;">
        <div style="font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">LADYBUG OPERATIONS</div>
        
        <div style="width:110px; height:110px; margin: 0 auto; border:4px solid #000; padding:4px; display:flex; flex-direction:column; gap:6px; justify-content:center; align-items:center; background:#fff; position:relative;">
          <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:6px; width:90px; height:90px;">
            <div style="background:#000;"></div><div style="background:#000;"></div><div></div><div style="background:#000;"></div>
            <div></div><div style="background:#000;"></div><div style="background:#000;"></div><div></div>
            <div style="background:#000;"></div><div></div><div style="background:#000;"></div><div style="background:#000;"></div>
            <div style="background:#000;"></div><div style="background:#000;"></div><div></div><div style="background:#000;"></div>
          </div>
          <div style="position:absolute; width:25px; height:25px; background:#fff; border:3px solid #000; top:6px; left:6px;"></div>
          <div style="position:absolute; width:25px; height:25px; background:#fff; border:3px solid #000; top:6px; right:6px;"></div>
          <div style="position:absolute; width:25px; height:25px; background:#fff; border:3px solid #000; bottom:6px; left:6px;"></div>
        </div>
        
        <h4 style="font-size:22px; font-weight:900; margin:10px 0 2px;">${s.code}</h4>
        <div style="font-size:9px; font-weight:700; color:#555; text-transform:uppercase; margin-bottom:4px;">${typeNames[s.type] || s.type}</div>
        <div style="font-size:8px; color:#888;">${site.company} - ${site.name}</div>
        <div style="font-size:7px; color:#aaa; margin-top:2px;">Cihaz ID: INS-ST-${site.id}-${s.code}</div>
      </div>
      
      <div style="margin-top:24px; display:flex; gap:10px; justify-content:center;">
        <button class="secondary-btn" onclick="document.querySelector('#modal').classList.add('hidden')">Kapat</button>
        <button class="primary-btn" onclick="window.print()">🖨 Yazdır</button>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function openReportModal(reportId) {
  const content = $('#modalContent');
  const modal = $('#modal');
  if (!content || !modal) return;
  
  const reportDetails = {
    r1: { title: "BRCGS Gıda Güvenliği Denetim Raporu", company: "Acme Foods", date: "12 Temmuz 2026", auditor: "Seda Kaya", stationsChecked: "8/8", healthScore: "62/100", status: "Kritik Aksiyon Gerekli" },
    r2: { title: "Aylık Rutin İlaçlama Raporu", company: "Kuzey Lojistik", date: "11 Temmuz 2026", auditor: "Mert Kaya", stationsChecked: "7/7", healthScore: "68/100", status: "İzleme Gerekli" },
    r3: { title: "AIB Hijyen Standardı Uyum Belgesi", company: "Aster Hospital", date: "10 Temmuz 2026", auditor: "Ece Yılmaz", stationsChecked: "6/6", healthScore: "74/100", status: "Uygun" }
  };
  
  const r = reportDetails[reportId] || reportDetails.r1;
  
  content.innerHTML = `
    <div style="padding:10px; max-height:85vh; overflow-y:auto; color:var(--ink);">
      <div style="display:flex; justify-content:space-between; align-items:start; border-bottom:2px solid var(--blue); padding-bottom:12px; margin-bottom:16px;">
        <div>
          <h2 style="margin:0; font-size:18px; color:var(--blue);">${r.title}</h2>
          <p style="margin:3px 0 0; font-size:11px; color:var(--muted)">Ladybug Enterprise Operations Cloud Raporlama</p>
        </div>
        <div style="text-align:right;">
          <strong style="font-size:14px;">LADYBUG</strong>
          <div style="font-size:9px; color:var(--muted)">Sertifika No: LADY-${Math.floor(10000+Math.random()*90000)}</div>
        </div>
      </div>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:12px; margin-bottom:16px;">
        <div>
          <p style="margin:4px 0;">Müşteri: <b>${r.company}</b></p>
          <p style="margin:4px 0;">Denetleyen Yetkili: <b>${r.auditor}</b></p>
          <p style="margin:4px 0;">Denetim Tarihi: <b>${r.date}</b></p>
        </div>
        <div>
          <p style="margin:4px 0;">Kontrol Edilen İstasyon: <b>${r.stationsChecked}</b></p>
          <p style="margin:4px 0;">Tesis Sağlık Skoru: <b style="color:var(--red); font-size:13px;">${r.healthScore}</b></p>
          <p style="margin:4px 0;">Uyum Durumu: <span class="status-chip ${r.status.includes('Kritik') ? 'critical' : 'warning'}" style="padding:2px 6px; font-size:9px;">${r.status}</span></p>
        </div>
      </div>
      
      <p class="overline">Bulgu ve İstasyon İnceleme Özeti</p>
      <table style="width:100%; border-collapse:collapse; font-size:11px; margin-bottom:20px; margin-top:6px; border:1px solid var(--line);">
        <thead>
          <tr style="background:var(--soft); text-align:left;">
            <th style="padding:6px; border-bottom:1px solid var(--line);">İstasyon</th>
            <th style="padding:6px; border-bottom:1px solid var(--line);">Tür</th>
            <th style="padding:6px; border-bottom:1px solid var(--line);">Son Bulgu</th>
            <th style="padding:6px; border-bottom:1px solid var(--line);">Yem</th>
            <th style="padding:6px; border-bottom:1px solid var(--line);">Durum</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--line);">
            <td style="padding:6px; font-weight:700;">R-01</td>
            <td style="padding:6px;">Kemirgen Yem</td>
            <td style="padding:6px;">Bulgu Yok</td>
            <td style="padding:6px;">%100 Sağlam</td>
            <td style="padding:6px;"><span class="status-chip healthy" style="padding:2px 4px;">Temiz</span></td>
          </tr>
          <tr style="border-bottom:1px solid var(--line);">
            <td style="padding:6px; font-weight:700;">C-01</td>
            <td style="padding:6px;">Yürüyen Haşere</td>
            <td style="padding:6px; color:var(--red); font-weight:700;">4 Hamamböceği</td>
            <td style="padding:6px; color:var(--red);">Tüketildi</td>
            <td style="padding:6px;"><span class="status-chip critical" style="padding:2px 4px;">Aktivite</span></td>
          </tr>
          <tr style="border-bottom:1px solid var(--line);">
            <td style="padding:6px; font-weight:700;">F-01</td>
            <td style="padding:6px;">Uçan Haşere</td>
            <td style="padding:6px; color:var(--red); font-weight:700;">12 Sinek</td>
            <td style="padding:6px;">%100 Sağlam</td>
            <td style="padding:6px;"><span class="status-chip critical" style="padding:2px 4px;">Aktivite</span></td>
          </tr>
          <tr>
            <td style="padding:6px; font-weight:700;">ILT-01</td>
            <td style="padding:6px;">UV Cihaz</td>
            <td style="padding:6px;">Bulgu Yok</td>
            <td style="padding:6px; color:var(--muted);">Yem Yok</td>
            <td style="padding:6px;"><span class="status-chip warning" style="padding:2px 4px;">Hasarlı</span></td>
          </tr>
        </tbody>
      </table>
      
      <p class="overline">TEKNİSYEN / OPERATÖR DİJİTAL İMZASI</p>
      <div style="display:flex; gap:16px; align-items:center; margin-top:8px;">
        <div style="border:1px solid var(--line); border-radius:6px; width:220px; height:70px; background:#fafafa; display:flex; justify-content:center; align-items:center; position:relative; overflow:hidden;">
          <span style="font-family:Arial, sans-serif; font-style:italic; font-size:24px; color:var(--blue); font-weight:700; transform: rotate(-5deg); letter-spacing:1px; user-select:none;">${r.auditor}</span>
          <div style="position:absolute; bottom:2px; font-size:7px; color:#aaa;">Doğrulanmış Dijital İmza Mührü</div>
        </div>
        <div style="font-size:11px; color:var(--muted); line-height:1.5;">
          Bu belge 5070 Sayılı Elektronik İmza Kanunu kapsamında <b>${r.auditor}</b> tarafından biyometrik/dijital imza doğrulaması ile imzalanarak arşive eklenmiştir.
        </div>
      </div>
      
      <div style="margin-top:24px; display:flex; gap:10px; justify-content:flex-end; border-top:1px solid var(--line); padding-top:14px;">
        <button class="secondary-btn" onclick="document.querySelector('#modal').classList.add('hidden')">Raporu Kapat</button>
        <button class="primary-btn" onclick="window.print()">📥 PDF İndir & Yazdır</button>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function modal(type) {
  const content = $('#modalContent');
  const modalEl = $('#modal');
  if (!content || !modalEl) return;
  
  if (type === 'site') {
    content.innerHTML = `
      <h2>Yeni Tesis / Firma Ekle</h2>
      <p class="text-muted">Portföyünüze yeni bir müşteri lokasyonu tanımlayın.</p>
      <form class="form-grid" id="createSite">
        <label class="form-label">
          Firma Adı (Müşteri)
          <input required type="text" name="company" placeholder="Örn: Acme Foods" class="form-input">
        </label>
        <label class="form-label">
          Tesis / Lokasyon Adı
          <input required type="text" name="siteName" placeholder="Örn: Gebze Üretim Tesisi" class="form-input">
        </label>
        <label class="form-label">
          Bulunduğu Şehir
          <input required type="text" name="city" placeholder="Örn: Kocaeli" class="form-input">
        </label>
        <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:10px;">＋ Tesis Kaydet</button>
      </form>
    `;
  } else if (type === 'work') {
    const siteOptions = state.sites.map(s => `<option value="${s.name}">${s.company} - ${s.name}</option>`).join('');
    content.innerHTML = `
      <h2>Yeni İş Emri Oluştur</h2>
      <p class="text-muted">Teknisyenler için periyodik veya acil servis ziyareti planlayın.</p>
      <form class="form-grid" id="createWork">
        <label class="form-label">
          İş Emri Başlığı / Tanımı
          <input required type="text" name="title" placeholder="Örn: Rutin İlaçlama ve UV Cihaz Kontrolü" class="form-input">
        </label>
        <label class="form-label">
          İlgili Tesis
          <select name="site" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">${siteOptions}</select>
        </label>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <label class="form-label">
            Ziyaret Zamanı
            <input required type="datetime-local" name="dueDate" class="form-input" style="height:37px; border:1px solid var(--line); border-radius:7px; padding:0 8px; font-size:12px;">
          </label>
          <label class="form-label">
            Öncelik Durumu
            <select name="priority" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">
              <option value="Normal">Normal</option>
              <option value="Yüksek">Yüksek</option>
              <option value="Kritik">Kritik / Acil</option>
            </select>
          </label>
        </div>
        <label class="form-label">
          Görevlendirilecek Teknisyen
          <select name="tech" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">
            <option value="Ayşe Demir">Ayşe Demir (Baş Teknisyen)</option>
            <option value="Mert Kaya">Mert Kaya (Teknisyen)</option>
            <option value="Ece Yılmaz">Ece Yılmaz (Dezenfeksiyon Uzmanı)</option>
            <option value="Can Öztürk">Can Öztürk (Saha Ekibi)</option>
          </select>
        </label>
        <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:10px;">＋ İş Emri Planla</button>
      </form>
    `;
  } else if (type === 'report') {
    const siteOptions = state.sites.map(s => `<option value="${s.id}">${s.company} - ${s.name}</option>`).join('');
    content.innerHTML = `
      <h2>Müşteri Raporu Oluştur</h2>
      <p class="text-muted">Tesis denetim verilerinden audit-ready PDF raporu derleyin.</p>
      <form class="form-grid" id="generateReport">
        <label class="form-label">
          İlgili Tesis
          <select name="siteId" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">${siteOptions}</select>
        </label>
        <label class="form-label">
          Rapor Kapsamı
          <select name="scope" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">
            <option value="monthly">Aylık Servis Özeti (Sözleşme)</option>
            <option value="audit">Detaylı BRCGS / AIB Denetim Raporu</option>
            <option value="activity">İstasyon Aktivite & Isı Haritası Analizi</option>
          </select>
        </label>
        <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:10px;">✓ Rapor Derle & Yayınla</button>
      </form>
    `;
  }
  
  modalEl.classList.remove('hidden');
}

// Event bindings
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
    if(e.target.closest('#createReport')) modal('report');
    
    if(e.target.closest('.modal-close')||e.target.id==='modal') $('#modal').classList.add('hidden');
    
    if(e.target.closest('#optionalDownload')){
      toast('Tesis planı offline kullanım için indirildi.');
    }
    
    if(e.target.closest('#completeWork')){
      state.completed++;
      // Mark selected work as completed
      const w = state.work.find(x => x.id === state.selectedWork);
      if (w) w.completed = true;
      save();
      render();
      toast('İş emri tamamlandı; servis kaydı ve müşteri özeti güncellendi.');
    }
    
    const a=e.target.closest('[data-action]');
    if(a){
      if(a.dataset.action==='facilityMap'){
        const siteId = techSites[state.selectedTech] || 's1';
        showCompanyDetail(siteId);
      } else {
        const actions={
          search:'Arama yakında müşteri, tesis ve iş emirleri arasında çalışacak.',
          notifications:'3 yeni bildirim: 2 kritik bulgu ve 1 onay bekleyen rapor.',
          filters:'Gelişmiş filtreler müşteri, bölge ve sözleşme kapsamına göre uygulanır.',
          sort:'İş emirleri öncelik ve hedef zamana göre sıralı.',
          route:'Rota önerileri trafik, yetkinlik ve servis penceresine göre hazırlanır.',
          workspace:'Çalışma alanı seçimini portföy ayarlarından yönetebilirsiniz.',
          profile:'Profil ayarları ve erişim yetkileri buradan yönetilir.',
          portfolio:'Portföy sağlığı hesaplaması istasyon, bulgu ve SLA verilerinden oluşur.'
        };
        toast(actions[a.dataset.action]);
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
      const site = state.sites.find(s => s.id === activeSiteId);
      if (site) {
        renderStationMarkers(site.stations, $$('[data-station-filter].active')[0]?.dataset.stationFilter || 'all');
      }
    }

    // Print QR code sticker label
    if (e.target.id === 'printStationQrBtn') {
      printQrCodeSticker(activeStationCode);
      return;
    }

    // Toggle recommendation compliance status
    const toggleRecBtn = e.target.closest('.toggle-rec-btn');
    if (toggleRecBtn) {
      const idx = parseInt(toggleRecBtn.dataset.recIndex);
      const site = state.sites.find(s => s.id === activeSiteId);
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
      const site = state.sites.find(s => s.id === activeSiteId);
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
      
      const site = state.sites.find(s => s.id === activeSiteId);
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
      
      const proceedGpsArrival = (lat, lon) => {
        mobArrived = true;
        mobJob.status = 'arrived_gps';
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

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            proceedGpsArrival(pos.coords.latitude, pos.coords.longitude);
          },
          (err) => {
            addTelemetryLog("UYARI: Gerçek GPS alınamadı. Simüle edilmiş koordinatlar kullanılıyor.");
            proceedGpsArrival(41.0082, 28.9784);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        addTelemetryLog("UYARI: Tarayıcıda GPS servisi bulunamadı. Simüle koordinat kullanılıyor.");
        proceedGpsArrival(41.0082, 28.9784);
      }
    }
    
    if (e.target.id === 'btnMobScanFirstQr') {
      const site = state.sites.find(s => s.id === mobJob.siteId) || state.sites[0];
      addTelemetryLog("Kamera açılıyor... Giriş QR Kodu taraması bekleniyor.");
      openMobileScanner(
        "Giriş QR Kodu Tara",
        "Tesis giriş kapısındaki kontrol ünitesinde yer alan QR barkodunu okutun.",
        site.stations,
        (scannedCode) => {
          mobQrStarted = true;
          mobJob.status = 'started_by_first_qr';
          mobJob.realWorkStartedAt = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
          save();
          showMobileJobDetail(mobJob);
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
            mobOfflineReady = true;
            const site = state.sites.find(s => s.id === mobJob.siteId);
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
      const site = state.sites.find(s => s.id === mobJob.siteId) || state.sites[0];
      const s = site.stations.find(st => st.code === activeMobileStationCode);
      if (s) {
        s.checked = true;
        s.baitStatus = $('#mobInpBaitStatus').value;
        s.pestType = $('#mobInpPestType').value;
        s.pestCount = parseInt($('#mobInpPestCount').value) || 0;
        s.status = $('#mobInpStatus').value;
        s.notes = $('#mobInpNotes').value;
        
        s.controlledBy = mobJob.tech;
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
        showMobileJobDetail(mobJob);
      }
    }
    
    if (e.target.id === 'btnMobSaveForm') {
      mobJob.completed = true;
      mobJob.status = 'completed';
      state.completed++;
      
      const site = state.sites.find(s => s.id === mobJob.siteId) || state.sites[0];
      site.last = `Bugün · ${mobJob.tech}`;
      
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

    // File download trigger toast
    const downloadBtn = e.target.closest('.download-file-btn');
    if (downloadBtn) {
      const idx = parseInt(downloadBtn.dataset.fileIndex);
      const site = state.sites.find(s => s.id === activeSiteId);
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
      
      const newWo = {
        id: `WO-${Math.floor(2000 + Math.random() * 1000)}`,
        siteId: siteObj.id,
        title: title,
        site: `${siteObj.company} · ${siteObj.name}`,
        priority: priority === 'Kritik' ? 'critical' : (priority === 'Yüksek' ? 'high' : 'normal'),
        type: 'Planlı servis',
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
    
    if(e.target.id==='createSite'){
      e.preventDefault();
      const f=new FormData(e.target);
      const newSite = {
        id:Date.now()+'',
        company:f.get('company'),
        name:f.get('siteName'),
        city:f.get('city'),
        score:100,
        state:'healthy',
        issues:0,
        last:'Henüz servis yok',
        next:'Planlanacak',
        color:'#d8e9e4',
        sector: "Diğer Hizmet Sektörü",
        contact: { name: "Yetkili Tanımlanmadı", phone: "—", email: "—" },
        methods: [
          { name: "Kemirgen İstasyon Kontrolü", desc: "Kilitli dış çevre yemleme istasyonları.", active: true },
          { name: "Yürüyen Haşere İzleme", desc: "Yapışkan pheromone monitörleri.", active: true }
        ],
        files: [],
        stations: [
          { code:"R-01", type:"rodent", x:20, y:20, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
          { code:"R-02", type:"rodent", x:80, y:20, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
          { code:"C-01", type:"crawler", x:20, y:80, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" },
          { code:"C-02", type:"crawler", x:80, y:80, checked:false, status:"unchecked", baitStatus:"intact", pestType:"none", pestCount:0, notes:"" }
        ]
      };
      state.sites.push(newSite);
      save();
      $('#modal').classList.add('hidden');
      renderSites();
      toast('Tesis portföye eklendi.');
    }
    
    if(e.target.id==='generateReport'){
      e.preventDefault();
      $('#modal').classList.add('hidden');
      toast('Rapor oluşturuldu. Paylaşım bağlantısı müşteri portalına eklendi.');
    }
    
    // Admin floor plan inspection form save
    if (e.target.id === 'adminInspectionForm') {
      e.preventDefault();
      if (!activeSiteId || !activeStationCode) return;
      
      const site = state.sites.find(s => s.id === activeSiteId);
      if (!site) return;
      const s = site.stations.find(st => st.code === activeStationCode);
      if (!s) return;
      
      const f = new FormData(e.target);
      s.checked = true;
      s.baitStatus = f.get('baitStatus');
      s.pestType = f.get('pestType');
      s.pestCount = parseInt(f.get('pestCount')) || 0;
      s.status = f.get('status');
      s.notes = f.get('notes');
      
      s.controlledBy = "Seda Kaya (Yönetici)";
      s.lastControl = "Bugün, " + new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
      
      if (s.pestType !== 'none') {
        s.status = 'activity';
      } else if (s.status === 'activity') {
        s.status = 'clean';
      }
      
      recalculateSiteStats(site);
      save();
      showCompanyDetail(activeSiteId);
      toast(`İstasyon ${s.code} denetimi başarıyla kaydedildi.`);
    }

    // Company profile file upload form submit
    if (e.target.id === 'companyFileUploadForm') {
      e.preventDefault();
      if (!activeSiteId) return;
      const site = state.sites.find(s => s.id === activeSiteId);
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
      if (!activeSiteId) return;
      const site = state.sites.find(s => s.id === activeSiteId);
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
  });
}
bind();
checkSession();
render();

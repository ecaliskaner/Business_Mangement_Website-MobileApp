// Clean stale data from previous versions
localStorage.removeItem("ladybug-product-demo"); localStorage.removeItem("insectram-product-demo"); localStorage.removeItem("insectram-ops");
const initial = {
  view: "dashboard", selectedWork: "WO-2048", selectedTech: "Ayşe Demir", completed: 27,
  inventory: [
    { id: 'stock1', chemicalId: 'ch1', name: 'K-Othrine SC 25', lotNo: 'LOT-2026-A1', qty: 25.5, unit: 'lt', minQty: 5.0, unitCost: 350 },
    { id: 'stock2', chemicalId: 'ch2', name: 'Goliath Gel', lotNo: 'LOT-2026-G9', qty: 120, unit: 'tüp', minQty: 20, unitCost: 450 },
    { id: 'stock3', chemicalId: 'ch3', name: 'Racumin Paste', lotNo: 'LOT-2025-R4', qty: 85.0, unit: 'kg', minQty: 15.0, unitCost: 180 },
    { id: 'stock4', chemicalId: 'ch4', name: 'Storm Secure', lotNo: 'LOT-2026-S2', qty: 60.0, unit: 'kg', minQty: 10.0, unitCost: 220 },
    { id: 'stock5', chemicalId: 'ch5', name: 'Aqua K-Othrine EW 20', lotNo: 'LOT-2026-EW', qty: 40.0, unit: 'lt', minQty: 8.0, unitCost: 380 },
    { id: 'stock6', chemicalId: 'ch6', name: 'Icon 10 CS', lotNo: 'LOT-2026-I1', qty: 15.0, unit: 'lt', minQty: 3.0, unitCost: 410 },
    { id: 'stock7', chemicalId: 'ch7', name: 'Maxforce White IC', lotNo: 'LOT-2026-M4', qty: 90, unit: 'tüp', minQty: 15, unitCost: 390 },
    { id: 'stock8', chemicalId: 'ch8', name: 'Cislin 2.5 UL', lotNo: 'LOT-2026-C2', qty: 30.0, unit: 'lt', minQty: 5.0, unitCost: 520 },
    { id: 'stock9', chemicalId: 'ch9', name: 'Steri-Fab', lotNo: 'LOT-2026-SF', qty: 50.0, unit: 'lt', minQty: 10.0, unitCost: 290 }
  ],
  inventoryTransactions: [
    { id: 'tx1', chemicalId: 'ch1', type: 'refill', qty: 10, unit: 'lt', date: '01 Tem 2026', notes: 'Merkez depo ikmali' },
    { id: 'tx2', chemicalId: 'ch3', type: 'refill', qty: 25, unit: 'kg', date: '05 Tem 2026', notes: 'Toplu alım girişi' }
  ],
  invoices: [
    { id: 'INV-1001', siteId: 's1', company: 'Acme Foods', name: 'Gebze Üretim Tesisi', date: '01 Tem 2026', amount: 4000, laborCost: 720, chemicalCost: 380, margin: 72.5, duration: '240 dk', status: 'paid', description: 'Temmuz 2026 Periyodik Hizmet Bedeli' },
    { id: 'INV-1002', siteId: 's2', company: 'Kuzey Lojistik', name: 'Hadımköy Dağıtım Merkezi', date: '05 Tem 2026', amount: 4800, laborCost: 900, chemicalCost: 550, margin: 69.8, duration: '360 dk', status: 'sent', description: 'Sözleşme Kapsamı Rutin Ziyaret' }
  ],
  techRates: {
    "Ayşe Demir": 180,
    "Mert Kaya": 150,
    "Ece Yılmaz": 160,
    "Can Öztürk": 140
  },
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
      ],
      serviceScope: {
        outdoorRodent: { frequency: 2, unit: 'ay', seasonNote: '' },
        indoorRodent: { frequency: 4, unit: 'ay', seasonNote: '' },
        crawlingPest: { frequency: 4, unit: 'ay', seasonNote: '' },
        flyingPest: { frequency: 4, unit: 'ay', seasonNote: 'Nisan-Ekim: 4/ay, Kasım-Mart: 2/ay' },
        storagePest: { frequency: 4, unit: 'ay', seasonNote: '' }
      },
      contract: { taxOffice: 'Gebze VD', taxNo: '1234567890', annualPrice: 48000, monthlyPrice: 4000, extraVisitPrice: 750, emergencyCallPrice: 1500, period: '01.01.2026 - 31.12.2026' },
      chemicalsUsed: [
        { id: 'cu1', chemicalId: 'ch1', date: '12 Tem 2026', quantity: '250 ml', area: '500 m²', tech: 'Ayşe Demir', notes: 'Dış çevre rezidüel bariyer uygulaması' },
        { id: 'cu2', chemicalId: 'ch3', date: '12 Tem 2026', quantity: '400 gr', area: '20 istasyon', tech: 'Ayşe Demir', notes: 'Kemirgen yem istasyonlarına yem yerleştirme' },
        { id: 'cu3', chemicalId: 'ch2', date: '28 Haz 2026', quantity: '35 gr', area: '120 m²', tech: 'Mert Kaya', notes: 'Hammadde deposu hamamböceği jel uygulaması' }
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
    {id:"WO-2048", siteId:"s1", title:"Kemirgen aktivitesi — acil inceleme", site:"Acme Foods · Gebze Üretim Tesisi", priority:"critical", type:"Kritik bulgu", visitType:"AC", due:"Bugün, 14:30", tech:"Ayşe Demir", description:"R-12 yem istasyonunda yüksek kemirgen aktivitesi tespit edildi. Alanın incelenmesi ve aksiyon planının kayıt altına alınması gerekiyor."},
    {id:"WO-2047", siteId:"s2", title:"Yükleme alanı istasyon kontrolü", site:"Kuzey Lojistik · Hadımköy DM", priority:"critical", type:"Kritik bulgu", visitType:"RZ", due:"Bugün, 16:00", tech:"Mert Kaya", description:"Yükleme rampası çevresindeki üç istasyon için kontrol ve yenileme servisi planlandı."},
    {id:"WO-2045", siteId:"s3", title:"Periyodik saha servisi", site:"Aster Hospital · Ataşehir Kampüsü", priority:"high", type:"Planlı servis", visitType:"RZ", due:"14 Tem, 09:00", tech:"Ece Yılmaz", description:"Aylık sözleşme kapsamındaki rutin saha servisi ve dijital istasyon denetimi."},
    {id:"WO-2042", siteId:"s4", title:"Müşteri talebi — uçan haşere", site:"Bora Retail · Levent Merkez", priority:"high", type:"Müşteri talebi", visitType:"ES", due:"15 Tem, 11:00", tech:"Can Öztürk", description:"Müşteri tarafından bildirilen uçan haşere aktivitesinin yerinde kontrolü."}
  ]
};
let state = load();
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const names = { dashboard:"Genel bakış", sites:"Tesisler", work:"İş emirleri", team:"Ekip & rota", insights:"Analizler", reports:"Raporlar", companyDetail:"Tesis Detayı & Profil", mobileSim:"Mobil Uygulama", inventory:"Stok & Envanter", finance:"Finans & Fatura" };
const stateLabel = {risk:"Riskli",watch:"İzlenmeli",healthy:"Sağlıklı"};

const users = {
  'admin@ladybug.com': { email: 'admin@ladybug.com', name: 'Seda Kaya', role: 'admin', title: 'Operasyon Yöneticisi (Boss)', avatar: 'SK' },
  'admin@insectram.com': { email: 'admin@ladybug.com', name: 'Seda Kaya', role: 'admin', title: 'Operasyon Yöneticisi (Boss)', avatar: 'SK' },
  'ayse@ladybug.com': { email: 'ayse@ladybug.com', name: 'Ayşe Demir', role: 'tech', title: 'Baş Teknisyen', avatar: 'AD' },
  'ayse@insectram.com': { email: 'ayse@ladybug.com', name: 'Ayşe Demir', role: 'tech', title: 'Baş Teknisyen', avatar: 'AD' },
  'acme@client.com': { email: 'acme@client.com', name: 'Ahmet Çelik', role: 'client', title: 'Acme Gıda Yetkilisi', avatar: 'AC' }
};

// ===== PEST TAXONOMY DATABASE =====
const pestDatabase = {
  rodent: [
    { code: 'F', name: 'Fare', en: 'Mouse', sci: 'Mus musculus' },
    { code: 'S', name: 'Sıçan', en: 'Rat', sci: 'Rattus spp.' },
    { code: '0', name: 'Aktivite Yok', en: 'No Activity', sci: '' }
  ],
  crawling: [
    { code: 'ALH', name: 'Alman Hamamböceği', en: 'German Cockroach', sci: 'Blattella germanica' },
    { code: 'DOH', name: 'Doğu Hamamböceği', en: 'Oriental Cockroach', sci: 'Blatta orientalis' },
    { code: 'AMH', name: 'Amerikan Hamamböceği', en: 'American Cockroach', sci: 'Periplaneta americana' },
    { code: 'K', name: 'Kınkanatlı', en: 'Ground Beetle', sci: 'Carabidae spp.' },
    { code: 'D', name: 'Diğer Yürüyen', en: 'Other Crawling', sci: '' },
    { code: '0', name: 'Aktivite Yok', en: 'No Activity', sci: '' }
  ],
  flying: [
    { code: 'KS', name: 'Karasinek', en: 'House Fly', sci: 'Musca domestica' },
    { code: 'SS', name: 'Sivrisinek', en: 'Mosquito', sci: 'Culicidae spp.' },
    { code: 'MS', name: 'Meyve Sineği', en: 'Fruit Fly', sci: 'Drosophila spp.' },
    { code: 'KMS', name: 'Kambur Sineği', en: 'Humpback Fly', sci: 'Phoridae spp.' },
    { code: 'KUS', name: 'Küçük Sinek', en: 'Small Flies', sci: 'Diptera spp.' },
    { code: 'ARI', name: 'Arı', en: 'Wasp', sci: 'Vespidae spp.' },
    { code: 'KEL', name: 'Kelebek (Güve)', en: 'Moth', sci: 'Lepidoptera spp.' },
    { code: 'D', name: 'Diğer Uçan', en: 'Other Flying', sci: '' },
    { code: '0', name: 'Aktivite Yok', en: 'No Activity', sci: '' }
  ],
  storedProduct: [
    { code: 'KMG', name: 'Kuru Meyve Güvesi', en: 'Indian Meal Moth', sci: 'Plodia interpunctella' },
    { code: 'DG', name: 'Değirmen Güvesi', en: 'Mediterranean Flour Moth', sci: 'Ephestia kuehniella' },
    { code: 'AG', name: 'Arpa Güvesi', en: 'Angoumois Grain Moth', sci: 'Sitotroga cerealella' },
    { code: 'UG', name: 'Un Güvesi', en: 'Meal Moth', sci: 'Pyralis farinalis' },
    { code: 'TG', name: 'Tütün Güvesi', en: 'Tobacco Moth', sci: 'Ephestia elutella' },
    { code: 'UKB', name: 'Un / Kırma Biti', en: 'Flour Beetle', sci: 'Tribolium spp.' },
    { code: 'BMP', name: 'Buğday/Mısır/Pirinç Biti', en: 'Grain Weevil', sci: 'Sitophilus spp.' },
    { code: 'TB', name: 'Testereli Böcek', en: 'Saw-toothed Grain Beetle', sci: 'Oryzaephilus spp.' },
    { code: 'TK', name: 'Tatlı Kurt', en: 'Cigarette Beetle', sci: 'Lasioderma spp.' },
    { code: 'THB', name: 'Tohum Böcekleri', en: 'Bean Weevil', sci: 'Bruchus spp.' },
    { code: 'D', name: 'Diğer Depo Zararlısı', en: 'Other Stored Product', sci: '' },
    { code: '0', name: 'Aktivite Yok', en: 'No Activity', sci: '' }
  ]
};

// ===== VISIT TYPES =====
const visitTypes = [
  { code: 'RZ', name: 'Rutin Ziyaret', en: 'Routine Visit' },
  { code: 'TZ', name: 'Takip Ziyareti', en: 'Follow-up Visit' },
  { code: 'AC', name: 'Acil Çağrı', en: 'Call-out' },
  { code: 'IZ', name: 'İlaçlama Ziyareti', en: 'Pesticide Application' },
  { code: 'ILK', name: 'İlk Ziyaret', en: 'First Visit' },
  { code: 'ES', name: 'Ek Servis', en: 'Extra Visit' },
  { code: '3G', name: '3. Göz Denetim', en: 'Third Eye Audit' },
  { code: 'DZ', name: 'Dezenfeksiyon', en: 'Disinfection' }
];

// ===== EXPANDED EQUIPMENT TYPES =====
const equipmentTypes = {
  rodent_bait: { name: 'Kemirgen Yem İstasyonu', en: 'Rodent Bait Box', icon: '🪤', prefix: 'R' },
  insect_detector: { name: 'Böcek Dedektörü', en: 'Insect Detector', icon: '🔍', prefix: 'BD' },
  flying_insect_trap: { name: 'Sinek Yakalama Cihazı', en: 'Flying Insect Trap', icon: '💡', prefix: 'F' },
  sp_insect_trap: { name: 'DZ Bit Tuzağı', en: 'S.P. Insect Trap', icon: '📌', prefix: 'DZB' },
  catch_alive_trap: { name: 'Canlı Kapan', en: 'Catch Alive Trap', icon: '🏠', prefix: 'CK' },
  sp_moth_trap: { name: 'DZ Güve Tuzağı', en: 'S.P. Moth Trap', icon: '🦋', prefix: 'DZG' },
  // Legacy types mapped to new system
  rodent: { name: 'Kemirgen Yem İstasyonu', en: 'Rodent Bait Box', icon: '🪤', prefix: 'R' },
  crawler: { name: 'Yürüyen Haşere Monitörü', en: 'Insect Detector', icon: '🔍', prefix: 'C' },
  flying: { name: 'Uçan Haşere Cihazı', en: 'Flying Insect Trap', icon: '💡', prefix: 'F' },
  insect_light_trap: { name: 'UV Işıklı Cihaz (ILT)', en: 'Insect Light Trap', icon: '💡', prefix: 'ILT' }
};

// ===== EXPANDED EQUIPMENT STATUS CODES =====
const equipmentStatusCodes = {
  clean: { name: 'Temiz & Sağlam', code: 'OK', color: 'var(--green)' },
  activity: { name: 'Aktivite Var', code: 'AK', color: 'var(--red)' },
  damaged: { name: 'Hasarlı / Kırık', code: 'KI', color: 'var(--amber)' },
  missing: { name: 'Kayıp / Eksik', code: 'KA', color: '#888' },
  not_accessible: { name: 'Ulaşılamadı', code: 'U', color: '#6b7280' },
  renewed: { name: 'İstasyon Yenilendi', code: 'Y', color: 'var(--blue)' },
  bait_changed: { name: 'Yem Değişti', code: 'YD', color: 'var(--violet)' },
  glue_changed: { name: 'Yapışkan Plaka Değişti', code: 'YPD', color: '#8b5cf6' },
  unchecked: { name: 'Kontrol Bekliyor', code: 'KB', color: '#d4d4d8' }
};

// ===== CHEMICAL DATABASE =====
const chemicalDatabase = [
  { id: 'ch1', name: 'K-Othrine SC 25', activeIngredient: 'Deltamethrin', concentration: '2.5%', usage: 'Yürüyen & uçan haşere', dosagePerM2: '50 ml/100m²', waterRatio: '5 lt suya 50 ml', category: 'İnsektisit', unitCost: 1.5, unit: 'ml' },
  { id: 'ch2', name: 'Goliath Gel', activeIngredient: 'Fipronil', concentration: '0.05%', usage: 'Hamamböceği jel uygulaması', dosagePerM2: '3 nokta/m²', waterRatio: 'Doğrudan uygulama', category: 'İnsektisit Jel', unitCost: 15.0, unit: 'gr' },
  { id: 'ch3', name: 'Racumin Paste', activeIngredient: 'Coumatetralyl', concentration: '0.0375%', usage: 'Kemirgen yem istasyonu', dosagePerM2: '20 gr/istasyon', waterRatio: 'Doğrudan uygulama', category: 'Rodentisit', unitCost: 0.8, unit: 'gr' },
  { id: 'ch4', name: 'Storm Secure', activeIngredient: 'Flocoumafen', concentration: '0.005%', usage: 'Kemirgen mücadelesi', dosagePerM2: '50 gr/istasyon', waterRatio: 'Doğrudan uygulama', category: 'Rodentisit', unitCost: 1.2, unit: 'gr' },
  { id: 'ch5', name: 'Aqua K-Othrine EW 20', activeIngredient: 'Deltamethrin', concentration: '2%', usage: 'Rezidüel ilaçlama', dosagePerM2: '50 ml/100m²', waterRatio: '10 lt suya 25 ml', category: 'İnsektisit', unitCost: 1.8, unit: 'ml' },
  { id: 'ch6', name: 'Icon 10 CS', activeIngredient: 'Lambda-cyhalothrin', concentration: '10%', usage: 'Dış alan bariyer ilaçlama', dosagePerM2: '100 ml/100m²', waterRatio: '10 lt suya 10 ml', category: 'İnsektisit', unitCost: 2.2, unit: 'ml' },
  { id: 'ch7', name: 'Maxforce White IC', activeIngredient: 'Imidacloprid', concentration: '2.15%', usage: 'Hamamböceği jel', dosagePerM2: '3 nokta/m²', waterRatio: 'Doğrudan uygulama', category: 'İnsektisit Jel', unitCost: 12.0, unit: 'gr' },
  { id: 'ch8', name: 'Cislin 2.5 UL', activeIngredient: 'Deltamethrin', concentration: '2.5%', usage: 'ULV fogger uygulama', dosagePerM2: '1 ml/m³', waterRatio: 'Doğrudan ULV', category: 'ULV İnsektisit', unitCost: 3.5, unit: 'ml' },
  { id: 'ch9', name: 'Steri-Fab', activeIngredient: 'İzopropil Alkol + Phenothrin', concentration: 'Karışım', usage: 'Dezenfeksiyon & haşere', dosagePerM2: '100 ml/10m²', waterRatio: 'Doğrudan sprey', category: 'Dezenfektan', unitCost: 0.9, unit: 'ml' },
  { id: 'ch10', name: 'Actellic 50 EC', activeIngredient: 'Pirimiphos-methyl', concentration: '50%', usage: 'Depo zararlıları fumigasyon', dosagePerM2: '100 ml/100m²', waterRatio: '10 lt suya 50 ml', category: 'Depo İnsektisit', unitCost: 2.5, unit: 'ml' },
  { id: 'ch11', name: 'Demand CS', activeIngredient: 'Lambda-cyhalothrin', concentration: '10%', usage: 'Genel haşere mücadelesi', dosagePerM2: '50 ml/100m²', waterRatio: '10 lt suya 12.5 ml', category: 'İnsektisit', unitCost: 2.0, unit: 'ml' },
  { id: 'ch12', name: 'Responsar SC', activeIngredient: 'Alfasipermetrin', concentration: '10%', usage: 'Dış çevre ilaçlama', dosagePerM2: '100 ml/100m²', waterRatio: '10 lt suya 20 ml', category: 'İnsektisit', unitCost: 1.6, unit: 'ml' }
];

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
    $('#btnEditSiteContract')?.classList.remove('hidden');
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
    $('#btnEditSiteContract')?.classList.add('hidden');
    
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
    $('#btnEditSiteContract')?.classList.add('hidden');
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
    const saved = window.__LADYBUG_STATE__ || JSON.parse(localStorage.getItem("ladybug-ops"));
    if (!saved) return structuredClone(initial);
    // Detect stale data missing new fields and reset
    if (!saved.inventory || (saved.sites && saved.sites[0] && !saved.sites[0].chemicalsUsed)) {
      localStorage.removeItem("ladybug-ops");
      return structuredClone(initial);
    }
    // Initialize recommendations and new arrays for all sites if missing
    saved.sites.forEach((s) => {
      if (!s.recommendations) {
        s.recommendations = [
          { id: "r1", desc: `${s.name} dış çevre kapı eşiğindeki conta yıpranmış, kemirgen geçişini önlemek için yenilenmeli.`, category: "BRCGS", assignee: "Tesis Bakım Departmanı", date: "10 Haz 2026", due: "25 Tem 2026", status: "open" },
          { id: "r2", desc: "Üretim holü sevkiyat rampası A-2 kapısına hava perdesi veya pvc şerit bariyer takılmalı.", category: "AIB", assignee: "Operasyon Yöneticisi", date: "05 Tem 2026", due: "10 Ağu 2026", status: "open" }
        ];
      }
      if (!s.chemicalsUsed) s.chemicalsUsed = [];
      if (s.serviceScope === undefined) s.serviceScope = null;
      if (s.contract === undefined) s.contract = null;
    });
    // Ensure all work orders have visitType
    if (saved.work) {
      saved.work.forEach(w => {
        if (!w.visitType) w.visitType = 'RZ';
      });
    }
    return {...structuredClone(initial),...saved};
  } catch { return structuredClone(initial); }
}
 function save(){
  localStorage.setItem("ladybug-ops",JSON.stringify(state));
  const persistableState = structuredClone(state);
  delete persistableState.currentUser;
  fetch("./api/state", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persistableState)
  }).catch(() => {});
}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.remove("hidden");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add("hidden"),3000)}

function setView(view){
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
  const workComp = $('#workCompleted');
  if (workComp) workComp.textContent=state.completed; 
  
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
        ${w.visitType ? `<span class="visit-type-chip" style="display:inline-block; font-size:9px; padding:2px 6px; border-radius:4px; font-weight:700; background:#f0f4ff; color:#4361a8; border:1px solid #d8e2f8; margin-left:6px;">${(visitTypes.find(v=>v.code===w.visitType)||{}).name || w.visitType}</span>` : ''}
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
  renderInventory();
  renderFinance();
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

function switchCompanyTab(tabId) {
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
  
  // 4b. Chemical Usage
  const cardChem = $('#cardMobChemicalUsage');
  if (cardChem) {
    cardChem.classList.toggle('disabled', !mobQrStarted);
  }
  renderMobChemicalsList(site);
  
  const checked = site.stations.filter(s => s.checked).length;
  const isComplete = mobQrStarted && checked === site.stations.length;
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
  
  const isComplete = mobQrStarted && checked === total;
  const cardSig = $('#cardSignature');
  if (cardSig) {
    cardSig.classList.toggle('disabled', !isComplete);
    if (isComplete && !mobJob.completed) {
      initSignaturePads();
    }
  }
  
  // Enable complete form button when all stations checked
  $('#btnMobSaveForm').disabled = !isComplete || mobJob.completed;
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

function modal(type, siteId = null) {
  const content = $('#modalContent');
  const modalEl = $('#modal');
  if (!content || !modalEl) return;
  
  if (type === 'site') {
    content.innerHTML = `
      <h2>Yeni Tesis & Sözleşme Ekle</h2>
      <p class="text-muted" style="margin-bottom:12px;">Portföyünüze yeni bir müşteri lokasyonu, sözleşme bedeli ve periyotları tanımlayın.</p>
      
      <form class="form-grid" id="createSite" style="max-height:480px; overflow-y:auto; padding-right:6px; display:grid; gap:12px; grid-template-columns: 1fr 1fr;">
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase;">FİRMA VE LOKASYON TANIMI</div>
        <label class="form-label">
          Firma Adı (Müşteri)
          <input required type="text" name="company" placeholder="Örn: Acme Foods" class="form-input">
        </label>
        <label class="form-label">
          Tesis / Lokasyon Adı
          <input required type="text" name="siteName" placeholder="Örn: Gebze Üretim Tesisi" class="form-input">
        </label>
        <label class="form-label" style="grid-column: span 2;">
          Bulunduğu Şehir
          <input required type="text" name="city" placeholder="Örn: Kocaeli" class="form-input">
        </label>
        
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase; margin-top:6px;">MÜŞTERİ YETKİLİ BİLGİLERİ</div>
        <label class="form-label">
          Yetkili Temsilci
          <input required type="text" name="contactName" placeholder="Örn: Ahmet Yılmaz" class="form-input">
        </label>
        <label class="form-label">
          İletişim Telefonu
          <input required type="text" name="contactPhone" placeholder="Örn: +90 532 123 4567" class="form-input">
        </label>
        <label class="form-label" style="grid-column: span 2;">
          E-Posta Adresi
          <input required type="email" name="contactEmail" placeholder="Örn: ahmet@acmefoods.com" class="form-input">
        </label>
        
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase; margin-top:6px;">SÖZLEŞME & ADRES BİLGİLERİ</div>
        <label class="form-label">
          Sözleşme Kapsamı (Tarih Periyodu)
          <input required type="text" name="contractPeriod" placeholder="Örn: 01.01.2026 - 31.12.2026" class="form-input">
        </label>
        <label class="form-label">
          Hizmet Periyodu (Açıklama)
          <input required type="text" name="serviceFrequency" placeholder="Örn: 15 Günde Bir" class="form-input">
        </label>
        <label class="form-label" style="grid-column: span 2;">
          Tesis Adresi
          <input required type="text" name="address" placeholder="Örn: Gebze Organize Sanayi Bölgesi, Kocaeli" class="form-input">
        </label>
        
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase; margin-top:6px;">VERGİLENDİRME & MALİ BİLGİLER</div>
        <label class="form-label">
          Vergi Dairesi
          <input type="text" name="taxOffice" placeholder="Örn: Gebze VD" class="form-input">
        </label>
        <label class="form-label">
          Vergi Numarası
          <input type="text" name="taxNo" placeholder="Örn: 1234567890" class="form-input">
        </label>
        
        <label class="form-label">
          Yıllık Bedel (₺)
          <input required type="number" name="annualPrice" placeholder="Örn: 48000" class="form-input">
        </label>
        <label class="form-label">
          Aylık Bedel (₺)
          <input required type="number" name="monthlyPrice" placeholder="Örn: 4000" class="form-input">
        </label>
        <label class="form-label">
          Ek Servis Bedeli (₺)
          <input required type="number" name="extraVisitPrice" placeholder="Örn: 750" class="form-input">
        </label>
        <label class="form-label">
          Acil Çağrı Bedeli (₺)
          <input required type="number" name="emergencyCallPrice" placeholder="Örn: 1500" class="form-input">
        </label>
        
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase; margin-top:6px;">HİZMET KAPSAMI FREKANSLARI (AYLIK HEDEF)</div>
        <label class="form-label">
          Dış Alan Kemirgen (Ziyaret/Ay)
          <input required type="number" name="freqOutdoorRodent" value="2" class="form-input">
        </label>
        <label class="form-label">
          İç Alan Kemirgen (Ziyaret/Ay)
          <input required type="number" name="freqIndoorRodent" value="4" class="form-input">
        </label>
        <label class="form-label">
          Yürüyen Haşere (Ziyaret/Ay)
          <input required type="number" name="freqCrawlingPest" value="4" class="form-input">
        </label>
        <label class="form-label">
          Uçan Haşere (Ziyaret/Ay)
          <input required type="number" name="freqFlyingPest" value="4" class="form-input">
        </label>
        <label class="form-label" style="grid-column: span 2;">
          Depo Zararlısı (Ziyaret/Ay)
          <input required type="number" name="freqStoragePest" value="4" class="form-input">
        </label>
        
        <button type="submit" class="primary-btn" style="grid-column: span 2; justify-content:center; margin-top:10px; height:38px;">＋ Tesis Kaydet</button>
      </form>
    `;
  } else if (type === 'editSite') {
    const s = state.sites.find(site => site.id === siteId);
    if (!s) return;
    
    const sc = s.serviceScope || { outdoorRodent: { frequency: 2 }, indoorRodent: { frequency: 4 }, crawlingPest: { frequency: 4 }, flyingPest: { frequency: 4 }, storagePest: { frequency: 4 } };
    const co = s.contract || { taxOffice: '', taxNo: '', annualPrice: 0, monthlyPrice: 0, extraVisitPrice: 0, emergencyCallPrice: 0, period: '' };
    
    content.innerHTML = `
      <h2>Tesis Sözleşme & Kapsam Düzenle</h2>
      <p class="text-muted" style="margin-bottom:12px;">${s.company} - ${s.name} sözleşme bedelleri ve periyodik hizmet kapsamları.</p>
      
      <form class="form-grid" id="editSiteForm" data-site-id="${s.id}" style="max-height:480px; overflow-y:auto; padding-right:6px; display:grid; gap:12px; grid-template-columns: 1fr 1fr;">
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase;">MÜŞTERİ YETKİLİ BİLGİLERİ</div>
        <label class="form-label">
          Yetkili Temsilci
          <input required type="text" name="contactName" value="${s.contact?.name || ''}" class="form-input">
        </label>
        <label class="form-label">
          İletişim Telefonu
          <input required type="text" name="contactPhone" value="${s.contact?.phone || ''}" class="form-input">
        </label>
        <label class="form-label" style="grid-column: span 2;">
          E-Posta Adresi
          <input required type="email" name="contactEmail" value="${s.contact?.email || ''}" class="form-input">
        </label>
        
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase; margin-top:6px;">SÖZLEŞME & ADRES BİLGİLERİ</div>
        <label class="form-label">
          Sözleşme Kapsamı (Tarih Periyodu)
          <input required type="text" name="contractPeriod" value="${co.period || ''}" placeholder="Örn: 01.01.2026 - 31.12.2026" class="form-input">
        </label>
        <label class="form-label">
          Hizmet Periyodu (Açıklama)
          <input required type="text" name="serviceFrequency" value="${s.serviceFrequency || '15 Günde Bir'}" placeholder="Örn: 15 Günde Bir" class="form-input">
        </label>
        <label class="form-label" style="grid-column: span 2;">
          Tesis Adresi
          <input required type="text" name="address" value="${s.address || ''}" class="form-input">
        </label>
        
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase; margin-top:6px;">VERGİLENDİRME & MALİ BİLGİLER</div>
        <label class="form-label">
          Vergi Dairesi
          <input type="text" name="taxOffice" value="${co.taxOffice || ''}" class="form-input">
        </label>
        <label class="form-label">
          Vergi Numarası
          <input type="text" name="taxNo" value="${co.taxNo || ''}" class="form-input">
        </label>
        
        <label class="form-label">
          Yıllık Bedel (₺)
          <input required type="number" name="annualPrice" value="${co.annualPrice || 0}" class="form-input">
        </label>
        <label class="form-label">
          Aylık Bedel (₺)
          <input required type="number" name="monthlyPrice" value="${co.monthlyPrice || 0}" class="form-input">
        </label>
        <label class="form-label">
          Ek Servis Bedeli (₺)
          <input required type="number" name="extraVisitPrice" value="${co.extraVisitPrice || 0}" class="form-input">
        </label>
        <label class="form-label">
          Acil Çağrı Bedeli (₺)
          <input required type="number" name="emergencyCallPrice" value="${co.emergencyCallPrice || 0}" class="form-input">
        </label>
        
        <div style="grid-column: span 2; font-weight:700; font-size:11px; color:var(--muted); border-bottom:1px solid var(--line); padding-bottom:4px; text-transform:uppercase; margin-top:6px;">HİZMET KAPSAMI FREKANSLARI (AYLIK HEDEF)</div>
        <label class="form-label">
          Dış Alan Kemirgen (Ziyaret/Ay)
          <input required type="number" name="freqOutdoorRodent" value="${sc.outdoorRodent?.frequency || 2}" class="form-input">
        </label>
        <label class="form-label">
          İç Alan Kemirgen (Ziyaret/Ay)
          <input required type="number" name="freqIndoorRodent" value="${sc.indoorRodent?.frequency || 4}" class="form-input">
        </label>
        <label class="form-label">
          Yürüyen Haşere (Ziyaret/Ay)
          <input required type="number" name="freqCrawlingPest" value="${sc.crawlingPest?.frequency || 4}" class="form-input">
        </label>
        <label class="form-label">
          Uçan Haşere (Ziyaret/Ay)
          <input required type="number" name="freqFlyingPest" value="${sc.flyingPest?.frequency || 4}" class="form-input">
        </label>
        <label class="form-label" style="grid-column: span 2;">
          Depo Zararlısı (Ziyaret/Ay)
          <input required type="number" name="freqStoragePest" value="${sc.storagePest?.frequency || 4}" class="form-input">
        </label>
        
        <button type="submit" class="primary-btn" style="grid-column: span 2; justify-content:center; margin-top:10px; height:38px;">✓ Değişiklikleri Kaydet</button>
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
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <label class="form-label">
            Görevlendirilecek Teknisyen
            <select name="tech" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">
              <option value="Ayşe Demir">Ayşe Demir (Baş Teknisyen)</option>
              <option value="Mert Kaya">Mert Kaya (Teknisyen)</option>
              <option value="Ece Yılmaz">Ece Yılmaz (Dezenfeksiyon Uzmanı)</option>
              <option value="Can Öztürk">Can Öztürk (Saha Ekibi)</option>
            </select>
          </label>
          <label class="form-label">
            Ziyaret Türü
            <select name="visitType" class="form-select" style="height:37px; padding:0 8px; font-size:12px; border:1px solid var(--line); border-radius:7px;">
              <option value="RZ">Rutin Ziyaret</option>
              <option value="TZ">Takip Ziyareti</option>
              <option value="AC">Acil Çağrı / Call-out</option>
              <option value="IZ">İlaçlama Ziyareti</option>
              <option value="ILK">İlk Ziyaret</option>
              <option value="ES">Ek Servis</option>
              <option value="3G">3. Göz Denetim & Audit</option>
              <option value="DZ">Dezenfeksiyon</option>
            </select>
          </label>
        </div>
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
  } else if (type === 'search') {
    content.innerHTML = `
      <h2>Sistem Genelinde Arama</h2>
      <p class="text-muted" style="margin-bottom:12px;">Portföyünüzdeki tesisler, aktif iş emirleri veya teknisyenleri arayın.</p>
      <input type="text" id="modalSearchInput" placeholder="Tesis, iş emri, kimyasal veya teknisyen adı..." class="form-input" style="margin-bottom:14px; font-size:13px; height:38px;">
      <div id="modalSearchResults" style="display:grid; gap:8px; max-height:300px; overflow:auto;">
        <p class="text-muted" style="font-size:11px; text-align:center; padding:10px;">Arama yapmak için en az 2 karakter girin.</p>
      </div>
    `;
    setTimeout(() => {
      const input = $('#modalSearchInput');
      input?.focus();
      input?.addEventListener('input', () => {
        const query = input.value.trim().toLocaleLowerCase('tr');
        const resultsDiv = $('#modalSearchResults');
        if (!resultsDiv) return;
        
        if (query.length < 2) {
          resultsDiv.innerHTML = '<p class="text-muted" style="font-size:11px; text-align:center; padding:10px;">Arama yapmak için en az 2 karakter girin.</p>';
          return;
        }
        
        const matchedSites = state.sites.filter(s => s.company.toLowerCase().includes(query) || s.name.toLowerCase().includes(query) || s.city.toLowerCase().includes(query));
        const matchedWork = state.work.filter(w => w.title.toLowerCase().includes(query) || w.tech.toLowerCase().includes(query) || w.id.toLowerCase().includes(query));
        
        let html = '';
        
        if (matchedSites.length > 0) {
          html += `<div style="font-size:10px; font-weight:700; color:var(--muted); margin-top:6px; text-transform:uppercase;">Tesisler (${matchedSites.length})</div>`;
          html += matchedSites.map(s => `
            <div class="search-result-row search-site-row" data-site-id="${s.id}" style="padding:8px; background:var(--soft); border:1px solid var(--line); border-radius:6px; cursor:pointer; font-size:12px; display:flex; justify-content:space-between; align-items:center;">
              <div><b>${s.company}</b><br><small class="text-muted">${s.name} · ${s.city}</small></div>
              <span class="status-chip secondary" style="font-size:9px;">Git ➔</span>
            </div>
          `).join('');
        }
        
        if (matchedWork.length > 0) {
          html += `<div style="font-size:10px; font-weight:700; color:var(--muted); margin-top:10px; text-transform:uppercase;">İş Emirleri (${matchedWork.length})</div>`;
          html += matchedWork.map(w => `
            <div class="search-result-row search-work-row" data-work-id="${w.id}" style="padding:8px; background:var(--soft); border:1px solid var(--line); border-radius:6px; cursor:pointer; font-size:12px; display:flex; justify-content:space-between; align-items:center;">
              <div><b>${w.id}: ${w.title}</b><br><small class="text-muted">Teknisyen: ${w.tech} · Durum: ${w.completed ? 'Tamamlandı' : 'Açık'}</small></div>
              <span class="status-chip secondary" style="font-size:9px;">Git ➔</span>
            </div>
          `).join('');
        }
        
        resultsDiv.innerHTML = html || '<p class="text-muted" style="font-size:11px; text-align:center; padding:10px;">Eşleşen sonuç bulunamadı.</p>';
      });
    }, 100);
  } else if (type === 'notifications') {
    const notifications = [];
    
    // Critical risk sites
    state.sites.forEach(s => {
      if (s.state === 'risk') {
        notifications.push({
          title: `Kritik Risk Seviyesi: ${s.company}`,
          desc: `${s.name} tesisinde açık bulgu skoru kritik limitlerin altına düştü (${s.score}/100)`,
          time: '3 saat önce',
          type: 'alert',
          action: () => showCompanyDetail(s.id)
        });
      }
    });
    
    // Inventory low stock warnings
    state.inventory.forEach(item => {
      if (item.qty <= item.minQty) {
        notifications.push({
          title: `Stok İkazı: ${item.name}`,
          desc: `Kritik depo seviyesine ulaşıldı! Kalan: ${item.qty} ${item.unit} (Eşik: ${item.minQty})`,
          time: 'Bugün',
          type: 'warning',
          action: () => setView('inventory')
        });
      }
    });
    
    // Open urgent tasks
    state.work.forEach(w => {
      if (w.priority === 'critical' && !w.completed) {
        notifications.push({
          title: `Acil / Kritik İş Emri: ${w.id}`,
          desc: `${w.title} servisi bugün için planlandı. Teknisyen: ${w.tech}`,
          time: '2 saat önce',
          type: 'info',
          action: () => {
            state.selectedWork = w.id;
            save();
            setView('work');
          }
        });
      }
    });

    content.innerHTML = `
      <h2>Sistem Bildirimleri</h2>
      <p class="text-muted" style="margin-bottom:14px;">Operasyonel riskler, stok uyarıları ve yaklaşan kritik görevler.</p>
      <div style="display:grid; gap:10px; max-height:350px; overflow:auto;">
        ${notifications.map((n, i) => `
          <div class="notification-row" data-notif-idx="${i}" style="padding:10px; background:var(--soft); border:1px solid var(--line); border-radius:8px; cursor:pointer; display:flex; gap:10px; align-items:start; transition:all 0.2s;">
            <span class="feed-icon ${n.type}" style="margin:0; font-size:12px; width:22px; height:22px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${n.type === 'alert' ? '!' : (n.type === 'warning' ? '⚠' : '✓')}</span>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; font-weight:700;">
                <span>${n.title}</span>
                <span class="text-muted" style="font-size:10px; font-weight:normal;">${n.time}</span>
              </div>
              <p style="font-size:11px; color:var(--muted); margin-top:2px;">${n.desc}</p>
            </div>
          </div>
        `).join('') || '<p class="empty" style="text-align:center;">Şu anda okunmamış operasyonel bildiriminiz bulunmamıyor.</p>'}
      </div>
    `;
    
    window.__ACTIVE_NOTIFS__ = notifications;
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
      if (activeSiteId) {
        modal('editSite', activeSiteId);
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
          mobJob.startedTimestamp = Date.now();
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
      
      const canvasCust = $('#sigCanvasCustomer');
      const canvasTech = $('#sigCanvasTech');
      if (canvasCust && canvasTech) {
        mobJob.customerSignature = canvasCust.toDataURL();
        mobJob.techSignature = canvasTech.toDataURL();
      }
      
      const site = state.sites.find(s => s.id === mobJob.siteId) || state.sites[0];
      site.last = `Bugün · ${mobJob.tech}`;
      
      // Calculate visit duration (simulated for quick demo clicks)
      const durationMs = mobJob.startedTimestamp ? (Date.now() - mobJob.startedTimestamp) : 0;
      let durationMin = Math.round(durationMs / 60000);
      if (durationMin < 5) durationMin = 45; // simulate realistic duration for demo
      mobJob.duration = `${durationMin} dk`;
      
      // Calculate costs
      const techRate = state.techRates[mobJob.tech] || 150;
      const laborCost = Math.round((durationMin / 60) * techRate);
      
      let chemicalCost = 0;
      const siteChems = site.chemicalsUsed || [];
      siteChems.forEach(cu => {
        if (cu.workOrderId === mobJob.id) {
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
        description: `${mobJob.visitType ? (visitTypes.find(v=>v.code===mobJob.visitType)||{}).name : 'Rutin'} Servis Faturası`
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
        link.download = `${activeSiteId}_trend_analizi.png`;
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
      if (!mobJob) return;
      const site = state.sites.find(s => s.id === mobJob.siteId);
      if (!site) return;
      
      const idx = parseInt(deleteMobChemBtn.dataset.chemIndex);
      const visitChems = site.chemicalsUsed.filter(cu => cu.workOrderId === mobJob.id);
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

    // Company profile chemical form submit
    if (e.target.id === 'companyChemicalForm') {
      e.preventDefault();
      if (!activeSiteId) return;
      const site = state.sites.find(s => s.id === activeSiteId);
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
      if (!mobJob) return;
      
      const site = state.sites.find(s => s.id === mobJob.siteId);
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
        workOrderId: mobJob.id,
        chemicalId: chemicalId,
        date: dateStr,
        quantity: quantity,
        area: area,
        tech: mobJob.tech,
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

function renderChemicalUsage(site) {
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

function renderServiceScope(site) {
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

function renderClientAnalytics() {
  const canvas = $('#analyticsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const site = state.sites.find(s => s.id === activeSiteId);
  if (!site) return;
  
  const activeFilterBtn = $('#analyticsFilterChips .filter-btn.active');
  const filter = activeFilterBtn ? activeFilterBtn.dataset.analyticsFilter : 'all';
  
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'];
  let values = [];
  
  if (site.id === 's1') {
    if (filter === 'all') values = [18, 22, 14, 19, 12, site.issues];
    else if (filter === 'rodent') values = [8, 12, 6, 8, 4, site.stations.filter(s => s.type === 'rodent' && s.status === 'activity').length];
    else if (filter === 'crawling') values = [4, 6, 5, 4, 3, site.stations.filter(s => s.type === 'crawler' && s.status === 'activity').length];
    else if (filter === 'flying') values = [6, 4, 3, 7, 5, site.stations.filter(s => (s.type === 'flying' || s.type === 'insect_light_trap') && s.status === 'activity').length];
    else values = [0, 0, 0, 0, 0, 0];
  } else {
    const scale = Math.max(2, Math.round((100 - site.score) / 3));
    values = [scale + 4, scale + 2, scale + 5, scale + 1, scale, site.issues];
  }
  
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  
  const padding = { top: 30, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const maxVal = Math.max(10, Math.max(...values) + 2);
  
  ctx.strokeStyle = '#e4e4e7';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#71717a';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const yVal = Math.round((maxVal / gridLines) * i);
    const y = padding.top + chartHeight - (yVal / maxVal) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    
    ctx.fillText(yVal, padding.left - 8, y);
  }
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  
  const barWidth = Math.round(chartWidth / months.length) - 16;
  const step = chartWidth / months.length;
  
  months.forEach((m, idx) => {
    const val = values[idx];
    const x = padding.left + idx * step + step / 2;
    const yValHeight = (val / maxVal) * chartHeight;
    const y = padding.top + chartHeight - yValHeight;
    
    const gradient = ctx.createLinearGradient(x - barWidth/2, y, x - barWidth/2, padding.top + chartHeight);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#60a5fa');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Support basic rect if roundRect has minor compatibility issues
    if (ctx.roundRect) {
      ctx.roundRect(x - barWidth/2, y, barWidth, yValHeight, [4, 4, 0, 0]);
    } else {
      ctx.rect(x - barWidth/2, y, barWidth, yValHeight);
    }
    ctx.fill();
    
    ctx.fillStyle = '#09090b';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillText(val, x, y - 14);
    
    ctx.fillStyle = '#71717a';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText(m, x, padding.top + chartHeight + 8);
  });
  
  const recStats = $('#recStatsContainer');
  if (recStats) {
    const recs = site.recommendations || [];
    const openRecs = recs.filter(r => r.status === 'open').length;
    const closedRecs = recs.filter(r => r.status === 'resolved').length;
    const hygiene = recs.filter(r => r.category === 'Hijyen').length;
    const isolation = recs.filter(r => r.category === 'Yalıtım' || r.category === 'BRCGS' || r.category === 'AIB').length;
    
    recStats.innerHTML = `
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Açık Öneri</span><strong>${openRecs}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Giderilen Öneri</span><strong>${closedRecs}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Hijyen Odaklı</span><strong>${hygiene}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Yalıtım & Fiziksel</span><strong>${isolation}</strong></div></div>
    `;
  }
  
  const chemStats = $('#chemStatsContainer');
  if (chemStats) {
    const chemCount = site.chemicalsUsed ? site.chemicalsUsed.length : 0;
    const totalQty = site.chemicalsUsed ? site.chemicalsUsed.reduce((sum, cu) => {
      const q = parseInt(cu.quantity) || 0;
      return sum + q;
    }, 0) : 0;
    chemStats.innerHTML = `
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Uygulama Sayısı</span><strong>${chemCount}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Toplam Sarfiyat</span><strong>${totalQty} ml/gr</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Aktif Ürün Türü</span><strong>${site.chemicalsUsed ? [...new Set(site.chemicalsUsed.map(c => c.chemicalId))].length : 0}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Son Uygulama</span><strong>${site.chemicalsUsed && site.chemicalsUsed[0] ? site.chemicalsUsed[0].date : '—'}</strong></div></div>
    `;
  }
}

function initSignaturePads() {
  const setupCanvas = (canvasId, clearBtnId) => {
    const canvas = $(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear dynamic bindings if already bound
    if (canvas.dataset.bound === 'true') return;
    canvas.dataset.bound = 'true';
    
    ctx.strokeStyle = '#09090b';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    let drawing = false;
    
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };
    
    const startDrawing = (e) => {
      drawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      e.preventDefault();
    };
    
    const draw = (e) => {
      if (!drawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      e.preventDefault();
    };
    
    const stopDrawing = () => {
      drawing = false;
    };
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    
    const clearBtn = $(clearBtnId);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        toast('İmza temizlendi.');
      });
    }
  };
  
  setupCanvas('#sigCanvasCustomer', '#btnClearSigCustomer');
  setupCanvas('#sigCanvasTech', '#btnClearSigTech');
}

function deductStock(chemicalId, amountStr) {
  if (!state.inventory) state.inventory = [];
  if (!state.inventoryTransactions) state.inventoryTransactions = [];

  const item = state.inventory.find(i => i.chemicalId === chemicalId);
  if (!item) return;

  const numVal = parseFloat(amountStr.replace(/[^\d\.]/g, '')) || 0;
  if (numVal <= 0) return;

  item.qty = Math.round((item.qty - numVal) * 10) / 10;
  
  const dateStr = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
  state.inventoryTransactions.unshift({
    id: `tx${Date.now()}`,
    chemicalId: chemicalId,
    type: 'deduct',
    qty: numVal,
    unit: item.unit,
    date: dateStr,
    notes: 'Saha uygulaması düşüşü'
  });

  save();
  renderInventory();

  // Alert if drops below warning threshold
  if (item.qty <= item.minQty) {
    toast(`UYARI: ${item.name} stok seviyesi kritik sınırın altına düştü!`);
  }
}

function renderMobChemicalsList(site) {
  const container = $('#mobChemicalList');
  if (!container) return;
  if (!mobJob) return;
  
  const visitChems = (site.chemicalsUsed || []).filter(cu => cu.workOrderId === mobJob.id);
  
  container.innerHTML = visitChems.map((cu, index) => {
    const chem = chemicalDatabase.find(c => c.id === cu.chemicalId);
    const chemName = chem ? chem.name : 'Kimyasal';
    return `
      <div style="background:var(--soft); border:1px solid var(--line); border-radius:6px; padding:8px; display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <div>
          <b>${chemName}</b><br>
          <small class="text-muted">Miktar: ${cu.quantity} · Alan: ${cu.area}</small>
        </div>
        ${mobJob.completed ? '' : `<button type="button" class="text-btn delete-mob-chem-btn" data-chem-index="${index}" style="color:var(--red); font-size:16px; font-weight:700; border:none; background:none; cursor:pointer;">×</button>`}
      </div>
    `;
  }).join('') || '<div class="text-muted" style="text-align:center; padding:10px; font-size:10px; background:var(--soft); border-radius:6px;">Ziyarette henüz kullanılan kimyasal girilmedi.</div>';
}

function renderInventory() {
  const tbody = $('#invStockTableBody');
  if (!tbody) return;
  if (!state.inventory) state.inventory = [];
  if (!state.inventoryTransactions) state.inventoryTransactions = [];

  // Update metrics
  $('#invTotalProducts').textContent = state.inventory.length;
  
  const criticalCount = state.inventory.filter(item => item.qty <= item.minQty).length;
  const healthyCount = state.inventory.length - criticalCount;
  
  $('#invCriticalStock').textContent = criticalCount;
  $('#invHealthyStock').textContent = healthyCount;
  
  if (criticalCount > 0) {
    $('#invCriticalStock').classList.add('attention');
  } else {
    $('#invCriticalStock').classList.remove('attention');
  }

  const lastTx = state.inventoryTransactions[0];
  if (lastTx) {
    const chemName = (chemicalDatabase.find(c => c.id === lastTx.chemicalId) || {}).name || 'Kimyasal';
    const typeLabel = lastTx.type === 'refill' ? 'Giriş' : 'Çıkış';
    $('#invLastTransaction').textContent = `${typeLabel}: ${chemName} (${lastTx.qty} ${lastTx.unit})`;
  } else {
    $('#invLastTransaction').textContent = 'İşlem Yok';
  }

  // Populate Stock table
  tbody.innerHTML = state.inventory.map(item => {
    const isCritical = item.qty <= item.minQty;
    const statusText = isCritical ? 'Kritik Seviye' : 'Güvenli';
    const statusClass = isCritical ? 'critical' : 'healthy';
    
    return `
      <tr>
        <td><b>${item.name}</b></td>
        <td><code style="font-size:10px;">${item.lotNo || '—'}</code></td>
        <td style="font-weight:700; color:${isCritical ? 'var(--red)' : 'var(--ink)'};">${item.qty} ${item.unit}</td>
        <td><small class="text-muted">${item.minQty} ${item.unit}</small></td>
        <td><span class="status-chip ${statusClass}">${statusText}</span></td>
        <td>₺${item.unitCost} / ${item.unit}</td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="6" class="empty" style="text-align:center;">Depoda kayıtlı ürün bulunmuyor.</td></tr>';

  // Populate Refill select dropdown options
  const refillSelect = $('#refillChemSelect');
  if (refillSelect && refillSelect.children.length === 0) {
    refillSelect.innerHTML = `<option value="">-- Ürün seçin --</option>` + 
      chemicalDatabase.map(c => `<option value="${c.id}">${c.name} (${c.category})</option>`).join('');
  }

  // Populate Transactions table
  const txTbody = $('#invTransactionTableBody');
  if (txTbody) {
    txTbody.innerHTML = state.inventoryTransactions.map(tx => {
      const chem = chemicalDatabase.find(c => c.id === tx.chemicalId);
      const chemName = chem ? chem.name : 'Bilinmeyen';
      const isRefill = tx.type === 'refill';
      const badgeColor = isRefill ? 'var(--green)' : 'var(--red)';
      const typeSign = isRefill ? '＋' : '－';
      
      return `
        <tr>
          <td><small class="text-muted">${tx.date}</small></td>
          <td><b>${chemName}</b><br><span style="color:var(--muted); font-size:9px;">${tx.notes || ''}</span></td>
          <td style="font-weight:700; color:${badgeColor};">${typeSign}${tx.qty} ${tx.unit}</td>
          <td><span class="status-chip secondary" style="font-size:9px;">${isRefill ? 'İkmal' : 'Tüketim'}</span></td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="4" class="empty" style="text-align:center;">Henüz hareket kaydı bulunmuyor.</td></tr>';
  }
}

function renderFinance() {
  const tbody = $('#finInvoicesTableBody');
  if (!tbody) return;
  if (!state.invoices) state.invoices = [];
  
  // Custom filter checking
  const activeFilterBtn = $('#financeInvoiceFilter .filter-btn.active');
  const filter = activeFilterBtn ? activeFilterBtn.dataset.invoiceFilter : 'all';
  
  const filteredInvoices = state.invoices.filter(inv => {
    if (filter === 'paid') return inv.status === 'paid';
    if (filter === 'pending') return inv.status === 'sent' || inv.status === 'draft';
    return true;
  });

  // Calculate metrics
  const totalRevenue = state.invoices.filter(inv => inv.status !== 'draft').reduce((sum, inv) => sum + inv.amount, 0);
  const totalCost = state.invoices.filter(inv => inv.status !== 'draft').reduce((sum, inv) => sum + (inv.laborCost + inv.chemicalCost), 0);
  const netMargin = totalRevenue > 0 ? Math.round(((totalRevenue - totalCost) / totalRevenue) * 100) : 0;
  const draftCount = state.invoices.filter(inv => inv.status === 'draft').length;
  const paidCount = state.invoices.filter(inv => inv.status === 'paid').length;

  $('#finTotalRevenue').textContent = `₺${totalRevenue.toLocaleString('tr-TR')}`;
  $('#finTotalCost').textContent = `₺${totalCost.toLocaleString('tr-TR')}`;
  $('#finNetMargin').textContent = `${netMargin}%`;
  $('#finPendingInvoices').textContent = `${draftCount} Taslak / ${paidCount} Ödenmiş`;

  // Draw Invoice Rows
  tbody.innerHTML = filteredInvoices.map(inv => {
    const isPaid = inv.status === 'paid';
    const isDraft = inv.status === 'draft';
    const statusClass = isPaid ? 'healthy' : (isDraft ? 'warning' : 'blue');
    const statusText = isPaid ? 'Ödendi' : (isDraft ? 'Taslak' : 'Gönderildi');
    
    let actionBtn = '';
    if (isDraft) {
      actionBtn = `<button class="text-btn send-invoice-btn" data-invoice-id="${inv.id}" style="padding:0; font-size:10px; font-weight:700; color:var(--blue);">Gönder ✈</button>`;
    } else if (inv.status === 'sent') {
      actionBtn = `<button class="text-btn pay-invoice-btn" data-invoice-id="${inv.id}" style="padding:0; font-size:10px; font-weight:700; color:var(--green);">Öde 💸</button>`;
    } else {
      actionBtn = `<span style="color:var(--muted); font-size:10px;">Tamamlandı</span>`;
    }

    return `
      <tr>
        <td><b>${inv.id}</b></td>
        <td><b>${inv.company}</b><br><small class="text-muted">${inv.name}</small></td>
        <td><small>${inv.date}</small></td>
        <td><b>₺${inv.amount.toLocaleString('tr-TR')}</b></td>
        <td><small class="text-muted">₺${(inv.laborCost + inv.chemicalCost).toLocaleString('tr-TR')}</small></td>
        <td style="font-weight:700; color:${inv.margin < 50 ? 'var(--red)' : 'var(--green)'};">${inv.margin}%</td>
        <td><span class="status-chip ${statusClass}">${statusText}</span></td>
        <td>${actionBtn}</td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="8" class="empty" style="text-align:center;">Eşleşen fatura kaydı bulunmuyor.</td></tr>';

  // Draw Profitability Margin Bar lists for each site
  const marginContainer = $('#finProfitabilityDistribution');
  if (marginContainer) {
    marginContainer.innerHTML = state.sites.map(s => {
      // Calculate avg margin for this site
      const siteInvs = state.invoices.filter(i => i.siteId === s.id);
      let avgMargin = 0;
      let costText = 'Hizmet maliyeti yok';
      if (siteInvs.length > 0) {
        const sumMargin = siteInvs.reduce((sum, i) => sum + i.margin, 0);
        avgMargin = Math.round(sumMargin / siteInvs.length);
        const sumCost = siteInvs.reduce((sum, i) => sum + (i.laborCost + i.chemicalCost), 0);
        costText = `Ort. Maliyet: ₺${Math.round(sumCost / siteInvs.length)}`;
      } else {
        // Fallback calculations using monthlyPrice
        if (s.contract) {
          avgMargin = 75; // typical default
          costText = `Ort. Maliyet: ₺${Math.round(s.contract.monthlyPrice * 0.25)}`;
        }
      }
      
      const barColor = avgMargin >= 65 ? 'var(--green)' : (avgMargin >= 40 ? 'var(--amber)' : 'var(--red)');
      
      return `
        <div style="background:var(--soft); padding:10px; border:1px solid var(--line); border-radius:6px;">
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
            <b>${s.company}</b>
            <span style="font-weight:700; color:${barColor};">${avgMargin}% Kâr</span>
          </div>
          <div style="height:6px; background:#e4e4e7; border-radius:3px; overflow:hidden;">
            <div style="height:100%; width:${avgMargin}%; background:${barColor}; border-radius:3px;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:9px; color:var(--muted); margin-top:2px;">
            <span>Aylık Fatura: ₺${s.contract ? s.contract.monthlyPrice.toLocaleString('tr-TR') : '—'}</span>
            <span>${costText}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

bind();
checkSession();
render();

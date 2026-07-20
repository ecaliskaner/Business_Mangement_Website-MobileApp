// Domain catalog: pest taxonomy, visit types, equipment, chemicals, labels.
// Extracted from app.js (Phase 0a-1).

// ===== UI LABEL MAPS =====
export const names = { dashboard:"Genel bakış", sites:"Tesisler", work:"İş emirleri", team:"Ekip & rota", insights:"Analizler", reports:"Raporlar", companyDetail:"Tesis Detayı & Profil", mobileSim:"Mobil Uygulama", inventory:"Stok & Envanter", finance:"Finans & Fatura" };
export const stateLabel = {risk:"Riskli",watch:"İzlenmeli",healthy:"Sağlıklı"};

// ===== PEST TAXONOMY DATABASE =====
export const pestDatabase = {
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
export const visitTypes = [
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
export const equipmentTypes = {
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
export const equipmentStatusCodes = {
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
export const chemicalDatabase = [
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

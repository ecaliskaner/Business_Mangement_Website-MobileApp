// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { modal } from '../ui/modal.js';
import { toast } from '../core/dom.js';
import { save } from '../core/state.js';

export function renderReports(){
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

export function openReportModal(reportId) {
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


export function reportCardClicks(e) {
    const report=e.target.closest('[data-report]');
    if(report) {
      const rId = report.dataset.reportId || 'r1';
      openReportModal(rId);
      return true;
    }
  return false;
}

export function generateReportSubmit(e) {
    if(e.target.id==='generateReport'){
      e.preventDefault();
      $('#modal').classList.add('hidden');
      toast('Rapor oluşturuldu. Paylaşım bağlantısı müşteri portalına eklendi.');
    }
    
    // Admin floor plan inspection form save
  return false;
}

// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { state } from '../core/state.js';
import { ui } from '../core/session.js';

export function renderInsights(){
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

export function renderAiPredictions() {
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

export function renderClientAnalytics() {
  const canvas = $('#analyticsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const site = state.sites.find(s => s.id === ui.activeSiteId);
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

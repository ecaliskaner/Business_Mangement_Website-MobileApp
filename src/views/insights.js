// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { state } from '../core/state.js';
import { ui } from '../core/session.js';
import { $$, toast } from '../core/dom.js';
import { monthlyPestTotals, siteRanking, recommendationStats, chemicalStats } from '../data/history.js';

export function renderInsights(){
  const filter = $('#trendFilter').value;
  const series = monthlyPestTotals();
  const d = series[filter] || series.all;
  const max = Math.max(1, ...d);
  $('#trendChart').innerHTML = d.map((n,i)=>`<span class="chart-bar" data-value="${n}" data-label="${series.labels[i]}" style="height:${n/max*210}px"></span>`).join('');

  const caption = $('#trendCaption');
  if (caption) caption.textContent = `Son 12 ay · ${d.reduce((s,n)=>s+n,0)} toplam bulgu`;

  $('#ranking').innerHTML = siteRanking().slice(0,5).map((s,i)=>`
    <div class="rank-row" data-site-id="${s.id}" style="cursor:pointer;">
      <span>0${i+1}</span>
      <div><b>${s.name}</b><small>${s.company} · son 3 ayda ${s.recentPests} bulgu · ${s.openRecommendations} açık öneri</small></div>
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
  
  const series = monthlyPestTotals(site.id);
  const key = filter === 'crawling' ? 'crawler' : filter;
  const full = series[key] || series.all;
  const months = series.labels.slice(-6);
  const values = full.slice(-6);

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
    const live = site.recommendations || [];
    const r = recommendationStats(site.id);
    const open = r.open + live.filter(x => x.status === 'open').length;
    const resolved = r.resolved + live.filter(x => x.status === 'resolved').length;
    recStats.innerHTML = `
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Açık Öneri</span><strong>${open}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Giderilen Öneri</span><strong>${resolved}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Hijyen Odaklı</span><strong>${r.hygiene}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Yalıtım & Fiziksel</span><strong>${r.isolation}</strong></div></div>
    `;
  }

  const chemStats = $('#chemStatsContainer');
  if (chemStats) {
    const c = chemicalStats(site.id);
    chemStats.innerHTML = `
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Uygulama Sayısı</span><strong>${c.applications}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Toplam Sarfiyat</span><strong>${c.totalQuantity.toLocaleString('tr-TR')} ml/gr</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Aktif Ürün Türü</span><strong>${c.distinctProducts}</strong></div></div>
      <div class="metric-card" style="box-shadow:none; border:1px solid var(--line); background:var(--soft);"><div><span>Son Uygulama</span><strong>${c.lastDate}</strong></div></div>
    `;
  }
}


export function insightsClicks(e) {
    if (e.target.id === 'btnDownloadChart') {
      const canvas = $('#analyticsCanvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `${ui.activeSiteId}_trend_analizi.png`;
        link.href = canvas.toDataURL();
        link.click();
        toast('Grafik PNG olarak indirildi.');
      }
      return true;
    }

    // Analytics filter chip clicks
    const analyticsFilter = e.target.closest('[data-analytics-filter]');
    if (analyticsFilter) {
      $$('[data-analytics-filter]').forEach(b => b.classList.toggle('active', b === analyticsFilter));
      renderClientAnalytics();
      return true;
    }

    // Invoice status actions
  return false;
}

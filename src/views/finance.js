// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { state } from '../core/state.js';
import { $$, toast } from '../core/dom.js';
import { save } from '../core/state.js';

export function renderFinance() {
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


export function invoiceActionClicks(e) {
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
      return true;
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
      return true;
    }

    // Delete mobile chemical usage
  return false;
}

export function invoiceFilterClicks(e) {
    const invFilter = e.target.closest('[data-invoice-filter]');
    if (invFilter) {
      $$('[data-invoice-filter]').forEach(b => b.classList.toggle('active', b === invFilter));
      renderFinance();
      return true;
    }

    // File download trigger toast
  return false;
}

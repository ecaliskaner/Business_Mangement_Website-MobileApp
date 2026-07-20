// Extracted from app.js (Phase 0a-3).

import { $, toast } from '../core/dom.js';
import { save, state } from '../core/state.js';
import { chemicalDatabase } from '../data/catalog.js';

export function renderInventory() {
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

export function deductStock(chemicalId, amountStr) {
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


export function stockRefillSubmit(e) {
    if (e.target.id === 'invRefillForm') {
      e.preventDefault();
      const f = new FormData(e.target);
      const chemicalId = f.get('chemicalId');
      const quantity = parseFloat(f.get('quantity')) || 0;
      const lotNo = f.get('lotNo').trim();
      const notes = f.get('notes').trim() || 'Depo stok girişi';
      
      if (!chemicalId || quantity <= 0 || !lotNo) return true;
      
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
  return false;
}

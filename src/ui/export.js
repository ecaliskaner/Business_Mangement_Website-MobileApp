// CSV / SVG / PNG download and print-to-PDF helpers (Phase 0c-2).
// No dependencies and no backend — everything is built client-side and handed
// to the browser as a blob URL.
//
//   downloadCSV('istasyonlar.csv', rows, [
//     { key: 'code', label: 'İstasyon' },
//     { key: 'lastReading', label: 'Son Okuma', format: v => v ?? '—' }
//   ]);
//   printElement('#reportBody', { title: 'Servis Raporu' });

import { toast } from '../core/dom.js';

// Turkish Excel splits on ';' under a tr-TR locale and treats ',' as the
// decimal separator, so a comma-delimited file lands in one column. The BOM is
// what stops "Ürün" rendering as "ÃœrÃ¼n".
const DELIMITER = ';';
const BOM = '﻿';

/* -------------------------------------------------------------------- CSV */

function cell(value) {
  if (value === null || value === undefined) return '';
  let s = String(value);
  // A leading =, +, - or @ makes Excel evaluate the cell as a formula; the
  // apostrophe forces it back to text.
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return /["\n\r;,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// rows: array of objects (or arrays, if columns are index-based).
// columns: ['key', ...] or [{ key, label, format }, ...]. Omit to use the keys
// of the first row.
export function toCSV(rows, columns) {
  const list = rows || [];
  const cols = (columns || Object.keys(list[0] || {})).map(c =>
    typeof c === 'string' ? { key: c, label: c } : { label: c.key, ...c });

  const header = cols.map(c => cell(c.label)).join(DELIMITER);
  const body = list.map(row =>
    cols.map(c => cell(c.format ? c.format(row[c.key], row) : row[c.key])).join(DELIMITER)
  );
  // CRLF: Excel is the target consumer here, not a unix pipe.
  return [header, ...body].join('\r\n');
}

/* --------------------------------------------------------------- download */

export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoking synchronously cancels the download in Safari.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCSV(filename, rows, columns) {
  const name = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  downloadBlob(name, new Blob([BOM + toCSV(rows, columns)], { type: 'text/csv;charset=utf-8;' }));
  toast(`${name} indirildi.`);
  return name;
}

/* ------------------------------------------------------- chart image export */

// Accepts a chart container, an <svg>, or a selector; returns standalone SVG
// markup with the namespace declared, so it opens outside the page.
function svgMarkup(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return null;
  const svg = el.tagName && el.tagName.toLowerCase() === 'svg' ? el : el.querySelector('svg');
  if (!svg) return null;

  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  // Exported files have no stylesheet, so pin an explicit white background and
  // the app's font rather than inheriting the viewer's defaults.
  clone.setAttribute('style', 'background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif');
  return new XMLSerializer().serializeToString(clone);
}

export function downloadChartSVG(target, filename) {
  const markup = svgMarkup(target);
  if (!markup) { toast('Grafik bulunamadı.'); return false; }
  const name = filename.endsWith('.svg') ? filename : `${filename}.svg`;
  downloadBlob(name, new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }));
  toast(`${name} indirildi.`);
  return true;
}

// Rasterises via an offscreen canvas. Async because the image decode is.
// scale=2 keeps the PNG crisp when it is pasted into a slide deck.
export function downloadChartPNG(target, filename, scale = 2) {
  const markup = svgMarkup(target);
  if (!markup) { toast('Grafik bulunamadı.'); return Promise.resolve(false); }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  const svg = el.tagName.toLowerCase() === 'svg' ? el : el.querySelector('svg');
  const box = svg.viewBox.baseVal;
  const w = (box && box.width) || svg.clientWidth || 640;
  const h = (box && box.height) || svg.clientHeight || 280;

  return new Promise(resolve => {
    const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        const name = filename.endsWith('.png') ? filename : `${filename}.png`;
        downloadBlob(name, blob);
        toast(`${name} indirildi.`);
        resolve(true);
      }, 'image/png');
    };
    img.onerror = () => { URL.revokeObjectURL(url); toast('Grafik dışa aktarılamadı.'); resolve(false); };
    img.src = url;
  });
}

/* ------------------------------------------------------------ print to PDF */

const PRINT_ROOT = 'ct-print-root';

// Prints one element as a standalone document — the browser's "Save as PDF"
// destination is the PDF export. The print stylesheet in styles.css hides
// everything outside .ct-print-root, so no popup window or iframe is needed
// (and nothing gets blocked by a popup blocker mid-demo).
export function printElement(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) { toast('Yazdırılacak içerik bulunamadı.'); return false; }

  const previousTitle = document.title;
  // Most browsers seed the PDF filename from document.title.
  if (options.title) document.title = options.title;
  el.classList.add(PRINT_ROOT);
  document.body.classList.add('ct-printing');

  const cleanup = () => {
    el.classList.remove(PRINT_ROOT);
    document.body.classList.remove('ct-printing');
    document.title = previousTitle;
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  // Safari never fires afterprint reliably; the timer guarantees the page is
  // restored even if the dialog is dismissed.
  setTimeout(() => { if (document.body.classList.contains('ct-printing')) cleanup(); }, 60000);

  window.print();
  return true;
}

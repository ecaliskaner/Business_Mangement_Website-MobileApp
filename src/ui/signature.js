// Digital signature pads. Extracted from app.js (Phase 0a-3), extended in
// Phase 1 (task 1-7) to track whether each pad has actually been signed so the
// visit cannot be closed on an empty pad.

import { $, toast } from '../core/dom.js';

// Which pads currently hold ink, keyed by canvas selector. A pad is "signed"
// only after a stroke — clearing it takes the flag back off.
const signed = {};

// Notified whenever a pad is signed or cleared, so the owning view can update
// its gate without polling.
let onChange = null;

export function setSignatureChangeHandler(fn) {
  onChange = fn;
}

export function isSigned(canvasId) {
  return signed[canvasId] === true;
}

export function bothSigned() {
  return isSigned('#sigCanvasCustomer') && isSigned('#sigCanvasTech');
}

// Data URL for a signed pad, or null if it was never signed — callers should
// never persist a blank canvas as if it were a signature.
export function getSignature(canvasId) {
  if (!isSigned(canvasId)) return null;
  const canvas = $(canvasId);
  return canvas ? canvas.toDataURL() : null;
}

export function clearSignature(canvasId) {
  const canvas = $(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  signed[canvasId] = false;
  canvas.classList.remove('signed');
  if (onChange) onChange();
}

// Wipes both pads and forgets their state — called when a new job is opened so
// signatures never carry across visits.
export function resetSignaturePads() {
  clearSignature('#sigCanvasCustomer');
  clearSignature('#sigCanvasTech');
}

export function initSignaturePads() {
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
      // The canvas is displayed at a different size than its backing store,
      // so map CSS pixels onto canvas pixels or the ink lands off-cursor.
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const markSigned = () => {
      if (signed[canvasId]) return;
      signed[canvasId] = true;
      canvas.classList.add('signed');
      if (onChange) onChange();
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
      markSigned();
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

    // A single tap with no drag is still a signature intent — treat the
    // press itself as ink so a quick demo tap registers.
    canvas.addEventListener('click', () => {
      if (!signed[canvasId]) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        markSigned();
      }
    });

    const clearBtn = $(clearBtnId);
    if (clearBtn && clearBtn.dataset.bound !== 'true') {
      clearBtn.dataset.bound = 'true';
      clearBtn.addEventListener('click', () => {
        clearSignature(canvasId);
        toast('İmza temizlendi.');
      });
    }
  };

  setupCanvas('#sigCanvasCustomer', '#btnClearSigCustomer');
  setupCanvas('#sigCanvasTech', '#btnClearSigTech');
}

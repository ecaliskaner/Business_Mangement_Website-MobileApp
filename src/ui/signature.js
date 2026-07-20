// Extracted from app.js (Phase 0a-3).

import { $, toast } from '../core/dom.js';

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

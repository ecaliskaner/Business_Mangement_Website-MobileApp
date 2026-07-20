// Extracted from app.js (Phase 0a-3).

import { $ } from '../core/dom.js';
import { state } from '../core/state.js';
import { openQuickScheduleModal } from '../ui/modal.js';

export function renderCalendarGrid() {
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

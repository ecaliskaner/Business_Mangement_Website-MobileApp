// Demo user directory. Role gating lives in app.js until views are
// extracted (Phase 0a-3), because it mutates shared UI cursors.

export const users = {
  'admin@ladybug.com': { email: 'admin@ladybug.com', name: 'Seda Kaya', role: 'admin', title: 'Operasyon Yöneticisi (Boss)', avatar: 'SK' },
  'admin@insectram.com': { email: 'admin@ladybug.com', name: 'Seda Kaya', role: 'admin', title: 'Operasyon Yöneticisi (Boss)', avatar: 'SK' },
  'ayse@ladybug.com': { email: 'ayse@ladybug.com', name: 'Ayşe Demir', role: 'tech', title: 'Baş Teknisyen', avatar: 'AD' },
  'ayse@insectram.com': { email: 'ayse@ladybug.com', name: 'Ayşe Demir', role: 'tech', title: 'Baş Teknisyen', avatar: 'AD' },
  'acme@client.com': { email: 'acme@client.com', name: 'Ahmet Çelik', role: 'client', title: 'Acme Gıda Yetkilisi', avatar: 'AC' }
};

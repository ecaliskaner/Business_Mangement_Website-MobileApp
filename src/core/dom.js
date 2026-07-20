// DOM helpers and toast. Extracted from app.js (Phase 0a-2).

export const $ = s => document.querySelector(s);
export const $$ = s => [...document.querySelectorAll(s)];

export function toast(message){const el=$("#toast");el.textContent=message;el.classList.remove("hidden");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add("hidden"),3000)}

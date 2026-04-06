const buildVariant = (() => {
  try {
    return import.meta.env?.VITE_VARIANT || 'full';
  } catch {
    return 'full';
  }
})();

export const SITE_VARIANT: string = (() => {
  if (typeof window === 'undefined') return buildVariant;

  const isTauri = '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
  if (isTauri) {
    const stored = localStorage.getItem('xworld-variant');
    if (stored === 'tech' || stored === 'full' || stored === 'finance' || stored === 'happy' || stored === 'commodity') return stored;
    return buildVariant;
  }

  // Check URL path first (for xworld.amirtech.ai/finance, /technology, /commodity)
  const p = location.pathname;
  if (p.startsWith('/technology')) return 'tech';
  if (p.startsWith('/finance')) return 'finance';
  if (p.startsWith('/commodity')) return 'commodity';
  if (p.startsWith('/world')) return 'full';

  // Check localStorage for all web users (set by sub-page redirects)
  const ls = localStorage.getItem('xworld-variant');
  if (ls === 'tech' || ls === 'full' || ls === 'finance' || ls === 'happy' || ls === 'commodity') return ls;

  const h = location.hostname;
  if (h.startsWith('tech.')) return 'tech';
  if (h.startsWith('finance.')) return 'finance';
  if (h.startsWith('happy.')) return 'happy';
  if (h.startsWith('commodity.')) return 'commodity';

  if (h === 'localhost' || h === '127.0.0.1') {
    const stored = localStorage.getItem('xworld-variant');
    if (stored === 'tech' || stored === 'full' || stored === 'finance' || stored === 'happy' || stored === 'commodity') return stored;
    return buildVariant;
  }

  return 'full';
})();

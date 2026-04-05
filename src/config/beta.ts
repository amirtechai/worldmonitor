export const BETA_MODE = typeof window !== 'undefined'
  && localStorage.getItem('xworld-beta-mode') === 'true';

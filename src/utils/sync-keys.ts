export const CLOUD_SYNC_KEYS = [
  'xworld-panels',
  'xworld-monitors',
  'xworld-layers',
  'xworld-disabled-feeds',
  'xworld-panel-spans',
  'xworld-panel-col-spans',
  'xworld-panel-order',
  'xworld-theme',
  'xworld-variant',
  'xworld-map-mode',
  'wm-breaking-alerts-v1',
  'wm-market-watchlist-v1',
  'aviation:watchlist:v1',
  'wm-pinned-webcams',
  'wm-map-provider',
  'wm-font-family',
  'wm-globe-visual-preset',
  'wm-stream-quality',
  'wm-ai-flow-cloud-llm',
  'wm-analysis-frameworks',
  'wm-panel-frameworks',
  // Provider-specific map themes (wm-map-theme:<provider>)
  'wm-map-theme:auto',
  'wm-map-theme:pmtiles',
  'wm-map-theme:openfreemap',
  'wm-map-theme:carto',
  // Live-stream mode
  'wm-live-streams-always-on',
] as const;

export type CloudSyncKey = (typeof CLOUD_SYNC_KEYS)[number];

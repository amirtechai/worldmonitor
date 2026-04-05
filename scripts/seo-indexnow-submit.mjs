#!/usr/bin/env node
/**
 * Submit all xworld.amirtech.ai URLs to IndexNow after deploy.
 * Run once after deploying the IndexNow key file:
 *   node scripts/seo-indexnow-submit.mjs
 *
 * IndexNow requires all URLs in one request to share the same host.
 * Submits separate batches per subdomain.
 */

const KEY = 'a7f3e9d1b2c44e8f9a0b1c2d3e4f5a6b';

const BATCHES = [
  {
    host: 'www.xworld.amirtech.ai',
    urls: [
      'https://xworld.amirtech.ai/',
      'https://xworld.amirtech.ai/pro',
      'https://xworld.amirtech.ai/blog/',
      'https://xworld.amirtech.ai/blog/posts/what-is-xworld-real-time-global-intelligence/',
      'https://xworld.amirtech.ai/blog/posts/five-dashboards-one-platform-xworld-variants/',
      'https://xworld.amirtech.ai/blog/posts/track-global-conflicts-in-real-time/',
      'https://xworld.amirtech.ai/blog/posts/cyber-threat-intelligence-for-security-teams/',
      'https://xworld.amirtech.ai/blog/posts/osint-for-everyone-open-source-intelligence-democratized/',
      'https://xworld.amirtech.ai/blog/posts/natural-disaster-monitoring-earthquakes-fires-volcanoes/',
      'https://xworld.amirtech.ai/blog/posts/real-time-market-intelligence-for-traders-and-analysts/',
      'https://xworld.amirtech.ai/blog/posts/monitor-global-supply-chains-and-commodity-disruptions/',
      'https://xworld.amirtech.ai/blog/posts/satellite-imagery-orbital-surveillance/',
      'https://xworld.amirtech.ai/blog/posts/live-webcams-from-geopolitical-hotspots/',
      'https://xworld.amirtech.ai/blog/posts/prediction-markets-ai-forecasting-geopolitics/',
      'https://xworld.amirtech.ai/blog/posts/command-palette-search-everything-instantly/',
      'https://xworld.amirtech.ai/blog/posts/xworld-in-21-languages-global-intelligence-for-everyone/',
      'https://xworld.amirtech.ai/blog/posts/ai-powered-intelligence-without-the-cloud/',
      'https://xworld.amirtech.ai/blog/posts/build-on-xworld-developer-api-open-source/',
      'https://xworld.amirtech.ai/blog/posts/xworld-vs-traditional-intelligence-tools/',
      'https://xworld.amirtech.ai/blog/posts/tracking-global-trade-routes-chokepoints-freight-costs/',
    ],
  },
  { host: 'tech.xworld.amirtech.ai', urls: ['https://xworld.amirtech.ai/technology'] },
  { host: 'finance.xworld.amirtech.ai', urls: ['https://xworld.amirtech.ai/finance'] },
  { host: 'happy.xworld.amirtech.ai', urls: ['https://xworld.amirtech.ai'] },
];

const ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/IndexNow',
  'https://searchadvisor.naver.com/indexnow',
  'https://search.seznam.cz/indexnow',
  'https://yandex.com/indexnow',
];

async function submit(endpoint, host, urlList) {
  const keyLocation = `https://${host}/${KEY}.txt`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
  });
  return { endpoint, host, status: res.status, ok: res.ok };
}

for (const { host, urls } of BATCHES) {
  console.log(`\n[${host}] (${urls.length} URLs)`);
  const results = await Promise.allSettled(ENDPOINTS.map(ep => submit(ep, host, urls)));
  for (const r of results) {
    if (r.status === 'fulfilled') {
      console.log(`  ${r.value.ok ? '✓' : '✗'} ${r.value.endpoint.replace('https://', '')} → ${r.value.status}`);
    } else {
      console.log(`  ✗ error: ${r.reason}`);
    }
  }
}

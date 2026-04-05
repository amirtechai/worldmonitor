// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const POST_DATES = {
  'https://xworld.amirtech.ai/blog/posts/ai-powered-intelligence-without-the-cloud/': '2026-03-07',
  'https://xworld.amirtech.ai/blog/posts/build-on-xworld-developer-api-open-source/': '2026-03-09',
  'https://xworld.amirtech.ai/blog/posts/command-palette-search-everything-instantly/': '2026-03-06',
  'https://xworld.amirtech.ai/blog/posts/cyber-threat-intelligence-for-security-teams/': '2026-02-24',
  'https://xworld.amirtech.ai/blog/posts/five-dashboards-one-platform-xworld-variants/': '2026-02-12',
  'https://xworld.amirtech.ai/blog/posts/live-webcams-from-geopolitical-hotspots/': '2026-03-01',
  'https://xworld.amirtech.ai/blog/posts/monitor-global-supply-chains-and-commodity-disruptions/': '2026-02-26',
  'https://xworld.amirtech.ai/blog/posts/natural-disaster-monitoring-earthquakes-fires-volcanoes/': '2026-02-19',
  'https://xworld.amirtech.ai/blog/posts/osint-for-everyone-open-source-intelligence-democratized/': '2026-02-17',
  'https://xworld.amirtech.ai/blog/posts/prediction-markets-ai-forecasting-geopolitics/': '2026-03-03',
  'https://xworld.amirtech.ai/blog/posts/real-time-market-intelligence-for-traders-and-analysts/': '2026-02-21',
  'https://xworld.amirtech.ai/blog/posts/satellite-imagery-orbital-surveillance/': '2026-02-28',
  'https://xworld.amirtech.ai/blog/posts/track-global-conflicts-in-real-time/': '2026-02-14',
  'https://xworld.amirtech.ai/blog/posts/tracking-global-trade-routes-chokepoints-freight-costs/': '2026-03-15',
  'https://xworld.amirtech.ai/blog/posts/what-is-xworld-real-time-global-intelligence/': '2026-02-10',
  'https://xworld.amirtech.ai/blog/posts/xworld-in-21-languages-global-intelligence-for-everyone/': '2026-03-04',
  'https://xworld.amirtech.ai/blog/posts/xworld-vs-traditional-intelligence-tools/': '2026-03-11',
  'https://xworld.amirtech.ai/blog/': '2026-03-19',
};

export default defineConfig({
  site: 'https://xworld.amirtech.ai',
  base: '/blog',
  output: 'static',
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = POST_DATES[item.url];
        if (lastmod) return { ...item, lastmod };
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});

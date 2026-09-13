// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: change this to your real Cloudflare domain before deploying,
  // then update the Sitemap line in public/robots.txt to match.
  site: 'https://themakersclay.pages.dev',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-Hans' },
      },
    }),
  ],
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/*
 * Where the site is served from is set at build time, so the same code works
 * on GitHub Pages (a subpath like /the-makers-clay/) and on a real domain
 * (the root). The GitHub Actions workflow sets both of these; locally and on
 * Cloudflare Pages the defaults apply.
 */
const site = process.env.PUBLIC_SITE_URL || 'https://themakersclay.pages.dev';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,

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

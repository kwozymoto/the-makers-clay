import type { APIRoute } from 'astro';
import { SITE } from '../config';

/*
 * While SITE.preview is true this asks every crawler to stay away, so the
 * work-in-progress site with placeholder prices does not end up in search
 * results. Flip SITE.preview to false to open it up.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? new URL('sitemap-index.xml', site).href : null;

  const body = SITE.preview
    ? ['# Preview build — not for indexing yet.', 'User-agent: *', 'Disallow: /', ''].join('\n')
    : ['User-agent: *', 'Allow: /', '', sitemap ? `Sitemap: ${sitemap}` : '', ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

import { ui, defaultLang, type Lang } from './ui';

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}

/**
 * GitHub Pages serves this at /the-makers-clay/, a real domain serves it at /.
 * Astro rewrites its own asset URLs for that, but not hrefs we write by hand,
 * so every internal link goes through here.
 *
 * BASE_URL is '/' at a root domain and '/the-makers-clay/' under a subpath;
 * normalise it to '' or '/the-makers-clay' so it can just be prepended.
 */
function basePrefix(): string {
  const base = import.meta.env.BASE_URL || '/';
  const trimmed = base.replace(/\/+$/, '');
  return trimmed === '' ? '' : trimmed;
}

/** Remove the deploy base from a pathname, for comparisons and round-trips. */
function stripBase(pathname: string): string {
  const prefix = basePrefix();
  if (prefix && (pathname === prefix || pathname.startsWith(prefix + '/'))) {
    return pathname.slice(prefix.length) || '/';
  }
  return pathname;
}

/** Prefix a path with the language segment and the deploy base. */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  const localised =
    lang === defaultLang ? clean : clean === '/' ? '/' + lang : '/' + lang + clean;
  return basePrefix() + localised;
}

/** Given the current pathname, the equivalent page in the other language. */
export function altLangPath(lang: Lang, pathname: string): string {
  const withoutBase = stripBase(pathname);
  const withoutLang = withoutBase.replace(/^\/zh(?=\/|$)/, '') || '/';
  return localePath(lang === 'en' ? 'zh' : 'en', withoutLang);
}

/** True when `pathname` is, or sits under, the page `href` points at. */
export function isActivePath(href: string, pathname: string): boolean {
  const target = href.replace(/\/$/, '') || '/';
  const here = pathname.replace(/\/$/, '') || '/';
  return here === target || here.startsWith(target + '/');
}

/** Fall back to English content when a Chinese translation is missing. */
export function pick<T>(lang: Lang, en: T, zh: T | undefined | null): T {
  return lang === 'zh' && zh ? zh : en;
}

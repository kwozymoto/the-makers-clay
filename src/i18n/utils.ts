import { ui, defaultLang, type Lang } from './ui';

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}

/** Prefix a path with the language segment. English lives at the root. */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  if (lang === defaultLang) return clean;
  return clean === '/' ? '/zh' : '/' + lang + clean;
}

/** Given the current pathname, the equivalent page in the other language. */
export function altLangPath(lang: Lang, pathname: string): string {
  const stripped = pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
  return lang === 'en' ? localePath('zh', stripped) : stripped;
}

/** Fall back to English content when a Chinese translation is missing. */
export function pick<T>(lang: Lang, en: T, zh: T | undefined | null): T {
  return lang === 'zh' && zh ? zh : en;
}

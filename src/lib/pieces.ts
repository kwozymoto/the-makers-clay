import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

export type Piece = CollectionEntry<'pieces'>;

/**
 * The studio names pieces as a bilingual pair rather than a translation
 * (夜花小杯 / NIGHT FLOWER MINI CUP), so show both and lead with the
 * reader's language. `secondaryIsLatin` tells the caller to set the
 * second line in tracked caps, the way it appears on her posts.
 */
export function pairedTitle(
  lang: Lang,
  data: { title: string; titleZh?: string }
): { primary: string; secondary: string | null; secondaryIsLatin: boolean } {
  const { title, titleZh } = data;
  if (!titleZh || titleZh === title) {
    return { primary: title, secondary: null, secondaryIsLatin: false };
  }
  return lang === 'zh'
    ? { primary: titleZh, secondary: title, secondaryIsLatin: true }
    : { primary: title, secondary: titleZh, secondaryIsLatin: false };
}

/**
 * Photos live in src/assets/pieces/ so Astro can optimise them.
 * Drop a file in that folder, then name it in a piece's `images:` list.
 */
const assets = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/pieces/**/*.{jpeg,jpg,png,webp,avif}'
);

/**
 * Accepts whatever shape the value arrives in — a bare filename written by
 * hand, or a path like '/cat-friends-1.jpg' written by Pages CMS — and looks
 * it up by filename alone.
 */
export async function resolveImage(name?: string): Promise<ImageMetadata | null> {
  if (!name) return null;
  const file = name.split('/').pop();
  if (!file) return null;
  const loader = assets['/src/assets/pieces/' + file];
  if (!loader) return null;
  return (await loader()).default;
}

export async function resolveImages(names: readonly string[]): Promise<ImageMetadata[]> {
  const out = await Promise.all(names.map((n) => resolveImage(n)));
  return out.filter((i): i is ImageMetadata => i !== null);
}

/** Sold pieces sink to the bottom; otherwise `order` desc, then title. */
export function sortPieces(list: Piece[]): Piece[] {
  return [...list].sort((a, b) => {
    const soldA = a.data.status === 'sold' ? 1 : 0;
    const soldB = b.data.status === 'sold' ? 1 : 0;
    if (soldA !== soldB) return soldA - soldB;
    if (a.data.order !== b.data.order) return b.data.order - a.data.order;
    return a.data.title.localeCompare(b.data.title);
  });
}

export async function allPieces(): Promise<Piece[]> {
  return sortPieces(await getCollection('pieces'));
}

export function formatPrice(price: number | null, currency: string): string | null {
  if (price === null) return null;
  const symbol = currency === 'MYR' ? 'RM' : currency + ' ';
  const whole = Number.isInteger(price);
  return symbol + price.toFixed(whole ? 0 : 2);
}

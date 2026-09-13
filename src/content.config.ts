import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/*
 * These files are edited two ways: by hand, and through Pages CMS. A CMS
 * writes back things a human never would — '' for a cleared number, null for
 * an empty text box, a bare string where a list of one is meant — so the
 * schema normalises those rather than failing the build on them.
 */

/** '' / null / missing all mean "not set". */
const optionalText = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.string().optional()
);

const isBlank = (v: unknown) => v === '' || v === null || v === undefined;

/** A cleared price means "ask me", not zero. */
const priceField = z.preprocess((v) => (isBlank(v) ? null : v), z.number().nullable());

/** Sort order always needs a real number to compare. */
const orderField = z.preprocess((v) => (isBlank(v) ? 0 : v), z.number());

/**
 * z.coerce.boolean() would read the string 'false' as true, which is exactly
 * what an unchecked box can serialise to. Handle the strings explicitly.
 */
const flagField = z.preprocess(
  (v) => (isBlank(v) || v === 'false' ? false : v === 'true' ? true : v),
  z.boolean()
);

const pieces = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
  schema: z.object({
    title: z.string(),
    titleZh: optionalText,

    /** 'unique' = there is only one. 'batch' = it can be made again. */
    kind: z.enum(['unique', 'batch']).default('unique'),

    /** 'made-to-order' is for batch pieces that are currently out of stock. */
    status: z.enum(['available', 'sold', 'made-to-order']).default('available'),

    /** Null shows "Price on enquiry". */
    price: priceField,
    currency: z.string().default('MYR'),

    /** Filenames in src/assets/pieces/. The first one is the cover. */
    images: z.preprocess(
      (v) => (typeof v === 'string' ? [v] : (v ?? [])),
      z.array(z.string())
    ),

    description: optionalText,
    descriptionZh: optionalText,

    dimensions: optionalText,
    dimensionsZh: optionalText,

    care: optionalText,
    careZh: optionalText,

    /** Higher numbers sort first on the shop page. */
    order: orderField,
    featured: flagField,

    /** Which batch this came from — handy once there are several. */
    batch: optionalText,
  }),
});

export const collections = { pieces };

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * One markdown file per piece, in src/content/pieces/.
 * Everything lives in the frontmatter so both languages stay side by side
 * and nothing needs a separate translation file.
 */
const pieces = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
  schema: z.object({
    title: z.string(),
    titleZh: z.string().optional(),

    /** 'unique' = there is exactly one. 'batch' = can be made again. */
    kind: z.enum(['unique', 'batch']),

    /** 'made-to-order' is for batch pieces currently out of stock. */
    status: z.enum(['available', 'sold', 'made-to-order']).default('available'),

    /** Leave null to show "price on enquiry". */
    price: z.number().nullable().default(null),
    currency: z.string().default('MYR'),

    /** Filenames inside src/assets/pieces/. First one is the cover. */
    images: z.array(z.string()).default([]),

    description: z.string().optional(),
    descriptionZh: z.string().optional(),

    dimensions: z.string().optional(),
    dimensionsZh: z.string().optional(),

    care: z.string().optional(),
    careZh: z.string().optional(),

    /** Higher numbers sort first on the shop page. */
    order: z.number().default(0),
    featured: z.boolean().default(false),

    /** Which batch this came from — handy once there are several. */
    batch: z.string().optional(),
  }),
});

export const collections = { pieces };

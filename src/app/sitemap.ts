import type { MetadataRoute } from 'next';
import { getAllCaseSlugs } from '@/content/case-studies';
import { SITE_URL } from '@/lib/site';

/**
 * URLs only, deliberately. ⛔ Do not add `lastModified: new Date()` back — it
 * stamps every page with the build time, and Google discounts lastmod once a
 * site proves it inaccurate. `changeFrequency` and `priority` are ignored by
 * Google. A real date would need an `updated` field on CaseStudy.
 */
const sitemap = (): MetadataRoute.Sitemap => [
  { url: `${SITE_URL}/` },
  ...getAllCaseSlugs().map((slug) => ({ url: `${SITE_URL}/work/${slug}` })),
];

export default sitemap;

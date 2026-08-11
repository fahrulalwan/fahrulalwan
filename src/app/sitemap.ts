import type { MetadataRoute } from 'next';
import { getAllCaseSlugs } from '@/content/case-studies';
import { SITE_URL } from '@/lib/site';

/**
 * URLs only, and the omissions are the point.
 *
 * `lastModified` used to be `new Date()`, evaluated at build. That stamped every
 * page with the build time, so all four claimed they had changed the moment the
 * site was last deployed, whether or not a word of them had moved. Google honours
 * lastmod only while it stays accurate and discounts it once a site proves
 * otherwise, so an always-fresh date does not buy freshness. It spends the
 * field's credibility.
 *
 * A hand-kept date per page would be accurate the day it was written and wrong
 * the first time someone edits copy without remembering it. This repo has
 * already been bitten by claims nobody came back to update. Saying nothing is
 * the honest option, and the crawler falls back to its own heuristics.
 *
 * `changeFrequency` and `priority` went with it: Google has stated it ignores
 * both. They were decoration that read as instruction.
 *
 * If a real date is wanted later, the shape is an `updated` field on CaseStudy,
 * maintained deliberately rather than derived from the clock.
 */
const sitemap = (): MetadataRoute.Sitemap => [
  { url: `${SITE_URL}/` },
  ...getAllCaseSlugs().map((slug) => ({ url: `${SITE_URL}/work/${slug}` })),
];

export default sitemap;

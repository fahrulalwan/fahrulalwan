/**
 * The single source for this site's address in application code.
 *
 * Everything needing an absolute URL imports this: metadataBase, the JSON-LD,
 * the sitemap, robots, and the preview card. A custom domain was deliberately
 * deferred in August 2026, and this constant is what keeps that deferral cheap.
 *
 * README.md holds the address too and cannot import this, because it renders as
 * the GitHub profile page. That copy is a known manual site, not an oversight.
 */
export const SITE_URL = 'https://fahrulalwan.vercel.app';

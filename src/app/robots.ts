import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Replaces the static `robots.txt`, which could not import `SITE_URL` and so
 * held the one copy of the address that a domain change would have missed.
 *
 * Next serves this at `/robots.txt` — the route name is derived, not declared.
 */
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/', '/_next/'],
    crawlDelay: 10,
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;

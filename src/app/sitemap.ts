import type { MetadataRoute } from 'next';
import { getAllCaseSlugs } from '@/content/case-studies';
import { SITE_URL } from '@/lib/site';

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  const caseStudyRoutes = getAllCaseSlugs().map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...caseStudyRoutes,
  ];
};

export default sitemap;

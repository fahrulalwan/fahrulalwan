import type { MetadataRoute } from 'next';
import { getAllCaseSlugs } from '@/content/case-studies';

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  const caseStudyRoutes = getAllCaseSlugs().map((slug) => ({
    url: `https://fahrulalwan.vercel.app/work/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://fahrulalwan.vercel.app/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://fahrulalwan.vercel.app/approach',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...caseStudyRoutes,
  ];
};

export default sitemap;

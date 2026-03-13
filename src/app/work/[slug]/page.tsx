import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyContent from '@/components/case-study/case-study-content';
import CaseStudyHeader from '@/components/case-study/case-study-header';
import CtaSection from '@/components/shared/cta-section';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { getAllCaseSlugs, getCaseStudy } from '@/content/case-studies';

export const generateStaticParams = () => {
  return getAllCaseSlugs().map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  const description = caseStudy.context.slice(0, 160);

  return {
    title: caseStudy.headline,
    description,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: caseStudy.headline,
      description,
    },
  };
};

const CaseStudyPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.headline,
    datePublished: caseStudy.year,
    author: {
      '@type': 'Person',
      name: 'Mohammad Fahrul Alwan',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from case study constants
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <CaseStudyHeader caseStudy={caseStudy} />
      <ScrollReveal>
        <CaseStudyContent caseStudy={caseStudy} />
      </ScrollReveal>
      <CtaSection />
    </>
  );
};

export default CaseStudyPage;

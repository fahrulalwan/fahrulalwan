import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyContent from '@/components/case-study/case-study-content';
import CaseStudyHeader from '@/components/case-study/case-study-header';
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
      <CaseStudyContent caseStudy={caseStudy} />

      {/* Inline closing CTA */}
      <ScrollReveal delay="0.1s">
        <section className="py-12 sm:py-16 border-t border-border/50">
          <p className="text-sm leading-relaxed text-muted-foreground/70 max-w-[440px] mb-5">
            If this is the kind of thinking you want on your team, let&apos;s
            talk.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:fahrulalwan@gmail.com"
              className="link-underline text-sm font-medium transition-colors"
            >
              fahrulalwan@gmail.com
            </a>
            <a
              href="https://github.com/fahrulalwan"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/fahrulalwan"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
};

export default CaseStudyPage;

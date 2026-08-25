import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyBlocks from '@/components/case-study/case-study-blocks';
import CaseStudyContent from '@/components/case-study/case-study-content';
import CaseStudyHeader from '@/components/case-study/case-study-header';
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

  /**
   * `summary` is written for this job — one sentence, no markup, under the
   * length a meta description gets truncated at. `context` is a body field and
   * Task 7 deletes it; this fallback exists only until then.
   *
   * lighthouserc.json asserts categories:seo at error with minScore 1, so a
   * missing meta description fails the gate rather than just the page.
   */
  const description = caseStudy.summary ?? caseStudy.context.slice(0, 160);

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
      {caseStudy.blocks ? (
        <CaseStudyBlocks blocks={caseStudy.blocks} />
      ) : (
        <CaseStudyContent caseStudy={caseStudy} />
      )}

      {/* Inline closing CTA */}
      <section className="py-12 sm:py-16 border-t border-border/50">
        <p className="text-sm leading-relaxed text-muted-foreground max-w-[65ch] mb-5">
          If any of this resonated, say hi.
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
    </>
  );
};

export default CaseStudyPage;

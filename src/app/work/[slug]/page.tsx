import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyBlocks from '@/components/case-study/case-study-blocks';
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
   * length a meta description gets truncated at.
   *
   * lighthouserc.json asserts categories:seo at error with minScore 1, so a
   * missing meta description fails the gate rather than just the page.
   */
  const description = caseStudy.summary;

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
      {/* An <article>, which this page had none of. The JSON-LD directly above
          asserts `@type: Article` and the markup said `section`, so the two
          disagreed about what the page even is — a machine reading the structured
          data was told one thing and a machine reading the document another.
          The closing invitation below stays outside it: it belongs to the site,
          not to this piece of writing. */}
      <article>
        <CaseStudyHeader caseStudy={caseStudy} />
        <CaseStudyBlocks blocks={caseStudy.blocks} />
      </article>

      {/* A named section. Unnamed, a <section> conveys nothing a <div> does not —
          it appears in a screen reader's landmark list as an anonymous region the
          reader has to enter to identify. One label is cheaper than that. */}
      <section
        aria-label="Get in touch"
        className="py-12 sm:py-16 border-t border-border/50"
      >
        <p className="text-sm leading-relaxed text-muted-foreground max-w-[65ch] mb-5">
          If any of this resonated, say hi.
        </p>
        {/* `flex-wrap` is the whole reason this page fits a 320px phone. The email
            address is 163px of text with no break opportunity in it, so on one
            unwrapping row the three links set a min-content width of 306px, and
            with the page's own padding that pushed the document to 346px against
            a 320px viewport — 26px of sideways scroll on every case study.
            Measured at 320, 360, 375, 390, 414 and 430; clean at all of them now. */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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

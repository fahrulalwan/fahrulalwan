import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyHeaderProps {
  caseStudy: CaseStudy;
}

const CaseStudyHeader: FC<CaseStudyHeaderProps> = ({ caseStudy }) => {
  return (
    <header className="pt-4 sm:pt-8 pb-12 sm:pb-16">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 sm:mb-14"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back
      </Link>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
        {caseStudy.tags.map((tag) => (
          <span key={tag} className="text-label font-medium text-muted-foreground uppercase">
            {tag}
          </span>
        ))}
        <span className="text-label font-medium text-muted-foreground uppercase">
          &middot; {caseStudy.year}
        </span>
      </div>

      <h1 className="font-display text-display-l font-medium mb-8 max-w-[22ch]">
        {caseStudy.headline}
      </h1>

      {/* Only the fields that exist, and no row at all when none do. A study
          with no recorded role says nothing rather than inventing one. */}
      {(() => {
        const facts = [
          caseStudy.metadata.role,
          caseStudy.metadata.timeline,
          caseStudy.metadata.teamSize,
        ].filter((fact): fact is string => Boolean(fact));

        if (facts.length === 0) {
          return null;
        }

        return (
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-10 sm:mb-14">
            {facts.map((fact, index) => (
              <span key={fact} className="flex gap-x-6">
                {index > 0 && <span aria-hidden="true">&middot;</span>}
                {fact}
              </span>
            ))}
          </div>
        );
      })()}

    </header>
  );
};

export default CaseStudyHeader;

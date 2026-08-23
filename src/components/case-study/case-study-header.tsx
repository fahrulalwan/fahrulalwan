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

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-10 sm:mb-14">
        <span>{caseStudy.metadata.role}</span>
        <span>&middot;</span>
        <span>{caseStudy.metadata.timeline}</span>
        <span>&middot;</span>
        <span>{caseStudy.metadata.teamSize}</span>
      </div>

    </header>
  );
};

export default CaseStudyHeader;

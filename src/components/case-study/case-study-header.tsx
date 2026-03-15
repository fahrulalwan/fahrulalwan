import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
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
        <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
        Back
      </Link>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
        {caseStudy.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono text-muted-foreground">
            {tag}
          </span>
        ))}
        <span className="text-xs font-mono text-muted-foreground">
          &middot; {caseStudy.year}
        </span>
      </div>

      <h1 className="font-display text-[clamp(28px,4vw,44px)] font-normal leading-[1.1] tracking-tight mb-8 max-w-[720px]">
        {caseStudy.headline}
      </h1>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-10 sm:mb-14">
        <span>{caseStudy.metadata.role}</span>
        <span>&middot;</span>
        <span>{caseStudy.metadata.timeline}</span>
        <span>&middot;</span>
        <span>{caseStudy.metadata.teamSize}</span>
      </div>

      {caseStudy.thumbnail && (
        <div className="full-bleed">
          <Image
            src={caseStudy.thumbnail}
            alt={`Team photo for ${caseStudy.slug}`}
            width={1200}
            height={675}
            className="w-full h-auto max-h-[480px] object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
};

export default CaseStudyHeader;

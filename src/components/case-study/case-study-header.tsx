import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyHeaderProps {
  caseStudy: CaseStudy;
}

const CaseStudyHeader: FC<CaseStudyHeaderProps> = ({ caseStudy }) => {
  return (
    <header>
      <Link
        href="/#work"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-flex items-center gap-1"
      >
        <ArrowLeft className="size-4" />
        Back to work
      </Link>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        {caseStudy.headline}
      </h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {caseStudy.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>{caseStudy.metadata.role}</span>
        <span>{caseStudy.metadata.timeline}</span>
        <span>{caseStudy.metadata.teamSize}</span>
        <span>{caseStudy.year}</span>
      </div>
    </header>
  );
};

export default CaseStudyHeader;

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
          <span
            key={tag}
            className="text-label font-medium text-muted-foreground uppercase"
          >
            {tag}
          </span>
        ))}
        <time
          dateTime={caseStudy.year}
          className="text-label font-medium text-muted-foreground uppercase"
        >
          &middot; {caseStudy.year}
        </time>
      </div>

      <h1 className="font-display text-display-l font-medium mb-5 max-w-title">
        {caseStudy.headline}
      </h1>

      {/* The dek, and it is load-bearing rather than decoration.

          `summary` was previously rendered NOWHERE — it existed only as the meta
          description in `page.tsx`. That was survivable while `headline` carried
          a whole sentence, because the sentence was on the page either way. On
          2026-08-27 the headlines were cut to real titles (21/26/33 words down to
          5/4/4), and without this element that edit would have deleted the
          explanation from the visible page instead of moving it.

          So the two fields now do two jobs, which is what the type always
          allowed: `headline` names the study, `summary` explains it. Before that
          split they were near-duplicates — on `caready.ts` the two strings were
          byte-identical, and on `fartix.ts` they differed by one word.

          ⛔ Do not remove this without first giving `headline` its sentence back.
          A reader arriving from search would otherwise get a four-word title and
          go straight into the blocks with no idea what the project was. */}
      <p className="text-body-l text-muted-foreground leading-relaxed mb-8 max-w-prose">
        {caseStudy.summary}
      </p>

      {/* Only the fields that exist, and no row at all when none do. A study
          with no recorded role says nothing rather than inventing one. */}
      {(() => {
        const facts = [
          caseStudy.metadata.role,
          caseStudy.metadata.timeline,
          caseStudy.metadata.teamSize,
          // Only when the work cannot be opened. A study whose work a reader
          // can open already says so through its own checkable blocks, so
          // repeating the note there would be noise. Without this, the note
          // lives only on the landing card and someone arriving from search
          // is told nothing about what they can and cannot check.
          caseStudy.availability.href ? undefined : caseStudy.availability.note,
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

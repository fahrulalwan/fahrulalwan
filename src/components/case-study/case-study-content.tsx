import type { FC } from 'react';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyContent: FC<CaseStudyContentProps> = ({ caseStudy }) => {
  return (
    <div>
      {/* Context */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
            <h2 className="text-label font-medium text-muted-foreground uppercase">
              Context
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
              {caseStudy.context}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Challenge */}
      <ScrollReveal delay="0.05s">
        <section className="py-12 sm:py-16 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
            <h2 className="text-label font-medium text-muted-foreground uppercase">
              Challenge
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
              {caseStudy.challenge}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Key Decisions */}
      <ScrollReveal delay="0.1s">
        <section className="py-12 sm:py-16 border-t border-border/50">
          <h2 className="text-label font-medium text-muted-foreground uppercase mb-10 sm:mb-12">
            Key decisions
          </h2>

          {/* Hairline-separated stack. This was a grid-cols-[1fr_2fr] with a padded
              01/02 index in the left cell, which is the exact "hanging header" tell
              spec §8 bans. Unlike featured-work there is no real data to swap into
              that cell, so the grid goes and the titles carry the sequence. */}
          <div className="space-y-8">
            {caseStudy.decisions.map((decision) => (
              <div
                key={decision.title}
                className="border-t border-border/50 pt-8 first:border-t-0 first:pt-0"
              >
                <h3 className="font-display text-display-m font-medium mb-2">
                  {decision.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
                  {decision.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Results */}
      <ScrollReveal delay="0.1s">
        <section className="full-bleed bg-foreground text-background py-14 sm:py-16">
          <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
            <h2 className="text-label font-medium text-background/70 uppercase mb-10 sm:mb-12">
              Results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {caseStudy.results.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-display-l font-medium text-accent-warm mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-background/80 mb-1">
                    {metric.label}
                  </p>
                  {metric.context && (
                    <p className="text-xs text-background/70">
                      {metric.context}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {caseStudy.results.qualitative &&
              caseStudy.results.qualitative.length > 0 && (
                <div className="space-y-3 border-t border-background/10 pt-8">
                  {caseStudy.results.qualitative.map((item) => (
                    <p
                      key={item}
                      className="text-background/70 leading-relaxed max-w-[65ch]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
          </div>
        </section>
      </ScrollReveal>

      {/* Reflections */}
      <ScrollReveal delay="0.1s">
        <section className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
            <h2 className="text-label font-medium text-muted-foreground uppercase">
              Reflections
            </h2>
            <div className="space-y-6">
              {caseStudy.reflections.map((reflection) => (
                <p
                  key={reflection}
                  className="text-muted-foreground leading-relaxed max-w-[65ch]"
                >
                  {reflection}
                </p>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default CaseStudyContent;

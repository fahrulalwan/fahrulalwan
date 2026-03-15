import type { FC } from 'react';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyContent: FC<CaseStudyContentProps> = ({ caseStudy }) => {
  return (
    <div>
      {/* Context & Challenge */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Context
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              {caseStudy.context}
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="0.05s">
        <section className="py-12 sm:py-16 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Challenge
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              {caseStudy.challenge}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Key Decisions */}
      <ScrollReveal delay="0.1s">
        <section className="py-12 sm:py-16 border-t border-border/50">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-10 sm:mb-12">
            Key decisions
          </p>

          <div className="space-y-10">
            {caseStudy.decisions.map((decision, index) => (
              <div
                key={decision.title}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12"
              >
                <p className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <div>
                  <p className="font-display text-lg sm:text-xl tracking-tight mb-2">
                    {decision.title}
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    {decision.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Results */}
      <ScrollReveal delay="0.1s">
        <section className="full-bleed bg-foreground text-background py-14 sm:py-16">
          <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
            <p className="font-mono text-xs tracking-widest text-background/50 uppercase mb-10 sm:mb-12">
              Results
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {caseStudy.results.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-[clamp(32px,4vw,48px)] tracking-tight leading-none text-accent-warm mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-background/80 mb-1">
                    {metric.label}
                  </p>
                  {metric.context && (
                    <p className="text-xs text-background/50">
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
                      className="text-background/60 leading-relaxed max-w-lg"
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
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Reflections
            </p>
            <div className="space-y-6">
              {caseStudy.reflections.map((reflection) => (
                <p
                  key={reflection}
                  className="text-muted-foreground leading-relaxed max-w-lg"
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

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { getAllCaseStudies } from '@/content/case-studies';

const FeaturedWork: FC = () => {
  const caseStudies = getAllCaseStudies();

  return (
    <section
      id="work"
      className="py-16 sm:py-20 scroll-mt-20 border-t border-border/50"
    >
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-12 sm:mb-14">
        Selected Work
      </p>

      <div>
        {caseStudies.map((study, index) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group block relative py-10 -mx-4 px-4 border-t border-border/50 rounded-lg transition-colors duration-300 hover:bg-muted/30"
          >
            <span
              className="absolute top-4 right-4 font-display text-[100px] leading-none text-foreground/[0.04] select-none pointer-events-none transition-colors duration-300 group-hover:text-foreground/[0.06]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="relative z-[1]">
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                {study.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-xs font-mono text-muted-foreground">
                  &middot; {study.year}
                </span>
              </div>

              <h3 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.15] mb-4 max-w-2xl transition-colors duration-300 group-hover:text-accent-warm">
                {study.headline}
              </h3>

              {study.results.metrics[0] && (
                <div className="flex items-baseline gap-2.5 mb-3">
                  <span className="text-accent-warm font-semibold text-lg font-display">
                    {study.results.metrics[0].value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {study.results.metrics[0].label}
                  </span>
                </div>
              )}

              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Read case study <ArrowRight className="size-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;

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
      <h2 className="text-label font-medium text-muted-foreground uppercase mb-12 sm:mb-14">
        Selected Work
      </h2>

      <div>
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group block relative py-10 -mx-4 px-4 border-t border-border/50 rounded-lg transition-colors duration-300 hover:bg-muted/30"
          >
            {/* Ghost landmark. Was a padded 01/02 index, which spec §8 bans as the
                "hanging header" tell. The year is real data. It stays duplicated in
                the tag row below because this copy is aria-hidden at 4% opacity —
                texture, not information. */}
            <span
              className="absolute top-4 right-4 font-display text-ghost text-foreground/[0.04] select-none pointer-events-none transition-colors duration-300 group-hover:text-foreground/[0.06]"
              aria-hidden="true"
            >
              {study.year}
            </span>

            <div className="relative z-[var(--z-raised)]">
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                {study.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-label font-medium text-muted-foreground uppercase"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-label font-medium text-muted-foreground uppercase">
                  &middot; {study.year}
                </span>
              </div>

              <h3 className="font-display text-display-l font-medium mb-4 max-w-[22ch] transition-colors duration-300 group-hover:text-signal">
                {study.headline}
              </h3>

              {study.results.metrics[0] && (
                <div className="flex items-baseline gap-2.5 mb-3">
                  <span className="font-display text-display-m font-medium text-signal">
                    {study.results.metrics[0].value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {study.results.metrics[0].label}
                  </span>
                </div>
              )}

              {/* Focus parity per spec §9: there is no hover on a phone and a
                  keyboard user never triggers one, so focus reveals this too. */}
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-[opacity,transform] duration-300">
                Read case study <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;

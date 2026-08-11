import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
        What I&apos;ve built
      </h2>

      <div>
        {caseStudies.map((study) => (
          /* The card is an <article>, not a <Link>. The headline below carries
             the only case-study link and its ::after stretches over the whole
             card, so the whole card stays clickable. Wrapping the card in an
             <a> instead would nest the availability <a> inside it, and the HTML
             parser un-nests those before any JS runs — splitting the card link
             in two and dropping the read affordance out of it entirely. That
             breakage is the page's real state whenever JS is off. */
          <article
            key={study.slug}
            className="group relative isolate py-10 -mx-4 px-4 border-t border-border/50 rounded-lg transition-colors duration-300 hover:bg-muted/30 focus-within:bg-muted/30"
          >
            {/* Ghost landmark. Was a padded 01/02 index, which spec §8 bans as the
                "hanging header" tell. The year is real data. It stays duplicated in
                the tag row below because this copy is aria-hidden at 4% opacity —
                texture, not information.

                -z-10 inside `isolate` paints it above the article's own
                background and below the text, which is what `relative z-raised`
                on the content wrapper used to buy. That wrapper must now be
                unpositioned so the stretched ::after resolves against <article>. */}
            <span
              className="absolute top-4 right-4 -z-10 font-display text-ghost text-foreground/[0.04] select-none pointer-events-none transition-colors duration-300 group-hover:text-foreground/[0.06]"
              aria-hidden="true"
            >
              {study.year}
            </span>

            <div>
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
                <Link
                  href={`/work/${study.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {study.headline}
                </Link>
              </h3>

              {/* Replaces the metric tile. Spec §2: each card carries its own
                  status, because the heading no longer promises checkability and
                  the honesty has to move into the rows. The metrics still render
                  in full on /work/[slug], next to their own prose.

                  relative z-10 lifts this above the stretched overlay so it takes
                  its own click. */}
              {study.availability.href ? (
                /* Spec §2: the live card carries the live URL in this slot.
                   Naming the domain is what makes it distinguishable from the
                   two cards that cannot be opened — those render in the same
                   place, at the same size, in the same colour, so without the
                   domain a reader cannot tell which one is clickable. */
                <p className="text-sm text-muted-foreground">
                  {study.availability.note} &middot;{' '}
                  <a
                    href={study.availability.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 link-underline font-medium text-foreground inline-flex items-baseline gap-1"
                  >
                    {study.availability.href.replace(/^https?:\/\//, '')}
                    <ArrowUpRight className="size-3.5 self-center" aria-hidden="true" />
                  </a>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {study.availability.note}
                </p>
              )}

              {/* Focus parity per spec §9: there is no hover on a phone and a
                  keyboard user never triggers one, so focus reveals this too.
                  focus-within rather than focus-visible, because focus now lands
                  on a descendant link rather than on the card itself. */}
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 no-hover:opacity-100 no-hover:translate-x-0 transition-[opacity,transform] duration-300">
                  Read case study <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;

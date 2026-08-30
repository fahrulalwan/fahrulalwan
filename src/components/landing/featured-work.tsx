import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { getAllCaseStudies } from '@/content/case-studies';

const FeaturedWork: FC = () => {
  const caseStudies = getAllCaseStudies();

  return (
    <section id="work" className="pt-20 sm:pt-24 pb-4 scroll-mt-20">
      <div className="mb-12 sm:mb-14">
        <span
          className="block w-6 h-0.5 bg-signal/60 mb-5"
          aria-hidden="true"
        />
        <h2 className="text-label font-medium text-muted-foreground uppercase mb-0">
          What I&apos;ve built
        </h2>
      </div>

      <div>
        {caseStudies.map((study) => (
          /* ⛔ An <article>, never a <Link>. The headline's stretched ::after
             makes the card clickable; wrapping it in an <a> would nest the
             availability <a>, which the HTML parser un-nests before any JS
             runs — the page's real state whenever JS is off. */
          <article
            key={study.slug}
            className="group relative isolate py-9 first:pt-0 -mx-4 px-4 rounded-lg transition-colors duration-300 hover:bg-muted/30 focus-within:bg-muted/30"
          >
            {/* Ghost landmark — texture, not information, hence aria-hidden and
                duplicated in the tag row. `-z-10` inside `isolate` keeps the
                content wrapper unpositioned so the stretched ::after resolves
                against <article>.

                ⛔ Must stay CSS generated content, never a text node. At 4%
                opacity it measures 1.07:1, and axe cannot tell decoration from
                content when it is real text — as a text node it fails
                color-contrast and takes the whole accessibility score down. */}
            <span
              className="absolute top-4 right-4 -z-10 font-display text-ghost text-foreground/[0.04] select-none pointer-events-none transition-colors duration-300 group-hover:text-foreground/[0.06] before:content-[attr(data-year)]"
              data-year={study.year}
              aria-hidden="true"
            />

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
                {/* <time>, not <span>. The year is a date, and this is the one
                    element that says so to a machine — a crawler, an assistant
                    reading the page, a reader-mode extractor. It costs one tag
                    and a dateTime attribute. */}
                <time
                  dateTime={study.year}
                  className="text-label font-medium text-muted-foreground uppercase"
                >
                  &middot; {study.year}
                </time>
              </div>

              <h3 className="font-display text-display-l font-medium mb-3 max-w-title transition-colors duration-300 group-hover:text-signal">
                <Link
                  href={`/work/${study.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {study.headline}
                </Link>
              </h3>

              {/* Above the availability line on purpose: that line is a status,
                  and a status means nothing before you know what it describes.
                  No `relative z-10` here, so it stays under the headline's
                  stretched ::after and the whole card remains one click target
                  — at the cost of not being selectable. */}
              <p className="text-muted-foreground leading-relaxed max-w-prose mb-4">
                {study.summary}
              </p>

              {/* Each card carries its own status — the heading does not promise
                  checkability, so the honesty lives here. `relative z-10` lifts
                  the link above the stretched overlay so it takes its own click. */}
              {study.availability.href ? (
                /* Naming the domain is what distinguishes this from the cards
                   that cannot be opened — they render identically otherwise. */
                <p className="text-sm text-muted-foreground">
                  {study.availability.note} &middot;{' '}
                  <a
                    href={study.availability.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 link-underline font-medium text-foreground inline-flex items-baseline gap-1"
                  >
                    {study.availability.href.replace(/^https?:\/\//, '')}
                    <ArrowUpRight
                      className="size-3.5 self-center"
                      aria-hidden="true"
                    />
                  </a>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {study.availability.note}
                </p>
              )}

              {/* ⛔ Visible at rest, not on hover — it is the only thing on the
                  card saying it can be opened. ⛔ And do not dim it with
                  opacity: at 60% it measures 3.9:1 dark and 3.0:1 light, under
                  the 4.5 the CI gate asserts as an error. */}
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground -translate-x-1 group-hover:translate-x-0 group-focus-within:translate-x-0 transition-transform duration-300">
                Read case study <ArrowRight className="size-4" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;

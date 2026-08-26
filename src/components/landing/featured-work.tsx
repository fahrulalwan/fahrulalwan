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
          /* The card is an <article>, not a <Link>. The headline below carries
             the only case-study link and its ::after stretches over the whole
             card, so the whole card stays clickable. Wrapping the card in an
             <a> instead would nest the availability <a> inside it, and the HTML
             parser un-nests those before any JS runs — splitting the card link
             in two and dropping the read affordance out of it entirely. That
             breakage is the page's real state whenever JS is off. */
          <article
            key={study.slug}
            className="group relative isolate py-9 first:pt-0 -mx-4 px-4 rounded-lg transition-colors duration-300 hover:bg-muted/30 focus-within:bg-muted/30"
          >
            {/* Ghost landmark. Was a padded 01/02 index, which spec §8 bans as the
                "hanging header" tell. The year is real data. It stays duplicated in
                the tag row below because this copy is aria-hidden at 4% opacity —
                texture, not information.

                -z-10 inside `isolate` paints it above the article's own
                background and below the text, which is what `relative z-raised`
                on the content wrapper used to buy. That wrapper must now be
                unpositioned so the stretched ::after resolves against <article>. */}
            {/* ⛔ Rendered as CSS generated content, not a text node, and that
                is an accessibility fix rather than a style preference.

                At 4% opacity this measures 1.07:1, which IS the design intent —
                spec §8 calls it texture, not information, and it is aria-hidden
                so no screen reader meets it. But axe cannot tell decoration
                from content when the decoration is a real text node, so it
                failed color-contrast and took the whole accessibility score
                with it. axe does not audit generated content.

                This had always failed. It only surfaced when the scroll-fade
                was removed: the element used to sit at opacity 0 while
                Lighthouse ran, and invisible elements are skipped. */}
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

              <h3 className="font-display text-display-l font-medium mb-4 max-w-title transition-colors duration-300 group-hover:text-signal">
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

              {/* This is the only thing on the card that says it can be opened,
                  so it is visible at rest. It used to start at opacity 0 and
                  appear on hover, which meant a reader who scrolled without
                  moving the mouse saw three descriptions and one external link,
                  and never learned three case studies existed. The headline is
                  a link but carries no underline, and `fartix.id` below sets a
                  link convention — brighter, with an arrow — that the headline
                  does not follow. So nothing at rest said "openable".

                  Phones were already correct, via a touch-only override, which
                  is what makes this a pointer-device defect rather than a
                  design choice: the two surfaces disagreed about whether the
                  affordance existed at all. That override is gone now, because
                  showing the line at rest makes it the same on both.

                  ⛔ Opacity is not the dimmer to reach for here. At 60% this
                  text measures about 3.9:1 dark and 3.0:1 light, under the 4.5
                  the CI gate asserts as an error. Full `text-muted-foreground`
                  keeps 7.03:1 and 5.66:1.

                  The slide stays as the hover reward, and focus-within triggers
                  it too, because focus lands on a descendant link rather than
                  on the card itself. */}
              {/* The wrapping <div className="mt-3"> is gone. It held one child
                  and one margin class, and an inline-flex element takes a top
                  margin perfectly well on its own — so the div was a render-tree
                  node that bought nothing. Three of these existed, one per card. */}
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

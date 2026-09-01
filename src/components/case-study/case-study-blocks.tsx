import Image from 'next/image';
import type { FC } from 'react';
import { assertNever, groupBlocks } from '@/content/case-studies/blocks';
import type { Block, MetricBlock } from '@/content/case-studies/types';

interface CaseStudyBlocksProps {
  blocks: Block[];
}

const MetricBand: FC<{ metrics: MetricBlock[] }> = ({ metrics }) => (
  <section className="full-bleed bg-foreground text-background py-14 sm:py-16 my-4">
    <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {metrics.map((metric) => (
          <div key={metric.label}>
            {/* signal-inverted, not signal: this sits on bg-foreground, where
                the on-surface value fails contrast in both themes. That is
                what the inverted token exists for. */}
            <p className="font-display text-display-l font-medium text-signal-inverted mb-1">
              {metric.href ? (
                <a
                  href={metric.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {metric.value}
                </a>
              ) : (
                metric.value
              )}
            </p>
            <p className="text-sm text-background/80 mb-1">{metric.label}</p>
            {metric.context && (
              <p className="text-xs text-background/70">{metric.context}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BlockBody: FC<{ block: Exclude<Block, MetricBlock> }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      /* h2 always. The page h1 is the headline, and the CI gate asserts
         heading-order at error level, so a level field here would let each
         study invent a sequence that only goes red in CI. */
      return (
        <h2 className="font-display text-display-m font-medium mt-14 sm:mt-16 mb-3">
          {block.text}
        </h2>
      );

    case 'prose':
      return (
        <p className="text-muted-foreground leading-relaxed max-w-prose mb-6">
          {block.text}
          {block.href && block.hrefLabel && (
            <>
              {' '}
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-foreground"
              >
                {block.hrefLabel}
              </a>
            </>
          )}
        </p>
      );

    case 'review':
      /* The file is the subject, never a person. */
      return (
        <figure className="border-l-2 border-signal/40 pl-5 sm:pl-6 my-8 max-w-prose">
          <p className="text-label font-medium text-muted-foreground uppercase mb-3">
            On {block.onWhat} &middot;{' '}
            <span className="font-mono normal-case">{block.where}</span>
          </p>
          <blockquote className="font-mono text-sm leading-relaxed whitespace-pre-line text-foreground">
            {block.text}
          </blockquote>
          <figcaption className="mt-3">
            <a
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label font-medium uppercase link-underline text-foreground"
            >
              Read the thread
            </a>
          </figcaption>
        </figure>
      );

    case 'handoff':
      return (
        <figure className="border-t border-border/50 pt-6 my-8 max-w-prose">
          <p className="font-medium mb-2">{block.title}</p>
          <blockquote className="text-muted-foreground leading-relaxed whitespace-pre-line mb-3">
            {block.scope}
          </blockquote>
          <figcaption>
            <a
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label font-medium uppercase link-underline text-foreground"
            >
              Read the issue
            </a>
          </figcaption>
        </figure>
      );

    case 'quote':
      return (
        <figure className="my-8 max-w-prose">
          <blockquote className="font-mono text-sm leading-relaxed whitespace-pre-line text-foreground mb-2">
            {block.text}
          </blockquote>
          <figcaption className="text-sm text-muted-foreground">
            {block.href ? (
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-foreground"
              >
                {block.attribution}
              </a>
            ) : (
              block.attribution
            )}
          </figcaption>
        </figure>
      );

    case 'trail':
      return (
        <div className="my-8 max-w-prose">
          <ol className="space-y-5">
            {block.steps.map((step) => (
              <li
                key={`${step.when}-${step.what}`}
                className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6"
              >
                <span className="text-label font-medium text-muted-foreground uppercase">
                  {step.when}
                </span>
                {/* A step with a source reads brighter than one without, so a
                    reader can see which moments they can go and check. They
                    were identical before, and two of five were links. */}
                <span className="text-muted-foreground leading-relaxed">
                  {step.href ? (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-medium text-foreground"
                    >
                      {step.what}
                    </a>
                  ) : (
                    step.what
                  )}
                </span>
              </li>
            ))}
          </ol>
          {block.note && (
            <p className="text-sm text-muted-foreground mt-5">{block.note}</p>
          )}
        </div>
      );

    case 'code':
      return (
        <figure className="my-8">
          <pre className="overflow-x-auto rounded-lg bg-muted/50 p-5 text-sm">
            <code>{block.source}</code>
          </pre>
          <figcaption className="text-sm text-muted-foreground mt-3">
            {block.caption}{' '}
            <a
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              Source
            </a>
          </figcaption>
        </figure>
      );

    case 'image':
      /* next/image, not a bare img. ESLint's @next/next/no-img-element fires a
         WARNING on the raw element, and every task in this plan asserts a
         silent lint — a biome-ignore does not silence ESLint. */
      return (
        <figure className="my-8">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            className="w-full h-auto rounded-lg"
          />
          <figcaption className="text-sm text-muted-foreground mt-3">
            {block.caption}
          </figcaption>
        </figure>
      );

    case 'diagram':
      /* A diagram runs to the full article measure, wider than the prose it
         sits between. Review, quote, trail and handoff all hold max-w-prose
         because they are text and a reading measure is what text wants. A
         drawing is a picture, and pictures break wider than the column in
         editorial layouts. 992px at desktop: --breakpoint-lg is 64rem, less
         the sm:px-4 padding <main> carries.

         ⛔ The drawings are AUTHORED at 992, not stretched to it. An SVG has one
         coordinate space, so rendered label size = viewBox font size × (rendered
         width ÷ viewBox width). Stretching a 640-wide drawing to 992 magnifies
         every label to 1.55× and the hairlines with them. Widening the viewBox
         instead, and sizing the type inside it to land at 16px and 14px, is what
         turns the extra room into spacing rather than zoom.

         overflow-x-auto because these are wide-format drawings: below the
         min-width the SVG would scale its own labels down past legibility, so
         it holds that floor and scrolls inside the figure. The page itself must
         never scroll sideways.

         ⛔ contain-inline-size is what keeps that promise, and removing it
         breaks the PAGE rather than this figure. The SVG's min-width climbs
         figure → div → article → main, and <main> is a flex item of a flex
         column <body>, so it will not shrink below its content's min-content
         width. Measured in a real 390px window: main went to 584px and the
         document overflowed. overflow-x-auto alone does not stop the climb,
         and neither does min-w-0 or width:100% — all three were measured and
         all three left main at 584. Only inline-size containment, which makes
         the figure's width independent of its contents, brought it back to
         390 with the SVG scrolling inside.

         ⛔ The scroll container is the same element that carries the accessible
         name, and it is focusable. A region that scrolls with no focusable
         descendant is axe's scrollable-region-focusable, which Lighthouse
         scores under accessibility — and lighthouserc.json asserts that
         category at error with minScore 1, so leaving it off can fail CI.
         Ahead of that it is a real defect: below the min-width the drawing
         genuinely scrolls, and a keyboard-only visitor could not reach it. */
      return (
        <figure className="my-8 max-w-(--breakpoint-lg)">
          <div
            role="img"
            aria-label={block.alt}
            // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be keyboard-reachable even though role="img" is non-interactive — see the comment above
            tabIndex={0}
            className="contain-inline-size overflow-x-auto"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: inline SVG authored in this repo, never user input
            dangerouslySetInnerHTML={{ __html: block.svg }}
          />
          <figcaption className="text-sm text-muted-foreground mt-3">
            {block.caption}
          </figcaption>
        </figure>
      );

    default:
      /* ⛔ Do not delete this. It is the only thing that fails the build when
         a block type has no case — see the comment on assertNever. */
      return assertNever(block);
  }
};

const CaseStudyBlocks: FC<CaseStudyBlocksProps> = ({ blocks }) => {
  const groups = groupBlocks(blocks);

  return (
    <div className="border-t border-border/50 pt-2">
      {groups.map((group, index) =>
        group.kind === 'metrics' ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: blocks are compile-time constants in a study file. The list never reorders, nothing is inserted at runtime, and none of these components hold state, so there is no identity for a key to preserve.
          <MetricBand key={`metrics-${index}`} metrics={group.metrics} />
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: same as above — a static list read from a .ts file, rendered once.
          <BlockBody key={`block-${index}`} block={group.block} />
        ),
      )}
    </div>
  );
};

export default CaseStudyBlocks;

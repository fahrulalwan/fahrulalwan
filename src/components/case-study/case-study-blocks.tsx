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
      return (
        <figure className="my-8">
          <div
            role="img"
            aria-label={block.alt}
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

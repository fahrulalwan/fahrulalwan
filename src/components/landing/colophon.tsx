import type { FC } from 'react';

/**
 * ⛔ Do not grow this back into a section. The idea has been tried four times —
 * three showing Lighthouse scores, one showing a failing CI gate — and rejected
 * every time. A failure the author picks is a curated failure, not a standard.
 * If something here is worth showing, it is worth a case study.
 */
const Colophon: FC = () => {
  return (
    <p className="text-sm text-muted-foreground pt-16 sm:pt-20">
      {/* "into the code itself", not "in the comments" — a non-engineer reads
          "comments" as a comment section. */}
      The code behind this site is public, and the reasoning is written into the
      code itself.{' '}
      <a
        href="https://github.com/fahrulalwan/fahrulalwan"
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline font-medium text-foreground"
      >
        Read the source
      </a>
    </p>
  );
};

export default Colophon;

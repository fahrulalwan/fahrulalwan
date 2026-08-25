import type { FC } from 'react';

/**
 * One line, and the last thing on the landing page.
 *
 * ⛔ This replaced a full section that showed a CI gate failing on 11 August:
 * a paragraph, a monospace assertion, and a link to the failed run. It was cut
 * rather than moved, and the reason is worth keeping because the same idea has
 * now been tried four times.
 *
 * Three earlier attempts showed Lighthouse scores and were rejected each time
 * as a flex about the artifact rather than evidence about the person. The
 * fourth inverted it — show a failure instead of a score — which read as a
 * different idea and was not. **A failure the author selects is a curated
 * failure, not a standard**, and the one on display had cost nothing: a
 * contrast check on a page deleted the next day. A reader who notices that
 * reads the whole block as staged, on a site whose argument is that nothing
 * here needs to be taken on trust.
 *
 * What survived is the link that was buried under it. The repository holds the
 * block union, the gate config, and the reasoning behind every decision in its
 * comments — a far larger body of checkable work than any single failed run,
 * and present-tense in a way a dated incident is not.
 *
 * ⛔ Do not grow this back into a section. If something here is worth showing,
 * it is worth a case study.
 */
const Colophon: FC = () => {
  return (
    <p className="text-sm text-muted-foreground pt-16 sm:pt-20">
      {/* "written into the code itself", not "in the comments". A reader with
          no engineering background reads "comments" as a comment section, so
          the line pointed at something that does not exist on this site. */}
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

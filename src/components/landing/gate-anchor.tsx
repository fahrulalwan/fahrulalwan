import type { FC } from 'react';
import type { GateAnchorContent } from '@/content/case-studies/types';

/**
 * The one moment on this page that is not a claim about the past.
 *
 * ⛔ What it claims, precisely: a rule was set about what may block a build,
 * and the rule caught something real. It does NOT claim the failure was
 * spotted by a person. The mechanism is the subject of every sentence, which
 * is the discipline every case study now follows.
 *
 * ⚠️ This ages. Re-point it at a newer failure when one lands, or remove it.
 * The page that failed was deleted the day after, so a reader who follows the
 * run to its detail finds a URL that now 404s. That was chosen over waiting
 * for a cleaner failure on a page that still exists.
 */
/**
 * ⛔ The values live here rather than inline, and the type is imported rather
 * than implied. Hardcoding all four into the markup would leave
 * `GateAnchorContent` with no consumer anywhere in the repository — a type
 * nothing reads is the reason another type in that file was deleted outright.
 * When this ages, re-point it here.
 */
const content: GateAnchorContent = {
  check: 'color-contrast',
  value: '0',
  runHref:
    'https://github.com/fahrulalwan/fahrulalwan/actions/runs/31460343706',
  sourceHref: 'https://github.com/fahrulalwan/fahrulalwan',
};

const GateAnchor: FC = () => {
  return (
    <section className="pt-20 sm:pt-24 pb-16 sm:pb-20">
      <div className="mb-10 sm:mb-12">
        <span
          className="block w-6 h-0.5 bg-signal/60 mb-5"
          aria-hidden="true"
        />
        <h2 className="text-label font-medium text-muted-foreground uppercase mb-0">
          The morning it caught me
        </h2>
      </div>

      <div className="max-w-[65ch] space-y-5">
        <p className="text-muted-foreground leading-relaxed">
          A contrast check blocked a build on 11 August. The page it failed on
          is gone now; the run is still there.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          That is why the check blocks instead of warns.
        </p>

        {/* Quiet real data in mono. Never a green badge, never a checkmark,
            never a fake terminal — a passing gate proves nothing a reader will
            believe, and dressing this up as one would undo the point.

            ⛔ The link goes to the RUN THAT FAILED, not to the actions list,
            whose top entries are all green. Under this site's own rule a claim
            and its evidence sit together, and the actions list is not evidence
            of a failure. */}
        <p className="font-mono text-sm text-foreground">
          {/* One template literal, not four interpolations between static text.
              Server-rendered adjacent text nodes are separated by hydration
              markers, which would cut the quoted finding in half in the HTML. */}
          {`${content.check} · minScore · expected >= 1, found ${content.value} · `}
          <a
            href={content.runHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            the run
          </a>
        </p>

        {/* Moved here when the short list was cut. This is the site's only link
            to its own source, and it belongs beside the anchor: both are the
            page proving something about itself rather than describing it. */}
        <p className="text-sm text-muted-foreground pt-2">
          The code behind this page, comments included.{' '}
          <a
            href={content.sourceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-medium text-foreground"
          >
            Source
          </a>
        </p>
      </div>
    </section>
  );
};

export default GateAnchor;

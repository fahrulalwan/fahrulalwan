import { careadyCaseStudy } from './caready';
import { fartixCaseStudy } from './fartix';
import type { Block, CaseStudy } from './types';

export type { CaseStudy, CaseStudyDecision, CaseStudyMetric } from './types';

// Fartix leads because it is the only one a stranger can open: his own venture,
// his own build, still live. caready follows, an early-career story rather than
// a link, since the site it ran on has been rebuilt by other people since.
//
// ⛔ A study ships only if he stands behind the decisions it narrates in the
// first person. Work he did not drive can be described or credited, never
// written as his own reasoning. That rule outranks filling a gap, and there is
// one: no study here shows employed senior work. The fix is day-job work he
// actually drove that survives the NDA rule, not a broader reading of this one.
const caseStudies: CaseStudy[] = [fartixCaseStudy, careadyCaseStudy];

export const getAllCaseStudies = (): CaseStudy[] => caseStudies;

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getAllCaseSlugs = (): string[] => caseStudies.map((cs) => cs.slug);

/**
 * A study that says its work is openable must carry something to open.
 *
 * This is the lintable half of "a claim and its evidence sit together".
 * Whether a paragraph is a claim is a judgement; whether a study offering an
 * `availability.href` also gives the reader a checkable block is not.
 *
 * caready is the case this deliberately permits: no href, and an availability
 * note that says in plain words that nobody can open it. The case-study header
 * is what puts that note in front of a reader who lands on the page itself.
 *
 * Runs at module load, so a violation fails `next build` rather than shipping.
 */
const isCheckable = (block: Block): boolean =>
  block.type === 'code' ||
  block.type === 'review' ||
  block.type === 'handoff' ||
  ((block.type === 'quote' ||
    block.type === 'metric' ||
    block.type === 'prose') &&
    Boolean(block.href));

for (const study of caseStudies) {
  if (!study.availability.href) {
    continue;
  }

  const hasCheckableBlock = (study.blocks ?? []).some(isCheckable);

  if (!hasCheckableBlock) {
    throw new Error(
      `Case study "${study.slug}" advertises openable work via availability.href ` +
        'but carries no checkable block. Add a review, handoff, code block, or a ' +
        'prose/metric/quote block with an href — or drop the href and say in ' +
        'availability.note that this one cannot be opened.',
    );
  }
}

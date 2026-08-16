import { careadyCaseStudy } from './caready';
import { fartixCaseStudy } from './fartix';
import type { CaseStudy } from './types';

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

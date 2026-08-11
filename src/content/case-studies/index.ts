import { careadyCaseStudy } from './caready';
import { coverageRatchetCaseStudy } from './coverage-ratchet';
import { fartixCaseStudy } from './fartix';
import type { CaseStudy } from './types';

export type { CaseStudy, CaseStudyDecision, CaseStudyMetric } from './types';

// Fartix leads because it is the only one a stranger can open: his own
// venture, his own build, still live. The coverage work follows, described
// rather than shown because its repo is private. caready last, and it is an
// early-career story rather than a link — the site it ran on has been rebuilt
// by other people since.
//
// This deliberately is NOT newest-first, and it is not seniority-first either.
// The previous order led with the coverage work on the grounds that the
// employed senior work should go first. That reads worse now: it is the piece
// that asks for the most trust, and it was leading the piece that asks for
// none.
const caseStudies: CaseStudy[] = [
  fartixCaseStudy,
  coverageRatchetCaseStudy,
  careadyCaseStudy,
];

export const getAllCaseStudies = (): CaseStudy[] => caseStudies;

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getAllCaseSlugs = (): string[] => caseStudies.map((cs) => cs.slug);

import { careadyCaseStudy } from './caready';
import { coverageRatchetCaseStudy } from './coverage-ratchet';
import { fartixCaseStudy } from './fartix';
import type { CaseStudy } from './types';

export type { CaseStudy, CaseStudyDecision, CaseStudyMetric } from './types';

// Newest first, and the employed senior work leads: the coverage ratchet (day
// job, 2026), then Fartix (founder, 2026), then caready (2018).
const caseStudies: CaseStudy[] = [
  coverageRatchetCaseStudy,
  fartixCaseStudy,
  careadyCaseStudy,
];

export const getAllCaseStudies = (): CaseStudy[] => caseStudies;

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getAllCaseSlugs = (): string[] => caseStudies.map((cs) => cs.slug);

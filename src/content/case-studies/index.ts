import { careadyCaseStudy } from './caready';
import type { CaseStudy } from './types';

export type { CaseStudy, CaseStudyDecision, CaseStudyMetric } from './types';

const caseStudies: CaseStudy[] = [careadyCaseStudy];

export const getAllCaseStudies = (): CaseStudy[] => caseStudies;

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getAllCaseSlugs = (): string[] => caseStudies.map((cs) => cs.slug);

export interface CaseStudyMetric {
  label: string;
  value: string;
  context?: string;
}

export interface CaseStudyDecision {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  headline: string;
  tags: string[];
  year: string;
  metadata: {
    role: string;
    timeline: string;
    teamSize: string;
  };
  context: string;
  challenge: string;
  decisions: CaseStudyDecision[];
  results: {
    metrics: CaseStudyMetric[];
    qualitative?: string[];
  };
  reflections: string[];
  thumbnail?: string;
}

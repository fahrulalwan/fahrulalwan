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

  /**
   * What a reader can actually do with this one, said plainly.
   *
   * `note` renders next to the card. `href` is present only when the work is
   * genuinely openable — its absence is the signal that this is described
   * rather than shown, which the page states out loud rather than hiding.
   *
   * Required on purpose: a new case study cannot be added without saying what
   * a stranger can verify about it.
   */
  availability: {
    note: string;
    href?: string;
  };
}

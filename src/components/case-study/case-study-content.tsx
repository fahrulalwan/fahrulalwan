import type { FC } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyContent: FC<CaseStudyContentProps> = ({ caseStudy }) => {
  return (
    <div className="space-y-16 max-w-3xl">
      {/* Context & Challenge */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Context &amp; Challenge</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>{caseStudy.context}</p>
          <p>{caseStudy.challenge}</p>
        </div>
      </section>

      {/* Key Decisions & Approach */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Key Decisions &amp; Approach
        </h2>
        <div className="space-y-4">
          {caseStudy.decisions.map((decision) => (
            <Card key={decision.title} className="p-6">
              <CardTitle as="h3" className="mb-2">
                {decision.title}
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground">{decision.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Results */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          {caseStudy.results.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-2xl sm:text-3xl font-bold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              {metric.context && (
                <p className="text-xs text-muted-foreground">
                  {metric.context}
                </p>
              )}
            </div>
          ))}
        </div>
        {caseStudy.results.qualitative &&
          caseStudy.results.qualitative.length > 0 && (
            <div className="space-y-3">
              {caseStudy.results.qualitative.map((item) => (
                <p
                  key={item}
                  className="border-l-2 border-border pl-4 text-muted-foreground"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
      </section>

      {/* Reflections */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reflections</h2>
        <div className="space-y-3">
          {caseStudy.reflections.map((reflection) => (
            <p
              key={reflection}
              className="border-l-2 border-border pl-4 text-muted-foreground"
            >
              {reflection}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CaseStudyContent;

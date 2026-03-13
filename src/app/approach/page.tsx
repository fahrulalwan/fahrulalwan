import type { Metadata } from 'next';
import type { FC } from 'react';
import CtaSection from '@/components/shared/cta-section';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

export const metadata: Metadata = {
  title: 'Approach',
  description:
    'How I think about product engineering — my philosophy, process, and approach to building impactful products.',
  alternates: {
    canonical: '/approach',
  },
  openGraph: {
    title: 'Approach',
    description:
      'How I think about product engineering — my philosophy, process, and approach to building impactful products.',
  },
};

const processSteps = [
  {
    number: '01',
    title: 'Understand',
    description:
      'Before writing a single line of code, I spend time understanding the problem space — talking to stakeholders, reviewing existing systems, and clarifying what success actually looks like.',
  },
  {
    number: '02',
    title: 'Frame',
    description:
      'I translate fuzzy requirements into clear problem statements and constraints. This framing guides every technical decision and helps the team stay aligned on what matters.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'I favour incremental delivery over big-bang releases. Small, testable slices reduce risk, invite early feedback, and keep momentum high throughout the project.',
  },
  {
    number: '04',
    title: 'Measure',
    description:
      'Shipping is not the finish line. I instrument what I build, watch real-world behaviour, and use that signal to inform the next iteration.',
  },
] as const;

const beliefs = [
  {
    title: 'Clarity over cleverness',
    description:
      'Code is read far more often than it is written. I optimise for the engineer who will maintain this six months from now — often my future self. Straightforward solutions that reveal intent are worth more than impressive abstractions.',
  },
  {
    title: 'Constraints unlock creativity',
    description:
      'Working within tight timelines, limited teams, or imperfect data has consistently led me to more elegant solutions than I would have found with unlimited resources. Constraints force prioritisation and focus.',
  },
  {
    title: 'Ownership drives quality',
    description:
      'The best work comes from engineers who feel genuine ownership over what they build — from inception through production. I try to create that sense of ownership in myself and the people I work with.',
  },
] as const;

const ApproachPage: FC = () => {
  return (
    <>
      {/* Hero */}
      <ScrollReveal>
        <section className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Approach
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I think of product engineering as the craft of turning ambiguous
            problems into reliable, useful software. Here is how I approach that
            craft — from the values I hold to the day-to-day habits that shape
            my work.
          </p>
        </section>
      </ScrollReveal>

      {/* Origin Story */}
      <ScrollReveal delay="0.1s">
        <section className="py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            How I got here
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto text-muted-foreground">
            <p>
              I did not set out to be an engineer. I started out curious about
              how things worked — why certain websites felt fast and others did
              not, why some products stuck and others were abandoned after the
              first use. That curiosity pulled me deeper into the craft until I
              realised I had built a career out of it.
            </p>
            <p>
              Over the years I moved between consultant engagements, product
              teams, and leadership roles. Each context taught me something
              different: consultancy gave me breadth and the ability to ramp up
              fast; product work gave me depth and long-term accountability;
              leadership gave me empathy for the people doing the hard work. I
              carry all three lenses into everything I build today.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Philosophy */}
      <ScrollReveal delay="0.2s">
        <section className="py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            What I believe
          </h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {beliefs.map((belief) => (
              <div key={belief.title}>
                <p className="font-bold mb-2">{belief.title}</p>
                <p className="text-muted-foreground">{belief.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Process */}
      <ScrollReveal delay="0.3s">
        <section className="py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">How I work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.number}>
                <p className="text-sm font-mono text-muted-foreground mb-1">
                  {step.number}
                </p>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <CtaSection />
    </>
  );
};

export default ApproachPage;

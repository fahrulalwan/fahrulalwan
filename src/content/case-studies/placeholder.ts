import type { CaseStudy } from './types';

export const placeholderCaseStudy1: CaseStudy = {
  slug: 'legacy-platform-rebuild',
  headline:
    'Rebuilding a legacy monolith into a scalable frontend platform without downtime',
  tags: ['React', 'TypeScript', 'Micro-frontends', 'Migration', 'Performance'],
  year: '2023',
  metadata: {
    role: 'Lead Frontend Engineer',
    timeline: '8 months',
    teamSize: '6 engineers',
  },
  context:
    'Placeholder — A large enterprise SaaS product running on a decade-old AngularJS codebase was causing developer velocity to stall. New features took weeks to ship, onboarding took months, and the UI had accumulated years of technical debt that slowed every release cycle.',
  challenge:
    'Placeholder — The team needed to modernise the frontend stack to React without disrupting the 50,000+ active users or halting feature development. A big-bang rewrite was ruled out due to business risk, requiring an incremental strangler-fig approach.',
  decisions: [
    {
      title: 'Adopt a strangler-fig migration pattern',
      description:
        'Placeholder — Instead of a full rewrite, we carved out new features as standalone React micro-applications served behind a shared shell, allowing both old and new code to coexist during the transition. This reduced migration risk and kept deliveries on schedule.',
    },
    {
      title: 'Introduce a shared design token system',
      description:
        'Placeholder — To maintain visual consistency across the hybrid codebase, we extracted design tokens into a shared package consumed by both the legacy Angular app and the new React modules. This prevented UI fragmentation and halved the time designers spent on QA.',
    },
  ],
  results: {
    metrics: [
      {
        label: 'Build time reduction',
        value: '68%',
        context: 'Placeholder — from 14 min to 4.5 min after switching to Vite',
      },
      {
        label: 'Time-to-interactive improvement',
        value: '2.3s faster',
        context:
          'Placeholder — P75 TTI dropped from 5.8s to 3.5s on the migrated routes',
      },
    ],
    qualitative: [
      'Placeholder — Developer onboarding time dropped from 3 weeks to 4 days.',
      'Placeholder — Feature cycle time reduced by approximately 40% within 3 months of first milestone.',
    ],
  },
  reflections: [
    'Placeholder — Underestimating the effort required to maintain two parallel routing systems added friction mid-project; earlier alignment on routing ownership would have saved 3 weeks.',
    'Placeholder — Shipping the design token package as an internal open-source library created unexpected adoption momentum from adjacent teams, validating the investment beyond the original scope.',
  ],
};

export const placeholderCaseStudy2: CaseStudy = {
  slug: 'fintech-product-zero-to-one',
  headline:
    'Taking a fintech dashboard from zero to production in 12 weeks under regulatory constraints',
  tags: [
    'Next.js',
    'TypeScript',
    'Data visualisation',
    'Accessibility',
    'Fintech',
  ],
  year: '2024',
  metadata: {
    role: 'Senior Frontend Engineer',
    timeline: '12 weeks',
    teamSize: '4 engineers',
  },
  context:
    'Placeholder — A Series A fintech startup needed to launch an investor-facing portfolio dashboard before a regulatory deadline. The product had to meet WCAG 2.1 AA accessibility requirements and pass a third-party security audit before going live.',
  challenge:
    'Placeholder — With a hard deadline driven by compliance requirements and a small team, the engineering challenge was to prioritise ruthlessly, establish a scalable component architecture from day one, and deliver accessible, performant data visualisations over complex financial datasets.',
  decisions: [
    {
      title: 'Choose a headless component library over a styled kit',
      description:
        'Placeholder — We adopted Radix UI primitives rather than a pre-styled library to retain full control over accessibility semantics and visual design. This added upfront cost but eliminated the recurring tax of overriding opinionated styles and made WCAG compliance significantly easier to audit.',
    },
    {
      title: 'Server-render chart data to eliminate waterfall fetches',
      description:
        'Placeholder — Financial charts were initially rendering empty states on the client while waiting for API responses, harming perceived performance. Migrating chart data to React Server Components eliminated the client waterfall and cut the time-to-meaningful-content by 1.4 seconds on median connections.',
    },
  ],
  results: {
    metrics: [
      {
        label: 'Lighthouse accessibility score',
        value: '98',
        context:
          'Placeholder — up from 71 at project kickoff, verified by third-party audit',
      },
      {
        label: 'Time to meaningful content',
        value: '1.4s faster',
        context:
          'Placeholder — median connection; measured via WebPageTest before/after RSC migration',
      },
    ],
    qualitative: [
      'Placeholder — Product shipped on the regulatory deadline with zero accessibility blockers raised during the third-party audit.',
      'Placeholder — The component architecture was reused in two subsequent internal tools, compressing future delivery timelines.',
    ],
  },
  reflections: [
    'Placeholder — The decision to adopt RSC mid-project introduced deployment complexity we had not scoped; a clearer boundary between server and client concerns from day one would have reduced late-stage rework.',
    'Placeholder — Embedding accessibility reviews into weekly demos rather than treating it as a final gate caught issues earlier and reduced the audit finding count by an estimated 60%.',
  ],
};

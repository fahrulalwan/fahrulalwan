import type { CaseStudy } from './types';

export const coverageRatchetCaseStudy: CaseStudy = {
  slug: 'test-coverage-ratchet',
  headline:
    'A core service nobody wanted to touch, taken from almost no tests to a floor that cannot slip back.',
  tags: ['Testing', 'CI/CD', 'Mutation Testing', 'Legacy Code'],
  year: '2026',
  metadata: {
    role: 'Frontend Engineering Lead',
    timeline: '2026',
    teamSize: 'Frontend squad; I led the effort',
  },
  context:
    'A core service at the investment platform I work on had almost no test coverage. It was still shipping, still making money, and every change to it came with a quiet negotiation about who was willing to be the one who touched it. Nobody had done anything wrong. Coverage is the thing that never wins the prioritisation argument, right up until the week it does.',
  challenge:
    'The obvious move is to write a pile of tests and announce a number. That fails twice over. A one-time push decays the moment attention moves on, and a single headline percentage hides exactly the places that are still bare. I wanted the end state to be a floor the codebase could not fall below, not a milestone we would celebrate and then quietly regress from.',
  decisions: [
    {
      title: 'Put the floor in CI, per directory, so it ratchets',
      description:
        'Each area of the codebase carries its own threshold in the test config: 95% lines, functions and statements, 90% branches. CI enforces them. That last part is the whole design. A per-directory floor cannot be diluted by a well-tested neighbour the way a single global number can, and once a directory is above its floor it can never quietly drop below it again. The tests stop being something we maintain by remembering to.',
    },
    {
      title: 'Refused to publish the flattering number',
      description:
        "The global threshold in that config is deliberately set to zero, with a comment explaining why. Jest's global bucket only counts files no directory glob has claimed, so leaving a real number there would average well-tested areas together with untested ones and produce something that reads impressive and means nothing. I would rather the config say zero and be honest than say a number and lie. Anyone who opens the file gets told which figure to trust.",
    },
  ],
  results: {
    metrics: [
      {
        label: 'The floor, per directory',
        value: '95 / 90',
        context: 'Lines and branches. Enforced in CI, so it ratchets and cannot drop back',
      },
      {
        label: 'Carve-outs, counted',
        value: '8',
        context: 'Every place we knowingly fell short, each with a reason attached',
      },
    ],
    qualitative: [
      'The coverage went from near zero to comfortably clear of the floor on every directory that has one. I am deliberately not putting that percentage on this page. It is a real number and it is in the repo, but the repo is private, so quoting it here would be asking you to take it on faith. This is the case study where I argue against exactly that.',
      'The part I am most pleased with is not the percentage anyway. It is that the exceptions are counted. Every place we knowingly fell short of the floor is tracked as an explicit carve-out with a reason attached, so the debt is a number someone can argue with rather than a feeling. It went to eight, and the plan was to keep pulling it down.',
    ],
  },
  reflections: [
    'This ran in phases with a retrospective after each one, which sounds like process for its own sake and mostly was not. The useful part was that the rules kept changing as we learned what a realistic floor looked like on real legacy code. The first thresholds we picked were wrong. Writing down why we moved them is the only reason the next person will not move them back.',
    'Coverage work is unglamorous and nobody thanks you for it. I still think it was the right thing to spend a stretch of the year on, but I understand why it usually loses to a feature, and I would not pretend the trade was free.',
  ],
};

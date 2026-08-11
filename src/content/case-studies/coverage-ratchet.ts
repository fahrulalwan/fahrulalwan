import type { CaseStudy } from './types';

export const coverageRatchetCaseStudy: CaseStudy = {
  slug: 'test-coverage-ratchet',
  headline:
    'A core service nobody wanted to touch, and a stretch of the year spent making it safe to change.',
  tags: ['Testing', 'CI/CD', 'Legacy Code', 'Technical Leadership'],
  year: '2026',
  metadata: {
    role: 'Frontend Engineering Lead',
    timeline: '2026',
    teamSize: 'Frontend squad; I owned the decision and the merges',
  },
  context:
    'A core service at the investment platform I work on had almost no test coverage. It was still shipping, still making money, and every change to it came with a quiet negotiation about who was willing to be the one who touched it. Nobody had done anything wrong. Coverage is the thing that never wins the prioritisation argument, right up until the week it does.',
  challenge:
    'The hard part was not writing tests. It was deciding this was worth a stretch of the year at all, and then holding a line on what counted as finished once the work was underway. Both of those are judgement calls that arrive without a deadline attached, which is exactly why they usually lose.',
  decisions: [
    {
      title: 'Decided it was worth the year',
      description:
        'Coverage work is unglamorous and nobody asks for it. Somebody has to decide it wins this quarter instead of a feature, and that decision is the entire reason the work exists. I made that call and I would make it again, though I understand completely why it usually goes the other way.',
    },
    {
      title: 'Set the thresholds that stopped the work, then took the calls when they fired',
      description:
        'The rules for when to stop were written up front rather than argued case by case in the moment. One of them fired partway through: a check found more gaps than the threshold allowed and escalated instead of continuing. I looked at the cost of closing them against what closing them would actually buy, and deferred most of them to a later phase. Another tool got dropped entirely after three failed attempts, with the reasons written down rather than quietly abandoned.',
    },
    {
      title: 'Shipped the worse number',
      description:
        'The plan was to bring the tracked exceptions down to seven. The work got to eight. I shipped eight and put the reversion in the title of the merge request, rather than quietly rounding to the number the plan had promised. It is a small thing and it is the part of this I would point at first, because a plan that always hits its target is a plan nobody is measuring honestly.',
    },
  ],
  results: {
    metrics: [
      {
        label: 'Tracked exceptions, against a plan of 7',
        value: '8',
        context: 'Shipped the real number rather than the one that was promised',
      },
    ],
    qualitative: [
      'The coverage went from almost nothing to comfortably clear of the floor on every directory that has one. I am deliberately not putting that percentage here. It is a real number and it is in the repo, but the repo is private, so quoting it would be asking you to take it on faith, and this is the case study where I argue against exactly that.',
      'What I am most pleased with is not the number anyway. It is that the exceptions are counted. Every place we knowingly fell short is tracked with a reason attached, so the debt is something you can argue with rather than a feeling.',
    ],
  },
  availability: {
    note: "private repo, so this one's a description rather than a link",
  },
  reflections: [
    'I am not the one who designed the approach here. I decided the work was worth doing, I wrote the rules it had to obey, and I decided what was allowed to merge. That is a real job and it is most of what leading turned out to mean, but it is not the same as having invented the method, and an earlier version of this page said otherwise.',
    'The thresholds we set at the start were wrong, and moving them was the useful part rather than an embarrassment. What I would keep is the habit of writing down why they moved. Without that, the next person just moves them back.',
  ],
};

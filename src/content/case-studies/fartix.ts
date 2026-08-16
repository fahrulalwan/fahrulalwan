import type { CaseStudy } from './types';

export const fartixCaseStudy: CaseStudy = {
  slug: 'fartix-ticketing-platform',
  headline:
    'A ticketing venture I founded for Indonesian football, then built and ran live for nine match-days, real money at the gate.',
  tags: ['React 19', 'Payments UX', 'Cloudflare Edge', 'TanStack Router'],
  year: '2026',
  metadata: {
    role: 'Founder & Product Engineer',
    timeline: 'Dec 2025 – May 2026',
    // ⛔ Five PEOPLE, not five engineers: two engineers, plus business
    // development, market research and field support. Keep the noun exact.
    // Collapsing it to "engineers" inflates the engineering org and misdescribes
    // a venture whose whole point is that it was small.
    teamSize: 'Five people, two of us engineers. I built the consumer side.',
  },
  context:
    'I founded a sports-event ticketing venture and signed a Liga-2 football club as the first partner. Match-day ticketing in Indonesian football still mostly runs on paper and cash: slow lines, and no real record of who is actually inside the stadium. We had one season to show a digital gate could hold up in that environment.',
  challenge:
    'Ticketing reads simple until real people are buying under a deadline. A match sells in a narrow window, on phones, on patchy stadium networks, and every failure is a person who does not get in. The consumer side had to take real payments, recover gracefully when a payment or an order broke, and never show a broken cart to someone about to give up and stay home.',
  decisions: [
    {
      title: 'Put a human at the end of every dead end',
      description:
        'The thing that actually stranded people was not a crashed payment. It was mistyping their own email, then having no way to reach the ticket they had already paid for. So the order page carries a WhatsApp contact, and partway through the first live day I moved it on mobile to sit directly under the payment-proof card, because that is where someone who is stuck is already looking. Later I added the same escape hatch to checkout errors and rewrote the error text into plain Indonesian. A buyer with no way through just does not turn up at the match.',
    },
    {
      title: 'Designed for the messy middle, not the happy path',
      description:
        "Orders expire before people pay. A tier sells out while they are still deciding. I built order lookup so anyone could find their ticket again, and a reorder flow for the ones that timed out. The sold-out state exists because availability went genuinely negative in production: the count oversold, and the honest fix was to render it as sold out rather than hand someone a selector that could not work. The backend owned the limit. My job was making the buyer's side of that limit not feel like a bug.",
    },
    {
      title: 'Made it fast to load and easy to find',
      description:
        "A match sells in a narrow window, so the site had to be quick, and it had to show up when someone searched the fixture. I built a caching strategy on Cloudflare's edge with partner pages cached and key routes prefetched, then did the SEO groundwork properly: structured data, a generated sitemap, search-action markup. Unglamorous work that decides whether someone finds the ticket at all.",
    },
  ],
  results: {
    metrics: [
      {
        label: 'Live match-days',
        value: '9',
        context: 'Real payments, real crowds, one Liga-2 season',
      },
      {
        label: 'Still online',
        value: 'at fartix.id',
        context: "React on Cloudflare's edge",
      },
    ],
    qualitative: [
      'Most founder side-projects are a landing page and a payment button. This one took real money from real strangers, at a stadium, under a crowd. The failure modes were operational rather than hypothetical: when checkout breaks, someone does not get through the gate.',
    ],
  },
  availability: {
    note: 'still up, still mine',
    href: 'https://fartix.id',
  },
  reflections: [
    'As the founder, I let the build run ahead of what we had proven. Ten services and a twenty-table schema for one early client was more than the moment needed. The engineering was sound, but I would have bought that certainty with something smaller first. That call was mine.',
    'The parts that had to work under pressure got the care they deserved: payments, the gate, order recovery. The parts that could have waited did not always wait. I am better now at telling those apart before I build, not after.',
  ],
};

import type { CaseStudy } from './types';

export const fartixCaseStudy: CaseStudy = {
  slug: 'fartix-ticketing-platform',
  // A title, not a sentence. `summary` below carries the explanation and is now
  // rendered as a dek under this — see `case-study-header.tsx`. Cut 2026-08-27
  // from 21 words, which was a paragraph wearing a headline's clothes.
  headline: 'Real money at the gate',
  tags: ['React 19', 'Payments UX', 'Cloudflare Edge', 'TanStack Router'],
  year: '2026',
  summary:
    'A ticketing venture I founded for Indonesian football, built and run live for nine match-days with real money at the gate.',
  metadata: {
    role: 'Founder & Product Engineer',
    timeline: 'Dec 2025 – May 2026',
    // ⛔ Five PEOPLE, not five engineers: two engineers, plus business
    // development, market research and field support. Keep the noun exact.
    // Collapsing it to "engineers" inflates the engineering org and misdescribes
    // a venture whose whole point is that it was small.
    teamSize: 'Five people, two of us engineers. I built the consumer side.',
  },
  availability: {
    note: 'still up, still mine',
    href: 'https://fartix.id',
  },
  blocks: [
    {
      type: 'prose',
      text: 'I founded a sports-event ticketing venture. Our first partner was a Liga-2 football club. Match-day ticketing in Indonesian football still mostly runs on paper and cash: slow lines, and no real record of who is actually inside the stadium. We had one season to show a digital gate could hold up in that environment.',
    },
    {
      type: 'prose',
      text: 'Ticketing reads simple until real people are buying under a deadline. A match sells in a narrow window, on phones, on patchy stadium networks, and every failure is a person who does not get in. The consumer side had to take real payments, recover gracefully when a payment or an order broke, and never show a broken cart to someone about to give up and stay home.',
    },
    {
      /* Was "Put a human at the end of every dead end", the last maxim heading
         on the site. A heading names the thing, and the thing here is a person
         stuck with a paid ticket they cannot reach. */
      type: 'heading',
      text: 'People got stranded by their own typos, not by broken payments',
    },
    {
      type: 'prose',
      text: 'The thing that actually stranded people was not a crashed payment. It was mistyping their own email, then having no way to reach the ticket they had already paid for. So the order page carries a WhatsApp contact, and partway through the first live day I moved it on mobile to sit directly under the payment-proof card, because that is where someone who is stuck is already looking. Later I added the same escape hatch to checkout errors and rewrote the error text into plain Indonesian. A buyer with no way through just does not turn up at the match.',
    },
    {
      type: 'heading',
      text: 'Orders expire before people pay',
    },
    {
      type: 'prose',
      text: 'Orders expire before people pay, and a tier can sell out while someone is still choosing. Either way they end up with nothing. I built order lookup so people could find a ticket again from whatever they still remembered, and a reorder flow for the ones that had already timed out. When a tier runs out the page says sold out, instead of leaving a selector that fails on submit.',
    },
    {
      type: 'heading',
      text: 'Made it fast to load and easy to find',
    },
    {
      type: 'prose',
      text: "A match sells in a narrow window, so the site had to be quick, and it had to show up when someone searched the fixture. I built a caching strategy on Cloudflare's edge with partner pages cached and key routes prefetched, then did the SEO groundwork properly: structured data, a generated sitemap, search-action markup. Unglamorous work that decides whether someone finds the ticket at all.",
    },
    {
      /* ⛔ No metric block, and it is not an oversight.
         This closed on `Live match-days: 9` in the full-bleed inverted band.
         Nine is a real number, unlike the "3 roles" the caready study used to
         show — but nothing a reader can open confirms it, and `fartix.id`
         proves the site is live rather than that it ran nine match-days.

         It was also the THIRD statement of the same fact: the headline says
         "nine match-days, real money at the gate" and `summary` repeats it
         verbatim. Moving the number into prose would have made four. The band
         went and the number stayed where it is already read. */
      type: 'prose',
      text: "It is still online, still mine, still running on Cloudflare's edge.",
      href: 'https://fartix.id',
      hrefLabel: 'fartix.id',
    },
    {
      /* One closing reflection, down from three, and the two that went are
         worth naming so they do not come back.

         "Most side projects stop at a landing page and a payment button" was
         cut for comparing himself favourably to unnamed others — the site
         states and lets the reader conclude — and its concrete half, a broken
         checkout meaning someone does not get in, is already made above where
         it belongs.

         "The parts that had to work under pressure got the care they deserved"
         was a softer restatement of this paragraph, ending on a claim about
         being better now. This one owns the same mistake with the numbers
         attached and no claim of having outgrown it. */
      type: 'prose',
      text: 'As the founder, I let the build run ahead of what we had proven. Ten services and a twenty-table schema for one early client was more than the moment needed. The engineering was sound, but I would have bought that certainty with something smaller first. That call was mine.',
    },
  ],
};

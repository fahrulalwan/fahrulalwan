import type { CaseStudy } from './types';

export const fartixCaseStudy: CaseStudy = {
  slug: 'fartix-ticketing-platform',
  // A title. `summary` carries the explanation and renders beneath it.
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
      /* Replaces a generic order-expiry drawing. Three payment methods, three
         windows, each sized to how that method behaves in the world rather
         than one timeout applied to everything.

         ⛔ The bar lengths are ordered, not to scale: the longest window is
         roughly a hundred times the shortest, which no honest bar can show on
         one line. The drawing says so out loud. */
      type: 'diagram',
      svg: `<svg viewBox="-24 0 1040 270" style="display:block;width:100%;height:auto;min-width:48rem" aria-hidden="true" focusable="false">
  <text x="1" y="26" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)">ONE WINDOW PER PAYMENT METHOD</text>
  <g stroke="var(--muted-foreground)" stroke-width="1.5" fill="none">
    <rect x="1" y="56" width="200" height="44" rx="4"/>
    <rect x="1" y="118" width="200" height="44" rx="4"/>
    <rect x="1" y="180" width="200" height="44" rx="4"/>
    <path d="M230 78 H380"/>
    <path d="M230 140 H580"/>
  </g>
  <path d="M230 202 H900" stroke="var(--signal)" stroke-width="1.5" fill="none"/>
  <g font-size="16" fill="var(--foreground)" text-anchor="middle">
    <text x="101" y="84">QRIS</text>
    <text x="101" y="146">Bank transfer</text>
    <text x="101" y="208">Manual transfer</text>
  </g>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)">
    <text x="392" y="83">15 MINUTES</text>
    <text x="592" y="145">60 MINUTES</text>
    <text x="1" y="252">LENGTHS ARE ORDERED, NOT TO SCALE</text>
  </g>
  <text x="912" y="207" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--signal)">24 HOURS</text>
</svg>`,
      alt: 'Three payment methods with three different windows to pay: QRIS gets fifteen minutes, a bank transfer sixty minutes, and a manual transfer twenty-four hours.',
      caption:
        'A QR code dies quickly. Someone paying by manual transfer has to walk to a bank, so they get a day.',
    },
    {
      type: 'prose',
      text: 'An order that runs out is not a dead end either: reorder starts a fresh one. I also built order lookup, so people could find a ticket again from whatever they still remembered.',
    },
    {
      type: 'heading',
      text: 'A tier can sell out while someone is still choosing',
    },
    {
      /* Replaces the sold-out sentence, which read as binary. The ladder is
         what the code does: the label changes twice before the control turns
         off, so nobody meets the wall without warning. */
      type: 'diagram',
      svg: `<svg viewBox="-24 0 1040 210" style="display:block;width:100%;height:auto;min-width:48rem" aria-hidden="true" focusable="false">
  <text x="1" y="24" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)">AS STOCK FALLS</text>
  <g stroke="var(--muted-foreground)" stroke-width="1.5" fill="none">
    <path d="M1 44 H966"/>
    <path d="M960 39 L966 44 L960 49"/>
    <rect x="1" y="72" width="220" height="66" rx="4"/>
    <rect x="254" y="72" width="220" height="66" rx="4"/>
    <rect x="507" y="72" width="220" height="66" rx="4"/>
  </g>
  <g stroke="var(--signal)" stroke-width="1.5" fill="none">
    <rect x="760" y="72" width="220" height="66" rx="4"/>
  </g>
  <g font-size="16" fill="var(--foreground)" text-anchor="middle">
    <text x="111" y="100">Buy</text>
    <text x="364" y="100">&#8220;Hampir Habis&#8221;</text>
    <text x="617" y="100">&#8220;Sisa N tiket&#8221;</text>
  </g>
  <text x="870" y="100" text-anchor="middle" font-size="16" fill="var(--signal)">&#8220;Habis&#8221;</text>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)" text-anchor="middle">
    <text x="111" y="124">PLENTY LEFT</text>
    <text x="364" y="124">ALMOST OUT</text>
    <text x="617" y="124">COUNT SHOWN</text>
    <text x="111" y="172">CONTROL LIVE</text>
    <text x="364" y="172">CONTROL LIVE</text>
    <text x="617" y="172">CONTROL LIVE</text>
  </g>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--signal)" text-anchor="middle">
    <text x="870" y="124">SOLD OUT</text>
    <text x="870" y="172">CONTROL OFF</text>
  </g>
</svg>`,
      alt: 'Four states of a ticket tier as stock falls: a normal buy state, an almost-out warning, a remaining-tickets count, and sold out. The buy control stays live for the first three and switches off at the last.',
      caption:
        'The label changes twice before the control switches off, and it switches off rather than failing on submit.',
    },
    {
      type: 'heading',
      text: 'Made it fast to load and easy to find',
    },
    {
      /* ⛔ No durations here, deliberately, and they are not to be added. The
         two lifetimes are internal configuration and nothing outside the
         product reveals them. The decision reads without them: the lifetime
         is derived from how fast the underlying thing moves. */
      type: 'diagram',
      svg: `<svg viewBox="-24 0 1040 210" style="display:block;width:100%;height:auto;min-width:48rem" aria-hidden="true" focusable="false">
  <text x="1" y="26" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)">HOW LONG A CACHED ANSWER LIVES</text>
  <g stroke="var(--muted-foreground)" stroke-width="1.5" fill="none">
    <rect x="1" y="56" width="260" height="48" rx="4"/>
    <rect x="1" y="124" width="260" height="48" rx="4"/>
    <path d="M290 148 H800"/>
  </g>
  <path d="M290 80 H420" stroke="var(--signal)" stroke-width="1.5" fill="none"/>
  <g font-size="16" fill="var(--foreground)" text-anchor="middle">
    <text x="131" y="86">Ticket availability</text>
    <text x="131" y="154">Partner details</text>
  </g>
  <text x="432" y="85" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--signal)">SECONDS</text>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)">
    <text x="812" y="153">MINUTES</text>
    <text x="1" y="196">THE LIFETIME COMES FROM HOW FAST THE THING UNDERNEATH MOVES</text>
  </g>
</svg>`,
      alt: 'Two caches with two lifetimes. Ticket availability is cached for seconds, partner details for minutes.',
      caption:
        'Tickets move while someone is looking at them. A partner\u2019s name does not.',
    },
    {
      type: 'prose',
      text: 'A match sells in a narrow window, so the site had to be quick, and it had to show up when someone searched the fixture. Key routes are prefetched, and the SEO groundwork went in properly: structured data, a generated sitemap, search-action markup. Unglamorous work that decides whether someone finds the ticket at all.',
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
      /* ⛔ No counts in this sentence, and do not put one back. The sources
         that would size this are closed, and a figure a reader cannot open
         does not go on the page. Describing the shape carries the admission
         without asking anyone to take a number on trust. */
      type: 'prose',
      text: 'As the founder, I let the build run ahead of what we had proven. A service for every concern and a schema to match, for one early client, was more than the moment needed. The engineering was sound, but I would have bought that certainty with something smaller first. That call was mine.',
    },
  ],
};

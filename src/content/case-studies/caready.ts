import type { CaseStudy } from './types';

export const careadyCaseStudy: CaseStudy = {
  slug: 'caready-auction-platform',
  // The date is in the title deliberately — this is a 2018 story, not a live
  // system, and saying so up front does that framing before anyone reads on.
  headline: 'A real-time layer, 2018',
  tags: ['WebSocket', 'Real-time Architecture', 'Angular', 'Java Spring Boot'],
  year: '2018',
  summary:
    'Live car auctions need everyone to see the same bid at the same instant. I built that real-time layer in 2018, fresh out of a bootcamp.',
  metadata: {
    role: 'Frontend Developer',
    timeline: '9 months',
    teamSize: '2 engineers on the real-time core',
  },
  availability: {
    note: '2018, rebuilt by other people since',
  },
  blocks: [
    {
      type: 'prose',
      text: 'An automotive auction company needed a platform built from zero: live auctions with an auctioneer, online bidders, and offline bidders in the room, all seeing the same state in real time. Our consultancy got the project. Nobody on the team had built anything like this before.',
    },
    {
      type: 'prose',
      text: 'Real-time bidding has no room for lag. Even a couple of seconds means bids get disputed and people stop trusting the platform. The system had to keep three types of participants in sync over unreliable networks: the auctioneer, online bidders, and people physically in the room.',
    },
    {
      /* ⛔ All three headings in this study opened on a technical term, which
         put the jargon in the largest type on the page. Reordered 2026-08-25
         so the plain half leads. `WebSocket` is kept in this one — it is the
         study's actual technical claim and an engineer scans for it — but
         `PoC` and `heartbeat` moved down into the prose, where a reader who
         does not know them has already been given the point. */
      type: 'heading',
      text: 'Weeks of research before I committed to WebSocket',
    },
    {
      type: 'prose',
      text: 'The system needed server-pushed updates. Polling could not keep up with live bidding. I spent weeks reading, comparing approaches, and testing before committing to WebSocket as the communication layer. It was the only approach that fit reactive, low-latency multi-party communication.',
    },
    {
      type: 'heading',
      text: 'Proved it between two machines before designing the rest',
    },
    {
      /* ⛔ A diagram earns its slot by DELETING prose, never by illustrating
         it. This one replaced the two sentences that described the two-machine
         proof and the scale-out. If a drawing is ever added here that leaves
         the text it depicts in place, it is decoration and it does not ship.

         Colours come from the theme tokens, so it follows light and dark. Do
         not hard-code a hex. aria-hidden because the wrapping figure already
         carries role="img" and this block's alt. */
      type: 'diagram',
      svg: `<svg viewBox="-24 0 1040 210" style="display:block;width:100%;height:auto;min-width:48rem" aria-hidden="true" focusable="false">
  <g stroke="var(--muted-foreground)" stroke-width="1.5" fill="none">
    <rect x="1" y="78" width="150" height="52" rx="4"/>
    <rect x="251" y="78" width="150" height="52" rx="4"/>
    <rect x="551" y="78" width="140" height="52" rx="4"/>
    <rect x="812" y="16" width="180" height="46" rx="4"/>
    <rect x="812" y="81" width="180" height="46" rx="4"/>
    <rect x="812" y="146" width="180" height="46" rx="4"/>
    <path d="M441 104 H505" stroke-dasharray="5 5"/>
    <path d="M499 99 L505 104 L499 109"/>
    <path d="M691 104 H751 V39 H812"/>
    <path d="M691 104 H812"/>
    <path d="M691 104 H751 V169 H812"/>
  </g>
  <path d="M151 104 H251" stroke="var(--signal)" stroke-width="1.5" fill="none"/>
  <circle cx="201" cy="104" r="3.5" fill="var(--signal)"/>
  <g font-size="16" fill="var(--foreground)" text-anchor="middle">
    <text x="76" y="110">Machine</text>
    <text x="326" y="110">Machine</text>
    <text x="621" y="110">Server</text>
    <text x="902" y="45">Auctioneer</text>
    <text x="902" y="110">Online bidder</text>
    <text x="902" y="175">In the room</text>
  </g>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)">
    <text x="1" y="30">FIRST</text>
    <text x="551" y="30">THEN</text>
  </g>
  <text x="201" y="66" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--signal)">IT WORKS</text>
</svg>`,
      alt: 'Two machines with a connection proven between them, then the same connection scaled out: a server feeding an auctioneer, an online bidder, and a bidder in the room.',
      caption:
        'Proved between two machines first, then scaled to the three kinds of participant.',
    },
    {
      type: 'prose',
      text: 'Every message carried a role identifier so the system could distinguish an auctioneer from an online buyer from an offline buyer.',
    },
    {
      type: 'heading',
      text: 'The connections were dying silently, so we made them check in',
    },
    {
      /* This sentence was cut when the diagram landed and put back after a
         design review. The drawing shows the heartbeat, the silence and the
         reconnect. It cannot show that this happened in production, after
         launch, with no error raised, and that is the part that makes the
         section land. A caption is skim-tier; this belongs in the body. */
      type: 'prose',
      text: 'After launch, connections started dying a few minutes in. No error, just silence.',
    },
    {
      /* Replaced the three sentences describing the silent death, the
         heartbeat and the reconnect. A timeline is the one shape that can
         show SILENCE — a gap where a reply should be. The two sentences left
         below are the ones no drawing can carry. */
      type: 'diagram',
      svg: `<svg viewBox="-24 0 1040 170" style="display:block;width:100%;height:auto;min-width:48rem" aria-hidden="true" focusable="false">
  <g stroke="var(--muted-foreground)" stroke-width="1.5" fill="none">
    <path d="M0 94 H992"/>
    <path d="M60 94 V68"/>
    <path d="M124 94 V120"/>
    <path d="M228 94 V68"/>
    <path d="M292 94 V120"/>
    <path d="M440 94 V68"/>
    <path d="M456 120 H660" stroke-dasharray="4 5"/>
  </g>
  <g fill="var(--muted-foreground)">
    <circle cx="60" cy="94" r="3.5"/>
    <circle cx="124" cy="94" r="3.5"/>
    <circle cx="228" cy="94" r="3.5"/>
    <circle cx="292" cy="94" r="3.5"/>
    <circle cx="440" cy="94" r="3.5"/>
  </g>
  <g stroke="var(--signal)" stroke-width="1.5" fill="none">
    <path d="M706 76 V112"/>
    <path d="M730 94 H900"/>
    <path d="M894 89 L900 94 L894 99"/>
  </g>
  <circle cx="900" cy="94" r="3.5" fill="var(--signal)"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--muted-foreground)" text-anchor="middle">
    <text x="60" y="56">PING</text>
    <text x="124" y="142">PONG</text>
    <text x="228" y="56">PING</text>
    <text x="292" y="142">PONG</text>
    <text x="440" y="56">PING</text>
    <text x="558" y="142">NO REPLY</text>
  </g>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1.96" fill="var(--signal)" text-anchor="middle">
    <text x="706" y="56">TIMEOUT</text>
    <text x="815" y="78">RECONNECT</text>
  </g>
</svg>`,
      alt: 'A timeline of ping and pong pairs, then a ping that gets no reply, a timeout, and a reconnection.',
      caption: 'The heartbeat caught the silence and the client reconnected.',
    },
    {
      type: 'prose',
      text: "The heartbeats didn't eliminate the problem entirely, but they made auctions reliable enough to run without interruption. The project delivered late, and a good part of that was me learning on the job what a more experienced engineer would have known on day one.",
    },
    {
      /* ⛔ No metric block here, and the absence is the decision.
         This study used to close its body on one: label "Kept in sync", value
         "3 roles", context naming the auctioneer and the two kinds of bidder.
         That is a count of design categories, not an outcome, and nothing
         behind it could be opened — while `metric` renders as the page's
         full-bleed inverted band, its loudest treatment. A number a reader is
         asked to take on trust does not appear at all, so the band went.

         Nothing replaced it. This one's evidence is a story: 2018, a private
         repository, and a site other people have since rebuilt. `availability`
         already says so and carries no href. */
      /* The close, and the only reflection left of three.
         The other two said what the headline already says — first real project,
         fresh out of a bootcamp — and the deleted `reflections[]` array is why
         there were three: it specified "2-3 honest takeaways", so both older
         studies end on a wall of first-person paragraphs. That wall is the
         clearest thing left of the old template, and it is what made these
         pages read like a talk. One reflection, the one that reaches the
         present. */
      type: 'prose',
      text: "I was too aggressive when I joined the core team. Eager and driven, but not humble enough about what I didn't know. I think about that a lot now, whenever I'm leading someone who reminds me of how I was back then.",
    },
  ],
};

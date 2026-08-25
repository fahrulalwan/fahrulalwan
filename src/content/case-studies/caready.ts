import type { CaseStudy } from './types';

export const careadyCaseStudy: CaseStudy = {
  slug: 'caready-auction-platform',
  headline:
    'Live car auctions need everyone to see the same bid at the same instant. I built that real-time layer in 2018, fresh out of a bootcamp.',
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
      type: 'prose',
      text: 'Instead of designing the full system on paper, my partner and I proved it worked between two machines first. Once that succeeded, we scaled to the multi-party architecture. Every message carried a role identifier so the system could distinguish an auctioneer from an online buyer from an offline buyer.',
    },
    {
      type: 'heading',
      text: 'The connections were dying silently, so we made them check in',
    },
    {
      type: 'prose',
      text: "After launch, WebSocket connections would silently die after a few minutes. No error, just silence. We implemented ping-pong heartbeats and automatic reconnection on timeout. It didn't eliminate the problem entirely, but it made auctions reliable enough to run without interruption. The project delivered late, and a good part of that was me learning on the job what a more experienced engineer would have known on day one.",
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

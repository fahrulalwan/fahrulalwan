import type { CaseStudy } from './types';

export const careadyCaseStudy: CaseStudy = {
  slug: 'caready-auction-platform',
  headline:
    'Building the real-time backbone of a car auction platform — from first PoC to eight years in production.',
  tags: ['WebSocket', 'Real-time Architecture', 'Angular', 'Java Spring Boot'],
  year: '2018',
  metadata: {
    role: 'Frontend Developer',
    timeline: '9 months',
    teamSize: '2 engineers on the real-time core',
  },
  context:
    'An automotive auction company needed a platform built from zero — live auctions with an auctioneer, online bidders, and offline bidders in the room, all seeing the same state in real time. Our consultancy got the project. Nobody on the team had built anything like this before.',
  challenge:
    'Real-time bidding has no room for lag. A delay of a few seconds means disputed bids, confused buyers, and lost trust. The system had to keep three types of participants perfectly in sync — each with different roles and permissions — across unreliable network conditions.',
  decisions: [
    {
      title: 'Chose WebSocket after weeks of independent research',
      description:
        'The system needed server-pushed updates — polling couldn\'t keep up with live bidding. I spent weeks reading, comparing approaches, and testing before committing to WebSocket as the communication layer. It was the only approach that fit reactive, low-latency multi-party communication.',
    },
    {
      title: 'Proved it with a two-machine PoC first',
      description:
        'Instead of designing the full system on paper, my partner and I proved it worked between two machines first. Once that succeeded, we scaled to the multi-party architecture — every message carried a role identifier so the system could distinguish an auctioneer from an online buyer from an offline buyer.',
    },
    {
      title: 'Handled silent connection drops with heartbeat and reconnect',
      description:
        'After launch, WebSocket connections would silently die after a few minutes — no error, just silence. We implemented ping-pong heartbeats and automatic reconnection on timeout. It didn\'t eliminate the problem entirely, but it made auctions reliable enough to run without interruption.',
    },
  ],
  results: {
    metrics: [
      {
        label: 'Years in production',
        value: '8+',
        context: 'Platform still active at caready.co.id',
      },
      {
        label: 'Platform users',
        value: '100K+',
        context: 'Serving the Indonesian automotive auction market',
      },
    ],
    qualitative: [
      'This was my first real engineering project — I was fresh out of a coding bootcamp. The fact that the system is still running is something I carry with quiet pride.',
    ],
  },
  reflections: [
    'The project delivered late. I was learning fundamentals on the job that a more experienced engineer would have known on day one. If I did it again, I\'d invest in best practices earlier instead of discovering them through trial and error.',
    'I was too aggressive when I joined the core team. Eager and driven, but not humble enough about what I didn\'t know. That\'s something I think about now whenever I lead others — confidence needs to come with self-awareness.',
  ],
  thumbnail: '/images/case-studies/caready-team.jpeg',
};

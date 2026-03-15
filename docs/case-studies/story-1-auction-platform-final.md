# Story 1: CarEADY Auction Platform — Final Draft

## Headline
I was weeks out of a coding bootcamp when I volunteered to build the real-time core of CarEADY's auction platform. That system is still running eight years later.

## Tags
WebSocket, Real-time Architecture, Angular, Java Spring Boot

## Year
2018

## Role
Frontend Developer — weeks out of a coding bootcamp

## Timeline & Team
9 months | 2 engineers on the real-time core

## Context
CarEADY — a joint venture between Blue Bird, Mitsubishi HC Capital, and Takari Kokoh Sejahtera — needed a car auction platform built from zero. They came to our consultancy with a brief: live auctions, three types of participants, real-time bidding. No existing system, no reference architecture, no one on the team who'd done this before.

## Challenge
In a live auction, everyone needs to see the same state at the same time — the auctioneer, online bidders, and people in the room. A lag of a few seconds means disputed bids, confused buyers, and lost trust. I had no experience building real-time systems. I had just finished learning how to code.

## Key Decisions

### 1. Researched independently and chose WebSocket
No senior pointed me to the answer. I spent weeks reading, comparing approaches, and testing. The system needed server-pushed updates — polling couldn't keep up with live bidding. WebSocket was the only fit for reactive, low-latency communication between multiple parties.

### 2. Built a proof of concept before committing
Instead of designing the full system on paper, my partner and I proved it worked between two machines first. Once that succeeded, we designed the multi-party architecture — every message carried a role identifier so the system could distinguish an auctioneer from an online buyer from an offline buyer.

### 3. Solved connection drops with heartbeat and reconnect
After launch, WebSocket connections would silently die after a few minutes — no error, just silence. We implemented ping-pong heartbeats and automatic reconnection on timeout. It didn't eliminate the problem entirely. But it made auctions reliable enough to run without interruption.

## Results
- System still in production — eight years and counting
- Hundreds of thousands of users, thousands of vehicles sold
- The core real-time architecture has never been replaced
- Platform still active at caready.co.id

## Honest Reflections
The project delivered late. The research phase was necessary but it cost us time — I was learning fundamentals that a more experienced engineer would have known on day one. If I did it again, I'd apply best practices earlier instead of discovering them through trial and error.

I was also too aggressive joining the core team. Eager, yes. But I could have been more humble about what I didn't know. That's something I think about now whenever I lead a team — confidence is good, but it needs to come with self-awareness.

## Assets
- Team photo: `/public/images/case-studies/caready-team.jpeg`
  Caption: "The CarEADY team — consultancy and client — at the auction house."

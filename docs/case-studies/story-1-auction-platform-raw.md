# Story 1: Auction Platform (2018) — Raw Draft

## Headline
Built the real-time auction system for a car platform from scratch — as a fresh graduate. It's still running eight years later.

## Tags
WebSocket, Angular, Java Spring Boot, Real-time, Architecture

## Year
2018

## Role
Frontend Developer — fresh out of a coding bootcamp. Volunteered for the most complex part of the system.

## Timeline & Team
~9 months | 2 engineers (core WebSocket team)

## Context
A joint venture between major automotive and financial players needed a car auction platform built from zero. No existing system — they came to our IT consultancy and said "build it." The platform had to support live auctions with three types of participants: an auctioneer running the session, online bidders watching remotely, and offline bidders in the room.

## Challenge
Real-time bidding means everyone needs to see the same state at the same time. A bid from the room has to show up on every online screen instantly — lag or missed updates means disputed sales and lost trust. Nobody on the team had built anything like this before, including me. I had just finished my coding bootcamp weeks earlier.

## Key Decisions

### 1. Chose WebSocket over polling
I researched on my own for weeks — no senior told me what to use. The system needed reactive, server-pushed updates, not request-response cycles. WebSocket was the only approach that fit real-time bidding where every millisecond of delay matters.

### 2. Built a PoC before committing
Instead of diving into the full system, my partner and I proved it worked between two machines first. Once that succeeded, we designed the multi-party architecture — distinguishing actors by role identifiers in every message so the system knew who was an auctioneer, an online buyer, or an offline buyer.

### 3. Implemented heartbeat with reconnect fallback
After going live, we discovered WebSocket connections would silently die after a few minutes. We added ping-pong heartbeats and automatic reconnection when the timeout was missed. It didn't eliminate the problem entirely — but it minimized it enough to keep auctions running reliably.

## Results
- System is still in production eight years later (2026)
- Hundreds of thousands of users, thousands of vehicles sold through the platform
- The core real-time architecture hasn't been replaced
- Overall project delivery was delayed

## Honest Reflections
- If I could redo it, I'd apply best practices from day one instead of learning them along the way — the research phase was valuable but cost us time.
- I was arrogant and aggressive when I entered the core team. I was eager and driven, but I could have been more humble about what I didn't know. That's something I carry with me now.
- The WebSocket stability issue was never fully solved — just managed. With what I know today, I'd architect the reconnection layer differently. But for a fresh graduate's first real system, I don't regret how it turned out.

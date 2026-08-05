# Product Marketing Context

*Last updated: 2026-07-23*

## What This Site Is

> [!warning] Framing reconciled 2026-08-05. `docs/brand-philosophy.md` governs; this file operationalises it.
> This section opened on a conversion-funnel frame — *"the site itself is the proof"*, a goal expressed as `lands → reads → reaches out`, and a `Conversion:` line. **`brand-philosophy.md` superseded that on 2026-07-23** and said so in its own § What this changes, which has been waiting to be applied ever since. Two reasons it goes: optimising a stranger's impression is the frame that produces copy reading *jumawa*, and **"the site IS the proof" under-sells a lead** — a lead is hired on judgment, leadership and communication, not on a static page's craft. **The voice rules and proof-points below are unaffected and still binding.**

Personal portfolio for Fahrul Alwan, an engineering lead. **The centre is legible, verifiable competence**: a reader skimming for six seconds learns who he is, at what level, what he has built, and that he is remote-ready — and every load-bearing claim is one a stranger can check.

**What it is for:** being trusted by a small number of hiring people. Not audience growth, not traffic.
**How someone responds:** email ([fahrulalwan@gmail.com](mailto:fahrulalwan@gmail.com)) or LinkedIn.

## Who's Reading This

**Companies:** Early-to-growth stage companies where the product is the business. Proven depth in fintech and SaaS — but the filter is company DNA, not industry label.
**People:** Founders, CTOs, VP Eng, Engineering Managers
**What they're trying to figure out:** "Is this person worth talking to?"


| Reader           | What they scan for                                    | What convinces them                                         |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------- |
| Founder (Seed–A) | Speed, ownership, can they ship without hand-holding? | Evidence of independent decision-making, not just execution |
| CTO / VP Eng     | Architectural thinking, team fit, seniority signal    | Case studies showing HOW decisions were made                |
| Recruiter / EM   | Quick signal, easy to share internally                | Clear positioning that stands out from generic portfolios   |


## What Makes This Different

- **Product thinking** — understands WHY before building WHAT
- **Self-made trajectory** — FTTH field technician in Bali → bootcamp → engineering lead. S.Kom Magna Cum Laude (BINUS) while working full-time
- **Case studies show process** — decisions, trade-offs, and honest reflections (not just highlight reel)
- **The craft is visible in the build** — editorial design, performance and accessibility are demonstrated rather than asserted. ⚠️ But **this is a supporting signal, not the argument** (see the framing note above), and it only counts while the numbers are real: measured 2026-08-05, accessibility was **96** and not the 100 the docs claimed, on one genuine defect.

⛔ **Struck 2026-08-05 — do not reinstate:** *"Builds things that last — systems still running 8 years later."* That is the CarEADY claim, and CarEADY was demoted from checkable evidence on **2026-07-24**: he was a vendor under a consultancy rather than an owner, and the site has since been revamped by other people, so nothing running there today is his. **It was removed from `caready.ts`, the IA spec, `brand-philosophy.md` and `case-study-framework.md` that day — and survived here, in the one file that tells agents what to write.** That is why it kept reappearing downstream.

## Brand Voice

**Tone:** Curious, understated, reflective. Slightly dry. No corporate-speak. No selling.
**Style:** Short sentences. Conversational but professional. English-primary. State facts, let reader draw conclusions.
**Personality:** Thoughtful, pragmatic, self-aware, honest, quietly confident

**Words to use:** figuring out, thinking about, complexity, constraints, trade-offs, shortcuts, ramp
**Words to avoid:** passionate (overused), guru/ninja/rockstar, "pixel-perfect" (cliché), "full-stack wizard", "I'm passionate about...", rely, own, build products that...

**Anti-patterns in copy:**

- Don't SELL — state. Let the reader decide.
- Don't sound like a LinkedIn bio
- Don't use "I help X do Y" formula (everyone does)
- Don't list tools as identity ("React developer") — lead with thinking
- Don't make claims — show curiosity instead
- Don't use parallel-structure taglines (sounds like a consulting firm)

## Language Reference

**How the audience talks about their problem (assumed, not validated):**

- "I need someone who can own the frontend, not just implement designs"
- "Tired of engineers who don't think about the user"
- "We need someone who can ship without being micromanaged"
- ⚠️ These are fabricated assumptions. Replace with real quotes when available.

**How people describe working with Fahrul (from LinkedIn recommendations):**

- "able to work under huge pressure" / "willing to climb the authority ladder from the bottom"
- "critical thinker with a warm and friendly personality"
- "a right person to brainstorming together"
- "hard-working person and good self-learner"


| Term                    | Meaning                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| Product engineer        | Engineer who participates in product decisions, not just implementation |
| Strangler-fig migration | Incremental rewrite pattern — replace legacy piece by piece             |


## Proof Points

**Notable work (anonymized for NDA safety):**

- Auction platform real-time WebSocket system, built from zero as a fresh graduate (2018). ⛔ **Never "still running N years later" and never "never replaced"** — struck 2026-07-24 and again 2026-08-05. He was a vendor under a consultancy, not an owner, and the live site has since been revamped by other people. **An early-career story, never a check-it-yourself link.**
- Employee superapp dynamic form engine at telco — delivered ahead of schedule (2021)
- Fintech news portal revamp — Lighthouse score 15 → 70 (2024)
- Signed-URL security migration at current company — led within own team's scope
- Test-coverage program on a legacy service — near-zero to ~99% lines / 96% branches, behind CI floors
- Ticketing platform for a Liga-2 football club — solo-built, 9 live match-days (2026)
- An autonomous agent loop with a self-review and screenshot-scoring gate. On an internal system he works on, it now writes most of the feature code; his own commits there are almost entirely gates, ADRs and tests. ⛔ **Built with one other engineer (Tigor) — never "I designed it" / "solo".** ⛔ **Never "his own product"** — the venture is his wife's; he owns engineering, not ownership. ⛔ **Never quote a commit-share %** — ~6 machine commits per ticket makes it a vanity metric, and it contradicts the coverage case study's own "rather say zero and be honest" line.

**Metrics:**

- Lighthouse 15 → 70 (frontend revamp)
- Test coverage near-zero → ~99% lines / 96% branches (verified from the repo's own coverage output)
- 2.5M+ investors on the current employer's platform (their own published figure)

> ⛔ **NDA floor — do not restore what was removed here.** Headcount, repository counts, MAU, and AUM figures for the current employer are **internal metrics** and were struck 2026-07-23. Only publicly-published employer figures are usable. Canonical list: the `employment-public-facts` note in the Obsidian vault.

**Speaking:**

- "Taming Complexity: A Case Study in Scaling Frontend Architecture" — BINUS Research Talk (Sep 2025)

**Technical breadth:**

- Frontend-first (React, Next.js, TypeScript, Angular, Tailwind)
- Backend real, not aspirational — a fullstack role shipping Angular + Spring Boot, plus solo services in Node/Hono, Go, Python and Rust
- DevOps literate (Docker, K8s, Cloudflare Workers, GCP, AWS)
- AI engineering, hands-on — **co-built** an autonomous agent loop that ships production features against real tickets (his contribution is the gate machinery: ADRs, verification rules, behavioral tests); authored an MCP server
- Can act as Product Manager

## Positioning

**Frame as:** Frontend-first engineering lead who goes wherever the problem is. Versatile without claiming "full-stack." Can do backend, architecture, and PM — but leads from the frontend.

**⛔ Founder work is now PUBLIC and featured — reversed 2026-07-23.** The earlier instruction here said to hide Grandboard Strategi Multi Cipta / fartix.id. That is no longer true: the founder role is live on LinkedIn, the ticketing platform is on the CV, and a Fartix case study is planned for this site. Do not strip it.

- **Name the club as "a Liga-2 club in the Pegadaian Championship," never "Adhyaksa FC."** The client carries an unpaid receivable and is being chased; naming a debtor as a happy public reference is a lever outside his control. The league framing carries identical credibility to an overseas reader.
- **Do not claim a managed team at Grandboard.** The collaborators are an unresolved informal partnership, so "team management" would be both an overclaim and legally adverse while that status is open. Solo authorship of the consumer platform is the claim.

## Origin Story (reusable narrative)

FTTH field technician in Bali (splicing fiber cables at villas) → helpdesk → coding bootcamp → frontend developer → software engineer → frontend engineering lead. Completed S.Kom at BINUS (Magna Cum Laude, 3.76) while working full-time 2018–2022. The trajectory wasn't planned — "I just kept following the interesting problems."

## Conversion Path

**After someone emails:** No fixed path. Depends on the opportunity — could be a casual call, a deeper portfolio walkthrough, or straight to a technical conversation. Keep it flexible, match the other person's energy.

## Location & Availability

**Based in:** Jakarta, Indonesia
**Open to (in order of preference):** Remote → Async-friendly → Relocation → Hybrid
**Timezone:** WIB (UTC+7)

## Content Strategy

How the site tells a story across pages:

| Page | Job | Visitor state | What they leave with |
|------|-----|---------------|---------------------|
| **Landing** | Intrigue + aliveness | "Who is this? Is this person still active?" | "This person thinks differently, still ships things, still has things on their desk. I want to know more." |
| **Approach** | Trust | "How do they think?" | "I trust their judgement. They're self-aware." |
| **Case study** | Proof | "Can they actually deliver?" | "They've done this before. The details check out." |
| **CTA / Contact** | Action | "Should I reach out?" | "Low commitment. I'll say hi." |
| **404** | Personality | "Oops, wrong page" | "Even their error page feels like a person." |

**Flow principle:** Each page leads naturally to the next. Landing → approach → case study → email. Don't try to do another page's job.

**Landing page is NOT a sales page.** It's a first impression. Curious, not convincing. The reader decides to go deeper on their own.

## Site Copy Inventory

| Location | File | Key copy |
|----------|------|----------|
| Hero headline | `src/components/landing/hero.tsx` | "Lately I've been rewriting code I wrote years ago and wondering what I was thinking." |
| Hero sub | same | "Engineering lead · Jakarta" |
| WhatIBring main | `src/components/landing/what-i-bring.tsx` | "...deciding what needs to exist, and keeping the rest useful to the people actually using it." |
| WhatIBring detail | same | "...splicing fiber cables in Bali. I just kept following the interesting problems." |
| Currently (Bareksa) | `src/components/landing/currently.tsx` | "Leading a frontend team at Bareksa, trying to keep my hands on enough code to stay useful." |
| Currently (Hono) | same | "Building a side project on Hono at Cloudflare Workers. The edge runtime keeps surprising me in small ways." |
| Currently (AI) | same | "Following AI agent tools lately, poking at OpenClaw and whatever else people keep releasing. Trying to spot what is actually useful." |
| Currently (books) | same | "Trying to finish more of the books I start instead of adding new ones to the pile." |
| ApproachTeaser | `src/components/landing/approach-teaser.tsx` | "Most of my job isn't writing code. It's making sure the thing we're about to build actually needs to exist." |
| CTA | `src/components/shared/cta-section.tsx` | "Say hi." |
| Footer | `src/components/shared/footer.tsx` | "Still debugging." |
| Navbar logo | `src/components/shared/navbar.tsx` | "Fahrul Alwan." (display serif) |
| Navbar CTA | same | "Say hi" |
| Mobile nav CTA | `src/components/shared/mobile-nav.tsx` | "Say hi" |
| Approach hero | `src/app/approach/page.tsx` | "My process is mostly asking 'why' until I get a real answer. It annoys people sometimes." |
| Approach inverted | same | "Some things I've built that are still running." |
| Approach impact quote | same | "...the engineer who'll read this code six months from now. Usually it's me." |
| Approach anti-positioning | same | "...whether the thing helps the people using it — and whether the next engineer doesn't hate me for how I built it." |
| Approach closing | same | "If any of this resonated, say hi." |
| Case study headline | `src/content/case-studies/caready.ts` | ⛔ **STALE — do not copy this row.** It read *"…Still in production eight years later."* The live file was corrected on 2026-07-24; **this row was not, and it is a row that instructs an agent what to write into that file.** Read `caready.ts` for the current headline; never restore a "still in production" or "never replaced" clause. |
| Case study reflections | same | "I was too aggressive when I joined the core team..." |
| Case study closing | `src/app/work/[slug]/page.tsx` | "If any of this resonated, say hi." |
| 404 | `src/app/not-found.tsx` | "This page doesn't exist." |
| Meta description | `src/app/layout.tsx` | "...engineering lead in Jakarta. Frontend systems, fintech, and mostly deciding what not to build." |
| Approach meta | `src/app/approach/page.tsx` | "How I think about product engineering. Mostly asking why before writing anything." |

## Open Questions

1. ~~**Full-stack positioning**~~ — **Answered:** Frontend-first, versatile, can do backend + architecture + PM.
2. ~~**Location/timezone**~~ — **Answered:** Open to all. Prefers remote/async.
3. **What feedback have you gotten** from people who hired or worked with you? (LinkedIn recs are generic — need real quotes from managers/colleagues)


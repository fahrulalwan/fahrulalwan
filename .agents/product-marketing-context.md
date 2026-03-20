# Product Marketing Context

*Last updated: 2026-03-20*

## What This Site Is

Personal portfolio positioning Fahrul Alwan as a product-minded engineering lead. Not a resume — a demonstration of craft and thinking. The site itself is the proof.

**Goal:** Visitor lands → reads → feels confident enough to reach out
**Conversion:** Email ([fahrulalwan@gmail.com](mailto:fahrulalwan@gmail.com)) or LinkedIn message

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
- **The site IS the proof** — editorial design, performance, accessibility all demonstrate the claimed skills
- **Builds things that last** — systems still running 8 years later

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

- Auction platform real-time WebSocket system — still running 8 years later (2018)
- Employee superapp dynamic form engine at telco — delivered ahead of schedule (2021)
- Fintech news portal revamp — Lighthouse score 15 → 70 (2024)
- Design system migration across dozens of repositories at current company

**Metrics:**

- Lighthouse 15 → 70 (frontend revamp)
- Team of 4 engineers managed
- Dozens of repositories overseen
- 627 GitHub contributions/year, 50 repos

**Speaking:**

- "Taming Complexity: A Case Study in Scaling Frontend Architecture" — BINUS Research Talk (Sep 2025)

**Technical breadth:**

- Frontend-first (React, Next.js, TypeScript, Tailwind)
- Backend capable (Node.js, Java Spring Boot, PostgreSQL)
- DevOps literate (Docker, K8s, GCP, AWS)
- AI-curious (Scrimba AI Engineer Path, LangChain)
- Can act as Product Manager

## Positioning

**Frame as:** Frontend-first engineering lead who goes wherever the problem is. Versatile without claiming "full-stack." Can do backend, architecture, and PM — but leads from the frontend.

**Do NOT mention:** Founder of Grandboard Strategi Multi Cipta / fartix.id (user prefers to hide)

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
| **Landing** | Intrigue | "Who is this?" | "This person thinks differently. I want to know more." |
| **Approach** | Trust | "How do they think?" | "I trust their judgement. They're self-aware." |
| **Case study** | Proof | "Can they actually deliver?" | "They've done this before. The details check out." |
| **CTA / Contact** | Action | "Should I reach out?" | "Low commitment. I'll say hi." |
| **404** | Personality | "Oops, wrong page" | "Even their error page feels like a person." |

**Flow principle:** Each page leads naturally to the next. Landing → approach → case study → email. Don't try to do another page's job.

**Landing page is NOT a sales page.** It's a first impression. Curious, not convincing. The reader decides to go deeper on their own.

## Site Copy Inventory

| Location | File | Key copy |
|----------|------|----------|
| Hero headline | `src/components/landing/hero.tsx` | "Lately I've been thinking about why the best code comes from the tightest constraints." |
| Hero sub | same | "Engineering lead · Jakarta" |
| WhatIBring main | `src/components/landing/what-i-bring.tsx` | "...figuring out where complexity hides..." |
| WhatIBring detail | same | "...splicing fiber cables in Bali. I just kept following the interesting problems." |
| ApproachTeaser | `src/components/landing/approach-teaser.tsx` | "The hard part was never the code..." |
| CTA | `src/components/shared/cta-section.tsx` | "Say hi." |
| Footer | `src/components/shared/footer.tsx` | "Still debugging." |
| Navbar CTA | `src/components/shared/navbar.tsx` | "Say hi" |
| Approach opening | `src/app/approach/page.tsx` | "I keep asking why until the answer stops changing." |
| Approach inverted | same | "Some things I've built that are still running." |
| Approach impact | same | "...the engineer who'll read this code six months from now. Usually it's me." |
| Approach closing | same | "If any of this resonated, say hi." |
| Case study closing | `src/app/work/[slug]/page.tsx` | "If any of this resonated, say hi." |
| 404 | `src/app/not-found.tsx` | "This page doesn't exist." |
| Mobile nav CTA | `src/components/shared/mobile-nav.tsx` | "Say hi" |
| Case study headline | `src/content/case-studies/caready.ts` | "Building the real-time backbone of a car auction platform..." |
| Case study context | same | "An automotive auction company needed a platform built from zero..." |
| Case study reflections | same | "I was too aggressive when I joined the core team..." |
| Meta description | `src/app/layout.tsx` | "...engineering lead in Jakarta. Frontend systems, fintech, and figuring out where complexity hides." |

## Open Questions

1. ~~**Full-stack positioning**~~ — **Answered:** Frontend-first, versatile, can do backend + architecture + PM.
2. ~~**Location/timezone**~~ — **Answered:** Open to all. Prefers remote/async.
3. **What feedback have you gotten** from people who hired or worked with you? (LinkedIn recs are generic — need real quotes from managers/colleagues)


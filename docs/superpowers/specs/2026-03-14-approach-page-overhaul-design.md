# Approach Page Overhaul — Design Spec

*Date: 2026-03-14*

## Problem

The approach page uses a generic centered layout with `font-bold` headings, disconnected from the editorial style of the landing page. Content was placeholder/AI-sounding. Structure was predictable (hero → origin → beliefs → process).

## Design Direction

**Manifesto-style page** — one continuous flow, not sections. Content based on real stories and working style. Visual craft through typography moments, color inversions, and scroll interactions.

**Goal:** Visitor leaves feeling "I trust this person's judgement" (Goal A from brainstorming).

**Depth:** ~1 minute read (Medium).

## Content Flow

The page has no section labels. Content flows naturally:

### 1. Opening Statement
- Mono label "Approach" with accent dash (consistent with landing page hero)
- Large serif: "I don't start until I understand *why* we're building it."
- Follow-up body text explaining what "why" means (not ticket, not feature request — actual reason)

### 2. How I Actually Work
- Three body paragraphs describing the real workflow:
  - Talk to people first, ask until you can argue against the solution
  - Break it down, challenge own assumptions, look at existing system, PoC if needed
  - "This isn't a framework I read somewhere" — acknowledge the few times it was skipped, results were worse
- No labels like "My Process" — just stated naturally

### 3. Ghost Typography Moment
- "Clarify. Challenge. Build." at ~88px, 4% opacity
- Acts as visual landmark, not readable text
- Vertical accent gradient line connecting to next section

### 4. Full-Bleed Inverted Block — "I design systems, not just features"
- `full-bleed bg-foreground text-background` (same pattern as CTA on landing page)
- Internal container: `max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4` for content alignment
- Large serif headline
- Two real stories (anonymized):
  - Auction platform: volunteered to architect WebSocket real-time communication. Still running 8 years later.
  - Telco employee superapp: designed FE-BE communication for dynamic form engine. Delivered ahead of schedule.
- No company names, no project names

### 5. Impact
- Body text: "Leading a large-scale frontend revamp, Lighthouse score from 15 to 70. Not by adding tools — by removing architectural debt."
- No industry descriptor (employer-safe)
- Medium serif follow-up: "The best code I write is the code that makes the next engineer's job *easier*."

### 6. Ownership Principle
- Hairline separator
- Body text: general principle about process ownership — "Good code in a broken process still produces bad outcomes." Framed as wisdom, not complaint.

### 7. Anti-Positioning
- Subtle bg shift (`bg-muted/20` — test visibility, fallback from `bg-foreground/[0.02]` which is too subtle on dark bg)
- Serif statements with line breaks:
  - "I don't chase frameworks."
  - "I don't write code to impress other engineers."
  - "I don't ship without understanding *why*."

### 8. Closing (replaces separate CTA section)
- Muted body text: "If this sounds like how you want your team to work, let's talk."
- Email (link-underline), GitHub, LinkedIn inline
- No separate CTA component — drop `CtaSection` import entirely. The closing is part of the page flow, not a reusable component. No full-bleed inverted block at the bottom.

## Visual Design

### Typography
- Serif display (`font-display` / Newsreader) for large statements
- Body text in sans (`font-sans` / Noto Sans) for paragraphs
- Mono for "Approach" label only
- Ghost text at 88px, `text-foreground/[0.04]`

### Spacing
- Generous whitespace between blocks (48-56px padding)
- Opening has 80px gap between mono label and headline
- Manifesto rhythm: large → small → large → visual break → small → large

### Color
- Accent warm (`text-accent-warm`) only on key words: "why", "easier", final "why" in anti-positioning
- Inverted block: full `bg-foreground text-background`
- Anti-positioning block: subtle `bg-foreground/[0.02]`
- Accent gradient line: `bg-gradient-to-b from-accent-warm to-transparent`

### Interactions
- Each content block wrapped in `<ScrollReveal>` with staggered delays
- Uses existing IntersectionObserver + CSS keyframes system
- Respects `prefers-reduced-motion`

### Responsive
- Content max-width constrains text to ~480px on desktop for readability
- Ghost text scales down on mobile (clamp or hidden on very small screens)
- Inverted block uses `full-bleed` utility
- Padding adjusts: 40px desktop → 20-24px mobile

## File Changes

### Modified
- `src/app/approach/page.tsx` — complete rewrite

### No New Files
- Uses existing utilities: `full-bleed`, `link-underline`, `ScrollReveal`, `font-display`, `accent-warm`
- No new CSS, no new components, no new dependencies

## Employer Safety
- No company names (Pradipta Jatis, Axiata, Bareksa)
- No project names (CarEADY, ADL)
- Story 3 descriptor: "large-scale frontend revamp" (no industry)
- Ownership paragraph: general principle, not workplace complaint

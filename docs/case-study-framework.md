# Case Study Framework

Reusable guide for writing case studies that fit this portfolio's editorial voice. Use this any time you want to add Story 2, 3, 4, etc.

**Pending stories:** See `~/.claude/projects/.../memory/project_pending_stories.md` for the backlog (telco superapp, news portal revamp, etc).

---

## The Process

Writing a case study takes 4 passes. Don't skip passes — each one serves a different purpose.

### Pass 1 — Brainstorm (Q&A, raw input)

Ask section by section. One question at a time. Answer in whatever language feels natural (bahasa, English, mixed). Don't polish — raw is better.

Required inputs to extract:

1. **Context** — What was the situation before you got involved? Who asked for it? What was missing?
2. **Challenge** — What made this hard? Not "we needed to build X" — what made it non-obvious?
3. **Research/approach** — What did you consider? What did you reject and why?
4. **First decision** — What did you commit to first? Why?
5. **Specific technical choice** — The actual key technical call. Why that and not alternatives?
6. **Unexpected issue** — What broke that you didn't expect? How did you solve it?
7. **Results** — What actually shipped? What's still running? Any numbers?
8. **Push back moment** — Did you ever push back on requirements? Or regret not pushing back?
9. **Reflection** — What would you do differently? What did you learn?

This usually takes 15–30 minutes of back-and-forth.

### Pass 2 — Raw draft

Write up the inputs into the `CaseStudy` interface shape. No polish. Save to `docs/case-studies/story-N-[slug]-raw.md` for reference.

### Pass 3 — Copywriting refinement

Apply the site's voice: curious, understated, reflective, no selling. Use the [refinement checklist](#copywriting-refinement-checklist) below.

Save refined version to `docs/case-studies/story-N-[slug]-final.md`.

### Pass 4 — Implementation

Write the `CaseStudy` object to `src/content/case-studies/[slug].ts`, wire it up in `index.ts`, add assets to `public/images/case-studies/`, verify build.

---

## Template

Every case study must fit this shape (matches `src/content/case-studies/types.ts`):

```typescript
interface CaseStudy {
  slug: string;              // kebab-case, e.g. 'caready-auction-platform'
  headline: string;          // ONE sentence that makes someone want to read more
  tags: string[];            // 3-5 technical tags
  year: string;              // Just the year, as string
  metadata: {
    role: string;            // Actual title, not what you actually did
    timeline: string;        // e.g. '9 months'
    teamSize: string;        // e.g. '2 engineers on the real-time core'
  };
  context: string;           // 2-4 sentences, situation before you got involved
  challenge: string;         // 2-4 sentences, what made it hard
  decisions: {               // 2-4 decisions — THE STAR SECTION
    title: string;           // Short, specific, action-oriented
    description: string;    // 2-4 sentences per decision
  }[];
  results: {
    metrics: {
      label: string;         // e.g. 'Years in production'
      value: string;         // e.g. '8+' (string, not number)
      context?: string;      // Small explanatory text
    }[];
    qualitative?: string[];  // 1-3 bullet reflections on impact
  };
  reflections: string[];     // 2-3 honest takeaways, first-person
  thumbnail?: string;        // Path to hero image, e.g. '/images/case-studies/caready-team.jpeg'
}
```

---

## Anonymization Rules

**Default: anonymize everything.**

Replace with:
- Company name → industry descriptor (e.g. "a car auction platform", "a telco", "a fintech startup")
- Project code name → generic noun (e.g. "the auction engine", "the superapp")
- Client name → same pattern
- Team member names → roles only ("the PM", "my partner on the core team")

**Exceptions — when to reveal names:**

| Situation | Action |
|-----------|--------|
| Public website + brand is part of the story | Reveal (e.g. Fartix is public, fartix.id is in the case study metric) |
| Current employer | **Never reveal.** Anonymize aggressively, stay vague on business context. |
| Confidential client/NDA | Never reveal. |
| Unsure | Ask user explicitly. Default to anonymize. |

**Important:** Always ask the user before revealing any company/client name. Even if the project is public, the user might prefer to stay anonymous for NDA comfort.

---

## Employer Safety Checklist

For case studies involving the **current employer**:

- [ ] No company name, no product name, no team name
- [ ] Use industry descriptor only (e.g. "large-scale frontend revamp" not "fintech news portal")
- [ ] Don't mention internal processes, politics, or organizational details
- [ ] Focus on technical decisions, not business context
- [ ] Reflections should be general principles, not workplace-specific complaints
- [ ] No metrics tied to business outcomes (revenue, user numbers) unless public
- [ ] Ask user to review before publishing

For **past employers** (no active NDA):

- [ ] Company name optional — user's comfort level decides
- [ ] Project name optional — same
- [ ] Public metrics can be mentioned freely
- [ ] Honest reflections allowed (mistakes, growth moments)

---

## Copywriting Refinement Checklist

After raw draft, refine using these rules. The goal: curious, understated, reflective. Not salesy, not impressive, not "look at me."

### Voice rules

- [ ] **State, don't sell.** Describe what happened, let the reader draw conclusions.
- [ ] **No claims.** "I built the best X" → "I built X. It ran for 8 years."
- [ ] **No parallel-structure taglines.** Consulting deck energy. Avoid.
- [ ] **First person, but sparingly.** Don't start every sentence with "I."
- [ ] **One detail that's only you.** Something specific, personal, unexpected (e.g. "I was weeks out of bootcamp").
- [ ] **Self-deprecation allowed.** Humble > arrogant. "I didn't eliminate the bug entirely, but I minimized it."
- [ ] **Short sentences.** If a sentence is long, break it.

### Words to use

- figuring out, thinking about, complexity, constraints, trade-offs, shortcuts, ramp, running, still, shipped

### Words to avoid

- passionate, rockstar, guru, pixel-perfect, full-stack wizard, build products that, own the, rely on, best-in-class

### Headline rules

- One sentence. Period at the end.
- Describes **what you did** or **what you learned**, not what it means.
- Specific > generic.
- Good: "Building the real-time backbone of a car auction platform — from a two-machine PoC to a live multi-party auction."
- Bad: "Rebuilding a legacy monolith into a scalable frontend platform." (generic, jargon-heavy)

### Decision title rules

- Action-oriented. Start with a verb.
- Good: "Chose WebSocket after weeks of independent research"
- Bad: "WebSocket Architecture" (noun, static)

### Reflection rules

- **Must include one honest flaw.** Mistake, regret, or thing you'd do differently.
- Written in first person, conversational.
- Don't spin mistakes into humble brags. "I was too aggressive" is honest. "I was too passionate" is a spin.

---

## Photo & Asset Workflow

### Where to put assets

- Team photos, environment photos → `public/images/case-studies/[slug]-team.jpeg` (or similar)
- Product screenshots → `public/images/case-studies/[slug]-product.jpeg`
- Diagrams/sketches → `public/images/case-studies/[slug]-diagram.jpeg`

### Naming convention

- `[slug]-[asset-type].[ext]`
- All lowercase, kebab-case
- Prefer `.jpeg` for photos, `.png` for diagrams/UI screenshots

### Alt text rules

- Descriptive, not keyword-stuffed
- Don't use the slug or filename — write like a human explaining the image
- Good: "The engineering and client team at the project office"
- Bad: "caready-team-photo alt text"

### Thumbnail field

- Set `thumbnail` in the `CaseStudy` object to the primary image
- This renders as the hero image in `CaseStudyHeader`
- Use a high-quality, wide-aspect image (1200×675 or similar)

### Image compression

- Next.js Image component handles optimization — use it
- Original file: target < 500 KB for JPEG, < 200 KB for PNG
- Too large? Use an online compressor or ImageOptim

---

## Implementation Checklist

After copy is finalized:

1. [ ] Create `src/content/case-studies/[slug].ts` with the typed object
2. [ ] Import and add to `caseStudies` array in `src/content/case-studies/index.ts`
3. [ ] Add assets to `public/images/case-studies/`
4. [ ] Run `bun run build` — verify new route generates (e.g. `/work/[slug]`)
5. [ ] Check the page in dev — read through, look for typos, bad line breaks
6. [ ] Verify metrics look right in the inverted Results section
7. [ ] Verify thumbnail loads and looks good
8. [ ] Accessibility check: heading hierarchy, alt text, focus states
9. [ ] Test in both light and dark mode
10. [ ] Check the landing page FeaturedWork section — new card should appear
11. [ ] Sitemap auto-updates via `generateStaticParams` — verify it's in `sitemap.xml`

---

## Worked Example: Story 1 (CarEADY)

See the finished version at `src/content/case-studies/caready.ts`.

### Pass 1 questions that produced it

- Context: "sebelum gue masuk, gak ada apa apa. perusahaan kami adalah konsultan IT."
- Challenge: "requirements teknis yang tricky" (real-time bidding, multi-party sync)
- Research: "gue coba explore di internet, kebutuhan yang tepat dapetnya websocket"
- Implementation: "pertama, gue coba buat PoC dulu sama partner"
- Unexpected issue: "websocket kadang bengong setelah beberapa menit"
- Solution: heartbeat + reconnect on timeout
- Results: "masih kepake 8 tahun, hundreds of thousands of users"
- Reflection: "gue arogan waktu itu", "kalo bisa ngulang, apply best practices earlier"

### What made it work

- Concrete technical details (WebSocket, ping-pong, reconnect) prove competence
- Honest about delay ("project delivered late") — pratfall effect builds trust
- Personal detail ("weeks out of bootcamp") — specific, only Fahrul can write this
- Anonymized appropriately — company revealed (public + user consented), technical details specific
- Reflections are about character, not blame-shifting

### What to reproduce for future stories

- The Q&A flow — don't start writing until you have raw input for all 9 sections
- The one personal/specific detail — every case study needs one "only Fahrul" moment
- The honest reflection — always include one flaw or lesson
- The copywriting refinement pass — rough draft is never the final version

---

## Skills to Invoke

When writing a case study, these skills help:

| Skill | When |
|-------|------|
| `copywriting` | Pass 3 (refinement) |
| `marketing-psychology` | Pass 3 (ensure pratfall effect, contrast effect, etc.) |
| `product-marketing-context` | Reference for brand voice, words to use/avoid |
| `nextjs-seo` | Pass 4 (metadata, structured data for the new page) |

---

## Voice Reference

Read the most recent finished case study (`caready.ts`) before writing a new one. The voice should be consistent across case studies — if Story 2 sounds different from Story 1, something's off.

Brand voice summary:
- Curious, not assertive
- Understated, not impressive
- Honest about flaws
- Specific, not generic
- First person but sparingly
- Short sentences
- No selling

# Portfolio Refactor — Design Spec

## Goal

Refactor personal portfolio from a resume-style CV site into a "product page" that productizes Fahrul Alwan as a distinct product engineer. Make visitors intrigued, not just informed.

## Strategic Decisions

- **Primary audience:** Founders, CTOs, VP Eng, hiring decision makers
- **Core positioning:** "Engineer yang mikirnya kayak founder"
- **Proof method:** Challenge-based case study storytelling (problem → approach → impact)
- **Tone:** Confident tapi grounded — show thinking, not claim titles. Let work speak.
- **Copy status:** All copy in this spec is placeholder/structural. Final copy to be optimized separately (see Task: UX Writing & Copywriting)

## Reference Sites

- **milhamakbarjr.com** — Product designer. Separated `/works` (showcase) and `/case-studies` (deep narrative). Case study: 9 sections, 12 min read, research → strategy → solution flow with progress breadcrumb and metrics.
- **harrygeorge.design** — UX designer. Combined works + case studies into `/work/[slug]`. Case study: 6 sections, 3-5 min read, focused on key decisions & reasoning. Has dedicated `/approach` page.

## Information Architecture

```
/                        → Landing (full narrative, single-page scroll)
├── /work/[slug]         → Case study detail pages
├── /approach            → How I think + philosophy + process
└── (future)
    ├── /work            → Work index (when case studies reach 4+)
    └── /blog            → Thoughts/feed
```

### Navigation (3 items)

```
[Logo/Name]     Approach    Work    Let's Talk
```

- "Work" anchors to `#work` section on landing (later links to `/work` index)
- "Let's Talk" = on landing, smooth-scroll to `#contact` section. On other pages (`/approach`, `/work/[slug]`), navigates to `/#contact`

### Pages Killed

| Old Page | Decision | Migration |
|---|---|---|
| `/about` | Kill | Content absorbed into landing hero + `/approach` |
| `/experience` | Kill | Best experiences become case study content |
| `/projects` | Kill | Replaced by featured work + `/work/[slug]` |
| `/skills` | Kill | No replacement. Skills reflected in case studies |
| `/education` | Kill | No replacement. Certifications → LinkedIn |

### Redirects (SEO)

Implement via `next.config.ts` `redirects()`. All use HTTP 308 (permanent).

```
/about       → /approach
/experience  → /
/projects    → /
/skills      → /
/education   → /
```

## Landing Page (`/`)

Top-to-bottom scroll flow. Each section has one job.

### Hero

- Availability badge (e.g. "Open to opportunities · 2026")
- Name (large)
- One-liner positioning statement (confident, grounded — not a title/label)
- Social links: GitHub, LinkedIn, Email
- No profile photo. No job title.

### What I Bring (Philosophy Snippet)

- 2-3 sentences max. Value proposition, not bio.
- Years of experience embedded naturally
- Leads into featured work

### Featured Work

- 2-3 case study cards
- Each card: visual + problem-framed headline + 1-line result + link to `/work/[slug]`
- Headlines framed as challenges solved, not project names

### How I Work (Approach Teaser)

- 4-step visual: Understand → Frame → Build → Measure
- Teaser only, links to `/approach` for full detail

### CTA

- Direct, warm, not salesy
- Email + LinkedIn
- Signals openness to conversations, not just job applications

## Approach Page (`/approach`)

### Hero

- Page title + strong opening line about starting with "why"

### Origin Story

- 3-4 sentences, story-driven (not timeline)
- Why the versatility is natural evolution, not a pivot

### Philosophy

- 2-3 core beliefs, each 1-2 sentences
- Must be distinctly Fahrul — not generic wisdom
- Each belief implicitly shows thinking beyond engineering

### Process

- 4 steps: Understand → Frame → Build → Measure
- Each step shows engineering + product + business thinking
- Expandable detail (accordion) optional

### CTA

- Same pattern as landing

## Case Study Template (`/work/[slug]`)

Hybrid approach combining depth from milhamakbarjr.com and conciseness from harrygeorge.design.

```
Hero headline (problem-framed, not company name)
  ↓
Project metadata (role, timeline, team size)
  ↓
Context + Challenge (merged, 2 paragraphs max)
  ↓
Key Decisions & Approach (star section — shows HOW you think)
  ↓
Results + Metrics (quantitative where possible)
  ↓
Reflection (2-3 takeaways max — shows growth mindset)
  ↓
Related work + CTA
```

### Key Principles

- Headline = problem framed, not project name
- Approach section is the star — this is what proves "engineer thinks like founder"
- Metrics where available, qualitative impact where not
- Reflection section shows continuous learning

## Technical Decisions

### What Stays

- Next.js 16 App Router + React 19
- TypeScript strict mode
- Bun
- Tailwind CSS 4 + CSS variables
- shadcn/ui (New York) + Radix UI
- Sentry + Vercel Analytics + Speed Insights
- Dark/light mode via next-themes

### What Changes

| Aspect | Current | New |
|---|---|---|
| Routing | 6 static pages | 1 landing + `/approach` + dynamic `/work/[slug]` |
| Data | Inline arrays in page files | Separate `src/content/` directory |
| Animations | None | Subtle scroll-triggered, section transitions |
| Contact | None | CTA section (email + LinkedIn, no form) |

### Project Structure

```
src/
├── app/
│   ├── page.tsx              → Landing
│   ├── approach/page.tsx     → Approach
│   └── work/[slug]/page.tsx  → Case study (dynamic)
├── content/
│   └── case-studies/
│       ├── index.ts          → Export all case studies
│       └── [slug].ts         → Per case study data
├── components/
│   ├── ui/                   → shadcn (existing)
│   ├── landing/              → Landing page sections
│   ├── case-study/           → Case study components
│   └── shared/               → Nav, Footer, CTA
└── lib/
    └── utils.ts              → Existing cn() utility
```

### Content Layer

- Plain TypeScript files in `src/content/` — typed, no CMS
- Easy to migrate to MDX or CMS later
- Separates content editing from component code
- Pages use `generateStaticParams` for SSG (static generation at build time)

```typescript
interface CaseStudy {
  slug: string;
  headline: string;           // Problem-framed, not company name
  tags: string[];              // e.g. ["Product Engineering", "Frontend", "Growth"]
  year: string;
  metadata: {
    role: string;
    timeline: string;
    teamSize: string;
  };
  context: string;             // Client + situation (1-2 paragraphs)
  challenge: string;           // What was broken/hard
  decisions: {                 // Star section
    title: string;
    description: string;
  }[];
  results: {
    metrics: { label: string; value: string; context?: string }[];
    qualitative?: string[];
  };
  reflections: string[];       // 2-3 takeaways
  thumbnail?: string;          // Image path for card on landing
}
```

### Animation Approach

- CSS-first: Tailwind animations + `@keyframes` for simple transitions (hover, fade)
- `IntersectionObserver` + CSS classes for scroll-triggered reveal animations (no Framer Motion — keep bundle lean)
- Principle: purposeful motion, not decorative
- Animations: fade-in on scroll, subtle card hover effects, smooth section transitions

## SEO & Metadata

- Each page exports `metadata` (Next.js App Router convention) with title, description, OG image
- Update existing `src/app/sitemap.ts` to reflect new routes
- OG images: reuse existing `opengraph-image.jpeg` for now, create page-specific ones later
- Structured data: JSON-LD `Person` schema on landing page
- Case study pages: JSON-LD `Article` schema

## Responsive Design

- Mobile-first approach using standard Tailwind breakpoints (`sm`, `md`, `lg`)
- Navigation: hamburger menu on mobile, inline on desktop
- Landing hero: full-width on mobile, max-width contained on desktop
- Featured work cards: single column on mobile, side-by-side on `md+`
- Case study: single column layout across all breakpoints (content-focused)
- Process steps (Understand → Frame → Build → Measure): vertical stack on mobile, horizontal on `md+`

## Accessibility

- Target: WCAG 2.1 AA
- Color contrast: maintain minimum 4.5:1 ratio in both light and dark themes
- Keyboard navigation: all interactive elements focusable and operable via keyboard
- Semantic HTML: proper heading hierarchy (h1 per page, sequential h2-h3)
- Accordion on `/approach`: proper `aria-expanded`, `aria-controls`, keyboard support
- Skip-to-content link (already exists, keep it)
- Reduced motion: respect `prefers-reduced-motion` — disable scroll animations

## Footer

- Location + timezone (Jakarta, ID)
- Social links (GitHub, LinkedIn, Email)
- Availability status
- Copyright

## Pending Tasks

- [ ] UX writing & copywriting optimization (Task #6)
  - Invoke skills: `copywriting`, `marketing-psychology`, `product-marketing-context`
  - Requires raw content input from Fahrul for authentic voice
  - Covers: headlines, CTAs, value propositions, case study narratives, microcopy
- [ ] Case study content creation
  - Fahrul provides raw stories (situation → decision → result)
  - Refine together for framing and polish
- [ ] Visual design details (color palette review, typography scale, spacing) — non-blocking, refine during implementation
- [ ] Animation specifications — non-blocking, base animations defined in spec, polish during implementation

## Skills to Use During Implementation

### Already Installed

- `frontend-design` — UI implementation
- `vercel-react-best-practices` — React/Next.js performance
- `web-design-guidelines` — Accessibility & UX audit
- `copywriting` — Copy optimization
- `marketing-psychology` — Persuasion patterns
- `product-marketing-context` — Positioning & messaging

### Candidates from skills.sh

| Skill | Installs | Use Case |
|---|---|---|
| `tailwindcss-advanced-layouts` | 2.1K | Layout patterns |
| `tailwind-css-patterns` | 1.7K | Design patterns |
| `nextjs-app-router-fundamentals` | 1.5K | App Router best practices |
| `tailwindcss-animations` | 811 | Animation patterns |
| `tailwindcss-mobile-first` | 759 | Responsive design |
| `landing-page-guide-v2` | 540 | Landing page structure |
| `awwwards-landing-page` | 253 | Award-level design |
| `awwwards-animations` | 234 | Award-level animations |
| `nextjs-seo` | 332 | SEO optimization |
| `micro-interactions` | 152 | Micro-interaction patterns |

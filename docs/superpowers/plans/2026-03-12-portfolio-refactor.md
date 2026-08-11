# Portfolio Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio from a resume-style CV site into a single-page narrative "product page" that positions Fahrul as a product engineer who thinks like a founder.

**Architecture:** Kill 5 old pages, create 1 narrative landing page + `/approach` page + dynamic `/work/[slug]` case study pages. Content moves from inline arrays to a typed `src/content/` layer. Animations via CSS + IntersectionObserver (no Framer Motion).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Bun

**Spec:** `docs/superpowers/specs/2026-03-12-portfolio-refactor-design.md`

---

## File Map

### New Files

| File | Responsibility |
|---|---|
| `src/content/case-studies/types.ts` | `CaseStudy` interface |
| `src/content/case-studies/placeholder.ts` | Placeholder case study data (replaced by real content later) |
| `src/content/case-studies/index.ts` | Barrel export + `getCaseStudy()` / `getAllCaseStudies()` |
| `src/components/shared/navbar.tsx` | New navbar: Logo + Approach + Work + Let's Talk |
| `src/components/shared/footer.tsx` | New footer: location, socials, availability, copyright |
| `src/components/shared/cta-section.tsx` | Reusable CTA section (used on landing, approach, case study) |
| `src/components/shared/scroll-reveal.tsx` | Client component: IntersectionObserver + CSS fade-in |
| `src/components/shared/mobile-nav.tsx` | Client component: hamburger menu for mobile |
| `src/components/landing/hero.tsx` | Hero: availability badge, name, one-liner, socials |
| `src/components/landing/what-i-bring.tsx` | Philosophy snippet section |
| `src/components/landing/featured-work.tsx` | 2-3 case study cards |
| `src/components/landing/approach-teaser.tsx` | 4-step process visual + link to /approach |
| `src/components/case-study/case-study-header.tsx` | Headline + tags + metadata |
| `src/components/case-study/case-study-content.tsx` | Context, decisions, results, reflections |
| `src/app/approach/page.tsx` | Approach page |
| `src/app/work/[slug]/page.tsx` | Dynamic case study page |
| `src/hooks/use-scroll-reveal.ts` | IntersectionObserver hook |

### Modified Files

| File | Changes |
|---|---|
| `src/app/page.tsx` | Complete rewrite — new landing page |
| `src/app/layout.tsx` | Replace nav + footer with new shared components |
| `src/app/sitemap.ts` | Update routes (remove old, add new) |
| `next.config.ts` | Add `redirects()` for old routes |
| `src/app/globals.css` | Add scroll-reveal animation keyframes |

### Deleted Files

| File | Reason |
|---|---|
| `src/app/about/page.tsx` | Content moves to landing + approach |
| `src/app/experience/page.tsx` | Content moves to case studies |
| `src/app/projects/page.tsx` | Content moves to case studies |
| `src/app/skills/page.tsx` | Killed — no replacement |
| `src/app/education/page.tsx` | Killed — no replacement |

---

## Chunk 1: Foundation Layer

### Task 1: Content layer — types and data

**Files:**
- Create: `src/content/case-studies/types.ts`
- Create: `src/content/case-studies/placeholder.ts`
- Create: `src/content/case-studies/index.ts`

- [ ] **Step 1: Create the CaseStudy interface**

Create `src/content/case-studies/types.ts`:

```typescript
export interface CaseStudyMetric {
  label: string;
  value: string;
  context?: string;
}

export interface CaseStudyDecision {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  headline: string;
  tags: string[];
  year: string;
  metadata: {
    role: string;
    timeline: string;
    teamSize: string;
  };
  context: string;
  challenge: string;
  decisions: CaseStudyDecision[];
  results: {
    metrics: CaseStudyMetric[];
    qualitative?: string[];
  };
  reflections: string[];
  thumbnail?: string;
}
```

- [ ] **Step 2: Create placeholder case study data**

Create `src/content/case-studies/placeholder.ts` with 2 placeholder case studies. These will be replaced by real content later (Task #6 — UX writing). Use realistic-looking structure but clearly marked as placeholder.

Note: The spec mentions per-slug files (`[slug].ts`), but we consolidate into a single `placeholder.ts` for simplicity while there are only 2 case studies. This can be split into per-file when content grows.

Export names must match the barrel import in Step 3: `placeholderCaseStudy1` and `placeholderCaseStudy2`.

Each placeholder should have:
- A `slug` (URL-safe identifier)
- A problem-framed `headline` (not a company name)
- Realistic `tags`, `year`, `metadata`
- All text fields prefixed with "Placeholder —" to make it obvious they need replacing
- At least 2 decisions, 2 metrics, and 2 reflections per case study

- [ ] **Step 3: Create barrel export with helper functions**

Create `src/content/case-studies/index.ts`:

```typescript
import type { CaseStudy } from './types';
import { placeholderCaseStudy1, placeholderCaseStudy2 } from './placeholder';

export type { CaseStudy, CaseStudyDecision, CaseStudyMetric } from './types';

const caseStudies: CaseStudy[] = [
  placeholderCaseStudy1,
  placeholderCaseStudy2,
];

export const getAllCaseStudies = (): CaseStudy[] => caseStudies;

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getAllCaseSlugs = (): string[] =>
  caseStudies.map((cs) => cs.slug);
```

Note: Arrow function exports match codebase convention (see `sitemap.ts`, `layout.tsx`).

- [ ] **Step 4: Verify TypeScript compiles**

Run: `bunx tsc --noEmit`
Expected: No errors related to content files.

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: add content layer with case study types and placeholder data"
```

---

### Task 2: Scroll reveal hook and component

**Files:**
- Create: `src/hooks/use-scroll-reveal.ts`
- Create: `src/components/shared/scroll-reveal.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add animation keyframes to globals.css**

Add at the end of `src/app/globals.css`:

```css
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-reveal-up {
  animation: reveal-up 0.6s ease-out forwards;
}
```

- [ ] **Step 2: Create the IntersectionObserver hook**

Create `src/hooks/use-scroll-reveal.ts` — a `'use client'` hook that:
- Uses `useRef<HTMLDivElement>` + `useState(false)` for visibility
- Checks `prefers-reduced-motion` — if true, set visible immediately
- Creates IntersectionObserver with configurable `threshold` (default 0.1)
- Unobserves element after it becomes visible (one-shot reveal)
- Returns `{ ref, isVisible }`

- [ ] **Step 3: Create the ScrollReveal wrapper component**

Create `src/components/shared/scroll-reveal.tsx` — a `'use client'` component that:
- Accepts `children`, `className`, and optional `delay` (CSS animation-delay string)
- Uses `useScrollReveal` hook
- Renders children in a div with `opacity-0` by default
- Adds `animate-reveal-up` class when visible
- Applies `animationDelay` via inline style if `delay` prop is provided

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/use-scroll-reveal.ts src/components/shared/scroll-reveal.tsx src/app/globals.css
git commit -m "feat: add scroll reveal animation hook and component"
```

---

### Task 3: Shared components — Navbar

**Files:**
- Create: `src/components/shared/mobile-nav.tsx`
- Create: `src/components/shared/navbar.tsx`

- [ ] **Step 1: Install shadcn sheet component (for mobile drawer)**

Run: `bunx shadcn@latest add sheet`
Expected: Creates `src/components/ui/sheet.tsx`

- [ ] **Step 2: Create mobile nav (client component)**

Create `src/components/shared/mobile-nav.tsx`:
- `'use client'` component using `Sheet` from shadcn
- Uses `usePathname()` from `next/navigation` for active state
- Nav items: `Approach` → `/approach`, `Work` → `/#work`
- CTA button: `Let's Talk` → `/#contact`
- Trigger: `Button variant="ghost" size="icon"` with `Menu` icon from lucide
- Hidden on `md:` and above (`md:hidden` on trigger)
- `SheetTitle` with `sr-only` for accessibility

- [ ] **Step 3: Create navbar (server component with client children)**

Create `src/components/shared/navbar.tsx`:
- Server component (no `'use client'`)
- Fixed position: `fixed top-0 left-0 right-0 z-50`
- Blurred background: `bg-background/80 backdrop-blur-sm border-b border-border/40`
- Max-width container matching layout: `max-w-(--breakpoint-lg) mx-auto`
- Height: `h-14`
- Left: logo/name link to `/` (`text-sm font-semibold tracking-tight`)
- Right (desktop, `hidden md:flex`): Approach link, Work link, Let's Talk button, ThemeToggle (default import from `@/components/ui/theme-toggle`)
- Right (mobile, `md:hidden`): ThemeToggle + MobileNav
- Links use `text-sm text-muted-foreground hover:text-foreground transition-colors`
- "Let's Talk" as `Button size="sm"` linking to `/#contact`

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/navbar.tsx src/components/shared/mobile-nav.tsx src/components/ui/sheet.tsx
git commit -m "feat: add new navbar with mobile hamburger menu"
```

---

### Task 4: Shared components — Footer and CTA

**Files:**
- Create: `src/components/shared/footer.tsx`
- Create: `src/components/shared/cta-section.tsx`

- [ ] **Step 1: Create CTA section component**

Create `src/components/shared/cta-section.tsx`:
- `id="contact"` for anchor linking
- Centered, `py-24`, `max-w-xl mx-auto`
- H2: "Let's talk." (`text-2xl sm:text-3xl font-bold`)
- Placeholder copy paragraph (marked for copywriting pass)
- 3 social buttons: GitHub + LinkedIn (outline icon buttons) + Email (primary button with Mail icon + "Get in touch" text)
- Uses `Button asChild` wrapping `<a>` tags (not `Link` — `<a>` is correct for external URLs, intentional correction from current codebase which incorrectly uses `Link` for external links)
- `sr-only` labels on icon-only buttons

- [ ] **Step 2: Create footer component**

Create `src/components/shared/footer.tsx`:
- `border-t border-border py-8`
- Max-width container matching layout
- Flex row on `sm:`, column on mobile
- Left: "Jakarta, ID" + "Open to opportunities" (text-sm text-muted-foreground)
- Center: social icon links (GitHub, LinkedIn, Mail) — small (size-4), muted color with hover
- Right: copyright with dynamic year
- All external links have `sr-only` labels

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/cta-section.tsx src/components/shared/footer.tsx
git commit -m "feat: add CTA section and footer shared components"
```

---

## Chunk 2: Landing Page

### Task 5: Landing page section components

**Files:**
- Create: `src/components/landing/hero.tsx`
- Create: `src/components/landing/what-i-bring.tsx`
- Create: `src/components/landing/featured-work.tsx`
- Create: `src/components/landing/approach-teaser.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/landing/hero.tsx`:
- `py-24 sm:py-32 text-center`
- Availability badge using `Badge variant="secondary"`: "Open to opportunities · 2026"
- H1: "Fahrul Alwan" (`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight`)
- One-liner paragraph (placeholder, marked for copywriting pass): `text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto`
- 3 social icon buttons: GitHub, LinkedIn, Email — `Button variant="outline" size="icon" asChild`
- No profile photo, no job title

- [ ] **Step 2: Create What I Bring component**

Create `src/components/landing/what-i-bring.tsx`:
- `py-16 text-center`, `max-w-2xl mx-auto`
- 2 paragraphs: value proposition (text-lg) + experience context (text-muted-foreground)
- All copy placeholder, marked for copywriting pass

- [ ] **Step 3: Create Featured Work component**

Create `src/components/landing/featured-work.tsx`:
- `id="work"` for anchor linking
- H2: "Selected Work"
- Imports `getAllCaseStudies` from `@/content/case-studies`
- Grid: `grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto`
- Each card: `Link` wrapping `Card` with `hover:bg-accent/50 transition-colors`
- Card content: tags (Badge secondary, max 3), headline (CardTitle as h3), first metric, "Read case study" link with ArrowRight icon

- [ ] **Step 4: Create Approach Teaser component**

Create `src/components/landing/approach-teaser.tsx`:
- `py-16 text-center`
- H2: "How I work"
- 4 steps data array: Understand, Frame, Build, Measure — each with label + short description
- Grid: `grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto`
- Each step: numbered (01-04, font-mono), bold label, muted description
- Link to `/approach`: "See my full approach" with ArrowRight icon

- [ ] **Step 5: Verify build**

Run: `bun run build`
Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/landing/
git commit -m "feat: add landing page section components"
```

---

### Task 6: Rewrite landing page

**Files:**
- Modify: `src/app/page.tsx` (complete rewrite)

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

Replace entire content. New page:
- Imports: `ScrollReveal`, `Hero`, `WhatIBring`, `FeaturedWork`, `ApproachTeaser`, `CtaSection`
- JSX: Hero (no scroll-reveal, always visible), then each subsequent section wrapped in `ScrollReveal` with staggered `delay` props
- Fragment `<>...</>` as root
- No `'use client'` — server component (client parts are in individual section components)
- Component name: `LandingPage` (intentional rename from `AppPage` — more descriptive)
- No `metadata` export needed — landing page inherits layout default title `'@fahrulalwan'`, which is correct for the homepage
- Default export: `export default LandingPage`

- [ ] **Step 2: Verify dev server**

Run: `bun dev`
Navigate to `http://localhost:3000`
Expected: New landing page renders with all sections. Scroll reveals animate on scroll.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite landing page with narrative scroll layout"
```

---

### Task 7: Update root layout — new nav and footer

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update layout.tsx**

Key changes to `src/app/layout.tsx`:
- Remove imports: `Home` (lucide), `Button`, `Link` (no longer needed in layout — moved to Navbar)
- Add imports: `Navbar` from `@/components/shared/navbar`, `Footer` from `@/components/shared/footer`
- Replace the `<nav className="fixed top-4 left-4 ...">` block with `<Navbar />`
- Replace the `<footer className="border-t ...">` block with `<Footer />`
- Update `<main>` className: change `py-16` to `pt-20 pb-16` (pt-20 clears the fixed h-14 navbar)
- Add JSON-LD Person structured data as a `<script type="application/ld+json">` at the start of `<body>` (inside the layout JSX, before `<Navbar />`). In App Router, you cannot render directly into `<head>` from layout JSX — place it in `<body>`. The content is hardcoded constants (name, url, jobTitle, sameAs), not external input.
- Note: after this step, old pages (/about, /experience, etc.) still exist but are no longer linked from the nav. They become "orphaned" until Task 10 deletes them. This is expected and intentional.

- [ ] **Step 2: Verify dev server**

Run: `bun dev`
Expected: New navbar visible at top (fixed, blurred background). Footer at bottom. All pages still accessible.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update root layout with new navbar and footer"
```

---

## Chunk 3: Approach + Case Study Pages

### Task 8: Approach page

**Files:**
- Create: `src/app/approach/page.tsx`

- [ ] **Step 1: Create approach page**

Create `src/app/approach/page.tsx`:
- `export const metadata: Metadata` with title "Approach", description, and `openGraph` fields (title, description — OG image falls back to root `opengraph-image.jpeg` automatically)
- Accordion for process section is intentionally deferred — simple grid is sufficient for now, can add accordion later during visual polish
- 4 sections, each wrapped in `ScrollReveal`:
  1. Hero: H1 "Approach" + opening line (placeholder)
  2. Origin story: H2 "How I got here" + placeholder paragraphs (3-4 sentences, story-driven)
  3. Philosophy: H2 "What I believe" + 3 belief blocks, each with bold title + muted explanation (all placeholder)
  4. Process: H2 "How I work" + 4 process steps in `grid-cols-1 md:grid-cols-2 gap-8`, each with number (font-mono), title (h3), description
- Process steps data as const array: Understand, Frame, Build, Measure — with placeholder descriptions
- Ends with `<CtaSection />`
- Uses `FC` type, default export

- [ ] **Step 2: Verify page renders**

Run: `bun dev`
Navigate to `http://localhost:3000/approach`
Expected: Approach page renders with all sections.

- [ ] **Step 3: Commit**

```bash
git add src/app/approach/page.tsx
git commit -m "feat: add approach page with philosophy and process sections"
```

---

### Task 9: Case study page components and route

**Files:**
- Create: `src/components/case-study/case-study-header.tsx`
- Create: `src/components/case-study/case-study-content.tsx`
- Create: `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Create case study header component**

Create `src/components/case-study/case-study-header.tsx`:
- Props: `{ caseStudy: CaseStudy }`
- Back link: `← Back` linking to `/#work` (`ArrowLeft` icon, text-sm text-muted-foreground)
- H1: `caseStudy.headline` (`text-3xl sm:text-4xl font-bold tracking-tight`)
- Tags: flex-wrap `Badge variant="secondary"` for each tag
- Metadata row: role, timeline, team, year — flex-wrap, text-sm text-muted-foreground

- [ ] **Step 2: Create case study content component**

Create `src/components/case-study/case-study-content.tsx`:
- Props: `{ caseStudy: CaseStudy }`
- 4 sections in `space-y-16 max-w-3xl`:
  1. **Context & Challenge** — H2 + two paragraphs (context, challenge) in text-muted-foreground
  2. **Key Decisions & Approach** — H2 + Cards for each decision (CardTitle as h3, CardContent with description)
  3. **Results** — H2 + metrics grid (`grid-cols-2 sm:grid-cols-3`) with large value + label + optional context. Plus optional qualitative list.
  4. **Reflections** — H2 + list items with left border-l-2 styling

- [ ] **Step 3: Create dynamic case study page**

Create `src/app/work/[slug]/page.tsx`:
- `generateStaticParams()` using `getAllCaseSlugs()` — returns `{ slug }[]`
- `generateMetadata({ params })` — awaits params, gets case study, returns title, description, and `openGraph` fields (title, description — OG image falls back to root)
- Page component: awaits params, gets case study via `getCaseStudy(slug)`, calls `notFound()` if not found
- Renders: `CaseStudyHeader` + `CaseStudyContent` + `CtaSection`
- Add JSON-LD Article schema as a `<script type="application/ld+json">` at the top of the page JSX, using case study data (headline, datePublished from year, author)
- Note: "Related work" section from spec is intentionally deferred — with only 2 case studies, related work adds no value. Will add when content grows to 3+.
- Note: In Next.js 16, `params` is a Promise — must use `await params` to access `slug`

- [ ] **Step 4: Verify pages render**

Run: `bun dev`
Navigate to `http://localhost:3000/work/legacy-platform-rebuild`
Expected: Case study page renders with header, content sections, and CTA.
Navigate to `http://localhost:3000/work/nonexistent`
Expected: 404 page.

- [ ] **Step 5: Commit**

```bash
git add src/components/case-study/ src/app/work/
git commit -m "feat: add case study page components and dynamic route"
```

---

## Chunk 4: Cleanup & Configuration

### Task 10: Delete old pages

**Files:**
- Delete: `src/app/about/page.tsx`
- Delete: `src/app/experience/page.tsx`
- Delete: `src/app/projects/page.tsx`
- Delete: `src/app/skills/page.tsx`
- Delete: `src/app/education/page.tsx`

- [ ] **Step 1: Delete old page files and their directories**

```bash
rm src/app/about/page.tsx
rm src/app/experience/page.tsx
rm src/app/projects/page.tsx
rm src/app/skills/page.tsx
rm src/app/education/page.tsx
rmdir src/app/about src/app/experience src/app/projects src/app/skills src/app/education
```

- [ ] **Step 2: Verify build still passes**

Run: `bun run build`
Expected: Build succeeds. No broken imports.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old resume-style pages (about, experience, projects, skills, education)"
```

---

### Task 11: Add redirects and update sitemap

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add redirects to next.config.ts**

Add `redirects` async function to the `nextConfig` object:

```typescript
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/approach', permanent: true },
      { source: '/experience', destination: '/', permanent: true },
      { source: '/projects', destination: '/', permanent: true },
      { source: '/skills', destination: '/', permanent: true },
      { source: '/education', destination: '/', permanent: true },
    ];
  },
};
```

Keep existing Sentry wrapping: `export default withSentryConfig(nextConfig, { ... })`.

- [ ] **Step 2: Update sitemap.ts**

Replace `src/app/sitemap.ts`:
- Import `getAllCaseSlugs` from `@/content/case-studies`
- Base URL: `https://fahrulalwan.vercel.app`
- Static routes: `/` (priority 1.0), `/approach` (priority 0.9)
- Dynamic: map case study slugs to `/work/${slug}` entries (priority 0.8, monthly)
- Remove old routes: `/about`, `/experience`, `/projects`, `/skills`, `/education`

- [ ] **Step 3: Verify build + redirects**

Run: `bun run build && bun start`
Test: `curl -I http://localhost:3000/about` — should return 308 redirect to `/approach`
Test: `curl -I http://localhost:3000/skills` — should return 308 redirect to `/`

- [ ] **Step 4: Commit**

```bash
git add next.config.ts src/app/sitemap.ts
git commit -m "feat: add SEO redirects for old routes and update sitemap"
```

---

### Task 12: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update routing section in CLAUDE.md**

Update the Routing section to reflect new routes:
- Change `Routes: /`, `/about`, `/experience`, `/projects`, `/skills`, `/education` to `Routes: /`, `/approach`, `/work/[slug]`
- Note that content data now lives in `src/content/` instead of inline in page components

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with new route structure"
```

---

### Task 13: Lint, format, and final verification

**Files:**
- All modified files

- [ ] **Step 1: Run Biome format + lint**

Run: `bunx biome check --write .`
Expected: All files formatted and lint-clean.

- [ ] **Step 2: Run ESLint**

Run: `bun run lint`
Expected: No errors.

- [ ] **Step 3: Run TypeScript check**

Run: `bunx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 4: Run production build**

Run: `bun run build`
Expected: Build succeeds with no warnings. All pages statically generated.

- [ ] **Step 5: Manual smoke test**

Run: `bun start`
Check:
- `http://localhost:3000` — landing page with all sections
- `http://localhost:3000/approach` — approach page
- `http://localhost:3000/work/legacy-platform-rebuild` — case study page
- `http://localhost:3000/work/nonexistent` — 404 page
- `http://localhost:3000/about` — redirects to `/approach`
- `http://localhost:3000/skills` — redirects to `/`
- Dark mode toggle works on all pages
- Mobile responsive (resize browser to 375px width)
- Scroll reveal animations trigger on scroll
- Navigation links work correctly on all pages

- [ ] **Step 6: Commit any remaining fixes**

```bash
git add -A
git commit -m "chore: lint, format, and fix any remaining issues"
```

---

## Summary

| Chunk | Tasks | Est. Steps |
|---|---|---|
| 1: Foundation | Tasks 1-4 (content, scroll-reveal, navbar, footer+CTA) | 18 steps |
| 2: Landing | Tasks 5-7 (section components, page rewrite, layout update) | 9 steps |
| 3: Pages | Tasks 8-9 (approach page, case study page) | 8 steps |
| 4: Cleanup | Tasks 10-13 (delete old, redirects+sitemap, update CLAUDE.md, lint+verify) | 13 steps |
| **Total** | **13 tasks** | **48 steps** |

### Post-Implementation (Pending)

These are tracked separately and not blocking the structural refactor:

1. **UX writing & copywriting** (Task #6 from brainstorming) — invoke `copywriting`, `marketing-psychology`, `product-marketing-context` skills
2. **Case study content** — Fahrul writes raw stories, then refine together
3. **Visual polish** — color palette, typography scale, spacing refinements
4. **Animation polish** — fine-tune scroll reveal timing and effects

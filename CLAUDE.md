# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for an engineering lead, built with Next.js 16 App Router, React 19, and TypeScript. Editorial design system with manifesto-style approach page. Deployed on Vercel.

## Commands

```bash
bun dev          # Start dev server with Turbo mode
bun run build    # Production build
bun run lint     # ESLint (next/core-web-vitals + next/typescript)
bun start        # Start production server
bunx biome check --write .  # Format + lint with Biome (no npm script defined)
```

No test suite is configured. The project uses CodeQL via GitHub Actions for security scanning.

## Architecture

- **Framework**: Next.js 16 App Router with React 19
- **Package manager**: Bun
- **Styling**: Tailwind CSS 4 with CSS variables (HSL), dark mode via `next-themes` (default: dark)
- **UI components**: shadcn/ui (New York style, zinc base color) with Radix UI primitives
- **Icons**: `lucide-react`
- **Component variants**: class-variance-authority (CVA)
- **Class merging**: `cn()` utility from `@/lib/utils` (clsx + tailwind-merge)
- **Monitoring**: Sentry (tunneled through `/monitoring` route), Vercel Analytics + Speed Insights

### Routing

All pages are under `src/app/` using App Router conventions. Routes: `/`, `/approach`, `/work/[slug]`.

Old routes (`/about`, `/experience`, `/projects`, `/skills`, `/education`) are permanently redirected via `next.config.ts`.

Content data lives in `src/content/` as typed TypeScript files. Case study data is in `src/content/case-studies/`.

### Component Structure

```
src/components/
├── ui/           → shadcn/ui primitives (Sheet, etc.)
├── shared/       → Cross-page components (Navbar, Footer, CTA, ScrollReveal, MobileNav)
├── landing/      → Landing page sections (Hero, WhatIBring, FeaturedWork, ApproachTeaser)
└── case-study/   → Case study page components (CaseStudyHeader, CaseStudyContent)
```

### Content Layer

Case studies are typed TypeScript files in `src/content/case-studies/`:
- `types.ts` — `CaseStudy` interface (includes optional `thumbnail` field)
- `caready.ts` — CarEADY auction platform case study
- `index.ts` — Barrel export + helpers: `getAllCaseStudies()`, `getCaseStudy(slug)`, `getAllCaseSlugs()`

To add a new case study: create a new `.ts` file with a `CaseStudy` export, import it in `index.ts` and add to the `caseStudies` array. The `/work/[slug]` route and sitemap auto-update via `generateStaticParams`.

### Design System

**Fonts:**
- `Noto Sans` (body, `--font-noto`, `font-sans`)
- `Newsreader` (display/serif, `--font-newsreader`, `font-display`) — used for headlines, statements, editorial moments

**Colors:**
- Semantic tokens (light/dark): `--background`, `--foreground`, `--muted`, `--border`, etc.
- Accent warm: `hsl(21 90% 48%)` — orange, used sparingly on key words only via `text-accent-warm`

**CSS utilities** (defined in `globals.css`):
- `.full-bleed` — breaks out of container to viewport width (`width: 100vw; margin-left: calc(50% - 50vw)`)
- `.link-underline` — animated underline on hover (slide-in from left)
- `.animate-reveal-up` — scroll-reveal animation with `cubic-bezier(0.16, 1, 0.3, 1)` easing

**Editorial patterns:**
- Asymmetric grids: `grid-cols-[1fr_2fr]` (mono label left, content right)
- Flipped grids: `grid-cols-[2fr_1fr]` (CTA section)
- Ghost typography: ultra-large text at 4% opacity as visual landmarks
- Full-bleed inverted blocks: `bg-foreground text-background` for visual punctuation
- Hairline separators: `w-10 h-px bg-border/50`

### Page Architecture

**Landing page** — 5 sections with varied rhythms:
1. Hero (left-aligned, serif headline)
2. WhatIBring (`[1fr_2fr]` asymmetric grid)
3. FeaturedWork (list with background numbers)
4. ApproachTeaser (centered statement)
5. CTA (`[2fr_1fr]` flipped grid, full-bleed inverted)

**Approach page** — manifesto-style, no section labels. Continuous flow with ghost typography, inverted block, and inline closing CTA. No `CtaSection` component.

**Case study pages** — editorial layout with asymmetric grids, full-bleed inverted results section, team photo via `thumbnail` field, inline closing CTA.

### Animations

Scroll-reveal system using `IntersectionObserver` + CSS keyframes (no Framer Motion):
- `src/hooks/use-scroll-reveal.ts` — Client hook, respects `prefers-reduced-motion`
- `src/components/shared/scroll-reveal.tsx` — Wrapper component with optional `delay` prop
- `src/app/globals.css` — `@keyframes reveal-up` with golden easing

### SEO

- JSON-LD `Person` schema in root layout (`jobTitle: "Frontend Engineering Lead"`), `Article` schema on case study pages
- `viewport` export separate from `metadata` (Next.js 14+ requirement)
- Redirects for old routes in `next.config.ts` (HTTP 308)
- Dynamic sitemap in `src/app/sitemap.ts` includes case study slugs

### Theming

Two CSS files define the design token system:
- `src/app/globals.css` — Tailwind import, light mode variables, `@theme inline` block, base layer styles, utility classes
- `src/app/theme.css` — Dark mode overrides (imported separately in root layout)

Both files use raw HSL values in CSS custom properties. The `@theme inline` block in `globals.css` bridges CSS vars to Tailwind colors (e.g., `--color-accent-warm: var(--accent-warm)`).

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json). Use `@/components/ui`, `@/lib/utils`, etc.

## Code Conventions

- **Formatting**: Biome — single quotes, space indentation, organize imports
- **Linting**: ESLint 9 flat config extending `next/core-web-vitals` and `next/typescript`
- **TypeScript**: Strict mode enabled
- **shadcn/ui**: Add components via `bunx shadcn@latest add <component>` — they go to `src/components/ui/`
- **Fonts**: Noto Sans (body) + Newsreader (display), loaded in root layout
- **Links**: Use `<a>` tags for external URLs, `Link` from next/link for internal. Navbar CTA is a styled text link, not a Button component.

## Gotchas

- **Biome CSS errors**: `bunx biome check` always reports ~7 parse errors in `globals.css` due to Tailwind-specific syntax (`@theme inline`, `@layer`). These are expected and harmless.
- **Next.js 16 params**: `params` in `page.tsx` and `generateMetadata` is a `Promise` — must use `const { slug } = await params`.
- **JSON-LD**: Uses `dangerouslySetInnerHTML` with hardcoded constants — requires biome-ignore comment on the prop line.
- **Full-bleed + container**: Full-bleed sections need internal container (`max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4`) for content alignment.
- **Accent-warm usage**: Use sparingly — only on 1-2 key words per page to maintain impact.
- **Light mode**: All elements use semantic tokens that auto-flip. `bg-muted/50` (not `/20`) for subtle bg shifts to ensure visibility in light mode.

## Git Workflow

- Do not commit without explicit user approval
- Use feature branches for changes — do not push directly to main
- Do not include any AI attribution in commits or PRs

## Project Context

- Product marketing context: `.agents/product-marketing-context.md`
- Case study framework: `docs/case-study-framework.md`
- Design specs: `docs/superpowers/specs/`

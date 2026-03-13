# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a frontend engineer, built with Next.js 16 App Router, React 19, and TypeScript. Deployed on Vercel.

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
- **Styling**: Tailwind CSS 4 with CSS variables (HSL), dark mode via `next-themes`
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
├── ui/           → shadcn/ui primitives (Button, Card, Badge, Sheet, etc.)
├── shared/       → Cross-page components (Navbar, Footer, CTA, ScrollReveal, MobileNav)
├── landing/      → Landing page sections (Hero, WhatIBring, FeaturedWork, ApproachTeaser)
└── case-study/   → Case study page components (CaseStudyHeader, CaseStudyContent)
```

### Content Layer

Case studies are typed TypeScript files in `src/content/case-studies/`:
- `types.ts` — `CaseStudy` interface
- `placeholder.ts` — Case study data (replace with real content)
- `index.ts` — Barrel export + helpers: `getAllCaseStudies()`, `getCaseStudy(slug)`, `getAllCaseSlugs()`

To add a new case study: create the data in `placeholder.ts` (or a new file), add it to the `caseStudies` array in `index.ts`. The `/work/[slug]` route and sitemap auto-update via `generateStaticParams`.

### Animations

Scroll-reveal system using `IntersectionObserver` + CSS keyframes (no Framer Motion):
- `src/hooks/use-scroll-reveal.ts` — Client hook, respects `prefers-reduced-motion`
- `src/components/shared/scroll-reveal.tsx` — Wrapper component with optional `delay` prop
- `src/app/globals.css` — `@keyframes reveal-up` with easing `cubic-bezier(0.16, 1, 0.3, 1)`

### SEO

- JSON-LD `Person` schema in root layout, `Article` schema on case study pages
- `viewport` export separate from `metadata` (Next.js 14+ requirement)
- Redirects for old routes in `next.config.ts` (HTTP 308)
- Dynamic sitemap in `src/app/sitemap.ts` includes case study slugs

### Theming

Two CSS files define the design token system:
- `src/app/globals.css` — Tailwind import, light mode variables, `@theme inline` block mapping CSS vars to Tailwind colors, base layer styles
- `src/app/theme.css` — Dark mode overrides (imported separately in root layout)

Both files use raw HSL values in CSS custom properties. The `@theme inline` block in `globals.css` bridges these variables to Tailwind's color system (e.g., `--color-primary: var(--primary)`).

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json). Use `@/components/ui`, `@/lib/utils`, etc.

## Code Conventions

- **Formatting**: Biome — single quotes, space indentation, organize imports
- **Linting**: ESLint 9 flat config extending `next/core-web-vitals` and `next/typescript`
- **TypeScript**: Strict mode enabled
- **shadcn/ui**: Add components via `bunx shadcn@latest add <component>` — they go to `src/components/ui/`
- **Font**: Noto Sans (Google Fonts, loaded in root layout via `--font-noto` CSS variable)

## Gotchas

- **Biome CSS errors**: `bunx biome check` always reports ~7 parse errors in `globals.css` due to Tailwind-specific syntax (`@theme inline`, `@layer`). These are expected and harmless.
- **Next.js 16 params**: `params` in `page.tsx` and `generateMetadata` is a `Promise` — must use `const { slug } = await params`.
- **External links**: Use `<a>` tags (not `Link` from next/link) for external URLs. Wrap with `Button asChild` for styled links.
- **JSON-LD**: Uses `dangerouslySetInnerHTML` with hardcoded constants — requires biome-ignore comment on the prop line.

## Git Workflow

- Do not commit without explicit user approval
- Use feature branches for changes — do not push directly to main
- Do not include any AI attribution in commits or PRs

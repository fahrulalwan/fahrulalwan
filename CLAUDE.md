# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for an engineering lead, built with Next.js 16 App Router, React 19, and TypeScript. Editorial design system, single landing page plus case studies. Deployed on Vercel.

## ⛔ What belongs in this repo

**This repository is public. Branches are public too** — a pushed branch is readable by anyone, so content is exposed the moment it is pushed, not when it merges.

**The rule: this repo carries the constraint. The private project record carries the case.**

A doc here says what the code and copy must obey, written forward-looking. The evidence behind it — how a claim was verified, what was tried and struck, who wrote which commits — lives in the owner's private notes.

**The test, per line:** *does this tell a reader a standard I hold, or does it tell them something about my employer, a collaborator, or a mistake I made?* The second one does not belong here.

**Never in this repo:**

- **Private or NDA-bound repository names**, and any figure derived from one — commit counts, authorship shares, coverage percentages. If a reader cannot open the source, the number does not appear.
- **Collaborator, client or family names**, and anything about their businesses. A third party did not consent to being described on a public surface.
- **Employer internals** — codenames, service names, MR or ticket numbers, headcount, MAU, AUM, incident detail. Only figures the employer has published itself.
- **Commercial or legal status** — unsettled partnerships, unpaid receivables, disputes. Naming your own exposure publicly is a lever handed to someone else.
- **The struck-claim history.** A list of claims that were tried and removed is a public record of having overclaimed. Keep the resulting rule, drop the story.
- **Paths into the private record.** Do not link, name, or describe the location of the vault. A public doc referencing a private one leaks the structure even when the content stays behind.

**Raw case-study drafts are the recurring offender.** They exist precisely to hold unverified claims before they get cut, so they never land here — only the shipped `src/content/case-studies/*.ts` does.

*Split executed 2026-08-09, after the repo's own docs were found carrying a collaborator's commit share, private repo names, and the owner's legal exposure on a public branch. `docs/brand-philosophy.md` and `docs/product-marketing-context.md` were stripped rather than removed; the craft-proof spec and both raw case-study drafts moved out entirely.*

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

- **Framework**: Next.js 16 App Router + React 19 + TypeScript (strict)
- **Package manager**: Bun
- **Styling**: Tailwind CSS 4, CSS variables (HSL), dark mode via `next-themes` (default: dark)
- **UI**: shadcn/ui (New York, zinc) on **Base UI** primitives (`@base-ui/react`) — migrated off Radix 2026-07-23; per-component migration notes in `.migration/`. `lucide-react` icons, CVA variants, `cn()` in `@/lib/utils`
- **Monitoring**: Sentry (tunnel `/monitoring`), Vercel Analytics + Speed Insights

### Routing

All pages are under `src/app/` using App Router conventions. Routes: `/`, `/work/[slug]`.

Old routes (`/about`, `/experience`, `/projects`, `/skills`, `/education`) are permanently redirected via `next.config.ts`.

Content data lives in `src/content/` as typed TypeScript files. Case study data is in `src/content/case-studies/`.

### Component Structure

```
src/components/
├── ui/           → shadcn/ui primitives (Sheet, etc.)
├── shared/       → Cross-page components (Navbar, Footer, CTA, ScrollReveal, MobileNav)
├── landing/      → Landing page sections (Hero, FeaturedWork, OtherThings, Origin)
└── case-study/   → Case study page components (CaseStudyHeader, CaseStudyContent)
```

### Content Layer

Case studies are typed TypeScript files in `src/content/case-studies/`:
- `types.ts` — `CaseStudy` interface (required `availability` field, optional `thumbnail`)
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
- Default to left-aligned + asymmetric. Centered layouts only for manifesto moments — do not center everything.
- Asymmetric grids: `grid-cols-[1fr_2fr]` (mono label left, content right)
- Flipped grids: `grid-cols-[2fr_1fr]` (CTA section)
- Ghost typography: ultra-large text at 4% opacity as visual landmarks
- Full-bleed inverted blocks: `bg-foreground text-background` for visual punctuation
- Hairline separators: `w-10 h-px bg-border/50`

**References:** Design language takes its **restraint** from [milhamakbarjr.com](https://www.milhamakbarjr.com/) (layout carries the design — stock shadcn tokens, untouched; hero dropped to the bottom third of the fold) and [harrygeorge.design](https://www.harrygeorge.design/) (one face, one weight, emphasis by dimming rather than colour). **The editorial serif voice is this site's own — neither reference uses a serif at all.** When adding sections, match their restraint, not generic portfolio aesthetics. Measured DNA for both: `~/.claude/design-taste/library/`.

### Page Architecture

- **Landing** — 4 sections in `src/components/landing/` with varied rhythms (Hero → FeaturedWork → OtherThings → Origin → CTA). Hero folds in the Currently list. A fifth section is specced and blocked on an external sign-off; its slot sits between OtherThings and Origin. Mixes asymmetric grids, mono labels, ghost year, full-bleed inverted CTA.
- **Case study** — editorial layout, asymmetric grids, full-bleed inverted results, team photo via `thumbnail`, inline closing CTA.

### Animations

Scroll-reveal system using `IntersectionObserver` + CSS keyframes (no Framer Motion):
- `src/hooks/use-scroll-reveal.ts` — Client hook, respects `prefers-reduced-motion`
- `src/components/shared/scroll-reveal.tsx` — Wrapper component with optional `delay` prop
- `src/app/globals.css` — `@keyframes reveal-up` with golden easing

### SEO

- JSON-LD `Person` schema in root layout (`jobTitle: "Software Engineering Lead"` — one value across every surface), `Article` schema on case study pages
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
- **shadcn/ui**: ⚠️ `components.json` style is still `new-york` (no `base-new-york` variant exists), so `bunx shadcn@latest add <component>` delivers the **Radix** variant and re-introduces Radix. Either hand-migrate the added component to Base UI via the `migrate-radix-to-base` skill, or copy a Base UI registry component manually. They go to `src/components/ui/`.
- **Fonts**: Noto Sans (body) + Newsreader (display), loaded in root layout
- **Links**: Use `<a>` tags for external URLs, `Link` from next/link for internal. Navbar CTA is a styled text link, not a Button component.

## Gotchas

- **Biome CSS errors**: `bunx biome check` always reports ~7 parse errors in `globals.css` due to Tailwind-specific syntax (`@theme inline`, `@layer`). These are expected and harmless.
- **Next.js 16 params**: `params` in `page.tsx` and `generateMetadata` is a `Promise` — must use `const { slug } = await params`.
- **JSON-LD**: Uses `dangerouslySetInnerHTML` with hardcoded constants — requires biome-ignore comment on the prop line.
- **Full-bleed + container**: Full-bleed sections need internal container (`max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4`) for content alignment.
- **Accent-warm usage**: Use sparingly — only on 1-2 key words per page to maintain impact.
- **Light mode**: All elements use semantic tokens that auto-flip. `bg-muted/50` (not `/20`) for subtle bg shifts to ensure visibility in light mode.
- **Dep pins — do NOT `bun update --latest` blindly** (verified 2026-07-23):
  - `typescript` is on **6.0.3** — the latest **stable** 6.x (the last JS-based line; keeps the compiler API `next build` needs + sits inside typescript-eslint's `<6.1.0` range). Verified typecheck+lint+build green 2026-07-23. It is **not** the `latest` npm tag (that's `7.0.2`) on purpose: **TS7 dropped the JS compiler API `next build` uses → build crash**, its fix `experimental.useTypeScriptCli` is canary-only (not in Next 16.2.x), and TS7 also breaks type-aware lint. `@typescript/native-preview` (tsgo) is installed as a side dev-dep for `tsgo --noEmit` speed if wanted; the build compiler stays on 6.0.x.
  - `eslint` is on **10.x** ✅. eslint 10 removed `context.getFilename()`, which `eslint-plugin-react`'s React-version auto-detection called → crash. Fixed by pinning the version in `eslint.config.mjs`: `{ settings: { react: { version: '19' } } }` (skips auto-detection). Per Next.js issue #89764.
  - Re-check trigger for TS: Next stable ships `experimental.useTypeScriptCli` · typescript-eslint supports TS7. Everything else tracks latest.
- **Base UI vs Radix**: primitives are `@base-ui/react` now. `asChild` is gone — use the `render` prop (`<Trigger render={<Button/>} />`). Menu items highlight via `data-highlighted` not `:focus`; dialog/sheet animate via `data-starting-style`/`data-ending-style` (transition-based, not keyframe). Base UI `Menu.Item` closes on click; `CheckboxItem`/`RadioItem` default `closeOnClick={false}`.

## Content & Copy

User's #1 recurring feedback: reject AI-sounding copy. Before writing or editing any user-facing text, check against these:

- **Humble, not jumawa** — no boasting, no "I built X that serves millions". Show thinking, not titles.
- **Not "terlalu menjual"** — no marketing superlatives ("transformative", "cutting-edge", "passionate"). Editorial voice, not landing-page pitch.
- **Has soul** — concrete detail > abstract claim. Specific anecdote > generic principle. One sharp line > three hedged ones.
- **Offer variants** — when proposing copy, give 2-4 options across tones/POVs. User always asks for variants anyway.
- **Bareksa NDA** — current employer. Do not spill specifics about internal work, architecture, or metrics.
- **CarEADY claims** — ⛔ **do not claim it is still running, still in production, still active at caready.co.id, or that the architecture was never replaced. Do not claim user volume.** Demoted from checkable evidence 2026-07-24: he was a vendor under a consultancy rather than an owner, and the site has since been revamped by other people, so nothing running there today is his. **An early-career story, never a check-it-yourself link.** *(This line previously opened "system still runs at caready.co.id", asserting the very claim it exists to prevent. Corrected 2026-08-05.)*
  - ⛔ **The company is alive and that is exactly why the ban holds.** `caready.co.id` returns 200 and trades as *Balai Lelang Caready* — verified 2026-08-12, and owner-confirmed the same day: the business runs, the platform was revamped, and his code has likely been removed or replaced outright. **A living site is a stronger temptation than a dead one, not a weaker one**, because the link works, so the reader assumes what loads is what he built. The 2018 real-time layer is the claim; the domain is not evidence for it. Site copy stays at *"2018, rebuilt by other people since"* — true, and it points nobody at a page that would mislead them.
- **Bio source of truth** — `docs/product-marketing-context.md` holds positioning, full name (Mohammad Fahrul Alwan), education (BINUS 2018–2022, Magna Cum Laude 3.76), career timeline. Update it when facts shift; do not duplicate here.

## Workflow

Non-trivial features go through brainstorm → spec → plan → implement, using `superpowers` skills:

1. **Brainstorm** (`superpowers:brainstorming`) — clarify intent, explore approaches, present design section-by-section.
2. **Spec** — write to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`, run spec-document-reviewer loop until approved.
3. **Plan** (`superpowers:writing-plans`) — task breakdown in `docs/superpowers/plans/YYYY-MM-DD-<topic>.md`, run plan-reviewer loop.
4. **Implement** — execute plan tasks, update CLAUDE.md when patterns/gotchas emerge.

For small fixes (typos, copy tweaks, dep bumps) skip the loop — just edit and commit.

**Attach relevant skills during implementation** (user rule: "jangan lupa attach skillnya ketika beneran dibutuhkan"):
- Landing/editorial design → `design-with-taste`, `high-end-visual-design`, `redesign-existing-projects` (this site's real stack — editorial restraint, not conversion tactics)
- Component work → `shadcn`, `migrate-radix-to-base` (Radix→Base UI), `tailwindcss-mobile-first`
- Accessibility pass → `accessibility-review`, `web-design-guidelines`
- Copy/marketing → `copywriting`, `marketing-psychology`
- Next.js perf/SEO → `nextjs-seo`, `vercel-react-best-practices`
- ⚠️ **Not** `landing-page-design` (SaaS-conversion: hero-image gen, "Start Free Trial", social-proof logos) — it fights this site's humble/anti-"terlalu menjual" voice. Wrong tool for an editorial portfolio.

**Do not hallucinate.** Verify file paths, API shapes, and claims about existing code before asserting. When uncertain, read the file or grep — don't guess.

## Git Workflow

- Branches: `feat/<topic>`, `fix/<topic>`, `chore/<topic>` (current: `feat/portfolio-refactor`).
- Do not commit without explicit user approval.
- Use feature branches — never push directly to main.
- Do not include AI attribution (Co-Authored-By, "Generated by Claude", etc.) in commits, PRs, or comments.

## Project Context

- Product marketing + bio: `docs/product-marketing-context.md`
- Case study framework: `docs/case-study-framework.md`
- Design specs: `docs/superpowers/specs/`
- Implementation plans: `docs/superpowers/plans/`

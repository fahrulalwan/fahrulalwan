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
bun dev            # Start dev server with Turbo mode
bun run build      # Production build
bun run lint       # ESLint (next/core-web-vitals + next/typescript)
bun run typecheck  # tsc --noEmit
bun start          # Start production server
bunx biome check --write .  # Format + lint with Biome (no npm script defined)
```

No test suite is configured, and there is no test runner to add one to. Two GitHub Actions workflows stand in: CodeQL for security scanning, and a quality gate that builds the site and runs Lighthouse CI against `lighthouserc.json`.

**The quality gate blocks, and it is the only thing here that can fail a change on quality.** Accessibility, SEO, colour contrast, heading order, `html-has-lang`, `meta-viewport` and cumulative layout shift are all asserted at error. Performance and best-practices only warn, deliberately — a score that moves with runner load is a gate people switch off. Run the same assertions locally with `bunx @lhci/cli autorun`.

## Architecture

- **Framework**: Next.js 16 App Router + React 19 + TypeScript (strict)
- **Package manager**: Bun
- **Styling**: Tailwind CSS 4, CSS variables (HSL), dark mode driven by the operating system
  - ⛔ **There is no theme switcher and no `next-themes`.** Dark mode is a `prefers-color-scheme` media query in `theme.css`; nothing writes a class to `<html>`. Do not re-add a toggle, and do not reach for a `.dark` selector — it does not exist. Before this, `defaultTheme="dark"` meant the site *never* followed the OS: a visitor in light mode still got the dark palette.
  - There are **zero `dark:` Tailwind variants** in the codebase. The only four lived in the deleted theme toggle, so no `@custom-variant dark` is defined or needed. Adding a `dark:` utility now would resolve against Tailwind's default `prefers-color-scheme` behaviour, which is correct here — but prefer a token so both themes stay in one place.
- **UI**: shadcn/ui (New York, zinc) on **Base UI** primitives (`@base-ui/react`) — migrated off Radix 2026-07-23; per-component migration notes in `.migration/`. `lucide-react` icons, CVA variants, `cn()` in `@/lib/utils`
- **Monitoring**: Sentry (tunnel `/monitoring`), Vercel Analytics + Speed Insights

### Routing

All pages are under `src/app/` using App Router conventions. Routes: `/`, `/work/[slug]`.

Old routes (`/about`, `/experience`, `/projects`, `/skills`, `/education`) are permanently redirected via `next.config.ts`.

Content data lives in `src/content/` as typed TypeScript files. Case study data is in `src/content/case-studies/`.

### Component Structure

```
src/components/
├── ui/           → shadcn/ui primitives on Base UI: Button, Sheet. That is all of them.
├── shared/       → Cross-page components (Navbar, Footer, CtaSection, MobileNav)
├── landing/      → Landing page sections (Hero, FeaturedWork, Currently, Colophon)
└── case-study/   → Case study page components (CaseStudyHeader, CaseStudyBlocks)
```

**Four components used to be here and are not.** `theme-provider` and `theme-toggle` went with the switcher; `dropdown-menu` existed only to hold that toggle's menu; `card` and `badge` were never imported by anything. `gate-anchor` was a landing section, replaced by the one-line `colophon` — the reasoning is in that file's own comment, and it ends with "do not grow this back into a section."

⛔ **Deleting them is why the JS bundle dropped.** Re-adding a shadcn component is not free: per the note in Code Conventions, `bunx shadcn@latest add` delivers the **Radix** variant and re-introduces Radix alongside Base UI. If a `Card` is genuinely needed later, hand-migrate it or copy from the Base UI registry.

⛔ **The navbar owns the site's only navigation landmark.** It had none at all — the links sat in a bare `div`, so there was no `<nav>` to jump to. The landmark now wraps both the desktop row and the mobile trigger, so a phone is never without one, and the sheet's contents are a `<ul>` rather than a second unlabelled `nav`.

### Content Layer

Case studies are typed TypeScript files in `src/content/case-studies/`:
- `types.ts` — `CaseStudy` interface, and the `Block` union every study body is written in. `summary`, `blocks` and `availability` are all required on purpose: a study cannot be added without one sentence of meta description, a body, and a plain statement of what a stranger can verify about it.
- `blocks.ts` — `groupBlocks`, which runs consecutive blocks of the same kind together so a renderer can draw them as one band, and `assertNever` for exhaustiveness.
- `fartix.ts` · `caready.ts` · `tuntutan-rakyat.ts` — the three studies
- `index.ts` — Barrel export + helpers: `getAllCaseStudies()`, `getCaseStudy(slug)`, `getAllCaseSlugs()`

**The body is a list of blocks, not a set of prose fields.** A study is an ordered `Block[]` drawn from a union — heading, prose, code, image, diagram, trail, metric, quote, review, handoff — and because it is a union rather than a fixed record, two studies can differ in shape entirely: one can run on a dated trail and a code fragment, another on metrics and a quote, and neither has to carry an empty field it has nothing to put in.

Three members currently have renderers and no user: `code`, `diagram` and `image`. They stay because adding a study later should not require a type change.

To add a new case study: create a new `.ts` file with a `CaseStudy` export, import it in `index.ts` and add it to the `caseStudies` array. The `/work/[slug]` route and the sitemap pick it up on their own via `generateStaticParams` — **but the Lighthouse gate does not.** Its URL list in `lighthouserc.json` is written out by hand, so a new study is unaudited until you add its route there too.

### Design System

**Fonts:**
- `Noto Sans` (body, `--font-noto`, `font-sans`)
- `Newsreader` (display/serif, `--font-newsreader`, `font-display`) — used for headlines, statements, editorial moments

**Colors:**
- Semantic tokens (light/dark): `--background`, `--foreground`, `--muted`, `--border`, etc. Each carries its measured contrast ratio in a comment — keep that up to date, because the gate asserts contrast at error.
- Signal: `--signal` (`hsl(192 88% 28%)`, teal) via `text-signal`, and `--signal-inverted` for use on the inverted block. It appears only where it carries information, never as decoration.
- ⚠️ **`--accent` is not the signal colour.** It is shadcn's neutral hover surface and reads as a near-grey. `globals.css` says so at the token, because the name invites exactly this mistake.

**CSS utilities** (defined in `globals.css`):
- `.full-bleed` — breaks out of container to viewport width (`width: 100vw; margin-left: calc(50% - 50vw)`)
- `.link-underline` — animated underline on hover (slides in from the left on transform, never width)
- `.animate-terminal-blink` — the footer cursor, and the only animation in the codebase. Reduced motion is handled centrally in a `prefers-reduced-motion` media query rather than a `motion-reduce:` variant at each call site, so it holds wherever the utility is used.

**Editorial patterns:**
- Default to left-aligned + asymmetric. Centered layouts only for manifesto moments — do not center everything.
- Asymmetric grids: `grid-cols-[1fr_2fr]` (mono label left, content right)
- Flipped grids: `grid-cols-[2fr_1fr]` (CTA section)
- Ghost typography: ultra-large text at 4% opacity as visual landmarks
- Full-bleed inverted blocks: `bg-foreground text-background` for visual punctuation
- Hairline separators: `w-10 h-px bg-border/50`

**References:** Design language takes its **restraint** from [milhamakbarjr.com](https://www.milhamakbarjr.com/) (layout carries the design — stock shadcn tokens, untouched; hero dropped to the bottom third of the fold) and [harrygeorge.design](https://www.harrygeorge.design/) (one face, one weight, emphasis by dimming rather than colour). **The editorial serif voice is this site's own — neither reference uses a serif at all.** When adding sections, match their restraint, not generic portfolio aesthetics. Measured DNA for both: `~/.claude/design-taste/library/`.

### Page Architecture

- **Landing** — `page.tsx` renders Hero → FeaturedWork → GateAnchor → Currently → CtaSection, with varied rhythms. `Currently` is its own section rather than part of Hero, so the opening ends on one screen and the first openable link arrives earlier in the page. A further section is specced and blocked on a sign-off from outside this project; its slot is marked in `page.tsx` directly after FeaturedWork, and it drops in without rearranging anything around it. Mixes asymmetric grids, mono labels, ghost year, full-bleed inverted CTA.
- **Case study** — editorial layout, asymmetric grids, full-bleed inverted results, inline closing CTA. The body renders through `CaseStudyBlocks`. Images are possible but none of the three studies uses one: the union's `image` block carries its own `alt` per image, which is what the old single hard-coded alt string could not do.

### SEO

- JSON-LD `Person` schema in root layout (`jobTitle: "Software Engineering Lead"` — one value across every surface), `Article` schema on case study pages
- `viewport` export separate from `metadata` (Next.js 14+ requirement)
- Redirects for old routes in `next.config.ts` (HTTP 308)
- Dynamic sitemap in `src/app/sitemap.ts` includes case study slugs

### Theming

Two CSS files define the design token system:
- `src/app/globals.css` — Tailwind import, light mode variables, `@theme inline` block, base layer styles, utility classes
- `src/app/theme.css` — Dark mode overrides, inside `@media screen and (prefers-color-scheme: dark)` on `:root` (imported separately in root layout)

Both files use raw HSL values in CSS custom properties. The `@theme inline` block in `globals.css` bridges CSS vars to Tailwind colors (e.g. `--color-signal: var(--signal)`), the type ramp, the font stacks, and the layer scale (`z-sticky`, `z-overlay`, `z-popover`, `z-skip` — use those, not `z-[var(--z-sticky)]`).

⛔ **`screen and` on the dark block is load-bearing, not decoration.** Those tokens used to sit on a bare `.dark` class with no media query, so they also applied when printing — and because `theme.css` is imported *after* `globals.css`, they beat the `@media print` block at equal specificity. Every printed page came out graphite-on-white regardless of the reader's scheme. Verified before and after: print now yields `#fff` / `#000` in both schemes. Do not remove the `screen and`, and do not reorder the imports to "fix" something.

**`color-scheme: light dark` is declared on `:root` in `globals.css`.** `next-themes` used to set it as an inline style on `<html>`; nothing does now, so it is declared once in CSS. It is what makes scrollbars, form controls, and the overscroll canvas match the active scheme.

**`global-error.tsx` follows the OS for free now.** It has no provider and never could get a `.dark` class, so its comment recorded an accepted tradeoff: a branded light page on a crash. Moving the tokens into a media query retired the tradeoff instead of paying it.

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
- ⛔ **Agent worktrees are gitignored, and that is a build correctness fix rather than tidiness.** `.claude/worktrees/` was untracked but *not* ignored, which put it inside the reach of two tools that scan the directory rather than the git index. Tailwind 4's automatic content detection generated utilities from those stale copies of the source and **shipped them in the CSS every visitor downloads** — a real selector for a class string that no longer existed anywhere in `src/`. Measured: ignoring the directory took the built CSS from 48.9 KB to 44.0 KB raw. It also stopped `biome check .` aborting on the nested `biome.json` each worktree carries. If a scan ever picks up dead classes again, this is the shape of the cause.
- **Next.js 16 params**: `params` in `page.tsx` and `generateMetadata` is a `Promise` — must use `const { slug } = await params`.
- **JSON-LD**: Uses `dangerouslySetInnerHTML` with hardcoded constants — requires biome-ignore comment on the prop line.
- **Full-bleed + container**: Full-bleed sections need internal container (`max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4`) for content alignment.
- **Signal colour usage**: Use sparingly, and only where it carries information rather than decorates. Reach for `text-signal`, not `text-accent` — `--accent` is shadcn's neutral hover surface and will render a near-grey where you expected teal.
- **Light mode**: All elements use semantic tokens that auto-flip. `bg-muted/50` (not `/20`) for subtle bg shifts to ensure visibility in light mode.
- **Dep pins — do NOT `bun update --latest` blindly** (verified 2026-07-23):
  - `typescript` is on **6.0.3** — the latest **stable** 6.x (the last JS-based line; keeps the compiler API `next build` needs + sits inside typescript-eslint's `<6.1.0` range). Verified typecheck+lint+build green 2026-07-23. It is **not** the `latest` npm tag (that's `7.0.2`) on purpose: **TS7 dropped the JS compiler API `next build` uses → build crash**, its fix `experimental.useTypeScriptCli` is canary-only (not in Next 16.2.x), and TS7 also breaks type-aware lint. `@typescript/native-preview` (tsgo) is installed as a side dev-dep for `tsgo --noEmit` speed if wanted; the build compiler stays on 6.0.x.
  - `eslint` is on **10.x** ✅. eslint 10 removed `context.getFilename()`, which `eslint-plugin-react`'s React-version auto-detection called → crash. Fixed by pinning the version in `eslint.config.mjs`: `{ settings: { react: { version: '19' } } }` (skips auto-detection). Per Next.js issue #89764.
  - Re-check trigger for TS: Next stable ships `experimental.useTypeScriptCli` · typescript-eslint supports TS7. Everything else tracks latest.
  - ⛔ **Re-checked 2026-08-26 and the two gates now disagree — one is open, one is shut, and the pin holds on the second alone.** The line above says the `useTypeScriptCli` fix is canary-only; **that is out of date.** It ships in stable **Next 16.3.3** — `grep useTypeScriptCli node_modules/next/dist/server/config-schema.js` finds it in the validated config. **The blocker is now entirely typescript-eslint:** version 8.68.0, its parser and `typescript-estree` all declare `"typescript": ">=4.8.4 <6.1.0"`, so TS 7.0.2 falls outside the peer range and type-aware lint breaks. Do not read "the Next gate opened" as permission to bump; check the peer range first, and re-verify both rather than trusting either of these paragraphs.
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
- **Bio source of truth** — the marketing-context document, which **moved to the owner's private vault on 2026-08-25** and is no longer readable from this repo. It holds positioning, full name (Mohammad Fahrul Alwan), education (BINUS 2018–2022, Magna Cum Laude 3.76) and the career timeline. **Ask him rather than reconstructing any of it**, and do not copy it back here.

## Workflow

⛔ **Generated documents do not go in this repo. They go in the owner's private project vault.** Owner directive, 2026-08-25: *"never put any document into repo, only in project vault."*

That means specs, plans, drafts, research, audits and design notes — anything written **about** the work rather than shipped **as** the work. **This repository is public, and a pushed branch is readable immediately**, so the rule is a disclosure boundary before it is a filing preference. What belongs here is code, and the instruction files a contributor needs to work in it: this `CLAUDE.md`, the `README`, and the authoring rules a case study must obey.

⚠️ **Steps 2 and 3 below used to name `docs/superpowers/specs/` and `docs/superpowers/plans/`, and that instruction is what put a plan in this repo on 2026-08-25.** It is corrected rather than deleted, so nobody restores it from memory. The routing that governs is `~/.claude/rules/superpowers-output.md`, which has always sent both to the vault; this file was overriding it.

Non-trivial features go through brainstorm → spec → plan → implement, using `superpowers` skills:

1. **Brainstorm** (`superpowers:brainstorming`) — clarify intent, explore approaches, present design section-by-section.
2. **Spec** — written to the project's vault folder, then reviewed through the three-phase pipeline until it carries a `review-closure:` line.
3. **Plan** (`superpowers:writing-plans`) — task breakdown, also in the vault, then run through the plan-review pipeline. An executor reads it from there and writes only code.
4. **Implement** — execute plan tasks, update this file when patterns or gotchas emerge.

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

⛔ **There is no `docs/` directory. It was emptied on 2026-08-25 and the folder removed.** All eleven documents — the brand philosophy, the case-study framework, the marketing context, the skills list, and seven superseded specs and plans — moved to the owner's private project vault under the directive in § Workflow. **This repo holds code and this file. Nothing else.**

**What that costs, said plainly rather than discovered later:** the case-study authoring rules and the bio facts are no longer readable from inside this repo. An agent working here has them only if the owner is in the session, which he normally is. **A contributor who is not him cannot write a case study from this repo alone**, and that is the accepted trade.

**If you are looking for something that used to be in `docs/`:** ask the owner. Do not reconstruct it from the code, and do not re-create it here.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

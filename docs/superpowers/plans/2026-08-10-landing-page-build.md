# Landing page build — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the four landing-page sections whose copy is locked, retire `/approach`, and generate the link-preview card from code.

**Architecture:** The page is composed in `src/app/page.tsx` from one component per section. Section copy lives inside its own component; case-study data stays in `src/content/case-studies/`. One new shared module exports the site URL so no address is written twice in application code. No new dependencies.

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript strict · Tailwind 4 · Biome + ESLint 9 · Lighthouse CI.

*Rewritten 2026-08-10 after a Phase 1 review returned REWORK. The changes are recorded in § What the review changed, at the foot of this file, so a later reader can see which decisions were re-derived rather than inherited.*

## Global Constraints

- **⛔ There is no test suite in this project and this plan does not add one.** Verification per task is: `bun run lint` and `bun run build` both no worse than the recorded baseline, and the page renders correctly. Tasks that change what a reader sees end with a visual check, not an assertion.
- **⛔ Recorded baseline, measured on this branch at `06ad3b4`:** `bun run lint` = **0 errors, 1 warning** (`'Image' is defined but never used`, `what-i-bring.tsx:1` — cleared when Task 7 deletes that file). `bun run build` = **clean, 14 static pages**. "No new errors" means against these numbers, not against an assumption.
- **⛔ Every verification grep in this plan uses `git grep -n` with NO path filter.** Path-scoped greps are what let three defects survive the previous draft: `lighthouserc.json` and `CLAUDE.md` both reference `/approach`, and `README.md` holds the site URL. All three are invisible to `rg … src/`.
- **⛔ Every URL in application code comes from `SITE_URL`** (Task 1). **`README.md` is the one deliberate exception** — it renders as the GitHub profile page and cannot import a constant, so its copy of the address is a manual site and is named as such rather than claimed away.
- **Copy is locked and is reproduced verbatim below.** It comes from `docs/superpowers/specs/2026-07-23-information-architecture-design.md` § Final copy. **Do not improve it while implementing.** If a line looks wrong, stop and raise it.
- **No em-dashes in copy this plan writes.** ⚠️ Six em-dashes already exist in published case-study copy (`caready.ts` ×5, `fartix.ts:54`). This plan does not touch those files and does not clear them; the spec logs them as Open and that is where they stay. **The constraint is scoped to new copy, not asserted over the site.**
- **External links open in a new tab** with `target="_blank" rel="noopener noreferrer"`. A verification page that navigates the reader away has lost them.
- **The existing `ScrollReveal` wrapper and its stagger delays stay**, with a print and no-JS fallback added in Task 7. ⚠️ **Open conflict, surfaced not resolved:** `2026-07-23-design-system-design.md:294` bans "universal scroll-fade-up" on its anti-tell list, and this page wraps four of five sections in exactly that. Pre-existing. It needs a ruling, and a build plan is the wrong place to make it.
- **⛔ A fifth section is specified and is NOT in this plan.** It is blocked on a sign-off from someone outside this project. `page.tsx` is composed so it drops in between sections 2 and 4 later without rearranging anything.

---

## File structure

**Create**
- `src/lib/site.ts` — the single exported site URL, and nothing else.
- `src/app/robots.ts` — replaces the static `robots.txt`, which cannot import.
- `src/components/landing/other-things.tsx` — the short list under section 2.
- `src/components/landing/origin.tsx` — section 4. Replaces `what-i-bring.tsx`.
- `src/app/opengraph-image.tsx` — the generated preview card.

**Modify**
- `src/content/case-studies/types.ts` — add the `availability` field.
- `src/content/case-studies/{fartix,coverage-ratchet,caready}.ts` — populate it.
- `src/components/landing/featured-work.tsx` — heading, availability line, external link.
- `src/components/landing/hero.tsx` — new opening, facts strip, currently list folded in.
- `src/components/shared/scroll-reveal.tsx` · `src/app/globals.css` · `src/app/layout.tsx` — the print / no-JS reveal fallback.
- `src/app/page.tsx` — section composition.
- `src/app/layout.tsx` · `src/app/sitemap.ts` — consume `SITE_URL`; drop `/approach`.
- `src/components/shared/{navbar,mobile-nav}.tsx` — drop the `/approach` link.
- `next.config.ts` — redirects.
- `lighthouserc.json` — drop the `/approach` audit target.
- `CLAUDE.md` — seven stale lines, listed in Task 8.
- `docs/case-study-framework.md:51-79` — it duplicates the `CaseStudy` interface and claims to match it.
- `docs/product-marketing-context.md:161` — the hero sub-line, which CLAUDE.md calls the bio source of truth.

**Delete**
- `src/app/robots.txt`
- `src/app/approach/page.tsx`
- `src/components/landing/{approach-teaser,currently,what-i-bring}.tsx`
- `src/app/opengraph-image.jpeg` · `src/app/opengraph-image.alt.txt`
- `src/app/twitter-image.jpeg` · `src/app/twitter-image.alt.txt`

⛔ **The four static preview files are not optional cleanup.** Both `.alt.txt` files currently publish `Mohammad Fahrul Alwan, Senior Frontend Engineer and a Tech Lead` into live `og:image:alt` and `twitter:image:alt`. The spec's done-list (`:135`) already requires no static jpeg to remain; the alt files were missed because they are not images and match no image glob.

---

## Task order, and why it is what it is

⛔ **`src/app/page.tsx:1,2,5` import `ApproachTeaser`, `Currently` and `WhatIBring`.** Deleting any of them before `page.tsx` is rewritten breaks the build. So: **every new component is created first, `page.tsx` is rewritten and the four old components are deleted in the same task, and `/approach` is retired only after nothing imports it.** Each task ends on a tree that builds.

1. Site URL constant · 2. Availability data · 3. Section 2 · 4. Short list · 5. Section 1 · 6. Section 4 · **7. Compose + delete** · 8. Retire `/approach` · 9. Preview card · 10. Verify.

---

### Task 1: The site URL constant

**Files:**
- Create: `src/lib/site.ts`, `src/app/robots.ts`
- Modify: `src/app/layout.tsx:42`, `src/app/layout.tsx:103`, `src/app/sitemap.ts:8,16,22`
- Delete: `src/app/robots.txt`

**Interfaces:**
- Produces: `SITE_URL: string` — absolute origin, no trailing slash. Every later task imports this.

- [ ] **Step 1: Create the module**

```ts
// src/lib/site.ts

/**
 * The single source for this site's address in application code.
 *
 * Everything that needs an absolute URL imports this: metadataBase, the
 * JSON-LD, the sitemap, robots, and the preview card. A custom domain was
 * deliberately deferred in August 2026, and this constant is what keeps that
 * deferral cheap.
 *
 * README.md holds the address too and cannot import this — it renders as the
 * GitHub profile page. That copy is a known manual site, not an oversight.
 */
export const SITE_URL = 'https://fahrulalwan.vercel.app';
```

- [ ] **Step 2: Replace the literals in application code**

`layout.tsx:42` → `metadataBase: new URL(SITE_URL),`
`layout.tsx:103` → `url: SITE_URL,`
`sitemap.ts:8` → `` url: `${SITE_URL}/work/${slug}`, ``
`sitemap.ts:16` → `` url: `${SITE_URL}/`, ``
`sitemap.ts:22` → delete this entry entirely (it is the `/approach` route; see Task 8)

- [ ] **Step 3: Convert robots**

`src/app/robots.txt` is static and cannot import. Create `src/app/robots.ts` returning a `MetadataRoute.Robots` whose `sitemap` uses `SITE_URL`, preserving whatever rules the `.txt` holds. Then `git rm src/app/robots.txt`.

- [ ] **Step 4: Verify, unscoped**

```bash
git grep -n 'fahrulalwan\.vercel\.app'
```
Expected: **`src/lib/site.ts` (the definition), `README.md:5`, and the two plan/spec docs.** Any other hit in `src/` is a miss. `README.md` is expected and is covered by the Global Constraint above.

- [ ] **Step 5: Build**

```bash
bun run lint && bun run build
```
Expected: 0 errors, 1 warning, 14 pages. Then confirm the route still serves at `/robots.txt` with an absolute sitemap:

```bash
bun dev & sleep 6
curl -s localhost:3000/robots.txt
kill %1
```

⛔ **`bun dev` blocks.** Every verification in this plan that needs a running server backgrounds it, sleeps, then kills it. Putting `bun dev` and `curl` on consecutive lines hangs the terminal and the second command never runs.

- [ ] **Step 6: Commit**

```bash
git add src/lib/site.ts src/app/robots.ts src/app/layout.tsx src/app/sitemap.ts
git rm src/app/robots.txt
git commit -m "refactor: put the site address behind one constant"
```

---

### Task 2: Case-study availability data

**Files:**
- Modify: `src/content/case-studies/types.ts`, `fartix.ts`, `coverage-ratchet.ts`, `caready.ts`

**Interfaces:**
- Produces: `CaseStudy.availability: { note: string; href?: string }` — consumed by Task 3.

- [ ] **Step 1: Add the field to the type**

```ts
// in src/content/case-studies/types.ts, inside `interface CaseStudy`

  /**
   * What a reader can actually do with this one, said plainly.
   *
   * `note` renders next to the card. `href` is present only when the work is
   * genuinely openable — its absence is the signal that this is described
   * rather than shown, which the page states out loud rather than hiding.
   */
  availability: {
    note: string;
    href?: string;
  };
```

- [ ] **Step 2: Populate all three, verbatim from the spec**

```ts
// fartix.ts
  availability: {
    note: 'still up, still mine',
    href: 'https://fartix.id',
  },

// coverage-ratchet.ts
  availability: {
    note: "private repo, so this one's a description rather than a link",
  },

// caready.ts
  availability: {
    note: '2018, rebuilt by other people since',
  },
```

⛔ **`this one's`, contracted.** The spec (`:188`) locks the contraction and the register note at `:149` is explicitly spoken and humble. The previous draft expanded it silently.

- [ ] **Step 3: Verify the type compiles**

```bash
bun run lint && bun run build
```
Expected: baseline. `availability` is **required** on purpose — a new case study cannot be added without stating what a reader can do with it.

- [ ] **Step 4: Update the doc that duplicates this interface**

`docs/case-study-framework.md:51-79` reproduces all twelve `CaseStudy` fields, and `:49` claims it matches `types.ts`. Adding a required field falsifies that claim the moment this task lands. Add `availability` to the reproduction with its comment.

- [ ] **Step 5: Commit**

```bash
git add src/content/case-studies/ docs/case-study-framework.md
git commit -m "feat: say what a reader can actually open, per case study"
```

---

### Task 3: Section 2 — the work

**Files:**
- Modify: `src/components/landing/featured-work.tsx`

**Interfaces:**
- Consumes: `CaseStudy.availability` (Task 2), `getAllCaseStudies()`.

⛔ **Read this before touching the file.** The previous draft justified deleting the metric tile by saying it *"prints a figure from a private config"*, citing `95 / 90`. **That value no longer exists** — it was removed in `8ffd42d`, before the plan was written. What the three tiles actually hold today:

| Case study | Tile |
|---|---|
| fartix | `9` / "Live match-days" |
| coverage | `8` / "Tracked exceptions, against a plan of 7" |
| caready | `3 roles` / "Kept in sync" |

None is a private-config number. The coverage tile is arguably the **strongest** item on that card — it is the shipped-the-worse-number artifact the case study itself leads with.

**The trade, re-derived, and not on the grounds the first draft gave.** The spec's §2 decision (`:228`) is that each card carries its own status — `live` / `private` / `historical` — because the heading no longer promises checkability and the honesty has to move into the rows. **That is the argument, and it is about what the card must say, not about how many slots it has.** *(The first draft justified it by asserting "the card has one slot under the headline" — a claim about a layout this very task rewrites, which cannot support a decision.)*

The metric and the availability line could coexist. They do not, because a display-type number competing with the status line for the same glance blunts the one thing the section is now for. **The metric is not lost** — `case-study-content.tsx:78-79` maps every metric on `/work/[slug]`, so the number still renders next to its own prose, where a reader who wants it is already reading.

- [ ] **Step 1: Change the heading**

`Selected Work` → `What I've built`

- [ ] **Step 2: Restructure the card so the two links can coexist**

⛔ **Read this before writing any JSX. The obvious fix does not work, and the reason is not obvious.**

Today the whole card is wrapped in `<Link href={/work/${slug}}>`, which renders an `<a>`. Putting the live link inside it nests an `<a>` in an `<a>`, and **an `onClick` with `stopPropagation` does not save it** — the HTML parser un-nests the anchors before any JavaScript runs. Measured on the served markup, with scripting disabled: the card anchor is **split into two**, the content wrapper escapes the link entirely, and "Read case study" ends up inside no link at all. Three cards would ship six anchors to three destinations with duplicated link text.

**And this plan's own Task 10 Step 4.3 requires the page to work with JavaScript disabled.** With no JS there is no hydration, so that mangled parse *is* the page. A handler-based fix would mandate a state in which this task is broken.

**The shape that works — a stretched-link overlay, no JavaScript at all.** The card stops being an anchor; the headline carries the only case-study link and its `::after` covers the card:

```tsx
<article
  key={study.slug}
  className="group relative isolate py-10 -mx-4 px-4 border-t border-border/50 rounded-lg transition-colors duration-300 hover:bg-muted/30 focus-within:bg-muted/30"
>
  {/* -z-10 inside `isolate` paints above the article's own background and below
      the text, which is what `relative z-raised` on the wrapper used to buy. The
      wrapper must now be unpositioned so the stretched ::after below resolves
      against <article> rather than against the wrapper. */}
  <span
    className="absolute top-4 right-4 -z-10 font-display text-ghost text-foreground/[0.04] select-none pointer-events-none transition-colors duration-300 group-hover:text-foreground/[0.06]"
    aria-hidden="true"
  >
    {study.year}
  </span>

  <div>
    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
      {study.tags.slice(0, 3).map((tag) => (
        <span key={tag} className="text-label font-medium text-muted-foreground uppercase">
          {tag}
        </span>
      ))}
      <span className="text-label font-medium text-muted-foreground uppercase">
        &middot; {study.year}
      </span>
    </div>

    {/* The only link to the case study. Its ::after covers the whole card, so the
        card stays one click target without nesting a second <a> inside an <a>. */}
    <h3 className="font-display text-display-l font-medium mb-4 max-w-[22ch] transition-colors duration-300 group-hover:text-signal">
      <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0 after:content-['']">
        {study.headline}
      </Link>
    </h3>

    {/* Sits above the stretched overlay, so it takes its own click. */}
    {study.availability.href ? (
      <a
        href={study.availability.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {study.availability.note}
      </a>
    ) : (
      <span className="text-sm text-muted-foreground">{study.availability.note}</span>
    )}

    <div className="mt-3">
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-[opacity,transform] duration-300">
        Read case study <ArrowRight className="size-4" />
      </span>
    </div>
  </div>
</article>
```

Two things that are easy to miss:

- **`group-focus-visible:` becomes `group-focus-within:`.** Focus now lands on a descendant rather than on the card itself.
- **Do not add `'use client'`.** `featured-work.tsx` is a Server Component and this shape needs no handler, so it stays one. The rejected handler-based version would have dragged `getAllCaseStudies()` and all three case-study objects — every line of prose, every metric, every decision — into the client bundle.

⚠️ The click behaviour and anchor structure above were measured in a browser; the Tailwind class names were not built or lint-checked. Expect to adjust class names, not structure.

- [ ] **Step 3: Verify both link paths by hand, including the negative case**

`bun dev`, then on the landing page:

1. Click the fartix availability line → opens `fartix.id` in a **new tab**, current tab stays put.
2. **Click the empty space immediately to the right of the availability line → navigates to `/work/fartix-ticketing-platform`.** This is the assertion that catches a z-index regression, and it is the one a click-the-link check misses.
3. Click the headline, the tags, the ghost year, and a blank corner → all go to the case study.
4. The other two cards show plain text with no link.
5. Tab through the section: focus reaches the headline and the availability link, the hover affordance appears on focus, and nothing is focusable twice.

- [ ] **Step 4: Confirm the metrics still render where they should**

`bun dev` → open `/work/test-coverage-ratchet` and confirm `8 / Tracked exceptions, against a plan of 7` is present. The landing tile moved; the number did not disappear.

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/featured-work.tsx
git commit -m "feat: put a real link on the work you can actually open"
```

---

### Task 4: The short list

**Files:**
- Create: `src/components/landing/other-things.tsx`

**Interfaces:**
- Produces: default-exported `OtherThings` — consumed by Task 7.

⛔ **HARD ORDERING CONSTRAINT, carried from the spec (`:208`) — the `this site` entry cannot ship before the branch merges.** `origin/main` still holds the February-2025 site and the old badge-and-TOC profile README, so that link points a reader at the thing this rebuild replaces. **Either the link waits, or the page does.** If this section ships before the merge, ship it with two entries and add the third in the merge commit.

- [ ] **Step 1: Create the component**

Follow the section shape used by the existing landing components: `<section className="py-16 sm:py-20 border-t border-border/50">`, a `text-label ... uppercase` heading, then the content.

Heading: `A few other things`

```tsx
const things = [
  {
    name: 'tuntutan-rakyat',
    href: 'https://tuntutanrakyat.space',
    repo: 'https://github.com/fahrulalwan/tuntutan-rakyat',
    note: 'A place to track protest demands during the unrest. Built quickly with a small team I led, and it ended up cited as a resource on bijakmemantau.id.',
  },
  {
    name: 'this site',
    repo: 'https://github.com/fahrulalwan/fahrulalwan',
    note: 'The code behind this page.',
  },
  {
    name: 'ganjil-genap',
    href: 'https://ganjil-genap.vercel.app',
    repo: 'https://github.com/fahrulalwan/ganjil-genap',
    note: "A map for checking Jakarta's odd-even plate rule. Small, and it works.",
  },
];
```

Render `href` as the entry's primary link when present, with `repo` as a secondary `code` link; entries without `href` link straight to `repo`. All external, all new tab.

**Heading levels:** the section heading is `<h2>` and each entry name is `<h3>`. Every other landing section is `<h2>` and `featured-work` uses `<h3>` per card, so this matches. `heading-order` is asserted at `minScore 1` in CI and a skipped level fails it.

⛔ **`ganjil-genap` links its live site for the same reason tuntutan-rakyat does** — *"the link working is the argument."* The first draft applied that test to one entry in the array and not to its sibling.

⛔ **The live site is the primary link for tuntutan-rakyat, and this deviates from the spec's `linking to its repo`.** Recorded rather than swapped silently: the spec's own §2 principle is *"the link working is the argument"*, `tuntutanrakyat.space` is live and is the deployment `bijakmemantau.id/tuntutan-178` actually cites, and a repo link makes the reader do the extra hop to find that out.

⛔ **Never attach a commit count to tuntutan-rakyat.** The repo total is not his personal share. `a small team I led` is the accurate framing and it is already the strongest one.

- [ ] **Step 2: Verify every link resolves**

```bash
for u in https://fartix.id \
         https://tuntutanrakyat.space \
         https://ganjil-genap.vercel.app \
         https://github.com/fahrulalwan/tuntutan-rakyat \
         https://github.com/fahrulalwan/fahrulalwan \
         https://github.com/fahrulalwan/ganjil-genap; do
  printf '%s → ' "$u"; curl -sL --max-time 20 -o /dev/null -w '%{http_code}\n' "$u"
done
```
Expected: all `200`. **`fartix.id` is in this loop deliberately** — it belongs to Task 3, and spec `:129` requires it "checked rather than assumed", but no task was actually checking it by command. Then `bun dev` and **click every one** — a dead link here is worse than no link, because this section's whole point is that these can be opened.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/other-things.tsx
git commit -m "feat: add the smaller things worth opening"
```

*Citation verified 2026-08-10: `bijakmemantau.id/tuntutan-178` ("17+8 Tuntutan Rakyat") links to `tuntutanrakyat.vercel.app/tuntutan`, which 301s to `tuntutanrakyat.space/tuntutan`, the homepage declared on the repo. Both 200.*

---

### Task 5: Section 1 — the opening

**Files:**
- Modify: `src/components/landing/hero.tsx`

**Interfaces:**
- Produces: default-exported `Hero`, unchanged name — Task 7 relies on it.

**Note:** `currently.tsx` is **not** deleted here. Its content is copied into `Hero`; the file dies in Task 7 alongside the `page.tsx` rewrite that still imports it.

- [ ] **Step 1: Fix the eyebrow**

`hero.tsx:11` currently reads `Fahrul Alwan &middot; Jakarta`. The spec (`:151`) locks it to **`Fahrul Alwan`** alone, because the facts strip directly below now carries Jakarta. Drop the `· Jakarta`.

- [ ] **Step 2: Replace the headline and body**

Keep the social links. Replace the `<h1>` and add two paragraphs:

> **I lead a frontend team and I'm still in the code most days.**
>
> I started working straight out of vocational school, pulling fiber into villas in Bali. Took a pay cut to under half my salary along the way. Did the degree at night, and was leading a team of five at twenty-two, nine months before I finished it.
>
> I've only been good at work I actually believed in. That's made some decisions easy and some of them expensive.

The first line is the `<h1>` in `font-display`. The two paragraphs follow in body type.

- [ ] **Step 3: Replace the sub-line with the facts strip**

`Engineering lead · Jakarta` → `Software Engineering Lead · Jakarta · UTC+7 · Currently leading frontend at Bareksa`

- [ ] **Step 4: Fold the currently list in**

Copy the four items from `currently.tsx` into the bottom of `Hero` under a `text-label uppercase` heading `Currently`, keeping the existing hairline-and-item markup. Leave `currently.tsx` on disk.

- [ ] **Step 5: Verify**

`bun dev` → the whole opening reads in one screen on desktop. Check at 375px that nothing overflows.

```bash
git grep -n 'wondering what I was thinking'
```
Expected: no hit in `src/`.

- [ ] **Step 6: Commit**

```bash
git add src/components/landing/hero.tsx
git commit -m "feat: open on what I do now and how I got here"
```

---

### Task 6: Section 4 — how you got here

**Files:**
- Create: `src/components/landing/origin.tsx`

**Interfaces:**
- Produces: default-exported `Origin` — consumed by Task 7.

**Note:** `what-i-bring.tsx` is **not** deleted here. It dies in Task 7.

- [ ] **Step 1: Create it from the existing asymmetric-grid shape**

Reuse `what-i-bring.tsx`'s `grid-cols-[1fr_2fr]` layout — mono label left, content right. **That structure is correct and is not what was wrong with the old section; its copy was.**

Heading: `How I got here`, as an `<h2>` — matching every other landing section. `heading-order` is asserted at `minScore 1` in CI.

Copy, verbatim:

> I came up the long way: vocational school, fiber cable in the field, a help desk, a bootcamp. The degree came at night, after work.

> Code is usually the easy part. Most of what slows projects down is unclear requirements, people politely agreeing to slightly different things, or teams quietly working toward different definitions of done.

- [ ] **Step 2: Wire the photo that already exists**

`public/profile.webp` has been on disk since November 2024 and the old component looked for `/images/profile.jpg`, which does not exist, so it rendered a grey gradient placeholder.

```tsx
<Image
  src="/profile.webp"
  alt="Fahrul Alwan"
  width={144}
  height={176}
  className="w-32 h-40 sm:w-36 sm:h-44 rounded-sm object-cover grayscale"
/>
```

Do not carry over the placeholder `div` or the commented-out block.

- [ ] **Step 3: Verify**

`bun dev` → the photo renders, is grayscale, and is not stretched.

```bash
git grep -n 'images/profile\.jpg'
```
Expected: only `what-i-bring.tsx`, which Task 7 deletes.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/origin.tsx
git commit -m "feat: add the origin section"
```

---

### Task 7: Compose the page, delete what it replaced, and fix the reveal fallback

⛔ **These belong in one task.** `page.tsx` imports the three components being deleted; splitting them across tasks leaves a red tree at every boundary, which is what the previous draft did three times.

**Files:**
- Modify: `src/app/page.tsx`, `src/components/shared/scroll-reveal.tsx`, `src/app/globals.css`, `src/app/layout.tsx`
- Delete: `src/components/landing/{currently,what-i-bring,approach-teaser}.tsx`

**Interfaces:**
- Consumes: `Hero` (T5), `FeaturedWork` (T3), `OtherThings` (T4), `Origin` (T6), `CtaSection` (existing).

- [ ] **Step 1: Rewrite the composition**

```tsx
import FeaturedWork from '@/components/landing/featured-work';
import Hero from '@/components/landing/hero';
import Origin from '@/components/landing/origin';
import OtherThings from '@/components/landing/other-things';
import CtaSection from '@/components/shared/cta-section';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <ScrollReveal>
        <FeaturedWork />
      </ScrollReveal>
      <ScrollReveal delay="0.05s">
        <OtherThings />
      </ScrollReveal>
      {/* A fifth section belongs here, between the work and the origin. It is
          specced and blocked on a sign-off from outside this project, and it
          drops in at this point without rearranging anything above or below. */}
      <ScrollReveal delay="0.1s">
        <Origin />
      </ScrollReveal>
      <ScrollReveal delay="0.2s">
        <CtaSection />
      </ScrollReveal>
    </>
  );
};

export default LandingPage;
```

- [ ] **Step 2: Give the reveal wrapper a stable hook**

`scroll-reveal.tsx:22` renders `cn('opacity-0', isVisible && 'animate-reveal-up', className)`. Add a plain, non-Tailwind class so CSS can target an *unrevealed* element:

```tsx
className={cn('scroll-reveal opacity-0', isVisible && 'animate-reveal-up', className)}
```

- [ ] **Step 3: Rescue print and no-JS**

⛔ **The defect this fixes:** an unrevealed section sits at `opacity: 0` until the client `IntersectionObserver` fires. With JavaScript off it never fires. `globals.css:295` already sets `.animate-reveal-up { opacity: 1 }` for print, but an unscrolled section **does not carry that class** — so printing or Save-as-PDF without scrolling the whole page produces a document that is blank below the hero. On a page whose stated job (spec `:13`) is to be safe to forward to a colleague, that is the worst possible failure.

In `globals.css`, inside the existing `@media print` block, alongside the `.animate-reveal-up` rule:

```css
  .scroll-reveal {
    opacity: 1 !important;
    animation: none !important;
  }
```

In `layout.tsx`, **as the first child of `<body>`**:

```tsx
<body className="flex flex-col min-h-dvh">
  {/* Without JS the IntersectionObserver never runs and every revealed section
      stays at opacity 0. Text is in the DOM either way; this is what makes it
      visible. Deliberately not hoisted: React 19 moves a <style> to <head> only
      when given both href and precedence, so a bare one stays where written. */}
  <noscript>
    <style>{`.scroll-reveal{opacity:1!important}`}</style>
  </noscript>
  <ThemeProvider …>
```

⛔ **Not `<head>` — `layout.tsx` does not have one.** It goes `<html>` (`:113`) straight to `<body>` (`:118`), so an implementer following a `<head>` instruction has to invent the element, in a file whose metadata pipeline Task 9 is also changing. `<body>` needs no new element and was verified to work: under a scripting-disabled parse the `<noscript>` yields a real `<style>` node with intact contents, no `dangerouslySetInnerHTML` required.

- [ ] **Step 4: Delete the three replaced components**

```bash
git rm src/components/landing/currently.tsx \
       src/components/landing/what-i-bring.tsx \
       src/components/landing/approach-teaser.tsx
```

- [ ] **Step 5: Verify the tree is green and the order is right**

```bash
bun run lint && bun run build
```
Expected: **0 errors, 0 warnings** (the `what-i-bring.tsx` warning is now gone), and **14 static pages, unchanged from baseline**. Deleting three components removes no routes — `/approach` still exists until Task 8. *(An earlier draft predicted 13 here and hedged the prediction; the hedge was covering a wrong reason rather than an uncertain count.)*

⛔ **If this task fails midway, recover with `git restore --staged --worktree src/`.** Step 4 uses `git rm`, which touches the index as well as the working tree, so `git checkout -- .` will not bring the three components back.

`bun dev` → opening, then the work, then the short list, then how you got here, then contact. Confirm fartix is the first card.

- [ ] **Step 6: Verify the fallback actually fires**

Two checks, both by hand:

1. **Print preview** (Cmd-P) **without scrolling the page first.** Every section must be visible in the preview. Before this task it was blank below the hero.
2. **JavaScript disabled** (DevTools → Settings → Debugger → Disable JavaScript, then reload). Every section must be visible.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx src/components/shared/scroll-reveal.tsx src/app/globals.css src/app/layout.tsx
git commit -m "feat: compose the landing page and keep it readable without JS"
```

---

### Task 8: Retire `/approach`

**Files:**
- Delete: `src/app/approach/page.tsx`
- Modify: `next.config.ts`, `src/components/shared/navbar.tsx`, `src/components/shared/mobile-nav.tsx:17`, `lighthouserc.json`, `CLAUDE.md:54`

**Note:** `sitemap.ts` lost its `/approach` entry in Task 1; `approach-teaser.tsx` and the `page.tsx` import died in Task 7. Nothing imports the route by the time this runs.

⛔ **`lighthouserc.json` and `CLAUDE.md` are in this task because the previous draft's check could not see them.** `lighthouserc.json:8` audits `http://localhost:3000/approach` and `.github/workflows/quality-gate.yml:15-19` runs it on every pull request to `main`. Deleting the route without fixing the config breaks CI, and a grep scoped to `src/` reports clean while it does.

- [ ] **Step 1: Repoint `/about`. Do NOT add an `/approach` redirect.**

`next.config.ts:7` currently reads `{ source: '/about', destination: '/approach', permanent: true }`. Change the destination to `/`.

⛔ **`/approach` gets no redirect, and this reverses what an earlier draft of this plan and the spec both required.** The route was **never deployed**. Verified 2026-08-11:

```bash
git ls-tree -r origin/main --name-only | grep -i approach   # nothing
git show origin/main:src/app/sitemap.ts | grep -i approach  # nothing
git show origin/main:next.config.ts | grep -i approach      # nothing
```

It was created on this branch in `6508238` and has only ever existed here. **No bookmark, no index entry, no inbound link to it can exist**, so a redirect would guard a URL the public has never been able to reach. Delete the route and move on.

⛔ **`/about` is different and its redirect stays.** `src/app/about/page.tsx` **is** on `origin/main` — a genuinely public route on the February-2025 site, alongside `/experience`, `/projects`, `/skills` and `/education`. This branch deleted the page and pointed it at `/approach`; leaving it that way ends in a 404 the moment `/approach` goes. Point it at `/`, where the other four already point.

- [ ] **Step 2: Drop the nav links**

`navbar.tsx` — remove the `/approach` item. Nav becomes the name, Work, Contact.
`mobile-nav.tsx:17` — remove the `Approach` item from `navItems`.

- [ ] **Step 3: Fix the CI audit target and the route list**

`lighthouserc.json` — remove `"http://localhost:3000/approach"` from `ci.collect.url`. The remaining two are `/` and `/work/test-coverage-ratchet`.

⛔ **`CLAUDE.md` is stale in SEVEN places, not one.** An earlier draft fixed only `:54`. All of them:

| Line | What is wrong |
|---|---|
| `:7` | "manifesto-style approach page" in the project overview |
| `:54` | `Routes: /, /approach, /work/[slug]` |
| `:66` | component list names `WhatIBring`, `Currently`, `ApproachTeaser` |
| `:73` | documents `CaseStudy` without the now-required `availability` |
| `:106` | "6 sections … → ApproachTeaser → CTA" |
| `:107` | the Approach page architecture entry |
| `:119` | **`jobTitle: "Frontend Engineering Lead"` — wrong today**, against `layout.tsx:104` which reads `Software Engineering Lead` |

⛔ **`:119` is not cleanup, it is a fourth surface disagreeing on the job title** — the exact axis spec `:134` calls "one job title across every surface." It has been wrong independently of this plan.

⛔ **`:7` and `:107` say "approach" with no leading slash**, so a `/approach` grep passes while the file is still wrong. Fix them by reading, not by grepping.

`docs/product-marketing-context.md:161` — records the hero sub-line as `Engineering lead · Jakarta`, which Task 5 Step 3 replaced. CLAUDE.md calls that file the bio source of truth, so it cannot lag the site.

- [ ] **Step 4: Delete the page**

```bash
git rm -r src/app/approach
```

- [ ] **Step 5: Verify nothing live references it — unscoped**

```bash
git grep -in 'approach'
```
⛔ **Case-insensitive, and without the leading slash** — that is what catches `CLAUDE.md:7` and `:107`, which a `/approach` grep walks straight past.

Expected: **the specs and plans only** (they are the record), plus the word used in ordinary prose. **`next.config.ts` should now be clean too** — with no `/approach` redirect to add, nothing in application code names the route at all. Any hit in `src/`, `next.config.ts`, `lighthouserc.json`, `CLAUDE.md` or `.github/` that refers to the **route or the page** is a miss.

- [ ] **Step 6: Verify the redirects actually fire**

```bash
bun run build
bun start & sleep 6
curl -sI localhost:3000/about    | head -1          # expect 308
curl -sI localhost:3000/about    | grep -i location # expect /, NOT /approach
curl -sI localhost:3000/approach | head -1          # expect 404
kill %1
```

**`/approach` returning 404 is the correct outcome, not a defect.** It was never public, so there is nothing to redirect. The check is here to confirm the route is genuinely gone rather than to confirm a redirect fires.

- [ ] **Step 7: Verify CI still passes locally**

```bash
bunx @lhci/cli autorun
```
Expected: collects three runs against two URLs and asserts clean. **If this cannot start, fix it now** — it is the mechanism behind the site's own "measured in CI" claim, which is one of only two pieces of checkable evidence the page offers.

- [ ] **Step 8: Commit**

```bash
git add next.config.ts src/components/shared/navbar.tsx src/components/shared/mobile-nav.tsx \
        lighthouserc.json CLAUDE.md docs/product-marketing-context.md
git commit -m "feat: retire the approach page"
```

⛔ **No second `git rm` here.** Step 4 already removed `src/app/approach` from the index. Running it again prints `fatal: pathspec … did not match any files` in the middle of the commit block. The commit still succeeds — the block is newline-separated with no `set -e`, so its exit code is `0` — which is the worst outcome available: a human stops at the `fatal:`, and automation does not see it at all.

⛔ **Stage explicit paths. Never `git add -u`** — it sweeps every dirty tracked file in the tree into the commit.

⛔ **Recovery, if this task fails midway:** `git restore --staged --worktree src/`. Step 4 stages a deletion, so `git checkout -- .` will not undo it.

---

### Task 9: Generate the preview card

**Files:**
- Create: `src/app/opengraph-image.tsx`
- Delete: `src/app/opengraph-image.jpeg`, `src/app/opengraph-image.alt.txt`, `src/app/twitter-image.jpeg`, `src/app/twitter-image.alt.txt`

- [ ] **Step 1: Record what is being replaced**

```bash
ls -la src/app/{opengraph,twitter}-image.*
cat src/app/opengraph-image.alt.txt src/app/twitter-image.alt.txt
git grep -n 'Senior Frontend Engineer'
```

⛔ **Expected, and it is the reason this task matters:** both `.alt.txt` files contain `Mohammad Fahrul Alwan, Senior Frontend Engineer and a Tech Lead`, and both render live today as `og:image:alt` and `twitter:image:alt`. Commit `d42cc08` unified the job title across "the README, the keywords, the JSON-LD and the three descriptions" and never touched these two, because they are not images and match no image glob. **All four files are deleted in this task.**

- [ ] **Step 2: Create the route**

Use Next's file convention: an `ImageResponse` at 1200×630.

⛔ **No photograph on the card. Typography only.** The spec originally put `profile.webp` here; **that clause was written without anyone opening the file.** It is a Google-branded floral installation with him standing in front of it, and the card renders at full size, in full colour, in every Slack, WhatsApp and LinkedIn unfurl — in front of people who never open the page. Owner ruling 2026-08-10; the spec is updated at `:67` with the full reasoning. The photo keeps its section-4 placement, where it is small and grayscaled.

*A second reason, independent of the first: the file is 192×192, and a 1200×630 card wants 240–320px for a portrait. Even a tight crop to the face upscales visibly.*

Content: the name, the settled job title (`Software Engineering Lead`), and `Jakarta · UTC+7`.

Colours come from the graphite palette in `globals.css` — **read the values, do not approximate them.**

⛔ **Specify the FONTS, or the card ships in a typeface this site does not use.** `ImageResponse` registers exactly one font when none is passed: **Geist at weight 400**. It is not a generic fallback and it is not on this site, which is Noto Sans and Newsreader. Any `fontWeight: 500` or `600` in the card JSX also silently flattens to 400.

Either vendor the two font binaries and pass them:

```ts
fonts: [
  { name: 'Newsreader', data: await readFile(join(process.cwd(), 'src/app/fonts/Newsreader-Medium.ttf')), weight: 500, style: 'normal' },
  { name: 'Noto Sans',  data: await readFile(join(process.cwd(), 'src/app/fonts/NotoSans-Regular.ttf')),  weight: 400, style: 'normal' },
],
```

…or state in a comment that Geist-400 is an accepted trade and why. **Silence is the one option not available** — it produces a preview card typographically foreign to the page it advertises.

⛔ **If a future change puts any image back on this card, note that `ImageResponse` cannot decode WebP or AVIF.** Verified at source in `node_modules/next/dist/compiled/@vercel/og/index.node.js`: the allowlist is png, apng, jpeg, gif, svg+xml. WebP and AVIF are declared and deliberately excluded. A base64 data URI skips the allowlist check entirely and fails later with the uninformative `TypeError: u2 is not iterable`, so the error will not tell you this.

⛔ **The title string must match `layout.tsx`'s JSON-LD `jobTitle` exactly.** Five surfaces disagreeing on the title is the defect this replaces.

Export `alt` from the module so it replaces the deleted `.alt.txt`:

```ts
export const alt = 'Fahrul Alwan, Software Engineering Lead in Jakarta';
```

*Comma, not an em-dash. The first draft of this line used U+2014 and violated this plan's own Global Constraint, in the very string that becomes live `og:image:alt`.*

Export `size` and `contentType` too — they are what produce `og:image:width`, `og:image:height` and `og:image:type`.

- [ ] **Step 3: Verify the meta tags, not just the file**

```bash
bun run build
bun start & sleep 6
curl -s localhost:3000 | grep -o '<meta[^>]*\(og:image\|twitter:image\)[^>]*>'
curl -s localhost:3000/opengraph-image -o /tmp/og.png && file /tmp/og.png
kill %1
```
Expected: `og:image`, `og:image:alt`, `og:image:width`, `og:image:height` and `og:image:type` all present and correct. No occurrence of `Senior Frontend Engineer` anywhere in the output.

⚠️ **`twitter:image` — check it, do not assume it.** Two review passes independently built this and observed `twitter:image`, `twitter:image:alt`, `twitter:image:type` and both dimensions present in the served HTML once `twitter-image.*` is deleted. **But no Next.js documentation describes that fallback**, and `opengraph-image` and `twitter-image` are documented as independent conventions. So it is observed behaviour rather than a contract, and a future Next version could drop it without it being a regression on their side. If the tag is absent here, add a `twitter-image.tsx` re-exporting the OG card rather than assuming X will read `og:image` for you.

The image is a PNG at 1200×630. **Open it and look at it** — in particular at the typeface, which is the thing Step 2's `fonts` option decides and no command will check for you.

⚠️ **Accepted loss, stated rather than discovered later:** `/opengraph-image.jpeg` and `/twitter-image.jpeg` cease to exist as routes. Any external page hotlinking those exact URLs will 404. Cheap to accept — they were never advertised as stable addresses.

- [ ] **Step 4: Observe one real unfurl**

Paste the deployed preview URL into a real Slack or WhatsApp message and confirm the card renders. The spec requires observing one real unfurl, not assuming the file renders.

- [ ] **Step 5: Commit**

```bash
git add src/app/opengraph-image.tsx
git rm src/app/opengraph-image.jpeg src/app/opengraph-image.alt.txt \
       src/app/twitter-image.jpeg src/app/twitter-image.alt.txt
git commit -m "feat: generate the link preview from code"
```

---

### Task 10: Verify the whole thing

- [ ] **Step 1: Gates**

```bash
bun run lint && bun run build
```
Expected: 0 errors, 0 warnings against the recorded baseline.

- [ ] **Step 2: Lighthouse, through the repo's own gate**

⛔ **Use the project's LHCI config, not a hand-rolled invocation.** Re-typing thresholds creates a second gate with different blocking semantics.

```bash
bunx @lhci/cli autorun
```

**What this blocks on, and it is not performance.** `lighthouserc.json` asserts accessibility, SEO, colour-contrast, heading-order, `html-has-lang` and `meta-viewport` at `minScore 1` as **errors**, plus CLS ≤ 0.1. All deterministic, all genuinely blocking. **Performance is a `warn` at 0.95, deliberately** — `.github/workflows/quality-gate.yml:6-14` explains it: *"a gate that flakes is a gate someone eventually disables, which is worse than no gate."*

⛔ **An earlier draft of this step said "a regression is a blocker, not a note" — two lines after warning against re-typing the repo's semantics, and then doing exactly that.** Performance regressions warn. Say so, and do not invent a stricter gate in prose than the config the step invokes.

- [ ] **Step 2b: The performance number, and the claim that rests on it**

⛔ **Never cite a local Lighthouse figure in copy.** `2026-07-23-design-system-design.md:374` already refused local medians as evidence in either direction — an unthrottled run on a loaded machine against `localhost` measures the machine. The published 98 came from the CI gate on PR #1242, mobile, and that is the only kind of number allowed to appear anywhere a reader sees.

The IA spec (`:20`) cites *"accessibility 100, performance 98, measured in CI"* as one of only two checkable claims the site offers, and **no fresh CI number exists for the rebuilt page.** So, after the pull request opens:

1. Read the performance score from the CI run on the PR, mobile.
2. **If it comes back below 95, the number in the copy changes or the claim comes out.** That is the whole point of the claim being checkable.
3. Record the new figure and its PR number in the design-system spec's § 11 line, replacing the 2026-07-23 measurement.

This is post-merge work and it is the one item in this plan that cannot be completed before the branch lands. It is named here so it does not vanish.

⚠️ **Nothing forces a human back into this file after the merge, and that is worth knowing rather than pretending otherwise.** What limits the damage is scope: this updates a figure inside a spec document, not copy a visitor reads — grepping `src/` finds no rendered "measured in CI" or "performance 98" text anywhere on the site, so a forgotten step leaves a stale number in a doc, not a false claim in front of a stranger. **If the branch sits unmerged for more than a week, re-surface this step**, because by then nobody will remember the CI run it refers to.

- [ ] **Step 3: Every external link, by hand — all of them**

The previous draft counted four. There are **ten anchors across seven destinations** once this plan lands:

| Where | Destination |
|---|---|
| `hero.tsx` · `cta-section.tsx` | GitHub profile |
| `hero.tsx` · `cta-section.tsx` | LinkedIn |
| `hero.tsx` · `cta-section.tsx` | `mailto:` |
| `featured-work.tsx` | `fartix.id` |
| `other-things.tsx` | `tuntutanrakyat.space` · its repo |
| `other-things.tsx` | `ganjil-genap.vercel.app` · its repo |

Plus `github.com/fahrulalwan/fahrulalwan` if the `this site` entry shipped. **Click them.** A dead link on a page whose argument is *these can be opened* costs more than the link was worth.

*No line numbers here on purpose — Task 5 inserts two paragraphs and a facts strip above `hero.tsx`'s social links, so any number written now is wrong by the time this step runs.*

- [ ] **Step 4: Read the page in every state it has**

1. **375px wide.** No horizontal scroll; the opening still lands in roughly one screen.
2. **Print preview, unscrolled.** Every section visible.
3. **JavaScript disabled.** Every section visible.
4. **`prefers-reduced-motion: reduce`.** Content visible, no animation. (`globals.css:173-178` and the lazy initializer at `use-scroll-reveal.ts:17` already handle this; confirm it survived Task 7.)
5. **Light and dark.** Both themes, no invisible text.

- [ ] **Step 5: Confirm the title is singular across every surface**

```bash
git grep -in 'senior frontend engineer\|frontend engineering lead\|engineering lead' -- src README.md \
  | grep -vi 'software engineering lead'
```

**Expected after this plan runs: exactly one line.**

```
src/content/case-studies/coverage-ratchet.ts:10:    role: 'Frontend Engineering Lead',
```

⛔ **That hit is legitimate and must not be "fixed".** The field records the role he held on that project, in the past. It is not the site asserting a current title.

Anything else is a real miss. Measured on the tree before this plan runs, the same command returns four lines — the two `.alt.txt` files Task 9 deletes, `hero.tsx:21` which Task 5 replaces, and that `role` field. **If any of the first three survive, the task that was supposed to remove them did not.**

Two things this command gets right that earlier drafts got wrong, in opposite directions:

- **It is case-insensitive**, because `README.md:3` reads `Software engineering lead in Jakarta.` in lowercase. A case-sensitive grep matches none of the alternates and passes by luck; a wrong lowercase title anywhere would sail through.
- **It excludes the canonical title**, because `engineering lead` is a substring of `Software Engineering Lead`. Without the `grep -vi`, every *correct* occurrence matches too — ten of them, across `layout.tsx`, the new facts strip and the OG card's own `alt`. **A sign-off check that fires on correct content is worse than no check**: it either wastes the implementer's time or gets quieted by mangling copy that was right.

- [ ] **Step 6: Commit any fixes, then stop**

Do not merge. The branch merge is a separate decision, it publishes the profile README at the same time, and it is what unblocks the `this site` entry in Task 4.

---

## Self-review

**Spec coverage.** Sections 1, 2, 4, 5 → Tasks 5, 3+4, 6, unchanged. `/approach` removal → Task 8. Preview card and the photo on it → Task 9. Photo in section 4 → Task 6. Title consistency → Tasks 9 and 10 Step 5. URL constant → Task 1. Section 3 → **deliberately absent, blocked, and its slot is reserved in Task 7.**

**Placeholders.** None. Every copy string is verbatim; every command is runnable.

**Dependency integrity.** No task deletes a file another task's build still imports. `page.tsx` is rewritten in the same task as the three deletions it enables. `/approach` is retired only after nothing imports it. Verified against `src/app/page.tsx:1,2,5`.

**Type consistency.** `availability` is defined in Task 2 and consumed only in Task 3, with the same shape in both. Component export names in Task 7 match Tasks 3–6.

**Known gaps, stated rather than hidden.**
- There is no automated test in this project. Verification is lint, build, the repo's LHCI gate, and human eyes on every link and every render state. **That is weaker than a test suite and it is the honest state of this repo**; adding one is separate work with its own argument.
- Six em-dashes survive in `caready.ts` and `fartix.ts`. Logged Open in the spec, out of scope here.
- The universal scroll-fade-up conflicts with the design-system spec's own anti-tell list. Surfaced above, unresolved, and it needs a ruling rather than a build task.

---

## What the review changed

A Phase 1 blindspot pass on 2026-08-10 returned **REWORK** against the first draft. The substantive changes, so a later reader can see which decisions were re-derived rather than inherited:

- **The task order was broken.** Tasks 5, 6 and 7 each deleted a component `page.tsx` still imported, so the plan's own per-task build gate could not pass three times running. Composition and deletion are now one task.
- **Every verification grep was path-scoped and could not fail.** `lighthouserc.json` and `CLAUDE.md` both reference `/approach`; `README.md` holds the site URL. All are now caught, and the `SITE_URL` claim is narrowed to application code.
- **CI was never in the plan.** `lighthouserc.json` audits the route being deleted, and Task 10 duplicated the repo's Lighthouse gate with re-typed thresholds. Both fixed.
- **Task 3's justification cited a value removed in `8ffd42d`.** The trade is re-derived on layout grounds, and the metric's surviving home on `/work/[slug]` is now stated.
- **Task 9 silently reversed a locked spec decision** by building the card without the photo. The spec wins.
- **Two files were publishing the old job title** into live meta tags and matched no image glob. Both deleted.
- **Print and no-JS produced a blank page below the hero.** Fixed in Task 7, checked in Task 10.
- **The merge gate on the `this site` entry** existed only in the spec. Carried into Task 4.
- Two copy strings had drifted from the locked spec; the em-dash constraint was asserted over copy it never touched; `git add -u` staged the whole tree; the external-link count was four against a real seven. All corrected.
- **The `bijakmemantau.id` citation was verified** and turned out to point at the live deployment rather than the repo, which changed what Task 4 links to.

### Phase 2 — red team, pressure test, blue team

Run on the rewritten plan. Red returned SHIP-AFTER-FIXES, pressure returned REWORK-BEFORE-FIRST-FIRE, blue returned HARDEN.

⛔ **Red and pressure contradicted each other on the nested anchor, and blue settled it by measurement.** Red tested the DOM *after hydration* — `createElement`/`appendChild` bypass the HTML parser, so the nesting exists in memory but never in the served document. Blue parsed the real markup twice, including with scripting disabled, and the parser un-nests as the spec requires: the card anchor splits in two, the content wrapper escapes the link, and "Read case study" ends up inside no link at all. **The decisive argument is internal, not a standards appeal — Task 10 Step 4.3 requires the page to work with JavaScript disabled, and with no JS the mangled parse IS the page.** Red's Lighthouse evidence was self-undermining: accessibility scored 1 because the parser had already un-nested everything before the audit ran. Task 3 now uses a stretched-link overlay with no JavaScript, which also removed the need for `'use client'` and kept three case studies' worth of prose out of the client bundle.

- **The photograph does not go on the preview card.** Owner ruling on new evidence: it is a Google-branded installation and nobody had opened the file. Spec `:67` updated with the full reasoning; the section-4 placement survives.
- **WebP cannot be decoded by `ImageResponse`,** confirmed against the allowlist in the bundled renderer. Moot for the card now, kept as a note because AVIF fails identically and a later "optimisation" would reopen it.
- **The card would have rendered in Geist 400** — the only font the bundle registers — on a site that uses Noto Sans and Newsreader. Task 9 now requires the fonts to be specified or the trade stated.
- **Two verification greps passed by luck.** The title check was case-sensitive against a lowercase README, and expected no hit in `src/` where a legitimate historical `role` field lives. The `/approach` check missed two `CLAUDE.md` lines that say "approach" without a slash.
- **`CLAUDE.md` was stale in seven places, one of which is a fourth surface disagreeing on the job title** and has been wrong independently of this work.
- **Task 10 asserted a blocking Lighthouse gate the repo deliberately refuses to make blocking.** Performance warns by design. The performance claim's verification moved to a named post-merge step, gated on the copy changing if the number does.
- Also corrected: the `<noscript>` had nowhere to go (`layout.tsx` has no `<head>`), Task 8 ran the same `git rm` twice, three verification blocks hung on a foreground server, `ganjil-genap`'s live site was unlinked while its sibling's was linked, fartix.id was never checked by command, two tasks had no recovery path for a staged deletion, heading levels were unspecified against a CI assertion, the page-count prediction was wrong, and Task 9's `alt` string contained an em-dash in violation of this plan's own constraint.

**One finding rejected, with the reason.** Red reported `/` at performance 0.94 from a local `bunx @lhci/cli autorun` and concluded the threshold is already breached. Rejected: `2026-07-23-design-system-design.md:374` records that local medians against `localhost` were "a loaded machine" and were "correctly refused as evidence in either direction." The published 98 came from CI, mobile. Blue confirmed the rejection and supplied a stronger reason — performance is a `warn`, so no blocker exists to be unsound. The residue was real, though, and is now Step 2b.

### Phase 3 — tech-lead synthesis gate

Verdict **SHIP-AFTER-FIXES**, one P1 and three P2s.

⛔ **The P1 was in the fix Phase 2 had just applied, which is the argument for running this phase last.** Making the title grep case-insensitive stopped it passing by luck on a lowercase README — and made it match every *correct* occurrence too, because `engineering lead` is a substring of `Software Engineering Lead`. Ten hits where the plan promised two. **A sign-off check that fires on correct content is worse than no check**: it either burns the implementer's time or gets quieted by mangling copy that was right. Corrected and measured against the live tree.

- **The `twitter:image` fallback is observed, not documented.** Red and blue each built it and saw the tags; the gate read the Next docs and found the two conventions described as independent, with no fallback anywhere. Both are true. It is now written as behaviour to verify rather than a contract to rely on, with the remedy if it is absent.
- **Task 10 Step 2b has no forcing function**, and the plan now says so plainly rather than trusting its own "named here so it does not vanish." What limits the damage is that it updates a spec figure, not visitor-facing copy — verified by grepping `src/` for the claim.
- **Line-number anchors were dropped from Task 10's link table**, because Task 5 shifts them before that step runs.

**Two findings the gate examined and cleared, worth recording so they are not re-opened.** Task 3's stacking model was traced by hand against CSS paint order — the ghost year at `-z-10` inside `isolate`, the unpositioned wrapper letting the stretched `::after` resolve against `<article>`, and the availability link at `relative z-10` above the overlay — and is correct. And the plan's operability triage is right: Tasks 7 and 8 are the only two that can land in an undecidable intermediate state, which is why they are the only two carrying a recovery path.

---

### Post-review correction — 2026-08-11, owner flag

⛔ **The `/approach` redirect was removed, and it should never have been specified.** The owner flagged that the route was never deployed. Verified: absent from `origin/main`, from main's `sitemap.ts`, and from main's `next.config.ts`; created on this branch in `6508238`. **No bookmark or index entry to it can exist**, so the redirect guarded a URL the public could never reach.

**Four passes designed a redirect for an impossible scenario.** The spec's own Phase 2 pressure-test listed *"an old `/approach` bookmark"* as a stress case and concluded the 308 was required; this plan's Phase 2 walked the same scenario and marked it HOLDS. **Nobody asked whether the route had ever shipped.** One `git ls-tree` against `origin/main` refutes it, and the whole pipeline is built on leaving the document to check things — this was a fact about deployment history that nothing in either document contained.

**`/about` keeps its redirect** and its reason is now the accurate one: `src/app/about/page.tsx` *is* on `origin/main`, so it is a genuinely public route that would 404 once `/approach` goes.

Spec corrected at § Mechanical consequences and § Done means.

---

**Review-closure:** 3-phase pipeline complete 2026-08-10, plus an owner correction 2026-08-11. Phase 1 blindspot → REWORK, rewritten. Phase 2 red / pressure / blue → SHIP-AFTER-FIXES, REWORK-BEFORE-FIRST-FIRE, HARDEN; contradiction settled by measurement. Phase 3 tech-lead gate → SHIP-AFTER-FIXES. All findings closed: applied, or rejected with the reason stated. Loop closure confirmed — every self-firing artifact in this plan (both redirects, `robots.ts`, the generated OG route, the CI gate) has an explicit observe-it-fire step rather than an existence check.

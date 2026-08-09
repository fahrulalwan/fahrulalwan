# Landing page build — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the four landing-page sections whose copy is locked, delete `/approach`, and generate the link-preview card from code.

**Architecture:** The page is composed in `src/app/page.tsx` from one component per section. Section copy lives inside its own component; case-study data stays in `src/content/case-studies/`. One new shared module exports the site URL so no address is written twice. No new dependencies.

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript strict · Tailwind 4 · Biome + ESLint 9.

## Global Constraints

- **⛔ There is no test suite in this project and this plan does not add one.** Verification per task is: `bun run lint` clean of new errors, `bun run build` succeeds, and the page renders correctly at the stated URL. Tasks that change what a reader sees end with a visual check, not an assertion.
- **⛔ Every URL comes from `SITE_URL`** (Task 1). No address is written literally anywhere after that task. This is what keeps a future domain purchase a one-line change instead of a six-file hunt.
- **Copy is locked and is reproduced verbatim in the tasks below.** It comes from `docs/superpowers/specs/2026-07-23-information-architecture-design.md` § Final copy. **Do not improve it while implementing.** If a line looks wrong, stop and raise it.
- **No em-dashes in published copy.** The design-system spec bans them as an anti-tell.
- **External links open in a new tab** with `target="_blank" rel="noopener noreferrer"`. A verification page that navigates the reader away has lost them.
- **The existing `ScrollReveal` wrapper and its stagger delays stay.** This plan changes what is inside the sections, not how they animate in.
- **⛔ A fifth section is specified and is NOT in this plan.** It is blocked on a sign-off from someone outside this project. `page.tsx` is composed so it drops in between sections 2 and 4 later without rearranging anything.

---

## File structure

**Create**
- `src/lib/site.ts` — the single exported site URL, and nothing else.
- `src/components/landing/other-things.tsx` — the short list under section 2.
- `src/components/landing/origin.tsx` — section 4. Replaces `what-i-bring.tsx`.
- `src/app/opengraph-image.tsx` — the generated preview card.

**Modify**
- `src/content/case-studies/types.ts` — add the `availability` field.
- `src/content/case-studies/{fartix,coverage-ratchet,caready}.ts` — populate it.
- `src/components/landing/featured-work.tsx` — heading, status lines, external link, metric tile.
- `src/components/landing/hero.tsx` — new opening, facts strip, currently list folded in.
- `src/app/page.tsx` — section composition.
- `src/app/layout.tsx` · `src/app/sitemap.ts` · `src/app/robots.txt` — consume `SITE_URL`; drop `/approach`.
- `src/components/shared/{navbar,mobile-nav}.tsx` — drop the `/approach` link.
- `next.config.ts` — redirects.

**Delete**
- `src/app/approach/page.tsx` · `src/components/landing/approach-teaser.tsx` · `src/components/landing/currently.tsx` · `src/components/landing/what-i-bring.tsx`

---

### Task 1: The site URL constant

**Files:**
- Create: `src/lib/site.ts`
- Modify: `src/app/layout.tsx:42`, `src/app/layout.tsx:103`, `src/app/sitemap.ts:8,16,22`, `src/app/robots.txt:9`

**Interfaces:**
- Produces: `SITE_URL: string` — absolute origin, no trailing slash. Every later task imports this.

- [ ] **Step 1: Create the module**

```ts
// src/lib/site.ts

/**
 * The single source for this site's address.
 *
 * Everything that needs an absolute URL imports this: metadataBase, the
 * JSON-LD, the sitemap, robots.txt, and the preview card. A custom domain was
 * deliberately deferred in August 2026, and this constant is what keeps that
 * deferral cheap — buying one is a change here and nowhere else.
 */
export const SITE_URL = 'https://fahrulalwan.vercel.app';
```

- [ ] **Step 2: Replace all six literals**

`layout.tsx:42` → `metadataBase: new URL(SITE_URL),`
`layout.tsx:103` → `url: SITE_URL,`
`sitemap.ts:8` → `` url: `${SITE_URL}/work/${slug}`, ``
`sitemap.ts:16` → `` url: `${SITE_URL}/`, ``
`sitemap.ts:22` → delete this entry entirely (it is the `/approach` route; see Task 7)
`robots.txt:9` → **`robots.txt` is a static file and cannot import.** Convert it to `src/app/robots.ts` returning a `MetadataRoute.Robots` object that uses `SITE_URL`, and delete the `.txt`.

- [ ] **Step 3: Verify zero literals remain**

```bash
rg -n 'fahrulalwan\.vercel\.app' src/ next.config.ts
```
Expected: **one hit only**, the definition in `src/lib/site.ts`.

- [ ] **Step 4: Build**

```bash
bun run lint && bun run build
```
Expected: no new errors. Then `curl -s localhost:3000/robots.txt` after `bun dev` and confirm the sitemap line is present and correct.

- [ ] **Step 5: Commit**

```bash
git add src/lib/site.ts src/app/layout.tsx src/app/sitemap.ts src/app/robots.ts
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

- [ ] **Step 2: Populate all three, verbatim**

```ts
// fartix.ts
  availability: {
    note: 'still up, still mine',
    href: 'https://fartix.id',
  },

// coverage-ratchet.ts
  availability: {
    note: 'private repo, so this one is a description rather than a link',
  },

// caready.ts
  availability: {
    note: '2018, rebuilt by other people since',
  },
```

- [ ] **Step 3: Verify the type compiles**

```bash
bun run lint && bun run build
```
Expected: passes. If `availability` were optional the build would pass with it missing, so it is **required** on purpose — a new case study cannot be added without stating what a reader can do with it.

- [ ] **Step 4: Commit**

```bash
git add src/content/case-studies/
git commit -m "feat: say what a reader can actually open, per case study"
```

---

### Task 3: Section 2 — the work

**Files:**
- Modify: `src/components/landing/featured-work.tsx`

**Interfaces:**
- Consumes: `CaseStudy.availability` (Task 2), `getAllCaseStudies()`.

- [ ] **Step 1: Change the heading**

`Selected Work` → `What I've built`

- [ ] **Step 2: Replace the metric tile with the availability line**

Delete the block rendering `study.results.metrics[0]` in display type. **It prints a figure from a private config directly above prose arguing against quoting private figures.** In its place, render the availability note in small muted text under the headline. When `href` is present, the note is a link:

```tsx
{study.availability.href ? (
  <a
    href={study.availability.href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    {study.availability.note}
  </a>
) : (
  <span className="text-sm text-muted-foreground">{study.availability.note}</span>
)}
```

⛔ **`stopPropagation` is load-bearing.** The whole card is already a `Link` to the case study, so without it the outer navigation swallows the click and the live link never fires — which is the exact defect this task exists to fix.

- [ ] **Step 3: Verify both link paths by hand**

`bun dev`, then on the landing page: click the fartix availability line → opens `fartix.id` in a **new tab**, and the current tab stays put. Click anywhere else on that card → goes to `/work/fartix-ticketing-platform`. Confirm the other two cards show plain text with no link.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/featured-work.tsx
git commit -m "feat: put a real link on the work you can actually open"
```

---

### Task 4: The short list

**Files:**
- Create: `src/components/landing/other-things.tsx`

**Interfaces:**
- Produces: default-exported `OtherThings` — consumed by Task 8.

- [ ] **Step 1: Create the component**

Follow the section shape used by the existing landing components: `<section className="py-16 sm:py-20 border-t border-border/50">`, a `text-label ... uppercase` heading, then the content.

Heading: `A few other things`

Entries, verbatim, each linking to its repo in a new tab:

```tsx
const things = [
  {
    name: 'tuntutan-rakyat',
    href: 'https://github.com/fahrulalwan/tuntutan-rakyat',
    note: 'A place to track protest demands during the unrest. Built quickly with a small team I led, and it ended up cited as a resource on bijakmemantau.id.',
  },
  {
    name: 'this site',
    href: 'https://github.com/fahrulalwan/fahrulalwan',
    note: 'The code behind this page.',
  },
  {
    name: 'ganjil-genap',
    href: 'https://github.com/fahrulalwan/ganjil-genap',
    note: "A map for checking Jakarta's odd-even plate rule. Small, and it works.",
  },
];
```

⛔ **Never attach a commit count to tuntutan-rakyat.** The repo total is not his personal share. `a small team I led` is the accurate framing and it is already the strongest one.

- [ ] **Step 2: Verify**

`bun dev` → all three links open in a new tab and resolve to a real repo. **Click every one.** A dead link here is worse than no link, because this section's whole point is that these can be opened.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/other-things.tsx
git commit -m "feat: add the smaller things worth opening"
```

---

### Task 5: Section 1 — the opening

**Files:**
- Modify: `src/components/landing/hero.tsx`
- Delete: `src/components/landing/currently.tsx`

**Interfaces:**
- Produces: default-exported `Hero`, unchanged name — Task 8 relies on it.

- [ ] **Step 1: Replace the headline and body**

Keep the existing eyebrow (`Fahrul Alwan · Jakarta`) and the social links. Replace the `<h1>` and add two paragraphs:

> **I lead a frontend team and I'm still in the code most days.**
>
> I started working straight out of vocational school, pulling fiber into villas in Bali. Took a pay cut to under half my salary along the way. Did the degree at night, and was leading a team of five at twenty-two, nine months before I finished it.
>
> I've only been good at work I actually believed in. That's made some decisions easy and some of them expensive.

The first line is the `<h1>` in `font-display`. The two paragraphs follow in body type.

- [ ] **Step 2: Replace the sub-line with the facts strip**

`Engineering lead · Jakarta` → `Software Engineering Lead · Jakarta · UTC+7 · Currently leading frontend at Bareksa`

- [ ] **Step 3: Fold the currently list in**

Move the four items from `currently.tsx` into the bottom of `Hero` under a `text-label uppercase` heading `Currently`, keeping the existing hairline-and-item markup. Then delete `currently.tsx`.

- [ ] **Step 4: Verify**

`bun dev` → the whole opening reads in one screen on desktop. Check at 375px width that nothing overflows. `rg -n 'wondering what I was thinking' src/` returns nothing.

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/hero.tsx
git rm src/components/landing/currently.tsx
git commit -m "feat: open on what I do now and how I got here"
```

---

### Task 6: Section 4 — how you got here

**Files:**
- Create: `src/components/landing/origin.tsx`
- Delete: `src/components/landing/what-i-bring.tsx`

**Interfaces:**
- Produces: default-exported `Origin` — consumed by Task 8.

- [ ] **Step 1: Create it from the existing asymmetric-grid shape**

Reuse `what-i-bring.tsx`'s `grid-cols-[1fr_2fr]` layout — mono label left, content right. **That structure is correct and is not what was wrong with the old section; its copy was.**

Heading: `How I got here`

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

Delete the placeholder `div` and the commented-out block.

- [ ] **Step 3: Verify**

`bun dev` → the photo renders, is grayscale, and is not stretched. `rg -n 'images/profile.jpg|TODO.*photo' src/` returns nothing.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/origin.tsx
git rm src/components/landing/what-i-bring.tsx
git commit -m "feat: replace the disposition section with how I got here"
```

---

### Task 7: Delete `/approach`

**Files:**
- Delete: `src/app/approach/page.tsx`, `src/components/landing/approach-teaser.tsx`
- Modify: `next.config.ts`, `src/components/shared/navbar.tsx`, `src/components/shared/mobile-nav.tsx`

**Note:** `sitemap.ts` lost its `/approach` entry in Task 1; `page.tsx` loses the import in Task 8.

- [ ] **Step 1: Redirects**

In `next.config.ts`, add `/approach` → `/` (308). ⛔ **And repoint the existing `/about` → `/approach` to `/about` → `/` in the same change**, or it becomes a chain ending in a 404.

- [ ] **Step 2: Drop the nav links**

`navbar.tsx` — remove the `/approach` item. Nav becomes the name, Work, Contact.
`mobile-nav.tsx:17` — remove the `Approach` item from `navItems`.

- [ ] **Step 3: Delete the files**

- [ ] **Step 4: Verify nothing references it**

```bash
rg -n '/approach' src/ next.config.ts
```
Expected: **only the redirect rule in `next.config.ts`.** Docs may still mention it and that is fine; they are the record.

- [ ] **Step 5: Verify the redirects actually fire**

```bash
bun run build && bun start
curl -sI localhost:3000/approach | head -1   # expect 308
curl -sI localhost:3000/about    | head -1   # expect 308, and to / not /approach
```

- [ ] **Step 6: Commit**

```bash
git add -u && git add next.config.ts
git commit -m "feat: retire the approach page"
```

---

### Task 8: Compose the page

**Files:**
- Modify: `src/app/page.tsx`

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

- [ ] **Step 2: Verify the order on screen**

`bun dev` → opening, then the work, then the short list, then how you got here, then contact. Confirm fartix is the first card.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose the landing page in its settled order"
```

---

### Task 9: Generate the preview card

**Files:**
- Create: `src/app/opengraph-image.tsx`

- [ ] **Step 1: Confirm what is being replaced**

```bash
rg -n 'opengraph|twitter:image|og:image' src/app/layout.tsx
ls src/app/*.jpeg src/app/*.png public/*.jpeg 2>/dev/null
```
Record what exists before changing it. **Any static preview image found must be deleted in this task**, or it silently wins over the generated one.

- [ ] **Step 2: Create the route**

Use Next's file convention: an `ImageResponse` at 1200×630, built from the design tokens rather than a picture. It carries the name, the settled job title (`Software Engineering Lead`), and `Jakarta · UTC+7`. Background and text colours come from the graphite palette in `globals.css` — read the values, do not approximate them.

⛔ **The title string must match `layout.tsx`'s JSON-LD `jobTitle` exactly.** Three surfaces disagreeing on the title is the defect this replaces.

- [ ] **Step 3: Verify by fetching the actual image**

```bash
bun run build && bun start
curl -s localhost:3000/opengraph-image -o /tmp/og.png && file /tmp/og.png
```
Expected: a PNG at 1200×630. **Open it and look at it.** Then paste the deployed URL into a real Slack or WhatsApp message and confirm the unfurl. The spec requires observing one real unfurl, not assuming the file renders.

- [ ] **Step 4: Commit**

```bash
git add src/app/opengraph-image.tsx
git commit -m "feat: generate the link preview from code"
```

---

### Task 10: Verify the whole thing

- [ ] **Step 1: Gates**

```bash
bun run lint && bun run build
```

- [ ] **Step 2: Lighthouse, the way that actually works**

⛔ **Against the deployed preview, not localhost.** An unthrottled localhost trace returns plausible metrics and no score, which is what made this claim look unverifiable for a day in August.

```bash
bunx lighthouse --preset=desktop <deployed-preview-url> --output=json --quiet
```
Expected: accessibility 100, performance ≥ 95, SEO 100. **A regression here is a blocker, not a note** — the site's own measured gates are one of only three things on the page a stranger can verify.

- [ ] **Step 3: Every external link, by hand**

fartix.id, and all three repos in the short list. **Click them.** A dead link on a page whose argument is *these can be opened* costs more than the link was worth.

- [ ] **Step 4: Read the page on a phone**

375px. Confirm no horizontal scroll and that the opening still lands in roughly one screen.

- [ ] **Step 5: Commit any fixes, then stop**

Do not merge. The branch merge is a separate decision and it publishes the profile README at the same time.

---

## Self-review

**Spec coverage.** Sections 1, 2, 4, 5 → Tasks 5, 3+4, 6, unchanged. `/approach` removal → Task 7. Preview card → Task 9. Photo → Task 6. Title consistency → Task 9 Step 2. URL constant → Task 1. Section 3 → **deliberately absent, blocked, and its slot is reserved in Task 8.**

**Placeholders.** None. Every copy string is verbatim; every command is runnable.

**Type consistency.** `availability` is defined in Task 2 and consumed only in Task 3, with the same shape in both. Component export names in Task 8 match Tasks 3–6.

**Known gap, stated rather than hidden.** There is no automated test in this plan because the project has no test runner. Verification is lint, build, a real Lighthouse run, and human eyes on every link. **That is weaker than a test suite and it is the honest state of this repo**; adding one is a separate piece of work with its own argument.

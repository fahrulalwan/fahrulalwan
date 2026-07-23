# Design system — design spec

*Status: **complete and reviewed, ready to implement.** Written and reviewed 2026-07-23. Derives from `docs/brand-philosophy.md` and the research bundle at `next-job/cv-portfolio/research/2026-07-23-portfolio-design-directions.md`. The craft-proof section is specced separately in `2026-07-23-craft-proof-section-design.md`.*

*Every colour ratio in this document was computed against the actual token values. None was estimated. Re-compute before changing any of them.*

---

## What this fixes

**A visitor sees exactly one theme, whichever their machine is set to, and never compares the two.** So the defect that matters is not that the themes disagree with each other. It is that light mode, which is what most people arrive in, is the stock shadcn palette with an editorial layout sitting on top of it. The page reads as a good template rather than a made thing, and that gap is visible at a glance without any comparison.

Stated concretely:

1. **Light mode is un-customised.** Cool blue-slate (`222 84% 5%`, stock shadcn). The editorial voice lives entirely in the typography and layout; the colour foundation underneath is the default everyone ships.
2. **The two themes are different objects.** Light is cool, dark is warm charcoal (`24 10% 4%`). No single visitor sees this, but it means every future decision has to be made twice and one half always drifts.
3. **It is not a system yet.** Six colour tokens are governed and the build has twenty-one. Two fonts are declared and a third is used twenty-one times without being declared at all. Each component invents its own type scale, its own icon size, its own z-index. That is not a system with gaps, it is a set of defaults with an editorial layout on top, and §13 is the full extent of it.

## What it must serve

From the philosophy and the research, in priority order:

- **Legible above the fold, implicit below.** First impressions form in ~50ms and favour low visual complexity and high prototypicality (Lindgaard 2006, Tuch 2012). Novelty pays only *inside* a familiar frame (MAYA, Hekkert 2003). So the top of the page is calm and instantly parseable; distinctiveness lives below.
- **Polish is a credibility floor, not a differentiator.** Visual design is the dominant credibility cue (Fogg 2003), and everyone clears that bar for free now. Get it right or be disqualified; getting it right wins nothing on its own.
- **Restraint is the point, not a style.** A design practising restraint is judgment made visible. An over-designed portfolio would contradict the thesis.
- **Accessibility and performance are the competence proof.** For a correctness identity this is the highest-signal, lowest-risk work on the page, and reviewers hunt disqualifiers.

---

## 1 · Colour

One temperature across both themes. Warm paper and warm ink in light, warm charcoal in dark. A single accent hue, used sparingly.

### The full token map

⛔ **This is the complete set, not a highlight reel.** `globals.css` and `theme.css` define **21 tokens per theme**. An earlier draft of this spec governed six of them, which would have swapped the page background to warm paper while every button, dropdown, card, popover, focus ring and hover surface stayed cool blue-slate. A half-swapped palette is worse than no swap, because the mismatch is visible and looks like carelessness rather than a default.

**Light**

| Token | Value | Checked |
|---|---|---|
| `--background` | `hsl(34 44% 97.5%)` | warm paper |
| `--foreground` | `hsl(24 12% 11%)` | 16.21:1 on background |
| `--card` | `hsl(34 44% 97.5%)` | flat with the page, per §5 |
| `--card-foreground` | `hsl(24 12% 11%)` | 16.21:1 |
| `--popover` | `hsl(34 50% 99%)` | lifts above the page |
| `--popover-foreground` | `hsl(24 12% 11%)` | 16.70:1 |
| `--primary` | `hsl(24 12% 11%)` | |
| `--primary-foreground` | `hsl(34 44% 97.5%)` | 16.21:1 on primary |
| `--secondary` | `hsl(32 34% 94%)` | 15.03:1 for foreground |
| `--secondary-foreground` | `hsl(24 12% 11%)` | |
| `--muted` | `hsl(32 34% 94%)` | |
| `--muted-foreground` | `hsl(24 9% 42%)` | 5.06:1 on background, 4.69:1 on muted |
| `--accent` | `hsl(32 30% 90%)` | neutral hover surface, 13.76:1 for foreground |
| `--accent-foreground` | `hsl(24 12% 11%)` | |
| `--destructive` | `hsl(0 72% 45%)` | 5.53:1 on background |
| `--destructive-foreground` | `hsl(34 44% 97.5%)` | 5.81:1 on destructive |
| `--border` | `hsl(30 22% 87%)` | decorative hairline |
| `--input` | `hsl(30 22% 87%)` | see the input-border guard below |
| `--ring` | `hsl(18 88% 41%)` | 4.77:1 on background, clears the 3:1 focus floor |
| `--accent-warm` | `hsl(18 88% 41%)` | 4.77:1 on paper |
| `--accent-warm-inverted` | `hsl(18 88% 58%)` | 5.73:1 on the inverted block |

**Dark**

| Token | Value | Checked |
|---|---|---|
| `--background` | `hsl(24 11% 4.5%)` | warm charcoal |
| `--foreground` | `hsl(34 30% 96%)` | 18.08:1 on background |
| `--card` | `hsl(26 8% 9%)` | lifted, per §5 |
| `--card-foreground` | `hsl(34 30% 96%)` | 16.51:1 |
| `--popover` | `hsl(26 8% 11%)` | lifted above card |
| `--popover-foreground` | `hsl(34 30% 96%)` | 15.67:1 |
| `--primary` | `hsl(34 30% 96%)` | |
| `--primary-foreground` | `hsl(24 11% 4.5%)` | 18.08:1 on primary |
| `--secondary` | `hsl(26 8% 14%)` | 14.33:1 for foreground |
| `--secondary-foreground` | `hsl(34 30% 96%)` | |
| `--muted` | `hsl(26 8% 14%)` | |
| `--muted-foreground` | `hsl(28 8% 62%)` | 7.40:1 on background, 5.87:1 on muted |
| `--accent` | `hsl(26 8% 18%)` | neutral hover surface, 12.49:1 for foreground |
| `--accent-foreground` | `hsl(34 30% 96%)` | |
| `--destructive` | `hsl(0 70% 58%)` | 4.84:1 on background |
| `--destructive-foreground` | `hsl(24 11% 4.5%)` | |
| `--border` | `hsl(26 8% 16%)` | decorative hairline |
| `--input` | `hsl(26 8% 16%)` | see the input-border guard below |
| `--ring` | `hsl(20 92% 52%)` | 6.11:1 on background |
| `--accent-warm` | `hsl(20 92% 52%)` | 6.11:1 on charcoal |
| `--accent-warm-inverted` | `hsl(20 92% 40%)` | 4.56:1 on the inverted block |

### Naming traps in this map

⛔ **`--accent` is not the orange.** In the shadcn token vocabulary `--accent` is the *neutral hover surface* for menu items and list rows. The orange is `--accent-warm`. Anyone who reads "one accent hue" in this section and then writes `bg-accent` gets a beige-grey and will not immediately understand why. The names are inherited from shadcn and renaming them would break every primitive in `src/components/ui/`, so the collision stays and this warning is the mitigation.

⛔ **`--chart-1` through `--chart-5` are dead.** The `@theme inline` block in `globals.css` maps `--color-chart-1: var(--chart-1)` and so on, but neither `:root` nor `.dark` ever defines `--chart-1`. Five Tailwind colour utilities currently resolve to nothing. There are no charts on this site. **Delete the mappings** rather than inventing values for them.

⚠️ **The input border is a forward guard, not a live bug.** `--border` measures 1.27:1 against the light background and 1.35:1 against dark. That is correct for a decorative hairline and it is *not* correct for a form control, where the border is the only thing indicating an interactive region and therefore needs 3:1. **This site currently has no form**, so `--input` may equal `--border` today. The moment a contact form or a search field appears, `--input` needs its own darker value and its own computed check.

### Rules

- **One accent HUE, two tokens per theme.** No second accent, no gradient, no purple or blue glow. But a single lightness cannot serve both a paper background and a `bg-foreground` block, because the two run in opposite directions. The original single `hsl(18 88% 45%)` failed AA on both, at 4.08:1 on paper and 3.98:1 inverted, while `featured-work.tsx:53` renders the case-study metric in it at `text-lg font-semibold`, which WCAG counts as normal text. The receipt number was failing the standard the page exists to demonstrate.
- ⛔ **Text on the inverted block floors at 70% alpha.** `text-background/50` is live at `cta-section.tsx:28,36` and `case-study-content.tsx:88` and measures **3.61:1 in dark mode**, a fail on body copy and on links. `/70` gives 7.24:1 dark and 8.48:1 light. Below `/70` is decoration only, never text.
- **Accent occupies ≤3% of any viewport.** It is a highlighter, not a fill. Never a large filled button.
- ⛔ **No pure `#000` or `#fff` surfaces.** Neutrals stay tinted toward the accent hue. *(`sheet.tsx:24` currently uses `bg-black/80` for the mobile-nav backdrop. That is pure black and it violates this rule on the one surface that covers the entire viewport. It becomes `bg-foreground/80`.)*

## 2 · Typography

`Newsreader` for display and editorial moments. `Noto Sans` for body and UI.

The serif has to survive the "a serif is the default AI tell" critique, and the earlier defence — that the editorial identity is genuine and the serif is therefore earned — does not survive contact with a reader. **Nobody can verify genuine.** They see a serif, and the claim is unfalsifiable from their side, which is the same move the brand philosophy discarded when it moved the center off "judgment." So the serif gets a rule you can check by reading a diff instead:

⛔ **Newsreader appears only where it sets editorial content: a headline, a section head, a pull-quote. Never on UI chrome, never on a label, a button, a nav item, a caption, or a badge.** A serif doing UI work is decoration, and decoration is what the critique is actually about. This is checkable. "It feels earned" is not.

**Ramp locked 2026-07-23** against two rejected alternatives, rendered in the warm palette with the real copy. A higher-contrast magazine ramp (hero to 76px) was rejected because an outsized hero starts performing, which is the pitch-mode the philosophy rules out. A flatter document ramp (hero capped at 44px) was rejected because a six-second skimmer gets no landmark, which fights the explicit-above-the-fold tenet. The differentiation is supposed to come from the receipts, not the font size.

| Role | Face | Size | Notes |
|---|---|---|---|
| Display XL (hero) | Newsreader 500 | `clamp(40px, 6vw, 60px)` | `-0.02em`, line-height 1.05 |
| Display L (section) | Newsreader 500 | 32px | `-0.015em` |
| Display M | Newsreader 500 | 24px | |
| Pull-quote | Newsreader italic 400 | 20px | whole quote italic, never one word |
| Heading (UI) | Noto 600 | 18px | |
| Body L | Noto 400 | 17px | line-height 1.65 |
| Body | Noto 400 | 15px | |
| Label | Noto 500 | 11px | `0.16em`, uppercase, use-constrained per §10 |
| Data / mono | system stack, below | 12px | figures, dates, versions only |

**Mono, resolved 2026-07-23.** `globals.css` declares `--font-sans` and `--font-display` and nothing else, while `font-mono` is used 21 times across 11 files. Every one of those labels currently renders in whatever mono the visitor's operating system happens to ship.

This looked like a choice between removing mono and loading a face. It is neither, because three separate things were tangled together:

| | Call | Why |
|---|---|---|
| **Define the token** | **Yes** | Tailwind 4 ships `--font-mono` with a system stack in its own `theme.css`, so the utility exists whether or not it is declared here. Declaring it costs nothing and means anything added later that reaches for `font-mono` renders in a chosen stack rather than an accidental one. |
| **Load a webfont** | **No** | Point the token at a system stack. A third family fights the ≥95 mobile budget in §11 for texture this site barely uses. |
| **Where it is allowed** | **Real data only** | Per §10. Everything else moves to the Label row above. |

```css
--font-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
```

⛔ **The audit is the actual work and it is not optional.** Most of the 21 usages are decorative eyebrows, which §10 forbids. A few are genuinely real data and stay, such as the year at `featured-work.tsx:42` and the dates in the case-study header. Expect roughly four survivors.

*No shadcn or Base UI primitive is involved: `src/components/ui/` contains zero `font-mono` usages, so none of this touches the component layer or a future `shadcn add`.*

**Rules**

- **Display caps at ~88px.** No oversized headline that only shouts.
- **Measure 45–75 characters.** ⚠️ §6 carries the mechanism, because **no component currently uses a `ch`-based measure at all** — the site constrains prose with `max-w-lg`, `max-w-2xl` and friends, which are pixel widths that drift from the measure as the type scale changes.
- **Commit to weight contrast.** Headings differ from body by ≥300 weight units. 400 next to 600 reads like a default setting.
- **`font-variant-numeric: tabular-nums`** on any column or run of figures.
- **Tracking is size-specific.** Negative on large display, ~0 on body. A single global `letter-spacing` is wrong somewhere.
- ⛔ **No italic-emphasis word inside a roman headline.** Carry emphasis with weight or the accent colour. *(This changes the current hero.)*
- ⛔ **No gradient text.** Solid ink.
- ⛔ **Curly quotes and a real ellipsis.** Never straight quotes or `...`.
- ⛔ **No em-dashes in published copy.** Short-form copy leans to the total-ban rule; it is the strongest single AI tell.

## 3 · Spacing

4px base. Tight inside components, large jumps between sections.

```
2xs 4 · xs 8 · sm 12 · md 16 · lg 24 · xl 40 · 2xl 64 · 3xl 96 · 4xl 128
```

**Section rhythm, locked 2026-07-23: `3xl` (96px) between sections, `4xl` (128px) only immediately before the full-bleed inverted CTA.** The extra air reads as punctuation when it is rare and as padding when it is everywhere, and a uniform 128 makes the page noticeably longer to scroll for no gain. The rhythm between sections carries more of the editorial feel than any font size does.

## 4 · Radius and borders

- **Radius:** base `0.5rem`, kept. `sm 4 · md 6 · lg 8`. Modest curves, never pill-round.
- **Border width is 1px, everywhere.** There is no border scale and there should not be one. A second width is a hierarchy signal this system does not need, since §5 encodes hierarchy through surface and space instead.
- **Hairline separators stay square** and are decorative, so they are exempt from contrast minimums. They must never be the only thing marking an interactive region, which is the distinction §1's input-border guard turns on.

## 5 · Elevation and depth

The current build uses four shadow steps (`shadow-xs`, `sm`, `md`, `lg`) across eleven call sites with no rule about which means what. That is a system inviting drift.

**Depth is expressed by surface first and shadow second, and the two themes reach for different tools.**

| Level | What sits here | Light | Dark |
|---|---|---|---|
| **0 · page** | everything by default | `--background`, no shadow | `--background`, no shadow |
| **1 · raised** | cards, hover rows | `--card` flat, hairline border | `--card` lifted, no shadow |
| **2 · floating** | dropdown, popover | `--popover` + `shadow-md` | `--popover` lifted + faint shadow |
| **3 · overlay** | sheet, mobile nav | `--background` + `shadow-lg` + backdrop | same |

**Rules**

- ⛔ **In dark mode, elevation comes from a lighter surface, not a heavier shadow.** A shadow on a near-black background is close to invisible and just costs paint time. This is why `--card` and `--popover` are lifted in the dark map and flat in the light one.
- **Shadows tint to the background hue**, never neutral grey and never pure black.
- **Four levels is the whole vocabulary.** Anything that wants a fifth is asking for a hierarchy this page does not have.
- **Prefer a hairline and space over a shadow.** §8 already says cards only where elevation encodes real hierarchy; this is the same rule stated in colour terms.

## 6 · Layout primitives

The container, the measure, the breakpoints and the layering all exist in the build today as scattered literals. This section is what makes them a system.

**Container.** `max-w-(--breakpoint-lg)` with `px-5 sm:px-4`, already used at six call sites. That is the page container and it stays. Full-bleed sections break out with `.full-bleed` and re-establish the container internally for their content.

**Measure.** ⛔ **Prose blocks constrain by `ch`, not by pixel width.** §2 asks for 45–75 characters, and today the site uses `max-w-lg`, `max-w-2xl`, `max-w-sm`, `max-w-md` with **zero `ch`-based constraints anywhere**. A pixel width only matches its intended measure at one font size, so the moment the type ramp lands the measure silently drifts. Body prose uses `max-w-[65ch]`; a lead paragraph at Body L may go to `55ch`.

**Breakpoints.** Tailwind defaults, and the site is effectively two-breakpoint: 68 uses of `sm:`, 20 of `md:`, one of `lg:`. **Do not add a third.** Design mobile-first, adapt once at `sm`, use `md` only where a grid genuinely needs it.

**Layering.** ⛔ **Four different things currently sit at `z-50`**: the fixed navbar (`navbar.tsx:8`), the dropdown positioner and popup (`dropdown-menu.tsx:56,64`), the sheet backdrop and the sheet panel (`sheet.tsx:24,33`). They do not visibly collide today because they rarely coexist, which is exactly why this will surface as a bug later rather than now. A four-value scale, matching §5:

```
--z-raised    1     in-flow lift (featured-work.tsx:32 already uses this)
--z-sticky    30    the fixed navbar
--z-overlay   50    sheet backdrop, dropdown positioner
--z-popover   60    sheet panel, dropdown popup
--z-skip      100   the skip link, always on top (layout.tsx:124 already uses this)
```

## 7 · Motion

The philosophy's restraint is also the research's prescription, so this is a small system on purpose.

- **Keep scroll-reveal only.** `0.6s`, `cubic-bezier(0.16, 1, 0.3, 1)`. That curve is exactly the recommended ease-out; it stays.
- **UI transitions under 300ms.** Exits run ~75% of enter.
- **Animate `transform` and `opacity` only.** Never width, height, top, left, margin or padding.
- **`prefers-reduced-motion` collapses spatial motion** to a ≤150ms opacity crossfade.
- **Base UI animates by transition, not keyframe.** `data-starting-style` and `data-ending-style` are the entry and exit hooks, and they are already used correctly in `sheet.tsx` and `dropdown-menu.tsx`. Do not reintroduce keyframe-based enter animations from the Radix era.
- ⛔ No `ease-in` on UI, no bounce or overshoot, no `transition: all`, no `hover:scale-105` as a default, no parallax, no custom cursors, no scroll event listeners (IntersectionObserver only, already correct).
- ⛔ No universal scroll-fade-up on everything. One orchestrated entrance; let the rest simply be there.

## 8 · Layout and information architecture

- **Above the fold is explicit.** Name, level, domain, remote-readiness, legible in one glance and forwardable.
- **Below the fold is implicit.** Case studies, the craft-proof section, the receipts. The reader who stays draws the conclusion.
- **Asymmetric and left-aligned by default.** Centred layouts only for genuine manifesto moments, which the approach page already gets right.
- **Hairline separators and negative space over cards.** Cards only where elevation encodes real hierarchy (§5).
- ⛔ **No three-equal-column feature row.** A named tell.
- ⛔ **No full-viewport centred hero.** The default LLM landing page.
- ⚠️ **Ghost typography stays as a technique. Its content must be real data.** Oversized low-opacity type is a legitimate visual landmark, but a `01 / 02` index, or an uppercase kicker in the left cell of a `grid-cols-[1fr_2fr]`, is the "hanging header" tell. **Left-column labels must be real content, never decorative kickers or numbers.** Eyebrow labels cap at roughly one per three sections.
  - **This resolves a collision inside the current build.** `featured-work.tsx:26-29` renders exactly the banned pattern, a padded index (`01`, `02`, `03`) as the ghost landmark, so the two halves of this rule pointed opposite ways at the same component. **The index goes and the year takes its place** as the ghost value. The year is real data, it is already shown in the tag row, and against three case studies an "03" under a heading that says "Selected Work" reads as an inventory count rather than a curation. Reversible: if the ghost landmark is wanted without a number, drop it from that component and let the hairline separator carry the rhythm.

*The page inventory itself — which routes exist, where the craft-proof section lives, whether `/approach` survives the philosophy's move off "judgment" — is deliberately **out of scope here**. That is information architecture at a level above the design system, and settling it is a separate sitting. Nothing in §13 depends on it except the hero rework and the featured-work changes, which are marked.*

## 9 · Interactive states

Every interactive element declares all five states. A missing state is not a neutral omission, it is an element that gives no feedback in a situation the visitor will actually reach.

| State | Rule |
|---|---|
| **default** | as specified |
| **hover** | `--accent` as the surface, or the accent-warm hue on text. Never a scale transform. |
| **focus-visible** | `--ring` at 2px with a 2px offset. **Always visible, never removed.** `outline-none` is only acceptable when an explicit ring replaces it in the same class list. |
| **active** | a perceptible change, most often the next surface step down |
| **disabled** | reduced opacity plus `pointer-events-none`. Contrast minimums are relaxed here by WCAG, but the element must still read as present rather than missing. |

**Rules**

- ⛔ **Hover-state parity.** Anything revealed on `hover` is also revealed on `focus-visible`, and never carries information a touch user needs. There is no hover on a phone, and a keyboard user never triggers one. *(`featured-work.tsx:62` currently fails this: the "Read case study" affordance is `opacity-0` until `group-hover` with no focus counterpart, so it is invisible to both touch and keyboard.)*
- **Base UI signals state through data attributes, not pseudo-classes.** Menu highlighting is `data-highlighted`, not `:focus`. Open state is `data-open`. Migrating a component off Radix without translating these produces a component that compiles, renders, and silently has no hover state.
- **The whole interactive target is the target.** A card that links should have the link wrap the card, not a "read more" inside it, and the target should clear 44×44px.

## 10 · Components, icons and media

- **Base UI primitives** (`@base-ui/react`), CVA for variants, `cn()` for merging.
- **`asChild` is gone.** Use the `render` prop.
- **Mono is reserved for real data**: figures, dates, versions, commit subjects. Never decorative labelling. This is the rule the §2 audit enforces.
- **Icons are `lucide-react` at two sizes**: `size-4` inline with text, `size-5` standalone. The build currently uses `size-2`, `size-3`, `size-4`, `size-5` and `size-9` with no rule. Default stroke width, never thickened for emphasis.
- **Images carry an explicit aspect ratio and dimensions** so nothing shifts on load, and real alt text. The optional `thumbnail` on `CaseStudy` is the only image surface today. A decorative image takes `alt=""`; a meaningful one describes what it shows, never "image of".
- ⛔ No skill bars, no percentage proficiency, no badges, no "N years" trophies.

## 11 · Accessibility and performance budget

This section is not hygiene. It is the argument.

- **WCAG AA minimum**: 4.5:1 body, 3:1 large text and UI. Focus rings ≥3:1 and always visible.
- ⛔ **Every ratio is computed, never eyeballed.** An earlier version of this spec asserted AA and failed it in three places, caught only by running the numbers. Run the arithmetic against the real token values before any colour change lands, and treat `text-lg font-semibold` as normal text: WCAG's large-text exemption starts at 18.66px bold or 24px regular, which almost nothing on this site meets.
- **Font loading is part of the budget, not separate from it.** *Decided 2026-07-23: latin subset, `display: swap` stated explicitly rather than inherited, and **the Newsreader italic face is dropped**. It was loading for exactly one 14px line in the footer, and §2 permits italic only for whole pull-quotes, a role nothing currently uses. Add it back the day a pull-quote needs it. A trace after the change measured CLS 0.00, so `swap` is not costing layout stability.*
- **Print and Reader-mode legibility.** *Built 2026-07-23 as an `@media print` block in `globals.css`.* The philosophy asks for a page "legible enough to forward," and forwarding often means a PDF or a Reader view. This does not need a design, it needs to not break. The block flips the tokens to black-on-white in both themes, neutralises the `.full-bleed` inverted blocks so they do not print as a solid black slab with invisible white text, hides the fixed navbar and every `aria-hidden` decoration, drops the top padding that existed only to clear that navbar, appends `href` to external links, and stops headings stranding at a page foot.
- **Full keyboard navigation**, including any interactive element in the craft-proof section. The skip link at `layout.tsx:124` is correct and stays.
- **The error and 404 pages are in scope.** `global-error.tsx` renders its own `<html><body>` around Next's stock `NextError` and imports neither the stylesheet nor the fonts, so a crash currently shows an unstyled default page. `not-found.tsx` carries its own display scale.
- **`theme-color` matches the palette.** `layout.tsx:25-26` pins the mobile browser chrome to `#ffffff` and `#09090b`, pure white and the superseded cool zinc. On a phone that band sits directly above the page and is the first colour a visitor sees.
- **`prefers-reduced-motion` honoured everywhere.**
- **Lighthouse targets: accessibility 100, performance ≥95** on mobile.
- **No horizontal scroll at any width.** No two-line clickable text. `min-h-[100dvh]`, never `h-screen`.
- **No loading screen, ever.** Devs roast portfolio loading screens harder than plain design.
- **No broken or 404 project links.** The most-cited disqualifier after accessibility.

## 12 · The anti-tell checklist

⚠️ **This list is necessary and it is not sufficient, and the gap is worth naming.** A checklist of prohibitions produces a residue, not an identity. Delete every banned item below and what remains, warm neutrals and a serif and one orange and generous spacing and left-aligned asymmetry, is *itself* a recognisable 2026 genre. The warm editorial portfolio is as much a template as the purple-gradient one it defines itself against, and a reader who has seen five of them perceives a preset rather than restraint. Avoiding last year's tell is not the same as having a face.

**What actually carries the identity is not on this list.** It is §11 and the craft-proof section: a page that measurably works, and one section that shows a real system and real reasoning. Those are the parts a reader cannot get from a template, and they are the reason the visual system is allowed to be quiet. If the craft-proof section never ships, this checklist ships a very well-behaved template.

Nothing on this list may ship: purple or gradient hero · gradient text · Inter as display · three-column icon-card row · centred full-viewport hero · pure `#000`/`#fff` · eyebrow on every section · `01/02` section numbers · italic-emphasis word in a headline · universal scroll-fade-up · `transition: all` · fabricated or fake-precise metrics · marketing filler verbs (*elevate, seamless, supercharge, unleash, transform*) · straight quotes · em-dashes in copy · placeholder names · sparkle emoji as icons.

## 13 · Implementation

The colour half is three files. **The type half is a retrofit**: every display size in the build is an inline `clamp()`, no two of them agree, and none matches §2. Adding tokens without replacing those call sites ships a ramp nobody imports and leaves the site looking identical.

**Sequence.** Tokens first, since they are additive and break nothing. Then the type call sites file by file. Then colour. Then structure. Colour before the type retrofit means auditing contrast twice.

**Stage 1 · Tokens**

| File | Change |
|---|---|
| `src/app/globals.css` | Replace all 21 `:root` tokens with the warm light map (§1). Add `--font-mono`, the type scale, the spacing scale and the z-index scale to `@theme inline`. Delete the five dead `--color-chart-*` mappings. |
| `src/app/theme.css` | Replace all `.dark` tokens with the warm dark map (§1) |
| `src/app/layout.tsx:25-26` | `theme-color` to the new light and dark backgrounds |
| `src/app/manifest.webmanifest:8-9` | `theme_color` and `background_color` are pure `#ffffff`, against §1. These are the installed-app chrome and the splash background, a third colour surface separate from the CSS tokens and the viewport meta. |

**Stage 2 · Type — every ad-hoc display size replaced with a §2 token**

| File | Current | Goes to |
|---|---|---|
| `not-found.tsx:15` | `clamp(36px,5vw,64px)` | Display XL |
| `approach/page.tsx:33` | `clamp(32px,5vw,56px)` | Display XL |
| `cta-section.tsx:12` | `clamp(34px,4vw,52px)` | Display XL |
| `hero.tsx:14` | `clamp(32px,4.5vw,52px)` | Display XL |
| `case-study-content.tsx:81` | `clamp(32px,4vw,48px)` | Display L |
| `case-study-header.tsx:33` | `clamp(28px,4vw,44px)` | Display L |
| `featured-work.tsx:47` | `clamp(26px,3vw,38px)` | Display L |
| `approach-teaser.tsx:12` | `clamp(24px,3vw,36px)` | Display M |
| 21 `font-mono` usages, 11 files | undefined face | audit against §10 |
| every `max-w-lg` / `2xl` / `md` / `sm` on prose | pixel width | `ch`-based measure per §6 |

⚠️ **The count was wrong and the real number was twelve, not eight.** The original audit reported one `clamp()` per file, so `approach/page.tsx` contributed one row when it actually held five. Four more display sizes surfaced during the retrofit: the ghost landmark at `clamp(64px,12vw,88px)`, an inverted-block heading, and two statement paragraphs. **The ghost landmark earned a token of its own** (`--text-ghost`) rather than a ramp role, because it is decorative and `aria-hidden` and is the one thing legitimately allowed past the ~88px display cap.

⚠️ **`font-mono` went to zero decorative usages, not four.** Every survivor from the earlier estimate turned out to be a label rather than data: case-study tags are metadata, not figures, and a copyright year is boilerplate rather than a displayed number. The one remaining `font-mono` is `case-study-content.tsx:53`, and it is deleted in Stage 3 rather than restyled here (see below). **So the mono token is currently declared and unused.** That is the correct end state: it exists so that anything reaching for `font-mono` later lands on a chosen stack, and §10 still governs when it may be used.

⛔ **A second instance of the banned index turned up, and it is more literal than the first.** §8 bans "a `01 / 02` index, or an uppercase kicker in the left cell of a `grid-cols-[1fr_2fr]`." `case-study-content.tsx:53-54` renders a padded index in exactly that cell of exactly that grid. Unlike the `featured-work` case there is no year to swap in, so this needs a layout call rather than a substitution, and it is deferred to Stage 3 rather than being invented here.

*The uppercase section labels in that same left column — Context, Challenge, Reflections — are **not** the banned pattern. They are `<h2>` elements naming their section, which is real content. The rule bans decorative kickers and numbers, not headings.*

**Stage 3 · Surfaces and states**

⛔ **The obvious fix for the scrim was wrong and would have shipped a bug.** Replacing `bg-black/80` with `bg-foreground/80` satisfies the no-pure-black rule and then paints a **white wash over dark mode**, because `--foreground` is near-white there. A scrim is always dark, in both themes, which means it is not derivable from any inverting token. It needs its own: `--overlay`, `hsl(24 12% 11% / 0.72)` light and `hsl(24 11% 2% / 0.8)` dark.

| File | Change |
|---|---|
| `src/components/ui/sheet.tsx:24` | `bg-black/80` to `bg-overlay` — pure black violates §1, and see the scrim note above |
| `src/app/layout.tsx:112` | `min-h-screen` resolves to `100vh`, which is wrong under mobile browser chrome. `min-h-dvh` per §11. |
| `src/components/ui/theme-toggle.tsx:22-23` | `transition-all`, banned by §7 |
| `src/components/ui/*` | z-index literals to the §6 scale; verify Base UI state attributes per §9 |
| `src/components/landing/featured-work.tsx` | Ghost index to year (§8); `focus-visible` parity on the hover reveal at line 62 |
| `src/components/case-study/case-study-content.tsx:53` | The `01`/`02` decision index in the left cell of a `grid-cols-[1fr_2fr]`, the §8 banned pattern. No year exists to swap in, so this is a layout call: drop the index and let the decision titles carry the sequence, or drop the grid for that block and separate the decisions with hairlines. Carries the last `font-mono` usage in the codebase. |
| Icons across `src/` | `size-2/3/9` to the two-size scale in §10 |
| `src/app/global-error.tsx` | Give it the palette and the fonts, or accept a stock unstyled crash page as a written gap |

⚠️ **`global-error` is styled, and it renders light-only. That is the accepted gap, written down.** The file now declares its own stylesheet imports and font instances, because replacing the root layout means inheriting nothing. It cannot inherit the ThemeProvider either, so there is no `.dark` class and it renders in the light palette regardless of system preference. Duplicating the entire dark token set into a media-query fallback for a page this rare buys a correct theme at the cost of a second place where tokens can drift, and drift is the failure mode this whole spec exists to close. A branded light page on a crash is the better trade. Its "back to home" is deliberately a plain `<a>` rather than `next/link`: at that point the React tree is broken, and a full document load is what actually recovers.

**Stage 4 · Structure** *(the only stage that touches information architecture)*

| File | Change |
|---|---|
| `src/components/landing/hero.tsx` | Explicit above-the-fold; remove the italic-emphasis word |
| Section components | Audit left-column labels: real content, not kickers or numbers |
| All | Contrast, focus-ring, hover-parity and reduced-motion audit against §11 |

## 14 · Done means

Greppable, so it cannot be declared done by feel:

- **All 21 tokens warm, both themes.** Zero `hsl(2xx …)` cool-slate values left in `globals.css`.
- **Zero dead token mappings.** `--color-chart-*` gone.
- **Zero inline `clamp()` for display type** anywhere in `src/`. Today there are eight, no two alike.
- **`--font-mono` declared**, pointing at the system stack in §2. No webfont.
- **Every surviving `font-mono` usage is real data** per §10. Of the original 21, **zero** qualified: they were all labels or boilerplate. One usage remains at `case-study-content.tsx:53` and Stage 3 deletes it, after which the token is declared and unused, which is the intended end state.
- **Every prose block constrains by `ch`.** Today none do.
- **Zero `z-50` literals** in `src/components/ui/`; the §6 scale instead.
- **Zero pure-black or pure-white surfaces**, across all three colour surfaces: the CSS tokens, the viewport `theme-color`, and the web manifest. `sheet.tsx:24` is the known remaining one.
- **`.dark` is defined exactly once**, in `theme.css`. It was defined twice until 2026-07-23 and only import order decided the winner.
- **Computed AA pass on both themes**, including the inverted block and any accent-coloured text. Run the arithmetic; do not eyeball it.
- **One recorded Lighthouse run** on mobile against the §11 targets. *(Run 2026-07-23: **accessibility 100, SEO 100**, CLS 0.00, LCP 1447ms. Accessibility reached 100 only after a real fix — see below. Best Practices read 73 but is **not measurable in a browser with extensions**: both console errors were `_vercel/insights` and `_vercel/speed-insights` blocked by an ad blocker in the profile. CI is the only clean read.)*
- ⛔ **Performance ≥95 is NOT met and NOT yet honestly measurable.** Local medians across three routes were 0.66 to 0.71, on a loaded machine against `localhost` with no CDN. That number is not the deployed number and must not be reported as one. **It is also not evidence the target is met.** This stays open until it is measured against the deployed URL.
- **Print styles exist** and the inverted blocks do not print as black slabs.
- **Zero `transition-all`** anywhere, per §7.
- **Zero `min-h-screen` / `h-screen`**, per §11.
- **Every `hover`-revealed element has a `focus-visible` counterpart**, per §9.
- **`global-error.tsx` styled, or the gap accepted in writing.** *(Styled; the light-only limitation is accepted and recorded in §13.)*

## 15 · The gate this spec needs

§11 claims accessibility and performance are the argument, not hygiene. **Right now nothing enforces them.** The repo's only workflow is `codeql-analysis.yml`; there is no accessibility check, no Lighthouse budget, no link check. So every target in §11 is an intention, and intentions lose to the first hurried commit.

That matters more here than on a normal site. The craft-proof section stakes the whole positioning on *"my commits are the gates that decide what is allowed to merge."* A reader who absorbs that and then finds a contrast failure does not conclude "small bug." They conclude the claim was decoration.

**So: an accessibility and Lighthouse gate in CI, blocking, on `/`, `/approach`, and one case-study route.** It is a small piece of work, and it is the only part of this spec that defends itself once attention moves on.

**Built 2026-07-23** as `.github/workflows/quality-gate.yml` plus `lighthouserc.json`, using Lighthouse CI. Assertions live in the config rather than the workflow so `bunx @lhci/cli autorun` gives the same verdict locally that CI gives on a pull request.

⛔ **What blocks and what warns is a deliberate split, and it is now backed by measurement rather than by instinct.** Accessibility, SEO, contrast, heading order, `lang`, viewport and CLS are deterministic: the same page scores the same every run, so a failure is real and blocking on it is safe. **The performance score is not.** Three consecutive local runs of the same URL returned 0.36, 0.70 and 0.34; another returned 0.63, 0.25 and 0.71. A gate that fails on that spread is a gate somebody disables inside a week, which is worse than no gate at all. Performance therefore warns, with a budget, until there is enough history to set a threshold that will not cry wolf.

**Observed to fire, locally, on 2026-07-23**: three routes, three runs each, every hard assertion passing and performance warning as designed. It has not yet run in CI, because that needs a push. Until it does, the mechanism is verified but the loop is not closed (`agent-guardrails.md` § Installed ≠ operational).

There is a second reason to build it. The craft-proof spec's Accepted Risks says the one move that would make that section falsifiable is putting real gate definitions somewhere a reader can open. **This repo is already public.** A working gate here is simultaneously the enforcement §11 lacks and a small, honest, clickable instance of the thing that section describes. It is the cheapest available link between the claim and the evidence.

## 16 · Open

- ~~Type ramp and spacing~~ — **locked 2026-07-23** (§2, §3), chosen against two rendered alternatives.
- ~~Mono: drop or load~~ — **resolved 2026-07-23** (§2): seed the token, no webfont, audit usage to real data.
- ~~Partial token coverage~~ — **closed 2026-07-23** (§1): all 21 tokens mapped and computed.
- ~~The CI gate is scoped but not built~~ — **built and observed to fire locally 2026-07-23** (§15). It has not yet run in CI; that needs a push.
- ⛔ **Performance ≥95 is unverified**, and the local numbers do not stand in for it (§14). Needs a measurement against the deployed URL.
- **A real accessibility defect was found by measuring rather than by reading.** The landing page ran `h1` straight to `h3`: every section label was a `<p>`, so the sections had visual names and no semantic ones. Promoting the four landing labels to `<h2>` took accessibility from 98 to 100, and it is also what §8 already asked for, since those labels are real content. **Nine review passes over this spec did not catch it. One audit did.**
- **The page inventory is deliberately unresolved** and sits above this spec (§8). Only Stage 4 of §13 depends on it.
- The craft-proof section carries its own open gate, the owner's wife's sign-off on the exact paragraph. See its spec.

## Review closure

**Review-closure:** 3-phase pipeline complete 2026-07-23, verdict **SHIP-AFTER-FIXES**, all findings applied. A completeness pass followed the pipeline and is recorded below.

*Phase 1 (self-review + `/blindspot`, run against the live codebase rather than the document):* the spec governed tokens while the build hardcodes eight disagreeing `clamp()` display sizes, so the locked ramp would have shipped unused; `font-mono` is used 21 times with no face defined; §8 simultaneously blessed and banned the `01/02` ghost numbering that `featured-work.tsx:26` actually renders; `theme-color`, `global-error.tsx` and hover-state parity were ungoverned.

*Phase 2 (red-team + pressure-test, contrast computed rather than estimated):* the proposed accent failed AA at 4.08:1 on paper and 3.98:1 inverted, and `text-background/50` measures 3.61:1 in dark mode on live body copy and links. Fixed by splitting the accent into surface and inverted tokens and setting a 70% alpha floor. The serif's defence was unfalsifiable from a reader's side and was replaced with a checkable role constraint. "What this fixes" was reframed on the single-theme visitor. The anti-tell checklist was marked necessary-but-not-sufficient, since its residue is itself a 2026 genre.

*Phase 3 (tech-lead synthesis gate, run last on the vetted spec):* one P0, that §11 calls accessibility the argument while no CI mechanism enforces it, against a positioning built on gates. Closed as §15. Definition-of-done added so completion is greppable rather than felt.

*Completeness pass (2026-07-23, after the pipeline, prompted by the owner's instruction to finish the foundation before building on it):* the spec governed 6 of the 21 colour tokens the build actually defines, so a "warm palette" swap would have left buttons, cards, popovers, hover surfaces and focus rings cool blue-slate. All 21 are now mapped and computed for both themes (§1), along with the `--accent` naming collision, five dead `--color-chart-*` mappings, and an input-border guard. Four missing subsystems were added: elevation (§5), layout primitives covering container, measure, breakpoints and layering (§6), interactive states (§9), and icons and media (§10). Three further live violations surfaced during that pass: `sheet.tsx:24` paints the full-viewport backdrop pure black against §1; four distinct layers all sit at `z-50`; and no component anywhere constrains prose by `ch` while §2 asks for a 45–75 character measure.

# Information architecture — design spec

*Status: **reviewed, ready to implement.*** Written 2026-07-23. Derives from `docs/brand-philosophy.md`. The visual system is specced in `2026-07-23-design-system-design.md`. The craft-proof section has its own spec, kept in the private project record because its copy names a third party's business; this spec is what finally gives that section a home.*

---

## The brief

Three answers from the owner set every decision below. They are recorded because the reasoning is only legible with them.

**1 · Nobody visits yet.** Traffic is near zero. This is not a redesign serving an existing audience, it is a design for a reader the site does not have. The first real visitor will be someone who was sent the link, or someone checking after seeing a CV.

**2 · The job is verification, with a working path out.** The site is not where a stranger gets persuaded from cold. It is where somebody who already has some context confirms the person is real and competent, quickly, and gets something safe to forward to a colleague. **It is optimised against doubt, not for conversion.** A genuine contact path stays for the occasional cold reader, but it is not what the page is built around.

**3 · Checkable evidence leads.** The owner's material splits cleanly and uncomfortably:

| Checkable by a stranger, and genuinely his | Not his to show live |
|---|---|
| fartix.id, live, verified HTTP 200 — his own founded venture, still his build, recent | the coverage ratchet — private repo, current employer |
| the site itself — accessibility 100, performance 96, measured in CI on the rebuilt page (PR #1243, 2026-08-12, mobile) | the agent loop and its gates — private, and its own spec calls it "unfalsifiable by construction" |
| | caready.co.id — vendor work under a consultancy, and the live site has since been revamped by others, so a click shows work that is not his |

⚠️ **caready was demoted from checkable evidence on 2026-07-24, after the review closed.** The owner is a vendor who built the 2018 real-time layer under a consultancy, not an owner; and the live site has since been revamped, so the link no longer shows his work and its liveness cannot be claimed for his code. The case-study copy was corrected the same day (the false "still in production eight years later / still active at caready.co.id" claims removed). **caready survives as an early-career story, never as a live "check it, it's mine" link.**

**The genuinely-checkable, genuinely-his set is now fartix.id plus the site itself.** fartix is the stronger anchor than caready ever was — it is his own founded venture, not vendor work. The two strongest deep stories (the coverage ratchet, the agent loop) still cannot be shown live, so the structure holds: put the checkable things first so the unclickable ones inherit their credibility.

## The shape

**Two routes, down from three.** Routes are not the whole surface list — see the section below for the three that are not pages.

| Route | Job |
|---|---|
| `/` | The verification page. Everything needed to stop doubting, in one scroll. This is the URL that gets sent, and the one that gets forwarded. |
| `/work/[slug]` | Depth, for the reader who clicks. Structurally unchanged. |

`/approach` is removed. `404` stays.

## Surfaces that are not routes

⚠️ **The first pass at this spec was a reduction, not an inventory.** It asked "does `/approach` survive" and never asked "what surfaces should exist." Three were missed, and one of them is probably the most-seen thing in the project. Recorded here because the omission is instructive: a route list is not a surface list.

### The link-preview card — the highest-traffic surface

Distribution is the owner sending the link. So the first thing most readers see is **not the page**, it is the unfurl in Slack, WhatsApp or email. The existing card is the weakest artifact in the project and it fails on four axes at once:

1. **The copy is what the project's own rules forbid.** It reads *"An M-shaped professional with a passion for structured thinking, business impact, and innovative solutions. Bridging the gap between technology and business objectives."* `docs/product-marketing-context.md` lists "passionate" under words to avoid and says explicitly *don't sound like a LinkedIn bio*. "Bridging the gap", "driving business impact" and "innovative solutions" are marketing filler the design system's anti-tell list bans in published copy.
2. **It claims a different level than every other surface.** The card says *Senior Frontend Engineer & Tech Lead*, the JSON-LD in `layout.tsx` says *Software Engineering Lead*, the site copy says *Engineering lead*. **Three surfaces, three titles.**
3. **The photograph is taken in front of Google branding**, which the owner has no affiliation with. On the one artifact that cannot carry a caveat, that is a claim risk rather than a neutral backdrop.
4. **It is visually unrelated to the site it previews** — white background, unrelated typography, nothing from the graphite system.

**Decision: generate the card from code.** `opengraph-image.tsx` rendered with the real design tokens. It cannot drift from the palette, it gets reviewed like any other code, and the title comes from one source instead of being retyped into a JPEG. Static replacement was rejected because it drifts the next time a token moves and buries the title inside a picture.

### The CV — deliberately absent

A CV pipeline exists privately, **but its source was deprecated and is not sendable as-is**, so there is nothing to link today regardless.

⛔ **Decision: the site carries no CV, and this is a standing decision rather than a deferral.** The owner's reasoning is the operative one: a public CV carries a full name, phone number and employment history, which is exactly the material harvested for identity fraud and fake-recruiter scams. **Fear of misuse, not strategy.**

*A secondary argument points the same way and is recorded for completeness: `agent-guardrails-artifacts.md` § Don't-overshare holds that public surfaces carry evidence and standards while private surfaces carry status. A downloadable CV is a status artifact announcing candidacy. It is the same reasoning that cut "Open to roles" from the LinkedIn About.*

A recruiter who wants a CV asks, and receives a tailored copy through the channel already open. That is what the next-job runbook already does.

### The photograph — wire up the one that exists

`public/profile.webp` exists (9.9KB). `what-i-bring.tsx:13` looks for `/images/profile.jpg`, does not find it, and renders a grey gradient placeholder beside a `TODO`. **The photo was shot and never connected.**

**Decision: use it in section 4.** It is the only human element on a page that is otherwise entirely evidence, and its marginal exposure is small — a face carries no contact details and cannot be used to impersonate someone in an application, unlike a CV.

⛔ **REVISED 2026-08-10 — it does NOT go on the generated preview card, and the original decision was made without looking at the photograph.** This clause read *"and as the image on the generated preview card"* and weighed exactly one risk: whether a face leaks contact details. **Nobody had looked at the background.** It is a Google-branded floral installation, unmistakably so, with him standing directly in front of it.

The two placements are not equally exposed, which is why one survives and the other does not:

- **Section 4 keeps it.** Small, and `grayscale` kills the brand colours. The reader is already inside the page and has context.
- **The preview card does not.** It renders at 1200×630, in full colour, in every Slack, WhatsApp and LinkedIn unfurl — in front of people who will never open the page. A glance substitutes for reading there, and a Google logo at that size reads as an affiliation he does not have. On a page whose whole argument is claims without overclaim, that is the one surface where the cost is highest and the context is lowest.

A second, independent reason: the file is **192×192**. A 1200×630 card wants 240–320px for a portrait, so even a tight crop to the face upscales visibly, on the only human element of the page. The card is **typography only** — name, `Software Engineering Lead`, `Jakarta · UTC+7`, in the site's own faces.

⛔ **AND THIS DOCUMENT ALREADY KNEW. Reason #3 for replacing the old card, twenty lines above, is *"The photograph is taken in front of Google branding, which the owner has no affiliation with. On the one artifact that cannot carry a caveat, that is a claim risk rather than a neutral backdrop."*** The spec argued the risk, then reinstated it — in itself, in the same pass — by naming a different file with the same backdrop. **The failure was never missing knowledge. It was a fact stated in one section and not carried into a decision in the next.**

Nothing caught it: not this spec's own three-phase review, not its blindspot pass, not the build plan's Phase 1. It surfaced when a Phase 2 reviewer **opened the image file** rather than reading about it, on 2026-08-10, and the owner ruled the same day.

*The transferable lesson, which is worth more than the fix: a document can hold its own counter-evidence and still decide against it, because a reviewer reads for what a section CLAIMS and not for whether two sections AGREE. `profile.webp` and `opengraph-image.jpeg` are different filenames, so nothing pattern-matched them as the same problem.*

## The landing page

Five sections. The current page has six and puts narrative before proof; this inverts that.

**1 · Identity, with currently folded in.** Name, level, field, remote-readiness, and one line on what he is working on right now. One block, top of page, legible in a glance and screenshot-able into a Slack thread.

*Currently was nearly cut as "not evidence". That was wrong. One of the fastest doubts about any candidate is not "can he build" but "is this person still in it, or is this a portfolio from 2022". Recency is a property worth verifying, and a line about live work kills that doubt in the same screen as the identity facts.*

**2 · The work you can check.** Fartix leads, because it is his own founded venture, live and clickable right now, and recent. **The link working is the argument.** The coverage ratchet sits second. caready follows as an early-career story, not a live link: vendor work under a consultancy, since revamped, so it is never sold as "check it, it's mine." External evidence links open in a new tab (`target="_blank" rel="noopener"`): a verification page that navigates the reader away to fartix.id in the same tab has lost them, and losing the reader is the one thing this page cannot afford.

**3 · The gates.** The craft-proof section, specced separately, finally placed. It sits below the checkable work and is framed honestly as something describable but not showable.

*Position 3 rather than 2 is deliberate and is the most arguable call in this spec. It is the strongest material and it is sitting behind two smaller stories. The reasoning: a reader who has just clicked two working links extends more trust to the third thing than a reader who is asked to trust first. Leading with it instead is a one-line change if the owner disagrees.*

**4 · How he got here.** Fiber cables in Bali, short. The human beat, placed after the evidence rather than before it.

**5 · Contact.** The path out for the cold reader.

**Cut:** `ApproachTeaser`, which points at a route that will not exist. `WhatIBring` in its current long-form, which becomes a few lines inside section 4.

## Why `/approach` dies

It is a page of stated judgment, and three things converge against it.

The philosophy explicitly moved the centre **off** judgment, because a judgment claim is unfalsifiable and by 2026 everyone makes it. The site's job is verification. **A page whose entire content is self-description is the least verifiable artifact available**, and it currently occupies a top-level nav slot.

It also has no navigable structure: four of its sections carry `sr-only` headings, so those parts exist as prose with no visible heading at all. It reads as an essay rather than a page.

**Two lines survive** and move into section 4, where they sit next to evidence instead of floating alone:

> *"I think a lot about the engineer who'll read this code six months from now. Usually it's me."*

> *"Code is usually the easy part. Most of what slows projects down is unclear requirements, people politely agreeing to slightly different things, or teams quietly working toward different definitions of done."*

**What does not survive:** the "Clarify. Challenge. Build." ghost moment, and the opening line about asking why until it annoys people. That line is a judgment claim with nothing behind it, which is exactly what the philosophy demoted.

⚠️ **Those two surviving lines are the last of the manifesto voice.** Keeping them gives section 4 some warmth; cutting them would make the page purer verification and colder. The decision is to keep them, and it is reversible.

## Mechanical consequences

⛔ **`/approach` is referenced in seven files, not the three an earlier draft of this table claimed. The count was checked with `rg -l`, not recalled.** The draft also asserted "mobile nav already only carries `/#contact`", which was **flatly wrong** — `mobile-nav.tsx:17` carries an `Approach` link. Building from the wrong list ships a dead nav item, which is exactly the "done that isn't" this project exists to prevent. The complete list:

| File | Change |
|---|---|
| `next.config.ts` | ⛔ **Repoint `/about` → `/approach` to `/about` → `/`. Add NO `/approach` redirect** — see the correction below. |
| `src/app/approach/page.tsx` | Deleted after its two surviving lines are moved. Carries a `canonical: '/approach'` that dies with it. |
| `src/app/page.tsx` | Remove the `ApproachTeaser` import and its render. |
| `src/app/sitemap.ts` | Drop the `/approach` entry. |
| `src/components/landing/approach-teaser.tsx` | Deleted. |
| `src/components/shared/navbar.tsx` | Drop the `/approach` link. Nav becomes the name, Work, Contact. |
| `src/components/shared/mobile-nav.tsx` | Drop the `Approach` item from `navItems`. |
| `src/components/landing/` | `WhatIBring` and `Currently` fold into sections 1 and 4. |

Case study pages change structurally not at all.

## Done means

- No route, link, redirect or sitemap entry resolves to `/approach`
- `/about` reaches `/` in one hop, not two
- The landing page renders five sections in the order above
- The live link in section 2 (fartix.id) returns 200 at review time, checked rather than assumed. A dead link on a verification page is worse than no link, and §15 of the design system spec already scopes a CI link check that would make this continuous rather than one-off. caready is not a live link and carries no 200 requirement.
- The craft-proof section has a home and its own spec's preconditions are still respected
- **`curl -I /about` returns 308 to `/` in one hop** — observed to fire, not just written. **`curl -I /approach` returns 404, and that is correct** — see the correction below.
- **`git grep -in approach` finds no route reference** in `src/`, `next.config.ts`, `lighthouserc.json`, `CLAUDE.md` or `.github/`. Case-insensitive and without the leading slash, because two `CLAUDE.md` lines say "approach page" in prose and a `/approach` grep walks straight past them.

> [!warning] ⛔ `/approach` gets NO redirect. Corrected 2026-08-11, on the owner's flag and verified.
> This spec required one, and the first build plan inherited it. **The route was never deployed.** It is absent from `origin/main`, from main's `sitemap.ts`, and from main's `next.config.ts`; it was created on the `feat/portfolio-refactor` branch in `6508238` and has only ever existed there.
>
> **So no bookmark, no index entry and no inbound link to it can exist**, and a redirect would guard a URL the public has never been able to reach. The route is deleted outright.
>
> **`/about` is the opposite case and its redirect stays.** `src/app/about/page.tsx` *is* on `origin/main` — genuinely public on the February-2025 site, alongside `/experience`, `/projects`, `/skills` and `/education`. This branch deleted the page and pointed it at `/approach`, so it must be repointed to `/` or it 404s.
>
> ⛔ **This is also a correction to the review that produced this spec.** The Phase 2 pressure-test listed *"an old `/approach` bookmark"* as a stress scenario and concluded the 308 was required. **The scenario was impossible** — no such bookmark can exist — and nobody checked whether the route had ever shipped before designing a redirect for it. **A stress scenario is only as good as the premise it assumes**, and this one assumed a deployment history that a single `git ls-tree` against `origin/main` would have refuted.
- The generated preview card is confirmed by fetching the built image and viewing one real unfurl, not by assuming the file renders
- **One job title across every surface.** Today the preview card, the JSON-LD and the site copy disagree. Whatever the title is, it appears identically in all three.
- **The preview card renders from `opengraph-image.tsx` using design tokens**, and no static `opengraph-image.jpeg` / `twitter-image.jpeg` remains
- **No CV file, link, or "CV on request" line exists anywhere on the site**
- **`profile.webp` renders in section 4**, grayscaled, and no placeholder gradient or `TODO` about a photo survives. It does **not** appear on the preview card — see the revision above.

## Open

- **The craft-proof section still carries its own hard gate**: the owner of the business it describes must sign off on the exact published paragraph. This spec places the section; it does not unblock it.
- ~~**Copy for sections 1 and 4 is not written.**~~ — **closed 2026-07-24 by § Final copy below**, which locks both the hero and the origin paragraph. This line contradicted that section for twelve days; corrected 2026-08-05. Sections 2 and 5 remain drafted-but-held, and they are held on the visual language rather than on the words.
- **Em-dashes remain in published copy** across five files, which the design system's anti-tell list forbids. Unruled.
- ~~The job title is undecided~~ — **decided 2026-07-23: "Software Engineering Lead"**, applied identically to the site copy, the generated preview card, and the JSON-LD `jobTitle`. Chosen because it is already what the JSON-LD and any LLM summary read, it is broader than "Frontend" without overclaiming, and it matches the hunt's positioning. The old surfaces said three different things ("Senior Frontend Engineer & Tech Lead", "Software Engineering Lead", "Engineering lead"); this is the single value.
- **The reader arriving via an LLM is unhandled, and by 2026 it is a real path.** Someone asking an assistant "who is Mohammad Fahrul Alwan" gets an answer synthesised from the JSON-LD `jobTitle`, the meta description, and the page text — which is a form of the forwarding this site is built around, with no human in the loop. It costs nothing to serve well and it makes the title-consistency requirement load-bearing rather than cosmetic: the machine reads the structured field, not the design. No new work, but the title decision now has three consumers, not two.

## Final copy (locked 2026-07-24)

Written ground-up, not adapted from the existing site. Every line built from verified facts, in a spoken/humble register, no value-prop rhythm, no buzzwords, no em-dashes.

**Section 1 — identity** *(rewritten 2026-08-10, message-led; see the note below)*
- Eyebrow: `Fahrul Alwan`
- Opening:

> **I lead a frontend team and I'm still in the code most days.**
>
> I started working straight out of vocational school, pulling fiber into villas in Bali. Took a pay cut to under half my salary along the way. Did the degree at night, and was leading a team of five at twenty-two, nine months before I finished it.
>
> I've only been good at work I actually believed in. That's made some decisions easy and some of them expensive.

- Facts strip: `Software Engineering Lead · Jakarta · UTC+7 · Currently leading frontend at Bareksa`

*The strip is unchanged and its reasoning stands: it drops "WIB" (local jargon, redundant with UTC+7 for an international reader) and "remote-ready" (an availability plea the overshare rule bans); Jakarta stays as a plain location fact, UTC+7 as the universal overlap signal. It now also carries the whole verifiable-context load, because every sentence in the opening is a claim about private work.*

> [!note] Why the 2026-07-24 headline was replaced, recorded rather than swapped silently.
> It read *"I've been building software long enough to have strong opinions, and to distrust half of them."* It was locked, reviewed, and chosen against roughly twelve alternatives. **It is also a claim about character with no artifact under it**, which is the exact shape §1 of `docs/brand-philosophy.md` demotes, and it is the same shape as the four disposition lines cut from the live page.
>
> **What replaced it is not a better sentence, it is a different job.** The owner's brief on 2026-08-10: he wants the message to land rather than the design, and the message is that he takes work he believes in and it accumulates. Every clause of the opening is now a dated fact from his private career record, and the reader supplies the character conclusion instead of being handed it.
>
> ⛔ **Two figures were corrected while writing it, and both had been rounded in his favour.** The Tech Lead promotion preceded graduation by **nine months**, not "a year", and it happened at **twenty-two**, not the twenty-three he recalled. A first-job age was cut entirely rather than guessed, because his birthday falls inside the month the job started and the exact date is not recorded anywhere.
>
> **One clause is deliberately weaker than it could be.** *"Took a pay cut to under half my salary along the way"* originally read *"to get into software"*. The pay cut and the pivot are both documented; the causal link between them is a motive only he can confirm, and he has not. The clause returns if he does.
>
> **Still open from this rewrite:** the correction commit (*"fix the reason golongan differs, the one I had was wrong"*) was the artifact meant to sit beside the old headline, and it is the strongest single item in the evidence inventory. **It now has no home.** Its natural place is §3, where the merge-gate material lives and where it reads as a gate artifact rather than a personality trait. Decide when §3 is written.

**Section 4 — origin**
- **"I came up the long way: vocational school, fiber cable in the field, a help desk, a bootcamp. The degree came at night, after work."**

*Carries the self-made arc without boasting, and folds the BINUS Information Systems (Magna Cum Laude) credential in as "at night, after work" — verified true, specifically his, and unfakeable by a template. This resolves the credential-placement question: the degree lives inside the story rather than as a bolted-on line.*

**Section 2 — the work (locked 2026-08-10)**

- Label: **`What I've built`**
- Card order: **fartix first**, then the coverage work, then CarEADY.
- Each card carries its own status, in a normal voice rather than a badge:

> **fartix.id** · still up, still mine → live link, new tab
> **The coverage work** · private repo, so this one's a description rather than a link
> **CarEADY** · 2018, rebuilt by other people since

*The label was chosen against `Selected work` (institutional) and `Three things` (dry). The owner's brief on 2026-08-10 — **"I'd like to frame myself inclusive, not exclusive, because I don't want people to be distanced from me"** — rules out the arch options. The third status line is load-bearing: it stops a reader clicking through to CarEADY expecting to find his work.*

**Section 2b — a short list underneath (added 2026-08-10)**

- Heading: **`A few other things`**
- Three entries, each linking to its repo in a new tab:

> **tuntutan-rakyat** — a place to track protest demands during the unrest. Built quickly with a small team I led, and it ended up cited as a resource on bijakmemantau.id.
>
> **this site** — the code behind this page.
>
> **ganjil-genap** — a map for checking Jakarta's odd-even plate rule. Small, and it works.

*Three case studies someone thought hard about, then a handful of things they just made. **That combination reads like a person rather than a portfolio**, and it lets a reader find the small stuff without it having been curated at them, which is the inclusive brief in structural form.*

⛔ **`A few other things` was chosen over `Also on GitHub` for a reason that expires.** That heading points at GitHub as a *destination*, and the public account still holds ~25 unpruned repos — a `MoneyPrinterV2` fork, `old-portofolio`, `autofill-form ("ehehe")`, assorted interview tests. **Until that cleanup lands, an invitation to browse works against him.** Once it does, `Also on GitHub` becomes the better heading and it is a one-word change.

⛔ **HARD ORDERING CONSTRAINT — the `this site` entry cannot ship before the branch merges.** `main` still carries the February-2025 site and the old profile README, so that link would point a reader at the thing this rebuild replaced. **Either the link waits, or the page does.**

⛔ **Never attach a commit count to tuntutan-rakyat.** The repo total is not his personal share, and `a small team I led` is both accurate and stronger than any number available.

**Section 4 — one line inherited from `/approach` (locked 2026-08-10)**

> *"Code is usually the easy part. Most of what slows projects down is unclear requirements, people politely agreeing to slightly different things, or teams quietly working toward different definitions of done."*

*It sits after the origin paragraph. **Chosen because it is the only sentence on the site that describes a problem other engineers also have rather than describing him** — which is the inclusive brief, in the one form that costs nothing. The other survivor (*"I think a lot about the engineer who'll read this code six months from now. Usually it's me."*) is cut: it is fine, and it is about him, and the page already has enough of that.*

**Section 5 — contact (locked 2026-08-10)**

- **`Say hi.`** Unchanged from the live page.

*Chosen over `The rest is a conversation.`, the 07-24 lean, which reads arch. The owner rejected that register three separate times on 2026-08-10 — a maxim in the opening, a clever headline detail, and this — which is consistent enough to treat as a standing preference rather than three individual calls.*

**Sections 3 — status**
- **§2 — DECIDED 2026-08-10. One neutral heading, status on each card.**
  - **The heading stops promising.** It was *"the work you can check"*, over three items of which only one is checkable. A heading is a promise, and that one was writing a cheque the section could not cash.
  - **Each card carries its own status** — live, private, or historical — so the honesty moves from the heading into the rows, where it can be accurate per item.
  - ⛔ **The live card carries the live URL in that status slot.** This is the fix for a real defect: `featured-work.tsx` links every card to `/work/[slug]`, so **no working link to his own work appears anywhere on the landing page** — while this spec's own argument for leading with fartix is *"the link working is the argument"*. The argument was specified and never rendered. External links open in a new tab, per § The landing page.
  - ⛔ **The metric tile needs fixing regardless of the heading.** The component prints `results.metrics[0]` in display type; for the coverage study that is `95 / 90`, a number from a config a stranger cannot open, sitting directly above prose arguing against quoting exactly that.
  - **Two shapes were rejected:** splitting the section in two (makes the promise literally true, but awkward once the section may hold only two items), and leading with the live link as a standalone element (fixes the link problem most directly, biggest component change — the owner chose the cheaper shape with the same outcome).
  - ⚠️ **Contents are unsettled.** The coverage case study is under rewrite-or-cut, so §2 may end up holding fartix plus caready-as-early-career.
- **§3 (the gates):** copy lives in the craft-proof spec, kept privately; still gated on that sign-off.
- **§5 (contact):** light, not yet written.

## Review closure

**Review-closure:** 3-phase pipeline complete 2026-07-23, verdict **SHIP-AFTER-FIXES**, all findings applied. Run inline rather than via subagents, per the session's standing constraint.

*Phase 1 (self-review + `/blindspot`, run against the live codebase):* self-review caught an overstated beat count and a vague done-check. The blindspot pass then left the document and `rg`-counted the live references — and found the mechanical-consequences table **factually wrong**: it listed roughly three change sites when `/approach` is referenced in **seven** files, and it asserted "mobile nav already only carries `/#contact`" when `mobile-nav.tsx:17` carries an `Approach` link. Building from that table ships a dead nav item, the precise "done that isn't" the project guards against. The table was rewritten from the `rg -l` output. The pass also surfaced two entry points the route-framed spec was blind to: the `x-hello-curious` view-source easter egg (a deliberate surface, left as-is) and the LLM-summary reader (now an Open item).

*Phase 2 (red-team + pressure-test):* red-team found a mild internal tension — section 1 front-loads identity facts for a stranger while the brief says the primary reader already has context; kept, because the forwarded/screenshot case justifies it. Pressure-test walked the concrete scenarios: an old `/approach` bookmark (needs the 308, now required), the `/about` chain (repoint required, now explicit), a same-tab evidence link losing the reader (fixed: external links open in a new tab), and the LLM reader (logged). The evidence-decay case — a lead link 404ing if caready.co.id dies — is accepted rather than engineered around; the done-check verifies 200 at review, and §15's link check would make it continuous.

*Phase 3 (tech-lead synthesis gate, last):* one P0 — the wrong reference table — now closed. Two P1s: the title is undecided and sits on the critical path for section-1 copy, the OG card and the JSON-LD, so it blocks implementation and is flagged as such; and external-link behaviour, now specified. Loop-closure: the redirect and the generated card are things that must *fire*, so the done-check now requires observing them (`curl -I`, a real unfurl) rather than assuming. Definition-of-done is greppable.

- ~~This spec has not been reviewed~~ — **review complete 2026-07-23**, see above.

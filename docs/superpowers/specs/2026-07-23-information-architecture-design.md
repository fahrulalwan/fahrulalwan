# Information architecture — design spec

*Status: **reviewed, ready to implement.*** Written 2026-07-23. Derives from `docs/brand-philosophy.md`. The visual system is specced in `2026-07-23-design-system-design.md` and the craft-proof section in `2026-07-23-craft-proof-section-design.md`, which this spec finally gives a home.*

---

## The brief

Three answers from the owner set every decision below. They are recorded because the reasoning is only legible with them.

**1 · Nobody visits yet.** Traffic is near zero. This is not a redesign serving an existing audience, it is a design for a reader the site does not have. The first real visitor will be someone who was sent the link, or someone checking after seeing a CV.

**2 · The job is verification, with a working path out.** The site is not where a stranger gets persuaded from cold. It is where somebody who already has some context confirms the person is real and competent, quickly, and gets something safe to forward to a colleague. **It is optimised against doubt, not for conversion.** A genuine contact path stays for the occasional cold reader, but it is not what the page is built around.

**3 · Checkable evidence leads.** The owner's material splits cleanly and uncomfortably:

| Checkable by a stranger | Not checkable |
|---|---|
| caready.co.id, live, verified HTTP 200 | the coverage ratchet — private repo, current employer |
| fartix.id, live, verified HTTP 200 | the agent loop and its gates — private, and its own spec calls it "unfalsifiable by construction" |
| the site itself — accessibility 100, performance 98, measured in CI | |

**Two of the four strongest stories cannot be verified, and they are the two most impressive.** That is an awkward fact for a site whose job is killing doubt, and the structure below is the response to it: put the clickable things first so the unclickable thing inherits their credibility.

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

1. **The copy is what the project's own rules forbid.** It reads *"An M-shaped professional with a passion for structured thinking, business impact, and innovative solutions. Bridging the gap between technology and business objectives."* `.agents/product-marketing-context.md` lists "passionate" under words to avoid and says explicitly *don't sound like a LinkedIn bio*. "Bridging the gap", "driving business impact" and "innovative solutions" are marketing filler the design system's anti-tell list bans in published copy.
2. **It claims a different level than every other surface.** The card says *Senior Frontend Engineer & Tech Lead*, the JSON-LD in `layout.tsx` says *Software Engineering Lead*, the site copy says *Engineering lead*. **Three surfaces, three titles.**
3. **The photograph is taken in front of Google branding**, which the owner has no affiliation with. On the one artifact that cannot carry a caveat, that is a claim risk rather than a neutral backdrop.
4. **It is visually unrelated to the site it previews** — white background, unrelated typography, nothing from the graphite system.

**Decision: generate the card from code.** `opengraph-image.tsx` rendered with the real design tokens. It cannot drift from the palette, it gets reviewed like any other code, and the title comes from one source instead of being retyped into a JPEG. Static replacement was rejected because it drifts the next time a token moves and buries the title inside a picture.

### The CV — deliberately absent

A CV pipeline exists in the vault (`base-cv.md` plus one-page and two-page builders), **but the source is `status: deprecated` and marked "SKELETON … not sendable"**, so there is nothing to link today regardless.

⛔ **Decision: the site carries no CV, and this is a standing decision rather than a deferral.** The owner's reasoning is the operative one: a public CV carries a full name, phone number and employment history, which is exactly the material harvested for identity fraud and fake-recruiter scams. **Fear of misuse, not strategy.**

*A secondary argument points the same way and is recorded for completeness: `agent-guardrails-artifacts.md` § Don't-overshare holds that public surfaces carry evidence and standards while private surfaces carry status. A downloadable CV is a status artifact announcing candidacy. It is the same reasoning that cut "Open to roles" from the LinkedIn About.*

A recruiter who wants a CV asks, and receives a tailored copy through the channel already open. That is what the next-job runbook already does.

### The photograph — wire up the one that exists

`public/profile.webp` exists (9.9KB). `what-i-bring.tsx:13` looks for `/images/profile.jpg`, does not find it, and renders a grey gradient placeholder beside a `TODO`. **The photo was shot and never connected.**

**Decision: use it**, in section 4 and as the image on the generated preview card. It is the only human element on a page that is otherwise entirely evidence, and its marginal exposure is small — a face carries no contact details and cannot be used to impersonate someone in an application, unlike a CV.

## The landing page

Five sections. The current page has six and puts narrative before proof; this inverts that.

**1 · Identity, with currently folded in.** Name, level, field, remote-readiness, and one line on what he is working on right now. One block, top of page, legible in a glance and screenshot-able into a Slack thread.

*Currently was nearly cut as "not evidence". That was wrong. One of the fastest doubts about any candidate is not "can he build" but "is this person still in it, or is this a portfolio from 2022". Recency is a property worth verifying, and a line about live work kills that doubt in the same screen as the identity facts.*

**2 · The work you can check.** caready and Fartix lead, because both are live and clickable right now. **The link working is the argument.** The coverage ratchet sits third. External evidence links open in a new tab (`target="_blank" rel="noopener"`): a verification page that navigates the reader away to caready.co.id in the same tab has lost them, and losing the reader is the one thing this page cannot afford.

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
| `next.config.ts` | Add `/approach` → `/`. And ⛔ **repoint the existing `/about` → `/approach` to `/about` → `/` in the same change** — otherwise it becomes a chain ending in 404. |
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
- Both live links in section 2 return 200 at review time, checked rather than assumed. A dead link on a verification page is worse than no link, and §15 of the design system spec already scopes a CI link check that would make this continuous rather than one-off.
- The craft-proof section has a home and its own spec's preconditions are still respected
- **`curl -I /approach` returns 308 to `/`, and `curl -I /about` returns 308 to `/` in one hop** — the redirect is observed to fire, not just written
- **`rg /approach src next.config.ts` returns nothing** after the change — all seven references gone
- The generated preview card is confirmed by fetching the built image and viewing one real unfurl, not by assuming the file renders
- **One job title across every surface.** Today the preview card, the JSON-LD and the site copy disagree. Whatever the title is, it appears identically in all three.
- **The preview card renders from `opengraph-image.tsx` using design tokens**, and no static `opengraph-image.jpeg` / `twitter-image.jpeg` remains
- **No CV file, link, or "CV on request" line exists anywhere on the site**
- **`profile.webp` renders**, and no placeholder gradient or `TODO` about a photo survives

## Open

- **The craft-proof section still carries its own hard gate**: the owner's wife must sign off on the exact published paragraph. This spec places the section; it does not unblock it.
- **Copy for sections 1 and 4 is not written.** The structure is decided, the words are not.
- **Em-dashes remain in published copy** across five files, which the design system's anti-tell list forbids. Unruled.
- **The job title itself is undecided.** Three surfaces currently disagree, and picking the right one is a positioning question this spec does not answer. It only requires that the answer be applied consistently.
- **The reader arriving via an LLM is unhandled, and by 2026 it is a real path.** Someone asking an assistant "who is Mohammad Fahrul Alwan" gets an answer synthesised from the JSON-LD `jobTitle`, the meta description, and the page text — which is a form of the forwarding this site is built around, with no human in the loop. It costs nothing to serve well and it makes the title-consistency requirement load-bearing rather than cosmetic: the machine reads the structured field, not the design. No new work, but the title decision now has three consumers, not two.

## Review closure

**Review-closure:** 3-phase pipeline complete 2026-07-23, verdict **SHIP-AFTER-FIXES**, all findings applied. Run inline rather than via subagents, per the session's standing constraint.

*Phase 1 (self-review + `/blindspot`, run against the live codebase):* self-review caught an overstated beat count and a vague done-check. The blindspot pass then left the document and `rg`-counted the live references — and found the mechanical-consequences table **factually wrong**: it listed roughly three change sites when `/approach` is referenced in **seven** files, and it asserted "mobile nav already only carries `/#contact`" when `mobile-nav.tsx:17` carries an `Approach` link. Building from that table ships a dead nav item, the precise "done that isn't" the project guards against. The table was rewritten from the `rg -l` output. The pass also surfaced two entry points the route-framed spec was blind to: the `x-hello-curious` view-source easter egg (a deliberate surface, left as-is) and the LLM-summary reader (now an Open item).

*Phase 2 (red-team + pressure-test):* red-team found a mild internal tension — section 1 front-loads identity facts for a stranger while the brief says the primary reader already has context; kept, because the forwarded/screenshot case justifies it. Pressure-test walked the concrete scenarios: an old `/approach` bookmark (needs the 308, now required), the `/about` chain (repoint required, now explicit), a same-tab evidence link losing the reader (fixed: external links open in a new tab), and the LLM reader (logged). The evidence-decay case — a lead link 404ing if caready.co.id dies — is accepted rather than engineered around; the done-check verifies 200 at review, and §15's link check would make it continuous.

*Phase 3 (tech-lead synthesis gate, last):* one P0 — the wrong reference table — now closed. Two P1s: the title is undecided and sits on the critical path for section-1 copy, the OG card and the JSON-LD, so it blocks implementation and is flagged as such; and external-link behaviour, now specified. Loop-closure: the redirect and the generated card are things that must *fire*, so the done-check now requires observing them (`curl -I`, a real unfurl) rather than assuming. Definition-of-done is greppable.

- ~~This spec has not been reviewed~~ — **review complete 2026-07-23**, see above.

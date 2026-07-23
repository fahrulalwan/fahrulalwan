# Information architecture — design spec

*Status: **draft, not yet reviewed.** Written 2026-07-23. Derives from `docs/brand-philosophy.md`. The visual system is specced in `2026-07-23-design-system-design.md` and the craft-proof section in `2026-07-23-craft-proof-section-design.md`, which this spec finally gives a home.*

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

**Two surfaces, down from three.**

| Route | Job |
|---|---|
| `/` | The verification page. Everything needed to stop doubting, in one scroll. This is the URL that gets sent, and the one that gets forwarded. |
| `/work/[slug]` | Depth, for the reader who clicks. Structurally unchanged. |

`/approach` is removed. `404` stays.

## The landing page

Five sections. The current page has six and puts narrative before proof; this inverts that.

**1 · Identity, with currently folded in.** Name, level, field, remote-readiness, and one line on what he is working on right now. One block, top of page, legible in a glance and screenshot-able into a Slack thread.

*Currently was nearly cut as "not evidence". That was wrong. One of the fastest doubts about any candidate is not "can he build" but "is this person still in it, or is this a portfolio from 2022". Recency is a property worth verifying, and a line about live work kills that doubt in the same screen as the identity facts.*

**2 · The work you can check.** caready and Fartix lead, because both are live and clickable right now. **The link working is the argument.** The coverage ratchet sits third.

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

| Change | Note |
|---|---|
| `/approach` → 308 → `/` | Matches the existing old-route redirect pattern |
| `next.config.ts:7` | ⛔ **`/about` currently redirects to `/approach`.** Removing that route turns an existing redirect into a chain ending in 404. It must be repointed to `/` in the same change, not afterwards. |
| `navbar.tsx` | Drops the `/approach` link. Nav becomes the name, Work, Contact. |
| `sitemap.ts` | Drops `/approach` |
| `src/app/approach/` | Deleted after its two surviving lines are moved |
| `src/components/landing/` | `ApproachTeaser` deleted; `WhatIBring` and `Currently` fold into sections 1 and 4 |

Case study pages change structurally not at all. They already carry the current design system.

## Done means

- No route, link, redirect or sitemap entry resolves to `/approach`
- `/about` reaches `/` in one hop, not two
- The landing page renders five sections in the order above
- Both live links in section 2 return 200 at review time, checked rather than assumed. A dead link on a verification page is worse than no link, and §15 of the design system spec already scopes a CI link check that would make this continuous rather than one-off.
- The craft-proof section has a home and its own spec's preconditions are still respected

## Open

- **The craft-proof section still carries its own hard gate**: the owner's wife must sign off on the exact published paragraph. This spec places the section; it does not unblock it.
- **Copy for sections 1 and 4 is not written.** The structure is decided, the words are not.
- **Em-dashes remain in published copy** across five files, which the design system's anti-tell list forbids. Unruled.
- **This spec has not been reviewed.** Per the project workflow it needs the review pipeline before implementation.

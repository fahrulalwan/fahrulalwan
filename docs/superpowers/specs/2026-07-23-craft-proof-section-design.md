# Craft-proof section — design spec

*Status: specced, not built. Written 2026-07-23 after a multi-source research pass and an adversarial review that returned REWORK. Derives from `docs/brand-philosophy.md`. Research bundle lives in the vault at `next-job/cv-portfolio/research/2026-07-23-portfolio-design-directions.md`.*

---

## What this is

One section on the portfolio, below the fold, in the shape of a case study. **Its subject is the gates. The agent loop is only the setting.**

That ordering is the whole design. "I built an AI loop" is a crowded, hype-adjacent claim in 2026 and every hiring manager has read ten of them. "I decided what was allowed to merge, and then it stopped mattering who wrote the code" is rare, and it travels for overseas-remote hiring, where trust-at-a-distance is the entire question.

## Why it exists

From the research (four channels plus three cited papers):

- **Surface polish no longer differentiates.** The dark-minimal template circulates as a copy-paste AI prompt; polish is free now. It remains a **credibility floor** (Fogg 2003: visual design is the dominant credibility cue) but it is not a **differentiation ceiling**. Necessary, insufficient.
- **What differentiates is demonstrated craft and shown thinking**, not decoration.
- **MAYA** (Hekkert 2003, with Lindgaard 2006 and Tuch 2012): first impressions form in ~50ms and favour low complexity and high prototypicality, while overall preference peaks at novelty *inside* a familiar frame. So the editorial base carries the top of the page; the novelty lives here, below the fold, where an engaged reader meets it.
- **It must be a built artifact, not a cadence.** A blog or a posting habit would rest the site's differentiator on sustained output, which has a measured track record of not holding. This ships once and keeps paying.

## The thesis, stated once

> On an internal system I work on, an agent loop now writes most of the feature code. My own commits there are almost entirely gates, ADRs and tests, the machinery that decides whether code is allowed to merge. Built with one other engineer. I'd rather be judged on that than on the code it lets through.

That is the entire claim. It asserts **judgment**, not authorship, which is both the honest reading and the stronger signal.

⛔ **Three things this wording deliberately avoids**, each of which failed review:
- **"one of my products"** — the venture belongs to his wife. That is the struck "CTO at XPrivate" overclaim wearing a different noun, and it is trivially checkable.
- **"a loop I designed"** — a second engineer built the CI gate and the delivery-pipeline agents. Claiming sole design is the published "sole engineer" error inverted, about the same colleague.
- **any commit-share percentage** — ~6 machine commits per ticket makes it a vanity metric, it moved 76% to 88% in a single month, and an unqualified number would sit on the same site as the coverage study's line *"I would rather the config say zero and be honest than say a number and lie."*

## Structure

**1 · The problem, flat.** Two sentences. Agents generate code fine; the bottleneck is deciding whether it is allowed to land. Lead with the problem, not the achievement.

**2 · The thesis.** The paragraph above, once, unrepeated.

**3 · The gates.** The substance of the section. Each gate gets what it does and *why it was added*, which is almost always because something went wrong without it. All are verifiable in his own commits:

| Gate | What it does |
|---|---|
| **D0 foundation gate** | Nothing proceeds until the base check passes |
| **Ready is dependency-clear** | Automation decides readiness; Block is reserved for real failures |
| **Epic-order triage** | Lowest epic first, so the machine cannot cherry-pick easy work |
| **Screenshot-scored self-check** | Frontend visual tests scored against a design rubric before review |

**4 · The two principles.** Verbatim from his own commit messages. Domain-free, need no sanitizing, and they carry the judgment better than any explanation:

> *"commit it or delete it — an abandoned draft is not neutral, it runs"*
> *"E2E is killed and its tickets are deleted — the money tests are the gate now"*

The second is the strongest single line available: it is a lead deciding what stops existing.

**5 · The honest limits.** Where the loop fails and what still needs a human. This is what makes it credible rather than promotional. Keep it about the system's limits, never self-deprecation.

## What it deliberately does not do

- ❌ No business logic, product screenshots, customer data, or revenue from the venture
- ❌ No "solo" claim, and no naming the second engineer without his say
- ❌ No "I wrote N commits" — the loop wrote them
- ❌ No AI-hype framing, no marketing verbs
- ❌ **No interactive walkthrough demo.** Cut in review: a curated walkthrough of a private system is a simulation the reader knows was author-chosen. It costs days and buys no verifiability. Its budget belongs in the public gate repo below.
- ❌ **No `metaskill` link.** Making a 20KB, five-commit, five-month-stale repo the one clickable thing converts *unverifiable but credible* into *verifiable and thin*.
- ❌ Not a tutorial. Not a how-to-build-agents piece. That is the cadence trap.

## Design treatment

- **Mono for real data only** — gate names, dates, commit subjects. Never as decorative eyebrows or section numbers, both named AI-tells.
- **No italic-emphasis word inside a headline.** Carry emphasis with weight or the accent colour.
- **No em-dashes in published copy.** Short-form portfolio copy leans to the total-ban rule; it is the strongest single AI tell.
- **Below the fold.** The top of the page stays plainly legible: name, level, domain, remote-ready. This section is what the engaged two-minute reader finds.
- **Accessibility and performance are non-negotiable and are themselves the argument.** Reviewers hunt disqualifiers, and a beautiful site that fails Lighthouse or a11y writes a check the code cannot cash. For a correctness identity this is the highest-signal, lowest-risk investment on the page.

## Preconditions

| Gate | State |
|---|---|
| **Wife's sign-off on the exact published paragraph** | ⛔ **OPEN, hard.** Not sign-off on the idea. The paragraph implies her business's internal system is largely machine-written, discoverable by her partners, parents and competitors. That is her call, on the final wording. |
| **Heads-up to the second engineer** | ✅ **Owner decided to skip (2026-07-23).** Reasoning recorded so it is not re-litigated: the final copy names no company, no person, and claims nothing of his, so there is no permission to seek. The earlier mandatory gate was calibrated to a draft that said *"a loop I designed"*, which did erase him; once that wording was corrected the gate dissolved. |
| **`mission-control` → private** | ⚠️ Recommended. Its README is an internal runbook exposing VPS paths, and GitHub shows no contributor attribution to him. |
| **Public GitHub cleanup** | ⚠️ Now on the critical path, not cosmetic. A reader who clicks through lands on a `MoneyPrinterV2` fork, `old-portofolio`, and `autofill-form ("ehehe")` before finding the good work. Reviewers hunt disqualifiers. |

## Accepted risks

- **Unfalsifiable by construction.** The repo is private, so a reader takes the gates on faith. Mitigated by quoting real commit subjects rather than describing them abstractly, and by the prose carrying the reasoning. **The only move that would genuinely change this** is extracting the gate definitions and orchestrator contract into a public repo. That is the demo's redirected budget and remains the highest-leverage optional build.
- **Decay.** The situation is true as of July 2026. If the loop stops running, the section quietly becomes false. Any figure that ever enters the copy ships with an as-of date, or does not ship.

## Review closure

**Review-closure:** adversarial self-review + independent red-team complete 2026-07-23 — verdict **REWORK**, applied in full. Findings closed: the receipt sentence rewritten (three overclaims removed); the section re-centred on the gates with the loop demoted to setting; the interactive demo cut as over-build; the `metaskill` link dropped; date-stamp rule adopted for any figure. Two live overclaims discovered during review in `docs/product-marketing-context.md` were corrected the same session, independently of this section. The Tigor gate was downgraded on evidence after the copy was corrected, and the owner then closed it.

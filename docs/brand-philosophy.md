# Brand Philosophy

*The foundation the site answers to. Locked 2026-07-23, then reviewed (self-review + `/blindspot` + red-team) and reframed the same day. Everything downstream — the design system, the copy, what gets featured — derives from this. `.agents/product-marketing-context.md` operationalizes it and needs reconciling: it still opens on the conversion-funnel framing this supersedes.*

---

## 1. The center is legible, verifiable competence

Above the fold, a person skimming for six seconds knows: who you are, what level, what you've built, that you're remote-ready. The proof is the point — the coverage program to ~99% behind CI floors, a ticketing venture he founded and ran live at the stadium gate, the agent loop that writes most of the commits on a live product, the fintech-correctness work where a wrong line is real money.

This is the load-bearing signal, and it's deliberate. "Judgment" or "taste" as the *headline* is unfalsifiable, and by 2026 it's what everyone says — a skimmer can't verify a vibe. The receipts are checkable and comparatively rare. Lead with them; let judgment be the conclusion a reader draws, never the claim you open with.

## 2. The voice is a door, not a pitch — a constraint, not the strategy

How the site speaks: it states, it doesn't sell. No persuasion arc, no "why you should hire me," no impression-management. This is what keeps it from reading jumawa — the arrogance was never a word choice, it was the underlying frame of optimizing a stranger's impression, where even humility turns into a technique.

But the door governs the *voice* and the *deep pages* — not the hero. A door suits a warm/inbound reader who already wants to talk (your strongest channel). It is not a licence to make the landing a mood a cold recruiter can't place — especially an overseas one with no prior on the Indonesian market. State plainly up top; be a door everywhere the reader has already opted in.

*(Covey's Character Ethic over Personality Ethic — held as a constraint on voice, not as the site's operating goal.)*

## 3. Explicit above the fold, implicit below

Show-don't-name is right, but scoped. A skimmer won't reconstruct judgment from receipts — that needs a reader who engages. So:

- **Above the fold — explicit.** Level, domain, experience, remote-ready, in one glance. Legible enough to forward.
- **Below the fold / deep pages — implicit.** The case studies, the killed project, the correctness work. The reader who stays draws the conclusion; the site never asserts the trait.

The receipts carry the argument without naming it: the agent loop (AI-native — you direct the tools) and the correctness work (fintech stakes).

> [!warning] The third receipt was struck on 2026-08-05, and how it got here matters more than its removal.
> This section named a third item — *"the project killed after three days (judgment in action)"* — meaning the `umbrella` repo. **The repo does not support any part of that claim.** It ran 2025-10-28 to 2025-12-08, thirty-one active days across six weeks, and of its 213 commits **205 are Tigor's and 6 are Fahrul's**, all in the final three days: a Next.js dashboard scaffold, a Biome config, two merges, and the README. Three days is how long *he* was on it, not how long it lived, and it was never his to kill.
>
> **It was never verified before being promoted into this document**, and it then survived the 2026-07-10 integrity audit — the pass built to catch exactly this. It was caught only because the owner asked what Umbrella was.
>
> ⛔ **A receipt gets its repo opened before it is named here.** Commits, authorship, dates. The claim reading well is what let this one through.

⛔ **The craft-proof must be a built artifact, not a cadence.** Showing thinking is the differentiator, but for most people that means an ongoing content stream — a blog, a newsletter, weekly posts. That is the wrong shape here: the goal is to be trusted by a handful of hiring people, not to grow an audience, and sustained publishing is the one behaviour with a measured track record of not holding (~3–6% delivery against promise; hence the standing "don't position as a content creator" guardrail). **So the craft-proof is something that ships once and keeps paying** — a live interactive demo, an explorable explanation of a real system, the agent loop shown working, or one deep case-study of a single decision. Never something that needs feeding.

## 4. Verifiable context leads. One checkable artifact anchors. Private work is claimed, never counted.

*Settled 2026-08-05, after an audit that opened every named receipt against its repo.*

**The problem, stated honestly.** His strongest work is unverifiable by a stranger: the agent loop, the coverage program, `fifada-web`, `kitetsu`, the early XPrivate codebases — roughly 2,700 commits, all in private or NDA-bound repos. What is public is a football ticketing site, a protest tracker, and this repo. **A page whose signature is *"it shows its own verdicts"* cannot rest on evidence nobody can open.**

**The resolution is that "checkable" has two forms, and only one of them needs a repo.**

- **Verifiable context** — *frontend engineering lead at an OJK-licensed investment platform with 2.5M+ investors.* Every element of that is publicly checkable, none of it touches the NDA, and it is the strongest single sentence available. **It leads.**
- **A checkable artifact** — **`fartix.id`**. Live, his, still standing. **One is enough.** A second adds nothing a sceptic would weigh differently.
- **Private work is described as a claim about what he did, never as a metric.** *"Most of the commits on one live product are not written by me any more. I decided what was allowed to merge."* A hiring engineer can judge whether the person saying that understands what it means. **The 72% comes out** — not because it is false, but because it is the part that asks for faith, and asking for faith is precisely what this document refuses.

⛔ **The rule that falls out of it: no number on this site that a reader is asked to take on trust.** A figure either has a link behind it or it does not appear. That governs the coverage percentages too — they are real, they verify against the repo's own config, and **a stranger still cannot open that config**, so they are described rather than quoted.

✅ **Prerequisite — raised the same day and cleared the same day.** If the page's device is that it shows its own verdicts, the verdicts have to hold. They now do, and both numbers were checked rather than inherited:

| | Claimed | Verified 2026-08-05 |
|---|---|---|
| Accessibility | 100 | **100** — but it read **96** first, on a real defect at `footer.tsx:11`. Fixed, then re-measured. |
| Performance | 98 | **98** — LCP 0.9 s · CLS 0 · TBT 100 ms · Speed Index 0.7 s |
| SEO | 100 | **100** |

⛔ **How each was measured matters, because the first attempt gave the wrong answer.** Accessibility and SEO come from a Lighthouse navigation run; **performance comes from the Lighthouse CLI under desktop throttling, against the deployed preview** — an unthrottled localhost trace produces plausible numbers and no score at all, which is what made this claim look unverifiable for a day. **Re-measure this way, or not at all.**

⚠️ **These are the only figures on the site a reader can reproduce**, which is what earns them their place under the no-unverifiable-numbers rule above. They are also perishable: any of them can regress on a single commit, so a figure quoted in copy carries the date it was measured.

**Where this could change:** the loop becomes checkable if the ~48 non-domain rules in that repo are published — 63 total, 15 carrying `domain-` or `sesi-` prefixes. That is gated on the other engineer who co-built it, not on effort. If it happens, the loop leads on merit instead of on trust and this section gets revisited.

---

## Why it works

- **Humble** — it states and shows; it doesn't sell or claim. Restraint as voice, competence as substance.
- **Legible** — a busy or overseas recruiter gets the signal in seconds instead of bouncing.
- **Differentiated** — the receipts are checkable and rare; the "judgment/taste" claim is neither.
- **Durable to AI** — when building is commoditized, verifiable judgment about what's worth building holds its value. That's the *reasoning* behind the center — kept as reasoning, never as the headline.

## What this changes

- **Supersedes** the conversion-funnel framing in `.agents/product-marketing-context.md` (the "positioning as / what convinces them / the site IS proof" opening — the Personality Ethic, the jumawa source). That doc's *voice rules and proof-points stay*; its *framing* reconciles here. Note "the site IS the proof" also under-sells a **lead** — a lead is hired on judgment, leadership, and communication, not a static site's craft — another reason the frame is competence-shown, not site-as-proof.
- **Design + copy derive from here.** Above-fold legibility + a restrained warm palette (Direction A) + implicit depth below.

## Review closure

**Review-closure:** self-review + `/blindspot` + red-team complete 2026-07-23 — verdict REFRAME, applied. Center moved from "judgment" → legible verifiable competence; the door demoted from strategy to voice-constraint; show-don't-name scoped to below-the-fold; overclaims softened. One finding ("the portfolio is off the campaign's critical path / artifact-shield") was ruled **out of frame** — a project-prioritization call the owner owns, not an artifact-design finding. The owner deliberately prioritizes the portfolio; no critical-path warning is carried.

## Status

- **2026-07-23** — foundation locked + reviewed + reframed. Center = verifiable competence · voice = door (constraint) · IA = explicit-above / implicit-below.
- **2026-08-05** — **§4 added and the third receipt struck.** An audit opened all three named receipts against their repos for the first time: one was fabricated, one verified and was understated, one had a paragraph on the live site the owner had disowned in July. §4 settles what the page leads with now that the strongest evidence is provably unverifiable. **New standing rule: a receipt gets its repo opened — commits, authorship, dates — before it is named in this document.**
- **Next** — the copy is now the blocker, not the visual language. The landing page was rejected on 2026-08-04 for its *information*, not its design: it is built from disposition claims where every studied portfolio is built from checkable nouns. **Ground-up on content, bottom-up — facts first, layout second.** The visual language may dissolve rather than get solved, because the structure falls out of what the evidence needs.

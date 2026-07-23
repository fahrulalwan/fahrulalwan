# Skills to distill — candidate sources

Candidate skill repos to evaluate + distill into this project's design/voice workflow. **Status: captured, not yet distilled — visit later.** These feed the two axes the redesign is working: editorial **voice** (anti-AI-slop, humble/character-ethic) and **design taste**.

Distillation approach when we get to it: read each `SKILL.md` via `gh api` (don't `git clone`), pull the load-bearing rules, and fold the genuinely-useful ones into the repo `CLAUDE.md` skill stack + the design-system spec — keep what serves an *editorial portfolio*, drop SaaS-conversion/generic-landing conventions (same filter applied to `landing-page-design`).

## Candidates (added 2026-07-23)

| Repo | ★ | Description | Axis | Why relevant |
|---|---|---|---|---|
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 67k | "gives your AI good taste — stops generating boring, generic slop" | design taste | Directly the anti-generic-portfolio problem; complements `design-with-taste` |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) | 20k | "Skills for Design Engineers" (Emil Kowalski — author of Sonner, Vaul) | design craft | Animation/interaction/UI craft from a top design engineer; motion-system work (full-evolve scope) |
| [nutlope/hallmark](https://github.com/nutlope/hallmark) | 16k | "Anti-AI-slop design skill for Claude Code, Cursor, Codex" | design + slop | Design-side slop removal; cross-check against our editorial system |
| [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | 1.5k | "Removes 20+ patterns of AI slop from any piece of writing" | voice | Directly serves the humble/character-ethic voice direction; compare vs `human-communication` + `product-marketing-context` anti-patterns |

## Already installed (the current editorial stack)

`design-with-taste` · `high-end-visual-design` · `redesign-existing-projects` · `shadcn` · `migrate-radix-to-base` · `tailwindcss-mobile-first` · `web-design-guidelines` · `accessibility-review` · `copywriting` · `marketing-psychology` · `nextjs-seo` · `vercel-react-best-practices`.

⚠️ `landing-page-design` installed but flagged wrong-fit (SaaS-conversion, fights the editorial voice) — not distilled.

## Added 2026-07-24 (find-skills discovery pass — the visual-language rabbit hole)

The `anthropics/skills@frontend-design` skill (below) is the one that mattered: its calibration section named the 3 AI-design defaults and revealed all three of our "fresh" directions were clichés. **Read it first next session** — it prescribes the ground-in-the-subject + one-signature + critique-against-defaults method that the redesign now follows.

| Repo@skill | Installs | Why it matters for THIS redesign |
|---|---|---|
| `anthropics/skills@frontend-design` | 696K | ⭐ The method. Names the 3 AI-defaults; "ground it in the subject's vernacular"; one signature; critique-before-build. NOT installed — read via `gh api`. |
| `emilkowalski/skills` (apple-design · emil-design-eng · animation-vocabulary · review-animations) | — | Emil Kowalski (Sonner/Vaul). Design-engineer craft + Apple-tier detail + a real motion vocabulary. The execution layer once the signature is chosen. |
| `owl-listener/designer-skills` (typography-scale · aesthetic-usability · critique-typography) | — | Designer-grade typography + an aesthetic critique pass. |
| `anthropics/skills@theme-factory` · `@brand-guidelines` · `@canvas-design` | 69K+ | Theming + brand systems from Anthropic. |
| `leonxlnx/taste-skill@brandkit` | 170K | Brand-identity kit (same family as the installed design-with-taste / high-end-visual-design). |
| `nutlope/hallmark` · `petergyang/no-ai-slop` | 16K / 1.5K | Anti-AI-slop passes — directly the "doesn't look like a template" goal. |

Plus the tactical candidates already listed in `docs/superpowers/specs/2026-03-12-portfolio-refactor-design.md` § Candidates from skills.sh (awwwards-landing-page, awwwards-animations, micro-interactions, tailwind pattern skills) — execution-layer, lower priority than the method above.

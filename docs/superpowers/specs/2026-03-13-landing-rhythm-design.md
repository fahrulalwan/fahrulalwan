# Landing Page Section Rhythm Fix

*Date: 2026-03-13*

## Problem

Three landing page sections (WhatIBring, ApproachTeaser, CTA) use identical `grid-cols-[1fr_2fr]` layout, creating a "template" feeling.

## Solution

Vary section rhythms so each section has its own visual identity.

### Changes

**1. ApproachTeaser (`src/components/landing/approach-teaser.tsx`)**

Current: `grid-cols-1 md:grid-cols-[1fr_2fr]` with mono label left, serif text right.

Change to: Full-width centered statement. Each sentence on its own line. Last line in accent-warm. Link centered below.

- Remove grid layout
- Center-align the section
- Break the four-sentence statement into individual lines
- Apply `text-accent-warm` to the last line ("Measure what matters.")
- Center the "Read more" link below

**2. CTA Section (`src/components/shared/cta-section.tsx`)**

Current: `grid-cols-1 md:grid-cols-[1fr_2fr]` with mono label left, content right.

Change to: Flipped grid `grid-cols-1 md:grid-cols-[2fr_1fr]`. Content (headline + description + email) left. Links (GitHub, LinkedIn, location) right-aligned.

- Flip grid ratio to `[2fr_1fr]`
- Move headline, description, and email to left column
- Move GitHub, LinkedIn links to right column, stacked, right-aligned
- Add "Jakarta, ID" mono label at bottom of right column
- Remove mono label "Get in touch" from left column (headline "Let's talk." is self-explanatory in context)

### Resulting Section Rhythm

| Section | Layout | Visual Identity |
|---------|--------|-----------------|
| Hero | Left-aligned, full-width | Serif headline, accent dash |
| WhatIBring | `[1fr_2fr]` asymmetric | Mono label + body text |
| FeaturedWork | Stacked list | Background numbers, hover states |
| ApproachTeaser | Centered statement | Line breaks, accent last line |
| CTA | `[2fr_1fr]` flipped grid | Inverted bg, content-heavy left |

### Files to modify

- `src/components/landing/approach-teaser.tsx`
- `src/components/shared/cta-section.tsx`

No new files. No new dependencies.

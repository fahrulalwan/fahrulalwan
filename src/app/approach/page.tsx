import type { Metadata } from 'next';
import type { FC } from 'react';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

export const metadata: Metadata = {
  title: 'Approach',
  description:
    'How I think about product engineering. Mostly asking why before writing anything.',
  alternates: {
    canonical: '/approach',
  },
  openGraph: {
    title: 'Approach',
    description:
      'How I think about product engineering. Mostly asking why before writing anything.',
  },
};

const ApproachPage: FC = () => {
  return (
    <>
      {/* Opening — tiny entry, big air */}
      <ScrollReveal>
        <section className="pt-12 sm:pt-20 pb-10 sm:pb-12">
          <p className="text-label font-medium text-muted-foreground uppercase mb-20 sm:mb-24 flex items-center gap-3.5">
            <span
              className="w-6 h-0.5 bg-accent-warm shrink-0"
              aria-hidden="true"
            />
            Approach
          </p>

          <h1 className="font-display text-display-xl font-medium max-w-[19ch]">
            My process is mostly asking{' '}
            <em className="not-italic text-accent-warm">why</em> until I get a
            real answer. It annoys people sometimes.
          </h1>
        </section>
      </ScrollReveal>

      {/* Beat */}
      <ScrollReveal delay="0.05s">
        <section className="pb-14 sm:pb-16">
          <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
            Most of the time, the ticket isn&apos;t the real problem. Figuring
            out what&apos;s underneath it is where most of my time goes.
          </p>
        </section>
      </ScrollReveal>

      {/* Hairline */}
      <div className="w-10 h-px bg-border/50" aria-hidden="true" />

      {/* How I actually work */}
      <ScrollReveal delay="0.1s">
        <section className="pt-12 sm:pt-14 pb-5">
          <h2 className="sr-only">How I work</h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
            First, I talk to people. The PM, the designer, whoever filed the
            request. I ask until I can argue{' '}
            <em className="not-italic font-medium">against</em>{' '}the
            proposed solution. If I can&apos;t, I don&apos;t understand it yet.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="0.15s">
        <section className="py-5">
          <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
            Then I work through it on my own &mdash; challenge my own
            assumptions, read the existing code, try to see what I&apos;m
            actually walking into. If I still need it after that, I build a
            proof of concept before committing to the full thing.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="0.2s">
        <section className="pt-5 pb-12 sm:pb-14">
          <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
            This isn&apos;t a framework I read somewhere. It&apos;s just how
            I&apos;ve worked for years &mdash; and the few times I skipped it,
            I ended up paying for it later.
          </p>
        </section>
      </ScrollReveal>

      {/* Ghost typography moment */}
      <ScrollReveal delay="0.1s">
        <section className="py-5 overflow-hidden relative">
          <p
            className="font-display text-ghost text-foreground/[0.04] select-none pointer-events-none"
            aria-hidden="true"
          >
            Clarify.
            <br />
            Challenge.
            <br />
            Build.
          </p>
          <div
            className="absolute bottom-0 left-5 sm:left-4 w-0.5 h-10 bg-gradient-to-b from-accent-warm to-transparent"
            aria-hidden="true"
          />
        </section>
      </ScrollReveal>

      {/* Full-bleed inverted block */}
      <ScrollReveal delay="0.1s">
        <section className="full-bleed bg-foreground text-background py-14 sm:py-16">
          <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
            <h2 className="font-display text-display-l font-medium max-w-[22ch] mb-6">
              Some things I&apos;ve built that are still running.
            </h2>
            <p className="text-background/70 leading-relaxed max-w-[65ch] mb-5">
              Early in my career, I volunteered to architect the real-time
              communication layer for an auction platform &mdash; WebSocket,
              bidding state, multi-party sync. That system is still running
              eight years later.
            </p>
            <p className="text-background/70 leading-relaxed max-w-[65ch]">
              At a telco, I designed how the frontend and backend communicate
              for a dynamic form engine that powered an employee superapp. It
              shipped ahead of schedule &mdash; one of the few times that
              actually happened in my career.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Impact */}
      <ScrollReveal delay="0.1s">
        <section className="pt-14 sm:pt-16 pb-6">
          <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
            Leading a large-scale frontend revamp, I took the Lighthouse score
            from 15 to 70. The work was mostly removing architectural debt
            that had been slowing readers down without anyone calling it that.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="0.15s">
        <section className="pt-6 pb-14 sm:pb-16">
          <p className="font-display text-display-m font-medium max-w-[22ch]">
            I think a lot about the engineer who&apos;ll read this code six
            months from now. Usually it&apos;s{' '}
            <span className="text-accent-warm">me.</span>
          </p>
        </section>
      </ScrollReveal>

      {/* Hairline */}
      <div className="w-10 h-px bg-border/50" aria-hidden="true" />

      {/* Ownership principle */}
      <ScrollReveal delay="0.1s">
        <section className="py-12 sm:py-14">
          <h2 className="sr-only">Ownership</h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch]">
            Code is usually the easy part. Most of what slows projects down is
            unclear requirements, people politely agreeing to slightly
            different things, or teams quietly working toward different
            definitions of done. I&apos;ve learned to pay attention to that
            stuff, not just the implementation.
          </p>
        </section>
      </ScrollReveal>

      {/* Anti-positioning */}
      <ScrollReveal delay="0.1s">
        <section className="py-10 sm:py-12 bg-muted/50 -mx-5 sm:-mx-4 px-5 sm:px-4 rounded-lg">
          <h2 className="sr-only">Principles</h2>
          <p className="font-display text-display-m font-medium max-w-[22ch]">
            I don&apos;t care much about framework debates. What matters is
            whether the thing helps the people using it &mdash; and whether
            the next engineer doesn&apos;t{' '}
            <em className="not-italic text-accent-warm">hate me</em> for how I
            built it.
          </p>
        </section>
      </ScrollReveal>

      {/* Closing — the page IS the CTA */}
      <ScrollReveal delay="0.1s">
        <section className="pt-14 sm:pt-16 pb-8">
          <h2 className="sr-only">Contact</h2>
          <p className="text-sm leading-relaxed text-muted-foreground/70 max-w-[65ch] mb-5">
            If any of this resonated, say hi.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:fahrulalwan@gmail.com"
              className="link-underline text-sm font-medium transition-colors"
            >
              fahrulalwan@gmail.com
            </a>
            <a
              href="https://github.com/fahrulalwan"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/fahrulalwan"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
};

export default ApproachPage;

import type { Metadata } from 'next';
import type { FC } from 'react';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

export const metadata: Metadata = {
  title: 'Approach',
  description:
    'How I think about product engineering — from understanding the problem through shipping and measuring what matters.',
  alternates: {
    canonical: '/approach',
  },
  openGraph: {
    title: 'Approach',
    description:
      'How I think about product engineering — from understanding the problem through shipping and measuring what matters.',
  },
};

const ApproachPage: FC = () => {
  return (
    <>
      {/* Opening — tiny entry, big air */}
      <ScrollReveal>
        <section className="pt-12 sm:pt-20 pb-10 sm:pb-12">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-20 sm:mb-24 flex items-center gap-3.5">
            <span
              className="w-6 h-0.5 bg-accent-warm shrink-0"
              aria-hidden="true"
            />
            Approach
          </p>

          <h1 className="font-display text-[clamp(32px,5vw,56px)] font-normal leading-[1.1] tracking-tight max-w-[560px]">
            I don&apos;t start until I understand{' '}
            <em className="italic text-accent-warm">why</em> we&apos;re
            building it.
          </h1>
        </section>
      </ScrollReveal>

      {/* Beat */}
      <ScrollReveal delay="0.05s">
        <section className="pb-14 sm:pb-16">
          <p className="text-muted-foreground leading-relaxed max-w-[480px]">
            Not the ticket description. Not the feature request. The actual
            reason someone needs this to exist. Everything else follows from
            that.
          </p>
        </section>
      </ScrollReveal>

      {/* Hairline */}
      <div className="w-10 h-px bg-border/50" aria-hidden="true" />

      {/* How I actually work */}
      <ScrollReveal delay="0.1s">
        <section className="pt-12 sm:pt-14 pb-5">
          <h2 className="sr-only">How I work</h2>
          <p className="text-muted-foreground leading-relaxed max-w-[480px]">
            First, I talk to people. The PM, the designer, whoever filed the
            request. I ask until I can argue{' '}
            <em className="not-italic font-medium">against</em> the
            proposed solution. If I can&apos;t, I don&apos;t understand it yet.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="0.15s">
        <section className="py-5">
          <p className="text-muted-foreground leading-relaxed max-w-[480px]">
            Then I break it down myself. Challenge my own assumptions. Look at
            the existing system. Only then &mdash; if needed &mdash; I build a
            proof of concept before committing to the full thing.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="0.2s">
        <section className="pt-5 pb-12 sm:pb-14">
          <p className="text-muted-foreground leading-relaxed max-w-[480px]">
            This isn&apos;t a framework I read somewhere. It&apos;s how
            I&apos;ve worked for years &mdash; and the few times I skipped it,
            the results were worse. Every time.
          </p>
        </section>
      </ScrollReveal>

      {/* Ghost typography moment */}
      <ScrollReveal delay="0.1s">
        <section className="py-5 overflow-hidden relative">
          <p
            className="font-display text-[clamp(64px,12vw,88px)] leading-[0.85] tracking-tighter text-foreground/[0.04] select-none pointer-events-none"
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
            <h2 className="font-display text-[clamp(24px,3vw,32px)] leading-[1.25] tracking-tight max-w-[520px] mb-6">
              I design systems, not just features.
            </h2>
            <p className="text-background/60 leading-relaxed max-w-[480px] mb-5">
              Early in my career, I volunteered to architect the real-time
              communication layer for an auction platform &mdash; WebSocket,
              bidding state, multi-party sync. That system is still running
              eight years later.
            </p>
            <p className="text-background/60 leading-relaxed max-w-[480px]">
              At a telco, I designed how the frontend and backend communicate
              for a dynamic form engine that powered an employee superapp.
              Delivered ahead of schedule. Engineers liked working with it
              because the boundaries were clear.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Impact */}
      <ScrollReveal delay="0.1s">
        <section className="pt-14 sm:pt-16 pb-6">
          <p className="text-muted-foreground leading-relaxed max-w-[480px]">
            Leading a large-scale frontend revamp, I took the Lighthouse score
            from 15 to 70. Not by adding tools &mdash; by removing
            architectural debt that had accumulated for years.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay="0.15s">
        <section className="pt-6 pb-14 sm:pb-16">
          <p className="font-display text-[clamp(20px,2.5vw,26px)] leading-[1.3] tracking-tight max-w-[440px]">
            The best code I write is the code that makes the next
            engineer&apos;s job{' '}
            <span className="text-accent-warm">easier.</span>
          </p>
        </section>
      </ScrollReveal>

      {/* Hairline */}
      <div className="w-10 h-px bg-border/50" aria-hidden="true" />

      {/* Ownership principle */}
      <ScrollReveal delay="0.1s">
        <section className="py-12 sm:py-14">
          <h2 className="sr-only">Ownership</h2>
          <p className="text-muted-foreground leading-relaxed max-w-[480px]">
            Good code in a broken process still produces bad outcomes. Owning
            the implementation isn&apos;t enough &mdash; I&apos;ve learned to
            pay attention to the clarity of requirements, alignment across
            roles, and whether the team is actually moving in the same
            direction. The engineering is the easy part.
          </p>
        </section>
      </ScrollReveal>

      {/* Anti-positioning */}
      <ScrollReveal delay="0.1s">
        <section className="py-10 sm:py-12 bg-muted/50 -mx-5 sm:-mx-4 px-5 sm:px-4 rounded-lg">
          <h2 className="sr-only">Principles</h2>
          <p className="font-display text-[clamp(20px,2.5vw,26px)] leading-[1.35] tracking-tight max-w-[500px]">
            Chase the problem, not the framework.
            <br />
            Write code for the next engineer, not for yourself.
            <br />
            Ship when you understand{' '}
            <em className="italic text-accent-warm">why.</em>
          </p>
        </section>
      </ScrollReveal>

      {/* Closing — the page IS the CTA */}
      <ScrollReveal delay="0.1s">
        <section className="pt-14 sm:pt-16 pb-8">
          <h2 className="sr-only">Contact</h2>
          <p className="text-sm leading-relaxed text-muted-foreground/70 max-w-[440px] mb-5">
            If this sounds like how you want your team to work, let&apos;s
            talk.
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

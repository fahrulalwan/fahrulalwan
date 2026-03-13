import type { FC } from 'react';

const Hero: FC = () => {
  return (
    <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 sm:mb-12 flex items-center gap-3.5">
        <span
          className="w-6 h-0.5 bg-accent-warm shrink-0"
          aria-hidden="true"
        />
        Fahrul Alwan &middot; Jakarta
      </p>

      <h1 className="font-display text-[clamp(44px,6vw,80px)] font-normal leading-[0.97] tracking-tight mb-10 sm:mb-12 max-w-[800px]">
        I build products that{' '}
        <em className="italic text-accent-warm">founders</em> ship with
        confidence.
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-12">
        <p className="text-muted-foreground leading-relaxed max-w-md">
          Frontend engineer who bridges design intent and engineering reality
          &mdash; fast, accessible, no shortcuts.
        </p>

        <nav className="flex items-center gap-5 shrink-0" aria-label="Social">
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
          <a
            href="mailto:fahrulalwan@gmail.com"
            className="link-underline text-sm font-medium transition-colors"
          >
            Email
          </a>
        </nav>
      </div>
    </section>
  );
};

export default Hero;

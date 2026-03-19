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

      <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-normal leading-[1.1] tracking-tight mb-10 sm:mb-12 max-w-[640px]">
        Lately I&apos;ve been thinking about why the best code comes from
        the{' '}
        <em className="italic text-accent-warm">tightest constraints.</em>
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-12">
        <p className="text-sm text-muted-foreground">
          Engineering lead &middot; Jakarta
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

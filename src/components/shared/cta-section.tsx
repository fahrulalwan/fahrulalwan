import type { FC } from 'react';

const CtaSection: FC = () => {
  return (
    <section
      id="contact"
      className="full-bleed bg-foreground text-background py-16 sm:py-20 scroll-mt-20"
    >
      <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12 md:items-end">
          <div>
            <h2 className="font-display text-[clamp(34px,4vw,52px)] tracking-tight leading-none mb-8">
              Say hi.
            </h2>
            <a
              href="mailto:fahrulalwan@gmail.com"
              className="link-underline text-sm font-medium text-background transition-colors"
            >
              fahrulalwan@gmail.com
            </a>
          </div>

          <div className="flex flex-row md:flex-col md:items-end gap-4 md:gap-3">
            <a
              href="https://github.com/fahrulalwan"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-background/50 hover:text-background/90 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/fahrulalwan"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-background/50 hover:text-background/90 transition-colors"
            >
              LinkedIn
            </a>
            <p className="font-mono text-xs text-background/35 uppercase tracking-widest mt-0 md:mt-4">
              Jakarta, ID
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

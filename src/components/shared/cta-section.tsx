import type { FC } from 'react';

const CtaSection: FC = () => {
  return (
    <section
      id="contact"
      className="full-bleed bg-foreground text-background py-16 sm:py-20 scroll-mt-20"
    >
      <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
          <p className="font-mono text-xs tracking-widest text-background/50 uppercase">
            Get in touch
          </p>

          <div>
            <h2 className="font-display text-[clamp(34px,4vw,52px)] tracking-tight leading-none mb-4">
              Let&apos;s talk.
            </h2>
            <p className="text-background/60 mb-8 max-w-md leading-relaxed">
              Whether it&apos;s a product role, a technical challenge, or just
              an interesting conversation.
            </p>

            <div className="flex flex-wrap items-center gap-6">
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
              <a
                href="mailto:fahrulalwan@gmail.com"
                className="link-underline text-sm font-medium text-background transition-colors"
              >
                fahrulalwan@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

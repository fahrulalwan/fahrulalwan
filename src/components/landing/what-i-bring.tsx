import type { FC } from 'react';

const WhatIBring: FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          What I bring
        </p>

        <div className="space-y-4">
          <p className="text-lg sm:text-xl leading-relaxed">
            I&apos;ve spent seven years figuring out where complexity hides in
            frontend systems &mdash; and how to keep it from spreading to the
            rest of the team.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Most of that time was in fintech and consulting &mdash; which
            wasn&apos;t the plan. Before I wrote code for a living, I was
            splicing fiber cables in Bali. I just kept following the interesting
            problems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIBring;

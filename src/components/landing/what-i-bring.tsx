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
            I help product teams ship high-quality interfaces that users trust.
            I bridge the gap between design intent and engineering reality,
            keeping velocity high without accumulating debt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With several years building frontend systems across fintech and
            SaaS, I know where complexity hides and how to contain it before it
            becomes a bottleneck.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIBring;

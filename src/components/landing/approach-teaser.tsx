import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

const ApproachTeaser: FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-border/50 text-center">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 sm:mb-10">
        How I work
      </p>

      <p className="font-display text-[clamp(26px,3.2vw,40px)] leading-[1.3] tracking-tight mb-8 max-w-xl mx-auto">
        Understand the problem.
        <br />
        Frame what success looks like.
        <br />
        Ship iteratively.
        <br />
        <span className="text-accent-warm">Measure what matters.</span>
      </p>

      <Link
        href="/approach"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Read more about my approach
        <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  );
};

export default ApproachTeaser;

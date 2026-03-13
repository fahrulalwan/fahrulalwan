import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

const ApproachTeaser: FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          How I work
        </p>

        <div>
          <p className="font-display text-[clamp(26px,3.2vw,40px)] leading-[1.2] tracking-tight mb-8 max-w-xl">
            Understand the problem. Frame what success looks like. Ship
            iteratively. Measure what matters.
          </p>

          <Link
            href="/approach"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Read more about my approach
            <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ApproachTeaser;

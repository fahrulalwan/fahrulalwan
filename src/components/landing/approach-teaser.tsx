import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

const ApproachTeaser: FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-border/50 text-center">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 sm:mb-10">
        How I work
      </p>

      <p className="font-display text-[clamp(24px,3vw,36px)] leading-[1.35] tracking-tight mb-8 max-w-lg mx-auto">
        Most of my job isn&apos;t writing code. It&apos;s making sure the thing
        we&apos;re about to build actually{' '}
        <span className="text-accent-warm">needs to exist.</span>
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

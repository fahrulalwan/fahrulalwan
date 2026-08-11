'use client';

import type { FC, PropsWithChildren } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps extends PropsWithChildren {
  className?: string;
  delay?: string;
}

export const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  className,
  delay,
}) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      /* `scroll-reveal` is a stable hook for CSS that must target an element
         which has NOT yet revealed. Print and no-JS both need that: the
         observer never fires, so `animate-reveal-up` is never added, and
         opacity-0 would otherwise be the permanent state. */
      className={cn(
        'scroll-reveal opacity-0',
        isVisible && 'animate-reveal-up',
        className,
      )}
      style={delay ? { animationDelay: delay } : undefined}
    >
      {children}
    </div>
  );
};

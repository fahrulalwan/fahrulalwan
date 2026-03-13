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
      className={cn('opacity-0', isVisible && 'animate-reveal-up', className)}
      style={delay ? { animationDelay: delay } : undefined}
    >
      {children}
    </div>
  );
};

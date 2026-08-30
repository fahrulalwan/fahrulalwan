import Link from 'next/link';
import type { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
      <p className="text-label font-medium text-muted-foreground uppercase mb-8 sm:mb-12 flex items-center gap-3.5">
        <span className="w-6 h-0.5 bg-signal shrink-0" aria-hidden="true" />
        404
      </p>

      <h1 className="font-display text-display-xl font-medium mb-6 max-w-headline">
        This page doesn&apos;t exist.
      </h1>

      <p className="text-muted-foreground leading-relaxed max-w-prose mb-8">
        Whatever you were looking for isn&apos;t here. Might have moved, might
        have never existed.
      </p>

      <Link
        href="/"
        className="link-underline text-sm font-medium transition-colors"
      >
        Back to home
      </Link>
    </section>
  );
};

export default NotFoundPage;

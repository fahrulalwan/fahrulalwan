'use client';

import * as Sentry from '@sentry/nextjs';
import { Newsreader, Noto_Sans } from 'next/font/google';
import { useEffect } from 'react';
import './globals.css';
import './theme.css';

// global-error replaces the root layout entirely, so it inherits nothing: no
// stylesheet, no fonts. Everything it needs is declared here.
const noto_sans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto' });
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
});

const GlobalError = ({
  error,
}: Readonly<{ error: Error & { digest?: string } }>) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    // This page now follows the operating system like every other one, and it got
    // that for free. The dark tokens used to need a `.dark` class that only the
    // theme provider could add, and this page has no provider — so it always
    // rendered light, which was written up here as an accepted tradeoff. Moving
    // those tokens into a `prefers-color-scheme` query retired the tradeoff
    // instead of paying it: the import of theme.css below is now sufficient.
    <html
      lang="en"
      className={`${noto_sans.variable} ${newsreader.variable} font-sans`}
    >
      <body className="flex flex-col min-h-dvh bg-background text-foreground">
        <main className="grow max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4 pt-20 pb-16">
          <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
            <p className="text-label font-medium text-muted-foreground uppercase mb-8 sm:mb-12 flex items-center gap-3.5">
              <span
                className="w-6 h-0.5 bg-signal shrink-0"
                aria-hidden="true"
              />
              Error
            </p>

            <h1 className="font-display text-display-xl font-medium mb-6 max-w-[19ch]">
              Something broke on my end.
            </h1>

            <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-8">
              Not your fault. It has been reported and I will see it. Reloading
              usually works.
            </p>

            {/* Deliberately a plain anchor, not next/link. This is the global error
                boundary, so the React tree is already broken. A full document load
                resets everything; a client-side navigation may not recover. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="link-underline text-sm font-medium transition-colors"
            >
              Back to home
            </a>
          </section>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;

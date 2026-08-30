import Link from 'next/link';
import type { FC } from 'react';

const Navbar: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-sticky bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-(--breakpoint-lg) mx-auto flex items-center justify-between px-5 sm:px-4 h-14">
        <Link href="/" className="font-display text-base tracking-tight">
          Fahrul Alwan.
        </Link>

        {/* Both links, at every width. There used to be a hamburger below md
            that opened a 256px sliding panel to reveal these same two words —
            a control larger than the thing it was hiding. They fit: measured at
            320px, the narrowest real phone, with 60 page-by-width combinations
            showing no sideways scroll.

            What went with the button: mobile-nav, sheet and button were its only
            reason to exist, cn() was imported by nothing else, and that took
            @base-ui/react, class-variance-authority, clsx and tailwind-merge
            with it. 30.6 KB of gzipped JavaScript, measured either side.

            ⛔ The ceiling is real and it is four. Three items still fit at 320px
            but only just; a fourth does not, and at that point the panel has to
            come back. It is one `git revert` away in the history. */}
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-6">
          <Link
            href="/#work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Work
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium hover:text-foreground transition-colors py-2"
          >
            Say hi
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

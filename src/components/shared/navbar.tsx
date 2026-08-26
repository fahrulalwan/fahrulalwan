import Link from 'next/link';
import type { FC } from 'react';
import MobileNav from '@/components/shared/mobile-nav';

const Navbar: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-sticky bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-(--breakpoint-lg) mx-auto flex items-center justify-between px-5 sm:px-4 h-14">
        <Link href="/" className="font-display text-base tracking-tight">
          Fahrul Alwan.
        </Link>

        {/* The site's primary navigation had no <nav> at all — the links sat in a
            bare div, so there was no navigation landmark to jump to and the only
            <nav> on the whole site was the hero's Social row, on one page.

            The landmark wraps BOTH arrangements rather than the desktop row
            alone. Wrapping only the visible links would leave a phone with no
            navigation landmark until the sheet was opened, since that row is
            `hidden` below md. This way there is exactly one, always, holding
            either the links or the button that reveals them.

            A theme toggle used to sit at the end of this row, and a second copy
            of it beside the menu button. Both are gone: the theme follows the
            operating system, which the visitor has already set. */}
        <nav aria-label="Main" className="flex items-center">
          <div className="hidden md:flex items-center gap-6">
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
          </div>
          <MobileNav />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

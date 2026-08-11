import Link from 'next/link';
import type { FC } from 'react';
import MobileNav from '@/components/shared/mobile-nav';
import ThemeToggle from '@/components/ui/theme-toggle';

const Navbar: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-(--breakpoint-lg) mx-auto flex items-center justify-between px-5 sm:px-4 h-14">
        <Link
          href="/"
          className="font-display text-base tracking-tight"
        >
          Fahrul Alwan.
        </Link>

        {/* Desktop nav */}
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
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

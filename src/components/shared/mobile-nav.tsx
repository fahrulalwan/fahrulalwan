'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [{ label: 'Work', href: '/#work' }];

const MobileNav: FC = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />
      <SheetContent side="right" className="w-64">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        {/* A list, not a second <nav>. The navbar now provides the single
            navigation landmark and this sheet renders inside it, so a <nav> here
            would nest one landmark in another and, being unlabelled, would give
            a screen reader two "navigation" entries it cannot tell apart. A set
            of links is a list, which is what a list element is for. */}
        <ul className="mt-8 flex flex-col gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  pathname === item.href
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="text-sm font-medium text-foreground"
            >
              Say hi
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

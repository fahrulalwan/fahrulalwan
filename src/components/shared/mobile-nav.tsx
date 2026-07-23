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

const navItems = [
  { label: 'Approach', href: '/approach' },
  { label: 'Work', href: '/#work' },
];

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
        <nav className="mt-8 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
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
          ))}
          <Link
            href="/#contact"
            className="text-sm font-medium text-foreground"
          >
            Say hi
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

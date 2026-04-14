import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="border-t border-border/50 py-5">
      <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Fahrul Alwan
          </p>
          <p className="font-display italic text-sm text-muted-foreground/60 hidden sm:inline-flex items-baseline gap-0.5">
            Still debugging.
            <span
              className="animate-terminal-blink inline-block w-[2px] h-[12px] bg-accent-warm translate-y-[1px]"
              aria-hidden="true"
            />
          </p>
          <p className="font-mono text-xs text-muted-foreground">Jakarta, ID</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="border-t border-border/50 py-5">
      <div className="max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-label font-medium text-muted-foreground uppercase">
            &copy; {new Date().getFullYear()} Fahrul Alwan
          </p>
          {/* Sans, not Newsreader. Spec §2 line 117: the serif sets editorial
              content only — a headline, a section head, a pull-quote — and
              never a caption. This exact line already cost one correction: the
              italic face was dropped from the font budget because it loaded for
              this caption alone. */}
          <p className="text-sm text-muted-foreground hidden sm:inline-flex items-baseline gap-0.5">
            Still debugging.
            <span
              className="animate-terminal-blink inline-block w-[2px] h-[12px] bg-signal translate-y-[1px]"
              aria-hidden="true"
            />
          </p>
          <p className="text-label font-medium text-muted-foreground uppercase">Jakarta, ID</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

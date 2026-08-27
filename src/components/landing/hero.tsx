import type { FC } from 'react';

const Hero: FC = () => {
  return (
    <section className="pt-12 sm:pt-20 pb-4">
      <p className="text-label font-medium text-muted-foreground uppercase mb-8 sm:mb-12 flex items-center gap-3.5">
        <span className="w-6 h-0.5 bg-signal shrink-0" aria-hidden="true" />
        Fahrul Alwan
      </p>

      <h1 className="font-display text-display-xl font-medium mb-8 sm:mb-10 max-w-headline">
        I lead a frontend team and I&apos;m{' '}
        {/* Four words, not six — the signal colour is capped at ~3% of a
            viewport. "most days" is the hedge, so it stays outside it. */}
        <em className="not-italic text-signal">still in the code</em> most days.
      </h1>

      {/* Every clause is a dated fact. The reader draws the conclusion; the page
          does not state it. */}
      <div className="space-y-4 max-w-prose-tight mb-10 sm:mb-14">
        <p className="text-body-l">
          I started working straight out of vocational school, pulling fiber
          into villas in Bali. Took a pay cut to under half my salary along the
          way. Did the degree at night, and was leading a team of five at
          twenty-two, nine months before I finished it.
        </p>
        {/* ⛔ Keep this pointed at a problem other engineers share, not at him.
            It replaced a disposition line ("I've only been good at work I
            believed in") that pre-defended a record nobody had questioned. */}
        <p className="text-muted-foreground leading-relaxed">
          Code is usually the easy part. Most of what slows projects down is
          unclear requirements, people politely agreeing to slightly different
          things, or teams quietly working toward different definitions of done.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-12">
        {/* ⛔ The employer is NAMED, not sized — decided twice, most recently
            2026-08-26. It read "Bareksa · OJK-licensed investment platform ·
            2.5M+ investors": all true, all things Bareksa achieved standing
            where his own evidence should be. The cost is known and accepted —
            "Bareksa" does not size itself to a foreign reader. Do not restore a
            qualifier to fix that. */}
        {/* ⛔ Two <p> elements, not a conditional <br />. A `hidden sm:block`
            version had JSX collapse the whitespace around it, rendering
            "UTC+7Leading" on mobile. */}
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">
            Software Engineering Lead &middot; Jakarta &middot; UTC+7
          </p>
          {/* Foreground, not muted — it is the fact a recruiter scans for, and
              a dogfood pass found it lost in the surrounding grey. No measure
              cap: at 186px against a 416px cap it never decided a break. */}
          <p className="text-sm text-foreground">Leading frontend at Bareksa</p>
        </div>

        <nav className="flex items-center gap-5 shrink-0" aria-label="Social">
          <a
            href="https://github.com/fahrulalwan"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/fahrulalwan"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:fahrulalwan@gmail.com"
            className="link-underline text-sm font-medium transition-colors"
          >
            Email
          </a>
        </nav>
      </div>
    </section>
  );
};

export default Hero;

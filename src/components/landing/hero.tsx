import type { FC } from 'react';

const Hero: FC = () => {
  return (
    <section className="pt-12 sm:pt-20 pb-4">
      <p className="text-label font-medium text-muted-foreground uppercase mb-8 sm:mb-12 flex items-center gap-3.5">
        <span
          className="w-6 h-0.5 bg-signal shrink-0"
          aria-hidden="true"
        />
        Fahrul Alwan
      </p>

      <h1 className="font-display text-display-xl font-medium mb-8 sm:mb-10 max-w-[19ch]">
        I lead a frontend team and I&apos;m{' '}
        {/* Four words, not six. CLAUDE.md caps the signal at one or two key
            words per page and spec §1 at ~3% of a viewport; six words was half
            the headline. "most days" is the hedge, not the claim, so it reads
            in the foreground where hedges belong. */}
        <em className="not-italic text-signal">still in the code</em> most days.
      </h1>

      {/* Every clause here is a dated fact from a private career record. The
          reader draws the character conclusion; the page does not hand it over.
          That is why the strip below now carries the whole verifiable load. */}
      <div className="space-y-4 max-w-[62ch] mb-10 sm:mb-14">
        <p className="text-body-l">
          I started working straight out of vocational school, pulling fiber
          into villas in Bali. Took a pay cut to under half my salary along the
          way. Did the degree at night, and was leading a team of five at
          twenty-two, nine months before I finished it.
        </p>
        {/* Promoted from the deleted Origin section, and it replaces the belief
            line that sat here ("I've only been good at work I actually believed
            in"). That line was pure disposition, pre-defending a record nobody
            had questioned, in the most expensive space on the page.

            This one earns the slot for the opposite reason: it is the only
            sentence on the site describing a problem other engineers also have,
            rather than describing him. */}
        <p className="text-muted-foreground leading-relaxed">
          Code is usually the easy part. Most of what slows projects down is
          unclear requirements, people politely agreeing to slightly different
          things, or teams quietly working toward different definitions of done.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-12">
        {/* ⛔ The employer is sized, not just named. `brand-philosophy.md:50`
            calls this the strongest single sentence available and says it
            LEADS: every element is publicly checkable, and 2.5M+ investors is
            Bareksa's own published figure, so it clears the NDA rule that only
            figures the employer has published itself may appear.

            An earlier build said only "Currently leading frontend at Bareksa",
            which is unsizeable to anyone outside Indonesia — the reader most
            of this page is written for. */}
        {/* Two lines because they are two KINDS of thing, and chaining them
            made the eye switch modes mid-line. The first is three scannable
            tokens; the second is a sentence that has to be read. Running them
            together as one middot chain is the comma-chain failure: a set of
            facts rendered as prose, so the reader parses instead of scanning.

            Two <p> elements rather than a conditional <br />. An earlier
            version used `hidden sm:block`, and JSX collapsed the whitespace
            around it, so on mobile it rendered "UTC+7Leading". */}
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">
            Software Engineering Lead &middot; Jakarta &middot; UTC+7
          </p>
          {/* Foreground, not muted, and it is the only line in this block that
              is. A dogfood pass found the four facts a recruiter scans for set
              in the same grey as everything around them, at the smallest size
              on the screen. This is the most legible sentence on the page for
              that reader: it names the employer, what the employer is, and how
              big. Lifting it is the whole fix, and it costs no reordering. */}
          <p className="text-sm text-foreground max-w-[52ch]">
            Leading frontend at Bareksa &middot; OJK-licensed investment
            platform &middot; 2.5M+ investors
          </p>
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

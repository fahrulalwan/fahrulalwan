import type { FC } from 'react';

const Hero: FC = () => {
  return (
    <section className="pt-12 sm:pt-20 pb-4">
      <p className="text-label font-medium text-muted-foreground uppercase mb-8 sm:mb-12 flex items-center gap-3.5">
        <span className="w-6 h-0.5 bg-signal shrink-0" aria-hidden="true" />
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
        {/* ⛔ The employer is NAMED, not sized. Reversed 2026-08-26, owner's
            call, and this comment used to argue the opposite — it cited
            `brand-philosophy.md` § 4 calling the sized version "the strongest
            single sentence available". That bullet was rewritten the same day.

            It read: "Leading frontend at Bareksa · OJK-licensed investment
            platform · 2.5M+ investors". Every element was true and publicly
            checkable. The problem was never accuracy: a licence and a user
            count are things BAREKSA achieved, standing where his own evidence
            should be, on a page whose whole argument is that it does not ask
            to be taken on trust. Owner: "im not proud of it."

            Evidence behind the call, in `research/2026-08-26-github-profile-readme.md`:
            of thirteen well-known engineers' profile READMEs, three name an
            employer and NONE explains one. Addy Osmani writes "Google" and
            stops.

            ⚠️ The cost is real and was accepted rather than solved: "Bareksa"
            does not size itself to a reader outside Indonesia, which is the
            reader most of this page is written for. Two softer options were
            offered — keeping the category ("an Indonesian investment
            platform") or swapping in a figure about his own work — and both
            were declined in favour of the bare name. Do not quietly restore a
            qualifier to fix the sizing; that decision has been made twice. */}
        {/* Two lines because they are two kinds of thing: where he is, then
            what he does. Chaining them into one middot run made the eye switch
            modes mid-line.

            Two <p> elements rather than a conditional <br />. An earlier
            version used `hidden sm:block`, and JSX collapsed the whitespace
            around it, so on mobile it rendered "UTC+7Leading". */}
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">
            Software Engineering Lead &middot; Jakarta &middot; UTC+7
          </p>
          {/* Foreground, not muted, and the only line in this block that is.
              A dogfood pass found the fact a recruiter scans for set in the
              same grey as everything around it, at the smallest size on the
              screen. */}
          <p className="text-sm text-foreground max-w-[52ch]">
            Leading frontend at Bareksa
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

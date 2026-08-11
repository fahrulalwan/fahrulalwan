import type { FC } from 'react';

const currentItems = [
  'Leading a frontend team at Bareksa, trying to keep my hands on enough code to stay useful.',
  'Building a side project on Hono at Cloudflare Workers. The edge runtime keeps surprising me in small ways.',
  'Following AI agent tools lately, poking at OpenClaw and whatever else people keep releasing. Trying to spot what is actually useful.',
  'Trying to finish more of the books I start instead of adding new ones to the pile.',
];

const Hero: FC = () => {
  return (
    <section className="pt-12 sm:pt-20 pb-16 sm:pb-24">
      <p className="text-label font-medium text-muted-foreground uppercase mb-8 sm:mb-12 flex items-center gap-3.5">
        <span
          className="w-6 h-0.5 bg-signal shrink-0"
          aria-hidden="true"
        />
        Fahrul Alwan
      </p>

      <h1 className="font-display text-display-xl font-medium mb-8 sm:mb-10 max-w-[19ch]">
        I lead a frontend team and I&apos;m{' '}
        <em className="not-italic text-signal">
          still in the code most days.
        </em>
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
        <p className="text-muted-foreground leading-relaxed">
          I&apos;ve only been good at work I actually believed in. That&apos;s
          made some decisions easy and some of them expensive.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-12">
        <p className="text-sm text-muted-foreground">
          Software Engineering Lead &middot; Jakarta &middot; UTC+7 &middot;
          Currently leading frontend at Bareksa
        </p>

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

      {/* Folded in from its own section. It was answering the same question the
          opening now answers, one scroll later, so it reads as a coda to the
          identity rather than a stop of its own. */}
      <div className="mt-16 sm:mt-20 pt-10 border-t border-border/50">
        <h2 className="text-label font-medium text-muted-foreground uppercase mb-8 sm:mb-10">
          Currently
        </h2>

        <ul className="space-y-6 max-w-[65ch]">
          {currentItems.map((item) => (
            <li
              key={item}
              className="flex gap-4 text-muted-foreground leading-relaxed"
            >
              <span
                className="w-3 h-px bg-signal shrink-0 mt-3"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;

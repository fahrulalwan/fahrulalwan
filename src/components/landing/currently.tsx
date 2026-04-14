import type { FC } from 'react';

const currentItems = [
  'Leading a frontend team at Bareksa, trying to keep my hands on enough code to stay useful.',
  'Building a side project on Hono at Cloudflare Workers. The edge runtime keeps surprising me in small ways.',
  'Following AI agent tools lately, poking at OpenClaw and whatever else people keep releasing. Trying to spot what is actually useful.',
  'Trying to finish more of the books I start instead of adding new ones to the pile.',
];

const Currently: FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-border/50">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-10 sm:mb-12">
        Currently
      </p>

      <ul className="space-y-6 max-w-2xl">
        {currentItems.map((item) => (
          <li
            key={item}
            className="flex gap-4 text-muted-foreground leading-relaxed"
          >
            <span
              className="font-mono text-accent-warm shrink-0 pt-0.5"
              aria-hidden="true"
            >
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Currently;

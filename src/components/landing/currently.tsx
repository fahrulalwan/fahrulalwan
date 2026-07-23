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
      <h2 className="text-label font-medium text-muted-foreground uppercase mb-10 sm:mb-12">
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
    </section>
  );
};

export default Currently;

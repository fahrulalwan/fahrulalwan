import Image from 'next/image';
import type { FC } from 'react';

const currentItems = [
  'Building a side project on Hono at Cloudflare Workers. The edge runtime keeps surprising me in small ways.',
  'Following AI agent tools lately, poking at OpenClaw and whatever else people keep releasing. Trying to spot what is actually useful.',
  'Trying to finish more of the books I start instead of adding new ones to the pile.',
];

/**
 * ⛔ Belongs below the work, not inside the opening. Above it, the first
 * openable link sat 48% down the page; here it is 35% and the opening ends on
 * one screen.
 */
const Currently: FC = () => {
  return (
    <section className="pt-4 pb-16 sm:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
        <div>
          <h2 className="text-label font-medium text-muted-foreground uppercase mb-6">
            Currently
          </h2>
          {/* Source is 192x192, so the portrait box is deliberately small. It
              does NOT go on the preview card — that surface renders at full
              size without context, and the background is a Google installation
              he has no affiliation with. */}
          <Image
            src="/profile.webp"
            alt="Fahrul Alwan"
            width={192}
            height={192}
            className="w-32 h-40 sm:w-36 sm:h-44 rounded-sm object-cover grayscale"
          />
        </div>

        <ul className="space-y-6 max-w-prose-tight">
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

export default Currently;

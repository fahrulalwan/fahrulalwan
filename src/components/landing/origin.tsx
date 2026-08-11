import Image from 'next/image';
import type { FC } from 'react';

const Origin: FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
        <div>
          <h2 className="text-label font-medium text-muted-foreground uppercase mb-6">
            How I got here
          </h2>
          {/* Shot in November 2024 and never connected: the component this
              replaces pointed at /images/profile.jpg, which does not exist, and
              rendered a grey gradient beside a TODO.

              Source is 192x192. The portrait box crops toward the centre, which
              is wanted here. It does NOT go on the preview card — that surface
              is seen at full size without context, and the background is a
              Google installation he has no affiliation with. */}
          <Image
            src="/profile.webp"
            alt="Fahrul Alwan"
            width={192}
            height={192}
            className="w-32 h-40 sm:w-36 sm:h-44 rounded-sm object-cover grayscale"
          />
        </div>

        <div className="space-y-4 max-w-[62ch]">
          <p className="text-body-l">
            I came up the long way: vocational school, fiber cable in the field,
            a help desk, a bootcamp. The degree came at night, after work.
          </p>
          {/* Inherited from /approach. Kept because it is the only sentence on
              the site that describes a problem other engineers also have,
              rather than describing him. */}
          <p className="text-muted-foreground leading-relaxed">
            Code is usually the easy part. Most of what slows projects down is
            unclear requirements, people politely agreeing to slightly different
            things, or teams quietly working toward different definitions of
            done.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Origin;

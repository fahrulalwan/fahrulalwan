import type { FC } from 'react';

/**
 * `href` is where the thing actually lives and runs. `repo` is the source.
 *
 * An entry with both leads on the live one, because a working link is a
 * stronger argument than a repository a reader has to build in their head.
 * `this site` has no `href` on purpose — the reader is already on it.
 */
const things = [
  {
    name: 'tuntutan-rakyat',
    href: 'https://tuntutanrakyat.space',
    repo: 'https://github.com/fahrulalwan/tuntutan-rakyat',
    note: 'A place to track protest demands during the unrest. Built quickly with a small team I led, and it ended up cited as a resource on bijakmemantau.id.',
  },
  {
    name: 'this site',
    repo: 'https://github.com/fahrulalwan/fahrulalwan',
    note: 'The code behind this page.',
  },
  {
    name: 'ganjil-genap',
    href: 'https://ganjil-genap.vercel.app',
    repo: 'https://github.com/fahrulalwan/ganjil-genap',
    note: "A map for checking Jakarta's odd-even plate rule. Small, and it works.",
  },
];

const OtherThings: FC = () => {
  return (
    <section className="pt-20 sm:pt-24 pb-16 sm:pb-20">
      <div className="mb-12 sm:mb-14">
          <span
            className="block w-6 h-0.5 bg-signal/60 mb-5"
            aria-hidden="true"
          />
          <h2 className="text-label font-medium text-muted-foreground uppercase mb-0">
        A few other things
      </h2>
        </div>

      <ul className="space-y-10 max-w-[65ch]">
        {things.map((thing) => {
          const primary = thing.href ?? thing.repo;

          return (
            <li key={thing.name}>
              {/* display-m, one step under the case-study headlines at
                  display-l. These are the smaller things and the type says so. */}
              <h3 className="font-display text-display-m font-medium mb-2">
                <a
                  href={primary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors duration-300 hover:text-signal"
                >
                  {thing.name}
                </a>
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-2">
                {thing.note}
              </p>

              {/* Only shown when the primary link is the live site, so the source
                  is still one click away without repeating the same URL twice. */}
              {thing.href && (
                <a
                  href={thing.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label font-medium text-muted-foreground uppercase link-underline hover:text-foreground transition-colors"
                >
                  Source
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default OtherThings;

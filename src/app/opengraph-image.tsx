import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/**
 * The link preview card, generated rather than exported.
 *
 * Distribution is him sending the link, so for most readers this is the first
 * thing they see and often the only thing. What it replaced was a JPEG that
 * carried LinkedIn-bio copy, a job title matching no other surface, and a photo
 * shot in front of a Google installation he has no affiliation with. A picture
 * cannot be reviewed, cannot be diffed, and drifts the moment a token moves.
 *
 * ⛔ No photograph on this card, by owner ruling 2026-08-11. It is seen at full
 * size without context, which is the one place a claim cannot carry a caveat.
 *
 * ⛔ Fonts are vendored because `ImageResponse` registers exactly one font when
 * none is passed — Geist at weight 400, a face this site does not use. Both
 * files are OFL, and they are read at build time only, so they add nothing to
 * what a visitor downloads.
 */

// ⛔ Unaffected by the `noimageindex` in layout.tsx, and the distinction matters
// because the two look like they should collide. `noimageindex` is a directive to
// Google's crawler about indexing images in image search. A social unfurl on
// LinkedIn, X or Slack is not a crawl — those platforms read the `og:image` meta
// tag and obey no robots directive at all. So the portrait stays out of Google
// Images and this card still renders wherever the link is pasted.
export const alt = 'Fahrul Alwan, Software Engineering Lead in Jakarta';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Read from src/app/globals.css and src/app/theme.css rather than approximated.
// The dark palette, because that is the site's default theme.
const BACKGROUND = 'hsl(215 18% 6%)'; // graphite
const FOREGROUND = 'hsl(210 16% 95%)'; // 17.16:1 on background
const MUTED = 'hsl(213 9% 62%)'; // 7.03:1 on background
const SIGNAL = 'hsl(188 72% 54%)'; // 9.55:1 on graphite

const OpengraphImage = async () => {
  const [newsreader, notoSans] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/fonts/Newsreader-Medium.ttf')),
    readFile(join(process.cwd(), 'src/app/fonts/NotoSans-Regular.ttf')),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: BACKGROUND,
        padding: '84px 96px',
      }}
    >
      {/* The same signal hairline the page opens with. */}
      <div
        style={{
          width: 64,
          height: 4,
          background: SIGNAL,
          marginBottom: 40,
        }}
      />

      <div
        style={{
          fontFamily: 'Newsreader',
          fontSize: 92,
          color: FOREGROUND,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }}
      >
        Fahrul Alwan
      </div>

      {/* Must match layout.tsx's JSON-LD jobTitle exactly. Five surfaces
          disagreeing on the title is the defect this card replaces. */}
      <div
        style={{
          fontFamily: 'Noto Sans',
          fontSize: 32,
          color: MUTED,
          marginTop: 28,
          letterSpacing: '0.01em',
        }}
      >
        Software Engineering Lead · Jakarta · UTC+7
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: newsreader, weight: 500, style: 'normal' },
        { name: 'Noto Sans', data: notoSans, weight: 400, style: 'normal' },
      ],
    },
  );
};

export default OpengraphImage;

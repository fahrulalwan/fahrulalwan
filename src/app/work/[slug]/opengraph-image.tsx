import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getAllCaseSlugs, getCaseStudy } from '@/content/case-studies';

/**
 * The link preview card for a single case study.
 *
 * Without this file all three studies fall back to the root card, so sharing
 * `/work/fartix-ticketing-platform` shows a preview naming the person rather
 * than the work. The title and description in the unfurl were already correct
 * from `generateMetadata`; the image was the one part still saying something
 * generic, and the image is the half a reader actually looks at.
 *
 * ⛔ Same skin as the root card on purpose. It is one visual identity across
 * every share, and the colours below are read from globals.css / theme.css
 * rather than approximated. Restyle both files or neither.
 */

export const generateStaticParams = () => getAllCaseSlugs().map((slug) => ({ slug }));

/**
 * ⚠️ `alt` is a static export, so it cannot name the individual study. Varying
 * it would mean `generateImageMetadata`, which exists to emit several images per
 * route and would buy one string. The unfurl's own title already carries the
 * headline, so the cost is not worth the machinery.
 */
export const alt = 'A case study by Fahrul Alwan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BACKGROUND = 'hsl(215 18% 6%)'; // graphite
const FOREGROUND = 'hsl(210 16% 95%)'; // 17.16:1 on background
const MUTED = 'hsl(213 9% 62%)'; // 7.03:1 on background
const SIGNAL = 'hsl(188 72% 54%)'; // 9.55:1 on graphite

const Image = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

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

      {/* 72px rather than the root card's 92. Headlines run to several words
          where a name runs to two, and at 92 the longest of them wraps to a
          third line and collides with the hairline. */}
      <div
        style={{
          fontFamily: 'Newsreader',
          fontSize: 72,
          color: FOREGROUND,
          letterSpacing: '-0.02em',
          lineHeight: 1.08,
        }}
      >
        {caseStudy?.headline ?? 'Fahrul Alwan'}
      </div>

      {/* His name still has to appear. The card is distribution, and a preview
          that names only the work leaves the reader without the author. */}
      <div
        style={{
          fontFamily: 'Noto Sans',
          fontSize: 30,
          color: MUTED,
          marginTop: 28,
          letterSpacing: '0.01em',
        }}
      >
        {caseStudy
          ? [
              'Fahrul Alwan',
              'Case study',
              // ⛔ Only when the headline does not already carry it. "A
              // real-time layer, 2018" printed 2018 twice, six lines apart.
              caseStudy.headline.includes(caseStudy.year) ? null : caseStudy.year,
            ]
              .filter(Boolean)
              .join(' · ')
          : 'Fahrul Alwan'}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: newsreader, style: 'normal', weight: 500 },
        { name: 'Noto Sans', data: notoSans, style: 'normal', weight: 400 },
      ],
    },
  );
};

export default Image;

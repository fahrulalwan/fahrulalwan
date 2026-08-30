import { Newsreader, Noto_Sans } from 'next/font/google';
import './globals.css';
import './theme.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import { SITE_URL } from '@/lib/site';

// Font budget, spec §11. `swap` is Next's default; it is stated here because the
// ≥95 mobile target depends on it rather than on a default staying put.
const noto_sans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
});
// Roman only. The italic face was loaded for exactly one 14px line in the footer,
// and §2 permits italic solely for whole pull-quotes, a role nothing uses yet.
// Add it back the day a pull-quote actually needs it.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    // Matches --background in globals.css / theme.css. On a phone this band sits
    // directly above the page, so a mismatch is the first thing a visitor sees.
    { media: '(prefers-color-scheme: light)', color: 'hsl(210 18% 97.5%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(215 18% 6%)' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Fahrul Alwan',
    default: 'Fahrul Alwan',
  },
  generator: 'Next.js',
  applicationName: 'Fahrul Alwan',
  description:
    'Fahrul Alwan, software engineering lead in Jakarta. Frontend systems, fintech, and mostly deciding what not to build.',
  keywords: [
    'Mohammad Fahrul Alwan',
    'Software Engineering Lead',
    'Software Engineer',
    'Product Engineer',
    'React',
    'Next.js',
    'TypeScript',
  ],
  creator: 'Mohammad Fahrul Alwan',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Fahrul Alwan',
    alternateLocale: ['id_ID'],
    countryName: 'Indonesia',
    description:
      'Fahrul Alwan, software engineering lead in Jakarta. Frontend systems, fintech, and mostly deciding what not to build.',
    emails: 'fahrulalwan@gmail.com',
    title: 'Fahrul Alwan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fahrul Alwan',
    description:
      'Fahrul Alwan, software engineering lead in Jakarta. Frontend systems, fintech, and mostly deciding what not to build.',
  },
  robots: {
    follow: true,
    index: true,
    googleBot: {
      index: true,
      follow: true,
      // ⛔ Deliberate, decided 2026-08-26: the portrait is not to be indexed.
      // The site has exactly one image, public/profile.webp, and this keeps it
      // out of Google Images.
      //
      // `max-image-preview: 'large'` used to sit directly below this line and
      // pulled the other way — it asks Google for a big image preview of a page
      // whose images it has just been told not to index. Removed so the file
      // states one intention instead of two. Do not add it back without
      // reversing the line above.
      noimageindex: true,
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  other: {
    'x-hello-curious':
      "if you're reading this in view-source, we should talk. fahrulalwan@gmail.com. i actually read every email.",
  },
};

/**
 * Entity disambiguation, not a rich result — `Person` is not in Google's
 * rich-result gallery, so nothing here changes how a search result looks.
 *
 * ⛔ Every value must be traceable to text a visitor can see; Google discounts
 * structured data that does not match the visible page.
 *
 * ⛔ Three absences are deliberate, not gaps:
 *   alumniOf  the university is a knowledge-based authentication answer, and
 *             no public source ties it to this name today
 *   image     the robots block sets `noimageindex`; pointing the entity at a
 *             portrait would contradict it
 *   sameAs    two entries, decided 2026-08-27. GitLab and dev.to exist but are
 *             empty, no npm account, X declined. Add one only if it has content
 *
 * ⚠️ `@id` is supposed to be permanent and is not: it derives from SITE_URL,
 * still a `.vercel.app` subdomain, so it changes the day a domain lands and any
 * machine holding the old value sees a different entity.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Mohammad Fahrul Alwan',
  url: SITE_URL,
  jobTitle: 'Software Engineering Lead',
  description:
    'Software engineering lead in Jakarta, leading frontend at Bareksa. Still in the code most days.',
  worksFor: {
    '@type': 'Organization',
    name: 'Bareksa',
    url: 'https://bareksa.com',
  },
  // ⛔ Exactly the twelve tags rendered on the three case-study cards, in card
  // order, spelled as they appear. Nothing curated in and nothing curated out.
  //
  // The first draft of this array added "TypeScript", "Frontend architecture"
  // and "Engineering leadership" — all plausible, none of them text a visitor
  // can find on this site. That is the drift the rule above exists to stop, and
  // it happened in the same edit that wrote the rule. If a topic belongs here,
  // put it on a page first.
  //
  // Angular and Java Spring Boot are 2018 and stay. Trimming them would be a
  // decision about what to be found for, which is the owner's, not a tidy-up.
  knowsAbout: [
    'React 19',
    'Payments UX',
    'Cloudflare Edge',
    'TanStack Router',
    'Next.js',
    'Code review',
    'Scoping',
    'Civic',
    'WebSocket',
    'Real-time Architecture',
    'Angular',
    'Java Spring Boot',
  ],
  sameAs: [
    'https://github.com/fahrulalwan',
    'https://linkedin.com/in/fahrulalwan',
  ],
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    // No `suppressHydrationWarning`. It was here only because next-themes wrote a
    // class onto <html> before React hydrated, which made server and client markup
    // disagree by design. Nothing writes to <html> now, so suppressing the warning
    // would only hide a real mismatch if one ever appeared.
    <html
      lang="en"
      className={`${noto_sans.variable} ${newsreader.variable} font-sans`}
    >
      <body className="flex flex-col min-h-dvh">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from hardcoded constant
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-skip focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <Navbar />
        <main
          id="main"
          className="grow max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4 pt-20 pb-16"
        >
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;

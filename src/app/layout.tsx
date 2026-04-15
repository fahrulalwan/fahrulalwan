import { Newsreader, Noto_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';
import './theme.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';

const noto_sans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto' });
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fahrulalwan.vercel.app'),
  title: {
    template: '%s | Fahrul Alwan',
    default: 'Fahrul Alwan',
  },
  generator: 'Next.js',
  applicationName: 'Fahrul Alwan',
  description:
    'Fahrul Alwan — engineering lead in Jakarta. Frontend systems, fintech, and mostly deciding what not to build.',
  keywords: [
    'Mohammad Fahrul Alwan',
    'Engineering Lead',
    'Frontend Engineering Lead',
    'Technical Lead',
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
    locale: 'enUS',
    siteName: 'Fahrul Alwan',
    alternateLocale: ['idID'],
    countryName: 'Indonesia',
    description:
      'Fahrul Alwan — engineering lead in Jakarta. Frontend systems, fintech, and mostly deciding what not to build.',
    emails: 'fahrulalwan@gmail.com',
    title: 'Fahrul Alwan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fahrul Alwan',
    description:
      'Fahrul Alwan — engineering lead in Jakarta. Frontend systems, fintech, and mostly deciding what not to build.',
  },
  robots: {
    follow: true,
    index: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'x-hello-curious':
      "if you're reading this in view-source, we should talk. fahrulalwan@gmail.com — i actually read every email.",
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammad Fahrul Alwan',
  url: 'https://fahrulalwan.vercel.app',
  jobTitle: 'Frontend Engineering Lead',
  sameAs: [
    'https://github.com/fahrulalwan',
    'https://linkedin.com/in/fahrulalwan',
  ],
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${noto_sans.variable} ${newsreader.variable} font-sans`}
    >
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from hardcoded constant
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
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
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;

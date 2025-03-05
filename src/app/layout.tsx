import { Noto_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';
import './theme.css';
import type { FC, PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import ThemeToggle from '@/components/ui/theme-toggle';

const noto_sans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto' });

export const metadata: Metadata = {
  metadataBase: new URL('https://fahrulalwan.vercel.app'),
  title: {
    template: '%s | @fahrulalwan',
    default: '@fahrulalwan',
  },
  generator: 'Next.js',
  applicationName: "Fahrul Alwan's Portfolio",
  description:
    'Software Engineer with a passion for building delightful user experiences. I specialize in frontend development with React and Next.js.',
  keywords: [
    'Mohammad Fahrul Alwan',
    'Software Engineer',
    'Frontend Developer',
    'Full-stack Developer',
    'React Developer',
    'React Engineer',
    'Lead Developer',
    'Engineering Lead',
    'Technical Lead',
    'Software Developer',
    'Web Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Next.js Developer',
    'React Native Developer',
    'Node.js Developer',
  ],
  creator: 'Mohammad Fahrul Alwan',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'enUS',
    siteName: '@fahrulalwan',
    alternateLocale: ['idID'],
    countryName: 'Indonesia',
    description:
      'Software Engineer with a passion for building delightful user experiences. I specialize in frontend development with React and Next.js.',
    emails: 'fahrulalwan@gmail.com',
    title: '@fahrulalwan',
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
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${noto_sans.variable} font-sans`}
    >
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="fixed top-4 left-4 z-50 flex items-center space-x-4">
            <Link href="/">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="bg-background/50 backdrop-blur-xs rounded-full"
              >
                <Home className="size-5" />
                <span className="sr-only">Go to homepage</span>
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
          <main className="grow max-w-(--breakpoint-lg) mx-auto px-5 sm:px-4 py-16">
            {children}
          </main>
          <footer className="border-t border-border p-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} Mohammad Fahrul Alwan. All
              rights reserved.
            </p>
          </footer>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;

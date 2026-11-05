import './globals.css';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  themeColor: '#0a0518',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: 'Happy Diwali 2026',
  description:
    'A glowing Diwali 2026 celebration with diyas, fireworks, and wishes for your loved ones.',
  openGraph: {
    title: 'Happy Diwali 2026',
    description:
      'A glowing Diwali 2026 celebration with diyas, fireworks, and wishes for your loved ones.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Diwali 2026',
    description:
      'A glowing Diwali 2026 celebration with diyas, fireworks, and wishes for your loved ones.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className="bg-diwali-night font-body text-white antialiased overflow-x-hidden min-w-0 w-full selection:bg-diwali-gold-400 selection:text-diwali-night">
        {children}
      </body>
    </html>
  );
}

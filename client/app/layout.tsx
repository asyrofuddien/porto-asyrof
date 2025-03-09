import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
// import { ApolloProvider } from '@apollo/client';
// import createApolloClient from './lib/apolloClient';

// Fonts
const geistSans = localFont({
  src: './fonts/Roboto-Regular.ttf',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/Roboto-Regular.ttf',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Metadata API (preferred way in Next.js)
export const metadata: Metadata = {
  title: 'Muhammad Asyrofuddien - Backend Developer',
  description:
    "I'm a backend developer skilled in Node.js, Express, MongoDB, GraphQL, REST APIs, and Laravel, with over a year of experience.",
  icons: {
    icon: 'logo.png',
  },
  openGraph: {
    title: 'Muhammad Asyrofuddien - Backend Developer',
    description:
      'Backend developer skilled in Node.js, Express, MongoDB, GraphQL, REST APIs, and Laravel. Dedicated to building robust and scalable systems.',
    url: 'https://porto-asyrof.vercel.app/',
    siteName: 'Muhammad Asyrofuddien - Backend Developer',
    images: [
      {
        url: '/img/heroLaptop.png',
        width: 800,
        height: 600,
        alt: 'Hero image of laptop',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your_twitter_handle', // Replace with your Twitter handle
    title: 'Muhammad Asyrofuddien - Backend Developer',
    description:
      'Backend developer skilled in Node.js, Express, MongoDB, GraphQL, REST APIs, and Laravel. Dedicated to building robust and scalable systems.',
    images: ['/img/heroLaptop.png'],
  },
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

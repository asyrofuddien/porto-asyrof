import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Head from 'next/head'; // Import Head
import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';

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

export const metadata: Metadata = {
  title: 'Muhammad Asyrofuddien - Backend Developer',
  description: "i'm backend",
  icons: {
    icon: '/img/asyrof.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="!scroll-smooth">
        <Head>
          <meta property="twitter:image" content="/img/heroLaptop.png"></meta>
          <meta property="twitter:card" content="Muhammad Asyrofuddien"></meta>
          <meta property="twitter:title" content="Muhammad Asyrofuddien - Backend Developer"></meta>
          <meta
            property="twitter:description"
            content="backend developer skilled in Node.js, Express, MongoDB, GraphQL, REST APIs, and Laravel, dedicated to building robust and
          scalable systems with over a year of professional experience."
          ></meta>
          <meta property="og:image" content="/img/heroLaptop.png"></meta>
          <meta property="og:site_name" content="Muhammad Asyrofuddien - Backend Developer"></meta>
          <meta property="og:title" content="Link preview title"></meta>
          <meta
            property="og:description"
            content="backend developer skilled in Node.js, Express, MongoDB, GraphQL, REST APIs, and Laravel, dedicated to building robust and
          scalable systems with over a year of professional experience."
          />
          <meta property="og:url" content="https://porto-asyrof.vercel.app/"></meta>
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}

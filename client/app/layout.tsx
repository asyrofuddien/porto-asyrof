import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Head from 'next/head'; // Import Head
import './globals.css';

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
  title: 'Asyrofuddien',
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
          <meta property="twitter:image" content="Twitter link preview image URL"></meta>
          <meta property="twitter:card" content="summary_large_image"></meta>
          <meta property="twitter:title" content="Twitter link preview title"></meta>
          <meta property="twitter:description" content="Twitter link preview description"></meta>
          <meta property="og:image" content="Link preview image URL"></meta>
          <meta property="og:site_name" content="Link preview site name"></meta>
          <meta property="og:title" content="Link preview title"></meta>
          <meta property="og:description" content="Link preview description" />
          <meta property="og:url" content="Canonical link preview URL"></meta>
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
      </html>
    </>
  );
}

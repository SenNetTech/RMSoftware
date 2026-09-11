import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { site } from './site-content';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s | RMSoftware' },
  description: site.description,
  applicationName: site.name,
  publisher: site.name,
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary',
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var theme=localStorage.getItem('rmsoftware-theme');if(theme==='light'||theme==='dark')document.documentElement.dataset.theme=theme;}catch{}` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

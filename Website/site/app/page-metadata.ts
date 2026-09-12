import type { Metadata } from 'next';
import { site } from './site-content';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: new URL(path, site.url).href },
    openGraph: {
      type: 'website',
      locale: 'en_ZA',
      siteName: site.name,
      title: `${title} | RMSoftware`,
      description,
      url: new URL(path, site.url).href,
    },
    twitter: { card: 'summary', title: `${title} | RMSoftware`, description },
  };
}

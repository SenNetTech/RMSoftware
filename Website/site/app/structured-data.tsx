import { contact, site } from './site-content';

export default function StructuredData() {
  const organizationId = `${site.url}#organization`;
  const websiteId = `${site.url}#website`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        alternateName: 'RM Software',
        url: site.url,
        description: site.description,
        logo: new URL('/images/logo.jpeg', site.url).href,
        email: contact.email,
        contactPoint: {
          '@type': 'ContactPoint',
          email: contact.email,
          contactType: 'customer enquiries',
          availableLanguage: 'English',
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: site.name,
        alternateName: 'RM Software',
        url: site.url,
        inLanguage: 'en-ZA',
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'WebPage',
        '@id': `${site.url}#webpage`,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: 'en-ZA',
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

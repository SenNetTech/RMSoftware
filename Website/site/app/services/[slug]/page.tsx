import Link from '@/app/site-link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { services } from '../../services-data';
import { site } from '../../site-content';
import { pageMetadata } from '../../page-metadata';
import { ConsultationCTA } from '../../site-shell';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return service
    ? pageMetadata(service.title, service.description, `/services/${slug}/`)
    : {};
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const url = new URL(`/services/${slug}/`, site.url).href;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        description: service.intro,
        url,
        serviceType: service.title,
        areaServed: { '@type': 'Country', name: 'South Africa' },
        provider: {
          '@type': 'Organization',
          '@id': `${site.url}#organization`,
          name: site.name,
          url: site.url,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: new URL('/services/', site.url).href,
          },
          { '@type': 'ListItem', position: 3, name: service.title, item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, '\\u003c'),
        }}
      />
      <section className="container page-hero service-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services/">Services</Link>
          <span>/</span>
          <span>{service.title}</span>
        </nav>
        <p className="eyebrow">{service.title.toUpperCase()}</p>
        <h1>{service.short}</h1>
        <p className="lead">{service.intro}</p>
        <Link
          className="button button-primary"
          href={`/contact/?service=${encodeURIComponent(service.title)}`}
        >
          Book a Free Consultation <ArrowUpRight size={18} />
        </Link>
      </section>
      <section className="section service-detail-section">
        <div className="container service-detail-grid">
          <div>
            <p className="eyebrow">A GOOD FIT WHEN</p>
            <h2>{service.fit}</h2>
            <p className="section-intro">{service.outcome}</p>
          </div>
          <div className="deliverables">
            <h3>What we can deliver</h3>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>
                  <Check size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="small-copy">
              The final scope, cost and timeline are agreed in your proposal.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PRACTICAL APPLICATIONS</p>
            <h2>What this could enable.</h2>
          </div>
          <p>
            Illustrative use cases to help you see the possibilities for your
            own business.
          </p>
        </div>
        <div className="problem-grid">
          {service.scenarios.map((text, i) => (
            <article key={text}>
              <span className="card-number">0{i + 1}</span>
              <h3>{text}</h3>
            </article>
          ))}
        </div>
        <div className="service-faq">
          <h2>A useful question</h2>
          <h3>{service.question}</h3>
          <p>{service.answer}</p>
        </div>
        <div className="related-links">
          <h3>Explore other services</h3>
          {services
            .filter((s) => s.slug !== slug)
            .map((s) => (
              <Link
                className="text-link"
                key={s.slug}
                href={`/services/${s.slug}/`}
              >
                {s.title}
                <ArrowUpRight size={16} />
              </Link>
            ))}
        </div>
      </section>
      <ConsultationCTA />
    </>
  );
}

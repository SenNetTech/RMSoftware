import Link from '@/app/site-link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../services-data';
import { pageMetadata } from '../page-metadata';
import { ConsultationCTA } from '../site-shell';
export const metadata = pageMetadata(
  'Software Development Services',
  'Custom software, web applications, business automation, integrations and ongoing support for businesses in Johannesburg and across South Africa.',
  '/services/',
);
export default function ServicesPage() {
  return (
    <>
      <section className="container page-hero">
        <p className="eyebrow">SOFTWARE DEVELOPMENT SERVICES / SOUTH AFRICA</p>
        <h1>
          Built around your
          <br />
          <span>next business challenge.</span>
        </h1>
        <p className="lead">
          From improving one process to building a platform, we help you turn a
          business need into a practical software solution.
        </p>
      </section>
      <section
        className="container services-overview"
        aria-label="Our services"
      >
        {services.map((s, i) => (
          <article key={s.slug}>
            <span className="service-index">0{i + 1}</span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.intro}</p>
              <p className="service-example">{s.examples}</p>
              <Link className="text-link" href={`/services/${s.slug}/`}>
                Explore {s.title.toLowerCase()} <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <ConsultationCTA />
    </>
  );
}

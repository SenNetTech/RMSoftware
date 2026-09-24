import Link from '@/app/site-link';
import Image from 'next/image';
import { ArrowUpRight, Mail } from 'lucide-react';
import { contact } from './site-content';
import { services } from './services-data';

export function ConsultationCTA() {
  return (
    <section className="closing-cta" aria-labelledby="next-step">
      <div className="container cta-panel">
        <p className="section-kicker">Ready when you are</p>
        <h2 id="next-step">Let&apos;s make your business work better.</h2>
        <p>
          Tell us what&apos;s slowing your business down. We&apos;ll help you
          determine whether technology can solve it.
        </p>
        <Link href="/contact/" className="button button-primary">
          Start a conversation <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand" aria-label="RMSoftware home">
            <span className="logo-crop">
              <Image
                src="/images/rmsoftware-logo-transparent.png"
                width={1536}
                height={1024}
                alt="RMSoftware"
                unoptimized
              />
            </span>
          </Link>
          <p>
            Better businesses, enabled by software.
            <br />
            Serving South Africa and beyond.
          </p>
          <Link className="text-link" href={`mailto:${contact.email}`}>
            <Mail size={16} />
            {contact.email}
          </Link>
        </div>
        <nav aria-label="Services in footer">
          <h3>Our services</h3>
          {services.slice(0, 4).map((service) => (
            <Link href={`/services/${service.slug}/`} key={service.slug}>
              {service.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Company">
          <h3>RMSoftware</h3>
          <Link href="/#why-us">Why RMSoftware</Link>
          <Link href="/#process">How we work</Link>
          <Link href="/#work">Selected partnerships</Link>
          <Link href="/#people">Our people</Link>
          <Link href="/contact/">Discuss your project</Link>
          <Link href="/privacy/">Privacy & cookies</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} RMSoftware. All rights reserved.
        </span>
        <span>We build technology when it makes business sense.</span>
      </div>
    </footer>
  );
}

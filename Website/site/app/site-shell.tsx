import Link from '@/app/site-link';
import Image from 'next/image';
import { ArrowUpRight, Mail } from 'lucide-react';
import { contact } from './site-content';
import { services } from './services-data';

export function ConsultationCTA() {
  return (
    <section className="container closing-cta" aria-labelledby="next-step">
      <div className="cta-panel">
        <div>
          <p className="eyebrow">LET’S TALK ABOUT YOUR BUSINESS</p>
          <h2 id="next-step">
            What’s slowing
            <br />
            your business down?
          </h2>
          <p>Bring us the problem. We’ll help you work out the next step.</p>
        </div>
        <div>
          <Link
            href="/contact/"
            className="button button-primary"
          >
            Book a Free Consultation <ArrowUpRight size={18} />
          </Link>
          <p className="small-copy">
            Explore the fit, priorities and practical options.
            <br />
            No obligation to proceed.
          </p>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand" aria-label="RMSoftware home">
            <span className="logo-crop">
              <Image
                src="/images/logo.jpeg"
                width={1536}
                height={1024}
                alt="RMSoftware"
                unoptimized
              />
            </span>
          </Link>
          <p>
            Software built around your business.
            <br />
            Serving South Africa and beyond.
          </p>
          <Link
            className="text-link"
            href={`mailto:${contact.email}`}
          >
            <Mail size={16} />
            {contact.email}
          </Link>
        </div>
        <nav aria-label="Services in footer">
          <h3>Our services</h3>
          {services.map((s) => (
            <Link href={`/services/${s.slug}/`} key={s.slug}>
              {s.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Company">
          <h3>RMSoftware</h3>
          <Link href="/#about">Why RMSoftware</Link>
          <Link href="/#process">How we work</Link>
          <Link href="/#solutions">Solution examples</Link>
          <Link href="/contact/">Discuss your project</Link>
          <Link href="/privacy/">Privacy & cookies</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} RMSoftware. All rights reserved.
        </span>
        <span>Built for better ways of working.</span>
      </div>
    </footer>
  );
}

import Link from '@/app/site-link';
import Image from 'next/image';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  PanelsTopLeft,
  RefreshCw,
  Workflow,
} from 'lucide-react';
import type { Metadata } from 'next';
import { site } from './site-content';
import StructuredData from './structured-data';
import { ConsultationCTA } from './site-shell';

export const metadata: Metadata = {
  alternates: { canonical: site.url },
  openGraph: {
    url: site.url,
    type: 'website',
    locale: 'en_ZA',
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
};

const capabilities = [
  {
    number: '01',
    title: 'Custom Software',
    copy: 'Software built around the way your business actually works.',
    href: '/services/custom-business-software/',
    icon: Blocks,
  },
  {
    number: '02',
    title: 'Business Process Automation',
    copy: 'Reduce repetitive work and give your team more time to focus on what matters.',
    href: '/services/business-process-automation/',
    icon: Workflow,
  },
  {
    number: '03',
    title: 'Web & Digital Platforms',
    copy: 'Reliable digital platforms designed around your customers and operations.',
    href: '/services/web-application-development/',
    icon: PanelsTopLeft,
  },
  {
    number: '04',
    title: 'Software Improvement',
    copy: 'Improve, modernise or extend the systems your business already relies on.',
    href: '/services/software-modernization-integration/',
    icon: RefreshCw,
  },
];

const principles = [
  {
    title: 'Understand the problem.',
    copy: 'We start with your business, not the technology.',
  },
  {
    title: 'Build what matters.',
    copy: 'We focus on solutions that solve genuine problems.',
  },
  {
    title: 'Think long term.',
    copy: 'We build solutions that can keep supporting the business as it grows.',
  },
];

const process = [
  {
    number: '01',
    title: 'Understand',
    copy: 'We learn how your business works and where the real problems are.',
  },
  {
    number: '02',
    title: 'Plan',
    copy: 'We identify where technology can create the greatest value.',
  },
  {
    number: '03',
    title: 'Build',
    copy: 'We design and develop the right solution.',
  },
  {
    number: '04',
    title: 'Improve',
    copy: 'We support and improve the solution as your business grows.',
  },
];

function ClientGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="client-group" aria-hidden={hidden || undefined}>
      <span className="client-wordmark makhado-mark">
        <Image
          src="/images/clients/makhado-logo.png"
          alt="Makhado & Associates"
          width={1791}
          height={878}
          sizes="180px"
        />
      </span>
      <span className="client-wordmark rayoni-mark">
        <Image
          src="/images/clients/rayoni-logo.png"
          alt="Rayoni"
          width={1254}
          height={1254}
          sizes="110px"
        />
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />

      <section className="home-hero" aria-labelledby="hero-title">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="section-kicker">
              Independent software agency · South Africa
            </p>
            <h1 id="hero-title">Your ideal software partner.</h1>
            <p className="home-hero-lead">
              We build practical software solutions that help businesses work
              smarter, operate more efficiently and grow.
            </p>
            <p className="home-hero-detail">
              RMSoftware helps businesses improve their processes through
              technology. We focus on measurable business value—not technology
              for technology&apos;s sake.
            </p>
            <div className="home-hero-actions">
              <Link className="button button-primary" href="/contact/">
                Start a conversation <ArrowUpRight size={18} />
              </Link>
              <Link className="editorial-link" href="#what-we-do">
                See what we do <ArrowDownRight size={18} />
              </Link>
            </div>
          </div>

          <figure className="home-hero-visual">
            <Image
              src="/images/rmsoftware-team-hero.webp"
              alt="A software team discussing a project together in a Johannesburg studio"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 56vw"
            />
            <figcaption>
              <span>People first</span>
              <span>Business always</span>
            </figcaption>
          </figure>
        </div>
        <div className="hero-side-note" aria-hidden="true">
          Scroll to explore <ArrowDownRight size={15} />
        </div>
      </section>

      <section className="client-marquee" aria-label="Trusted clients">
        <div className="container client-marquee-label">
          <span>Trusted by businesses including</span>
        </div>
        <div className="client-marquee-window">
          <div className="client-track">
            <ClientGroup />
            <ClientGroup hidden />
            <ClientGroup hidden />
            <ClientGroup hidden />
          </div>
        </div>
      </section>

      <section
        className="capabilities-section"
        id="what-we-do"
        aria-labelledby="capabilities-title"
      >
        <div className="container">
          <div className="editorial-heading light-on-dark">
            <p className="section-kicker">What we actually do</p>
            <div>
              <h2 id="capabilities-title">
                Technology that makes your business work better.
              </h2>
              <p>
                We look at how your business operates, identify where technology
                can make a meaningful difference, and build the right solution
                around it.
              </p>
            </div>
          </div>

          <div className="capability-list">
            {capabilities.map(({ number, title, copy, href, icon: Icon }) => (
              <Link className="capability-row" href={href} key={title}>
                <span className="capability-number">{number}</span>
                <Icon aria-hidden="true" size={26} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{copy}</p>
                <ArrowUpRight className="capability-arrow" size={24} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="belief-section" aria-label="Our point of view">
        <div className="container belief-grid">
          <p className="section-kicker">Our point of view</p>
          <p className="belief-statement">
            We build technology <em>when it makes business sense.</em>
          </p>
        </div>
      </section>

      <section
        className="return-section"
        id="why-us"
        aria-labelledby="return-title"
      >
        <div className="container return-grid">
          <div className="return-intro">
            <p className="section-kicker">Why RMSoftware</p>
            <h2 id="return-title">Software should deliver a return.</h2>
            <p>
              A software project should make your business better—not simply
              give you more technology. That is why we understand the business
              before recommending what to build.
            </p>
          </div>
          <div className="principle-list">
            {principles.map(({ title, copy }, index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="process-home-section"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="container">
          <div className="process-home-heading">
            <p className="section-kicker">How we work</p>
            <h2 id="process-title">Simple on purpose.</h2>
            <p>
              Clear thinking, open communication and a process built around the
              outcome—not the ceremony.
            </p>
          </div>
          <ol className="process-home-grid">
            {process.map(({ number, title, copy }, index) => (
              <li key={title}>
                <div className="process-home-track">
                  <span>{number}</span>
                  {index < process.length - 1 && <ArrowRight size={19} />}
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="container">
          <div className="work-heading">
            <p className="section-kicker">Selected partnerships</p>
            <h2 id="work-title">The result is the point.</h2>
            <p>
              We are building our portfolio with ambitious South African
              businesses. Client work is published with approval and always
              explained through the change it created.
            </p>
          </div>
          <div className="work-proof-grid">
            <div className="partner-panel">
              <span className="partner-panel-label">Working with</span>
              <div className="partner-names">
                <span>Makhado & Associates</span>
                <span>Rayoni</span>
              </div>
            </div>
            <div className="impact-panel">
              <span className="impact-panel-index">01</span>
              <h3>The problem</h3>
              <p>What is getting in the way of the business?</p>
            </div>
            <div className="impact-panel">
              <span className="impact-panel-index">02</span>
              <h3>The solution</h3>
              <p>What is the simplest useful thing we can build?</p>
            </div>
            <div className="impact-panel impact-panel-result">
              <span className="impact-panel-index">03</span>
              <h3>The result</h3>
              <p>What became faster, clearer or more profitable?</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="culture-section"
        id="people"
        aria-labelledby="culture-title"
      >
        <div className="culture-image">
          <Image
            src="/images/rmsoftware-culture.webp"
            alt="Two software professionals working through a business process together"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className="culture-copy">
          <div>
            <p className="section-kicker"> Behind the work</p>
            <h2 id="culture-title">
              Good software starts with people who understand the problem.
            </h2>
            <p>
              We bring clear thinking, practical experience and real
              care to every conversation.
            </p>
          </div>
          <Link
            className="editorial-link editorial-link-light"
            href="/contact/"
          >
            Meet us in a conversation <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}

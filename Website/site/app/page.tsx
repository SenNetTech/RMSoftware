import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Braces, Check, CircleCheck, Globe2, Mail, MessageCircle, Moon, MoveUpRight, Network, ShieldCheck, Sparkles, Sun, Workflow, Zap } from 'lucide-react';
import Header from './header';
import Image from 'next/image';
import { contact, site } from './site-content';
import type { Metadata } from 'next';
import StructuredData from './structured-data';

export const metadata: Metadata = {
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
  },
};

const services = [
  { icon: Workflow, title: 'Business automation', text: 'Give repetitive work to software. Connect your processes so your team can spend more time on work that needs a human.', example: 'Enquiry → quote → invoice → follow-up', benefit: 'Less admin. More time back.' },
  { icon: Braces, title: 'Custom software', text: 'When off-the-shelf tools don’t quite fit, we build around the way your business works. From internal systems to customer portals.', example: 'Operations dashboards · Booking systems · Portals', benefit: 'A better fit for your business.' },
  { icon: Sparkles, title: 'AI integration', text: 'Make AI useful in your everyday work. Help your team find information, organise documents, and respond to customers with human oversight.', example: 'Knowledge assistants · Document processing', benefit: 'Put your information to work.' },
  { icon: MessageCircle, title: 'WhatsApp business tools', text: 'Meet customers in a conversation. Make enquiries, appointment reminders, and order updates easier to manage through WhatsApp.', example: 'Customer enquiries · Reminders · Order updates', benefit: 'Keep the conversation moving.' },
  { icon: Globe2, title: 'Websites & mobile apps', text: 'Make it easier for people to discover your business and use your services, with thoughtful websites and apps built for real people.', example: 'Business websites · Web apps · Mobile apps', benefit: 'Turn interest into action.' },
  { icon: Network, title: 'Connected systems', text: 'Help your existing tools work together. Move information between systems and give your team a clearer view of what’s happening.', example: 'API integrations · Data sync · Reporting', benefit: 'Fewer gaps. A clearer picture.' },
];
const steps = [
  { title: 'Understand your business', text: 'We listen, ask questions, and look at how you work. Together, we identify the problem and what a better outcome means for you.' },
  { title: 'Find the right solution', text: 'We recommend a practical approach, define the scope, and agree on priorities, cost, and timing before development starts.' },
  { title: 'Build with you', text: 'We share progress, welcome your feedback, and test against the real tasks your software needs to handle.' },
  { title: 'Launch & keep improving', text: 'We help you get started, explain how everything works, and agree on the support and improvements your business needs next.' },
];
function BusinessDiagram() {
  return <figure className="business-diagram" aria-labelledby="diagram-caption">
    <figcaption id="diagram-caption" className="diagram-heading"><span className="status-dot" /> YOUR BUSINESS, BETTER CONNECTED <MoveUpRight size={17} /></figcaption>
    <div className="diagram-canvas">
      <div className="diagram-ring ring-outer" /><div className="diagram-ring ring-inner" />
      <svg className="diagram-lines" viewBox="0 0 560 410" aria-hidden="true"><path d="M280 205V84H390 M280 205H110V114 M280 205H425V314 M280 205V338H142" /></svg>
      <div className="diagram-node node-automation"><span className="node-icon"><Workflow size={21} /></span><div><strong>Automation</strong><span>Everyday work, simplified</span></div></div>
      <div className="diagram-node node-ai"><span className="node-icon"><Sparkles size={21} /></span><div><strong>AI integration</strong><span>Intelligence that helps</span></div></div>
      <div className="diagram-core"><span className="core-symbol"><Network size={31} strokeWidth={1.4} /></span><strong>Your business</strong><span>THE STARTING POINT</span></div>
      <div className="diagram-node node-software"><span className="node-icon"><Braces size={21} /></span><div><strong>Custom software</strong><span>Built around your needs</span></div></div>
      <div className="diagram-node node-whatsapp"><span className="node-icon"><MessageCircle size={21} /></span><div><strong>WhatsApp tools</strong><span>Closer to your customers</span></div></div>
    </div>
    <div className="diagram-footer"><span><CircleCheck size={16} /> One connected approach</span><span className="diagram-index">RM / 01</span></div>
  </figure>;
}
export default function Home() {
  return <>
    <StructuredData />
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> SMART SOFTWARE. REAL BUSINESS VALUE.</p>
          <h1 id="hero-title">Less friction.<br />More <span>forward.</span></h1>
          <p className="hero-description">Custom software development that helps your business work better and move forward.</p>
          <p className="hero-detail">Automation, custom software, AI, and WhatsApp tools — built around your challenges, your people, and your next step.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Let’s talk about your business <ArrowUpRight size={19} /></a><a className="text-link" href="#services">What we can do <ArrowDown size={17} /></a></div>
          <div className="hero-note"><span className="note-line" /> Thoughtful solutions. People who care.</div>
        </div>
        <BusinessDiagram />
      </section>
      <div className="outcome-strip"><div className="container"><span>BUILT TO MAKE A DIFFERENCE</span><p><Check size={17} /> Save your team time</p><p><Check size={17} /> Serve customers better</p><p><Check size={17} /> Make room to grow</p></div></div>
      <section className="section services container" id="services" aria-labelledby="services-title">
        <div className="section-heading"><div><p className="eyebrow">01 / WHAT WE DO</p><h2 id="services-title" tabIndex={-1}>Big possibilities.<br /><span className="muted-heading">Practical solutions.</span></h2></div><p>You bring the challenge. We bring curiosity, technical expertise, and the drive to find a better way of doing things.</p></div>
        <div className="service-grid">{services.map(({ icon: Icon, title, text, example, benefit }, index) => <article className="service-card" key={title}><div className="service-top"><span className="service-icon"><Icon size={25} strokeWidth={1.6} /></span><span className="card-number">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p><p className="service-example">{example}</p><div className="service-benefit"><span>{benefit}</span><ArrowUpRight size={18} aria-hidden="true" /></div></article>)}</div>
        <p className="services-note"><Zap size={18} /> Don’t see your challenge here? Our expertise goes beyond a list. <a href="#contact">Let’s explore it together <ArrowRight size={16} /></a></p>
      </section>
      <section className="possibilities section" aria-labelledby="possibilities-title"><div className="container possibilities-grid"><div><p className="eyebrow">FROM EVERYDAY CHALLENGES TO BETTER WAYS OF WORKING</p><h2 id="possibilities-title">What could work<br />better in your business<span className="blue-text">?</span></h2><p className="possibilities-intro">You don’t need a technical brief. A problem, a time-consuming task, or an idea is a good place to start.</p><a className="text-link" href="#contact">Tell us what’s getting in the way <ArrowUpRight size={18} /></a></div><div className="scenario-list"><article><span className="scenario-number">01</span><div><h3>“We’re doing the same admin every day.”</h3><p>Connect the steps between enquiries, quotes, and follow-ups so your team spends less time copying information.</p><span><Workflow size={15} /> AUTOMATION + INTEGRATIONS</span></div></article><article><span className="scenario-number">02</span><div><h3>“Customer messages are hard to keep up with.”</h3><p>Create a clearer WhatsApp enquiry flow, automate routine updates, and help your team focus on conversations that need them.</p><span><MessageCircle size={15} /> WHATSAPP BUSINESS TOOLS</span></div></article><article><span className="scenario-number">03</span><div><h3>“Our information is scattered everywhere.”</h3><p>Bring useful information into one place with a custom dashboard or an AI assistant that helps your team find answers.</p><span><Bot size={15} /> CUSTOM SOFTWARE + AI</span></div></article></div></div></section>
      <section className="section container process" id="process" aria-labelledby="process-title"><div className="section-heading"><div><p className="eyebrow">02 / HOW WE WORK</p><h2 id="process-title" tabIndex={-1}>A clear process.<br /><span className="muted-heading">A shared ambition.</span></h2></div><p>Good software starts with understanding. We work with you from the first conversation to the details that make a solution useful.</p></div><ol className="process-grid">{steps.map((step, index) => <li key={step.title}><div className="step-track"><span>0{index + 1}</span>{index < 3 ? <ArrowRight size={19} /> : <Check size={19} />}</div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></section>
      <section className="about section" id="about" aria-labelledby="about-title"><div className="container"><div className="about-grid"><div><p className="eyebrow">03 / THE PEOPLE BEHIND THE SOLUTIONS</p><h2 id="about-title" tabIndex={-1}>Serious about the work.<br /><span className="muted-heading">Invested in your success.</span></h2></div><div className="about-copy"><p className="large-copy">Smart thinking. Hard work.<br />A personal commitment to getting it right.</p><p>RMSoftware is a software agency led by Sennelo Mulanga Gundo and Netshisaulu Ridokunda. We help businesses solve problems, improve how they work, and turn useful ideas into software.</p><p>We’re curious by nature and driven by the work. Whether you come to us with a clear idea or a challenge you haven’t quite defined, we take the time to understand it and take pride in building a solution that serves you well.</p></div></div><div className="team-values"><div className="directors"><article className="director"><span className="director-initials" aria-hidden="true">SMG</span><div><h3>Sennelo Mulanga Gundo</h3><p>Director · RMSoftware</p></div></article><article className="director"><span className="director-initials" aria-hidden="true">NR</span><div><h3>Netshisaulu Ridokunda</h3><p>Director · RMSoftware</p></div></article></div><div className="values"><p><ShieldCheck size={19} /><span><strong>Quality we take personally.</strong> Care in the details, from the first idea to the final handover.</span></p><p><MessageCircle size={19} /><span><strong>A partnership you can understand.</strong> Clear communication and honest, practical advice.</span></p></div></div></div></section>
      <section className="contact-section container" id="contact" aria-labelledby="contact-title"><div className="contact-panel"><div><p className="eyebrow">04 / LET’S MAKE SOMETHING USEFUL</p><h2 id="contact-title" tabIndex={-1}>Your next step<br />starts with a <span>conversation.</span></h2><p>A bottleneck to fix. An idea to explore. A better way to work.<br />Tell us about your business and what you’d like to change.</p></div><div className="contact-details"><ArrowDownRight className="contact-arrow" size={76} strokeWidth={1} aria-hidden="true" />{contact.email || contact.whatsapp ? <div className="contact-links">{contact.email && <a className="button button-contact" href={`mailto:${contact.email}?subject=Let%E2%80%99s%20discuss%20my%20business`}><Mail size={18} /> Email us <ArrowUpRight size={18} /></a>}{contact.whatsapp && <a className="button button-contact-secondary" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=Hi%20RMSoftware%2C%20I%E2%80%99d%20like%20to%20discuss%20a%20solution%20for%20my%20business.`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Talk on WhatsApp <ArrowUpRight size={18} /></a>}{contact.email && <span className="contact-email">{contact.email}</span>}</div> : <div className="contact-pending"><span className="contact-status">LET’S CONNECT SOON</span><p>Our direct enquiry channels<br />are being set up.</p><span>Contact details will be available here soon.</span></div>}</div></div></section>
    </main>
    <footer className="container footer"><div className="footer-main"><a href="#main" className="brand footer-brand" aria-label="RMSoftware home"><span className="logo-crop"><Image src="/images/logo.jpeg" width={1536} height={1024} alt="RMSoftware" unoptimized /></span></a><p>Built with purpose.<br /><span>Built around your business.</span></p><a href="#main" className="text-link">Back to top <ArrowUpRight size={17} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} RMSoftware. All rights reserved.</span><span className="theme-note"><Sun className="light-theme-icon" size={15} /><Moon className="dark-theme-icon" size={15} /> Light & dark appearance</span></div></footer>
  </>;
}

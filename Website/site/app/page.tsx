import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Globe2, Smartphone, Workflow, Check, Plus } from 'lucide-react';
import Header from './header';
import Image from 'next/image';

const services = [
  { number: '01', icon: Globe2, title: 'Websites that work.', text: 'Make a strong first impression and make it easy for customers to find you, understand your business, and take the next step.', tags: ['Business websites', 'Responsive design'] },
  { number: '02', icon: Smartphone, title: 'Your business. On mobile.', text: 'Put your service in your customers’ hands with a mobile app designed around the things they need to do.', tags: ['iOS & Android', 'Intuitive experiences'] },
  { number: '03', icon: Workflow, title: 'Software that fits.', text: 'Turn everyday bottlenecks into better ways of working with business systems built around your team and your processes.', tags: ['Custom applications', 'Connected systems'] },
];
const steps = [
  { title: 'Understand', text: 'We start with your business, the problem you want to solve, and what a useful outcome looks like.' },
  { title: 'Design', text: 'We shape the solution together, mapping the experience and agreeing on a clear direction.' },
  { title: 'Build & refine', text: 'We bring the idea to life, share progress, and use your feedback to refine the details.' },
  { title: 'Launch & hand over', text: 'We check the essentials, get your software ready to use, and walk you through how it works.' },
];

function SystemDiagram() {
  return <figure className="system-diagram" aria-label="Websites, mobile apps, and custom software connected around your business">
    <div className="diagram-top"><span><i /> BUILT TO CONNECT</span><Plus size={17} /></div>
    <div className="diagram-orbit orbit-one" /><div className="diagram-orbit orbit-two" />
    <svg className="diagram-lines" viewBox="0 0 520 510" preserveAspectRatio="none" aria-hidden="true"><path d="M260 255 L260 120 L365 120 M260 255 L112 255 L112 340 M260 255 L388 255 L388 383" /><circle cx="260" cy="120" r="4" /><circle cx="112" cy="255" r="4" /><circle cx="388" cy="255" r="4" /></svg>
    <div className="diagram-core"><span className="core-icon"><Workflow size={38} strokeWidth={1.4} /></span><strong>Your business</strong><span>AT THE CENTRE</span></div>
    <div className="diagram-node node-web"><Globe2 size={23} /><span>Websites</span><ArrowUpRight size={15} /></div>
    <div className="diagram-node node-mobile"><Smartphone size={23} /><span>Mobile apps</span></div>
    <div className="diagram-node node-software"><Workflow size={23} /><span>Custom software</span></div>
    <div className="diagram-bottom"><span>ONE CONNECTED APPROACH</span><span>RM / 01</span></div>
  </figure>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="blue-dot" /> SMALL BUSINESS. BIG POSSIBILITIES.</p>
          <h1 id="hero-title">Software built<br className="desktop-break" /> around <span>your<br className="desktop-break" /> business.</span></h1>
          <p className="hero-description">Websites, mobile apps, and custom software.<br className="desktop-break" /> Thoughtfully built to help your business move forward.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Discuss your project <ArrowUpRight size={19} /></a><a className="text-link" href="#services">Explore our services <ArrowDown size={17} /></a></div>
          <p className="hero-note"><span /> Your ideas. Our expertise. Something useful.</p>
        </div>
        <SystemDiagram />
      </section>
      <div className="intro-strip"><div className="container"><p>Good software starts with <strong>understanding your business.</strong></p><span>THAT’S WHERE WE COME IN <ArrowDownRight size={20} /></span></div></div>
      <section className="services section container" id="services" aria-labelledby="services-title">
        <div className="section-heading"><div><p className="eyebrow">01 / WHAT WE BUILD</p><h2 id="services-title" tabIndex={-1}>The right tools.<br />For your next chapter.</h2></div><p>From your first website to the system that keeps everything running. Let’s build what your business needs.</p></div>
        <div className="service-grid">{services.map(({ number, icon: Icon, title, text, tags }) => <article className="service-card" key={number}><div className="service-top"><Icon size={29} strokeWidth={1.5} /><span>{number}</span></div><h3>{title}</h3><p>{text}</p><ul className="service-tags">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
      </section>
      <section className="about section" id="about" aria-labelledby="about-title"><div className="container about-grid"><div><p className="eyebrow">02 / THE PEOPLE BEHIND THE CODE</p><h2 id="about-title" tabIndex={-1}>Your ambition.<br />Our starting point<span className="blue-text">.</span></h2><a href="#contact" className="text-link">Let’s build something useful <ArrowUpRight size={19} /></a></div><div className="about-copy"><p className="large-copy">You know your business.<br />We help bring its next idea to life.</p><p>RM Software is a software agency focused on practical digital solutions for small businesses. We take the time to understand how you work, what gets in the way, and where you want to go.</p><p>Then we turn that understanding into software that makes sense for the people using it.</p><ul className="principles"><li><Check size={17} /> Clear communication</li><li><Check size={17} /> Purposeful design</li><li><Check size={17} /> A collaborative approach</li></ul></div></div></section>
      <section className="process section container" id="process" aria-labelledby="process-title"><div className="section-heading"><div><p className="eyebrow">03 / HOW WE WORK</p><h2 id="process-title" tabIndex={-1}>A clear path from<br />“what if” to what’s next.</h2></div><p>No unnecessary complexity. Just a shared direction and a practical process, one step at a time.</p></div><ol className="process-grid">{steps.map((step, index) => <li key={step.title}><div className="step-track"><span>0{index + 1}</span>{index < 3 ? <ArrowRight size={20} /> : <Check size={20} />}</div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></section>
      <section className="contact-section container" id="contact" aria-labelledby="contact-title"><div className="contact-panel"><div><p className="eyebrow">04 / LET’S TALK</p><h2 id="contact-title" tabIndex={-1}>Have something<br />in mind<span>?</span></h2><p>A new idea. A better process. A website that feels like you.<br />Tell us what you’d like to build.</p></div><div className="contact-details"><ArrowUpRight className="contact-arrow" strokeWidth={1} aria-hidden="true" /><div className="email-placeholder"><span className="contact-status"><i /> CONTACT DETAILS COMING SOON</span><p>Business email coming soon</p><span>We’re getting ready to hear your ideas.</span></div></div></div></section>
    </main>
    <footer className="container footer"><a href="#main" className="footer-brand" aria-label="RM Software home"><span className="logo-crop"><Image src="/images/logo.jpeg" width={1536} height={1024} alt="RM Software" unoptimized /></span></a><p>Thoughtful software. Practical possibilities.</p><span>© {new Date().getFullYear()} RM Software</span><a href="#main" className="back-top">Back to top <ArrowUpRight size={15} /></a></footer>
  </>;
}

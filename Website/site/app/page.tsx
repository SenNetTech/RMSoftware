import Link from '@/app/site-link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ClipboardList,
  Database,
  Layers3,
  Network,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import type { Metadata } from 'next';
import { site } from './site-content';
import { services } from './services-data';
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
const steps = [
  [
    'Discover',
    'We discuss the bottleneck, who it affects and what a useful result would look like.',
    'A shared understanding of the problem',
  ],
  [
    'Define',
    'We agree the scope, priorities, costs and milestones before development begins.',
    'A clear proposal and delivery plan',
  ],
  [
    'Build & validate',
    'You see progress regularly. We test the software against the work your team actually does.',
    'Working software, shaped by your feedback',
  ],
  [
    'Launch & support',
    'We plan the rollout, hand over documentation and agree how to maintain and improve the system.',
    'A supported transition into everyday use',
  ],
];
const examples = [
  {
    sector: 'PROFESSIONAL SERVICES',
    title: 'From inbox to client portal',
    problem:
      'Client requests, documents and status updates are scattered across email.',
    solution: 'A shared portal for requests, files, approvals and progress.',
    technology: 'Web application · Role-based access · Notifications',
    impact:
      'Clients could check progress themselves while staff work from one request history.',
    icon: ClipboardList,
  },
  {
    sector: 'LOGISTICS & OPERATIONS',
    title: 'A clearer view of every job',
    problem: 'Job progress lives in spreadsheets and WhatsApp conversations.',
    solution: 'An operations dashboard with assigned tasks and status updates.',
    technology: 'Custom software · Database · System integrations',
    impact:
      'Dispatch and operations teams could see outstanding work and follow up from one place.',
    icon: Layers3,
  },
  {
    sector: 'GROWING BUSINESSES',
    title: 'An enquiry that keeps moving',
    problem: 'Teams retype customer details and manually chase each next step.',
    solution:
      'An enquiry-to-quote workflow with approvals and follow-up reminders.',
    technology: 'Workflow automation · APIs · Human approval steps',
    impact:
      'An approved enquiry could move forward without repeated data entry between tools.',
    icon: Workflow,
  },
];
function WorkflowDiagram() {
  return (
    <figure className="workflow-diagram">
      <figcaption>
        <span className="eyebrow">A BETTER WAY TO WORK</span>
        <span className="diagram-index">RM / 01</span>
      </figcaption>
      <div className="workflow-before">
        <span className="diagram-label">FROM DISCONNECTED</span>
        <div>
          <span>Spreadsheets</span>
          <span>Email threads</span>
          <span>Manual updates</span>
        </div>
      </div>
      <div className="workflow-connection" aria-hidden="true">
        <span />
        <ArrowRight size={20} />
      </div>
      <div className="workflow-system">
        <Network size={28} />
        <div>
          <strong>Your business. One connected system.</strong>
          <p>People, processes and information, working together.</p>
        </div>
      </div>
      <div className="workflow-results">
        <div>
          <CheckCheck size={19} />
          <span>Less repeat admin</span>
        </div>
        <div>
          <Database size={19} />
          <span>Clearer information</span>
        </div>
        <div>
          <ShieldCheck size={19} />
          <span>More control</span>
        </div>
      </div>
      <p className="diagram-footnote">
        A practical approach, built around your operations.
      </p>
    </figure>
  );
}
export default function Home() {
  return (
    <>
      <StructuredData />
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> SOFTWARE FOR GROWING BUSINESSES
          </p>
          <h1 id="hero-title">
            Less busywork.
            <br />
            <span>More business.</span>
          </h1>
          <p className="hero-description">
            Custom software development that helps your business automate
            operations, work efficiently and scale.
          </p>
          <p className="hero-detail">
            Replace spreadsheet workarounds and disconnected systems with
            software built around your team. A technology partner for growing
            businesses across South Africa.
          </p>
          <div className="hero-actions">
            <Link
              className="button button-primary"
              href="/contact/"
            >
              Book a Free Consultation <ArrowUpRight size={19} />
            </Link>
            <Link
              className="text-link"
              href="/contact/#project-form"
            >
              Discuss Your Project <ArrowRight size={17} />
            </Link>
          </div>
          <p className="hero-note">
            A practical first conversation. No technical brief needed.
          </p>
        </div>
        <WorkflowDiagram />
      </section>
      <div className="outcome-strip">
        <div className="container">
          <span>BUILT AROUND BUSINESS OUTCOMES</span>
          <p>
            <Check size={17} /> Less repetitive work
          </p>
          <p>
            <Check size={17} /> Better operational visibility
          </p>
          <p>
            <Check size={17} /> Room to grow
          </p>
        </div>
      </div>
      <section className="section container" aria-labelledby="problems-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / THE BOTTLENECK</p>
            <h2 id="problems-title">
              Your business has grown.
              <br />
              <span className="muted-heading">Your systems haven’t.</span>
            </h2>
          </div>
          <p>
            When everyday work depends on workarounds, growth adds more admin.
            The right software gives your team a better way forward.
          </p>
        </div>
        <div className="problem-grid">
          {[
            [
              'Too much copying. Not enough doing.',
              'The same information moves between spreadsheets, email and disconnected tools. Small changes create a chain of manual updates.',
            ],
            [
              'Progress is hard to see.',
              'Job status lives in someone’s inbox or a WhatsApp thread. Managers spend time chasing answers instead of making decisions.',
            ],
            [
              'Your tools no longer fit.',
              'Off-the-shelf software cannot quite handle your processes. Your team works around it, and the exceptions keep growing.',
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span className="card-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="section services-section"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / WHAT WE BUILD</p>
              <h2 id="services-title" tabIndex={-1}>
                The right software.
                <br />
                <span className="muted-heading">
                  For the work that matters.
                </span>
              </h2>
            </div>
            <p>
              From a single workflow to a business-critical platform, start with
              the outcome you need and build from there.
            </p>
          </div>
          <div className="service-list">
            {services.map((s, i) => (
              <Link
                className="service-row"
                href={`/services/${s.slug}/`}
                key={s.slug}
              >
                <span className="service-index">0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.examples}</p>
                </div>
                <span className="service-outcome">{s.short}</span>
                <ArrowUpRight size={24} />
              </Link>
            ))}
          </div>
          <p className="services-note">
            Not sure where your challenge fits?{' '}
            <Link href="/contact/">
              Let’s work it out together <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </section>
      <section
        className="section container"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="why-grid">
          <div>
            <p className="eyebrow">03 / WHY RMSOFTWARE</p>
            <h2 id="about-title" tabIndex={-1}>
              A technology partner.
              <br />
              <span className="muted-heading">With your business in view.</span>
            </h2>
            <p className="section-intro">
              Software is a business investment. Our approach starts with
              understanding what needs to improve, then making the scope and
              decisions clear.
            </p>
            <Link href="/contact/" className="text-link">
              Meet us in a free consultation <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="commitment-list">
            {[
              [
                'Business context first',
                'We look at the people, processes and constraints behind the request before recommending a solution.',
              ],
              [
                'Clear scope and communication',
                'Agree deliverables and milestones upfront. Review progress together and make changes deliberately.',
              ],
              [
                'Built for the next chapter',
                'Plan documentation, handover, maintenance and ongoing development as part of the conversation.',
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <Check size={20} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="section process-section"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / HOW WE WORK</p>
              <h2 id="process-title" tabIndex={-1}>
                Clarity at every step.
              </h2>
            </div>
            <p>
              A defined path from the first conversation to software your team
              can use.
            </p>
          </div>
          <ol className="process-grid">
            {steps.map(([title, text, output], i) => (
              <li key={title}>
                <div className="step-track">
                  <span>0{i + 1}</span>
                  <ArrowRight size={18} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <p className="step-output">{output}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="section container"
        id="solutions"
        aria-labelledby="solutions-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / SOLUTION EXAMPLES</p>
            <h2 id="solutions-title" tabIndex={-1}>
              See what better
              <br />
              <span className="muted-heading">could look like.</span>
            </h2>
          </div>
          <p>
            Illustrative solutions to common business problems. These are
            examples of possible approaches, not completed client projects.
          </p>
        </div>
        <div className="example-grid">
          {examples.map(
            ({
              sector,
              title,
              problem,
              solution,
              technology,
              impact,
              icon: Icon,
            }) => (
              <article className="example-card" key={title}>
                <div className="example-heading">
                  <Icon size={27} />
                  <span className="eyebrow">{sector}</span>
                </div>
                <h3>{title}</h3>
                <dl>
                  <dt>The problem</dt>
                  <dd>{problem}</dd>
                  <dt>The solution</dt>
                  <dd>{solution}</dd>
                  <dt>Technology approach</dt>
                  <dd>{technology}</dd>
                  <dt>Potential business impact</dt>
                  <dd>{impact}</dd>
                </dl>
              </article>
            ),
          )}
        </div>
      </section>
      <section className="technology-section">
        <div className="container technology-grid">
          <div>
            <p className="eyebrow">06 / TECHNOLOGY WITH A PURPOSE</p>
            <h2>
              Business needs first.
              <br />
              Technology second.
            </h2>
          </div>
          <div>
            <p>
              We choose the stack around your existing systems, security needs,
              budget and long-term maintenance. The proposal explains the
              choices and trade-offs.
            </p>
            <ul className="tech-tags">
              <li>React & web interfaces</li>
              <li>.NET & application services</li>
              <li>SQL & business data</li>
              <li>APIs & integrations</li>
              <li>Cloud hosting</li>
              <li>AI where it adds value</li>
            </ul>
          </div>
        </div>
      </section>
      <section
        className="section container team-section"
        aria-labelledby="team-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">07 / PEOPLE YOU CAN SPEAK TO</p>
            <h2 id="team-title">
              Start with a conversation.
              <br />
              <span className="muted-heading">Know who’s behind the work.</span>
            </h2>
          </div>
          <p>
            RMSoftware is led by Sennelo Mulanga Gundo and Netshisaulu
            Ridokunda. Talk to us about your operations, priorities and what you
            need from a development partner.
          </p>
        </div>
        <div className="team-strip">
          <article>
            <span className="director-initials" aria-hidden="true">
              SMG
            </span>
            <div>
              <h3>Sennelo Mulanga Gundo</h3>
              <p>Director · RMSoftware</p>
            </div>
          </article>
          <article>
            <span className="director-initials" aria-hidden="true">
              NR
            </span>
            <div>
              <h3>Netshisaulu Ridokunda</h3>
              <p>Director · RMSoftware</p>
            </div>
          </article>
          <Link className="text-link" href="/contact/">
            Let’s discuss the fit <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ConsultationCTA />
    </>
  );
}

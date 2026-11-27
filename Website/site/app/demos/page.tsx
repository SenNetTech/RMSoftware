import { Info } from 'lucide-react';
import { pageMetadata } from '../page-metadata';
import { ConsultationCTA } from '../site-shell';
import { demos } from '../demos-data';
import DemoGallery from '../demo-gallery';
import AutomationPipeline from '../automation-pipeline';
import RoiCalculator from '../roi-calculator';

export const metadata = pageMetadata(
  'Concept Demos & Automation Examples',
  'Explore concept designs for portals, dashboards, booking apps and online stores, run interactive automation examples and estimate the time automation could return to your team.',
  '/demos/',
);

export default function DemosPage() {
  return (
    <>
      <section className="demos-hero" aria-labelledby="demos-title">
        <div className="container">
          <p className="section-kicker">Concept demos · automation lab</p>
          <h1 id="demos-title">
            See what we <span>could build</span> for you.
          </h1>
          <p className="lead">
            Browse concept designs, run live automation examples and estimate
            what automation could be worth to your business, all before we
            have spoken.
          </p>
          <p className="concept-note">
            <Info size={17} aria-hidden="true" />
            Every design here is a concept for a fictional business. None of
            it is client work.
          </p>
        </div>
      </section>

      <section
        className="container gallery-section"
        id="gallery"
        aria-labelledby="gallery-title"
      >
        <div className="showcase-heading" data-reveal="rise">
          <p className="section-kicker">Concept gallery</p>
          <h2 id="gallery-title">Six ideas, six industries.</h2>
          <p>
            Each concept lists the automations behind the screen, because the
            interface is only half of what saves your team time.
          </p>
        </div>
        <DemoGallery demos={demos} />
      </section>

      <section
        className="automation-section lab-section"
        id="automation-lab"
        aria-labelledby="lab-title"
      >
        <div className="container">
          <div className="automation-heading" data-reveal="rise">
            <p className="section-kicker">Automation lab</p>
            <h2 id="lab-title">
              Three workflows, <em>zero re-typing.</em>
            </h2>
            <p>
              Choose a workflow and press play. You can pause, step through
              each stage, and see where a person stays in control.
            </p>
          </div>
          <AutomationPipeline autoPlay={false} />
        </div>
      </section>

      <section
        className="roi-section"
        id="savings-calculator"
        aria-labelledby="roi-title"
      >
        <div className="container">
          <div className="showcase-heading" data-reveal="rise">
            <p className="section-kicker">Savings calculator</p>
            <h2 id="roi-title">What is repetitive work costing you?</h2>
            <p>
              Move the sliders to match your team. The estimate uses only the
              numbers you enter, and nothing leaves your browser.
            </p>
          </div>
          <RoiCalculator />
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}

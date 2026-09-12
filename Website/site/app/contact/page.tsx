import Link from '@/app/site-link';
import { Mail, MessageCircle, Check } from 'lucide-react';
import { contact } from '../site-content';
import { pageMetadata } from '../page-metadata';
import EnquiryForm from '../enquiry-form';
export const metadata = pageMetadata(
  'Book a Free Software Consultation',
  'Discuss your custom software, automation or web application project with RMSoftware. Share your business challenge, budget and timeline to arrange a free consultation.',
  '/contact/',
);
export default function ContactPage() {
  return (
    <>
      <section className="container page-hero contact-hero">
        <p className="eyebrow">LET’S EXPLORE THE RIGHT NEXT STEP</p>
        <h1>
          Better software starts
          <br />
          <span>with your business.</span>
        </h1>
        <p className="lead">
          Tell us what’s slowing you down or what you want to build. Start with
          a free consultation to explore the fit, priorities and practical
          options.
        </p>
      </section>
      <section className="container contact-layout">
        <aside className="contact-aside">
          <h2>What happens next?</h2>
          <ol>
            <li>Share a little about your business and the problem.</li>
            <li>
              We review the details and contact you to arrange a conversation.
            </li>
            <li>
              If there’s a fit, we define the scope and next steps together.
            </li>
          </ol>
          <div className="fit-note">
            <h3>A useful starting point</h3>
            <p>
              This enquiry is designed for software projects from R20,000 to
              R500,000+ and ongoing partnerships from R5,000 to R50,000+ per
              month.
            </p>
            <p>
              These are planning ranges, not a quote. If you’re unsure, choose
              “Need help scoping”.
            </p>
          </div>
          <p className="contact-reassurance">
            <Check size={17} /> No obligation to proceed
          </p>
          <Link
            className="text-link"
            href={`mailto:${contact.email}`}
          >
            <Mail size={17} />
            {contact.email}
          </Link>
          {contact.whatsapp && (
            <Link
              className="text-link"
              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} />
              Talk on WhatsApp
            </Link>
          )}
        </aside>
        <EnquiryForm />
      </section>
    </>
  );
}

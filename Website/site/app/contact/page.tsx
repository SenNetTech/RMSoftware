import Link from '@/app/site-link';
import { Check, Mail, MessageCircle } from 'lucide-react';
import EnquiryForm from '../enquiry-form';
import { pageMetadata } from '../page-metadata';
import { contact } from '../site-content';

export const metadata = pageMetadata(
  'Start a Conversation',
  'Tell RMSoftware what could work better in your business. No technical brief or budget estimate is needed—we will help shape the scope, cost and delivery plan.',
  '/contact/',
);

export default function ContactPage() {
  return (
    <>
      <section className="container page-hero contact-hero">
        <p className="eyebrow">START WITH THE BUSINESS PROBLEM</p>
        <h1>
          You do not need
          <br />
          <span>a technical brief.</span>
        </h1>
        <p className="lead">
          Tell us what feels slow, difficult or disconnected in your business.
          We will help you work out whether software can improve it—and explain
          the practical options in plain language.
        </p>
      </section>

      <section className="container contact-layout">
        <aside className="contact-aside">
          <h2>What happens next?</h2>
          <ol>
            <li>
              Share the situation in your own words. You do not need to know
              what technology or system you need.
            </li>
            <li>
              We arrange a conversation to understand the people, process and
              business outcome involved.
            </li>
            <li>
              If software makes sense, we recommend a practical starting point
              and explain how the work could be delivered in stages.
            </li>
            <li>
              Before work begins, you receive a clear written proposal covering
              what we will build, the cost, the delivery stages and the expected
              timeline.
            </li>
          </ol>

          <div className="fit-note">
            <h3>Cost and delivery, made clear</h3>
            <p>
              We will not ask you to guess a budget or define a complete system
              upfront. First, we understand what needs to improve and which part
              would create the most value.
            </p>
            <p>
              Larger end-to-end systems can be planned in manageable stages. You
              will know what each stage delivers, what it costs and what
              decisions are needed before you commit to it.
            </p>
          </div>

          <p className="contact-reassurance">
            <Check size={17} /> No technical knowledge required
          </p>
          <p className="contact-reassurance">
            <Check size={17} /> No obligation to proceed
          </p>
          <Link className="text-link" href={`mailto:${contact.email}`}>
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

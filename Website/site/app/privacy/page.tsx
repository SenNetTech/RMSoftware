import Link from '@/app/site-link';
import { pageMetadata } from '../page-metadata';
import { contact } from '../site-content';
export const metadata = pageMetadata(
  'Privacy & Cookies',
  'How RMSoftware handles project enquiries and local preferences, and how to contact us about your information.',
  '/privacy/',
);
export default function PrivacyPage() {
  return (
    <article className="container prose-page">
      <p className="eyebrow">RMSOFTWARE</p>
      <h1>Privacy & cookies</h1>
      <p className="lead">
        Your enquiry helps us understand your business and respond to your
        request.
      </p>
      <h2>Information you share</h2>
      <p>
        The project form asks for your name, company, work email, optional phone
        number and a description of what you would like to improve. You may also
        share a possible project type and preferred starting timeframe. Please
        do not include passwords, financial account details or sensitive
        customer information.
      </p>
      <h2>How enquiries work</h2>
      <p>
        The form prepares an email draft. Your answers stay in this page until
        you choose to open your email app or copy them. Review and send the
        email yourself to contact us. We do not store your answers on this
        website.
      </p>
      <h2>How we use your information</h2>
      <p>
        We use enquiries to discuss your requirements, arrange a consultation
        and follow up on a potential project. Contact us if you would like to
        correct your details, stop follow-up or request deletion of an enquiry.
        We may need to retain information connected to an ongoing engagement or
        business records.
      </p>
      <h2>Preferences and analytics</h2>
      <p>
        This website stores your light or dark appearance preference on your
        device. We do not use website analytics or advertising tracking.
      </p>
      <h2>Email and external services</h2>
      <p>
        Your email provider processes messages you send. If you use a WhatsApp
        link, WhatsApp’s own privacy terms apply. Our hosting provider may
        process technical request information to deliver and secure this
        website.
      </p>
      <h2>Contact</h2>
      <p>
        For questions about your information, email{' '}
        <Link href={`mailto:${contact.email}`}>{contact.email}</Link>.
      </p>
      <Link className="text-link" href="/contact/">
        Return to project enquiries →
      </Link>
    </article>
  );
}
